import React from 'react';
import { Sparkles, ShieldCheck, HeartHandshake, Leaf, Award, Coffee, CheckCircle2 } from 'lucide-react';
import { LATTE_ART_IMAGE, CAFE_FEATURES } from '../data/coffeeData';

export const OurStory: React.FC = () => {
  return (
    <section id="story" className="py-20 bg-[#FAF7F2] scroll-mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Story Top Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center mb-16">
          
          {/* Left Text Narrative */}
          <div className="lg:col-span-7 text-left space-y-6">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#EAE2D5] border border-[#DDD3C2] text-xs font-bold text-[#8C5E3C] uppercase tracking-wider">
              <Coffee className="w-3.5 h-3.5 text-[#8C5E3C]" />
              <span>Our Philosophy & Heritage</span>
            </div>

            <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-[#231A14] leading-[1.15] tracking-tight">
              Rooted in Respect for the Bean, the Farmer & the Cup.
            </h2>

            <p className="text-sm sm:text-base text-[#5E5047] leading-relaxed">
              Founded in 2019, Amber & Oak was born from a simple conviction: coffee is an agricultural fruit whose delicate nuance deserves reverence. We bypass commodity brokers to establish long-term, equitable contracts with independent family farms in high-altitude volcanic regions.
            </p>

            <p className="text-sm sm:text-base text-[#5E5047] leading-relaxed">
              Every morning in our cafe roastery, our baristas taste and dial-in every single extraction. From our house-whipped lemon ricotta to our double ristretto flat whites, nothing here is rushed.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
              <div className="flex items-center gap-2 text-xs font-semibold text-[#2C241E]">
                <CheckCircle2 className="w-4 h-4 text-emerald-700 shrink-0" />
                <span>Fair pricing 2.5x above fair-trade baseline</span>
              </div>
              <div className="flex items-center gap-2 text-xs font-semibold text-[#2C241E]">
                <CheckCircle2 className="w-4 h-4 text-emerald-700 shrink-0" />
                <span>100% Plant-fiber compostable cups</span>
              </div>
              <div className="flex items-center gap-2 text-xs font-semibold text-[#2C241E]">
                <CheckCircle2 className="w-4 h-4 text-emerald-700 shrink-0" />
                <span>Zero artificial syrups or preservatives</span>
              </div>
              <div className="flex items-center gap-2 text-xs font-semibold text-[#2C241E]">
                <CheckCircle2 className="w-4 h-4 text-emerald-700 shrink-0" />
                <span>Fresh micro-batch roast profile tracking</span>
              </div>
            </div>
          </div>

          {/* Right Image Feature */}
          <div className="lg:col-span-5 relative">
            <div className="relative rounded-2xl p-2 bg-[#EFE9DF] border border-[#DDD3C2] shadow-xl">
              <div className="relative overflow-hidden rounded-xl aspect-[4/3]">
                <img
                  src={LATTE_ART_IMAGE}
                  alt="Barista pouring silky latte art with precision"
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
                
                <div className="absolute bottom-4 left-4 right-4 p-3 rounded-lg bg-[#FAF7F2]/90 backdrop-blur-md border border-white/60 shadow-md flex items-center justify-between">
                  <div className="text-left">
                    <span className="block text-[10px] font-bold text-[#8C5E3C] uppercase tracking-wider">
                      Craft Standard
                    </span>
                    <span className="text-xs font-bold text-[#2C241E]">
                      Silky 65°C Steamed Microfoam
                    </span>
                  </div>
                  <span className="text-[11px] font-semibold px-2 py-1 rounded bg-[#D4A373] text-[#2C241E]">
                    Hand-Poured
                  </span>
                </div>
              </div>
            </div>
          </div>

        </div>

        {/* 4 Pillars Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 text-left">
          {CAFE_FEATURES.map((feature, idx) => {
            const iconMap: Record<string, React.ReactNode> = {
              Sparkles: <Sparkles className="w-5 h-5 text-[#8C5E3C]" />,
              ShieldCheck: <ShieldCheck className="w-5 h-5 text-[#8C5E3C]" />,
              HeartHandshake: <HeartHandshake className="w-5 h-5 text-[#8C5E3C]" />,
              Leaf: <Leaf className="w-5 h-5 text-[#8C5E3C]" />,
            };

            return (
              <div
                key={idx}
                className="bg-[#F4EFE6] rounded-2xl border border-[#E0D7C9] p-6 flex flex-col justify-between hover:shadow-md transition-shadow"
              >
                <div>
                  <div className="w-10 h-10 rounded-xl bg-[#FAF7F2] border border-[#DDD3C2] flex items-center justify-center mb-4 shadow-xs">
                    {iconMap[feature.icon] || <Coffee className="w-5 h-5 text-[#8C5E3C]" />}
                  </div>
                  <h3 className="font-serif text-lg font-bold text-[#231A14] mb-2">
                    {feature.title}
                  </h3>
                  <p className="text-xs text-[#6B5C51] leading-relaxed">
                    {feature.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
