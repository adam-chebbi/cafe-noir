import React, { useState, useEffect, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'motion/react';

interface ValueContent {
  id: string;
  label: string;
  headlineLine1: string;
  headlineLine2: string;
  paragraph: string;
}

const VALUES_DATA: ValueContent[] = [
  {
    id: 'authenticite',
    label: 'Authenticité',
    headlineLine1: "Plus qu'un café,",
    headlineLine2: 'une vérité.',
    paragraph:
      "Chaque grain provient de terroirs d'altitude préservés en Éthiopie et Colombie, récolté à la main dans le respect le plus pur de la terre et des producteurs.",
  },
  {
    id: 'qualite',
    label: 'Qualité',
    headlineLine1: "Plus qu'un café,",
    headlineLine2: 'une expérience.',
    paragraph:
      "Café Noir, c'est l'art de vivre des moments authentiques dans un cadre élégant où chaque détail a son importance.",
  },
  {
    id: 'elegance',
    label: 'Élégance',
    headlineLine1: "Plus qu'un café,",
    headlineLine2: 'un sanctuaire.',
    paragraph:
      "L'harmonie du chêne noirci, de la pierre calcaire brossée et d'un silence feutré pour suspendre la frénésie du monde moderne.",
  },
  {
    id: 'partage',
    label: 'Partage',
    headlineLine1: "Plus qu'un café,",
    headlineLine2: 'un rituel.',
    paragraph:
      "Une célébration du temps long servie dans des pièces de céramique façonnées à la main, pour révéler chaque nuance en bouche.",
  },
];

export const EssenceSection: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const [activeIndex, setActiveIndex] = useState<number>(0);

  // Refs for tracking animation state, wheel accumulation, and touch coordinates
  const isTransitioningRef = useRef<boolean>(false);
  const activeIndexRef = useRef<number>(0);
  const touchStartYRef = useRef<number>(0);
  const touchStartXRef = useRef<number>(0);
  const wheelAccumulatorRef = useRef<number>(0);
  const lastScrollYRef = useRef<number>(0);

  // Keep ref synchronized with state
  useEffect(() => {
    activeIndexRef.current = activeIndex;
  }, [activeIndex]);

  // Track entry direction: if scrolling up from below, start at Partage (3); if from top, start at Authenticité (0)
  useEffect(() => {
    const handleScrollTracking = () => {
      const currentScrollY = window.scrollY;
      const section = sectionRef.current;
      if (!section) return;

      const rect = section.getBoundingClientRect();
      const viewportHeight = window.innerHeight;

      // Detect if user was below the section and scrolled up into it
      const wasBelow = lastScrollYRef.current > section.offsetTop + section.offsetHeight * 0.5;
      const isEnteringFromBottom = wasBelow && rect.top <= viewportHeight * 0.5 && rect.top >= -50;

      if (isEnteringFromBottom && activeIndexRef.current === 0) {
        setActiveIndex(VALUES_DATA.length - 1);
      }

      // Detect if user was above the section and scrolled down into it
      const wasAbove = lastScrollYRef.current < section.offsetTop - 100;
      const isEnteringFromTop = wasAbove && rect.top >= 0 && rect.top <= viewportHeight * 0.5;

      if (isEnteringFromTop && activeIndexRef.current === VALUES_DATA.length - 1) {
        setActiveIndex(0);
      }

      lastScrollYRef.current = currentScrollY;
    };

    window.addEventListener('scroll', handleScrollTracking, { passive: true });
    return () => window.removeEventListener('scroll', handleScrollTracking);
  }, []);

  const changeIndex = useCallback((nextIndex: number) => {
    if (nextIndex === activeIndexRef.current) return;
    if (nextIndex < 0 || nextIndex >= VALUES_DATA.length) return;

    isTransitioningRef.current = true;
    setActiveIndex(nextIndex);

    setTimeout(() => {
      isTransitioningRef.current = false;
      wheelAccumulatorRef.current = 0;
    }, 550);
  }, []);

  const handleSelectIndex = (index: number) => {
    changeIndex(index);
  };

  // Fixed/Pinned Scroll Storytelling Mechanism
  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const handleWheel = (e: WheelEvent) => {
      const rect = section.getBoundingClientRect();
      const viewportHeight = window.innerHeight;

      // Section is active/aligned in viewport when its top is at or very close to the viewport edge
      const isAligned = Math.abs(rect.top) <= 40;
      const isInViewport = rect.top <= 100 && rect.bottom >= viewportHeight - 100;

      // Auto-align cleanly when scrolling into the section threshold
      if (!isAligned && isInViewport) {
        // If scrolling down from above into section
        if (e.deltaY > 0 && rect.top > 0 && rect.top < viewportHeight * 0.5) {
          window.scrollTo({ top: section.offsetTop, behavior: 'smooth' });
        }
        // If scrolling up from below into section
        if (e.deltaY < 0 && rect.top < 0 && rect.bottom > viewportHeight * 0.5) {
          window.scrollTo({ top: section.offsetTop, behavior: 'smooth' });
        }
      }

      if (!isAligned && !isInViewport) {
        return;
      }

      const currentIndex = activeIndexRef.current;

      // SCROLLING DOWN (Forward: 0 -> 1 -> 2 -> 3)
      if (e.deltaY > 0) {
        if (currentIndex < VALUES_DATA.length - 1) {
          // Lock/pin scroll and advance narrative step
          e.preventDefault();

          if (!isTransitioningRef.current) {
            wheelAccumulatorRef.current += e.deltaY;
            if (wheelAccumulatorRef.current >= 30) {
              changeIndex(currentIndex + 1);
            }
          }
        }
        // If currentIndex === VALUES_DATA.length - 1 (Partage), do not preventDefault.
        // Scroll lock is released and user continues naturally to the next section.
      }
      // SCROLLING UP (Reverse: 3 -> 2 -> 1 -> 0)
      else if (e.deltaY < 0) {
        if (currentIndex > 0) {
          // Lock/pin scroll and step backward in narrative
          e.preventDefault();

          if (!isTransitioningRef.current) {
            wheelAccumulatorRef.current += e.deltaY;
            if (wheelAccumulatorRef.current <= -30) {
              changeIndex(currentIndex - 1);
            }
          }
        }
        // If currentIndex === 0 (Authenticité), do not preventDefault.
        // Scroll lock is released and user continues naturally to the previous section.
      }
    };

    const handleTouchStart = (e: TouchEvent) => {
      if (e.touches.length > 0) {
        touchStartYRef.current = e.touches[0].clientY;
        touchStartXRef.current = e.touches[0].clientX;
      }
    };

    const handleTouchMove = (e: TouchEvent) => {
      if (e.touches.length === 0) return;
      const currentY = e.touches[0].clientY;
      const currentX = e.touches[0].clientX;
      const deltaY = touchStartYRef.current - currentY;
      const deltaX = touchStartXRef.current - currentX;

      // Only evaluate vertical swipe gestures
      if (Math.abs(deltaY) < Math.abs(deltaX) || Math.abs(deltaY) < 30) {
        return;
      }

      const rect = section.getBoundingClientRect();
      const isAligned = Math.abs(rect.top) <= 50;

      if (!isAligned) return;

      const currentIndex = activeIndexRef.current;

      // Swipe Up = Scroll Down
      if (deltaY > 0) {
        if (currentIndex < VALUES_DATA.length - 1) {
          e.preventDefault();
          if (!isTransitioningRef.current) {
            changeIndex(currentIndex + 1);
            touchStartYRef.current = currentY;
          }
        }
      }
      // Swipe Down = Scroll Up
      else if (deltaY < 0) {
        if (currentIndex > 0) {
          e.preventDefault();
          if (!isTransitioningRef.current) {
            changeIndex(currentIndex - 1);
            touchStartYRef.current = currentY;
          }
        }
      }
    };

    // Attach non-passive listeners to intercept scroll accurately while inside the pinned storytelling section
    window.addEventListener('wheel', handleWheel, { passive: false });
    window.addEventListener('touchstart', handleTouchStart, { passive: true });
    window.addEventListener('touchmove', handleTouchMove, { passive: false });

    return () => {
      window.removeEventListener('wheel', handleWheel);
      window.removeEventListener('touchstart', handleTouchStart);
      window.removeEventListener('touchmove', handleTouchMove);
    };
  }, [changeIndex]);

  const currentItem = VALUES_DATA[activeIndex];

  return (
    <section
      ref={sectionRef}
      id="essence"
      className="relative w-full min-h-[600px] lg:h-screen lg:max-h-screen bg-[#0E0E0E] text-[#F5F5F0] flex items-center justify-center py-16 sm:py-20 lg:py-0 px-6 sm:px-12 md:px-16 lg:px-24 overflow-hidden border-t border-[#1C1C1A]"
    >
      <div className="w-full max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-10 sm:gap-14 lg:gap-8 items-center">
        
        {/* =========================================================================
            LEFT COLUMN (Text Content, Left-Aligned with Premium Fade/Slide Transitions)
            ========================================================================= */}
        <div className="lg:col-span-7 flex flex-col items-start justify-center min-h-[380px] sm:min-h-[420px]">
          {/* 1. Small tracked-out uppercase sage-green eyebrow label */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="mb-8"
          >
            <span className="font-sans text-xs tracking-[0.32em] uppercase text-[#8FC1A6] font-medium">
              L'essence
            </span>
          </motion.div>

          {/* Dynamic Content Container with Smooth Fade & Slide */}
          <AnimatePresence mode="wait">
            <motion.div
              key={currentItem.id}
              initial={{ opacity: 0, y: 22, filter: 'blur(5px)' }}
              animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
              exit={{ opacity: 0, y: -22, filter: 'blur(5px)' }}
              transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
              className="w-full"
            >
              {/* 2. Large serif headline spanning two lines (Line 1 in white, Line 2 in sage-green) */}
              <h2 className="font-serif-display text-4xl sm:text-6xl md:text-7xl lg:text-7xl xl:text-8xl leading-[1.08] tracking-tight mb-8">
                <span className="block text-[#F5F5F0] font-normal">
                  {currentItem.headlineLine1}
                </span>
                <span className="block text-[#8FC1A6] font-normal">
                  {currentItem.headlineLine2}
                </span>
              </h2>

              {/* 3. Body paragraph in muted grey sans-serif (~60% width) */}
              <p className="text-[#B8B8B0] font-sans text-base sm:text-lg leading-relaxed font-light max-w-lg">
                {currentItem.paragraph}
              </p>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* =========================================================================
            RIGHT COLUMN (Vertical Navigation List with Animated Line & Sliding Dot)
            ========================================================================= */}
        <div className="lg:col-span-5 flex justify-start lg:justify-center items-center py-6">
          <div className="relative flex items-stretch">
            {/* 1. Thin vertical line running top to bottom */}
            <div className="relative w-[1px] mr-8 sm:mr-10 flex items-center justify-center">
              <div className="absolute top-0 bottom-0 w-[1px] bg-white/20" />

              {/* 2. Small solid sage-green dot sitting on the vertical line, sliding smoothly between items */}
              <motion.div
                className="absolute left-1/2 -translate-x-1/2 pointer-events-none z-10"
                animate={{
                  top: `${activeIndex * 25 + 12.5}%`,
                }}
                transition={{
                  type: 'spring',
                  stiffness: 220,
                  damping: 26,
                }}
              >
                <div className="w-2.5 h-2.5 rounded-full bg-[#8FC1A6] -translate-y-1/2 shadow-[0_0_12px_rgba(143,193,166,0.9)]" />
              </motion.div>
            </div>

            {/* 3. Four stacked tracked-out uppercase labels with generous vertical spacing */}
            <div className="flex flex-col justify-between py-2 space-y-10 sm:space-y-12">
              {VALUES_DATA.map((item, idx) => {
                const isActive = activeIndex === idx;

                return (
                  <button
                    key={item.id}
                    id={`essence-pillar-${item.id}`}
                    onClick={() => handleSelectIndex(idx)}
                    className="text-left focus:outline-none cursor-pointer group py-1"
                    aria-label={`Afficher ${item.label}`}
                  >
                    <span
                      className={`block font-sans text-xs sm:text-sm tracking-[0.28em] uppercase transition-all duration-400 font-medium ${
                        isActive
                          ? 'text-[#F5F5F0] translate-x-1'
                          : 'text-[#666660] hover:text-[#A0A098]'
                      }`}
                    >
                      {item.label}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};
