import React, { useState, useEffect } from 'react';
import { Coffee, ShoppingBag, Calendar, Menu as MenuIcon, X, Clock, MapPin } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface NavbarProps {
  cartCount: number;
  cartTotal: number;
  onOpenCart: () => void;
  onOpenReservation: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  cartCount,
  cartTotal,
  onOpenCart,
  onOpenReservation,
}) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isOpenNow, setIsOpenNow] = useState(true);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Check cafe opening hours based on real local time
  useEffect(() => {
    const checkOpenStatus = () => {
      const now = new Date();
      const hour = now.getHours();
      // Cafe open 6:30 AM to 8:00 PM (hour 6 to 20)
      setIsOpenNow(hour >= 6 && hour < 20);
    };
    checkOpenStatus();
    const interval = setInterval(checkOpenStatus, 60000);
    return () => clearInterval(interval);
  }, []);

  const navLinks = [
    { label: 'Menu', href: '#menu' },
    { label: 'Fresh Beans', href: '#beans' },
    { label: 'Coffee Finder', href: '#quiz' },
    { label: 'Our Story', href: '#story' },
    { label: 'Hours & Location', href: '#visit' },
  ];

  const handleLinkClick = (href: string) => {
    setMobileMenuOpen(false);
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header
      id="main-navbar"
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
        isScrolled
          ? 'bg-[#FAF7F2]/95 backdrop-blur-md shadow-sm border-b border-[#E8DFC8]/60 py-3.5'
          : 'bg-[#FAF7F2]/80 backdrop-blur-sm py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Logo Brand */}
          <a
            href="#"
            className="flex items-center gap-3 group focus:outline-none focus-visible:ring-2 focus-visible:ring-[#8C5E3C]"
            id="nav-brand-link"
          >
            <div className="w-10 h-10 rounded-full bg-[#3D2619] text-[#FAF7F2] flex items-center justify-center shadow-inner group-hover:bg-[#5C3A24] transition-colors">
              <Coffee className="w-5 h-5 text-[#D4A373]" />
            </div>
            <div>
              <span className="block font-serif text-xl font-bold tracking-wider text-[#2C241E] uppercase leading-none">
                Amber & Oak
              </span>
              <span className="text-[10px] tracking-[0.2em] font-medium text-[#8C5E3C] uppercase">
                Coffee Roasters
              </span>
            </div>
          </a>

          {/* Center Navigation Links (Desktop) */}
          <nav className="hidden lg:flex items-center gap-8" id="desktop-nav">
            {navLinks.map((link) => (
              <button
                key={link.label}
                onClick={() => handleLinkClick(link.href)}
                className="text-sm font-medium text-[#4A3E37] hover:text-[#8C5E3C] transition-colors relative py-1 focus:outline-none focus-visible:ring-1 focus-visible:ring-[#8C5E3C] cursor-pointer"
              >
                {link.label}
              </button>
            ))}
          </nav>

          {/* Right Action Controls */}
          <div className="flex items-center gap-3">
            {/* Status indicator (Pill) */}
            <div className="hidden sm:flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-[#EFE9DF] border border-[#E0D7C9] text-xs font-medium text-[#54463D]">
              <span
                className={`w-2 h-2 rounded-full ${
                  isOpenNow ? 'bg-emerald-500 animate-pulse' : 'bg-amber-600'
                }`}
              />
              <span>{isOpenNow ? 'Open Now (Till 8PM)' : 'Opens at 6:30 AM'}</span>
            </div>

            {/* Table Reservation Button */}
            <button
              id="nav-reserve-btn"
              onClick={onOpenReservation}
              className="hidden md:inline-flex items-center gap-1.5 text-xs font-semibold px-3.5 py-2 rounded-lg bg-[#EAE2D5] text-[#3D2619] hover:bg-[#DDD3C2] transition-colors cursor-pointer"
            >
              <Calendar className="w-3.5 h-3.5 text-[#8C5E3C]" />
              <span>Reserve Table</span>
            </button>

            {/* Cart Button */}
            <button
              id="nav-cart-btn"
              onClick={onOpenCart}
              aria-label="View shopping bag"
              className="relative flex items-center gap-2 px-3.5 py-2 rounded-lg bg-[#3D2619] text-[#FAF7F2] hover:bg-[#533522] transition-colors shadow-sm focus:outline-none focus:ring-2 focus:ring-[#8C5E3C] cursor-pointer"
            >
              <ShoppingBag className="w-4 h-4 text-[#D4A373]" />
              <span className="text-xs font-semibold">
                {cartCount > 0 ? `$${cartTotal.toFixed(2)}` : 'Cart'}
              </span>
              {cartCount > 0 && (
                <span className="w-5 h-5 -ml-0.5 rounded-full bg-[#D4A373] text-[#2C241E] text-[11px] font-bold flex items-center justify-center">
                  {cartCount}
                </span>
              )}
            </button>

            {/* Mobile Menu Toggle Button */}
            <button
              id="mobile-menu-toggle-btn"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 rounded-lg text-[#3D2619] hover:bg-[#EFE9DF] transition-colors focus:outline-none"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <MenuIcon className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="lg:hidden bg-[#FAF7F2] border-b border-[#E8DFC8] px-4 pt-3 pb-6 shadow-xl"
          >
            <div className="flex flex-col space-y-3">
              <div className="flex items-center gap-2 py-2 border-b border-[#EFE9DF] text-xs text-[#6C594E]">
                <Clock className="w-3.5 h-3.5 text-[#8C5E3C]" />
                <span>Today: 6:30 AM – 8:00 PM</span>
                <span className="mx-1">•</span>
                <MapPin className="w-3.5 h-3.5 text-[#8C5E3C]" />
                <span>428 Oakwood Blvd</span>
              </div>

              {navLinks.map((link) => (
                <button
                  key={link.label}
                  onClick={() => handleLinkClick(link.href)}
                  className="text-left py-2 px-3 rounded-md text-sm font-semibold text-[#2C241E] hover:bg-[#EFE9DF] transition-colors"
                >
                  {link.label}
                </button>
              ))}

              <div className="pt-2 flex flex-col gap-2">
                <button
                  onClick={() => {
                    setMobileMenuOpen(false);
                    onOpenReservation();
                  }}
                  className="w-full flex items-center justify-center gap-2 py-2.5 rounded-lg bg-[#EAE2D5] text-[#3D2619] font-semibold text-sm hover:bg-[#DFD5C4]"
                >
                  <Calendar className="w-4 h-4 text-[#8C5E3C]" />
                  Book Table / Nook
                </button>
                <button
                  onClick={() => {
                    setMobileMenuOpen(false);
                    onOpenCart();
                  }}
                  className="w-full flex items-center justify-center gap-2 py-2.5 rounded-lg bg-[#3D2619] text-[#FAF7F2] font-semibold text-sm hover:bg-[#533522]"
                >
                  <ShoppingBag className="w-4 h-4 text-[#D4A373]" />
                  View Bag ({cartCount} {cartCount === 1 ? 'item' : 'items'} • ${cartTotal.toFixed(2)})
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};
