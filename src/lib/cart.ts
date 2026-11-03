/**
 * Cart store — Delhi Wally
 *
 * User isolation strategy
 * ───────────────────────
 * Each user gets their own localStorage slot:
 *   Guest              → 'tt-cart:guest'
 *   Authenticated user → 'tt-cart:<supabase-user-id>'
 *
 * How it works
 * ────────────
 * This module exports:
 *   - buildCartStore(key)        factory that creates a Zustand persist store
 *   - readCartFromStorage(key)   reads items from a slot without creating a store
 *   - useCartStore(selector)     hook that delegates to the CartContext
 *
 * The "active store" is held in CartContext (see CartProvider in CartManager.tsx).
 * CartManager listens for auth state changes and swaps the active store via context.
 * All consumers (useCartStore) are subscribed through context, so they re-render
 * automatically when the active store is replaced on login/logout.
 *
 * Security note: prices are stored from the official product catalog (products.ts).
 * The cart price is for DISPLAY only. The server must re-validate at checkout.
 */

'use client';

import { createContext, useContext } from 'react';
import type { StoreApi } from 'zustand';
import { createStore } from 'zustand/vanilla';
import { useStore } from 'zustand/react';
import { persist, createJSONStorage } from 'zustand/middleware';

// ── Types ──────────────────────────────────────────────────────────────────

export interface CartItem {
  /** Unique key = productId + ':' + size, e.g. '1:100g' */
  key: string;
  productId: string;
  slug: string;
  name: string;
  image: string;
  size: '50g' | '100g' | '200g';
  /** Price from official catalog at the moment item was added (INR) */
  unitPrice: number;
  quantity: number;
}

export interface CartState {
  items: CartItem[];
  addItem: (item: Omit<CartItem, 'key' | 'quantity'> & { quantity?: number }) => void;
  removeItem: (key: string) => void;
  setQuantity: (key: string, quantity: number) => void;
  increment: (key: string) => void;
  decrement: (key: string) => void;
  clearCart: () => void;
  mergeWith: (items: CartItem[]) => void;
  totalCount: () => number;
  subtotal: () => number;
}

// ── Constants ──────────────────────────────────────────────────────────────

const MAX_QUANTITY = 99;

export const GUEST_CART_KEY = 'tt-cart:guest';

export function userCartKey(userId: string): string {
  return `tt-cart:${userId}`;
}

// ── Store factory ──────────────────────────────────────────────────────────

export function buildCartStore(storageKey: string): StoreApi<CartState> {
  return createStore<CartState>()(
    persist(
      (set, get) => ({
        items: [],

        addItem: (incoming) => {
          const key = `${incoming.productId}:${incoming.size}`;
          const qtyToAdd = Math.max(1, Math.min(incoming.quantity ?? 1, MAX_QUANTITY));
          set((state) => {
            const existing = state.items.find((i) => i.key === key);
            if (existing) {
              return {
                items: state.items.map((i) =>
                  i.key === key
                    ? { ...i, quantity: Math.min(i.quantity + qtyToAdd, MAX_QUANTITY) }
                    : i
                ),
              };
            }
            return { items: [...state.items, { ...incoming, key, quantity: qtyToAdd }] };
          });
        },

        removeItem: (key) =>
          set((state) => ({ items: state.items.filter((i) => i.key !== key) })),

        setQuantity: (key, quantity) => {
          if (quantity <= 0) { get().removeItem(key); return; }
          set((state) => ({
            items: state.items.map((i) =>
              i.key === key ? { ...i, quantity: Math.min(quantity, MAX_QUANTITY) } : i
            ),
          }));
        },

        increment: (key) =>
          set((state) => ({
            items: state.items.map((i) =>
              i.key === key ? { ...i, quantity: Math.min(i.quantity + 1, MAX_QUANTITY) } : i
            ),
          })),

        decrement: (key) => {
          const item = get().items.find((i) => i.key === key);
          if (!item) return;
          if (item.quantity <= 1) { get().removeItem(key); }
          else {
            set((state) => ({
              items: state.items.map((i) =>
                i.key === key ? { ...i, quantity: i.quantity - 1 } : i
              ),
            }));
          }
        },

        clearCart: () => set({ items: [] }),

        mergeWith: (incoming) => {
          set((state) => {
            const merged = [...state.items];
            for (const incomingItem of incoming) {
              const idx = merged.findIndex((i) => i.key === incomingItem.key);
              if (idx >= 0) {
                merged[idx] = {
                  ...merged[idx],
                  quantity: Math.min(merged[idx].quantity + incomingItem.quantity, MAX_QUANTITY),
                };
              } else {
                merged.push(incomingItem);
              }
            }
            return { items: merged };
          });
        },

        totalCount: () => get().items.reduce((sum, i) => sum + i.quantity, 0),
        subtotal: () => get().items.reduce((sum, i) => sum + i.unitPrice * i.quantity, 0),
      }),
      {
        name: storageKey,
        storage: createJSONStorage(() => {
          if (typeof window === 'undefined') {
            return { getItem: () => null, setItem: () => {}, removeItem: () => {} };
          }
          return localStorage;
        }),
        partialize: (state) => ({ items: state.items }),
      }
    )
  );
}

// ── Storage helpers ────────────────────────────────────────────────────────

/**
 * Read raw items from a localStorage cart slot without creating a Zustand store.
 * Used by CartManager to snapshot the guest cart before a login swap.
 */
export function readCartFromStorage(storageKey: string): CartItem[] {
  if (typeof window === 'undefined') return [];
  try {
    const raw = localStorage.getItem(storageKey);
    if (!raw) return [];
    const parsed = JSON.parse(raw) as { state?: { items?: CartItem[] } };
    return Array.isArray(parsed?.state?.items) ? parsed.state.items : [];
  } catch {
    return [];
  }
}

// ── React context ──────────────────────────────────────────────────────────
//
// CartProvider always wraps the entire app tree before any consumer renders,
// so the null default is never actually accessed. We avoid calling
// buildCartStore() here because that would execute at module load time on
// the server, before localStorage exists.

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const CartStoreContext = createContext<StoreApi<CartState>>(null as any);

/**
 * Primary hook for all cart consumers.
 * Reads from whichever store is currently active in CartStoreContext.
 *
 * Usage (unchanged from before):
 *   const items = useCartStore((s) => s.items);
 *   const addItem = useCartStore((s) => s.addItem);
 */
export function useCartStore<T>(selector: (state: CartState) => T): T {
  const store = useContext(CartStoreContext);
  return useStore(store, selector);
}
