import type { Metadata } from 'next';
import { Suspense } from 'react';
import LoginClient from './LoginClient';

export const metadata: Metadata = {
  title: 'Sign In',
  description: 'Sign in to your True Taste account to manage orders and track deliveries.',
  robots: { index: false, follow: false },
};

export default function LoginPage() {
  return (
    <Suspense>
      <LoginClient />
    </Suspense>
  );
}
