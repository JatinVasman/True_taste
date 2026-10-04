'use client';

import { useState, useEffect, useSyncExternalStore } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, ShoppingCart } from 'lucide-react';
import { useCartStore } from '@/lib/cart';
import { useCartDrawer } from '@/lib/cartDrawer';

const navLinks = [
  { href: '/', label: 'Home' },
  { href: '/products', label: 'Products' },
  { href: '/our-story', label: 'Our Story' },
  { href: '/quality', label: 'Quality' },
  { href: '/contact', label: 'Contact' },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const pathname = usePathname();
  const [prevPathname, setPrevPathname] = useState(pathname);

  const totalCount = useCartStore((s) => s.totalCount());
  const openCart = useCartDrawer((s) => s.openCart);
  // Hydration guard via useSyncExternalStore — the canonical React pattern
  // for values that differ between SSR and client (avoids setState-in-effect).
  const isMounted = useSyncExternalStore(
    () => () => {},        // subscribe: no-op (value never changes after mount)
    () => true,            // getSnapshot: always true on client
    () => false,           // getServerSnapshot: false during SSR
  );

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [menuOpen]);

  if (prevPathname !== pathname) {
    setPrevPathname(pathname);
    setMenuOpen(false);
  }

  const cartCount = isMounted ? totalCount : 0;

  return (
    <>
      <div
        className="fixed top-0 left-0 right-0 z-50 flex justify-center pointer-events-none"
        style={{ paddingTop: scrolled ? '0.625rem' : '1.125rem', transition: 'padding 350ms ease' }}
      >
        <motion.nav
          className="pointer-events-auto"
          style={{
            background: scrolled ? 'rgba(255,248,239,0.97)' : 'rgba(255,248,239,0.88)',
            backdropFilter: 'blur(24px) saturate(1.8)',
            WebkitBackdropFilter: 'blur(24px) saturate(1.8)',
            borderRadius: '9999px',
            border: '1px solid rgba(122,163,62,0.18)',
            boxShadow: scrolled
              ? '0 4px 24px rgba(46,94,46,0.16), 0 1px 4px rgba(46,94,46,0.08)'
              : '0 8px 32px rgba(46,94,46,0.1), 0 2px 8px rgba(46,94,46,0.05)',
            transition: 'box-shadow 350ms ease, background 350ms ease',
            width: 'min(calc(100vw - 2rem), 960px)',
          }}
          initial={{ y: -24, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1], delay: 0.15 }}
          aria-label="Main navigation"
        >
          <div className="flex items-center justify-between px-5 py-2.5">
            {/* Logo */}
            <Link
              href="/#hero"
              className="flex items-center group cursor-pointer"
              aria-label="True Taste Home — Hero"
              onClick={(e) => {
                if (pathname === '/') {
                  e.preventDefault();
                  const heroEl = document.getElementById('hero');
                  if (heroEl) {
                    heroEl.scrollIntoView({ behavior: 'smooth' });
                  } else {
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }
                }
              }}
            >
              <div className="flex-shrink-0 transition-transform duration-300 group-hover:scale-105">
                <Image
                  src="/images/true-taste-logo.png"
                  alt="True Taste Logo"
                  width={58}
                  height={58}
                  className="object-contain"
                  priority
                  unoptimized
                />
              </div>
            </Link>

            {/* Desktop nav links */}
            <div className="hidden md:flex items-center gap-4 lg:gap-6">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`nav-link ${pathname === link.href ? 'active text-[#7AA33E]' : ''}`}
                >
                  {link.label}
                </Link>
              ))}
            </div>

            {/* Right section: Cart + Shop CTA + Mobile toggle */}
            <div className="flex items-center gap-2">
              {/* Cart icon */}
              <button
                type="button"
                onClick={openCart}
                aria-label={cartCount > 0 ? `View cart — ${cartCount} item${cartCount === 1 ? '' : 's'}` : 'View cart'}
                className="relative flex items-center justify-center w-8 h-8 rounded-full text-[#2E5E2E] hover:bg-[#7AA33E]/10 transition-colors cursor-pointer"
              >
                <ShoppingCart className="w-[17px] h-[17px]" strokeWidth={2} />
                {cartCount > 0 && (
                  <span
                    className="absolute -top-1 -right-1 flex items-center justify-center rounded-full text-white font-lato font-bold"
                    style={{
                      width: '1.05rem',
                      height: '1.05rem',
                      fontSize: '0.55rem',
                      background: '#2E5E2E',
                      lineHeight: 1,
                    }}
                    aria-hidden="true"
                  >
                    {cartCount > 9 ? '9+' : cartCount}
                  </span>
                )}
              </button>

              <Link
                href="/products"
                className="hidden md:inline-flex btn-primary whitespace-nowrap"
                style={{ padding: '0.55rem 1.25rem', fontSize: '0.68rem' }}
              >
                Shop Now
              </Link>

              {/* Mobile toggle */}
              <button
                className="md:hidden flex items-center justify-center rounded-full text-[#2E5E2E] transition-colors"
                style={{ width: '2.1rem', height: '2.1rem' }}
                onClick={() => setMenuOpen(!menuOpen)}
                aria-label={menuOpen ? 'Close menu' : 'Open menu'}
                aria-expanded={menuOpen}
              >
                {menuOpen ? <X className="w-[18px] h-[18px]" /> : <Menu className="w-[18px] h-[18px]" />}
              </button>
            </div>
          </div>
        </motion.nav>
      </div>

      {/* Mobile full-screen overlay */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            className="fixed inset-0 z-40 flex flex-col items-center justify-center gap-0"
            style={{ background: '#FFF8EF' }}
            initial={{ opacity: 0, clipPath: 'inset(0 0 100% 0)' }}
            animate={{ opacity: 1, clipPath: 'inset(0 0 0% 0)' }}
            exit={{ opacity: 0, clipPath: 'inset(0 0 100% 0)' }}
            transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
          >
            <button
              className="absolute top-6 right-6 w-10 h-10 flex items-center justify-center rounded-full text-[#2E5E2E]"
              style={{ border: '1px solid rgba(46,94,46,0.15)' }}
              onClick={() => setMenuOpen(false)}
              aria-label="Close menu"
            >
              <X className="w-5 h-5" />
            </button>

            <motion.div
              className="mb-10 flex flex-col items-center"
              initial={{ y: 24, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.15, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            >
              <Link
                href="/#hero"
                className="mb-3 block cursor-pointer"
                aria-label="True Taste Home — Hero"
                onClick={(e) => {
                  setMenuOpen(false);
                  if (pathname === '/') {
                    e.preventDefault();
                    const heroEl = document.getElementById('hero');
                    if (heroEl) {
                      heroEl.scrollIntoView({ behavior: 'smooth' });
                    } else {
                      window.scrollTo({ top: 0, behavior: 'smooth' });
                    }
                  }
                }}
              >
                <Image
                  src="/images/true-taste-logo.png"
                  alt="True Taste Logo"
                  width={80}
                  height={80}
                  className="object-contain"
                  unoptimized
                />
              </Link>
              <span className="font-playfair font-bold text-[#2E5E2E] text-2xl">True Taste</span>
              <p className="text-[#7AA33E] text-[0.65rem] tracking-[0.18em] font-lato font-bold uppercase mt-1">
                Pure Spices · True Flavors
              </p>
            </motion.div>

            <nav className="flex flex-col items-center gap-2" aria-label="Mobile navigation">
              {navLinks.map((link, i) => (
                <motion.div
                  key={link.href}
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.2 + i * 0.07, ease: [0.22, 1, 0.36, 1], duration: 0.5 }}
                >
                  <Link
                    href={link.href}
                    className={`block font-playfair text-4xl font-bold transition-colors duration-200 hover:text-[#7AA33E] ${
                      pathname === link.href ? 'text-[#7AA33E]' : 'text-[#2E5E2E]'
                    }`}
                    onClick={() => setMenuOpen(false)}
                  >
                    {link.label}
                  </Link>
                </motion.div>
              ))}
            </nav>

            <motion.div
              className="mt-10 flex flex-col items-center gap-3"
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.55, duration: 0.5 }}
            >
              <Link href="/products" className="btn-primary" onClick={() => setMenuOpen(false)}>
                Explore All Spices
              </Link>
              <button
                type="button"
                className="btn-outline cursor-pointer"
                onClick={() => { setMenuOpen(false); openCart(); }}
                aria-label={cartCount > 0 ? `Cart — ${cartCount} item${cartCount === 1 ? '' : 's'}` : 'Cart'}
              >
                <ShoppingCart className="w-4 h-4" />
                Cart{cartCount > 0 ? ` (${cartCount})` : ''}
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
