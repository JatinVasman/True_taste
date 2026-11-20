'use client';

import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowRight, Leaf, Shield, Sparkles, Heart } from 'lucide-react';
import AnimatedSection from '@/components/AnimatedSection';
import ProductCard from '@/components/ProductCard';
import { products } from '@/lib/products';

const qualityPillars = [
  { icon: Leaf, title: '100% Natural', description: 'No additives, no preservatives — only nature\'s finest.' },
  { icon: Sparkles, title: 'Premium Quality', description: 'Carefully selected for unmatched aroma and purity.' },
  { icon: Shield, title: 'Naturally Sourced', description: 'Sustainably sourced whole spices, hygienically processed.' },
  { icon: Heart, title: 'Made with Care', description: 'Every batch crafted with attention to detail and tradition.' },
];

export default function HomePage() {
  return (
    <>
      {/* ===========================
          HERO
          =========================== */}
      <section
        id="hero"
        className="relative min-h-screen flex items-center overflow-hidden"
        style={{ background: '#FFF8EF' }}
        aria-label="Hero"
      >
        {/* Warm radial glow behind the image */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background: 'radial-gradient(ellipse 65% 70% at 70% 55%, rgba(242,230,201,0.75) 0%, transparent 70%)',
          }}
        />

        {/* Botanical linework — left, very faint */}
        <div className="absolute top-[15%] left-[3%] opacity-[0.07] select-none pointer-events-none" aria-hidden="true">
          <svg width="160" height="160" viewBox="0 0 160 160" fill="none">
            <path d="M80 8 Q128 40 118 88 Q108 136 72 144 Q36 152 18 116 Q0 80 28 44 Z" stroke="#7AA33E" strokeWidth="1.5" fill="none" />
            <path d="M80 8 L80 144M8 80 L152 80" stroke="#7AA33E" strokeWidth="0.5" fill="none" />
            <circle cx="80" cy="80" r="32" stroke="#7AA33E" strokeWidth="0.5" fill="none" />
          </svg>
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-10 w-full pt-32 pb-24">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-14 lg:gap-20 items-center">

            {/* LEFT — Typography block */}
            <div>
              <motion.p
                className="eyebrow mb-5"
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.55, delay: 0.35 }}
              >
                The Art of Indian Spices
              </motion.p>

              <motion.h1
                className="text-display text-[#2E5E2E] mb-6"
                initial={{ opacity: 0, y: 32 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.45, ease: [0.22, 1, 0.36, 1] }}
              >
                Pure Spices.{' '}
                <em
                  className="not-italic block"
                  style={{ color: '#5A2E0D' }}
                >
                  True Flavors.
                </em>
              </motion.h1>

              <motion.p
                className="font-lato text-[#7a6b4e] leading-relaxed mb-9 max-w-sm"
                style={{ fontSize: '1.05rem' }}
                initial={{ opacity: 0, y: 18 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.65, delay: 0.6 }}
              >
                Thoughtfully selected spices for the meals that bring people together.
                Each pinch carries the richness of India&rsquo;s finest spice heritage.
              </motion.p>

              <motion.div
                className="flex flex-wrap gap-4 mb-10"
                initial={{ opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.55, delay: 0.75 }}
              >
                <Link href="/products" className="btn-primary">
                  Explore Our Spices
                  <ArrowRight className="w-4 h-4" />
                </Link>
                <Link href="/our-story" className="btn-outline">
                  Our Story
                </Link>
              </motion.div>

              {/* Trust signals */}
              <motion.div
                className="flex flex-wrap gap-5"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.95 }}
              >
                {['100% Natural', 'No Additives', 'FSSAI Certified'].map((b) => (
                  <span
                    key={b}
                    className="flex items-center gap-1.5 font-lato font-bold uppercase tracking-[0.14em] text-[#7AA33E]"
                    style={{ fontSize: '0.62rem' }}
                  >
                    <span className="w-1 h-1 rounded-full bg-[#7AA33E] flex-shrink-0" />
                    {b}
                  </span>
                ))}
              </motion.div>
            </div>

            {/* RIGHT — Hero image */}
            <motion.div
              className="relative"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1, delay: 0.35, ease: [0.22, 1, 0.36, 1] }}
            >
              <div
                className="relative overflow-hidden shadow-2xl animate-float"
                style={{ borderRadius: '2rem', aspectRatio: '4/3' }}
              >
                <Image
                  src="/images/hero-spice.jpg"
                  alt="Artisanal wooden spice box with vibrant Indian spices and True Taste gold-capped spice jars"
                  fill
                  priority
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                />
              </div>

              {/* Floating card — bottom left */}
              <motion.div
                className="absolute -bottom-5 -left-5 rounded-2xl px-4 py-3 shadow-xl"
                style={{
                  background: '#2E5E2E',
                  color: '#F2E6C9',
                  maxWidth: '160px',
                }}
                initial={{ opacity: 0, y: 16, x: -8 }}
                animate={{ opacity: 1, y: 0, x: 0 }}
                transition={{ delay: 1.05, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
              >
                <p className="font-lato font-bold uppercase tracking-widest opacity-60" style={{ fontSize: '0.55rem' }}>
                  Pure Goodness
                </p>
                <p className="font-playfair font-bold text-xl leading-tight mt-0.5">
                  5 Essentials
                </p>
                <p className="font-lato uppercase tracking-widest opacity-50 mt-0.5" style={{ fontSize: '0.5rem' }}>
                  One True Taste
                </p>
              </motion.div>

              {/* Floating card — top right */}
              <motion.div
                className="absolute -top-4 -right-4 rounded-2xl px-4 py-3 shadow-lg"
                style={{
                  background: '#FFFDF8',
                  border: '1px solid rgba(242,230,201,0.9)',
                  maxWidth: '155px',
                }}
                initial={{ opacity: 0, y: -12, x: 8 }}
                animate={{ opacity: 1, y: 0, x: 0 }}
                transition={{ delay: 1.15, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
              >
                <p className="font-lato font-bold uppercase tracking-widest text-[#7AA33E]" style={{ fontSize: '0.55rem' }}>
                  FSSAI Certified
                </p>
                <p className="font-playfair font-bold text-[#2E5E2E] text-sm leading-tight mt-0.5">
                  Premium Quality
                </p>
                <p className="font-lato uppercase tracking-widest text-[#7a6b4e] mt-0.5" style={{ fontSize: '0.5rem' }}>
                  Naturally Sourced
                </p>
              </motion.div>
            </motion.div>
          </div>
        </div>


      </section>

      {/* ===========================
          STORY SECTION
          =========================== */}
      <section
        className="section-pad"
        style={{ background: 'rgba(242,230,201,0.3)' }}
        aria-labelledby="signature-heading"
      >
        <div className="max-w-7xl mx-auto px-6 md:px-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">

            <AnimatedSection direction="left">
              <div
                className="relative overflow-hidden shadow-xl"
                style={{ borderRadius: '2rem', aspectRatio: '4/5' }}
              >
                <Image
                  src="/images/story-editorial.jpg"
                  alt="Heritage brass and carved wood spice box with freshly ground spices and True Taste spice jar on natural linen"
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                />
                <div
                  className="absolute bottom-6 left-6 rounded-xl px-5 py-3.5"
                  style={{ background: 'rgba(46,94,46,0.88)', backdropFilter: 'blur(8px)' }}
                >
                  <p className="font-lato font-bold uppercase tracking-[0.16em] text-[#7AA33E]" style={{ fontSize: '0.55rem' }}>
                    Pure Goodness
                  </p>
                  <p className="font-playfair font-bold text-[#F2E6C9] text-lg leading-tight">in every pinch</p>
                </div>
              </div>
            </AnimatedSection>

            <div>
              <AnimatedSection delay={0.1}>
                <p className="eyebrow mb-4">The True Taste Story</p>
              </AnimatedSection>
              <AnimatedSection delay={0.18}>
                <h2 className="text-headline text-[#2E5E2E] mb-5" id="signature-heading">
                  From the Spice Box<br />
                  <em className="italic" style={{ color: '#5A2E0D' }}>to the Table</em>
                </h2>
              </AnimatedSection>
              <AnimatedSection delay={0.22}>
                <div className="divider-botanical mb-7">
                  <Leaf className="w-3 h-3 text-[#7AA33E]" />
                </div>
              </AnimatedSection>
              <AnimatedSection delay={0.28}>
                <p className="font-lato text-[#7a6b4e] leading-relaxed mb-5" style={{ fontSize: '1rem' }}>
                  At True Taste, we believe that every great meal begins with an extraordinary spice.
                  Our collection brings together the five essential spices that form the backbone of
                  Indian cooking — each one sourced, processed and packed with care.
                </p>
              </AnimatedSection>
              <AnimatedSection delay={0.36}>
                <p className="font-lato text-[#7a6b4e] leading-relaxed mb-9" style={{ fontSize: '1rem' }}>
                  We carry the values of premium quality, natural sourcing and the belief that pure
                  spices make for truly unforgettable flavors. No shortcuts. No additives.
                  Just spices as nature intended.
                </p>
              </AnimatedSection>
              <AnimatedSection delay={0.44}>
                <Link href="/our-story" className="btn-primary">
                  Read Our Story
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </AnimatedSection>
            </div>
          </div>
        </div>
      </section>

      {/* ===========================
          PRODUCT COLLECTION — Editorial Grid
          =========================== */}
      <section className="section-pad" aria-labelledby="collection-heading">
        <div className="max-w-7xl mx-auto px-6 md:px-10">

          {/* Header */}
          <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-12">
            <div>
              <AnimatedSection>
                <p className="eyebrow mb-3">Five Essentials</p>
              </AnimatedSection>
              <AnimatedSection delay={0.08}>
                <h2 className="text-headline text-[#2E5E2E]" id="collection-heading">
                  The Collection
                </h2>
              </AnimatedSection>
            </div>
            <AnimatedSection delay={0.12} className="sm:pb-1.5">
              <Link href="/products" className="btn-ghost flex items-center gap-1.5 text-[#7AA33E] font-lato font-bold uppercase tracking-widest text-xs hover:text-[#2E5E2E] transition-colors">
                View All
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </AnimatedSection>
          </div>

          {/* ===========================
              EDITORIAL PRODUCT LAYOUT
              Featured Red Chilli + 2×2 grid
              =========================== */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">

            {/* FEATURED — Red Chilli — tall left column */}
            <AnimatedSection
              direction="left"
              delay={0.05}
              className="lg:col-span-5"
            >
              <ProductCard
                product={products[0]}
                variant="featured"
                className="h-full"
              />
            </AnimatedSection>

            {/* RIGHT — 2×2 standard grid */}
            <div className="lg:col-span-7 grid grid-cols-2 gap-5">
              {products.slice(1).map((product, i) => (
                <AnimatedSection
                  key={product.id}
                  delay={0.12 + i * 0.07}
                >
                  <ProductCard product={product} variant="standard" className="h-full" />
                </AnimatedSection>
              ))}
            </div>
          </div>

          {/* Thin rule + label */}
          <AnimatedSection delay={0.3} className="mt-14 pt-8" style={{ borderTop: '1px solid rgba(122,163,62,0.12)' }}>
            <div className="flex flex-col sm:flex-row items-center justify-between gap-5">
              <p className="font-lato text-[#7a6b4e] text-sm text-center sm:text-left">
                All spices available in 50g, 100g and 200g packs.
              </p>
              <Link href="/products" className="btn-outline flex-shrink-0">
                Complete Collection
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* ===========================
          MARQUEE — Brand phrase
          =========================== */}
      <div
        className="py-12 overflow-hidden"
        style={{ background: '#2E5E2E' }}
        aria-hidden="true"
      >
        <div className="flex gap-14 items-center" style={{ animation: 'marquee 30s linear infinite' }}>
          {[...Array(10)].map((_, i) => (
            <div key={i} className="flex items-center gap-14 flex-shrink-0">
              <span className="font-playfair font-bold italic text-[#F2E6C9]/15 whitespace-nowrap" style={{ fontSize: 'clamp(2rem,5vw,4rem)' }}>
                Pure Spices
              </span>
              <Leaf className="text-[#7AA33E]/30 flex-shrink-0" style={{ width: '1.5rem', height: '1.5rem' }} />
              <span className="font-playfair font-bold text-[#F2E6C9]/15 whitespace-nowrap" style={{ fontSize: 'clamp(2rem,5vw,4rem)' }}>
                True Flavors
              </span>
              <span className="text-[#7AA33E]/20 font-lato font-bold uppercase tracking-[0.3em] text-xs flex-shrink-0">
                True Taste
              </span>
            </div>
          ))}
        </div>
        <style>{`@keyframes marquee { from { transform: translateX(0); } to { transform: translateX(-50%); } }`}</style>
      </div>

      {/* ===========================
          QUALITY PILLARS
          =========================== */}
      <section
        className="section-pad"
        style={{ background: '#FFF8EF' }}
        aria-labelledby="quality-heading"
      >
        <div className="max-w-7xl mx-auto px-6 md:px-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">

            {/* LEFT — Copy */}
            <div>
              <AnimatedSection>
                <p className="eyebrow mb-4">Our Promise</p>
              </AnimatedSection>
              <AnimatedSection delay={0.08}>
                <h2 className="text-headline text-[#2E5E2E] mb-5" id="quality-heading">
                  Quality You Can See.{' '}
                  <em className="italic block" style={{ color: '#5A2E0D' }}>
                    Flavor You Can Taste.
                  </em>
                </h2>
              </AnimatedSection>
              <AnimatedSection delay={0.14}>
                <p className="font-lato text-[#7a6b4e] leading-relaxed mb-10" style={{ fontSize: '1rem' }}>
                  Every True Taste spice is backed by a four-pillar quality promise —
                  printed on every pack and lived in every batch.
                </p>
              </AnimatedSection>
              <AnimatedSection delay={0.2}>
                <Link href="/quality" className="btn-primary">
                  Our Quality Standards
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </AnimatedSection>
            </div>

            {/* RIGHT — Pillar cards */}
            <div className="grid grid-cols-2 gap-4">
              {qualityPillars.map((pillar, i) => {
                const Icon = pillar.icon;
                return (
                  <AnimatedSection key={pillar.title} delay={0.1 + i * 0.08}>
                    <div
                      className="p-6 rounded-2xl h-full transition-all duration-300 hover:-translate-y-1"
                      style={{
                        background: 'rgba(255,248,239,0.8)',
                        border: '1px solid rgba(122,163,62,0.12)',
                      }}
                    >
                      <div
                        className="w-10 h-10 rounded-xl flex items-center justify-center mb-4"
                        style={{ background: 'rgba(122,163,62,0.1)' }}
                      >
                        <Icon className="w-4.5 h-4.5 text-[#7AA33E]" style={{ width: '1.1rem', height: '1.1rem' }} />
                      </div>
                      <h3 className="font-playfair font-bold text-[#2E5E2E] text-base mb-1.5">
                        {pillar.title}
                      </h3>
                      <p className="font-lato text-[#7a6b4e] leading-relaxed" style={{ fontSize: '0.82rem' }}>
                        {pillar.description}
                      </p>
                    </div>
                  </AnimatedSection>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* ===========================
          CTA SECTION
          =========================== */}
      <section
        className="section-pad"
        style={{ background: 'rgba(242,230,201,0.3)' }}
        aria-labelledby="cta-heading"
      >
        <div className="max-w-3xl mx-auto px-6 text-center">
          <AnimatedSection>
            <p className="eyebrow justify-center mb-5">Get in Touch</p>
          </AnimatedSection>
          <AnimatedSection delay={0.08}>
            <h2 className="text-headline text-[#2E5E2E] mb-5" id="cta-heading">
              Let&rsquo;s Talk Spices.
            </h2>
          </AnimatedSection>
          <AnimatedSection delay={0.16}>
            <p className="font-lato text-[#7a6b4e] leading-relaxed mb-9 max-w-md mx-auto" style={{ fontSize: '1rem' }}>
              Interested in our spice collection? We&rsquo;d love to hear from you.
              Reach out and let&rsquo;s bring true flavors to your table.
            </p>
          </AnimatedSection>
          <AnimatedSection delay={0.24} className="flex flex-wrap gap-4 justify-center">
            <Link href="/contact" className="btn-primary">
              Contact True Taste
              <ArrowRight className="w-4 h-4" />
            </Link>
            <Link href="/products" className="btn-outline">
              Browse Products
            </Link>
          </AnimatedSection>
        </div>
      </section>
    </>
  );
}
