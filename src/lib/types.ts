import type { LucideIcon } from 'lucide-react';

export type Product = {
  id: string;
  name: string;
  description: string;
  price: number;
  imageUrl: string;
  imageHint: string;
  category: string;
  artisanId: string;
  artisanName: string;
};

export type Artisan = {
  id: string;
  name: string;
  avatarUrl: string;
  avatarHint: string;
  bio: string;
  socials: {
    instagram?: string;
    etsy?: string;
    twitter?: string;
  };
};

export type Category = {
  id: string;
  name: string;
  icon: LucideIcon;
};

export type CuratedCollection = {
  collectionName: string;
  products: Product[];
  description: string;
};
