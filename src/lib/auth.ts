/**
 * Auth service layer — True Taste
 *
 * All authentication operations go through this module.
 * The UI never calls Supabase directly — it calls these functions.
 *
 * When Supabase is not configured (env vars missing), every function
 * returns a clear ServiceUnavailable error — no fake success, no password
 * stored locally.
 *
 * When Supabase IS configured, all auth is delegated to Supabase Auth.
 * Passwords are NEVER stored by this application.
 */

import { getSupabaseClient, isSupabaseConfigured } from './supabase';
import type { User, Session } from '@supabase/supabase-js';

// ── Types ──────────────────────────────────────────────────────────────────

export interface AuthResult {
  success: boolean;
  error?: string;
  user?: User | null;
  session?: Session | null;
}

export type { User, Session };

// ── Error sanitizers ───────────────────────────────────────────────────────

/**
 * Sanitizes errors from signInWithPassword().
 * Never maps anything to a "link" error — login has no links.
 */
function sanitizeSignInError(message: string): string {
  const lower = message.toLowerCase();

  // Supabase returns "Invalid login credentials" for wrong email/password.
  // Must be checked before any generic 'invalid' check.
  if (lower.includes('invalid login credentials') || lower.includes('invalid password')) {
    return 'Incorrect email or password. Please try again.';
  }
  if (lower.includes('email not confirmed')) {
    return 'Please verify your email address before signing in.';
  }
  // email_provider_disabled — Email logins are disabled in Supabase dashboard
  if (lower.includes('email logins are disabled') || lower.includes('email provider disabled')) {
    return 'Email sign-in is not enabled. Please contact support.';
  }
  if (lower.includes('rate limit') || lower.includes('too many requests')) {
    return 'Too many sign-in attempts. Please wait a few minutes and try again.';
  }
  if (lower.includes('network') || lower.includes('fetch') || lower.includes('failed to fetch')) {
    return 'Network error. Please check your connection and try again.';
  }

  return 'Sign in failed. Please try again.';
}

/**
 * Sanitizes errors from signUp().
 * Never maps anything to a "link" error — signup has no links.
 */
function sanitizeSignUpError(message: string): string {
  const lower = message.toLowerCase();

  if (lower.includes('user already registered') || lower.includes('already been registered') || lower.includes('already registered')) {
    return 'An account with this email address already exists.';
  }
  if (lower.includes('password should be at least') || lower.includes('password must be')) {
    return 'Password must be at least 8 characters long.';
  }
  if (lower.includes('invalid email') || lower.includes('unable to validate')) {
    return 'Please enter a valid email address.';
  }
  // email_provider_disabled — Email signups are disabled in Supabase dashboard
  if (lower.includes('email signups are disabled') || lower.includes('email provider disabled')) {
    return 'Email sign-up is not enabled. Please contact support.';
  }
  if (lower.includes('rate limit') || lower.includes('too many requests')) {
    return 'Too many attempts. Please wait a few minutes and try again.';
  }
  if (lower.includes('network') || lower.includes('fetch') || lower.includes('failed to fetch')) {
    return 'Network error. Please check your connection and try again.';
  }

  return 'Account creation failed. Please try again.';
}

/**
 * Sanitizes errors from token/link operations:
 * updatePassword, and any token-exchange flows.
 * The 'invalid' catch-all is ONLY appropriate here.
 */
function sanitizeTokenError(message: string): string {
  const lower = message.toLowerCase();

  if (lower.includes('token has expired') || lower.includes('expired')) {
    return 'This link has expired. Please request a new one.';
  }
  if (lower.includes('invalid token') || lower.includes('invalid')) {
    return 'This link is invalid or has already been used.';
  }
  if (lower.includes('rate limit') || lower.includes('too many requests')) {
    return 'Too many attempts. Please wait a few minutes and try again.';
  }
  if (lower.includes('network') || lower.includes('fetch') || lower.includes('failed to fetch')) {
    return 'Network error. Please check your connection and try again.';
  }

  return 'Something went wrong. Please try again.';
}

function notConfigured(): AuthResult {
  return {
    success: false,
    error:
      'Authentication service is not configured yet. ' +
      'Please add Supabase credentials to connect the auth system.',
  };
}

// ── Auth operations ────────────────────────────────────────────────────────

export async function signUp(
  name: string,
  email: string,
  password: string
): Promise<AuthResult> {
  if (!isSupabaseConfigured) return notConfigured();
  const supabase = getSupabaseClient()!;

  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: { display_name: name, full_name: name },
      // Points to /auth/callback so the PKCE code can be exchanged for a session.
      emailRedirectTo: `${process.env.NEXT_PUBLIC_SITE_URL ?? ''}/auth/callback`,
    },
  });

  if (error) return { success: false, error: sanitizeSignUpError(error.message) };

  return {
    success: true,
    user: data.user,
    session: data.session,
  };
}

export async function signIn(
  email: string,
  password: string
): Promise<AuthResult> {
  if (!isSupabaseConfigured) return notConfigured();
  const supabase = getSupabaseClient()!;

  const { data, error } = await supabase.auth.signInWithPassword({ email, password });

  if (error) return { success: false, error: sanitizeSignInError(error.message) };

  return {
    success: true,
    user: data.user,
    session: data.session,
  };
}

export async function signOut(): Promise<AuthResult> {
  if (!isSupabaseConfigured) return notConfigured();
  const supabase = getSupabaseClient()!;

  const { error } = await supabase.auth.signOut();
  if (error) return { success: false, error: 'Sign out failed. Please try again.' };

  return { success: true };
}

/**
 * Request a password reset email.
 * NOTE: We always return success=true even if the email doesn't exist,
 * to avoid revealing whether an account is registered (anti-enumeration).
 */
export async function requestPasswordReset(email: string): Promise<AuthResult> {
  if (!isSupabaseConfigured) return notConfigured();
  const supabase = getSupabaseClient()!;

  await supabase.auth.resetPasswordForEmail(email, {
    redirectTo: `${process.env.NEXT_PUBLIC_SITE_URL ?? ''}/auth/callback?next=/reset-password`,
  });

  // Always return success — do NOT reveal if email exists
  return { success: true };
}

export async function updatePassword(newPassword: string): Promise<AuthResult> {
  if (!isSupabaseConfigured) return notConfigured();
  const supabase = getSupabaseClient()!;

  const { data, error } = await supabase.auth.updateUser({ password: newPassword });

  if (error) return { success: false, error: sanitizeTokenError(error.message) };

  return { success: true, user: data.user };
}

export async function getSession(): Promise<{ session: Session | null; user: User | null }> {
  if (!isSupabaseConfigured) return { session: null, user: null };
  const supabase = getSupabaseClient()!;

  const { data } = await supabase.auth.getSession();
  return {
    session: data.session,
    user: data.session?.user ?? null,
  };
}

export async function getUser(): Promise<User | null> {
  const { user } = await getSession();
  return user;
}

/**
 * Subscribe to auth state changes.
 * Returns an unsubscribe function.
 */
export function onAuthStateChange(
  callback: (user: User | null) => void
): () => void {
  if (!isSupabaseConfigured) {
    callback(null);
    return () => {};
  }
  const supabase = getSupabaseClient()!;

  const { data } = supabase.auth.onAuthStateChange((_event, session) => {
    callback(session?.user ?? null);
  });

  return () => data.subscription.unsubscribe();
}
