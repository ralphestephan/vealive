"use client";

import { useMemo, useState } from "react";
import { useCart } from "@/components/cart/CartContext";
import Link from "next/link";

type V = {
  id: string;
  title: string;
  sku?: string;
  availableForSale: boolean;
  quantityAvailable?: number | null;
  selectedOptions: { name: string; value: string }[];
  price: { amount: string; currencyCode: string };
  compareAtPrice?: { amount: string; currencyCode: string } | null;
  image?: { url: string; altText?: string } | null;
};

import {
    Gauge, Cpu, Wifi, Router, Plug, Layers, BatteryCharging, Thermometer,
    Droplets, Fan, Sun, Moon, Lock, ShieldCheck, Cloud, HardDrive, Bolt, Boxes, Barcode
  } from "lucide-react";
  
  const SPEC_ICON: Record<string, any> = {
    brand: BadgeIcon, // custom minimal badge below
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
  function BadgeIcon(props: any) { return <span className="inline-block h-4 w-4 rounded-full border" {...props}/>; }
  
  // best-effort pick by key or fallback
  function pickIconFor(key: string) {
    const k = key.toLowerCase();
    for (const hint of Object.keys(SPEC_ICON)) {
      if (k.includes(hint)) return SPEC_ICON[hint];
    }
    return Gauge;
  }
  

export default function ProductDetailClient({
  product,
  optionSpecs = [],
  bullets = "",
}: {
  product: any;
  optionSpecs: string[];
  bullets: string;
}) {
  const { add } = useCart();

  const variants: V[] = product.variants?.nodes ?? [];
  const options = product.options ?? [];

  // Default to first available variant
  const firstAvailable = variants.find((v) => v.availableForSale) ?? variants[0];
  const [selected, setSelected] = useState<V | null>(firstAvailable ?? null);

  const price = useMemo(() => {
    if (!selected) return "";
    const a = Number(selected.price.amount).toFixed(2);
    return `${selected.price.currencyCode} ${a}`;
  }, [selected]);

  const inStock = !!selected?.availableForSale && (selected.quantityAvailable ?? 1) > 0;

  function onChangeOption(name: string, value: string) {
    // find variant that matches all selected options
    const next = variants.find((v) => {
      const map = new Map(v.selectedOptions.map((o) => [o.name, o.value]));
      const cur = new Map(selected?.selectedOptions.map((o) => [o.name, o.value]));
      cur.set(name, value);
      return options.every((o: any) => map.get(o.name) === cur.get(o.name));
    });
    if (next) setSelected(next);
  }

  function onAdd() {
    if (!selected) return;
    const img = selected.image?.url || product.featuredImage?.url || product.images?.nodes?.[0]?.url || "";
    add(
      { id: selected.id, title: product.title + (selected.title && selected.title !== "Default Title" ? ` — ${selected.title}` : ""), price: Number(selected.price.amount), img },
      1
    );
  }

  return (
    <div className="space-y-4">
      <div>
        <span className="inline-flex items-center px-3 py-1 rounded-full bg-zinc-100 text-xs font-medium">
          {product.productType || "Device"}
        </span>
        <h1 className="mt-2 text-3xl font-extrabold leading-tight tracking-tight">
          <span className="bg-gradient-to-r from-brand-blue to-brand-green bg-clip-text text-transparent">
            {product.title}
          </span>
        </h1>
      </div>

      {/* Price + availability */}
      <div className="flex items-center gap-3">
        <div className="text-xl font-bold">{price}</div>
        {selected?.compareAtPrice?.amount && (
          <div className="text-sm line-through text-zinc-500">
            {selected.compareAtPrice.currencyCode} {Number(selected.compareAtPrice.amount).toFixed(2)}
          </div>
        )}
        <span
          className={`ml-2 inline-flex items-center px-2.5 h-6 rounded-full text-xs ${
            inStock ? "bg-emerald-100 text-emerald-700" : "bg-red-100 text-red-700"
          }`}
        >
          {inStock ? "In stock" : "Out of stock"}
        </span>
      </div>

      {/* Variant pickers */}
      {options?.length > 0 && options[0]?.name !== "Title" && (
        <div className="space-y-3">
          {options.map((o: any) => {
            // values that exist among variants
            const values: string[] = Array.from(new Set(variants.map((v) => v.selectedOptions.find((x) => x.name === o.name)?.value).filter((v): v is string => Boolean(v))));
            const current = selected?.selectedOptions.find((x) => x.name === o.name)?.value;

            return (
              <div key={o.name}>
                <div className="text-sm font-medium">{o.name}</div>
                <div className="mt-1 flex flex-wrap gap-2">
                  {values.map((val) => {
                    // is this option value in stock for some variant that matches other choices?
                    const candidate = variants.find((v) => {
                      const m = new Map(v.selectedOptions.map((x) => [x.name, x.value]));
                      // match other currently selected options
                      const okOthers = selected?.selectedOptions.every((x) => x.name === o.name || m.get(x.name) === x.value);
                      return okOthers && m.get(o.name) === val;
                    });
                    const valueInStock = !!candidate?.availableForSale && (candidate.quantityAvailable ?? 1) > 0;
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

      {/* Quick bullets (from metafield) */}
      {bullets && (
        <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-sm">
          {bullets.split("\n").slice(0, 6).map((b, i) => (
            <li key={i} className="rounded-lg bg-white border border-zinc-100 shadow-inner p-3">
              {b}
            </li>
          ))}
        </ul>
      )}

      {/* CTAs */}
      <div className="flex items-center gap-3">
        <button
          onClick={onAdd}
          disabled={!inStock}
          className={`shrink-0 px-5 h-11 inline-flex items-center justify-center rounded-full text-sm font-semibold
            ${inStock
              ? "bg-gradient-to-r from-brand-blue to-brand-green text-white hover:brightness-110"
              : "bg-zinc-200 text-zinc-500 cursor-not-allowed"}`}
        >
          {inStock ? "Add to cart" : "Out of stock"}
        </button>

        <Link href="/contact" className="px-5 h-11 inline-flex items-center justify-center rounded-full border border-zinc-300 text-sm font-semibold hover:border-brand-blue">
          Need help? Talk to us
        </Link>
      </div>
    </div>
  );
}
