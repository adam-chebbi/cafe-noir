import React from 'react';
import { motion } from 'motion/react';
import { ChevronRight } from 'lucide-react';
import { IrisScrollMask } from './IrisScrollMask';

export const HeroSection: React.FC = () => {
  const scrollToEssence = () => {
    const el = document.getElementById('essence');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="hero" className="relative w-full bg-[#0a0a0a] text-[#F5F5F0] select-none">
      {/* 
        Iris Scroll Mask Reveal System
        Configured to exact specifications:
        - Image: https://i.ibb.co/sJWv8vZQ/hero-bg.png
        - 9 coordinated columns/segments
        - Stagger: 0.55
        - Settle: 0.84
        - Origin: 50% 50%
        - Radius: 18px
        - Angle: 108deg
        - Smooth lerp: 0.14
        - Overlay: 0.34
        - Scroll length: 1.7vh
        - Feather: 14%
        - Zoom: 1.14
        - Background: #0a0a0a
      */}
      <IrisScrollMask
        image="https://i.ibb.co/sJWv8vZQ/hero-bg.png"
        variant="iris"
        columns={9}
        settle={0.84}
        stagger={0.55}
        originX={50}
        originY={50}
        radius={18}
        fit="cover"
        smooth={0.14}
        angle={108}
        overlay={0.34}
        scrollLength={1.7}
        feather={14}
        zoom={1.14}
        background="#0a0a0a"
      >
        {/* Top flex spacer pushing headline to the lower third */}
        <div className="flex-1 min-h-[28vh] sm:min-h-[36vh] lg:min-h-[40vh] w-full pointer-events-none" />

        {/* 
          Main Headline:
          "Café Noir" — Solid white luxury serif display.
          Subheading: "UN LIEU, UNE ÉMOTION" in bright crisp uppercase.
        */}
        <div className="relative z-30 px-6 sm:px-12 md:px-16 lg:px-24 mb-4 sm:mb-6 lg:mb-8 max-w-5xl">
          <h1 className="font-serif-display text-5xl sm:text-7xl md:text-8xl lg:text-9xl leading-[0.94] tracking-tight mb-3 sm:mb-4">
            <motion.span
              initial={{ opacity: 0, y: 36, filter: 'blur(6px)' }}
              animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
              transition={{ duration: 0.85, delay: 0.35, ease: [0.22, 1, 0.36, 1] }}
              className="inline-block font-normal text-white drop-shadow-[0_4px_24px_rgba(0,0,0,0.9)]"
            >
              Café Noir
            </motion.span>
          </h1>

          {/* Subheading: "UN LIEU, UNE ÉMOTION" */}
          <motion.p
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.65, ease: [0.22, 1, 0.36, 1] }}
            className="font-sans text-xs sm:text-sm md:text-base tracking-[0.32em] uppercase text-[#FFFFFF] font-normal mt-3 sm:mt-4 drop-shadow-[0_2px_12px_rgba(0,0,0,0.9)]"
          >
            Un lieu, une émotion
          </motion.p>
        </div>

        {/* 
          Bottom Elements:
          - Bottom-Left: Thin vertical white line + "DÉFILER" / "POUR EXPLORER"
          - Bottom-Right: Large circular outlined button with "ENTRER DANS" / "L'EXPÉRIENCE" + inner sage-green circle CTA button
        */}
        <div className="relative z-30 w-full pb-8 sm:pb-10 md:pb-12 px-6 sm:px-12 md:px-16 lg:px-24 flex justify-between items-end">
          {/* Bottom-Left: Scroll cue */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.95, ease: [0.22, 1, 0.36, 1] }}
            className="flex flex-col items-start"
          >
            {/* Short thin vertical white line */}
            <div className="w-[1px] h-8 bg-white/70 mb-3" />
            <p className="font-sans text-[10px] sm:text-[11px] tracking-[0.28em] uppercase text-[#F5F5F0] font-medium leading-relaxed drop-shadow-[0_2px_8px_rgba(0,0,0,0.8)]">
              Défiler<br />
              Pour explorer
            </p>
          </motion.div>

          {/* Bottom-Right: Circular CTA button */}
          <motion.div
            initial={{ opacity: 0, scale: 0.85 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.85, delay: 1.05, ease: [0.22, 1, 0.36, 1] }}
            className="relative"
          >
            <motion.div
              animate={{
                scale: [1, 1.03, 1],
              }}
              transition={{
                duration: 4.2,
                repeat: Infinity,
                ease: 'easeInOut',
              }}
              className="group relative w-36 h-36 sm:w-44 sm:h-44 rounded-full border border-white/60 hover:border-[#8FC1A6] bg-black/40 hover:bg-black/60 backdrop-blur-[6px] flex flex-col items-center justify-center p-3 text-center transition-all duration-500 cursor-pointer shadow-[0_8px_32px_rgba(0,0,0,0.6)]"
              onClick={scrollToEssence}
            >
              {/* Two lines of small tracked-out uppercase white text */}
              <div className="mb-2">
                <span className="block font-sans text-[10px] sm:text-[11px] tracking-[0.24em] uppercase text-[#F5F5F0] font-medium leading-tight">
                  Entrer dans
                </span>
                <span className="block font-sans text-[10px] sm:text-[11px] tracking-[0.24em] uppercase text-[#F5F5F0] font-medium leading-tight">
                  L'expérience
                </span>
              </div>

              {/* Smaller solid sage-green filled circle containing white right-facing chevron/arrow icon */}
              <motion.button
                id="hero-cta-arrow-btn"
                whileHover={{ scale: 1.15 }}
                whileTap={{ scale: 0.95 }}
                className="w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-[#8FC1A6] group-hover:bg-[#9ED4B5] flex items-center justify-center text-[#0E0E0E] shadow-md transition-all duration-300 focus:outline-none cursor-pointer"
                aria-label="Entrer dans l'expérience"
              >
                <ChevronRight className="w-4 h-4 sm:w-5 sm:h-5 text-[#0E0E0E] translate-x-[1px]" strokeWidth={2.5} />
              </motion.button>
            </motion.div>
          </motion.div>
        </div>
      </IrisScrollMask>
    </section>
  );
};
