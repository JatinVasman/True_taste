'use client';

import { useState, useEffect, useCallback, useMemo } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, Maximize2, X, ZoomIn } from 'lucide-react';
import { Product, ProductGalleryItem, getProductGalleryItems } from '@/lib/products';

interface ProductImageGalleryProps {
  product: Product;
  activeIndex: number;
  onIndexChange: (index: number) => void;
}

export default function ProductImageGallery({
  product,
  activeIndex,
  onIndexChange,
}: ProductImageGalleryProps) {
  const items: ProductGalleryItem[] = useMemo(
    () => getProductGalleryItems(product),
    [product]
  );

  const [direction, setDirection] = useState<number>(1);
  const [lightboxOpen, setLightboxOpen] = useState<boolean>(false);
  const [isHovered, setIsHovered] = useState<boolean>(false);

  const goToIndex = useCallback(
    (newIndex: number, newDirection?: number) => {
      const dir = newDirection ?? (newIndex > activeIndex ? 1 : -1);
      setDirection(dir);
      onIndexChange(newIndex);
    },
    [activeIndex, onIndexChange]
  );

  const handleNext = useCallback(() => {
    const nextIdx = (activeIndex + 1) % items.length;
    goToIndex(nextIdx, 1);
  }, [activeIndex, items.length, goToIndex]);

  const handlePrev = useCallback(() => {
    const prevIdx = (activeIndex - 1 + items.length) % items.length;
    goToIndex(prevIdx, -1);
  }, [activeIndex, items.length, goToIndex]);

  // Keyboard navigation for carousel and lightbox
  useEffect(() => {
    function handleKeyDown(e: KeyboardEvent) {
      if (lightboxOpen) {
        if (e.key === 'ArrowRight') handleNext();
        else if (e.key === 'ArrowLeft') handlePrev();
        else if (e.key === 'Escape') setLightboxOpen(false);
      }
    }
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [lightboxOpen, handleNext, handlePrev]);

  const currentItem = items[activeIndex] || items[0];

  return (
    <div className="w-full">
      {/* ========================================================
          FLIPKART-STYLE PRODUCT SHOWCASE:
          Slide Menu (Thumbnails) + Single Main Box Gallery
          ======================================================== */}
      <div className="flex flex-col-reverse md:flex-row gap-4 items-start">
        {/* SLIDE MENU / THUMBNAILS (Vertical on desktop, horizontal on mobile) */}
        <div
          className="flex md:flex-col flex-row gap-3 w-full md:w-20 lg:w-24 shrink-0 overflow-x-auto md:overflow-visible pb-2 md:pb-0 scrollbar-none"
          role="tablist"
          aria-label="Product thumbnails"
        >
          {items.map((item, idx) => {
            const isActive = idx === activeIndex;
            return (
              <button
                key={item.id}
                role="tab"
                type="button"
                aria-selected={isActive}
                aria-label={`View ${item.label}`}
                onClick={() => goToIndex(idx)}
                onMouseEnter={() => goToIndex(idx)}
                className={`relative group shrink-0 w-16 h-16 md:w-20 md:h-20 lg:w-24 lg:h-24 rounded-2xl p-1.5 transition-all duration-200 cursor-pointer flex flex-col items-center justify-center ${
                  isActive
                    ? 'border-2 border-[#2E5E2E] shadow-md bg-white scale-[1.02]'
                    : 'border border-[#2E5E2E]/15 bg-[#FFFDF8] hover:border-[#7AA33E] hover:bg-white hover:scale-[1.01]'
                }`}
                style={{
                  boxShadow: isActive
                    ? '0 4px 14px rgba(46,94,46,0.18), 0 0 0 2px rgba(122,163,62,0.25)'
                    : undefined,
                }}
              >
                {/* Thumbnail Image Container */}
                <div className="relative w-full h-full rounded-xl overflow-hidden flex items-center justify-center">
                  <Image
                    src={item.src}
                    alt={item.alt}
                    fill
                    sizes="(max-width: 768px) 64px, 96px"
                    className={`transition-transform duration-300 ${
                      item.isHero
                        ? 'object-cover group-hover:scale-105'
                        : 'object-contain p-1 group-hover:scale-105'
                    }`}
                  />
                </div>

                {/* Badge (e.g. Spice, 50g, 100g, 200g) */}
                <span
                  className={`absolute bottom-1 right-1 font-lato text-[0.55rem] font-bold px-1.5 py-0.5 rounded-full uppercase tracking-wider leading-none shadow-sm transition-colors ${
                    isActive
                      ? 'bg-[#2E5E2E] text-[#FFF8EF]'
                      : 'bg-white/90 text-[#7a6b4e] group-hover:text-[#2E5E2E]'
                  }`}
                >
                  {item.badge}
                </span>

                {/* Active arrow indicator for desktop (points towards main box) */}
                {isActive && (
                  <div
                    className="hidden md:block absolute -right-2 top-1/2 -translate-y-1/2 w-0 h-0"
                    style={{
                      borderTop: '6px solid transparent',
                      borderBottom: '6px solid transparent',
                      borderLeft: '6px solid #2E5E2E',
                    }}
                    aria-hidden="true"
                  />
                )}
              </button>
            );
          })}
        </div>

        {/* SINGLE MAIN IMAGE BOX (Flipkart-style unified showcase container) */}
        <div
          className="relative flex-1 w-full rounded-3xl overflow-hidden border border-[#2E5E2E]/12 bg-white shadow-[0_8px_30px_rgb(46,94,46,0.06)] group select-none"
          style={{
            aspectRatio: '1',
            background: 'radial-gradient(ellipse at 50% 50%, #ffffff 0%, #faf6ee 100%)',
          }}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          {/* Active View Badge (Top Left) */}
          <div className="absolute top-4 left-4 z-20 pointer-events-none">
            <span
              className="inline-flex items-center gap-1.5 font-lato text-[0.68rem] font-bold uppercase tracking-wider px-3 py-1.5 rounded-full shadow-sm backdrop-blur-md"
              style={{
                background: currentItem.isHero
                  ? 'rgba(46, 94, 46, 0.92)'
                  : 'rgba(90, 46, 13, 0.88)',
                color: '#FFF8EF',
                border: '1px solid rgba(255,248,239,0.2)',
              }}
            >
              <span>{currentItem.isHero ? '✦' : '📦'}</span>
              <span>{currentItem.label}</span>
            </span>
          </div>

          {/* Flipkart-style Slide Counter Badge (Bottom Right) */}
          <div className="absolute bottom-4 right-4 z-20 pointer-events-none">
            <span className="font-lato text-xs font-bold px-3 py-1 rounded-full shadow-sm bg-stone-900/75 text-white backdrop-blur-md tracking-wider">
              {activeIndex + 1} / {items.length}
            </span>
          </div>

          {/* Fullscreen Zoom Trigger (Top Right) */}
          <button
            type="button"
            onClick={() => setLightboxOpen(true)}
            aria-label="View packaging full screen"
            className="absolute top-4 right-4 z-20 w-9 h-9 rounded-full bg-white/90 hover:bg-white text-[#2E5E2E] shadow-sm border border-[#2E5E2E]/15 flex items-center justify-center transition-all hover:scale-110 active:scale-95 cursor-zoom-in"
            title="Click to zoom"
          >
            <Maximize2 className="w-4 h-4" />
          </button>

          {/* PREVIOUS ARROW BUTTON (Flipkart style) */}
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              handlePrev();
            }}
            aria-label="Previous image"
            id={`prev-image-${product.slug}`}
            className={`absolute left-3 md:left-4 top-1/2 -translate-y-1/2 z-20 w-11 h-11 md:w-12 md:h-12 rounded-full bg-white/95 text-[#2E5E2E] border border-[#2E5E2E]/15 shadow-lg flex items-center justify-center transition-all duration-200 hover:bg-[#2E5E2E] hover:text-[#FFF8EF] hover:scale-110 active:scale-95 focus:outline-none focus:ring-2 focus:ring-[#7AA33E] ${
              isHovered ? 'opacity-100 translate-x-0' : 'md:opacity-85 opacity-100'
            }`}
          >
            <ChevronLeft className="w-6 h-6 stroke-[2.2]" />
          </button>

          {/* NEXT ARROW BUTTON (Flipkart style) */}
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              handleNext();
            }}
            aria-label="Next image"
            id={`next-image-${product.slug}`}
            className={`absolute right-3 md:right-4 top-1/2 -translate-y-1/2 z-20 w-11 h-11 md:w-12 md:h-12 rounded-full bg-white/95 text-[#2E5E2E] border border-[#2E5E2E]/15 shadow-lg flex items-center justify-center transition-all duration-200 hover:bg-[#2E5E2E] hover:text-[#FFF8EF] hover:scale-110 active:scale-95 focus:outline-none focus:ring-2 focus:ring-[#7AA33E] ${
              isHovered ? 'opacity-100 translate-x-0' : 'md:opacity-85 opacity-100'
            }`}
          >
            <ChevronRight className="w-6 h-6 stroke-[2.2]" />
          </button>

          {/* MAIN IMAGE DISPLAY (Animated transition) */}
          <div
            className="w-full h-full cursor-zoom-in relative"
            onClick={() => setLightboxOpen(true)}
            role="button"
            tabIndex={0}
            onKeyDown={(e) => e.key === 'Enter' && setLightboxOpen(true)}
            aria-label="Click to enlarge image"
          >
            <AnimatePresence mode="wait" custom={direction}>
              <motion.div
                key={currentItem.id}
                custom={direction}
                initial={{ opacity: 0, scale: 0.96 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 1.02 }}
                transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                className="w-full h-full relative flex items-center justify-center"
              >
                {currentItem.isHero ? (
                  // Hero spice photo: elegant full cover
                  <Image
                    src={currentItem.src}
                    alt={currentItem.alt}
                    fill
                    priority
                    sizes="(max-width: 768px) 100vw, 600px"
                    className="object-cover"
                  />
                ) : (
                  // Pack photo: centered pouch mockup with packaging shadow
                  <div className="relative w-full h-full p-6 md:p-8 flex items-center justify-center">
                    <Image
                      src={currentItem.src}
                      alt={currentItem.alt}
                      fill
                      priority
                      sizes="(max-width: 768px) 100vw, 600px"
                      className="object-contain drop-shadow-[0_16px_28px_rgba(90,46,13,0.18)] transition-transform duration-300 group-hover:scale-[1.02]"
                    />
                  </div>
                )}
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Flipkart-style Hover Hint */}
          <div className="hidden group-hover:flex absolute bottom-4 left-4 z-20 pointer-events-none items-center gap-1.5 bg-white/90 backdrop-blur-md px-2.5 py-1 rounded-full border border-[#2E5E2E]/10 shadow-sm text-[0.65rem] font-lato text-[#7a6b4e]">
            <ZoomIn className="w-3.5 h-3.5 text-[#2E5E2E]" />
            <span>Click to zoom</span>
          </div>
        </div>
      </div>

      {/* MOBILE DOT INDICATORS */}
      <div className="flex md:hidden justify-center items-center gap-2 mt-3" aria-hidden="true">
        {items.map((_, idx) => (
          <button
            key={idx}
            type="button"
            onClick={() => goToIndex(idx)}
            aria-label={`Go to slide ${idx + 1}`}
            className={`transition-all rounded-full ${
              idx === activeIndex
                ? 'w-6 h-2 bg-[#2E5E2E]'
                : 'w-2 h-2 bg-[#2E5E2E]/25 hover:bg-[#2E5E2E]/50'
            }`}
          />
        ))}
      </div>

      {/* ========================================================
          FULLSCREEN LIGHTBOX MODAL (Flipkart High-Res Inspector)
          ======================================================== */}
      {lightboxOpen && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label={`${product.name} packaging full view`}
          onClick={() => setLightboxOpen(false)}
          onKeyDown={(e) => e.key === 'Escape' && setLightboxOpen(false)}
          tabIndex={-1}
          style={{
            position: 'fixed',
            inset: 0,
            zIndex: 9999,
            background: 'rgba(10, 14, 10, 0.94)',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '1.5rem',
            backdropFilter: 'blur(10px)',
          }}
        >
          {/* Header bar in Lightbox */}
          <div
            className="absolute top-4 left-6 right-6 flex items-center justify-between text-[#F2E6C9] z-30 pointer-events-none"
            onClick={(e) => e.stopPropagation()}
          >
            <div>
              <p className="font-playfair font-bold text-lg text-white">
                {product.name}
              </p>
              <p className="font-lato text-xs text-[#7AA33E] uppercase tracking-wider">
                {currentItem.label} • {activeIndex + 1} of {items.length}
              </p>
            </div>

            <button
              onClick={() => setLightboxOpen(false)}
              aria-label="Close image lightbox"
              className="pointer-events-auto bg-white/10 hover:bg-white/20 border border-white/20 rounded-full w-10 h-10 flex items-center justify-center text-white text-base transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Lightbox Navigation Arrow (Prev) */}
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              handlePrev();
            }}
            aria-label="Previous image"
            className="absolute left-4 md:left-8 top-1/2 -translate-y-1/2 z-30 w-12 h-12 md:w-14 md:h-14 rounded-full bg-white/15 hover:bg-white text-white hover:text-[#2E5E2E] border border-white/25 flex items-center justify-center transition-all hover:scale-110 active:scale-95 shadow-xl"
          >
            <ChevronLeft className="w-7 h-7" />
          </button>

          {/* Lightbox Navigation Arrow (Next) */}
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              handleNext();
            }}
            aria-label="Next image"
            className="absolute right-4 md:right-8 top-1/2 -translate-y-1/2 z-30 w-12 h-12 md:w-14 md:h-14 rounded-full bg-white/15 hover:bg-white text-white hover:text-[#2E5E2E] border border-white/25 flex items-center justify-center transition-all hover:scale-110 active:scale-95 shadow-xl"
          >
            <ChevronRight className="w-7 h-7" />
          </button>

          {/* Centered High-Res Image Display */}
          <div
            onClick={(e) => e.stopPropagation()}
            className="relative w-full max-w-4xl max-h-[75vh] flex items-center justify-center cursor-default"
            style={{ aspectRatio: currentItem.isHero ? '16/10' : '1' }}
          >
            <AnimatePresence mode="wait">
              <motion.div
                key={currentItem.id}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 1.05 }}
                transition={{ duration: 0.25 }}
                className="relative w-full h-full flex items-center justify-center"
              >
                <Image
                  src={currentItem.src}
                  alt={currentItem.alt}
                  fill
                  className="object-contain rounded-2xl"
                  style={{ filter: 'drop-shadow(0 12px 50px rgba(0,0,0,0.6))' }}
                  priority
                />
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Thumbnail Rail in Lightbox */}
          <div
            onClick={(e) => e.stopPropagation()}
            className="absolute bottom-6 flex gap-3 z-30 overflow-x-auto max-w-[90vw] p-2 bg-black/40 backdrop-blur-md rounded-2xl border border-white/10"
          >
            {items.map((it, idx) => (
              <button
                key={it.id}
                type="button"
                onClick={() => goToIndex(idx)}
                className={`relative w-14 h-14 rounded-xl overflow-hidden p-1 transition-all ${
                  idx === activeIndex
                    ? 'border-2 border-[#7AA33E] scale-105 ring-2 ring-[#7AA33E]/40'
                    : 'border border-white/20 opacity-60 hover:opacity-100'
                }`}
                style={{ background: 'rgba(255,255,255,0.08)' }}
              >
                <Image
                  src={it.src}
                  alt={it.alt}
                  fill
                  className="object-contain p-0.5"
                />
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
