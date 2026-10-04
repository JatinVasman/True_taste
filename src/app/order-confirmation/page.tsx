import type { Metadata } from 'next';
import { Suspense } from 'react';
import OrderConfirmationClient from './OrderConfirmationClient';

export const metadata: Metadata = {
  title: 'Order Confirmed',
  description: 'Your True Taste order has been confirmed.',
  robots: { index: false, follow: false },
};

export default function OrderConfirmationPage() {
  return (
    <Suspense>
      <OrderConfirmationClient />
    </Suspense>
  );
}
