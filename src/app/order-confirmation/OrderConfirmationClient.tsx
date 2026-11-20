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
import { CheckCircle, ArrowRight, Leaf } from 'lucide-react';
import AnimatedSection from '@/components/AnimatedSection';
import WhatsAppIcon from '@/components/WhatsAppIcon';
import { DEFAULT_WHATSAPP_PHONE, getWhatsAppUrl } from '@/lib/whatsapp';

export default function OrderConfirmationClient() {
  const params = useSearchParams();
  const orderId = params.get('orderId');

  const whatsappUrl = getWhatsAppUrl(
    `Hello True Taste! 👋 Checking on my order reference *${orderId || ''}*.`,
    DEFAULT_WHATSAPP_PHONE
  );

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
            Order Sent to WhatsApp!
          </h1>
          <p className="font-lato text-[#7a6b4e] text-base leading-relaxed mb-6">
            Your order details have been prepared for WhatsApp. If WhatsApp didn&rsquo;t open automatically, tap the button below to send your order.
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

          {/* WhatsApp notice & re-open button */}
          <div
            className="bg-[#FFFDF8] rounded-2xl p-5 mb-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-left"
            style={{ border: '1px solid rgba(37, 211, 102, 0.3)', background: 'rgba(37, 211, 102, 0.04)' }}
          >
            <div className="flex items-start gap-3">
              <WhatsAppIcon className="w-6 h-6 fill-[#25D366] flex-shrink-0 mt-0.5" />
              <div>
                <p className="font-lato text-sm font-bold text-[#1b5e20] mb-0.5">Confirm with us on WhatsApp</p>
                <p className="font-lato text-xs text-[#7a6b4e] leading-relaxed">
                  Our team confirms your order and coordinates delivery directly on WhatsApp.
                </p>
              </div>
            </div>
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-shrink-0 inline-flex items-center gap-2 py-2.5 px-4 rounded-xl font-lato font-bold text-xs text-white shadow-md hover:scale-105 transition-all"
              style={{
                background: 'linear-gradient(135deg, #25D366 0%, #128C7E 100%)',
              }}
            >
              <WhatsAppIcon className="w-4 h-4 fill-white" />
              <span>Open WhatsApp Chat</span>
            </a>
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
