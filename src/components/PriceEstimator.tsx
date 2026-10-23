import React, { useState } from 'react';
import { Plus, Minus, Search, Sparkles, ArrowRight, RotateCcw, MessageSquare } from 'lucide-react';
import {
  GarmentItem,
  GarmentCategory,
  ServiceMode,
  BasketItem,
  BusinessConfig,
  formatNaira,
} from '../data/kenzaData';

interface PriceEstimatorProps {
  catalog: GarmentItem[];
  basket: BasketItem[];
  isExpress: boolean;
  selectedCategory: GarmentCategory | 'all';
  businessConfig: BusinessConfig;
  isDedicatedPage?: boolean;
  onCategoryChange: (cat: GarmentCategory | 'all') => void;
  onToggleExpress: (express: boolean) => void;
  onUpdateQuantity: (garmentId: string, serviceMode: ServiceMode, delta: number) => void;
  onClearBasket: () => void;
  onOpenBookingModal: () => void;
  onOpenOwnerModal: () => void;
}

export const PriceEstimator: React.FC<PriceEstimatorProps> = ({
  catalog,
  basket,
  isExpress,
  selectedCategory,
  businessConfig,
  isDedicatedPage = false,
  onCategoryChange,
  onToggleExpress,
  onUpdateQuantity,
  onClearBasket,
  onOpenBookingModal,
  onOpenOwnerModal,
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeServiceMode, setActiveServiceMode] = useState<ServiceMode>('dry_clean');

  const multiplier = isExpress ? businessConfig.expressSurchargeMultiplier : 1;

  const filteredCatalog = catalog.filter((item) => {
    const matchesCategory = selectedCategory === 'all' || item.category === selectedCategory;
    const matchesSearch =
      searchQuery.trim() === '' ||
      item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.fabricCareNote.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const getItemQuantity = (garmentId: string, mode: ServiceMode): number => {
    const found = basket.find((b) => b.garmentId === garmentId && b.serviceMode === mode);
    return found ? found.quantity : 0;
  };

  const detailedBasket = basket
    .map((b) => {
      const garment = catalog.find((g) => g.id === b.garmentId);
      if (!garment) return null;
      const baseUnitPrice =
        b.serviceMode === 'dry_clean' ? garment.dryCleanPrice : garment.pressOnlyPrice;
      const unitPrice = Math.round(baseUnitPrice * multiplier);
      return {
        ...b,
        garment,
        unitPrice,
        lineTotal: unitPrice * b.quantity,
      };
    })
    .filter((item): item is NonNullable<typeof item> => item !== null);

  const subtotal = detailedBasket.reduce((acc, item) => acc + item.lineTotal, 0);
  const totalPieces = detailedBasket.reduce((acc, item) => acc + item.quantity, 0);
  const qualifiesForFreeValet = subtotal >= businessConfig.freeDeliveryThreshold;
  const amountToFreeValet = Math.max(0, businessConfig.freeDeliveryThreshold - subtotal);

  const getCategoryLabel = (category: GarmentCategory) => {
    switch (category) {
      case 'wash_fold':
        return 'Wash, Dry & Fold Laundry';
      case 'executive':
        return 'Specialist Dry Cleaning & Suits';
      case 'traditional':
        return 'Traditional Agbada, Senator & Lace';
      case 'household':
        return 'Duvets, Curtains & Rugs';
    }
  };

  const handleWhatsAppEstimate = () => {
    if (detailedBasket.length === 0) return;
    const lines = [
      `Hello *${businessConfig.businessName}* (${businessConfig.streetAddress}),`,
      `I would like to request a laundry & dry cleaning estimate:`,
      ``,
      `*Turnaround:* ${isExpress ? 'Express 24h Service (+50%)' : 'Standard Service (24h – 48h)'}`,
      `*Selected Items:*`,
      ...detailedBasket.map(
        (item) =>
          `• ${item.quantity}x ${item.garment.name} (${
            item.serviceMode === 'dry_clean'
              ? 'Full Clean & Press'
              : 'Executive Steam Ironing Only'
          }) — ${formatNaira(item.lineTotal)}`
      ),
      ``,
      `*Estimated Garment Total:* ${formatNaira(subtotal)}`,
      qualifiesForFreeValet
        ? `*Pickup & Delivery:* Complimentary (Over ${formatNaira(
            businessConfig.freeDeliveryThreshold
          )})`
        : `*Pickup Note:* Standard Ikoyi/VI pickup fee applies below ${formatNaira(
            businessConfig.freeDeliveryThreshold
          )}`,
    ];
    const encoded = encodeURIComponent(lines.join('\n'));
    window.open(
      `https://wa.me/${businessConfig.whatsappNumber}?text=${encoded}`,
      '_blank',
      'noopener,noreferrer'
    );
  };

  return (
    <section
      id="estimator"
      className={`${isDedicatedPage ? 'py-12' : 'py-20 border-t border-white/10'}`}
    >
      <div className="max-w-[1360px] mx-auto px-6 lg:px-10">
        {/* Section Header */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-10">
          <div>
            <p className="text-xs font-mono-tabular uppercase tracking-widest text-[#F5C400] mb-2">
              Official Naira Price List &amp; Instant Calculator
            </p>
            <h2
              className="font-display font-semibold text-[#F5F3EF] tracking-tight"
              style={{ fontSize: 'clamp(2rem, 3.2vw, 3rem)', textWrap: 'balance' }}
            >
              Laundry, Dry Cleaning &amp; Steam Ironing Price List
            </h2>
            <p className="text-sm text-[#9CA3AF] mt-2 max-w-2xl">
              Browse our transparent rates for <strong className="text-[#F5F3EF] font-medium">Wash &amp; Fold Laundry</strong>, <strong className="text-[#F5F3EF] font-medium">Dry Cleaning</strong>, and <strong className="text-[#F5F3EF] font-medium">Executive Steam Ironing</strong>. Free pickup and delivery across Ikoyi &amp; Victoria Island on orders from{' '}
              <span className="font-mono-tabular text-[#F5C400]">
                {formatNaira(businessConfig.freeDeliveryThreshold)}
              </span>
              .
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <button
              type="button"
              onClick={onOpenOwnerModal}
              className="px-4 py-2 text-xs font-medium text-[#F5C400] border border-[#F5C400]/40 rounded-lg hover:bg-[#F5C400]/10 transition-colors whitespace-nowrap shrink-0 cursor-pointer"
            >
              Edit Price List &amp; Contact Info
            </button>
          </div>
        </div>

        {/* Controls Bar: Category Filter + Service Mode + Speed Toggle */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-3.5 sm:gap-4 p-3.5 sm:p-4 rounded-xl bg-[#13151C] border border-white/10 mb-8">
          {/* Category Segmented Buttons (Swipeable Horizontal Row on Mobile) */}
          <div className="lg:col-span-6 flex items-center gap-1.5 bg-[#0A0A0C] p-1.5 rounded-lg border border-white/5 overflow-x-auto no-scrollbar">
            {(
              [
                { id: 'all', label: 'All Services' },
                { id: 'wash_fold', label: 'Wash & Fold' },
                { id: 'executive', label: 'Dry Clean & Suits' },
                { id: 'traditional', label: 'Native & Lace' },
                { id: 'household', label: 'Duvets & Rugs' },
              ] as const
            ).map((tab) => (
              <button
                key={tab.id}
                type="button"
                onClick={() => onCategoryChange(tab.id)}
                className={`min-h-[38px] px-3.5 py-2 text-xs font-medium rounded-md transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                  selectedCategory === tab.id
                    ? 'bg-[#F5C400] text-[#0A0A0C] font-semibold'
                    : 'text-[#9CA3AF] hover:text-[#F5F3EF]'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* Default Service Mode Toggle */}
          <div className="lg:col-span-3 flex items-center bg-[#0A0A0C] p-1.5 rounded-lg border border-white/5">
            <button
              type="button"
              onClick={() => setActiveServiceMode('dry_clean')}
              className={`min-h-[38px] flex-1 py-2 px-3 text-xs font-medium rounded-md transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                activeServiceMode === 'dry_clean'
                  ? 'bg-[#1E222D] text-[#F5F3EF] border border-white/15'
                  : 'text-[#9CA3AF] hover:text-[#F5F3EF]'
              }`}
            >
              Full Clean &amp; Press
            </button>
            <button
              type="button"
              onClick={() => setActiveServiceMode('press_only')}
              className={`min-h-[38px] flex-1 py-2 px-3 text-xs font-medium rounded-md transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                activeServiceMode === 'press_only'
                  ? 'bg-[#1E222D] text-[#F5F3EF] border border-white/15'
                  : 'text-[#9CA3AF] hover:text-[#F5F3EF]'
              }`}
            >
              Ironing Only
            </button>
          </div>

          {/* Standard vs Express Turnaround */}
          <div className="lg:col-span-3 flex items-center bg-[#0A0A0C] p-1.5 rounded-lg border border-white/5">
            <button
              type="button"
              onClick={() => onToggleExpress(false)}
              className={`min-h-[38px] flex-1 py-2 px-3 text-xs font-medium rounded-md transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                !isExpress
                  ? 'bg-[#1E222D] text-[#F5F3EF] border border-white/15'
                  : 'text-[#9CA3AF] hover:text-[#F5F3EF]'
              }`}
            >
              Standard (24–48h)
            </button>
            <button
              type="button"
              onClick={() => onToggleExpress(true)}
              className={`min-h-[38px] flex-1 py-2 px-3 text-xs font-medium rounded-md transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                isExpress
                  ? 'bg-[#F5C400] text-[#0A0A0C] font-semibold'
                  : 'text-[#9CA3AF] hover:text-[#F5F3EF]'
              }`}
            >
              Express (+50%)
            </button>
          </div>
        </div>

        {/* Main 2-Column Estimator Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column: Search + Garment Rate List */}
          <div className="lg:col-span-8 space-y-4">
            <div className="relative">
              <Search className="w-4 h-4 text-[#9CA3AF] absolute left-4 top-1/2 -translate-y-1/2 pointer-events-none" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search price list (e.g., Wash & Fold, Shirt Bundle, Suit, Agbada, Duvet)..."
                className="w-full pl-11 pr-14 py-3.5 bg-[#13151C] border border-white/10 rounded-xl text-base sm:text-sm text-[#F5F3EF] placeholder-[#6B7280] focus:outline-none focus:border-[#F5C400]"
              />
              {searchQuery && (
                <button
                  type="button"
                  onClick={() => setSearchQuery('')}
                  className="min-h-[40px] px-3 absolute right-2 top-1/2 -translate-y-1/2 text-xs text-[#9CA3AF] hover:text-[#F5F3EF] cursor-pointer"
                >
                  Clear
                </button>
              )}
            </div>

            <div className="divide-y divide-white/10 rounded-xl border border-white/10 bg-[#13151C] overflow-hidden">
              {filteredCatalog.length === 0 ? (
                <div className="p-10 text-center">
                  <p className="text-sm text-[#9CA3AF]">
                    No items match &ldquo;{searchQuery}&rdquo;. Try clearing your filter.
                  </p>
                </div>
              ) : (
                filteredCatalog.map((item) => {
                  const basePrice =
                    activeServiceMode === 'dry_clean' ? item.dryCleanPrice : item.pressOnlyPrice;
                  const displayPrice = Math.round(basePrice * multiplier);
                  const currentQty = getItemQuantity(item.id, activeServiceMode);

                  const otherMode: ServiceMode =
                    activeServiceMode === 'dry_clean' ? 'press_only' : 'dry_clean';
                  const otherModeQty = getItemQuantity(item.id, otherMode);

                  return (
                    <div
                      key={item.id}
                      className={`p-4 sm:p-5 transition-colors flex flex-col sm:flex-row sm:items-center justify-between gap-4 ${
                        currentQty > 0 ? 'bg-[#191C26]' : 'hover:bg-white/[0.02]'
                      }`}
                    >
                      <div className="space-y-1.5 sm:pr-4">
                        <div className="flex flex-wrap items-center gap-2 text-xs text-[#9CA3AF]">
                          <span className="text-[#F5C400] font-medium">
                            {getCategoryLabel(item.category)}
                          </span>
                          <span aria-hidden="true">·</span>
                          <span>
                            {isExpress ? 'Express Turnaround' : `${item.standardHours}h Standard`}
                          </span>
                          {otherModeQty > 0 && (
                            <>
                              <span aria-hidden="true">·</span>
                              <span className="text-[#F5C400]">
                                +{otherModeQty} in{' '}
                                {otherMode === 'dry_clean' ? 'Full Clean' : 'Ironing Only'}
                              </span>
                            </>
                          )}
                        </div>

                        <h3 className="text-base font-sans font-semibold text-[#F5F3EF]">
                          {item.name}
                        </h3>

                        <p className="text-xs text-[#9CA3AF] leading-relaxed">
                          {item.fabricCareNote}
                        </p>
                      </div>

                      {/* Price & Thumb-Friendly Quantity Stepper */}
                      <div className="flex items-center justify-between sm:justify-end gap-5 shrink-0 pt-2.5 sm:pt-0 border-t sm:border-t-0 border-white/5">
                        <div className="text-left sm:text-right">
                          <p className="text-base font-mono-tabular font-semibold text-[#F5F3EF]">
                            {formatNaira(displayPrice)}
                          </p>
                          <p className="text-[11px] text-[#9CA3AF]">
                            {activeServiceMode === 'dry_clean'
                              ? 'Full Clean & Press'
                              : 'Executive Ironing Only'}
                          </p>
                        </div>

                        <div className="flex items-center gap-2 bg-[#0A0A0C] border border-white/10 rounded-xl p-1">
                          <button
                            type="button"
                            onClick={() => onUpdateQuantity(item.id, activeServiceMode, -1)}
                            disabled={currentQty === 0}
                            aria-label={`Decrease quantity for ${item.name}`}
                            className="w-10 h-10 sm:w-8 sm:h-8 rounded-lg flex items-center justify-center text-[#F5F3EF] hover:bg-white/10 active:scale-95 disabled:opacity-30 disabled:pointer-events-none transition-all cursor-pointer"
                          >
                            <Minus className="w-4 h-4 sm:w-3.5 sm:h-3.5" />
                          </button>
                          <span className="w-8 text-center font-mono-tabular text-sm font-semibold text-[#F5F3EF]">
                            {currentQty}
                          </span>
                          <button
                            type="button"
                            onClick={() => onUpdateQuantity(item.id, activeServiceMode, 1)}
                            aria-label={`Increase quantity for ${item.name}`}
                            className="w-10 h-10 sm:w-8 sm:h-8 rounded-lg flex items-center justify-center bg-[#F5C400] text-[#0A0A0C] hover:bg-[#FFD633] active:scale-95 transition-all cursor-pointer"
                          >
                            <Plus className="w-4 h-4 sm:w-3.5 sm:h-3.5" />
                          </button>
                        </div>
                      </div>
                    </div>
                  );
                })
              )}
            </div>
          </div>

          {/* Right Column: Contiguous Laundry Basket Summary */}
          <div
            id="mobile-basket-summary"
            className="lg:col-span-4 lg:sticky lg:top-24 rounded-xl border border-white/10 bg-[#13151C] p-6 space-y-6"
          >
            <div className="flex items-center justify-between border-b border-white/10 pb-4">
              <div>
                <h3 className="font-display text-2xl font-semibold text-[#F5F3EF]">
                  Pickup Estimate Basket
                </h3>
                <p className="text-xs text-[#9CA3AF] mt-0.5">
                  {totalPieces} {totalPieces === 1 ? 'item' : 'items'} selected ·{' '}
                  {isExpress ? 'Express 24h' : 'Standard Care'}
                </p>
              </div>
              {detailedBasket.length > 0 && (
                <button
                  type="button"
                  onClick={onClearBasket}
                  className="min-h-[36px] px-2 inline-flex items-center gap-1 text-xs text-[#9CA3AF] hover:text-[#F5F3EF] transition-colors cursor-pointer whitespace-nowrap shrink-0"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  <span>Reset</span>
                </button>
              )}
            </div>

            {/* Free Ikoyi/VI Pickup Progress */}
            <div className="p-3.5 rounded-lg bg-[#0A0A0C] border border-white/5 space-y-2">
              <div className="flex items-center justify-between text-xs">
                <span className="text-[#9CA3AF]">Free Ikoyi / VI Pickup</span>
                <span className="font-mono-tabular text-[#F5C400] font-medium">
                  {qualifiesForFreeValet
                    ? 'Unlocked (Free Pickup)'
                    : `${formatNaira(amountToFreeValet)} away`}
                </span>
              </div>
              <div className="w-full h-1.5 bg-white/10 rounded-full overflow-hidden">
                <div
                  className="h-full bg-[#F5C400] transition-transform duration-150 origin-left"
                  style={{
                    transform: `scaleX(${Math.min(
                      1,
                      subtotal / businessConfig.freeDeliveryThreshold
                    )})`,
                  }}
                />
              </div>
            </div>

            {/* Selected Items Breakdown */}
            {detailedBasket.length === 0 ? (
              <div className="py-8 text-center space-y-2 border-y border-white/5">
                <Sparkles className="w-6 h-6 text-[#F5C400] mx-auto opacity-80" />
                <p className="text-sm font-medium text-[#F5F3EF]">Your laundry basket is empty</p>
                <p className="text-xs text-[#9CA3AF] max-w-xs mx-auto">
                  Tap the + buttons on the price list to calculate your estimate for Wash &amp; Fold, Dry Cleaning, or Steam Ironing.
                </p>
              </div>
            ) : (
              <div className="space-y-3 max-h-72 overflow-y-auto pr-1 divide-y divide-white/5">
                {detailedBasket.map((item) => (
                  <div
                    key={`${item.garmentId}-${item.serviceMode}`}
                    className="pt-3 first:pt-0 flex items-start justify-between gap-3 text-xs"
                  >
                    <div>
                      <p className="font-medium text-[#F5F3EF]">
                        {item.quantity}x {item.garment.name}
                      </p>
                      <p className="text-[#9CA3AF] mt-0.5">
                        {item.serviceMode === 'dry_clean'
                          ? 'Full Clean & Press'
                          : 'Steam Ironing Only'}{' '}
                        · {formatNaira(item.unitPrice)} each
                      </p>
                    </div>
                    <div className="text-right shrink-0">
                      <p className="font-mono-tabular font-semibold text-[#F5F3EF]">
                        {formatNaira(item.lineTotal)}
                      </p>
                      <button
                        type="button"
                        onClick={() =>
                          onUpdateQuantity(item.garmentId, item.serviceMode, -item.quantity)
                        }
                        className="text-[11px] text-[#9CA3AF] hover:text-rose-400 mt-0.5 cursor-pointer py-1"
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* Totals Footer */}
            <div className="space-y-2 pt-2 border-t border-white/10">
              <div className="flex items-center justify-between text-xs text-[#9CA3AF]">
                <span>Service Turnaround</span>
                <span>{isExpress ? 'Express 24h (+50% included)' : 'Standard 24h – 48h'}</span>
              </div>
              <div className="flex items-center justify-between text-base pt-2">
                <span className="font-medium text-[#F5F3EF]">Estimated Total</span>
                <span className="font-mono-tabular text-xl font-semibold text-[#F5C400]">
                  {formatNaira(subtotal)}
                </span>
              </div>
            </div>

            {/* Primary & Secondary Actions */}
            <div className="space-y-3 pt-2">
              <button
                type="button"
                onClick={onOpenBookingModal}
                className="w-full min-h-[48px] py-3.5 px-5 bg-[#F5C400] hover:bg-[#FFD633] active:scale-[0.98] text-[#0A0A0C] font-semibold text-sm rounded-xl transition-all flex items-center justify-center gap-2 whitespace-nowrap shrink-0 cursor-pointer"
              >
                <span>Schedule a Pickup</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                type="button"
                onClick={handleWhatsAppEstimate}
                disabled={detailedBasket.length === 0}
                className="w-full min-h-[48px] py-3 px-4 bg-[#0A0A0C] hover:bg-white/5 disabled:opacity-40 disabled:pointer-events-none text-[#F5F3EF] border border-white/15 font-medium text-xs rounded-xl transition-colors flex items-center justify-center gap-2 whitespace-nowrap shrink-0 cursor-pointer"
              >
                <MessageSquare className="w-4 h-4 text-[#F5C400]" />
                <span>Send Estimate via WhatsApp ({businessConfig.phoneShort})</span>
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Floating Basket Quick-Checkout Bar (Shown when items are selected on mobile) */}
        {totalPieces > 0 && (
          <div className="lg:hidden fixed bottom-[72px] inset-x-3 z-30 rounded-2xl bg-[#161512]/95 border border-[#DFBC7E]/50 p-3.5 shadow-[0_12px_32px_rgba(0,0,0,0.85)] backdrop-blur-md flex items-center justify-between gap-3">
            <div>
              <p className="text-[11px] text-[#D8D3C8]">
                {totalPieces} {totalPieces === 1 ? 'garment' : 'garments'} in basket
              </p>
              <p className="font-mono-tabular text-base font-semibold text-[#DFBC7E]">
                {formatNaira(subtotal)}
              </p>
            </div>
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => {
                  const summaryEl = document.getElementById('mobile-basket-summary');
                  if (summaryEl) summaryEl.scrollIntoView({ behavior: 'smooth' });
                }}
                className="min-h-[42px] px-3 py-2 rounded-xl bg-white/5 border border-white/15 text-xs font-medium text-[#F5F3EF] whitespace-nowrap cursor-pointer"
              >
                Review
              </button>
              <button
                type="button"
                onClick={onOpenBookingModal}
                className="min-h-[42px] px-4 py-2 rounded-xl bg-gradient-to-b from-[#E8CA93] to-[#C89F5B] text-[#17120A] text-xs font-semibold inline-flex items-center gap-1.5 whitespace-nowrap cursor-pointer"
              >
                <span>Book Pickup</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};
