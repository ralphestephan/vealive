import { prisma } from '@/lib/db';

export default async function OrderPage({ params }: { params: { number: string } }) {
  const order = await prisma.order.findUnique({ where: { number: params.number } });
  if (!order) return <div className="mx-auto max-w-3xl px-4 py-16">Order not found.</div>;
  const phone = process.env.WHISH_PHONE || '';

  return (
    <main className="mx-auto max-w-3xl px-4 py-10">
      <h1 className="text-2xl font-bold">Thank you!</h1>
      <p className="mt-2 text-zinc-700">Your order <strong>{order.number}</strong> is received.</p>

      {order.method === 'whish' ? (
        <div className="mt-6 rounded-xl border p-4 bg-white">
          <h2 className="font-semibold mb-2">Pay with Whish</h2>
          <ol className="list-decimal ml-5 space-y-1 text-sm">
            <li>Open the Whish app.</li>
            <li>Send <strong>{order.currency} ${order.total.toFixed(2)}</strong> to <strong>{phone}</strong>.</li>
            <li>Put <em>{order.number}</em> in the payment note.</li>
          </ol>
          {/* Optional deep link if Whish supports it */}
          <a href={`whish://pay?to=${encodeURIComponent(phone)}&amount=${order.total.toFixed(2)}&note=${encodeURIComponent(order.number)}`} className="inline-block mt-3 rounded-full bg-brand-blue text-white px-4 py-2">Open Whish</a>
          <p className="mt-3 text-xs text-zinc-600">Once we receive the transfer we’ll mark your order as paid.</p>
        </div>
      ) : (
        <div className="mt-6 rounded-xl border p-4 bg-white">
          <h2 className="font-semibold mb-2">Cash on delivery</h2>
          <p className="text-sm">Please prepare <strong>{order.currency} ${order.total.toFixed(2)}</strong>. Our team will contact you to schedule delivery.</p>
        </div>
      )}

      <div className="mt-8">
        <h3 className="font-semibold">Items</h3>
        <ul className="text-sm mt-2 space-y-1">
          {(order.items as any[]).map((i:any, idx:number)=> (
            <li key={idx} className="flex justify-between border-b py-1"><span>{i.title} × {i.qty ?? 1}</span><span>${(i.price*(i.qty??1)).toFixed(2)}</span></li>
          ))}
        </ul>
      </div>
    </main>
  );
}
