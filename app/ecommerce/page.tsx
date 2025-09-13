// app/ecommerce/page.tsx  (SERVER)
import type { Metadata } from "next";
import CTA from "@/components/CTA";
import TrustSignals from "@/components/TrustSignals";
import EcommerceGrid, { Product } from "@/components/EcommerceGrid";
import SEOJsonLd from "@/components/SEOJsonLd";
import { SITE } from "@/lib/site";
import DynamicUnderline from "@/components/ui/DynamicUnderline";
import Reveal from "@/components/ui/Reveal";
import { CartProvider } from "@/components/cart/CartContext";
import CartButton from "@/components/cart/CartButton";
import CartDrawer from "@/components/cart/CartDrawer";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Shop Smart Devices | VeaLive360 E-Commerce",
  description:
    "Curated smart home devices that work together: lighting, climate, security, audio and more. Buy with confidence—pre-configured bundles coming soon.",
  alternates: { canonical: "/ecommerce" },
  openGraph: {
    title: "Shop Smart Devices | VeaLive360",
    description:
      "Curated & compatible hardware for seamless smart living. Explore lighting, climate, security, and audio.",
    url: `${SITE.baseUrl}/ecommerce`,
    images: [{ url: SITE.ogImage }],
  },
  twitter: { card: "summary_large_image", site: "@vealive360" },
  robots: { index: true, follow: true },
};

// DUMMY DATA (SHOPIFY: replace with Storefront query)
const products: Product[] = [
  { id: "1", title: "Smart Lighting Kit", desc: "Set moods and automate ambiance with tunable white + RGB bulbs.", price: 89,  img: "/images/placeholders/product-lighting.jpg",   category: "Lighting", tags: ["bulbs","rgb","scenes"] },
  { id: "2", title: "Smart Thermostat",  desc: "Optimize comfort and save energy with adaptive scheduling.",       price: 129, img: "/images/placeholders/product-thermostat.jpg", category: "Climate",  tags: ["hvac","scheduling"] },
  { id: "3", title: "Smart Lock",        desc: "Secure entry with app, code, or biometric access.",               price: 179, img: "/images/placeholders/product-lock.jpg",       category: "Security", tags: ["door","access"] },
  { id: "4", title: "Indoor Camera",     desc: "Monitor your home with 2-way audio and night vision.",            price: 99,  img: "/images/placeholders/product-camera.jpg",     category: "Security", tags: ["camera","monitoring"] },
  { id: "5", title: "Multi-Room Speaker",desc: "High-fidelity sound, voice assistant built-in.",                  price: 149, img: "/images/placeholders/product-speaker.jpg",    category: "Audio",    tags: ["speaker","voice"] },
  { id: "6", title: "Smart Hub",         desc: "Unify all your devices under one secure controller.",             price: 79,  img: "/images/placeholders/product-hub.jpg",        category: "Hubs",     tags: ["matter","thread"] },
];

// ── helpers (server-side filtering via search params) ───────────────────────────
function uniq<T>(arr: T[]) { return Array.from(new Set(arr)); }
function filterProducts(all: Product[], q?: string, cat?: string) {
  let list = all;
  if (cat) list = list.filter(p => p.category.toLowerCase() === cat.toLowerCase());
  if (q) {
    const needle = q.toLowerCase();
    list = list.filter(p =>
      p.title.toLowerCase().includes(needle) ||
      p.desc.toLowerCase().includes(needle) ||
      p.tags?.some(t => t.toLowerCase().includes(needle))
    );
  }
  return list;
}
function sortProducts(list: Product[], sort?: string) {
  switch (sort) {
    case "price-asc":  return [...list].sort((a,b)=>a.price-b.price);
    case "price-desc": return [...list].sort((a,b)=>b.price-a.price);
    case "alpha":      return [...list].sort((a,b)=>a.title.localeCompare(b.title));
    default:           return list;
  }
}

export default function Page({
  searchParams,
}: {
  searchParams?: { q?: string; cat?: string; sort?: string };
}) {
  const q = searchParams?.q?.trim() || "";
  const cat = searchParams?.cat || "";
  const sort = searchParams?.sort || "";

  const categories = uniq(products.map(p => p.category));
  const filtered = sortProducts(filterProducts(products, q, cat), sort);

  return (
    <CartProvider>
      <main className="w-full overflow-x-clip relative">
        {/* Full-page background */}
        <div className="absolute inset-0 -z-10 gradient-multi opacity-5" />

        {/* JSON-LD: ItemList + WebSite SearchAction */}
        <SEOJsonLd
          data={[
            {
              "@context": "https://schema.org",
              "@type": "ItemList",
              itemListElement: products.map((p, idx) => ({
                "@type": "ListItem",
                position: idx + 1,
                item: {
                  "@type": "Product",
                  name: p.title,
                  description: p.desc,
                  image: `${SITE.baseUrl}${p.img}`,
                  brand: SITE.org?.legalName ?? SITE.name,
                  sku: p.id,
                  offers: {
                    "@type": "Offer",
                    price: p.price.toFixed(2),
                    priceCurrency: "USD",
                    availability: "https://schema.org/InStock",
                    url: `${SITE.baseUrl}/ecommerce`,
                  },
                },
              })),
            },
            {
              "@context": "https://schema.org",
              "@type": "WebSite",
              url: SITE.baseUrl,
              potentialAction: {
                "@type": "SearchAction",
                target: `${SITE.baseUrl}/ecommerce?q={search_term_string}`,
                "query-input": "required name=search_term_string",
              },
            },
          ]}
        />

        {/* PROMO RIBBON */}
        <div className="w-full">
          <div className="mx-auto max-w-6xl px-4">
            <div className="mt-0.5 mb-2 rounded-xl border border-zinc-200 bg-white/20 backdrop-blur-sm p-2 text-center text-sm text-zinc-700 shadow-soft">
              Free consult with every order • Local-first setups • Easy returns
            </div>
          </div>
        </div>

        {/* HERO */}
        <section id="shop-hero" className="mt-2 mb-6">
          <div className="mx-auto max-w-6xl px-4">
            <div className="flex items-start justify-between gap-4">
              <div className="text-center md:text-left">
                <span className="inline-flex items-center px-3 py-1 rounded-full bg-zinc-100 text-xs font-medium">
                  Curated &amp; compatible
                </span>
                <h1 className="mt-2 text-4xl md:text-5xl font-extrabold leading-tight tracking-tight">
                  <span className="bg-gradient-to-r from-brand-blue to-brand-green bg-clip-text text-transparent">
                    Shop Smart Devices
                  </span>
                </h1>
                <p className="mt-3 text-zinc-700 max-w-2xl">
                  Hardware we trust to play nicely together. Bundles & Shopify checkout coming soon.
                </p>
                <div className="mt-3">
                  <DynamicUnderline watch="#shop-hero" align="left" widthClass="w-20" height={4} />
                </div>
              </div>

              {/* Cart button (top-right) */}
              <div className="hidden md:block">
                <CartButton />
              </div>
            </div>
          </div>
        </section>

        {/* TOOLBAR (search + category pills + sort) */}
        <section aria-label="Shop toolbar" className="mb-8">
          <div className="mx-auto max-w-6xl px-4">
            <form method="get" className="flex flex-col gap-3 md:flex-row md:items-center md:gap-4">
              {/* Search */}
              <input
                type="text"
                name="q"
                defaultValue={q}
                placeholder="Search devices (e.g., thermostat, thread)…"
                className="
                  w-full md:w-[420px] rounded-xl border border-zinc-300 bg-white/90 px-3 py-2
                  focus:outline-none focus:ring-2 focus:ring-brand-blue transition
                "
              />

              {/* Sort */}
              <select
                name="sort"
                defaultValue={sort}
                className="
                  rounded-xl border border-zinc-300 bg-white/90 px-3 py-2
                  focus:outline-none focus:ring-2 focus:ring-brand-blue transition
                "
              >
                <option value="">Sort: Featured</option>
                <option value="price-asc">Price: Low to High</option>
                <option value="price-desc">Price: High to Low</option>
                <option value="alpha">Name: A → Z</option>
              </select>

              {/* Submit */}
              <button
                type="submit"
                className="rounded-full bg-brand-blue text-white font-semibold px-5 py-2 hover:brightness-110 transition"
              >
                Apply
              </button>

              {/* Reset */}
              {(q || cat || sort) && (
                <Link
                  href="/ecommerce"
                  className="text-sm text-zinc-600 underline decoration-dotted underline-offset-4"
                >
                  Reset
                </Link>
              )}
            </form>

            {/* Category pills (links with cat=) */}
            <div className="mt-4 flex flex-wrap gap-2">
              <Link
                href="/ecommerce"
                className={`px-3 py-1.5 rounded-full border text-sm ${
                  !cat
                    ? "bg-brand-green text-white border-brand-green"
                    : "bg-white border-zinc-300 hover:border-brand-green"
                }`}
              >
                All
              </Link>
              {categories.map((c) => (
                <Link
                  key={c}
                  href={`/ecommerce?cat=${encodeURIComponent(c)}${q ? `&q=${encodeURIComponent(q)}` : ""}${sort ? `&sort=${encodeURIComponent(sort)}` : ""}`}
                  className={`px-3 py-1.5 rounded-full border text-sm ${
                    cat === c
                      ? "bg-brand-green text-white border-brand-green"
                      : "bg-white border-zinc-300 hover:border-brand-green"
                  }`}
                >
                  {c}
                </Link>
              ))}
            </div>

            {/* Result meta */}
            <div className="mt-3 text-sm text-zinc-600">
              {filtered.length} item{filtered.length !== 1 ? "s" : ""} {cat ? `in ${cat}` : ""}{q ? ` • matching “${q}”` : ""}
            </div>
          </div>
        </section>

        {/* CART BUTTON (mobile) */}
        <div className="mx-auto max-w-6xl px-4 md:hidden mb-4">
          <CartButton className="w-full justify-center" />
        </div>

        {/* GRID */}
        <section className="pb-6">
          <Reveal>
            <EcommerceGrid products={filtered} />
          </Reveal>
        </section>

        <CTA />
        <TrustSignals />

        {/* Floating cart (mobile, top-right) */}
        <div
          className="md:hidden fixed right-4 z-[60]"
          style={{ top: "calc(env(safe-area-inset-top, 0px) + 64px)" }} // sits below your header
        >
          <CartButton />
        </div>


        <CartDrawer />
      </main>
    </CartProvider>
  );
}
