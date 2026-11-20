/**
 * WhatsApp Order Utility — True Taste
 *
 * Generates formatted WhatsApp messages and redirection URLs for:
 * 1. Single product ordering (direct from product detail or product card)
 * 2. Multi-item cart ordering (from cart drawer or cart page)
 * 3. Full checkout ordering (with customer name and delivery address)
 */

import type { CartItem } from './cart';

// Default WhatsApp business number for True Taste (India: +91 8810303231)
export const DEFAULT_WHATSAPP_PHONE =
  process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || '918810303231';

export const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL || 'https://truetaste.in';

/**
 * Normalizes phone numbers to standard international format without '+' or spaces.
 */
export function cleanPhoneNumber(phone: string): string {
  const digits = phone.replace(/\D/g, '');
  // If 10 digits (standard Indian mobile), prepend 91
  if (digits.length === 10) {
    return `91${digits}`;
  }
  return digits;
}

export interface SingleProductOrderParams {
  name: string;
  size: string;
  quantity: number;
  unitPrice: number;
  slug?: string;
  customNote?: string;
}

/**
 * Builds the WhatsApp order message for a single product.
 */
export function buildProductWhatsAppMessage({
  name,
  size,
  quantity,
  unitPrice,
  slug,
  customNote,
}: SingleProductOrderParams): string {
  const total = unitPrice * quantity;
  const productUrl = slug ? `${SITE_URL}/products/${slug}` : undefined;

  const lines = [
    '🌿 *TRUE TASTE — NEW ORDER* 🌿',
    '',
    'Hello True Taste! I would like to place an order:',
    '',
    `📦 *Product:* ${name}`,
    `⚖️ *Pack Size:* ${size}`,
    `🔢 *Quantity:* ${quantity}`,
    `💵 *Price:* ₹${unitPrice} per pack`,
    `💰 *Total Amount:* ₹${total}`,
  ];

  if (productUrl) {
    lines.push(`🔗 *Product Link:* ${productUrl}`);
  }

  if (customNote && customNote.trim()) {
    lines.push('', `📝 *Note:* ${customNote.trim()}`);
  }

  lines.push(
    '',
    'Please confirm my order and share delivery / payment details.',
    'Thank you!'
  );

  return lines.join('\n');
}

export interface CustomerDetails {
  fullName: string;
  phone: string;
  email?: string;
  addressLine1: string;
  addressLine2?: string;
  city: string;
  state: string;
  pincode: string;
}

export interface CartOrderParams {
  items: CartItem[];
  subtotal: number;
  shipping: number;
  total: number;
  customer?: CustomerDetails;
  orderId?: string;
}

/**
 * Builds the WhatsApp order message for the cart / checkout.
 */
export function buildCartWhatsAppMessage({
  items,
  subtotal,
  shipping,
  total,
  customer,
  orderId,
}: CartOrderParams): string {
  const lines: string[] = [
    '🌿 *TRUE TASTE — NEW ORDER* 🌿',
    '',
    'Hello True Taste! I would like to place an order:',
    '',
  ];

  if (orderId) {
    lines.push(`🔖 *Order ID:* ${orderId}`, '');
  }

  lines.push('📦 *SELECTED PRODUCTS:*');
  items.forEach((item, index) => {
    const itemTotal = item.unitPrice * item.quantity;
    lines.push(
      `${index + 1}. *${item.name}* (${item.size}) × ${item.quantity} = ₹${itemTotal}`
    );
  });

  lines.push(
    '',
    '📊 *BILLING SUMMARY:*',
    `• Subtotal: ₹${subtotal}`,
    `• Shipping: ${shipping === 0 ? 'FREE' : `₹${shipping}`}`,
    `• *Total Payable:* ₹${total}`
  );

  if (customer && customer.fullName) {
    lines.push(
      '',
      '📍 *DELIVERY ADDRESS:*',
      `• *Name:* ${customer.fullName}`,
      `• *Phone:* ${customer.phone}`
    );
    if (customer.email) {
      lines.push(`• *Email:* ${customer.email}`);
    }
    const fullAddress = [
      customer.addressLine1,
      customer.addressLine2,
      customer.city,
      customer.state,
      customer.pincode,
    ]
      .filter(Boolean)
      .join(', ');
    lines.push(`• *Address:* ${fullAddress}`);
  }

  lines.push(
    '',
    'Please confirm my order and share payment / delivery timeline.',
    'Thank you!'
  );

  return lines.join('\n');
}

/**
 * Returns a universal WhatsApp link (wa.me) for the given message.
 */
export function getWhatsAppUrl(
  message: string,
  phoneNumber: string = DEFAULT_WHATSAPP_PHONE
): string {
  const cleanPhone = cleanPhoneNumber(phoneNumber);
  const encodedMessage = encodeURIComponent(message);
  return `https://wa.me/${cleanPhone}?text=${encodedMessage}`;
}

/**
 * Safely redirects / opens WhatsApp for the customer.
 */
export function redirectToWhatsApp(
  message: string,
  phoneNumber: string = DEFAULT_WHATSAPP_PHONE
): void {
  const url = getWhatsAppUrl(message, phoneNumber);
  if (typeof window === 'undefined') return;

  // Attempt window.open; if blocked or mobile device, fallback to direct location redirect
  const isMobile = /Android|iPhone|iPad|iPod|Windows Phone/i.test(
    navigator.userAgent
  );

  if (isMobile) {
    window.location.href = url;
  } else {
    const win = window.open(url, '_blank');
    if (!win || win.closed || typeof win.closed === 'undefined') {
      window.location.href = url;
    }
  }
}
