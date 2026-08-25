import React from 'react';
import { motion } from 'motion/react';
import { ArrowUpRight } from 'lucide-react';

export const FooterSection: React.FC = () => {
  const directionsUrl =
    'https://www.google.com/maps/dir/?api=1&destination=Centre+Makni%2C+Rue+Ahmed+Ghanmi%2C+Tunis+1013';
  const mapPlaceUrl =
    'https://www.google.com/maps/place/Caf%C3%A9+noir/@36.8465041,10.1512348,17z/data=!4m11!1m3!2m2!1scaf%C3%A9+noir!6e5!3m6!1s0x12fd33ac03c1d4ab:0x29f717cb2de59ae7!8m2!3d36.8465365!4d10.1536695!15sCgpjYWbDqSBub2lyWgwiCmNhZsOpIG5vaXKSAQl0ZWFfaG91c2WaAURDaTlEUVVsUlFVTnZaRU5vZEhsalJqbHZUMnBDU0ZGWFJuZFRWamt6VkcwNWNsZFhWVFJqVld4T1VsZG5kMUp1WXhBQuABAPoBBAgAEBQ!16s%2Fg%2F11k48pc0zc?entry=ttu&g_ep=EgoyMDI2MDgxOS4wIKXMDSoASAFQAw%3D%3D';
  const embedMapUrl =
    'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3192.83180360538!2d10.15123480206543!3d36.84650407311244!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x12fd33ac03c1d4ab%3A0x29f717cb2de59ae7!2sCaf%C3%A9%20noir!5e0!3m2!1sfr!2stn!4v1787368266702!5m2!1sfr!2stn';

  const handleOpenDirections = () => {
    window.open(directionsUrl, '_blank', 'noopener,noreferrer');
  };

  const handleOpenMap = () => {
    window.open(mapPlaceUrl, '_blank', 'noopener,noreferrer');
  };

  return (
    <footer
      id="footer"
      className="relative w-full bg-[#0E0E0E] text-[#F5F5F0] border-t border-[#1C1C1A] pt-16 sm:pt-24 md:pt-28 pb-12 sm:pb-14 px-6 sm:px-12 md:px-16 lg:px-24 overflow-hidden select-none"
    >
      <div className="w-full max-w-7xl mx-auto flex flex-col">
        {/* =========================================================================
            THREE-BLOCK MAIN ROW (Desktop 3 Blocks Side by Side, Stacked on Mobile)
            ========================================================================= */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 lg:gap-10 items-start pb-16 sm:pb-20">
          
          {/* -----------------------------------------------------------------------
              BLOCK 1: "Nous trouver" (lg:col-span-4)
              ----------------------------------------------------------------------- */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-50px' }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="lg:col-span-4 flex flex-col items-start"
          >
            {/* Small tracked-out uppercase sage-green eyebrow label */}
            <span className="font-sans text-xs tracking-[0.32em] uppercase text-[#8FC1A6] font-medium block mb-4">
              Nous trouver
            </span>

            {/* Serif headline: "En plein " in white, "cœur de Tunis." in sage-green */}
            <h3 className="font-serif-display text-3xl sm:text-4xl lg:text-[40px] text-[#F5F5F0] leading-[1.14] mb-6 font-normal">
              En plein <span className="text-[#8FC1A6]">cœur de Tunis.</span>
            </h3>

            {/* Address in plain text on three lines */}
            <div className="space-y-1 text-sm sm:text-base text-[#D4D4CE] font-light leading-relaxed mb-8">
              <p>Centre Makni</p>
              <p>Rue Ahmed Ghanmi</p>
              <p>Tunis 1013</p>
            </div>

            {/* Rounded pill button labeled "Itinéraire" with small direction arrow */}
            <motion.button
              id="footer-itinerary-btn"
              onClick={handleOpenDirections}
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.96 }}
              className="group inline-flex items-center gap-3 px-6 py-3 rounded-full border border-[#8FC1A6]/60 hover:border-[#8FC1A6] bg-[#141413] hover:bg-[#8FC1A6] text-[#F5F5F0] hover:text-[#0E0E0E] transition-all duration-300 cursor-pointer focus:outline-none shadow-md"
              aria-label="Obtenir l'itinéraire vers Café Noir sur Google Maps"
            >
              <span className="font-sans text-xs tracking-[0.24em] uppercase font-medium">
                Itinéraire
              </span>
              <ArrowUpRight className="w-4 h-4 text-[#8FC1A6] group-hover:text-[#0E0E0E] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform duration-300" />
            </motion.button>
          </motion.div>

          {/* -----------------------------------------------------------------------
              BLOCK 2: Map Widget (lg:col-span-4)
              ----------------------------------------------------------------------- */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-50px' }}
            transition={{ duration: 0.7, delay: 0.14, ease: [0.22, 1, 0.36, 1] }}
            className="lg:col-span-4 flex flex-col items-center justify-center w-full"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.97 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.7, delay: 0.22, ease: [0.22, 1, 0.36, 1] }}
              className="relative w-full aspect-[4/3] sm:aspect-[16/11] rounded-2xl sm:rounded-3xl overflow-hidden border border-[#262624] bg-[#141413] shadow-xl group"
            >
              {/* Google Maps Embed iframe with clean styling */}
              <iframe
                title="Carte Café Noir Centre Makni Tunis"
                src={embedMapUrl}
                className="w-full h-full border-0 filter grayscale invert contrast-[0.92] brightness-[0.8] opacity-90 group-hover:opacity-100 transition-opacity duration-500"
                allowFullScreen
                loading="lazy"
                referrerPolicy="strict-origin-when-cross-origin"
              />

              {/* "Voir la carte" Action Button Overlay */}
              <div className="absolute bottom-3 inset-x-0 flex justify-center z-10">
                <motion.button
                  id="footer-view-map-btn"
                  onClick={handleOpenMap}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#0E0E0E]/90 backdrop-blur-md border border-[#8FC1A6]/50 hover:border-[#8FC1A6] text-[10px] tracking-[0.24em] uppercase text-[#8FC1A6] hover:text-[#FFFFFF] hover:bg-[#1A1A18] transition-all duration-300 cursor-pointer shadow-lg"
                  aria-label="Voir la carte Café Noir sur Google Maps"
                >
                  <span>Voir la carte</span>
                  <ArrowUpRight className="w-3 h-3 text-[#8FC1A6]" />
                </motion.button>
              </div>
            </motion.div>
          </motion.div>

          {/* -----------------------------------------------------------------------
              BLOCK 3: Contact Details (lg:col-span-4)
              ----------------------------------------------------------------------- */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-50px' }}
            transition={{ duration: 0.7, delay: 0.28, ease: [0.22, 1, 0.36, 1] }}
            className="lg:col-span-4 flex flex-col items-start lg:pl-6"
          >
            {/* Small tracked-out uppercase sage-green eyebrow label */}
            <span className="font-sans text-xs tracking-[0.32em] uppercase text-[#8FC1A6] font-medium block mb-6">
              Nous contacter
            </span>

            {/* Plain contact details in label/value style */}
            <div className="w-full space-y-6">
              {/* Row 1: Téléphone */}
              <div className="border-b border-[#222220] pb-4">
                <span className="block font-sans text-[11px] tracking-[0.28em] uppercase text-[#888882] mb-1.5 font-medium">
                  Téléphone
                </span>
                <a
                  href="tel:+21628866777"
                  className="font-sans text-base sm:text-lg text-[#F5F5F0] hover:text-[#8FC1A6] transition-colors duration-300 font-light inline-block"
                >
                  28 866 777
                </a>
              </div>

              {/* Row 2: Email */}
              <div className="border-b border-[#222220] pb-4">
                <span className="block font-sans text-[11px] tracking-[0.28em] uppercase text-[#888882] mb-1.5 font-medium">
                  Email
                </span>
                <a
                  href="mailto:contact@cafenoir.tn"
                  className="font-sans text-base sm:text-lg text-[#F5F5F0] hover:text-[#8FC1A6] transition-colors duration-300 font-light inline-block"
                >
                  contact@cafenoir.tn
                </a>
              </div>
            </div>
          </motion.div>

        </div>

        {/* =========================================================================
            BOTTOM CLOSING LINE (Full Width Beneath the Three Blocks)
            ========================================================================= */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.38, ease: [0.22, 1, 0.36, 1] }}
          className="pt-8 border-t border-[#1F1F1D] flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left"
        >
          {/* Left: Brand name followed on the next line by copyright */}
          <div className="flex flex-col items-center sm:items-start">
            <span className="font-serif-display text-lg text-[#F5F5F0] font-normal tracking-wide">
              Café Noir
            </span>
            <span className="text-xs text-[#888882] font-light mt-0.5">
              © 2026 Café Noir. Tous droits réservés.
            </span>
          </div>

          {/* Right: Creative Comet text and link */}
          <div>
            <p className="font-sans text-[11px] sm:text-xs tracking-[0.2em] text-[#888882] uppercase font-light">
              Conçu et réalisé avec passion par{' '}
              <a
                href="https://creativecomet.tn"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#8FC1A6] hover:text-[#A7D7BD] font-medium transition-colors duration-300 inline-block hover:underline underline-offset-4"
              >
                Creative Comet
              </a>
            </p>
          </div>
        </motion.div>
      </div>
    </footer>
  );
};
