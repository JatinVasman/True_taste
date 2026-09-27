'use client';

/**
 * CartProvider / CartManager — True Taste
 *
 * Provides the active cart store via CartStoreContext and manages
 * cart isolation across auth transitions.
 *
 * Auth event → cart action
 * ─────────────────────────────────────────────────────────────────────────
 * Initial load (guest)       active store = 'tt-cart:guest'
 * Login / session restore    snapshot guest items → build user store →
 *                            merge guest items → clear guest slot →
 *                            replace context (all consumers re-render)
 * Logout                     build fresh guest store → replace context
 * Switch A → B              handled by Supabase: logout fires → login fires
 * Browser refresh            onAuthStateChange fires once with restored session
 *
 * Isolation guarantee:
 *   User IDs come from Supabase auth (auth.uid() equivalent on client).
 *   localStorage keys are 'tt-cart:<userId>' — never email-based.
 *   A user NEVER sees another user's cart because each login rebuilds the
 *   Zustand store from *that user's own* localStorage slot.
 *
 * This component renders its children — mount it as a wrapper in layout.tsx.
 */

import { useState, useEffect, useRef, type ReactNode } from 'react';
import type { StoreApi } from 'zustand';
import { onAuthStateChange } from '@/lib/auth';
import {
  buildCartStore,
  readCartFromStorage,
  CartStoreContext,
  GUEST_CART_KEY,
  userCartKey,
  type CartState,
} from '@/lib/cart';

interface Props {
  children: ReactNode;
}

type CartStore = StoreApi<CartState>;

export function CartProvider({ children }: Props) {
  // The initial store is always a guest store.
  // CartManager will swap it immediately if a session already exists on mount.
  const [activeStore, setActiveStore] = useState<CartStore>(
    () => buildCartStore(GUEST_CART_KEY)
  );

  // Track which user ID the current active store belongs to.
  // null = guest store is active.
  const activeUserIdRef = useRef<string | null>(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChange((user) => {
      const nextUserId = user?.id ?? null;

      // No-op if the user hasn't changed (prevents redundant re-renders on
      // token refreshes and repeated SIGNED_IN events).
      if (nextUserId === activeUserIdRef.current) return;

      if (nextUserId) {
        // ── LOGIN / SESSION RESTORE ──────────────────────────────────────
        //
        // 1. Capture guest cart items ONLY when transitioning from guest→user.
        //    Never merge items from one user's session into another user's cart.
        const guestItems =
          activeUserIdRef.current === null
            ? readCartFromStorage(GUEST_CART_KEY)
            : [];

        // 2. Build the new user's store. persist() rehydrates from localStorage
        //    automatically, so the user's previous session cart is restored.
        const nextKey = userCartKey(nextUserId);
        const nextStore = buildCartStore(nextKey);

        // 3. Merge guest items (if any) into the now-restored user cart.
        if (guestItems.length > 0) {
          nextStore.getState().mergeWith(guestItems);
          // Clear the guest slot so items are not re-merged on next login.
          try { localStorage.removeItem(GUEST_CART_KEY); } catch { /* ignore */ }
        }

        // 4. Swap the context value — all useCartStore() consumers re-render.
        setActiveStore(() => nextStore);
      } else {
        // ── LOGOUT ──────────────────────────────────────────────────────
        //
        // Always start with a fresh empty guest cart.
        // The user's cart is safely preserved in 'tt-cart:<userId>'.
        const guestStore = buildCartStore(GUEST_CART_KEY);
        // Clear any stale guest-slot data from before this logout.
        try { localStorage.removeItem(GUEST_CART_KEY); } catch { /* ignore */ }
        setActiveStore(() => guestStore);
      }

      activeUserIdRef.current = nextUserId;
    });

    return () => { unsubscribe(); };
  }, []);

  return (
    <CartStoreContext.Provider value={activeStore}>
      {children}
    </CartStoreContext.Provider>
  );
}
