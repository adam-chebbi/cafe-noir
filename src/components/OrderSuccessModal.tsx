import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { CheckCircle2, Coffee, Clock, Sparkles, X, ArrowRight } from 'lucide-react';
import { OrderSubmitResponse } from '../types';

interface OrderSuccessModalProps {
  order: OrderSubmitResponse | null;
  isOpen: boolean;
  onClose: () => void;
}

export const OrderSuccessModal: React.FC<OrderSuccessModalProps> = ({
  order,
  isOpen,
  onClose,
}) => {
  if (!isOpen || !order) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-black/85 backdrop-blur-md cursor-pointer"
        />

        {/* Modal Card */}
        <motion.div
          initial={{ opacity: 0, scale: 0.92, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.92, y: 20 }}
          transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
          className="relative w-full max-w-md bg-[#141412] rounded-3xl border border-[#2A2A26] shadow-2xl p-6 sm:p-8 text-center text-[#F5F5F0] z-10 space-y-6"
        >
          {/* Close Button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 w-8 h-8 rounded-full bg-[#1F1F1D] hover:bg-[#282824] text-[#A6A69F] hover:text-white flex items-center justify-center transition-colors cursor-pointer"
            aria-label="Fermer"
          >
            <X className="w-4 h-4" />
          </button>

          {/* Success Icon */}
          <div className="relative mx-auto w-20 h-20 flex items-center justify-center">
            <div className="absolute inset-0 bg-[#8FC1A6]/20 rounded-full animate-ping opacity-75" />
            <div className="relative w-16 h-16 rounded-full bg-[#8FC1A6] text-[#0E0E0E] flex items-center justify-center shadow-lg">
              <CheckCircle2 className="w-9 h-9" />
            </div>
          </div>

          {/* Title & Order info */}
          <div className="space-y-2">
            <span className="text-[10px] sm:text-[11px] tracking-[0.28em] uppercase text-[#8FC1A6] font-bold">
              Commande Confirmée
            </span>
            <h2 className="font-serif-display text-2xl sm:text-3xl text-white font-normal">
              Merci pour votre commande !
            </h2>
            <p className="text-xs sm:text-sm text-[#A6A69F] font-light leading-relaxed">
              Votre commande a été transmise instantanément au comptoir et à notre équipe de salle.
            </p>
          </div>

          {/* Order Details Ticket Box */}
          <div className="bg-[#1B1B19] rounded-2xl border border-[#2B2B27] p-4 sm:p-5 text-left space-y-3 text-xs">
            <div className="flex justify-between items-center pb-2.5 border-b border-[#2B2B27]">
              <span className="text-[#888880] uppercase tracking-wider text-[10px] font-bold">N° Commande</span>
              <span className="font-mono font-bold text-[#8FC1A6] text-sm">{order.orderNumber}</span>
            </div>

            <div className="flex justify-between items-center pb-2.5 border-b border-[#2B2B27]">
              <span className="text-[#888880] uppercase tracking-wider text-[10px] font-bold">Emplacement</span>
              <span className="font-bold text-white text-xs">{order.tableNumber}</span>
            </div>

            <div className="flex justify-between items-center pb-2.5 border-b border-[#2B2B27]">
              <span className="text-[#888880] uppercase tracking-wider text-[10px] font-bold">Montant Total</span>
              <span className="font-serif font-bold text-white text-sm">
                {(order.totalAmount || 0).toFixed(3)} DT
              </span>
            </div>

            <div className="flex justify-between items-center pt-1 text-[11px] text-[#D4D4CC]">
              <span className="flex items-center gap-1 text-[#8FC1A6]">
                <Clock className="w-3.5 h-3.5" />
                <span>Paiement en salle</span>
              </span>
              <span className="text-[#A6A69F]">Règlement auprès du serveur</span>
            </div>
          </div>

          {/* Action button */}
          <button
            onClick={onClose}
            className="w-full py-3 px-5 rounded-xl bg-[#8FC1A6] hover:bg-[#9ED4B5] text-[#0E0E0E] font-bold text-xs uppercase tracking-wider transition-colors cursor-pointer shadow-lg"
          >
            Consulter la carte
          </button>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
