/**
 * Email service — Delhi Wally
 *
 * Server-side ONLY. Never import this in client components.
 *
 * Sender domain:  truetaste.in (verified in Resend dashboard)
 * Support email:  delhiwally@gmial.com  (reply-to / contact)
 *
 * Usage:
 *   import { sendOrderConfirmation, sendContactNotification } from '@/lib/email';
 *
 * The RESEND_API_KEY must be set server-side only (never NEXT_PUBLIC_).
 */

import { Resend } from 'resend';

// ── Singleton Resend client ────────────────────────────────────────────────

let _resend: Resend | null = null;

function getResend(): Resend {
  if (!_resend) {
    const apiKey = process.env.RESEND_API_KEY;
    if (!apiKey) throw new Error('RESEND_API_KEY is not set. Cannot send emails.');
    _resend = new Resend(apiKey);
  }
  return _resend;
}

// ── Constants ──────────────────────────────────────────────────────────────

const FROM_EMAIL =
  process.env.RESEND_FROM_EMAIL ?? 'Delhi Wally <noreply@truetaste.in>';
const SUPPORT_EMAIL = 'delhiwally@gmial.com';
const SITE_URL = 'https://truetaste.in';

// ── Types ──────────────────────────────────────────────────────────────────

export interface OrderItemForEmail {
  name: string;
  size: string;
  quantity: number;
  unitPrice: number;
}

export interface OrderConfirmationData {
  customerName: string;
  customerEmail: string;
  orderId: string;
  razorpayOrderId: string;
  razorpayPaymentId: string;
  orderDate: string; // ISO string
  items: OrderItemForEmail[];
  subtotal: number;
  shippingCharge: number;
  totalAmount: number;
  paymentStatus: string;
  shippingAddress?: string;
}

export interface ContactNotificationData {
  customerName: string;
  customerEmail: string;
  phone?: string;
  message: string;
  submittedAt: string; // ISO string
}

export interface EmailResult {
  success: boolean;
  error?: string;
  emailId?: string;
}

// ── HTML helpers ───────────────────────────────────────────────────────────

function formatCurrency(paise: number): string {
  return `₹${(paise / 100).toFixed(2)}`;
}

function formatDate(isoString: string): string {
  return new Date(isoString).toLocaleDateString('en-IN', {
    day: '2-digit',
    month: 'long',
    year: 'numeric',
  });
}

// ── Order Confirmation Email ───────────────────────────────────────────────

function buildOrderConfirmationHtml(data: OrderConfirmationData): string {
  const {
    customerName,
    orderId,
    razorpayPaymentId,
    orderDate,
    items,
    subtotal,
    shippingCharge,
    totalAmount,
    paymentStatus,
    shippingAddress,
  } = data;

  const itemRows = items
    .map(
      (item) => `
      <tr>
        <td style="padding:10px 0;border-bottom:1px solid #f0e8d8;color:#2E5E2E;font-family:Georgia,serif;font-size:15px;">
          ${item.name} (${item.size})
        </td>
        <td style="padding:10px 0;border-bottom:1px solid #f0e8d8;text-align:center;color:#7a6b4e;font-size:14px;">
          × ${item.quantity}
        </td>
        <td style="padding:10px 0;border-bottom:1px solid #f0e8d8;text-align:right;color:#2E5E2E;font-weight:bold;font-size:14px;">
          ${formatCurrency(item.unitPrice * item.quantity * 100)}
        </td>
      </tr>`
    )
    .join('');

  return `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Order Confirmation — Delhi Wally</title>
</head>
<body style="margin:0;padding:0;background:#FFF8EF;font-family:Arial,Helvetica,sans-serif;">

  <!-- Wrapper -->
  <table width="100%" cellpadding="0" cellspacing="0" style="background:#FFF8EF;padding:32px 16px;">
    <tr>
      <td align="center">
        <!-- Card -->
        <table width="600" cellpadding="0" cellspacing="0" style="background:#FFFDF8;border-radius:16px;border:1px solid #e8dcc8;max-width:600px;width:100%;">

          <!-- Header -->
          <tr>
            <td style="background:#2E5E2E;border-radius:16px 16px 0 0;padding:32px 40px;text-align:center;">
              <p style="margin:0 0 6px 0;font-family:Arial,sans-serif;font-size:11px;font-weight:700;letter-spacing:3px;text-transform:uppercase;color:#F2E6C9;opacity:0.7;">Pure Spices, True Love</p>
              <h1 style="margin:0;font-family:Georgia,'Times New Roman',serif;font-size:32px;font-weight:700;color:#F2E6C9;">Delhi Wally</h1>
            </td>
          </tr>

          <!-- Body -->
          <tr>
            <td style="padding:36px 40px;">

              <!-- Status badge -->
              <div style="background:rgba(122,163,62,0.12);border:1px solid rgba(122,163,62,0.3);border-radius:50px;display:inline-block;padding:6px 18px;margin-bottom:24px;">
                <span style="font-size:12px;font-weight:700;color:#7AA33E;text-transform:uppercase;letter-spacing:2px;">✓ ${paymentStatus}</span>
              </div>

              <h2 style="margin:0 0 8px 0;font-family:Georgia,serif;font-size:26px;color:#2E5E2E;">Thank you, ${customerName}!</h2>
              <p style="margin:0 0 28px 0;font-size:15px;color:#7a6b4e;line-height:1.6;">
                Your order has been confirmed and is being processed. You'll receive updates as it ships.
              </p>

              <!-- Order meta -->
              <table width="100%" cellpadding="0" cellspacing="0" style="background:#FFF8EF;border-radius:10px;padding:20px;margin-bottom:28px;">
                <tr>
                  <td style="padding:4px 0;">
                    <span style="font-size:12px;color:#7a6b4e;">Order ID</span><br/>
                    <strong style="font-size:14px;color:#2E5E2E;">#${orderId.toUpperCase().slice(-8)}</strong>
                  </td>
                  <td style="padding:4px 0;">
                    <span style="font-size:12px;color:#7a6b4e;">Order Date</span><br/>
                    <strong style="font-size:14px;color:#2E5E2E;">${formatDate(orderDate)}</strong>
                  </td>
                  <td style="padding:4px 0;">
                    <span style="font-size:12px;color:#7a6b4e;">Payment ID</span><br/>
                    <strong style="font-size:14px;color:#2E5E2E;">${razorpayPaymentId.slice(0, 14)}…</strong>
                  </td>
                </tr>
              </table>

              <!-- Items -->
              <h3 style="margin:0 0 12px 0;font-size:12px;font-weight:700;letter-spacing:2px;text-transform:uppercase;color:#7AA33E;">Your Spices</h3>
              <table width="100%" cellpadding="0" cellspacing="0">
                <thead>
                  <tr>
                    <th style="text-align:left;font-size:11px;color:#7a6b4e;font-weight:normal;padding-bottom:8px;border-bottom:2px solid #e8dcc8;">Product</th>
                    <th style="text-align:center;font-size:11px;color:#7a6b4e;font-weight:normal;padding-bottom:8px;border-bottom:2px solid #e8dcc8;">Qty</th>
                    <th style="text-align:right;font-size:11px;color:#7a6b4e;font-weight:normal;padding-bottom:8px;border-bottom:2px solid #e8dcc8;">Amount</th>
                  </tr>
                </thead>
                <tbody>
                  ${itemRows}
                </tbody>
              </table>

              <!-- Totals -->
              <table width="100%" cellpadding="0" cellspacing="0" style="margin-top:20px;">
                <tr>
                  <td style="padding:6px 0;font-size:14px;color:#7a6b4e;">Subtotal</td>
                  <td style="padding:6px 0;text-align:right;font-size:14px;color:#2E5E2E;">${formatCurrency(subtotal * 100)}</td>
                </tr>
                <tr>
                  <td style="padding:6px 0;font-size:14px;color:#7a6b4e;">Shipping</td>
                  <td style="padding:6px 0;text-align:right;font-size:14px;color:#2E5E2E;">${shippingCharge === 0 ? 'FREE' : formatCurrency(shippingCharge * 100)}</td>
                </tr>
                <tr>
                  <td colspan="2" style="border-top:2px solid #e8dcc8;padding-top:12px;"></td>
                </tr>
                <tr>
                  <td style="padding:4px 0;font-family:Georgia,serif;font-size:18px;font-weight:700;color:#2E5E2E;">Total Paid</td>
                  <td style="padding:4px 0;text-align:right;font-family:Georgia,serif;font-size:20px;font-weight:700;color:#2E5E2E;">${formatCurrency(totalAmount * 100)}</td>
                </tr>
              </table>

              ${
                shippingAddress
                  ? `
              <!-- Delivery address -->
              <div style="margin-top:28px;padding:16px 20px;background:#FFF8EF;border-radius:10px;border-left:3px solid #7AA33E;">
                <p style="margin:0 0 4px 0;font-size:11px;font-weight:700;letter-spacing:2px;text-transform:uppercase;color:#7AA33E;">Delivery Address</p>
                <p style="margin:0;font-size:14px;color:#2E5E2E;line-height:1.5;">${shippingAddress}</p>
              </div>`
                  : ''
              }

              <!-- CTA -->
              <div style="margin-top:32px;text-align:center;">
                <a href="${SITE_URL}/account" style="display:inline-block;background:#2E5E2E;color:#F2E6C9;text-decoration:none;padding:14px 32px;border-radius:50px;font-size:14px;font-weight:700;letter-spacing:1px;">View My Account</a>
              </div>

            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="padding:24px 40px;border-top:1px solid #e8dcc8;text-align:center;">
              <p style="margin:0 0 6px 0;font-size:13px;color:#7a6b4e;">
                Questions? Email us at
                <a href="mailto:${SUPPORT_EMAIL}" style="color:#7AA33E;text-decoration:none;">${SUPPORT_EMAIL}</a>
              </p>
              <p style="margin:0;font-size:12px;color:#b8a990;">
                © ${new Date().getFullYear()} Delhi Wally — <a href="${SITE_URL}" style="color:#b8a990;">${SITE_URL}</a>
              </p>
              <p style="margin:6px 0 0 0;font-size:11px;color:#b8a990;">FSSAI Lic. No. 23326003003695</p>
            </td>
          </tr>

        </table>
      </td>
    </tr>
  </table>
</body>
</html>`;
}

function buildOrderConfirmationText(data: OrderConfirmationData): string {
  const {
    customerName,
    orderId,
    razorpayPaymentId,
    orderDate,
    items,
    subtotal,
    shippingCharge,
    totalAmount,
    paymentStatus,
    shippingAddress,
  } = data;

  const itemLines = items
    .map(
      (item) =>
        `  • ${item.name} (${item.size}) × ${item.quantity}  —  ${formatCurrency(item.unitPrice * item.quantity * 100)}`
    )
    .join('\n');

  return `
DELHI WALLY — Order Confirmation
================================

Hello ${customerName},

Your order has been confirmed! Payment status: ${paymentStatus}

ORDER DETAILS
-------------
Order ID    : #${orderId.toUpperCase().slice(-8)}
Order Date  : ${formatDate(orderDate)}
Payment ID  : ${razorpayPaymentId}

ITEMS ORDERED
-------------
${itemLines}

SUMMARY
-------
Subtotal    : ${formatCurrency(subtotal * 100)}
Shipping    : ${shippingCharge === 0 ? 'FREE' : formatCurrency(shippingCharge * 100)}
Total Paid  : ${formatCurrency(totalAmount * 100)}

${shippingAddress ? `DELIVERY ADDRESS\n----------------\n${shippingAddress}\n` : ''}

QUESTIONS?
----------
Email  : ${SUPPORT_EMAIL}
Website: ${SITE_URL}

© ${new Date().getFullYear()} Delhi Wally — FSSAI Lic. No. 23326003003695
`.trim();
}

// ── Contact Notification Email ─────────────────────────────────────────────

function buildContactNotificationHtml(data: ContactNotificationData): string {
  const { customerName, customerEmail, phone, message, submittedAt } = data;
  return `
<!DOCTYPE html>
<html lang="en">
<head><meta charset="UTF-8"/><title>New Contact Enquiry — Delhi Wally</title></head>
<body style="margin:0;padding:24px;background:#f8f5f0;font-family:Arial,sans-serif;">
  <table width="600" cellpadding="0" cellspacing="0" style="background:#fff;border-radius:12px;border:1px solid #e0d4c0;max-width:600px;margin:0 auto;">
    <tr>
      <td style="background:#2E5E2E;padding:24px 32px;border-radius:12px 12px 0 0;">
        <h2 style="margin:0;color:#F2E6C9;font-family:Georgia,serif;font-size:22px;">New Contact Enquiry</h2>
        <p style="margin:4px 0 0 0;color:#F2E6C9;opacity:0.7;font-size:13px;">Delhi Wally Website</p>
      </td>
    </tr>
    <tr>
      <td style="padding:28px 32px;">
        <table width="100%" cellpadding="0" cellspacing="0">
          <tr>
            <td style="padding:8px 0;border-bottom:1px solid #f0e8d8;">
              <strong style="font-size:12px;color:#7a6b4e;text-transform:uppercase;letter-spacing:1px;">Name</strong><br/>
              <span style="font-size:15px;color:#2E5E2E;">${customerName}</span>
            </td>
          </tr>
          <tr>
            <td style="padding:8px 0;border-bottom:1px solid #f0e8d8;">
              <strong style="font-size:12px;color:#7a6b4e;text-transform:uppercase;letter-spacing:1px;">Email</strong><br/>
              <a href="mailto:${customerEmail}" style="font-size:15px;color:#7AA33E;">${customerEmail}</a>
            </td>
          </tr>
          ${
            phone
              ? `<tr>
            <td style="padding:8px 0;border-bottom:1px solid #f0e8d8;">
              <strong style="font-size:12px;color:#7a6b4e;text-transform:uppercase;letter-spacing:1px;">Phone</strong><br/>
              <span style="font-size:15px;color:#2E5E2E;">${phone}</span>
            </td>
          </tr>`
              : ''
          }
          <tr>
            <td style="padding:8px 0;border-bottom:1px solid #f0e8d8;">
              <strong style="font-size:12px;color:#7a6b4e;text-transform:uppercase;letter-spacing:1px;">Submitted</strong><br/>
              <span style="font-size:14px;color:#2E5E2E;">${new Date(submittedAt).toLocaleString('en-IN')}</span>
            </td>
          </tr>
          <tr>
            <td style="padding:16px 0 0 0;">
              <strong style="font-size:12px;color:#7a6b4e;text-transform:uppercase;letter-spacing:1px;">Message</strong><br/>
              <p style="margin:8px 0 0 0;font-size:15px;color:#2E5E2E;line-height:1.7;background:#FFF8EF;padding:16px;border-radius:8px;white-space:pre-wrap;">${message}</p>
            </td>
          </tr>
        </table>
        <div style="margin-top:24px;">
          <a href="mailto:${customerEmail}" style="background:#2E5E2E;color:#F2E6C9;text-decoration:none;padding:10px 24px;border-radius:50px;font-size:13px;font-weight:700;">Reply to ${customerName}</a>
        </div>
      </td>
    </tr>
    <tr>
      <td style="padding:16px 32px;border-top:1px solid #e8dcc8;text-align:center;">
        <p style="margin:0;font-size:12px;color:#b8a990;">Delhi Wally — <a href="${SITE_URL}" style="color:#b8a990;">${SITE_URL}</a></p>
      </td>
    </tr>
  </table>
</body>
</html>`;
}

function buildContactNotificationText(data: ContactNotificationData): string {
  const { customerName, customerEmail, phone, message, submittedAt } = data;
  return `
New Contact Enquiry — Delhi Wally
==================================
Name     : ${customerName}
Email    : ${customerEmail}
Phone    : ${phone ?? 'Not provided'}
Submitted: ${new Date(submittedAt).toLocaleString('en-IN')}

Message:
--------
${message}

Reply to: ${customerEmail}
`.trim();
}

// ── Public API ─────────────────────────────────────────────────────────────

/**
 * Send an order confirmation email to the customer.
 * Call this ONLY after server-side payment verification has succeeded.
 */
export async function sendOrderConfirmation(
  data: OrderConfirmationData
): Promise<EmailResult> {
  try {
    const resend = getResend();
    const { data: result, error } = await resend.emails.send({
      from: FROM_EMAIL,
      to: [data.customerEmail],
      replyTo: SUPPORT_EMAIL,
      subject: `Order Confirmed — Delhi Wally #${data.orderId.toUpperCase().slice(-8)}`,
      html: buildOrderConfirmationHtml(data),
      text: buildOrderConfirmationText(data),
    });

    if (error) {
      console.error('[email] sendOrderConfirmation failed:', error);
      return { success: false, error: error.message };
    }

    return { success: true, emailId: result?.id };
  } catch (err) {
    const msg = err instanceof Error ? err.message : 'Unknown email error';
    console.error('[email] sendOrderConfirmation exception:', msg);
    return { success: false, error: msg };
  }
}

/**
 * Send a contact-form notification to the business owner.
 * Never let email failure bubble up as a form-submission failure.
 */
export async function sendContactNotification(
  data: ContactNotificationData
): Promise<EmailResult> {
  try {
    const resend = getResend();
    const { data: result, error } = await resend.emails.send({
      from: FROM_EMAIL,
      to: [SUPPORT_EMAIL],
      replyTo: data.customerEmail,
      subject: `New Enquiry from ${data.customerName} — Delhi Wally`,
      html: buildContactNotificationHtml(data),
      text: buildContactNotificationText(data),
    });

    if (error) {
      console.error('[email] sendContactNotification failed:', error);
      return { success: false, error: error.message };
    }

    return { success: true, emailId: result?.id };
  } catch (err) {
    const msg = err instanceof Error ? err.message : 'Unknown email error';
    console.error('[email] sendContactNotification exception:', msg);
    return { success: false, error: msg };
  }
}

// ── Cart Order Email (no payment gateway) ─────────────────────────────────

export interface CartOrderData {
  orderId: string;
  customerName: string;
  customerEmail: string;
  phone: string;
  shippingAddress: string;
  items: Array<{ name: string; size: string; quantity: number; unitPrice: number }>;
  subtotal: number;
  shippingCharge: number;
  totalAmount: number;
  orderDate: string; // ISO string
}

function buildCartOrderHtml(data: CartOrderData): string {
  const { orderId, customerName, phone, shippingAddress, items, subtotal, shippingCharge, totalAmount, orderDate } = data;

  const itemRows = items
    .map(
      (item) => `
      <tr>
        <td style="padding:10px 0;border-bottom:1px solid #f0e8d8;color:#2E5E2E;font-family:Georgia,serif;font-size:15px;">
          ${item.name} (${item.size})
        </td>
        <td style="padding:10px 0;border-bottom:1px solid #f0e8d8;text-align:center;color:#7a6b4e;font-size:14px;">
          × ${item.quantity}
        </td>
        <td style="padding:10px 0;border-bottom:1px solid #f0e8d8;text-align:right;color:#2E5E2E;font-weight:bold;font-size:14px;">
          ₹${item.unitPrice * item.quantity}
        </td>
      </tr>`
    )
    .join('');

  return `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Order Received — Delhi Wally</title>
</head>
<body style="margin:0;padding:0;background:#FFF8EF;font-family:Arial,Helvetica,sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background:#FFF8EF;padding:32px 16px;">
    <tr>
      <td align="center">
        <table width="600" cellpadding="0" cellspacing="0" style="background:#FFFDF8;border-radius:16px;border:1px solid #e8dcc8;max-width:600px;width:100%;">

          <!-- Header -->
          <tr>
            <td style="background:#2E5E2E;border-radius:16px 16px 0 0;padding:32px 40px;text-align:center;">
              <p style="margin:0 0 6px 0;font-family:Arial,sans-serif;font-size:11px;font-weight:700;letter-spacing:3px;text-transform:uppercase;color:#F2E6C9;opacity:0.7;">Pure Spices, True Love</p>
              <h1 style="margin:0;font-family:Georgia,'Times New Roman',serif;font-size:32px;font-weight:700;color:#F2E6C9;">Delhi Wally</h1>
            </td>
          </tr>

          <!-- Body -->
          <tr>
            <td style="padding:36px 40px;">

              <!-- Status badge -->
              <div style="background:rgba(122,163,62,0.12);border:1px solid rgba(122,163,62,0.3);border-radius:50px;display:inline-block;padding:6px 18px;margin-bottom:24px;">
                <span style="font-size:12px;font-weight:700;color:#7AA33E;text-transform:uppercase;letter-spacing:2px;">✓ Order Received</span>
              </div>

              <h2 style="margin:0 0 8px 0;font-family:Georgia,serif;font-size:26px;color:#2E5E2E;">Thank you, ${customerName}!</h2>
              <p style="margin:0 0 28px 0;font-size:15px;color:#7a6b4e;line-height:1.6;">
                We've received your order and will contact you shortly to confirm and arrange delivery.
              </p>

              <!-- Order meta -->
              <table width="100%" cellpadding="0" cellspacing="0" style="background:#FFF8EF;border-radius:10px;padding:20px;margin-bottom:28px;">
                <tr>
                  <td style="padding:4px 0;">
                    <span style="font-size:12px;color:#7a6b4e;">Order Ref</span><br/>
                    <strong style="font-size:14px;color:#2E5E2E;">${orderId}</strong>
                  </td>
                  <td style="padding:4px 0;">
                    <span style="font-size:12px;color:#7a6b4e;">Order Date</span><br/>
                    <strong style="font-size:14px;color:#2E5E2E;">${formatDate(orderDate)}</strong>
                  </td>
                  <td style="padding:4px 0;">
                    <span style="font-size:12px;color:#7a6b4e;">Phone</span><br/>
                    <strong style="font-size:14px;color:#2E5E2E;">${phone}</strong>
                  </td>
                </tr>
              </table>

              <!-- Items -->
              <h3 style="margin:0 0 12px 0;font-size:12px;font-weight:700;letter-spacing:2px;text-transform:uppercase;color:#7AA33E;">Your Spices</h3>
              <table width="100%" cellpadding="0" cellspacing="0">
                <thead>
                  <tr>
                    <th style="text-align:left;font-size:11px;color:#7a6b4e;font-weight:normal;padding-bottom:8px;border-bottom:2px solid #e8dcc8;">Product</th>
                    <th style="text-align:center;font-size:11px;color:#7a6b4e;font-weight:normal;padding-bottom:8px;border-bottom:2px solid #e8dcc8;">Qty</th>
                    <th style="text-align:right;font-size:11px;color:#7a6b4e;font-weight:normal;padding-bottom:8px;border-bottom:2px solid #e8dcc8;">Amount</th>
                  </tr>
                </thead>
                <tbody>
                  ${itemRows}
                </tbody>
              </table>

              <!-- Totals -->
              <table width="100%" cellpadding="0" cellspacing="0" style="margin-top:20px;">
                <tr>
                  <td style="padding:6px 0;font-size:14px;color:#7a6b4e;">Subtotal</td>
                  <td style="padding:6px 0;text-align:right;font-size:14px;color:#2E5E2E;">₹${subtotal}</td>
                </tr>
                <tr>
                  <td style="padding:6px 0;font-size:14px;color:#7a6b4e;">Shipping</td>
                  <td style="padding:6px 0;text-align:right;font-size:14px;color:#2E5E2E;">${shippingCharge === 0 ? 'FREE' : `₹${shippingCharge}`}</td>
                </tr>
                <tr>
                  <td colspan="2" style="border-top:2px solid #e8dcc8;padding-top:12px;"></td>
                </tr>
                <tr>
                  <td style="padding:4px 0;font-family:Georgia,serif;font-size:18px;font-weight:700;color:#2E5E2E;">Total</td>
                  <td style="padding:4px 0;text-align:right;font-family:Georgia,serif;font-size:20px;font-weight:700;color:#2E5E2E;">₹${totalAmount}</td>
                </tr>
              </table>

              <!-- Delivery address -->
              <div style="margin-top:28px;padding:16px 20px;background:#FFF8EF;border-radius:10px;border-left:3px solid #7AA33E;">
                <p style="margin:0 0 4px 0;font-size:11px;font-weight:700;letter-spacing:2px;text-transform:uppercase;color:#7AA33E;">Delivery Address</p>
                <p style="margin:0;font-size:14px;color:#2E5E2E;line-height:1.5;">${shippingAddress}</p>
              </div>

              <!-- Note -->
              <div style="margin-top:24px;padding:16px 20px;background:#fffbe8;border-radius:10px;border:1px solid rgba(122,163,62,0.2);">
                <p style="margin:0;font-size:14px;color:#7a6b4e;line-height:1.6;">
                  Our team will reach out to you at <strong>${phone}</strong> or via email to confirm your order and arrange payment &amp; delivery.
                </p>
              </div>

            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="padding:24px 40px;border-top:1px solid #e8dcc8;text-align:center;">
              <p style="margin:0 0 6px 0;font-size:13px;color:#7a6b4e;">
                Questions? Email us at
                <a href="mailto:${SUPPORT_EMAIL}" style="color:#7AA33E;text-decoration:none;">${SUPPORT_EMAIL}</a>
              </p>
              <p style="margin:0;font-size:12px;color:#b8a990;">
                © ${new Date().getFullYear()} Delhi Wally — <a href="${SITE_URL}" style="color:#b8a990;">${SITE_URL}</a>
              </p>
              <p style="margin:6px 0 0 0;font-size:11px;color:#b8a990;">FSSAI Lic. No. 23326003003695</p>
            </td>
          </tr>

        </table>
      </td>
    </tr>
  </table>
</body>
</html>`;
}

function buildCartOrderOwnerHtml(data: CartOrderData): string {
  const { orderId, customerName, customerEmail, phone, shippingAddress, items, subtotal, shippingCharge, totalAmount, orderDate } = data;

  const itemRows = items
    .map(
      (item) => `
      <tr>
        <td style="padding:8px 0;border-bottom:1px solid #f0e8d8;font-size:14px;color:#2E5E2E;">${item.name} (${item.size})</td>
        <td style="padding:8px 0;border-bottom:1px solid #f0e8d8;text-align:center;font-size:14px;color:#7a6b4e;">× ${item.quantity}</td>
        <td style="padding:8px 0;border-bottom:1px solid #f0e8d8;text-align:right;font-size:14px;font-weight:bold;color:#2E5E2E;">₹${item.unitPrice * item.quantity}</td>
      </tr>`
    )
    .join('');

  return `
<!DOCTYPE html>
<html lang="en">
<head><meta charset="UTF-8"/><title>New Order — Delhi Wally</title></head>
<body style="margin:0;padding:24px;background:#f8f5f0;font-family:Arial,sans-serif;">
  <table width="600" cellpadding="0" cellspacing="0" style="background:#fff;border-radius:12px;border:1px solid #e0d4c0;max-width:600px;margin:0 auto;">
    <tr>
      <td style="background:#2E5E2E;padding:24px 32px;border-radius:12px 12px 0 0;">
        <h2 style="margin:0;color:#F2E6C9;font-family:Georgia,serif;font-size:22px;">🛒 New Order Received</h2>
        <p style="margin:4px 0 0 0;color:#F2E6C9;opacity:0.7;font-size:13px;">Delhi Wally — ${formatDate(orderDate)} · Ref: ${orderId}</p>
      </td>
    </tr>
    <tr>
      <td style="padding:28px 32px;">
        <table width="100%" cellpadding="0" cellspacing="0">
          <tr><td style="padding:8px 0;border-bottom:1px solid #f0e8d8;">
            <strong style="font-size:12px;color:#7a6b4e;text-transform:uppercase;letter-spacing:1px;">Customer</strong><br/>
            <span style="font-size:15px;color:#2E5E2E;">${customerName}</span>
          </td></tr>
          <tr><td style="padding:8px 0;border-bottom:1px solid #f0e8d8;">
            <strong style="font-size:12px;color:#7a6b4e;text-transform:uppercase;letter-spacing:1px;">Email</strong><br/>
            <a href="mailto:${customerEmail}" style="font-size:15px;color:#7AA33E;">${customerEmail}</a>
          </td></tr>
          <tr><td style="padding:8px 0;border-bottom:1px solid #f0e8d8;">
            <strong style="font-size:12px;color:#7a6b4e;text-transform:uppercase;letter-spacing:1px;">Phone</strong><br/>
            <span style="font-size:15px;color:#2E5E2E;">${phone}</span>
          </td></tr>
          <tr><td style="padding:8px 0;border-bottom:1px solid #f0e8d8;">
            <strong style="font-size:12px;color:#7a6b4e;text-transform:uppercase;letter-spacing:1px;">Delivery Address</strong><br/>
            <span style="font-size:14px;color:#2E5E2E;">${shippingAddress}</span>
          </td></tr>
        </table>

        <h3 style="margin:24px 0 8px 0;font-size:12px;color:#7a6b4e;text-transform:uppercase;letter-spacing:1px;">Order Items</h3>
        <table width="100%" cellpadding="0" cellspacing="0">
          <thead>
            <tr>
              <th style="text-align:left;font-size:11px;color:#7a6b4e;font-weight:normal;padding-bottom:6px;border-bottom:2px solid #e8dcc8;">Product</th>
              <th style="text-align:center;font-size:11px;color:#7a6b4e;font-weight:normal;padding-bottom:6px;border-bottom:2px solid #e8dcc8;">Qty</th>
              <th style="text-align:right;font-size:11px;color:#7a6b4e;font-weight:normal;padding-bottom:6px;border-bottom:2px solid #e8dcc8;">Amount</th>
            </tr>
          </thead>
          <tbody>${itemRows}</tbody>
        </table>

        <table width="100%" cellpadding="0" cellspacing="0" style="margin-top:16px;">
          <tr><td style="padding:4px 0;font-size:14px;color:#7a6b4e;">Subtotal</td><td style="text-align:right;font-size:14px;color:#2E5E2E;">₹${subtotal}</td></tr>
          <tr><td style="padding:4px 0;font-size:14px;color:#7a6b4e;">Shipping</td><td style="text-align:right;font-size:14px;color:#2E5E2E;">${shippingCharge === 0 ? 'FREE' : `₹${shippingCharge}`}</td></tr>
          <tr><td colspan="2" style="border-top:2px solid #e8dcc8;padding-top:8px;"></td></tr>
          <tr><td style="font-size:16px;font-weight:bold;color:#2E5E2E;">Total</td><td style="text-align:right;font-size:18px;font-weight:bold;color:#2E5E2E;">₹${totalAmount}</td></tr>
        </table>

        <div style="margin-top:24px;">
          <a href="mailto:${customerEmail}" style="background:#2E5E2E;color:#F2E6C9;text-decoration:none;padding:10px 24px;border-radius:50px;font-size:13px;font-weight:700;">Reply to ${customerName}</a>
        </div>
      </td>
    </tr>
    <tr>
      <td style="padding:16px 32px;border-top:1px solid #e8dcc8;text-align:center;">
        <p style="margin:0;font-size:12px;color:#b8a990;">Delhi Wally — <a href="${SITE_URL}" style="color:#b8a990;">${SITE_URL}</a></p>
      </td>
    </tr>
  </table>
</body>
</html>`;
}

function buildCartOrderText(data: CartOrderData): string {
  const { orderId, customerName, phone, shippingAddress, items, subtotal, shippingCharge, totalAmount, orderDate } = data;
  const itemLines = items.map((i) => `  • ${i.name} (${i.size}) × ${i.quantity}  —  ₹${i.unitPrice * i.quantity}`).join('\n');
  return `
DELHI WALLY — Order Confirmation
================================

Hello ${customerName},

We've received your order! Our team will contact you shortly to confirm and arrange delivery.

ORDER DETAILS
-------------
Order Ref   : ${orderId}
Order Date  : ${formatDate(orderDate)}
Phone       : ${phone}

ITEMS ORDERED
-------------
${itemLines}

SUMMARY
-------
Subtotal    : ₹${subtotal}
Shipping    : ${shippingCharge === 0 ? 'FREE' : `₹${shippingCharge}`}
Total       : ₹${totalAmount}

DELIVERY ADDRESS
----------------
${shippingAddress}

QUESTIONS?
----------
Email  : ${SUPPORT_EMAIL}
Website: ${SITE_URL}

© ${new Date().getFullYear()} Delhi Wally — FSSAI Lic. No. 23326003003695
`.trim();
}

/**
 * Send a cart order email to both the business owner and the customer.
 * Used by the email-based checkout flow (no payment gateway).
 */
export async function sendCartOrder(data: CartOrderData): Promise<EmailResult> {
  try {
    const resend = getResend();

    // 1. Notify business owner
    const { error: ownerError } = await resend.emails.send({
      from: FROM_EMAIL,
      to: [SUPPORT_EMAIL],
      replyTo: data.customerEmail,
      subject: `New Order ${data.orderId} from ${data.customerName} — Delhi Wally`,
      html: buildCartOrderOwnerHtml(data),
      text: buildCartOrderText(data),
    });

    if (ownerError) {
      console.error('[email] sendCartOrder owner email failed:', ownerError);
      return { success: false, error: ownerError.message };
    }

    // 2. Send confirmation to customer
    const { data: result, error: customerError } = await resend.emails.send({
      from: FROM_EMAIL,
      to: [data.customerEmail],
      replyTo: SUPPORT_EMAIL,
      subject: `Order Received — Delhi Wally (${data.orderId})`,
      html: buildCartOrderHtml(data),
      text: buildCartOrderText(data),
    });

    if (customerError) {
      // Owner email already sent — log but don't fail
      console.error('[email] sendCartOrder customer email failed:', customerError);
    }

    return { success: true, emailId: result?.id };
  } catch (err) {
    const msg = err instanceof Error ? err.message : 'Unknown email error';
    console.error('[email] sendCartOrder exception:', msg);
    return { success: false, error: msg };
  }
}

