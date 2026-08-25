import React, { useState, useMemo } from 'react';
import { Search, Sparkles, Coffee, Flame, Plus, Filter, Check, Heart } from 'lucide-react';
import { MenuItem, MenuCategory } from '../types';
import { MENU_ITEMS } from '../data/coffeeData';

interface MenuSectionProps {
  onSelectItem: (item: MenuItem) => void;
  onQuickAdd: (item: MenuItem) => void;
}

export const MenuSection: React.FC<MenuSectionProps> = ({
  onSelectItem,
  onQuickAdd,
}) => {
  const [selectedCategory, setSelectedCategory] = useState<MenuCategory | 'all'>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedTag, setSelectedTag] = useState<string | 'all'>('all');

  const categories: { id: MenuCategory | 'all'; label: string; icon: string }[] = [
    { id: 'all', label: 'Full Menu', icon: '✨' },
    { id: 'espresso', label: 'Espresso Bar', icon: '☕' },
    { id: 'slow-brew', label: 'Slow Brew & V60', icon: '💧' },
    { id: 'chilled', label: 'Chilled & Nitro', icon: '❄️' },
    { id: 'bakery', label: 'Bakery & Bites', icon: '🥐' },
    { id: 'beans', label: 'Whole Bean Bags', icon: '🫘' },
  ];

  const quickTags = ['Popular', 'Single Origin', 'Vegan', 'Seasonal', 'Direct Trade'];

  // Filter items
  const filteredItems = useMemo(() => {
    return MENU_ITEMS.filter((item) => {
      // Category check
      if (selectedCategory !== 'all' && item.category !== selectedCategory) {
        return false;
      }
      // Tag filter
      if (selectedTag !== 'all') {
        if (selectedTag === 'Popular' && !item.popular) return false;
        if (selectedTag === 'Seasonal' && !item.seasonal) return false;
        if (selectedTag !== 'Popular' && selectedTag !== 'Seasonal' && !item.tags.includes(selectedTag)) {
          return false;
        }
      }
      // Search query
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const matchesName = item.name.toLowerCase().includes(q);
        const matchesDesc = item.description.toLowerCase().includes(q);
        const matchesTasting = item.tastingNotes.some((t) => t.toLowerCase().includes(q));
        const matchesOrigin = item.origins?.toLowerCase().includes(q);
        if (!matchesName && !matchesDesc && !matchesTasting && !matchesOrigin) {
          return false;
        }
      }
      return true;
    });
  }, [selectedCategory, selectedTag, searchQuery]);

  return (
    <section id="menu" className="py-20 bg-[#F4EFE6] border-y border-[#E8DFC8] scroll-mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#EAE2D5] border border-[#DDD3C2] text-xs font-bold text-[#8C5E3C] uppercase tracking-wider mb-3">
            <Coffee className="w-3.5 h-3.5" />
            <span>Curated Cafe Menu</span>
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-[#231A14] tracking-tight mb-4">
            Crafted for the Discerning Palate
          </h2>
          <p className="text-sm sm:text-base text-[#6B5C51] leading-relaxed">
            Every extraction is calibrated daily for temperature, grind micron size, and water minerality. Customize with our house-steamed plant milks or local honey syrups.
          </p>
        </div>

        {/* Search & Filter Bar */}
        <div className="bg-[#FAF7F2] p-4 sm:p-5 rounded-2xl border border-[#E0D7C9] shadow-sm mb-10 space-y-4">
          
          <div className="flex flex-col md:flex-row items-center gap-4">
            {/* Search Input */}
            <div className="relative w-full md:flex-1">
              <Search className="w-4 h-4 text-[#8C5E3C] absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                id="menu-search-input"
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search drinks, pastries, beans, tasting notes (e.g. 'Jasmine', 'Oat', 'Cruffin')..."
                className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-[#F4EFE6] border border-[#E0D7C9] text-xs sm:text-sm text-[#2C241E] placeholder:text-[#9E8E81] focus:outline-none focus:ring-2 focus:ring-[#8C5E3C]/40"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-xs font-bold text-[#8C5E3C] hover:text-[#3D2619]"
                >
                  Clear
                </button>
              )}
            </div>

            {/* Quick Tag Pills */}
            <div className="flex items-center gap-1.5 overflow-x-auto w-full md:w-auto pb-1 md:pb-0 scrollbar-none">
              <span className="text-xs font-bold text-[#54463D] whitespace-nowrap mr-1 flex items-center gap-1">
                <Filter className="w-3 h-3 text-[#8C5E3C]" /> Tag:
              </span>
              <button
                onClick={() => setSelectedTag('all')}
                className={`text-xs px-3 py-1.5 rounded-lg font-medium whitespace-nowrap transition-colors cursor-pointer ${
                  selectedTag === 'all'
                    ? 'bg-[#3D2619] text-[#FAF7F2]'
                    : 'bg-[#EFE9DF] text-[#5C4F46] hover:bg-[#E2D9CB]'
                }`}
              >
                All
              </button>
              {quickTags.map((tag) => (
                <button
                  key={tag}
                  onClick={() => setSelectedTag(selectedTag === tag ? 'all' : tag)}
                  className={`text-xs px-3 py-1.5 rounded-lg font-medium whitespace-nowrap transition-colors cursor-pointer ${
                    selectedTag === tag
                      ? 'bg-[#8C5E3C] text-white'
                      : 'bg-[#EFE9DF] text-[#5C4F46] hover:bg-[#E2D9CB]'
                  }`}
                >
                  {tag}
                </button>
              ))}
            </div>
          </div>

          {/* Category Tabs */}
          <div className="flex items-center gap-2 overflow-x-auto pt-2 border-t border-[#EFE9DF] scrollbar-none">
            {categories.map((cat) => {
              const active = selectedCategory === cat.id;
              return (
                <button
                  key={cat.id}
                  onClick={() => setSelectedCategory(cat.id)}
                  className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all whitespace-nowrap cursor-pointer ${
                    active
                      ? 'bg-[#3D2619] text-[#FAF7F2] shadow-sm'
                      : 'bg-[#F0EAE1] text-[#4A3E37] hover:bg-[#E5DCD0]'
                  }`}
                >
                  <span>{cat.icon}</span>
                  <span>{cat.label}</span>
                </button>
              );
            })}
          </div>

        </div>

        {/* Menu Items Grid */}
        {filteredItems.length === 0 ? (
          <div className="text-center py-16 bg-[#FAF7F2] rounded-2xl border border-[#E0D7C9]">
            <Coffee className="w-10 h-10 text-[#C4B3A3] mx-auto mb-3" />
            <h3 className="font-serif text-xl font-bold text-[#2C241E] mb-1">No items found</h3>
            <p className="text-xs text-[#7A6B60] mb-4">
              Try resetting your search query or filter tags.
            </p>
            <button
              onClick={() => {
                setSearchQuery('');
                setSelectedCategory('all');
                setSelectedTag('all');
              }}
              className="text-xs font-semibold px-4 py-2 rounded-lg bg-[#3D2619] text-[#FAF7F2]"
            >
              Reset Filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredItems.map((item) => {
              const isBean = item.category === 'beans';
              return (
                <div
                  key={item.id}
                  id={`menu-card-${item.id}`}
                  className="group bg-[#FAF7F2] rounded-2xl border border-[#E0D7C9] hover:border-[#8C5E3C]/60 shadow-sm hover:shadow-md transition-all flex flex-col overflow-hidden text-left"
                >
                  {/* Card Image */}
                  <div className="relative h-48 w-full overflow-hidden bg-[#E8DFC8]">
                    <img
                      src={item.imageUrl}
                      alt={item.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      referrerPolicy="no-referrer"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent pointer-events-none" />

                    {/* Price Badge */}
                    <div className="absolute top-3 right-3 px-3 py-1 rounded-full bg-[#3D2619]/90 backdrop-blur-xs text-[#FAF7F2] text-xs font-bold shadow-md">
                      ${item.price.toFixed(2)}
                    </div>

                    {/* Left Tag Badge */}
                    <div className="absolute top-3 left-3 flex flex-col gap-1">
                      {item.popular && (
                        <span className="px-2 py-0.5 rounded-md bg-[#D4A373] text-[#2C241E] text-[10px] font-bold uppercase tracking-wider flex items-center gap-1 shadow-sm">
                          <Sparkles className="w-2.5 h-2.5" /> Popular
                        </span>
                      )}
                      {item.seasonal && (
                        <span className="px-2 py-0.5 rounded-md bg-[#8C5E3C] text-white text-[10px] font-bold uppercase tracking-wider shadow-sm">
                          Seasonal
                        </span>
                      )}
                      {item.roastLevel && (
                        <span className="px-2 py-0.5 rounded-md bg-[#3D2619] text-[#FAF7F2] text-[10px] font-medium shadow-sm">
                          {item.roastLevel} Roast
                        </span>
                      )}
                    </div>

                    {/* Category & Origin label at bottom of image */}
                    {item.origins && (
                      <div className="absolute bottom-2 left-3 right-3 text-[11px] font-medium text-[#FAF7F2] truncate drop-shadow-sm">
                        📍 {item.origins}
                      </div>
                    )}
                  </div>

                  {/* Card Content */}
                  <div className="p-5 flex flex-col flex-1 justify-between space-y-4">
                    <div>
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-[10px] uppercase font-bold tracking-widest text-[#8C5E3C]">
                          {item.category === 'slow-brew' ? 'Slow Brew & V60' : item.category.toUpperCase()}
                        </span>
                        {item.calories && (
                          <span className="text-[11px] text-[#8C7D72]">
                            {item.calories} kcal
                          </span>
                        )}
                      </div>

                      <h3 className="font-serif text-lg font-bold text-[#231A14] leading-snug mb-1.5 group-hover:text-[#8C5E3C] transition-colors">
                        {item.name}
                      </h3>

                      <p className="text-xs text-[#6B5C51] line-clamp-2 leading-relaxed mb-3">
                        {item.description}
                      </p>

                      {/* Tasting Notes */}
                      {item.tastingNotes && (
                        <div className="flex flex-wrap gap-1.5">
                          {item.tastingNotes.slice(0, 3).map((note) => (
                            <span
                              key={note}
                              className="text-[10px] px-2 py-0.5 rounded bg-[#EFE9DF] text-[#4A3E37] font-medium"
                            >
                              {note}
                            </span>
                          ))}
                        </div>
                      )}
                    </div>

                    {/* Actions */}
                    <div className="pt-3 border-t border-[#EFE9DF] flex items-center gap-2">
                      <button
                        id={`btn-customize-${item.id}`}
                        onClick={() => onSelectItem(item)}
                        className="flex-1 py-2.5 px-3 rounded-xl bg-[#EAE2D5] hover:bg-[#DDD3C2] text-[#3D2619] font-semibold text-xs transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
                      >
                        <span>{isBean ? 'Select Grind' : 'Customize'}</span>
                      </button>

                      <button
                        id={`btn-quickadd-${item.id}`}
                        onClick={() => onQuickAdd(item)}
                        title="Quick add with default options"
                        aria-label={`Quick add ${item.name} to bag`}
                        className="w-10 h-10 rounded-xl bg-[#3D2619] hover:bg-[#533522] text-[#FAF7F2] flex items-center justify-center transition-colors shadow-sm cursor-pointer shrink-0"
                      >
                        <Plus className="w-4 h-4 text-[#D4A373]" />
                      </button>
                    </div>

                  </div>
                </div>
              );
            })}
          </div>
        )}

      </div>
    </section>
  );
};
