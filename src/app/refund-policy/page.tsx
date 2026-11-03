import type { Metadata } from 'next';
import RefundPolicyClient from './RefundPolicyClient';

export const metadata: Metadata = {
  title: 'Refund & Cancellation Policy',
  description:
    'Read Delhi Wally’s Refund, Return, and Cancellation Policy. Learn about cancellation windows, refund eligibility for packaged spices, timelines, and claim procedures.',
  openGraph: {
    title: 'Refund & Cancellation Policy | Delhi Wally',
    description:
      'Clear, transparent policy regarding cancellations, returns, and refunds for Delhi Wally pure spices.',
    url: 'https://truetaste.in/refund-policy',
    type: 'website',
    siteName: 'Delhi Wally',
  },
  alternates: {
    canonical: 'https://truetaste.in/refund-policy',
  },
};

export default function RefundPolicyPage() {
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
        name: 'Refund & Cancellation Policy',
        item: 'https://truetaste.in/refund-policy',
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <RefundPolicyClient />
    </>
  );
}
