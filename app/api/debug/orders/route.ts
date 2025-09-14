// app/api/debug/orders/route.ts
export const runtime = 'nodejs';
import { NextResponse } from 'next/server';
import { prisma } from '@/lib/db';
export async function GET() {
  const count = await prisma.order.count();
  return NextResponse.json({ ok: true, count });
}
