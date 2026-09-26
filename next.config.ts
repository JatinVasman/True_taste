import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    formats: ['image/webp', 'image/avif'],
  },
  async redirects() {
    return [
      {
        source: '/privacy',
        destination: '/privacy-policy',
        permanent: true,
      },
      {
        source: '/terms',
        destination: '/terms-and-conditions',
        permanent: true,
      },
      {
        source: '/terms-of-service',
        destination: '/terms-and-conditions',
        permanent: true,
      },
      {
        source: '/refund',
        destination: '/refund-policy',
        permanent: true,
      },
      {
        source: '/refunds',
        destination: '/refund-policy',
        permanent: true,
      },
      {
        source: '/cancellation-policy',
        destination: '/refund-policy',
        permanent: true,
      },
      {
        source: '/cancellation-and-refund-policy',
        destination: '/refund-policy',
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
