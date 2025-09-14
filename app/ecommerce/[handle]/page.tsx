import Image from "next/image";
import { shopifyFetch } from "@/lib/shopify";
import SEOJsonLd from "@/components/SEOJsonLd";
import {
  Gauge, Cpu, Wifi, Router, Plug, Layers, BatteryCharging, Thermometer,
  Droplets, Fan, Sun, Moon, Lock, ShieldCheck, Cloud, HardDrive, Bolt, Boxes, Barcode
} from "lucide-react";

const SPEC_ICON: Record<string, any> = {
  brand: () => <span className="inline-block h-4 w-4 rounded-full border" />,
  category: Boxes,
  sku: Barcode,
  power: Bolt,
  voltage: Bolt,
  current: Bolt,
  protocol: Router,
  network: Wifi,
  wifi: Wifi,
  thread: Router,
  zigbee: Router,
  battery: BatteryCharging,
  storage: HardDrive,
  cpu: Cpu,
  processor: Cpu,
  temp: Thermometer,
  humidity: Droplets,
  fan: Fan,
  light: Sun,
  night: Moon,
  security: Lock,
  privacy: ShieldCheck,
  gauge: Gauge,
  layers: Layers,
  cloud: Cloud,
};

function pickIconFor(key: string) {
  const k = key.toLowerCase();
  for (const hint of Object.keys(SPEC_ICON)) {
    if (k.includes(hint)) return SPEC_ICON[hint];
  }
  return Gauge;
}

const PRODUCT_QUERY = /* GraphQL */ `
  query Product($handle: String!) {
    product(handle: $handle) {
      id
      handle
      title
      description
      descriptionHtml
      availableForSale
      totalInventory
      productType
      vendor
      tags
      featuredImage { url altText }
      images(first: 8) { nodes { url altText } }
      options(first: 10) { name values }
      variants(first: 50) {
        nodes {
          id
          title
          sku
          availableForSale
          quantityAvailable
          selectedOptions { name value }
          price { amount currencyCode }
          compareAtPrice { amount currencyCode }
          image { url altText }
        }
      }
      metafields(identifiers: [
        {namespace: "details", key: "specs"},
        {namespace: "details", key: "bullets"}
      ]) {
        key
        value
      }
    }
  }
`;

// --- helpers: extract structured specs from descriptionHtml/options/tags ---
function stripHtml(html: string) {
    return html
      .replace(/<br\s*\/?>/gi, "\n")
      .replace(/<\/(p|li|h\d)>/gi, "\n")
      .replace(/<[^>]*>/g, "")
      .replace(/\u00a0/g, " ")
      .trim();
  }
  function parseSpecsFromDescription(html: string): Array<{ k: string; v: string }> {
    const text = stripHtml(html);
    const lines = text.split(/\n+/).map((l) => l.trim()).filter(Boolean);
    const specs: Array<{ k: string; v: string }> = [];
  
    for (const line of lines) {
      // Bullet forms: "- 12V DC" or "• Wi-Fi" -> no key, put under "Feature"
      if (/^[-•▪●]/.test(line)) {
        const v = line.replace(/^[-•▪●]\s*/, "");
        if (v.length > 1) specs.push({ k: "Feature", v });
        continue;
      }
      // Key: Value forms
      const m = line.match(/^([A-Za-z0-9 /_\-+.()%]+)\s*[:：]\s*(.+)$/);
      if (m) {
        const k = m[1].trim();
        const v = m[2].trim();
        if (k && v) specs.push({ k, v });
      }
    }
    return specs;
  }
  
  function buildSpecs(product: any) {
    const fromDesc = parseSpecsFromDescription(product.descriptionHtml || "");
    const fromOptions =
      (product.options || [])
        .filter((o: any) => o?.name && o?.name !== "Title")
        .flatMap((o: any) => ({ k: o.name, v: (o.values || []).join(", ") })) as Array<{k:string;v:string}>;
  
    // Enrich with vendor/type/tags/stock
    const enrich: Array<{ k: string; v: string }> = [];
    if (product.vendor) enrich.push({ k: "Brand", v: product.vendor });
    if (product.productType) enrich.push({ k: "Category", v: product.productType });
    if (Array.isArray(product.tags) && product.tags.length) enrich.push({ k: "Tags", v: product.tags.slice(0, 6).join(", ") });
  
    // Stock (for the default/first variant)
    const v0 = product.variants?.nodes?.[0];
    if (v0?.sku) enrich.push({ k: "SKU", v: v0.sku });
    if (typeof v0?.quantityAvailable === "number")
      enrich.push({ k: "Stock", v: String(v0.quantityAvailable) });
    else
      enrich.push({ k: "Availability", v: v0?.availableForSale ? "In stock" : "Out of stock" });
  
    // Merge with priority: description > options > enrich
    const all = [...fromDesc, ...fromOptions, ...enrich];
  
    // Deduplicate by key + value
    const seen = new Set<string>();
    return all.filter(({ k, v }) => {
      const id = `${k.toLowerCase()}|${v.toLowerCase()}`;
      if (seen.has(id)) return false;
      seen.add(id);
      return k && v;
    });
  }
  

export default async function Page({ params }: { params: { handle: string } }) {
  const { product: p } = await shopifyFetch<{ product: any }>(PRODUCT_QUERY, { handle: params.handle });
  if (!p) return <div className="mx-auto max-w-6xl px-4 py-16">Not found.</div>;

  const images = p.images?.nodes ?? [];
  const primary = p.featuredImage?.url ?? images[0]?.url ?? "";
   const bullets = p.metafields?.find((m: any) => m?.key === "bullets")?.value ?? "";

  // Fallback specs from options if metafield not set
  const specsList = buildSpecs(p); // array of {k, v}

  return (
    <main className="w-full overflow-x-clip relative">
      <div className="absolute inset-0 -z-10 gradient-multi opacity-5" />

      {/* JSON-LD Product */}
      <SEOJsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "Product",
          name: p.title,
          description: p.description,
          image: images.map((i: any) => i.url),
          brand: p.vendor || "VeaLive 360",
          sku: p.variants?.nodes?.[0]?.sku,
          offers: p.variants?.nodes?.map((v: any) => ({
            "@type": "Offer",
            price: v.price?.amount,
            priceCurrency: v.price?.currencyCode,
            availability: v.availableForSale
              ? "https://schema.org/InStock"
              : "https://schema.org/OutOfStock",
            url: `https://{YOUR_DOMAIN}/ecommerce/${p.handle}`,
            sku: v.sku,
          })),
        }}
      />

      {/* HERO */}
      <section id="product-hero" className="mt-0.5 mb-10">
        <div className="mx-auto max-w-6xl px-4 grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
          {/* Gallery */}
          <div className="space-y-3">
            <div className="relative aspect-square rounded-2xl overflow-hidden border border-zinc-200">
              {primary && <Image src={primary} alt={p.title} fill className="object-cover" />}
              <div className="absolute inset-0 gradient-brand opacity-10 pointer-events-none" />
            </div>
            {/* Thumbs */}
            {images.length > 1 && (
              <div className="grid grid-cols-5 gap-2">
                {images.slice(0, 5).map((img: any, i: number) => (
                  <div key={i} className="relative aspect-square rounded-lg overflow-hidden border">
                    <Image src={img.url} alt={img.altText || p.title} fill className="object-cover" />
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Right column -> interactive client UI */}
          <ProductDetailClient product={p} optionSpecs={p.options?.map((o: any) => o.name) || []} bullets={bullets} />
        </div>
      </section>

      {/* DESCRIPTION / RICH CONTENT */}
      <section className="pb-12">
        <div className="mx-auto max-w-6xl px-4 grid grid-cols-1 lg:grid-cols-12 gap-8">
          <article className="prose prose-zinc max-w-none lg:col-span-8">
            <div dangerouslySetInnerHTML={{ __html: p.descriptionHtml }} />
          </article>

          {/* Specs snapshot card */}
          <aside className="lg:col-span-4 space-y-4">
  <div className="p-6 rounded-card bg-white border border-zinc-100 shadow-soft">
    <div className="inline-flex items-center px-3 py-1 rounded-full bg-zinc-100 text-xs font-medium">
      Specs snapshot
    </div>
    <div className="mt-3 grid grid-cols-1 sm:grid-cols-2 gap-3">
      {specsList.slice(0, 10).map(({ k, v }, i) => {
        const Icon = pickIconFor(k);
        return (
          <div key={`${k}-${i}`} className="flex items-start gap-2 rounded-lg border border-zinc-100 bg-white p-3 shadow-inner">
            <span className="mt-0.5 grid place-items-center h-7 w-7 rounded-full bg-zinc-50 border border-zinc-200">
              <Icon className="h-4 w-4 text-zinc-700" />
            </span>
            <div className="min-w-0">
              <div className="text-xs uppercase tracking-wide text-zinc-500">{k}</div>
              <div className="text-sm font-medium text-zinc-800 truncate" title={v}>{v}</div>
            </div>
          </div>
        );
      })}
    </div>
    {specsList.length > 10 && (
      <div className="mt-3 text-xs text-zinc-500">Showing highlights • full details in description.</div>
    )}
  </div>

  {/* Why VeaLive panel */}
  <div className="p-6 rounded-card bg-white border border-zinc-100 shadow-soft relative overflow-hidden">
    <div className="absolute -top-16 -left-12 w-44 h-44 bg-brand-blue/10 blur-2xl" />
    <div className="absolute -bottom-20 -right-12 w-52 h-52 bg-brand-green/10 blur-2xl" />
    <div className="relative">
      <div className="inline-flex items-center px-3 py-1 rounded-full bg-zinc-100 text-xs font-medium">
        Why VeaLive
      </div>

      <ul className="mt-3 space-y-3 text-sm text-zinc-700">
  <li className="flex items-start gap-2">
    <span className="mt-1 text-brand-blue">
      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
      </svg>
    </span>
    <span><strong className="text-zinc-900">Local-first setup.</strong> Your logic runs at home for speed & privacy; cloud is optional.</span>
  </li>
  <li className="flex items-start gap-2">
    <span className="mt-1 text-brand-blue">
      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
      </svg>
    </span>
    <span><strong className="text-zinc-900">Free consult.</strong> We help pick compatible gear and map quick wins.</span>
  </li>
  <li className="flex items-start gap-2">
    <span className="mt-1 text-brand-blue">
      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
      </svg>
    </span>
    <span><strong className="text-zinc-900">Easy returns.</strong> 14-day returns on unopened items; swap support for DOA.</span>
  </li>
  <li className="flex items-start gap-2">
    <span className="mt-1 text-brand-blue">
      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
      </svg>
    </span>
    <span><strong className="text-zinc-900">On-site provisioning.</strong> Optional install & pairing with scene presets.</span>
  </li>
</ul>


      {/* mini badges row */}
      <div className="mt-4 flex flex-wrap gap-2">
        {["Curated & compatible", "Warranty assisted", "Matter-ready", "Secure defaults"].map((t) => (
          <span key={t} className="px-2.5 py-1 rounded-full border border-zinc-200 bg-zinc-50 text-[11px] font-medium text-zinc-700">
            {t}
          </span>
        ))}
      </div>
    </div>
  </div>
</aside>
        </div>
      </section>
    </main>
  );
}

/** Client wrapper import */
import ProductDetailClient from "./product.client";
