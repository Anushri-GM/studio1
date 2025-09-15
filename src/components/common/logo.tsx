import { cn } from '@/lib/utils';
import { Palette } from 'lucide-react';

export function Logo({ className }: { className?: string }) {
  return (
    <div className={cn('flex items-center gap-2', className)}>
      <Palette className="h-6 w-6 text-primary" />
      <span className="text-xl font-bold font-headline tracking-tighter text-foreground">
        ArtisanConnect
      </span>
    </div>
  );
}
