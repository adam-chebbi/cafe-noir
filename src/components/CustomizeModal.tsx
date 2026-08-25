import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Plus, Minus, Check, Sparkles, Coffee, AlertCircle } from 'lucide-react';
import { MenuItem, ApiParameterGroup, SelectedOption, CustomizationOptions } from '../types';

interface CustomizeModalProps {
  item: MenuItem | null;
  isOpen: boolean;
  onClose: () => void;
  onAddToCart: (
    item: MenuItem,
    customization: CustomizationOptions,
    quantity: number,
    selectedOptions: SelectedOption[],
    customerNote?: string
  ) => void;
}

export const CustomizeModal: React.FC<CustomizeModalProps> = ({
  item,
  isOpen,
  onClose,
  onAddToCart,
}) => {
  if (!isOpen || !item) return null;

  const [quantity, setQuantity] = useState(1);
  const [customerNote, setCustomerNote] = useState('');
  
  // State for dynamic parameter groups: Map of groupId -> array of selected option IDs
  const [selectedGroupOptions, setSelectedGroupOptions] = useState<Record<string, string[]>>({});
  const [validationError, setValidationError] = useState<string | null>(null);

  // Initialize default options when modal opens or item changes
  useEffect(() => {
    if (!item) return;
    setQuantity(1);
    setCustomerNote('');
    setValidationError(null);

    const initial: Record<string, string[]> = {};
    if (item.parameterGroups && item.parameterGroups.length > 0) {
      item.parameterGroups.forEach((grp) => {
        if (grp.options && grp.options.length > 0) {
          // If required single selection, pre-select the first option
          if (grp.selectionType === 'single' || grp.isRequired) {
            initial[grp.id] = [grp.options[0].id];
          } else {
            initial[grp.id] = [];
          }
        }
      });
    }
    setSelectedGroupOptions(initial);
  }, [item]);

  // Compute selected options array with full details
  const selectedOptionsList: SelectedOption[] = [];
  if (item.parameterGroups && item.parameterGroups.length > 0) {
    item.parameterGroups.forEach((grp) => {
      const selectedIds = selectedGroupOptions[grp.id] || [];
      selectedIds.forEach((optId) => {
        const option = grp.options.find((o) => o.id === optId);
        if (option) {
          selectedOptionsList.push({
            groupId: grp.id,
            groupName: grp.name,
            optionId: option.id,
            optionName: option.name,
            priceDelta: option.priceDelta || 0,
          });
        }
      });
    });
  }

  // Calculate dynamic total unit price
  const optionsDelta = selectedOptionsList.reduce((sum, opt) => sum + opt.priceDelta, 0);
  const unitPrice = item.price + optionsDelta;
  const totalPrice = unitPrice * quantity;

  const handleSingleSelect = (groupId: string, optionId: string) => {
    setSelectedGroupOptions((prev) => ({
      ...prev,
      [groupId]: [optionId],
    }));
    setValidationError(null);
  };

  const handleMultiToggle = (grp: ApiParameterGroup, optionId: string) => {
    const current = selectedGroupOptions[grp.id] || [];
    const isSelected = current.includes(optionId);

    if (isSelected) {
      // Unselect
      setSelectedGroupOptions((prev) => ({
        ...prev,
        [grp.id]: current.filter((id) => id !== optionId),
      }));
    } else {
      // Check max selections limit
      if (grp.maxSelections && current.length >= grp.maxSelections) {
        setValidationError(`Maximum ${grp.maxSelections} choix pour "${grp.name}"`);
        return;
      }
      setSelectedGroupOptions((prev) => ({
        ...prev,
        [grp.id]: [...current, optionId],
      }));
    }
    setValidationError(null);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Validate required groups
    if (item.parameterGroups && item.parameterGroups.length > 0) {
      for (const grp of item.parameterGroups) {
        const selected = selectedGroupOptions[grp.id] || [];
        if (grp.isRequired && selected.length === 0) {
          setValidationError(`Veuillez faire un choix pour "${grp.name}"`);
          return;
        }
        if (grp.minSelections && selected.length < grp.minSelections) {
          setValidationError(`Veuillez sélectionner au moins ${grp.minSelections} choix pour "${grp.name}"`);
          return;
        }
      }
    }

    const legacyCustomization: CustomizationOptions = {
      size: selectedOptionsList.find((o) => o.groupName.toLowerCase().includes('taille') || o.groupName.toLowerCase().includes('format'))?.optionName || 'Standard',
      sizePriceDelta: optionsDelta,
      temperature: 'Hot',
      milk: selectedOptionsList.find((o) => o.groupName.toLowerCase().includes('lait'))?.optionName || 'Standard',
      milkPriceDelta: 0,
      syrup: '',
      syrupPriceDelta: 0,
      extraShots: 0,
      iceLevel: 'Normal Ice',
      sweetness: '100% (Standard)',
      specialInstructions: customerNote,
      selectedOptions: selectedOptionsList,
    };

    onAddToCart(item, legacyCustomization, quantity, selectedOptionsList, customerNote);
    onClose();
  };

  const formatDT = (amount: number) => {
    return `${amount.toFixed(3)} DT`;
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 overflow-y-auto">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-black/85 backdrop-blur-md cursor-pointer"
        />

        {/* Modal Window */}
        <motion.div
          initial={{ opacity: 0, scale: 0.94, y: 16 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.94, y: 16 }}
          transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
          className="relative w-full max-w-lg bg-[#141412] rounded-3xl border border-[#2A2A26] shadow-2xl z-10 flex flex-col max-h-[90vh] overflow-hidden text-left"
        >
          {/* Header Image & Info */}
          <div className="relative h-44 sm:h-52 w-full bg-black shrink-0 overflow-hidden">
            {item.photo || item.imageUrl ? (
              <img
                src={item.photo || item.imageUrl}
                alt={item.name}
                className="w-full h-full object-cover filter brightness-[0.88]"
                referrerPolicy="no-referrer"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center bg-[#1A1A18] text-[#8FC1A6]/40">
                <Coffee className="w-12 h-12" />
              </div>
            )}
            <div className="absolute inset-0 bg-gradient-to-t from-[#141412] via-black/40 to-transparent" />

            <button
              onClick={onClose}
              className="absolute top-3 right-3 sm:top-4 sm:right-4 z-20 w-8 h-8 rounded-full bg-black/70 hover:bg-black/95 border border-white/15 text-white flex items-center justify-center transition-colors cursor-pointer"
              aria-label="Fermer"
            >
              <X className="w-4 h-4" />
            </button>

            <div className="absolute bottom-3 left-4 sm:left-6 right-4 sm:right-6">
              <div className="flex items-center gap-2 mb-1">
                <span className="text-[10px] tracking-[0.24em] uppercase text-[#8FC1A6] font-bold">
                  {item.category}
                </span>
                {item.isFeatured && (
                  <span className="text-[9px] px-2 py-0.5 rounded-full bg-[#8FC1A6]/20 text-[#8FC1A6] border border-[#8FC1A6]/30 font-bold uppercase tracking-wider">
                    ★ En vedette
                  </span>
                )}
              </div>
              <h2 className="font-serif-display text-xl sm:text-2xl md:text-3xl text-white font-normal leading-tight">
                {item.name}
              </h2>
            </div>
          </div>

          {/* Scrollable Customization Options Form */}
          <form onSubmit={handleSubmit} className="overflow-y-auto p-4 sm:p-6 space-y-5 flex-1 custom-scrollbar text-xs">
            {item.description && (
              <p className="text-xs text-[#A6A69F] font-light leading-relaxed">
                {item.description}
              </p>
            )}

            {/* Error Message if required group missing */}
            {validationError && (
              <div className="p-3 rounded-xl bg-rose-950/40 border border-rose-800/50 text-rose-300 text-xs flex items-center gap-2 animate-in fade-in">
                <AlertCircle className="w-4 h-4 shrink-0 text-rose-400" />
                <span>{validationError}</span>
              </div>
            )}

            {/* Dynamic Parameter Groups (Size, Milk, Temp, Supplements, etc.) */}
            {item.parameterGroups && item.parameterGroups.length > 0 ? (
              item.parameterGroups.map((grp) => {
                const selectedIds = selectedGroupOptions[grp.id] || [];

                return (
                  <div key={grp.id} className="space-y-2.5 pt-2 border-t border-[#20201D]">
                    <div className="flex items-center justify-between">
                      <h4 className="text-[11px] uppercase tracking-wider font-bold text-[#F5F5F0] flex items-center gap-1.5">
                        <span>{grp.name}</span>
                        {grp.isRequired && (
                          <span className="text-[9px] text-[#8FC1A6] font-normal lowercase">(obligatoire)</span>
                        )}
                      </h4>
                      {grp.maxSelections && grp.selectionType === 'multi' && (
                        <span className="text-[10px] text-[#7A7A72]">
                          Max {grp.maxSelections}
                        </span>
                      )}
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                      {grp.options.map((opt) => {
                        const isSelected = selectedIds.includes(opt.id);

                        return (
                          <button
                            key={opt.id}
                            type="button"
                            onClick={() => {
                              if (grp.selectionType === 'single') {
                                handleSingleSelect(grp.id, opt.id);
                              } else {
                                handleMultiToggle(grp, opt.id);
                              }
                            }}
                            className={`p-2.5 rounded-xl border text-left flex items-center justify-between transition-all cursor-pointer ${
                              isSelected
                                ? 'bg-[#8FC1A6]/15 border-[#8FC1A6] text-white shadow-sm'
                                : 'bg-[#181816] border-[#262624] text-[#B8B8B0] hover:border-[#3A3A36] hover:text-white'
                            }`}
                          >
                            <div className="flex items-center gap-2 truncate">
                              <div
                                className={`w-3.5 h-3.5 rounded-full border flex items-center justify-center shrink-0 ${
                                  isSelected ? 'border-[#8FC1A6] bg-[#8FC1A6]' : 'border-[#444440]'
                                }`}
                              >
                                {isSelected && <Check className="w-2.5 h-2.5 text-[#0E0E0E]" />}
                              </div>
                              <span className="font-medium truncate">{opt.name}</span>
                            </div>

                            <span
                              className={`text-[11px] shrink-0 font-semibold ${
                                opt.priceDelta > 0 ? 'text-[#8FC1A6]' : 'text-[#6C6C66]'
                              }`}
                            >
                              {opt.priceDelta > 0 ? `+${formatDT(opt.priceDelta)}` : 'Inclus'}
                            </span>
                          </button>
                        );
                      })}
                    </div>
                  </div>
                );
              })
            ) : null}

            {/* Special Instruction / Customer Note */}
            <div className="space-y-1.5 pt-2 border-t border-[#20201D]">
              <label className="block text-[11px] uppercase tracking-wider font-bold text-[#F5F5F0]">
                Instruction Spéciale (optionnel)
              </label>
              <textarea
                value={customerNote}
                onChange={(e) => setCustomerNote(e.target.value)}
                placeholder="Ex: Sans sucre, très chaud, servi avec un verre d'eau..."
                rows={2}
                maxLength={200}
                className="w-full p-2.5 rounded-xl bg-[#181816] border border-[#262624] text-xs text-[#F5F5F0] placeholder:text-[#6C6C66] focus:outline-none focus:border-[#8FC1A6] transition-colors resize-none"
              />
            </div>
          </form>

          {/* Sticky Bottom Actions */}
          <div className="p-4 sm:p-5 border-t border-[#20201D] bg-[#161614] flex flex-col sm:flex-row items-center justify-between gap-3 shrink-0">
            {/* Quantity Selector */}
            <div className="flex items-center gap-3 bg-[#1F1F1D] border border-[#2B2B27] px-3 py-1.5 rounded-xl">
              <button
                type="button"
                onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                disabled={quantity <= 1}
                className="w-6 h-6 rounded-lg bg-[#2A2A26] hover:bg-[#383832] disabled:opacity-30 text-white flex items-center justify-center transition-colors cursor-pointer"
              >
                <Minus className="w-3 h-3" />
              </button>
              <span className="font-bold text-white text-xs w-4 text-center">{quantity}</span>
              <button
                type="button"
                onClick={() => setQuantity((q) => q + 1)}
                className="w-6 h-6 rounded-lg bg-[#2A2A26] hover:bg-[#383832] text-white flex items-center justify-center transition-colors cursor-pointer"
              >
                <Plus className="w-3 h-3" />
              </button>
            </div>

            {/* Add to Cart Submit Button */}
            <button
              onClick={handleSubmit}
              className="w-full sm:w-auto flex-1 py-2.5 px-5 rounded-xl bg-[#8FC1A6] hover:bg-[#9ED4B5] text-[#0E0E0E] font-bold text-xs uppercase tracking-wider flex items-center justify-between transition-all cursor-pointer shadow-lg"
            >
              <span>Ajouter à la commande</span>
              <span className="font-serif text-sm font-bold lowercase">{formatDT(totalPrice)}</span>
            </button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
