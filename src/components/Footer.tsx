import Image from 'next/image';
import Link from 'next/link';
import { Phone, Mail, MapPin } from 'lucide-react';



const productLinks = [
  { href: '/products/red-chilli-powder', label: 'Red Chilli Powder' },
  { href: '/products/turmeric-powder', label: 'Turmeric Powder' },
  { href: '/products/dhaniya-powder', label: 'Dhaniya Powder' },
  { href: '/products/jeera-whole', label: 'Jeera Whole' },
  { href: '/products/garam-masala-powder', label: 'Garam Masala Powder' },
];

export default function Footer() {
  return (
    <footer className="footer-section relative overflow-hidden" aria-label="Site footer">
      {/* Botanical background decoration */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            'radial-gradient(ellipse 60% 40% at 85% 50%, rgba(122, 163, 62, 0.1) 0%, transparent 70%)',
        }}
      />

      {/* Botanical SVG top accent */}
      <div className="absolute top-0 left-0 right-0 flex items-center justify-center py-0">
        <svg
          width="120"
          height="20"
          viewBox="0 0 120 20"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          aria-hidden="true"
          className="opacity-20"
        >
          <path d="M0 10 Q30 0 60 10 Q90 20 120 10" stroke="#7AA33E" strokeWidth="1" fill="none" />
          <circle cx="60" cy="10" r="2" fill="#7AA33E" />
          <path d="M55 10 Q60 4 65 10" stroke="#7AA33E" strokeWidth="0.8" fill="none" />
        </svg>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-10 pt-16 pb-8">
        {/* Main footer grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-8 lg:gap-6 xl:gap-8 mb-14">
          {/* Brand Column */}
          <div className="sm:col-span-2 lg:col-span-1">
            <Link href="/" className="flex items-center gap-2.5 mb-5 group" aria-label="True Taste Home">
              <div className="flex-shrink-0 transition-transform duration-300 group-hover:scale-110">
                <Image
                  src="/images/logo.jpg"
                  alt="True Taste Logo"
                  width={44}
                  height={44}
                  className="rounded-full object-cover"
                />
              </div>
              <span className="font-playfair font-bold text-[#F2E6C9] text-xl leading-tight">
                True Taste
              </span>
            </Link>

            <p className="text-[#F2E6C9]/65 font-lato text-sm leading-relaxed mb-6">
              We bring you the finest quality spices, carefully selected and hygienically processed
              to deliver pure spices and true flavors in every meal.
            </p>

            <p className="text-[#7AA33E] font-playfair italic text-base mb-1">
              &ldquo;Pure Spices, True Flavors.&rdquo;
            </p>


          </div>

          {/* Products Column */}
          <div>
            <h3 className="text-[#F2E6C9] font-lato text-xs font-bold uppercase tracking-[0.18em] mb-5">
              Our Spices
            </h3>
            <ul className="space-y-3">
              {productLinks.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="footer-link hover:translate-x-0.5 inline-block transition-transform">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Pages Column */}
          <div>
            <h3 className="text-[#F2E6C9] font-lato text-xs font-bold uppercase tracking-[0.18em] mb-5">
              Explore
            </h3>
            <ul className="space-y-3">
              {[
                { href: '/', label: 'Home' },
                { href: '/products', label: 'All Products' },
                { href: '/our-story', label: 'Our Story' },
                { href: '/quality', label: 'Quality' },
                { href: '/contact', label: 'Contact' },
              ].map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="footer-link hover:translate-x-0.5 inline-block transition-transform">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal / Policies Column */}
          <div>
            <h3 className="text-[#F2E6C9] font-lato text-xs font-bold uppercase tracking-[0.18em] mb-5">
              Legal & Policies
            </h3>
            <ul className="space-y-3">
              {[
                { href: '/privacy-policy', label: 'Privacy Policy' },
                { href: '/terms-and-conditions', label: 'Terms & Conditions' },
                { href: '/refund-policy', label: 'Refund Policy' },
              ].map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="footer-link hover:translate-x-0.5 inline-block transition-transform">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Column — Phone, Email, Address only */}
          <div>
            <h3 className="text-[#F2E6C9] font-lato text-xs font-bold uppercase tracking-[0.18em] mb-5">
              Get In Touch
            </h3>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <Phone className="w-4 h-4 text-[#7AA33E] mt-0.5 flex-shrink-0" />
                <div>
                  <a href="tel:+918810303231" className="footer-link block">+91 8810303231</a>
                  <a href="tel:+919716567548" className="footer-link block">+91 9716567548</a>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <Mail className="w-4 h-4 text-[#7AA33E] mt-0.5 flex-shrink-0" />
                <a href="mailto:delhiwally@gmail.com" className="footer-link" style={{ fontSize: '0.8rem' }}>
                  delhiwally@gmail.com
                </a>
              </li>
              <li className="flex items-start gap-3">
                <MapPin className="w-4 h-4 text-[#7AA33E] mt-0.5 flex-shrink-0" />
                <address className="footer-link not-italic leading-relaxed" style={{ fontSize: '0.8rem' }}>
                  E-429 New Ashok Nagar<br />
                  Delhi – 110096, India
                </address>
              </li>
            </ul>
          </div>
        </div>

        {/* Curated Indian Locations Directory Section */}
        <div className="pt-10 pb-8 mb-8 border-t border-[#7AA33E]/20">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-5">
            <div>
              <span className="text-[#7AA33E] font-lato text-[0.65rem] font-bold uppercase tracking-[0.22em] block mb-1">
                Regional Heritage & Discovery
              </span>
              <h3 className="font-playfair font-bold text-[#F2E6C9] text-base sm:text-lg">
                Explore Indian Locations
              </h3>
            </div>
            <Link
              href="/locations"
              className="inline-flex items-center gap-2 text-xs font-lato font-bold text-[#7AA33E] hover:text-[#F2E6C9] transition-colors uppercase tracking-[0.12em] group"
            >
              <span>Explore All Indian Locations →</span>
            </Link>
          </div>

          <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-xs text-[#F2E6C9]/70 font-lato">
            {[
              { name: 'Delhi', slug: 'delhi' },
              { name: 'Mumbai', slug: 'mumbai' },
              { name: 'Bengaluru', slug: 'bengaluru' },
              { name: 'Hyderabad', slug: 'hyderabad' },
              { name: 'Chennai', slug: 'chennai' },
              { name: 'Kolkata', slug: 'kolkata' },
              { name: 'Pune', slug: 'pune' },
              { name: 'Ahmedabad', slug: 'ahmedabad' },
              { name: 'Jaipur', slug: 'jaipur' },
              { name: 'Lucknow', slug: 'lucknow' },
              { name: 'Noida', slug: 'noida' },
              { name: 'Gurugram', slug: 'gurugram' },
              { name: 'Indore', slug: 'indore' },
              { name: 'Chandigarh', slug: 'chandigarh' },
              { name: 'Surat', slug: 'surat' },
              { name: 'Kochi', slug: 'kochi' },
              { name: 'Varanasi', slug: 'varanasi' },
              { name: 'Bhopal', slug: 'bhopal' },
            ].map((city) => (
              <Link
                key={city.slug}
                href={`/locations/${city.slug}`}
                className="hover:text-[#F2E6C9] transition-colors hover:underline underline-offset-4"
              >
                {city.name}
              </Link>
            ))}
            <Link
              href="/locations"
              className="text-[#7AA33E] font-bold hover:text-[#F2E6C9] transition-colors inline-flex items-center gap-1"
            >
              <span>+ 1,000 more</span>
            </Link>
          </div>
        </div>

        {/* Botanical divider */}
        <div className="divider-botanical mb-7">
          <span className="text-[#7AA33E] text-xs">🌿</span>
        </div>

        {/* Bottom row */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 text-[#F2E6C9]/50 font-lato text-xs">
          <p>
            © {new Date().getFullYear()} True Taste. All rights reserved.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-x-3 gap-y-1">
            <Link href="/privacy-policy" className="hover:text-[#F2E6C9] transition-colors">
              Privacy Policy
            </Link>
            <span className="text-[#7AA33E]/50">✦</span>
            <Link href="/terms-and-conditions" className="hover:text-[#F2E6C9] transition-colors">
              Terms & Conditions
            </Link>
            <span className="text-[#7AA33E]/50">✦</span>
            <Link href="/refund-policy" className="hover:text-[#F2E6C9] transition-colors">
              Refund & Cancellation
            </Link>
          </div>
          <div className="flex items-center gap-4">
            <span>FSSAI Lic. No. 23326003003695</span>
            <span className="text-[#7AA33E]">✦</span>
            <span>Made in India</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
