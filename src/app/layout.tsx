import type { Metadata } from 'next';
import { Playfair_Display, Lato } from 'next/font/google';
import './globals.css';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { ToastContainer } from '@/components/Toast';
import { CartProvider } from '@/components/CartManager';
import CartDrawer from '@/components/CartDrawer';
import WhatsAppFloatingButton from '@/components/WhatsAppFloatingButton';

const playfairDisplay = Playfair_Display({
  subsets: ['latin'],
  variable: '--font-playfair',
  weight: ['400', '500', '600', '700', '800', '900'],
  style: ['normal', 'italic'],
  display: 'swap',
});

const lato = Lato({
  subsets: ['latin'],
  variable: '--font-lato',
  weight: ['300', '400', '700', '900'],
  style: ['normal', 'italic'],
  display: 'swap',
});

export const metadata: Metadata = {
  metadataBase: new URL('https://truetaste.in'),
  title: {
    default: 'Delhi Wally — Pure Spices, True Flavors',
    template: '%s | Delhi Wally',
  },
  description:
    'Delhi Wally brings you premium quality spices, carefully selected and hygienically processed to deliver pure spices and authentic flavors in every meal.',
  keywords: ['Indian spices', 'Delhi Wally', 'pure spices', 'True Taste', 'red chilli powder', 'turmeric', 'garam masala', 'premium spices'],
  authors: [{ name: 'Delhi Wally' }],
  creator: 'Delhi Wally',
  publisher: 'Delhi Wally',
  icons: {
    icon: [
      { url: '/favicon.ico?v=5', sizes: 'any' },
      { url: '/icon.png?v=5', type: 'image/png' },
    ],
    apple: '/apple-icon.png?v=5',
    shortcut: '/favicon.ico?v=5',
  },
  robots: {
    index: true,
    follow: true,
  },
  openGraph: {
    type: 'website',
    locale: 'en_IN',
    url: 'https://truetaste.in',
    siteName: 'Delhi Wally',
    title: 'Delhi Wally — Pure Spices, True Flavors',
    description:
      'Premium quality spices, carefully selected and hygienically processed to deliver pure spices and authentic flavors in every meal.',
    images: [
      {
        url: '/images/hero-spice.jpg',
        width: 1200,
        height: 630,
        alt: 'Delhi Wally Premium Indian Spices',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Delhi Wally — Pure Spices, True Flavors',
    description: 'Premium Indian spices, carefully selected for authentic flavors.',
    images: ['/images/hero-spice.jpg'],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${playfairDisplay.variable} ${lato.variable}`}
      data-scroll-behavior="smooth"
    >
      <head>
        <link rel="icon" href="/favicon.ico?v=5" sizes="any" />
        <link rel="icon" href="/icon.png?v=5" type="image/png" />
        <link rel="apple-touch-icon" href="/apple-icon.png?v=5" />
      </head>
      <body className="bg-[#FFF8EF] antialiased">
        <CartProvider>
          <Navbar />
          <main>{children}</main>
          <Footer />
          <CartDrawer />
          <WhatsAppFloatingButton />
          <ToastContainer />
        </CartProvider>
      </body>
    </html>
  );
}
