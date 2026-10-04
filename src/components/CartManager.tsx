'use client';

/**
 * CartProvider — True Taste
 *
 * Provides the active cart store via CartStoreContext.
 * Uses a single persistent guest cart (no user-based isolation needed
 * since login/auth has been removed from the app).
 *
 * This component renders its children — mount it as a wrapper in layout.tsx.
 */

import { type ReactNode } from 'react';
import { buildCartStore, CartStoreContext, GUEST_CART_KEY } from '@/lib/cart';

const cartStore = buildCartStore(GUEST_CART_KEY);

export function CartProvider({ children }: { children: ReactNode }) {
  return (
    <CartStoreContext.Provider value={cartStore}>
      {children}
    </CartStoreContext.Provider>
  );
}
