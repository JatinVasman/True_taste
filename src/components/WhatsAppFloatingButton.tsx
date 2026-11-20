'use client';

import { useState } from 'react';
import WhatsAppIcon from './WhatsAppIcon';
import { DEFAULT_WHATSAPP_PHONE, getWhatsAppUrl } from '@/lib/whatsapp';

export default function WhatsAppFloatingButton() {
  const [hovered, setHovered] = useState(false);

  const defaultMessage =
    'Hello True Taste! 👋 I would like to enquire about your spices / place an order.';
  const whatsappUrl = getWhatsAppUrl(defaultMessage, DEFAULT_WHATSAPP_PHONE);

  return (
    <aside
      className="fixed bottom-6 right-6 z-40 flex items-center gap-3 select-none"
      aria-label="Contact True Taste via WhatsApp"
    >
      {/* Tooltip / Pill */}
      <div
        className={`transition-all duration-300 pointer-events-none rounded-full px-3.5 py-1.5 shadow-lg hidden sm:flex items-center gap-1.5 ${
          hovered ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-2'
        }`}
        style={{
          background: '#FFFDF8',
          border: '1px solid rgba(37, 211, 102, 0.3)',
          color: '#1b5e20',
        }}
      >
        <span className="w-2 h-2 rounded-full bg-[#25D366] animate-pulse" />
        <span className="font-lato font-bold text-xs">Order on WhatsApp</span>
      </div>

      {/* Floating Button */}
      <a
        href={whatsappUrl}
        target="_blank"
        rel="noopener noreferrer"
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        className="w-14 h-14 rounded-full flex items-center justify-center text-white shadow-2xl transition-all duration-300 hover:scale-110 active:scale-95 focus:outline-none focus:ring-4 focus:ring-[#25D366]/40"
        style={{
          background: 'linear-gradient(135deg, #25D366 0%, #128C7E 100%)',
          boxShadow: '0 8px 24px rgba(37, 211, 102, 0.45)',
        }}
        aria-label="Order on WhatsApp (+91 8810303231)"
      >
        <WhatsAppIcon className="w-7 h-7 fill-white" />
      </a>
    </aside>
  );
}
