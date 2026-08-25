import React from 'react';
import { motion } from 'motion/react';
import { ArrowUpRight } from 'lucide-react';

interface MenuCtaSectionProps {
  onNavigateToMenu?: () => void;
}

export const MenuCtaSection: React.FC<MenuCtaSectionProps> = ({ onNavigateToMenu }) => {
  const handleClick = () => {
    if (onNavigateToMenu) {
      onNavigateToMenu();
    } else {
      window.history.pushState({}, '', '/menu');
      window.dispatchEvent(new Event('popstate'));
    }
  };

  return (
    <section
      id="menu-cta"
      className="relative w-full py-20 sm:py-28 lg:py-32 px-6 sm:px-12 md:px-16 lg:px-24 bg-[#0E0E0E] text-[#F5F5F0] border-t border-[#1C1C1A] overflow-hidden"
    >
      {/* Subtle ambient background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] bg-[#8FC1A6]/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-6xl mx-auto relative z-10">
        <div className="rounded-3xl bg-gradient-to-b from-[#141412] to-[#10100E] border border-[#242422] p-8 sm:p-12 md:p-16 lg:p-20 shadow-2xl relative overflow-hidden">
          {/* Subtle decorative background watermark */}
          <div className="absolute -right-12 -bottom-12 opacity-[0.03] select-none pointer-events-none">
            <span className="font-serif-display text-[220px] font-bold leading-none text-white">
              CN
            </span>
          </div>

          <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-10 lg:gap-16">
            {/* Left Content Column */}
            <div className="space-y-6 max-w-2xl text-left">
              {/* Section Subtitle Eyebrow matching other sections without background badge */}
              <motion.div
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-60px' }}
                transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
                className="mb-2"
              >
                <span className="font-sans text-xs tracking-[0.32em] uppercase text-[#8FC1A6] font-medium">
                  Carte & Dégustation
                </span>
              </motion.div>

              {/* Headline */}
              <h2 className="font-serif-display text-3xl sm:text-4xl md:text-5xl lg:text-6xl text-white font-normal leading-[1.08] tracking-tight">
                Explorez l'intégralité de nos créations & terroirs
              </h2>

              {/* Paragraph */}
              <p className="font-sans text-sm sm:text-base text-[#B8B8B0] font-light leading-relaxed">
                De nos extractions espresso d'altitude aux méthodes douces V60, en passant par nos boissons fraîches infusées à froid et nos douceurs de boulangerie artisanale.
              </p>
            </div>

            {/* Right Action Column */}
            <div className="flex flex-col items-start lg:items-end shrink-0 w-full lg:w-auto">
              <button
                id="btn-discover-menu"
                onClick={handleClick}
                className="group relative inline-flex items-center justify-center gap-3 px-8 py-4 rounded-2xl bg-[#8FC1A6] hover:bg-[#9ED4B5] text-[#0E0E0E] font-semibold text-sm sm:text-base transition-all duration-300 shadow-[0_8px_24px_rgba(143,193,166,0.25)] hover:shadow-[0_12px_32px_rgba(143,193,166,0.4)] cursor-pointer w-full sm:w-auto text-center"
              >
                <span>Découvrir la Carte Complète</span>
                <ArrowUpRight className="w-5 h-5 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default MenuCtaSection;
