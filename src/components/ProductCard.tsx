'use client';

import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import type { Product } from '@/lib/products';

interface ProductCardProps {
  product: Product;
  variant?: 'featured' | 'standard' | 'compact';
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

export default function ProductCard({
  product,
  variant = 'standard',
  size,
  className = '',
}: ProductCardProps) {
  const isFeatured = variant === 'featured' || size === 'lg';
  const isCompact = variant === 'compact' || size === 'sm';

  return (
    <Link
      href={`/products/${product.slug}`}
      aria-label={`Discover ${product.name}`}
      className={`group block product-card ${className}`}
    >
      {/* Image */}
      <div
        className="relative overflow-hidden"
        style={{
          aspectRatio: isFeatured ? '3/4' : isCompact ? '5/4' : '4/3',
          background: `linear-gradient(145deg, ${product.spiceColor}08 0%, #f2e6c9 100%)`,
        }}
      >
        <Image
          src={product.heroImage}
          alt={`${product.name} — premium Indian spice`}
          fill
          className="object-cover card-img"
          sizes={
            isFeatured
              ? '(max-width: 768px) 100vw, 45vw'
              : '(max-width: 640px) 100vw, 33vw'
          }
        />

        {/* Subtle gradient overlay at bottom for text legibility */}
        <div
          className="absolute inset-x-0 bottom-0 h-24 pointer-events-none"
          style={{
            background: 'linear-gradient(to top, rgba(255,248,239,0.6) 0%, transparent 100%)',
          }}
        />

        {/* Category tag — top left */}
        <div className="absolute top-4 left-4">
          <span
            className="font-lato font-bold uppercase tracking-[0.14em] rounded-full px-3 py-1 text-[0.55rem]"
            style={{
              background: 'rgba(255,248,239,0.85)',
              backdropFilter: 'blur(8px)',
              color: '#2E5E2E',
              border: '1px solid rgba(46,94,46,0.12)',
            }}
          >
            {product.category === 'ground'
              ? 'Ground'
              : product.category === 'whole'
              ? 'Whole'
              : 'Blend'}
          </span>
        </div>

        {/* Spice accent dot — bottom right */}
        <div
          className="absolute bottom-4 right-4 w-3 h-3 rounded-full opacity-70"
          style={{ background: product.spiceColor }}
          aria-hidden="true"
        />
      </div>

      {/* Content */}
      <div className={`${isFeatured ? 'p-7' : 'p-5'}`}>
        {/* Product name — PRIMARY hierarchy */}
        <h3
          className="font-playfair font-bold text-[#2E5E2E] leading-tight mb-1.5 group-hover:text-[#1e3e1e] transition-colors duration-200"
          style={{ fontSize: isFeatured ? '1.6rem' : isCompact ? '1.05rem' : '1.25rem' }}
        >
          {product.name}
        </h3>

        {/* Ingredient — SECONDARY, smaller */}
        <p
          className="font-lato font-bold uppercase tracking-[0.14em] mb-3"
          style={{ fontSize: '0.6rem', color: product.spiceColor, opacity: 0.85 }}
        >
          {product.ingredient}
        </p>

        {isFeatured && (
          <p className="font-lato text-[#7a6b4e] text-sm leading-relaxed mb-5 line-clamp-2">
            {product.description}
          </p>
        )}

        {/* Divider */}
        <div
          className="mb-4"
          style={{
            height: '1px',
            background: `linear-gradient(90deg, ${product.spiceColor}20, transparent)`,
          }}
        />

        {/* Size pills + CTA row */}
        <div className="flex items-center justify-between gap-3">
          <div className="flex gap-1.5">
            {['50g', '100g', '200g'].map((s) => (
              <span
                key={s}
                className="font-lato font-bold tracking-wider rounded-full"
                style={{
                  fontSize: '0.58rem',
                  padding: '0.25rem 0.6rem',
                  border: '1.5px solid rgba(46,94,46,0.15)',
                  color: '#7a6b4e',
                }}
              >
                {s}
              </span>
            ))}
          </div>

          <div
            className="flex items-center gap-1 transition-all duration-300 group-hover:gap-2"
            style={{ color: '#7AA33E', fontSize: '0.7rem', fontFamily: 'Lato, sans-serif', fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase' }}
          >
            <span>View</span>
            <ArrowRight
              className="transition-transform duration-300 group-hover:translate-x-1"
              style={{ width: '0.85rem', height: '0.85rem' }}
            />
          </div>
        </div>
      </div>
    </Link>
  );
}
