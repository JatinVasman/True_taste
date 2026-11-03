import type { Metadata } from 'next';
import ProductsPageClient from './ProductsPageClient';

export const metadata: Metadata = {
  title: 'The Spice Collection',
  description:
    'Explore the Delhi Wally spice collection — Red Chilli Powder, Turmeric Powder, Dhaniya Powder, Jeera Whole, and Garam Masala Powder. Available in 50g, 100g, and 200g.',
};

export default function ProductsPage() {
  return <ProductsPageClient />;
}
