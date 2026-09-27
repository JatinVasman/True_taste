import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import {
  Leaf,
  ShieldCheck,
  CheckCircle2,
  Sparkles,
  ArrowRight,
  MapPin,
  HelpCircle,
  PackageCheck,
  Flame,
} from 'lucide-react';
import { cities, getCityBySlug } from '@/lib/cities';
import { products } from '@/lib/products';

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return cities.map((city) => ({ slug: city.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const city = getCityBySlug(slug);
  if (!city) return {};

  const pageUrl = `https://truetaste.in/locations/${city.slug}`;

  return {
    title: city.seoTitle,
    description: city.metaDescription,
    keywords: [city.primaryKeyword, ...city.secondaryKeywords],
    alternates: {
      canonical: pageUrl,
    },
    openGraph: {
      title: `${city.seoTitle}`,
      description: city.metaDescription,
      url: pageUrl,
      type: 'website',
      images: [
        {
          url: '/images/hero-spice.jpg',
          width: 1200,
          height: 630,
          alt: `True Taste Premium Indian Spices in ${city.name}`,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: city.seoTitle,
      description: city.metaDescription,
      images: ['/images/hero-spice.jpg'],
    },
    robots: {
      index: true,
      follow: true,
    },
  };
}

export default async function LocationCityPage({ params }: Props) {
  const { slug } = await params;
  const city = getCityBySlug(slug);
  if (!city) notFound();

  // Find nearby city objects
  const nearbyCities = city.nearbyCitySlugs
    .map((s) => getCityBySlug(s))
    .filter((c): c is NonNullable<typeof c> => Boolean(c));

  // JSON-LD Schemas
  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: 'Home',
        item: 'https://truetaste.in',
      },
      {
        '@type': 'ListItem',
        position: 2,
        name: 'Locations',
        item: 'https://truetaste.in/locations',
      },
      {
        '@type': 'ListItem',
        position: 3,
        name: city.name,
        item: `https://truetaste.in/locations/${city.slug}`,
      },
    ],
  };

  const organizationSchema = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'True Taste',
    url: 'https://truetaste.in',
    logo: 'https://truetaste.in/images/hero-spice.jpg',
    description:
      'True Taste brings you the finest quality Indian spices, carefully selected and hygienically processed to deliver pure spices and true flavors.',
    contactPoint: {
      '@type': 'ContactPoint',
      telephone: '+91-8810303231',
      contactType: 'customer service',
      areaServed: 'IN',
      availableLanguage: ['en', 'hi'],
    },
    address: {
      '@type': 'PostalAddress',
      streetAddress: 'E-429 New Ashok Nagar',
      addressLocality: 'Delhi',
      postalCode: '110096',
      addressCountry: 'IN',
    },
  };

  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: city.faqs.map((faq) => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer,
      },
    })),
  };

  const productListSchema = {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name: `True Taste Spices for ${city.name}`,
    description: `Core authentic spice collection available for households in ${city.name}, ${city.state}.`,
    itemListElement: products.map((product, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      item: {
        '@type': 'Product',
        name: product.name,
        description: product.description,
        image: `https://truetaste.in${product.heroImage}`,
        brand: {
          '@type': 'Brand',
          name: 'True Taste',
        },
        offers: {
          '@type': 'AggregateOffer',
          priceCurrency: 'INR',
          lowPrice: product.pricing?.['50g'] || 47,
          highPrice: product.pricing?.['200g'] || 189,
          offerCount: 3,
        },
      },
    })),
  };

  return (
    <div className="min-h-screen bg-[#FFF8EF]">
      {/* Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(productListSchema) }}
      />

      {/* Hero Section */}
      <section className="relative pt-32 pb-16 px-6 md:px-10 bg-gradient-to-b from-[#2E5E2E]/10 via-[#FFF8EF] to-[#FFF8EF] overflow-hidden">
        <div className="absolute top-12 right-12 w-96 h-96 bg-[#7AA33E]/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute top-28 left-8 w-72 h-72 bg-[#F2E6C9]/40 rounded-full blur-2xl pointer-events-none" />

        <div className="max-w-5xl mx-auto relative z-10">
          {/* Breadcrumb Navigation */}
          <nav aria-label="Breadcrumb" className="mb-6 flex items-center gap-2 text-xs font-lato text-[#7a6b4e]">
            <Link href="/" className="hover:text-[#2E5E2E] transition-colors">
              Home
            </Link>
            <span className="text-[#7AA33E]">/</span>
            <Link href="/locations" className="hover:text-[#2E5E2E] transition-colors">
              Locations
            </Link>
            <span className="text-[#7AA33E]">/</span>
            <span className="text-[#2E5E2E] font-bold">{city.name}</span>
          </nav>

          {/* Location Classification Badge */}
          <div className="flex flex-wrap items-center gap-2 mb-4">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#2E5E2E]/10 text-[#2E5E2E] text-xs font-lato font-bold uppercase tracking-wider">
              <MapPin className="w-3.5 h-3.5 text-[#7AA33E]" />
              {city.name}, {city.state}
            </span>
            <span className="px-2.5 py-1 rounded-full bg-[#7AA33E]/15 text-[#2E5E2E] text-xs font-lato font-bold">
              {city.tier}
            </span>
            <span className="px-2.5 py-1 rounded-full bg-stone-100 text-[#7a6b4e] text-xs font-lato font-bold">
              {city.region} India
            </span>
          </div>

          {/* SEO Optimized H1 */}
          <h1 className="font-playfair font-extrabold text-[#2E5E2E] text-3xl sm:text-4xl md:text-5xl lg:text-6xl leading-[1.1] mb-6">
            Premium Spices in {city.name}
          </h1>

          <p className="font-lato text-[#7a6b4e] text-base md:text-lg max-w-3xl leading-relaxed mb-8">
            Experience the authentic aroma, rich warmth, and natural colors of 100% pure, unadulterated spices.
            Crafted for discerning home cooks in {city.name}, True Taste brings farm-fresh, stone-ground Red Chilli,
            Turmeric, Dhaniya, Jeera, and artisanal Garam Masala straight to your table.
          </p>

          {/* Trust Highlights Row */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-6 border-t border-[rgba(122,163,62,0.25)]">
            {[
              { title: '100% Pure', desc: 'No added colors or fillers' },
              { title: 'Stone Ground', desc: 'Cold milled for essential oils' },
              { title: 'Lab Tested', desc: 'FSSAI certified quality' },
              { title: 'Aroma-Lock', desc: 'Zipper fresh packaging' },
            ].map((t) => (
              <div key={t.title} className="flex items-start gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-[#7AA33E] mt-0.5 flex-shrink-0" />
                <div>
                  <h4 className="font-playfair font-bold text-[#2E5E2E] text-xs leading-snug">{t.title}</h4>
                  <p className="font-lato text-[0.7rem] text-[#7a6b4e]">{t.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Regional Culinary Context Section */}
      <section className="max-w-5xl mx-auto px-6 md:px-10 py-12">
        <div className="bg-[#FFFDF8] rounded-3xl p-6 sm:p-10 border border-[rgba(242,230,201,0.9)] shadow-sm">
          <div className="flex items-center gap-2 text-xs font-lato font-bold text-[#7AA33E] uppercase tracking-[0.2em] mb-3">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Regional Culinary Context</span>
          </div>

          <h2 className="font-playfair font-bold text-[#2E5E2E] text-2xl sm:text-3xl mb-4">
            The Spice Traditions of {city.name} &amp; {city.state}
          </h2>

          <p className="font-lato text-[#7a6b4e] text-sm sm:text-base leading-relaxed mb-6">
            In {city.name} and across {city.state}, cooking is deeply rooted in heritage and distinct flavor profiles.
            Whether preparing {city.culinaryContext}, the secret to unforgettable taste lies in unadulterated spices.
            When powdered spices are diluted with starch or artificial coloring, traditional curries lose their
            characteristic body and lingering aroma.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 pt-4 border-t border-stone-100">
            <div className="p-4 rounded-2xl bg-[#FFF8EF]/60 border border-stone-100">
              <h3 className="font-playfair font-bold text-[#2E5E2E] text-sm mb-1.5 flex items-center gap-2">
                <Flame className="w-4 h-4 text-[#C0392B]" />
                Authentic Heat &amp; Vibrant Hue
              </h3>
              <p className="font-lato text-xs text-[#7a6b4e] leading-relaxed">
                Our stone-ground red chilli powder imparts a deep natural crimson red without dangerous synthetic food
                dyes, giving your gravies in {city.name} balanced warmth and pure flavor.
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-[#FFF8EF]/60 border border-stone-100">
              <h3 className="font-playfair font-bold text-[#2E5E2E] text-sm mb-1.5 flex items-center gap-2">
                <Leaf className="w-4 h-4 text-[#7AA33E]" />
                Curcumin-Rich Golden Turmeric
              </h3>
              <p className="font-lato text-xs text-[#7a6b4e] leading-relaxed">
                Procured from premier roots, our golden turmeric boasts high natural curcumin content, delivering the
                earthy aroma and vibrant brilliance expected in traditional Indian kitchens.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* PRODUCT SHOWCASE (MUST FEATURE ALL 5 CORE SPICES) */}
      <section className="max-w-6xl mx-auto px-6 md:px-10 py-12">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <span className="text-[#7AA33E] font-lato text-xs font-bold uppercase tracking-[0.22em] block mb-2">
            The True Taste Collection
          </span>
          <h2 className="font-playfair font-bold text-[#2E5E2E] text-3xl sm:text-4xl leading-tight mb-3">
            Explore Our Spices for {city.name} Kitchens
          </h2>
          <p className="font-lato text-[#7a6b4e] text-sm leading-relaxed">
            Discover our 5 essential spices, hygienically processed and packed to preserve peak fragrance and flavor in
            every meal.
          </p>
        </div>

        {/* 5 Product Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {products.map((product) => (
            <div
              key={product.slug}
              className="bg-[#FFFDF8] rounded-2xl overflow-hidden border border-[rgba(242,230,201,0.85)] shadow-sm hover:shadow-md transition-all duration-300 flex flex-col group"
            >
              {/* Image container */}
              <div
                className="relative h-56 overflow-hidden"
                style={{
                  background: `linear-gradient(145deg, ${product.spiceColor}12 0%, #f2e6c9 100%)`,
                }}
              >
                <Image
                  src={product.heroImage}
                  alt={`${product.name} — pure spice in ${city.name}`}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                />
                <div className="absolute top-3 left-3">
                  <span className="font-lato font-bold uppercase tracking-wider text-[0.6rem] px-2.5 py-1 rounded-full bg-[#FFF8EF]/90 text-[#2E5E2E] border border-[#2E5E2E]/10">
                    {product.category === 'ground' ? 'Ground' : product.category === 'whole' ? 'Whole' : 'Blend'}
                  </span>
                </div>
                <div
                  className="absolute bottom-3 right-3 w-3 h-3 rounded-full"
                  style={{ background: product.spiceColor }}
                />
              </div>

              {/* Product Info */}
              <div className="p-5 flex-1 flex flex-col justify-between">
                <div>
                  <h3 className="font-playfair font-bold text-[#2E5E2E] text-xl mb-1 group-hover:text-[#7AA33E] transition-colors">
                    {product.name}
                  </h3>
                  <p
                    className="font-lato font-bold text-[0.65rem] uppercase tracking-wider mb-2.5"
                    style={{ color: product.spiceColor }}
                  >
                    {product.ingredient}
                  </p>
                  <p className="font-lato text-xs text-[#7a6b4e] leading-relaxed line-clamp-2 mb-4">
                    {product.description}
                  </p>
                </div>

                <div>
                  {/* Sizes pill row */}
                  <div className="flex items-center gap-1.5 mb-4">
                    {['50g', '100g', '200g'].map((sz) => (
                      <span
                        key={sz}
                        className="text-[0.62rem] font-lato font-bold text-[#7a6b4e] px-2 py-0.5 rounded-full border border-stone-200 bg-[#FFF8EF]"
                      >
                        {sz}
                      </span>
                    ))}
                  </div>

                  <Link
                    href={`/products/${product.slug}`}
                    className="w-full inline-flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl text-xs font-lato font-bold text-[#FFF8EF] bg-[#2E5E2E] hover:bg-[#1e3e1e] transition-colors group-hover:shadow"
                  >
                    <span>View Product Details</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>
            </div>
          ))}

          {/* 6th Card: All Products Overview Card */}
          <div className="bg-gradient-to-br from-[#2E5E2E] to-[#1e3e1e] text-[#FFF8EF] rounded-2xl p-6 sm:p-8 flex flex-col justify-between shadow-sm">
            <div>
              <div className="w-10 h-10 rounded-full bg-[#7AA33E]/20 flex items-center justify-center mb-4">
                <PackageCheck className="w-5 h-5 text-[#F2E6C9]" />
              </div>
              <span className="text-[#7AA33E] font-lato text-xs font-bold uppercase tracking-wider block mb-1">
                Full Collection
              </span>
              <h3 className="font-playfair font-bold text-2xl mb-3 text-[#F2E6C9]">
                Complete Spice Pantry for {city.name}
              </h3>
              <p className="font-lato text-xs text-[#F2E6C9]/75 leading-relaxed mb-6">
                Stock your kitchen with all 5 essential Indian spices. From morning tempering to slow-cooked evening
                curries, experience True Taste purity in every pinch.
              </p>
            </div>

            <Link
              href="/products"
              className="inline-flex items-center justify-center gap-2 py-3 px-5 rounded-xl text-xs font-lato font-bold bg-[#F2E6C9] text-[#2E5E2E] hover:bg-white transition-colors"
            >
              <span>Explore All Products</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* Why Choose True Taste in City */}
      <section className="max-w-5xl mx-auto px-6 md:px-10 py-12">
        <div className="text-center max-w-xl mx-auto mb-10">
          <span className="text-[#7AA33E] font-lato text-xs font-bold uppercase tracking-[0.2em] block mb-2">
            The True Taste Difference
          </span>
          <h2 className="font-playfair font-bold text-[#2E5E2E] text-2xl sm:text-3xl">
            Why Discerning Kitchens in {city.name} Choose True Taste
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          {[
            {
              icon: ShieldCheck,
              title: 'Uncompromised Purity Standards',
              desc: `Unlike ordinary store-bought powders in ${city.name}, our spices contain zero artificial coloring, no preservatives, and no industrial fillers. Tested for safety and authenticity.`,
            },
            {
              icon: Sparkles,
              title: 'Traditional Slow Stone-Grinding',
              desc: `Spices are ground at controlled low temperatures to protect essential oils, volatile aroma compounds, and true flavors that high-speed commercial grinding destroys.`,
            },
            {
              icon: Leaf,
              title: 'Single-Origin Procurement',
              desc: `Every whole spice is carefully sourced from accredited Indian growing regions renowned for optimal climate, soil, and botanical strength.`,
            },
            {
              icon: PackageCheck,
              title: 'Freshness-Sealed Packaging',
              desc: `Multi-layer protective packaging keeps moisture, light, and humidity out, keeping your spices as aromatic on day ninety as day one in ${city.name}.`,
            },
          ].map((item) => (
            <div
              key={item.title}
              className="p-6 bg-[#FFFDF8] rounded-2xl border border-[rgba(242,230,201,0.85)] flex items-start gap-4"
            >
              <div className="w-10 h-10 rounded-xl bg-[#2E5E2E]/10 flex items-center justify-center flex-shrink-0 text-[#2E5E2E]">
                <item.icon className="w-5 h-5 text-[#7AA33E]" />
              </div>
              <div>
                <h3 className="font-playfair font-bold text-[#2E5E2E] text-base mb-1.5">{item.title}</h3>
                <p className="font-lato text-xs text-[#7a6b4e] leading-relaxed">{item.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Relevant FAQs */}
      <section className="max-w-4xl mx-auto px-6 md:px-10 py-12">
        <div className="text-center max-w-lg mx-auto mb-10">
          <div className="inline-flex items-center gap-2 text-xs font-lato font-bold text-[#7AA33E] uppercase tracking-[0.2em] mb-2">
            <HelpCircle className="w-4 h-4" />
            <span>Got Questions?</span>
          </div>
          <h2 className="font-playfair font-bold text-[#2E5E2E] text-2xl sm:text-3xl">
            Frequently Asked Questions for {city.name}
          </h2>
        </div>

        <div className="space-y-4">
          {city.faqs.map((faq) => (
            <div
              key={faq.question}
              className="bg-[#FFFDF8] p-6 rounded-2xl border border-[rgba(242,230,201,0.85)] shadow-xs"
            >
              <h3 className="font-playfair font-bold text-[#2E5E2E] text-base mb-2">{faq.question}</h3>
              <p className="font-lato text-xs sm:text-sm text-[#7a6b4e] leading-relaxed">{faq.answer}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Nearby Indian Locations (Internal Linking) */}
      {nearbyCities.length > 0 && (
        <section className="max-w-5xl mx-auto px-6 md:px-10 py-10">
          <div className="border-t border-stone-200/60 pt-10">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
              <div>
                <span className="text-[#7AA33E] font-lato text-[0.65rem] font-bold uppercase tracking-[0.2em] block mb-1">
                  Regional Discovery
                </span>
                <h3 className="font-playfair font-bold text-[#2E5E2E] text-xl">
                  Explore Spices in Nearby Indian Cities
                </h3>
              </div>
              <Link
                href="/locations"
                className="text-xs font-lato font-bold text-[#7AA33E] hover:text-[#2E5E2E] transition-colors inline-flex items-center gap-1 group"
              >
                <span>Browse All Indian Locations</span>
                <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-3">
              {nearbyCities.map((nc) => (
                <Link
                  key={nc.slug}
                  href={`/locations/${nc.slug}`}
                  className="p-3 bg-[#FFFDF8] rounded-xl border border-stone-200/80 hover:border-[#7AA33E] text-center transition-all group"
                >
                  <p className="font-playfair font-bold text-[#2E5E2E] text-xs group-hover:text-[#7AA33E] transition-colors truncate">
                    {nc.name}
                  </p>
                  <span className="text-[0.65rem] text-[#7a6b4e] font-lato block">{nc.tier}</span>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* CTA Section */}
      <section className="max-w-5xl mx-auto px-6 md:px-10 py-12 pb-20">
        <div className="bg-[#2E5E2E] text-[#FFF8EF] rounded-3xl p-8 sm:p-12 text-center relative overflow-hidden shadow-lg">
          <div className="relative z-10 max-w-2xl mx-auto">
            <div className="w-12 h-12 bg-[#F2E6C9] rounded-full flex items-center justify-center mx-auto mb-4">
              <Leaf className="w-6 h-6 text-[#2E5E2E]" />
            </div>
            <h2 className="font-playfair font-bold text-2xl sm:text-4xl text-[#F2E6C9] mb-4">
              Bring True Taste to Your Kitchen in {city.name}
            </h2>
            <p className="font-lato text-xs sm:text-sm text-[#F2E6C9]/80 leading-relaxed mb-8">
              Elevate your home cooking with our 100% natural, lab-tested spices. Stone-ground for pure flavor and true
              goodness in every pinch.
            </p>
            <div className="flex flex-wrap items-center justify-center gap-3">
              <Link
                href="/products"
                className="px-6 py-3 rounded-full bg-[#F2E6C9] text-[#2E5E2E] font-lato font-bold text-xs uppercase tracking-wider hover:bg-white transition-all shadow"
              >
                Shop All 5 Spices
              </Link>
              <Link
                href="/locations"
                className="px-6 py-3 rounded-full border border-[#F2E6C9]/40 text-[#F2E6C9] font-lato font-bold text-xs uppercase tracking-wider hover:bg-[#F2E6C9]/10 transition-all"
              >
                View City Directory
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
