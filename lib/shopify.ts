import 'server-only';

const domain = process.env.SHOPIFY_STORE_DOMAIN!;
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
    // Avoid caching secrets on the client; this runs on the server only
    cache: 'no-store',
    // You can opt into ISR later by removing no-store and using revalidate on callers
  });
  if (!res.ok) {
    const text = await res.text();
    throw new Error(`Shopify fetch failed: ${res.status} ${res.statusText} — ${text}`);
  }
  const json = await res.json();
  if (json.errors) {
    throw new Error(`Shopify GraphQL errors: ${JSON.stringify(json.errors)}`);
  }
  return json.data;
}

const PRODUCTS_QUERY = /* GraphQL */ `
  query Products($first: Int = 50) {
    products(first: $first, sortKey: TITLE) {
      edges {
        node {
          id
          handle
          title
          description
          productType
          tags
          images(first: 1) { nodes { url altText } }
          variants(first: 1) {
            edges {
              node {
                id
                sku
                price { amount currencyCode }
              }
            }
          }
          priceRange { minVariantPrice { amount currencyCode } }
        }
      }
    }
  }
`;

export type MinimalProduct = {
  id: string;        // NOTE: this will be the VARIANT ID (gid). Used for checkout.
  title: string;
  desc: string;
  price: number;
  img: string;
  category: 'Lighting' | 'Climate' | 'Security' | 'Audio' | 'Hubs' | 'Other';
  tags?: string[];
  handle: string;
  sku?: string | null;
  currency?: string;
};

function mapTypeToCategory(t?: string): MinimalProduct['category'] {
  const v = (t || '').toLowerCase();
  if (v === 'lighting') return 'Lighting';
  if (v === 'climate') return 'Climate';
  if (v === 'security') return 'Security';
  if (v === 'audio') return 'Audio';
  if (v === 'hubs') return 'Hubs';
  return 'Other';
}

export async function getProducts(limit = 50): Promise<MinimalProduct[]> {
  type Resp = {
    products: {
      edges: Array<{
        node: {
          id: string;
          handle: string;
          title: string;
          description: string;
          productType: string;
          tags: string[];
          images: { nodes: { url: string; altText: string | null }[] };
          variants: { edges: { node: { id: string; sku: string | null; price: { amount: string; currencyCode: string } } }[] };
          priceRange: { minVariantPrice: { amount: string; currencyCode: string } };
        };
      }>;
    };
  };

  const data = await shopifyFetch<Resp>(PRODUCTS_QUERY, { first: limit });
  return data.products.edges.map(({ node }) => {
    const variant = node.variants.edges[0]?.node;
    const price = parseFloat(variant?.price.amount ?? node.priceRange.minVariantPrice.amount);
    return {
      id: variant?.id ?? node.id, // use VARIANT ID for checkout
      title: node.title,
      desc: node.description,
      price,
      img: node.images.nodes[0]?.url ?? '',
      category: mapTypeToCategory(node.productType),
      tags: node.tags,
      handle: node.handle,
      sku: variant?.sku ?? null,
      currency: variant?.price.currencyCode ?? node.priceRange.minVariantPrice.currencyCode,
    } satisfies MinimalProduct;
  });
}
