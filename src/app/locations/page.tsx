import type { Metadata } from 'next';
import { cities, getAllStates } from '@/lib/cities';
import LocationsClient from './LocationsClient';

export const metadata: Metadata = {
  title: 'Indian Locations Directory | Spices Across 1,000+ Indian Cities | Delhi Wally',
  description:
    'Explore Delhi Wally’s Indian locations directory covering 1,000+ Indian cities across Tier 1, Tier 2, and Tier 3. Discover premium, unadulterated spices for traditional and modern kitchens across India.',
  alternates: {
    canonical: 'https://truetaste.in/locations',
  },
  openGraph: {
    title: 'Indian Locations Directory | Delhi Wally Spices',
    description:
      'Explore pure Indian spices across 1,000+ Indian cities. Stone-ground Red Chilli, Turmeric, Dhaniya, Jeera, and artisanal Garam Masala.',
    url: 'https://truetaste.in/locations',
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
        item: 'https://truetaste.in',
      },
      {
        '@type': 'ListItem',
        position: 2,
        name: 'Indian Locations',
        item: 'https://truetaste.in/locations',
      },
    ],
  };

  const directorySchema = {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    name: 'Delhi Wally Indian Locations Directory',
    description: 'Master directory of over 1,000 Indian cities and towns where Delhi Wally spices are discovered.',
    url: 'https://truetaste.in/locations',
    publisher: {
      '@type': 'Organization',
      name: 'Delhi Wally',
      url: 'https://truetaste.in',
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
