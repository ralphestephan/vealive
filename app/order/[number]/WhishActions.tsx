// app/order/[number]/WhishActions.tsx
'use client';
import { useState } from 'react';

const PHONE = process.env.NEXT_PUBLIC_WHISH_PHONE || '';
const CCY = process.env.NEXT_PUBLIC_CURRENCY || 'USD';

function isAndroid() { return /Android/i.test(navigator.userAgent); }
function isIOS() { return /iPhone|iPad|iPod/i.test(navigator.userAgent); }

export default function WhishActions({
  order,
}: {
  order: { number: string; total: number; currency: string; items?: any[] };
}) {
  const items = Array.isArray(order?.items) ? order.items! : [];   // ✅ guard
  const titles = items.map((i: any) => `${i.title}×${i.qty ?? 1}`).join(', ');
  const note = `Order ${order.number} — ${titles}`;
  const [copied, setCopied] = useState<string>('');

  async function copy(txt: string, label: string) {
    try { await navigator.clipboard.writeText(txt); setCopied(label); setTimeout(()=>setCopied(''), 1500); } catch {}
  }

  function openWhish() {
    if (isAndroid()) {
      const intent =
        `intent://pay/#Intent;scheme=whish;package=money.whish.android;` +
        `S.browser_fallback_url=${encodeURIComponent('https://play.google.com/store/apps/details?id=money.whish.android')};end`;
      window.location.href = intent;
    } else if (isIOS()) {
      window.location.href = 'https://apps.apple.com/lb/app/whish-money/id1284243483';
    } else {
      window.open('https://www.whish.money/', '_blank');
    }
  }

  return (
    <div className="mt-6 rounded-xl border p-4 bg-white space-y-3">
      <h2 className="font-semibold">Pay with Whish</h2>
      <ol className="list-decimal ml-5 space-y-1 text-sm">
        <li>Tap <strong>Open Whish</strong> below.</li>
        <li>Send <strong>{order.currency} ${order.total.toFixed(2)}</strong> to <strong>{PHONE}</strong>.</li>
        <li>Put <em>{order.number}</em> in the transfer note (or paste the full note).</li>
      </ol>

      <div className="flex flex-wrap gap-2 text-sm">
        <button onClick={() => copy(PHONE, 'phone')} className="rounded-full border px-3 py-1.5">Copy number</button>
        <button onClick={() => copy(order.total.toFixed(2), 'amount')} className="rounded-full border px-3 py-1.5">Copy amount</button>
        <button onClick={() => copy(note, 'note')} className="rounded-full border px-3 py-1.5">Copy note</button>
        {copied && <span className="text-emerald-600">Copied {copied} ✓</span>}
      </div>

      <button onClick={openWhish} className="inline-flex items-center rounded-full bg-brand-blue text-white px-4 py-2 font-semibold">
        Open Whish
      </button>
    </div>
  );
}
