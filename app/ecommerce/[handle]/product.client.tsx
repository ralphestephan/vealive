"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { useCart } from "@/components/cart/CartContext";

import { Wrench, MessageCircle, RefreshCcw, Zap } from "lucide-react";
import {
  Gauge, Cpu, Wifi, Router, Plug, Layers, BatteryCharging, Thermometer,
  Droplets, Fan, Sun, Moon, Lock, ShieldCheck, Cloud, HardDrive, Bolt, Boxes, Barcode
} from "lucide-react";

import { Factory, Package, Tags as TagsIcon } from "lucide-react";
import CartDrawer from '@/components/cart/CartDrawer';



// ---------- icon picking ----------
const SPEC_ICON: Record<string, any> = {
  brand: Factory,
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
  stock: Package,
  availability: Package,
  tags: TagsIcon,
};

function pickSpecIcon(k: string) {
  const key = k.toLowerCase();
  for (const needle of Object.keys(SPEC_ICON)) {
    if (key.includes(needle)) return SPEC_ICON[needle];
  }
  return Gauge; // fallback
};



const SPEC_ORDER = ["Brand", "Category", "SKU", "Stock", "Availability"];

function orderSpecs(list: { k: string; v: string }[]) {
  return [...list].sort((a, b) => {
    const ai = SPEC_ORDER.indexOf(a.k);
    const bi = SPEC_ORDER.indexOf(b.k);
    return (ai === -1 ? Number.MAX_SAFE_INTEGER : ai) - (bi === -1 ? Number.MAX_SAFE_INTEGER : bi);
  });
}


type Spec = { k: string; v: string };

export default function ProductDetailClient({
  product,
  specsList = [],
  bullets = "",
  category,
}: {
  product: any;
  specsList: Spec[];
  bullets?: string;
  category?: string;
}) {
  const { add } = useCart();

  const variants = product.variants?.nodes ?? [];
  const options = product.options ?? [];
  const firstAvailable = variants.find((v: any) => v.availableForSale) ?? variants[0];
  const [selected, setSelected] = useState<any>(firstAvailable ?? null);

  const price = useMemo(() => {
    if (!selected) return "";
    const a = Number(selected.price.amount).toFixed(2);
    return `${selected.price.currencyCode} ${a}`;
  }, [selected]);

  const inStock = !!selected?.availableForSale && (selected?.quantityAvailable ?? 1) > 0;

  function onChangeOption(name: string, value: string) {
    const next = variants.find((v: any) => {
      const m = new Map(v.selectedOptions.map((x: any) => [x.name, x.value]));
      const cur = new Map(selected?.selectedOptions.map((x: any) => [x.name, x.value]));
      cur.set(name, value);
      return options.every((o: any) => m.get(o.name) === cur.get(o.name));
    });
    if (next) setSelected(next);
  }

  function onAdd() {
    if (!selected) return;
    const img =
      selected.image?.url ||
      product.featuredImage?.url ||
      product.images?.nodes?.[0]?.url ||
      "";
    add(
      {
        id: selected.id,
        title:
          product.title +
          (selected.title && selected.title !== "Default Title" ? ` — ${selected.title}` : ""),
        price: Number(selected.price.amount),
        img,
      },
      1
    );
  }

  // optional: derive short bullets from description if metafield empty
  const featureBullets =
    (bullets && bullets.split("\n").filter(Boolean).slice(0, 4)) || [];

return (
  <>
    <div className="space-y-6">
      
      {/* Title */}
      <div>
        
        <span className="inline-flex items-center px-3 py-1 rounded-full bg-zinc-100 text-xs font-medium">
          {category || product.productType || "Device"}
        </span>

        <h1 className="mt-2 text-4xl font-extrabold leading-tight tracking-tight">
          <span className="bg-gradient-to-r from-brand-blue to-brand-green bg-clip-text text-transparent">
            {product.title}
          </span>
        </h1>
      </div>

      {/* Price + Availability */}
      <div className="flex items-center gap-3">
        <div className="text-2xl font-bold">{price}</div>
        <span
          className={`inline-flex items-center px-2.5 h-7 rounded-full text-xs ${
            inStock ? "bg-emerald-100 text-emerald-700" : "bg-red-100 text-red-700"
          }`}
        >
          {inStock ? "In stock" : "Out of stock"}
        </span>
      </div>

      {/* >>> CTA ROW — moved above specs <<< */}
      <div className="flex items-center gap-3">
        <button
          onClick={onAdd}
          disabled={!inStock}
          className={`shrink-0 px-5 h-11 inline-flex items-center justify-center rounded-full text-sm font-semibold
            ${
              inStock
                ? "bg-gradient-to-r from-brand-blue to-brand-green text-white hover:brightness-110"
                : "bg-zinc-200 text-zinc-500 cursor-not-allowed"
            }`}
        >
          {inStock ? "Add to cart" : "Out of stock"}
         
        </button>

        <Link
          href="/contact"
          className="px-5 h-11 inline-flex items-center justify-center rounded-full border border-zinc-300 text-sm font-semibold hover:border-brand-blue"
        >
          Need help? Talk to us
        </Link>
      </div>

      {/* Description under the CTAs */}
      {product.descriptionHtml && (
        <article
          className="prose prose-zinc max-w-none"
          dangerouslySetInnerHTML={{ __html: product.descriptionHtml }}
        />
      )}

 


        {/* Variant pickers */}
        {options?.length > 0 && options[0]?.name !== "Title" && (
          <div className="space-y-3">
            {options.map((o: any) => {
              const values: string[] = Array.from(
                new Set(
                  variants
                    .map((v: any) => v.selectedOptions.find((x: any) => x.name === o.name)?.value)
                    .filter(Boolean)
                )
              );
              const current = selected?.selectedOptions.find((x: any) => x.name === o.name)?.value;

              return (
                <div key={o.name}>
                  <div className="text-sm font-medium">{o.name}</div>
                  <div className="mt-1 flex flex-wrap gap-2">
                    {values.map((val) => {
                      const candidate = variants.find((v: any) => {
                        const m = new Map(v.selectedOptions.map((x: any) => [x.name, x.value]));
                        const okOthers = selected?.selectedOptions.every(
                          (x: any) => x.name === o.name || m.get(x.name) === x.value
                        );
                        return okOthers && m.get(o.name) === val;
                      });
                      const valueInStock =
                        !!candidate?.availableForSale && (candidate.quantityAvailable ?? 1) > 0;
                      const isActive = current === val;

                      return (
                        <button
                          key={val}
                          onClick={() => onChangeOption(o.name, val)}
                          disabled={!valueInStock}
                          className={`px-3 h-9 rounded-full border text-sm font-medium transition
                            ${isActive ? "border-brand-blue text-brand-blue bg-brand-blue/5" : "border-zinc-300 hover:border-brand-blue"}
                            ${!valueInStock ? "opacity-40 cursor-not-allowed" : ""}`}
                        >
                          {val}
                        </button>
                      );
                    })}
                  </div>
                </div>
              );
            })}
          </div>
        )}

{/* Specs snapshot */}
{specsList?.length > 0 && (
  <div className="mt-6 p-6 rounded-card bg-white border border-zinc-100 shadow-soft">
    <div className="inline-flex items-center px-3 py-1 rounded-full bg-zinc-100 text-xs font-medium">
      Specs snapshot
    </div>

    <div className="mt-3 grid grid-cols-1 sm:grid-cols-2 gap-3">
      {orderSpecs(
        // If you don't want Tags in the snapshot, keep the filter below.
        // Remove the .filter(...) if you DO want to show Tags.
        specsList
      )
        .slice(0, 10)
        .map(({ k, v }, i) => {
          const Icon = pickSpecIcon(k);
          return (
            <div
              key={`${k}-${i}`}
              className="flex items-start gap-2 rounded-lg border border-zinc-100 bg-white p-3 shadow-inner"
            >
              <span className="mt-0.5 grid place-items-center h-7 w-7 rounded-full bg-zinc-50 border border-zinc-200">
                <Icon className="h-4 w-4 text-zinc-700" />
              </span>
              <div className="min-w-0">
                <div className="text-xs uppercase tracking-wide text-zinc-500">{k}</div>
                <div className="text-sm font-medium text-zinc-800 truncate" title={v}>
                  {v}
                </div>
              </div>
            </div>
          );
        })}
    </div>

    {specsList.length > 10 && (
      <div className="mt-3 text-xs text-zinc-500">Showing highlights • full details in description.</div>
    )}
  </div>
)}


        {/* (Optional) Selling points */}
        {featureBullets.length > 0 && (
          <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-sm">
            {featureBullets.map((b, i) => (
              <li key={i} className="rounded-lg bg-white border border-zinc-100 shadow-inner p-3">
                {b}
              </li>
            ))}
          </ul>
        )}



{/* USPs Snapshot */}
<div className="mt-6 p-6 rounded-card bg-white border border-zinc-100 shadow-soft">
  <h3 className="text-sm font-semibold text-zinc-500 mb-4">Why choose this product?</h3>
  <div className="grid gap-4 sm:grid-cols-2">
    {[
      {
        icon: <Wrench className="w-7 h-6 " />,
        title: "Local first setup",
        desc: "Installed & supported locally for faster onboarding.",
      },
      {
        icon: <MessageCircle className="w-7 h-6 " />,
        title: "Free consultation",
        desc: "Expert help at no extra cost to get you started.",
      },
      {
        icon: <RefreshCcw className="w-7 h-6 " />,
        title: "Easy returns",
        desc: "Hassle-free return policy for peace of mind.",
      },
      {
        icon: <Zap className="w-7 h-6 " />,
        title: "Plug & play",
        desc: "Quick deployment — minimal downtime.",
      },
    ].map((usp, i) => (
      <div
        key={i}
        className="flex items-start gap-3 p-3 rounded-lg border border-zinc-100 hover:shadow transition"
      >
        {usp.icon}
        <div>
          <div className="font-semibold">{usp.title}</div>
          <div className="text-sm text-zinc-600">{usp.desc}</div>
        </div>
      </div>
    ))}
  </div>
</div>

      </div>
 <CartDrawer />
 
    </>
    
  );

}

