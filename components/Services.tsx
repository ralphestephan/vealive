// components/Services.tsx
"use client";

import { Home, PlugZap, ShieldHalf, ShoppingBag } from "lucide-react";
import Link from "next/link";

const services = [
  {
    title: "Home Consultation",
    body:
      "We assess your space and goals, then craft a tailored smart-home plan across comfort, security, and energy.",
    icon: Home,
    href: "/contact",
    tint: "blue" as const,
  },
  {
    title: "Smart Devices Tailoring & E-Shop",
    body:
      "Device curation and configuration that fit your lifestyle—plus a streamlined shop to buy what you need.",
    icon: ShoppingBag,
    href: "/ecommerce",
    tint: "green" as const,
  },
  {
    title: "Energy Monitoring",
    body:
      "Real-time usage, alerts, and insights to cut waste and optimize bills—at home or across properties.",
    icon: PlugZap,
    href: "/solutions",
    tint: "blue" as const,
  },
  {
    title: "Smart Dome",
    body:
      "Our signature control hub: scenes, automations, and voice integrations in one elegant centerpiece.",
    icon: ShieldHalf,
    href: "/homedome",
    tint: "green" as const,
  },
];

export default function Services() {
  return (
    <section className="py-16 relative">
      {/* soft BG wash */}
    <div className="relative mb-10 flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4">
        {/* soft corner glow */}
        <div className="pointer-events-none absolute -top-10 -left-10 w-40 h-40 rounded-full bg-brand-blue/10 blur-3xl" />
        <div className="pointer-events-none absolute -bottom-10 -right-10 w-40 h-40 rounded-full bg-brand-green/10 blur-3xl" />

        <div>
            <span className="inline-flex items-center px-3 py-1 rounded-full bg-zinc-100 text-xs font-medium">
            What we do
            </span>
            <h2 className="mt-2 text-3xl sm:text-4xl font-extrabold tracking-tight">
            <span className="bg-gradient-to-r from-brand-blue to-brand-green bg-clip-text text-transparent">
               Our Services
            </span>
            </h2>
            <p className="mt-2 text-zinc-600">
            Tailored automation for comfort, security, and energy — built around your routine.
            </p>
            {/* accent underline */}
            <span className="mt-3 block h-1 w-20 rounded-full bg-gradient-to-r from-brand-blue to-brand-green" />
        </div>

        <Link
            href="/solutions"
            className="inline-flex items-center gap-2 self-start sm:self-auto rounded-full border border-zinc-300 px-4 py-2 text-sm font-semibold hover:border-brand-blue"
        >
            See all <span aria-hidden>→</span>
        </Link>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {services.map(({ title, body, icon: Icon, href, tint }) => {
            const chip =
              tint === "green"
                ? "bg-brand-green/10 text-brand-green"
                : "bg-brand-blue/10 text-brand-blue";
            const glow =
              tint === "green"
                ? "bg-brand-green/10"
                : "bg-brand-blue/10";

            return (
              <article
                key={title}
                className="group relative h-full flex flex-col p-6 rounded-card shadow-soft bg-white border border-zinc-100 hover:shadow-lg transition-shadow"
              >
                {/* subtle corner glow */}
                <div className={`pointer-events-none absolute -top-10 -right-10 w-28 h-28 rounded-full ${glow} blur-2xl`} />

                <div className={`w-12 h-12 rounded-xl ${chip} flex items-center justify-center mb-4`}>
                  <Icon className="w-6 h-6" aria-hidden />
                </div>

                <h3 className="text-xl font-bold">{title}</h3>

                {/* clamp to keep heights equal */}
                <p className="mt-2 text-zinc-600 leading-6 line-clamp-4">
                  {body}
                </p>

                {/* CTA pinned to bottom */}
                <Link
                  href={href}
                  className="mt-auto inline-flex items-center gap-2 text-sm font-semibold text-brand-blue"
                >
                  Explore
                  <span
                    aria-hidden
                    className="transition-transform group-hover:translate-x-0.5"
                  >
                    →
                  </span>
                </Link>
              </article>
            );
          })}
        </div>
    
    </section>
  );
}
