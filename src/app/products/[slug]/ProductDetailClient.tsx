'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { ArrowRight, ArrowLeft, Phone, Mail, Leaf, Check, ShoppingCart, Plus, Minus } from 'lucide-react';
import AnimatedSection from '@/components/AnimatedSection';
import ProductCard from '@/components/ProductCard';
import ProductImageGallery from '@/components/ProductImageGallery';
import { products, type Product } from '@/lib/products';
import { useCartStore } from '@/lib/cart';
import { useCartDrawer } from '@/lib/cartDrawer';
import WhatsAppIcon from '@/components/WhatsAppIcon';
import { buildProductWhatsAppMessage, redirectToWhatsApp } from '@/lib/whatsapp';

type Size = '50g' | '100g' | '200g';

const SIZES: Size[] = ['50g', '100g', '200g'];

const SIZE_TO_INDEX: Record<Size, number> = {
  '50g': 1,
  '100g': 2,
  '200g': 3,
};

const INDEX_TO_SIZE: Record<number, Size> = {
  1: '50g',
  2: '100g',
  3: '200g',
};

function packImageFor(product: Product, size: Size): string {
  const map: Record<Size, string> = {
    '50g': product.packImage50g,
    '100g': product.packImage100g,
    '200g': product.packImage200g,
  };
  return map[size];
}

interface Props {
  product: Product;
}

export default function ProductDetailClient({ product }: Props) {
  const router = useRouter();
  const [selectedSize, setSelectedSize] = useState<Size>('100g');
  const [activeImageIndex, setActiveImageIndex] = useState<number>(0);
  const [quantity, setQuantity] = useState<number>(1);

  const addItem = useCartStore((s) => s.addItem);
  const openCart = useCartDrawer((s) => s.openCart);

  function handleSelectSize(s: Size) {
    setSelectedSize(s);
    setActiveImageIndex(SIZE_TO_INDEX[s]);
  }

  function handleGalleryIndexChange(idx: number) {
    setActiveImageIndex(idx);
    if (INDEX_TO_SIZE[idx]) {
      setSelectedSize(INDEX_TO_SIZE[idx]);
    }
  }

  function handleAddToCart() {
    if (!product.pricing) return;
    addItem({
      productId: product.id,
      slug: product.slug,
      name: product.name,
      image: packImageFor(product, selectedSize),
      size: selectedSize,
      unitPrice: product.pricing[selectedSize],
      quantity,
    });
    openCart();
  }

  function handleOrderOnWhatsApp() {
    if (!product.pricing) {
      const message = `Hello True Taste! 👋 I would like to enquire about ordering *${product.name}*.\n\nProduct: ${product.name}\nLink: ${typeof window !== 'undefined' ? window.location.href : ''}`;
      redirectToWhatsApp(message);
      return;
    }
    const message = buildProductWhatsAppMessage({
      name: product.name,
      size: selectedSize,
      quantity,
      unitPrice: product.pricing[selectedSize],
      slug: product.slug,
    });
    redirectToWhatsApp(message);
  }

  function handleBuyNow() {
    handleOrderOnWhatsApp();
  }

  const otherProducts = products.filter((p) => p.id !== product.id).slice(0, 3);
  const categoryLabel =
    product.category === 'ground' ? 'Ground Spice'
      : product.category === 'whole' ? 'Whole Spice'
      : 'Spice Blend';

  return (
    <>
      {/* ===========================
          BACK NAVIGATION
          =========================== */}
      <div className="pt-28 pb-0 max-w-7xl mx-auto px-6 md:px-10">
        <Link
          href="/products"
          className="inline-flex items-center gap-2 text-[#7a6b4e] font-lato text-sm hover:text-[#2E5E2E] transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Collection
        </Link>
      </div>

      {/* ===========================
          PRODUCT HERO
          =========================== */}
      <section
        className="pt-8 pb-20 section-pad"
        style={{ background: '#FFF8EF' }}
        aria-labelledby="product-heading"
      >
        <div className="max-w-7xl mx-auto px-6 md:px-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-start">

            {/* LEFT — Product Images (Flipkart-Style Multi-Image Showcase) */}
            <div className="w-full">
              <ProductImageGallery
                product={product}
                activeIndex={activeImageIndex}
                onIndexChange={handleGalleryIndexChange}
              />
            </div>

            {/* RIGHT — Product Info */}
            <div className="lg:pt-4">
              <AnimatedSection>
                <div className="eyebrow mb-3">{categoryLabel}</div>
              </AnimatedSection>

              <AnimatedSection delay={0.1}>
                <h1
                  className="font-playfair font-bold text-[#2E5E2E] mb-2 leading-tight"
                  style={{ fontSize: 'clamp(2rem, 5vw, 3.2rem)' }}
                  id="product-heading"
                >
                  {product.name}
                </h1>
              </AnimatedSection>

              <AnimatedSection delay={0.15}>
                <p className="font-playfair italic text-[#5A2E0D] text-lg mb-6">
                  {product.packagingTagline}
                </p>
              </AnimatedSection>

              <AnimatedSection delay={0.2}>
                <div className="divider-botanical mb-7">
                  <Leaf className="w-3 h-3 text-[#7AA33E]" />
                </div>
              </AnimatedSection>

              <AnimatedSection delay={0.25}>
                <p className="font-lato text-[#7a6b4e] text-base leading-relaxed mb-8">
                  {product.description}
                </p>
              </AnimatedSection>

              {/* Ingredient */}
              <AnimatedSection delay={0.3}>
                <div className="mb-7 flex items-center gap-3">
                  <Check className="w-4 h-4 text-[#7AA33E]" />
                  <span className="font-lato text-sm text-[#2E5E2E] font-bold">
                    {product.ingredient}
                  </span>
                </div>
              </AnimatedSection>

              {/* Size + Pricing selector */}
              <AnimatedSection delay={0.35}>
                <div className="mb-8">
                  <p className="font-lato text-xs font-bold uppercase tracking-wider text-[#2E5E2E] mb-4">
                    {product.pricing ? 'Select Size & Price' : 'Available Sizes'}
                  </p>

                  {product.pricing ? (
                    /* ── Premium price cards ── */
                    <div className="flex gap-3" role="group" aria-label="Select a size">
                      {SIZES.map((s) => {
                        const active = selectedSize === s;
                        return (
                          <button
                            key={s}
                            onClick={() => handleSelectSize(s)}
                            aria-pressed={active}
                            aria-label={`${s} — ₹${product.pricing![s]}`}
                            style={{
                              flex: 1,
                              display: 'flex',
                              flexDirection: 'column',
                              alignItems: 'center',
                              gap: '0.3rem',
                              padding: '0.85rem 0.5rem',
                              borderRadius: '1rem',
                              border: active
                                ? '2px solid #2E5E2E'
                                : '2px solid rgba(46,94,46,0.15)',
                              background: active
                                ? 'linear-gradient(145deg, #2E5E2E 0%, #3d7a3d 100%)'
                                : 'rgba(255,248,239,0.6)',
                              color: active ? '#FFF8EF' : '#7a6b4e',
                              cursor: 'pointer',
                              transition: 'all 220ms cubic-bezier(0.22,1,0.36,1)',
                              boxShadow: active
                                ? '0 4px 18px rgba(46,94,46,0.28), 0 0 0 3px rgba(122,163,62,0.25)'
                                : '0 1px 4px rgba(90,46,13,0.06)',
                              transform: active ? 'translateY(-2px)' : 'none',
                            }}
                          >
                            <span
                              style={{
                                fontFamily: "'Lato', sans-serif",
                                fontSize: '0.65rem',
                                fontWeight: 700,
                                letterSpacing: '0.1em',
                                textTransform: 'uppercase',
                                opacity: active ? 0.85 : 0.7,
                              }}
                            >
                              {s}
                            </span>
                            <span
                              style={{
                                fontFamily: "'Playfair Display', Georgia, serif",
                                fontWeight: 700,
                                fontSize: '1.15rem',
                                lineHeight: 1,
                                color: active ? '#F2E6C9' : '#2E5E2E',
                              }}
                            >
                              ₹{product.pricing![s]}
                            </span>
                            {active && (
                              <span
                                style={{
                                  marginTop: '0.15rem',
                                  width: '1.5rem',
                                  height: '2px',
                                  borderRadius: '99px',
                                  background: 'rgba(242,230,201,0.5)',
                                  display: 'block',
                                }}
                              />
                            )}
                          </button>
                        );
                      })}
                    </div>
                  ) : (
                    /* ── Plain size pills (Garam Masala fallback) ── */
                    <div className="flex gap-3">
                      {SIZES.map((s) => (
                        <button
                          key={s}
                          className={`qty-pill ${selectedSize === s ? 'active' : ''}`}
                          onClick={() => handleSelectSize(s)}
                          aria-pressed={selectedSize === s}
                          aria-label={`Select ${s} size`}
                        >
                          {s}
                        </button>
                      ))}
                    </div>
                  )}

                  {/* Selected price display */}
                  {product.pricing && (
                    <div
                      className="mt-4 flex items-center justify-between px-4 py-3 rounded-xl"
                      style={{
                        background: 'linear-gradient(90deg, rgba(122,163,62,0.08) 0%, rgba(46,94,46,0.05) 100%)',
                        border: '1px solid rgba(122,163,62,0.18)',
                      }}
                    >
                      <div>
                        <p
                          style={{
                            fontFamily: "'Lato', sans-serif",
                            fontSize: '0.6rem',
                            fontWeight: 700,
                            letterSpacing: '0.15em',
                            textTransform: 'uppercase',
                            color: '#7AA33E',
                            marginBottom: '0.1rem',
                          }}
                        >
                          MRP (incl. of all taxes)
                        </p>
                        <p
                          style={{
                            fontFamily: "'Lato', sans-serif",
                            fontWeight: 700,
                            fontSize: '1.6rem',
                            lineHeight: 1,
                            color: '#2E5E2E',
                            letterSpacing: '0',
                          }}
                        >
                          ₹{product.pricing[selectedSize]}
                          <span
                            style={{
                              fontFamily: "'Lato', sans-serif",
                              fontSize: '0.75rem',
                              fontWeight: 400,
                              color: '#7a6b4e',
                              marginLeft: '0.4rem',
                            }}
                          >
                            / {selectedSize}
                          </span>
                        </p>
                      </div>
                      <span
                        style={{
                          fontFamily: "'Lato', sans-serif",
                          fontSize: '0.55rem',
                          fontWeight: 700,
                          letterSpacing: '0.1em',
                          textTransform: 'uppercase',
                          color: '#7AA33E',
                          background: 'rgba(122,163,62,0.1)',
                          padding: '0.2rem 0.5rem',
                          borderRadius: '99px',
                        }}
                      >
                        ✦ Best Value
                      </span>
                    </div>
                  )}
                </div>
              </AnimatedSection>

              {/* CTAs & Quantity Selector */}
              <AnimatedSection delay={0.4} className="mb-10">
                {product.pricing ? (
                  <div className="space-y-4">
                    {/* Standard E-Commerce Quantity Selector */}
                    <div className="flex items-center gap-3">
                      <span className="font-lato text-xs font-bold uppercase tracking-wider text-[#2E5E2E]">
                        Quantity:
                      </span>
                      <div className="inline-flex items-center rounded-xl bg-white border border-[#2E5E2E]/20 shadow-sm overflow-hidden">
                        <button
                          type="button"
                          onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                          disabled={quantity <= 1}
                          className="w-10 h-10 flex items-center justify-center text-[#2E5E2E] hover:bg-[#7AA33E]/10 transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
                          aria-label="Decrease quantity"
                        >
                          <Minus className="w-3.5 h-3.5" />
                        </button>
                        <span className="w-10 text-center font-lato font-bold text-base text-[#2E5E2E]">
                          {quantity}
                        </span>
                        <button
                          type="button"
                          onClick={() => setQuantity((q) => Math.min(99, q + 1))}
                          className="w-10 h-10 flex items-center justify-center text-[#2E5E2E] hover:bg-[#7AA33E]/10 transition-colors"
                          aria-label="Increase quantity"
                        >
                          <Plus className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>

                    {/* Action buttons row */}
                    <div className="flex flex-col sm:flex-row gap-3">
                      <button
                        type="button"
                        onClick={handleOrderOnWhatsApp}
                        id={`order-whatsapp-${product.slug}`}
                        className="flex-1 inline-flex items-center justify-center gap-2.5 py-3.5 px-6 rounded-xl font-lato font-bold text-xs sm:text-sm text-white shadow-lg transition-all duration-300 hover:scale-[1.02] active:scale-[0.98]"
                        style={{
                          background: 'linear-gradient(135deg, #25D366 0%, #128C7E 100%)',
                          boxShadow: '0 4px 18px rgba(37, 211, 102, 0.35)',
                        }}
                        aria-label={`Order ${quantity} ${product.name} ${selectedSize} via WhatsApp`}
                      >
                        <WhatsAppIcon className="w-5 h-5 fill-white flex-shrink-0" />
                        <span>Order on WhatsApp • ₹{quantity * product.pricing[selectedSize]}</span>
                      </button>

                      <button
                        type="button"
                        onClick={handleAddToCart}
                        id={`add-to-cart-${product.slug}`}
                        className="btn-outline flex-1 justify-center py-3.5 text-xs sm:text-sm font-bold border-[#2E5E2E]/30 text-[#2E5E2E] hover:bg-[#2E5E2E]/5"
                        aria-label={`Add ${quantity} ${product.name} ${selectedSize} to cart`}
                      >
                        <ShoppingCart className="w-4 h-4" />
                        <span>Add to Cart</span>
                      </button>
                    </div>

                    <p className="font-lato text-[0.7rem] text-[#7a6b4e] flex items-center gap-1.5 pt-1">
                      <span className="text-[#25D366] font-bold">✓</span> Instant WhatsApp order • Dispatched in 24 hours • Free delivery over ₹499
                    </p>
                  </div>
                ) : (
                  <button
                    type="button"
                    onClick={handleOrderOnWhatsApp}
                    className="inline-flex items-center gap-2.5 py-3.5 px-6 rounded-xl font-lato font-bold text-sm text-white shadow-lg transition-all duration-300 hover:scale-[1.02]"
                    style={{
                      background: 'linear-gradient(135deg, #25D366 0%, #128C7E 100%)',
                      boxShadow: '0 4px 18px rgba(37, 211, 102, 0.35)',
                    }}
                  >
                    <WhatsAppIcon className="w-5 h-5 fill-white" />
                    <span>Enquire & Order on WhatsApp</span>
                  </button>
                )}
              </AnimatedSection>

              {/* Brand tagline */}
              <AnimatedSection delay={0.45}>
                <div className="p-5 rounded-2xl text-center"
                  style={{ background: 'rgba(46,94,46,0.04)', border: '1px solid rgba(122,163,62,0.12)' }}>
                  <p className="font-playfair font-bold text-[#2E5E2E] text-lg italic">
                    &ldquo;Pure Spices. True Flavors.&rdquo;
                  </p>
                </div>
              </AnimatedSection>

              {/* Quality badges */}
              <AnimatedSection delay={0.5} className="mt-8">
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                  {[
                    { label: '100%\nNatural', icon: '🌿' },
                    { label: 'Rich in\nAroma', icon: '✨' },
                    { label: 'Premium\nQuality', icon: '⭐' },
                    { label: 'Made with\nCare', icon: '💚' },
                  ].map((b) => (
                    <div key={b.label}
                      className="flex flex-col items-center gap-1 py-3 px-2 rounded-xl text-center"
                      style={{ background: 'rgba(122,163,62,0.06)', border: '1px solid rgba(122,163,62,0.1)' }}>
                      <span role="img" aria-label={b.label}>{b.icon}</span>
                      <span className="font-lato text-[0.6rem] font-bold uppercase tracking-wider text-[#2E5E2E] whitespace-pre-line leading-tight">
                        {b.label}
                      </span>
                    </div>
                  ))}
                </div>
              </AnimatedSection>
            </div>
          </div>
        </div>
      </section>

      {/* ===========================
          PRODUCT INFO SECTIONS
          =========================== */}
      <section className="py-16 bg-[#F2E6C9]/30" aria-label="Product information">
        <div className="max-w-7xl mx-auto px-6 md:px-10">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Ingredients */}
            <AnimatedSection>
              <div className="p-7 rounded-3xl bg-[#FFF8EF] h-full"
                style={{ border: '1px solid rgba(122,163,62,0.12)' }}>
                <div className="w-10 h-10 rounded-full bg-[#2E5E2E]/8 flex items-center justify-center mb-4">
                  <Leaf className="w-4.5 h-4.5 text-[#2E5E2E]" />
                </div>
                <h3 className="font-playfair font-bold text-[#2E5E2E] text-xl mb-3">Ingredients</h3>
                <p className="font-lato text-[#7a6b4e] text-sm leading-relaxed">
                  {product.ingredient}
                  {product.wholeSpices && product.wholeSpices.length > 0 && (
                    <span> ({product.wholeSpices.join(', ')})</span>
                  )}
                </p>
              </div>
            </AnimatedSection>

            {/* Storage */}
            <AnimatedSection delay={0.1}>
              <div className="p-7 rounded-3xl bg-[#FFF8EF] h-full"
                style={{ border: '1px solid rgba(122,163,62,0.12)' }}>
                <div className="w-10 h-10 rounded-full bg-[#2E5E2E]/8 flex items-center justify-center mb-4">
                  <span className="text-[#2E5E2E]">🏺</span>
                </div>
                <h3 className="font-playfair font-bold text-[#2E5E2E] text-xl mb-3">Storage Instructions</h3>
                <p className="font-lato text-[#7a6b4e] text-sm leading-relaxed">
                  {product.storageNote}
                </p>
              </div>
            </AnimatedSection>

            {/* Contact */}
            <AnimatedSection delay={0.2}>
              <div className="p-7 rounded-3xl bg-[#2E5E2E] h-full">
                <h3 className="font-playfair font-bold text-[#F2E6C9] text-xl mb-3">Get in Touch</h3>
                <p className="font-lato text-[#F2E6C9]/65 text-sm leading-relaxed mb-6">
                  Interested in placing an order or want to know more about this product?
                </p>
                <div className="space-y-3">
                  <a
                    href="https://wa.me/918810303231"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2.5 text-[#F2E6C9]/90 hover:text-white font-lato text-sm transition-colors"
                  >
                    <WhatsAppIcon className="w-4 h-4 fill-[#25D366]" />
                    WhatsApp: +91 8810303231
                  </a>
                  <a href="tel:+918810303231" className="flex items-center gap-2.5 text-[#F2E6C9]/80 hover:text-[#F2E6C9] font-lato text-sm transition-colors">
                    <Phone className="w-4 h-4 text-[#7AA33E]" />
                    +91 8810303231
                  </a>
                  <a href="mailto:delhiwally@gmail.com" className="flex items-center gap-2.5 text-[#F2E6C9]/80 hover:text-[#F2E6C9] font-lato text-xs transition-colors">
                    <Mail className="w-4 h-4 text-[#7AA33E]" />
                    delhiwally@gmail.com
                  </a>
                </div>
              </div>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* ===========================
          YOU MAY ALSO LIKE
          =========================== */}
      <section className="section-pad" aria-labelledby="related-heading">
        <div className="max-w-7xl mx-auto px-6 md:px-10">
          <div className="mb-10 text-center">
            <AnimatedSection>
              <div className="eyebrow justify-center mb-3">The Collection</div>
            </AnimatedSection>
            <AnimatedSection delay={0.1}>
              <h2 className="text-headline text-[#2E5E2E]" id="related-heading">
                You May Also Love
              </h2>
            </AnimatedSection>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            {otherProducts.map((p, i) => (
              <AnimatedSection key={p.id} delay={i * 0.1}>
                <ProductCard product={p} variant="compact" />
              </AnimatedSection>
            ))}
          </div>

          <AnimatedSection className="text-center mt-10" delay={0.3}>
            <Link href="/products" className="btn-outline">
              View Full Collection
              <ArrowRight className="w-4 h-4" />
            </Link>
          </AnimatedSection>
        </div>
      </section>
    </>
  );
}
