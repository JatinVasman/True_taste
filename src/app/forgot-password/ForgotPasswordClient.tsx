'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Leaf, Mail, AlertCircle, CheckCircle2, ArrowLeft } from 'lucide-react';
import { requestPasswordReset } from '@/lib/auth';
import { isSupabaseConfigured } from '@/lib/supabase';

function validateEmail(email: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

export default function ForgotPasswordClient() {
  const [email, setEmail] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');
  const [fieldError, setFieldError] = useState('');
  const [sent, setSent] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError('');
    setFieldError('');

    if (!email.trim()) {
      setFieldError('Email address is required.');
      return;
    }
    if (!validateEmail(email)) {
      setFieldError('Please enter a valid email address.');
      return;
    }

    setSubmitting(true);
    const result = await requestPasswordReset(email.trim());
    setSubmitting(false);

    if (!result.success) {
      setError(result.error ?? 'Something went wrong. Please try again.');
      return;
    }

    setSent(true);
  }

  return (
    <div className="min-h-screen bg-[#FFF8EF] flex flex-col items-center justify-center px-4 py-24">
      <div
        className="fixed inset-0 pointer-events-none"
        style={{
          background:
            'radial-gradient(ellipse 70% 60% at 50% 0%, rgba(242,230,201,0.55) 0%, transparent 70%)',
        }}
      />

      <div className="relative z-10 w-full max-w-md">
        <Link href="/" className="flex flex-col items-center mb-8 group" aria-label="True Taste">
          <div
            className="w-12 h-12 rounded-full flex items-center justify-center mb-3 transition-transform duration-300 group-hover:scale-110"
            style={{ background: '#2E5E2E' }}
          >
            <Leaf className="w-5 h-5 text-[#F2E6C9]" strokeWidth={2.2} />
          </div>
          <span className="font-playfair font-bold text-[#2E5E2E] text-xl">True Taste</span>
        </Link>

        <div
          className="bg-[#FFFDF8] rounded-2xl p-8 shadow-sm"
          style={{ border: '1px solid rgba(122,163,62,0.18)' }}
        >
          {sent ? (
            <div className="text-center py-4">
              <div className="w-14 h-14 rounded-full bg-[#7AA33E]/15 flex items-center justify-center mx-auto mb-4">
                <CheckCircle2 className="w-7 h-7 text-[#7AA33E]" />
              </div>
              <h1 className="font-playfair font-bold text-[#2E5E2E] text-2xl mb-2">
                Check your inbox
              </h1>
              <p className="font-lato text-sm text-[#7a6b4e] leading-relaxed mb-6">
                If an account exists for <strong className="text-[#2E5E2E]">{email}</strong>,
                you&apos;ll receive a password reset link shortly. Check your spam folder too.
              </p>
              <Link href="/login" className="btn-primary justify-center w-full">
                <ArrowLeft className="w-4 h-4" />
                Back to Sign In
              </Link>
            </div>
          ) : (
            <>
              <Link
                href="/login"
                className="inline-flex items-center gap-1.5 font-lato text-xs text-[#7AA33E] hover:text-[#2E5E2E] transition-colors mb-5"
              >
                <ArrowLeft className="w-3.5 h-3.5" />
                Back to sign in
              </Link>

              <h1 className="font-playfair font-bold text-[#2E5E2E] text-2xl mb-1">
                Reset your password
              </h1>
              <p className="font-lato text-sm text-[#7a6b4e] mb-6">
                Enter your email and we&apos;ll send you a reset link.
              </p>

              {!isSupabaseConfigured && (
                <div
                  className="flex items-start gap-3 p-3.5 rounded-xl mb-5"
                  style={{ background: 'rgba(255,193,7,0.1)', border: '1px solid rgba(255,193,7,0.3)' }}
                  role="status"
                >
                  <AlertCircle className="w-4 h-4 text-amber-600 flex-shrink-0 mt-0.5" />
                  <p className="font-lato text-xs text-amber-700 leading-relaxed">
                    Authentication is not yet configured. Add Supabase credentials to <code className="font-mono bg-amber-100 px-1 rounded">.env.local</code>.
                  </p>
                </div>
              )}

              {error && (
                <div
                  className="flex items-start gap-3 p-3.5 rounded-xl mb-5"
                  style={{ background: 'rgba(220,38,38,0.06)', border: '1px solid rgba(220,38,38,0.2)' }}
                  role="alert"
                >
                  <AlertCircle className="w-4 h-4 text-red-500 flex-shrink-0 mt-0.5" />
                  <p className="font-lato text-xs text-red-600">{error}</p>
                </div>
              )}

              <form onSubmit={handleSubmit} noValidate className="space-y-4">
                <div>
                  <label htmlFor="forgot-email" className="block font-lato text-xs font-bold uppercase tracking-wider text-[#2E5E2E] mb-1.5">
                    Email Address
                  </label>
                  <input
                    id="forgot-email"
                    type="email"
                    autoComplete="email"
                    value={email}
                    onChange={(e) => { setEmail(e.target.value); setFieldError(''); }}
                    className="form-field"
                    placeholder="you@example.com"
                    disabled={submitting}
                    aria-invalid={Boolean(fieldError)}
                    aria-describedby={fieldError ? 'forgot-email-err' : undefined}
                  />
                  {fieldError && (
                    <p id="forgot-email-err" className="mt-1.5 font-lato text-xs text-red-500" role="alert">{fieldError}</p>
                  )}
                </div>

                <button
                  type="submit"
                  disabled={submitting}
                  className="btn-primary w-full justify-center"
                  style={{ opacity: submitting ? 0.7 : 1 }}
                >
                  {submitting ? (
                    <>
                      <span className="inline-block w-3.5 h-3.5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                      Sending reset link…
                    </>
                  ) : (
                    <>
                      <Mail className="w-4 h-4" />
                      Send Reset Link
                    </>
                  )}
                </button>
              </form>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
