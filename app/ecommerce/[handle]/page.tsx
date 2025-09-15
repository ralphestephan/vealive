import Image from "next/image";
import SEOJsonLd from "@/components/SEOJsonLd";
import { shopifyFetch } from "@/lib/shopify";
import Link from "next/link";
import ProductDetailClient from "./product.client";
import GalleryClient from "./gallery.client";
import { Product } from "@/components/EcommerceGrid";
import { guessCategoryFromShopify } from "@/lib/catalog";



// ---------- query ----------
const PRODUCT_QUERY = /* GraphQL */ `
  query Product($handle: String!) {
    product(handle: $handle) {
      id
      handle
      title
      vendor
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

// ---------- specs helpers ----------
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
    if (/^[-•▪●]/.test(line)) {
      const v = line.replace(/^[-•▪●]\s*/, "");
      if (v.length > 1) specs.push({ k: "Feature", v });
      continue;
    }
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
      .flatMap((o: any) => ({ k: o.name, v: (o.values || []).join(", ") })) as Array<{ k: string; v: string }>;

  const enrich: Array<{ k: string; v: string }> = [];

  // Brand
  if (product.vendor) enrich.push({ k: "Brand", v: product.vendor });

  // Category (prefer productType; fallback to first tag)
  const firstTag = Array.isArray(product.tags) && product.tags.length ? product.tags[0] : "";
  if (product.productType) {
    enrich.push({ k: "Category", v: product.productType });              // ✅ FIXED (k/v)
  } else if (firstTag) {
    enrich.push({ k: "Category", v: firstTag });                          // ✅ use the “Lighting” tag
  }

  // Tags (optional: keep as a separate row)
  if (Array.isArray(product.tags) && product.tags.length) {
    enrich.push({ k: "Tags", v: product.tags.slice(0, 6).join(", ") });
  }

  // Stock / Availability
  const v0 = product.variants?.nodes?.[0];
  if (v0?.sku) enrich.push({ k: "SKU", v: v0.sku });
  if (typeof v0?.quantityAvailable === "number") {
    enrich.push({ k: "Stock", v: String(v0.quantityAvailable) });
  } else {
    enrich.push({ k: "Availability", v: v0?.availableForSale ? "In stock" : "Out of stock" });
  }

  const all = [...fromDesc, ...fromOptions, ...enrich];
  const seen = new Set<string>();
  return all.filter(({ k, v }) => {
    const id = `${k.toLowerCase()}|${v.toLowerCase()}`;
    if (seen.has(id)) return false;
    seen.add(id);
    return k && v;
  });
}
type Cat = Product["category"];

// after fetching p
// Prefer productType; else scan ALL tags; else "Other"
function normalizeCategory(input?: string) {
  const v = (input || "").toLowerCase();
  if (v.includes("light")) return "Lighting";
  if (/(climate|thermostat|hvac)/i.test(v)) return "Climate";
  if (/(lock|camera|security)/i.test(v)) return "Security";
  if (/(speaker|audio|sound)/i.test(v)) return "Audio";
  if (/(hub|bridge)/i.test(v)) return "Hubs";
  return "Other";
}
function guessCategory(p: any) {
  if (p.productType) return normalizeCategory(p.productType);
  if (Array.isArray(p.tags)) {
    const hit = p.tags.find((t: string) => normalizeCategory(t) !== "Other");
    if (hit) return normalizeCategory(hit);
  }
  return "Other";
}



// ---------- page ----------
export default async function Page({ params }: { params: { handle: string } }) {
  const { product: p } = await shopifyFetch<{ product: any }>(PRODUCT_QUERY, { handle: params.handle });
  if (!p) return <div className="mx-auto max-w-6xl px-4 py-16">Not found.</div>;

  const images = p.images?.nodes ?? [];
  const primary = p.featuredImage?.url ?? images[0]?.url ?? "";
  const bullets = p.metafields?.find((m: any) => m?.key === "bullets")?.value ?? "";
  const specsList = buildSpecs(p);
  const category = guessCategoryFromShopify(p);




  return (
    <main className="w-full overflow-x-clip relative">
      <div className="absolute inset-0 -z-10 gradient-multi opacity-5" />
        <div className="mx-auto max-w-6xl px-4 grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
        
                {/* NEW breadcrumb */}
      <div className="inline-flex items-center gap-2 text-xs">
        <Link
          href="/ecommerce"
          className="inline-flex items-center gap-1 rounded-full border border-zinc-200 bg-white/70 px-3 py-1 text-zinc-700 hover:border-brand-blue hover:text-brand-blue transition"
          aria-label="ecommerce"
        >
          Shop
        </Link>
        <span className="text-zinc-400">/</span>
        <span className="px-3 py-1 rounded-full bg-zinc-100 text-zinc-600">
          {p.title || "Product"}
        </span>
      </div>
        </div>
      <SEOJsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "Product",
          name: p.title,
          description: p.description,
          image: images.map((i: any) => i.url),
          brand: p.vendor,
          sku: p.variants?.nodes?.[0]?.sku,
          category,
          offers: p.variants?.nodes?.map((v: any) => ({
            "@type": "Offer",
            price: v.price?.amount,
            priceCurrency: v.price?.currencyCode,
            availability: v.availableForSale
              ? "https://schema.org/InStock"
              : "https://schema.org/OutOfStock",
            url: `/ecommerce/${p.handle}`,
            sku: v.sku,
            
          })),
        }}
      />

      {/* HERO */}
      <section id="product-hero" className="mt-0.5 mb-12">
        <div className="mx-auto max-w-6xl px-4 grid grid-cols-1 lg:grid-cols-12 gap-8">

          {/* LEFT: sticky gallery */}
          <div className="lg:col-span-6">
            <div className="lg:sticky lg:top-24 self-start">
              <GalleryClient
                title={p.title}
                images={images.length ? images : [{ url: primary, altText: p.title }]}
              />
            </div>
          </div>

          {/* RIGHT: title → price → description → specs → CTAs */}
          <div className="lg:col-span-6">
            <ProductDetailClient
              product={p}
              specsList={specsList}
              bullets={bullets}
              category={category}
            />
          </div>
        </div>
      </section>
    </main>
  );
}


