'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Phone, Mail, MapPin, MessageCircle, Send, Leaf } from 'lucide-react';
import AnimatedSection from '@/components/AnimatedSection';

/* =============================================
   CONTACT PAGE
   "Let's Talk Spices."
   ============================================= */

const contactDetails = [
  {
    icon: Phone,
    label: 'Call Us',
    lines: ['+91 8810303231', '+91 9716567548'],
    href: 'tel:+918810303231',
  },
  {
    icon: Mail,
    label: 'Email Us',
    lines: ['delhiwally@gmail.com'],
    href: 'mailto:delhiwally@gmail.com',
  },
  {
    icon: MapPin,
    label: 'Address',
    lines: ['E-429 New Ashok Nagar', 'Delhi – 110096, India'],
    href: null,
  },
];

export default function ContactClient() {
  const [formState, setFormState] = useState({
    name: '',
    email: '',
    phone: '',
    message: '',
  });
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormState((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real implementation, this would send the form data
    setSubmitted(true);
  };

  return (
    <>
      {/* ===========================
          PAGE HERO
          =========================== */}
      <section
        className="relative pt-40 pb-20 overflow-hidden"
        style={{ background: '#FFF8EF' }}
        aria-labelledby="contact-heading"
      >
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              'radial-gradient(ellipse 60% 80% at 80% 20%, rgba(242, 230, 201, 0.6) 0%, transparent 70%)',
          }}
        />

        <div className="relative z-10 max-w-4xl mx-auto px-6 text-center">
          <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <div className="eyebrow justify-center mb-5">True Taste</div>
          </motion.div>
          <motion.h1
            className="text-display text-[#2E5E2E] mb-4"
            initial={{ opacity: 0, y: 28 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
            id="contact-heading"
          >
            Let&rsquo;s Talk{' '}
            <em className="italic" style={{ color: '#5A2E0D' }}>
              Spices.
            </em>
          </motion.h1>
          <motion.p
            className="font-lato text-[#7a6b4e] text-lg max-w-lg mx-auto leading-relaxed"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            Have a question or enquiry? We&rsquo;d love to hear from you.
            Reach out and let&rsquo;s bring true flavors to your kitchen.
          </motion.p>
        </div>
      </section>

      {/* ===========================
          CONTACT CONTENT
          =========================== */}
      <section className="section-pad pt-8" aria-label="Contact information and form">
        <div className="max-w-7xl mx-auto px-6 md:px-10">
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-12 lg:gap-16">

            {/* LEFT — Contact Details */}
            <div className="lg:col-span-2">
              <AnimatedSection>
                <div className="eyebrow mb-6">Reach Out</div>
              </AnimatedSection>
              <AnimatedSection delay={0.1}>
                <h2 className="font-playfair font-bold text-[#2E5E2E] text-2xl mb-8">
                  We&rsquo;re Here to Help
                </h2>
              </AnimatedSection>

              <div className="space-y-7">
                {contactDetails.map((detail, i) => {
                  const Icon = detail.icon;
                  return (
                    <AnimatedSection key={detail.label} delay={i * 0.1}>
                      <div className="flex gap-4">
                        <div className="w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5"
                          style={{ background: 'rgba(122,163,62,0.1)' }}>
                          <Icon className="w-4 h-4 text-[#7AA33E]" />
                        </div>
                        <div>
                          <p className="font-lato text-[0.65rem] font-bold uppercase tracking-wider text-[#7AA33E] mb-1">
                            {detail.label}
                          </p>
                          {detail.lines.map((line) =>
                            detail.href ? (
                              <a
                                key={line}
                                href={detail.href}
                                className="block font-lato text-[#2E5E2E] text-sm hover:text-[#7AA33E] transition-colors"
                              >
                                {line}
                              </a>
                            ) : (
                              <p key={line} className="font-lato text-[#2E5E2E] text-sm">
                                {line}
                              </p>
                            )
                          )}
                        </div>
                      </div>
                    </AnimatedSection>
                  );
                })}
              </div>

              {/* WhatsApp CTA */}
              <AnimatedSection delay={0.5} className="mt-10">
                <a
                  href="https://wa.me/918810303231"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 p-5 rounded-2xl transition-all duration-200 hover:-translate-y-0.5"
                  style={{ background: 'rgba(37,211,102,0.1)', border: '1px solid rgba(37,211,102,0.2)' }}
                >
                  <div className="w-10 h-10 rounded-full bg-[#25D366] flex items-center justify-center flex-shrink-0">
                    <svg viewBox="0 0 32 32" width="22" height="22" fill="white" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                      <path d="M16.003 2.667C8.637 2.667 2.667 8.637 2.667 16c0 2.365.643 4.68 1.864 6.699L2.667 29.333l6.805-1.784A13.27 13.27 0 0 0 16.003 29.333C23.363 29.333 29.333 23.363 29.333 16S23.363 2.667 16.003 2.667zm0 24.267a11.1 11.1 0 0 1-5.66-1.543l-.406-.24-4.037 1.058 1.077-3.934-.265-.42A11.08 11.08 0 0 1 4.933 16c0-6.107 4.963-11.067 11.07-11.067S27.067 9.893 27.067 16 22.107 26.934 16.003 26.934zm6.07-8.293c-.333-.167-1.97-.972-2.275-1.083-.305-.11-.527-.167-.748.167-.22.333-.858 1.083-1.052 1.305-.194.222-.389.25-.722.083-.333-.167-1.407-.518-2.68-1.653-.99-.883-1.658-1.972-1.853-2.305-.194-.333-.02-.513.146-.68.15-.148.333-.389.5-.583.167-.194.222-.333.333-.555.11-.222.055-.417-.028-.583-.083-.167-.748-1.806-1.025-2.472-.27-.65-.545-.562-.748-.572l-.638-.011c-.222 0-.583.083-.888.417-.305.333-1.166 1.14-1.166 2.778s1.194 3.222 1.36 3.444c.167.222 2.35 3.588 5.694 5.029.796.344 1.417.549 1.9.703.799.254 1.527.218 2.102.132.641-.095 1.97-.806 2.248-1.583.278-.778.278-1.445.194-1.584-.083-.138-.305-.221-.638-.388z"/>
                    </svg>
                  </div>
                  <div>
                    <p className="font-lato font-bold text-[#2E5E2E] text-sm">Chat on WhatsApp</p>
                    <p className="font-lato text-[#7a6b4e] text-xs">+91 8810303231</p>
                  </div>
                </a>
              </AnimatedSection>

              {/* FSSAI note */}
              <AnimatedSection delay={0.55} className="mt-8">
                <div className="divider-botanical mb-5">
                  <Leaf className="w-3 h-3 text-[#7AA33E]" />
                </div>
                <p className="font-lato text-xs text-[#7a6b4e]">
                  FSSAI Lic. No. 23326003003695
                </p>
              </AnimatedSection>
            </div>

            {/* RIGHT — Contact Form */}
            <div className="lg:col-span-3">
              <AnimatedSection direction="right">
                <div className="p-8 md:p-10 rounded-3xl"
                  style={{ background: '#FFFDF8', border: '1px solid rgba(122,163,62,0.12)' }}>
                  {submitted ? (
                    <motion.div
                      className="text-center py-12"
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                    >
                      <div className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-5"
                        style={{ background: 'rgba(122,163,62,0.12)' }}>
                        <Leaf className="w-7 h-7 text-[#7AA33E]" />
                      </div>
                      <h3 className="font-playfair font-bold text-[#2E5E2E] text-2xl mb-3">
                        Thank You!
                      </h3>
                      <p className="font-lato text-[#7a6b4e] text-base">
                        We&rsquo;ve received your enquiry. Our team will be in touch shortly.
                      </p>
                    </motion.div>
                  ) : (
                    <>
                      <div className="mb-8">
                        <h2 className="font-playfair font-bold text-[#2E5E2E] text-2xl mb-2">
                          Send an Enquiry
                        </h2>
                        <p className="font-lato text-[#7a6b4e] text-sm">
                          Fill in your details and we&rsquo;ll get back to you promptly.
                        </p>
                      </div>

                      <form onSubmit={handleSubmit} className="space-y-5" noValidate>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                          <div>
                            <label htmlFor="name" className="block font-lato text-[0.7rem] font-bold uppercase tracking-wider text-[#2E5E2E] mb-2">
                              Full Name *
                            </label>
                            <input
                              type="text"
                              id="name"
                              name="name"
                              required
                              placeholder="Your name"
                              value={formState.name}
                              onChange={handleChange}
                              className="form-field"
                            />
                          </div>
                          <div>
                            <label htmlFor="phone" className="block font-lato text-[0.7rem] font-bold uppercase tracking-wider text-[#2E5E2E] mb-2">
                              Phone Number
                            </label>
                            <input
                              type="tel"
                              id="phone"
                              name="phone"
                              placeholder="+91 XXXXX XXXXX"
                              value={formState.phone}
                              onChange={handleChange}
                              className="form-field"
                            />
                          </div>
                        </div>

                        <div>
                          <label htmlFor="email" className="block font-lato text-[0.7rem] font-bold uppercase tracking-wider text-[#2E5E2E] mb-2">
                            Email Address *
                          </label>
                          <input
                            type="email"
                            id="email"
                            name="email"
                            required
                            placeholder="your@email.com"
                            value={formState.email}
                            onChange={handleChange}
                            className="form-field"
                          />
                        </div>

                        <div>
                          <label htmlFor="message" className="block font-lato text-[0.7rem] font-bold uppercase tracking-wider text-[#2E5E2E] mb-2">
                            Your Message *
                          </label>
                          <textarea
                            id="message"
                            name="message"
                            required
                            rows={5}
                            placeholder="Tell us what you're looking for…"
                            value={formState.message}
                            onChange={handleChange}
                            className="form-field resize-none"
                          />
                        </div>

                        <button
                          type="submit"
                          className="btn-primary w-full justify-center gap-2"
                        >
                          <Send className="w-4 h-4" />
                          Send Enquiry
                        </button>
                      </form>
                    </>
                  )}
                </div>
              </AnimatedSection>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
