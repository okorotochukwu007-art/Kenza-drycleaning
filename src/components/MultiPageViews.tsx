import React, { useState } from 'react';
import {
  ArrowRight,
  ArrowUpRight,
  CheckCircle2,
  Clock,
  MapPin,
  MessageSquare,
  Phone,
  ShieldCheck,
  Sparkles,
  BookOpen,
} from 'lucide-react';
import {
  BusinessConfig,
  GarmentCategory,
  LAGOS_SERVICE_ZONES,
  BLOG_POSTS,
  BlogPost,
} from '../data/kenzaData';
import { SpecialtyArtwork, LAUNDRY_PHOTOS } from './AtelierVisuals';

/**
 * Finished-Results & Premium Packaging Showcase Section
 * Highlights:
 * 1. Dry-cleaned shirts & suits on hangers with protective covers
 * 2. Beautifully folded clothes & crisp linen stacks
 * 3. Tastefully packaged orders ready for collection or doorstep delivery
 */
export const FinishedResultsAndPackagingSection: React.FC<{
  businessConfig: BusinessConfig;
  onSelectCategoryForEstimate: (cat: GarmentCategory, sampleId?: string) => void;
  onOpenBookingModal: () => void;
}> = ({ businessConfig, onSelectCategoryForEstimate, onOpenBookingModal }) => {
  const presentations = [
    {
      badge: '01 · Hanger & Protective Cover Presentation',
      title: 'Crisp Shirts & Suits in Individual Protective Covers',
      description:
        'Business shirts, native attire, and dark navy or charcoal suits are placed on contoured hangers on stainless-steel rails and sealed in breathable transparent garment covers to stay spotless in transit.',
      image: LAUNDRY_PHOTOS.whiteShirtsWideRail,
      alt: 'Row of freshly dry-cleaned white business shirts on wooden hangers on a clean stainless-steel clothing rail',
      specs: ['Contoured Collar & Shoulder Support', 'Transparent Protective Poly-Covers'],
      ctaLabel: 'Estimate Suit & Shirt Dry Cleaning',
      category: 'executive' as GarmentCategory,
      sampleId: 'bespoke-suit-2pc',
      hasProtectiveSheen: true,
    },
    {
      badge: '02 · Precision Shelf-Ready Folding',
      title: 'Beautifully Folded Shirts, Casual Wear & Linens',
      description:
        'Freshly laundered shirts, trousers, casual wear, soft towels, and bed linens are folded with crisp, even edges on sanitized work surfaces—ready to place directly into your wardrobe.',
      image: LAUNDRY_PHOTOS.foldedWhiteLinensAndRobe,
      alt: 'Neatly folded white linens and freshly laundered garments arranged with crisp edges',
      specs: ['Uniform Wardrobe Dimensions', 'Crisp Edges & Sorted Stacks'],
      ctaLabel: 'Estimate Wash, Dry & Fold',
      category: 'wash_fold' as GarmentCategory,
      sampleId: 'wash-fold-regular-bag',
      hasProtectiveSheen: false,
    },
    {
      badge: '03 · Ready for Collection & Delivery',
      title: 'Tastefully Packaged Orders for Busy Households',
      description:
        'Completed laundry and dry-cleaning orders are carefully organized into understated laundry bags, wrapped stacks, and hung sets prepared for collection or doorstep delivery across Ikoyi, VI, and Lekki.',
      image: LAUNDRY_PHOTOS.packagedOrderLaundryBagSpecialist,
      alt: 'Completed laundry order neatly packaged in an understated cream laundry bag beside a garment rack',
      specs: ['Organized per Family Member or Wardrobe', 'Protected Against Lagos Humidity & Dust'],
      ctaLabel: 'Schedule Pickup & Delivery',
      category: 'executive' as GarmentCategory,
      sampleId: 'executive-shirt',
      hasProtectiveSheen: false,
    },
  ];

  return (
    <section className="py-20 border-t border-white/10 bg-[#0A0A0C]">
      <div className="max-w-[1360px] mx-auto px-6 lg:px-10 space-y-12">
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6">
          <div>
            <p className="text-xs font-mono-tabular uppercase tracking-widest text-[#F5C400] mb-2">
              Finished Results &amp; Order Presentation
            </p>
            <h2
              className="font-display font-semibold text-[#F5F3EF] tracking-tight"
              style={{ fontSize: 'clamp(2rem, 3.2vw, 3rem)', textWrap: 'balance' }}
            >
              Immaculate Hanger Presentation, Crisp Folding &amp; Packaging
            </h2>
            <p className="text-sm text-[#9CA3AF] mt-2 max-w-2xl">
              Every order from <strong className="text-[#F5F3EF] font-medium">{businessConfig.businessName}</strong> is finished, inspected, and presented so your garments return looking crisp, organized, and ready to wear.
            </p>
          </div>

          <button
            type="button"
            onClick={onOpenBookingModal}
            className="px-5 py-3 bg-[#F5C400] hover:bg-[#FFD633] text-[#0A0A0C] font-semibold text-xs rounded-lg transition-colors inline-flex items-center gap-2 whitespace-nowrap shrink-0 cursor-pointer"
          >
            <span>Book Your Garment Care</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-7">
          {presentations.map((item) => (
            <div
              key={item.badge}
              className="rounded-xl border border-white/10 bg-[#13151C] overflow-hidden flex flex-col justify-between group"
            >
              <div>
                <div className="relative h-48 overflow-hidden bg-[#13151C]">
                  <img
                    src={item.image}
                    alt={item.alt}
                    loading="lazy"
                    className="w-full h-full object-cover opacity-85 feather-card-mask group-hover:scale-105 transition-transform duration-300"
                  />
                  <div
                    className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-[#13151C] via-[#13151C]/75 to-transparent pointer-events-none"
                    aria-hidden="true"
                  />
                  <div
                    className="absolute inset-x-0 top-0 h-12 bg-gradient-to-b from-[#13151C]/60 to-transparent pointer-events-none"
                    aria-hidden="true"
                  />
                  {item.hasProtectiveSheen && (
                    <div
                      className="absolute inset-0 bg-[linear-gradient(125deg,transparent_25%,rgba(255,255,255,0.12)_45%,transparent_60%)] pointer-events-none"
                      aria-hidden="true"
                    />
                  )}
                </div>

                <div className="p-6 space-y-3">
                  <h3 className="font-display text-2xl font-semibold text-[#F5F3EF]">
                    {item.title}
                  </h3>
                  <p className="text-xs text-[#9CA3AF] leading-relaxed">{item.description}</p>
                  <div className="pt-2 space-y-1.5">
                    {item.specs.map((spec) => (
                      <div key={spec} className="flex items-center gap-2 text-xs text-[#D1D5DB]">
                        <CheckCircle2 className="w-3.5 h-3.5 text-[#F5C400] shrink-0" />
                        <span>{spec}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div className="px-6 pb-6 pt-4 border-t border-white/10">
                <button
                  type="button"
                  onClick={() => onSelectCategoryForEstimate(item.category, item.sampleId)}
                  className="text-xs font-semibold text-[#F5C400] hover:underline inline-flex items-center gap-1.5 cursor-pointer"
                >
                  <span>{item.ctaLabel}</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

/**
 * "Garment Care in Action" Process & Equipment Showcase Section
 * Features distinct, realistic photographs of:
 * 1. Hands inspecting a garment collar before cleaning
 * 2. Commercial laundry equipment & single-client drum washing
 * 3. Steaming a hanging shirt/suit jacket on a rail
 * 4. Professional steam pressing & finishing in a clean studio environment
 */
export const IkoyiStudioPhotoShowcase: React.FC<{
  businessConfig: BusinessConfig;
  onSelectCategoryForEstimate: (cat: GarmentCategory, sampleId?: string) => void;
  onOpenBookingModal: () => void;
}> = ({ businessConfig, onSelectCategoryForEstimate, onOpenBookingModal }) => {
  const stations = [
    {
      num: '01',
      tag: 'Pre-Wash Inspection',
      title: 'Collar, Cuff & Seam Inspection Before Cleaning',
      description:
        'Every garment is carefully checked by hand for collar ring, delicate buttons, embroidery tension, and spot stains before selecting the safest cleaning method.',
      image: LAUNDRY_PHOTOS.handsInspectingShirtCollar,
      alt: 'Close-up of hands inspecting the crisp collar of a white business shirt on a hanger',
      actionLabel: 'View Executive Shirt Care',
      category: 'executive' as GarmentCategory,
      sampleId: 'executive-shirt',
    },
    {
      num: '02',
      tag: 'Single-Client Drum Wash',
      title: 'Sorted Loads in Professional Front-Load Machines',
      description:
        'Whites, light pastels, and dark fabrics are separated and washed in dedicated commercial stainless-steel drums—never mixed with another customer’s order.',
      image: LAUNDRY_PHOTOS.commercialFrontLoadMachines,
      alt: 'Professional commercial front-load washing machines in a clean laundry environment',
      actionLabel: 'Book Wash & Fold Pickup',
      category: 'wash_fold' as GarmentCategory,
      sampleId: 'wash-fold-regular-bag',
    },
    {
      num: '03',
      tag: 'Vertical Garment Steaming',
      title: 'Delicate Suit, Shirt & Drape Steaming',
      description:
        'Structured jackets, fine business shirts, and delicate fabrics are vertically steamed on stainless-steel rails to relax fibers naturally without scorch or shine.',
      image: LAUNDRY_PHOTOS.steamingWhiteShirtCloseUp,
      alt: 'Close-up of a garment specialist steaming a white shirt hanging on a wooden hanger',
      actionLabel: 'Explore Suit & Jacket Care',
      category: 'executive' as GarmentCategory,
      sampleId: 'bespoke-suit-2pc',
    },
    {
      num: '04',
      tag: 'Finishing & Quality Control',
      title: 'Precision Steam Finishing & Hanger Alignment',
      description:
        'Each finished piece undergoes final steam detailing, starch calibration, and collar alignment before being placed in a protective cover for collection or delivery.',
      image: LAUNDRY_PHOTOS.specialistSteamingHangingShirt,
      alt: 'Garment care specialist steaming a white dress shirt on a clothing rail in a clean studio',
      actionLabel: 'Explore Native & Formal Care',
      category: 'traditional' as GarmentCategory,
      sampleId: 'agbada-3pc',
    },
  ];

  return (
    <section className="py-20 border-t border-white/10 bg-[#0D0F14]">
      <div className="max-w-[1360px] mx-auto px-6 lg:px-10 space-y-12">
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6">
          <div>
            <p className="text-xs font-mono-tabular uppercase tracking-widest text-[#F5C400] mb-2">
              Garment Care in Action · Professional Standards
            </p>
            <h2
              className="font-display font-semibold text-[#F5F3EF] tracking-tight"
              style={{ fontSize: 'clamp(2rem, 3.2vw, 3rem)', textWrap: 'balance' }}
            >
              Inspection, Hygienic Washing &amp; Precision Steam Finishing
            </h2>
            <p className="text-sm text-[#9CA3AF] mt-2 max-w-2xl">
              Our 4-stage garment care workflow ensures your business wardrobe, traditional attire, and household linens receive attentive, fabric-safe treatment at <strong className="text-[#F5F3EF] font-medium">{businessConfig.businessName}</strong>.
            </p>
          </div>

          <button
            type="button"
            onClick={onOpenBookingModal}
            className="px-5 py-3 bg-[#F5C400] hover:bg-[#FFD633] text-[#0A0A0C] font-semibold text-xs rounded-lg transition-colors inline-flex items-center gap-2 whitespace-nowrap shrink-0 cursor-pointer"
          >
            <span>Schedule a Pickup</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {stations.map((st) => (
            <div
              key={st.num}
              className="rounded-xl border border-white/10 bg-[#13151C] overflow-hidden flex flex-col justify-between group"
            >
              <div>
                <div className="relative h-48 overflow-hidden bg-[#13151C]">
                  <img
                    src={st.image}
                    alt={st.alt}
                    loading="lazy"
                    className="w-full h-full object-cover opacity-85 feather-card-mask group-hover:scale-105 transition-transform duration-300"
                  />
                  <div
                    className="absolute inset-x-0 bottom-0 h-20 bg-gradient-to-t from-[#13151C] via-[#13151C]/75 to-transparent pointer-events-none"
                    aria-hidden="true"
                  />
                  <div
                    className="absolute inset-x-0 top-0 h-10 bg-gradient-to-b from-[#13151C]/60 to-transparent pointer-events-none"
                    aria-hidden="true"
                  />
                </div>

                <div className="p-5 space-y-2.5">
                  <h3 className="font-display text-xl font-semibold text-[#F5F3EF]">
                    {st.title}
                  </h3>
                  <p className="text-xs text-[#9CA3AF] leading-relaxed">{st.description}</p>
                </div>
              </div>

              <div className="px-5 pb-5 pt-3 border-t border-white/5">
                <button
                  type="button"
                  onClick={() => onSelectCategoryForEstimate(st.category, st.sampleId)}
                  className="text-xs font-semibold text-[#F5C400] hover:underline inline-flex items-center gap-1.5 cursor-pointer"
                >
                  <span>{st.actionLabel}</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

/**
 * 4-Step Pickup, Processing & Ready-for-Delivery Section
 * Includes distinct photographs for each step, spotlighting prepared orders ready for collection/delivery
 */
export const HowItWorksSection: React.FC<{
  businessConfig: BusinessConfig;
  onOpenBookingModal: () => void;
}> = ({ businessConfig, onOpenBookingModal }) => {
  const steps = [
    {
      num: '01',
      title: 'Items Collected & Bagged',
      description: `Schedule a doorstep pickup online, call ${businessConfig.phoneDisplay}, or drop off at ${businessConfig.streetAddress}. Garments are logged into clean laundry bags.`,
      image: LAUNDRY_PHOTOS.packagedDrawstringBagAndRack,
      alt: 'Garments and fabric care essentials organized into a clean drawstring laundry bag beside a clothing rack',
      footerNote: 'Ikoyi · VI · Lekki Valet',
    },
    {
      num: '02',
      title: 'Sorted & Pre-Treated by Fiber',
      description:
        'Each item is sorted by color and fabric weight, then gently pre-treated with enzymatic spot solutions and soft fabric brushes before cleaning.',
      image: LAUNDRY_PHOTOS.enzymaticCareAndSpotBrush,
      alt: 'Enzymatic laundry detergent, spot remover, and wooden garment brush on a clean metal rack',
      footerNote: 'Gentle Stain & Collar Care',
    },
    {
      num: '03',
      title: 'Sanitized Cleaning & Pressing',
      description:
        'Processed via odorless dry cleaning or temperature-controlled single-client drum wash, followed by crisp steam pressing and custom starch calibration.',
      image: LAUNDRY_PHOTOS.sanitizedStainlessDrum,
      alt: 'Clean stainless-steel washing machine drum interior ready for single-client wash cycle',
      footerNote: 'Single-Client Hygiene',
    },
    {
      num: '04',
      title: 'Packaged & Delivered Fresh',
      description:
        'Hung in transparent protective covers or neatly folded in organized packages, ready for collection or doorstep delivery across Lagos Island.',
      image: LAUNDRY_PHOTOS.readyForDeliveryRackAndBoxes,
      alt: 'Clean studio garment rail with hung shirts, woven laundry hamper, and packaged delivery boxes',
      footerNote: '24h Express & 48h Standard',
    },
  ];

  return (
    <section className="py-20 border-t border-white/10 bg-[#0A0A0C]">
      <div className="max-w-[1360px] mx-auto px-6 lg:px-10 space-y-12">
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6">
          <div>
            <p className="text-xs font-mono-tabular uppercase tracking-widest text-[#F5C400] mb-2">
              Pickup, Preparation &amp; Doorstep Delivery
            </p>
            <h2
              className="font-display font-semibold text-[#F5F3EF] tracking-tight"
              style={{ fontSize: 'clamp(2rem, 3.2vw, 3rem)', textWrap: 'balance' }}
            >
              Four Simple Steps From Collection to Packaged Delivery
            </h2>
          </div>
          <button
            type="button"
            onClick={onOpenBookingModal}
            className="px-5 py-3 bg-[#F5C400] hover:bg-[#FFD633] text-[#0A0A0C] font-semibold text-xs rounded-lg transition-colors inline-flex items-center gap-2 whitespace-nowrap shrink-0 cursor-pointer"
          >
            <span>Schedule a Pickup Now</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {steps.map((step) => (
            <div
              key={step.num}
              className="rounded-xl bg-[#13151C] border border-white/10 overflow-hidden flex flex-col justify-between"
            >
              <div>
                <div className="relative h-44 overflow-hidden bg-[#13151C]">
                  <img
                    src={step.image}
                    alt={step.alt}
                    loading="lazy"
                    className="w-full h-full object-cover opacity-85 feather-card-mask"
                  />
                  <div
                    className="absolute inset-x-0 bottom-0 h-20 bg-gradient-to-t from-[#13151C] via-[#13151C]/75 to-transparent pointer-events-none"
                    aria-hidden="true"
                  />
                  <div
                    className="absolute inset-x-0 top-0 h-10 bg-gradient-to-b from-[#13151C]/60 to-transparent pointer-events-none"
                    aria-hidden="true"
                  />
                </div>

                <div className="p-5 space-y-2.5">
                  <h3 className="font-display text-xl font-semibold text-[#F5F3EF]">
                    {step.title}
                  </h3>
                  <p className="text-xs text-[#9CA3AF] leading-relaxed">{step.description}</p>
                </div>
              </div>

              <div className="px-5 pb-4 pt-3 border-t border-white/5 flex items-center justify-between text-[11px] font-mono-tabular text-[#D4AF37]">
                <span>{step.footerNote}</span>
                <span>100% Care Guarantee</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

/**
 * Dedicated Services Page View
 */
export const ServicesPageView: React.FC<{
  businessConfig: BusinessConfig;
  onSelectCategoryForEstimate: (cat: GarmentCategory, sampleId?: string) => void;
  onOpenBookingModal: () => void;
}> = ({ businessConfig, onSelectCategoryForEstimate, onOpenBookingModal }) => {
  const servicePillars = [
    {
      id: 'dry-cleaning',
      number: '01',
      title: 'Specialist Dry Cleaning',
      subtitle: 'Suits · Corporate Dresses · Evening Gowns · Silk & Wool',
      startingPrice: 'From ₦2,500',
      turnaround: '24h – 48h Turnaround',
      variant: 'executive' as const,
      category: 'executive' as GarmentCategory,
      sampleId: 'bespoke-suit-2pc',
      sampleLabel: '+ Add 2-Piece Suit (₦8,500)',
      description:
        'Gentle, odorless solvent cleaning that lifts deep oils and stains without shrinking wool, distorting suit canvas lapels, or dulling delicate silk and chiffon fabrics.',
      highlights: [
        'Bespoke 2-piece & 3-piece suit dry cleaning and lapel blocking',
        'Returned on contoured hangers inside individual transparent protective covers',
        'Microscopic pre-spotting for wine, oil, makeup, and ink stains',
      ],
    },
    {
      id: 'wash-and-fold',
      number: '02',
      title: 'Wash, Dry & Fold Laundry',
      subtitle: 'Everyday Wardrobe · Weekly Shirt Bundles · Casual Wear · Linens',
      startingPrice: 'From ₦2,000 / Piece · ₦12,000 / Load',
      turnaround: '24h Standard Turnaround',
      variant: 'wash_fold' as const,
      category: 'wash_fold' as GarmentCategory,
      sampleId: 'wash-fold-regular-bag',
      sampleLabel: '+ Add 15-Item Wash & Fold Load (₦12,000)',
      description:
        'Designed for busy professionals and families in Ikoyi, VI, and Lekki. Your everyday clothes are sorted into whites, lights, and darks, washed in pH-balanced detergents, tumble dried at safe temperatures, and crisply folded.',
      highlights: [
        'Strict single-client drum policy—your clothes are never mixed with other orders',
        'Weekly 5-Shirt Executive Wash & Iron Bundle at ₦11,500',
        'Crisply folded into even, shelf-ready stacks and wrapped for delivery',
      ],
    },
    {
      id: 'executive-ironing',
      number: '03',
      title: 'Executive Steam Ironing & Pressing',
      subtitle: 'Crisp Dress Shirts · Trousers · Native Wear · Express 24h Press',
      startingPrice: 'From ₦1,200',
      turnaround: 'Same-Day / 24h Express Available',
      variant: 'ironing' as const,
      category: 'executive' as GarmentCategory,
      sampleId: 'executive-shirt',
      sampleLabel: '+ Add Dress Shirt Care (₦2,500)',
      description:
        'Already washed your garments at home? Our industrial vacuum-table steam presses and tension form finishers deliver razor-sharp trouser creases and wrinkle-free collars without scorch marks or fabric shine.',
      highlights: [
        'Custom starch calibration: No Starch, Light, Medium, or Crisp Nigerian Finish',
        'Anti-shine Teflon pressing barriers for dark wool trousers and suits',
        'Returned on contoured hangers or neatly folded for travel suitcases',
      ],
    },
    {
      id: 'traditional-native',
      number: '04',
      title: 'Traditional Agbada, Senator & Lace Care',
      subtitle: '3-Piece Agbada · Senator Suits · French Lace · Aso-Oke',
      startingPrice: 'From ₦6,000',
      turnaround: '48h – 72h Specialist Care',
      variant: 'traditional' as const,
      category: 'traditional' as GarmentCategory,
      sampleId: 'agbada-3pc',
      sampleLabel: '+ Add 3-Piece Agbada (₦12,000)',
      description:
        'Protective mesh encapsulation for Swarovski stones, sequins, and metallic tambour embroidery, paired with starch-calibrated finishing that gives your native attire commanding presence.',
      highlights: [
        'Color-bleed prevention for two-tone Senator and Kaftan designs',
        'Hand-steamed Agbada drape and embroidery preservation',
        'Breathable full-length garment bags or ribbon-wrapped fold presentation',
      ],
    },
    {
      id: 'household-care',
      number: '05',
      title: 'Duvet, Curtain, Bed Linen & Carpet Cleaning',
      subtitle: 'King/Queen Duvets · Egyptian Cotton Sheets · Heavy Drapery · Centre Rugs',
      startingPrice: 'From ₦8,500',
      turnaround: '48h – 96h Deep Sanitization',
      variant: 'household' as const,
      category: 'household' as GarmentCategory,
      sampleId: 'king-duvet',
      sampleLabel: '+ Add King Duvet Care (₦14,000)',
      description:
        'High-capacity antibacterial sanitization and dust extraction for bulky household textiles. We restore loft to down comforters, rotary-press bed sheets, and deep-clean living room rugs.',
      highlights: [
        'Hospital-grade ozone sanitization for duvets, pillows, and mattress toppers',
        'Shrinkage-guarded curtain and blackout drapery cleaning',
        'Deep pile extraction and dehumidified curing for centre rugs',
      ],
    },
  ];

  return (
    <div className="py-12 space-y-16">
      <div className="max-w-[1360px] mx-auto px-6 lg:px-10 space-y-10">
        {/* Page Header */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 border-b border-white/10 pb-8">
          <div>
            <p className="text-xs font-mono-tabular uppercase tracking-widest text-[#F5C400] mb-2">
              {businessConfig.businessName} · {businessConfig.businessType}
            </p>
            <h1
              className="font-display font-semibold text-[#F5F3EF] tracking-tight"
              style={{ fontSize: 'clamp(2.25rem, 3.8vw, 3.5rem)', textWrap: 'balance' }}
            >
              Our Professional Laundry &amp; Dry Cleaning Services
            </h1>
            <p className="text-sm text-[#9CA3AF] mt-2 max-w-2xl">
              Serving households, executives, and businesses from <strong className="text-[#F5F3EF]">{businessConfig.streetAddress}</strong> with fast pickup and delivery across Lagos Island.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <a
              href={`tel:${businessConfig.phoneDisplay}`}
              className="px-4 py-3 bg-[#13151C] hover:bg-white/10 text-[#F5F3EF] border border-white/15 rounded-lg text-xs font-mono-tabular font-medium whitespace-nowrap shrink-0"
            >
              Call us: {businessConfig.phoneDisplay}
            </a>
            <button
              type="button"
              onClick={onOpenBookingModal}
              className="px-5 py-3 bg-[#F5C400] hover:bg-[#FFD633] text-[#0A0A0C] font-semibold text-xs rounded-lg transition-colors whitespace-nowrap shrink-0 cursor-pointer"
            >
              Schedule a Pickup
            </button>
          </div>
        </div>

        {/* Service Pillars List */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {servicePillars.map((service, idx) => (
            <div
              key={service.id}
              className={`rounded-xl border border-white/10 bg-[#13151C] overflow-hidden flex flex-col justify-between ${
                idx === servicePillars.length - 1 ? 'lg:col-span-2' : ''
              }`}
            >
              <div>
                <SpecialtyArtwork variant={service.variant} />
                <div className="p-6 lg:p-8 space-y-4">
                  <div className="flex flex-wrap items-center gap-2 text-xs text-[#9CA3AF]">
                    <span className="text-[#F5C400] font-semibold">Service {service.number}</span>
                    <span aria-hidden="true">·</span>
                    <span>{service.subtitle}</span>
                    <span aria-hidden="true">·</span>
                    <span className="font-mono-tabular text-[#F5F3EF]">{service.startingPrice}</span>
                  </div>

                  <h2 className="font-display text-2xl lg:text-3xl font-semibold text-[#F5F3EF]">
                    {service.number}. {service.title}
                  </h2>

                  <p className="text-sm text-[#9CA3AF] leading-relaxed">{service.description}</p>

                  <div className="space-y-2 pt-2">
                    {service.highlights.map((pt, i) => (
                      <div key={i} className="flex items-start gap-2.5 text-xs text-[#F5F3EF]">
                        <CheckCircle2 className="w-4 h-4 text-[#F5C400] shrink-0 mt-0.5" />
                        <span>{pt}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div className="px-6 lg:px-8 pb-6 pt-4 border-t border-white/10 flex flex-wrap items-center justify-between gap-4">
                <button
                  type="button"
                  onClick={() => onSelectCategoryForEstimate(service.category)}
                  className="text-xs font-semibold text-[#F5C400] hover:underline inline-flex items-center gap-1.5 cursor-pointer"
                >
                  <span>View Full Price List for {service.title}</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>

                <button
                  type="button"
                  onClick={() => onSelectCategoryForEstimate(service.category, service.sampleId)}
                  className="px-3.5 py-2 bg-[#0A0A0C] hover:bg-white/5 text-xs font-medium text-[#F5F3EF] border border-white/15 rounded-lg transition-colors cursor-pointer"
                >
                  {service.sampleLabel}
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      <FinishedResultsAndPackagingSection
        businessConfig={businessConfig}
        onSelectCategoryForEstimate={onSelectCategoryForEstimate}
        onOpenBookingModal={onOpenBookingModal}
      />

      <IkoyiStudioPhotoShowcase
        businessConfig={businessConfig}
        onSelectCategoryForEstimate={onSelectCategoryForEstimate}
        onOpenBookingModal={onOpenBookingModal}
      />

      <HowItWorksSection
        businessConfig={businessConfig}
        onOpenBookingModal={onOpenBookingModal}
      />
    </div>
  );
};

/**
 * Dedicated About / Story Page View
 * Showcases the stainless-steel clothing rail and professional garment-care environment
 */
export const AboutPageView: React.FC<{
  businessConfig: BusinessConfig;
  onOpenBookingModal: () => void;
  onNavigateContact: () => void;
}> = ({ businessConfig, onOpenBookingModal, onNavigateContact }) => {
  const storyCards = [
    {
      code: '01. Stainless-Steel Rail & Hanger Care',
      title: 'Organized Clothing Rails & Crisp Collar Alignment',
      description:
        'Pressed business shirts, suits, and formal wear are arranged on quality hangers along clean stainless-steel rails and protected in individual transparent covers.',
      image: LAUNDRY_PHOTOS.dressShirtsStainlessRail,
      alt: 'Row of crisply pressed business shirts arranged on hangers on a stainless-steel clothing rail',
    },
    {
      code: '02. Clean Garment-Care Environment',
      title: 'Uncluttered, Hygienic Fabric Processing',
      description:
        'From single-client washing to odorless hydrocarbon dry cleaning, our garment-care workflow keeps white linens, cream shirts, and dark suits spotless and odor-free.',
      image: LAUNDRY_PHOTOS.studioClothingRailWhite,
      alt: 'Neatly organized white and cream garments hanging on wooden hangers on a clean studio rail',
    },
    {
      code: '03. Hand-Checked Quality & Dispatch',
      title: 'Final Garment Inspection & Lagos Island Delivery',
      description:
        'Whether you visit 109A Awolowo Road or schedule a pickup via +234 807 570 5386, every garment is hand-sorted and inspected before leaving for Ikoyi, VI, or Lekki.',
      image: LAUNDRY_PHOTOS.handSortingHangersOnRail,
      alt: 'Hand arranging freshly pressed shirts on wooden hangers on a stainless-steel rail',
    },
  ];

  return (
    <div className="py-12 space-y-16">
      <div className="max-w-[1360px] mx-auto px-6 lg:px-10 space-y-12">
        <div className="border-b border-white/10 pb-8">
          <p className="text-xs font-mono-tabular uppercase tracking-widest text-[#F5C400] mb-2">
            About {businessConfig.businessName}
          </p>
          <h1
            className="font-display font-semibold text-[#F5F3EF] tracking-tight"
            style={{ fontSize: 'clamp(2.25rem, 3.8vw, 3.5rem)', textWrap: 'balance' }}
          >
            Trusted Garment Care &amp; Laundry Excellence on Awolowo Road, Ikoyi
          </h1>
          <p className="text-base text-[#9CA3AF] mt-3 max-w-3xl leading-relaxed">
            Located at <strong className="text-[#F5F3EF]">{businessConfig.streetAddress}</strong>, {businessConfig.businessName} combines modern fabric-care technology with meticulous hand finishing to serve individuals, families, and corporate organizations across Lagos Island.
          </p>
        </div>

        {/* Visual Story & Clothing Rail Environment Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {storyCards.map((card) => (
            <div
              key={card.code}
              className="rounded-xl bg-[#13151C] border border-white/10 overflow-hidden flex flex-col justify-between"
            >
              <div>
                <div className="relative h-48 overflow-hidden bg-[#13151C]">
                  <img
                    src={card.image}
                    alt={card.alt}
                    loading="lazy"
                    className="w-full h-full object-cover opacity-85 [mask-image:radial-gradient(ellipse_92%_88%_at_50%_42%,#000_50%,transparent_100%)]"
                  />
                  <div
                    className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-[#13151C] via-[#13151C]/75 to-transparent pointer-events-none"
                    aria-hidden="true"
                  />
                  <div
                    className="absolute inset-x-0 top-0 h-12 bg-gradient-to-b from-[#13151C]/60 to-transparent pointer-events-none"
                    aria-hidden="true"
                  />
                </div>
                <div className="p-6 space-y-3">
                  <p className="font-mono-tabular text-xs text-[#F5C400] uppercase">{card.code}</p>
                  <h3 className="font-display text-2xl font-semibold text-[#F5F3EF]">
                    {card.title}
                  </h3>
                  <p className="text-xs text-[#9CA3AF] leading-relaxed">{card.description}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Verified Business Profile Summary Card */}
        <div className="rounded-xl border border-white/10 bg-[#13151C] p-6 lg:p-8 flex flex-col lg:flex-row lg:items-center justify-between gap-6">
          <div className="space-y-2">
            <p className="text-xs font-mono-tabular text-[#F5C400] uppercase">
              Verified Google Business Information
            </p>
            <h2 className="font-display text-2xl font-semibold text-[#F5F3EF]">
              {businessConfig.businessName}
            </h2>
            <p className="text-sm text-[#9CA3AF]">
              <strong className="text-[#F5F3EF]">Address:</strong> {businessConfig.streetAddress}
            </p>
            <p className="text-sm text-[#9CA3AF]">
              <strong className="text-[#F5F3EF]">Phone:</strong>{' '}
              <span className="font-mono-tabular">{businessConfig.phoneDisplay}</span> ·{' '}
              <strong className="text-[#F5F3EF]">Business type:</strong> {businessConfig.businessType}
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3 shrink-0">
            <button
              type="button"
              onClick={onOpenBookingModal}
              className="px-5 py-3 bg-[#F5C400] hover:bg-[#FFD633] text-[#0A0A0C] font-semibold text-xs rounded-lg transition-colors cursor-pointer"
            >
              Schedule a Pickup
            </button>
            <button
              type="button"
              onClick={onNavigateContact}
              className="px-5 py-3 bg-[#0A0A0C] hover:bg-white/5 text-[#F5F3EF] border border-white/15 font-medium text-xs rounded-lg transition-colors cursor-pointer"
            >
              View Contact &amp; Directions
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

/**
 * Dedicated Contact Page View featuring the exact Google Business Details
 */
export const ContactPageView: React.FC<{
  businessConfig: BusinessConfig;
  onOpenBookingModal: () => void;
}> = ({ businessConfig, onOpenBookingModal }) => {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [serviceNeeded, setServiceNeeded] = useState('Dry Cleaning & Laundry Pickup');
  const [message, setMessage] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleContactSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !phone.trim()) return;
    setSubmitted(true);
    const whatsappText = encodeURIComponent(
      `Hello *${businessConfig.businessName}*,\n\n*Name:* ${name}\n*Phone:* ${phone}\n*Service Inquiry:* ${serviceNeeded}\n*Message:* ${
        message || 'Please contact me regarding laundry/dry cleaning pickup.'
      }`
    );
    window.open(
      `https://wa.me/${businessConfig.whatsappNumber}?text=${whatsappText}`,
      '_blank',
      'noopener,noreferrer'
    );
  };

  return (
    <section id="contact-section" className="py-16 border-t border-white/10">
      <div className="max-w-[1360px] mx-auto px-6 lg:px-10 space-y-12">
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6">
          <div>
            <p className="text-xs font-mono-tabular uppercase tracking-widest text-[#F5C400] mb-2">
              Contact &amp; Pickup Dispatch Desk
            </p>
            <h2
              className="font-display font-semibold text-[#F5F3EF] tracking-tight"
              style={{ fontSize: 'clamp(2rem, 3.2vw, 3rem)', textWrap: 'balance' }}
            >
              Visit or Contact {businessConfig.businessName}
            </h2>
          </div>

          <a
            href={businessConfig.googleMapsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="px-5 py-3 bg-[#F5C400] hover:bg-[#FFD633] text-[#0A0A0C] font-semibold text-xs rounded-lg transition-colors inline-flex items-center gap-2 whitespace-nowrap shrink-0"
          >
            <span>Open in Google Maps</span>
            <ArrowUpRight className="w-4 h-4" />
          </a>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          {/* Left 6 Columns: Official Google Business Contact Card */}
          <div className="lg:col-span-6 rounded-xl border border-white/10 bg-[#13151C] p-6 lg:p-8 flex flex-col justify-between space-y-6">
            <div className="space-y-6">
              <div>
                <p className="text-xs font-mono-tabular uppercase tracking-wider text-[#F5C400]">
                  Official Google Business Profile
                </p>
                <h3 className="font-display text-2xl lg:text-3xl font-semibold text-[#F5F3EF] mt-1">
                  {businessConfig.businessName}
                </h3>
                <p className="text-xs text-[#9CA3AF] mt-1">
                  Business type: <span className="text-[#F5F3EF] font-medium">{businessConfig.businessType}</span>
                </p>
              </div>

              <div className="space-y-5 border-y border-white/10 py-6 text-sm">
                <div className="flex items-start gap-3.5">
                  <MapPin className="w-5 h-5 text-[#F5C400] shrink-0 mt-0.5" />
                  <div>
                    <p className="text-xs uppercase tracking-wider text-[#9CA3AF]">Address</p>
                    <p className="font-semibold text-[#F5F3EF] mt-0.5">
                      {businessConfig.streetAddress}
                    </p>
                    <p className="text-xs font-mono-tabular text-[#9CA3AF] mt-1">
                      GPS: {businessConfig.coordinatesLabel}
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3.5">
                  <Phone className="w-5 h-5 text-[#F5C400] shrink-0 mt-0.5" />
                  <div>
                    <p className="text-xs uppercase tracking-wider text-[#9CA3AF]">Phone &amp; WhatsApp</p>
                    <a
                      href={`tel:${businessConfig.phoneDisplay}`}
                      className="font-mono-tabular text-lg font-semibold text-[#F5C400] hover:underline mt-0.5 inline-block"
                    >
                      {businessConfig.phoneDisplay}
                    </a>
                    <p className="text-xs text-[#9CA3AF] mt-0.5">
                      Direct Line: {businessConfig.phoneShort} · Instant Pickup &amp; Customer Care
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3.5">
                  <Clock className="w-5 h-5 text-[#F5C400] shrink-0 mt-0.5" />
                  <div className="text-xs space-y-1">
                    <p className="text-xs uppercase tracking-wider text-[#9CA3AF]">Operating Hours</p>
                    <p className="text-[#F5F3EF] font-medium">{businessConfig.weekdayHours}</p>
                    <p className="text-[#9CA3AF]">{businessConfig.saturdayHours}</p>
                    <p className="text-[#9CA3AF]">{businessConfig.sundayHours}</p>
                  </div>
                </div>
              </div>

              {/* Service Coverage Summary */}
              <div className="space-y-2">
                <p className="text-xs font-semibold text-[#F5F3EF]">
                  Pickup &amp; Delivery Coverage Areas:
                </p>
                <p className="text-xs text-[#9CA3AF] leading-relaxed">
                  {LAGOS_SERVICE_ZONES.map((z) => z.name).join(' · ')}
                </p>
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-3 pt-2">
              <button
                type="button"
                onClick={onOpenBookingModal}
                className="px-5 py-3 bg-[#F5C400] hover:bg-[#FFD633] text-[#0A0A0C] font-semibold text-xs rounded-lg transition-colors cursor-pointer"
              >
                Schedule a Pickup Online
              </button>
              <a
                href={`tel:${businessConfig.phoneDisplay}`}
                className="px-5 py-3 bg-[#0A0A0C] hover:bg-white/5 text-[#F5F3EF] border border-white/15 font-medium text-xs rounded-lg transition-colors"
              >
                Call {businessConfig.phoneDisplay}
              </a>
            </div>
          </div>

          {/* Right 6 Columns: Direct Inquiry & Callback Request Form */}
          <div className="lg:col-span-6 rounded-xl border border-white/10 bg-[#13151C] p-6 lg:p-8 flex flex-col justify-between">
            <form onSubmit={handleContactSubmit} className="space-y-5">
              <div>
                <p className="text-xs font-mono-tabular uppercase tracking-wider text-[#F5C400]">
                  Quick Message or Corporate Quote
                </p>
                <h3 className="font-display text-2xl font-semibold text-[#F5F3EF] mt-1">
                  Send Us a Message or Request a Callback
                </h3>
                <p className="text-xs text-[#9CA3AF] mt-1">
                  Have a question about stain removal, bulk laundry, curtains, or hotel/short-let linen care? Reach our team at 109A Awolowo Rd directly.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-medium text-[#F5F3EF] mb-1.5">
                    Your Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Enter your full name"
                    className="w-full px-3.5 py-2.5 bg-[#0A0A0C] border border-white/15 rounded-lg text-sm text-[#F5F3EF] placeholder-[#6B7280] focus:outline-none focus:border-[#F5C400]"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-[#F5F3EF] mb-1.5">
                    Phone Number *
                  </label>
                  <input
                    type="tel"
                    required
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="e.g. 0803 000 0000"
                    className="w-full px-3.5 py-2.5 bg-[#0A0A0C] border border-white/15 rounded-lg text-sm font-mono-tabular text-[#F5F3EF] placeholder-[#6B7280] focus:outline-none focus:border-[#F5C400]"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-medium text-[#F5F3EF] mb-1.5">
                  Service Required
                </label>
                <select
                  value={serviceNeeded}
                  onChange={(e) => setServiceNeeded(e.target.value)}
                  className="w-full px-3.5 py-2.5 bg-[#0A0A0C] border border-white/15 rounded-lg text-sm text-[#F5F3EF] focus:outline-none focus:border-[#F5C400]"
                >
                  <option value="Dry Cleaning & Laundry Pickup">
                    Dry Cleaning &amp; Laundry Pickup
                  </option>
                  <option value="Wash, Dry & Fold Bundle">Wash, Dry &amp; Fold Bundle</option>
                  <option value="Executive Steam Ironing">Executive Steam Ironing</option>
                  <option value="Traditional Agbada / Lace Care">
                    Traditional Agbada / Lace Care
                  </option>
                  <option value="Duvet, Curtain & Rug Cleaning">
                    Duvet, Curtain &amp; Rug Cleaning
                  </option>
                  <option value="Corporate / Short-Let Linen Account">
                    Corporate / Short-Let Linen Account
                  </option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-medium text-[#F5F3EF] mb-1.5">
                  Your Address or Inquiry Details
                </label>
                <textarea
                  rows={3}
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Tell us your pickup location in Ikoyi, VI, or Lekki, or any specific garment instructions..."
                  className="w-full px-3.5 py-2.5 bg-[#0A0A0C] border border-white/15 rounded-lg text-xs text-[#F5F3EF] placeholder-[#6B7280] focus:outline-none focus:border-[#F5C400]"
                />
              </div>

              {submitted && (
                <div className="p-3 rounded-lg bg-emerald-500/10 border border-emerald-500/30 text-xs text-emerald-300">
                  Inquiry formatted! Connecting you to {businessConfig.businessName} ({businessConfig.phoneDisplay}) on WhatsApp.
                </div>
              )}

              <button
                type="submit"
                className="w-full py-3.5 px-5 bg-[#F5C400] hover:bg-[#FFD633] text-[#0A0A0C] font-semibold text-sm rounded-lg transition-colors flex items-center justify-center gap-2 cursor-pointer"
              >
                <MessageSquare className="w-4 h-4" />
                <span>Send Inquiry to {businessConfig.phoneDisplay}</span>
              </button>
            </form>

            <div className="pt-4 mt-6 border-t border-white/10 flex items-center justify-between text-xs text-[#9CA3AF]">
              <span className="inline-flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-[#F5C400]" />
                <span>Fast response during operating hours</span>
              </span>
              <span className="font-mono-tabular">101233 · Ikoyi, Lagos</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

/**
 * Dedicated Blog Page View
 */
export const BlogPageView: React.FC<{
  businessConfig: BusinessConfig;
  onOpenBookingModal: () => void;
}> = ({ businessConfig, onOpenBookingModal }) => {
  const [selectedPost, setSelectedPost] = useState<BlogPost>(BLOG_POSTS[0]);

  return (
    <div className="py-12">
      <div className="max-w-[1360px] mx-auto px-6 lg:px-10 space-y-10">
        <div className="border-b border-white/10 pb-8 flex flex-col lg:flex-row lg:items-end justify-between gap-6">
          <div>
            <p className="text-xs font-mono-tabular uppercase tracking-widest text-[#F5C400] mb-2">
              Garment Care &amp; Fabric Longevity Journal
            </p>
            <h1
              className="font-display font-semibold text-[#F5F3EF] tracking-tight"
              style={{ fontSize: 'clamp(2.25rem, 3.8vw, 3.5rem)', textWrap: 'balance' }}
            >
              Expert Laundry &amp; Dry Cleaning Tips
            </h1>
            <p className="text-sm text-[#9CA3AF] mt-2 max-w-2xl">
              Practical advice from our specialists at {businessConfig.streetAddress} on keeping your suits, native outfits, and household linens spotless.
            </p>
          </div>

          <button
            type="button"
            onClick={onOpenBookingModal}
            className="px-5 py-3 bg-[#F5C400] hover:bg-[#FFD633] text-[#0A0A0C] font-semibold text-xs rounded-lg transition-colors whitespace-nowrap shrink-0 cursor-pointer"
          >
            Schedule a Pickup
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Article Selector Cards */}
          <div className="lg:col-span-5 space-y-4">
            {BLOG_POSTS.map((post) => {
              const isActive = post.id === selectedPost.id;
              return (
                <button
                  key={post.id}
                  type="button"
                  onClick={() => setSelectedPost(post)}
                  className={`w-full text-left p-5 rounded-xl border transition-colors cursor-pointer ${
                    isActive
                      ? 'bg-[#181B24] border-[#F5C400]'
                      : 'bg-[#13151C] border-white/10 hover:border-white/25'
                  }`}
                >
                  <div className="flex items-center gap-2 text-xs text-[#9CA3AF] mb-2">
                    <span className="text-[#F5C400] font-medium">{post.category}</span>
                    <span aria-hidden="true">·</span>
                    <span>{post.publishedDate}</span>
                    <span aria-hidden="true">·</span>
                    <span>{post.readTime}</span>
                  </div>
                  <h3 className="font-display text-xl font-semibold text-[#F5F3EF]">
                    {post.title}
                  </h3>
                  <p className="text-xs text-[#9CA3AF] mt-2 line-clamp-2">{post.excerpt}</p>
                </button>
              );
            })}
          </div>

          {/* Full Reader View */}
          <article className="lg:col-span-7 rounded-xl border border-white/10 bg-[#13151C] p-6 lg:p-10 space-y-6">
            <div className="flex flex-wrap items-center gap-2 text-xs text-[#9CA3AF]">
              <BookOpen className="w-4 h-4 text-[#F5C400]" />
              <span className="text-[#F5C400] font-medium">{selectedPost.category}</span>
              <span aria-hidden="true">·</span>
              <span>Published {selectedPost.publishedDate}</span>
              <span aria-hidden="true">·</span>
              <span>{selectedPost.readTime}</span>
            </div>

            <h2 className="font-display text-2xl lg:text-4xl font-semibold text-[#F5F3EF] leading-tight">
              {selectedPost.title}
            </h2>

            <div className="space-y-4 text-sm text-[#D1D5DB] leading-relaxed border-y border-white/10 py-6">
              {selectedPost.content.map((paragraph, idx) => (
                <p key={idx}>{paragraph}</p>
              ))}
            </div>

            <div className="p-4 rounded-xl bg-[#0A0A0C] border border-white/10 space-y-1.5">
              <p className="text-xs font-semibold text-[#F5C400] inline-flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5" />
                <span>Kenza Master Cleaner Tip</span>
              </p>
              <p className="text-xs text-[#F5F3EF] leading-relaxed">
                {selectedPost.careTakeaway}
              </p>
            </div>

            <div className="flex flex-wrap items-center justify-between gap-4 pt-2">
              <p className="text-xs text-[#9CA3AF]">
                Need specialist care for this fabric? Call{' '}
                <span className="font-mono-tabular text-[#F5F3EF]">
                  {businessConfig.phoneDisplay}
                </span>
              </p>
              <button
                type="button"
                onClick={onOpenBookingModal}
                className="px-5 py-2.5 bg-[#F5C400] hover:bg-[#FFD633] text-[#0A0A0C] font-semibold text-xs rounded-lg transition-colors cursor-pointer"
              >
                Book Pickup for Your Garments
              </button>
            </div>
          </article>
        </div>
      </div>
    </div>
  );
};
