'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Eye, EyeOff, Leaf, UserPlus, AlertCircle, CheckCircle2 } from 'lucide-react';
import { signUp } from '@/lib/auth';
import { useAuth } from '@/contexts/AuthContext';
import { isSupabaseConfigured } from '@/lib/supabase';

// ── Validation helpers ─────────────────────────────────────────────────────

function validateEmail(email: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

interface PasswordStrength {
  score: number; // 0-4
  label: string;
  color: string;
  hints: string[];
}

function checkPasswordStrength(pw: string): PasswordStrength {
  const hints: string[] = [];
  let score = 0;

  if (pw.length >= 8) score++;
  else hints.push('At least 8 characters');

  if (/[A-Z]/.test(pw)) score++;
  else hints.push('At least one uppercase letter');

  if (/[0-9]/.test(pw)) score++;
  else hints.push('At least one number');

  if (/[^A-Za-z0-9]/.test(pw)) score++;
  else hints.push('At least one special character');

  const labels = ['Too weak', 'Weak', 'Fair', 'Good', 'Strong'];
  const colors = ['#ef4444', '#f97316', '#eab308', '#7AA33E', '#2E5E2E'];

  return { score, label: labels[score], color: colors[score], hints };
}

// ── Component ──────────────────────────────────────────────────────────────

export default function SignupClient() {
  const router = useRouter();
  const { isAuthenticated, isLoading } = useAuth();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});
  const [success, setSuccess] = useState(false);

  const pwStrength = password ? checkPasswordStrength(password) : null;

  useEffect(() => {
    if (!isLoading && isAuthenticated) {
      router.replace('/account');
    }
  }, [isAuthenticated, isLoading, router]);

  function validate() {
    const errs: Record<string, string> = {};
    if (!name.trim()) errs.name = 'Full name is required.';
    if (!email.trim()) errs.email = 'Email address is required.';
    else if (!validateEmail(email)) errs.email = 'Please enter a valid email address.';
    if (!password) errs.password = 'Password is required.';
    else if (password.length < 8) errs.password = 'Password must be at least 8 characters.';
    if (!confirmPassword) errs.confirm = 'Please confirm your password.';
    else if (password !== confirmPassword) errs.confirm = 'Passwords do not match.';
    setFieldErrors(errs);
    return Object.keys(errs).length === 0;
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError('');
    if (!validate()) return;

    setSubmitting(true);
    const result = await signUp(name.trim(), email.trim(), password);
    setSubmitting(false);

    if (!result.success) {
      setError(result.error ?? 'Account creation failed. Please try again.');
      return;
    }

    setSuccess(true);
  }

  if (isLoading) return null;
  if (isAuthenticated) return null;

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

        <div
          className="bg-[#FFFDF8] rounded-2xl p-8 shadow-sm"
          style={{ border: '1px solid rgba(122,163,62,0.18)' }}
        >
          {success ? (
            /* ── Success state ── */
            <div className="text-center py-4">
              <div className="w-14 h-14 rounded-full bg-[#7AA33E]/15 flex items-center justify-center mx-auto mb-4">
                <CheckCircle2 className="w-7 h-7 text-[#7AA33E]" />
              </div>
              <h1 className="font-playfair font-bold text-[#2E5E2E] text-2xl mb-2">
                Account Created!
              </h1>
              <p className="font-lato text-sm text-[#7a6b4e] leading-relaxed mb-6">
                We&apos;ve sent a verification link to <strong className="text-[#2E5E2E]">{email}</strong>.
                Please check your inbox and verify your email before signing in.
              </p>
              <Link href="/login" className="btn-primary justify-center w-full">
                Go to Sign In
              </Link>
            </div>
          ) : (
            /* ── Form ── */
            <>
              <h1 className="font-playfair font-bold text-[#2E5E2E] text-2xl mb-1">
                Create your account
              </h1>
              <p className="font-lato text-sm text-[#7a6b4e] mb-6">
                Join True Taste — pure spices delivered to your door.
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
                    Authentication is not yet configured. Add Supabase credentials to <code className="font-mono bg-amber-100 px-1 rounded">.env.local</code> to enable account creation.
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
                {/* Name */}
                <div>
                  <label htmlFor="signup-name" className="block font-lato text-xs font-bold uppercase tracking-wider text-[#2E5E2E] mb-1.5">
                    Full Name
                  </label>
                  <input
                    id="signup-name"
                    type="text"
                    autoComplete="name"
                    value={name}
                    onChange={(e) => { setName(e.target.value); setFieldErrors((p) => ({ ...p, name: '' })); }}
                    className="form-field"
                    placeholder="Your full name"
                    disabled={submitting}
                    aria-invalid={Boolean(fieldErrors.name)}
                    aria-describedby={fieldErrors.name ? 'signup-name-err' : undefined}
                  />
                  {fieldErrors.name && (
                    <p id="signup-name-err" className="mt-1.5 font-lato text-xs text-red-500" role="alert">{fieldErrors.name}</p>
                  )}
                </div>

                {/* Email */}
                <div>
                  <label htmlFor="signup-email" className="block font-lato text-xs font-bold uppercase tracking-wider text-[#2E5E2E] mb-1.5">
                    Email Address
                  </label>
                  <input
                    id="signup-email"
                    type="email"
                    autoComplete="email"
                    value={email}
                    onChange={(e) => { setEmail(e.target.value); setFieldErrors((p) => ({ ...p, email: '' })); }}
                    className="form-field"
                    placeholder="you@example.com"
                    disabled={submitting}
                    aria-invalid={Boolean(fieldErrors.email)}
                    aria-describedby={fieldErrors.email ? 'signup-email-err' : undefined}
                  />
                  {fieldErrors.email && (
                    <p id="signup-email-err" className="mt-1.5 font-lato text-xs text-red-500" role="alert">{fieldErrors.email}</p>
                  )}
                </div>

                {/* Password */}
                <div>
                  <label htmlFor="signup-password" className="block font-lato text-xs font-bold uppercase tracking-wider text-[#2E5E2E] mb-1.5">
                    Password
                  </label>
                  <div className="relative">
                    <input
                      id="signup-password"
                      type={showPassword ? 'text' : 'password'}
                      autoComplete="new-password"
                      value={password}
                      onChange={(e) => { setPassword(e.target.value); setFieldErrors((p) => ({ ...p, password: '' })); }}
                      className="form-field pr-11"
                      placeholder="Create a strong password"
                      disabled={submitting}
                      aria-invalid={Boolean(fieldErrors.password)}
                      aria-describedby="signup-pw-strength"
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

                  {/* Password strength bar */}
                  {password && pwStrength && (
                    <div id="signup-pw-strength" className="mt-2" aria-label={`Password strength: ${pwStrength.label}`}>
                      <div className="flex gap-1 mb-1">
                        {[0, 1, 2, 3].map((i) => (
                          <div
                            key={i}
                            className="flex-1 h-1 rounded-full transition-colors duration-200"
                            style={{ background: i < pwStrength.score ? pwStrength.color : 'rgba(0,0,0,0.08)' }}
                          />
                        ))}
                      </div>
                      <p className="font-lato text-[0.68rem]" style={{ color: pwStrength.color }}>
                        {pwStrength.label}
                        {pwStrength.hints.length > 0 && (
                          <span className="text-[#7a6b4e]"> — {pwStrength.hints[0]}</span>
                        )}
                      </p>
                    </div>
                  )}

                  {fieldErrors.password && (
                    <p className="mt-1.5 font-lato text-xs text-red-500" role="alert">{fieldErrors.password}</p>
                  )}
                </div>

                {/* Confirm password */}
                <div>
                  <label htmlFor="signup-confirm" className="block font-lato text-xs font-bold uppercase tracking-wider text-[#2E5E2E] mb-1.5">
                    Confirm Password
                  </label>
                  <div className="relative">
                    <input
                      id="signup-confirm"
                      type={showConfirm ? 'text' : 'password'}
                      autoComplete="new-password"
                      value={confirmPassword}
                      onChange={(e) => { setConfirmPassword(e.target.value); setFieldErrors((p) => ({ ...p, confirm: '' })); }}
                      className="form-field pr-11"
                      placeholder="Repeat your password"
                      disabled={submitting}
                      aria-invalid={Boolean(fieldErrors.confirm)}
                      aria-describedby={fieldErrors.confirm ? 'signup-confirm-err' : undefined}
                    />
                    <button
                      type="button"
                      onClick={() => setShowConfirm((v) => !v)}
                      className="absolute right-3.5 top-1/2 -translate-y-1/2 text-[#7a6b4e] hover:text-[#2E5E2E] transition-colors"
                      aria-label={showConfirm ? 'Hide password confirmation' : 'Show password confirmation'}
                    >
                      {showConfirm ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                  </div>
                  {fieldErrors.confirm && (
                    <p id="signup-confirm-err" className="mt-1.5 font-lato text-xs text-red-500" role="alert">{fieldErrors.confirm}</p>
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
                      Creating account…
                    </>
                  ) : (
                    <>
                      <UserPlus className="w-4 h-4" />
                      Create Account
                    </>
                  )}
                </button>
              </form>

              <div className="mt-6 pt-5 border-t border-[#7AA33E]/15 text-center">
                <p className="font-lato text-xs text-[#7a6b4e]">
                  Already have an account?{' '}
                  <Link href="/login" className="font-bold text-[#2E5E2E] hover:text-[#7AA33E] transition-colors">
                    Sign in
                  </Link>
                </p>
              </div>
            </>
          )}
        </div>

        <p className="text-center mt-6 font-lato text-[0.65rem] text-[#7a6b4e] leading-relaxed">
          Your password is managed by Supabase Auth. True Taste never stores your password.
        </p>
      </div>
    </div>
  );
}
