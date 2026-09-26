'use client';

import { useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import {
  FileText,
  CheckCircle,
  UserCheck,
  ShoppingBag,
  CreditCard,
  Layers,
  ShieldAlert,
  Copyright,
  Ban,
  MessageSquare,
  ExternalLink,
  AlertTriangle,
  Scale,
  Shield,
  Clock,
  MapPin,
  Mail,
  Phone,
  ChevronRight,
} from 'lucide-react';

const sections = [
  { id: 'acceptance', label: '1. Acceptance of Terms', icon: CheckCircle },
  { id: 'eligibility', label: '2. Eligibility', icon: UserCheck },
  { id: 'description-services', label: '3. Description of Services', icon: ShoppingBag },
  { id: 'user-responsibilities', label: '4. User Responsibilities', icon: Layers },
  { id: 'account-information', label: '5. Account Information', icon: UserCheck },
  { id: 'pricing-payments', label: '6. Pricing & Payments', icon: CreditCard },
  { id: 'payment-processing', label: '7. Payment Gateways', icon: CreditCard },
  { id: 'service-availability', label: '8. Service Availability', icon: Clock },
  { id: 'intellectual-property', label: '9. Intellectual Property', icon: Copyright },
  { id: 'prohibited-use', label: '10. Prohibited Use', icon: Ban },
  { id: 'user-content', label: '11. User-Provided Content', icon: MessageSquare },
  { id: 'third-party-links', label: '12. Third-Party Links', icon: ExternalLink },
  { id: 'limitation-liability', label: '13. Limitation of Liability', icon: AlertTriangle },
  { id: 'disclaimer-warranties', label: '14. Disclaimer of Warranties', icon: ShieldAlert },
  { id: 'indemnification', label: '15. Indemnification', icon: Shield },
  { id: 'suspension-termination', label: '16. Suspension & Termination', icon: Ban },
  { id: 'changes-to-terms', label: '17. Changes to Services & Terms', icon: FileText },
  { id: 'governing-law', label: '18. Governing Law & Jurisdiction', icon: Scale },
  { id: 'contact-terms', label: '19. Contact Information', icon: Mail },
];

export default function TermsClient() {
  const [activeSection, setActiveSection] = useState('acceptance');

  return (
    <div className="bg-[#FFF8EF] min-h-screen text-[#2E5E2E]">
      {/* ===========================
          PAGE HERO
          =========================== */}
      <section
        className="relative pt-36 pb-16 sm:pt-40 sm:pb-20 overflow-hidden"
        style={{ background: '#FFF8EF' }}
        aria-labelledby="terms-heading"
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
            <span className="text-[#2E5E2E] font-medium">Terms & Conditions</span>
          </nav>

          <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
            <div className="eyebrow justify-center mb-4">Legal Agreement</div>
          </motion.div>

          <motion.h1
            className="text-display text-[#2E5E2E] mb-4"
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            id="terms-heading"
          >
            Terms &{' '}
            <em className="italic" style={{ color: '#5A2E0D' }}>
              Conditions.
            </em>
          </motion.h1>

          <motion.p
            className="font-lato text-[#7a6b4e] text-base sm:text-lg max-w-2xl mx-auto leading-relaxed mb-6"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            Please read these Terms & Conditions carefully before using the True Taste website
            or purchasing our premium spices. They establish a legally binding agreement.
          </motion.p>

          <motion.div
            className="inline-flex flex-wrap items-center justify-center gap-3 text-xs font-lato text-[#5A4A3A] bg-[#FFFDF8] border border-[#7AA33E]/25 rounded-full px-5 py-2"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
          >
            <span>Effective Date: <strong>January 1, 2026</strong></span>
            <span className="text-[#7AA33E]">✦</span>
            <span>Last Revised: <strong>March 2026</strong></span>
            <span className="text-[#7AA33E]">✦</span>
            <span>Jurisdiction: <strong>New Delhi, India</strong></span>
          </motion.div>
        </div>
      </section>

      {/* ===========================
          QUICK SUMMARY CARDS
          =========================== */}
      <section className="max-w-7xl mx-auto px-6 mb-12" aria-label="Key Terms Highlights">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="bg-[#FFFDF8] border border-[#7AA33E]/20 rounded-2xl p-5 shadow-sm flex items-start gap-4">
            <div className="w-10 h-10 rounded-xl bg-[#7AA33E]/15 flex items-center justify-center flex-shrink-0 text-[#2E5E2E]">
              <CheckCircle className="w-5 h-5 text-[#2E5E2E]" />
            </div>
            <div>
              <h3 className="font-playfair font-bold text-sm text-[#2E5E2E] mb-1">Clear Agreement</h3>
              <p className="font-lato text-xs text-[#7a6b4e] leading-relaxed">
                Using truetaste.in constitutes your mutual agreement to these terms and policies.
              </p>
            </div>
          </div>

          <div className="bg-[#FFFDF8] border border-[#7AA33E]/20 rounded-2xl p-5 shadow-sm flex items-start gap-4">
            <div className="w-10 h-10 rounded-xl bg-[#7AA33E]/15 flex items-center justify-center flex-shrink-0 text-[#2E5E2E]">
              <CreditCard className="w-5 h-5 text-[#2E5E2E]" />
            </div>
            <div>
              <h3 className="font-playfair font-bold text-sm text-[#2E5E2E] mb-1">Transparent Pricing</h3>
              <p className="font-lato text-xs text-[#7a6b4e] leading-relaxed">
                All prices are in Indian Rupees (INR) with clear pack sizes (50g, 100g, 200g).
              </p>
            </div>
          </div>

          <div className="bg-[#FFFDF8] border border-[#7AA33E]/20 rounded-2xl p-5 shadow-sm flex items-start gap-4">
            <div className="w-10 h-10 rounded-xl bg-[#7AA33E]/15 flex items-center justify-center flex-shrink-0 text-[#2E5E2E]">
              <Copyright className="w-5 h-5 text-[#2E5E2E]" />
            </div>
            <div>
              <h3 className="font-playfair font-bold text-sm text-[#2E5E2E] mb-1">Brand Integrity</h3>
              <p className="font-lato text-xs text-[#7a6b4e] leading-relaxed">
                Brand assets, copy, recipes, and packaging designs are proprietary to True Taste.
              </p>
            </div>
          </div>

          <div className="bg-[#FFFDF8] border border-[#7AA33E]/20 rounded-2xl p-5 shadow-sm flex items-start gap-4">
            <div className="w-10 h-10 rounded-xl bg-[#7AA33E]/15 flex items-center justify-center flex-shrink-0 text-[#2E5E2E]">
              <Scale className="w-5 h-5 text-[#2E5E2E]" />
            </div>
            <div>
              <h3 className="font-playfair font-bold text-sm text-[#2E5E2E] mb-1">Indian Law</h3>
              <p className="font-lato text-xs text-[#7a6b4e] leading-relaxed">
                Governed under the laws of the Republic of India with jurisdiction in New Delhi.
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
              <nav className="space-y-1.5" aria-label="Terms sections">
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
                  Have questions about these terms or commercial partnership conditions?
                </p>
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
            {/* 1. Acceptance of Terms */}
            <article
              id="acceptance"
              className="bg-[#FFFDF8] border border-[#7AA33E]/20 rounded-2xl p-6 sm:p-8 shadow-sm scroll-mt-28"
            >
              <div className="flex items-center gap-3 mb-4">
                <span className="w-8 h-8 rounded-full bg-[#7AA33E]/20 text-[#2E5E2E] font-bold text-xs flex items-center justify-center">
                  01
                </span>
                <h2 className="font-playfair text-xl sm:text-2xl font-bold text-[#2E5E2E]">
                  Acceptance of Terms
                </h2>
              </div>
              <div className="text-[#5A4A3A] text-sm sm:text-base leading-relaxed space-y-3">
                <p>
                  These Terms & Conditions (&quot;Terms&quot;) constitute a legally binding agreement between you (&quot;User&quot;, &quot;Customer&quot;, or &quot;You&quot;) and <strong>True Taste</strong> (operating under business name Delhi Wally, situated in New Delhi, India, &quot;We&quot;, &quot;Us&quot;, or &quot;Our&quot;).
                </p>
                <p>
                  By accessing, browsing, interacting with, or purchasing spices from our website at{' '}
                  <Link href="/" className="text-[#2E5E2E] font-medium underline underline-offset-2">
                    https://www.truetaste.in
                  </Link>
                  , you signify that you have read, comprehended, and unconditionally agree to be bound by these Terms and our related{' '}
                  <Link href="/privacy-policy" className="text-[#2E5E2E] font-medium underline underline-offset-2">
                    Privacy Policy
                  </Link>{' '}
                  and{' '}
                  <Link href="/refund-policy" className="text-[#2E5E2E] font-medium underline underline-offset-2">
                    Refund & Cancellation Policy
                  </Link>
                  .
                </p>
                <p>
                  If you do not accept these Terms in their entirety, you must immediately cease accessing or using this website.
                </p>
              </div>
            </article>

            {/* 2. Eligibility */}
            <article
              id="eligibility"
              className="bg-[#FFFDF8] border border-[#7AA33E]/20 rounded-2xl p-6 sm:p-8 shadow-sm scroll-mt-28"
            >
              <div className="flex items-center gap-3 mb-4">
                <span className="w-8 h-8 rounded-full bg-[#7AA33E]/20 text-[#2E5E2E] font-bold text-xs flex items-center justify-center">
                  02
                </span>
                <h2 className="font-playfair text-xl sm:text-2xl font-bold text-[#2E5E2E]">
                  Eligibility
                </h2>
              </div>
              <div className="text-[#5A4A3A] text-sm sm:text-base leading-relaxed space-y-3">
                <p>
                  You represent and warrant that you are at least 18 years of age and possess the legal capacity to enter into a binding contract under the <em>Indian Contract Act, 1872</em>.
                </p>
                <p>
                  If you are browsing or purchasing on behalf of a culinary establishment, commercial entity, partnership, or organization, you represent that you possess the necessary authorization to bind that entity to these Terms. If you are under 18 years of age, you may browse our spice products only under the direct supervision of a parent or legal guardian.
                </p>
              </div>
            </article>

            {/* 3. Description of Services */}
            <article
              id="description-services"
              className="bg-[#FFFDF8] border border-[#7AA33E]/20 rounded-2xl p-6 sm:p-8 shadow-sm scroll-mt-28"
            >
              <div className="flex items-center gap-3 mb-4">
                <span className="w-8 h-8 rounded-full bg-[#7AA33E]/20 text-[#2E5E2E] font-bold text-xs flex items-center justify-center">
                  03
                </span>
                <h2 className="font-playfair text-xl sm:text-2xl font-bold text-[#2E5E2E]">
                  Description of Services & Products
                </h2>
              </div>
              <div className="text-[#5A4A3A] text-sm sm:text-base leading-relaxed space-y-4">
                <p>
                  True Taste is engaged in the manufacturing, processing, packaging, and retail/distribution of pure Indian spices and seasonings. Our primary catalog comprises:
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 text-xs">
                  <div className="p-3 bg-[#FFF8EF] rounded-xl border border-[#7AA33E]/20">
                    <strong className="text-[#2E5E2E] block mb-1">Red Chilli Powder</strong>
                    Fine vibrant ground chillies with natural spice oils and intense aroma.
                  </div>
                  <div className="p-3 bg-[#FFF8EF] rounded-xl border border-[#7AA33E]/20">
                    <strong className="text-[#2E5E2E] block mb-1">Turmeric Powder</strong>
                    Naturally sourced golden turmeric with authentic earthy color.
                  </div>
                  <div className="p-3 bg-[#FFF8EF] rounded-xl border border-[#7AA33E]/20">
                    <strong className="text-[#2E5E2E] block mb-1">Dhaniya Powder</strong>
                    Aromatic coriander ground to preserve crisp citrus notes.
                  </div>
                  <div className="p-3 bg-[#FFF8EF] rounded-xl border border-[#7AA33E]/20">
                    <strong className="text-[#2E5E2E] block mb-1">Jeera Whole</strong>
                    Clean, fragrant whole cumin seeds sorted for consistent grain size.
                  </div>
                  <div className="p-3 bg-[#FFF8EF] rounded-xl border border-[#7AA33E]/20 sm:col-span-2 md:col-span-2">
                    <strong className="text-[#2E5E2E] block mb-1">Garam Masala Powder</strong>
                    Our signature master blend of warm roasted whole spices.
                  </div>
                </div>

                <p className="text-xs text-[#7a6b4e]">
                  Pack sizes typically include 50g, 100g, and 200g pouches. We strive to present accurate photographs and descriptions of our products. However, as agricultural crops vary by natural harvest and seasonal conditions, minor natural variations in spice shade, aroma intensity, and grain texture may occur.
                </p>
              </div>
            </article>

            {/* 4. User Responsibilities */}
            <article
              id="user-responsibilities"
              className="bg-[#FFFDF8] border border-[#7AA33E]/20 rounded-2xl p-6 sm:p-8 shadow-sm scroll-mt-28"
            >
              <div className="flex items-center gap-3 mb-4">
                <span className="w-8 h-8 rounded-full bg-[#7AA33E]/20 text-[#2E5E2E] font-bold text-xs flex items-center justify-center">
                  04
                </span>
                <h2 className="font-playfair text-xl sm:text-2xl font-bold text-[#2E5E2E]">
                  User Responsibilities
                </h2>
              </div>
              <div className="text-[#5A4A3A] text-sm sm:text-base leading-relaxed space-y-3">
                <p>When using our website and services, you agree to:</p>
                <ul className="space-y-2 list-disc list-inside">
                  <li>Provide accurate, current, and complete personal, shipping, and billing information.</li>
                  <li>Ensure your delivery address includes landmarks, correct pin codes, and an operational telephone number reachable by courier dispatchers.</li>
                  <li>Use the website strictly for lawful, personal, culinary, or legitimate commercial inquiry purposes.</li>
                  <li>Promptly notify us in the event of unauthorized access to your communications or suspected order anomalies.</li>
                </ul>
              </div>
            </article>

            {/* 5. Account Information */}
            <article
              id="account-information"
              className="bg-[#FFFDF8] border border-[#7AA33E]/20 rounded-2xl p-6 sm:p-8 shadow-sm scroll-mt-28"
            >
              <div className="flex items-center gap-3 mb-4">
                <span className="w-8 h-8 rounded-full bg-[#7AA33E]/20 text-[#2E5E2E] font-bold text-xs flex items-center justify-center">
                  05
                </span>
                <h2 className="font-playfair text-xl sm:text-2xl font-bold text-[#2E5E2E]">
                  Account Information, if Applicable
                </h2>
              </div>
              <div className="text-[#5A4A3A] text-sm sm:text-base leading-relaxed space-y-3">
                <p>
                  Where user profile creation or customer accounts are enabled on truetaste.in, you are solely responsible for maintaining the confidentiality of your account credentials, login passwords, and one-time passwords (OTPs).
                </p>
                <p>
                  You accept responsibility for all activities that occur under your account. True Taste shall not be liable for any losses caused by unauthorized use of your credentials where you failed to maintain their secrecy.
                </p>
              </div>
            </article>

            {/* 6. Pricing and Payments */}
            <article
              id="pricing-payments"
              className="bg-[#FFFDF8] border border-[#7AA33E]/20 rounded-2xl p-6 sm:p-8 shadow-sm scroll-mt-28"
            >
              <div className="flex items-center gap-3 mb-4">
                <span className="w-8 h-8 rounded-full bg-[#7AA33E]/20 text-[#2E5E2E] font-bold text-xs flex items-center justify-center">
                  06
                </span>
                <h2 className="font-playfair text-xl sm:text-2xl font-bold text-[#2E5E2E]">
                  Pricing and Payments
                </h2>
              </div>
              <div className="text-[#5A4A3A] text-sm sm:text-base leading-relaxed space-y-3">
                <p>
                  All prices displayed on the True Taste platform are quoted in <strong>Indian Rupees (INR)</strong> and are inclusive of applicable Goods and Services Tax (GST), unless expressly stated otherwise at checkout.
                </p>
                <ul className="space-y-2 list-disc list-inside">
                  <li><strong>Price Adjustments:</strong> True Taste reserves the right to revise spice prices, delivery fees, and minimum order values at any time without prior notice, owing to fluctuations in raw commodity markets.</li>
                  <li><strong>Pricing Inaccuracies:</strong> While we endeavor to ensure typographical accuracy, technical glitches may occasionally display an incorrect price. In such instances, True Taste reserves the right to cancel or rectify orders placed at the incorrect price, issuing an immediate refund for any amount already collected.</li>
                  <li><strong>Delivery Charges:</strong> Applicable shipping and delivery charges (if any) are displayed prior to order confirmation.</li>
                </ul>
              </div>
            </article>

            {/* 7. Payment Processing Through Third-Party Payment Gateways */}
            <article
              id="payment-processing"
              className="bg-[#FFFDF8] border border-[#7AA33E]/20 rounded-2xl p-6 sm:p-8 shadow-sm scroll-mt-28"
            >
              <div className="flex items-center gap-3 mb-4">
                <span className="w-8 h-8 rounded-full bg-[#7AA33E]/20 text-[#2E5E2E] font-bold text-xs flex items-center justify-center">
                  07
                </span>
                <h2 className="font-playfair text-xl sm:text-2xl font-bold text-[#2E5E2E]">
                  Payment Processing via Third-Party Payment Gateways
                </h2>
              </div>
              <div className="text-[#5A4A3A] text-sm sm:text-base leading-relaxed space-y-4">
                <p>
                  Online payments are processed through secure, authorized third-party payment gateways compliant with Reserve Bank of India (RBI) guidelines. Accepted payment modes include:
                </p>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-xs text-center font-semibold">
                  <div className="p-2.5 rounded-lg bg-[#FFF8EF] border border-[#7AA33E]/20">UPI / QR</div>
                  <div className="p-2.5 rounded-lg bg-[#FFF8EF] border border-[#7AA33E]/20">Debit Cards</div>
                  <div className="p-2.5 rounded-lg bg-[#FFF8EF] border border-[#7AA33E]/20">Credit Cards</div>
                  <div className="p-2.5 rounded-lg bg-[#FFF8EF] border border-[#7AA33E]/20">Net Banking</div>
                </div>
                <p>
                  By completing a payment, you authorize the payment gateway to debit your chosen instrument. True Taste is not responsible for transaction declines resulting from insufficient funds, expired cards, incorrect OTP entries, or downtime on the user&apos;s issuing bank network.
                </p>
              </div>
            </article>

            {/* 8. Service Availability */}
            <article
              id="service-availability"
              className="bg-[#FFFDF8] border border-[#7AA33E]/20 rounded-2xl p-6 sm:p-8 shadow-sm scroll-mt-28"
            >
              <div className="flex items-center gap-3 mb-4">
                <span className="w-8 h-8 rounded-full bg-[#7AA33E]/20 text-[#2E5E2E] font-bold text-xs flex items-center justify-center">
                  08
                </span>
                <h2 className="font-playfair text-xl sm:text-2xl font-bold text-[#2E5E2E]">
                  Service Availability & Stock
                </h2>
              </div>
              <div className="text-[#5A4A3A] text-sm sm:text-base leading-relaxed space-y-3">
                <p>
                  We strive to maintain continuous website availability and sufficient inventory for our five foundational spices. However, products are subject to availability and seasonal harvest batches.
                </p>
                <p>
                  We reserve the right to limit order quantities, modify product specifications, or discontinue products without liability. In the event an ordered spice is out of stock post-checkout, our team will contact you to offer an alternative batch or an immediate refund.
                </p>
              </div>
            </article>

            {/* 9. Intellectual Property */}
            <article
              id="intellectual-property"
              className="bg-[#FFFDF8] border border-[#7AA33E]/20 rounded-2xl p-6 sm:p-8 shadow-sm scroll-mt-28"
            >
              <div className="flex items-center gap-3 mb-4">
                <span className="w-8 h-8 rounded-full bg-[#7AA33E]/20 text-[#2E5E2E] font-bold text-xs flex items-center justify-center">
                  09
                </span>
                <h2 className="font-playfair text-xl sm:text-2xl font-bold text-[#2E5E2E]">
                  Intellectual Property
                </h2>
              </div>
              <div className="text-[#5A4A3A] text-sm sm:text-base leading-relaxed space-y-3">
                <p>
                  All content published on truetaste.in — including text, brand names (&quot;True Taste&quot;, &quot;Delhi Wally&quot;), trademarks, logos, spice descriptions, packaging designs, photographs, graphics, audio, digital downloads, and website code — is the exclusive property of True Taste or its licensors and is protected by Indian and international copyright, trademark, and trade dress laws.
                </p>
                <p>
                  You are granted a limited, revocable, non-exclusive license to access the website for personal use. You may not copy, reproduce, republish, sell, distribute, create derivative works from, or reverse-engineer any brand material without express written consent from True Taste.
                </p>
              </div>
            </article>

            {/* 10. Prohibited Use */}
            <article
              id="prohibited-use"
              className="bg-[#FFFDF8] border border-[#7AA33E]/20 rounded-2xl p-6 sm:p-8 shadow-sm scroll-mt-28"
            >
              <div className="flex items-center gap-3 mb-4">
                <span className="w-8 h-8 rounded-full bg-[#7AA33E]/20 text-[#2E5E2E] font-bold text-xs flex items-center justify-center">
                  10
                </span>
                <h2 className="font-playfair text-xl sm:text-2xl font-bold text-[#2E5E2E]">
                  Prohibited Use
                </h2>
              </div>
              <div className="text-[#5A4A3A] text-sm sm:text-base leading-relaxed space-y-3">
                <p>Users shall not engage in any of the following unauthorized activities:</p>
                <ul className="space-y-2 list-disc list-inside">
                  <li>Using scrapers, spiders, robots, or automated tools to extract spice product data, pricing, or locations.</li>
                  <li>Introducing software viruses, trojans, worms, or malicious scripts designed to disrupt server operations.</li>
                  <li>Attempting to bypass authentication mechanisms, probe system vulnerabilities, or breach network security.</li>
                  <li>Impersonating True Taste personnel, creating fake accounts, or engaging in fraudulent payment transactions.</li>
                  <li>Using our communication channels to transmit abusive, defamatory, or unlawful material.</li>
                </ul>
              </div>
            </article>

            {/* 11. User-Provided Information and Content */}
            <article
              id="user-content"
              className="bg-[#FFFDF8] border border-[#7AA33E]/20 rounded-2xl p-6 sm:p-8 shadow-sm scroll-mt-28"
            >
              <div className="flex items-center gap-3 mb-4">
                <span className="w-8 h-8 rounded-full bg-[#7AA33E]/20 text-[#2E5E2E] font-bold text-xs flex items-center justify-center">
                  11
                </span>
                <h2 className="font-playfair text-xl sm:text-2xl font-bold text-[#2E5E2E]">
                  User-Provided Information & Reviews
                </h2>
              </div>
              <div className="text-[#5A4A3A] text-sm sm:text-base leading-relaxed space-y-3">
                <p>
                  If you submit reviews, testimonials, recipe suggestions, culinary ideas, or comments (&quot;User Content&quot;) to True Taste, you grant us an irrevocable, perpetual, worldwide, royalty-free license to use, display, publish, reproduce, and adapt such content in our marketing and product materials.
                </p>
                <p>
                  You warrant that your submissions do not infringe any third-party intellectual property or privacy rights, and do not contain defamatory, profane, or unlawful content. True Taste reserves the right to moderate or remove inappropriate submissions.
                </p>
              </div>
            </article>

            {/* 12. Third-Party Links & Services */}
            <article
              id="third-party-links"
              className="bg-[#FFFDF8] border border-[#7AA33E]/20 rounded-2xl p-6 sm:p-8 shadow-sm scroll-mt-28"
            >
              <div className="flex items-center gap-3 mb-4">
                <span className="w-8 h-8 rounded-full bg-[#7AA33E]/20 text-[#2E5E2E] font-bold text-xs flex items-center justify-center">
                  12
                </span>
                <h2 className="font-playfair text-xl sm:text-2xl font-bold text-[#2E5E2E]">
                  Third-Party Links & External Services
                </h2>
              </div>
              <div className="text-[#5A4A3A] text-sm sm:text-base leading-relaxed space-y-3">
                <p>
                  The website may link to third-party services, courier tracking sites, or social media pages. True Taste does not control or endorse the content or practices of these external sites and accepts no liability for any loss or harm incurred from visiting them.
                </p>
              </div>
            </article>

            {/* 13. Limitation of Liability */}
            <article
              id="limitation-liability"
              className="bg-[#FFFDF8] border border-[#7AA33E]/20 rounded-2xl p-6 sm:p-8 shadow-sm scroll-mt-28"
            >
              <div className="flex items-center gap-3 mb-4">
                <span className="w-8 h-8 rounded-full bg-[#7AA33E]/20 text-[#2E5E2E] font-bold text-xs flex items-center justify-center">
                  13
                </span>
                <h2 className="font-playfair text-xl sm:text-2xl font-bold text-[#2E5E2E]">
                  Limitation of Liability
                </h2>
              </div>
              <div className="text-[#5A4A3A] text-sm sm:text-base leading-relaxed space-y-3">
                <p>
                  To the maximum extent permitted by applicable Indian law, True Taste, its proprietors, partners, employees, and suppliers shall not be liable for any indirect, incidental, punitive, special, or consequential damages arising out of:
                </p>
                <ul className="list-disc list-inside space-y-1 text-sm">
                  <li>The use or inability to use this website or order services.</li>
                  <li>Delays in courier transit caused by weather conditions, civil disturbances, strikes, or carrier constraints.</li>
                  <li>Any unauthorized access to servers or communications beyond our reasonable security measures.</li>
                </ul>
                <div className="p-3.5 bg-[#FFF8EF] rounded-xl border border-[#7AA33E]/25 text-xs text-[#2E5E2E] font-semibold">
                  In all events, the maximum cumulative liability of True Taste for any claims related to a purchase shall not exceed the actual purchase price paid by the customer for the specific product giving rise to the claim.
                </div>
              </div>
            </article>

            {/* 14. Disclaimer of Warranties */}
            <article
              id="disclaimer-warranties"
              className="bg-[#FFFDF8] border border-[#7AA33E]/20 rounded-2xl p-6 sm:p-8 shadow-sm scroll-mt-28"
            >
              <div className="flex items-center gap-3 mb-4">
                <span className="w-8 h-8 rounded-full bg-[#7AA33E]/20 text-[#2E5E2E] font-bold text-xs flex items-center justify-center">
                  14
                </span>
                <h2 className="font-playfair text-xl sm:text-2xl font-bold text-[#2E5E2E]">
                  Disclaimer of Warranties
                </h2>
              </div>
              <div className="text-[#5A4A3A] text-sm sm:text-base leading-relaxed space-y-3">
                <p>
                  Except as expressly provided herein or required under Indian food safety regulations, this website, our spices, and all related content are provided on an &quot;as is&quot; and &quot;as available&quot; basis.
                </p>
                <p>
                  True Taste makes no representations or warranties of any kind, express or implied, regarding website uptime, error-free operation, or that server communications are free of defects. Customers are advised to store spices in cool, dry, airtight containers upon receipt as instructed on the packaging.
                </p>
              </div>
            </article>

            {/* 15. Indemnification */}
            <article
              id="indemnification"
              className="bg-[#FFFDF8] border border-[#7AA33E]/20 rounded-2xl p-6 sm:p-8 shadow-sm scroll-mt-28"
            >
              <div className="flex items-center gap-3 mb-4">
                <span className="w-8 h-8 rounded-full bg-[#7AA33E]/20 text-[#2E5E2E] font-bold text-xs flex items-center justify-center">
                  15
                </span>
                <h2 className="font-playfair text-xl sm:text-2xl font-bold text-[#2E5E2E]">
                  Indemnification
                </h2>
              </div>
              <div className="text-[#5A4A3A] text-sm sm:text-base leading-relaxed space-y-3">
                <p>
                  You agree to defend, indemnify, and hold harmless True Taste, Delhi Wally, its founders, affiliates, employees, and agents from and against any claims, liabilities, damages, losses, and legal costs arising from:
                </p>
                <ul className="list-disc list-inside space-y-1 text-sm">
                  <li>Your breach of any provision of these Terms & Conditions.</li>
                  <li>Your violation of any applicable law, rule, or third-party rights.</li>
                  <li>Any fraudulent activity or intentional misuse committed using your account or payment instruments.</li>
                </ul>
              </div>
            </article>

            {/* 16. Suspension and Termination */}
            <article
              id="suspension-termination"
              className="bg-[#FFFDF8] border border-[#7AA33E]/20 rounded-2xl p-6 sm:p-8 shadow-sm scroll-mt-28"
            >
              <div className="flex items-center gap-3 mb-4">
                <span className="w-8 h-8 rounded-full bg-[#7AA33E]/20 text-[#2E5E2E] font-bold text-xs flex items-center justify-center">
                  16
                </span>
                <h2 className="font-playfair text-xl sm:text-2xl font-bold text-[#2E5E2E]">
                  Suspension and Termination
                </h2>
              </div>
              <div className="text-[#5A4A3A] text-sm sm:text-base leading-relaxed space-y-3">
                <p>
                  True Taste reserves the right, in its sole discretion and without prior notice, to suspend or terminate your access to the website or cancel pending unfulfilled orders if we reasonably suspect:
                </p>
                <ul className="list-disc list-inside space-y-1 text-sm">
                  <li>A breach of these Terms or related policies.</li>
                  <li>Fraudulent, abusive, or unauthorized payment activity.</li>
                  <li>Actions that compromise our digital infrastructure or the safety of other users.</li>
                </ul>
                <p>
                  All provisions of these Terms which by their nature should survive termination shall remain in effect.
                </p>
              </div>
            </article>

            {/* 17. Changes to Services and Terms */}
            <article
              id="changes-to-terms"
              className="bg-[#FFFDF8] border border-[#7AA33E]/20 rounded-2xl p-6 sm:p-8 shadow-sm scroll-mt-28"
            >
              <div className="flex items-center gap-3 mb-4">
                <span className="w-8 h-8 rounded-full bg-[#7AA33E]/20 text-[#2E5E2E] font-bold text-xs flex items-center justify-center">
                  17
                </span>
                <h2 className="font-playfair text-xl sm:text-2xl font-bold text-[#2E5E2E]">
                  Changes to Services and Terms
                </h2>
              </div>
              <div className="text-[#5A4A3A] text-sm sm:text-base leading-relaxed space-y-3">
                <p>
                  We reserve the right to amend, update, or replace any part of these Terms at our sole discretion. Any revision will be posted directly to this URL with a revised &quot;Last Revised&quot; date.
                </p>
                <p>
                  Your continued use of truetaste.in following the posting of modifications indicates your acknowledgement and binding acceptance of the updated Terms.
                </p>
              </div>
            </article>

            {/* 18. Governing Law and Jurisdiction */}
            <article
              id="governing-law"
              className="bg-[#FFFDF8] border border-[#7AA33E]/20 rounded-2xl p-6 sm:p-8 shadow-sm scroll-mt-28"
            >
              <div className="flex items-center gap-3 mb-4">
                <span className="w-8 h-8 rounded-full bg-[#7AA33E]/20 text-[#2E5E2E] font-bold text-xs flex items-center justify-center">
                  18
                </span>
                <h2 className="font-playfair text-xl sm:text-2xl font-bold text-[#2E5E2E]">
                  Governing Law & Jurisdiction
                </h2>
              </div>
              <div className="text-[#5A4A3A] text-sm sm:text-base leading-relaxed space-y-3">
                <p>
                  These Terms & Conditions, and all claims or disputes arising out of or related to your use of truetaste.in or spice purchases, shall be governed by and construed in accordance with the <strong>laws of the Republic of India</strong>, without regard to conflict of law principles.
                </p>
                <p>
                  Subject to mediation, the courts of competent jurisdiction located in <strong>New Delhi, India</strong> shall have exclusive jurisdiction over any disputes, legal suits, or proceedings arising out of or in connection with these Terms.
                </p>
              </div>
            </article>

            {/* 19. Contact Information */}
            <article
              id="contact-terms"
              className="bg-[#FFFDF8] border-2 border-[#7AA33E]/30 rounded-2xl p-6 sm:p-8 shadow-md scroll-mt-28"
            >
              <div className="flex items-center gap-3 mb-4">
                <span className="w-8 h-8 rounded-full bg-[#2E5E2E] text-[#FFF8EF] font-bold text-xs flex items-center justify-center">
                  19
                </span>
                <h2 className="font-playfair text-xl sm:text-2xl font-bold text-[#2E5E2E]">
                  Contact Information
                </h2>
              </div>
              <div className="text-[#5A4A3A] text-sm sm:text-base leading-relaxed space-y-4">
                <p>
                  For questions concerning these Terms & Conditions, partnership opportunities, or commercial spice distribution inquiries, please reach out to:
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
                      <span className="text-xs uppercase tracking-wider text-[#7a6b4e] block font-bold">Call / Support</span>
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
                      <span className="text-xs uppercase tracking-wider text-[#7a6b4e] block font-bold">Registered Office</span>
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
                    Working Hours: Monday to Saturday, 9:00 AM – 7:00 PM IST
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
