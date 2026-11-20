'use client';

import { useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import {
  ShieldCheck,
  Lock,
  Eye,
  FileText,
  UserCheck,
  CreditCard,
  Database,
  Share2,
  Cookie,
  ExternalLink,
  Baby,
  RefreshCw,
  Mail,
  Phone,
  MapPin,
  CheckCircle2,
  ChevronRight,
} from 'lucide-react';

const sections = [
  { id: 'introduction', label: '1. Introduction & Scope', icon: FileText },
  { id: 'information-we-collect', label: '2. Information We Collect', icon: Database },
  { id: 'collection-methods', label: '3. How Information is Collected', icon: Eye },
  { id: 'how-we-use-information', label: '4. How We Use Information', icon: CheckCircle2 },
  { id: 'payment-processing', label: '5. Payments & Gateways', icon: CreditCard },
  { id: 'data-security', label: '6. Data Security Measures', icon: Lock },
  { id: 'storage-retention', label: '7. Data Storage & Retention', icon: ShieldCheck },
  { id: 'sharing-disclosure', label: '8. Sharing & Disclosure', icon: Share2 },
  { id: 'cookies', label: '9. Cookies & Tracking', icon: Cookie },
  { id: 'third-party-services', label: '10. Third-Party Services', icon: ExternalLink },
  { id: 'user-rights', label: '11. Your Rights & Choices', icon: UserCheck },
  { id: 'children-privacy', label: '12. Children’s Privacy', icon: Baby },
  { id: 'policy-changes', label: '13. Policy Updates', icon: RefreshCw },
  { id: 'contact-us', label: '14. Contact Information', icon: Mail },
];

export default function PrivacyPolicyClient() {
  const [activeSection, setActiveSection] = useState('introduction');

  return (
    <div className="bg-[#FFF8EF] min-h-screen text-[#2E5E2E]">
      {/* ===========================
          PAGE HERO
          =========================== */}
      <section
        className="relative pt-36 pb-16 sm:pt-40 sm:pb-20 overflow-hidden"
        style={{ background: '#FFF8EF' }}
        aria-labelledby="privacy-heading"
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
            <span className="text-[#2E5E2E] font-medium">Privacy Policy</span>
          </nav>

          <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
            <div className="eyebrow justify-center mb-4">Legal & Transparency</div>
          </motion.div>

          <motion.h1
            className="text-display text-[#2E5E2E] mb-4"
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            id="privacy-heading"
          >
            Privacy{' '}
            <em className="italic" style={{ color: '#5A2E0D' }}>
              Policy.
            </em>
          </motion.h1>

          <motion.p
            className="font-lato text-[#7a6b4e] text-base sm:text-lg max-w-2xl mx-auto leading-relaxed mb-6"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            At Delhi Wally, we value your trust. This Privacy Policy details how we handle, collect,
            use, and protect your personal information with clarity and care.
          </motion.p>

          <motion.div
            className="inline-flex flex-wrap items-center justify-center gap-3 text-xs font-lato text-[#5A4A3A] bg-[#FFFDF8] border border-[#7AA33E]/25 rounded-full px-5 py-2"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
          >
            <span>Effective Date: <strong>January 1, 2026</strong></span>
            <span className="text-[#7AA33E]">✦</span>
            <span>Last Updated: <strong>March 2026</strong></span>
            <span className="text-[#7AA33E]">✦</span>
            <span>Applicable to: <strong>truetaste.in</strong></span>
          </motion.div>
        </div>
      </section>

      {/* ===========================
          KEY PRIVACY PROMISES
          =========================== */}
      <section className="max-w-7xl mx-auto px-6 mb-12" aria-label="Privacy Highlights">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="bg-[#FFFDF8] border border-[#7AA33E]/20 rounded-2xl p-5 shadow-sm flex items-start gap-4">
            <div className="w-10 h-10 rounded-xl bg-[#7AA33E]/15 flex items-center justify-center flex-shrink-0 text-[#2E5E2E]">
              <Lock className="w-5 h-5 text-[#2E5E2E]" />
            </div>
            <div>
              <h3 className="font-playfair font-bold text-sm text-[#2E5E2E] mb-1">Payment Privacy</h3>
              <p className="font-lato text-xs text-[#7a6b4e] leading-relaxed">
                We never store CVVs, PINs, or banking passwords. Gateways process transactions directly.
              </p>
            </div>
          </div>

          <div className="bg-[#FFFDF8] border border-[#7AA33E]/20 rounded-2xl p-5 shadow-sm flex items-start gap-4">
            <div className="w-10 h-10 rounded-xl bg-[#7AA33E]/15 flex items-center justify-center flex-shrink-0 text-[#2E5E2E]">
              <Share2 className="w-5 h-5 text-[#2E5E2E]" />
            </div>
            <div>
              <h3 className="font-playfair font-bold text-sm text-[#2E5E2E] mb-1">Zero Data Selling</h3>
              <p className="font-lato text-xs text-[#7a6b4e] leading-relaxed">
                Your personal details are never sold, rented, or traded to third-party advertisers.
              </p>
            </div>
          </div>

          <div className="bg-[#FFFDF8] border border-[#7AA33E]/20 rounded-2xl p-5 shadow-sm flex items-start gap-4">
            <div className="w-10 h-10 rounded-xl bg-[#7AA33E]/15 flex items-center justify-center flex-shrink-0 text-[#2E5E2E]">
              <ShieldCheck className="w-5 h-5 text-[#2E5E2E]" />
            </div>
            <div>
              <h3 className="font-playfair font-bold text-sm text-[#2E5E2E] mb-1">Legitimate Use</h3>
              <p className="font-lato text-xs text-[#7a6b4e] leading-relaxed">
                Data is collected strictly to deliver spices, service inquiries, and fulfill orders.
              </p>
            </div>
          </div>

          <div className="bg-[#FFFDF8] border border-[#7AA33E]/20 rounded-2xl p-5 shadow-sm flex items-start gap-4">
            <div className="w-10 h-10 rounded-xl bg-[#7AA33E]/15 flex items-center justify-center flex-shrink-0 text-[#2E5E2E]">
              <UserCheck className="w-5 h-5 text-[#2E5E2E]" />
            </div>
            <div>
              <h3 className="font-playfair font-bold text-sm text-[#2E5E2E] mb-1">User Control</h3>
              <p className="font-lato text-xs text-[#7a6b4e] leading-relaxed">
                You retain the right to review, rectify, or request deletion of your contact data.
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
            <div className="sticky top-28 bg-[#FFFDF8] border border-[#7AA33E]/20 rounded-2xl p-5 shadow-sm">
              <h2 className="font-playfair font-bold text-sm text-[#2E5E2E] uppercase tracking-wider mb-4 pb-2 border-b border-[#7AA33E]/15">
                Table of Contents
              </h2>
              <nav className="space-y-1.5" aria-label="Policy sections">
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
                  Have a specific privacy inquiry or need clarification?
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
            {/* 1. Introduction and Scope */}
            <article
              id="introduction"
              className="bg-[#FFFDF8] border border-[#7AA33E]/20 rounded-2xl p-6 sm:p-8 shadow-sm scroll-mt-28"
            >
              <div className="flex items-center gap-3 mb-4">
                <span className="w-8 h-8 rounded-full bg-[#7AA33E]/20 text-[#2E5E2E] font-bold text-xs flex items-center justify-center">
                  01
                </span>
                <h2 className="font-playfair text-xl sm:text-2xl font-bold text-[#2E5E2E]">
                  Introduction and Scope
                </h2>
              </div>
              <div className="text-[#5A4A3A] text-sm sm:text-base leading-relaxed space-y-3">
                <p>
                  This Privacy Policy applies to <strong>Delhi Wally</strong> (based at New Delhi, India) and governs the collection, use, retention, disclosure, and protection of information obtained through our official website located at{' '}
                  <Link href="/" className="text-[#2E5E2E] font-medium underline underline-offset-2">
                    https://truetaste.in
                  </Link>
                  , as well as associated customer communication channels.
                </p>
                <p>
                  By accessing, browsing, interacting with, or purchasing spices through this website, you acknowledge that you have read, understood, and agreed to the practices described in this Privacy Policy. If you do not agree with any aspect of this policy, please discontinue the use of our services.
                </p>
                <p>
                  Our operations are rooted in India and comply with the applicable Information Technology laws and rules of India. This policy applies uniformly to all consumers, retail buyers, trade partners, and visitors.
                </p>
              </div>
            </article>

            {/* 2. Information We Collect */}
            <article
              id="information-we-collect"
              className="bg-[#FFFDF8] border border-[#7AA33E]/20 rounded-2xl p-6 sm:p-8 shadow-sm scroll-mt-28"
            >
              <div className="flex items-center gap-3 mb-4">
                <span className="w-8 h-8 rounded-full bg-[#7AA33E]/20 text-[#2E5E2E] font-bold text-xs flex items-center justify-center">
                  02
                </span>
                <h2 className="font-playfair text-xl sm:text-2xl font-bold text-[#2E5E2E]">
                  Information We Collect
                </h2>
              </div>
              <div className="text-[#5A4A3A] text-sm sm:text-base leading-relaxed space-y-4">
                <p>
                  We collect information necessary to provide you with seamless service, process your spice orders, respond to culinary or trade queries, and enhance your digital experience on our platform.
                </p>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 my-2">
                  <div className="p-4 rounded-xl bg-[#FFF8EF] border border-[#7AA33E]/15">
                    <h3 className="font-playfair font-bold text-sm text-[#2E5E2E] mb-2 flex items-center gap-2">
                      <span className="text-[#7AA33E]">✦</span> Personal & Contact Information
                    </h3>
                    <ul className="text-xs text-[#5A4A3A] space-y-1.5 list-disc list-inside">
                      <li>Full Legal Name</li>
                      <li>Contact Phone / Mobile Number</li>
                      <li>Email Address</li>
                      <li>Shipping & Postal Delivery Address</li>
                      <li>Billing Address & Pin Code</li>
                      <li>Order communication history and notes</li>
                    </ul>
                  </div>

                  <div className="p-4 rounded-xl bg-[#FFF8EF] border border-[#7AA33E]/15">
                    <h3 className="font-playfair font-bold text-sm text-[#2E5E2E] mb-2 flex items-center gap-2">
                      <span className="text-[#7AA33E]">✦</span> Device & Technical Usage Data
                    </h3>
                    <ul className="text-xs text-[#5A4A3A] space-y-1.5 list-disc list-inside">
                      <li>Internet Protocol (IP) Address</li>
                      <li>Browser Type and Version</li>
                      <li>Operating System & Screen Resolution</li>
                      <li>Pages visited, time spent, and scroll activity</li>
                      <li>Referring website URL or search query</li>
                      <li>Network carrier information</li>
                    </ul>
                  </div>
                </div>

                <p className="text-xs text-[#7a6b4e] italic">
                  Note: We do not collect sensitive personal data such as biometric identifiers, physical health records, political beliefs, or religious affiliations.
                </p>
              </div>
            </article>

            {/* 3. How Information is Collected */}
            <article
              id="collection-methods"
              className="bg-[#FFFDF8] border border-[#7AA33E]/20 rounded-2xl p-6 sm:p-8 shadow-sm scroll-mt-28"
            >
              <div className="flex items-center gap-3 mb-4">
                <span className="w-8 h-8 rounded-full bg-[#7AA33E]/20 text-[#2E5E2E] font-bold text-xs flex items-center justify-center">
                  03
                </span>
                <h2 className="font-playfair text-xl sm:text-2xl font-bold text-[#2E5E2E]">
                  How Information is Collected
                </h2>
              </div>
              <div className="text-[#5A4A3A] text-sm sm:text-base leading-relaxed space-y-3">
                <p>We gather data through three primary avenues:</p>
                <div className="space-y-3">
                  <div className="flex items-start gap-3">
                    <span className="w-2 h-2 rounded-full bg-[#7AA33E] mt-2 flex-shrink-0" />
                    <div>
                      <strong className="text-[#2E5E2E]">Direct Interactions:</strong> Information provided voluntarily when you fill out contact forms, submit wholesale spice requests, register for notifications, call our customer care numbers (+91 8810303231 / +91 9716567548), or write to us at delhiwally@gmail.com.
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <span className="w-2 h-2 rounded-full bg-[#7AA33E] mt-2 flex-shrink-0" />
                    <div>
                      <strong className="text-[#2E5E2E]">Automated Technologies:</strong> As you navigate through truetaste.in, server log files and analytics scripts record technical telemetry such as visit duration, error diagnostics, and referring web traffic.
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <span className="w-2 h-2 rounded-full bg-[#7AA33E] mt-2 flex-shrink-0" />
                    <div>
                      <strong className="text-[#2E5E2E]">Third-Party Logistics & Gateways:</strong> Information received back from payment gateways (transaction authorization status) and courier shipping partners (dispatch timestamps and delivery status notifications).
                    </div>
                  </div>
                </div>
              </div>
            </article>

            {/* 4. How We Use Collected Information */}
            <article
              id="how-we-use-information"
              className="bg-[#FFFDF8] border border-[#7AA33E]/20 rounded-2xl p-6 sm:p-8 shadow-sm scroll-mt-28"
            >
              <div className="flex items-center gap-3 mb-4">
                <span className="w-8 h-8 rounded-full bg-[#7AA33E]/20 text-[#2E5E2E] font-bold text-xs flex items-center justify-center">
                  04
                </span>
                <h2 className="font-playfair text-xl sm:text-2xl font-bold text-[#2E5E2E]">
                  How We Use Collected Information
                </h2>
              </div>
              <div className="text-[#5A4A3A] text-sm sm:text-base leading-relaxed space-y-3">
                <p>We process your data strictly for legitimate operational purposes:</p>
                <ul className="space-y-2.5">
                  <li className="flex items-start gap-2.5">
                    <CheckCircle2 className="w-4 h-4 text-[#7AA33E] mt-1 flex-shrink-0" />
                    <span><strong>Order Fulfillment & Delivery:</strong> Packing, labeling, and shipping your chosen spices (Red Chilli, Turmeric, Dhaniya, Jeera, Garam Masala) to your doorstep.</span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <CheckCircle2 className="w-4 h-4 text-[#7AA33E] mt-1 flex-shrink-0" />
                    <span><strong>Customer Support & Inquiries:</strong> Answering questions about spice origins, packaging dates, usage recipes, or commercial orders.</span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <CheckCircle2 className="w-4 h-4 text-[#7AA33E] mt-1 flex-shrink-0" />
                    <span><strong>Transactional Communications:</strong> Sending order confirmations, dispatch updates, airway bill numbers, and tax invoices.</span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <CheckCircle2 className="w-4 h-4 text-[#7AA33E] mt-1 flex-shrink-0" />
                    <span><strong>Service Optimization:</strong> Reviewing website performance, identifying broken navigation, and optimizing page load speeds across devices.</span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <CheckCircle2 className="w-4 h-4 text-[#7AA33E] mt-1 flex-shrink-0" />
                    <span><strong>Legal & Regulatory Compliance:</strong> Maintaining accounting ledgers, sales tax records (GST), and regulatory filings as required under Indian commercial statutes.</span>
                  </li>
                </ul>
              </div>
            </article>

            {/* 5. Payment and Transaction Information */}
            <article
              id="payment-processing"
              className="bg-[#FFFDF8] border border-[#7AA33E]/20 rounded-2xl p-6 sm:p-8 shadow-sm scroll-mt-28"
            >
              <div className="flex items-center gap-3 mb-4">
                <span className="w-8 h-8 rounded-full bg-[#7AA33E]/20 text-[#2E5E2E] font-bold text-xs flex items-center justify-center">
                  05
                </span>
                <h2 className="font-playfair text-xl sm:text-2xl font-bold text-[#2E5E2E]">
                  Payment and Transaction Information
                </h2>
              </div>
              <div className="text-[#5A4A3A] text-sm sm:text-base leading-relaxed space-y-4">
                <p>
                  Delhi Wally offers seamless online payments through licensed third-party payment aggregator gateways.
                </p>

                <div className="p-4 rounded-xl bg-[#7AA33E]/10 border-l-4 border-[#2E5E2E]">
                  <h4 className="font-playfair font-bold text-sm text-[#2E5E2E] mb-1">
                    Strict Cardholder & Banking Data Protection
                  </h4>
                  <p className="text-xs text-[#5A4A3A] leading-relaxed">
                    Delhi Wally does <strong>NOT</strong> collect, view, process, or store sensitive financial credentials — including Credit/Debit card numbers, CVV codes, Expiry dates, Net Banking login passwords, or UPI PINs. All financial transactions take place inside the encrypted, compliant infrastructure of authorized Indian payment gateways.
                  </p>
                </div>

                <p>
                  Delhi Wally only receives non-sensitive transaction confirmation metadata, consisting of:
                </p>
                <ul className="text-xs sm:text-sm list-disc list-inside space-y-1 text-[#5A4A3A]">
                  <li>Payment status (e.g., Success, Pending, Failed)</li>
                  <li>Payment Gateway Transaction Reference ID</li>
                  <li>Order gross total and currency (INR)</li>
                  <li>Payment channel type used (e.g., UPI, Net Banking, Card, Wallet)</li>
                </ul>
              </div>
            </article>

            {/* 6. Data Security and Reasonable Security Measures */}
            <article
              id="data-security"
              className="bg-[#FFFDF8] border border-[#7AA33E]/20 rounded-2xl p-6 sm:p-8 shadow-sm scroll-mt-28"
            >
              <div className="flex items-center gap-3 mb-4">
                <span className="w-8 h-8 rounded-full bg-[#7AA33E]/20 text-[#2E5E2E] font-bold text-xs flex items-center justify-center">
                  06
                </span>
                <h2 className="font-playfair text-xl sm:text-2xl font-bold text-[#2E5E2E]">
                  Data Security & Reasonable Security Measures
                </h2>
              </div>
              <div className="text-[#5A4A3A] text-sm sm:text-base leading-relaxed space-y-3">
                <p>
                  We have implemented reasonable technical, physical, and managerial security practices appropriate to the nature of the information we handle. These measures aim to safeguard your personal details against unauthorized access, alteration, disclosure, or accidental destruction.
                </p>
                <ul className="space-y-2 list-disc list-inside text-sm">
                  <li><strong>Encrypted Data Transmission:</strong> All web traffic on truetaste.in is encrypted using Transport Layer Security (HTTPS/TLS).</li>
                  <li><strong>Restricted Administrative Access:</strong> Access to customer records is strictly limited to authorized personnel who require the data to fulfill orders or provide customer support.</li>
                  <li><strong>Network Protections:</strong> Our hosting systems utilize firewalls, access controls, and regular software security patches.</li>
                </ul>
                <p className="text-xs text-[#7a6b4e] mt-2">
                  While we take prudent and reasonable precautions, no method of digital transmission over the internet or method of electronic storage is infallible. We cannot warrant absolute invulnerability against sophisticated external cyber incidents.
                </p>
              </div>
            </article>

            {/* 7. Data Storage and Retention */}
            <article
              id="storage-retention"
              className="bg-[#FFFDF8] border border-[#7AA33E]/20 rounded-2xl p-6 sm:p-8 shadow-sm scroll-mt-28"
            >
              <div className="flex items-center gap-3 mb-4">
                <span className="w-8 h-8 rounded-full bg-[#7AA33E]/20 text-[#2E5E2E] font-bold text-xs flex items-center justify-center">
                  07
                </span>
                <h2 className="font-playfair text-xl sm:text-2xl font-bold text-[#2E5E2E]">
                  Data Storage and Retention
                </h2>
              </div>
              <div className="text-[#5A4A3A] text-sm sm:text-base leading-relaxed space-y-3">
                <p>
                  Your information is stored securely on servers located in compliance with applicable Indian data retention standards.
                </p>
                <p>
                  We retain personal information only for the duration required to fulfill the purposes for which it was gathered, including:
                </p>
                <ul className="list-disc list-inside text-sm space-y-1.5">
                  <li>Satisfying legal, accounting, tax, or reporting requirements under Indian laws.</li>
                  <li>Resolving customer disputes and enforcing our agreements.</li>
                  <li>Facilitating warranty, replacement, or refund claims within applicable policy windows.</li>
                </ul>
                <p>
                  When personal data is no longer necessary for operational or legal mandates, it is securely deleted, purged, or anonymized.
                </p>
              </div>
            </article>

            {/* 8. Sharing and Disclosure of Information */}
            <article
              id="sharing-disclosure"
              className="bg-[#FFFDF8] border border-[#7AA33E]/20 rounded-2xl p-6 sm:p-8 shadow-sm scroll-mt-28"
            >
              <div className="flex items-center gap-3 mb-4">
                <span className="w-8 h-8 rounded-full bg-[#7AA33E]/20 text-[#2E5E2E] font-bold text-xs flex items-center justify-center">
                  08
                </span>
                <h2 className="font-playfair text-xl sm:text-2xl font-bold text-[#2E5E2E]">
                  Sharing and Disclosure of Information
                </h2>
              </div>
              <div className="text-[#5A4A3A] text-sm sm:text-base leading-relaxed space-y-3">
                <p>
                  Delhi Wally treats your personal details with the utmost respect. We share data solely under the following limited circumstances:
                </p>
                <ul className="space-y-2 list-disc list-inside text-sm">
                  <li><strong>Logistics & Courier Partners:</strong> We share your recipient name, delivery address, and phone number with third-party courier and postal companies exclusively to deliver spice consignments to your address.</li>
                  <li><strong>Payment Processors:</strong> We communicate transaction values and identifiers to accredited payment gateway partners for billing authorization.</li>
                  <li><strong>Compliance with Legal Obligations:</strong> We may disclose information if required to do so by a valid court order, governmental notice, regulatory directive, or under Indian statutory provisions.</li>
                  <li><strong>Protection of Rights:</strong> Where necessary to investigate fraud, enforce our Terms & Conditions, or protect the safety and property of Delhi Wally, our customers, or the public.</li>
                </ul>
                <div className="p-3.5 bg-[#FFF8EF] rounded-xl border border-[#7AA33E]/20 text-xs font-semibold text-[#2E5E2E]">
                  Delhi Wally never sells, rents, monetizes, or distributes your contact details to third-party telemarketers or external advertising networks.
                </div>
              </div>
            </article>

            {/* 9. Cookies and Similar Technologies */}
            <article
              id="cookies"
              className="bg-[#FFFDF8] border border-[#7AA33E]/20 rounded-2xl p-6 sm:p-8 shadow-sm scroll-mt-28"
            >
              <div className="flex items-center gap-3 mb-4">
                <span className="w-8 h-8 rounded-full bg-[#7AA33E]/20 text-[#2E5E2E] font-bold text-xs flex items-center justify-center">
                  09
                </span>
                <h2 className="font-playfair text-xl sm:text-2xl font-bold text-[#2E5E2E]">
                  Cookies and Similar Technologies
                </h2>
              </div>
              <div className="text-[#5A4A3A] text-sm sm:text-base leading-relaxed space-y-3">
                <p>
                  Cookies are small text files placed on your device by websites you visit. truetaste.in uses cookies to provide essential functionality:
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                  <div className="p-3 rounded-lg bg-[#FFF8EF] border border-[#7AA33E]/15">
                    <strong className="block text-[#2E5E2E] mb-1">Essential Cookies</strong>
                    Required for basic site navigation, remembering selections, and maintaining secure sessions.
                  </div>
                  <div className="p-3 rounded-lg bg-[#FFF8EF] border border-[#7AA33E]/15">
                    <strong className="block text-[#2E5E2E] mb-1">Performance & Analytics</strong>
                    Helps us understand aggregated visitor traffic counts and page popularities without identifying individuals.
                  </div>
                </div>
                <p className="text-sm">
                  You can choose to disable or block cookies through your individual web browser settings. Please note that blocking essential cookies may affect the proper display or functioning of certain interactive features.
                </p>
              </div>
            </article>

            {/* 10. Third-Party Services */}
            <article
              id="third-party-services"
              className="bg-[#FFFDF8] border border-[#7AA33E]/20 rounded-2xl p-6 sm:p-8 shadow-sm scroll-mt-28"
            >
              <div className="flex items-center gap-3 mb-4">
                <span className="w-8 h-8 rounded-full bg-[#7AA33E]/20 text-[#2E5E2E] font-bold text-xs flex items-center justify-center">
                  10
                </span>
                <h2 className="font-playfair text-xl sm:text-2xl font-bold text-[#2E5E2E]">
                  Third-Party Services & Links
                </h2>
              </div>
              <div className="text-[#5A4A3A] text-sm sm:text-base leading-relaxed space-y-3">
                <p>
                  Our website may contain hyperlinks to external sites, delivery tracking portals, or payment services operated by independent entities. Once you leave our domain, Delhi Wally is not responsible for the privacy policies, data collection procedures, or content of those external sites. We encourage you to review their respective privacy notices.
                </p>
              </div>
            </article>

            {/* 11. User Rights and Choices */}
            <article
              id="user-rights"
              className="bg-[#FFFDF8] border border-[#7AA33E]/20 rounded-2xl p-6 sm:p-8 shadow-sm scroll-mt-28"
            >
              <div className="flex items-center gap-3 mb-4">
                <span className="w-8 h-8 rounded-full bg-[#7AA33E]/20 text-[#2E5E2E] font-bold text-xs flex items-center justify-center">
                  11
                </span>
                <h2 className="font-playfair text-xl sm:text-2xl font-bold text-[#2E5E2E]">
                  Your Rights and Choices
                </h2>
              </div>
              <div className="text-[#5A4A3A] text-sm sm:text-base leading-relaxed space-y-3">
                <p>
                  Under Indian consumer and data standards, you possess reasonable rights regarding your personal information:
                </p>
                <ul className="space-y-2 text-sm list-disc list-inside">
                  <li><strong>Right to Access:</strong> You can request a summary of personal information we hold about you.</li>
                  <li><strong>Right to Rectification:</strong> If your shipping address, contact phone, or name is inaccurate, you may contact us to update it.</li>
                  <li><strong>Right to Erasure / Deletion:</strong> You may request the deletion of your contact data from our active customer lists, provided there is no outstanding legal or tax obligation requiring retention.</li>
                  <li><strong>Opt-Out of Marketing:</strong> You can opt out of any non-transactional emails or communications at any time.</li>
                </ul>
                <p className="text-xs text-[#7a6b4e]">
                  To exercise any of these rights, simply email us at{' '}
                  <a href="mailto:delhiwally@gmail.com" className="underline font-bold text-[#2E5E2E]">
                    delhiwally@gmail.com
                  </a>{' '}
                  with your full name and registered phone number.
                </p>
              </div>
            </article>

            {/* 12. Children's Privacy */}
            <article
              id="children-privacy"
              className="bg-[#FFFDF8] border border-[#7AA33E]/20 rounded-2xl p-6 sm:p-8 shadow-sm scroll-mt-28"
            >
              <div className="flex items-center gap-3 mb-4">
                <span className="w-8 h-8 rounded-full bg-[#7AA33E]/20 text-[#2E5E2E] font-bold text-xs flex items-center justify-center">
                  12
                </span>
                <h2 className="font-playfair text-xl sm:text-2xl font-bold text-[#2E5E2E]">
                  Children’s Privacy
                </h2>
              </div>
              <div className="text-[#5A4A3A] text-sm sm:text-base leading-relaxed space-y-3">
                <p>
                  Delhi Wally manufactures and retails culinary spices intended for general household and commercial use. Our website is designed for individuals of legal age (at least 18 years of age or accessing under the supervision of a parent/guardian).
                </p>
                <p>
                  We do not knowingly solicit or collect personal information from minors under the age of 18. If a parent or guardian discovers that a child has provided us with personal information without consent, please contact us immediately, and we will take prompt steps to purge that record from our systems.
                </p>
              </div>
            </article>

            {/* 13. Changes to the Privacy Policy */}
            <article
              id="policy-changes"
              className="bg-[#FFFDF8] border border-[#7AA33E]/20 rounded-2xl p-6 sm:p-8 shadow-sm scroll-mt-28"
            >
              <div className="flex items-center gap-3 mb-4">
                <span className="w-8 h-8 rounded-full bg-[#7AA33E]/20 text-[#2E5E2E] font-bold text-xs flex items-center justify-center">
                  13
                </span>
                <h2 className="font-playfair text-xl sm:text-2xl font-bold text-[#2E5E2E]">
                  Changes to this Privacy Policy
                </h2>
              </div>
              <div className="text-[#5A4A3A] text-sm sm:text-base leading-relaxed space-y-3">
                <p>
                  Delhi Wally reserves the right to review and amend this Privacy Policy periodically to reflect changes in our spice operations, technology, or relevant legal enactments.
                </p>
                <p>
                  Whenever changes are made, the revised policy will be posted on this page with an updated &quot;Last Updated&quot; date at the top. We encourage visitors and patrons to review this page periodically to remain informed about how we protect their privacy.
                </p>
              </div>
            </article>

            {/* 14. Contact Information */}
            <article
              id="contact-us"
              className="bg-[#FFFDF8] border-2 border-[#7AA33E]/30 rounded-2xl p-6 sm:p-8 shadow-md scroll-mt-28"
            >
              <div className="flex items-center gap-3 mb-4">
                <span className="w-8 h-8 rounded-full bg-[#2E5E2E] text-[#FFF8EF] font-bold text-xs flex items-center justify-center">
                  14
                </span>
                <h2 className="font-playfair text-xl sm:text-2xl font-bold text-[#2E5E2E]">
                  Contact Information for Privacy Queries
                </h2>
              </div>
              <div className="text-[#5A4A3A] text-sm sm:text-base leading-relaxed space-y-4">
                <p>
                  If you have questions, grievances, or requests concerning this Privacy Policy, your personal information, or our data handling practices, please connect with us through our official channels:
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
                      <span className="text-xs uppercase tracking-wider text-[#7a6b4e] block font-bold">Call / WhatsApp</span>
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
                      <span className="text-xs uppercase tracking-wider text-[#7a6b4e] block font-bold">Postal Address</span>
                      <address className="not-italic text-sm text-[#2E5E2E]">
                        <strong>Delhi Wally</strong><br />
                        E-429 New Ashok Nagar, Delhi – 110096, India<br />
                        <span className="text-xs text-[#7a6b4e]">FSSAI Lic. No. 23326003003695</span>
                      </address>
                    </div>
                  </div>
                </div>

                <div className="pt-2 flex flex-wrap items-center justify-between gap-4">
                  <p className="text-xs text-[#7a6b4e]">
                    Our support team typically responds to privacy queries within 1 to 2 business days.
                  </p>
                  <Link href="/contact" className="btn-outline text-xs py-2 px-4">
                    Visit Contact Page <ChevronRight className="w-3.5 h-3.5" />
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
