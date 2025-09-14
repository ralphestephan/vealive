// app/api/checkout/route.ts (SERVER)
import { NextRequest, NextResponse } from 'next/server';
import { shopifyFetch } from '@/lib/shopify';

const CART_CREATE = /* GraphQL */ `
  mutation CartCreate($lines: [CartLineInput!]) {
    cartCreate(input: { lines: $lines }) {
      cart { id checkoutUrl }
      userErrors { field message }
    }
  }
`;



export async function POST(req: NextRequest) {
  const { lines } = await req.json();
  // lines = [{ merchandiseId: 'gid://shopify/ProductVariant/123', quantity: 1 }, ...]

  const data = await shopifyFetch<any>(CART_CREATE, { lines });
  const errs = data?.cartCreate?.userErrors;
  if (errs?.length) {
    return NextResponse.json({ errors: errs }, { status: 400 });
  }
  const url = data?.cartCreate?.cart?.checkoutUrl;
  if (!url) return NextResponse.json({ errors: [{ message: 'Missing checkout URL' }] }, { status: 500 });
  return NextResponse.json({ url });
}
