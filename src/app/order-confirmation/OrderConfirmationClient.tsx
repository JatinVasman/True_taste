'use client';

/**
 * OrderConfirmationClient — True Taste
 *
 * Displays the order success page after the email-based checkout.
 * The orderId comes from the URL query param set by CheckoutClient.
 * This page is purely a display page — safe to revisit.
 */

import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { CheckCircle, ArrowRight, Leaf, Mail } from 'lucide-react';
import AnimatedSection from '@/components/AnimatedSection';

export default function OrderConfirmationClient() {
  const params = useSearchParams();
  const orderId = params.get('orderId');

  if (!orderId) {
    return (
      <div className="min-h-screen bg-[#FFF8EF] flex flex-col items-center justify-center gap-4 p-6">
        <h1 className="font-playfair font-bold text-[#2E5E2E] text-2xl">Order Not Found</h1>
        <Link href="/products" className="btn-primary">
          Browse Spices
          <ArrowRight className="w-4 h-4" />
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#FFF8EF] px-4 py-28">
      <div
        className="fixed inset-0 pointer-events-none"
        style={{ background: 'radial-gradient(ellipse 65% 50% at 50% 0%, rgba(122,163,62,0.15) 0%, transparent 65%)' }}
      />

      <div className="relative z-10 max-w-xl mx-auto text-center">
        <AnimatedSection>
          {/* Success icon */}
          <div
            className="w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6"
            style={{ background: 'rgba(122,163,62,0.12)' }}
          >
            <CheckCircle className="w-10 h-10 text-[#7AA33E]" />
          </div>

          <div className="eyebrow justify-center mb-4">Order Received</div>
          <h1 className="font-playfair font-bold text-[#2E5E2E] text-4xl mb-4">
            Thank You!
          </h1>
          <p className="font-lato text-[#7a6b4e] text-base leading-relaxed mb-6">
            Your order has been placed successfully. We&rsquo;re reviewing it and will contact you shortly to arrange delivery and payment.
          </p>

          {/* Order ID */}
          <div
            className="bg-[#FFFDF8] rounded-2xl p-5 mb-6 text-left"
            style={{ border: '1px solid rgba(122,163,62,0.18)' }}
          >
            <p className="font-lato text-[0.65rem] font-bold uppercase tracking-wider text-[#7AA33E] mb-1">
              Order Reference
            </p>
            <p className="font-playfair font-bold text-[#2E5E2E] text-xl">{orderId}</p>
          </div>

          {/* Email notice */}
          <div
            className="bg-[#FFFDF8] rounded-2xl p-5 mb-8 flex items-start gap-3 text-left"
            style={{ border: '1px solid rgba(122,163,62,0.18)' }}
          >
            <Mail className="w-5 h-5 text-[#7AA33E] flex-shrink-0 mt-0.5" />
            <div>
              <p className="font-lato text-sm font-bold text-[#2E5E2E] mb-1">Confirmation Email Sent</p>
              <p className="font-lato text-xs text-[#7a6b4e] leading-relaxed">
                An order summary has been sent to your email address. Our team will reach out to confirm and arrange delivery.
                For support, contact us at{' '}
                <a href="mailto:delhiwally@gmial.com" className="text-[#7AA33E] hover:underline">
                  delhiwally@gmial.com
                </a>
              </p>
            </div>
          </div>

          {/* Actions */}
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link href="/products" className="btn-primary">
              <Leaf className="w-4 h-4" />
              Continue Shopping
            </Link>
            <Link href="/" className="btn-outline">
              Back to Home
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </AnimatedSection>
      </div>
    </div>
  );
}
