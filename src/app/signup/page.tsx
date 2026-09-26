import type { Metadata } from 'next';
import SignupClient from './SignupClient';

export const metadata: Metadata = {
  title: 'Create Account',
  description: 'Create your True Taste account to place orders and track your deliveries.',
  robots: { index: false, follow: false },
};

export default function SignupPage() {
  return <SignupClient />;
}
