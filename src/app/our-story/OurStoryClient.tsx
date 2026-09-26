'use client';

import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowRight, Leaf } from 'lucide-react';
import AnimatedSection from '@/components/AnimatedSection';

/* =============================================
   OUR STORY PAGE
   "Rooted in Flavor."
   ============================================= */

const storyChapters = [
  {
    number: '01',
    title: 'The Belief',
    body: 'We believe that every great meal begins with an extraordinary spice. Not a compromise. Not a substitute. A spice that carries the true character of its origin, processed with care and respect.',
  },
  {
    number: '02',
    title: 'The Selection',
    body: 'Each True Taste spice is carefully selected for quality, aroma and purity. We work with whole spices and ground them fresh to preserve the essential oils that give every pinch its character.',
  },
  {
    number: '03',
    title: 'The Promise',
    body: 'Pure Spices, True Flavors. No additives. No artificial enhancers. Only nature\'s finest — hygienically processed and packed with care to reach your kitchen in perfect condition.',
  },
  {
    number: '04',
    title: 'The Collection',
    body: 'Five essential spices, perfected. Red Chilli, Turmeric, Dhaniya, Jeera and Garam Masala — the foundational five that form the backbone of Indian cooking.',
  },
];

const spiceValues = [
  { emoji: '🌿', label: 'Natural', desc: '100% natural spices with no additives.' },
  { emoji: '✨', label: 'Pure', desc: 'Stone-ground whole spices for maximum aroma.' },
  { emoji: '💚', label: 'Care', desc: 'Hygienically processed with attention to detail.' },
  { emoji: '⭐', label: 'Quality', desc: 'Carefully selected for premium quality standards.' },
  { emoji: '☀️', label: 'Fresh', desc: 'Naturally sourced and packed fresh.' },
];

export default function OurStoryClient() {
  return (
    <>
      {/* ===========================
          PAGE HERO
          =========================== */}
      <section
        className="relative pt-40 pb-24 overflow-hidden"
        style={{ background: '#FFF8EF' }}
        aria-labelledby="story-heading"
      >
        {/* Background decoration */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              'radial-gradient(ellipse 60% 70% at 30% 40%, rgba(242, 230, 201, 0.65) 0%, transparent 70%)',
          }}
        />

        {/* Large background number */}
        <div className="absolute top-20 right-0 select-none pointer-events-none overflow-hidden" aria-hidden="true">
          <span
            className="font-playfair font-black text-[12rem] md:text-[18rem]"
            style={{ color: 'rgba(122, 163, 62, 0.05)', lineHeight: 1 }}
          >
            TT
          </span>
        </div>

        <div className="relative z-10 max-w-4xl mx-auto px-6 text-center">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="eyebrow justify-center mb-5">True Taste</div>
          </motion.div>
          <motion.h1
            className="text-display text-[#2E5E2E] mb-6"
            initial={{ opacity: 0, y: 28 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
            id="story-heading"
          >
            Rooted in{' '}
            <em className="italic" style={{ color: '#5A2E0D' }}>
              Flavor.
            </em>
          </motion.h1>
          <motion.p
            className="font-lato text-[#7a6b4e] text-lg max-w-xl mx-auto leading-relaxed"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            At True Taste, we bring you the finest quality spices, carefully selected and
            hygienically processed to deliver pure spices and true flavors in every meal.
          </motion.p>
        </div>
      </section>

      {/* ===========================
          BRAND STATEMENT + IMAGE
          =========================== */}
      <section className="section-pad" aria-label="Brand statement">
        <div className="max-w-7xl mx-auto px-6 md:px-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">

            {/* Image */}
            <AnimatedSection direction="left">
              <div className="relative">
                {/* Decorative circle */}
                <div className="absolute -top-5 -left-5 w-20 h-20 rounded-full"
                  style={{ border: '1px solid rgba(122,163,62,0.2)' }} aria-hidden="true" />
                <div className="absolute -bottom-5 -right-5 w-32 h-32 rounded-full"
                  style={{ border: '1px solid rgba(242,230,201,0.5)' }} aria-hidden="true" />

                <div className="rounded-3xl overflow-hidden shadow-2xl" style={{ aspectRatio: '4/5' }}>
                  <Image
                    src="/images/hero-spice.jpg"
                    alt="Three wooden bowls of vibrant Indian spices — the True Taste collection"
                    width={700}
                    height={875}
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
            </AnimatedSection>

            {/* Story content */}
            <div>
              <AnimatedSection delay={0.1}>
                <blockquote className="font-playfair font-bold text-3xl md:text-4xl text-[#2E5E2E] leading-snug mb-8"
                  style={{ borderLeft: '3px solid #7AA33E', paddingLeft: '1.5rem' }}>
                  &ldquo;We believe the finest cooking starts with the finest spices.&rdquo;
                </blockquote>
              </AnimatedSection>

              <AnimatedSection delay={0.2}>
                <p className="font-lato text-[#7a6b4e] text-base leading-relaxed mb-6">
                  Indian cooking is one of the world&apos;s most vibrant culinary traditions —
                  built on the layered magic of spices. Every dish tells a story through its
                  aromas, and at the heart of that story are spices of uncompromised quality.
                </p>
              </AnimatedSection>

              <AnimatedSection delay={0.3}>
                <p className="font-lato text-[#7a6b4e] text-base leading-relaxed mb-8">
                  True Taste was born from a simple belief: that pure, naturally sourced spices —
                  selected with care and processed with hygiene — make every meal extraordinary.
                  We carry that belief into every batch, every pack and every pinch.
                </p>
              </AnimatedSection>

              <AnimatedSection delay={0.4}>
                <div className="divider-botanical mb-8">
                  <Leaf className="w-3 h-3 text-[#7AA33E]" />
                </div>
              </AnimatedSection>

              <AnimatedSection delay={0.45}>
                <p className="font-playfair font-bold text-[#2E5E2E] text-xl italic mb-2">
                  &ldquo;Pure Spices, True Flavors.&rdquo;
                </p>
                <p className="font-lato text-[#7AA33E] text-xs uppercase tracking-widest">True Taste Brand Promise</p>
              </AnimatedSection>
            </div>
          </div>
        </div>
      </section>

      {/* ===========================
          STORY CHAPTERS
          =========================== */}
      <section className="section-pad bg-[#F2E6C9]/35" aria-labelledby="chapters-heading">
        <div className="max-w-5xl mx-auto px-6">
          <AnimatedSection className="text-center mb-14">
            <div className="eyebrow justify-center mb-4">The Way We Work</div>
            <h2 className="text-headline text-[#2E5E2E]" id="chapters-heading">
              Four Chapters
            </h2>
          </AnimatedSection>

          <div className="space-y-8">
            {storyChapters.map((chapter, i) => (
              <AnimatedSection key={chapter.number} delay={i * 0.1}>
                <div className="relative flex gap-8 p-8 rounded-3xl bg-[#FFF8EF]"
                  style={{ border: '1px solid rgba(122,163,62,0.12)' }}>
                  {/* Number */}
                  <div className="flex-shrink-0">
                    <span className="font-playfair font-black text-4xl md:text-5xl leading-none"
                      style={{ color: 'rgba(122,163,62,0.15)' }}>
                      {chapter.number}
                    </span>
                  </div>
                  {/* Content */}
                  <div>
                    <h3 className="font-playfair font-bold text-[#2E5E2E] text-xl mb-3">
                      {chapter.title}
                    </h3>
                    <p className="font-lato text-[#7a6b4e] text-base leading-relaxed">
                      {chapter.body}
                    </p>
                  </div>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* ===========================
          VALUES SECTION
          =========================== */}
      <section className="section-pad" aria-labelledby="values-heading">
        <div className="max-w-7xl mx-auto px-6 md:px-10">
          <div className="text-center mb-14">
            <AnimatedSection>
              <div className="eyebrow justify-center mb-4">What We Stand For</div>
            </AnimatedSection>
            <AnimatedSection delay={0.1}>
              <h2 className="text-headline text-[#2E5E2E]" id="values-heading">Our Values</h2>
            </AnimatedSection>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
            {spiceValues.map((val, i) => (
              <AnimatedSection key={val.label} delay={i * 0.08}>
                <div className="text-center p-6 rounded-3xl transition-all duration-300 hover:-translate-y-1"
                  style={{ background: 'rgba(255,248,239,0.8)', border: '1px solid rgba(122,163,62,0.12)' }}>
                  <span className="text-3xl mb-3 block" role="img" aria-label={val.label}>{val.emoji}</span>
                  <h3 className="font-playfair font-bold text-[#2E5E2E] text-base mb-1.5">{val.label}</h3>
                  <p className="font-lato text-[#7a6b4e] text-xs leading-relaxed">{val.desc}</p>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* ===========================
          STORY IMAGE — SPICE BOX
          =========================== */}
      <section className="section-pad bg-[#2E5E2E] relative overflow-hidden" aria-label="Spice collection visual">
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background: 'radial-gradient(ellipse 50% 60% at 80% 50%, rgba(122,163,62,0.12) 0%, transparent 70%)',
          }}
        />
        <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <AnimatedSection>
                <div className="eyebrow mb-4" style={{ color: '#7AA33E' }}>The Collection</div>
              </AnimatedSection>
              <AnimatedSection delay={0.1}>
                <h2 className="text-headline text-[#F2E6C9] mb-6">
                  Five Spices.
                  <br />
                  <em className="italic" style={{ color: '#F2E6C9' }}>
                    Infinite Possibilities.
                  </em>
                </h2>
              </AnimatedSection>
              <AnimatedSection delay={0.2}>
                <p className="font-lato text-[#F2E6C9]/65 text-base leading-relaxed mb-8">
                  Red Chilli. Turmeric. Dhaniya. Jeera. Garam Masala. Five essential spices that
                  unlock the full spectrum of Indian cooking. Together, they carry centuries of
                  flavor tradition into your kitchen.
                </p>
              </AnimatedSection>
              <AnimatedSection delay={0.3}>
                <Link href="/products"
                  className="inline-flex items-center gap-2 bg-[#F2E6C9] text-[#2E5E2E] font-lato text-xs font-bold uppercase tracking-[0.12em] px-7 py-3.5 rounded-full hover:bg-white transition-colors duration-200 gap-2">
                  Explore the Collection
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </AnimatedSection>
            </div>
            <AnimatedSection direction="right" delay={0.15}>
              <div className="rounded-3xl overflow-hidden" style={{ aspectRatio: '4/3' }}>
                <Image
                  src="/images/story-editorial.jpg"
                  alt="A wooden spice box filled with True Taste spices — coriander, cumin, turmeric, chilli, garam masala"
                  width={700}
                  height={525}
                  className="w-full h-full object-cover"
                />
              </div>
            </AnimatedSection>
          </div>
        </div>
      </section>
    </>
  );
}
