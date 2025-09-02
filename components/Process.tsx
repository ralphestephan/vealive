// components/Process.tsx
"use client";

import { ClipboardList, Cog, Wrench, Headset } from "lucide-react";
import Link from "next/link";

export default function Process() {
  const steps = [
    {
      title: "Consultation",
      body:
        "We start by mapping needs, spaces, and budget—then outline the quickest wins and a clear roadmap.",
      cta: { label: "Begin your journey", href: "/contact" },
      icon: ClipboardList,
    },
    {
      title: "Design & Configuration",
      body:
        "Hardware, wiring, and flows—specified to your platform (Apple/Google/Alexa) and lifestyle.",
      cta: { label: "Explore our solutions", href: "/solutions" },
      icon: Cog,
    },
    {
      title: "Installation",
      body:
        "We coordinate trades, install devices, and verify every scene and automation end-to-end.",
      cta: { label: "See our work", href: "/solutions" },
      icon: Wrench,
    },
    {
      title: "Care & Optimization",
      body:
        "We monitor, iterate, and support—so the system stays fast, secure, and delightful over time.",
      cta: { label: "Get support", href: "/contact" },
      icon: Headset,
    },
  ];

  return (
    <section className="py-16 relative">
      {/* soft background wash */}
      <div className="absolute inset-0 -z-10 gradient-multi opacity-5" />

      <div className="mx-auto max-w-6xl px-4">
        {/* Enhanced title */}
        <div className="relative mb-10 flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4">
          <div className="pointer-events-none absolute -top-10 -left-10 w-40 h-40 rounded-full bg-brand-blue/10 blur-3xl" />
          <div className="pointer-events-none absolute -bottom-10 -right-10 w-40 h-40 rounded-full bg-brand-green/10 blur-3xl" />

          <div>
            <span className="inline-flex items-center px-3 py-1 rounded-full bg-zinc-100 text-xs font-medium">
              Process
            </span>
            <h2 className="mt-2 text-3xl sm:text-4xl font-extrabold tracking-tight">
              <span className="bg-gradient-to-r from-brand-blue to-brand-green bg-clip-text text-transparent">
                How we work
              </span>
            </h2>
            <p className="mt-2 text-zinc-600">
              From first walkthrough to long-term care—clear steps, zero guesswork.
            </p>
            <span className="mt-3 block h-1 w-20 rounded-full bg-gradient-to-r from-brand-blue to-brand-green" />
          </div>

          <Link
            href="/solutions"
            className="inline-flex items-center gap-2 self-start sm:self-auto rounded-full border border-zinc-300 px-4 py-2 text-sm font-semibold hover:border-brand-blue"
          >
            See solutions <span aria-hidden>→</span>
          </Link>
        </div>

        {/* Steps */}
        <div className="mt-2 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {steps.map((s, i) => {
            const tint = i % 2 === 0 ? "brand-blue" : "brand-green";
            const Chip = s.icon;
            return (
              <article
                key={i}
                className="group relative h-full flex flex-col p-6 rounded-card shadow-soft bg-white border border-zinc-100 hover:shadow-lg transition-shadow"
              >
                {/* subtle corner glow */}
                <div
                  className={`pointer-events-none absolute -top-10 -right-10 w-28 h-28 rounded-full ${
                    tint === "brand-blue" ? "bg-brand-blue/10" : "bg-brand-green/10"
                  } blur-2xl`}
                />

                <div className="flex items-center gap-3 mb-3">
                  <div
                    className={`w-10 h-10 rounded-lg ${
                      tint === "brand-blue"
                        ? "bg-brand-blue/10 text-brand-blue"
                        : "bg-brand-green/10 text-brand-green"
                    } flex items-center justify-center`}
                  >
                    <Chip className="w-5 h-5" aria-hidden />
                  </div>
                  <div
                    className={`text-sm font-semibold ${
                      tint === "brand-blue" ? "text-brand-blue" : "text-brand-green"
                    }`}
                  >
                    Step {i + 1}
                  </div>
                </div>

                <h3 className="text-xl font-bold">{s.title}</h3>

                <p className="mt-2 text-zinc-600 leading-6 line-clamp-3 md:line-clamp-4">
                  {s.body}
                </p>

                <Link
                  href={s.cta.href}
                  className="mt-auto inline-flex items-center gap-2 text-sm font-semibold text-brand-blue"
                >
                  {s.cta.label}
                  <span aria-hidden className="transition-transform group-hover:translate-x-0.5">
                    →
                  </span>
                </Link>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
