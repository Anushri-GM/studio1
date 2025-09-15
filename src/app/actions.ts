'use server';

import { generateCuratedCollections } from '@/ai/flows/generate-curated-collections';
import { generateProductDescription } from '@/ai/flows/generate-product-description';
import { getProductById } from './lib/data';
import type { CuratedCollection } from './lib/types';

export async function generateDescriptionAction(productName: string, keywords: string) {
  try {
    const result = await generateProductDescription({ productName, keywords });
    return result.description;
  } catch (error) {
    console.error(error);
    return 'Error generating description.';
  }
}

export async function generateCuratedCollectionAction({ trend }: { trend: string }): Promise<CuratedCollection | null> {
    try {
        const result = await generateCuratedCollections({ trend, userPreferences: '' });
        const products = result.productIds
        .map(id => getProductById(id.toString()))
        .filter((p): p is NonNullable<typeof p> => p !== undefined)
        .slice(0, 4); // Limit to 4 for display

        return {
            ...result,
            products,
        };
    } catch (error) {
        console.error('Error generating collection:', error);
        return null;
    }
}
