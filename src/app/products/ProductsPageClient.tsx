'use client';

import { useState } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, Leaf } from 'lucide-react';
import AnimatedSection from '@/components/AnimatedSection';
import ProductCard from '@/components/ProductCard';
import { products, type ProductCategory } from '@/lib/products';

const FILTERS: { label: string; value: ProductCategory }[] = [
  { label: 'All Spices', value: 'all' },
  { label: 'Ground Spices', value: 'ground' },
  { label: 'Whole Spices', value: 'whole' },
  { label: 'Blends', value: 'blend' },
];

export default function ProductsPageClient() {
  const [activeFilter, setActiveFilter] = useState<ProductCategory>('all');

  const filtered = products.filter(
    (p) => activeFilter === 'all' || p.category === activeFilter
  );

  return (
    <>
      {/* ===========================
          PAGE HEADER
          =========================== */}
      <section
        className="relative pt-36 pb-20 overflow-hidden"
        style={{ background: '#FFF8EF' }}
        aria-labelledby="products-page-heading"
      >
        {/* Background decoration */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              'radial-gradient(ellipse 60% 80% at 50% 0%, rgba(242, 230, 201, 0.6) 0%, transparent 70%)',
          }}
        />

        {/* Botanical decorations */}
        <div className="absolute top-24 left-8 opacity-8 select-none" aria-hidden="true">
          <svg width="80" height="80" viewBox="0 0 80 80" fill="none">
            <path d="M40 5 Q65 20 70 45 Q75 70 50 75 Q25 80 15 55 Q5 30 25 15 Z" stroke="#7AA33E" strokeWidth="1.2" fill="none" />
          </svg>
        </div>

        <div className="relative z-10 max-w-4xl mx-auto px-6 text-center">
          <AnimatedSection>
            <div className="eyebrow justify-center mb-5">True Taste</div>
          </AnimatedSection>
          <AnimatedSection delay={0.1}>
            <h1 className="text-display text-[#2E5E2E] mb-4" id="products-page-heading">
              The Spice Collection
            </h1>
          </AnimatedSection>
          <AnimatedSection delay={0.2}>
            <p className="font-lato text-[#7a6b4e] text-base max-w-md mx-auto">
              Five essentials. One unmistakable taste.
            </p>
          </AnimatedSection>

          {/* Divider */}
          <AnimatedSection delay={0.25} className="mt-8">
            <div className="divider-botanical max-w-xs mx-auto">
              <Leaf className="w-3 h-3 text-[#7AA33E]" />
            </div>
          </AnimatedSection>

          {/* Filter pills */}
          <AnimatedSection delay={0.3} className="mt-10 flex flex-wrap justify-center gap-2.5">
            {FILTERS.map((f) => (
              <button
                key={f.value}
                className={`qty-pill transition-all ${activeFilter === f.value ? 'active' : ''}`}
                onClick={() => setActiveFilter(f.value)}
                aria-pressed={activeFilter === f.value}
              >
                {f.label}
              </button>
            ))}
          </AnimatedSection>
        </div>
      </section>

      {/* ===========================
          PRODUCTS GRID
          =========================== */}
      <section className="pb-24 pt-8" aria-label="Product grid">
        <div className="max-w-7xl mx-auto px-6 md:px-10">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeFilter}
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.4 }}
            >
              {filtered.map((product, i) => (
                <motion.div
                  key={product.id}
                  initial={{ opacity: 0, y: 24 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.07, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                >
                  <ProductCard product={product} variant="standard" />
                </motion.div>
              ))}
            </motion.div>
          </AnimatePresence>

          {filtered.length === 0 && (
            <div className="text-center py-20">
              <p className="font-lato text-[#7a6b4e]">No spices in this category yet.</p>
            </div>
          )}
        </div>
      </section>

      {/* ===========================
          PACKAGING SECTION
          =========================== */}
      <section className="py-20 bg-[#F2E6C9]/30" aria-labelledby="sizes-heading">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <AnimatedSection>
            <div className="eyebrow justify-center mb-4">Available Sizes</div>
          </AnimatedSection>
          <AnimatedSection delay={0.1}>
            <h2 className="text-headline text-[#2E5E2E] mb-4" id="sizes-heading">
              Perfect for Every Kitchen
            </h2>
          </AnimatedSection>
          <AnimatedSection delay={0.2}>
            <p className="font-lato text-[#7a6b4e] text-base mb-10">
              Each spice is available in three convenient sizes to suit every need.
            </p>
          </AnimatedSection>

          <div className="grid grid-cols-3 gap-5 max-w-md mx-auto items-stretch">
            {[
              { size: '50g', desc: 'Try a new spice' },
              { size: '100g', desc: 'The everyday choice' },
              { size: '200g', desc: 'For the keen cook' },
            ].map((item, i) => (
              <AnimatedSection key={item.size} delay={i * 0.1} className="flex">
                <div
                  className="flex flex-col items-center justify-center rounded-2xl text-center transition-all duration-300 hover:-translate-y-1 w-full"
                  style={{
                    background: 'rgba(255,248,239,0.8)',
                    border: '1px solid rgba(122,163,62,0.15)',
                    padding: '1.5rem 1rem',
                    minHeight: '7rem',
                  }}
                >
                  <p className="font-playfair font-bold text-[#2E5E2E] text-2xl leading-none mb-2">{item.size}</p>
                  <p className="font-lato text-[#7a6b4e] text-xs leading-snug">{item.desc}</p>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* ===========================
          CTA ENQUIRY BANNER
          =========================== */}
      <section className="py-16 bg-[#2E5E2E]" aria-labelledby="enquiry-cta">
        <div className="max-w-3xl mx-auto px-6 text-center">
          <AnimatedSection>
            <p className="font-playfair font-bold text-[#F2E6C9]/50 text-xs uppercase tracking-widest mb-3">
              Interested?
            </p>
          </AnimatedSection>
          <AnimatedSection delay={0.1}>
            <h2 className="font-playfair font-bold text-[#F2E6C9] text-3xl md:text-4xl mb-5" id="enquiry-cta">
              Enquire About Our Spices
            </h2>
          </AnimatedSection>
          <AnimatedSection delay={0.2}>
            <Link href="/contact" className="inline-flex items-center gap-2 btn-primary bg-[#F2E6C9] text-[#2E5E2E] hover:bg-[#FFF8EF]">
              Contact True Taste
              <ArrowRight className="w-4 h-4" />
            </Link>
          </AnimatedSection>
        </div>
      </section>
    </>
  );
}
