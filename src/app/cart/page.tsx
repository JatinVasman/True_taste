import type { Metadata } from 'next';
import CartClient from './CartClient';

export const metadata: Metadata = {
  title: 'My Cart',
  description: 'Review your selected spices before checkout.',
  robots: { index: false, follow: false },
};

export default function CartPage() {
  return <CartClient />;
}
