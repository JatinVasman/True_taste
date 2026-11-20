import type { Metadata } from 'next';
import OurStoryClient from './OurStoryClient';

export const metadata: Metadata = {
  title: 'Our Story',
  description:
    'Rooted in flavor. Delhi Wally brings you the finest quality spices, carefully selected and hygienically processed to deliver pure spices and authentic flavors in every meal.',
};

export default function OurStoryPage() {
  return <OurStoryClient />;
}
