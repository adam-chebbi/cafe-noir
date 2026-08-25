import React from 'react';
import { ArrowDown, Sparkles, Award, Flame, HeartHandshake, Compass } from 'lucide-react';
import { HERO_IMAGE } from '../data/coffeeData';

interface HeroProps {
  onExploreMenu: () => void;
  onTakeQuiz: () => void;
  onOpenReservation: () => void;
}

export const Hero: React.FC<HeroProps> = ({
  onExploreMenu,
  onTakeQuiz,
  onOpenReservation,
}) => {
  return (
    <section id="hero-section" className="relative pt-28 pb-16 lg:pt-36 lg:pb-24 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* Left Hero Narrative */}
          <div className="lg:col-span-7 flex flex-col items-start text-left">
            
            {/* Pill Tag */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#EAE2D5] border border-[#DDD3C2] text-xs font-semibold text-[#6B4B32] mb-6">
              <Sparkles className="w-3.5 h-3.5 text-[#8C5E3C]" />
              <span>Small-Batch Roastery & Hearth Kitchen</span>
            </div>

            {/* Main Headline */}
            <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-[#231A14] leading-[1.12] mb-6">
              Honoring the daily ritual of <span className="italic font-normal text-[#8C5E3C]">exceptional</span> coffee.
            </h1>

            {/* Subtext */}
            <p className="text-base sm:text-lg text-[#5E5047] leading-relaxed max-w-2xl mb-8">
              We source directly from generational coffee estates in Ethiopia, Colombia, and Costa Rica—micro-roasting in small 12kg drums to coax out vibrant florals, silky chocolates, and delicate honey sweetness.
            </p>

            {/* CTAs */}
            <div className="flex flex-wrap items-center gap-4 w-full sm:w-auto mb-10">
              <button
                id="hero-explore-menu-btn"
                onClick={onExploreMenu}
                className="w-full sm:w-auto px-7 py-3.5 rounded-xl bg-[#3D2619] text-[#FAF7F2] font-semibold text-sm hover:bg-[#533522] transition-all shadow-md hover:shadow-lg flex items-center justify-center gap-2 cursor-pointer group"
              >
                <span>Explore Full Menu</span>
                <ArrowDown className="w-4 h-4 text-[#D4A373] group-hover:translate-y-0.5 transition-transform" />
              </button>

              <button
                id="hero-coffee-finder-btn"
                onClick={onTakeQuiz}
                className="w-full sm:w-auto px-6 py-3.5 rounded-xl bg-[#F0EAE1] hover:bg-[#E5DCD0] border border-[#DDD3C2] text-[#3D2619] font-semibold text-sm transition-colors flex items-center justify-center gap-2 cursor-pointer"
              >
                <Compass className="w-4 h-4 text-[#8C5E3C]" />
                <span>Find Your Ideal Cup</span>
              </button>

              <button
                id="hero-reserve-table-btn"
                onClick={onOpenReservation}
                className="w-full sm:w-auto px-5 py-3.5 text-xs font-semibold text-[#8C5E3C] hover:text-[#5C3A24] underline-offset-4 hover:underline text-center cursor-pointer"
              >
                Reserve a Table →
              </button>
            </div>

            {/* Feature Highlights Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-6 border-t border-[#EAE2D5] w-full">
              <div className="flex flex-col">
                <div className="flex items-center gap-1.5 text-xs font-bold text-[#2C241E] mb-1">
                  <Flame className="w-3.5 h-3.5 text-[#8C5E3C]" />
                  <span>Micro-Roasted</span>
                </div>
                <p className="text-xs text-[#7A6B60]">12kg drums 3x weekly</p>
              </div>

              <div className="flex flex-col">
                <div className="flex items-center gap-1.5 text-xs font-bold text-[#2C241E] mb-1">
                  <HeartHandshake className="w-3.5 h-3.5 text-[#8C5E3C]" />
                  <span>100% Direct</span>
                </div>
                <p className="text-xs text-[#7A6B60]">Fair farm partnerships</p>
              </div>

              <div className="flex flex-col">
                <div className="flex items-center gap-1.5 text-xs font-bold text-[#2C241E] mb-1">
                  <Sparkles className="w-3.5 h-3.5 text-[#8C5E3C]" />
                  <span>6 AM Bake</span>
                </div>
                <p className="text-xs text-[#7A6B60]">Fresh cruffins & breads</p>
              </div>

              <div className="flex flex-col">
                <div className="flex items-center gap-1.5 text-xs font-bold text-[#2C241E] mb-1">
                  <Award className="w-3.5 h-3.5 text-[#8C5E3C]" />
                  <span>4.9★ Rating</span>
                </div>
                <p className="text-xs text-[#7A6B60]">1,200+ local regulars</p>
              </div>
            </div>

          </div>

          {/* Right Hero Image Card */}
          <div className="lg:col-span-5 relative">
            <div className="relative mx-auto max-w-md lg:max-w-none">
              
              {/* Outer decorative backdrop border */}
              <div className="relative rounded-2xl p-2 bg-[#EFE9DF] border border-[#DDD3C2] shadow-xl">
                <div className="relative overflow-hidden rounded-xl aspect-[4/3] sm:aspect-[16/11]">
                  <img
                    src={HERO_IMAGE}
                    alt="Warm sunlit artisan interior of Amber and Oak Coffee Roasters"
                    className="w-full h-full object-cover transform hover:scale-105 transition-transform duration-700"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent pointer-events-none" />

                  {/* Badge floating on image */}
                  <div className="absolute bottom-4 left-4 right-4 p-3 rounded-lg bg-[#FAF7F2]/90 backdrop-blur-md border border-white/60 shadow-lg flex items-center justify-between">
                    <div>
                      <span className="block text-[11px] font-bold text-[#8C5E3C] uppercase tracking-wider">
                        Today's Feature Single Origin
                      </span>
                      <span className="text-sm font-bold text-[#2C241E]">
                        Ethiopia Yirgacheffe G1 Chelchele
                      </span>
                    </div>
                    <span className="text-xs font-semibold px-2 py-1 rounded bg-[#3D2619] text-[#FAF7F2]">
                      $6.50
                    </span>
                  </div>
                </div>
              </div>

              {/* Floating review card */}
              <div className="hidden sm:flex absolute -bottom-6 -left-6 max-w-xs p-3.5 rounded-xl bg-[#FAF7F2] border border-[#E0D7C9] shadow-lg items-center gap-3">
                <div className="w-9 h-9 rounded-full bg-[#D4A373] text-[#2C241E] font-bold text-xs flex items-center justify-center shrink-0">
                  98%
                </div>
                <div>
                  <div className="flex items-center gap-0.5 text-amber-500 text-xs">
                    ★★★★★
                  </div>
                  <p className="text-[11px] text-[#54463D] font-medium leading-tight">
                    "The finest flat white and morning cruffin in town."
                  </p>
                </div>
              </div>

            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
