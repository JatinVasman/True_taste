/**
 * POST /api/checkout/send-order
 *
 * Validates the cart server-side against the official product catalog,
 * then emails the order details to the business owner and a confirmation
 * to the customer — no payment gateway, no auth required.
 *
 * Request body:
 * {
 *   customerName: string;
 *   customerEmail: string;
 *   phone: string;
 *   addressLine1: string;
 *   addressLine2?: string;
 *   city: string;
 *   state: string;
 *   pincode: string;
 *   items: Array<{ productId: string; size: '50g'|'100g'|'200g'; quantity: number }>
 * }
 *
 * Response (success):
 * { success: true; orderId: string }
 *
 * Response (failure):
 * { error: string }
 */

import { NextRequest, NextResponse } from 'next/server';
import { products } from '@/lib/products';
import { sendCartOrder } from '@/lib/email';

// ── Shipping logic ──────────────────────────────────────────────────────────

const FREE_SHIPPING_THRESHOLD_INR = 499;
const SHIPPING_CHARGE_INR = 60;

function calculateShipping(subtotalInr: number): number {
  return subtotalInr >= FREE_SHIPPING_THRESHOLD_INR ? 0 : SHIPPING_CHARGE_INR;
}

// ── Types ───────────────────────────────────────────────────────────────────

interface RequestItem {
  productId: string;
  size: '50g' | '100g' | '200g';
  quantity: number;
}

// ── Route Handler ────────────────────────────────────────────────────────────

export async function POST(req: NextRequest) {
  // 1. Parse body
  let body: {
    customerName?: string;
    customerEmail?: string;
    phone?: string;
    addressLine1?: string;
    addressLine2?: string;
    city?: string;
    state?: string;
    pincode?: string;
    items?: unknown;
  };

  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: 'Invalid request body.' }, { status: 400 });
  }

  const {
    customerName,
    customerEmail,
    phone,
    addressLine1,
    addressLine2,
    city,
    state,
    pincode,
    items: rawItems,
  } = body;

  // 2. Validate customer info
  if (!customerName?.trim()) {
    return NextResponse.json({ error: 'Full name is required.' }, { status: 400 });
  }
  if (!customerEmail?.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(customerEmail)) {
    return NextResponse.json({ error: 'A valid email address is required.' }, { status: 400 });
  }
  if (!phone?.trim()) {
    return NextResponse.json({ error: 'Phone number is required.' }, { status: 400 });
  }
  if (!addressLine1?.trim() || !city?.trim() || !state?.trim() || !pincode?.trim()) {
    return NextResponse.json({ error: 'Shipping address is incomplete.' }, { status: 400 });
  }
  if (!/^\d{6}$/.test(pincode.trim())) {
    return NextResponse.json({ error: 'Pincode must be exactly 6 digits.' }, { status: 400 });
  }

  // 3. Validate items
  if (!Array.isArray(rawItems) || rawItems.length === 0) {
    return NextResponse.json({ error: 'Cart is empty or invalid.' }, { status: 400 });
  }

  const MAX_ITEMS = 50;
  const MAX_QTY = 99;

  if (rawItems.length > MAX_ITEMS) {
    return NextResponse.json({ error: 'Too many items in cart.' }, { status: 400 });
  }

  const validatedItems: Array<{
    name: string;
    size: string;
    quantity: number;
    unitPrice: number;
  }> = [];

  for (const raw of rawItems) {
    const item = raw as Partial<RequestItem>;

    if (
      typeof item?.productId !== 'string' ||
      !['50g', '100g', '200g'].includes(item?.size ?? '') ||
      typeof item?.quantity !== 'number'
    ) {
      return NextResponse.json({ error: `Invalid item format.` }, { status: 400 });
    }

    const qty = Math.floor(item.quantity);
    if (qty < 1 || qty > MAX_QTY) {
      return NextResponse.json({ error: `Quantity must be between 1 and ${MAX_QTY}.` }, { status: 400 });
    }

    // Server-side price lookup — client price is NEVER trusted
    const product = products.find((p) => p.id === item.productId);
    if (!product) {
      return NextResponse.json({ error: `Product not found: ${item.productId}` }, { status: 400 });
    }

    const unitPrice = product.pricing?.[item.size as '50g' | '100g' | '200g'];
    if (!unitPrice || unitPrice <= 0) {
      return NextResponse.json({ error: `No price for ${product.name} (${item.size}).` }, { status: 400 });
    }

    validatedItems.push({
      name: product.name,
      size: item.size as string,
      quantity: qty,
      unitPrice,
    });
  }

  // 4. Calculate totals server-side
  const subtotal = validatedItems.reduce((sum, i) => sum + i.unitPrice * i.quantity, 0);
  const shippingCharge = calculateShipping(subtotal);
  const totalAmount = subtotal + shippingCharge;

  // 5. Build address string
  const shippingAddress = [
    addressLine1.trim(),
    addressLine2?.trim(),
    `${city.trim()}, ${state.trim()} – ${pincode.trim()}`,
  ]
    .filter(Boolean)
    .join(', ');

  // 6. Generate a simple order reference
  const orderId = `TT-${Date.now().toString(36).toUpperCase()}`;

  // 7. Send emails
  const emailResult = await sendCartOrder({
    orderId,
    customerName: customerName.trim(),
    customerEmail: customerEmail.trim(),
    phone: phone.trim(),
    shippingAddress,
    items: validatedItems,
    subtotal,
    shippingCharge,
    totalAmount,
    orderDate: new Date().toISOString(),
  });

  if (!emailResult.success) {
    console.error('[send-order] Email failed:', emailResult.error);
    return NextResponse.json(
      { error: 'Could not send order confirmation. Please try again or contact us directly.' },
      { status: 502 }
    );
  }

  return NextResponse.json({ success: true, orderId });
}
