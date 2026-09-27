'use client';

import { useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import {
  RotateCcw,
  CheckCircle2,
  XCircle,
  Clock,
  CreditCard,
  AlertCircle,
  FileCheck,
  PackageCheck,
  Truck,
  Building,
  Mail,
  Phone,
  MapPin,
  ChevronRight,
  HelpCircle,
} from 'lucide-react';

const sections = [
  { id: 'introduction', label: '1. Introduction & Scope', icon: FileCheck },
  { id: 'cancellation-requests', label: '2. Cancellation Requests', icon: RotateCcw },
  { id: 'eligibility', label: '3. Eligibility for Refunds', icon: CheckCircle2 },
  { id: 'non-refundable', label: '4. Non-Refundable Situations', icon: XCircle },
  { id: 'timeline', label: '5. Refund Processing Timeline', icon: Clock },
  { id: 'payment-gateway', label: '6. Payment Gateway Processing', icon: CreditCard },
  { id: 'failed-payments', label: '7. Failed or Duplicate Payments', icon: AlertCircle },
  { id: 'partial-refunds', label: '8. Partial Refunds', icon: PackageCheck },
  { id: 'bulk-orders', label: '9. Wholesale & Bulk Orders', icon: Building },
  { id: 'how-to-request', label: '10. How to Request a Refund', icon: HelpCircle },
  { id: 'contact-refunds', label: '11. Contact Information', icon: Mail },
];

export default function RefundPolicyClient() {
  const [activeSection, setActiveSection] = useState('introduction');

  return (
    <div className="bg-[#FFF8EF] min-h-screen text-[#2E5E2E]">
      {/* ===========================
          PAGE HERO
          =========================== */}
      <section
        className="relative pt-36 pb-16 sm:pt-40 sm:pb-20 overflow-hidden"
        style={{ background: '#FFF8EF' }}
        aria-labelledby="refund-heading"
      >
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              'radial-gradient(ellipse 70% 60% at 50% 0%, rgba(242, 230, 201, 0.65) 0%, transparent 70%)',
          }}
        />

        <div className="relative z-10 max-w-4xl mx-auto px-6 text-center">
          {/* Breadcrumb Navigation */}
          <nav aria-label="Breadcrumb" className="mb-6 flex items-center justify-center gap-2 text-xs font-lato text-[#7a6b4e]">
            <Link href="/" className="hover:text-[#2E5E2E] transition-colors">
              Home
            </Link>
            <span>/</span>
            <span>Legal</span>
            <span>/</span>
            <span className="text-[#2E5E2E] font-medium">Refund & Cancellation Policy</span>
          </nav>

          <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
            <div className="eyebrow justify-center mb-4">Customer Protection</div>
          </motion.div>

          <motion.h1
            className="text-display text-[#2E5E2E] mb-4"
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            id="refund-heading"
          >
            Refund &{' '}
            <em className="italic" style={{ color: '#5A2E0D' }}>
              Cancellation.
            </em>
          </motion.h1>

          <motion.p
            className="font-lato text-[#7a6b4e] text-base sm:text-lg max-w-2xl mx-auto leading-relaxed mb-6"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            We stand behind the purity and freshness of our spices. This policy outlines clear,
            fair, and transparent guidelines regarding order cancellations, returns, and refunds.
          </motion.p>

          <motion.div
            className="inline-flex flex-wrap items-center justify-center gap-3 text-xs font-lato text-[#5A4A3A] bg-[#FFFDF8] border border-[#7AA33E]/25 rounded-full px-5 py-2"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
          >
            <span>Reporting Window: <strong>Within 48 Hours</strong></span>
            <span className="text-[#7AA33E]">✦</span>
            <span>Verification: <strong>2–3 Business Days</strong></span>
            <span className="text-[#7AA33E]">✦</span>
            <span>Credit Settlement: <strong>5–7 Business Days</strong></span>
          </motion.div>
        </div>
      </section>

      {/* ===========================
          KEY TIMELINE OVERVIEW
          =========================== */}
      <section className="max-w-7xl mx-auto px-6 mb-12" aria-label="Process Overview">
        <div className="bg-[#FFFDF8] border border-[#7AA33E]/20 rounded-2xl p-6 sm:p-8 shadow-sm">
          <div className="text-center max-w-2xl mx-auto mb-8">
            <h2 className="font-playfair text-lg sm:text-xl font-bold text-[#2E5E2E] mb-2">
              How the Refund & Replacement Process Works
            </h2>
            <p className="font-lato text-xs sm:text-sm text-[#7a6b4e]">
              A simple, reliable three-step process designed to resolve spice delivery issues swiftly.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 relative">
            <div className="flex flex-col items-center text-center p-4 rounded-xl bg-[#FFF8EF] border border-[#7AA33E]/15">
              <div className="w-12 h-12 rounded-full bg-[#2E5E2E] text-[#FFF8EF] flex items-center justify-center font-bold text-sm mb-3">
                1
              </div>
              <h3 className="font-playfair font-bold text-[#2E5E2E] text-base mb-1">
                Report Issue
              </h3>
              <p className="font-lato text-xs text-[#5A4A3A] leading-relaxed">
                Contact us within <strong>48 hours</strong> of delivery with your Order ID and photo/video of the damaged seal or incorrect pack.
              </p>
            </div>

            <div className="flex flex-col items-center text-center p-4 rounded-xl bg-[#FFF8EF] border border-[#7AA33E]/15">
              <div className="w-12 h-12 rounded-full bg-[#7AA33E] text-[#FFF8EF] flex items-center justify-center font-bold text-sm mb-3">
                2
              </div>
              <h3 className="font-playfair font-bold text-[#2E5E2E] text-base mb-1">
                Verification & Approval
              </h3>
              <p className="font-lato text-xs text-[#5A4A3A] leading-relaxed">
                Our customer care team reviews your submission within <strong>2 to 3 business days</strong> and confirms replacement or refund.
              </p>
            </div>

            <div className="flex flex-col items-center text-center p-4 rounded-xl bg-[#FFF8EF] border border-[#7AA33E]/15">
              <div className="w-12 h-12 rounded-full bg-[#5A2E0D] text-[#FFF8EF] flex items-center justify-center font-bold text-sm mb-3">
                3
              </div>
              <h3 className="font-playfair font-bold text-[#2E5E2E] text-base mb-1">
                Refund Credited
              </h3>
              <p className="font-lato text-xs text-[#5A4A3A] leading-relaxed">
                Approved funds are credited directly to your original payment method (UPI/Card/Bank) within <strong>5 to 7 business days</strong>.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ===========================
          MAIN CONTENT AREA
          =========================== */}
      <section className="max-w-7xl mx-auto px-6 pb-24">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          {/* Desktop Sticky Table of Contents */}
          <aside className="hidden lg:block lg:col-span-4 xl:col-span-3">
            <div className="sticky top-28 bg-[#FFFDF8] border border-[#7AA33E]/20 rounded-2xl p-5 shadow-sm max-h-[calc(100vh-8rem)] overflow-y-auto">
              <h2 className="font-playfair font-bold text-sm text-[#2E5E2E] uppercase tracking-wider mb-4 pb-2 border-b border-[#7AA33E]/15">
                Table of Contents
              </h2>
              <nav className="space-y-1.5" aria-label="Refund policy sections">
                {sections.map((section) => (
                  <a
                    key={section.id}
                    href={`#${section.id}`}
                    onClick={() => setActiveSection(section.id)}
                    className={`flex items-center gap-2.5 px-3 py-2 rounded-lg text-xs font-lato transition-all ${
                      activeSection === section.id
                        ? 'bg-[#2E5E2E] text-[#FFF8EF] font-bold'
                        : 'text-[#5A4A3A] hover:bg-[#F2E6C9]/40 hover:text-[#2E5E2E]'
                    }`}
                  >
                    <section.icon className="w-3.5 h-3.5 flex-shrink-0" />
                    <span className="truncate">{section.label}</span>
                  </a>
                ))}
              </nav>

              <div className="mt-6 pt-5 border-t border-[#7AA33E]/15">
                <p className="text-[0.7rem] text-[#7a6b4e] font-lato leading-relaxed mb-3">
                  Need immediate help with a damaged spice package or order inquiry?
                </p>
                <a
                  href="tel:+918810303231"
                  className="inline-flex items-center gap-2 text-xs font-bold text-[#2E5E2E] hover:text-[#7AA33E] transition-colors block mb-1"
                >
                  <Phone className="w-3.5 h-3.5" />
                  <span>+91 8810303231</span>
                </a>
                <a
                  href="mailto:delhiwally@gmail.com"
                  className="inline-flex items-center gap-2 text-xs font-bold text-[#2E5E2E] hover:text-[#7AA33E] transition-colors"
                >
                  <Mail className="w-3.5 h-3.5" />
                  <span>delhiwally@gmail.com</span>
                </a>
              </div>
            </div>
          </aside>

          {/* Policy Text Columns */}
          <div className="lg:col-span-8 xl:col-span-9 space-y-8 font-lato">
            {/* 1. Introduction & Scope */}
            <article
              id="introduction"
              className="bg-[#FFFDF8] border border-[#7AA33E]/20 rounded-2xl p-6 sm:p-8 shadow-sm scroll-mt-28"
            >
              <div className="flex items-center gap-3 mb-4">
                <span className="w-8 h-8 rounded-full bg-[#7AA33E]/20 text-[#2E5E2E] font-bold text-xs flex items-center justify-center">
                  01
                </span>
                <h2 className="font-playfair text-xl sm:text-2xl font-bold text-[#2E5E2E]">
                  Introduction & Scope
                </h2>
              </div>
              <div className="text-[#5A4A3A] text-sm sm:text-base leading-relaxed space-y-3">
                <p>
                  This Refund, Return, and Cancellation Policy applies to all orders placed on{' '}
                  <Link href="/" className="text-[#2E5E2E] font-medium underline underline-offset-2">
                    https://truetaste.in
                  </Link>{' '}
                  for packaged pure Indian spices manufactured and distributed by <strong>True Taste</strong> (Delhi Wally), New Delhi, India.
                </p>
                <p>
                  As an FSSAI-registered food manufacturer (Lic. No. 23326003003695), our packaging follows hygienic and food safety standards to ensure spices reach your kitchen with pure aroma and sealed freshness. Because spices are consumable food products, specific statutory hygiene considerations govern return eligibility.
                </p>
              </div>
            </article>

            {/* 2. Cancellation Requests */}
            <article
              id="cancellation-requests"
              className="bg-[#FFFDF8] border border-[#7AA33E]/20 rounded-2xl p-6 sm:p-8 shadow-sm scroll-mt-28"
            >
              <div className="flex items-center gap-3 mb-4">
                <span className="w-8 h-8 rounded-full bg-[#7AA33E]/20 text-[#2E5E2E] font-bold text-xs flex items-center justify-center">
                  02
                </span>
                <h2 className="font-playfair text-xl sm:text-2xl font-bold text-[#2E5E2E]">
                  Cancellation Requests
                </h2>
              </div>
              <div className="text-[#5A4A3A] text-sm sm:text-base leading-relaxed space-y-4">
                <p>
                  We recognize that order circumstances may change. Cancellation requests are categorized based on order dispatch status:
                </p>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="p-4 rounded-xl bg-[#FFF8EF] border border-[#7AA33E]/20">
                    <h3 className="font-playfair font-bold text-[#2E5E2E] text-sm mb-2 flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-[#7AA33E]" /> Prior to Dispatch
                    </h3>
                    <p className="text-xs text-[#5A4A3A] leading-relaxed">
                      If your order has not yet been packed or handed over to our courier partner, you can request an immediate cancellation by contacting us at +91 8810303231 or delhiwally@gmail.com with your Order ID. A 100% refund will be initiated immediately.
                    </p>
                  </div>

                  <div className="p-4 rounded-xl bg-[#FFF8EF] border border-[#7AA33E]/20">
                    <h3 className="font-playfair font-bold text-[#2E5E2E] text-sm mb-2 flex items-center gap-2">
                      <Truck className="w-4 h-4 text-[#5A2E0D]" /> Post Dispatch
                    </h3>
                    <p className="text-xs text-[#5A4A3A] leading-relaxed">
                      Once a consignment has been dispatched from our facility and an Airway Bill (AWB) has been generated, orders cannot be cancelled mid-transit. The delivery must be received, and standard return/replacement conditions will apply thereafter.
                    </p>
                  </div>
                </div>
              </div>
            </article>

            {/* 3. Eligibility for Refunds & Replacements */}
            <article
              id="eligibility"
              className="bg-[#FFFDF8] border border-[#7AA33E]/20 rounded-2xl p-6 sm:p-8 shadow-sm scroll-mt-28"
            >
              <div className="flex items-center gap-3 mb-4">
                <span className="w-8 h-8 rounded-full bg-[#7AA33E]/20 text-[#2E5E2E] font-bold text-xs flex items-center justify-center">
                  03
                </span>
                <h2 className="font-playfair text-xl sm:text-2xl font-bold text-[#2E5E2E]">
                  Eligibility for Refunds & Replacements
                </h2>
              </div>
              <div className="text-[#5A4A3A] text-sm sm:text-base leading-relaxed space-y-4">
                <p>
                  You are eligible for a replacement spice parcel or a full/partial refund under the following valid circumstances:
                </p>

                <ul className="space-y-2.5">
                  <li className="flex items-start gap-2.5">
                    <CheckCircle2 className="w-4 h-4 text-[#7AA33E] mt-1 flex-shrink-0" />
                    <span><strong>Transit Damage:</strong> The outer parcel or individual spice pouch arrived crushed, torn, cut, or with punctured packaging during courier transit.</span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <CheckCircle2 className="w-4 h-4 text-[#7AA33E] mt-1 flex-shrink-0" />
                    <span><strong>Broken Tamper Seal:</strong> The factory airtight seal of the spice pack was broken or compromised upon arrival.</span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <CheckCircle2 className="w-4 h-4 text-[#7AA33E] mt-1 flex-shrink-0" />
                    <span><strong>Incorrect Product Delivered:</strong> You received a different spice or pack size (e.g. received Turmeric 50g instead of Garam Masala 100g).</span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <CheckCircle2 className="w-4 h-4 text-[#7AA33E] mt-1 flex-shrink-0" />
                    <span><strong>Quality Discrepancy or Expired Batch:</strong> A product delivered past its labeled best-before date or displaying uncharacteristic moisture inside the sealed pack.</span>
                  </li>
                </ul>

                <div className="p-4 rounded-xl bg-[#7AA33E]/10 border-l-4 border-[#2E5E2E] text-xs leading-relaxed text-[#2E5E2E]">
                  <strong>Mandatory Requirement:</strong> Any transit damage or packaging defect must be reported within <strong>48 hours of delivery</strong>. Clear photographic evidence or an unboxing video of the shipping box and affected spice pack must accompany the request.
                </div>
              </div>
            </article>

            {/* 4. Non-Refundable Situations */}
            <article
              id="non-refundable"
              className="bg-[#FFFDF8] border border-[#7AA33E]/20 rounded-2xl p-6 sm:p-8 shadow-sm scroll-mt-28"
            >
              <div className="flex items-center gap-3 mb-4">
                <span className="w-8 h-8 rounded-full bg-[#7AA33E]/20 text-[#2E5E2E] font-bold text-xs flex items-center justify-center">
                  04
                </span>
                <h2 className="font-playfair text-xl sm:text-2xl font-bold text-[#2E5E2E]">
                  Non-Refundable Situations
                </h2>
              </div>
              <div className="text-[#5A4A3A] text-sm sm:text-base leading-relaxed space-y-3">
                <p>
                  In accordance with food safety standards and the consumable nature of spices, refunds or returns cannot be approved in the following cases:
                </p>

                <ul className="space-y-2.5">
                  <li className="flex items-start gap-2.5">
                    <XCircle className="w-4 h-4 text-[#5A2E0D] mt-1 flex-shrink-0" />
                    <span><strong>Opened or Consumed Packages:</strong> Spice packs that have been opened, unsealed, or partially consumed cannot be accepted for return due to food safety and contamination hazards.</span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <XCircle className="w-4 h-4 text-[#5A2E0D] mt-1 flex-shrink-0" />
                    <span><strong>Change of Mind:</strong> Change of culinary preference or accidental order of an unwanted spice variant after successful delivery.</span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <XCircle className="w-4 h-4 text-[#5A2E0D] mt-1 flex-shrink-0" />
                    <span><strong>Incorrect Address or Non-Availability:</strong> Packages that return to our hub due to wrong recipient pin codes, incomplete delivery addresses, or recipient unavailability across multiple courier delivery attempts.</span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <XCircle className="w-4 h-4 text-[#5A2E0D] mt-1 flex-shrink-0" />
                    <span><strong>Delays from Unforeseen Events:</strong> Courier transit delays caused by regional road closures, severe weather, regional festivals, or force majeure events beyond reasonable commercial control.</span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <XCircle className="w-4 h-4 text-[#5A2E0D] mt-1 flex-shrink-0" />
                    <span><strong>Minor External Scuffs:</strong> Superficial creases or dust on the outer shipping carton where the inner spice pouches remain intact, sealed, and undamaged.</span>
                  </li>
                </ul>
              </div>
            </article>

            {/* 5. Refund Processing Timeline */}
            <article
              id="timeline"
              className="bg-[#FFFDF8] border border-[#7AA33E]/20 rounded-2xl p-6 sm:p-8 shadow-sm scroll-mt-28"
            >
              <div className="flex items-center gap-3 mb-4">
                <span className="w-8 h-8 rounded-full bg-[#7AA33E]/20 text-[#2E5E2E] font-bold text-xs flex items-center justify-center">
                  05
                </span>
                <h2 className="font-playfair text-xl sm:text-2xl font-bold text-[#2E5E2E]">
                  Refund Processing Timeline
                </h2>
              </div>
              <div className="text-[#5A4A3A] text-sm sm:text-base leading-relaxed space-y-4">
                <p>
                  We aim to settle every verified customer concern promptly:
                </p>

                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs sm:text-sm border-collapse">
                    <thead>
                      <tr className="bg-[#FFF8EF] border-b border-[#7AA33E]/30 text-[#2E5E2E]">
                        <th className="p-3 font-playfair font-bold">Stage</th>
                        <th className="p-3 font-playfair font-bold">Timeframe</th>
                        <th className="p-3 font-playfair font-bold">Action Taken</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-[#7AA33E]/15">
                      <tr>
                        <td className="p-3 font-bold text-[#2E5E2E]">Claim Verification</td>
                        <td className="p-3">2 to 3 Business Days</td>
                        <td className="p-3 text-[#7a6b4e]">Review of photos, unboxing proof, and courier tracking history.</td>
                      </tr>
                      <tr>
                        <td className="p-3 font-bold text-[#2E5E2E]">Refund Initiation</td>
                        <td className="p-3">Within 24–48 Hours</td>
                        <td className="p-3 text-[#7a6b4e]">Gateway trigger sent to reverse authorized payment.</td>
                      </tr>
                      <tr>
                        <td className="p-3 font-bold text-[#2E5E2E]">Bank Settlement Credit</td>
                        <td className="p-3">5 to 7 Business Days</td>
                        <td className="p-3 text-[#7a6b4e]">Funds reflect in original customer bank/card account (per bank cycle).</td>
                      </tr>
                    </tbody>
                  </table>
                </div>

                <p className="text-xs text-[#7a6b4e]">
                  * Business days exclude Sundays and Indian national bank holidays. If your credit does not appear within 7 business days post-confirmation, please contact your issuing bank quoting the refund reference number provided by us.
                </p>
              </div>
            </article>

            {/* 6. Payment Gateway Processing */}
            <article
              id="payment-gateway"
              className="bg-[#FFFDF8] border border-[#7AA33E]/20 rounded-2xl p-6 sm:p-8 shadow-sm scroll-mt-28"
            >
              <div className="flex items-center gap-3 mb-4">
                <span className="w-8 h-8 rounded-full bg-[#7AA33E]/20 text-[#2E5E2E] font-bold text-xs flex items-center justify-center">
                  06
                </span>
                <h2 className="font-playfair text-xl sm:text-2xl font-bold text-[#2E5E2E]">
                  Payment Gateway Processing Considerations
                </h2>
              </div>
              <div className="text-[#5A4A3A] text-sm sm:text-base leading-relaxed space-y-3">
                <p>
                  All refunds are automatically routed back to the <strong>original source of payment</strong> utilized during order placement:
                </p>
                <ul className="list-disc list-inside space-y-1.5 text-sm">
                  <li><strong>UPI Transactions:</strong> Refunded directly to the linked bank account associated with the VPA.</li>
                  <li><strong>Credit / Debit Cards:</strong> Reversed to the card issuing bank account.</li>
                  <li><strong>Net Banking:</strong> Credited back to the originating bank account.</li>
                </ul>
                <p>
                  For security and compliance reasons, refunds cannot be remitted to a different third-party account, cash, or alternative recipient.
                </p>
              </div>
            </article>

            {/* 7. Failed or Duplicate Payments */}
            <article
              id="failed-payments"
              className="bg-[#FFFDF8] border border-[#7AA33E]/20 rounded-2xl p-6 sm:p-8 shadow-sm scroll-mt-28"
            >
              <div className="flex items-center gap-3 mb-4">
                <span className="w-8 h-8 rounded-full bg-[#7AA33E]/20 text-[#2E5E2E] font-bold text-xs flex items-center justify-center">
                  07
                </span>
                <h2 className="font-playfair text-xl sm:text-2xl font-bold text-[#2E5E2E]">
                  Failed or Duplicate Payments
                </h2>
              </div>
              <div className="text-[#5A4A3A] text-sm sm:text-base leading-relaxed space-y-3">
                <p>
                  In the event your payment was debited twice due to a browser refresh or network timeout, or if your account was debited while the website indicated a transaction failure:
                </p>
                <div className="p-4 rounded-xl bg-[#FFF8EF] border border-[#7AA33E]/20 text-xs sm:text-sm">
                  <p className="mb-2 text-[#2E5E2E]">
                    <strong>Automatic Reconciliation:</strong> Indian payment gateway infrastructure automatically reconciles failed or duplicate deductions. Such sums are routinely reversed by your bank within <strong>48 to 72 hours</strong> without requiring customer intervention.
                  </p>
                  <p className="text-[#7a6b4e]">
                    If the deducted amount does not return to your account after 72 hours, please email your transaction bank screenshot and reference ID to <a href="mailto:delhiwally@gmail.com" className="underline font-bold text-[#2E5E2E]">delhiwally@gmail.com</a> and we will assist in coordinating with the gateway.
                  </p>
                </div>
              </div>
            </article>

            {/* 8. Partial Refunds */}
            <article
              id="partial-refunds"
              className="bg-[#FFFDF8] border border-[#7AA33E]/20 rounded-2xl p-6 sm:p-8 shadow-sm scroll-mt-28"
            >
              <div className="flex items-center gap-3 mb-4">
                <span className="w-8 h-8 rounded-full bg-[#7AA33E]/20 text-[#2E5E2E] font-bold text-xs flex items-center justify-center">
                  08
                </span>
                <h2 className="font-playfair text-xl sm:text-2xl font-bold text-[#2E5E2E]">
                  Partial Refunds, Where Applicable
                </h2>
              </div>
              <div className="text-[#5A4A3A] text-sm sm:text-base leading-relaxed space-y-3">
                <p>
                  In multi-item orders where only one product is affected (for example, if an order contained 5 spice packs and only one pack arrived damaged or was out of stock), True Taste will process a pro-rata partial refund or replacement specifically for the affected item.
                </p>
                <p>
                  The remainder of the undamaged order remains non-refundable once delivered intact.
                </p>
              </div>
            </article>

            {/* 9. Service-Specific & Bulk Orders */}
            <article
              id="bulk-orders"
              className="bg-[#FFFDF8] border border-[#7AA33E]/20 rounded-2xl p-6 sm:p-8 shadow-sm scroll-mt-28"
            >
              <div className="flex items-center gap-3 mb-4">
                <span className="w-8 h-8 rounded-full bg-[#7AA33E]/20 text-[#2E5E2E] font-bold text-xs flex items-center justify-center">
                  09
                </span>
                <h2 className="font-playfair text-xl sm:text-2xl font-bold text-[#2E5E2E]">
                  Wholesale, Institutional & Bulk Orders
                </h2>
              </div>
              <div className="text-[#5A4A3A] text-sm sm:text-base leading-relaxed space-y-3">
                <p>
                  Commercial, wholesale, or custom-packaged spice contracts are governed by specific commercial Purchase Orders (POs) agreed upon in writing between True Taste and the client.
                </p>
                <p>
                  Standard retail consumer cancellation terms do not automatically apply to bespoke bulk ground spice orders once milling, batch blending, or customized packaging has commenced.
                </p>
              </div>
            </article>

            {/* 10. How Customers Can Request a Refund */}
            <article
              id="how-to-request"
              className="bg-[#FFFDF8] border border-[#7AA33E]/20 rounded-2xl p-6 sm:p-8 shadow-sm scroll-mt-28"
            >
              <div className="flex items-center gap-3 mb-4">
                <span className="w-8 h-8 rounded-full bg-[#7AA33E]/20 text-[#2E5E2E] font-bold text-xs flex items-center justify-center">
                  10
                </span>
                <h2 className="font-playfair text-xl sm:text-2xl font-bold text-[#2E5E2E]">
                  How to Request a Refund or Cancellation
                </h2>
              </div>
              <div className="text-[#5A4A3A] text-sm sm:text-base leading-relaxed space-y-4">
                <p>To ensure quick resolution, follow these simple steps:</p>

                <div className="space-y-3">
                  <div className="flex items-start gap-3 p-3.5 bg-[#FFF8EF] rounded-xl border border-[#7AA33E]/15">
                    <div className="w-6 h-6 rounded-full bg-[#2E5E2E] text-white flex items-center justify-center text-xs font-bold flex-shrink-0 mt-0.5">
                      1
                    </div>
                    <div>
                      <strong className="text-[#2E5E2E] block">Prepare Details:</strong>
                      <span className="text-xs text-[#5A4A3A]">
                        Note your Order ID, contact phone number, and capture 2–3 clear photographs or an unboxing video showing the shipping label and the specific damage or error.
                      </span>
                    </div>
                  </div>

                  <div className="flex items-start gap-3 p-3.5 bg-[#FFF8EF] rounded-xl border border-[#7AA33E]/15">
                    <div className="w-6 h-6 rounded-full bg-[#2E5E2E] text-white flex items-center justify-center text-xs font-bold flex-shrink-0 mt-0.5">
                      2
                    </div>
                    <div>
                      <strong className="text-[#2E5E2E] block">Submit Within 48 Hours:</strong>
                      <span className="text-xs text-[#5A4A3A]">
                        Email us at{' '}
                        <a href="mailto:delhiwally@gmail.com" className="font-bold underline text-[#2E5E2E]">
                          delhiwally@gmail.com
                        </a>{' '}
                        or send a message/call on{' '}
                        <a href="tel:+918810303231" className="font-bold underline text-[#2E5E2E]">
                          +91 8810303231
                        </a>{' '}
                        with subject line: <em>&quot;Refund Request — [Order ID]&quot;</em>.
                      </span>
                    </div>
                  </div>

                  <div className="flex items-start gap-3 p-3.5 bg-[#FFF8EF] rounded-xl border border-[#7AA33E]/15">
                    <div className="w-6 h-6 rounded-full bg-[#2E5E2E] text-white flex items-center justify-center text-xs font-bold flex-shrink-0 mt-0.5">
                      3
                    </div>
                    <div>
                      <strong className="text-[#2E5E2E] block">Resolution & Dispatch:</strong>
                      <span className="text-xs text-[#5A4A3A]">
                        Our care team verifies the claim and will either dispatch a fresh replacement pouch at zero added charge or initiate a full refund to your original payment method.
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </article>

            {/* 11. Contact Information */}
            <article
              id="contact-refunds"
              className="bg-[#FFFDF8] border-2 border-[#7AA33E]/30 rounded-2xl p-6 sm:p-8 shadow-md scroll-mt-28"
            >
              <div className="flex items-center gap-3 mb-4">
                <span className="w-8 h-8 rounded-full bg-[#2E5E2E] text-[#FFF8EF] font-bold text-xs flex items-center justify-center">
                  11
                </span>
                <h2 className="font-playfair text-xl sm:text-2xl font-bold text-[#2E5E2E]">
                  Contact Information for Refund Queries
                </h2>
              </div>
              <div className="text-[#5A4A3A] text-sm sm:text-base leading-relaxed space-y-4">
                <p>
                  Our customer support desk is dedicated to assisting you with order tracking, return queries, or payment inquiries:
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                  <div className="flex items-start gap-3 p-4 rounded-xl bg-[#FFF8EF] border border-[#7AA33E]/20">
                    <Mail className="w-5 h-5 text-[#7AA33E] mt-0.5 flex-shrink-0" />
                    <div>
                      <span className="text-xs uppercase tracking-wider text-[#7a6b4e] block font-bold">Email Us</span>
                      <a href="mailto:delhiwally@gmail.com" className="font-medium text-[#2E5E2E] hover:text-[#7AA33E] transition-colors text-sm">
                        delhiwally@gmail.com
                      </a>
                    </div>
                  </div>

                  <div className="flex items-start gap-3 p-4 rounded-xl bg-[#FFF8EF] border border-[#7AA33E]/20">
                    <Phone className="w-5 h-5 text-[#7AA33E] mt-0.5 flex-shrink-0" />
                    <div>
                      <span className="text-xs uppercase tracking-wider text-[#7a6b4e] block font-bold">Support Helpline</span>
                      <a href="tel:+918810303231" className="font-medium text-[#2E5E2E] hover:text-[#7AA33E] transition-colors text-sm block">
                        +91 8810303231
                      </a>
                      <a href="tel:+919716567548" className="font-medium text-[#2E5E2E] hover:text-[#7AA33E] transition-colors text-sm block">
                        +91 9716567548
                      </a>
                    </div>
                  </div>

                  <div className="sm:col-span-2 flex items-start gap-3 p-4 rounded-xl bg-[#FFF8EF] border border-[#7AA33E]/20">
                    <MapPin className="w-5 h-5 text-[#7AA33E] mt-0.5 flex-shrink-0" />
                    <div>
                      <span className="text-xs uppercase tracking-wider text-[#7a6b4e] block font-bold">Facility & Office</span>
                      <address className="not-italic text-sm text-[#2E5E2E]">
                        <strong>True Taste (Delhi Wally)</strong><br />
                        E-429 New Ashok Nagar, Delhi – 110096, India<br />
                        <span className="text-xs text-[#7a6b4e]">FSSAI Lic. No. 23326003003695</span>
                      </address>
                    </div>
                  </div>
                </div>

                <div className="pt-2 flex flex-wrap items-center justify-between gap-4">
                  <p className="text-xs text-[#7a6b4e]">
                    Support Operating Hours: Monday to Saturday, 9:00 AM – 7:00 PM IST
                  </p>
                  <Link href="/contact" className="btn-outline text-xs py-2 px-4">
                    Contact Us <ChevronRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>
            </article>
          </div>
        </div>
      </section>
    </div>
  );
}
