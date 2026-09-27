import type { Metadata } from 'next';
import { Playfair_Display, Lato } from 'next/font/google';
import './globals.css';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { AuthProvider } from '@/contexts/AuthContext';
import { ToastContainer } from '@/components/Toast';
import { CartProvider } from '@/components/CartManager';

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
    default: 'True Taste — Pure Spices, True Flavors',
    template: '%s | True Taste',
  },
  description:
    'True Taste brings you premium quality spices, carefully selected and hygienically processed to deliver pure spices and true flavors in every meal.',
  keywords: ['Indian spices', 'True Taste', 'pure spices', 'Delhi Wally', 'red chilli powder', 'turmeric', 'garam masala', 'premium spices'],
  authors: [{ name: 'True Taste' }],
  creator: 'True Taste',
  publisher: 'True Taste',
  robots: {
    index: true,
    follow: true,
  },
  openGraph: {
    type: 'website',
    locale: 'en_IN',
    url: 'https://truetaste.in',
    siteName: 'True Taste',
    title: 'True Taste — Pure Spices, True Flavors',
    description:
      'Premium quality spices, carefully selected and hygienically processed to deliver pure spices and true flavors in every meal.',
    images: [
      {
        url: '/images/hero-spice.jpg',
        width: 1200,
        height: 630,
        alt: 'True Taste Premium Indian Spices',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'True Taste — Pure Spices, True Flavors',
    description: 'Premium Indian spices, carefully selected for true flavors.',
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
        <link rel="icon" href="/favicon.ico" sizes="any" />
      </head>
      <body className="bg-[#FFF8EF] antialiased">
        <AuthProvider>
          <CartProvider>
            <Navbar />
            <main>{children}</main>
            <Footer />
            <ToastContainer />
          </CartProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
