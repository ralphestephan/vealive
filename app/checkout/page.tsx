'use client';
import { useState, useMemo } from 'react';
import { useCart } from '@/components/cart/CartContext';
import { useRouter } from 'next/navigation';

const PHONE = process.env.NEXT_PUBLIC_WHISH_PHONE || '';
const BRAND = process.env.NEXT_PUBLIC_BRAND_NAME || 'Order';
const CCY = process.env.NEXT_PUBLIC_CURRENCY || 'USD';

export default function CheckoutPage() {
  const { lines, total } = useCart() as any;   // ✅ use lines, not items
  const router = useRouter();
  const [form, setForm] = useState({
    email: '', phone: '', name: '',
    address1: '', address2: '', city: '', postal: '',
    country: 'Lebanon', method: 'whish' as 'whish' | 'cash'
  });
  const [submitting, setSubmitting] = useState(false);

  const items = lines || [];
  const now = useMemo(() => new Date(), []);
  const subtotal = items.reduce((s:number, i:any) => s + i.price * (i.qty ?? 1), 0);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSubmitting(true);

    // create order on the server (also sends the email)
    const res = await fetch('/api/orders', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ ...form, items }),
    });
    const json = await res.json();
    setSubmitting(false);

    if (!json?.number) {
      alert(json?.error || 'Failed to place order');
      return;
    }

    // If Whish → try to open app deep-link with amount + note
    if (form.method === 'whish') {
      const titles = items.map((i:any) => `${i.title}×${i.qty ?? 1}`).join(', ');
      const note = `Order ${json.number} — ${titles}`;
      const link = `whish://pay?to=${encodeURIComponent(PHONE)}&amount=${(json.total ?? subtotal).toFixed(2)}&note=${encodeURIComponent(note)}`;
      // open deep-link in a new tab; if the scheme isn't handled, nothing breaks
      try { window.open(link, '_blank'); } catch {}
    }

    // Go to receipt/instructions page
    router.push(`/order/${json.number}`);
  }

  const cta = form.method === 'cash' ? 'Order now' : 'Pay with Whish';

  return (
    <main className="mx-auto max-w-5xl px-4 py-8 grid md:grid-cols-2 gap-8">
      <form onSubmit={onSubmit} className="space-y-4">
        <h1 className="text-2xl font-bold">Checkout</h1>

        <div>
          <label className="block text-sm mb-1">Email</label>
          <input required value={form.email}
            onChange={(e)=>setForm({...form, email: e.target.value})}
            className="w-full rounded border px-3 py-2" />
        </div>

        <div>
          <label className="block text-sm mb-1">Phone</label>
          <input value={form.phone}
            onChange={(e)=>setForm({...form, phone: e.target.value})}
            className="w-full rounded border px-3 py-2" />
        </div>

        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className="block text-sm mb-1">Full name</label>
            <input value={form.name}
              onChange={(e)=>setForm({...form, name: e.target.value})}
              className="w-full rounded border px-3 py-2" />
          </div>
          <div>
            <label className="block text-sm mb-1">Country/Region</label>
            <input value={form.country}
              onChange={(e)=>setForm({...form, country: e.target.value})}
              className="w-full rounded border px-3 py-2" />
          </div>
        </div>

        <div>
          <label className="block text-sm mb-1">Address</label>
          <input value={form.address1}
            onChange={(e)=>setForm({...form, address1: e.target.value})}
            className="w-full rounded border px-3 py-2" />
        </div>

        <div className="grid grid-cols-2 gap-3">
          <input placeholder="City" value={form.city}
            onChange={(e)=>setForm({...form, city: e.target.value})}
            className="rounded border px-3 py-2" />
          <input placeholder="Postal" value={form.postal}
            onChange={(e)=>setForm({...form, postal: e.target.value})}
            className="rounded border px-3 py-2" />
        </div>

        <fieldset className="border rounded p-3">
          <legend className="text-sm font-medium">Payment</legend>
          <label className="flex items-center gap-2 py-2">
            <input type="radio" name="method" checked={form.method==='whish'}
              onChange={()=>setForm({...form, method:'whish'})} /> Whish Pay
          </label>
          <label className="flex items-center gap-2 py-2">
            <input type="radio" name="method" checked={form.method==='cash'}
              onChange={()=>setForm({...form, method:'cash'})} /> Cash on delivery
          </label>
        </fieldset>

        <button
          disabled={!items?.length || submitting}
          className="w-full rounded-full bg-emerald-600 text-white py-3 font-semibold disabled:opacity-50"
        >
          {submitting ? 'Placing…' : cta}
        </button>
      </form>

      {/* Receipt-style summary */}
      <aside className="rounded-xl border bg-white">
        <div className="p-4 border-b">
          <h2 className="font-semibold">Receipt</h2>
          <p className="text-xs text-zinc-600">
            {BRAND} • {now.toLocaleString()}
          </p>
        </div>

        <div className="p-4 space-y-2 text-sm">
          {items.map((i:any)=> (
            <div key={i.id} className="flex items-center justify-between gap-3 py-2">
              <div className="min-w-0">
                <div className="font-medium truncate">{i.title}</div>
                <div className="text-xs text-zinc-600">Unit {CCY} ${i.price.toFixed(2)} • Qty {i.qty ?? 1}</div>
              </div>
              <div className="font-semibold">
                ${ (i.price * (i.qty ?? 1)).toFixed(2) }
              </div>
            </div>
          ))}

          <div className="h-px bg-zinc-200 my-2" />
          <div className="flex justify-between"><span>Subtotal</span><span>${subtotal.toFixed(2)}</span></div>
          <div className="flex justify-between text-zinc-600"><span>Shipping</span><span>$0.00</span></div>
          <div className="flex justify-between text-zinc-600"><span>Tax</span><span>$0.00</span></div>
          <div className="flex justify-between text-base font-semibold">
            <span>Total</span><span>${(total ?? subtotal).toFixed(2)}</span>
          </div>
          <p className="text-[11px] text-zinc-500 mt-2">Thank you for shopping with {BRAND}.</p>
        </div>
      </aside>
    </main>
  );
}
