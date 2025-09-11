// components/EcommerceGrid.tsx  (CLIENT)
"use client";

import Image from "next/image";
import { useMemo, useState } from "react";
import { useCart } from "@/components/cart/CartContext";
import { Search, SlidersHorizontal } from "lucide-react";

export type Product = {
  id: string;
  title: string;
  desc: string;
  price: number;        // numeric for sorting + JSON-LD
  img: string;
  category: "Lighting" | "Climate" | "Security" | "Audio" | "Hubs";
  tags?: string[];
};

const categories: Product["category"][] = ["Lighting", "Climate", "Security", "Audio", "Hubs"];
const sorts = [
  { v: "featured", label: "Featured" },
  { v: "price-asc", label: "Price ↑" },
  { v: "price-desc", label: "Price ↓" },
];

export default function EcommerceGrid({ products }: { products: Product[] }) {
  const { add } = useCart();
  const [q, setQ] = useState("");
  const [cat, setCat] = useState<null | Product["category"]>(null);
  const [sort, setSort] = useState("featured");

  const filtered = useMemo(() => {
    const search = q.trim().toLowerCase();
    let list = products.filter((p) =>
      (!cat || p.category === cat) &&
      (!search ||
        p.title.toLowerCase().includes(search) ||
        p.desc.toLowerCase().includes(search) ||
        (p.tags ?? []).some(t => t.toLowerCase().includes(search)))
    );
    if (sort === "price-asc") list = list.sort((a,b)=>a.price-b.price);
    if (sort === "price-desc") list = list.sort((a,b)=>b.price-a.price);
    return list;
  }, [products, q, cat, sort]);

  return (
    <div className="mx-auto max-w-6xl px-4">
      {/* Controls */}
      <div className="flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-4 mb-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-zinc-500" />
          <input
            value={q}
            onChange={(e)=>setQ(e.target.value)}
            placeholder="Search smart devices…"
            className="w-full h-11 pl-9 pr-3 rounded-xl border border-zinc-300 bg-white/80 backdrop-blur focus:outline-none focus:ring-2 focus:ring-brand-blue/40"
          />
        </div>
        <div className="flex items-center gap-2">
          <SlidersHorizontal className="h-4 w-4 text-zinc-500 hidden sm:block" />
          <select
            className="h-11 rounded-xl border border-zinc-300 bg-white/80 backdrop-blur px-3"
            value={sort}
            onChange={(e)=>setSort(e.target.value)}
          >
            {sorts.map(s => <option key={s.v} value={s.v}>{s.label}</option>)}
          </select>
        </div>
      </div>

      {/* Category chips (scroll on mobile) */}
      <div className="relative -mx-4 px-4 overflow-x-auto no-scrollbar mb-5">
        <div className="flex gap-2 w-max">
          <button
            onClick={()=>setCat(null)}
            className={[
              "px-3 h-9 rounded-full border text-sm",
              cat === null
                ? "border-transparent text-white bg-gradient-to-r from-brand-blue to-brand-green"
                : "border-zinc-300 hover:border-brand-blue"
            ].join(" ")}
          >
            All
          </button>
          {categories.map(c => (
            <button
              key={c}
              onClick={()=>setCat(c)}
              className={[
                "px-3 h-9 rounded-full border text-sm",
                cat === c
                  ? "border-transparent text-white bg-gradient-to-r from-brand-blue to-brand-green"
                  : "border-zinc-300 hover:border-brand-blue"
              ].join(" ")}
            >
              {c}
            </button>
          ))}
        </div>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {filtered.map((p) => (
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

            <div className="mt-3 flex gap-2">
              <button
                className="shrink-0 px-4 h-10 inline-flex items-center justify-center rounded-full bg-gradient-to-r from-brand-blue to-brand-green text-white text-sm font-semibold hover:brightness-110"
                // product detail page would be /ecommerce/[id]
                onClick={()=>alert("Product details coming soon")}
              >
                View
              </button>
              <button
                onClick={() => add({ id: p.id, title: p.title, price: p.price, img: p.img }, 1)}
                className="shrink-0 px-4 h-10 inline-flex items-center justify-center rounded-full border border-zinc-300 text-sm font-semibold hover:border-brand-blue"
              >
                Add to cart
              </button>
            </div>
          </article>
        ))}
      </div>

      {/* Empty state */}
      {filtered.length === 0 && (
        <p className="text-sm text-zinc-600 mt-8">No products match your filters.</p>
      )}
    </div>
  );
}
