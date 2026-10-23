export type GarmentCategory =
  | 'wash_fold'
  | 'executive'
  | 'traditional'
  | 'household';

export type ServiceMode = 'dry_clean' | 'press_only';

export type NavPage = 'home' | 'services' | 'pricelist' | 'about' | 'contact' | 'blog';

export interface GarmentItem {
  id: string;
  name: string;
  category: GarmentCategory;
  dryCleanPrice: number; // in NGN (₦) - Full Clean & Press / Wash & Fold
  pressOnlyPrice: number; // in NGN (₦) - Executive Steam Ironing Only
  fabricCareNote: string;
  standardHours: number;
}

export interface ServiceZone {
  id: string;
  name: string;
  landmarks: string;
  valetFee: number; // in NGN (₦), waived above freeDeliveryThreshold
  etaWindow: string;
}

export interface BasketItem {
  garmentId: string;
  serviceMode: ServiceMode;
  quantity: number;
}

export interface OrderStage {
  step: number;
  title: string;
  description: string;
  timestamp?: string;
}

export interface LaundryTicket {
  ticketId: string;
  customerName: string;
  phone: string;
  zoneName: string;
  streetAddress: string;
  pickupDate: string;
  pickupWindow: string;
  isExpress: boolean;
  currentStage: number; // 0 to 4
  createdAt: string;
  estimatedReady: string;
  itemsSummary: Array<{
    name: string;
    quantity: number;
    serviceMode: ServiceMode;
    lineTotal: number;
  }>;
  subtotal: number;
  valetFee: number;
  totalAmount: number;
  specialInstructions?: string;
}

export interface BlogPost {
  id: string;
  title: string;
  category: string;
  readTime: string;
  publishedDate: string;
  excerpt: string;
  content: string[];
  careTakeaway: string;
}

export interface BusinessConfig {
  businessName: string;
  shortName: string;
  businessType: string;
  streetAddress: string;
  neighborhood: string;
  cityState: string;
  coordinatesLabel: string;
  latitude: number;
  longitude: number;
  googleMapsUrl: string;
  phoneDisplay: string;
  phoneShort: string;
  whatsappNumber: string; // digits only with country code
  email: string;
  weekdayHours: string;
  saturdayHours: string;
  sundayHours: string;
  freeDeliveryThreshold: number;
  expressSurchargeMultiplier: number;
}

export const DEFAULT_BUSINESS_CONFIG: BusinessConfig = {
  businessName: 'KENZA LAUNDRY & DRY CLEANING SERVICES',
  shortName: 'KENZA LAUNDRY',
  businessType: 'Laundry and dry cleaning',
  streetAddress: '109A Awolowo Rd, LGA, Ikoyi, Lagos 101233, Lagos, Nigeria',
  neighborhood: 'Awolowo Road, Ikoyi',
  cityState: 'Lagos, Nigeria',
  coordinatesLabel: '6.4441° N · 3.4208° E',
  latitude: 6.4441325,
  longitude: 3.4207871,
  googleMapsUrl:
    'https://www.google.com/maps/place/KENZA+LAUNDRY+%26+DRY+CLEANING+SERVICES/@6.4441378,3.4182122,17z/data=!3m1!4b1!4m6!3m5!1s0x103bf5a475097943:0x73da86fc1f42ab1!8m2!3d6.4441325!4d3.4207871!16s%2Fg%2F11y3n0blcr?entry=ttu&g_ep=EgoyMDI2MTAxOC4wIKXMDSoASAFQAw%3D%3D',
  phoneDisplay: '+234 807 570 5386',
  phoneShort: '08075705386',
  whatsappNumber: '2348075705386',
  email: 'info@kenzalaundry.com',
  weekdayHours: 'Mon – Fri · 7:30 AM – 8:00 PM',
  saturdayHours: 'Saturday · 8:00 AM – 7:00 PM',
  sundayHours: 'Sunday · 12:00 PM – 5:00 PM (Pickup By Appointment)',
  freeDeliveryThreshold: 20000,
  expressSurchargeMultiplier: 1.5,
};

export const LAGOS_SERVICE_ZONES: ServiceZone[] = [
  {
    id: 'ikoyi-awolowo',
    name: '109A Awolowo Rd & Old Ikoyi',
    landmarks: 'Awolowo Rd · Bourdillon · Alexander · Glover · Falomo · Obalende',
    valetFee: 1500,
    etaWindow: '30 – 45 mins pickup response',
  },
  {
    id: 'banana-parkview',
    name: 'Banana Island & Parkview Estate',
    landmarks: 'Banana Island · Parkview · Gerrard Rd · Osborne Foreshore',
    valetFee: 2000,
    etaWindow: '45 – 60 mins pickup response',
  },
  {
    id: 'victoria-island',
    name: 'Victoria Island & Eko Atlantic',
    landmarks: 'Adeola Odeku · Akin Adesola · Kofo Abayomi · Ahmadu Bello',
    valetFee: 2500,
    etaWindow: '45 – 60 mins pickup response',
  },
  {
    id: 'oniru-estate',
    name: 'Oniru Royal Estate',
    landmarks: 'Palace Rd · Water Corporation Dr · Landmark Boulevard',
    valetFee: 2500,
    etaWindow: '60 – 75 mins pickup response',
  },
  {
    id: 'lekki-phase-1',
    name: 'Lekki Phase 1, Ikate & Chevron',
    landmarks: 'Admiralty Way · Fola Osibo · Freedom Way · Ikate · Chevron',
    valetFee: 3000,
    etaWindow: '60 – 90 mins pickup response',
  },
];

export const DEFAULT_GARMENT_CATALOG: GarmentItem[] = [
  // Wash, Dry & Fold Everyday Laundry & Shirt Bundles
  {
    id: 'wash-fold-regular-bag',
    name: 'Everyday Wash, Dry & Crisp Fold Load (Up to 15 Items)',
    category: 'wash_fold',
    dryCleanPrice: 12000,
    pressOnlyPrice: 7500,
    fabricCareNote: 'Color-separated wash · Softener conditioning · Neat shelf-ready folding',
    standardHours: 24,
  },
  {
    id: 'shirt-laundry-bundle-5',
    name: 'Weekly Corporate Shirt Bundle (5 Shirts — Washed & Ironed)',
    category: 'wash_fold',
    dryCleanPrice: 11500,
    pressOnlyPrice: 6500,
    fabricCareNote: 'Collar & cuff stain lifting · Choice of light, medium, or crisp starch · Hung or folded',
    standardHours: 24,
  },
  {
    id: 'casual-polos-tshirts',
    name: 'Polo Shirt, T-Shirt or Casual Top (Per Piece)',
    category: 'wash_fold',
    dryCleanPrice: 2000,
    pressOnlyPrice: 1200,
    fabricCareNote: 'Gentle temperature control · Zero collar stretching · Steam finished',
    standardHours: 24,
  },
  {
    id: 'denim-chinos-trousers',
    name: 'Jeans, Chinos or Casual Trousers (Per Piece)',
    category: 'wash_fold',
    dryCleanPrice: 2500,
    pressOnlyPrice: 1500,
    fabricCareNote: 'Color-lock dark wash · Soft fabric finish · Crease or flat press option',
    standardHours: 24,
  },

  // Specialist Dry Cleaning & Executive Suits
  {
    id: 'bespoke-suit-2pc',
    name: 'Executive 2-Piece Suit (Jacket & Trousers)',
    category: 'executive',
    dryCleanPrice: 8500,
    pressOnlyPrice: 4500,
    fabricCareNote: 'Canvas lapel roll preservation · Odorless dry cleaning solvent · Contoured hanger',
    standardHours: 48,
  },
  {
    id: 'tuxedo-3pc',
    name: '3-Piece Dinner Tuxedo / Executive Suit',
    category: 'executive',
    dryCleanPrice: 10500,
    pressOnlyPrice: 5500,
    fabricCareNote: 'Satin lapel sheen protection · Hand shoulder shaping · Breathable suit cover',
    standardHours: 48,
  },
  {
    id: 'executive-shirt',
    name: 'Executive Dress Shirt (French or Barrel Cuff)',
    category: 'executive',
    dryCleanPrice: 2500,
    pressOnlyPrice: 1500,
    fabricCareNote: 'Enzymatic collar whitening · Custom starch calibration (None / Light / Crisp)',
    standardHours: 24,
  },
  {
    id: 'couture-evening-gown',
    name: 'Silk, Chiffon or Corporate Dress / Evening Gown',
    category: 'executive',
    dryCleanPrice: 12000,
    pressOnlyPrice: 6000,
    fabricCareNote: 'Delicate hemline stain lifting · Multi-layer steam draping · Protective cover',
    standardHours: 48,
  },
  {
    id: 'tailored-trousers-skirt',
    name: 'Corporate Wool Trousers or Pleated Skirt',
    category: 'executive',
    dryCleanPrice: 3500,
    pressOnlyPrice: 1800,
    fabricCareNote: 'Precision knife-pleat alignment · Anti-shine pressing cloth barrier',
    standardHours: 24,
  },

  // Traditional Luxury & Native Couture
  {
    id: 'agbada-3pc',
    name: '3-Piece Embroidered Agbada Set',
    category: 'traditional',
    dryCleanPrice: 12000,
    pressOnlyPrice: 6000,
    fabricCareNote: 'Hand-shielded embroidery · Low-moisture dry cleaning · Crisp starch finishing',
    standardHours: 48,
  },
  {
    id: 'senator-2pc',
    name: 'Bespoke Senator / Kaftan Suit (Top & Trousers)',
    category: 'traditional',
    dryCleanPrice: 6000,
    pressOnlyPrice: 3500,
    fabricCareNote: 'Color-lock fabric care · Crisp cuff & chest placket tension steam press',
    standardHours: 48,
  },
  {
    id: 'french-lace-asoebi',
    name: 'Beaded French Lace / Aso-Ebi Outfit',
    category: 'traditional',
    dryCleanPrice: 13500,
    pressOnlyPrice: 6500,
    fabricCareNote: 'Sequin & bead mesh protection · Delicate solvent care · Hand steam finish',
    standardHours: 72,
  },
  {
    id: 'asooke-complete',
    name: 'Hand-Woven Aso-Oke Complete Set',
    category: 'traditional',
    dryCleanPrice: 10500,
    pressOnlyPrice: 5000,
    fabricCareNote: 'Zero-shrinkage dry cleaning cycle · Metallic thread luster preservation',
    standardHours: 72,
  },

  // Household Care: Duvets, Curtains & Carpets
  {
    id: 'king-duvet',
    name: 'King / Queen Size Duvet or Comforter',
    category: 'household',
    dryCleanPrice: 14000,
    pressOnlyPrice: 6500,
    fabricCareNote: 'Deep antibacterial sanitization · Loft-restoring drying · Zippered storage bag',
    standardHours: 48,
  },
  {
    id: 'egyptian-bedding-set',
    name: 'Complete Bed Sheet & Duvet Cover Set (4–6 Pieces)',
    category: 'household',
    dryCleanPrice: 8500,
    pressOnlyPrice: 4500,
    fabricCareNote: 'Optical white & color brightening · Crisp hotel-grade flat press finish',
    standardHours: 48,
  },
  {
    id: 'heavy-drapery-panel',
    name: 'Curtains & Heavy Drapery (Per Panel)',
    category: 'household',
    dryCleanPrice: 10000,
    pressOnlyPrice: 5500,
    fabricCareNote: 'Dust & odor extraction · Lining shrinkage protection · Vertical steam hang',
    standardHours: 72,
  },
  {
    id: 'area-rug-carpet',
    name: 'Centre Rug / Carpet Deep Wash & Sanitization',
    category: 'household',
    dryCleanPrice: 22000,
    pressOnlyPrice: 11000,
    fabricCareNote: 'Deep pile soil extraction · Stain & odor treatment · Controlled dehumidified drying',
    standardHours: 96,
  },
];

export const ORDER_CARE_STAGES: OrderStage[] = [
  {
    step: 1,
    title: 'Collection & Studio Check-In',
    description: 'Items collected from your doorstep or logged at 109A Awolowo Rd, Ikoyi.',
  },
  {
    step: 2,
    title: 'Sorting, Inspection & Stain Treatment',
    description: 'Garments inspected by fabric type and pre-treated for collar, oil, or wine stains.',
  },
  {
    step: 3,
    title: 'Dry Cleaning or Wash & Conditioning',
    description: 'Cleaned using fabric-safe dry cleaning solvents or temperature-calibrated wash cycles.',
  },
  {
    step: 4,
    title: 'Steam Pressing, Folding & Quality Check',
    description: 'Crisply pressed, starched to preference, folded or hung, and inspected before packing.',
  },
  {
    step: 5,
    title: 'Packaged & Dispatched for Delivery',
    description: 'Sealed in protective garment covers and delivered back to your home or office.',
  },
];

export const INITIAL_SAMPLE_TICKETS: LaundryTicket[] = [
  {
    ticketId: 'KZ-8492',
    customerName: 'Chief Tunde Adebayo',
    phone: '+234 803 412 9001',
    zoneName: '109A Awolowo Rd & Old Ikoyi',
    streetAddress: '14 Bourdillon Road, Ikoyi, Lagos',
    pickupDate: '2026-10-21',
    pickupWindow: '09:00 AM – 11:00 AM',
    isExpress: true,
    currentStage: 3,
    createdAt: 'Oct 21 · 09:40 AM',
    estimatedReady: 'Today · 05:30 PM (Express 24h)',
    itemsSummary: [
      {
        name: '3-Piece Embroidered Agbada Set',
        quantity: 1,
        serviceMode: 'dry_clean',
        lineTotal: 18000,
      },
      {
        name: 'Executive 2-Piece Suit (Jacket & Trousers)',
        quantity: 2,
        serviceMode: 'dry_clean',
        lineTotal: 25500,
      },
      {
        name: 'Executive Dress Shirt (French or Barrel Cuff)',
        quantity: 4,
        serviceMode: 'dry_clean',
        lineTotal: 15000,
      },
    ],
    subtotal: 58500,
    valetFee: 0,
    totalAmount: 58500,
    specialInstructions: 'Light starch on white French-cuff shirts; protect gold embroidery on Agbada.',
  },
  {
    ticketId: 'KZ-4108',
    customerName: 'Amara Nwosu',
    phone: '+234 809 221 7740',
    zoneName: 'Victoria Island & Eko Atlantic',
    streetAddress: '28 Adeola Odeku Street, Victoria Island, Lagos',
    pickupDate: '2026-10-20',
    pickupWindow: '02:00 PM – 04:00 PM',
    isExpress: false,
    currentStage: 4,
    createdAt: 'Oct 20 · 02:25 PM',
    estimatedReady: 'Ready for Delivery · Rider Assigned',
    itemsSummary: [
      {
        name: 'Beaded French Lace / Aso-Ebi Outfit',
        quantity: 1,
        serviceMode: 'dry_clean',
        lineTotal: 13500,
      },
      {
        name: 'Weekly Corporate Shirt Bundle (5 Shirts — Washed & Ironed)',
        quantity: 1,
        serviceMode: 'dry_clean',
        lineTotal: 11500,
      },
    ],
    subtotal: 25000,
    valetFee: 0,
    totalAmount: 25000,
    specialInstructions: 'Deliver in breathable garment bag.',
  },
  {
    ticketId: 'KZ-9320',
    customerName: 'Dr. Ibrahim Danjuma',
    phone: '+234 812 880 3319',
    zoneName: 'Banana Island & Parkview Estate',
    streetAddress: '312 Close, Banana Island, Ikoyi, Lagos',
    pickupDate: '2026-10-21',
    pickupWindow: '11:00 AM – 01:00 PM',
    isExpress: false,
    currentStage: 2,
    createdAt: 'Oct 21 · 11:50 AM',
    estimatedReady: 'Oct 23 · 04:00 PM (Standard 48h)',
    itemsSummary: [
      {
        name: 'King / Queen Size Duvet or Comforter',
        quantity: 2,
        serviceMode: 'dry_clean',
        lineTotal: 28000,
      },
      {
        name: 'Complete Bed Sheet & Duvet Cover Set (4–6 Pieces)',
        quantity: 2,
        serviceMode: 'dry_clean',
        lineTotal: 17000,
      },
    ],
    subtotal: 45000,
    valetFee: 0,
    totalAmount: 45000,
    specialInstructions: 'Gentle fragrance-free conditioning rinse.',
  },
];

export const BLOG_POSTS: BlogPost[] = [
  {
    id: 'agbada-senator-care-lagos',
    title: 'How to Preserve Embroidered Agbada, Senator Wear & French Lace in Lagos Humidity',
    category: 'Traditional & Native Care',
    readTime: '4 min read',
    publishedDate: 'October 2026',
    excerpt:
      'Discover why harsh home detergents fade native fabrics and loosen tambour embroidery—and how low-moisture dry cleaning keeps your ceremonial outfits looking brand new.',
    content: [
      'Traditional Nigerian attire—such as 3-piece Agbada sets, cashmere-blend Senator suits, Aso-Oke, and beaded French lace—combines delicate base textiles with metallic threads, stones, and structured interfacing.',
      'When washed in standard domestic machines or scrubbed with alkaline detergents, metallic embroidery oxidizes, dark dyes bleed into lighter threadwork, and collar interfacing bubbles permanently.',
      'At KENZA LAUNDRY & DRY CLEANING SERVICES (109A Awolowo Rd, Ikoyi), every native piece first undergoes a microscopic stain and beadwork audit. Loose sequins are secured, embroidery panels are shielded in protective mesh, and the garment is cleaned in a moisture-controlled solvent bath before receiving calibrated steam tension pressing.',
    ],
    careTakeaway: 'Never store damp or perspiration-exposed native wear in sealed plastic bags; bring it in within 48 hours of an event to prevent invisible sugar and sweat stains from oxidizing.',
  },
  {
    id: 'dry-cleaning-vs-wash-fold',
    title: 'Dry Cleaning vs. Professional Wash & Fold: Which Service Does Your Wardrobe Need?',
    category: 'Garment Care Guide',
    readTime: '3 min read',
    publishedDate: 'October 2026',
    excerpt:
      'Knowing when to choose solvent dry cleaning versus temperature-controlled wet laundry extends the life of your corporate shirts, suits, and everyday cottons.',
    content: [
      'A common misconception among laundry customers is that dry cleaning is harsher than water washing. In reality, water causes natural wool, silk, and structured rayon fibers to swell and shrink, whereas dry cleaning solvents lift oils and grease without swelling delicate fibers.',
      'Structured garments like 2-piece suits, blazers, silk dresses, pleated trousers, and native couture should always be dry cleaned to preserve their tailored drape and prevent shrinkage.',
      'Conversely, 100% cotton dress shirts, polo shirts, gym wear, bed sheets, and bath towels thrive in our professional Wash, Dry & Fold or Wet Laundry cycle—where enzymatic stain lifters, pH-balanced softeners, and high-pressure steam presses remove body perspiration and restore crispness.',
    ],
    careTakeaway: 'Combine both in one pickup: place your everyday cottons in a Wash & Fold bundle and tag your suits and native outfits for Specialist Dry Cleaning.',
  },
  {
    id: 'duvet-curtain-hygiene-ikoyi',
    title: 'Why Quarterly Duvet, Curtain & Rug Cleaning Is Essential for Lagos Homes',
    category: 'Household Hygiene',
    readTime: '3 min read',
    publishedDate: 'September 2026',
    excerpt:
      'Heavy curtains, duvets, and centre rugs act as air filters in coastal Lagos homes, trapping fine dust, pollen, and humidity over time.',
    content: [
      'In coastal neighborhoods like Ikoyi, Victoria Island, and Lekki, high humidity combined with urban dust settles deep inside heavy velvet curtains, blackout linings, down duvets, and living-room rugs.',
      'Domestic washing machines lack the drum capacity to agitate and rinse a King duvet thoroughly, often leaving detergent residue and damp core clumping that leads to mildew odors.',
      'Our high-capacity industrial extractors and dehumidified drying rooms at 109A Awolowo Rd flush out deep-seated allergens, sanitize fibers, and restore the plush loft of your bedding and drapery.',
    ],
    careTakeaway: 'Schedule duvet refreshment every 3 months and curtain/rug deep cleaning every 6 months for a fresher, allergy-free indoor environment.',
  },
];

export function formatNaira(amount: number): string {
  return `₦${Math.round(amount).toLocaleString('en-NG')}`;
}
