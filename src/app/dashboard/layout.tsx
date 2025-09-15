import { SidebarProvider, Sidebar, SidebarInset, SidebarTrigger } from "@/components/ui/sidebar";
import { DashboardNav } from "./components/dashboard-nav";
import { Logo } from "@/components/common/logo";
import { UserNav } from "@/components/user-nav";
import Link from "next/link";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // Mock user for dashboard context
  const user = { name: 'Elara Vance', email: 'elara@example.com' };

  return (
    <SidebarProvider>
      <Sidebar>
        <DashboardNav />
      </Sidebar>
      <SidebarInset className="flex flex-col">
        <header className="sticky top-0 z-10 flex h-16 items-center gap-4 border-b bg-background px-4 md:px-6">
            <SidebarTrigger className="md:hidden" />
            <div className="hidden md:block">
                <Link href="/">
                    <Logo />
                </Link>
            </div>
            <div className="flex w-full items-center gap-4 md:ml-auto md:gap-2 lg:gap-4">
                <div className="ml-auto flex-1 sm:flex-initial">
                   {/* Can add a search bar here later */}
                </div>
                <UserNav user={user} />
            </div>
        </header>
        <main className="flex-1 p-4 md:p-6">
            {children}
        </main>
      </SidebarInset>
    </SidebarProvider>
  );
}
