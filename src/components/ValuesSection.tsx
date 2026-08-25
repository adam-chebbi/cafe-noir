import React from 'react';
import { motion } from 'motion/react';
import { Leaf, Flame, Heart, Sparkles } from 'lucide-react';

interface ValuePillar {
  id: string;
  icon: React.ElementType;
  heading: string;
  body: string;
}

const VALUE_PILLARS: ValuePillar[] = [
  {
    id: 'selection',
    icon: Leaf,
    heading: 'Sélection',
    body: 'Des ingrédients soigneusement choisis.',
  },
  {
    id: 'passion',
    icon: Flame,
    heading: 'Passion',
    body: "L'amour du détail et du travail bien fait.",
  },
  {
    id: 'convivialite',
    icon: Heart,
    heading: 'Convivialité',
    body: 'Un accueil sincère dans une ambiance chaleureuse.',
  },
  {
    id: 'creativite',
    icon: Sparkles,
    heading: 'Créativité',
    body: "L'envie d'innover et de surprendre en douceur.",
  },
];

export const ValuesSection: React.FC = () => {
  return (
    <section
      id="valeurs"
      className="relative w-full bg-[#0E0E0E] text-[#F5F5F0] py-20 sm:py-32 lg:py-40 px-6 sm:px-12 md:px-16 lg:px-24 overflow-hidden border-t border-[#1C1C1A]"
    >
      <div className="w-full max-w-7xl mx-auto flex flex-col items-start justify-center">
        
        {/* =========================================================================
            TOP INTRO CONTENT (Left-aligned)
            ========================================================================= */}
        <div className="mb-20 sm:mb-24 lg:mb-28 max-w-4xl text-left">
          {/* 1. Small tracked-out uppercase sage-green eyebrow label */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="mb-8"
          >
            <span className="font-sans text-xs tracking-[0.32em] uppercase text-[#8FC1A6] font-medium">
              Nos valeurs
            </span>
          </motion.div>

          {/* 2. Large serif headline spanning two lines */}
          <h2 className="font-serif-display text-4xl sm:text-6xl md:text-7xl lg:text-7xl xl:text-8xl leading-[1.08] tracking-tight">
            {/* Line 1: "Ce qui nous" in white */}
            <motion.span
              initial={{ opacity: 0, y: 28 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.8, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
              className="block text-[#F5F5F0] font-normal"
            >
              Ce qui nous
            </motion.span>

            {/* Line 2: "anime " (sage-green) + "chaque jour." (white) on the same line */}
            <motion.span
              initial={{ opacity: 0, y: 28 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.8, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
              className="block font-normal"
            >
              <span className="text-[#8FC1A6]">anime </span>
              <span className="text-[#F5F5F0]">chaque jour.</span>
            </motion.span>
          </h2>
        </div>

        {/* =========================================================================
            FOUR-COLUMN VALUE ROW
            ========================================================================= */}
        <div className="w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12 sm:gap-10 lg:gap-12">
          {VALUE_PILLARS.map((pillar, idx) => {
            const IconComponent = pillar.icon;
            const columnDelay = 0.3 + idx * 0.12;

            return (
              <div
                key={pillar.id}
                id={`valeur-${pillar.id}`}
                className="flex flex-col items-start text-left"
              >
                {/* 1. Minimalist single-line outline icon (white line-art, no fill, strokeWidth 1.25) */}
                <motion.div
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-60px' }}
                  transition={{
                    duration: 0.6,
                    delay: columnDelay,
                    ease: [0.22, 1, 0.36, 1],
                  }}
                  className="mb-6 text-white flex items-center justify-start"
                >
                  <IconComponent
                    className="w-6 h-6 text-white"
                    strokeWidth={1.25}
                  />
                </motion.div>

                {/* 2. Small tracked-out uppercase white heading */}
                <motion.h3
                  initial={{ opacity: 0, y: 14 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-60px' }}
                  transition={{
                    duration: 0.6,
                    delay: columnDelay + 0.08,
                    ease: [0.22, 1, 0.36, 1],
                  }}
                  className="font-sans text-xs sm:text-sm tracking-[0.28em] uppercase text-[#F5F5F0] font-medium mb-3"
                >
                  {pillar.heading}
                </motion.h3>

                {/* 3. Small grey body text beneath */}
                <motion.p
                  initial={{ opacity: 0, y: 14 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-60px' }}
                  transition={{
                    duration: 0.6,
                    delay: columnDelay + 0.16,
                    ease: [0.22, 1, 0.36, 1],
                  }}
                  className="font-sans text-xs sm:text-sm text-[#8E8E88] font-light leading-relaxed mb-6 max-w-xs"
                >
                  {pillar.body}
                </motion.p>

                {/* 4. Short thin horizontal sage-green line beneath text drawing left to right */}
                <motion.div
                  initial={{ scaleX: 0 }}
                  whileInView={{ scaleX: 1 }}
                  viewport={{ once: true, margin: '-60px' }}
                  transition={{
                    duration: 0.65,
                    delay: columnDelay + 0.24,
                    ease: [0.22, 1, 0.36, 1],
                  }}
                  className="origin-left w-8 h-[1px] bg-[#8FC1A6]"
                />
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
