import React, { useState } from 'react';
import { MapPin, Clock, Wifi, Sparkles, Calendar, Users, Phone, Mail, Check, Dog, Bike, Zap } from 'lucide-react';
import { CAFE_HOURS } from '../data/coffeeData';
import { TableReservation } from '../types';

interface VisitAndHoursProps {
  onBookReservation: (reservation: TableReservation) => void;
}

export const VisitAndHours: React.FC<VisitAndHoursProps> = ({ onBookReservation }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [date, setDate] = useState(() => {
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    return tomorrow.toISOString().split('T')[0];
  });
  const [time, setTime] = useState('10:00 AM');
  const [guests, setGuests] = useState(2);
  const [seatingArea, setSeatingArea] = useState<
    'Indoor Sunlit Bar' | 'Garden Terrace' | 'Quiet Study Nook' | 'Main Cafe Roastery'
  >('Indoor Sunlit Bar');
  const [specialRequest, setSpecialRequest] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);

  const timeSlots = [
    '7:30 AM',
    '8:30 AM',
    '10:00 AM',
    '11:30 AM',
    '1:00 PM',
    '2:30 PM',
    '4:00 PM',
    '5:30 PM',
    '6:30 PM'
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email) return;

    const newReservation: TableReservation = {
      id: `RES-${Date.now().toString().slice(-5)}`,
      name,
      email,
      phone: phone || '(555) 019-2834',
      date,
      time,
      guests,
      seatingArea,
      specialRequest,
      createdAt: new Date().toISOString(),
    };

    onBookReservation(newReservation);
    setIsSubmitted(true);
  };

  const amenities = [
    { icon: <Wifi className="w-4 h-4 text-[#8C5E3C]" />, label: '300 Mbps Fiber Wi-Fi' },
    { icon: <Dog className="w-4 h-4 text-[#8C5E3C]" />, label: 'Pet-Friendly Garden Patio' },
    { icon: <Bike className="w-4 h-4 text-[#8C5E3C]" />, label: 'Secure Bike Racks' },
    { icon: <Zap className="w-4 h-4 text-[#8C5E3C]" />, label: 'Plentiful Power Outlets' },
  ];

  return (
    <section id="visit" className="py-20 bg-[#F4EFE6] border-t border-[#E8DFC8] scroll-mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#EAE2D5] border border-[#DDD3C2] text-xs font-bold text-[#8C5E3C] uppercase tracking-wider mb-3">
            <MapPin className="w-3.5 h-3.5" />
            <span>Visit The Roastery</span>
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-[#231A14] tracking-tight mb-4">
            A Welcoming Space for Work, Gathering & Ritual
          </h2>
          <p className="text-sm sm:text-base text-[#6B5C51] leading-relaxed">
            Step in for morning focus with high-speed fiber internet and soft ambient jazz, or enjoy a sunny afternoon chemex on our heated garden terrace.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 text-left">
          
          {/* Left Column: Hours & Info */}
          <div className="lg:col-span-5 space-y-6">
            
            {/* Location & Contact Card */}
            <div className="bg-[#FAF7F2] rounded-2xl border border-[#E0D7C9] p-6 shadow-sm space-y-4">
              <h3 className="font-serif text-xl font-bold text-[#2C241E] flex items-center gap-2">
                <MapPin className="w-5 h-5 text-[#8C5E3C]" />
                <span>Our Location</span>
              </h3>
              
              <div>
                <p className="text-sm font-semibold text-[#2C241E]">
                  Amber & Oak Coffee Roastery
                </p>
                <p className="text-xs text-[#6B5C51] leading-relaxed">
                  428 Oakwood Blvd, Suite 104<br />
                  Portland, OR 97201
                </p>
                <p className="text-xs text-[#8C5E3C] font-semibold mt-1">
                  (555) 234-8921 • hello@amberandoakcoffee.com
                </p>
              </div>

              {/* Amenities */}
              <div className="pt-3 border-t border-[#EFE9DF]">
                <span className="text-[11px] font-bold uppercase tracking-wider text-[#8C5E3C] block mb-2">
                  Cafe Amenities
                </span>
                <div className="grid grid-cols-2 gap-2">
                  {amenities.map((item, i) => (
                    <div key={i} className="flex items-center gap-2 text-xs text-[#4A3E37]">
                      {item.icon}
                      <span>{item.label}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Operating Hours Card */}
            <div className="bg-[#FAF7F2] rounded-2xl border border-[#E0D7C9] p-6 shadow-sm space-y-4">
              <h3 className="font-serif text-xl font-bold text-[#2C241E] flex items-center gap-2">
                <Clock className="w-5 h-5 text-[#8C5E3C]" />
                <span>Cafe & Kitchen Hours</span>
              </h3>

              <div className="space-y-3">
                {CAFE_HOURS.map((h) => (
                  <div key={h.day} className="pb-2 border-b border-[#EFE9DF] last:border-0 last:pb-0">
                    <div className="flex justify-between items-center text-xs font-bold text-[#2C241E]">
                      <span>{h.day}</span>
                      <span className="text-[#8C5E3C]">{h.hours}</span>
                    </div>
                    <p className="text-[11px] text-[#7A6B60] mt-0.5">{h.kitchen}</p>
                  </div>
                ))}
              </div>
            </div>

          </div>

          {/* Right Column: Table / Nook Reservation Form */}
          <div className="lg:col-span-7">
            <div className="bg-[#FAF7F2] rounded-2xl border border-[#E0D7C9] p-6 sm:p-8 shadow-sm">
              <div className="mb-6">
                <span className="text-xs font-bold uppercase tracking-wider text-[#8C5E3C] flex items-center gap-1 mb-1">
                  <Calendar className="w-3.5 h-3.5" /> Advance Table Booking
                </span>
                <h3 className="font-serif text-2xl sm:text-3xl font-bold text-[#231A14]">
                  Reserve a Table or Study Nook
                </h3>
                <p className="text-xs text-[#6B5C51] mt-1">
                  Guaranteed seat, fresh water carafes, and priority barista service upon arrival.
                </p>
              </div>

              {isSubmitted ? (
                <div className="p-8 rounded-xl bg-[#EAE2D5] border border-[#DDD3C2] text-center space-y-4">
                  <div className="w-12 h-12 rounded-full bg-emerald-600 text-white flex items-center justify-center mx-auto shadow-md">
                    <Check className="w-6 h-6" />
                  </div>
                  <div>
                    <h4 className="font-serif text-2xl font-bold text-[#2C241E]">
                      Reservation Confirmed!
                    </h4>
                    <p className="text-xs text-[#5C4F46] mt-1">
                      We've held a table for {name} ({guests} guests) in the {seatingArea} on {date} at {time}.
                    </p>
                  </div>
                  <button
                    onClick={() => setIsSubmitted(false)}
                    className="text-xs font-semibold px-4 py-2 rounded-lg bg-[#3D2619] text-[#FAF7F2] hover:bg-[#533522] transition-colors"
                  >
                    Book Another Visit
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-[#3D2619] mb-1">
                        Full Name *
                      </label>
                      <input
                        type="text"
                        required
                        placeholder="Elena Rostova"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="w-full p-2.5 rounded-lg bg-[#F4EFE6] border border-[#E0D7C9] text-xs text-[#2C241E] focus:outline-none focus:ring-1 focus:ring-[#8C5E3C]"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-[#3D2619] mb-1">
                        Email Address *
                      </label>
                      <input
                        type="email"
                        required
                        placeholder="elena@example.com"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full p-2.5 rounded-lg bg-[#F4EFE6] border border-[#E0D7C9] text-xs text-[#2C241E] focus:outline-none focus:ring-1 focus:ring-[#8C5E3C]"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-[#3D2619] mb-1">
                        Phone (Optional)
                      </label>
                      <input
                        type="tel"
                        placeholder="(555) 000-0000"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        className="w-full p-2.5 rounded-lg bg-[#F4EFE6] border border-[#E0D7C9] text-xs text-[#2C241E] focus:outline-none focus:ring-1 focus:ring-[#8C5E3C]"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-[#3D2619] mb-1">
                        Date *
                      </label>
                      <input
                        type="date"
                        required
                        value={date}
                        onChange={(e) => setDate(e.target.value)}
                        className="w-full p-2.5 rounded-lg bg-[#F4EFE6] border border-[#E0D7C9] text-xs text-[#2C241E] focus:outline-none focus:ring-1 focus:ring-[#8C5E3C]"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-[#3D2619] mb-1">
                        Party Size
                      </label>
                      <select
                        value={guests}
                        onChange={(e) => setGuests(Number(e.target.value))}
                        className="w-full p-2.5 rounded-lg bg-[#F4EFE6] border border-[#E0D7C9] text-xs text-[#2C241E] focus:outline-none focus:ring-1 focus:ring-[#8C5E3C]"
                      >
                        <option value={1}>1 Person (Solo Nook)</option>
                        <option value={2}>2 People (Cozy Table)</option>
                        <option value={3}>3 People</option>
                        <option value={4}>4 People (Corner Booth)</option>
                        <option value={6}>5-6 People (Meeting Table)</option>
                      </select>
                    </div>
                  </div>

                  {/* Time slot selector */}
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-[#3D2619] mb-1.5">
                      Preferred Arrival Time
                    </label>
                    <div className="grid grid-cols-3 sm:grid-cols-5 gap-2">
                      {timeSlots.map((slot) => (
                        <button
                          type="button"
                          key={slot}
                          onClick={() => setTime(slot)}
                          className={`py-2 px-2 rounded-lg border text-xs font-semibold transition-colors cursor-pointer text-center ${
                            time === slot
                              ? 'border-[#3D2619] bg-[#3D2619] text-[#FAF7F2]'
                              : 'border-[#E0D7C9] bg-[#F4EFE6] text-[#4A3E37] hover:bg-[#EAE2D5]'
                          }`}
                        >
                          {slot}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Preferred Area */}
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-[#3D2619] mb-1.5">
                      Seating Vibe
                    </label>
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                      {(
                        [
                          'Indoor Sunlit Bar',
                          'Garden Terrace',
                          'Quiet Study Nook',
                          'Main Cafe Roastery',
                        ] as const
                      ).map((area) => (
                        <button
                          type="button"
                          key={area}
                          onClick={() => setSeatingArea(area)}
                          className={`p-2 rounded-lg border text-[11px] font-semibold text-center transition-colors cursor-pointer ${
                            seatingArea === area
                              ? 'border-[#8C5E3C] bg-[#EAE2D5] text-[#3D2619]'
                              : 'border-[#E0D7C9] bg-[#F4EFE6] text-[#6B5C51] hover:bg-[#EAE2D5]'
                          }`}
                        >
                          {area}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Special Requests */}
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-[#3D2619] mb-1">
                      Special Notes (Optional)
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. High chair needed, quiet call scheduled, bringing dog on terrace..."
                      value={specialRequest}
                      onChange={(e) => setSpecialRequest(e.target.value)}
                      className="w-full p-2.5 rounded-lg bg-[#F4EFE6] border border-[#E0D7C9] text-xs text-[#2C241E] focus:outline-none focus:ring-1 focus:ring-[#8C5E3C]"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full py-3.5 px-6 rounded-xl bg-[#3D2619] hover:bg-[#533522] text-[#FAF7F2] font-semibold text-sm transition-colors shadow-md cursor-pointer"
                  >
                    Confirm Table Reservation
                  </button>
                </form>
              )}

            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
