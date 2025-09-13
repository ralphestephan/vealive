// components/Services.tsx
"use client";

import { useEffect, useRef } from "react";
import { Home, PlugZap, ShieldHalf, ShoppingBag } from "lucide-react";
import Link from "next/link";
import DynamicUnderline from "@/components/ui/DynamicUnderline";

const services = [
  {
    title: "Home Consultation",
    body:
      "We assess your space and goals, then craft a tailored smart-home plan across comfort, security, and energy.",
    icon: Home,
    href: "/solutions",
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
    href: "/solutions/energy-monitoring",
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
  const wrapRef = useRef<HTMLElement | null>(null);

  // simple reveal-on-scroll for the grid
  useEffect(() => {
    const root = wrapRef.current;
    if (!root) return;

    const prefersReduced =
      typeof window !== "undefined" &&
      window.matchMedia?.("(prefers-reduced-motion: reduce)")?.matches;

    const cards = Array.from(root.querySelectorAll<HTMLElement>("[data-svc-card]"));
    if (prefersReduced) {
      cards.forEach((c) => c.classList.add("reveal-in"));
      return;
    }

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add("reveal-in");
            io.unobserve(e.target);
          }
        });
      },
      { threshold: 0.12 }
    );

    cards.forEach((c) => {
      c.classList.add("reveal-base");
      io.observe(c);
    });

    return () => io.disconnect();
  }, []);

  return (
    <section ref={wrapRef} className="py-16 relative">
      {/* contained soft wash that fades at edges */}
      <div
        className="absolute inset-0 -z-10 bg-gradient-to-b from-brand-blue/[0.06] via-brand-green/[0.06] to-transparent"
        style={{
          WebkitMaskImage:
            "linear-gradient(to bottom, transparent, black 10%, black 90%, transparent)",
          maskImage:
            "linear-gradient(to bottom, transparent, black 10%, black 90%, transparent)",
        }}
      />

      <div className="mx-auto max-w-6xl px-4">
        {/* Section header */}
        <div className="relative mb-10 flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4">
          {/* subtle corner glows (contained by section) */}
          <div className="pointer-events-none absolute -top-10 -left-10 w-40 h-40 rounded-full bg-brand-blue/10 blur-3xl" />
          <div className="pointer-events-none absolute -bottom-10 -right-10 w-40 h-40 rounded-full bg-brand-green/10 blur-3xl" />

          <div className="services-title">
            <span className="inline-flex items-center px-3 py-1 rounded-full bg-zinc-100 text-xs font-medium">
              What we do
            </span>
            <h2 className="mt-2 text-3xl sm:text-4xl font-extrabold tracking-tight">
              <span className="bg-gradient-to-r from-brand-blue to-brand-green bg-clip-text text-transparent">
                Our Services
              </span>
            </h2>
            <p className="mt-2 text-zinc-600 max-w-[60ch]">
              Tailored automation for comfort, security, and energy—built around your routine.
            </p>
            {/* animated gradient underline */}
            <div className="mt-3">
              <DynamicUnderline watch=".services-title" align="left" widthClass="w-20" height={4} />
            </div>
          </div>

          <Link href="/solutions" className="btn btn-outline">
            See all <span aria-hidden>→</span>
          </Link>
        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {services.map(({ title, body, icon: Icon, href, tint }, i) => {
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
                data-svc-card
                style={{ transitionDelay: `${i * 60}ms` }}
                className="group relative h-full flex flex-col p-6 rounded-card bg-white border border-zinc-100 shadow-soft card-hover"
              >
                {/* subtle corner glow */}
                <div
                  className={`pointer-events-none absolute -top-10 -right-10 w-28 h-28 rounded-full ${glow} blur-2xl`}
                />

                <div className={`w-12 h-12 rounded-xl ${chip} flex items-center justify-center mb-4`}>
                  <Icon className="w-6 h-6" aria-hidden />
                </div>

                <h3 className="text-xl font-bold">{title}</h3>

                {/* clamp to keep card heights aligned */}
                <p className="mt-2 text-zinc-600 leading-6 line-clamp-4">{body}</p>

                {/* CTA pinned to bottom w/ consistent motion */}
                <Link href={href} className="mt-auto inline-flex items-center gap-2 text-sm font-semibold text-brand-blue">
                  Explore
                  <span aria-hidden className="transition-transform group-hover:translate-x-0.5">→</span>
                </Link>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
