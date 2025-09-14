// app/ecommerce/[handle]/page.tsx (SERVER)
import Image from 'next/image';
import { shopifyFetch } from '@/lib/shopify';

const PRODUCT_QUERY = /* GraphQL */ `
  query Product($handle: String!) {
    product(handle: $handle) {
      id
      title
      descriptionHtml
      images(first: 6) { nodes { url altText } }
      variants(first: 10) { nodes { id title sku price { amount currencyCode } } }
    }
  }
`;

export default async function Page({ params }: { params: { handle: string } }) {
  const data = await shopifyFetch<{ product: any }>(PRODUCT_QUERY, { handle: params.handle });
  const p = data.product;
  if (!p) return <div className="mx-auto max-w-6xl px-4 py-16">Not found</div>;
  const primary = p.images?.nodes?.[0]?.url;

  return (
    <div className="mx-auto max-w-6xl px-4 py-10 grid md:grid-cols-2 gap-8">
      <div className="relative aspect-square border rounded-xl overflow-hidden">
        {primary && (
          <Image src={primary} alt={p.title} fill className="object-cover" />
        )}
      </div>
      <div>
        <h1 className="text-3xl font-bold">{p.title}</h1>
        <div className="prose prose-zinc mt-4" dangerouslySetInnerHTML={{ __html: p.descriptionHtml }} />
        {/* You can add variant selector and Add-to-cart -> local cart here */}
      </div>
    </div>
  );
}
