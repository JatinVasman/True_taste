/**
 * Supabase client — True Taste
 *
 * Architecture: All Supabase interaction is imported from this single module.
 * When credentials are not available (env vars empty), supabaseClient is null.
 * Every service function must check for null and return a typed error.
 *
 * To connect Supabase: set NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY
 * in .env.local (see .env.local for instructions).
 */

import { createClient, type SupabaseClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

export const isSupabaseConfigured =
  Boolean(supabaseUrl) && Boolean(supabaseAnonKey);

// eslint-disable-next-line @typescript-eslint/no-explicit-any
let _client: SupabaseClient<any> | null = null;

function getClient() {
  if (!isSupabaseConfigured) return null;
  if (!_client) {
    _client = createClient(supabaseUrl!, supabaseAnonKey!, {
      auth: {
        persistSession: true,
        autoRefreshToken: true,
        detectSessionInUrl: true,
      },
    });
  }
  return _client;
}

export { getClient as getSupabaseClient };
