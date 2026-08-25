import React, { useState } from 'react';
import { X, Calendar, Clock, Users, MapPin, Check, Sparkles } from 'lucide-react';
import { TableReservation } from '../types';

interface ReservationModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: (reservation: TableReservation) => void;
}

export const ReservationModal: React.FC<ReservationModalProps> = ({
  isOpen,
  onClose,
  onConfirm,
}) => {
  if (!isOpen) return null;

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [date, setDate] = useState(() => {
    const d = new Date();
    d.setDate(d.getDate() + 1);
    return d.toISOString().split('T')[0];
  });
  const [time, setTime] = useState('10:00 AM');
  const [guests, setGuests] = useState(2);
  const [seatingArea, setSeatingArea] = useState<
    'Indoor Sunlit Bar' | 'Garden Terrace' | 'Quiet Study Nook' | 'Main Cafe Roastery'
  >('Indoor Sunlit Bar');
  const [specialRequest, setSpecialRequest] = useState('');
  const [isSuccess, setIsSuccess] = useState(false);

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

    const reservation: TableReservation = {
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

    onConfirm(reservation);
    setIsSuccess(true);
  };

  return (
    <div
      className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-xs flex items-center justify-center p-4"
      role="dialog"
      aria-modal="true"
    >
      <div className="relative w-full max-w-lg bg-[#FAF7F2] rounded-3xl shadow-2xl border border-[#E0D7C9] overflow-hidden my-8 text-left">
        
        {/* Header */}
        <div className="p-6 bg-[#3D2619] text-[#FAF7F2] relative">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white transition-colors cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>

          <div className="inline-flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-widest text-[#D4A373] mb-1">
            <Calendar className="w-3.5 h-3.5" />
            <span>Table & Nook Reservation</span>
          </div>

          <h2 className="font-serif text-2xl sm:text-3xl font-bold">
            Book Your Cafe Seat
          </h2>
          <p className="text-xs text-[#C7B5A7] mt-1">
            Complimentary table booking with guaranteed electrical outlets and high-speed Wi-Fi.
          </p>
        </div>

        {/* Content */}
        <div className="p-6">
          {isSuccess ? (
            <div className="text-center py-6 space-y-4">
              <div className="w-14 h-14 rounded-full bg-emerald-600 text-white flex items-center justify-center mx-auto shadow-md">
                <Check className="w-7 h-7" />
              </div>
              <h3 className="font-serif text-2xl font-bold text-[#2C241E]">
                Table Reserved Successfully!
              </h3>
              <p className="text-xs text-[#5C4F46] max-w-sm mx-auto leading-relaxed">
                We're holding your spot for <strong>{name}</strong> on <strong>{date}</strong> at <strong>{time}</strong> in the <strong>{seatingArea}</strong>. Confirmation has been emailed.
              </p>
              <button
                onClick={onClose}
                className="px-6 py-2.5 rounded-xl bg-[#3D2619] text-[#FAF7F2] text-xs font-semibold hover:bg-[#533522] transition-colors"
              >
                Close & Return to Cafe
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-[#3D2619] mb-1">
                    Your Name *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="Marcus Vance"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full p-2.5 rounded-lg bg-[#F4EFE6] border border-[#E0D7C9] text-xs text-[#2C241E] focus:outline-none focus:ring-1 focus:ring-[#8C5E3C]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-[#3D2619] mb-1">
                    Email *
                  </label>
                  <input
                    type="email"
                    required
                    placeholder="marcus@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full p-2.5 rounded-lg bg-[#F4EFE6] border border-[#E0D7C9] text-xs text-[#2C241E] focus:outline-none focus:ring-1 focus:ring-[#8C5E3C]"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
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
                    Guests
                  </label>
                  <select
                    value={guests}
                    onChange={(e) => setGuests(Number(e.target.value))}
                    className="w-full p-2.5 rounded-lg bg-[#F4EFE6] border border-[#E0D7C9] text-xs text-[#2C241E] focus:outline-none focus:ring-1 focus:ring-[#8C5E3C]"
                  >
                    <option value={1}>1 Guest (Nook)</option>
                    <option value={2}>2 Guests</option>
                    <option value={4}>3-4 Guests</option>
                    <option value={6}>5-6 Guests</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-[#3D2619] mb-1">
                    Time
                  </label>
                  <select
                    value={time}
                    onChange={(e) => setTime(e.target.value)}
                    className="w-full p-2.5 rounded-lg bg-[#F4EFE6] border border-[#E0D7C9] text-xs text-[#2C241E] focus:outline-none focus:ring-1 focus:ring-[#8C5E3C]"
                  >
                    {timeSlots.map((t) => (
                      <option key={t} value={t}>
                        {t}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Area preference */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-[#3D2619] mb-1">
                  Seating Area
                </label>
                <div className="grid grid-cols-2 gap-2">
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
                      className={`p-2 rounded-lg border text-xs font-semibold text-center transition-colors cursor-pointer ${
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

              {/* Notes */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-[#3D2619] mb-1">
                  Notes or Requirements
                </label>
                <input
                  type="text"
                  placeholder="Need outlet for laptop / bringing small pup..."
                  value={specialRequest}
                  onChange={(e) => setSpecialRequest(e.target.value)}
                  className="w-full p-2.5 rounded-lg bg-[#F4EFE6] border border-[#E0D7C9] text-xs text-[#2C241E] focus:outline-none focus:ring-1 focus:ring-[#8C5E3C]"
                />
              </div>

              <button
                type="submit"
                className="w-full py-3 px-5 rounded-xl bg-[#3D2619] hover:bg-[#533522] text-[#FAF7F2] font-semibold text-xs sm:text-sm transition-colors shadow-md cursor-pointer"
              >
                Complete Free Reservation
              </button>
            </form>
          )}
        </div>

      </div>
    </div>
  );
};
