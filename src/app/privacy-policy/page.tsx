import type { Metadata } from 'next';
import PrivacyPolicyClient from './PrivacyPolicyClient';

export const metadata: Metadata = {
  title: 'Privacy Policy',
  description:
    'Read the Privacy Policy of True Taste. Learn how we collect, use, safeguard, and retain your personal data when you visit truetaste.in or purchase our spices.',
  openGraph: {
    title: 'Privacy Policy | True Taste',
    description:
      'Learn how True Taste collects, uses, and protects your personal and transaction information when browsing our pure spice collection.',
    url: 'https://www.truetaste.in/privacy-policy',
    type: 'website',
    siteName: 'True Taste',
  },
  alternates: {
    canonical: 'https://www.truetaste.in/privacy-policy',
  },
};

export default function PrivacyPolicyPage() {
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
        name: 'Privacy Policy',
        item: 'https://www.truetaste.in/privacy-policy',
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <PrivacyPolicyClient />
    </>
  );
}
