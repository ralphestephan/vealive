// components/cart/CartDrawer.tsx
"use client";
import { X, Plus, Minus, Trash2 } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useCart } from "./CartContext";

export default function CartDrawer() {
  const { lines, remove, changeQty, total, open, setOpen } = useCart();

  return (
    <>
      {/* backdrop */}
      <div
        onClick={() => setOpen(false)}
        className={[
          "fixed inset-0 z-50 bg-black/30 transition-opacity",
          open ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none",
        ].join(" ")}
      />
      {/* panel */}
      <aside
        className={[
          "fixed right-0 top-0 z-50 h-full w-[92%] sm:w-[420px] bg-white shadow-2xl",
          "transition-transform duration-300",
          open ? "translate-x-0" : "translate-x-full",
        ].join(" ")}
        aria-hidden={!open}
      >
        <div className="h-14 px-4 border-b flex items-center justify-between">
          <div className="font-semibold">Your cart</div>
          <button onClick={() => setOpen(false)} className="p-2 rounded-md hover:bg-zinc-100">
            <X className="h-5 w-5" />
          </button>
        </div>

        <div className="p-4 space-y-3 overflow-y-auto max-h-[calc(100vh-11rem)]">
          {lines.length === 0 && (
            <p className="text-sm text-zinc-600">Your cart is empty.</p>
          )}
          {lines.map((l) => (
            <div key={l.id} className="flex gap-3 rounded-xl border p-3">
              <div className="relative w-20 h-16 rounded-lg overflow-hidden bg-zinc-50 border">
                {l.img && (
                  <Image src={l.img} alt={l.title} fill className="object-cover" />
                )}
              </div>
              <div className="min-w-0 flex-1">
                <div className="font-medium truncate">{l.title}</div>
                <div className="text-sm text-zinc-600">${l.price.toFixed(2)}</div>
                <div className="mt-2 flex items-center gap-2">
                  <button onClick={() => changeQty(l.id, l.qty - 1)} className="p-1 rounded border hover:bg-zinc-50"><Minus className="h-4 w-4" /></button>
                  <span className="w-6 text-center text-sm">{l.qty}</span>
                  <button onClick={() => changeQty(l.id, l.qty + 1)} className="p-1 rounded border hover:bg-zinc-50"><Plus className="h-4 w-4" /></button>
                  <button onClick={() => remove(l.id)} className="ml-auto p-1 rounded border hover:bg-zinc-50"><Trash2 className="h-4 w-4" /></button>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="p-4 border-t space-y-3">
          <div className="flex items-center justify-between font-semibold">
            <span>Total</span>
            <span>${total.toFixed(2)}</span>
          </div>
          <Link
            href="#"
            className="block text-center rounded-full h-11 leading-[44px] text-white font-semibold
                       bg-gradient-to-r from-brand-blue to-brand-green hover:brightness-110"
          >
            Checkout
          </Link>
          {/* SHOPIFY: route to your hosted checkout or `/checkout` after cartCreate */}
        </div>
      </aside>
    </>
  );
}
