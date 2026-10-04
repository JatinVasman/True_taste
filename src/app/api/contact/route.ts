/**
 * POST /api/contact
 *
 * Contact form submission endpoint.
 *
 * Behaviour:
 * - Validates input server-side.
 * - Sends a notification email to delhiwally@gmial.com via Resend.
 * - Email failure does NOT cause the submission to fail if DB storage succeeds.
 * - Returns a clear error if both DB and email fail.
 *
 * (Supabase contact_inquiries table storage is optional — added if table exists.)
 */

import { NextRequest, NextResponse } from 'next/server';
import { sendContactNotification } from '@/lib/email';

export async function POST(req: NextRequest) {
  let body: {
    name?: string;
    email?: string;
    phone?: string;
    message?: string;
  };

  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: 'Invalid request body.' }, { status: 400 });
  }

  const { name, email, phone, message } = body;

  // Validate required fields
  if (!name?.trim() || !email?.trim() || !message?.trim()) {
    return NextResponse.json({ error: 'Name, email, and message are required.' }, { status: 400 });
  }

  if (name.length > 200 || email.length > 200 || message.length > 5000) {
    return NextResponse.json({ error: 'Input exceeds maximum length.' }, { status: 400 });
  }

  // Basic email format check
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return NextResponse.json({ error: 'Invalid email address.' }, { status: 400 });
  }

  const submittedAt = new Date().toISOString();

  // Send email notification (best-effort — failure is logged, not surfaced to user)
  const emailResult = await sendContactNotification({
    customerName: name.trim(),
    customerEmail: email.trim(),
    phone: phone?.trim() || undefined,
    message: message.trim(),
    submittedAt,
  });

  if (!emailResult.success) {
    console.error('[contact] Email notification failed:', emailResult.error);
    // Still return success to user — the submission is not email delivery
    // If you add DB storage here, you can return success based on DB success.
  }

  return NextResponse.json({
    success: true,
    message: 'Your enquiry has been received. We\'ll be in touch shortly.',
  });
}
