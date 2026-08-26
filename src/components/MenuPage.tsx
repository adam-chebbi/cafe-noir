import React, { useState, useMemo, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  Search,
  Coffee,
  Sparkles,
  ArrowLeft,
  X,
  SlidersHorizontal,
  MapPin,
  Clock,
  ArrowUpRight,
  ShoppingBag,
  AlertCircle,
  RefreshCw,
  Info,
  CheckCircle2,
  Timer,
  QrCode
} from 'lucide-react';
import { ApiMenuItem, WebCartItem, OrderSubmitResponse, SelectedOption, CustomizationOptions, MenuItem } from '../types';
import { fetchPublicMenu, initQRSession, validateQRSession } from '../services/api';
import { CustomizeModal } from './CustomizeModal';
import { CartDrawer } from './CartDrawer';
import { OrderSuccessModal } from './OrderSuccessModal';

interface MenuPageProps {
  tableNumber?: string;
  tableToken?: string;
  onNavigateHome?: () => void;
}

export const MenuPage: React.FC<MenuPageProps> = ({
  tableNumber,
  tableToken: initialTableToken,
  onNavigateHome,
}) => {
  const [products, setProducts] = useState<ApiMenuItem[]>([]);
  const [categoriesList, setCategoriesList] = useState<{ id: string; name: string }[]>([]);
  const [establishmentInfo, setEstablishmentInfo] = useState<{
    name: string;
    wifiPassword?: string;
    openingHours?: string;
  }>({
    name: 'Café Noir',
    wifiPassword: 'CafeNoirMenzah2026',
    openingHours: '07h00 - 00h00',
  });

  const [isLoading, setIsLoading] = useState(true);
  const [loadError, setLoadError] = useState<string | null>(null);

  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedTag, setSelectedTag] = useState<string | 'all'>('all');

  // QR Session Security State (Blueprint Part A)
  const [activeTableToken, setActiveTableToken] = useState<string | undefined>(initialTableToken);
  const [sessionExpiresAt, setSessionExpiresAt] = useState<string | null>(null);
  const [remainingSeconds, setRemainingSeconds] = useState<number>(0);
  const [isOrderingAllowed, setIsOrderingAllowed] = useState<boolean>(false);
  const [isSessionExpired, setIsSessionExpired] = useState<boolean>(false);
  const [sessionError, setSessionError] = useState<string | null>(null);
  const [sessionInitializing, setSessionInitializing] = useState<boolean>(false);

  // Modals state
  const [customizingItem, setCustomizingItem] = useState<ApiMenuItem | null>(null);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [cartItems, setCartItems] = useState<WebCartItem[]>([]);
  const [submittedOrder, setSubmittedOrder] = useState<OrderSubmitResponse | null>(null);

  // Fetch catalog from system API
  const loadMenuData = async () => {
    setIsLoading(true);
    setLoadError(null);
    try {
      const data = await fetchPublicMenu();
      if (data.products && Array.isArray(data.products)) {
        setProducts(data.products);
      }
      if (data.categories && Array.isArray(data.categories)) {
        setCategoriesList(data.categories);
      }
      setEstablishmentInfo({
        name: data.establishmentName || 'Café Noir',
        wifiPassword: data.wifiPassword || 'CafeNoirMenzah2026',
        openingHours: data.openingHours || '07h00 - 00h00',
      });
      setIsLoading(false);
    } catch (err: any) {
      console.warn('Could not fetch remote menu catalog:', err);
      setLoadError("Connexion au catalogue en direct impossible. Veuillez vérifier votre réseau.");
      setIsLoading(false);
    }
  };

  // Initialize or Validate QR Session with Backend (Part A.3 & A.5)
  const bootstrapQRSession = async () => {
    if (!tableNumber) {
      setIsOrderingAllowed(false);
      setIsSessionExpired(false);
      return;
    }

    setSessionInitializing(true);
    setSessionError(null);
    try {
      const session = await initQRSession(tableNumber, activeTableToken);
      if (session.valid && session.token && session.expiresAt) {
        setActiveTableToken(session.token);
        setSessionExpiresAt(session.expiresAt);
        const rem = Math.max(0, Math.floor((new Date(session.expiresAt).getTime() - Date.now()) / 1000));
        setRemainingSeconds(rem);
        if (rem > 0) {
          setIsOrderingAllowed(true);
          setIsSessionExpired(false);
        } else {
          setIsOrderingAllowed(false);
          setIsSessionExpired(true);
        }
      } else {
        setIsOrderingAllowed(false);
        setIsSessionExpired(true);
        setSessionError("Session de commande non valide ou expirée.");
      }
    } catch (err: any) {
      console.warn("Could not initialize QR session:", err);
      setIsOrderingAllowed(false);
      setSessionError(err.message || "Impossible de démarrer la session de commande.");
    } finally {
      setSessionInitializing(false);
    }
  };

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' });
    loadMenuData();
    if (tableNumber) {
      bootstrapQRSession();
    }
  }, [tableNumber]);

  // Real-time Countdown Timer driven by server expires_at timestamp (Part A.6)
  useEffect(() => {
    if (!sessionExpiresAt || !isOrderingAllowed) return;

    const interval = setInterval(() => {
      const diff = Math.max(0, Math.floor((new Date(sessionExpiresAt).getTime() - Date.now()) / 1000));
      setRemainingSeconds(diff);

      if (diff <= 0) {
        // Expiry reached
        setIsOrderingAllowed(false);
        setIsSessionExpired(true);
        setCartItems([]);
        setIsCartOpen(false);
        clearInterval(interval);
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [sessionExpiresAt, isOrderingAllowed]);

  // Re-validate session when window regains focus (Part A.6)
  useEffect(() => {
    if (!tableNumber || !activeTableToken) return;

    const handleFocus = async () => {
      if (sessionExpiresAt && new Date(sessionExpiresAt).getTime() > Date.now()) {
        try {
          const res = await validateQRSession(tableNumber, activeTableToken);
          if (!res.valid) {
            setIsOrderingAllowed(false);
            setIsSessionExpired(true);
            setCartItems([]);
            setIsCartOpen(false);
          } else if (res.expiresAt) {
            setSessionExpiresAt(res.expiresAt);
          }
        } catch (e) {
          console.warn("Session focus re-validation check failed", e);
        }
      }
    };

    window.addEventListener('focus', handleFocus);
    return () => window.removeEventListener('focus', handleFocus);
  }, [tableNumber, activeTableToken, sessionExpiresAt]);

  const formatDT = (amount: number) => {
    return `${amount.toFixed(3)} DT`;
  };

  const formatCountdown = (totalSec: number) => {
    const mins = Math.floor(totalSec / 60);
    const secs = totalSec % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  // Derive categories with counts
  const categories = useMemo(() => {
    const list: { id: string; label: string; count: number }[] = [
      { id: 'all', label: 'Toute la Carte', count: products.length },
    ];

    if (categoriesList.length > 0) {
      categoriesList.forEach((c) => {
        const count = products.filter((p) => p.category === c.name).length;
        list.push({ id: c.name, label: c.name, count });
      });
    } else {
      const distinct: string[] = Array.from(new Set(products.map((p) => p.category)));
      distinct.forEach((catName) => {
        const count = products.filter((p) => p.category === catName).length;
        list.push({ id: catName, label: catName, count });
      });
    }

    return list;
  }, [categoriesList, products]);

  const quickTags = [
    { id: 'all', label: 'Tous' },
    { id: 'Signatures', label: 'Signatures' },
    { id: 'Boissons', label: 'Boissons' },
    { id: 'Gourmandises', label: 'Gourmandises' },
  ];

  // Filtered products list
  const filteredProducts = useMemo(() => {
    return products.filter((item) => {
      if (item.availability === 'masque') return false;

      if (selectedCategory !== 'all' && item.category !== selectedCategory) {
        return false;
      }

      if (selectedTag !== 'all') {
        if (selectedTag === 'Signatures' && !item.isFeatured) return false;
        if (selectedTag === 'Boissons' && !item.category.toLowerCase().includes('boisson') && !item.category.toLowerCase().includes('café') && !item.category.toLowerCase().includes('thé') && !item.category.toLowerCase().includes('jus')) return false;
        if (selectedTag === 'Gourmandises' && !item.category.toLowerCase().includes('pâtisserie') && !item.category.toLowerCase().includes('snack') && !item.category.toLowerCase().includes('boulangerie')) return false;
      }

      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const matchesName = item.name.toLowerCase().includes(q);
        const matchesCategory = item.category.toLowerCase().includes(q);
        const matchesDesc = (item.description || '').toLowerCase().includes(q);
        const matchesAllergen = (item.allergens || []).some((a) => a.toLowerCase().includes(q));

        if (!matchesName && !matchesCategory && !matchesDesc && !matchesAllergen) {
          return false;
        }
      }

      return true;
    });
  }, [products, selectedCategory, selectedTag, searchQuery]);

  // Cart operations (Only functional when isOrderingAllowed === true)
  const handleAddToCart = (
    item: MenuItem,
    _customization: CustomizationOptions,
    quantity: number,
    selectedOptions: SelectedOption[],
    customerNote?: string
  ) => {
    if (!isOrderingAllowed) return;

    const apiItem = products.find((p) => p.id === item.id) || (item as unknown as ApiMenuItem);
    const optionsDelta = selectedOptions.reduce((sum, opt) => sum + opt.priceDelta, 0);
    const unitPrice = apiItem.price + optionsDelta;
    const cartItemId = `${apiItem.id}_${selectedOptions.map((o) => o.optionId).join('-')}_${Date.now()}`;

    const newCartItem: WebCartItem = {
      cartItemId,
      product: apiItem,
      selectedOptions,
      customerNote,
      unitPrice,
      quantity,
      totalPrice: unitPrice * quantity,
    };

    setCartItems((prev) => [...prev, newCartItem]);
    setIsCartOpen(true);
  };

  const handleUpdateQuantity = (cartItemId: string, newQuantity: number) => {
    if (!isOrderingAllowed) return;
    setCartItems((prev) =>
      prev.map((i) => (i.cartItemId === cartItemId ? { ...i, quantity: newQuantity } : i))
    );
  };

  const handleRemoveItem = (cartItemId: string) => {
    setCartItems((prev) => prev.filter((i) => i.cartItemId !== cartItemId));
  };

  const handleClearCart = () => {
    setCartItems([]);
  };

  const handleBackToHome = () => {
    if (onNavigateHome) {
      onNavigateHome();
    } else {
      window.history.pushState({}, '', '/');
      window.dispatchEvent(new Event('popstate'));
    }
  };

  const totalCartCount = isOrderingAllowed ? cartItems.reduce((acc, i) => acc + i.quantity, 0) : 0;
  const cartSubtotal = isOrderingAllowed ? cartItems.reduce((acc, i) => acc + i.unitPrice * i.quantity, 0) : 0;

  return (
    <div className="min-h-screen bg-[#0E0E0E] text-[#F5F5F0] selection:bg-[#8FC1A6] selection:text-[#0E0E0E] font-sans pb-28">
      {/* 
        Header / Top Bar:
        Responsive dark luxury bar with Back Button, Café Noir Monogram, and Hours
      */}
      <header className="sticky top-0 z-40 w-full bg-[#0E0E0E]/90 backdrop-blur-xl border-b border-[#1E1E1C] px-4 sm:px-8 md:px-16 py-3.5 sm:py-4 transition-all">
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-2">
          {/* Back to Home Button */}
          <button
            onClick={handleBackToHome}
            className="group flex items-center gap-2 text-[#B8B8B0] hover:text-[#F5F5F0] transition-colors cursor-pointer py-1 px-1.5 -ml-1.5 rounded-lg hover:bg-white/5 shrink-0"
            aria-label="Retour à l'accueil"
          >
            <ArrowLeft className="w-4 h-4 text-[#8FC1A6] group-hover:-translate-x-1 transition-transform" />
            <span className="font-sans text-[11px] sm:text-xs tracking-[0.2em] sm:tracking-[0.24em] uppercase font-medium">
              Accueil
            </span>
          </button>

          {/* Café Noir Brand Logo */}
          <div className="flex flex-col items-center text-center">
            <span className="font-serif-display text-lg sm:text-2xl text-white font-normal tracking-wide">
              {establishmentInfo.name}
            </span>
            <span className="font-sans text-[8px] sm:text-[9px] tracking-[0.3em] sm:tracking-[0.34em] uppercase text-[#8FC1A6] font-medium -mt-0.5 sm:-mt-1">
              Carte de Dégustation
            </span>
          </div>

          {/* Right Controls: Cart Icon & Opening Hours */}
          <div className="flex items-center gap-3 shrink-0">
            <div className="hidden sm:flex items-center gap-1.5 text-[10px] sm:text-xs text-[#A6A69F] font-medium">
              <span className="w-1.5 h-1.5 rounded-full bg-[#8FC1A6] animate-pulse" />
              <span>{establishmentInfo.openingHours}</span>
            </div>

            {/* Cart Icon rendered ONLY when ordering is active (Part A.7) */}
            {isOrderingAllowed && totalCartCount > 0 && (
              <button
                onClick={() => setIsCartOpen(true)}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#8FC1A6] text-[#0E0E0E] font-bold text-xs shadow-lg hover:bg-[#9ED4B5] transition-all cursor-pointer animate-in fade-in"
              >
                <ShoppingBag className="w-3.5 h-3.5" />
                <span>{totalCartCount}</span>
              </button>
            )}
          </div>
        </div>
      </header>

      {/* QR Table Session Banner (Live Countdown & Strict Gating - Part A.6 & A.7) */}
      {tableNumber && (
        <div className={`border-b transition-colors px-4 sm:px-8 py-3.5 ${
          isOrderingAllowed 
            ? 'bg-gradient-to-r from-[#17261E] via-[#141F1A] to-[#121211] border-[#8FC1A6]/40' 
            : isSessionExpired 
              ? 'bg-gradient-to-r from-[#2A1414] via-[#1F1212] to-[#141212] border-rose-900/60'
              : 'bg-[#181816] border-[#262624]'
        }`}>
          <div className="max-w-7xl mx-auto flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
            {/* Left: Table Identifier */}
            <div className="flex items-center gap-3">
              <span className={`w-2.5 h-2.5 rounded-full ${
                isOrderingAllowed 
                  ? 'bg-[#8FC1A6] animate-ping' 
                  : isSessionExpired 
                    ? 'bg-rose-500' 
                    : 'bg-amber-400 animate-pulse'
              }`} />
              <span className="text-[#D4E8DC] font-medium text-xs sm:text-sm">
                Vous commandez pour : <strong className="text-white uppercase tracking-wider font-bold">{tableNumber}</strong>
              </span>
            </div>

            {/* Right: Live Countdown or Expiry Action */}
            <div className="flex items-center gap-3">
              {isOrderingAllowed ? (
                <div className="flex items-center gap-2 bg-[#0E0E0E]/60 border border-[#8FC1A6]/30 px-3 py-1.5 rounded-full shadow-inner">
                  <Timer className="w-3.5 h-3.5 text-[#8FC1A6] animate-pulse" />
                  <span className="text-[#A6A69F] text-[11px] font-medium">Session valide :</span>
                  <span className="font-mono text-xs font-bold text-white tracking-wider">
                    {formatCountdown(remainingSeconds)}
                  </span>
                </div>
              ) : isSessionExpired ? (
                <div className="flex items-center gap-2">
                  <span className="text-rose-300 text-xs font-medium flex items-center gap-1.5">
                    <AlertCircle className="w-3.5 h-3.5 text-rose-400" />
                    Session de commande expirée
                  </span>
                  <button
                    onClick={bootstrapQRSession}
                    disabled={sessionInitializing}
                    className="flex items-center gap-1.5 px-3 py-1 bg-rose-900/80 hover:bg-rose-800 text-white rounded-full text-[11px] font-semibold transition-all cursor-pointer shadow"
                  >
                    <RefreshCw className={`w-3 h-3 ${sessionInitializing ? 'animate-spin' : ''}`} />
                    <span>Rescanner / Rafraîchir</span>
                  </button>
                </div>
              ) : (
                <span className="text-[#A6A69F] text-xs flex items-center gap-1.5">
                  <RefreshCw className="w-3 h-3 animate-spin text-[#8FC1A6]" />
                  Initialisation sécurisée...
                </span>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Hero Banner Section */}
      <section className="relative w-full pt-8 pb-6 sm:pt-12 sm:pb-8 px-4 sm:px-8 md:px-16 lg:px-24 border-b border-[#1A1A18] overflow-hidden">
        <div className="absolute top-0 right-1/4 w-72 sm:w-96 h-72 sm:h-96 bg-[#8FC1A6]/5 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-10 left-10 w-60 sm:w-80 h-60 sm:h-80 bg-[#E9E2D6]/5 rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-4xl mx-auto text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mb-2 sm:mb-3"
          >
            <span className="font-sans text-[11px] sm:text-xs tracking-[0.28em] sm:tracking-[0.32em] uppercase text-[#8FC1A6] font-medium">
              Salon de Dégustation & Torréfaction
            </span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="font-serif-display text-3xl sm:text-5xl md:text-6xl text-white tracking-tight mb-3 sm:mb-4"
          >
            La Carte des Terroirs
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-xs sm:text-sm md:text-base text-[#B8B8B0] max-w-2xl mx-auto font-light leading-relaxed mb-6 sm:mb-8"
          >
            {isOrderingAllowed 
              ? `Sélectionnez vos boissons et gourmandises, personnalisez vos options et envoyez directement votre commande pour la ${tableNumber}.`
              : `Découvrez nos sélections de cafés d'exception, thés et créations gourmandes. Pour commander, veuillez scanner le QR code sur votre table.`}
          </motion.p>

          {/* Search Bar & Quick Filters */}
          <div className="max-w-2xl mx-auto space-y-3">
            <div className="relative">
              <Search className="w-4 h-4 text-[#7A7A72] absolute left-4 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Rechercher un café, une boisson, une pâtisserie..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-11 pr-10 py-3 bg-[#161614] border border-[#262624] focus:border-[#8FC1A6] rounded-2xl text-xs sm:text-sm text-white placeholder:text-[#666660] focus:outline-none transition-all shadow-inner"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-[#7A7A72] hover:text-white p-1"
                >
                  <X className="w-4 h-4" />
                </button>
              )}
            </div>

            {/* Quick Tags */}
            <div className="flex flex-wrap items-center justify-center gap-1.5 sm:gap-2 pt-1">
              {quickTags.map((tag) => (
                <button
                  key={tag.id}
                  onClick={() => setSelectedTag(tag.id as any)}
                  className={`px-3 py-1 rounded-full text-[11px] font-medium transition-all cursor-pointer ${
                    selectedTag === tag.id
                      ? 'bg-[#8FC1A6] text-[#0E0E0E] font-bold shadow-md'
                      : 'bg-[#181816] text-[#A6A69F] hover:text-white hover:bg-[#222220] border border-[#242422]'
                  }`}
                >
                  {tag.label}
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Category Pills Navigation */}
      <section className="sticky top-[58px] sm:top-[65px] z-30 bg-[#0E0E0E]/95 backdrop-blur-md border-b border-[#1C1C1A] py-2.5 px-4 sm:px-8 overflow-x-auto no-scrollbar">
        <div className="max-w-7xl mx-auto flex items-center gap-2 sm:gap-3 min-w-max">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              className={`px-3.5 sm:px-4 py-1.5 rounded-full text-xs font-medium transition-all whitespace-nowrap cursor-pointer flex items-center gap-2 ${
                selectedCategory === cat.id
                  ? 'bg-white text-[#0E0E0E] font-bold shadow-lg'
                  : 'bg-[#161614] text-[#A6A69F] hover:text-white hover:bg-[#20201D] border border-[#242422]'
              }`}
            >
              <span>{cat.label}</span>
              <span className={`text-[10px] px-1.5 py-0.2 rounded-full ${
                selectedCategory === cat.id ? 'bg-[#0E0E0E]/20 text-[#0E0E0E]' : 'bg-[#242422] text-[#888880]'
              }`}>
                {cat.count}
              </span>
            </button>
          ))}
        </div>
      </section>

      {/* Main Catalog Grid */}
      <main className="max-w-7xl mx-auto px-4 sm:px-8 md:px-12 py-8 sm:py-12">
        {isLoading ? (
          <div className="flex flex-col items-center justify-center py-20 space-y-4">
            <div className="w-10 h-10 border-2 border-[#8FC1A6]/30 border-t-[#8FC1A6] rounded-full animate-spin" />
            <p className="text-xs text-[#A6A69F] font-light">Chargement de la carte en direct...</p>
          </div>
        ) : loadError ? (
          <div className="max-w-md mx-auto p-6 bg-[#181816] border border-[#2A2A26] rounded-3xl text-center space-y-4">
            <AlertCircle className="w-8 h-8 text-amber-400 mx-auto" />
            <p className="text-xs text-[#D4E8DC]">{loadError}</p>
            <button
              onClick={loadMenuData}
              className="px-5 py-2 rounded-full bg-[#8FC1A6] text-[#0E0E0E] font-bold text-xs hover:bg-[#9ED4B5] transition-all"
            >
              Réessayer
            </button>
          </div>
        ) : filteredProducts.length === 0 ? (
          <div className="py-20 text-center space-y-3">
            <Coffee className="w-10 h-10 text-[#444440] mx-auto" />
            <p className="text-sm text-[#A6A69F] font-light">Aucun produit ne correspond à votre recherche.</p>
            <button
              onClick={() => {
                setSelectedCategory('all');
                setSelectedTag('all');
                setSearchQuery('');
              }}
              className="text-xs text-[#8FC1A6] underline cursor-pointer"
            >
              Réinitialiser les filtres
            </button>
          </div>
        ) : (
          <motion.div
            layout
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8"
          >
            <AnimatePresence>
              {filteredProducts.map((item, index) => {
                const isOutOfStock = item.availability === 'indisponible';

                return (
                  <motion.div
                    key={item.id}
                    layout
                    initial={{ opacity: 0, y: 16 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{ duration: 0.35, delay: Math.min(index * 0.02, 0.25) }}
                    id={`menu-card-${item.id}`}
                    onClick={() => {
                      if (!isOutOfStock && isOrderingAllowed) {
                        setCustomizingItem(item);
                      }
                    }}
                    className={`group relative bg-[#141412] rounded-2xl border transition-all duration-300 flex flex-col overflow-hidden text-left ${
                      isOutOfStock
                        ? 'opacity-60 border-[#1E1E1C] cursor-not-allowed'
                        : isOrderingAllowed
                          ? 'border-[#20201D] hover:border-[#8FC1A6]/50 cursor-pointer hover:shadow-[0_12px_36px_rgba(0,0,0,0.6)]'
                          : 'border-[#20201D] cursor-default'
                    }`}
                  >
                    {/* Image Header */}
                    <div className="relative h-44 sm:h-48 w-full overflow-hidden bg-[#0A0A0A]">
                      {item.photo ? (
                        <img
                          src={item.photo}
                          alt={item.name}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 filter brightness-[0.92] group-hover:brightness-100"
                          referrerPolicy="no-referrer"
                          loading="lazy"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center bg-[#181816] text-[#8FC1A6]/30">
                          <Coffee className="w-10 h-10" />
                        </div>
                      )}
                      <div className="absolute inset-0 bg-gradient-to-t from-[#141412] via-black/20 to-transparent pointer-events-none" />

                      {/* Price Pill */}
                      <div className="absolute top-3 right-3 px-3 py-1 rounded-full bg-[#0E0E0E]/85 backdrop-blur-md border border-white/10 text-[#F5F5F0] text-xs font-semibold shadow-lg">
                        {formatDT(item.price)}
                      </div>

                      {/* Out of Stock Overlay */}
                      {isOutOfStock && (
                        <div className="absolute inset-0 bg-black/70 flex items-center justify-center">
                          <span className="px-3 py-1 rounded-full bg-rose-950/80 border border-rose-800 text-rose-300 font-bold text-xs uppercase tracking-wider">
                            Épuisé temporairement
                          </span>
                        </div>
                      )}

                      {/* Top-Left Tag Badges */}
                      <div className="absolute top-3 left-3 flex flex-col gap-1.5">
                        {item.isFeatured && (
                          <span className="px-2.5 py-0.5 rounded-md bg-[#8FC1A6] text-[#0E0E0E] text-[10px] font-bold uppercase tracking-wider flex items-center gap-1 shadow-md">
                            <Sparkles className="w-2.5 h-2.5" /> Signature
                          </span>
                        )}
                      </div>
                    </div>

                    {/* Card Body */}
                    <div className="p-4 sm:p-5 flex flex-col flex-1 justify-between space-y-3">
                      <div>
                        {/* Category Indicator */}
                        <div className="flex items-center justify-between mb-1">
                          <span className="text-[10px] uppercase font-bold tracking-[0.2em] text-[#8FC1A6]">
                            {item.category}
                          </span>
                          {item.parameterGroups && item.parameterGroups.length > 0 && isOrderingAllowed && (
                            <span className="text-[10px] text-[#888880]">
                              Personnalisable
                            </span>
                          )}
                        </div>

                        {/* Title */}
                        <h3 className="font-serif-display text-lg sm:text-xl text-white font-normal leading-snug mb-1 group-hover:text-[#9ED4B5] transition-colors">
                          {item.name}
                        </h3>

                        {/* Description */}
                        {item.description && (
                          <p className="text-xs text-[#A6A69F] line-clamp-2 leading-relaxed mb-2 font-light">
                            {item.description}
                          </p>
                        )}

                        {/* Allergens if any */}
                        {item.allergens && item.allergens.length > 0 && (
                          <div className="flex flex-wrap gap-1 text-[10px] text-[#7A7A72]">
                            <span>Allergènes :</span>
                            <span className="text-[#A6A69F]">{item.allergens.join(', ')}</span>
                          </div>
                        )}
                      </div>

                      {/* Card Action Row - Gated by isOrderingAllowed (Part A.7) */}
                      <div className="pt-3 border-t border-[#1E1E1C] flex items-center justify-between">
                        {isOrderingAllowed ? (
                          <span className="text-[11px] text-[#8FC1A6] group-hover:text-[#9ED4B5] font-medium flex items-center gap-1 transition-colors">
                            <span>{isOutOfStock ? 'Indisponible' : 'Sélectionner & Personnaliser'}</span>
                            <ArrowUpRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                          </span>
                        ) : (
                          <span className="text-[11px] text-[#666660] font-light italic flex items-center gap-1">
                            <span>Dégustation sur place</span>
                          </span>
                        )}

                        <span className="font-serif text-xs sm:text-sm text-white font-medium">
                          {formatDT(item.price)}
                        </span>
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </AnimatePresence>
          </motion.div>
        )}
      </main>

      {/* Floating Bottom Cart Bar (Rendered ONLY when ordering is active & cart has items - Part A.7) */}
      <AnimatePresence>
        {isOrderingAllowed && totalCartCount > 0 && (
          <motion.div
            initial={{ y: 80, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 80, opacity: 0 }}
            className="fixed bottom-4 left-4 right-4 sm:left-auto sm:right-6 sm:w-96 z-40"
          >
            <button
              onClick={() => setIsCartOpen(true)}
              className="w-full bg-[#8FC1A6] hover:bg-[#9ED4B5] text-[#0E0E0E] p-3.5 rounded-2xl shadow-2xl flex items-center justify-between font-bold text-xs uppercase tracking-wider transition-all cursor-pointer border border-[#9ED4B5]/40"
            >
              <div className="flex items-center gap-2.5">
                <div className="w-7 h-7 rounded-xl bg-[#0E0E0E] text-white flex items-center justify-center text-xs">
                  {totalCartCount}
                </div>
                <span>Voir la commande {tableNumber ? `(${tableNumber})` : ''}</span>
              </div>
              <span className="font-serif text-sm font-bold lowercase">
                {formatDT(cartSubtotal)}
              </span>
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Customization Modal */}
      {isOrderingAllowed && (
        <CustomizeModal
          item={customizingItem as unknown as MenuItem}
          isOpen={Boolean(customizingItem)}
          onClose={() => setCustomizingItem(null)}
          onAddToCart={handleAddToCart}
        />
      )}

      {/* Cart Drawer (Strictly gated) */}
      {isOrderingAllowed && (
        <CartDrawer
          isOpen={isCartOpen}
          onClose={() => setIsCartOpen(false)}
          cartItems={cartItems}
          tableNumber={tableNumber}
          tableToken={activeTableToken}
          onUpdateQuantity={handleUpdateQuantity}
          onRemoveItem={handleRemoveItem}
          onClearCart={handleClearCart}
          onOrderSuccess={(orderResp) => setSubmittedOrder(orderResp)}
        />
      )}

      {/* Order Success Modal */}
      <OrderSuccessModal
        isOpen={Boolean(submittedOrder)}
        order={submittedOrder}
        onClose={() => setSubmittedOrder(null)}
      />

      {/* Footer Note */}
      <footer className="mt-16 sm:mt-20 pt-10 border-t border-[#1C1C1A] text-center px-4 sm:px-6">
        <div className="max-w-xl mx-auto space-y-4">
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4 text-xs text-[#7A7A72]">
            <span className="flex items-center gap-1.5">
              <MapPin className="w-3.5 h-3.5 text-[#8FC1A6]" /> Centre Makni, Rue Ahmed Ghanmi, Menzah 9
            </span>
            <span className="hidden sm:inline">•</span>
            <span className="flex items-center gap-1.5">
              <Clock className="w-3.5 h-3.5 text-[#8FC1A6]" /> 7j/7 dès 07h00
            </span>
          </div>

          <div className="pt-4">
            <button
              onClick={handleBackToHome}
              className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full bg-[#181816] hover:bg-[#222220] border border-[#2A2A26] text-xs text-[#F5F5F0] hover:text-[#8FC1A6] transition-all cursor-pointer"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Retourner à l'expérience Café Noir</span>
            </button>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default MenuPage;
