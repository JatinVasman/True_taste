// Product data — sourced from verified packaging reference materials

export interface Product {
  id: string;
  slug: string;
  name: string;
  category: 'ground' | 'whole' | 'blend';
  tagline: string;
  description: string;
  ingredient: string;
  spiceColor: string;
  accentColor: string;
  bgGradient: string;
  heroImage: string;
  packImage50g: string;
  packImage100g: string;
  packImage200g: string;
  wholeSpices?: string[];
  storageNote: string;
  packagingTagline: string;
  pricing?: { '50g': number; '100g': number; '200g': number };
}

export const products: Product[] = [
  {
    id: '1',
    slug: 'red-chilli-powder',
    name: 'Red Chilli Powder',
    category: 'ground',
    tagline: 'Pure Goodness in Every Pinch',
    description:
      'Vibrant and aromatic, our Red Chilli Powder is stone-ground from the finest whole red chillies. Its deep crimson hue and rich heat add character to everything from curries to marinades.',
    ingredient: '100% Pure Red Chilli',
    spiceColor: '#C0392B',
    accentColor: '#E74C3C',
    bgGradient: 'from-red-50 to-amber-50',
    heroImage: '/images/red-chilli.jpg',
    packImage50g: '/images/pack-50g-1.jpg',
    packImage100g: '/images/pack-100g-1.jpg',
    packImage200g: '/images/pack-200g-1.jpg',
    storageNote: 'Store in a cool, dry place away from direct sunlight. Keep the container tightly closed after every use.',
    packagingTagline: 'Pure Spices, True Love',
    pricing: { '50g': 48, '100g': 96, '200g': 186 },
  },
  {
    id: '2',
    slug: 'turmeric-powder',
    name: 'Turmeric Powder',
    category: 'ground',
    tagline: 'Pure Goodness in Every Pinch',
    description:
      'Sun-kissed and golden, our Turmeric Powder is ground from premium whole turmeric roots. Its warm, earthy aroma and distinctive colour make it an essential cornerstone of Indian cooking.',
    ingredient: '100% Pure Turmeric',
    spiceColor: '#F39C12',
    accentColor: '#F1C40F',
    bgGradient: 'from-yellow-50 to-amber-50',
    heroImage: '/images/turmeric.jpg',
    packImage50g: '/images/pack-50g-2.jpg',
    packImage100g: '/images/pack-100g-2.jpg',
    packImage200g: '/images/pack-200g-2.jpg',
    storageNote: 'Store in a cool, dry place away from direct sunlight. Keep the container tightly closed after every use.',
    packagingTagline: 'Pure Spices, True Love',
    pricing: { '50g': 47, '100g': 94, '200g': 189 },
  },
  {
    id: '3',
    slug: 'dhaniya-powder',
    name: 'Dhaniya Powder',
    category: 'ground',
    tagline: 'Pure Goodness in Every Pinch',
    description:
      'Warm, earthy and subtly citrusy — our Dhaniya Powder is milled from whole coriander seeds. It forms the aromatic backbone of countless Indian recipes, delivering layered flavour with every pinch.',
    ingredient: '100% Pure Dhaniya',
    spiceColor: '#7D6608',
    accentColor: '#9A7D0A',
    bgGradient: 'from-green-50 to-lime-50',
    heroImage: '/images/dhaniya.jpg',
    packImage50g: '/images/pack-50g-3.jpg',
    packImage100g: '/images/pack-100g-3.jpg',
    packImage200g: '/images/pack-200g-3.jpg',
    storageNote: 'Store in a cool, dry place away from direct sunlight. Keep the container tightly closed after every use.',
    packagingTagline: 'Pure Spices, True Love',
    pricing: { '50g': 47, '100g': 94, '200g': 189 },
  },
  {
    id: '4',
    slug: 'jeera-whole',
    name: 'Jeera Whole',
    category: 'whole',
    tagline: 'Pure Goodness in Every Pinch',
    description:
      'Slender and intensely fragrant, our Whole Jeera (cumin seeds) are handpicked for uniform size and maximum aroma. Use whole for tempering or coarsely grind to unlock their warm, nutty depth.',
    ingredient: '100% Pure Jeera',
    spiceColor: '#6E2F1A',
    accentColor: '#873B20',
    bgGradient: 'from-stone-50 to-amber-50',
    heroImage: '/images/jeera.jpg',
    packImage50g: '/images/pack-50g-4.jpg',
    packImage100g: '/images/pack-100g-4.jpg',
    packImage200g: '/images/pack-200g-4.jpg',
    storageNote: 'Store in a cool, dry place away from direct sunlight. Keep the container tightly closed after every use.',
    packagingTagline: 'Pure Spices, True Love',
    pricing: { '50g': 48, '100g': 96, '200g': 186 },
  },
  {
    id: '5',
    slug: 'garam-masala-powder',
    name: 'Garam Masala Powder',
    category: 'blend',
    tagline: 'Pure Goodness in Every Pinch',
    description:
      'A masterfully crafted blend of whole spices — cinnamon, cardamom, cloves, star anise and more — slow-roasted and ground to perfection. This is the finishing touch that elevates every Indian dish.',
    ingredient: '100% Pure Garam Masala',
    spiceColor: '#784212',
    accentColor: '#935116',
    bgGradient: 'from-amber-50 to-orange-50',
    heroImage: '/images/garam-masala.jpg',
    packImage50g: '/images/pack-50g-5.jpg',
    packImage100g: '/images/pack-100g-5.jpg',
    packImage200g: '/images/pack-200g-5.jpg',
    wholeSpices: ['Cinnamon', 'Cardamom', 'Star Anise', 'Cloves', 'Black Pepper'],
    storageNote: 'Store in a cool, dry place away from direct sunlight. Keep the container tightly closed after every use.',
    packagingTagline: 'Pure Spices, True Love',
  },
];

export function getProductBySlug(slug: string): Product | undefined {
  return products.find((p) => p.slug === slug);
}

export type ProductCategory = 'all' | 'ground' | 'whole' | 'blend';
