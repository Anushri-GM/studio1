import { Logo } from '@/components/common/logo';
import Link from 'next/link';

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-background px-4">
      <div className="w-full max-w-sm">
        <div className="mb-6 flex justify-center">
            <Link href="/">
                <Logo />
            </Link>
        </div>
        {children}
      </div>
    </div>
  );
}
