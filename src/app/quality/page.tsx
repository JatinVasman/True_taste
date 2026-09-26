import type { Metadata } from 'next';
import QualityClient from './QualityClient';

export const metadata: Metadata = {
  title: 'Quality',
  description:
    'Quality you can see. Flavor you can taste. True Taste spices are 100% natural, naturally sourced, free from additives, and packed in recyclable packaging. FSSAI Lic. No. 23326003003695.',
};

export default function QualityPage() {
  return <QualityClient />;
}
