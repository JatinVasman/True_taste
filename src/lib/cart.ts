/**
 * Cart store — True Taste
 *
 * Uses Zustand with localStorage persistence via the zustand/middleware persist
 * module. Works for both guests and logged-in users.
 *
 * Guest cart: persisted to localStorage under key 'tt-cart'.
 * Logged-in cart: when Supabase is connected, the cart can be merged/synced
 * with the server-side cart. The merge logic is exposed here as mergeWith().
 *
 * Security note: prices are stored from the official product catalog
 * (src/lib/products.ts). The cart price is for DISPLAY only — the server
 * must re-validate product prices at checkout time. Never trust the cart
 * subtotal for payment processing.
 */

'use client';

import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

// ── Types ──────────────────────────────────────────────────────────────────

export interface CartItem {
  /** Unique key = productId + ':' + size, e.g. '1:100g' */
  key: string;
  productId: string;
  slug: string;
  name: string;
  /** Pack image for the selected size */
  image: string;
  size: '50g' | '100g' | '200g';
  /** Price from the official catalog at the moment item was added (INR) */
  unitPrice: number;
  quantity: number;
}

interface CartState {
  items: CartItem[];
  /** Add or increment an item. If same key exists, increments qty. */
  addItem: (item: Omit<CartItem, 'key' | 'quantity'> & { quantity?: number }) => void;
  /** Remove one item from the cart by key */
  removeItem: (key: string) => void;
  /** Set quantity for an item (removes if qty <= 0) */
  setQuantity: (key: string, quantity: number) => void;
  /** Increment by 1 */
  increment: (key: string) => void;
  /** Decrement by 1 (removes when qty reaches 0) */
  decrement: (key: string) => void;
  /** Remove all items */
  clearCart: () => void;
  /**
   * Merge a server-side cart (array of CartItems) into the local cart.
   * Called after login: local wins on quantity conflicts (adds quantities).
   */
  mergeWith: (serverItems: CartItem[]) => void;
  /** Computed: total item count (sum of all quantities) */
  totalCount: () => number;
  /** Computed: subtotal in INR */
  subtotal: () => number;
}

// ── Constants ──────────────────────────────────────────────────────────────

const MAX_QUANTITY = 99;
const CART_STORAGE_KEY = 'tt-cart';

// ── Store ──────────────────────────────────────────────────────────────────

export const useCartStore = create<CartState>()(
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
          return {
            items: [
              ...state.items,
              { ...incoming, key, quantity: qtyToAdd },
            ],
          };
        });
      },

      removeItem: (key) => {
        set((state) => ({
          items: state.items.filter((i) => i.key !== key),
        }));
      },

      setQuantity: (key, quantity) => {
        if (quantity <= 0) {
          get().removeItem(key);
          return;
        }
        const clampedQty = Math.min(quantity, MAX_QUANTITY);
        set((state) => ({
          items: state.items.map((i) =>
            i.key === key ? { ...i, quantity: clampedQty } : i
          ),
        }));
      },

      increment: (key) => {
        set((state) => ({
          items: state.items.map((i) =>
            i.key === key
              ? { ...i, quantity: Math.min(i.quantity + 1, MAX_QUANTITY) }
              : i
          ),
        }));
      },

      decrement: (key) => {
        const item = get().items.find((i) => i.key === key);
        if (!item) return;
        if (item.quantity <= 1) {
          get().removeItem(key);
        } else {
          set((state) => ({
            items: state.items.map((i) =>
              i.key === key ? { ...i, quantity: i.quantity - 1 } : i
            ),
          }));
        }
      },

      clearCart: () => set({ items: [] }),

      mergeWith: (serverItems) => {
        set((state) => {
          const merged = [...state.items];
          for (const serverItem of serverItems) {
            const existingIdx = merged.findIndex((i) => i.key === serverItem.key);
            if (existingIdx >= 0) {
              // Local wins: add quantities (local was in-session cart)
              merged[existingIdx] = {
                ...merged[existingIdx],
                quantity: Math.min(
                  merged[existingIdx].quantity + serverItem.quantity,
                  MAX_QUANTITY
                ),
              };
            } else {
              merged.push(serverItem);
            }
          }
          return { items: merged };
        });
      },

      totalCount: () => get().items.reduce((sum, i) => sum + i.quantity, 0),

      subtotal: () =>
        get().items.reduce((sum, i) => sum + i.unitPrice * i.quantity, 0),
    }),
    {
      name: CART_STORAGE_KEY,
      storage: createJSONStorage(() => {
        // Guard: on server, localStorage is not available
        if (typeof window === 'undefined') {
          return {
            getItem: () => null,
            setItem: () => {},
            removeItem: () => {},
          };
        }
        return localStorage;
      }),
      // Only persist the items array — computed functions are not serialisable
      partialize: (state) => ({ items: state.items }),
    }
  )
);
