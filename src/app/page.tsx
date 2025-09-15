import Image from 'next/image';
import Link from 'next/link';

import { Button } from '@/components/ui/button';
import { SiteHeader } from '@/components/common/site-header';
import { SiteFooter } from '@/components/common/site-footer';
import { getFeaturedArtisans, getFeaturedProducts } from '@/lib/data';
import { ProductCard } from '@/components/product-card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { ArrowRight } from 'lucide-react';

export default function Home() {
  const featuredProducts = getFeaturedProducts();
  const featuredArtisans = getFeaturedArtisans();

  return (
    <>
      <SiteHeader />
      <main className="flex-1">
        <section className="relative w-full py-20 md:py-32 lg:py-40 bg-card">
          <Image
            src="https://picsum.photos/seed/1/1800/1000"
            alt="Handmade pottery"
            data-ai-hint="handmade pottery"
            fill
            className="object-cover object-center opacity-20"
          />
          <div className="container mx-auto px-4 md:px-6 relative z-10 text-center">
            <div className="max-w-3xl mx-auto">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-headline font-bold mb-4 text-foreground">
                Discover the Art of Handmade
              </h1>
              <p className="text-lg md:text-xl text-muted-foreground mb-8">
                Explore a curated collection of unique goods from talented artisans around the world.
              </p>
              <Button asChild size="lg">
                <Link href="/products">
                  Explore Creations
                  <ArrowRight className="ml-2" />
                </Link>
              </Button>
            </div>
          </div>
        </section>

        <section className="py-16 md:py-24">
          <div className="container mx-auto px-4 md:px-6">
            <div className="flex justify-between items-center mb-8">
                <h2 className="text-3xl font-headline font-bold">Featured Products</h2>
                 <Button asChild variant="link" className="text-primary">
                    <Link href="/products">View All <ArrowRight className="ml-2 h-4 w-4" /></Link>
                </Button>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
              {featuredProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          </div>
        </section>

        <section className="bg-card py-16 md:py-24">
          <div className="container mx-auto px-4 md:px-6">
            <div className="flex justify-between items-center mb-8">
                <h2 className="text-3xl font-headline font-bold">Meet Our Artisans</h2>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {featuredArtisans.map((artisan) => (
                <Link href={`/artisans/${artisan.id}`} key={artisan.id}>
                    <div className="group flex items-center gap-4 bg-background p-4 rounded-lg shadow-sm hover:shadow-md transition-shadow duration-300">
                    <Avatar className="h-16 w-16">
                        <AvatarImage src={artisan.avatarUrl} alt={artisan.name} data-ai-hint={artisan.avatarHint} />
                        <AvatarFallback>{artisan.name.charAt(0)}</AvatarFallback>
                    </Avatar>
                    <div>
                        <h3 className="font-bold text-lg font-headline">{artisan.name}</h3>
                        <p className="text-sm text-muted-foreground line-clamp-2">{artisan.bio}</p>
                    </div>
                    <ArrowRight className="ml-auto text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity" />
                    </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      </main>
      <SiteFooter />
    </>
  );
}
