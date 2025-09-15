import { Button } from '@/components/ui/button';
import { PageHeader } from '@/components/common/page-header';
import Link from 'next/link';
import { PlusCircle } from 'lucide-react';
import { ProductTable } from './components/product-table';

export default function DashboardProductsPage() {
  return (
    <div className="flex flex-col gap-8">
      <div className="flex items-center justify-between">
        <PageHeader title="Products" description="Manage your handmade goods." />
        <Button asChild>
          <Link href="/dashboard/products/new">
            <PlusCircle className="mr-2 h-4 w-4" />
            Add Product
          </Link>
        </Button>
      </div>
      <ProductTable />
    </div>
  );
}
