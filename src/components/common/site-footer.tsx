import { Logo } from './logo';

export function SiteFooter() {
  const currentYear = new Date().getFullYear();
  return (
    <footer className="bg-card border-t">
      <div className="container mx-auto flex items-center justify-between px-4 py-6 md:px-6">
        <Logo />
        <p className="text-sm text-muted-foreground">
          &copy; {currentYear} ArtisanConnect. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
