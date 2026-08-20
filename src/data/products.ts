import { Product } from '../types';

export const INITIAL_PRODUCTS: Product[] = [
  {
    id: 'nordic-fir-birch',
    name: 'Nordic Fir & Smoked Birch',
    tagline: 'Crisp evergreen needles, charred birchwood & cold mountain air',
    description: 'An evocative forest retreat in a vessel. Harvested Siberian fir needles combine with the smoky warmth of burning birch and wild moss to ground your living spaces in serene woodland tranquility.',
    story: 'Inspired by early dawn walks through the mist-shrouded old-growth forests of the Pacific Northwest. Hand-poured in micro-batches of 48 vessels using sustainably harvested balsam fir essential oils and Midwest soy wax.',
    price: 36,
    originalPrice: 42,
    category: 'woody',
    images: [
      'https://images.unsplash.com/photo-1603006905003-be475563bc59?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1572726728685-618484646736?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1596433809252-260c2745dfdd?auto=format&fit=crop&w=1000&q=80'
    ],
    rating: 4.9,
    reviewsCount: 128,
    burnTime: '55-60 hrs',
    waxType: '100% Midwestern Soy Wax',
    vesselMaterial: 'Matte Forest Green Ceramic Vessel',
    scentThrow: 4,
    mood: ['Grounding', 'Forest Bathing', 'Cozy Fireside'],
    scentNotes: {
      top: ['Crisp Fir Needle', 'Mountain Pine', 'Eucalyptus Leaf'],
      heart: ['Charred Birch', 'Smoked Cedar', 'Winter Clove'],
      base: ['Earth Moss', 'Amber Resin', 'Balsam Wood']
    },
    sizes: [
      { id: '8oz', name: '8 oz Travel Tin', weight: '226g', price: 24, burnTime: '35-40 hrs' },
      { id: '12oz', name: '12 oz Signature Jar', weight: '340g', price: 36, burnTime: '55-60 hrs' },
      { id: '16oz', name: '16 oz 3-Wick Grande', weight: '454g', price: 48, burnTime: '75-80 hrs' }
    ],
    wickOptions: [
      { id: 'wood', name: 'Crackling Wood Wick', description: 'FSC-certified timber wick with gentle campfire crackle sound' },
      { id: 'cotton', name: 'Braided Organic Cotton', description: 'Lead-free, unbleached organic cotton for a quiet, even flame' }
    ],
    stockStatus: 'in_stock',
    stockCount: 14,
    isBestseller: true,
    isNew: false,
    handPouredIn: 'Portland, OR',
    batchNumber: 'Batch #104',
    reviews: [
      {
        id: 'r1',
        author: 'Elena R.',
        rating: 5,
        date: '3 days ago',
        title: 'Brings the quiet Pacific forest directly into my home',
        comment: 'The crackling wooden wick adds so much peaceful atmosphere to rainy evenings. The scent throw is incredible without ever causing a headache. Pure artisan perfection.',
        verified: true,
        scentPurchased: '12 oz / Wood Wick',
        helpfulCount: 24
      },
      {
        id: 'r2',
        author: 'Marcus K.',
        rating: 5,
        date: '1 week ago',
        title: 'Authentic wood scent, zero artificial perfume notes',
        comment: 'Most pine candles smell like synthetic floor cleaner. This smells like real cedarwood and fresh damp pine needles. You can tell they use authentic essential botanicals.',
        verified: true,
        scentPurchased: '16 oz Grande',
        helpfulCount: 19
      }
    ]
  },
  {
    id: 'amber-santal-cashmere',
    name: 'Amber Santal & Cashmere',
    tagline: 'Warm golden amber, creamy Australian sandalwood & soft vanilla suede',
    description: 'An enveloping aura of luxury and comfort. Rich botanical santal entwines with warm amber resin, crushed tonka bean, and a whisper of white cashmere for a tranquil sanctuary.',
    story: 'Formulated to transform bedroom sanctuaries into restful respites. Blended with ethically sourced Mysore-style Australian sandalwood and warm resinous amber crystals.',
    price: 38,
    category: 'calm',
    images: [
      'https://images.unsplash.com/photo-1508746829417-e6f548d8d6ed?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1543465077-db45d34b88a5?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1602874801007-bd458bb1b8b6?auto=format&fit=crop&w=1000&q=80'
    ],
    rating: 5.0,
    reviewsCount: 164,
    burnTime: '55-60 hrs',
    waxType: '100% Midwestern Soy Wax',
    vesselMaterial: 'Amber Glass Apothecary Jar with Cork Lid',
    scentThrow: 4,
    mood: ['Deep Relaxation', 'Sensual Warmth', 'Evening Calm'],
    scentNotes: {
      top: ['Golden Amber', 'Cardamom Pod', 'Bergamot Zest'],
      heart: ['Creamy Sandalwood', 'Orris Root', 'Soft Suede'],
      base: ['Bourbon Vanilla', 'Cashmere Musk', 'Smoked Tonka']
    },
    sizes: [
      { id: '8oz', name: '8 oz Travel Tin', weight: '226g', price: 26, burnTime: '35-40 hrs' },
      { id: '12oz', name: '12 oz Signature Jar', weight: '340g', price: 38, burnTime: '55-60 hrs' },
      { id: '16oz', name: '16 oz 3-Wick Grande', weight: '454g', price: 52, burnTime: '75-80 hrs' }
    ],
    wickOptions: [
      { id: 'wood', name: 'Crackling Wood Wick', description: 'FSC-certified timber wick with gentle campfire crackle sound' },
      { id: 'cotton', name: 'Braided Organic Cotton', description: 'Lead-free, unbleached organic cotton for a quiet, even flame' }
    ],
    stockStatus: 'in_stock',
    stockCount: 22,
    isBestseller: true,
    isNew: false,
    handPouredIn: 'Seattle, WA',
    batchNumber: 'Batch #112',
    reviews: [
      {
        id: 'r3',
        author: 'Sophia M.',
        rating: 5,
        date: '2 weeks ago',
        title: 'The ultimate bedroom scent',
        comment: 'Soft, sophisticated, and deeply calming. I light this 30 minutes before bed and the entire room turns into a 5-star spa suite. Burns clean to the very edge with no tunneling.',
        verified: true,
        scentPurchased: '12 oz / Wood Wick',
        helpfulCount: 31
      }
    ]
  },
  {
    id: 'eucalyptus-wild-mint',
    name: 'Eucalyptus Mist & Wild Mint',
    tagline: 'Crushed spearmint, invigorating blue eucalyptus & herbal white sage',
    description: 'Awaken your senses and clear the mind with fresh steam-distilled eucalyptus globulus, crisp wild garden mint, and grounding herbal sage. The ultimate remedy for mindful morning rituals.',
    story: 'Crafted during spring harvest in organic botanical gardens. Perfect for bathrooms, steam showers, and home work studios where mental clarity is cherished.',
    price: 34,
    category: 'citrus',
    images: [
      'https://images.unsplash.com/photo-1595425970377-c9703cf48b6d?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1608181831718-c96766eb7b24?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1570823635306-250abb06d4b3?auto=format&fit=crop&w=1000&q=80'
    ],
    rating: 4.8,
    reviewsCount: 94,
    burnTime: '55-60 hrs',
    waxType: '100% Midwestern Soy Wax',
    vesselMaterial: 'Frost White Ribbed Ceramic',
    scentThrow: 5,
    mood: ['Mental Clarity', 'Morning Energy', 'Spa Cleanse'],
    scentNotes: {
      top: ['Blue Eucalyptus', 'Spearmint Leaf', 'Lemon Rind'],
      heart: ['White Garden Sage', 'Rosemary Sprig', 'Sea Salt'],
      base: ['Light Driftwood', 'Clean Musk', 'Cypress']
    },
    sizes: [
      { id: '8oz', name: '8 oz Travel Tin', weight: '226g', price: 22, burnTime: '35-40 hrs' },
      { id: '12oz', name: '12 oz Signature Jar', weight: '340g', price: 34, burnTime: '55-60 hrs' },
      { id: '16oz', name: '16 oz 3-Wick Grande', weight: '454g', price: 46, burnTime: '75-80 hrs' }
    ],
    wickOptions: [
      { id: 'wood', name: 'Crackling Wood Wick', description: 'FSC-certified timber wick with gentle campfire crackle sound' },
      { id: 'cotton', name: 'Braided Organic Cotton', description: 'Lead-free, unbleached organic cotton for a quiet, even flame' }
    ],
    stockStatus: 'in_stock',
    stockCount: 19,
    isBestseller: false,
    isNew: true,
    handPouredIn: 'Portland, OR',
    batchNumber: 'Batch #098',
    reviews: [
      {
        id: 'r4',
        author: 'Liam D.',
        rating: 5,
        date: '5 days ago',
        title: 'Transformed my morning focus routine',
        comment: 'Fresh, crisp, and so revitalizing. I keep this on my desk while working from home. Zero soot on the glass walls.',
        verified: true,
        scentPurchased: '12 oz Signature',
        helpfulCount: 11
      }
    ]
  },
  {
    id: 'lavender-bloom-white-tea',
    name: 'Lavender Bloom & White Tea',
    tagline: 'Provencal lavender fields, delicate white tea buds & crushed chamomile',
    description: 'An idyllic field of French lavender kissed by morning dew. Blended with delicate Silver Needle white tea leaves and chamomile blossoms to dissolve tension and nurture tranquil sleep.',
    story: 'Distilled using high-elevation French lavender flowers known for elevated linalool content, creating deep relaxation and restful slumber.',
    price: 36,
    category: 'floral',
    images: [
      'https://images.unsplash.com/photo-1543465077-db45d34b88a5?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1508746829417-e6f548d8d6ed?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1602874801007-bd458bb1b8b6?auto=format&fit=crop&w=1000&q=80'
    ],
    rating: 4.9,
    reviewsCount: 112,
    burnTime: '55-60 hrs',
    waxType: '100% Midwestern Soy Wax',
    vesselMaterial: 'Glazed Terracotta Vessel',
    scentThrow: 3,
    mood: ['Deep Sleep', 'Serenity', 'Stress Relief'],
    scentNotes: {
      top: ['French Lavender', 'Bergamot Blossom', 'White Thyme'],
      heart: ['Silver Needle Tea', 'Chamomile Petal', 'Jasmine Sambac'],
      base: ['Warm Cedar', 'Cotton Blossom', 'Vanilla Pod']
    },
    sizes: [
      { id: '8oz', name: '8 oz Travel Tin', weight: '226g', price: 24, burnTime: '35-40 hrs' },
      { id: '12oz', name: '12 oz Signature Jar', weight: '36', price: 36, burnTime: '55-60 hrs' },
      { id: '16oz', name: '16 oz 3-Wick Grande', weight: '454g', price: 48, burnTime: '75-80 hrs' }
    ],
    wickOptions: [
      { id: 'cotton', name: 'Braided Organic Cotton', description: 'Lead-free, unbleached organic cotton for a quiet, even flame' },
      { id: 'wood', name: 'Crackling Wood Wick', description: 'FSC-certified timber wick with gentle campfire crackle sound' }
    ],
    stockStatus: 'in_stock',
    stockCount: 31,
    isBestseller: false,
    isNew: false,
    handPouredIn: 'Seattle, WA',
    batchNumber: 'Batch #107',
    reviews: [
      {
        id: 'r5',
        author: 'Chloe T.',
        rating: 5,
        date: '3 weeks ago',
        title: 'Gentle, natural and not overpowering',
        comment: 'So many lavender candles smell like synthetic soap. Aura & Botanica nailed the botanical herb aroma. So pleasant in the bath.',
        verified: true,
        scentPurchased: '12 oz / Cotton Wick',
        helpfulCount: 15
      }
    ]
  },
  {
    id: 'fig-leaf-sunlit-bergamot',
    name: 'Fig Leaf & Sunlit Bergamot',
    tagline: 'Lush Mediterranean fig tree, sun-warmed bergamot & sheer coconut water',
    description: 'Bask in the golden glow of coastal summer. Green fig leaves, earthy bark, and juicy Italian bergamot create an uplifting atmosphere brimming with natural radiance.',
    story: 'Inspired by lazy Mediterranean afternoons under the shade of fruiting fig orchards with the sea breeze gently rolling in.',
    price: 36,
    originalPrice: 40,
    category: 'floral',
    images: [
      'https://images.unsplash.com/photo-1603006905003-be475563bc59?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1596433809252-260c2745dfdd?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1572726728685-618484646736?auto=format&fit=crop&w=1000&q=80'
    ],
    rating: 4.8,
    reviewsCount: 88,
    burnTime: '55-60 hrs',
    waxType: '100% Midwestern Soy Wax',
    vesselMaterial: 'Oatmeal Speckled Ceramic',
    scentThrow: 4,
    mood: ['Joyful', 'Sunny Afternoon', 'Creative Flow'],
    scentNotes: {
      top: ['Green Fig Leaf', 'Calabrian Bergamot', 'Grapefruit'],
      heart: ['Ripe Purple Fig', 'Neroli Bloom', 'Coconut Water'],
      base: ['Fig Wood', 'Vetiver Root', 'White Amber']
    },
    sizes: [
      { id: '8oz', name: '8 oz Travel Tin', weight: '226g', price: 24, burnTime: '35-40 hrs' },
      { id: '12oz', name: '12 oz Signature Jar', weight: '340g', price: 36, burnTime: '55-60 hrs' },
      { id: '16oz', name: '16 oz 3-Wick Grande', weight: '454g', price: 48, burnTime: '75-80 hrs' }
    ],
    wickOptions: [
      { id: 'wood', name: 'Crackling Wood Wick', description: 'FSC-certified timber wick with gentle campfire crackle sound' },
      { id: 'cotton', name: 'Braided Organic Cotton', description: 'Lead-free, unbleached organic cotton for a quiet, even flame' }
    ],
    stockStatus: 'in_stock',
    stockCount: 8,
    isBestseller: true,
    isNew: false,
    handPouredIn: 'Portland, OR',
    batchNumber: 'Batch #115',
    reviews: [
      {
        id: 'r6',
        author: 'Julian S.',
        rating: 5,
        date: '1 month ago',
        title: 'Sophisticated and summery',
        comment: 'The fig note is earthy and green, not sickly sweet. Our guests constantly compliment how our entryway smells.',
        verified: true,
        scentPurchased: '12 oz Signature',
        helpfulCount: 20
      }
    ]
  },
  {
    id: 'smoked-tobacco-cardamom',
    name: 'Smoked Tobacco & Dark Cardamom',
    tagline: 'Warm cured pipe tobacco, crushed black cardamom & golden honeyed oak',
    description: 'An intimate study in rich warmth and vintage leather armchairs. Notes of sweet Virginia cured tobacco leaves, spicy cardamom pods, aged cognac, and amber oak barrel wood.',
    story: 'Created as a tribute to antique library rooms and late-night intellectual conversations over herbal tea and fireside melodies.',
    price: 38,
    category: 'woody',
    images: [
      'https://images.unsplash.com/photo-1572726728685-618484646736?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1603006905003-be475563bc59?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1596433809252-260c2745dfdd?auto=format&fit=crop&w=1000&q=80'
    ],
    rating: 4.9,
    reviewsCount: 142,
    burnTime: '55-60 hrs',
    waxType: '100% Midwestern Soy Wax',
    vesselMaterial: 'Heavy Matte Black Ceramic Vessel',
    scentThrow: 5,
    mood: ['Intimate', 'Evening Sanctuary', 'Warmth'],
    scentNotes: {
      top: ['Black Cardamom', 'Spiced Ginger', 'Cognac Accord'],
      heart: ['Cured Tobacco Leaf', 'Leather Suede', 'Honeyed Blossom'],
      base: ['Aged Oakwood', 'Vanilla Resin', 'Dark Patchouli']
    },
    sizes: [
      { id: '8oz', name: '8 oz Travel Tin', weight: '226g', price: 26, burnTime: '35-40 hrs' },
      { id: '12oz', name: '12 oz Signature Jar', weight: '340g', price: 38, burnTime: '55-60 hrs' },
      { id: '16oz', name: '16 oz 3-Wick Grande', weight: '454g', price: 52, burnTime: '75-80 hrs' }
    ],
    wickOptions: [
      { id: 'wood', name: 'Crackling Wood Wick', description: 'FSC-certified timber wick with gentle campfire crackle sound' },
      { id: 'cotton', name: 'Braided Organic Cotton', description: 'Lead-free, unbleached organic cotton for a quiet, even flame' }
    ],
    stockStatus: 'low_stock',
    stockCount: 4,
    isBestseller: true,
    isNew: false,
    handPouredIn: 'Seattle, WA',
    batchNumber: 'Batch #119',
    reviews: [
      {
        id: 'r7',
        author: 'Daniel V.',
        rating: 5,
        date: '4 days ago',
        title: 'Remarkable depth and complexity',
        comment: 'Hands down my favorite candle ever made. The tobacco is warm and sweet, balanced with dark wood. Grab it before this batch sells out!',
        verified: true,
        scentPurchased: '16 oz Grande',
        helpfulCount: 43
      }
    ]
  },
  {
    id: 'brass-wick-care-trio',
    name: 'Solid Brass Wick Trimmer & Snuffer Care Set',
    tagline: 'Heavyweight brass accessories to extend candle burn life by 30%',
    description: 'Crafted from solid brushed vintage brass. Includes a precision angled wick trimmer with built-in debris tray, a bell snuffer to extinguish flame without smoke, and a wick dipper.',
    story: 'Essential tools for any candle connoisseur. Regular wick trimming prevents soot accumulation and ensures a pure, slow, even wax pool every time.',
    price: 32,
    originalPrice: 38,
    category: 'accessories',
    images: [
      'https://images.unsplash.com/photo-1602874801007-bd458bb1b8b6?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1543465077-db45d34b88a5?auto=format&fit=crop&w=1000&q=80'
    ],
    rating: 5.0,
    reviewsCount: 76,
    burnTime: 'Lifetime Heirloom',
    waxType: 'Solid Brushed Brass',
    vesselMaterial: 'Presented in linen drawstring pouch',
    scentThrow: 1,
    mood: ['Ritual', 'Mindful Care', 'Artisan Tool'],
    scentNotes: {
      top: ['Solid Brass Metal'],
      heart: ['Hand-Polished Finish'],
      base: ['Laser-Etched Logo']
    },
    sizes: [
      { id: 'brass-set', name: '3-Piece Heirloom Brass Set', weight: '380g', price: 32, burnTime: 'Lifetime Care' }
    ],
    wickOptions: [
      { id: 'standard', name: 'Solid Brass Finish', description: 'Vintage brushed champagne brass with protective anti-tarnish coating' }
    ],
    stockStatus: 'in_stock',
    stockCount: 28,
    isBestseller: false,
    isNew: false,
    handPouredIn: 'Crafted by Heirloom Metalworks',
    batchNumber: 'Series 04',
    reviews: [
      {
        id: 'r8',
        author: 'Hannah G.',
        rating: 5,
        date: '2 weeks ago',
        title: 'Heavy, beautiful and truly functional',
        comment: 'Cuts wicks cleanly without dropping charred bits into the melted wax. Looks so gorgeous sitting on my marble coffee table next to the candle.',
        verified: true,
        scentPurchased: 'Brass Set',
        helpfulCount: 18
      }
    ]
  },
  {
    id: 'discovery-trio-gift-box',
    name: 'Artisan Discovery Trio Gift Box',
    tagline: 'A curated flight of three 8 oz hand-poured seasonal botanicals',
    description: 'The definitive introduction to Aura & Botanica. Includes 3 full 8 oz vessels in custom presentation packaging with match bottle and botanical story booklet.',
    story: 'Features our three foundational scents: Nordic Fir, Amber Santal, and Fig Leaf. Packaged in 100% recycled cotton pulp gift box with blind debossed foil lettering.',
    price: 68,
    originalPrice: 78,
    category: 'bundles',
    images: [
      'https://images.unsplash.com/photo-1596433809252-260c2745dfdd?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1603006905003-be475563bc59?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1508746829417-e6f548d8d6ed?auto=format&fit=crop&w=1000&q=80'
    ],
    rating: 4.9,
    reviewsCount: 156,
    burnTime: '115+ total hrs',
    waxType: '100% Midwestern Soy Wax',
    vesselMaterial: 'Set of 3 Matte Ceramic Vessels',
    scentThrow: 4,
    mood: ['Ultimate Gift', 'Discovery Flight', 'Home Sanctuary'],
    scentNotes: {
      top: ['Fir Needle', 'Bergamot Zest', 'Golden Amber'],
      heart: ['Birchwood', 'French Lavender', 'Ripe Fig'],
      base: ['Moss', 'Sandalwood', 'Warm Vanilla']
    },
    sizes: [
      { id: '3x8oz', name: '3x 8 oz Discovery Flight', weight: '680g', price: 68, burnTime: '115+ hrs total' }
    ],
    wickOptions: [
      { id: 'wood', name: 'Crackling Wood Wicks', description: 'All 3 vessels with FSC-certified timber wicks' },
      { id: 'cotton', name: 'Braided Organic Cotton', description: 'All 3 vessels with organic cotton wicks' }
    ],
    stockStatus: 'in_stock',
    stockCount: 18,
    isBestseller: true,
    isNew: true,
    handPouredIn: 'Studio Micro-batch',
    batchNumber: 'Gift Edition #40',
    reviews: [
      {
        id: 'r9',
        author: 'Rachel W.',
        rating: 5,
        date: '1 week ago',
        title: 'The best gift I have ever purchased',
        comment: 'Bought two for housewarming gifts and ended up keeping one for myself! The packaging looks like a $150 luxury boutique unboxing experience.',
        verified: true,
        scentPurchased: 'Trio Flight',
        helpfulCount: 38
      }
    ]
  }
];
