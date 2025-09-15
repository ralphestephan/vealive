// lib/catalog.ts
import type { Product as UiProduct } from "@/components/EcommerceGrid";

export type Cat = UiProduct["category"];

export function normalizeCategory(input?: string): Cat {
  const v = (input || "").toLowerCase();
  if (v.includes("light")) return "Lighting";
  if (/(climate|thermostat|hvac)/i.test(v)) return "Climate";
  if (/(lock|camera|security)/i.test(v)) return "Security";
  if (/(speaker|audio|sound)/i.test(v)) return "Audio";
  if (/(hub|bridge|gateway|controller)/i.test(v)) return "Hubs";
  return "Other";
}

export function guessCategoryFromShopify(p: any): Cat {
  if (p?.productType) {
    const c = normalizeCategory(p.productType);
    if (c !== "Other") return c;
  }
  if (Array.isArray(p?.tags)) {
    // try all tags, not just the first
    for (const t of p.tags) {
      const c = normalizeCategory(t);
      if (c !== "Other") return c;
    }
  }
  return "Other";
}
