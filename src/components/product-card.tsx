import Image from 'next/image';
import Link from 'next/link';
import type { Product } from '@/lib/types';
import { Card, CardContent, CardFooter, CardHeader } from './ui/card';
import { Button } from './ui/button';

type ProductCardProps = {
  product: Product;
};

export function ProductCard({ product }: ProductCardProps) {
  return (
    <Card className="overflow-hidden group flex flex-col">
      <CardHeader className="p-0">
        <div className="aspect-square overflow-hidden relative">
          <Image
            src={product.imageUrl}
            alt={product.name}
            data-ai-hint={product.imageHint}
            fill
            className="object-cover transition-transform duration-300 group-hover:scale-105"
          />
        </div>
      </CardHeader>
      <CardContent className="p-4 flex-1 flex flex-col">
        <h3 className="text-lg font-bold font-headline leading-tight">
          {product.name}
        </h3>
        <p className="text-sm text-muted-foreground mt-1">
          by{' '}
          <Link href={`/artisans/${product.artisanId}`} className="hover:underline text-primary/80">
            {product.artisanName}
          </Link>
        </p>
        <p className="text-lg font-semibold mt-auto pt-2">
          ${product.price.toFixed(2)}
        </p>
      </CardContent>
      <CardFooter className="p-4 pt-0">
          <Button className='w-full' variant='outline'>View Product</Button>
      </CardFooter>
    </Card>
  );
}
