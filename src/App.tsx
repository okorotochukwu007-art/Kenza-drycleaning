import React, { useState, useEffect } from 'react';
import {
  ArrowRight,
  MapPin,
  Menu,
  X,
  Sparkles,
  Home,
  Calculator,
  Calendar,
} from 'lucide-react';
import {
  DEFAULT_BUSINESS_CONFIG,
  DEFAULT_GARMENT_CATALOG,
  INITIAL_SAMPLE_TICKETS,
  BusinessConfig,
  GarmentItem,
  GarmentCategory,
  ServiceMode,
  BasketItem,
  LaundryTicket,
  NavPage,
} from './data/kenzaData';
import {
  HeroLuxuryCarousel,
  SpecialtyArtwork,
  KenzaMonogramIcon,
  WhatsAppIcon,
} from './components/AtelierVisuals';
import { PriceEstimator } from './components/PriceEstimator';
import { OrderTracker } from './components/OrderTracker';
import { ValetBookingModal } from './components/ValetBookingModal';
import { OwnerConfigModal } from './components/OwnerConfigModal';
import { PWAInstallButton, OfflineIndicator } from './components/PWAInstallButton';
import {
  FinishedResultsAndPackagingSection,
  IkoyiStudioPhotoShowcase,
  HowItWorksSection,
  ServicesPageView,
  AboutPageView,
  ContactPageView,
  BlogPageView,
} from './components/MultiPageViews';

const STORAGE_KEYS = {
  CONFIG: 'kenza_atelier_business_config_v2',
  CATALOG: 'kenza_atelier_garment_catalog_v2',
  TICKETS: 'kenza_atelier_tickets_v2',
};

export default function App() {
  const [businessConfig, setBusinessConfig] = useState<BusinessConfig>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.CONFIG);
      return saved ? JSON.parse(saved) : DEFAULT_BUSINESS_CONFIG;
    } catch {
      return DEFAULT_BUSINESS_CONFIG;
    }
  });

  const [catalog, setCatalog] = useState<GarmentItem[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.CATALOG);
      return saved ? JSON.parse(saved) : DEFAULT_GARMENT_CATALOG;
    } catch {
      return DEFAULT_GARMENT_CATALOG;
    }
  });

  const [tickets, setTickets] = useState<LaundryTicket[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.TICKETS);
      return saved ? JSON.parse(saved) : INITIAL_SAMPLE_TICKETS;
    } catch {
      return INITIAL_SAMPLE_TICKETS;
    }
  });

  const [activePage, setActivePage] = useState<NavPage>('home');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const [basket, setBasket] = useState<BasketItem[]>([
    { garmentId: 'wash-fold-regular-bag', serviceMode: 'dry_clean', quantity: 1 },
    { garmentId: 'bespoke-suit-2pc', serviceMode: 'dry_clean', quantity: 1 },
    { garmentId: 'executive-shirt', serviceMode: 'dry_clean', quantity: 3 },
  ]);

  const [isExpress, setIsExpress] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<GarmentCategory | 'all'>('all');
  const [activeTicketId, setActiveTicketId] = useState<string>(INITIAL_SAMPLE_TICKETS[0].ticketId);
  const [isBookingModalOpen, setIsBookingModalOpen] = useState(false);
  const [isOwnerModalOpen, setIsOwnerModalOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEYS.CONFIG, JSON.stringify(businessConfig));
    } catch {
      // ignore storage errors
    }
  }, [businessConfig]);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEYS.CATALOG, JSON.stringify(catalog));
    } catch {
      // ignore storage errors
    }
  }, [catalog]);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEYS.TICKETS, JSON.stringify(tickets));
    } catch {
      // ignore storage errors
    }
  }, [tickets]);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage((prev) => (prev === msg ? null : prev));
    }, 3200);
  };

  const navigateToPage = (page: NavPage) => {
    setActivePage(page);
    setIsMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleUpdateQuantity = (garmentId: string, serviceMode: ServiceMode, delta: number) => {
    setBasket((prev) => {
      const existingIndex = prev.findIndex(
        (item) => item.garmentId === garmentId && item.serviceMode === serviceMode
      );
      if (existingIndex > -1) {
        const updatedQty = prev[existingIndex].quantity + delta;
        if (updatedQty <= 0) {
          return prev.filter((_, idx) => idx !== existingIndex);
        }
        const clone = [...prev];
        clone[existingIndex] = { ...clone[existingIndex], quantity: updatedQty };
        return clone;
      } else if (delta > 0) {
        return [...prev, { garmentId, serviceMode, quantity: delta }];
      }
      return prev;
    });
  };

  const handleSelectSpecialtyCategory = (category: GarmentCategory, sampleGarmentId?: string) => {
    setSelectedCategory(category);
    if (sampleGarmentId) {
      handleUpdateQuantity(sampleGarmentId, 'dry_clean', 1);
      const item = catalog.find((g) => g.id === sampleGarmentId);
      if (item) {
        showToast(`Added 1x ${item.name} to your Pickup Estimate`);
      }
    }
    setActivePage('pricelist');
    setIsMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleConfirmBooking = (newTicket: LaundryTicket) => {
    setTickets((prev) => [newTicket, ...prev]);
    setActiveTicketId(newTicket.ticketId);
    showToast(`Ticket #${newTicket.ticketId} created and added to Live Tracker`);
  };

  const handleAdvanceStage = (ticketId: string) => {
    setTickets((prev) =>
      prev.map((t) => {
        if (t.ticketId !== ticketId) return t;
        const nextStage = (t.currentStage + 1) % 5;
        return { ...t, currentStage: nextStage };
      })
    );
  };

  const handleSaveOwnerConfig = (newConfig: BusinessConfig, newCatalog: GarmentItem[]) => {
    setBusinessConfig(newConfig);
    setCatalog(newCatalog);
    showToast('Updated client contact details and Naira price list');
  };

  const handleResetDefaults = () => {
    setBusinessConfig(DEFAULT_BUSINESS_CONFIG);
    setCatalog(DEFAULT_GARMENT_CATALOG);
    localStorage.removeItem(STORAGE_KEYS.CONFIG);
    localStorage.removeItem(STORAGE_KEYS.CATALOG);
    showToast('Restored 109A Awolowo Rd defaults and price list');
  };

  const verifiedWhatsappUrl = 'https://wa.me/2348075705386';
  const totalBasketItems = basket.reduce((sum, item) => sum + item.quantity, 0);

  const navItems: { id: NavPage; label: string }[] = [
    { id: 'home', label: 'Home' },
    { id: 'services', label: 'Services' },
    { id: 'about', label: 'About Us' },
    { id: 'pricelist', label: 'Pricing' },
    { id: 'blog', label: 'Journal' },
    { id: 'contact', label: 'Contact' },
  ];

  return (
    <div className="min-h-screen bg-[#080706] text-[#F5F3EF] flex flex-col pb-20 lg:pb-0">
      <OfflineIndicator />
      {/* Slim, Elegant Luxury Navigation Bar Over the Hero Section */}
      <header className="fixed top-0 inset-x-0 z-40 bg-gradient-to-b from-[#070605]/95 via-[#070605]/70 to-transparent backdrop-blur-[3px]">
        <div className="max-w-[1380px] mx-auto px-4 sm:px-10 lg:px-16 h-16 sm:h-20 flex items-center justify-between gap-3">
          {/* Left Side: Gold Letter K Monogram + KENZA + LAUNDRY & DRY CLEANING SERVICES */}
          <button
            type="button"
            onClick={() => navigateToPage('home')}
            className="flex items-center gap-3 text-left group cursor-pointer shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#DFBC7E] rounded-md"
          >
            <KenzaMonogramIcon className="w-9 h-9 sm:w-10 sm:h-10 shrink-0" />
            <div className="flex flex-col">
              <span className="font-display text-xl sm:text-[26px] tracking-[0.26em] text-[#DFBC7E] group-hover:text-[#F0D59E] transition-colors leading-none font-normal">
                KENZA
              </span>
              <span className="text-[7.5px] sm:text-[9px] tracking-[0.17em] text-[#C8C0B3] uppercase mt-1 whitespace-nowrap">
                LAUNDRY &amp; DRY CLEANING SERVICES
              </span>
            </div>
          </button>

          {/* Right Side: Navigation Links + Location + Champagne-Gold Schedule Pick Up Button */}
          <div className="hidden lg:flex items-center gap-7 xl:gap-8">
            <nav className="flex items-center gap-6 xl:gap-7" aria-label="Main Navigation">
              {navItems.map((item) => {
                const isActive = activePage === item.id;
                return (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => navigateToPage(item.id)}
                    className={`text-xs xl:text-[13px] tracking-wide transition-colors whitespace-nowrap shrink-0 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#DFBC7E] rounded px-1 py-0.5 ${
                      isActive
                        ? 'text-[#DFBC7E] font-medium'
                        : 'text-[#EAE5DC] hover:text-[#DFBC7E] font-normal'
                    }`}
                  >
                    {item.label}
                  </button>
                );
              })}
            </nav>

            {/* Location Pin + "Ikoyi, Lagos" */}
            <button
              type="button"
              onClick={() => navigateToPage('contact')}
              className="flex items-center gap-1.5 text-xs xl:text-[13px] text-[#EAE5DC] hover:text-[#DFBC7E] transition-colors whitespace-nowrap shrink-0 cursor-pointer pl-2 border-l border-white/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#DFBC7E] rounded"
            >
              <MapPin className="w-3.5 h-3.5 text-[#DFBC7E] shrink-0" strokeWidth={1.7} />
              <span>Ikoyi, Lagos</span>
            </button>

            {/* Prominent Champagne-Gold "Schedule Pick Up" Button */}
            <button
              type="button"
              onClick={() => setIsBookingModalOpen(true)}
              className="px-5 py-2.5 rounded-xl bg-gradient-to-b from-[#E8CA93] via-[#DAB678] to-[#C89F5B] hover:from-[#F0D5A3] hover:to-[#D4AC68] text-[#17120A] font-medium text-xs xl:text-[13px] tracking-wide shadow-[0_4px_18px_rgba(217,182,122,0.22)] transition-all whitespace-nowrap shrink-0 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#DFBC7E]"
            >
              Schedule Pick Up
            </button>
          </div>

          {/* Mobile Controls */}
          <div className="flex lg:hidden items-center gap-2">
            <button
              type="button"
              onClick={() => setIsBookingModalOpen(true)}
              className="min-h-[40px] px-3.5 py-2 rounded-lg bg-gradient-to-b from-[#E8CA93] to-[#C89F5B] active:scale-95 text-[#17120A] font-medium text-xs whitespace-nowrap cursor-pointer transition-transform"
            >
              Schedule Pick Up
            </button>
            <button
              type="button"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              aria-label="Toggle navigation menu"
              aria-expanded={isMobileMenuOpen}
              className="min-w-[44px] min-h-[44px] flex items-center justify-center text-[#EAE5DC] hover:text-[#DFBC7E] cursor-pointer"
            >
              {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation Drawer */}
        {isMobileMenuOpen && (
          <div className="lg:hidden bg-[#0E0D0B]/98 border-b border-[#C9A66B]/25 px-5 py-5 space-y-2 backdrop-blur-md">
            {navItems.map((item) => {
              const isActive = activePage === item.id;
              return (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => navigateToPage(item.id)}
                  className={`w-full min-h-[44px] text-left px-4 py-2.5 rounded-xl text-sm transition-colors cursor-pointer flex items-center justify-between ${
                    isActive
                      ? 'bg-[#DFBC7E]/15 text-[#DFBC7E] font-medium border border-[#DFBC7E]/30'
                      : 'text-[#EAE5DC] hover:bg-white/5'
                  }`}
                >
                  <span>{item.label}</span>
                  {item.id === 'pricelist' && totalBasketItems > 0 && (
                    <span className="font-mono-tabular text-xs text-[#DFBC7E]">
                      {totalBasketItems} in basket
                    </span>
                  )}
                </button>
              );
            })}
            <div className="pt-2">
              <PWAInstallButton variant="drawer" />
            </div>
            <div className="pt-3 mt-2 border-t border-white/10 flex flex-wrap items-center justify-between gap-3">
              <button
                type="button"
                onClick={() => navigateToPage('contact')}
                className="min-h-[40px] inline-flex items-center gap-1.5 text-xs text-[#DFBC7E] cursor-pointer"
              >
                <MapPin className="w-3.5 h-3.5" />
                <span>Ikoyi, Lagos · {businessConfig.phoneDisplay}</span>
              </button>
              <a
                href={verifiedWhatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="min-h-[40px] inline-flex items-center gap-1.5 px-3.5 py-2 rounded-lg border border-[#C9A66B]/50 text-xs text-[#F5F0E6]"
              >
                <WhatsAppIcon className="w-3.5 h-3.5 text-[#DFBC7E]" />
                <span>Book on WhatsApp</span>
              </a>
            </div>
          </div>
        )}
      </header>

      {/* Main Content Router */}
      <main className="flex-1">
        {activePage === 'home' && (
          <>
            {/* Cinematic Full-Width Luxury Hero with 5-Scene Crossfade Carousel */}
            <HeroLuxuryCarousel
              onOpenBookingModal={() => setIsBookingModalOpen(true)}
              whatsappUrl={verifiedWhatsappUrl}
            />

            {/* Core Laundry & Dry Cleaning Services Showcase */}
            <section id="specialties" className="py-20 border-t border-white/10 bg-[#0D0F14]">
              <div className="max-w-[1360px] mx-auto px-6 lg:px-10 space-y-12">
                <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6">
                  <div>
                    <p className="text-xs font-mono-tabular uppercase tracking-widest text-[#DFBC7E] mb-2">
                      Our Core Laundry &amp; Dry Cleaning Services
                    </p>
                    <h2
                      className="font-display font-semibold text-[#F5F3EF] tracking-tight"
                      style={{ fontSize: 'clamp(2rem, 3.2vw, 3rem)', textWrap: 'balance' }}
                    >
                      Complete Wardrobe &amp; Home Fabric Care
                    </h2>
                  </div>
                  <button
                    type="button"
                    onClick={() => navigateToPage('services')}
                    className="text-xs font-semibold text-[#DFBC7E] hover:underline inline-flex items-center gap-1.5 cursor-pointer"
                  >
                    <span>Explore All 5 Service Divisions</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>

                {/* 3-Card Core Laundry Pillars + 2-Card Native & Household Row */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                  {/* 01. Specialist Dry Cleaning */}
                  <div className="lg:col-span-4 rounded-xl border border-white/10 bg-[#13151C] overflow-hidden flex flex-col justify-between">
                    <div>
                      <SpecialtyArtwork variant="executive" />
                      <div className="p-6 space-y-3">
                        <div className="flex items-center gap-2 text-xs text-[#9CA3AF]">
                          <span className="text-[#DFBC7E] font-medium">01. Dry Cleaning</span>
                          <span aria-hidden="true">·</span>
                          <span className="font-mono-tabular">From ₦2,500</span>
                        </div>
                        <h3 className="font-display text-2xl font-semibold text-[#F5F3EF]">
                          Specialist Dry Cleaning
                        </h3>
                        <p className="text-xs text-[#9CA3AF] leading-relaxed">
                          Odorless solvent cleaning and hand finishing for 2-piece &amp; 3-piece suits, blazers, corporate dresses, silk blouses, and evening gowns.
                        </p>
                      </div>
                    </div>
                    <div className="px-6 pb-6 pt-4 border-t border-white/10 flex items-center justify-between">
                      <button
                        type="button"
                        onClick={() => handleSelectSpecialtyCategory('executive')}
                        className="text-xs font-semibold text-[#DFBC7E] hover:underline cursor-pointer"
                      >
                        See Dry Cleaning Prices
                      </button>
                      <button
                        type="button"
                        onClick={() => handleSelectSpecialtyCategory('executive', 'bespoke-suit-2pc')}
                        className="px-3 py-1.5 bg-[#0A0A0C] hover:bg-white/5 text-xs text-[#F5F3EF] border border-white/15 rounded-md cursor-pointer"
                      >
                        + Add 2-Piece Suit
                      </button>
                    </div>
                  </div>

                  {/* 02. Wash, Dry & Fold Laundry */}
                  <div className="lg:col-span-4 rounded-xl border border-white/10 bg-[#13151C] overflow-hidden flex flex-col justify-between">
                    <div>
                      <SpecialtyArtwork variant="wash_fold" />
                      <div className="p-6 space-y-3">
                        <div className="flex items-center gap-2 text-xs text-[#9CA3AF]">
                          <span className="text-[#DFBC7E] font-medium">02. Everyday Laundry</span>
                          <span aria-hidden="true">·</span>
                          <span className="font-mono-tabular">From ₦2,000</span>
                        </div>
                        <h3 className="font-display text-2xl font-semibold text-[#F5F3EF]">
                          Wash, Dry &amp; Fold Laundry
                        </h3>
                        <p className="text-xs text-[#9CA3AF] leading-relaxed">
                          Hygienic single-client washing, fabric conditioning, and crisp folding for everyday clothes, polo shirts, jeans, and weekly 5-shirt corporate bundles.
                        </p>
                      </div>
                    </div>
                    <div className="px-6 pb-6 pt-4 border-t border-white/10 flex items-center justify-between">
                      <button
                        type="button"
                        onClick={() => handleSelectSpecialtyCategory('wash_fold')}
                        className="text-xs font-semibold text-[#DFBC7E] hover:underline cursor-pointer"
                      >
                        See Wash &amp; Fold Prices
                      </button>
                      <button
                        type="button"
                        onClick={() =>
                          handleSelectSpecialtyCategory('wash_fold', 'wash-fold-regular-bag')
                        }
                        className="px-3 py-1.5 bg-[#0A0A0C] hover:bg-white/5 text-xs text-[#F5F3EF] border border-white/15 rounded-md cursor-pointer"
                      >
                        + Add Laundry Load
                      </button>
                    </div>
                  </div>

                  {/* 03. Executive Steam Ironing */}
                  <div className="lg:col-span-4 rounded-xl border border-white/10 bg-[#13151C] overflow-hidden flex flex-col justify-between">
                    <div>
                      <SpecialtyArtwork variant="ironing" />
                      <div className="p-6 space-y-3">
                        <div className="flex items-center gap-2 text-xs text-[#9CA3AF]">
                          <span className="text-[#DFBC7E] font-medium">03. Steam Pressing</span>
                          <span aria-hidden="true">·</span>
                          <span className="font-mono-tabular">From ₦1,200</span>
                        </div>
                        <h3 className="font-display text-2xl font-semibold text-[#F5F3EF]">
                          Executive Steam Ironing
                        </h3>
                        <p className="text-xs text-[#9CA3AF] leading-relaxed">
                          High-pressure tension steam pressing and custom starch calibration for washed shirts, trousers, native outfits, and express corporate wardrobe prep.
                        </p>
                      </div>
                    </div>
                    <div className="px-6 pb-6 pt-4 border-t border-white/10 flex items-center justify-between">
                      <button
                        type="button"
                        onClick={() => handleSelectSpecialtyCategory('executive')}
                        className="text-xs font-semibold text-[#DFBC7E] hover:underline cursor-pointer"
                      >
                        See Ironing Rates
                      </button>
                      <button
                        type="button"
                        onClick={() => handleSelectSpecialtyCategory('executive', 'executive-shirt')}
                        className="px-3 py-1.5 bg-[#0A0A0C] hover:bg-white/5 text-xs text-[#F5F3EF] border border-white/15 rounded-md cursor-pointer"
                      >
                        + Add Dress Shirt
                      </button>
                    </div>
                  </div>

                  {/* 04. Traditional Luxury & Native Couture (6 Cols) */}
                  <div className="lg:col-span-6 rounded-xl border border-white/10 bg-[#13151C] overflow-hidden flex flex-col justify-between">
                    <div>
                      <SpecialtyArtwork variant="traditional" />
                      <div className="p-6 space-y-3">
                        <div className="flex items-center gap-2 text-xs text-[#9CA3AF]">
                          <span className="text-[#DFBC7E] font-medium">04. Native Couture Care</span>
                          <span aria-hidden="true">·</span>
                          <span>Agbada · Senator · French Lace · Aso-Oke</span>
                        </div>
                        <h3 className="font-display text-2xl font-semibold text-[#F5F3EF]">
                          Traditional Agbada, Senator &amp; Lace Care
                        </h3>
                        <p className="text-xs text-[#9CA3AF] leading-relaxed">
                          Mesh-shielded cleaning and crisp starch finishing that protects gold tambour embroidery, Swarovski beadwork, and delicate French lace.
                        </p>
                      </div>
                    </div>
                    <div className="px-6 pb-6 pt-4 border-t border-white/10 flex items-center justify-between">
                      <button
                        type="button"
                        onClick={() => handleSelectSpecialtyCategory('traditional')}
                        className="text-xs font-semibold text-[#DFBC7E] hover:underline cursor-pointer"
                      >
                        See Native Wear Rates
                      </button>
                      <button
                        type="button"
                        onClick={() => handleSelectSpecialtyCategory('traditional', 'agbada-3pc')}
                        className="px-3 py-1.5 bg-[#0A0A0C] hover:bg-white/5 text-xs text-[#F5F3EF] border border-white/15 rounded-md cursor-pointer"
                      >
                        + Add 3-Piece Agbada
                      </button>
                    </div>
                  </div>

                  {/* 05. Household Duvets, Curtains & Rugs (6 Cols) */}
                  <div className="lg:col-span-6 rounded-xl border border-white/10 bg-[#13151C] overflow-hidden flex flex-col justify-between">
                    <div>
                      <SpecialtyArtwork variant="household" />
                      <div className="p-6 space-y-3">
                        <div className="flex items-center gap-2 text-xs text-[#9CA3AF]">
                          <span className="text-[#DFBC7E] font-medium">05. Home &amp; Interior Fabrics</span>
                          <span aria-hidden="true">·</span>
                          <span>Duvets · Bed Sheets · Curtains · Centre Rugs</span>
                        </div>
                        <h3 className="font-display text-2xl font-semibold text-[#F5F3EF]">
                          Duvet, Curtain, Bed Linen &amp; Carpet Care
                        </h3>
                        <p className="text-xs text-[#9CA3AF] leading-relaxed">
                          Deep antibacterial sanitization for King/Queen duvets, rotary-pressed Egyptian cotton bed sheets, heavy curtains, and centre rugs.
                        </p>
                      </div>
                    </div>
                    <div className="px-6 pb-6 pt-4 border-t border-white/10 flex items-center justify-between">
                      <button
                        type="button"
                        onClick={() => handleSelectSpecialtyCategory('household')}
                        className="text-xs font-semibold text-[#DFBC7E] hover:underline cursor-pointer"
                      >
                        See Duvet &amp; Rug Rates
                      </button>
                      <button
                        type="button"
                        onClick={() => handleSelectSpecialtyCategory('household', 'king-duvet')}
                        className="px-3 py-1.5 bg-[#0A0A0C] hover:bg-white/5 text-xs text-[#F5F3EF] border border-white/15 rounded-md cursor-pointer"
                      >
                        + Add King Duvet
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* Finished Results & Premium Packaging Presentation */}
            <FinishedResultsAndPackagingSection
              businessConfig={businessConfig}
              onSelectCategoryForEstimate={handleSelectSpecialtyCategory}
              onOpenBookingModal={() => setIsBookingModalOpen(true)}
            />

            {/* Garment Care in Action Photo Showcase */}
            <IkoyiStudioPhotoShowcase
              businessConfig={businessConfig}
              onSelectCategoryForEstimate={handleSelectSpecialtyCategory}
              onOpenBookingModal={() => setIsBookingModalOpen(true)}
            />

            {/* 4-Step How It Works Section */}
            <HowItWorksSection
              businessConfig={businessConfig}
              onOpenBookingModal={() => setIsBookingModalOpen(true)}
            />

            {/* Interactive Price List & Calculator */}
            <PriceEstimator
              catalog={catalog}
              basket={basket}
              isExpress={isExpress}
              selectedCategory={selectedCategory}
              businessConfig={businessConfig}
              onCategoryChange={setSelectedCategory}
              onToggleExpress={setIsExpress}
              onUpdateQuantity={handleUpdateQuantity}
              onClearBasket={() => setBasket([])}
              onOpenBookingModal={() => setIsBookingModalOpen(true)}
              onOpenOwnerModal={() => setIsOwnerModalOpen(true)}
            />

            {/* Live Order Status Tracker */}
            <OrderTracker
              tickets={tickets}
              activeTicketId={activeTicketId}
              businessConfig={businessConfig}
              onSelectTicket={setActiveTicketId}
              onAdvanceStage={handleAdvanceStage}
            />

            {/* Contact & 109A Awolowo Rd Section */}
            <ContactPageView
              businessConfig={businessConfig}
              onOpenBookingModal={() => setIsBookingModalOpen(true)}
            />
          </>
        )}

        {activePage === 'services' && (
          <div className="pt-20">
            <ServicesPageView
              businessConfig={businessConfig}
              onSelectCategoryForEstimate={handleSelectSpecialtyCategory}
              onOpenBookingModal={() => setIsBookingModalOpen(true)}
            />
          </div>
        )}

        {activePage === 'pricelist' && (
          <div className="pt-20">
            <PriceEstimator
              catalog={catalog}
              basket={basket}
              isExpress={isExpress}
              selectedCategory={selectedCategory}
              businessConfig={businessConfig}
              isDedicatedPage={true}
              onCategoryChange={setSelectedCategory}
              onToggleExpress={setIsExpress}
              onUpdateQuantity={handleUpdateQuantity}
              onClearBasket={() => setBasket([])}
              onOpenBookingModal={() => setIsBookingModalOpen(true)}
              onOpenOwnerModal={() => setIsOwnerModalOpen(true)}
            />
          </div>
        )}

        {activePage === 'about' && (
          <div className="pt-20">
            <AboutPageView
              businessConfig={businessConfig}
              onOpenBookingModal={() => setIsBookingModalOpen(true)}
              onNavigateContact={() => navigateToPage('contact')}
            />
          </div>
        )}

        {activePage === 'contact' && (
          <div className="pt-20">
            <ContactPageView
              businessConfig={businessConfig}
              onOpenBookingModal={() => setIsBookingModalOpen(true)}
            />
          </div>
        )}

        {activePage === 'blog' && (
          <div className="pt-20">
            <BlogPageView
              businessConfig={businessConfig}
              onOpenBookingModal={() => setIsBookingModalOpen(true)}
            />
          </div>
        )}
      </main>

      {/* Quiet Editorial Footer with Verified Google Business Information */}
      <footer className="border-t border-white/10 bg-[#070605] py-12 pb-24 sm:pb-12">
        <div className="max-w-[1360px] mx-auto px-6 lg:px-10 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-8">
          <div className="space-y-1.5">
            <div className="flex items-center gap-2.5">
              <KenzaMonogramIcon className="w-7 h-7" />
              <p className="font-display text-xl font-semibold text-[#DFBC7E] tracking-wider">
                {businessConfig.businessName}
              </p>
            </div>
            <p className="text-xs text-[#9CA3AF]">
              {businessConfig.streetAddress} · Business type: {businessConfig.businessType}
            </p>
            <p className="text-xs font-mono-tabular text-[#DFBC7E]">
              Phone: {businessConfig.phoneDisplay}
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-5 sm:gap-6 text-xs text-[#9CA3AF]">
            {navItems.map((item) => (
              <button
                key={item.id}
                type="button"
                onClick={() => navigateToPage(item.id)}
                className="min-h-[36px] hover:text-[#F5F3EF] transition-colors cursor-pointer"
              >
                {item.label}
              </button>
            ))}
            <button
              type="button"
              onClick={() => setIsOwnerModalOpen(true)}
              className="min-h-[36px] text-[#DFBC7E] hover:underline cursor-pointer"
            >
              Edit Rates &amp; Info
            </button>
            <PWAInstallButton variant="footer" />
          </div>
        </div>
      </footer>

      {/* Thumb-Friendly Mobile Bottom Tab Bar for iPhone & Android Users */}
      <nav
        aria-label="Mobile quick navigation"
        className="lg:hidden fixed bottom-0 inset-x-0 z-40 bg-[#0A0908]/95 backdrop-blur-md border-t border-[#DFBC7E]/20 pb-safe"
      >
        <div className="grid grid-cols-5 items-center h-16 px-1">
          <button
            type="button"
            onClick={() => navigateToPage('home')}
            className={`min-h-[48px] flex flex-col items-center justify-center gap-1 transition-colors cursor-pointer ${
              activePage === 'home' ? 'text-[#DFBC7E]' : 'text-[#A39E93]'
            }`}
          >
            <Home className="w-5 h-5" strokeWidth={activePage === 'home' ? 2.1 : 1.7} />
            <span className="text-[10px] font-medium tracking-tight">Home</span>
          </button>

          <button
            type="button"
            onClick={() => navigateToPage('services')}
            className={`min-h-[48px] flex flex-col items-center justify-center gap-1 transition-colors cursor-pointer ${
              activePage === 'services' ? 'text-[#DFBC7E]' : 'text-[#A39E93]'
            }`}
          >
            <Sparkles className="w-5 h-5" strokeWidth={activePage === 'services' ? 2.1 : 1.7} />
            <span className="text-[10px] font-medium tracking-tight">Services</span>
          </button>

          <button
            type="button"
            onClick={() => setIsBookingModalOpen(true)}
            aria-label="Schedule doorstep laundry pickup"
            className="min-h-[48px] flex flex-col items-center justify-center -mt-3 cursor-pointer group"
          >
            <span className="w-11 h-11 rounded-full bg-gradient-to-b from-[#E8CA93] via-[#DAB678] to-[#C89F5B] text-[#17120A] flex items-center justify-center shadow-[0_4px_16px_rgba(223,188,126,0.35)] active:scale-95 transition-transform">
              <Calendar className="w-5 h-5" strokeWidth={2} />
            </span>
            <span className="text-[10px] font-semibold text-[#DFBC7E] tracking-tight mt-0.5">
              Pick Up
            </span>
          </button>

          <button
            type="button"
            onClick={() => navigateToPage('pricelist')}
            className={`relative min-h-[48px] flex flex-col items-center justify-center gap-1 transition-colors cursor-pointer ${
              activePage === 'pricelist' ? 'text-[#DFBC7E]' : 'text-[#A39E93]'
            }`}
          >
            <div className="relative">
              <Calculator className="w-5 h-5" strokeWidth={activePage === 'pricelist' ? 2.1 : 1.7} />
              {totalBasketItems > 0 && (
                <span className="absolute -top-1.5 -right-2.5 min-w-[16px] h-4 px-1 rounded-full bg-[#DFBC7E] text-[#17120A] font-mono-tabular text-[10px] font-bold flex items-center justify-center">
                  {totalBasketItems}
                </span>
              )}
            </div>
            <span className="text-[10px] font-medium tracking-tight">Pricing</span>
          </button>

          <a
            href={verifiedWhatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="min-h-[48px] flex flex-col items-center justify-center gap-1 text-[#A39E93] hover:text-[#25D366] active:text-[#25D366] transition-colors cursor-pointer"
          >
            <WhatsAppIcon className="w-5 h-5 text-[#25D366]" />
            <span className="text-[10px] font-medium tracking-tight text-[#EAE5DC]">WhatsApp</span>
          </a>
        </div>
      </nav>

      {/* Floating WhatsApp Contact Button Matching Reference Screenshot (Desktop) */}
      <a
        href={verifiedWhatsappUrl}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Chat on WhatsApp with Kenza Laundry & Dry Cleaning Services"
        className="hidden lg:inline-flex fixed bottom-6 right-6 z-40 group items-center focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#25D366] rounded-full"
      >
        <span className="bg-[#151515]/95 border border-white/15 text-[#F5F3EF] text-xs font-medium pl-4 pr-11 py-2.5 rounded-full shadow-[0_8px_28px_rgba(0,0,0,0.75)] group-hover:border-[#25D366]/60 transition-colors whitespace-nowrap">
          Chat on WhatsApp
        </span>
        <span className="-ml-9 w-11 h-11 rounded-full bg-[#25D366] group-hover:bg-[#20BD5A] text-white flex items-center justify-center shadow-[0_4px_16px_rgba(37,211,102,0.45)] transition-transform group-hover:scale-105">
          <WhatsAppIcon className="w-5 h-5 text-white" />
        </span>
      </a>

      {/* Interactive Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-20 right-5 z-50 px-4 py-3 rounded-xl bg-[#161923] border border-[#DFBC7E] text-xs font-medium text-[#F5F3EF] shadow-lg flex items-center gap-2">
          <Sparkles className="w-4 h-4 text-[#DFBC7E] shrink-0" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Doorstep Valet Pickup Scheduler Modal */}
      <ValetBookingModal
        isOpen={isBookingModalOpen}
        onClose={() => setIsBookingModalOpen(false)}
        catalog={catalog}
        basket={basket}
        isExpress={isExpress}
        businessConfig={businessConfig}
        onToggleExpress={setIsExpress}
        onAddQuickBundle={(garmentId, qty) => handleUpdateQuantity(garmentId, 'dry_clean', qty)}
        onConfirmBooking={handleConfirmBooking}
      />

      {/* Owner Contact & Rate Card Customizer Modal */}
      <OwnerConfigModal
        isOpen={isOwnerModalOpen}
        onClose={() => setIsOwnerModalOpen(false)}
        businessConfig={businessConfig}
        catalog={catalog}
        onSaveConfig={handleSaveOwnerConfig}
        onResetDefaults={handleResetDefaults}
      />
    </div>
  );
}
