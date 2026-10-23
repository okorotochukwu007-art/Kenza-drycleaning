import React, { useState } from 'react';
import { X, CheckCircle2, MessageSquare, MapPin, Calendar, ShieldCheck, Plus } from 'lucide-react';
import {
  GarmentItem,
  BasketItem,
  BusinessConfig,
  LAGOS_SERVICE_ZONES,
  LaundryTicket,
  formatNaira,
} from '../data/kenzaData';

interface ValetBookingModalProps {
  isOpen: boolean;
  onClose: () => void;
  catalog: GarmentItem[];
  basket: BasketItem[];
  isExpress: boolean;
  businessConfig: BusinessConfig;
  onToggleExpress: (express: boolean) => void;
  onAddQuickBundle: (garmentId: string, qty: number) => void;
  onConfirmBooking: (ticket: LaundryTicket) => void;
}

export const ValetBookingModal: React.FC<ValetBookingModalProps> = ({
  isOpen,
  onClose,
  catalog,
  basket,
  isExpress,
  businessConfig,
  onToggleExpress,
  onAddQuickBundle,
  onConfirmBooking,
}) => {
  const [customerName, setCustomerName] = useState('');
  const [phone, setPhone] = useState('');
  const [selectedZoneId, setSelectedZoneId] = useState(LAGOS_SERVICE_ZONES[0].id);
  const [streetAddress, setStreetAddress] = useState('');
  const [pickupDate, setPickupDate] = useState('2026-10-22');
  const [pickupWindow, setPickupWindow] = useState('09:00 AM – 11:00 AM');
  const [specialInstructions, setSpecialInstructions] = useState('');
  const [formError, setFormError] = useState('');
  const [confirmedTicket, setConfirmedTicket] = useState<LaundryTicket | null>(null);

  if (!isOpen) return null;

  const multiplier = isExpress ? businessConfig.expressSurchargeMultiplier : 1;
  const selectedZone =
    LAGOS_SERVICE_ZONES.find((z) => z.id === selectedZoneId) || LAGOS_SERVICE_ZONES[0];

  const detailedBasket = basket
    .map((b) => {
      const garment = catalog.find((g) => g.id === b.garmentId);
      if (!garment) return null;
      const basePrice =
        b.serviceMode === 'dry_clean' ? garment.dryCleanPrice : garment.pressOnlyPrice;
      const unitPrice = Math.round(basePrice * multiplier);
      return {
        name: garment.name,
        quantity: b.quantity,
        serviceMode: b.serviceMode,
        lineTotal: unitPrice * b.quantity,
      };
    })
    .filter((item): item is NonNullable<typeof item> => item !== null);

  const subtotal = detailedBasket.reduce((acc, item) => acc + item.lineTotal, 0);
  const valetFee =
    subtotal >= businessConfig.freeDeliveryThreshold || subtotal === 0 ? 0 : selectedZone.valetFee;
  const totalAmount = subtotal + valetFee;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (customerName.trim().length < 2) {
      setFormError('Please enter your full name.');
      return;
    }
    const phoneDigits = phone.replace(/\D/g, '');
    if (phoneDigits.length < 10) {
      setFormError('Please enter a valid Nigerian phone or WhatsApp number (at least 10 digits).');
      return;
    }
    if (streetAddress.trim().length < 5) {
      setFormError('Please provide your street address or building landmark in Lagos.');
      return;
    }

    setFormError('');
    const randomCode = Math.floor(1000 + Math.random() * 9000);
    const ticketId = `KZ-${randomCode}`;

    const finalItems =
      detailedBasket.length > 0
        ? detailedBasket
        : [
            {
              name: 'Atelier Valet Inspection Bag (Counted at Studio)',
              quantity: 1,
              serviceMode: 'dry_clean' as const,
              lineTotal: 15000,
            },
          ];

    const finalSubtotal =
      detailedBasket.length > 0 ? subtotal : 15000;
    const finalValetFee =
      finalSubtotal >= businessConfig.freeDeliveryThreshold ? 0 : selectedZone.valetFee;

    const newTicket: LaundryTicket = {
      ticketId,
      customerName: customerName.trim(),
      phone: phone.trim(),
      zoneName: selectedZone.name,
      streetAddress: streetAddress.trim(),
      pickupDate,
      pickupWindow,
      isExpress,
      currentStage: 0,
      createdAt: 'Just Now',
      estimatedReady: isExpress ? 'Within 24 Hours (Express Valet)' : 'Within 48 Hours (Standard Care)',
      itemsSummary: finalItems,
      subtotal: finalSubtotal,
      valetFee: finalValetFee,
      totalAmount: finalSubtotal + finalValetFee,
      specialInstructions: specialInstructions.trim() || undefined,
    };

    setConfirmedTicket(newTicket);
    onConfirmBooking(newTicket);
  };

  const handleDispatchWhatsApp = (ticket: LaundryTicket) => {
    const lines = [
      `*NEW VALET PICKUP REQUEST — ${businessConfig.shortName}*`,
      `*Ticket Reference:* ${ticket.ticketId}`,
      `*Client:* ${ticket.customerName}`,
      `*Phone:* ${ticket.phone}`,
      `*Lagos Zone:* ${ticket.zoneName}`,
      `*Pickup Address:* ${ticket.streetAddress}`,
      `*Pickup Slot:* ${ticket.pickupDate} (${ticket.pickupWindow})`,
      `*Service Speed:* ${ticket.isExpress ? 'Express 24h (+50%)' : 'Standard 48h Care'}`,
      ``,
      `*Itemized Garments:*`,
      ...ticket.itemsSummary.map(
        (i) =>
          `• ${i.quantity}x ${i.name} (${
            i.serviceMode === 'dry_clean' ? 'Dry Clean' : 'Steam Press'
          }) — ${formatNaira(i.lineTotal)}`
      ),
      ``,
      `*Valet Fee:* ${ticket.valetFee === 0 ? 'Complimentary' : formatNaira(ticket.valetFee)}`,
      `*Total Estimate:* ${formatNaira(ticket.totalAmount)}`,
      ticket.specialInstructions ? `*Care Note:* ${ticket.specialInstructions}` : '',
    ].filter(Boolean);

    const encoded = encodeURIComponent(lines.join('\n'));
    window.open(
      `https://wa.me/${businessConfig.whatsappNumber}?text=${encoded}`,
      '_blank',
      'noopener,noreferrer'
    );
  };

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-stretch justify-end bg-black/80 backdrop-blur-xs">
      <div className="relative w-full max-w-xl bg-[#11131A] border-t sm:border-t-0 sm:border-l border-white/15 rounded-t-3xl sm:rounded-none max-h-[92dvh] sm:max-h-none sm:h-full overflow-y-auto p-5 sm:p-8 pb-8 flex flex-col justify-between">
        <div>
          {/* Mobile Bottom-Sheet Drag Handle */}
          <div className="w-10 h-1.5 bg-white/20 rounded-full mx-auto mb-4 sm:hidden" />

          {/* Modal Top Header */}
          <div className="flex items-center justify-between pb-4 sm:pb-5 border-b border-white/10">
            <div>
              <p className="text-xs font-mono-tabular uppercase tracking-widest text-[#D4AF37]">
                Ikoyi · Victoria Island · Lekki Concierge
              </p>
              <h2 className="font-display text-2xl font-semibold text-[#F5F3EF] mt-0.5">
                {confirmedTicket ? 'Valet Pickup Confirmed' : 'Schedule Doorstep Valet Pickup'}
              </h2>
            </div>
            <button
              type="button"
              onClick={() => {
                setConfirmedTicket(null);
                onClose();
              }}
              aria-label="Close booking drawer"
              className="min-w-[44px] min-h-[44px] -mr-2 rounded-lg flex items-center justify-center text-[#9CA3AF] hover:text-[#F5F3EF] hover:bg-white/5 transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {confirmedTicket ? (
            /* Confirmed Ticket State */
            <div className="py-6 sm:py-8 space-y-6">
              <div className="p-5 rounded-xl bg-emerald-500/10 border border-emerald-500/30 flex items-start gap-3.5">
                <CheckCircle2 className="w-6 h-6 text-emerald-400 shrink-0 mt-0.5" />
                <div className="space-y-1">
                  <p className="text-sm font-semibold text-[#F5F3EF]">
                    Booking Logged — Ticket #{confirmedTicket.ticketId}
                  </p>
                  <p className="text-xs text-[#9CA3AF] leading-relaxed">
                    Your pickup request for <strong className="text-[#F5F3EF]">{confirmedTicket.streetAddress}</strong> ({confirmedTicket.zoneName}) has been registered and added to the Live Order Tracker.
                  </p>
                </div>
              </div>

              <div className="rounded-xl border border-white/10 bg-[#0A0A0C] p-5 space-y-4">
                <div className="flex items-center justify-between border-b border-white/10 pb-3">
                  <span className="text-xs text-[#9CA3AF]">Ticket Reference</span>
                  <span className="font-mono-tabular text-sm font-semibold text-[#D4AF37]">
                    {confirmedTicket.ticketId}
                  </span>
                </div>
                <div className="flex items-center justify-between text-xs">
                  <span className="text-[#9CA3AF]">Pickup Window</span>
                  <span className="text-[#F5F3EF] font-medium">
                    {confirmedTicket.pickupDate} · {confirmedTicket.pickupWindow}
                  </span>
                </div>
                <div className="flex items-center justify-between text-xs">
                  <span className="text-[#9CA3AF]">Turnaround Tier</span>
                  <span className="text-[#F5F3EF] font-medium">
                    {confirmedTicket.isExpress ? 'Express 24h Valet' : 'Standard 48h Care'}
                  </span>
                </div>
                <div className="border-t border-white/10 pt-3 space-y-2">
                  {confirmedTicket.itemsSummary.map((item, i) => (
                    <div key={i} className="flex items-center justify-between text-xs">
                      <span className="text-[#9CA3AF]">
                        {item.quantity}x {item.name}
                      </span>
                      <span className="font-mono-tabular text-[#F5F3EF]">
                        {formatNaira(item.lineTotal)}
                      </span>
                    </div>
                  ))}
                  <div className="flex items-center justify-between text-xs pt-2 border-t border-white/5">
                    <span className="text-[#9CA3AF]">Lagos Island Valet Fee</span>
                    <span className="font-mono-tabular text-[#D4AF37]">
                      {confirmedTicket.valetFee === 0
                        ? 'Complimentary'
                        : formatNaira(confirmedTicket.valetFee)}
                    </span>
                  </div>
                  <div className="flex items-center justify-between text-sm font-semibold pt-2">
                    <span className="text-[#F5F3EF]">Total Estimate</span>
                    <span className="font-mono-tabular text-lg text-[#D4AF37]">
                      {formatNaira(confirmedTicket.totalAmount)}
                    </span>
                  </div>
                </div>
              </div>

              <div className="space-y-3">
                <button
                  type="button"
                  onClick={() => handleDispatchWhatsApp(confirmedTicket)}
                  className="w-full min-h-[48px] py-3.5 px-5 bg-[#D4AF37] hover:bg-[#E5C158] active:scale-[0.98] text-[#0A0A0C] font-semibold text-sm rounded-xl transition-all flex items-center justify-center gap-2 cursor-pointer"
                >
                  <MessageSquare className="w-4 h-4" />
                  <span>Send Booking Receipt to WhatsApp Concierge</span>
                </button>

                <button
                  type="button"
                  onClick={() => {
                    setConfirmedTicket(null);
                    onClose();
                    const trackerEl = document.getElementById('tracker');
                    if (trackerEl) trackerEl.scrollIntoView({ behavior: 'smooth' });
                  }}
                  className="w-full min-h-[48px] py-3 px-4 bg-[#181B24] hover:bg-white/10 text-[#F5F3EF] border border-white/15 font-medium text-xs rounded-xl transition-colors cursor-pointer"
                >
                  View Ticket #{confirmedTicket.ticketId} in Live Tracker
                </button>
              </div>
            </div>
          ) : (
            /* Booking Form */
            <form onSubmit={handleSubmit} className="py-5 sm:py-6 space-y-5">
              {/* Quick-Add Starter Option if Basket is Empty */}
              {detailedBasket.length === 0 && (
                <div className="p-4 rounded-xl bg-[#161923] border border-white/10 space-y-3">
                  <p className="text-xs text-[#9CA3AF]">
                    No garments pre-selected yet. You can book an open Valet Inspection Bag or tap a quick pack below:
                  </p>
                  <div className="flex flex-wrap gap-2">
                    <button
                      type="button"
                      onClick={() => onAddQuickBundle('agbada-3pc', 1)}
                      className="min-h-[38px] px-3 py-1.5 text-xs bg-[#0A0A0C] hover:border-[#D4AF37] text-[#F5F3EF] border border-white/10 rounded-lg inline-flex items-center gap-1 cursor-pointer"
                    >
                      <Plus className="w-3 h-3 text-[#D4AF37]" />
                      <span>3-Piece Agbada</span>
                    </button>
                    <button
                      type="button"
                      onClick={() => onAddQuickBundle('bespoke-suit-2pc', 2)}
                      className="min-h-[38px] px-3 py-1.5 text-xs bg-[#0A0A0C] hover:border-[#D4AF37] text-[#F5F3EF] border border-white/10 rounded-lg inline-flex items-center gap-1 cursor-pointer"
                    >
                      <Plus className="w-3 h-3 text-[#D4AF37]" />
                      <span>2x Executive Suits</span>
                    </button>
                    <button
                      type="button"
                      onClick={() => onAddQuickBundle('executive-shirt', 5)}
                      className="min-h-[38px] px-3 py-1.5 text-xs bg-[#0A0A0C] hover:border-[#D4AF37] text-[#F5F3EF] border border-white/10 rounded-lg inline-flex items-center gap-1 cursor-pointer"
                    >
                      <Plus className="w-3 h-3 text-[#D4AF37]" />
                      <span>5x Dress Shirts</span>
                    </button>
                  </div>
                </div>
              )}

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-medium text-[#F5F3EF] mb-1.5">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    required
                    autoComplete="name"
                    value={customerName}
                    onChange={(e) => setCustomerName(e.target.value)}
                    placeholder="e.g. Chief Tunde Adebayo"
                    className="w-full px-3.5 py-3 sm:py-2.5 bg-[#0A0A0C] border border-white/15 rounded-xl text-base sm:text-sm text-[#F5F3EF] placeholder-[#6B7280] focus:outline-none focus:border-[#D4AF37]"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-[#F5F3EF] mb-1.5">
                    Phone / WhatsApp Number *
                  </label>
                  <input
                    type="tel"
                    inputMode="tel"
                    autoComplete="tel"
                    required
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="e.g. +234 803 000 0000"
                    className="w-full px-3.5 py-3 sm:py-2.5 bg-[#0A0A0C] border border-white/15 rounded-xl text-base sm:text-sm font-mono-tabular text-[#F5F3EF] placeholder-[#6B7280] focus:outline-none focus:border-[#D4AF37]"
                  />
                </div>
              </div>

              {/* Lagos Island Service Zone */}
              <div>
                <label className="block text-xs font-medium text-[#F5F3EF] mb-1.5">
                  Lagos Island Valet Coverage Zone *
                </label>
                <div className="relative">
                  <MapPin className="w-4 h-4 text-[#D4AF37] absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                  <select
                    value={selectedZoneId}
                    onChange={(e) => setSelectedZoneId(e.target.value)}
                    className="w-full pl-10 pr-4 py-3 sm:py-2.5 bg-[#0A0A0C] border border-white/15 rounded-xl text-base sm:text-sm text-[#F5F3EF] focus:outline-none focus:border-[#D4AF37]"
                  >
                    {LAGOS_SERVICE_ZONES.map((z) => (
                      <option key={z.id} value={z.id} className="bg-[#11131A] text-[#F5F3EF]">
                        {z.name} — {z.etaWindow} (Valet: {formatNaira(z.valetFee)})
                      </option>
                    ))}
                  </select>
                </div>
                <p className="text-[11px] text-[#9CA3AF] mt-1">
                  Landmarks: {selectedZone.landmarks}
                </p>
              </div>

              {/* Street Address */}
              <div>
                <label className="block text-xs font-medium text-[#F5F3EF] mb-1.5">
                  Street Address &amp; Apartment / Gate Code *
                </label>
                <input
                  type="text"
                  autoComplete="street-address"
                  required
                  value={streetAddress}
                  onChange={(e) => setStreetAddress(e.target.value)}
                  placeholder="e.g. 24 Awolowo Road, Ikoyi, Lagos"
                  className="w-full px-3.5 py-3 sm:py-2.5 bg-[#0A0A0C] border border-white/15 rounded-xl text-base sm:text-sm text-[#F5F3EF] placeholder-[#6B7280] focus:outline-none focus:border-[#D4AF37]"
                />
              </div>

              {/* Pickup Date & Time Window */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-medium text-[#F5F3EF] mb-1.5">
                    Preferred Pickup Date
                  </label>
                  <div className="relative">
                    <Calendar className="w-4 h-4 text-[#9CA3AF] absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                    <input
                      type="date"
                      value={pickupDate}
                      onChange={(e) => setPickupDate(e.target.value)}
                      className="w-full pl-10 pr-3.5 py-3 sm:py-2.5 bg-[#0A0A0C] border border-white/15 rounded-xl text-base sm:text-sm font-mono-tabular text-[#F5F3EF] focus:outline-none focus:border-[#D4AF37]"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-xs font-medium text-[#F5F3EF] mb-1.5">
                    Valet Time Window
                  </label>
                  <select
                    value={pickupWindow}
                    onChange={(e) => setPickupWindow(e.target.value)}
                    className="w-full px-3.5 py-3 sm:py-2.5 bg-[#0A0A0C] border border-white/15 rounded-xl text-base sm:text-sm text-[#F5F3EF] focus:outline-none focus:border-[#D4AF37]"
                  >
                    <option value="08:00 AM – 10:00 AM">Morning · 08:00 AM – 10:00 AM</option>
                    <option value="10:00 AM – 01:00 PM">Midday · 10:00 AM – 01:00 PM</option>
                    <option value="01:00 PM – 04:00 PM">Afternoon · 01:00 PM – 04:00 PM</option>
                    <option value="04:00 PM – 07:00 PM">Evening · 04:00 PM – 07:00 PM</option>
                  </select>
                </div>
              </div>

              {/* Service Turnaround Toggle */}
              <div className="p-3.5 rounded-xl bg-[#0A0A0C] border border-white/10 flex items-center justify-between gap-4">
                <div>
                  <p className="text-xs font-semibold text-[#F5F3EF]">
                    Express 24-Hour Turnaround (+50%)
                  </p>
                  <p className="text-[11px] text-[#9CA3AF]">
                    Priority processing at our Awolowo Road studio
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => onToggleExpress(!isExpress)}
                  className={`min-h-[38px] px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-colors cursor-pointer shrink-0 ${
                    isExpress
                      ? 'bg-[#D4AF37] text-[#0A0A0C]'
                      : 'bg-[#181B24] text-[#9CA3AF] border border-white/10'
                  }`}
                >
                  {isExpress ? 'Express Active' : 'Switch to Express'}
                </button>
              </div>

              {/* Special Instructions */}
              <div>
                <label className="block text-xs font-medium text-[#F5F3EF] mb-1.5">
                  Fabric &amp; Starch Preferences (Optional)
                </label>
                <textarea
                  rows={2}
                  value={specialInstructions}
                  onChange={(e) => setSpecialInstructions(e.target.value)}
                  placeholder="e.g. Light starch on collars, hand-finish Agbada embroidery, call at estate gate..."
                  className="w-full px-3.5 py-2.5 bg-[#0A0A0C] border border-white/15 rounded-xl text-base sm:text-xs text-[#F5F3EF] placeholder-[#6B7280] focus:outline-none focus:border-[#D4AF37]"
                />
              </div>

              {/* Cost Summary Box */}
              <div className="p-4 rounded-xl bg-[#0A0A0C] border border-white/10 space-y-2 text-xs">
                <div className="flex items-center justify-between text-[#9CA3AF]">
                  <span>
                    Selected Garments ({detailedBasket.reduce((s, i) => s + i.quantity, 0)} pcs)
                  </span>
                  <span className="font-mono-tabular text-[#F5F3EF]">
                    {detailedBasket.length > 0
                      ? formatNaira(subtotal)
                      : 'Counted at Studio (Est. ₦15,000)'}
                  </span>
                </div>
                <div className="flex items-center justify-between text-[#9CA3AF]">
                  <span>Valet Pickup &amp; Delivery ({selectedZone.name})</span>
                  <span className="font-mono-tabular text-[#D4AF37]">
                    {valetFee === 0 ? 'Complimentary' : formatNaira(valetFee)}
                  </span>
                </div>
                <div className="flex items-center justify-between text-sm font-semibold pt-2 border-t border-white/10">
                  <span className="text-[#F5F3EF]">Total Estimated Amount</span>
                  <span className="font-mono-tabular text-base text-[#D4AF37]">
                    {formatNaira(detailedBasket.length > 0 ? totalAmount : 15000)}
                  </span>
                </div>
              </div>

              {formError && (
                <p className="text-xs text-rose-400 bg-rose-500/10 border border-rose-500/20 p-3 rounded-lg">
                  {formError}
                </p>
              )}

              <button
                type="submit"
                className="w-full min-h-[48px] py-3.5 px-5 bg-[#D4AF37] hover:bg-[#E5C158] active:scale-[0.98] text-[#0A0A0C] font-semibold text-sm rounded-xl transition-all cursor-pointer"
              >
                Confirm Valet Pickup &amp; Generate Ticket
              </button>
            </form>
          )}
        </div>

        {/* Footer Assurance */}
        <div className="pt-4 border-t border-white/10 flex items-center gap-2.5 text-xs text-[#9CA3AF]">
          <ShieldCheck className="w-4 h-4 text-[#D4AF37] shrink-0" />
          <span>
            Insured garment handling from pickup to return · {businessConfig.streetAddress}
          </span>
        </div>
      </div>
    </div>
  );
};
