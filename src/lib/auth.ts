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

// ── Helpers ────────────────────────────────────────────────────────────────

/** Returns a clean, user-safe error message from Supabase auth errors. */
function sanitizeAuthError(message: string): string {
  // Avoid exposing implementation details or enumerating whether emails exist
  const lower = message.toLowerCase();

  if (lower.includes('invalid login credentials') || lower.includes('invalid password')) {
    return 'Incorrect email or password. Please try again.';
  }
  if (lower.includes('email not confirmed')) {
    return 'Please verify your email address before signing in.';
  }
  if (lower.includes('user already registered') || lower.includes('already been registered')) {
    return 'An account with this email address already exists.';
  }
  if (lower.includes('password should be at least')) {
    return 'Password must be at least 8 characters long.';
  }
  if (lower.includes('rate limit') || lower.includes('too many requests')) {
    return 'Too many attempts. Please wait a few minutes and try again.';
  }
  if (lower.includes('network') || lower.includes('fetch') || lower.includes('failed to fetch')) {
    return 'Network error. Please check your connection and try again.';
  }
  if (lower.includes('token has expired') || lower.includes('expired')) {
    return 'This link has expired. Please request a new one.';
  }
  if (lower.includes('invalid token') || lower.includes('invalid')) {
    return 'This link is invalid or has already been used.';
  }

  // Generic fallback — do not expose raw Supabase messages
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
      emailRedirectTo: `${process.env.NEXT_PUBLIC_SITE_URL ?? ''}/account`,
    },
  });

  if (error) return { success: false, error: sanitizeAuthError(error.message) };

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

  if (error) return { success: false, error: sanitizeAuthError(error.message) };

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
  if (error) return { success: false, error: sanitizeAuthError(error.message) };

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
    redirectTo: `${process.env.NEXT_PUBLIC_SITE_URL ?? ''}/reset-password`,
  });

  // Always return success — do NOT reveal if email exists
  return { success: true };
}

export async function updatePassword(newPassword: string): Promise<AuthResult> {
  if (!isSupabaseConfigured) return notConfigured();
  const supabase = getSupabaseClient()!;

  const { data, error } = await supabase.auth.updateUser({ password: newPassword });

  if (error) return { success: false, error: sanitizeAuthError(error.message) };

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
