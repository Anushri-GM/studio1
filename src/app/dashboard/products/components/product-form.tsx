'use client';

import { useForm, useWatch } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { categories } from '@/lib/data';
import { Wand2 } from 'lucide-react';
import { useState, useTransition } from 'react';
import { generateDescriptionAction } from '@/app/actions';
import { useToast } from '@/hooks/use-toast';

const productFormSchema = z.object({
  name: z.string().min(2, {
    message: 'Product name must be at least 2 characters.',
  }),
  keywords: z.string().optional(),
  description: z.string().min(10, {
    message: 'Description must be at least 10 characters.',
  }),
  price: z.coerce.number().min(0.01, {
    message: 'Price must be a positive number.',
  }),
  category: z.string({
    required_error: 'Please select a category.',
  }),
});

export function ProductForm() {
  const [isPending, startTransition] = useTransition();
  const [isGenerating, setIsGenerating] = useState(false);
  const { toast } = useToast();

  const form = useForm<z.infer<typeof productFormSchema>>({
    resolver: zodResolver(productFormSchema),
    defaultValues: {
      name: '',
      keywords: '',
      description: '',
      price: 0,
    },
  });
  
  const watchedName = useWatch({ control: form.control, name: 'name' });
  const watchedKeywords = useWatch({ control: form.control, name: 'keywords' });

  function onSubmit(values: z.infer<typeof productFormSchema>) {
    console.log(values);
    toast({
        title: "Product Submitted!",
        description: "Your new product has been saved.",
    });
  }
  
  const handleGenerateDescription = () => {
    if (!watchedName) {
        toast({
            title: "Name is required",
            description: "Please enter a product name before generating a description.",
            variant: "destructive"
        })
        return;
    }
    
    setIsGenerating(true);
    startTransition(async () => {
        const description = await generateDescriptionAction(watchedName, watchedKeywords || '');
        form.setValue('description', description);
        setIsGenerating(false);
        toast({
            title: "Description Generated!",
            description: "The AI-powered description has been added.",
        })
    });
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <div className="grid md:grid-cols-2 gap-8">
            <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
                <FormItem>
                <FormLabel>Product Name</FormLabel>
                <FormControl>
                    <Input placeholder="e.g. Hand-thrown Ceramic Mug" {...field} />
                </FormControl>
                <FormMessage />
                </FormItem>
            )}
            />
            <FormField
            control={form.control}
            name="price"
            render={({ field }) => (
                <FormItem>
                <FormLabel>Price</FormLabel>
                <FormControl>
                    <Input type="number" placeholder="0.00" {...field} />
                </FormControl>
                <FormMessage />
                </FormItem>
            )}
            />
        </div>
        
        <FormField
          control={form.control}
          name="keywords"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Keywords</FormLabel>
              <FormControl>
                <div className="relative">
                  <Input placeholder="e.g. rustic, coffee, handmade, pottery" {...field} />
                  <Button type="button" size="sm" onClick={handleGenerateDescription} disabled={isGenerating || !watchedName} className="absolute right-1 top-1/2 -translate-y-1/2 h-7">
                    <Wand2 className="mr-2 h-4 w-4" />
                    {isGenerating ? 'Generating...' : 'Generate with AI'}
                  </Button>
                </div>
              </FormControl>
               <FormDescription>
                Provide keywords to help generate a compelling description.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        
        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Description</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Tell us a little bit about your product"
                  className="resize-none"
                  rows={6}
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="category"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Category</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select a category" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {categories.map((category) => (
                    <SelectItem key={category.id} value={category.id}>
                      {category.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />
        
        <div className="flex justify-end gap-2">
            <Button type="button" variant="outline">Cancel</Button>
            <Button type="submit" disabled={isPending}>Save Product</Button>
        </div>
      </form>
    </Form>
  );
}
