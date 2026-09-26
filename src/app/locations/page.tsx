import type { Metadata } from 'next';
import { cities, getAllStates } from '@/lib/cities';
import LocationsClient from './LocationsClient';

export const metadata: Metadata = {
  title: 'Indian Locations Directory | Spices Across 1,000+ Indian Cities | True Taste',
  description:
    'Explore True Taste’s Indian locations directory covering 1,000+ Indian cities across Tier 1, Tier 2, and Tier 3. Discover premium, unadulterated spices for traditional and modern kitchens across India.',
  alternates: {
    canonical: 'https://www.truetaste.in/locations',
  },
  openGraph: {
    title: 'Indian Locations Directory | True Taste Spices',
    description:
      'Explore pure Indian spices across 1,000+ Indian cities. Stone-ground Red Chilli, Turmeric, Dhaniya, Jeera, and artisanal Garam Masala.',
    url: 'https://www.truetaste.in/locations',
    type: 'website',
  },
};

export default function LocationsPage() {
  const states = getAllStates();

  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: 'Home',
        item: 'https://www.truetaste.in',
      },
      {
        '@type': 'ListItem',
        position: 2,
        name: 'Indian Locations',
        item: 'https://www.truetaste.in/locations',
      },
    ],
  };

  const directorySchema = {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    name: 'True Taste Indian Locations Directory',
    description: 'Master directory of over 1,000 Indian cities and towns where True Taste spices are discovered.',
    url: 'https://www.truetaste.in/locations',
    publisher: {
      '@type': 'Organization',
      name: 'True Taste',
      url: 'https://www.truetaste.in',
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(directorySchema) }}
      />
      <LocationsClient cities={cities} states={states} />
    </>
  );
}
