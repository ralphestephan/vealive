import 'server-only';

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
  query Products($first: Int = 50) {
    products(first: $first, sortKey: TITLE) {
      edges { node {
        id
        handle
        title
        description
        productType
        tags
        images(first: 1) { nodes { url altText } }
        variants(first: 1) { nodes { id availableForSale price { amount currencyCode } } }
        priceRange { minVariantPrice { amount currencyCode } }
      }}
    }
  }
`;

export type CatalogProduct = {
  id: string;            // we’ll keep VARIANT ID if present, else product id
  title: string;
  desc: string;
  price: number;
  img: string;
  available: boolean;
  category: 'Lighting' | 'Climate' | 'Security' | 'Audio' | 'Hubs' | 'Other';
  tags?: string[];
  handle: string;
  currency: string;
};

function mapTypeToCategory(t?: string): CatalogProduct['category'] {
  const v = (t || '').toLowerCase();
  if (v === 'lighting') return 'Lighting';
  if (v === 'climate') return 'Climate';
  if (v === 'security') return 'Security';
  if (v === 'audio') return 'Audio';
  if (v === 'hubs') return 'Hubs';
  return 'Other';
}

export async function getProducts(limit = 50): Promise<CatalogProduct[]> {
  type Resp = { products: { edges: { node: any }[] } };
  const data = await shopifyFetch<Resp>(PRODUCTS_QUERY, { first: limit });
  return data.products.edges.map(({ node }) => {
    const v = node.variants?.nodes?.[0];
    const price = parseFloat(v?.price?.amount ?? node.priceRange.minVariantPrice.amount);
    return {
      id: v?.id ?? node.id,
      title: node.title,
      desc: node.description,
      price,
      img: node.images?.nodes?.[0]?.url ?? '',
      available: v?.availableForSale ?? true,
      category: mapTypeToCategory(node.productType),
      tags: node.tags,
      handle: node.handle,
      currency: v?.price?.currencyCode ?? node.priceRange.minVariantPrice.currencyCode,
    } as CatalogProduct;
  });
}
