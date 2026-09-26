'use client';

import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowRight, Leaf, Shield, Sparkles, Heart, Recycle } from 'lucide-react';
import AnimatedSection from '@/components/AnimatedSection';

/* =============================================
   QUALITY PAGE
   "Quality You Can See. Flavor You Can Taste."
   ============================================= */

const qualityMarks = [
  {
    icon: Leaf,
    title: '100% Natural',
    description:
      'Our spices contain absolutely no artificial flavours, colours or preservatives. What you taste is purely nature.',
    packagingText: 'As stated on every True Taste pack.',
  },
  {
    icon: Sparkles,
    title: 'Rich in Aroma',
    description:
      'Whole spices at their peak are carefully ground to preserve the natural essential oils responsible for each spice\'s signature aroma.',
    packagingText: 'Rich in Aroma — a True Taste promise.',
  },
  {
    icon: Shield,
    title: 'Premium Quality',
    description:
      'Every batch is processed under strict hygiene standards to ensure consistent quality and safety from source to shelf.',
    packagingText: 'Premium Quality — printed on every pack.',
  },
  {
    icon: Heart,
    title: 'Made with Care',
    description:
      'From selection to packaging, each step is carried out with attention to detail and genuine care for what we produce.',
    packagingText: 'Made with Care — our core approach.',
  },
  {
    icon: Leaf,
    title: 'Naturally Sourced',
    description:
      'We source whole spices from their natural growing environments, ensuring the authentic character of each ingredient.',
    packagingText: 'Naturally Sourced — on every True Taste pack.',
  },
  {
    icon: Recycle,
    title: 'Recyclable Packaging',
    description:
      'True Taste is committed to responsible packaging. Our packs are designed to be recyclable — good for your kitchen and the planet.',
    packagingText: 'Recyclable Packaging — part of our commitment.',
  },
];

const packagingFacts = [
  { label: 'Pure Spices', value: '✓' },
  { label: 'No Additives', value: '✓' },
  { label: 'Naturally Sourced', value: '✓' },
  { label: 'Recyclable Packaging', value: '✓' },
  { label: 'FSSAI Certified', value: '✓' },
  { label: 'Made in India', value: '✓' },
];

export default function QualityClient() {
  return (
    <>
      {/* ===========================
          PAGE HERO
          =========================== */}
      <section
        className="relative pt-40 pb-24 overflow-hidden"
        style={{ background: '#FFF8EF' }}
        aria-labelledby="quality-page-heading"
      >
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              'radial-gradient(ellipse 70% 60% at 50% 0%, rgba(242, 230, 201, 0.6) 0%, transparent 70%)',
          }}
        />

        <div className="relative z-10 max-w-4xl mx-auto px-6 text-center">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="eyebrow justify-center mb-5">Our Quality Promise</div>
          </motion.div>
          <motion.h1
            className="text-display text-[#2E5E2E] mb-4"
            initial={{ opacity: 0, y: 28 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
            id="quality-page-heading"
          >
            Quality You Can See.
            <br />
            <em className="italic" style={{ color: '#5A2E0D' }}>
              Flavor You Can Taste.
            </em>
          </motion.h1>
          <motion.p
            className="font-lato text-[#7a6b4e] text-lg max-w-lg mx-auto leading-relaxed"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            Every True Taste spice is backed by a four-pillar quality promise printed on every pack.
          </motion.p>
        </div>
      </section>

      {/* ===========================
          QUALITY GRID
          =========================== */}
      <section className="section-pad" aria-labelledby="quality-marks-heading">
        <div className="max-w-7xl mx-auto px-6 md:px-10">
          <div className="text-center mb-14">
            <AnimatedSection>
              <div className="eyebrow justify-center mb-4">On Every Pack</div>
            </AnimatedSection>
            <AnimatedSection delay={0.1}>
              <h2 className="text-headline text-[#2E5E2E]" id="quality-marks-heading">
                The Six Standards
              </h2>
            </AnimatedSection>
            <AnimatedSection delay={0.2}>
              <div className="divider-botanical max-w-xs mx-auto mt-6">
                <Leaf className="w-3 h-3 text-[#7AA33E]" />
              </div>
            </AnimatedSection>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {qualityMarks.map((mark, i) => {
              const Icon = mark.icon;
              return (
                <AnimatedSection key={mark.title} delay={i * 0.08}>
                  <div className="p-8 rounded-3xl h-full transition-all duration-300 hover:-translate-y-1 hover:shadow-lg"
                    style={{ background: '#FFFDF8', border: '1px solid rgba(122,163,62,0.12)' }}>
                    <div className="w-12 h-12 rounded-2xl flex items-center justify-center mb-5"
                      style={{ background: 'rgba(122,163,62,0.1)' }}>
                      <Icon className="w-5 h-5 text-[#7AA33E]" />
                    </div>
                    <h3 className="font-playfair font-bold text-[#2E5E2E] text-xl mb-3">
                      {mark.title}
                    </h3>
                    <p className="font-lato text-[#7a6b4e] text-sm leading-relaxed mb-4">
                      {mark.description}
                    </p>
                    <p className="font-lato text-[0.65rem] uppercase tracking-wider text-[#7AA33E] font-bold">
                      {mark.packagingText}
                    </p>
                  </div>
                </AnimatedSection>
              );
            })}
          </div>
        </div>
      </section>

      {/* ===========================
          PACKAGING FACTS BANNER
          =========================== */}
      <section className="py-16 bg-[#2E5E2E]" aria-label="Quality certification facts">
        <div className="max-w-5xl mx-auto px-6">
          <AnimatedSection className="text-center mb-10">
            <h2 className="font-playfair font-bold text-[#F2E6C9] text-2xl">
              On Every True Taste Pack
            </h2>
          </AnimatedSection>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
            {packagingFacts.map((fact, i) => (
              <AnimatedSection key={fact.label} delay={i * 0.06}>
                <div className="text-center p-5 rounded-2xl"
                  style={{ background: 'rgba(255,248,239,0.07)', border: '1px solid rgba(242,230,201,0.12)' }}>
                  <p className="font-playfair font-bold text-[#7AA33E] text-2xl mb-1">{fact.value}</p>
                  <p className="font-lato text-[#F2E6C9]/65 text-xs uppercase tracking-wider">{fact.label}</p>
                </div>
              </AnimatedSection>
            ))}
          </div>

          <AnimatedSection className="text-center mt-10" delay={0.4}>
            <p className="font-lato text-[#F2E6C9]/50 text-xs tracking-wider">
              FSSAI Lic. No. 23326003003695 · Made in India
            </p>
          </AnimatedSection>
        </div>
      </section>

      {/* ===========================
          SPICE VISUAL — Visual storytelling
          =========================== */}
      <section className="section-pad" aria-label="Quality spice visual">
        <div className="max-w-7xl mx-auto px-6 md:px-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">

            <div>
              <AnimatedSection>
                <div className="eyebrow mb-4">Hygienically Processed</div>
              </AnimatedSection>
              <AnimatedSection delay={0.1}>
                <h2 className="text-headline text-[#2E5E2E] mb-6">
                  From Nature,
                  <br />
                  <em className="italic" style={{ color: '#5A2E0D' }}>to Your Kitchen</em>
                </h2>
              </AnimatedSection>
              <AnimatedSection delay={0.2}>
                <p className="font-lato text-[#7a6b4e] text-base leading-relaxed mb-5">
                  Storage instructions are simple and designed to help you keep every True Taste spice
                  at its absolute best: store in a cool, dry place away from direct sunlight, and keep
                  the container tightly closed after every use.
                </p>
              </AnimatedSection>
              <AnimatedSection delay={0.3}>
                <p className="font-lato text-[#7a6b4e] text-base leading-relaxed mb-8">
                  This attention to preservation — both in our packaging and our instructions —
                  ensures the spice you receive today tastes just as good as the day it was packed.
                </p>
              </AnimatedSection>
              <AnimatedSection delay={0.4}>
                <Link href="/products" className="btn-primary">
                  Explore the Spices
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </AnimatedSection>
            </div>

            <AnimatedSection direction="right" delay={0.15}>
              <div className="grid grid-cols-2 gap-4">
                <div className="rounded-3xl overflow-hidden aspect-[4/5] shadow-sm">
                  <Image
                    src="/images/red-chilli.jpg"
                    alt="Red Chilli Powder in a wooden bowl"
                    width={350}
                    height={438}
                    className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                  />
                </div>
                <div className="rounded-3xl overflow-hidden aspect-[4/5] shadow-sm">
                  <Image
                    src="/images/turmeric.jpg"
                    alt="Turmeric Powder in a wooden bowl"
                    width={350}
                    height={438}
                    className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                  />
                </div>
                <div className="rounded-3xl overflow-hidden aspect-[4/5] shadow-sm">
                  <Image
                    src="/images/dhaniya.jpg"
                    alt="Dhaniya Powder with fresh coriander"
                    width={350}
                    height={438}
                    className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                  />
                </div>
                <div className="rounded-3xl overflow-hidden aspect-[4/5] shadow-sm">
                  <Image
                    src="/images/garam-masala.jpg"
                    alt="Garam Masala Powder with whole spices"
                    width={350}
                    height={438}
                    className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                  />
                </div>
              </div>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* ===========================
          CTA
          =========================== */}
      <section className="py-20 bg-[#F2E6C9]/30" aria-labelledby="quality-cta">
        <div className="max-w-3xl mx-auto px-6 text-center">
          <AnimatedSection>
            <h2 className="text-headline text-[#2E5E2E] mb-5" id="quality-cta">
              Ready to Taste the Difference?
            </h2>
          </AnimatedSection>
          <AnimatedSection delay={0.1}>
            <p className="font-lato text-[#7a6b4e] text-base leading-relaxed mb-9 max-w-md mx-auto">
              Discover the True Taste spice collection and bring pure, natural flavors to your cooking.
            </p>
          </AnimatedSection>
          <AnimatedSection delay={0.2} className="flex flex-wrap gap-4 justify-center">
            <Link href="/products" className="btn-primary">
              Shop the Collection
              <ArrowRight className="w-4 h-4" />
            </Link>
            <Link href="/contact" className="btn-outline">
              Contact Us
            </Link>
          </AnimatedSection>
        </div>
      </section>
    </>
  );
}
