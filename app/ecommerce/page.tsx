// app/ecommerce/page.tsx  (SERVER COMPONENT)
import type { Metadata } from "next";
import CTA from "@/components/CTA";
import TrustSignals from "@/components/TrustSignals";
import EcommerceGrid from "@/components/EcommerceGrid";
import SEOJsonLd from "@/components/SEOJsonLd";
import { SITE } from "@/lib/site";

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
};

const products = [
  { id: "1", title: "Smart Lighting Kit", desc: "Set moods and automate ambiance with tunable white + RGB bulbs.", price: "$89",  img: "/images/placeholders/product-lighting.jpg" },
  { id: "2", title: "Smart Thermostat",  desc: "Optimize comfort and save energy with adaptive scheduling.",       price: "$129", img: "/images/placeholders/product-thermostat.jpg" },
  { id: "3", title: "Smart Lock",        desc: "Secure entry with app, code, or biometric access.",               price: "$179", img: "/images/placeholders/product-lock.jpg" },
  { id: "4", title: "Indoor Security Camera", desc: "Monitor your home with 2-way audio and night vision.",       price: "$99",  img: "/images/placeholders/product-camera.jpg" },
  { id: "5", title: "Multi-Room Speaker",    desc: "High-fidelity sound, voice assistant built-in.",              price: "$149", img: "/images/placeholders/product-speaker.jpg" },
  { id: "6", title: "Smart Hub",             desc: "Unify all your devices under one secure controller.",         price: "$79",  img: "/images/placeholders/product-hub.jpg" },
];

// helper to strip currency for JSON-LD
const priceNumber = (p: string) => p.replace(/[^0-9.]/g, "");

export default function Page() {
  return (
    <main className="w-full overflow-x-clip">
      {/* JSON-LD: ItemList of Products */}
      <SEOJsonLd
        data={{
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
                price: priceNumber(p.price),
                priceCurrency: "USD",
                availability: "https://schema.org/InStock",
                url: `${SITE.baseUrl}/ecommerce`,
              },
            },
          })),
        }}
      />

      {/* HERO */}
      <section className="mt-10 mb-12 relative">
        <div className="absolute inset-0 -z-10 gradient-multi opacity-5" />
        <div className="mx-auto max-w-6xl px-4 text-center">
          <span className="inline-flex items-center px-3 py-1 rounded-full bg-zinc-100 text-xs font-medium">
            Curated &amp; compatible
          </span>
          <h1 className="mt-2 text-4xl md:text-5xl font-extrabold leading-tight tracking-tight">
            <span className="bg-gradient-to-r from-brand-blue to-brand-green bg-clip-text text-transparent">
              Shop Smart Devices
            </span>
          </h1>
          <p className="mt-3 text-zinc-700 max-w-2xl mx-auto">
            Curated hardware that plays nicely together. Buy with confidence—pre-configured bundles coming soon.
          </p>
          <span className="mt-4 mx-auto block h-1 w-20 rounded-full bg-gradient-to-r from-brand-blue to-brand-green" />
        </div>
      </section>

      {/* PRODUCT GRID (client component) */}
      <section className="pb-6">
        <EcommerceGrid products={products} />
      </section>

      <CTA />
      <TrustSignals />
    </main>
  );
}
