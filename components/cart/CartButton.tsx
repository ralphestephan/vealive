// components/cart/CartButton.tsx
"use client";
import { ShoppingCart } from "lucide-react";
import { useCart } from "./CartContext";

export default function CartButton({ className = "" }: { className?: string }) {
  const { lines, setOpen } = useCart();
  const count = lines.reduce((s, l) => s + l.qty, 0);
  return (
    <button
      onClick={() => setOpen(true)}
      className={[
        "relative inline-flex items-center gap-2 rounded-full border px-4 h-10 text-sm font-semibold",
        "border-zinc-300 hover:border-brand-blue transition-colors bg-white/80 backdrop-blur",
        className,
      ].join(" ")}
    >
      <ShoppingCart className="h-4 w-4" />
      Cart
      {count > 0 && (
        <span className="ml-1 inline-grid place-items-center text-[11px] h-5 px-2 rounded-full bg-gradient-to-r from-brand-blue to-brand-green text-white">
          {count}
        </span>
      )}
    </button>
  );
}
