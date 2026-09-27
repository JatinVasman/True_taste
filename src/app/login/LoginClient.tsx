'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import { Eye, EyeOff, Leaf, LogIn, AlertCircle } from 'lucide-react';
import { signIn } from '@/lib/auth';
import { useAuth } from '@/contexts/AuthContext';
import { toastSuccess } from '@/components/Toast';
import { isSupabaseConfigured } from '@/lib/supabase';

function validateEmail(email: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

export default function LoginClient() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { isAuthenticated, isLoading } = useAuth();

  const redirectTo = searchParams.get('redirect') ?? '/account';
  // Initialize error from callback redirect param (e.g. expired confirmation link)
  const urlError = searchParams.get('error') ?? '';

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState(() =>
    urlError ? decodeURIComponent(urlError) : ''
  );
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});

  // Redirect already-authenticated users
  useEffect(() => {
    if (!isLoading && isAuthenticated) {
      router.replace(redirectTo);
    }
  }, [isAuthenticated, isLoading, router, redirectTo]);


  function validate() {
    const errs: Record<string, string> = {};
    if (!email.trim()) errs.email = 'Email address is required.';
    else if (!validateEmail(email)) errs.email = 'Please enter a valid email address.';
    if (!password) errs.password = 'Password is required.';
    setFieldErrors(errs);
    return Object.keys(errs).length === 0;
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError('');
    if (!validate()) return;

    setSubmitting(true);
    const result = await signIn(email.trim(), password);
    setSubmitting(false);

    if (!result.success) {
      setError(result.error ?? 'Sign in failed. Please try again.');
      return;
    }

    toastSuccess('Welcome back to True Taste!');
    router.push(redirectTo);
  }

  if (isLoading) return null;
  if (isAuthenticated) return null;

  return (
    <div className="min-h-screen bg-[#FFF8EF] flex flex-col items-center justify-center px-4 py-24">
      {/* Background radial */}
      <div
        className="fixed inset-0 pointer-events-none"
        style={{
          background:
            'radial-gradient(ellipse 70% 60% at 50% 0%, rgba(242,230,201,0.55) 0%, transparent 70%)',
        }}
      />

      <div className="relative z-10 w-full max-w-md">
        {/* Brand mark */}
        <Link href="/" className="flex flex-col items-center mb-8 group" aria-label="True Taste">
          <div
            className="w-12 h-12 rounded-full flex items-center justify-center mb-3 transition-transform duration-300 group-hover:scale-110"
            style={{ background: '#2E5E2E' }}
          >
            <Leaf className="w-5 h-5 text-[#F2E6C9]" strokeWidth={2.2} />
          </div>
          <span className="font-playfair font-bold text-[#2E5E2E] text-xl">True Taste</span>
          <span className="font-lato text-[0.6rem] tracking-[0.2em] uppercase text-[#7AA33E] font-bold mt-0.5">
            Pure Spices · True Flavors
          </span>
        </Link>

        {/* Card */}
        <div
          className="bg-[#FFFDF8] rounded-2xl p-8 shadow-sm"
          style={{ border: '1px solid rgba(122,163,62,0.18)' }}
        >
          <h1 className="font-playfair font-bold text-[#2E5E2E] text-2xl mb-1">
            Welcome back
          </h1>
          <p className="font-lato text-sm text-[#7a6b4e] mb-6">
            Sign in to your True Taste account.
          </p>

          {/* Supabase not configured banner */}
          {!isSupabaseConfigured && (
            <div
              className="flex items-start gap-3 p-3.5 rounded-xl mb-5"
              style={{ background: 'rgba(255,193,7,0.1)', border: '1px solid rgba(255,193,7,0.3)' }}
              role="status"
            >
              <AlertCircle className="w-4 h-4 text-amber-600 flex-shrink-0 mt-0.5" />
              <p className="font-lato text-xs text-amber-700 leading-relaxed">
                Authentication is not yet configured. Add Supabase credentials to <code className="font-mono bg-amber-100 px-1 rounded">.env.local</code> to enable sign-in.
              </p>
            </div>
          )}

          {/* Global error */}
          {error && (
            <div
              className="flex items-start gap-3 p-3.5 rounded-xl mb-5"
              style={{ background: 'rgba(220,38,38,0.06)', border: '1px solid rgba(220,38,38,0.2)' }}
              role="alert"
            >
              <AlertCircle className="w-4 h-4 text-red-500 flex-shrink-0 mt-0.5" />
              <p className="font-lato text-xs text-red-600 leading-relaxed">{error}</p>
            </div>
          )}

          <form onSubmit={handleSubmit} noValidate className="space-y-4">
            {/* Email */}
            <div>
              <label htmlFor="login-email" className="block font-lato text-xs font-bold uppercase tracking-wider text-[#2E5E2E] mb-1.5">
                Email Address
              </label>
              <input
                id="login-email"
                type="email"
                autoComplete="email"
                value={email}
                onChange={(e) => { setEmail(e.target.value); setFieldErrors((p) => ({ ...p, email: '' })); setError(''); }}
                className="form-field"
                placeholder="you@example.com"
                disabled={submitting}
                aria-describedby={fieldErrors.email ? 'login-email-err' : undefined}
                aria-invalid={Boolean(fieldErrors.email)}
              />
              {fieldErrors.email && (
                <p id="login-email-err" className="mt-1.5 font-lato text-xs text-red-500" role="alert">
                  {fieldErrors.email}
                </p>
              )}
            </div>

            {/* Password */}
            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label htmlFor="login-password" className="font-lato text-xs font-bold uppercase tracking-wider text-[#2E5E2E]">
                  Password
                </label>
                <Link href="/forgot-password" className="font-lato text-xs text-[#7AA33E] hover:text-[#2E5E2E] transition-colors">
                  Forgot password?
                </Link>
              </div>
              <div className="relative">
                <input
                  id="login-password"
                  type={showPassword ? 'text' : 'password'}
                  autoComplete="current-password"
                  value={password}
                  onChange={(e) => { setPassword(e.target.value); setFieldErrors((p) => ({ ...p, password: '' })); setError(''); }}
                  className="form-field pr-11"
                  placeholder="Enter your password"
                  disabled={submitting}
                  aria-describedby={fieldErrors.password ? 'login-pw-err' : undefined}
                  aria-invalid={Boolean(fieldErrors.password)}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword((v) => !v)}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-[#7a6b4e] hover:text-[#2E5E2E] transition-colors"
                  aria-label={showPassword ? 'Hide password' : 'Show password'}
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
              {fieldErrors.password && (
                <p id="login-pw-err" className="mt-1.5 font-lato text-xs text-red-500" role="alert">
                  {fieldErrors.password}
                </p>
              )}
            </div>

            <button
              type="submit"
              disabled={submitting}
              className="btn-primary w-full justify-center mt-2"
              style={{ opacity: submitting ? 0.7 : 1 }}
            >
              {submitting ? (
                <>
                  <span className="inline-block w-3.5 h-3.5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  Signing in…
                </>
              ) : (
                <>
                  <LogIn className="w-4 h-4" />
                  Sign In
                </>
              )}
            </button>
          </form>

          <div className="mt-6 pt-5 border-t border-[#7AA33E]/15 text-center">
            <p className="font-lato text-xs text-[#7a6b4e]">
              New to True Taste?{' '}
              <Link href="/signup" className="font-bold text-[#2E5E2E] hover:text-[#7AA33E] transition-colors">
                Create an account
              </Link>
            </p>
          </div>
        </div>

        <p className="text-center mt-6 font-lato text-[0.65rem] text-[#7a6b4e] leading-relaxed">
          Your account is secured by Supabase Auth. We never store your password.
        </p>
      </div>
    </div>
  );
}
