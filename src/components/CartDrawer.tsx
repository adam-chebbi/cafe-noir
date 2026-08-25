import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Trash2, Plus, Minus, ShoppingBag, Coffee, ArrowRight, Check, AlertCircle, Clock, Send } from 'lucide-react';
import { WebCartItem, OrderSubmitResponse } from '../types';
import { submitTableOrder } from '../services/api';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  cartItems: WebCartItem[];
  tableNumber?: string;
  tableToken?: string;
  onUpdateQuantity: (cartItemId: string, newQuantity: number) => void;
  onRemoveItem: (cartItemId: string) => void;
  onClearCart: () => void;
  onOrderSuccess: (orderResponse: OrderSubmitResponse) => void;
}

export const CartDrawer: React.FC<CartDrawerProps> = ({
  isOpen,
  onClose,
  cartItems,
  tableNumber,
  tableToken,
  onUpdateQuantity,
  onRemoveItem,
  onClearCart,
  onOrderSuccess,
}) => {
  if (!isOpen) return null;

  const [customerName, setCustomerName] = useState('');
  const [customerPhone, setCustomerPhone] = useState('');
  const [generalNotes, setGeneralNotes] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  const subtotal = cartItems.reduce((acc, item) => acc + item.unitPrice * item.quantity, 0);

  const formatDT = (amount: number) => {
    return `${amount.toFixed(3)} DT`;
  };

  const handleSendOrder = async (e: React.FormEvent) => {
    e.preventDefault();
    if (cartItems.length === 0 || isSubmitting) return;

    setIsSubmitting(true);
    setSubmitError(null);

    try {
      const orderPayload = {
        tableNumber: tableNumber || 'Table 1',
        tableToken: tableToken,
        customerName: customerName.trim() || undefined,
        customerPhone: customerPhone.trim() || undefined,
        notes: generalNotes.trim() || undefined,
        consumptionType: 'Sur place',
        items: cartItems.map((item) => ({
          productId: item.product.id,
          productName: item.product.name,
          quantity: item.quantity,
          selectedOptionIds: item.selectedOptions.map((o) => o.optionId),
          selectedParameters: item.selectedOptions.map((o) => ({
            groupId: o.groupId,
            optionId: o.optionId,
          })),
          supplementNames: item.selectedOptions.map((o) => `${o.groupName}: ${o.optionName}`),
          customerNote: item.customerNote,
        })),
      };

      const response = await submitTableOrder(orderPayload);
      setIsSubmitting(false);
      onClearCart();
      onClose();
      onOrderSuccess(response);
    } catch (err: any) {
      setIsSubmitting(false);
      setSubmitError(err.message || "Impossible d'envoyer la commande. Veuillez vérifier votre connexion ou vous adresser au serveur.");
    }
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 overflow-hidden flex justify-end">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-black/80 backdrop-blur-xs cursor-pointer"
        />

        {/* Drawer Panel */}
        <motion.div
          initial={{ x: '100%' }}
          animate={{ x: 0 }}
          exit={{ x: '100%' }}
          transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
          className="relative w-full max-w-md bg-[#141412] h-full shadow-2xl flex flex-col justify-between border-l border-[#262624] text-[#F5F5F0] z-10"
        >
          {/* Header */}
          <div className="p-4 sm:p-5 border-b border-[#242422] flex items-center justify-between bg-[#181816]">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-xl bg-[#8FC1A6]/15 border border-[#8FC1A6]/30 flex items-center justify-center text-[#8FC1A6]">
                <ShoppingBag className="w-4 h-4" />
              </div>
              <div>
                <h2 className="font-serif-display text-lg sm:text-xl font-normal text-white">
                  Votre Commande
                </h2>
                <span className="text-[10px] text-[#A6A69F]">
                  {cartItems.reduce((sum, i) => sum + i.quantity, 0)} article(s) sélectionné(s)
                </span>
              </div>
            </div>

            <button
              onClick={onClose}
              className="w-8 h-8 rounded-full bg-[#20201D] hover:bg-[#2A2A26] text-[#B8B8B0] hover:text-white flex items-center justify-center transition-colors cursor-pointer"
              aria-label="Fermer le panier"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Table Banner */}
          {tableNumber ? (
            <div className="bg-[#1C1C1A] px-5 py-2.5 border-b border-[#282824] flex items-center justify-between text-xs">
              <span className="text-[#A6A69F] flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-[#8FC1A6] animate-pulse" />
                <span>Service à Table :</span>
              </span>
              <span className="font-bold text-[#8FC1A6] bg-[#8FC1A6]/10 px-2 py-0.5 rounded-md border border-[#8FC1A6]/20">
                {tableNumber}
              </span>
            </div>
          ) : (
            <div className="bg-amber-950/20 px-5 py-2 border-b border-amber-800/30 text-[11px] text-amber-300 flex items-center gap-2">
              <AlertCircle className="w-3.5 h-3.5 shrink-0 text-amber-400" />
              <span>Commande directe au comptoir</span>
            </div>
          )}

          {/* Scrollable Items Container */}
          <div className="flex-1 overflow-y-auto p-4 sm:p-5 space-y-3.5 text-left custom-scrollbar">
            {cartItems.length === 0 ? (
              <div className="text-center py-20 space-y-4">
                <div className="w-16 h-16 rounded-2xl bg-[#1C1C1A] border border-[#282824] text-[#8FC1A6]/60 flex items-center justify-center mx-auto">
                  <Coffee className="w-8 h-8" />
                </div>
                <h3 className="font-serif-display text-xl text-white">
                  Votre sélection est vide
                </h3>
                <p className="text-xs text-[#888880] max-w-xs mx-auto leading-relaxed">
                  Parcourez notre carte pour sélectionner vos cafés de terroir, thés raffinés et douceurs artisanales.
                </p>
                <button
                  onClick={onClose}
                  className="px-5 py-2.5 rounded-xl bg-[#8FC1A6] text-[#0E0E0E] text-xs font-bold hover:bg-[#9ED4B5] transition-colors cursor-pointer"
                >
                  Découvrir la carte
                </button>
              </div>
            ) : (
              <div className="space-y-3">
                {cartItems.map((item) => (
                  <div
                    key={item.cartItemId}
                    className="p-3.5 rounded-2xl bg-[#181816] border border-[#262624] space-y-2.5 relative group"
                  >
                    <div className="flex items-start justify-between gap-3">
                      <div className="flex-1 min-w-0">
                        <h4 className="font-serif text-sm font-medium text-white truncate">
                          {item.product.name}
                        </h4>
                        <span className="font-bold text-xs text-[#8FC1A6] block mt-0.5">
                          {formatDT(item.unitPrice)}
                        </span>
                      </div>

                      {/* Remove Button */}
                      <button
                        onClick={() => onRemoveItem(item.cartItemId)}
                        className="text-[#6C6C66] hover:text-rose-400 p-1 transition-colors cursor-pointer"
                        title="Retirer"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>

                    {/* Selected Options Badges */}
                    {item.selectedOptions && item.selectedOptions.length > 0 && (
                      <div className="flex flex-wrap gap-1 text-[10px]">
                        {item.selectedOptions.map((opt, i) => (
                          <span
                            key={i}
                            className="px-2 py-0.5 rounded-md bg-[#222220] border border-[#2E2E2A] text-[#C4C4BC]"
                          >
                            {opt.optionName} {opt.priceDelta > 0 ? `(+${formatDT(opt.priceDelta)})` : ''}
                          </span>
                        ))}
                      </div>
                    )}

                    {/* Customer note on this item */}
                    {item.customerNote && (
                      <p className="text-[10px] text-[#A6A69F] italic bg-[#20201D] p-1.5 rounded-lg border border-[#2C2C28]">
                        "{item.customerNote}"
                      </p>
                    )}

                    {/* Quantity Selector & Item Total */}
                    <div className="flex items-center justify-between pt-2 border-t border-[#222220]">
                      <div className="flex items-center gap-2 bg-[#20201D] border border-[#2A2A26] px-2 py-1 rounded-lg">
                        <button
                          type="button"
                          onClick={() => onUpdateQuantity(item.cartItemId, Math.max(1, item.quantity - 1))}
                          className="w-5 h-5 rounded bg-[#2A2A26] hover:bg-[#383832] text-white flex items-center justify-center cursor-pointer text-xs"
                        >
                          <Minus className="w-2.5 h-2.5" />
                        </button>
                        <span className="font-bold text-white text-xs w-4 text-center">{item.quantity}</span>
                        <button
                          type="button"
                          onClick={() => onUpdateQuantity(item.cartItemId, item.quantity + 1)}
                          className="w-5 h-5 rounded bg-[#2A2A26] hover:bg-[#383832] text-white flex items-center justify-center cursor-pointer text-xs"
                        >
                          <Plus className="w-2.5 h-2.5" />
                        </button>
                      </div>

                      <span className="font-serif font-medium text-white text-sm">
                        {formatDT(item.unitPrice * item.quantity)}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Sticky Bottom Actions & Submission */}
          {cartItems.length > 0 && (
            <div className="p-4 sm:p-5 border-t border-[#242422] bg-[#161614] space-y-3.5 shrink-0">
              {/* Optional customer notes for staff */}
              <div className="space-y-1.5">
                <input
                  type="text"
                  value={customerName}
                  onChange={(e) => setCustomerName(e.target.value)}
                  placeholder="Votre prénom (optionnel)"
                  className="w-full px-3 py-2 rounded-xl bg-[#1D1D1B] border border-[#2A2A26] text-xs text-white placeholder:text-[#6C6C66] focus:outline-none focus:border-[#8FC1A6]"
                />
                <input
                  type="text"
                  value={generalNotes}
                  onChange={(e) => setGeneralNotes(e.target.value)}
                  placeholder="Remarque pour le service (ex: Tout servir ensemble)..."
                  className="w-full px-3 py-2 rounded-xl bg-[#1D1D1B] border border-[#2A2A26] text-xs text-white placeholder:text-[#6C6C66] focus:outline-none focus:border-[#8FC1A6]"
                />
              </div>

              {/* Error Banner */}
              {submitError && (
                <div className="p-3 rounded-xl bg-rose-950/40 border border-rose-800/50 text-rose-300 text-xs flex items-center gap-2">
                  <AlertCircle className="w-4 h-4 shrink-0 text-rose-400" />
                  <span>{submitError}</span>
                </div>
              )}

              {/* Summary Breakdown */}
              <div className="space-y-1 text-xs text-[#A6A69F]">
                <div className="flex justify-between items-center text-white font-serif text-base pt-1">
                  <span>Total à régler en salle</span>
                  <span className="font-bold text-[#8FC1A6]">{formatDT(subtotal)}</span>
                </div>
                <div className="flex justify-between items-center text-[10px] text-[#7A7A72]">
                  <span>Paiement en espèces ou TPE lors du service</span>
                  <span>TVA incluse</span>
                </div>
              </div>

              {/* Submit Order Button */}
              <button
                onClick={handleSendOrder}
                disabled={isSubmitting}
                className="w-full py-3 px-5 rounded-xl bg-[#8FC1A6] hover:bg-[#9ED4B5] disabled:opacity-50 text-[#0E0E0E] font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 transition-all cursor-pointer shadow-lg"
              >
                {isSubmitting ? (
                  <span>Transmission en cours...</span>
                ) : (
                  <>
                    <Send className="w-4 h-4" />
                    <span>Envoyer la Commande ({formatDT(subtotal)})</span>
                  </>
                )}
              </button>
            </div>
          )}
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
