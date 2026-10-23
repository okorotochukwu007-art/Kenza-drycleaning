import React, { useState, useEffect, useCallback } from 'react';
import {
  Calendar,
  ArrowRight,
  ChevronLeft,
  ChevronRight,
  ShieldCheck,
  Clock,
  Leaf,
  Star,
} from 'lucide-react';

export const LAUNDRY_PHOTOS = {
  // 5 Distinct Hero Carousel Scenes
  scene1KenzaWhiteShirt: '/assets/laundry/hero_scene1_kenza_shirt.png',
  scene2TailoredDarkSuit: '/assets/laundry/pexels_31492553.jpg',
  scene3LuxuryFoldedTowels: '/assets/laundry/pexels_22598409.jpg',
  scene4WashingMachineFilledClothes: '/assets/laundry/washing_machine_filled_clothes.jpg',
  scene5PressedShirtsSelection: '/assets/laundry/pexels_17281873.jpg',

  // Supporting & Service Section Photography
  heroWhiteShirtsOnRail: '/assets/laundry/pexels_17281873.jpg',
  heroSuitAndShirtsOnRail: '/assets/laundry/pexels_1682699.jpg',
  whiteShirtsWideRail: '/assets/laundry/pexels_17293343.jpg',
  whiteShirtCollarsCloseUp: '/assets/laundry/pexels_17315934.jpg',
  whiteShirtAndDarkSuitHanger: '/assets/laundry/pexels_10131161.jpg',
  tailoredDarkSuitsOnHangers: '/assets/laundry/pexels_31492553.jpg',
  dressShirtsStainlessRail: '/assets/laundry/wikimedia_dress_shirts_rack.jpg',
  studioClothingRailWhite: '/assets/laundry/pexels_8306368.jpg',
  darkStudioShirtsOnHangers: '/assets/laundry/pexels_264726.jpg',
  foldedPastelAndWhiteShirtsTwine: '/assets/laundry/pexels_7445132.jpg',
  foldedShirtsStackCleanBench: '/assets/laundry/pexels_linen_7445127.jpg',
  foldedWhiteTowelsWorkSurface: '/assets/laundry/pexels_7691101.jpg',
  foldedWhiteLinensAndRobe: '/assets/laundry/pexels_22598409.jpg',
  ribbonFoldedLuxuryFabric: '/assets/laundry/folded_linen_stack.jpg',
  packagedOrderLaundryBagSpecialist: '/assets/laundry/pexels_series_10558193.jpg',
  packagedDrawstringBagAndRack: '/assets/laundry/pexels_series_10558198.jpg',
  readyForDeliveryRackAndBoxes: '/assets/laundry/pexels_series_10558185.jpg',
  steamIronPressingWhiteShirt: '/assets/laundry/pexels_ironing_shirt_5901623.jpg',
  steamingWhiteShirtCloseUp: '/assets/laundry/pexels_series_10558201.jpg',
  specialistSteamingHangingShirt: '/assets/laundry/pexels_steam_ironing_2.jpg',
  handsInspectingShirtCollar: '/assets/laundry/pexels_28576622.jpg',
  handSortingHangersOnRail: '/assets/laundry/pexels_series_10558191.jpg',
  enzymaticCareAndSpotBrush: '/assets/laundry/pexels_series_10558186.jpg',
  commercialFrontLoadMachines: '/assets/laundry/washing_machines_shop.jpg',
  sanitizedStainlessDrum: '/assets/laundry/washing_drum.jpg',
};

/**
 * Refined Gold Letter "K" Monogram Lockup matching the reference screenshot
 */
export const KenzaMonogramIcon: React.FC<{ className?: string }> = ({
  className = 'w-9 h-9',
}) => (
  <svg
    viewBox="0 0 48 48"
    fill="none"
    className={className}
    aria-hidden="true"
  >
    <defs>
      <linearGradient id="kenzaGoldGrad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#F2D79E" />
        <stop offset="50%" stopColor="#D7B16D" />
        <stop offset="100%" stopColor="#A9823E" />
      </linearGradient>
    </defs>
    {/* Top & Bottom Serif Bars */}
    <line x1="6" y1="6" x2="19" y2="6" stroke="url(#kenzaGoldGrad)" strokeWidth="1.6" />
    <line x1="6" y1="42" x2="19" y2="42" stroke="url(#kenzaGoldGrad)" strokeWidth="1.6" />
    <line x1="30" y1="6" x2="41" y2="6" stroke="url(#kenzaGoldGrad)" strokeWidth="1.4" />
    <line x1="31" y1="42" x2="43" y2="42" stroke="url(#kenzaGoldGrad)" strokeWidth="1.4" />

    {/* Double Vertical Stem */}
    <line x1="10.5" y1="6" x2="10.5" y2="42" stroke="url(#kenzaGoldGrad)" strokeWidth="2.2" />
    <line x1="14.5" y1="6" x2="14.5" y2="42" stroke="url(#kenzaGoldGrad)" strokeWidth="1.2" />

    {/* Upper & Lower Diagonal Strokes */}
    <line x1="15" y1="25" x2="36.5" y2="6" stroke="url(#kenzaGoldGrad)" strokeWidth="1.8" />
    <line x1="19.5" y1="21" x2="38" y2="42" stroke="url(#kenzaGoldGrad)" strokeWidth="2.4" />
    <line x1="17" y1="23.5" x2="34" y2="42" stroke="url(#kenzaGoldGrad)" strokeWidth="1.1" />
  </svg>
);

/**
 * Clean WhatsApp Vector Icon
 */
export const WhatsAppIcon: React.FC<{ className?: string }> = ({
  className = 'w-4 h-4',
}) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.8"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
    aria-hidden="true"
  >
    <path d="M3 21l1.65-3.8a9 9 0 1 1 3.4 2.9L3 21" />
    <path d="M9 10a.5.5 0 0 0 1 0V9a.5.5 0 0 0-1 0v1a5 5 0 0 0 5 5h1a.5.5 0 0 0 0-1h-1a.5.5 0 0 0 0 1" />
  </svg>
);

export interface HeroCarouselSlide {
  id: string;
  src: string;
  fallbackSrc: string;
  alt: string;
  objectPositionClass: string;
  isFullBleedComposite?: boolean;
}

export const HERO_CAROUSEL_SLIDES: HeroCarouselSlide[] = [
  {
    id: 'crisp-white-shirt',
    src: LAUNDRY_PHOTOS.scene1KenzaWhiteShirt,
    fallbackSrc: LAUNDRY_PHOTOS.heroWhiteShirtsOnRail,
    alt: 'Crisp white luxury dress shirt on a premium matte-black KENZA hanger in a softly illuminated wardrobe',
    objectPositionClass: 'object-[78%_center] lg:object-center',
    isFullBleedComposite: true,
  },
  {
    id: 'tailored-dark-suit',
    src: LAUNDRY_PHOTOS.scene2TailoredDarkSuit,
    fallbackSrc: LAUNDRY_PHOTOS.heroSuitAndShirtsOnRail,
    alt: 'Perfectly tailored dark suit jacket on a contoured hanger in a sophisticated wardrobe setting',
    objectPositionClass: 'object-center',
  },
  {
    id: 'folded-white-towels',
    src: LAUNDRY_PHOTOS.scene3LuxuryFoldedTowels,
    fallbackSrc: LAUNDRY_PHOTOS.foldedWhiteTowelsWorkSurface,
    alt: 'Luxuriously folded white towels and crisp linens presented on a dark wood surface',
    objectPositionClass: 'object-center',
  },
  {
    id: 'washing-machine-filled-clothes',
    src: LAUNDRY_PHOTOS.scene4WashingMachineFilledClothes,
    fallbackSrc: LAUNDRY_PHOTOS.commercialFrontLoadMachines,
    alt: 'Front-loading stainless-steel washing machine drum filled with clean clothes and towels',
    objectPositionClass: 'object-center',
  },
  {
    id: 'pressed-shirts-selection',
    src: LAUNDRY_PHOTOS.scene5PressedShirtsSelection,
    fallbackSrc: LAUNDRY_PHOTOS.whiteShirtsWideRail,
    alt: 'Refined selection of freshly pressed white and cream dress shirts arranged on hangers',
    objectPositionClass: 'object-[60%_60%] lg:object-[50%_60%]',
  },
];

/**
 * Full-Width Cinematic Luxury Hero Section with 5-Scene Crossfade Carousel
 * Matches the attached reference screenshot layout, typography, colors, buttons,
 * 4 luxury benefit items, arrows, and slide indicators.
 */
export const HeroLuxuryCarousel: React.FC<{
  onOpenBookingModal: () => void;
  whatsappUrl: string;
}> = ({ onOpenBookingModal, whatsappUrl }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [failedImages, setFailedImages] = useState<Record<string, boolean>>({});
  const [touchStartX, setTouchStartX] = useState<number | null>(null);

  const totalSlides = HERO_CAROUSEL_SLIDES.length;

  const goToNext = useCallback(() => {
    setCurrentIndex((prev) => (prev + 1) % totalSlides);
  }, [totalSlides]);

  const goToPrev = useCallback(() => {
    setCurrentIndex((prev) => (prev - 1 + totalSlides) % totalSlides);
  }, [totalSlides]);

  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchStartX(e.touches[0].clientX);
    setIsPaused(true);
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX === null) {
      setIsPaused(false);
      return;
    }
    const deltaX = e.changedTouches[0].clientX - touchStartX;
    if (Math.abs(deltaX) > 40) {
      if (deltaX < 0) {
        goToNext();
      } else {
        goToPrev();
      }
    }
    setTouchStartX(null);
    setIsPaused(false);
  };

  // Preload subsequent carousel images for instant, layout-shift-free transitions
  useEffect(() => {
    HERO_CAROUSEL_SLIDES.forEach((slide) => {
      const img = new Image();
      img.src = slide.src;
    });
  }, []);

  // Auto-advance every 6 seconds unless paused or prefers-reduced-motion is enabled
  useEffect(() => {
    if (isPaused) return;
    const prefersReducedMotion =
      typeof window !== 'undefined' &&
      window.matchMedia &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    const timer = window.setInterval(() => {
      goToNext();
    }, 6000);

    return () => window.clearInterval(timer);
  }, [isPaused, goToNext]);

  const handleImageError = (id: string) => {
    setFailedImages((prev) => ({ ...prev, [id]: true }));
  };

  const luxuryBenefits = [
    {
      icon: ShieldCheck,
      line1: 'Premium',
      line2: 'Garment Care',
    },
    {
      icon: Clock,
      line1: 'On-Time',
      line2: 'Service',
    },
    {
      icon: Leaf,
      line1: 'Eco-Friendly',
      line2: 'Cleaning Solutions',
    },
    {
      icon: Star,
      line1: 'Trusted by',
      line2: 'Discerning Clients',
    },
  ];

  return (
    <section
      className="relative w-full min-h-[640px] sm:min-h-[680px] lg:min-h-[88vh] bg-[#080706] overflow-hidden flex items-center select-none pt-24 pb-16 lg:py-24"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
      aria-roledescription="carousel"
      aria-label="Kenza Luxury Garment Care Showcase"
    >
      {/* Background Carousel Slides */}
      <div className="absolute inset-0 w-full h-full pointer-events-none">
        {HERO_CAROUSEL_SLIDES.map((slide, index) => {
          const isActive = index === currentIndex;
          const imgSrc = failedImages[slide.id] ? slide.fallbackSrc : slide.src;

          return (
            <div
              key={slide.id}
              aria-hidden={!isActive}
              className={`absolute inset-0 w-full h-full transition-opacity duration-1000 ease-in-out ${
                isActive ? 'opacity-100 z-10' : 'opacity-0 z-0'
              }`}
            >
              {slide.isFullBleedComposite ? (
                /* Scene 1: Full-width composite with the white luxury KENZA shirt on the right */
                <img
                  src={imgSrc}
                  alt={slide.alt}
                  loading={index === 0 ? 'eager' : 'lazy'}
                  onError={() => handleImageError(slide.id)}
                  className={`w-full h-full object-cover ${slide.objectPositionClass}`}
                />
              ) : (
                /* Scenes 2–5: Positioned prominently on the right 62% of the hero canvas with warm luxury lighting */
                <div className="relative w-full h-full bg-[#080706]">
                  <div className="absolute inset-y-0 right-0 w-full lg:w-[64%] h-full overflow-hidden">
                    <img
                      src={imgSrc}
                      alt={slide.alt}
                      loading="lazy"
                      onError={() => handleImageError(slide.id)}
                      className={`w-full h-full object-cover ${slide.objectPositionClass} brightness-95 contrast-105`}
                    />
                    {/* Warm Golden Editorial Rim Wash & Left Feather into Deep Black */}
                    <div
                      className="absolute inset-0 bg-gradient-to-r from-[#080706] via-[#080706]/55 to-transparent"
                      aria-hidden="true"
                    />
                    <div
                      className="absolute inset-0 bg-[radial-gradient(circle_at_68%_45%,rgba(223,188,126,0.14)_0%, rgba(8,7,6,0.35)_65%,rgba(8,7,6,0.85)_100%)]"
                      aria-hidden="true"
                    />
                  </div>
                </div>
              )}
            </div>
          );
        })}

        {/* Deep Black Left & Top/Bottom Readability Gradient Scrims */}
        <div
          className="absolute inset-0 z-20 bg-gradient-to-r from-[#070605] via-[#070605]/88 via-42% to-transparent"
          aria-hidden="true"
        />
        <div
          className="absolute inset-x-0 top-0 h-28 z-20 bg-gradient-to-b from-[#070605]/90 via-[#070605]/45 to-transparent"
          aria-hidden="true"
        />
        <div
          className="absolute inset-x-0 bottom-0 h-24 z-20 bg-gradient-to-t from-[#070605]/85 via-[#070605]/30 to-transparent"
          aria-hidden="true"
        />
        {/* Extra mobile readability scrim so text is crisp on narrow screens */}
        <div
          className="absolute inset-0 z-20 bg-black/45 lg:bg-transparent"
          aria-hidden="true"
        />
      </div>

      {/* Discreet Previous Slide Arrow (Left Edge) */}
      <button
        type="button"
        onClick={goToPrev}
        aria-label="Previous garment scene"
        className="hidden sm:flex absolute left-4 lg:left-7 top-1/2 -translate-y-1/2 z-30 w-10 h-10 rounded-full border border-[#C9A66B]/35 bg-black/45 hover:bg-black/75 hover:border-[#DFBC7E] text-[#D8B679] items-center justify-center transition-colors cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#DFBC7E]"
      >
        <ChevronLeft className="w-4 h-4" />
      </button>

      {/* Discreet Next Slide Arrow (Right Edge) */}
      <button
        type="button"
        onClick={goToNext}
        aria-label="Next garment scene"
        className="hidden sm:flex absolute right-4 lg:right-7 top-1/2 -translate-y-1/2 z-30 w-10 h-10 rounded-full border border-[#C9A66B]/35 bg-black/45 hover:bg-black/75 hover:border-[#DFBC7E] text-[#D8B679] items-center justify-center transition-colors cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#DFBC7E]"
      >
        <ChevronRight className="w-4 h-4" />
      </button>

      {/* Foreground Hero Content Container */}
      <div className="relative z-30 w-full max-w-[1380px] mx-auto px-5 sm:px-12 lg:px-20">
        <div className="max-w-[620px] space-y-6 sm:space-y-7">
          {/* Small Gold Uppercase Eyebrow Text + Subtle Rule */}
          <div className="flex items-center gap-3">
            <span className="text-[10px] sm:text-xs uppercase tracking-[0.25em] text-[#D8B679] font-medium">
              PREMIUM LAUNDRY &amp; DRY CLEANING SERVICES
            </span>
            <span className="hidden sm:inline-block w-8 h-[1px] bg-[#D8B679]/55" aria-hidden="true" />
          </div>

          {/* Main Luxury Serif Headline */}
          <h1
            className="font-display font-medium text-[#F7F4EE] tracking-[-0.01em] leading-[1.06]"
            style={{ fontSize: 'clamp(2.65rem, 5.2vw, 4.5rem)' }}
          >
            <span className="block">Leave the</span>
            <span className="block mt-1">
              <span className="text-[#DFBC7E]">Laundry</span> to Us
            </span>
          </h1>

          {/* Compact Supporting Copy */}
          <p className="text-sm sm:text-[15px] text-[#D8D3C8] leading-[1.65] max-w-[50ch] font-normal">
            Your time is valuable. Let us handle the washing, ironing and dry cleaning while you spend more time with family, work or the things you enjoy.
          </p>

          {/* Hero Call-To-Action Buttons */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3.5 sm:gap-4 pt-1">
            {/* Primary Champagne-Gold Button */}
            <button
              type="button"
              onClick={onOpenBookingModal}
              className="min-h-[48px] px-6 py-3.5 rounded-full bg-gradient-to-b from-[#E8CA93] via-[#DAB678] to-[#C89F5B] hover:from-[#F0D5A3] hover:to-[#D4AC68] active:scale-[0.98] text-[#17120A] font-medium text-xs sm:text-sm tracking-wide shadow-[0_6px_24px_rgba(217,182,122,0.22)] transition-all inline-flex items-center justify-center gap-2.5 whitespace-nowrap cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#DFBC7E]"
            >
              <Calendar className="w-4 h-4 text-[#17120A] shrink-0" strokeWidth={1.8} />
              <span>Schedule Pick Up</span>
              <ArrowRight className="w-3.5 h-3.5 text-[#17120A] shrink-0" strokeWidth={1.8} />
            </button>

            {/* Secondary Dark Transparent Button with Fine Champagne-Gold Border */}
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="min-h-[48px] px-6 py-3.5 rounded-full bg-[#0E0D0B]/75 hover:bg-[#1C1813]/90 active:scale-[0.98] text-[#F5F0E6] border border-[#C9A66B]/65 hover:border-[#DFBC7E] font-medium text-xs sm:text-sm tracking-wide transition-all inline-flex items-center justify-center gap-2.5 whitespace-nowrap cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#DFBC7E]"
            >
              <WhatsAppIcon className="w-4 h-4 text-[#DFBC7E] shrink-0" />
              <span>Book on WhatsApp</span>
            </a>
          </div>

          {/* Subtle Champagne-Gold Hairline Divider with Center Accent */}
          <div className="flex items-center gap-3 pt-2 max-w-[480px]" aria-hidden="true">
            <div className="h-[1px] flex-1 bg-gradient-to-r from-transparent via-[#C9A66B]/35 to-[#C9A66B]/50" />
            <div className="w-2 h-0.5 rounded-full bg-[#DFBC7E]/80" />
            <div className="h-[1px] flex-1 bg-gradient-to-l from-transparent via-[#C9A66B]/35 to-[#C9A66B]/50" />
          </div>

          {/* Four Luxury Benefit Items (Single Row on Desktop, 2x2 on Narrow Mobile) */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-5 sm:gap-4 pt-1 max-w-[520px]">
            {luxuryBenefits.map((benefit) => {
              const IconComponent = benefit.icon;
              return (
                <div
                  key={benefit.line1 + benefit.line2}
                  className="flex flex-col items-center text-center space-y-2"
                >
                  <IconComponent
                    className="w-6 h-6 text-[#D8B679]"
                    strokeWidth={1.35}
                    aria-hidden="true"
                  />
                  <p className="text-[11px] sm:text-xs text-[#E8E2D5] leading-[1.35] font-normal">
                    <span className="block">{benefit.line1}</span>
                    <span className="block text-[#CBC4B6]">{benefit.line2}</span>
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Bottom Center Slide Indicator Dots + Mobile Touch Targets */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-30 flex items-center gap-1">
        {HERO_CAROUSEL_SLIDES.map((slide, idx) => {
          const isActive = idx === currentIndex;
          return (
            <button
              key={slide.id}
              type="button"
              onClick={() => setCurrentIndex(idx)}
              aria-label={`Show garment scene ${idx + 1}: ${slide.alt}`}
              aria-current={isActive ? 'true' : undefined}
              className="p-2 flex items-center justify-center cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#DFBC7E] rounded-full"
            >
              <span
                className={`block rounded-full transition-all ${
                  isActive
                    ? 'w-2.5 h-2.5 bg-[#F5F0E6] shadow-[0_0_8px_rgba(223,188,126,0.8)]'
                    : 'w-2 h-2 bg-transparent border border-[#F5F0E6]/45 hover:border-[#DFBC7E]'
                }`}
              />
            </button>
          );
        })}
      </div>
    </section>
  );
};

export const HeroAtelierShowcase: React.FC<{
  coordinatesLabel?: string;
  streetAddress?: string;
}> = () => {
  return (
    <div className="relative w-full h-[360px] sm:h-[420px] lg:h-[460px] max-h-[460px] bg-[#0A0A0C] select-none overflow-hidden">
      <img
        src={LAUNDRY_PHOTOS.heroWhiteShirtsOnRail}
        alt="Crisply pressed white and cream business shirts arranged on hangers"
        loading="eager"
        className="absolute inset-0 w-full h-full object-cover object-bottom origin-bottom scale-[1.14] opacity-85 feather-hero-mask"
      />
    </div>
  );
};

export const SpecialtyArtwork: React.FC<{
  variant: 'traditional' | 'executive' | 'household' | 'wash_fold' | 'ironing';
}> = ({ variant }) => {
  const imageMap = {
    executive: {
      src: LAUNDRY_PHOTOS.tailoredDarkSuitsOnHangers,
      alt: 'Dark navy and charcoal business suits neatly arranged on contoured hangers on a clothing rail',
    },
    wash_fold: {
      src: LAUNDRY_PHOTOS.foldedShirtsStackCleanBench,
      alt: 'Freshly laundered white, cream, pastel blue, and charcoal shirts folded evenly in a neat stack on a clean work surface',
    },
    ironing: {
      src: LAUNDRY_PHOTOS.steamIronPressingWhiteShirt,
      alt: 'Professional steam iron pressing a freshly laundered dress shirt on a clean ironing board',
    },
    traditional: {
      src: LAUNDRY_PHOTOS.ribbonFoldedLuxuryFabric,
      alt: 'Neatly folded and ribbon-wrapped navy textile stack prepared for formal wear presentation',
    },
    household: {
      src: LAUNDRY_PHOTOS.foldedWhiteTowelsWorkSurface,
      alt: 'Crisp stack of freshly laundered white towels and bed linens on a clean work surface',
    },
  };

  const selected = imageMap[variant];

  return (
    <div className="relative w-full h-48 bg-[#13151C] overflow-hidden">
      <img
        src={selected.src}
        alt={selected.alt}
        loading="lazy"
        className="w-full h-full object-cover opacity-85 feather-card-mask"
      />
      <div
        className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-[#13151C] via-[#13151C]/75 to-transparent pointer-events-none"
        aria-hidden="true"
      />
      <div
        className="absolute inset-x-0 top-0 h-12 bg-gradient-to-b from-[#13151C]/60 to-transparent pointer-events-none"
        aria-hidden="true"
      />
      <div
        className="absolute inset-y-0 left-0 w-12 bg-gradient-to-r from-[#13151C]/70 to-transparent pointer-events-none"
        aria-hidden="true"
      />
      <div
        className="absolute inset-y-0 right-0 w-12 bg-gradient-to-l from-[#13151C]/70 to-transparent pointer-events-none"
        aria-hidden="true"
      />
    </div>
  );
};
