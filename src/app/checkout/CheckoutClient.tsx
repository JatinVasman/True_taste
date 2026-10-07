'use client';

/**
 * CheckoutClient — True Taste
 *
 * Simple cart-to-email checkout:
 * 1. Customer fills in their name, email, phone, and shipping address.
 * 2. Cart items (NOT prices) are sent to /api/checkout/send-order.
 * 3. Server validates prices from the catalog server-side.
 * 4. Server emails the order to the business owner and a confirmation to the customer.
 * 5. Redirects to /order-confirmation on success.
 *
 * No login required. No payment gateway.
 */

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { ShoppingBag, ArrowRight, AlertCircle, Leaf, Mail } from 'lucide-react';
import { useCartStore } from '@/lib/cart';
import AnimatedSection from '@/components/AnimatedSection';

interface CheckoutForm {
  fullName: string;
  email: string;
  phone: string;
  addressLine1: string;
  addressLine2: string;
  city: string;
  state: string;
  pincode: string;
}

const INITIAL_FORM: CheckoutForm = {
  fullName: '',
  email: '',
  phone: '',
  addressLine1: '',
  addressLine2: '',
  city: '',
  state: '',
  pincode: '',
};

export default function CheckoutClient() {
  const router = useRouter();
  const items = useCartStore((s) => s.items);
  const clearCart = useCartStore((s) => s.clearCart);

  const [form, setForm] = useState<CheckoutForm>(INITIAL_FORM);
  const [isProcessing, setIsProcessing] = useState(false);
  const [error, setError] = useState<string | null>(null);

  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-[#FFF8EF] flex flex-col items-center justify-center gap-4 p-6">
        <ShoppingBag className="w-10 h-10 text-[#7AA33E]" />
        <h1 className="font-playfair font-bold text-[#2E5E2E] text-2xl">Your cart is empty</h1>
        <Link href="/products" className="btn-primary">
          Browse Spices
          <ArrowRight className="w-4 h-4" />
        </Link>
      </div>
    );
  }

  // Display subtotal (preview only — server recalculates)
  const displaySubtotal = items.reduce((sum, i) => sum + i.unitPrice * i.quantity, 0);
  const displayShipping = displaySubtotal >= 499 ? 0 : 60;
  const displayTotal = displaySubtotal + displayShipping;

  function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (isProcessing) return;
    setError(null);
    setIsProcessing(true);

    try {
      const res = await fetch('/api/checkout/send-order', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          customerName: form.fullName,
          customerEmail: form.email,
          phone: form.phone,
          addressLine1: form.addressLine1,
          addressLine2: form.addressLine2 || undefined,
          city: form.city,
          state: form.state,
          pincode: form.pincode,
          items: items.map((item) => ({
            productId: item.productId,
            size: item.size,
            quantity: item.quantity,
          })),
        }),
      });

      const data = await res.json();

      if (!res.ok || !data.success) {
        setError(data.error ?? 'Could not place order. Please try again.');
        setIsProcessing(false);
        return;
      }

      clearCart();
      router.push(`/order-confirmation?orderId=${data.orderId}`);
    } catch {
      setError('Network error. Please check your connection and try again.');
      setIsProcessing(false);
    }
  }

  return (
    <div className="min-h-screen bg-[#FFF8EF] px-4 py-28">
      <div
        className="fixed inset-0 pointer-events-none"
        style={{ background: 'radial-gradient(ellipse 65% 50% at 50% 0%, rgba(242,230,201,0.45) 0%, transparent 65%)' }}
      />

      <div className="relative z-10 max-w-5xl mx-auto">
        <AnimatedSection className="mb-8">
          <div className="eyebrow mb-3">Checkout</div>
          <h1 className="font-playfair font-bold text-[#2E5E2E] text-4xl md:text-5xl">Place Your Order</h1>
          <p className="font-lato text-[#7a6b4e] mt-3 text-sm max-w-lg">
            Fill in your details and we&apos;ll send you a confirmation email. Our team will contact you to arrange delivery and payment.
          </p>
        </AnimatedSection>

        {error && (
          <AnimatedSection className="mb-6">
            <div className="bg-red-50 border border-red-200 rounded-xl p-4 flex items-start gap-3">
              <AlertCircle className="w-5 h-5 text-red-500 flex-shrink-0 mt-0.5" />
              <p className="font-lato text-sm text-red-700">{error}</p>
            </div>
          </AnimatedSection>
        )}

        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_360px] gap-6 items-start">

            {/* ── Left: Customer & Shipping form ── */}
            <AnimatedSection delay={0.05}>
              <div
                className="bg-[#FFFDF8] rounded-2xl p-6 md:p-8"
                style={{ border: '1px solid rgba(122,163,62,0.18)' }}
              >
                {/* Contact info */}
                <p className="font-lato text-xs font-bold uppercase tracking-wider text-[#7AA33E] mb-6">
                  Contact Information
                </p>

                <div className="space-y-4 mb-8">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="fullName" className="block font-lato text-[0.7rem] font-bold uppercase tracking-wider text-[#2E5E2E] mb-2">
                        Full Name *
                      </label>
                      <input
                        id="fullName"
                        name="fullName"
                        type="text"
                        required
                        value={form.fullName}
                        onChange={handleChange}
                        placeholder="Your full name"
                        className="form-field"
                        disabled={isProcessing}
                      />
                    </div>
                    <div>
                      <label htmlFor="phone" className="block font-lato text-[0.7rem] font-bold uppercase tracking-wider text-[#2E5E2E] mb-2">
                        Phone Number *
                      </label>
                      <input
                        id="phone"
                        name="phone"
                        type="tel"
                        required
                        value={form.phone}
                        onChange={handleChange}
                        placeholder="+91 XXXXX XXXXX"
                        className="form-field"
                        disabled={isProcessing}
                      />
                    </div>
                  </div>

                  <div>
                    <label htmlFor="email" className="block font-lato text-[0.7rem] font-bold uppercase tracking-wider text-[#2E5E2E] mb-2">
                      Email Address *
                    </label>
                    <input
                      id="email"
                      name="email"
                      type="email"
                      required
                      value={form.email}
                      onChange={handleChange}
                      placeholder="your@email.com"
                      className="form-field"
                      disabled={isProcessing}
                    />
                    <p className="font-lato text-[0.65rem] text-[#7a6b4e] mt-1.5">
                      Order confirmation will be sent to this address.
                    </p>
                  </div>
                </div>

                {/* Delivery address */}
                <p className="font-lato text-xs font-bold uppercase tracking-wider text-[#7AA33E] mb-6">
                  Delivery Address
                </p>

                <div className="space-y-4">
                  <div>
                    <label htmlFor="addressLine1" className="block font-lato text-[0.7rem] font-bold uppercase tracking-wider text-[#2E5E2E] mb-2">
                      Address Line 1 *
                    </label>
                    <input
                      id="addressLine1"
                      name="addressLine1"
                      type="text"
                      required
                      value={form.addressLine1}
                      onChange={handleChange}
                      placeholder="House / Flat no., Building, Street"
                      className="form-field"
                      disabled={isProcessing}
                    />
                  </div>

                  <div>
                    <label htmlFor="addressLine2" className="block font-lato text-[0.7rem] font-bold uppercase tracking-wider text-[#2E5E2E] mb-2">
                      Address Line 2 <span className="font-normal normal-case text-[#7a6b4e]">(optional)</span>
                    </label>
                    <input
                      id="addressLine2"
                      name="addressLine2"
                      type="text"
                      value={form.addressLine2}
                      onChange={handleChange}
                      placeholder="Area, Colony, Landmark"
                      className="form-field"
                      disabled={isProcessing}
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <div>
                      <label htmlFor="city" className="block font-lato text-[0.7rem] font-bold uppercase tracking-wider text-[#2E5E2E] mb-2">
                        City *
                      </label>
                      <input
                        id="city"
                        name="city"
                        type="text"
                        required
                        value={form.city}
                        onChange={handleChange}
                        placeholder="City"
                        className="form-field"
                        disabled={isProcessing}
                      />
                    </div>
                    <div>
                      <label htmlFor="state" className="block font-lato text-[0.7rem] font-bold uppercase tracking-wider text-[#2E5E2E] mb-2">
                        State *
                      </label>
                      <input
                        id="state"
                        name="state"
                        type="text"
                        required
                        value={form.state}
                        onChange={handleChange}
                        placeholder="State"
                        className="form-field"
                        disabled={isProcessing}
                      />
                    </div>
                    <div>
                      <label htmlFor="pincode" className="block font-lato text-[0.7rem] font-bold uppercase tracking-wider text-[#2E5E2E] mb-2">
                        Pincode *
                      </label>
                      <input
                        id="pincode"
                        name="pincode"
                        type="text"
                        required
                        pattern="\d{6}"
                        value={form.pincode}
                        onChange={handleChange}
                        placeholder="6-digit pincode"
                        className="form-field"
                        disabled={isProcessing}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </AnimatedSection>

            {/* ── Right: Order summary ── */}
            <AnimatedSection delay={0.1}>
              <div
                className="bg-[#FFFDF8] rounded-2xl p-6 lg:sticky lg:top-28"
                style={{ border: '1px solid rgba(122,163,62,0.18)' }}
              >
                <p className="font-lato text-xs font-bold uppercase tracking-wider text-[#7AA33E] mb-5">
                  Order Summary
                </p>

                {/* Items */}
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

                <div className="h-px mb-4" style={{ background: 'linear-gradient(90deg, rgba(122,163,62,0.25), transparent)' }} />

                {/* Totals */}
                <div className="space-y-2 mb-2">
                  <div className="flex items-center justify-between">
                    <p className="font-lato text-sm text-[#7a6b4e]">Subtotal</p>
                    <p className="font-lato text-sm font-bold text-[#2E5E2E]">₹{displaySubtotal}</p>
                  </div>
                  <div className="flex items-center justify-between">
                    <p className="font-lato text-sm text-[#7a6b4e]">Shipping</p>
                    <p className="font-lato text-sm font-bold text-[#2E5E2E]">
                      {displayShipping === 0 ? 'FREE' : `₹${displayShipping}`}
                    </p>
                  </div>
                </div>

                <div className="h-px my-3" style={{ background: 'linear-gradient(90deg, rgba(122,163,62,0.25), transparent)' }} />

                <div className="flex items-center justify-between mb-4">
                  <p className="font-playfair font-bold text-[#2E5E2E] text-lg">Total</p>
                  <p className="font-playfair font-bold text-[#2E5E2E] text-2xl">₹{displayTotal}</p>
                </div>

                {/* How it works notice */}
                <div className="rounded-xl p-3.5 mb-5 flex items-start gap-2.5"
                  style={{ background: 'rgba(122,163,62,0.08)', border: '1px solid rgba(122,163,62,0.2)' }}>
                  <Mail className="w-4 h-4 text-[#7AA33E] flex-shrink-0 mt-0.5" />
                  <p className="font-lato text-[0.68rem] text-[#2E5E2E] leading-relaxed">
                    We&apos;ll email you a confirmation and contact you to arrange payment and delivery.
                  </p>
                </div>

                {/* Submit button */}
                <button
                  id="place-order-btn"
                  type="submit"
                  disabled={isProcessing}
                  className="btn-primary w-full justify-center"
                  style={{ opacity: isProcessing ? 0.7 : 1, cursor: isProcessing ? 'not-allowed' : 'pointer' }}
                >
                  {isProcessing ? (
                    <>
                      <span className="w-4 h-4 border-2 border-[#F2E6C9]/40 border-t-[#F2E6C9] rounded-full animate-spin" />
                      Sending Order…
                    </>
                  ) : (
                    <>
                      <Leaf className="w-4 h-4" />
                      Place Order
                    </>
                  )}
                </button>

                <p className="font-lato text-[0.6rem] text-[#7a6b4e] text-center mt-3">
                  No payment required now · We&apos;ll contact you to confirm
                </p>
              </div>
            </AnimatedSection>
          </div>
        </form>
      </div>
    </div>
  );
}
