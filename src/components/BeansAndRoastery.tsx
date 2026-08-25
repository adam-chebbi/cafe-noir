import React, { useState } from 'react';
import { Flame, Mountain, Droplets, Package, ShieldCheck, Sparkles, Plus } from 'lucide-react';
import { MenuItem } from '../types';
import { MENU_ITEMS } from '../data/coffeeData';

interface BeansAndRoasteryProps {
  onSelectBean: (item: MenuItem) => void;
  onQuickAdd: (item: MenuItem) => void;
}

export const BeansAndRoastery: React.FC<BeansAndRoasteryProps> = ({
  onSelectBean,
  onQuickAdd,
}) => {
  const [selectedRoastFilter, setSelectedRoastFilter] = useState<'All' | 'Light' | 'Medium' | 'Dark'>('All');

  const beanItems = MENU_ITEMS.filter((i) => i.category === 'beans');
  const filteredBeans = selectedRoastFilter === 'All'
    ? beanItems
    : beanItems.filter((i) => i.roastLevel === selectedRoastFilter);

  return (
    <section id="beans" className="py-20 bg-[#231A14] text-[#FAF7F2] scroll-mt-20 relative overflow-hidden">
      
      {/* Subtle background ambient overlay */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,_var(--tw-gradient-stops))] from-[#5C3A24]/30 via-transparent to-transparent pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-14 pb-8 border-b border-[#3D2E24]">
          <div className="max-w-2xl text-left">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#3D2E24] border border-[#5C4537] text-xs font-bold text-[#D4A373] uppercase tracking-wider mb-3">
              <Package className="w-3.5 h-3.5" />
              <span>Small Batch Roastery</span>
            </div>
            <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-[#FAF7F2] mb-3">
              Freshly Roasted Beans For Your Home Ritual
            </h2>
            <p className="text-sm sm:text-base text-[#B8A698] leading-relaxed">
              We roast every Tuesday, Thursday, and Saturday in 12kg micro-batches. Each bag is stamped with its roast date and degassing window for peak cup clarity.
            </p>
          </div>

          {/* Roast Filter Pills */}
          <div className="flex items-center gap-2 bg-[#2D221A] p-1.5 rounded-xl border border-[#4A372C] self-start md:self-end">
            {(['All', 'Light', 'Medium', 'Dark'] as const).map((roast) => (
              <button
                key={roast}
                onClick={() => setSelectedRoastFilter(roast)}
                className={`text-xs font-semibold px-3 py-1.5 rounded-lg transition-all cursor-pointer ${
                  selectedRoastFilter === roast
                    ? 'bg-[#D4A373] text-[#231A14] shadow-sm'
                    : 'text-[#C7B5A7] hover:text-white'
                }`}
              >
                {roast === 'All' ? 'All Roasts' : `${roast} Roast`}
              </button>
            ))}
          </div>
        </div>

        {/* Bean Cards Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {filteredBeans.map((bean) => (
            <div
              key={bean.id}
              className="bg-[#2D221A] rounded-2xl border border-[#4A372C] hover:border-[#D4A373]/60 p-6 flex flex-col justify-between transition-all hover:shadow-xl text-left group"
            >
              <div>
                {/* Image and badges */}
                <div className="relative h-44 rounded-xl overflow-hidden bg-[#1B140F] mb-5">
                  <img
                    src={bean.imageUrl}
                    alt={bean.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 opacity-90"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#2D221A] via-transparent to-transparent" />
                  
                  {/* Roast Pill */}
                  <div className="absolute top-3 left-3 px-2.5 py-1 rounded-md bg-[#3D2E24]/90 backdrop-blur-xs border border-[#5C4537] text-[11px] font-bold text-[#D4A373] flex items-center gap-1.5">
                    <Flame className="w-3.5 h-3.5" />
                    <span>{bean.roastLevel} Roast</span>
                  </div>

                  <div className="absolute top-3 right-3 px-2.5 py-1 rounded-md bg-[#1B140F]/90 text-xs font-bold text-white">
                    ${bean.price.toFixed(2)}
                  </div>
                </div>

                {/* Title and Origin details */}
                <span className="text-[11px] font-bold uppercase tracking-widest text-[#D4A373] block mb-1">
                  Single Origin • Micro-Batch
                </span>
                
                <h3 className="font-serif text-2xl font-bold text-[#FAF7F2] mb-2 leading-snug">
                  {bean.name}
                </h3>

                <p className="text-xs text-[#B8A698] leading-relaxed mb-4">
                  {bean.description}
                </p>

                {/* Origin Attributes */}
                <div className="space-y-1.5 py-3 border-y border-[#3D2E24] text-xs mb-4">
                  {bean.origins && (
                    <div className="flex items-center justify-between text-[#C7B5A7]">
                      <span className="text-[#8C7D72]">Origin</span>
                      <span className="font-medium text-white">{bean.origins}</span>
                    </div>
                  )}
                  {bean.elevation && (
                    <div className="flex items-center justify-between text-[#C7B5A7]">
                      <span className="text-[#8C7D72] flex items-center gap-1">
                        <Mountain className="w-3 h-3 text-[#D4A373]" /> Elevation
                      </span>
                      <span className="font-medium text-white">{bean.elevation}</span>
                    </div>
                  )}
                  {bean.process && (
                    <div className="flex items-center justify-between text-[#C7B5A7]">
                      <span className="text-[#8C7D72] flex items-center gap-1">
                        <Droplets className="w-3 h-3 text-[#D4A373]" /> Processing
                      </span>
                      <span className="font-medium text-white">{bean.process}</span>
                    </div>
                  )}
                </div>

                {/* Tasting Notes */}
                <div className="flex flex-wrap gap-1.5 mb-6">
                  {bean.tastingNotes.map((note) => (
                    <span
                      key={note}
                      className="text-[11px] px-2.5 py-1 rounded bg-[#3D2E24] text-[#E0D5CC] border border-[#543F31]"
                    >
                      {note}
                    </span>
                  ))}
                </div>
              </div>

              {/* Action Buttons */}
              <div className="pt-2 flex items-center gap-2.5">
                <button
                  onClick={() => onSelectBean(bean)}
                  className="flex-1 py-3 px-4 rounded-xl bg-[#D4A373] hover:bg-[#C28E5D] text-[#231A14] font-bold text-xs transition-colors flex items-center justify-center gap-2 cursor-pointer shadow-md"
                >
                  <Package className="w-3.5 h-3.5" />
                  <span>Choose Grind & Size</span>
                </button>

                <button
                  onClick={() => onQuickAdd(bean)}
                  title="Quick add Whole Bean bag (340g)"
                  aria-label={`Quick add ${bean.name}`}
                  className="w-11 h-11 rounded-xl bg-[#3D2E24] hover:bg-[#4E3B2E] border border-[#5C4537] text-white flex items-center justify-center transition-colors cursor-pointer shrink-0"
                >
                  <Plus className="w-4 h-4 text-[#D4A373]" />
                </button>
              </div>

            </div>
          ))}
        </div>

        {/* Subscription Banner Callout */}
        <div className="mt-12 p-6 sm:p-8 rounded-2xl bg-[#2D221A] border border-[#5C4537] flex flex-col md:flex-row items-center justify-between gap-6 text-left">
          <div className="space-y-1">
            <div className="flex items-center gap-2 text-xs font-bold text-[#D4A373] uppercase tracking-wider">
              <ShieldCheck className="w-4 h-4 text-[#D4A373]" />
              <span>Roaster's Club Subscription</span>
            </div>
            <h4 className="font-serif text-xl sm:text-2xl font-bold text-[#FAF7F2]">
              Never Run Out of Peak Fresh Coffee at Home
            </h4>
            <p className="text-xs sm:text-sm text-[#B8A698] max-w-2xl">
              Receive 2 rotating single-origin bags bi-weekly with 15% off, free shipping, and roaster's tasting notes.
            </p>
          </div>

          <button
            onClick={() => onSelectBean(beanItems[0])}
            className="whitespace-nowrap px-6 py-3 rounded-xl bg-[#FAF7F2] hover:bg-[#EAE2D5] text-[#231A14] font-bold text-xs sm:text-sm transition-colors cursor-pointer shrink-0 shadow-md"
          >
            Start Bean Subscription →
          </button>
        </div>

      </div>
    </section>
  );
};
