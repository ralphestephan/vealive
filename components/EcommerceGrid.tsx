// components/EcommerceGrid.tsx  (CLIENT COMPONENT)
"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

type Product = { id: string; title: string; desc: string; price: string; img: string };
export default function EcommerceGrid({ products }: { products: Product[] }) {
  const [addingId, setAddingId] = useState<string | null>(null);
  const [toast, setToast] = useState("");

  async function handleAddToCart(id: string) {
    try {
      setAddingId(id);
      setToast("");
      const res = await fetch("/api/cart", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id, quantity: 1 }),
      });
      if (!res.ok) throw new Error();
      setToast("Added to cart");
    } catch {
      setToast("Couldn’t add to cart. Try again.");
    } finally {
      setAddingId(null);
      setTimeout(() => setToast(""), 2500);
    }
  }

  return (
    <div className="mx-auto max-w-6xl px-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {products.map((p) => (
        <article
          key={p.id}
          className="group h-full flex flex-col p-6 rounded-card bg-white border border-zinc-100 shadow-soft hover:shadow-lg transition-shadow"
        >
          <div className="relative aspect-[4/3] rounded-xl overflow-hidden border border-zinc-200 mb-4">
            <div className="absolute inset-0 gradient-brand opacity-10 pointer-events-none" />
            <Image
              src={p.img}
              alt={p.title}
              fill
              sizes="(min-width:1024px) 33vw, (min-width:640px) 50vw, 100vw"
              className="object-cover transition-transform duration-500 group-hover:scale-105"
            />
          </div>

          <h3 className="font-semibold">{p.title}</h3>
          <p className="text-sm text-zinc-600 mt-1 flex-1">{p.desc}</p>
          <div className="mt-2 text-sm font-semibold">{p.price}</div>

          <div className="mt-3 flex gap-2">
            <Link
              href="#"
              className="shrink-0 px-4 h-10 inline-flex items-center justify-center rounded-full bg-brand-blue text-white text-sm font-semibold"
            >
              View
            </Link>
            <button
              onClick={() => handleAddToCart(p.id)}
              disabled={addingId === p.id}
              className="shrink-0 px-4 h-10 inline-flex items-center justify-center rounded-full border border-zinc-300 text-sm font-semibold hover:border-brand-blue disabled:opacity-60"
            >
              {addingId === p.id ? "Adding…" : "Add to cart"}
            </button>
          </div>
        </article>
      ))}

      {toast && (
        <div
          aria-live="polite"
          className="fixed bottom-6 left-1/2 -translate-x-1/2 px-4 py-2 rounded-full bg-black text-white text-sm shadow-lg"
        >
          {toast}
        </div>
      )}
    </div>
  );
}
