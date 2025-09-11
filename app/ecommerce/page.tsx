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

export default function Page() {
  return (
    <CartProvider>
      <main className="w-full overflow-x-clip page-canvas">
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

        {/* HERO */}
        <section id="shop-hero" className="mt-10 mb-10 relative">
          <div className="absolute inset-0 -z-10 gradient-multi opacity-5" />
          <div className="mx-auto max-w-6xl px-4">
            <div className="flex items-start justify-between gap-4">
              <div className="text-center md:text-left">
                <span className="inline-flex items-center px-3 py-1 rounded-full bg-zinc-100 text-xs font-medium">
                  Curated &amp; compatible
                </span>
                <h1 className="mt-2 text-4xl md:text-5xl font-extrabold leading-tight tracking-tight reviews-title">
                  <span className="bg-gradient-to-r from-brand-blue to-brand-green bg-clip-text text-transparent">
                    Shop Smart Devices
                  </span>
                </h1>
                <p className="mt-3 text-zinc-700 max-w-2xl">
                  Curated hardware that plays nicely together. Pre-configured bundles and Shopify checkout coming soon.
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

        {/* CART BUTTON (mobile) */}
        <div className="mx-auto max-w-6xl px-4 md:hidden mb-4">
          <CartButton className="w-full justify-center" />
        </div>

        {/* GRID with Reveal */}
        <section className="pb-6">
          <Reveal>
            <EcommerceGrid products={products} />
          </Reveal>
        </section>

        <CTA />
        <TrustSignals />
        <CartDrawer />
      </main>
    </CartProvider>
  );
}
