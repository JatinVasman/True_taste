import type { Metadata } from 'next';
import TermsClient from './TermsClient';

export const metadata: Metadata = {
  title: 'Terms & Conditions',
  description:
    'Read the official Terms & Conditions for True Taste. Understand user obligations, ordering conditions, intellectual property, pricing, and dispute jurisdiction.',
  openGraph: {
    title: 'Terms & Conditions | True Taste',
    description:
      'Official terms and conditions for using the True Taste website and ordering our premium Indian spices.',
    url: 'https://truetaste.in/terms-and-conditions',
    type: 'website',
    siteName: 'True Taste',
  },
  alternates: {
    canonical: 'https://truetaste.in/terms-and-conditions',
  },
};

export default function TermsPage() {
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
        name: 'Terms & Conditions',
        item: 'https://truetaste.in/terms-and-conditions',
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <TermsClient />
    </>
  );
}
