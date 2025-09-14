// app/order/[number]/page.tsx
export const runtime = 'nodejs';

import { prisma } from '@/lib/db';
import WhishActions from './WhishActions';

export default async function OrderPage({ params }: { params: { number: string } }) {
  const order = await prisma.order.findUnique({ where: { number: params.number } });
  if (!order) return <div className="mx-auto max-w-3xl px-4 py-16">Order not found.</div>;

  const items = (order.items as any[]) ?? [];

  return (
    <main className="mx-auto max-w-3xl px-4 py-10">
      <h1 className="text-2xl font-bold">Thank you!</h1>
      <p className="mt-2 text-zinc-700">
        Your order <strong>{order.number}</strong> is received.
      </p>

      {/* Receipt */}
      <div className="mt-6 rounded-xl border bg-white overflow-hidden">
        <div className="px-4 py-3 border-b">
          <div className="font-semibold">Receipt</div>
          <div className="text-xs text-zinc-600">
            {new Date(order.createdAt).toLocaleString()}
          </div>
        </div>
        <div className="p-4 text-sm space-y-2">
          {items.map((i: any, idx: number) => (
            <div key={idx} className="flex justify-between py-2 border-b">
              <div>
                <div className="font-medium">{i.title}</div>
                <div className="text-xs text-zinc-600">
                  Unit ${i.price.toFixed(2)} • Qty {i.qty ?? 1}
                </div>
              </div>
              <div className="font-semibold">
                ${(i.price * (i.qty ?? 1)).toFixed(2)}
              </div>
            </div>
          ))}
          <div className="flex justify-between pt-2 font-semibold">
            <span>Total</span>
            <span>${order.total.toFixed(2)}</span>
          </div>
        </div>
      </div>

      {/* Payment instructions */}
      {order.method === 'whish' ? (
        <WhishActions order={{ number: order.number, total: order.total, currency: order.currency, items }} />
      ) : (
        <div className="mt-6 rounded-xl border p-4 bg-white">
          <h2 className="font-semibold mb-2">Cash on delivery</h2>
          <p className="text-sm">
            Please prepare <strong>{order.currency} ${order.total.toFixed(2)}</strong>. We’ll contact you to schedule delivery.
          </p>
        </div>
      )}
    </main>
  );
}
