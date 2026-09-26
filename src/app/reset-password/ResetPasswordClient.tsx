'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Eye, EyeOff, Leaf, KeyRound, AlertCircle, CheckCircle2 } from 'lucide-react';
import { updatePassword } from '@/lib/auth';
import { toastSuccess } from '@/components/Toast';

export default function ResetPasswordClient() {
  const router = useRouter();
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});
  const [done, setDone] = useState(false);

  function validate() {
    const errs: Record<string, string> = {};
    if (!password) errs.password = 'New password is required.';
    else if (password.length < 8) errs.password = 'Password must be at least 8 characters.';
    if (!confirmPassword) errs.confirm = 'Please confirm your new password.';
    else if (password !== confirmPassword) errs.confirm = 'Passwords do not match.';
    setFieldErrors(errs);
    return Object.keys(errs).length === 0;
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError('');
    if (!validate()) return;

    setSubmitting(true);
    const result = await updatePassword(password);
    setSubmitting(false);

    if (!result.success) {
      setError(result.error ?? 'Failed to update password. The link may have expired.');
      return;
    }

    setDone(true);
    toastSuccess('Password updated successfully!');
    setTimeout(() => router.push('/login'), 2500);
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
          {done ? (
            <div className="text-center py-4">
              <div className="w-14 h-14 rounded-full bg-[#7AA33E]/15 flex items-center justify-center mx-auto mb-4">
                <CheckCircle2 className="w-7 h-7 text-[#7AA33E]" />
              </div>
              <h1 className="font-playfair font-bold text-[#2E5E2E] text-2xl mb-2">
                Password Updated
              </h1>
              <p className="font-lato text-sm text-[#7a6b4e] leading-relaxed">
                Your password has been changed. Redirecting you to sign in…
              </p>
            </div>
          ) : (
            <>
              <h1 className="font-playfair font-bold text-[#2E5E2E] text-2xl mb-1">
                Set new password
              </h1>
              <p className="font-lato text-sm text-[#7a6b4e] mb-6">
                Choose a strong password for your account.
              </p>

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
                  <label htmlFor="reset-password" className="block font-lato text-xs font-bold uppercase tracking-wider text-[#2E5E2E] mb-1.5">
                    New Password
                  </label>
                  <div className="relative">
                    <input
                      id="reset-password"
                      type={showPassword ? 'text' : 'password'}
                      autoComplete="new-password"
                      value={password}
                      onChange={(e) => { setPassword(e.target.value); setFieldErrors((p) => ({ ...p, password: '' })); }}
                      className="form-field pr-11"
                      placeholder="At least 8 characters"
                      disabled={submitting}
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
                    <p className="mt-1.5 font-lato text-xs text-red-500" role="alert">{fieldErrors.password}</p>
                  )}
                </div>

                <div>
                  <label htmlFor="reset-confirm" className="block font-lato text-xs font-bold uppercase tracking-wider text-[#2E5E2E] mb-1.5">
                    Confirm New Password
                  </label>
                  <div className="relative">
                    <input
                      id="reset-confirm"
                      type={showConfirm ? 'text' : 'password'}
                      autoComplete="new-password"
                      value={confirmPassword}
                      onChange={(e) => { setConfirmPassword(e.target.value); setFieldErrors((p) => ({ ...p, confirm: '' })); }}
                      className="form-field pr-11"
                      placeholder="Repeat new password"
                      disabled={submitting}
                      aria-invalid={Boolean(fieldErrors.confirm)}
                    />
                    <button
                      type="button"
                      onClick={() => setShowConfirm((v) => !v)}
                      className="absolute right-3.5 top-1/2 -translate-y-1/2 text-[#7a6b4e] hover:text-[#2E5E2E] transition-colors"
                      aria-label={showConfirm ? 'Hide confirmation' : 'Show confirmation'}
                    >
                      {showConfirm ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                  </div>
                  {fieldErrors.confirm && (
                    <p className="mt-1.5 font-lato text-xs text-red-500" role="alert">{fieldErrors.confirm}</p>
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
                      Updating password…
                    </>
                  ) : (
                    <>
                      <KeyRound className="w-4 h-4" />
                      Update Password
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
