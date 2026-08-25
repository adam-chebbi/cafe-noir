import React, { useState } from 'react';
import { Coffee, Mail, Check, Heart, ArrowUp, Instagram, Facebook, Twitter, MapPin, Phone } from 'lucide-react';

export const Footer: React.FC = () => {
  const [email, setEmail] = useState('');
  const [isSubscribed, setIsSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setIsSubscribed(true);
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-[#1C1510] text-[#FAF7F2] pt-16 pb-12 border-t border-[#36271D]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Top Newsletter Card */}
        <div className="bg-[#2D221A] rounded-3xl p-8 sm:p-10 border border-[#473428] mb-16 relative overflow-hidden">
          <div className="max-w-2xl text-left space-y-3">
            <div className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-[#D4A373]">
              <Mail className="w-3.5 h-3.5" />
              <span>Join The Roasters Journal</span>
            </div>
            <h3 className="font-serif text-2xl sm:text-3xl font-bold text-[#FAF7F2]">
              Get 10% Off Your First Order + Weekly Tasting Notes
            </h3>
            <p className="text-xs sm:text-sm text-[#B8A698]">
              Be the first to hear about rare micro-lot drops, barista workshops, and seasonal bakery specials.
            </p>

            {isSubscribed ? (
              <div className="p-4 rounded-xl bg-[#3D2E24] border border-[#5C4537] flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-emerald-600 text-white flex items-center justify-center shrink-0">
                  <Check className="w-4 h-4" />
                </div>
                <div className="text-xs">
                  <p className="font-bold text-white">You're subscribed! Use promo code:</p>
                  <p className="text-[#D4A373] font-mono font-bold text-sm">FIRSTCUP10</p>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row gap-2.5 pt-2">
                <input
                  type="email"
                  required
                  placeholder="Enter your email address..."
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="px-4 py-3 rounded-xl bg-[#1B140F] border border-[#473428] text-xs text-white placeholder:text-[#8C7D72] focus:outline-none focus:ring-1 focus:ring-[#D4A373] flex-1"
                />
                <button
                  type="submit"
                  className="px-6 py-3 rounded-xl bg-[#D4A373] hover:bg-[#C28E5D] text-[#231A14] font-bold text-xs sm:text-sm transition-colors cursor-pointer shrink-0 shadow-sm"
                >
                  Claim 10% Discount
                </button>
              </form>
            )}
          </div>
        </div>

        {/* Footer Navigation Columns */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-12 border-b border-[#36271D] text-left">
          
          {/* Brand Info */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-[#3D2E24] text-[#D4A373] flex items-center justify-center">
                <Coffee className="w-5 h-5" />
              </div>
              <div>
                <span className="block font-serif text-xl font-bold tracking-wider uppercase text-white">
                  Amber & Oak
                </span>
                <span className="text-[10px] tracking-widest font-medium text-[#D4A373] uppercase">
                  Coffee Roasters
                </span>
              </div>
            </div>
            
            <p className="text-xs text-[#B8A698] leading-relaxed max-w-sm">
              Artisan small-batch roastery and neighborhood cafe dedicated to sustainable direct-trade origins, meticulous hand extractions, and sunrise sourdough bakery.
            </p>

            <div className="flex items-center gap-3 pt-2">
              <a href="#" className="w-8 h-8 rounded-lg bg-[#2D221A] hover:bg-[#3D2E24] flex items-center justify-center text-[#D4A373] transition-colors" aria-label="Instagram">
                <Instagram className="w-4 h-4" />
              </a>
              <a href="#" className="w-8 h-8 rounded-lg bg-[#2D221A] hover:bg-[#3D2E24] flex items-center justify-center text-[#D4A373] transition-colors" aria-label="Facebook">
                <Facebook className="w-4 h-4" />
              </a>
              <a href="#" className="w-8 h-8 rounded-lg bg-[#2D221A] hover:bg-[#3D2E24] flex items-center justify-center text-[#D4A373] transition-colors" aria-label="Twitter">
                <Twitter className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-[#D4A373]">
              Menu & Offerings
            </h4>
            <ul className="space-y-2 text-xs text-[#C7B5A7]">
              <li><a href="#menu" className="hover:text-white transition-colors">Espresso Bar</a></li>
              <li><a href="#menu" className="hover:text-white transition-colors">V60 Pour-Over</a></li>
              <li><a href="#menu" className="hover:text-white transition-colors">Kyoto Cold Drip</a></li>
              <li><a href="#menu" className="hover:text-white transition-colors">Bakery & Cruffins</a></li>
              <li><a href="#beans" className="hover:text-white transition-colors">Whole Bean Bags</a></li>
            </ul>
          </div>

          {/* Experience */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-[#D4A373]">
              The Experience
            </h4>
            <ul className="space-y-2 text-xs text-[#C7B5A7]">
              <li><a href="#quiz" className="hover:text-white transition-colors">Palate Quiz</a></li>
              <li><a href="#story" className="hover:text-white transition-colors">Our Roastery Story</a></li>
              <li><a href="#visit" className="hover:text-white transition-colors">Table Reservation</a></li>
              <li><a href="#beans" className="hover:text-white transition-colors">Coffee Subscription</a></li>
              <li><a href="#visit" className="hover:text-white transition-colors">Cafe Amenities</a></li>
            </ul>
          </div>

          {/* Contact Details */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-[#D4A373]">
              Find Us
            </h4>
            <div className="space-y-2 text-xs text-[#C7B5A7]">
              <p className="flex items-start gap-2">
                <MapPin className="w-3.5 h-3.5 text-[#D4A373] shrink-0 mt-0.5" />
                <span>428 Oakwood Blvd, Suite 104, Portland, OR</span>
              </p>
              <p className="flex items-center gap-2">
                <Phone className="w-3.5 h-3.5 text-[#D4A373] shrink-0" />
                <span>(555) 234-8921</span>
              </p>
              <p className="text-[11px] text-[#8C7D72] pt-1">
                Mon-Fri: 6:30am - 7:30pm<br />
                Sat-Sun: 7:00am - 8:30pm
              </p>
            </div>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#8C7D72]">
          <p>© {new Date().getFullYear()} Amber & Oak Coffee Roasters. All rights reserved.</p>
          
          <div className="flex items-center gap-4">
            <span>Direct Trade Certified</span>
            <span>•</span>
            <span>100% Plant-Fiber Zero-Waste</span>
            <button
              onClick={scrollToTop}
              className="p-2 rounded-lg bg-[#2D221A] hover:bg-[#3D2E24] text-[#D4A373] transition-colors flex items-center gap-1 ml-2 cursor-pointer"
              title="Back to top"
            >
              <ArrowUp className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

      </div>
    </footer>
  );
};
