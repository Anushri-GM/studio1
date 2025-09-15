import { getArtisanById, getProducts } from '@/lib/data';
import { notFound } from 'next/navigation';
import { SiteHeader } from '@/components/common/site-header';
import { SiteFooter } from '@/components/common/site-footer';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Instagram, Twitter } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { ProductCard } from '@/components/product-card';
import { PageHeader } from '@/components/common/page-header';

// Helper icon component since 'Etsy' is not in lucide-react
function EtsyIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M12 2a10 10 0 100 20 10 10 0 000-20z" />
      <text
        x="50%"
        y="50%"
        dominantBaseline="middle"
        textAnchor="middle"
        fontSize="12"
        fill="currentColor"
        stroke="none"
      >
        E
      </text>
    </svg>
  );
}

export default function ArtisanProfilePage({ params }: { params: { id: string } }) {
  const artisan = getArtisanById(params.id);

  if (!artisan) {
    notFound();
  }

  const artisanProducts = getProducts(artisan.id);

  return (
    <>
      <SiteHeader />
      <main className="container mx-auto px-4 md:px-6 py-12 md:py-16">
        <section className="flex flex-col md:flex-row items-center gap-8 md:gap-12 mb-12">
          <Avatar className="h-32 w-32 md:h-40 md:w-40 border-4 border-card">
            <AvatarImage src={artisan.avatarUrl} alt={artisan.name} data-ai-hint={artisan.avatarHint}/>
            <AvatarFallback>{artisan.name.charAt(0)}</AvatarFallback>
          </Avatar>
          <div className="text-center md:text-left">
            <h1 className="text-4xl font-bold font-headline">{artisan.name}</h1>
            <p className="mt-2 text-lg text-muted-foreground max-w-2xl">{artisan.bio}</p>
            <div className="mt-4 flex justify-center md:justify-start gap-2">
              {artisan.socials.instagram && (
                <Button asChild variant="outline" size="icon">
                  <Link href={artisan.socials.instagram} target="_blank">
                    <Instagram className="h-4 w-4" />
                    <span className="sr-only">Instagram</span>
                  </Link>
                </Button>
              )}
              {artisan.socials.twitter && (
                <Button asChild variant="outline" size="icon">
                  <Link href={artisan.socials.twitter} target="_blank">
                    <Twitter className="h-4 w-4" />
                     <span className="sr-only">Twitter</span>
                  </Link>
                </Button>
              )}
               {artisan.socials.etsy && (
                <Button asChild variant="outline" size="icon">
                  <Link href={artisan.socials.etsy} target="_blank">
                    <EtsyIcon className="h-4 w-4" />
                    <span className="sr-only">Etsy</span>
                  </Link>
                </Button>
              )}
            </div>
          </div>
        </section>

        <section>
          <PageHeader title={`Creations by ${artisan.name}`} />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {artisanProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </section>
      </main>
      <SiteFooter />
    </>
  );
}
