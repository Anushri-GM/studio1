'use client';

import { useForm } from 'react-hook-form';
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
import { useToast } from '@/hooks/use-toast';
import { getArtisanById } from '@/lib/data';

const settingsFormSchema = z.object({
  bio: z.string().max(300, 'Bio cannot exceed 300 characters.').min(10, 'Bio must be at least 10 characters.'),
  instagram: z.string().url().or(z.literal('')).optional(),
  twitter: z.string().url().or(z.literal('')).optional(),
  etsy: z.string().url().or(z.literal('')).optional(),
});

export function SettingsForm() {
  const { toast } = useToast();
  // In a real app, get the artisan data based on the logged-in user
  const artisan = getArtisanById('elara-vance');

  const form = useForm<z.infer<typeof settingsFormSchema>>({
    resolver: zodResolver(settingsFormSchema),
    defaultValues: {
      bio: artisan?.bio || '',
      instagram: artisan?.socials.instagram || '',
      twitter: artisan?.socials.twitter || '',
      etsy: artisan?.socials.etsy || '',
    },
  });

  function onSubmit(values: z.infer<typeof settingsFormSchema>) {
    console.log(values);
    toast({
      title: 'Settings Saved',
      description: 'Your profile information has been updated.',
    });
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="bio"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Artisan Bio</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Tell your story..."
                  className="resize-none"
                  rows={5}
                  {...field}
                />
              </FormControl>
              <FormDescription>
                This will be displayed on your public artisan profile.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <div>
            <h3 className="text-lg font-medium">Social Media Links</h3>
            <p className="text-sm text-muted-foreground">Add links to your social media profiles.</p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
            <FormField
            control={form.control}
            name="instagram"
            render={({ field }) => (
                <FormItem>
                <FormLabel>Instagram</FormLabel>
                <FormControl>
                    <Input placeholder="https://instagram.com/your-username" {...field} />
                </FormControl>
                <FormMessage />
                </FormItem>
            )}
            />
            <FormField
            control={form.control}
            name="twitter"
            render={({ field }) => (
                <FormItem>
                <FormLabel>Twitter / X</FormLabel>
                <FormControl>
                    <Input placeholder="https://twitter.com/your-username" {...field} />
                </FormControl>
                <FormMessage />
                </FormItem>
            )}
            />
            <FormField
            control={form.control}
            name="etsy"
            render={({ field }) => (
                <FormItem>
                <FormLabel>Etsy Shop</FormLabel>
                <FormControl>
                    <Input placeholder="https://etsy.com/shop/your-shop" {...field} />
                </FormControl>
                <FormMessage />
                </FormItem>
            )}
            />
        </div>
        
        <div className="flex justify-end">
            <Button type="submit">Save Changes</Button>
        </div>
      </form>
    </Form>
  );
}
