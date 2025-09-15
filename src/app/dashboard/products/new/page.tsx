import { PageHeader } from '@/components/common/page-header';
import { ProductForm } from '../components/product-form';
import { Card, CardContent } from '@/components/ui/card';

export default function NewProductPage() {
  return (
    <div className="flex flex-col gap-8">
      <PageHeader
        title="Add a New Product"
        description="Fill in the details below to add a new item to your shop."
      />
      <Card>
        <CardContent className="pt-6">
            <ProductForm />
        </CardContent>
      </Card>
    </div>
  );
}
