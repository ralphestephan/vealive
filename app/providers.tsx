// app/providers.tsx
'use client';

import { CartProvider } from '@/components/cart/CartContext';

export function Providers({ children }: { children: React.ReactNode }) {
  return <CartProvider>{children}</CartProvider>;
}
