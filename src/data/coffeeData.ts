import { MenuItem } from '../types';

export const HERO_IMAGE = '/src/assets/images/coffee_hero_cafe_1787359899913.jpg';
export const LATTE_ART_IMAGE = '/src/assets/images/coffee_latte_art_1787359913934.jpg';
export const BEANS_PASTRY_IMAGE = '/src/assets/images/coffee_beans_pastry_1787359926614.jpg';

export const MENU_ITEMS: MenuItem[] = [
  // Handcrafted Espresso
  {
    id: 'honey-cinnamon-cortado',
    name: 'Honey Cinnamon Cortado',
    subtitle: 'Balanced & Aromatic',
    description: 'Equal parts double shot espresso and warm silky steamed milk, infused with raw local wildflower honey and dusted with freshly grated Ceylon cinnamon.',
    price: 5.25,
    category: 'espresso',
    tags: ['House Signature', 'Direct Trade'],
    imageUrl: 'https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?auto=format&fit=crop&w=800&q=80',
    tastingNotes: ['Wildflower Honey', 'Warm Spice', 'Brown Sugar'],
    calories: 110,
    popular: true,
    availableSizes: [
      { name: 'Traditional (Cortado)', ounces: '5 oz', priceDelta: 0 },
      { name: 'Extended', ounces: '8 oz', priceDelta: 0.75 },
    ],
    temperatureOptions: ['Hot', 'Iced'],
  },
  {
    id: 'velvet-flat-white',
    name: 'Velvet Flat White',
    subtitle: 'Silky Double Ristretto',
    description: 'A concentrated double ristretto shot capped with a thin, glossy layer of steamed microfoam milk with subtle chocolate and almond undertones.',
    price: 4.95,
    category: 'espresso',
    tags: ['Barista Pick', 'Organic'],
    imageUrl: LATTE_ART_IMAGE,
    tastingNotes: ['Almond Butter', 'Milk Chocolate', 'Malted Toffee'],
    calories: 140,
    popular: true,
    availableSizes: [
      { name: 'Standard', ounces: '6 oz', priceDelta: 0 },
      { name: 'Large', ounces: '10 oz', priceDelta: 0.85 },
    ],
    temperatureOptions: ['Hot', 'Iced'],
  },
  {
    id: 'madagascar-vanilla-oat-latte',
    name: 'Madagascar Vanilla Oat Latte',
    subtitle: 'Velvety & Naturally Sweet',
    description: 'Rich espresso folded into steamed organic Minor Figures oat milk and slow-simmered Madagascar Bourbon vanilla bean syrup.',
    price: 6.25,
    category: 'espresso',
    tags: ['Vegan', 'House Favorite'],
    imageUrl: 'https://images.unsplash.com/photo-1570968915860-54d5c301fa9f?auto=format&fit=crop&w=800&q=80',
    tastingNotes: ['Bourbon Vanilla', 'Creamy Oat', 'Caramelized Sugar'],
    calories: 180,
    popular: true,
    availableSizes: [
      { name: 'Small', ounces: '8 oz', priceDelta: -0.50 },
      { name: 'Regular', ounces: '12 oz', priceDelta: 0 },
      { name: 'Large', ounces: '16 oz', priceDelta: 0.95 },
    ],
    temperatureOptions: ['Hot', 'Iced'],
  },
  {
    id: 'smoked-maple-cappuccino',
    name: 'Smoked Maple Cappuccino',
    subtitle: 'Autumnal & Textural',
    description: 'Espresso with airy, velvety microfoam kissed with pure Vermont smoked maple syrup and a delicate pinch of Maldon sea salt.',
    price: 5.75,
    category: 'espresso',
    tags: ['Seasonal Specialty'],
    imageUrl: 'https://images.unsplash.com/photo-1534778101976-62847782c213?auto=format&fit=crop&w=800&q=80',
    tastingNotes: ['Smoked Maple', 'Dark Cocoa', 'Sea Salt'],
    calories: 160,
    seasonal: true,
    availableSizes: [
      { name: 'Regular', ounces: '8 oz', priceDelta: 0 },
      { name: 'Large', ounces: '12 oz', priceDelta: 0.80 },
    ],
    temperatureOptions: ['Hot'],
  },
  {
    id: 'espresso-romano',
    name: 'Amber Double Espresso Romano',
    subtitle: 'Crisp & Citrus Finish',
    description: 'A pulled double espresso served over a twist of candied Amalfi lemon peel, accentuating bright citric sweetness and crisp crema.',
    price: 3.95,
    category: 'espresso',
    tags: ['Single Origin', 'Zero Calorie'],
    imageUrl: 'https://images.unsplash.com/photo-1510591509098-f4fdc6d0ff04?auto=format&fit=crop&w=800&q=80',
    tastingNotes: ['Amalfi Lemon', 'Bergamot', 'Dark Cherry'],
    calories: 5,
    availableSizes: [
      { name: 'Double Shot (Doppio)', ounces: '2 oz', priceDelta: 0 },
      { name: 'Triple Shot', ounces: '3 oz', priceDelta: 1.00 },
    ],
    temperatureOptions: ['Hot'],
  },

  // Slow Brew & Pour Over
  {
    id: 'ethiopia-yirgacheffe-pour-over',
    name: 'Ethiopia Yirgacheffe G1 Chelchele',
    subtitle: 'Washed Heirloom Varietal',
    description: 'Single-origin hand pour-over using V60 dripper. Incredibly delicate and vibrant with fragrant notes of jasmine blossoms, bergamot tea, and sweet peach nectar.',
    price: 6.50,
    category: 'slow-brew',
    tags: ['Single Origin', 'Direct Trade', 'Light Roast'],
    imageUrl: 'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?auto=format&fit=crop&w=800&q=80',
    roastLevel: 'Light',
    origins: 'Yirgacheffe, Ethiopia',
    elevation: '2,050m - 2,200m',
    process: 'Washed & Sun-Dried',
    tastingNotes: ['Jasmine Floral', 'Bergamot', 'Peach Nectar', 'Meyer Lemon'],
    calories: 5,
    popular: true,
    availableSizes: [
      { name: 'V60 Carafe', ounces: '10 oz', priceDelta: 0 },
      { name: 'Shared Chemex', ounces: '18 oz', priceDelta: 3.50 },
    ],
    temperatureOptions: ['Hot', 'Iced'],
  },
  {
    id: 'colombia-geisha-honey',
    name: 'Colombia Huila Pink Bourbon',
    subtitle: 'Anaerobic Honey Process',
    description: 'Rare micro-lot featuring complex tropical fruitiness, strawberry jam, and lavender honeysuckle finish brewed to exact water TDS specifications.',
    price: 7.50,
    category: 'slow-brew',
    tags: ['Limited Micro-Lot', 'Award Winner'],
    imageUrl: 'https://images.unsplash.com/photo-1541167760496-1628856ab772?auto=format&fit=crop&w=800&q=80',
    roastLevel: 'Light',
    origins: 'Huila, Colombia',
    elevation: '1,850m',
    process: 'Anaerobic 72hr Honey',
    tastingNotes: ['Wild Strawberry', 'Honeysuckle', 'Passionfruit'],
    calories: 5,
    seasonal: true,
    availableSizes: [
      { name: 'Single Mug', ounces: '10 oz', priceDelta: 0 },
    ],
    temperatureOptions: ['Hot'],
  },
  {
    id: 'kyoto-slow-drip-cold-brew',
    name: 'Kyoto 16-Hour Slow Tower Drip',
    subtitle: 'Mizudashi Cold Extraction',
    description: 'Extracted drop-by-drop over sixteen hours through our handcrafted Japanese glass distillation tower. Remarkably rich, winey, and smooth with zero bitterness.',
    price: 6.75,
    category: 'slow-brew',
    tags: ['Artisan Craft', 'High Caffeine'],
    imageUrl: 'https://images.unsplash.com/photo-1517701550927-30cf4ba1dba5?auto=format&fit=crop&w=800&q=80',
    roastLevel: 'Medium',
    origins: 'Guatemala Antigua & Sumatra Blend',
    process: 'Ice Water Slow Drip',
    tastingNotes: ['Dark Chocolate', 'Black Currant', 'Cognac Oak'],
    calories: 10,
    popular: true,
    availableSizes: [
      { name: 'Standard Glass', ounces: '10 oz', priceDelta: 0 },
      { name: 'Bottled Reserve To-Go', ounces: '16 oz (Flask)', priceDelta: 3.00 },
    ],
    temperatureOptions: ['Iced'],
  },

  // Chilled & Refreshers
  {
    id: 'nitro-cascade-cold-brew',
    name: 'Velvet Nitro Cold Brew',
    subtitle: 'Creamy Nitrogen Infusion',
    description: 'Our house single-origin cold brew charged with food-grade pure nitrogen for a cascading Guinness-like body, velvety foam head, and natural sweetness without dairy.',
    price: 5.75,
    category: 'chilled',
    tags: ['On Tap', 'Dairy-Free'],
    imageUrl: 'https://images.unsplash.com/photo-1461023058943-07fcbe16d735?auto=format&fit=crop&w=800&q=80',
    tastingNotes: ['Dark Cocoa', 'Hazelnut Praline', 'Creamy Molasses'],
    calories: 15,
    popular: true,
    availableSizes: [
      { name: 'Regular', ounces: '12 oz', priceDelta: 0 },
      { name: 'Tall', ounces: '16 oz', priceDelta: 0.90 },
    ],
    temperatureOptions: ['Iced'],
  },
  {
    id: 'cardamom-tonic-espresso',
    name: 'Cardamom Citrus Espresso Tonic',
    subtitle: 'Sparkling & Botanical',
    description: 'Double shot of Ethiopian light roast poured over fever-tree Mediterranean tonic water, green cardamom cordial, and fresh grapefruit peel over crystal clear ice.',
    price: 6.25,
    category: 'chilled',
    tags: ['Refreshing', 'Signature Mocktail'],
    imageUrl: 'https://images.unsplash.com/photo-1517256064527-09c73fc73e38?auto=format&fit=crop&w=800&q=80',
    tastingNotes: ['Pink Grapefruit', 'Cardamom', 'Sparkling Quinine', 'Floral Jasmine'],
    calories: 45,
    availableSizes: [
      { name: 'Standard', ounces: '12 oz', priceDelta: 0 },
    ],
    temperatureOptions: ['Iced'],
  },
  {
    id: 'matcha-blossom-cloud',
    name: 'Ceremonial Uji Matcha Cloud',
    subtitle: 'First-Harvest Japanese Green Tea',
    description: 'Whisked ceremonial grade green tea from Kyoto layered over velvety vanilla oat milk and topped with sea salt cream cold foam.',
    price: 6.50,
    category: 'chilled',
    tags: ['Antioxidant Rich', 'Japanese Matcha'],
    imageUrl: 'https://images.unsplash.com/photo-1536256263959-770b48d82b0a?auto=format&fit=crop&w=800&q=80',
    tastingNotes: ['Sweet Umami', 'Floral Vanilla', 'Silky Green Tea'],
    calories: 170,
    availableSizes: [
      { name: 'Regular', ounces: '12 oz', priceDelta: 0 },
      { name: 'Large', ounces: '16 oz', priceDelta: 0.95 },
    ],
    temperatureOptions: ['Iced', 'Hot'],
  },
  {
    id: 'cascara-sparkling-spritz',
    name: 'Sparkling Cascara Berry Spritz',
    subtitle: 'Upcycled Coffee Cherry Botanical',
    description: 'Brewed sun-dried organic coffee fruit husk (cascara) infused with fresh thyme, blood orange puree, and effervescent sparkling water.',
    price: 5.50,
    category: 'chilled',
    tags: ['Eco-Conscious', 'Low Caffeine'],
    imageUrl: 'https://images.unsplash.com/photo-1556679343-c7306c1976bc?auto=format&fit=crop&w=800&q=80',
    tastingNotes: ['Rosehip', 'Hibiscus', 'Blood Orange', 'Dried Cherry'],
    calories: 35,
    availableSizes: [
      { name: 'Standard', ounces: '14 oz', priceDelta: 0 },
    ],
    temperatureOptions: ['Iced'],
  },

  // Artisan Bakery & Food
  {
    id: 'cardamom-brown-butter-cruffin',
    name: 'Cardamom Brown Butter Cruffin',
    subtitle: 'Baked Fresh Every Morning at 6 AM',
    description: 'A hybrid croissant-muffin hybrid laminated with cultured French butter, filled with spiced cardamom pastry cream and tossed in vanilla raw sugar.',
    price: 4.85,
    category: 'bakery',
    tags: ['Fresh Daily', 'House Bakery Favorite'],
    imageUrl: BEANS_PASTRY_IMAGE,
    tastingNotes: ['Brown Butter', 'Cardamom', 'Caramelized Flakes'],
    calories: 340,
    popular: true,
    availableSizes: [
      { name: 'Single Cruffin', ounces: '1 piece', priceDelta: 0 },
      { name: 'Box of 3', ounces: '3 pieces', priceDelta: 8.50 },
    ],
    temperatureOptions: ['Hot'],
  },
  {
    id: 'pistachio-rose-croissant',
    name: 'Twice-Baked Pistachio Croissant',
    subtitle: 'Laminated French Sourdough Pastry',
    description: 'Traditional butter croissant filled with roasted Bronte pistachio frangipane, topped with crushed Sicilian pistachios and dried edible rose petals.',
    price: 5.25,
    category: 'bakery',
    tags: ['Artisan Pastry', 'Vegetarian'],
    imageUrl: 'https://images.unsplash.com/photo-1555507036-ab1f4038808a?auto=format&fit=crop&w=800&q=80',
    tastingNotes: ['Roasted Pistachio', 'Almond Cream', 'Buttery Flakes'],
    calories: 390,
    popular: true,
    availableSizes: [
      { name: 'Single Pastry', ounces: '1 piece', priceDelta: 0 },
    ],
    temperatureOptions: ['Hot'],
  },
  {
    id: 'sourdough-fig-ricotta-toast',
    name: 'Whipped Ricotta & Fig Brioche Toast',
    subtitle: 'Savory & Sweet Artisan Brunch',
    description: 'Thick toasted house-made whole grain sourdough slathered with whipped lemon ricotta, fresh Black Mission figs, hot honey drizzle, and toasted walnuts.',
    price: 8.95,
    category: 'bakery',
    tags: ['Chef Special', 'Brunch Favorite'],
    imageUrl: 'https://images.unsplash.com/photo-1525351484163-7529414344d8?auto=format&fit=crop&w=800&q=80',
    tastingNotes: ['Lemon Ricotta', 'Mission Fig', 'Hot Honey', 'Crunchy Walnut'],
    calories: 420,
    availableSizes: [
      { name: 'Full Toast Plate', ounces: '1 serving', priceDelta: 0 },
    ],
    temperatureOptions: ['Hot'],
  },
  {
    id: 'smoked-salmon-avocado-bagel',
    name: 'Smoked Salmon & Dill Cream Bagel',
    subtitle: 'Cold-Smoked Wild Sockeye',
    description: 'Everything sourdough bagel with herbed caper schmear, wild Alaskan smoked salmon, thinly sliced Persian cucumbers, pickled red onions, and fresh dill.',
    price: 11.50,
    category: 'bakery',
    tags: ['Protein Rich', 'Savory Kitchen'],
    imageUrl: 'https://images.unsplash.com/photo-1519869325930-281384150729?auto=format&fit=crop&w=800&q=80',
    tastingNotes: ['Wild Salmon', 'Herbed Cream Cheese', 'Pickled Caper', 'Everything Seed'],
    calories: 480,
    availableSizes: [
      { name: 'Standard Bagel Sandwich', ounces: '1 serving', priceDelta: 0 },
    ],
    temperatureOptions: ['Hot'],
  },

  // Whole Bean Bags
  {
    id: 'amber-reserve-espresso-beans',
    name: 'Amber Reserve Signature Espresso (340g)',
    subtitle: 'Medium Roast • Guatemala & Brazil Blend',
    description: 'Our award-winning flagship espresso blend roasted in small 12kg batches weekly. Designed for high sweetness, velvety mouthfeel, and a rich, persistent golden crema.',
    price: 19.50,
    category: 'beans',
    tags: ['Freshly Roasted', 'Whole Bean / Ground'],
    imageUrl: BEANS_PASTRY_IMAGE,
    roastLevel: 'Medium',
    origins: 'Antigua Guatemala (60%) & Cerrado Brazil (40%)',
    elevation: '1,400m - 1,800m',
    process: 'Washed & Natural Pulped',
    tastingNotes: ['Dark Chocolate Fondue', 'Toasted Hazelnut', 'Caramel Fudge'],
    popular: true,
    availableSizes: [
      { name: 'Standard Bag (340g / 12oz)', ounces: '12 oz', priceDelta: 0 },
      { name: 'Bulk Kilogram (1kg / 2.2lb)', ounces: '2.2 lb', priceDelta: 24.00 },
    ],
  },
  {
    id: 'ethiopia-heirloom-beans',
    name: 'Guji Highlands Heirloom Single Origin (340g)',
    subtitle: 'Light Roast • Natural Sun-Dried',
    description: 'Wild heirloom Arabica grown in the shade of native acacia forests in Guji. Bursting with ripe blueberry, purple lavender, and raw sugarcane sweetness.',
    price: 21.00,
    category: 'beans',
    tags: ['Single Origin', 'Direct Trade', 'Light Roast'],
    imageUrl: 'https://images.unsplash.com/photo-1587734195503-904fca47e0e9?auto=format&fit=crop&w=800&q=80',
    roastLevel: 'Light',
    origins: 'Guji Zone, Oromia, Ethiopia',
    elevation: '2,100m - 2,300m',
    process: 'Natural Sun-Dried on Raised African Beds',
    tastingNotes: ['Ripe Blueberry', 'Purple Lavender', 'Raw Sugarcane', 'Meyer Lemon'],
    popular: true,
    availableSizes: [
      { name: 'Standard Bag (340g / 12oz)', ounces: '12 oz', priceDelta: 0 },
      { name: 'Bulk Kilogram (1kg / 2.2lb)', ounces: '2.2 lb', priceDelta: 26.00 },
    ],
  },
  {
    id: 'sumatra-mandheling-dark-beans',
    name: 'Sumatra Blue Batak Vintage (340g)',
    subtitle: 'Dark Roast • Wet-Hulled (Giling Basah)',
    description: 'Deep, earthy, full-bodied dark roast with notes of cedar smoke, black molasses, baker\'s chocolate, and a low-acidity lingering finish.',
    price: 20.00,
    category: 'beans',
    tags: ['Dark Roast', 'Low Acidity'],
    imageUrl: 'https://images.unsplash.com/photo-1559525839-b184a4d698c7?auto=format&fit=crop&w=800&q=80',
    roastLevel: 'Dark',
    origins: 'Lake Toba, North Sumatra, Indonesia',
    elevation: '1,500m',
    process: 'Traditional Wet-Hulled',
    tastingNotes: ['Cedar Smoke', 'Dark Molasses', 'Baker\'s Chocolate', 'Nutmeg'],
    availableSizes: [
      { name: 'Standard Bag (340g / 12oz)', ounces: '12 oz', priceDelta: 0 },
      { name: 'Bulk Kilogram (1kg / 2.2lb)', ounces: '2.2 lb', priceDelta: 24.50 },
    ],
  }
];

export const MILK_OPTIONS = [
  { name: 'Whole Milk (Organic Farm)', priceDelta: 0 },
  { name: 'Oat Milk (Minor Figures)', priceDelta: 0.75 },
  { name: 'Almond Milk (Unsweetened)', priceDelta: 0.75 },
  { name: 'Coconut Cream Milk', priceDelta: 0.85 },
  { name: 'Skim / Non-Fat Milk', priceDelta: 0 },
  { name: 'No Milk / Black', priceDelta: 0 }
];

export const SYRUP_OPTIONS = [
  { name: 'None', priceDelta: 0 },
  { name: 'Madagascar Vanilla Bean', priceDelta: 0.65 },
  { name: 'Raw Honey Cinnamon Infusion', priceDelta: 0.75 },
  { name: 'Smoked Vermont Maple', priceDelta: 0.75 },
  { name: 'Salted Caramel Butterscotch', priceDelta: 0.65 },
  { name: 'Sugar-Free Hazelnut Cordial', priceDelta: 0.65 }
];

export const GRIND_OPTIONS: ('Whole Bean' | 'French Press' | 'Pour Over / Drip' | 'Espresso' | 'Aeropress')[] = [
  'Whole Bean',
  'Pour Over / Drip',
  'Espresso',
  'French Press',
  'Aeropress'
];

export const COFFEE_QUIZ_QUESTIONS = [
  {
    id: 'flavor',
    title: 'Flavors You Love',
    question: 'What aroma and taste notes are you in the mood for today?',
    options: [
      {
        label: 'Bright, Floral & Fruity',
        description: 'Jasmine flowers, crisp bergamot, ripe berries & citrus zest',
        iconName: 'Sparkles',
        flavorKey: 'floral'
      },
      {
        label: 'Rich, Chocolatey & Caramel',
        description: 'Velvety cocoa, roasted hazelnut, malted toffee & molasses',
        iconName: 'Coffee',
        flavorKey: 'chocolate'
      },
      {
        label: 'Sweet Spiced & Cozy',
        description: 'Cinnamon warmth, bourbon vanilla, smoked maple & cardamom',
        iconName: 'Flame',
        flavorKey: 'spice'
      },
      {
        label: 'Earthy, Bold & Deep',
        description: 'Heavy body, dark cocoa, cedarwood & smoky finish',
        iconName: 'Trees',
        flavorKey: 'earthy'
      }
    ]
  },
  {
    id: 'temperature',
    title: 'Temperature & Style',
    question: 'How do you prefer your drink served?',
    options: [
      {
        label: 'Steamy & Silky Hot',
        description: 'Warm ceramic cup with velvety microfoam or gentle filter brew',
        iconName: 'Sun',
        flavorKey: 'hot'
      },
      {
        label: 'Iced & Refreshing',
        description: 'Chilled over crystal ice or nitrogen-infused cold tap',
        iconName: 'IceCream',
        flavorKey: 'cold'
      },
      {
        label: 'Fresh Beans For Home Brewing',
        description: 'Whole bean or custom grind to make your morning ritual special',
        iconName: 'Package',
        flavorKey: 'beans'
      }
    ]
  },
  {
    id: 'intensity',
    title: 'Intensity & Milk Profile',
    question: 'What is your preferred caffeine punch and milk texture?',
    options: [
      {
        label: 'Pure Black & Unadulterated',
        description: 'Clean single origin pour-over or bold espresso straight up',
        iconName: 'Feather',
        flavorKey: 'black'
      },
      {
        label: 'Creamy Plant or Dairy Milk',
        description: 'Velvety oat, almond or farm whole milk latte with rich body',
        iconName: 'Heart',
        flavorKey: 'milk'
      },
      {
        label: 'Mild, Refreshing & Sparkling',
        description: 'Botanical cascara spritz, tonic, or soothing matcha tea',
        iconName: 'GlassWater',
        flavorKey: 'tea'
      }
    ]
  }
];

export const CAFE_HOURS = [
  { day: 'Monday – Friday', hours: '6:30 AM – 7:30 PM', kitchen: 'Kitchen open until 3:00 PM' },
  { day: 'Saturday', hours: '7:00 AM – 8:30 PM', kitchen: 'Weekend Brunch until 4:00 PM' },
  { day: 'Sunday', hours: '7:30 AM – 7:00 PM', kitchen: 'Weekend Brunch until 4:00 PM' },
];

export const REVIEWS = [
  {
    id: 1,
    author: 'Elena Rostova',
    role: 'Local Specialty Coffee Enthusiast',
    rating: 5,
    date: '2 days ago',
    comment: 'The Honey Cinnamon Cortado is truly something out of this world. You can taste the quality of their direct-trade Ethiopian beans. The light-filled seating area makes working here in the morning an absolute joy.',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80'
  },
  {
    id: 2,
    author: 'Marcus Vance',
    role: 'Architecture & Design Lead',
    rating: 5,
    date: '1 week ago',
    comment: 'The Kyoto slow drip is the smoothest cold brew I have tasted anywhere in the city. Paired with a warm Cardamom Cruffin fresh from the 6 AM oven bake, it is unbeatable. Staff is knowledgeable and genuinely warm.',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80'
  },
  {
    id: 3,
    author: 'Dr. Sarah Chen',
    role: 'Neighborhood Regular',
    rating: 5,
    date: '2 weeks ago',
    comment: 'I pick up their Guji Heirloom whole bean bag every fortnight for my V60 at home. The tasting notes on the bag are accurate to a tee. Their commitment to zero-waste cups and fair farm pricing is exemplary.',
    avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=200&q=80'
  }
];

export const CAFE_FEATURES = [
  {
    icon: 'Sparkles',
    title: 'Micro-Batch Roasting',
    description: 'We roast small 12kg drums 3x weekly on our low-emission roaster, locking in peak aromatics.'
  },
  {
    icon: 'ShieldCheck',
    title: '100% Direct Trade',
    description: 'Direct relationships with multi-generational coffee estates in Ethiopia, Colombia, and Costa Rica.'
  },
  {
    icon: 'HeartHandshake',
    title: 'Daily Hearth Bakery',
    description: 'All viennoiserie, cruffins, and sourdough breads are shaped and baked on-site at sunrise.'
  },
  {
    icon: 'Leaf',
    title: 'Zero-Waste Mindset',
    description: '100% certified compostable plant-fiber cups, chaff donation to local gardens, and oat milk tap systems.'
  }
];
