// components/cart/CartContext.tsx
"use client";

import { createContext, useContext, useEffect, useMemo, useState } from "react";

export type CartLine = { id: string; title: string; price: number; img?: string; qty: number };
type CartCtx = {
  lines: CartLine[];
  add: (line: Omit<CartLine, "qty">, qty?: number) => void;
  remove: (id: string) => void;
  changeQty: (id: string, qty: number) => void;
  total: number;
  open: boolean;
  setOpen: (v: boolean) => void;
};

const Ctx = createContext<CartCtx | null>(null);

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [lines, setLines] = useState<CartLine[]>([]);
  const [open, setOpen] = useState(false);

  // hydrate from localStorage (client only)
  useEffect(() => {
    const raw = typeof window !== "undefined" ? localStorage.getItem("cart") : null;
    if (raw) {
      try { setLines(JSON.parse(raw)); } catch {}
    }
  }, []);
  useEffect(() => {
    if (typeof window !== "undefined") localStorage.setItem("cart", JSON.stringify(lines));
  }, [lines]);

  const add: CartCtx["add"] = (l, qty = 1) => {
    setLines((prev) => {
      const i = prev.findIndex((x) => x.id === l.id);
      if (i >= 0) {
        const next = [...prev];
        next[i] = { ...next[i], qty: next[i].qty + qty };
        return next;
      }
      return [...prev, { ...l, qty }];
    });
    setOpen(true);
  };

  const remove = (id: string) => setLines((prev) => prev.filter((x) => x.id !== id));
  const changeQty = (id: string, qty: number) =>
    setLines((prev) => prev.map((x) => (x.id === id ? { ...x, qty: Math.max(1, qty) } : x)));

  const total = useMemo(() => lines.reduce((s, l) => s + l.price * l.qty, 0), [lines]);

  // SHOPIFY: swap internals to Shopify Cart (create cartId, cartLinesAdd/remove, etc.)
  return (
    <Ctx.Provider value={{ lines, add, remove, changeQty, total, open, setOpen }}>
      {children}
    </Ctx.Provider>
  );
}

export const useCart = () => {
  const v = useContext(Ctx);
  if (!v) throw new Error("useCart must be used within CartProvider");
  return v;
};
