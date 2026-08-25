import React, { useState, useMemo, useEffect } from 'react';
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
} from 'lucide-react';
import { ApiMenuItem, WebCartItem, OrderSubmitResponse, SelectedOption, CustomizationOptions, MenuItem } from '../types';
import { fetchPublicMenu } from '../services/api';
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
  tableToken,
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

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' });
    loadMenuData();
  }, []);

  const formatDT = (amount: number) => {
    return `${amount.toFixed(3)} DT`;
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
      // Group by distinct categories in products
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

  // Cart operations
  const handleAddToCart = (
    item: MenuItem,
    _customization: CustomizationOptions,
    quantity: number,
    selectedOptions: SelectedOption[],
    customerNote?: string
  ) => {
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

  const totalCartCount = cartItems.reduce((acc, i) => acc + i.quantity, 0);
  const cartSubtotal = cartItems.reduce((acc, i) => acc + i.unitPrice * i.quantity, 0);

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

            {totalCartCount > 0 && (
              <button
                onClick={() => setIsCartOpen(true)}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#8FC1A6] text-[#0E0E0E] font-bold text-xs shadow-lg hover:bg-[#9ED4B5] transition-all cursor-pointer"
              >
                <ShoppingBag className="w-3.5 h-3.5" />
                <span>{totalCartCount}</span>
              </button>
            )}
          </div>
        </div>
      </header>

      {/* Table Information Banner */}
      {tableNumber && (
        <div className="bg-gradient-to-r from-[#17261E] via-[#141F1A] to-[#121211] border-b border-[#8FC1A6]/30 px-4 sm:px-8 py-3">
          <div className="max-w-7xl mx-auto flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs">
            <div className="flex items-center gap-2.5">
              <span className="w-2.5 h-2.5 rounded-full bg-[#8FC1A6] animate-ping" />
              <span className="text-[#D4E8DC] font-medium">
                Vous commandez pour : <strong className="text-white uppercase tracking-wider">{tableNumber}</strong>
              </span>
            </div>
            <span className="text-[#8FC1A6] text-[11px] font-medium">
              Vos boissons et plats seront servis directement à votre table • Règlement en salle
            </span>
          </div>
        </div>
      )}

      {/* Hero Banner Section */}
      <section className="relative w-full pt-8 pb-6 sm:pt-14 sm:pb-10 md:pt-16 md:pb-12 px-4 sm:px-8 md:px-16 lg:px-24 border-b border-[#1A1A18] overflow-hidden">
        {/* Subtle ambient gradients */}
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
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="font-sans text-xs sm:text-sm text-[#B8B8B0] font-light max-w-2xl mx-auto leading-relaxed"
          >
            Cafés de spécialité, extractions douces, thés raffinés et douceurs artisanales préparées chaque matin à Tunis.
          </motion.p>
        </div>
      </section>

      {/* Main Filter & Navigation Bar */}
      <section className="sticky top-[57px] sm:top-[65px] z-30 bg-[#0E0E0E]/95 backdrop-blur-xl border-b border-[#1E1E1C] px-4 sm:px-8 md:px-16 lg:px-24 py-3 shadow-lg">
        <div className="max-w-7xl mx-auto space-y-2.5">
          {/* Top Row: Search Input & Tag Filter Chips */}
          <div className="flex flex-col md:flex-row items-stretch md:items-center gap-2 sm:gap-3">
            {/* Search Input */}
            <div className="relative flex-1">
              <Search className="w-4 h-4 text-[#8FC1A6] absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                id="menu-search-input"
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Rechercher (ex: Espresso, Cappucin, Thé aux pignons, Croissant)..."
                className="w-full pl-10 pr-10 py-2 rounded-xl bg-[#161614] border border-[#262624] text-xs sm:text-sm text-[#F5F5F0] placeholder:text-[#6C6C66] focus:outline-none focus:border-[#8FC1A6] transition-colors"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-[#8FC1A6] hover:text-white p-1 cursor-pointer"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              )}
            </div>

            {/* Quick Tag Pills */}
            <div className="flex items-center gap-1.5 overflow-x-auto pb-1 md:pb-0 scrollbar-none">
              <span className="text-[10px] sm:text-[11px] tracking-wider uppercase text-[#8FC1A6] font-medium whitespace-nowrap mr-1 flex items-center gap-1 shrink-0">
                <SlidersHorizontal className="w-3 h-3" /> Filtre :
              </span>
              {quickTags.map((tag) => {
                const active = selectedTag === tag.id;
                return (
                  <button
                    key={tag.id}
                    onClick={() => setSelectedTag(active ? 'all' : tag.id)}
                    className={`text-[11px] sm:text-xs px-2.5 sm:px-3 py-1 rounded-lg font-medium whitespace-nowrap transition-all cursor-pointer shrink-0 ${
                      active
                        ? 'bg-[#8FC1A6] text-[#0E0E0E] font-semibold shadow-sm'
                        : 'bg-[#181816] text-[#A6A69F] hover:bg-[#222220] hover:text-white border border-[#242422]'
                    }`}
                  >
                    {tag.label}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Category Tabs */}
          <div className="flex items-center gap-2 overflow-x-auto pt-1 pb-1 scrollbar-none border-t border-[#1A1A18]">
            {categories.map((cat) => {
              const active = selectedCategory === cat.id;
              return (
                <button
                  key={cat.id}
                  onClick={() => setSelectedCategory(cat.id)}
                  className={`relative flex items-center gap-2 px-3.5 sm:px-4 py-1.5 rounded-xl text-xs transition-all whitespace-nowrap cursor-pointer shrink-0 ${
                    active
                      ? 'bg-[#8FC1A6] text-[#0E0E0E] font-semibold shadow-md'
                      : 'bg-[#141412] text-[#B8B8B0] hover:bg-[#1E1E1C] hover:text-white border border-[#20201D]'
                  }`}
                >
                  <span>{cat.label}</span>
                  <span
                    className={`text-[10px] px-1.5 py-0.2 rounded-full ${
                      active ? 'bg-[#0E0E0E]/20 text-[#0E0E0E] font-bold' : 'bg-[#222220] text-[#7A7A72]'
                    }`}
                  >
                    {cat.count}
                  </span>
                </button>
              );
            })}
          </div>
        </div>
      </section>

      {/* Error banner if network down */}
      {loadError && (
        <div className="max-w-7xl mx-auto px-4 sm:px-8 mt-4">
          <div className="bg-amber-950/40 border border-amber-800/50 rounded-2xl p-4 flex items-center justify-between gap-4 text-xs text-amber-200">
            <div className="flex items-center gap-2.5">
              <AlertCircle className="w-4 h-4 text-amber-400 shrink-0" />
              <span>{loadError}</span>
            </div>
            <button
              onClick={loadMenuData}
              className="px-3 py-1.5 rounded-xl bg-amber-500/20 hover:bg-amber-500/30 text-amber-200 font-bold flex items-center gap-1.5 cursor-pointer shrink-0"
            >
              <RefreshCw className="w-3.5 h-3.5" />
              <span>Réessayer</span>
            </button>
          </div>
        </div>
      )}

      {/* Main Grid: Loading Skeleton or Products */}
      <main className="max-w-7xl mx-auto px-4 sm:px-8 md:px-16 lg:px-24 pt-8">
        {isLoading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
            {[1, 2, 3, 4, 5, 6].map((idx) => (
              <div
                key={idx}
                className="bg-[#141412] rounded-2xl border border-[#20201D] p-4 space-y-4 animate-pulse"
              >
                <div className="h-44 bg-[#1A1A18] rounded-xl" />
                <div className="space-y-2">
                  <div className="h-4 bg-[#20201D] rounded w-2/3" />
                  <div className="h-3 bg-[#1B1B19] rounded w-full" />
                  <div className="h-3 bg-[#1B1B19] rounded w-4/5" />
                </div>
                <div className="flex justify-between items-center pt-2">
                  <div className="h-4 bg-[#20201D] rounded w-16" />
                  <div className="h-7 bg-[#20201D] rounded-xl w-24" />
                </div>
              </div>
            ))}
          </div>
        ) : filteredProducts.length === 0 ? (
          <div className="text-center py-16 bg-[#141412] rounded-3xl border border-[#222220] p-6 max-w-lg mx-auto">
            <Coffee className="w-10 h-10 text-[#8FC1A6]/50 mx-auto mb-3" />
            <h3 className="font-serif-display text-xl text-white mb-2">Aucun produit trouvé</h3>
            <p className="text-xs text-[#888880] mb-5 leading-relaxed">
              Nous n'avons pas trouvé d'article correspondant à votre recherche.
            </p>
            <button
              onClick={() => {
                setSearchQuery('');
                setSelectedCategory('all');
                setSelectedTag('all');
              }}
              className="text-xs font-semibold px-4 py-2 rounded-xl bg-[#8FC1A6] text-[#0E0E0E] hover:bg-[#9ED4B5] transition-colors cursor-pointer"
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
                      if (!isOutOfStock) {
                        setCustomizingItem(item);
                      }
                    }}
                    className={`group relative bg-[#141412] rounded-2xl border transition-all duration-300 flex flex-col overflow-hidden text-left ${
                      isOutOfStock
                        ? 'opacity-60 border-[#1E1E1C] cursor-not-allowed'
                        : 'border-[#20201D] hover:border-[#8FC1A6]/50 cursor-pointer hover:shadow-[0_12px_36px_rgba(0,0,0,0.6)]'
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
                          {item.parameterGroups && item.parameterGroups.length > 0 && (
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

                      {/* Card Action Row */}
                      <div className="pt-3 border-t border-[#1E1E1C] flex items-center justify-between">
                        <span className="text-[11px] text-[#8FC1A6] group-hover:text-[#9ED4B5] font-medium flex items-center gap-1 transition-colors">
                          <span>{isOutOfStock ? 'Indisponible' : 'Sélectionner & Personnaliser'}</span>
                          <ArrowUpRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                        </span>

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

      {/* Floating Bottom Cart Bar (if items in cart) */}
      <AnimatePresence>
        {totalCartCount > 0 && (
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
      <CustomizeModal
        item={customizingItem as unknown as MenuItem}
        isOpen={Boolean(customizingItem)}
        onClose={() => setCustomizingItem(null)}
        onAddToCart={handleAddToCart}
      />

      {/* Cart Drawer */}
      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        cartItems={cartItems}
        tableNumber={tableNumber}
        tableToken={tableToken}
        onUpdateQuantity={handleUpdateQuantity}
        onRemoveItem={handleRemoveItem}
        onClearCart={handleClearCart}
        onOrderSuccess={(orderResp) => setSubmittedOrder(orderResp)}
      />

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
