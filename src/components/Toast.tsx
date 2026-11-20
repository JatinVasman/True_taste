'use client';

/**
 * Toast notification system — Delhi Wally
 *
 * Lightweight, no extra dependency. Driven by a simple Zustand store.
 * Renders at the top-level via <ToastContainer /> mounted in layout.
 */

import { create } from 'zustand';
import { useEffect } from 'react';
import { CheckCircle2, XCircle, Info, X } from 'lucide-react';

import Link from 'next/link';

// ── Store ──────────────────────────────────────────────────────────────────

type ToastType = 'success' | 'error' | 'info';

export interface ToastAction {
  label: string;
  onClick?: () => void;
  href?: string;
}

interface Toast {
  id: string;
  type: ToastType;
  message: string;
  duration?: number;
  action?: ToastAction;
}

interface ToastStore {
  toasts: Toast[];
  add: (toast: Omit<Toast, 'id'>) => string;
  remove: (id: string) => void;
}

export const useToastStore = create<ToastStore>((set) => ({
  toasts: [],
  add: (toast) => {
    const id = Math.random().toString(36).slice(2);
    set((s) => ({ toasts: [...s.toasts, { ...toast, id }] }));
    return id;
  },
  remove: (id) =>
    set((s) => ({ toasts: s.toasts.filter((t) => t.id !== id) })),
}));

// ── Public API ─────────────────────────────────────────────────────────────

export function toast(
  message: string,
  type: ToastType = 'info',
  duration = 4000,
  action?: ToastAction
): void {
  useToastStore.getState().add({ message, type, duration, action });
}

export const toastSuccess = (msg: string, d?: number, action?: ToastAction) =>
  toast(msg, 'success', d, action);
export const toastError = (msg: string, d?: number, action?: ToastAction) =>
  toast(msg, 'error', d, action);
export const toastInfo = (msg: string, d?: number, action?: ToastAction) =>
  toast(msg, 'info', d, action);

// ── Components ─────────────────────────────────────────────────────────────

function ToastItem({ toast: t }: { toast: Toast }) {
  const remove = useToastStore((s) => s.remove);

  useEffect(() => {
    const timer = setTimeout(() => remove(t.id), t.duration ?? 4000);
    return () => clearTimeout(timer);
  }, [t.id, t.duration, remove]);

  const icons = {
    success: <CheckCircle2 className="w-4 h-4 flex-shrink-0 text-[#7AA33E]" />,
    error: <XCircle className="w-4 h-4 flex-shrink-0 text-red-500" />,
    info: <Info className="w-4 h-4 flex-shrink-0 text-[#7AA33E]" />,
  };

  const borders = {
    success: 'border-l-[#7AA33E]',
    error: 'border-l-red-400',
    info: 'border-l-[#7AA33E]',
  };

  return (
    <div
      role="alert"
      aria-live="polite"
      className={`flex items-start gap-3 bg-[#FFFDF8] border border-[#7AA33E]/20 border-l-4 ${borders[t.type]} rounded-xl px-4 py-3 shadow-lg max-w-sm w-full`}
      style={{ animation: 'toastIn 0.3s cubic-bezier(0.22,1,0.36,1)' }}
    >
      {icons[t.type]}
      <div className="flex-1 min-w-0">
        <p className="font-lato text-sm text-[#2E5E2E] leading-relaxed">
          {t.message}
        </p>
        {t.action && (
          <div className="mt-1.5 flex items-center gap-2">
            {t.action.href ? (
              <Link
                href={t.action.href}
                onClick={() => remove(t.id)}
                className="inline-flex items-center text-xs font-lato font-bold text-[#7AA33E] hover:text-[#2E5E2E] underline underline-offset-2 transition-colors"
              >
                {t.action.label}
              </Link>
            ) : (
              <button
                type="button"
                onClick={() => {
                  t.action?.onClick?.();
                  remove(t.id);
                }}
                className="inline-flex items-center text-xs font-lato font-bold text-[#7AA33E] hover:text-[#2E5E2E] underline underline-offset-2 transition-colors cursor-pointer"
              >
                {t.action.label}
              </button>
            )}
          </div>
        )}
      </div>
      <button
        onClick={() => remove(t.id)}
        aria-label="Dismiss notification"
        className="text-[#7a6b4e] hover:text-[#2E5E2E] transition-colors flex-shrink-0"
      >
        <X className="w-3.5 h-3.5" />
      </button>
    </div>
  );
}

export function ToastContainer() {
  const toasts = useToastStore((s) => s.toasts);

  return (
    <>
      <style>{`
        @keyframes toastIn {
          from { opacity: 0; transform: translateX(100%); }
          to { opacity: 1; transform: translateX(0); }
        }
      `}</style>
      <div
        aria-label="Notifications"
        className="fixed bottom-6 right-4 sm:right-6 z-[9999] flex flex-col gap-2.5 pointer-events-none"
      >
        {toasts.map((t) => (
          <div key={t.id} className="pointer-events-auto">
            <ToastItem toast={t} />
          </div>
        ))}
      </div>
    </>
  );
}
