import { Gem, Palette, Watch, Hand, Home, Shirt } from 'lucide-react';
import type { Artisan, Category, Product } from './types';
import { PlaceHolderImages } from './placeholder-images';

const getImage = (id: string) => {
  const image = PlaceHolderImages.find((img) => img.id === id);
  if (!image) {
    return { imageUrl: 'https://placehold.co/600x400', imageHint: 'placeholder' };
  }
  return { imageUrl: image.imageUrl, imageHint: image.imageHint };
};

export const artisans: Artisan[] = [
  {
    id: 'elara-vance',
    name: 'Elara Vance',
    ...getImage('elara-vance'),
    bio: 'Elara is a potter based in the countryside, drawing inspiration from the natural world to create functional and beautiful ceramic pieces.',
    socials: {
      instagram: 'https://instagram.com',
      etsy: 'https://etsy.com',
    },
  },
  {
    id: 'marcus-finch',
    name: 'Marcus Finch',
    ...getImage('marcus-finch'),
    bio: 'A third-generation leatherworker, Marcus combines traditional techniques with modern designs to craft durable and timeless leather goods.',
    socials: {
      instagram: 'https://instagram.com',
      twitter: 'https://twitter.com',
    },
  },
  {
    id: 'seraphina-moon',
    name: 'Seraphina Moon',
    ...getImage('seraphina-moon'),
    bio: 'Seraphina is a jewelry designer who works with silver and natural gemstones to create delicate, celestial-inspired pieces.',
    socials: {
      etsy: 'https://etsy.com',
    },
  },
    {
    id: 'liam-rhodes',
    name: 'Liam Rhodes',
    ...getImage('liam-rhodes'),
    bio: 'Liam is a woodworker who turns reclaimed wood into stunning bowls, utensils, and small furniture, celebrating the history of each piece of timber.',
    socials: {
      instagram: 'https://instagram.com',
    },
  },
];

export const categories: Category[] = [
  { id: 'ceramics', name: 'Ceramics', icon: Hand },
  { id: 'jewelry', name: 'Jewelry', icon: Gem },
  { id: 'woodwork', name: 'Woodwork', icon: Home },
  { id: 'textiles', name: 'Textiles', icon: Shirt },
  { id: 'art-prints', name: 'Art & Prints', icon: Palette },
  { id: 'accessories', name: 'Accessories', icon: Watch },
];

export const products: Product[] = [
  {
    id: '1',
    name: 'Rustic Ceramic Mug',
    description: 'Start your mornings with this beautiful, hand-thrown ceramic mug. Its rustic charm and comfortable handle make it a joy to use.',
    price: 35.0,
    ...getImage('ceramic-mug'),
    category: 'ceramics',
    artisanId: 'elara-vance',
    artisanName: 'Elara Vance',
  },
  {
    id: '2',
    name: 'Minimalist Leather Wallet',
    description: 'A sleek and simple wallet, handcrafted from full-grain leather that will develop a beautiful patina over time. Perfect for the modern minimalist.',
    price: 75.0,
    ...getImage('leather-wallet'),
    category: 'accessories',
    artisanId: 'marcus-finch',
    artisanName: 'Marcus Finch',
  },
  {
    id: '3',
    name: 'Chunky Knit Scarf',
    description: 'Stay cozy and stylish with this incredibly soft, hand-knitted chunky scarf. Made from 100% merino wool.',
    price: 90.0,
    ...getImage('knitted-scarf'),
    category: 'textiles',
    artisanId: 'seraphina-moon',
    artisanName: 'Seraphina Moon',
  },
  {
    id: '4',
    name: 'Hand-Carved Serving Bowl',
    description: 'This elegant serving bowl is carved from a single piece of maple wood, perfect for salads, fruits, or as a stunning centerpiece.',
    price: 120.0,
    ...getImage('wooden-bowl'),
    category: 'woodwork',
    artisanId: 'liam-rhodes',
    artisanName: 'Liam Rhodes',
  },
  {
    id: '5',
    name: 'Moonstone Silver Necklace',
    description: 'A delicate sterling silver necklace featuring a mesmerizing moonstone pendant. It catches the light beautifully and adds a touch of magic to any outfit.',
    price: 110.0,
    ...getImage('silver-necklace'),
    category: 'jewelry',
    artisanId: 'seraphina-moon',
    artisanName: 'Seraphina Moon',
  },
  {
    id: '6',
    name: 'Botanical Print Tote Bag',
    description: 'Carry your essentials in this durable canvas tote bag, featuring a hand-printed botanical design. Both practical and beautiful.',
    price: 45.0,
    ...getImage('canvas-tote'),
    category: 'textiles',
    artisanId: 'elara-vance',
    artisanName: 'Elara Vance',
  },
  {
    id: '7',
    name: 'Lavender & Oatmeal Soap',
    description: 'A soothing, all-natural soap bar made with lavender essential oil and colloidal oatmeal. Gently cleanses and moisturizes the skin.',
    price: 12.0,
    ...getImage('handmade-soap'),
    category: 'accessories',
    artisanId: 'elara-vance',
    artisanName: 'Elara Vance',
  },
  {
    id: '8',
    name: 'Misty Mountains Art Print',
    description: 'Bring the serenity of the mountains into your home with this high-quality giclée print of an original watercolor painting.',
    price: 50.0,
    ...getImage('art-print'),
    category: 'art-prints',
    artisanId: 'marcus-finch',
    artisanName: 'Marcus Finch',
  },
];

export function getProducts(artisanId?: string, categoryId?: string): Product[] {
    let filteredProducts = products;
    if(artisanId){
        filteredProducts = filteredProducts.filter(p => p.artisanId === artisanId);
    }
    if(categoryId){
        filteredProducts = filteredProducts.filter(p => p.category === categoryId);
    }
    return filteredProducts;
}

export function getProductById(id: string): Product | undefined {
  return products.find((p) => p.id === id);
}

export function getFeaturedProducts(): Product[] {
  return products.slice(0, 4);
}

export function getArtisanById(id: string): Artisan | undefined {
    return artisans.find(a => a.id === id);
}

export function getFeaturedArtisans(): Artisan[] {
    return artisans.slice(0, 3);
}

export function getCategoryById(id: string): Category | undefined {
    return categories.find(c => c.id === id);
}
