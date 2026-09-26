import type { Metadata } from 'next';
import ContactClient from './ContactClient';

export const metadata: Metadata = {
  title: 'Contact Us',
  description:
    "Let's talk spices. Reach out to True Taste for enquiries, orders, or anything else. Call +91 8810303231 or email delhiwally@gmail.com.",
};

export default function ContactPage() {
  return <ContactClient />;
}
