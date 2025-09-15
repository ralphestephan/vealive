// components/EcommerceGrid.tsx  (CLIENT)
"use client";

import Image from "next/image";
import { useCart } from "@/components/cart/CartContext";
import Link from 'next/link';

export type Product = {
  id: string;
  title: string;
  desc: string;
  price: number;        // numeric for sorting + JSON-LD
  img: string;
  category: "Lighting" | "Climate" | "Security" | "Audio" | "Hubs" | "Other";
  available?: boolean;
};




export default function EcommerceGrid({ products }: { products: Product[] }) {
  const { add } = useCart();

  return (
    <div className="mx-auto max-w-6xl px-4">
      {/* Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {products.map((p) => (
          <article
            key={p.id}
            className="group h-full flex flex-col p-6 rounded-card bg-white border border-zinc-100 shadow-soft hover:shadow-lg transition-shadow relative overflow-hidden"
          >
            <div className="absolute -top-16 -right-10 w-40 h-40 rounded-full bg-brand-blue/5 blur-2xl pointer-events-none" />
            
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

            <span className="inline-flex items-center px-2.5 h-6 rounded-full text-xs bg-zinc-100 text-zinc-700 w-max mb-1">
              {p.category}
            </span>
            <h3 className="font-semibold">{p.title}</h3>
            <p className="text-sm text-zinc-600 mt-1 flex-1">{p.desc}</p>
            <div className="mt-2 text-sm font-semibold">${p.price.toFixed(2)}</div>
            <p className={`mt-1 text-xs ${ (p as any).available ? 'text-emerald-600' : 'text-rose-600' }`}>
              {(p as any).available ? 'In stock' : 'Out of stock'}
            </p>


            <div className="mt-3 flex gap-2">
            <Link href={`/ecommerce/${encodeURIComponent((p as any).handle ?? '')}`} className="shrink-0 px-4 h-10 inline-flex items-center justify-center rounded-full bg-gradient-to-r from-brand-blue to-brand-green text-white text-sm font-semibold hover:brightness-110">
              View
            </Link>

              <button
                onClick={() => p.available && add({ id: p.id, title: p.title, price: p.price, img: p.img }, 1)}
                disabled={!p.available}
                className={`shrink-0 px-4 h-10 inline-flex items-center justify-center rounded-full border text-sm font-semibold
                  ${p.available ? "border-zinc-300 hover:border-brand-blue" : "border-zinc-200 text-zinc-400 cursor-not-allowed"}`}
    >
                {p.available ? "Add to cart" : "Sold out"}
              </button>
            </div>
          </article>
        ))}
      </div>

      {/* Empty state */}
      {products.length === 0 && (
        <p className="text-sm text-zinc-600 mt-8">No products match your filters.</p>
      )}
    </div>
  );
}
