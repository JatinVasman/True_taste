import { type NextRequest, NextResponse } from 'next/server';

/**
 * Auth Callback Route — True Taste
 *
 * Supabase uses the PKCE flow by default (supabase-js v2).
 * After a user clicks a confirmation/reset email, Supabase redirects here
 * with a `code` query parameter. We exchange that code for a session and
 * then redirect to the intended page.
 *
 * If there is no code (direct navigation), redirect to home.
 */
export async function GET(request: NextRequest) {
  const { searchParams, origin } = new URL(request.url);
  const code = searchParams.get('code');
  // `next` lets us forward the user to a specific page after auth.
  // e.g. /auth/callback?next=/reset-password
  const next = searchParams.get('next') ?? '/account';

  if (code) {
    // Dynamically import supabase to avoid importing client modules in the
    // server-side route before the env check runs.
    const { createClient } = await import('@supabase/supabase-js');

    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

    if (!supabaseUrl || !supabaseAnonKey) {
      return NextResponse.redirect(`${origin}/?error=auth_config`);
    }

    const supabase = createClient(supabaseUrl, supabaseAnonKey, {
      auth: {
        persistSession: false, // Server context — no localStorage
      },
    });

    const { error } = await supabase.auth.exchangeCodeForSession(code);

    if (!error) {
      // Successful exchange — redirect to the intended page.
      // The cookie is set by Supabase SDK; the client will pick up the session.
      return NextResponse.redirect(`${origin}${next}`);
    }

    // Code exchange failed (expired, already used, etc.)
    const errorMessage = encodeURIComponent('Confirmation link expired or already used. Please try again.');
    return NextResponse.redirect(`${origin}/login?error=${errorMessage}`);
  }

  // No code — this shouldn't happen under normal circumstances.
  return NextResponse.redirect(`${origin}/`);
}
