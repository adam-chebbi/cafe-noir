import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Play, X, Volume2, VolumeX } from 'lucide-react';
import diningAreaImage from '../assets/images/cafe_dining_area_1787364120781.jpg';

const AMBIANCE_GALLERY_IMAGES: { url: string; alt: string }[] = [
  {
    url: 'https://lh3.googleusercontent.com/gps-cs-s/AHRPTWkAkiyfE8z1NOsQj7yS8H5zZdDBXVLeTfq1jnMhpQQF63cn7H123UJCi_E5WuVdWaxiu0yY2LaPWoOTvuV3GGgmPttY5YlMIxMeFHPhY7PoFaLMd805gPPdHG-VVq2AETCt18qxJA=s680-w680-h510-rw',
    alt: 'Ambiance lumineuse et tables du Café Noir',
  },
  {
    url: 'https://lh3.googleusercontent.com/gps-cs-s/AHRPTWmRZliSTVhbATamuWL392Ke4dHkJEPwMaaWOfWyPxJgEoYdnKXbAMgCoNRXnGst1WCnBITs9yfE75yAuvMCSxzCOm4C5syC14hB4BnLVeqapApgNvNEx1Bqej2CsrSU17B64N7v=s680-w680-h510-rw',
    alt: 'Détails des boiseries et assises',
  },
  {
    url: 'https://lh3.googleusercontent.com/gps-cs-s/AHRPTWk-HFyAaX2Mk0dRXl4uxQae2T98ox8jzL1JN664Zj0WRCvdJR9BXjWR8FuvzKAtAUvLi5sk0tubShkBPJ2sI57LMEA1xCWvsnaSyVjXAUJ6sKIGeduD6mGttCLCvDj-P54sFVqZXA=s680-w680-h510-rw',
    alt: 'Espace café sous lumière naturelle',
  },
  {
    url: 'https://lh3.googleusercontent.com/gps-cs-s/AHRPTWmkyE48yFj8v70--LaFMCl0MmATO5azFZ67_Wf-lw6A3I7I8UGSi0AmbxaGF6zsEzqeJziu1hh57S5m3k8skSPrhLokApcgDv4b6DUdoguRxgpYTJzel97d__WJ2PAS_SIHj_Hv=s680-w680-h510-rw',
    alt: 'Comptoir de service et arrangements végétaux',
  },
  {
    url: 'https://lh3.googleusercontent.com/gps-cs-s/AHRPTWmV_xoycyjk7AWvMAd0CE9jy7tlPowi2oZW7NdbvWcgew9h2aFJ-eJLLzf5XB5bv3AWKGOKLpG_Avt-ibcLHM3Cnd6CZb2j450dKOLzr1MuRok0QYKcExB3rD6SNbl8BVhIfG7H=s680-w680-h510-rw',
    alt: 'Salle de dégustation avec tables rondes en chêne',
  },
  {
    url: 'https://lh3.googleusercontent.com/gps-cs-s/AHRPTWmpF9ExMEo5n7MZkf1VkgUM5pSo22sTDJF7PhllwiBIkROIMf8_uOFQRO9_Mzte6G-JKEX33PeSf-5VJHd6qOsnnIMVPd-t8J6-SvKMf7l3TELw75zyNE8YGheA9hGGxfTzAFKfuA=s680-w680-h510-rw',
    alt: 'Cadre chaleureux et doux du salon',
  },
  {
    url: 'https://lh3.googleusercontent.com/gps-cs-s/AHRPTWkgUhsALTg8Mn7HJB8SVrJ-td6ifa6D9vBMecTgO2AtutQsYMoV-CWkMO_H6QSciYRJPaHDq4JUqKKUfL2gtDrG6liFVbSrC902F_K2ji9gnh6RvT4xyy-naLIBGfJOS27gQSbU=s680-w680-h510-rw',
    alt: 'Vue d’ensemble de la terrasse et baies vitrées',
  },
  {
    url: 'https://lh3.googleusercontent.com/gps-cs-s/AHRPTWnJXQqOtDNLqqJBV9Tpl4Zytd_6XZZzZvoMCMo8ew35e0bU5ljd1xlOXFxdfdNP7eH6FV0e5JXOGLWetzVsc-96cSHRlZ1lhhwN3G_ja8tivL23zcHy_Tq0CbHhyUvifVl5POnlqpDF-aOW=s680-w680-h510-rw',
    alt: 'Perspective du salon et coin banquette',
  },
  {
    url: 'https://lh3.googleusercontent.com/gps-cs-s/AHRPTWm7iSVlNjdbrAoY_0jo68Rz2-mQKT2N3U4I3MEybWKyaS3bKb8JyLGsRY-5ivy3vINFW9N_QP5xMJ542PG-4o-ohZvVEJ2DMcfFFRMDASM2bx53Zs0K59EKEEJMseBiAQrgWx7xlA=s680-w680-h510-rw',
    alt: 'Détails des chaises en rotin tressé et verdure',
  },
  {
    url: 'https://lh3.googleusercontent.com/gps-cs-s/AHRPTWllzP86d-0IBXIDIcYOvJ46uRvWJbsmHmHsalFnsmf6wvHobkIYZ4YpO-AVUUnFRqY0ax9qOdUDxILBSwkLV0YPn4K43Q0IjaZnIe6FN6hJ6cMfNJ9nwj0qypV6UUgAA9LSfKPZEA=s680-w680-h510-rw',
    alt: 'Atmosphère intimiste et éclairage soigné',
  },
  {
    url: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQfeI6lcKk1B0dPFekJZvfNjGSHgbwQRFyPSg8em-UZe72qX1JclVDi8e-n&s=10',
    alt: 'Pause café et céramiques artisanales',
  },
  {
    url: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcROTdvPNMjiPCXtvaSfTWgAP4qomIbzWBj6hJ8xYKGw1wwbvGyEW0P3YVDO&s=10',
    alt: 'Harmonie des textures et de la lumière',
  },
];

export const EnvironmentSection: React.FC = () => {
  const [isGalleryModalOpen, setIsGalleryModalOpen] = useState<boolean>(false);
  const [selectedImage, setSelectedImage] = useState<{ url: string; alt: string } | null>(null);
  const [isAudioMuted, setIsAudioMuted] = useState<boolean>(false);

  const galleryScrollRef = useRef<HTMLDivElement>(null);
  const audioContextRef = useRef<AudioContext | null>(null);
  const gainNodeRef = useRef<GainNode | null>(null);

  // Prevent background website scrolling while modal is open & capture wheel anywhere
  useEffect(() => {
    if (isGalleryModalOpen) {
      const originalOverflow = document.body.style.overflow;
      document.body.style.overflow = 'hidden';

      const handleWindowWheel = (e: WheelEvent) => {
        if (galleryScrollRef.current) {
          galleryScrollRef.current.scrollTop += e.deltaY;
        }
      };

      window.addEventListener('wheel', handleWindowWheel, { passive: true });

      return () => {
        document.body.style.overflow = originalOverflow;
        window.removeEventListener('wheel', handleWindowWheel);
      };
    }
  }, [isGalleryModalOpen]);

  // Soft cafe ambient sound generator for the ambiance modal
  const startAmbientAudio = () => {
    try {
      const AudioCtx = window.AudioContext || (window as any).webkitAudioContext;
      if (!AudioCtx) return;

      const ctx = audioContextRef.current || new AudioCtx();
      audioContextRef.current = ctx;
      if (ctx.state === 'suspended') {
        ctx.resume();
      }

      const bufferSize = ctx.sampleRate * 4;
      const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
      const data = buffer.getChannelData(0);
      let lastOut = 0.0;
      for (let i = 0; i < bufferSize; i++) {
        const white = Math.random() * 2 - 1;
        data[i] = (lastOut + 0.02 * white) / 1.02;
        lastOut = data[i];
        data[i] *= 1.2;
      }

      const noise = ctx.createBufferSource();
      noise.buffer = buffer;
      noise.loop = true;

      const filter = ctx.createBiquadFilter();
      filter.type = 'lowpass';
      filter.frequency.value = 380;

      const gain = ctx.createGain();
      gain.gain.setValueAtTime(0.0001, ctx.currentTime);
      gain.gain.linearRampToValueAtTime(0.08, ctx.currentTime + 0.8);

      noise.connect(filter);
      filter.connect(gain);
      gain.connect(ctx.destination);

      noise.start();
      gainNodeRef.current = gain;
    } catch (e) {
      console.warn('Ambient audio note:', e);
    }
  };

  const stopAmbientAudio = () => {
    if (gainNodeRef.current && audioContextRef.current) {
      gainNodeRef.current.gain.linearRampToValueAtTime(0.0001, audioContextRef.current.currentTime + 0.3);
    }
  };

  const handleOpenGallery = () => {
    setIsGalleryModalOpen(true);
    startAmbientAudio();
  };

  const handleCloseGallery = () => {
    setIsGalleryModalOpen(false);
    setSelectedImage(null);
    stopAmbientAudio();
  };

  const toggleMute = () => {
    if (!gainNodeRef.current || !audioContextRef.current) return;
    if (isAudioMuted) {
      gainNodeRef.current.gain.linearRampToValueAtTime(0.08, audioContextRef.current.currentTime + 0.2);
      setIsAudioMuted(false);
    } else {
      gainNodeRef.current.gain.linearRampToValueAtTime(0.0001, audioContextRef.current.currentTime + 0.2);
      setIsAudioMuted(true);
    }
  };

  return (
    <section
      id="environnement"
      className="relative w-full min-h-screen bg-[#E9E2D6] text-[#121212] flex items-center justify-center py-20 sm:py-32 lg:py-40 px-6 sm:px-12 md:px-16 lg:px-24 overflow-hidden"
    >
      {/* 
        Background Decorative Layer:
        One large, soft sage-green quarter-circle / organic shape bleeding off the right and bottom edges,
        sitting behind the photograph.
      */}
      <motion.div
        initial={{ opacity: 0, x: 80 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true, margin: '-60px' }}
        transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
        className="absolute -bottom-24 -right-24 sm:-bottom-32 sm:-right-32 lg:-bottom-40 lg:-right-40 w-[380px] h-[380px] sm:w-[540px] sm:h-[540px] lg:w-[720px] lg:h-[720px] rounded-full bg-[#8FC1A6]/45 pointer-events-none z-0 blur-[2px]"
      />

      <div className="w-full max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-12 items-center relative z-10">
        
        {/* =========================================================================
            LEFT COLUMN (Text Content, Left-Aligned, Dark Text on Light Background)
            ========================================================================= */}
        <div className="lg:col-span-6 flex flex-col items-start justify-center">
          {/* 1. Small tracked-out uppercase sage-green eyebrow label */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="mb-8"
          >
            <span className="font-sans text-xs tracking-[0.32em] uppercase text-[#4E7A63] font-semibold">
              L'environnement
            </span>
          </motion.div>

          {/* 2. Large serif headline spanning two lines */}
          <h2 className="font-serif-display text-4xl sm:text-6xl md:text-7xl lg:text-7xl xl:text-8xl leading-[1.08] tracking-tight mb-8">
            {/* Line 1: "Pensé pour" in near-black */}
            <motion.span
              initial={{ opacity: 0, y: 28 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.8, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
              className="block text-[#121212] font-normal"
            >
              Pensé pour
            </motion.span>

            {/* Line 2: "votre " (near-black) + "confort." (sage-green) on the same line */}
            <motion.span
              initial={{ opacity: 0, y: 28 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.8, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
              className="block font-normal"
            >
              <span className="text-[#121212]">votre </span>
              <span className="text-[#4E7A63]">confort.</span>
            </motion.span>
          </h2>

          {/* 3. Body paragraph in dark grey sans-serif, moderate width */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.8, delay: 0.35, ease: [0.22, 1, 0.36, 1] }}
            className="text-[#4A4A44] font-sans text-base sm:text-lg leading-relaxed font-normal max-w-lg mb-10"
          >
            Chaque espace est conçu pour vous offrir une atmosphère douce, chaleureuse et inspirante.
          </motion.p>

          {/* 4. "Découvrir l'ambiance" link preceded by a short horizontal thin dark dash/line */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.8, delay: 0.5, ease: [0.22, 1, 0.36, 1] }}
            className="flex items-center"
          >
            <button
              id="decouvrir-ambiance-btn"
              onClick={handleOpenGallery}
              className="group flex items-center gap-4 text-left cursor-pointer focus:outline-none py-2"
            >
              {/* Short horizontal thin dark dash/line */}
              <motion.span
                initial={{ scaleX: 0 }}
                whileInView={{ scaleX: 1 }}
                viewport={{ once: true, margin: '-60px' }}
                transition={{ duration: 0.7, delay: 0.55, ease: [0.22, 1, 0.36, 1] }}
                className="origin-left w-7 h-[1.5px] bg-[#121212] group-hover:bg-[#4E7A63] transition-colors duration-300"
              />

              <span className="font-sans text-xs tracking-[0.28em] uppercase text-[#121212] group-hover:text-[#4E7A63] transition-colors duration-300 font-semibold">
                Découvrir l'ambiance
              </span>
            </button>
          </motion.div>
        </div>

        {/* =========================================================================
            RIGHT COLUMN (Real Photograph with Play Button Overlay)
            ========================================================================= */}
        <div className="lg:col-span-6 flex justify-center lg:justify-end items-center relative">
          <motion.div
            initial={{ opacity: 0, scale: 1.05 }}
            whileInView={{ opacity: 1, scale: 1.0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 1.0, delay: 0.25, ease: [0.22, 1, 0.36, 1] }}
            className="relative w-full max-w-lg lg:max-w-xl group"
          >
            {/* Contained image block with soft rounded corners, landscape aspect ratio */}
            <div className="relative overflow-hidden rounded-2xl sm:rounded-3xl shadow-xl border border-[#D8D0C3] bg-[#DED6C9] aspect-[16/10]">
              <img
                src={diningAreaImage}
                alt="Café Noir — Salle de dégustation lumineuse avec tables en bois, assises en rotin et garlandes florales"
                className="w-full h-full object-cover object-center filter contrast-[1.02] brightness-[0.98] group-hover:scale-[1.02] transition-transform duration-700 ease-out"
                referrerPolicy="no-referrer"
              />

              {/* Subtle vignette layer for photographic depth */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/25 via-transparent to-transparent pointer-events-none" />

              {/* Centered Circular Sage-Green Play Button with pulsing breathing animation */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="relative flex items-center justify-center">
                  {/* Soft green glow appearing behind it on hover */}
                  <div className="absolute inset-0 rounded-full bg-[#8FC1A6] opacity-0 group-hover:opacity-75 blur-xl transition-opacity duration-500 scale-125 pointer-events-none" />

                  <motion.button
                    id="ambiance-play-button"
                    onClick={handleOpenGallery}
                    animate={{
                      scale: [1, 1.03, 1],
                    }}
                    transition={{
                      duration: 4.2,
                      repeat: Infinity,
                      ease: 'easeInOut',
                    }}
                    whileHover={{ scale: 1.12 }}
                    whileTap={{ scale: 0.94 }}
                    className="relative w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-[#8FC1A6] hover:bg-[#9ED4B5] text-white flex items-center justify-center shadow-lg transition-colors duration-300 cursor-pointer focus:outline-none border border-white/30"
                    aria-label="Ouvrir la galerie d'ambiance du salon"
                  >
                    {/* Centered white triangular play icon */}
                    <Play className="w-6 h-6 sm:w-8 sm:h-8 text-white fill-white translate-x-[2px]" />
                  </motion.button>
                </div>
              </div>
            </div>
          </motion.div>
        </div>

      </div>

      {/* =========================================================================
          PINTEREST-STYLE MASONRY GALLERY MODAL OVERLAY
          ========================================================================= */}
      <AnimatePresence>
        {isGalleryModalOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-50 bg-[#0E0E0E]/95 backdrop-blur-xl flex items-center justify-center p-3 sm:p-6 md:p-8"
            onClick={handleCloseGallery}
          >
            {/* Modal Panel Container */}
            <motion.div
              initial={{ opacity: 0, scale: 0.96, y: 14 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.96, y: 14 }}
              transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
              onClick={(e) => e.stopPropagation()}
              className="relative max-w-6xl w-full max-h-[92vh] h-[92vh] bg-[#141413] border border-[#2A2A28] rounded-2xl sm:rounded-3xl shadow-2xl flex flex-col overflow-hidden text-left"
            >
              {/* Header Top Bar (Sticky so it stays visible while scrolling) */}
              <div className="flex items-center justify-between px-6 sm:px-10 py-5 border-b border-[#222220] bg-[#141413]/95 backdrop-blur-md sticky top-0 z-30 shrink-0">
                <div>
                  {/* Small tracked-out uppercase sage-green eyebrow label */}
                  <span className="block font-sans text-xs tracking-[0.32em] uppercase text-[#8FC1A6] font-medium">
                    L'ambiance
                  </span>
                </div>

                {/* Right Controls: Audio Mute + Thin Close "X" Button */}
                <div className="flex items-center gap-3">
                  <button
                    onClick={toggleMute}
                    className="p-2.5 rounded-full border border-[#2E2E2A] text-[#B8B8B0] hover:text-[#F5F5F0] hover:border-[#8FC1A6] transition-colors focus:outline-none cursor-pointer"
                    aria-label={isAudioMuted ? "Activer l'ambiance sonore" : "Couper l'ambiance sonore"}
                  >
                    {isAudioMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4 text-[#8FC1A6]" />}
                  </button>
                  <button
                    id="close-ambiance-gallery-btn"
                    onClick={handleCloseGallery}
                    className="p-2.5 rounded-full border border-[#2E2E2A] text-[#F5F5F0] hover:text-[#8FC1A6] hover:border-[#8FC1A6] transition-colors focus:outline-none cursor-pointer"
                    aria-label="Fermer la galerie"
                  >
                    <X className="w-5 h-5 text-[#F5F5F0]" strokeWidth={1.5} />
                  </button>
                </div>
              </div>

              {/* Scrollable Pinterest-Style Masonry Photo Grid */}
              <div
                ref={galleryScrollRef}
                className="flex-1 p-5 sm:p-8 md:p-10 overflow-y-auto custom-scrollbar overscroll-contain"
              >
                <div className="columns-1 sm:columns-2 md:columns-3 lg:columns-4 gap-4 sm:gap-5 space-y-4 sm:space-y-5">
                  {AMBIANCE_GALLERY_IMAGES.map((img, idx) => (
                    <motion.div
                      key={idx}
                      onClick={() => setSelectedImage(img)}
                      initial={{ opacity: 0, y: 20, scale: 0.98 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      transition={{
                        duration: 0.45,
                        delay: 0.08 + idx * 0.04,
                        ease: [0.22, 1, 0.36, 1],
                      }}
                      className="break-inside-avoid relative group overflow-hidden rounded-xl sm:rounded-2xl border border-[#242422] bg-[#1A1A18] shadow-md transition-all duration-300 hover:shadow-xl cursor-pointer"
                    >
                      <img
                        src={img.url}
                        alt={img.alt}
                        className="w-full h-auto object-cover filter contrast-[1.03] brightness-[0.98] group-hover:scale-[1.03] transition-transform duration-500 ease-out"
                        loading="lazy"
                        referrerPolicy="no-referrer"
                      />

                      {/* Subtle Dark Gradient Overlay at Bottom Edge */}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
                    </motion.div>
                  ))}
                </div>
              </div>

            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* =========================================================================
          FULLSCREEN IMAGE LIGHTBOX OVERLAY
          ========================================================================= */}
      <AnimatePresence>
        {selectedImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-0 z-[60] bg-black/98 backdrop-blur-2xl flex items-center justify-center p-4 sm:p-8"
            onClick={() => setSelectedImage(null)}
          >
            {/* Top Close "X" Button */}
            <button
              id="close-fullscreen-image-btn"
              onClick={() => setSelectedImage(null)}
              className="absolute top-6 right-6 sm:top-8 sm:right-8 z-50 p-3 rounded-full bg-[#1A1A18]/80 hover:bg-[#2A2A28] border border-white/20 text-white transition-all duration-300 hover:scale-105 cursor-pointer focus:outline-none"
              aria-label="Fermer le plein écran"
            >
              <X className="w-6 h-6 text-[#F5F5F0]" strokeWidth={1.5} />
            </button>

            {/* Centered High-Res Image View */}
            <motion.div
              initial={{ scale: 0.92, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.92, opacity: 0 }}
              transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
              onClick={(e) => e.stopPropagation()}
              className="relative max-w-5xl max-h-[88vh] flex items-center justify-center rounded-xl overflow-hidden shadow-2xl"
            >
              <img
                src={selectedImage.url}
                alt={selectedImage.alt}
                className="max-w-full max-h-[88vh] object-contain rounded-xl shadow-2xl"
                referrerPolicy="no-referrer"
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};
