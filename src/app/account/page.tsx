import type { Metadata } from 'next';
import AccountClient from './AccountClient';

export const metadata: Metadata = {
  title: 'My Account',
  description: 'Manage your True Taste account details and preferences.',
  robots: { index: false, follow: false },
};

export default function AccountPage() {
  return <AccountClient />;
}
