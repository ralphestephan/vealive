// lib/shopify.ts (or wherever getProducts lives)
import 'server-only';
import { guessCategoryFromShopify } from "./catalog";
import type { Product as UiProduct } from "@/components/EcommerceGrid";



const domain = process.env.SHOPIFY_STORE_DOMAIN!; // e.g. my-store.myshopify.com
const token = process.env.SHOPIFY_STOREFRONT_ACCESS_TOKEN!;
const apiVersion = process.env.SHOPIFY_API_VERSION || '2024-10';

export async function shopifyFetch<T>(query: string, variables?: Record<string, any>): Promise<T> {
  const res = await fetch(`https://${domain}/api/${apiVersion}/graphql.json`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'X-Shopify-Storefront-Access-Token': token,
    },
    body: JSON.stringify({ query, variables }),
    cache: 'no-store',
  });
  if (!res.ok) throw new Error(`Shopify ${res.status} ${res.statusText}`);
  const json = await res.json();
  if (json.errors) throw new Error(JSON.stringify(json.errors));
  return json.data;
}


const PRODUCTS_QUERY = /* GraphQL */ `
  query Products($first: Int!) {
    products(first: $first) {
      nodes {
        id
        title
        handle
        description
        productType
        vendor
        tags
        featuredImage { url }
        variants(first: 1) {
          nodes {
            id
            price { amount }
            availableForSale
          }
        }
      }
    }
  }
`;

export async function getProducts(first = 60): Promise<UiProduct[]> {
  const { products } = await shopifyFetch<{ products: { nodes: any[] } }>(PRODUCTS_QUERY, { first });
  return (products?.nodes ?? []).map((p) => {
    const v0 = p.variants?.nodes?.[0];
    const category = guessCategoryFromShopify(p); // <-- THE FIX
    return {
      id: v0?.id ?? p.id,                           // use variant id for cart lines
      title: p.title,
      desc: p.description?.slice(0, 180) || "",
      price: Number(v0?.price?.amount ?? 0),
      img: p.featuredImage?.url || "/images/placeholders/product.jpg",
      category,                                     // <-- THE FIX (not "Other")
      available: !!v0?.availableForSale,
      // (optional) add handle/tags if your grid uses them
      // @ts-ignore - extend type if you want these officially typed
      handle: p.handle,
      // @ts-ignore
      tags: p.tags,
    } as UiProduct;
  });
}
