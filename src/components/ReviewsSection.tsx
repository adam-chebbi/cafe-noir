import React from 'react';
import { Star, MessageSquareQuote, Heart, Coffee } from 'lucide-react';
import { REVIEWS } from '../data/coffeeData';

export const ReviewsSection: React.FC = () => {
  return (
    <section id="reviews" className="py-20 bg-[#FAF7F2] border-t border-[#E8DFC8]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#EAE2D5] border border-[#DDD3C2] text-xs font-bold text-[#8C5E3C] uppercase tracking-wider mb-3">
            <MessageSquareQuote className="w-3.5 h-3.5" />
            <span>Community Love</span>
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#231A14] tracking-tight mb-3">
            Loved by Neighborhood Coffee Lovers
          </h2>
          <div className="flex items-center justify-center gap-2 text-sm font-semibold text-[#54463D]">
            <div className="flex text-amber-500">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-4 h-4 fill-amber-500 text-amber-500" />
              ))}
            </div>
            <span>4.9 / 5.0 (1,240+ Verified Reviews)</span>
          </div>
        </div>

        {/* Reviews Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-left mb-14">
          {REVIEWS.map((rev) => (
            <div
              key={rev.id}
              className="bg-[#F4EFE6] rounded-2xl border border-[#E0D7C9] p-6 sm:p-7 flex flex-col justify-between shadow-xs hover:shadow-md transition-shadow"
            >
              <div className="space-y-4">
                {/* Stars */}
                <div className="flex items-center justify-between">
                  <div className="flex text-amber-500 gap-0.5">
                    {[...Array(rev.rating)].map((_, i) => (
                      <Star key={i} className="w-3.5 h-3.5 fill-amber-500 text-amber-500" />
                    ))}
                  </div>
                  <span className="text-[11px] text-[#8C7D72]">{rev.date}</span>
                </div>

                {/* Comment */}
                <p className="text-xs sm:text-sm text-[#4A3E37] leading-relaxed italic">
                  "{rev.comment}"
                </p>
              </div>

              {/* Author */}
              <div className="pt-4 border-t border-[#E0D7C9] flex items-center gap-3 mt-4">
                <img
                  src={rev.avatar}
                  alt={rev.author}
                  className="w-10 h-10 rounded-full object-cover border border-[#DDD3C2]"
                  referrerPolicy="no-referrer"
                />
                <div>
                  <h4 className="text-xs font-bold text-[#2C241E]">{rev.author}</h4>
                  <p className="text-[11px] text-[#7A6B60]">{rev.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Instagram / Community Grid Strip */}
        <div className="rounded-2xl bg-[#EFE9DF] border border-[#DDD3C2] p-6 sm:p-8 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="text-left space-y-1">
            <span className="text-xs font-bold uppercase tracking-wider text-[#8C5E3C] flex items-center gap-1">
              <Heart className="w-3.5 h-3.5 fill-[#8C5E3C]" /> Tag #AmberAndOakRoast
            </span>
            <h4 className="font-serif text-xl sm:text-2xl font-bold text-[#2C241E]">
              Share Your Morning Brew Ritual
            </h4>
            <p className="text-xs text-[#6B5C51]">
              Tag us in your pour-over reels or latte art photos on Instagram for a chance to win a free monthly coffee subscription.
            </p>
          </div>

          <div className="flex items-center gap-3 shrink-0">
            <span className="text-xs font-bold text-[#3D2619] bg-[#FAF7F2] px-4 py-2 rounded-xl border border-[#DDD3C2]">
              @amberandoakcoffee
            </span>
          </div>
        </div>

      </div>
    </section>
  );
};
