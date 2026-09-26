'use client';

/**
 * AuthContext — True Taste
 *
 * Provides the current auth user across the whole app.
 * Uses the auth service layer (src/lib/auth.ts) — never calls Supabase directly.
 *
 * Wraps the entire app in layout.tsx via AuthProvider.
 */

import {
  createContext,
  useContext,
  useEffect,
  useState,
  useCallback,
  type ReactNode,
} from 'react';
import { onAuthStateChange, signOut as authSignOut, type User } from '@/lib/auth';

interface AuthContextValue {
  user: User | null;
  /** True during the initial session load (prevents flash of wrong state) */
  isLoading: boolean;
  isAuthenticated: boolean;
  signOut: () => Promise<void>;
}

const AuthContext = createContext<AuthContextValue>({
  user: null,
  isLoading: true,
  isAuthenticated: false,
  signOut: async () => {},
});

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Subscribe to auth state changes
    const unsubscribe = onAuthStateChange((u) => {
      setUser(u);
      setIsLoading(false);
    });

    // Fallback: if Supabase not configured, resolve immediately
    const timeout = setTimeout(() => setIsLoading(false), 500);

    return () => {
      unsubscribe();
      clearTimeout(timeout);
    };
  }, []);

  const signOut = useCallback(async () => {
    await authSignOut();
    setUser(null);
  }, []);

  return (
    <AuthContext.Provider
      value={{
        user,
        isLoading,
        isAuthenticated: Boolean(user),
        signOut,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
