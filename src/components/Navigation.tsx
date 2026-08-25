import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ArrowUpRight } from 'lucide-react';

interface NavigationProps {
  currentSection?: string;
  onOpenChange?: (isOpen: boolean) => void;
}

export const Navigation: React.FC<NavigationProps> = ({ onOpenChange }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isBeigeSection, setIsBeigeSection] = useState(false);

  const handleToggle = () => {
    setIsOpen((prev) => {
      const next = !prev;
      onOpenChange?.(next);
      return next;
    });
  };

  const handleClose = () => {
    setIsOpen(false);
    onOpenChange?.(false);
  };

  // Disable background scrolling on the single page when menu overlay is open
  useEffect(() => {
    if (isOpen) {
      const prevBodyOverflow = document.body.style.overflow;
      const prevHtmlOverflow = document.documentElement.style.overflow;
      document.body.style.overflow = 'hidden';
      document.documentElement.style.overflow = 'hidden';

      return () => {
        document.body.style.overflow = prevBodyOverflow;
        document.documentElement.style.overflow = prevHtmlOverflow;
      };
    }
  }, [isOpen]);

  useEffect(() => {
    const handleScroll = () => {
      const envSection = document.getElementById('environnement');
      if (envSection) {
        const rect = envSection.getBoundingClientRect();
        // Check if viewport top is within the light beige section
        if (rect.top <= 60 && rect.bottom >= 60) {
          setIsBeigeSection(true);
        } else {
          setIsBeigeSection(false);
        }
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollTo = (id: string) => {
    handleClose();
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const navigateToMenu = () => {
    setIsOpen(false);
    window.history.pushState({}, '', '/menu');
    window.dispatchEvent(new Event('popstate'));
  };

  return (
    <>
      {/* 
        Fixed Top Bar (Stays visible & fixed across all 5 sections on desktop and mobile):
        - Top-Left: 3 horizontal lines + tracked-out uppercase "MENU"
        - Top-Right: Tracked-out uppercase "AMBIANCE" + solid sage-green dot
      */}
      <header className="fixed top-0 left-0 w-full z-50 pointer-events-none pt-6 px-5 sm:px-10 md:pt-10 md:px-14 lg:px-16 flex justify-between items-center transition-colors duration-500">
        
        {/* Top-Left: Hamburger + Menu */}
        <div className="pointer-events-auto">
          <button
            id="global-menu-btn"
            onClick={handleToggle}
            className="group flex items-center gap-3.5 focus:outline-none cursor-pointer py-1.5 px-2 rounded-lg bg-black/20 md:bg-transparent backdrop-blur-md md:backdrop-blur-none"
            aria-label={isOpen ? "Fermer le menu" : "Ouvrir le menu"}
          >
            {/* Three short horizontal lines, evenly stacked */}
            <div className="w-5 h-3.5 flex flex-col justify-between items-start">
              <span
                className={`h-[1.5px] transition-all duration-300 ${
                  isOpen
                    ? 'w-5 translate-y-[5.5px] rotate-45 bg-[#F5F5F0]'
                    : isBeigeSection
                    ? 'w-5 bg-[#121212] group-hover:bg-[#4E7A63]'
                    : 'w-5 bg-[#F5F5F0] group-hover:bg-[#8FC1A6]'
                }`}
              />
              <span
                className={`h-[1.5px] transition-all duration-300 ${
                  isOpen
                    ? 'opacity-0 bg-[#F5F5F0]'
                    : isBeigeSection
                    ? 'w-5 bg-[#121212] group-hover:bg-[#4E7A63]'
                    : 'w-5 bg-[#F5F5F0] group-hover:bg-[#8FC1A6]'
                }`}
              />
              <span
                className={`h-[1.5px] transition-all duration-300 ${
                  isOpen
                    ? 'w-5 -translate-y-[5.5px] -rotate-45 bg-[#F5F5F0]'
                    : isBeigeSection
                    ? 'w-5 bg-[#121212] group-hover:bg-[#4E7A63]'
                    : 'w-5 bg-[#F5F5F0] group-hover:bg-[#8FC1A6]'
                }`}
              />
            </div>

            <span
              className={`font-sans text-xs tracking-[0.28em] uppercase transition-colors duration-300 font-medium ${
                isOpen
                  ? 'text-[#F5F5F0]'
                  : isBeigeSection
                  ? 'text-[#121212] group-hover:text-[#4E7A63]'
                  : 'text-[#F5F5F0] group-hover:text-[#8FC1A6]'
              }`}
            >
              {isOpen ? 'Fermer' : 'Menu'}
            </span>
          </button>
        </div>

        {/* Top-Right: Ambiance + Sage Dot */}
        <div className="pointer-events-auto">
          <button
            id="global-ambiance-btn"
            onClick={() => scrollTo('environnement')}
            className="group flex items-center gap-3 focus:outline-none cursor-pointer py-1.5 px-2.5 rounded-lg bg-black/20 md:bg-transparent backdrop-blur-md md:backdrop-blur-none"
            aria-label="Aller à la section ambiance"
          >
            <span
              className={`font-sans text-xs tracking-[0.28em] uppercase transition-colors duration-300 font-medium ${
                isOpen
                  ? 'text-[#F5F5F0]'
                  : isBeigeSection
                  ? 'text-[#121212] group-hover:text-[#4E7A63]'
                  : 'text-[#F5F5F0] group-hover:text-[#8FC1A6]'
              }`}
            >
              Ambiance
            </span>
            <motion.span
              animate={{
                scale: [1, 1.2, 1],
                opacity: [0.8, 1, 0.8],
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                ease: 'easeInOut',
              }}
              className="w-2 h-2 rounded-full bg-[#8FC1A6] shadow-[0_0_8px_rgba(143,193,166,0.6)]"
            />
          </button>
        </div>
      </header>

      {/* Editorial Overlay Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
            className="fixed inset-0 z-40 bg-[#0E0E0E]/98 backdrop-blur-2xl flex flex-col justify-between p-6 sm:p-10 md:p-14 lg:p-20 overflow-y-auto overscroll-contain"
          >
            {/* Top row */}
            <div className="flex justify-between items-center pt-16 md:pt-2 border-b border-[#222220] pb-5 shrink-0">
              <span className="font-sans text-xs tracking-[0.28em] uppercase text-[#8FC1A6]">
                Maison de Café & Torréfaction
              </span>
              <span className="font-sans text-xs tracking-[0.28em] uppercase text-[#B8B8B0] hidden sm:inline-block">
                Tunis • 2026
              </span>
            </div>

            {/* Main Navigation Links matching the assembled sections */}
            <div className="my-8 md:my-auto max-w-4xl w-full">
              <ul className="space-y-5 md:space-y-7">
                {[
                  { num: '01', title: 'Accueil', id: 'hero', desc: "L'art de l'espresso & torréfaction" },
                  { num: '02', title: "L'Essence", id: 'essence', desc: 'Philosophie & terroirs rares' },
                  { num: '03', title: 'Carte & Dégustation', id: 'menu-cta', desc: 'Découvrir la carte complète' },
                  { num: '04', title: "L'Environnement", id: 'environnement', desc: 'Le salon lumineux & boiseries' },
                  { num: '05', title: 'Nos Valeurs', id: 'valeurs', desc: 'Sélection, passion & convivialité' },
                  { num: '06', title: 'Mentions & Contact', id: 'footer', desc: 'Informations & communauté' },
                ].map((item, idx) => (
                  <motion.li
                    key={item.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.08 + idx * 0.05, duration: 0.4 }}
                    className="group"
                  >
                    <button
                      onClick={() => scrollTo(item.id)}
                      className="w-full flex items-baseline justify-between text-left border-b border-[#1E1E1C] pb-3.5 group-hover:border-[#8FC1A6]/40 transition-colors cursor-pointer"
                    >
                      <div className="flex items-baseline gap-5 md:gap-8">
                        <span className="font-mono text-xs text-[#8FC1A6] tracking-widest">
                          {item.num}
                        </span>
                        <span className="font-serif-display text-2xl sm:text-4xl md:text-5xl text-[#F5F5F0] group-hover:text-[#9ED4B5] group-hover:translate-x-2 transition-all duration-300">
                          {item.title}
                        </span>
                      </div>
                      <div className="hidden md:flex items-center gap-3 text-[#B8B8B0] group-hover:text-[#F5F5F0] text-sm font-light">
                        <span>{item.desc}</span>
                        <ArrowUpRight className="w-4 h-4 text-[#8FC1A6] opacity-0 group-hover:opacity-100 transition-opacity" />
                      </div>
                    </button>
                  </motion.li>
                ))}
              </ul>
            </div>

            {/* Bottom info */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-5 border-t border-[#222220] text-xs text-[#B8B8B0] font-light shrink-0">
              <div>
                <p className="font-sans text-[11px] tracking-[0.28em] uppercase text-[#8FC1A6] mb-1 font-medium">
                  Salon de Dégustation
                </p>
                <p>Centre Makni, Rue Ahmed Ghanmi, Tunis 1013</p>
              </div>
              <div className="sm:text-right">
                <p className="font-sans text-[11px] tracking-[0.28em] uppercase text-[#8FC1A6] mb-1 font-medium">
                  Contact
                </p>
                <p>Téléphone : 28 866 777</p>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
