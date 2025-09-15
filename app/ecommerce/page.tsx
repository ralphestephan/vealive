// app/ecommerce/page.tsx (SERVER)
import type { Metadata } from 'next';
import CTA from '@/components/CTA';
import TrustSignals from '@/components/TrustSignals';
import EcommerceGrid from '@/components/EcommerceGrid';
import SEOJsonLd from '@/components/SEOJsonLd';
import { SITE } from '@/lib/site';
import DynamicUnderline from '@/components/ui/DynamicUnderline';
import Reveal from '@/components/ui/Reveal';
import CartButton from '@/components/cart/CartButton';
import CartDrawer from '@/components/cart/CartDrawer';
import FloatingCartButton from '@/components/cart/FloatingCartButton';
import Link from 'next/link';
import { getProducts } from '@/lib/shopify';

export const metadata: Metadata = {
  title: 'Shop Smart Devices | VeaLive360 E-Commerce',
  description:
    'Curated smart home devices that work together: lighting, climate, security, audio and more. Buy with confidence—pre-configured bundles coming soon.',
  alternates: { canonical: '/ecommerce' },
  openGraph: {
    title: 'Shop Smart Devices | VeaLive360',
    description:
      'Curated & compatible hardware for seamless smart living. Explore lighting, climate, security, and audio.',
    url: `${SITE.baseUrl}/ecommerce`,
    images: [{ url: SITE.ogImage }],
  },
  twitter: { card: 'summary_large_image', site: '@vealive360' },
  robots: { index: true, follow: true },
};


export default async function Page({ searchParams }: { searchParams?: { q?: string; cat?: string; sort?: string } }) {
  const q = searchParams?.q?.trim() || '';
  const cat = searchParams?.cat || '';
  const sort = searchParams?.sort || '';

  const all = await getProducts(60);
  const categories = Array.from(new Set(all.map((p) => p.category)));
  const filtered = (() => {
    let list = all;
    if (cat) list = list.filter((p) => p.category.toLowerCase() === cat.toLowerCase());

    switch (sort) {
      case 'price-asc': return [...list].sort((a,b)=>a.price-b.price);
      case 'price-desc': return [...list].sort((a,b)=>b.price-a.price);
      case 'alpha': return [...list].sort((a,b)=>a.title.localeCompare(b.title));
      default: return list;
    }
  })();


  return (

      <main className="w-full overflow-x-clip relative">
        <div className="absolute inset-0 -z-10 gradient-multi opacity-5" />

        {/* JSON-LD: ItemList + WebSite SearchAction */}
        <SEOJsonLd
          data={[
            {
              '@context': 'https://schema.org',
              '@type': 'ItemList',
              itemListElement: all.map((p, idx) => ({
                '@type': 'ListItem',
                position: idx + 1,
                item: {
                  '@type': 'Product',
                  name: p.title,
                  description: p.desc,
                  image: p.img.startsWith('http') ? p.img : `${SITE.baseUrl}${p.img}`,
                  brand: SITE.org?.legalName ?? SITE.name,
                  sku: p.id,
                  offers: {
                    '@type': 'Offer',
                    price: p.price.toFixed(2),
                    priceCurrency: 'USD',
                    availability: 'https://schema.org/InStock',
                    url: `${SITE.baseUrl}/ecommerce`,
                  },
                },
              })),
            },
            {
              '@context': 'https://schema.org',
              '@type': 'WebSite',
              url: SITE.baseUrl,
              potentialAction: {
                '@type': 'SearchAction',
                target: `${SITE.baseUrl}/ecommerce?q={search_term_string}`,
                'query-input': 'required name=search_term_string',
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
                  Hardware we trust to play nicely together. Bundles & Shopify checkout now live.
                </p>
                <div className="mt-3">
                  <DynamicUnderline watch="#shop-hero" align="left" widthClass="w-20" height={4} />
                </div>
              </div>
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
              <input
                type="text"
                name="q"
                defaultValue={q}
                placeholder="Search devices (e.g., thermostat, thread)…"
                className="w-full md:w-[420px] rounded-xl border border-zinc-300 bg-white/90 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-brand-blue transition"
              />
              <select
                name="sort"
                defaultValue={sort}
                className="rounded-xl border border-zinc-300 bg-white/90 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-brand-blue transition"
              >
                <option value="">Sort: Featured</option>
                <option value="price-asc">Price: Low to High</option>
                <option value="price-desc">Price: High to Low</option>
                <option value="alpha">Name: A → Z</option>
              </select>
              <button type="submit" className="rounded-full bg-brand-blue text-white font-semibold px-5 py-2 hover:brightness-110 transition">Apply</button>
              {(q || cat || sort) && (
                <Link href="/ecommerce" className="text-sm text-zinc-600 underline decoration-dotted underline-offset-4">Reset</Link>
              )}
            </form>

            {/* Category pills */}
            <div className="mt-4 flex flex-wrap gap-2">
              <Link href="/ecommerce" className={`px-3 py-1.5 rounded-full border text-sm ${!cat ? 'bg-brand-green text-white border-brand-green' : 'bg-white border-zinc-300 hover:border-brand-green'}`}>All</Link>
              {categories.map((c) => (
                <Link
                  key={c}
                  href={`/ecommerce?cat=${encodeURIComponent(c)}${q ? `&q=${encodeURIComponent(q)}` : ''}${sort ? `&sort=${encodeURIComponent(sort)}` : ''}`}
                  className={`px-3 py-1.5 rounded-full border text-sm ${cat === c ? 'bg-brand-green text-white border-brand-green' : 'bg-white border-zinc-300 hover:border-brand-green'}`}
                >
                  {c}
                </Link>
              ))}
            </div>

            {/* Result meta */}
            <div className="mt-3 text-sm text-zinc-600">
              {filtered.length} item{filtered.length !== 1 ? 's' : ''} {cat ? `in ${cat}` : ''}{q ? ` • matching “${q}”` : ''}
            </div>
          </div>
        </section>

        {/* CART BUTTON (mobile inline) */}
        <div className="mx-auto max-w-6xl px-4 md:hidden mb-4">
          <CartButton className="w-full justify-center" />
        </div>

        {/* GRID */}
        <section id="shop-grid" className="pb-6">
          <Reveal>
            {/* IMPORTANT: items now contain Shopify VARIANT IDs as `id` */}
            <EcommerceGrid products={filtered} />
          </Reveal>
        </section>

        <CTA />
        <TrustSignals />
        <FloatingCartButton anchor="#shop-grid" topOffset={64} />
        <CartDrawer />
      </main>

  );
}
