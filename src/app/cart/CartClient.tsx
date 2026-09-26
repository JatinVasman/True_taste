'use client';

import Image from 'next/image';
import Link from 'next/link';
import { Minus, Plus, Trash2, ShoppingBag, ArrowRight, Leaf } from 'lucide-react';
import { useCartStore } from '@/lib/cart';
import AnimatedSection from '@/components/AnimatedSection';

export default function CartClient() {
  const items = useCartStore((s) => s.items);
  const increment = useCartStore((s) => s.increment);
  const decrement = useCartStore((s) => s.decrement);
  const removeItem = useCartStore((s) => s.removeItem);
  const clearCart = useCartStore((s) => s.clearCart);
  const subtotal = useCartStore((s) => s.subtotal());

  const isEmpty = items.length === 0;

  return (
    <div className="min-h-screen bg-[#FFF8EF] px-4 py-28">
      <div
        className="fixed inset-0 pointer-events-none"
        style={{
          background:
            'radial-gradient(ellipse 65% 50% at 50% 0%, rgba(242,230,201,0.45) 0%, transparent 65%)',
        }}
      />

      <div className="relative z-10 max-w-5xl mx-auto">
        {/* Page heading */}
        <AnimatedSection className="mb-8">
          <div className="eyebrow mb-3">Shopping Cart</div>
          <h1 className="font-playfair font-bold text-[#2E5E2E] text-4xl md:text-5xl">
            Your Spice Selection
          </h1>
        </AnimatedSection>

        {isEmpty ? (
          /* ── Empty state ── */
          <AnimatedSection delay={0.1}>
            <div
              className="bg-[#FFFDF8] rounded-2xl p-12 text-center"
              style={{ border: '1px solid rgba(122,163,62,0.18)' }}
            >
              <div
                className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-5"
                style={{ background: 'rgba(122,163,62,0.1)' }}
              >
                <ShoppingBag className="w-7 h-7 text-[#7AA33E]" />
              </div>
              <h2 className="font-playfair font-bold text-[#2E5E2E] text-2xl mb-3">
                Your cart is empty
              </h2>
              <p className="font-lato text-sm text-[#7a6b4e] mb-7 max-w-sm mx-auto leading-relaxed">
                Discover our range of premium spices and add your favourites to get started.
              </p>
              <Link href="/products" className="btn-primary">
                Browse Spices
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </AnimatedSection>
        ) : (
          /* ── Cart layout ── */
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_340px] gap-6 items-start">
            {/* ── Cart items ── */}
            <div className="space-y-3">
              {items.map((item, i) => (
                <AnimatedSection key={item.key} delay={i * 0.05}>
                  <div
                    className="bg-[#FFFDF8] rounded-2xl overflow-hidden"
                    style={{ border: '1px solid rgba(122,163,62,0.18)' }}
                  >
                    <div className="flex items-center gap-4 p-4 sm:p-5">
                      {/* Product image */}
                      <div
                        className="relative flex-shrink-0 rounded-xl overflow-hidden"
                        style={{ width: '4.5rem', height: '4.5rem', background: 'linear-gradient(135deg, #fdf6e9 0%, #f2e6c9 80%)' }}
                      >
                        <Image
                          src={item.image}
                          alt={`${item.name} ${item.size}`}
                          fill
                          className="object-cover"
                          sizes="72px"
                        />
                      </div>

                      {/* Info */}
                      <div className="flex-1 min-w-0">
                        <p className="font-playfair font-bold text-[#2E5E2E] text-base leading-tight truncate">
                          {item.name}
                        </p>
                        <p className="font-lato text-[0.7rem] font-bold uppercase tracking-wider text-[#7AA33E] mt-0.5">
                          {item.size} pack
                        </p>
                        <p className="font-lato text-xs text-[#7a6b4e] mt-1">
                          ₹{item.unitPrice} each
                        </p>
                      </div>

                      {/* Qty controls */}
                      <div className="flex items-center gap-0 flex-shrink-0">
                        <button
                          onClick={() => decrement(item.key)}
                          aria-label={`Decrease quantity of ${item.name}`}
                          className="w-8 h-8 flex items-center justify-center rounded-full text-[#2E5E2E] hover:bg-[#7AA33E]/10 transition-colors"
                        >
                          <Minus className="w-3.5 h-3.5" />
                        </button>
                        <span
                          className="font-lato font-bold text-[#2E5E2E] text-sm w-8 text-center"
                          aria-label={`Quantity: ${item.quantity}`}
                        >
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => increment(item.key)}
                          aria-label={`Increase quantity of ${item.name}`}
                          className="w-8 h-8 flex items-center justify-center rounded-full text-[#2E5E2E] hover:bg-[#7AA33E]/10 transition-colors"
                        >
                          <Plus className="w-3.5 h-3.5" />
                        </button>
                      </div>

                      {/* Line total */}
                      <div className="flex-shrink-0 text-right ml-1">
                        <p className="font-playfair font-bold text-[#2E5E2E] text-base">
                          ₹{item.unitPrice * item.quantity}
                        </p>
                      </div>

                      {/* Remove */}
                      <button
                        onClick={() => removeItem(item.key)}
                        aria-label={`Remove ${item.name} from cart`}
                        className="flex-shrink-0 w-8 h-8 flex items-center justify-center rounded-full text-[#7a6b4e] hover:bg-red-50 hover:text-red-500 transition-colors ml-1"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                </AnimatedSection>
              ))}

              {/* Clear all */}
              <div className="pt-2 flex justify-end">
                <button
                  onClick={clearCart}
                  className="font-lato text-xs text-[#7a6b4e] hover:text-red-500 transition-colors underline underline-offset-2"
                >
                  Clear all items
                </button>
              </div>
            </div>

            {/* ── Order summary ── */}
            <AnimatedSection delay={0.15}>
              <div
                className="bg-[#FFFDF8] rounded-2xl p-6 lg:sticky lg:top-28"
                style={{ border: '1px solid rgba(122,163,62,0.18)' }}
              >
                <p className="font-lato text-xs font-bold uppercase tracking-wider text-[#7AA33E] mb-5">
                  Order Summary
                </p>

                {/* Line items summary */}
                <div className="space-y-2 mb-4">
                  {items.map((item) => (
                    <div key={item.key} className="flex items-center justify-between">
                      <p className="font-lato text-xs text-[#7a6b4e] truncate mr-2">
                        {item.name} ({item.size}) × {item.quantity}
                      </p>
                      <p className="font-lato text-xs font-bold text-[#2E5E2E] flex-shrink-0">
                        ₹{item.unitPrice * item.quantity}
                      </p>
                    </div>
                  ))}
                </div>

                <div
                  className="h-px mb-4"
                  style={{ background: 'linear-gradient(90deg, rgba(122,163,62,0.25), transparent)' }}
                />

                {/* Subtotal */}
                <div className="flex items-center justify-between mb-1">
                  <p className="font-lato text-sm text-[#7a6b4e]">Subtotal</p>
                  <p className="font-playfair font-bold text-[#2E5E2E] text-xl">₹{subtotal}</p>
                </div>
                <p className="font-lato text-[0.65rem] text-[#7a6b4e] mb-6 leading-relaxed">
                  Shipping and taxes will be calculated at checkout. Final amount validated server-side.
                </p>

                {/* Checkout CTA */}
                <div
                  className="p-4 rounded-xl text-center mb-4"
                  style={{ background: 'rgba(46,94,46,0.04)', border: '1px solid rgba(122,163,62,0.12)' }}
                >
                  <p className="font-lato text-xs text-[#7a6b4e] leading-relaxed">
                    Checkout coming soon. Browse our full range in the meantime.
                  </p>
                </div>

                <Link href="/products" className="btn-outline w-full justify-center">
                  <Leaf className="w-4 h-4" />
                  Continue Shopping
                </Link>
              </div>
            </AnimatedSection>
          </div>
        )}
      </div>
    </div>
  );
}
