import type { Metadata } from 'next';
import OurStoryClient from './OurStoryClient';

export const metadata: Metadata = {
  title: 'Our Story',
  description:
    'Rooted in flavor. True Taste brings you the finest quality spices, carefully selected and hygienically processed to deliver pure spices and true flavors in every meal.',
};

export default function OurStoryPage() {
  return <OurStoryClient />;
}
