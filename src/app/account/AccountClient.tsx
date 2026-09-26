'use client';

import { useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import {
  Leaf,
  User,
  Mail,
  LogOut,
  ShoppingBag,
  ArrowRight,
  Shield,
} from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { useCartStore } from '@/lib/cart';

export default function AccountClient() {
  const router = useRouter();
  const { user, isLoading, isAuthenticated, signOut } = useAuth();
  const cartCount = useCartStore((s) => s.totalCount());

  // Redirect unauthenticated users to login
  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      router.replace('/login?redirect=/account');
    }
  }, [isLoading, isAuthenticated, router]);

  async function handleSignOut() {
    await signOut();
    router.push('/');
  }

  if (isLoading || !isAuthenticated) {
    return (
      <div className="min-h-screen bg-[#FFF8EF] flex items-center justify-center">
        <span className="inline-block w-5 h-5 border-2 border-[#7AA33E]/40 border-t-[#7AA33E] rounded-full animate-spin" />
      </div>
    );
  }

  const displayName =
    user?.user_metadata?.display_name ??
    user?.user_metadata?.full_name ??
    user?.email?.split('@')[0] ??
    'Spice Lover';

  const initials = displayName
    .split(' ')
    .slice(0, 2)
    .map((w: string) => w[0]?.toUpperCase() ?? '')
    .join('');

  return (
    <div className="min-h-screen bg-[#FFF8EF] px-4 py-28">
      <div
        className="fixed inset-0 pointer-events-none"
        style={{
          background:
            'radial-gradient(ellipse 70% 55% at 50% 0%, rgba(242,230,201,0.45) 0%, transparent 65%)',
        }}
      />

      <div className="relative z-10 max-w-2xl mx-auto">
        {/* Header */}
        <div className="flex items-center gap-4 mb-8">
          <div
            className="w-14 h-14 rounded-full flex items-center justify-center font-playfair font-bold text-[#FFF8EF] text-xl flex-shrink-0"
            style={{ background: '#2E5E2E' }}
            aria-hidden="true"
          >
            {initials || <User className="w-6 h-6" />}
          </div>
          <div>
            <h1 className="font-playfair font-bold text-[#2E5E2E] text-2xl leading-tight">
              {displayName}
            </h1>
            <p className="font-lato text-sm text-[#7a6b4e]">{user?.email}</p>
          </div>
        </div>

        {/* Account info card */}
        <div
          className="bg-[#FFFDF8] rounded-2xl mb-4 overflow-hidden"
          style={{ border: '1px solid rgba(122,163,62,0.18)' }}
        >
          <div className="px-6 py-4 border-b border-[#7AA33E]/10">
            <p className="font-lato text-xs font-bold uppercase tracking-wider text-[#7AA33E]">
              Account Details
            </p>
          </div>

          <div className="divide-y divide-[#7AA33E]/10">
            <div className="flex items-center gap-4 px-6 py-4">
              <User className="w-4 h-4 text-[#7AA33E] flex-shrink-0" />
              <div>
                <p className="font-lato text-[0.6rem] font-bold uppercase tracking-wider text-[#7a6b4e]">Full Name</p>
                <p className="font-lato text-sm text-[#2E5E2E]">{displayName}</p>
              </div>
            </div>

            <div className="flex items-center gap-4 px-6 py-4">
              <Mail className="w-4 h-4 text-[#7AA33E] flex-shrink-0" />
              <div>
                <p className="font-lato text-[0.6rem] font-bold uppercase tracking-wider text-[#7a6b4e]">Email Address</p>
                <p className="font-lato text-sm text-[#2E5E2E]">{user?.email}</p>
              </div>
            </div>

            <div className="flex items-center gap-4 px-6 py-4">
              <Shield className="w-4 h-4 text-[#7AA33E] flex-shrink-0" />
              <div>
                <p className="font-lato text-[0.6rem] font-bold uppercase tracking-wider text-[#7a6b4e]">Account Status</p>
                <p className="font-lato text-sm text-[#2E5E2E]">
                  {user?.email_confirmed_at ? 'Verified' : 'Email verification pending'}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Quick actions */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
          {/* Cart */}
          <Link
            href="/cart"
            className="flex items-center gap-4 bg-[#FFFDF8] rounded-2xl px-6 py-5 hover:shadow-md transition-shadow group"
            style={{ border: '1px solid rgba(122,163,62,0.18)' }}
          >
            <div
              className="w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0"
              style={{ background: 'rgba(122,163,62,0.12)' }}
            >
              <ShoppingBag className="w-5 h-5 text-[#7AA33E]" />
            </div>
            <div className="flex-1">
              <p className="font-lato text-xs font-bold uppercase tracking-wider text-[#7a6b4e]">My Cart</p>
              <p className="font-playfair font-bold text-[#2E5E2E] text-lg">
                {cartCount} {cartCount === 1 ? 'item' : 'items'}
              </p>
            </div>
            <ArrowRight className="w-4 h-4 text-[#7AA33E] transition-transform group-hover:translate-x-1" />
          </Link>

          {/* Products */}
          <Link
            href="/products"
            className="flex items-center gap-4 bg-[#2E5E2E] rounded-2xl px-6 py-5 hover:bg-[#1e3e1e] transition-colors group"
          >
            <div
              className="w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0"
              style={{ background: 'rgba(242,230,201,0.15)' }}
            >
              <Leaf className="w-5 h-5 text-[#F2E6C9]" />
            </div>
            <div className="flex-1">
              <p className="font-lato text-[0.6rem] font-bold uppercase tracking-wider text-[#F2E6C9]/60">Explore</p>
              <p className="font-playfair font-bold text-[#F2E6C9] text-lg">Our Spices</p>
            </div>
            <ArrowRight className="w-4 h-4 text-[#F2E6C9]/60 transition-transform group-hover:translate-x-1" />
          </Link>
        </div>

        {/* Orders placeholder card */}
        <div
          className="bg-[#FFFDF8] rounded-2xl px-6 py-6 mb-4"
          style={{ border: '1px solid rgba(122,163,62,0.18)' }}
        >
          <p className="font-lato text-xs font-bold uppercase tracking-wider text-[#7AA33E] mb-2">
            Order History
          </p>
          <p className="font-lato text-sm text-[#7a6b4e] leading-relaxed">
            Your order history will appear here once checkout is available. Your cart items are saved across sessions.
          </p>
        </div>

        {/* Sign out */}
        <div
          className="bg-[#FFFDF8] rounded-2xl px-6 py-4"
          style={{ border: '1px solid rgba(122,163,62,0.18)' }}
        >
          <button
            onClick={handleSignOut}
            className="flex items-center gap-2.5 font-lato text-sm font-bold text-red-500 hover:text-red-700 transition-colors"
          >
            <LogOut className="w-4 h-4" />
            Sign out of True Taste
          </button>
        </div>
      </div>
    </div>
  );
}
