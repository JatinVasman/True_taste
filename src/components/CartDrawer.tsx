'use client';

import { useEffect, useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Plus, Minus, Trash2, ShoppingBag, ArrowRight, Truck } from 'lucide-react';
import { useCartStore } from '@/lib/cart';
import { useCartDrawer } from '@/lib/cartDrawer';
import WhatsAppIcon from '@/components/WhatsAppIcon';
import { buildCartWhatsAppMessage, redirectToWhatsApp } from '@/lib/whatsapp';

const FREE_SHIPPING_THRESHOLD = 499;

export default function CartDrawer() {
  const { isOpen, closeCart } = useCartDrawer();
  const items = useCartStore((s) => s.items);
  const increment = useCartStore((s) => s.increment);
  const decrement = useCartStore((s) => s.decrement);
  const removeItem = useCartStore((s) => s.removeItem);
  const subtotal = useCartStore((s) => s.subtotal());
  const totalCount = useCartStore((s) => s.totalCount());

  const drawerRef = useRef<HTMLDivElement>(null);

  function handleWhatsAppOrder() {
    const shipping = subtotal >= FREE_SHIPPING_THRESHOLD ? 0 : 60;
    const total = subtotal + shipping;
    const message = buildCartWhatsAppMessage({
      items,
      subtotal,
      shipping,
      total,
    });
    redirectToWhatsApp(message);
  }

  // Close on Escape key and lock body scroll
  useEffect(() => {
    function handleKeyDown(e: KeyboardEvent) {
      if (e.key === 'Escape' && isOpen) {
        closeCart();
      }
    }

    if (isOpen) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    } else {
      document.body.style.overflow = '';
    }

    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, closeCart]);

  const amountToFreeShipping = Math.max(0, FREE_SHIPPING_THRESHOLD - subtotal);
  const progressPercent = Math.min(100, Math.round((subtotal / FREE_SHIPPING_THRESHOLD) * 100));

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[9999] flex justify-end">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            onClick={closeCart}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm"
            aria-hidden="true"
          />

          {/* Drawer Panel */}
          <motion.div
            ref={drawerRef}
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 28, stiffness: 280 }}
            className="relative z-10 w-full max-w-md bg-[#FFFDF8] h-full shadow-2xl flex flex-col overflow-hidden"
            role="dialog"
            aria-modal="true"
            aria-label="Your Shopping Cart"
          >
            {/* Header */}
            <div className="px-6 py-5 border-b border-[#2E5E2E]/10 flex items-center justify-between bg-[#FFF8EF]">
              <div className="flex items-center gap-2.5">
                <ShoppingBag className="w-5 h-5 text-[#2E5E2E]" />
                <h2 className="font-playfair font-bold text-xl text-[#2E5E2E]">
                  Your Cart
                </h2>
                {totalCount > 0 && (
                  <span className="px-2 py-0.5 rounded-full text-xs font-bold font-lato bg-[#7AA33E]/15 text-[#2E5E2E]">
                    {totalCount} {totalCount === 1 ? 'item' : 'items'}
                  </span>
                )}
              </div>
              <button
                type="button"
                onClick={closeCart}
                aria-label="Close cart"
                className="w-9 h-9 rounded-full flex items-center justify-center text-[#7a6b4e] hover:text-[#2E5E2E] hover:bg-[#2E5E2E]/10 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Free Shipping Progress Bar */}
            {items.length > 0 && (
              <div className="px-6 py-3 bg-[#fbf5e8] border-b border-[#2E5E2E]/10">
                <div className="flex items-center gap-2 mb-1.5">
                  <Truck className="w-4 h-4 text-[#7AA33E] flex-shrink-0" />
                  <p className="font-lato text-xs text-[#2E5E2E]">
                    {amountToFreeShipping > 0 ? (
                      <>
                        Add <strong className="font-bold text-[#2E5E2E]">₹{amountToFreeShipping}</strong> more to unlock <strong>Free Delivery</strong>!
                      </>
                    ) : (
                      <span className="font-bold text-[#2E5E2E]">
                        🎉 You&apos;ve unlocked Free Delivery!
                      </span>
                    )}
                  </p>
                </div>
                <div className="w-full bg-[#2E5E2E]/10 rounded-full h-1.5 overflow-hidden">
                  <div
                    className="h-full bg-[#7AA33E] rounded-full transition-all duration-300"
                    style={{ width: `${progressPercent}%` }}
                  />
                </div>
              </div>
            )}

            {/* Items List / Empty State */}
            <div className="flex-1 overflow-y-auto px-6 py-4 space-y-4">
              {items.length === 0 ? (
                <div className="h-full flex flex-col items-center justify-center text-center py-16">
                  <div className="w-16 h-16 rounded-full bg-[#7AA33E]/10 flex items-center justify-center mb-4">
                    <ShoppingBag className="w-8 h-8 text-[#7AA33E]" />
                  </div>
                  <h3 className="font-playfair font-bold text-xl text-[#2E5E2E] mb-2">
                    Your cart is empty
                  </h3>
                  <p className="font-lato text-sm text-[#7a6b4e] max-w-xs mb-6">
                    Discover our authentic stone-ground spices and add pure flavors to your cooking.
                  </p>
                  <button
                    type="button"
                    onClick={closeCart}
                    className="btn-primary"
                  >
                    Start Shopping
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              ) : (
                items.map((item) => (
                  <div
                    key={item.key}
                    className="flex gap-4 p-3.5 rounded-2xl bg-white border border-[#2E5E2E]/10 shadow-sm"
                  >
                    {/* Thumbnail */}
                    <div className="relative w-18 h-18 sm:w-20 sm:h-20 rounded-xl overflow-hidden bg-[#fdf6e9] flex-shrink-0">
                      <Image
                        src={item.image}
                        alt={`${item.name} ${item.size}`}
                        fill
                        className="object-cover"
                        sizes="80px"
                      />
                    </div>

                    {/* Details */}
                    <div className="flex-1 min-w-0 flex flex-col justify-between">
                      <div>
                        <div className="flex items-start justify-between gap-2">
                          <Link
                            href={`/products/${item.slug}`}
                            onClick={closeCart}
                            className="font-playfair font-bold text-sm text-[#2E5E2E] hover:text-[#7AA33E] transition-colors leading-snug truncate"
                          >
                            {item.name}
                          </Link>
                          <button
                            type="button"
                            onClick={() => removeItem(item.key)}
                            aria-label={`Remove ${item.name} from cart`}
                            className="text-[#7a6b4e] hover:text-red-500 transition-colors p-1"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                        <p className="font-lato text-xs text-[#7a6b4e] mt-0.5">
                          {item.size} pack • ₹{item.unitPrice} each
                        </p>
                      </div>

                      {/* Quantity Stepper & Price Row */}
                      <div className="flex items-center justify-between mt-3 pt-2 border-t border-[#2E5E2E]/5">
                        <div className="inline-flex items-center rounded-lg border border-[#2E5E2E]/20 bg-[#FFFDF8]">
                          <button
                            type="button"
                            onClick={() => decrement(item.key)}
                            aria-label="Decrease quantity"
                            className="w-7 h-7 flex items-center justify-center text-[#2E5E2E] hover:bg-[#7AA33E]/10 transition-colors"
                          >
                            <Minus className="w-3 h-3" />
                          </button>
                          <span className="w-7 text-center font-lato text-xs font-bold text-[#2E5E2E]">
                            {item.quantity}
                          </span>
                          <button
                            type="button"
                            onClick={() => increment(item.key)}
                            aria-label="Increase quantity (Add more)"
                            title="Add more"
                            className="w-7 h-7 flex items-center justify-center text-[#2E5E2E] hover:bg-[#7AA33E]/10 transition-colors"
                          >
                            <Plus className="w-3 h-3" />
                          </button>
                        </div>

                        <span className="font-lato font-bold text-sm text-[#2E5E2E]">
                          ₹{item.unitPrice * item.quantity}
                        </span>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>

            {/* Footer */}
            {items.length > 0 && (
              <div className="p-6 bg-[#FFF8EF] border-t border-[#2E5E2E]/10 space-y-4">
                <div className="space-y-1.5">
                  <div className="flex justify-between items-center text-sm font-lato">
                    <span className="text-[#7a6b4e]">Subtotal</span>
                    <span className="font-bold text-[#2E5E2E] text-base">₹{subtotal}</span>
                  </div>
                  <div className="flex justify-between items-center text-xs font-lato text-[#7a6b4e]">
                    <span>Shipping</span>
                    <span>
                      {subtotal >= FREE_SHIPPING_THRESHOLD ? (
                        <span className="text-[#7AA33E] font-bold">FREE</span>
                      ) : (
                        '₹60 (Free over ₹499)'
                      )}
                    </span>
                  </div>
                  <p className="font-lato text-[0.7rem] text-[#7a6b4e]/80">
                    Taxes included. Discounts applied at checkout.
                  </p>
                </div>

                <div className="space-y-2.5">
                  <button
                    type="button"
                    onClick={handleWhatsAppOrder}
                    id="cart-drawer-whatsapp-btn"
                    className="w-full flex items-center justify-center gap-2.5 py-3.5 px-5 rounded-xl font-lato font-bold text-sm text-white shadow-lg transition-all duration-300 hover:scale-[1.02] active:scale-[0.98]"
                    style={{
                      background: 'linear-gradient(135deg, #25D366 0%, #128C7E 100%)',
                      boxShadow: '0 4px 18px rgba(37, 211, 102, 0.35)',
                    }}
                  >
                    <WhatsAppIcon className="w-5 h-5 fill-white flex-shrink-0" />
                    <span>Order via WhatsApp ({totalCount} items)</span>
                  </button>

                  <Link
                    href="/checkout"
                    onClick={closeCart}
                    className="btn-outline w-full justify-center py-2.5 text-xs font-bold border-[#2E5E2E]/25 text-[#2E5E2E] hover:bg-[#2E5E2E]/5"
                  >
                    <span>Add Delivery Address First</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>

                  <div className="flex items-center justify-between pt-1">
                    <Link
                      href="/cart"
                      onClick={closeCart}
                      className="font-lato text-xs font-bold text-[#7AA33E] hover:text-[#2E5E2E] underline underline-offset-4"
                    >
                      View Full Cart ({totalCount})
                    </Link>
                    <button
                      type="button"
                      onClick={closeCart}
                      className="font-lato text-xs text-[#7a6b4e] hover:text-[#2E5E2E]"
                    >
                      Continue Shopping →
                    </button>
                  </div>
                </div>
              </div>
            )}
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
