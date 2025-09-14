// app/api/orders/route.ts
export const runtime = 'nodejs';

import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/db';
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

function renderEmailHTML(order: any) {
  const items = order.items as any[];
  const rows = items.map(i => `
    <tr>
      <td style="padding:6px 8px;border-bottom:1px solid #eee;">${i.title}</td>
      <td style="padding:6px 8px;border-bottom:1px solid #eee;text-align:center;">${i.qty ?? 1}</td>
      <td style="padding:6px 8px;border-bottom:1px solid #eee;text-align:right;">$${i.price.toFixed(2)}</td>
      <td style="padding:6px 8px;border-bottom:1px solid #eee;text-align:right;">$${(i.price*(i.qty??1)).toFixed(2)}</td>
    </tr>
  `).join('');
  const brand = process.env.BRAND_NAME || 'Order';
  const phone = process.env.WHISH_PHONE || '';
  const titles = items.map(i => `${i.title}×${i.qty ?? 1}`).join(', ');
  const whishLink = `whish://pay?to=${encodeURIComponent(phone)}&amount=${order.total.toFixed(2)}&note=${encodeURIComponent(`Order ${order.number} — ${titles}`)}`;

  return `
  <div style="font-family:Inter,system-ui,Segoe UI,Roboto,Arial,sans-serif;max-width:640px;margin:0 auto;">
    <h2>${brand} – ${order.number}</h2>
    <p>Hi${order.name ? ` ${order.name}` : ''}, thanks for your order.</p>
    <table style="width:100%;border-collapse:collapse;margin-top:8px">
      <thead>
        <tr>
          <th style="text-align:left;padding:6px 8px;border-bottom:1px solid #ddd;">Item</th>
          <th style="text-align:center;padding:6px 8px;border-bottom:1px solid #ddd;">Qty</th>
          <th style="text-align:right;padding:6px 8px;border-bottom:1px solid #ddd;">Unit</th>
          <th style="text-align:right;padding:6px 8px;border-bottom:1px solid #ddd;">Line</th>
        </tr>
      </thead>
      <tbody>${rows}</tbody>
    </table>
    <p style="margin-top:12px;font-weight:600">Total: $${order.total.toFixed(2)} ${order.currency}</p>
    ${
      order.method === 'whish'
      ? `<p><strong>Pay with Whish:</strong> Send <strong>$${order.total.toFixed(2)}</strong> to <strong>${phone}</strong> and put <strong>${order.number}</strong> in the note.</p>
         <p><a href="${whishLink}">Open Whish app</a></p>`
      : `<p><strong>Cash on Delivery:</strong> prepare $${order.total.toFixed(2)}. We’ll contact you to schedule delivery.</p>`
    }
    <hr style="margin:16px 0;border:none;border-top:1px solid #eee" />
    <p style="font-size:12px;color:#666">Shipping to: ${order.address1 ?? ''}, ${order.city ?? ''} ${order.postal ?? ''}, ${order.country ?? ''}</p>
  </div>`;
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { email, phone, name, address1, address2, city, postal, country, method, items } = body || {};
    if (!Array.isArray(items) || items.length === 0)
      return NextResponse.json({ error: 'Empty cart' }, { status: 400 });

    const currency = process.env.CURRENCY || 'USD';
    const subtotal = items.reduce((s:number,i:any)=> s + (i.price * (i.qty ?? 1)), 0);
    const total = subtotal;

    const created = await prisma.order.create({
      data: {
        number: 'PENDING',
        status: method === 'whish' ? 'awaiting_whish' : 'cash_on_delivery',
        method, email, phone, name, address1, address2, city, postal, country,
        items, subtotal, total, currency
      }
    });

    const prefix = (process.env.BRAND_NAME || 'ORDER').toUpperCase();
    const number = `${prefix}-${String(created.id).padStart(5, '0')}`;
    const order = await prisma.order.update({
      where: { id: created.id },
      data: { number },
    });

    // Send email receipt (to customer + admin)
    try {
      const from = process.env.RESEND_FROM || 'no-reply@example.com';
      const admin = process.env.ADMIN_EMAIL;
      const to: string[] = [];
      if (email) to.push(email);
      if (admin) to.push(admin);

      if (to.length) {
        await resend.emails.send({
          from,
          to,
          subject: `${process.env.BRAND_NAME || 'Order'} ${order.number} — ${order.method === 'whish' ? 'Awaiting Whish' : 'Cash on Delivery'}`,
          html: renderEmailHTML(order)
        });
      }
    } catch (e) {
      // don’t fail the order if email fails
      console.error('Resend error', e);
    }

    return NextResponse.json({ id: order.id, number: order.number, total: order.total });
  } catch (e:any) {
    return NextResponse.json({ error: e.message }, { status: 500 });
  }
}
