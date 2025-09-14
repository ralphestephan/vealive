// components/ShopifyCheckoutButton.tsx  (CLIENT)
// You can keep the name, but it now routes to your own checkout
'use client';
import { useRouter } from 'next/navigation';
import { useCart } from '@/components/cart/CartContext';

export default function ShopifyCheckoutButton({ className = '' }: { className?: string }) {
  const { lines } = useCart() as any;      // ✅ use lines (not items)
  const router = useRouter();

  const disabled = !lines?.length;

  return (
    <button
      onClick={() => router.push('/checkout')}
      disabled={disabled}
      className={`block text-center rounded-full h-11 leading-[44px] text-white font-semibold
                  bg-gradient-to-r from-brand-blue to-brand-green hover:brightness-110 ${className}`}  // ✅ removed stray quote
    >
      Checkout
    </button>
  );
}
