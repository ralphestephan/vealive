"use client";

import { ClipboardList, Cog, Wrench, Headset } from "lucide-react";
import Link from "next/link";
import { useRef, useEffect, useState } from "react";
import DynamicUnderline from "@/components/ui/DynamicUnderline";

// helper: observe intersection for reveal
function useInView<T extends HTMLElement>(opts: IntersectionObserverInit = { threshold: 0.1 }) {
  const ref = useRef<T | null>(null);
  const [show, setShow] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) setShow(true);
    }, opts);
    io.observe(el);
    return () => io.disconnect();
  }, [opts]);
  return { ref, show } as const;
}

export default function Process() {
  const steps = [
    {
      title: "Consultation",
      body: "We start by mapping needs, spaces, and budget—then outline the quickest wins and a clear roadmap.",
      cta: { label: "Begin your journey", href: "/contact" },
      icon: ClipboardList,
    },
    {
      title: "Design & Configuration",
      body: "Hardware, wiring, and flows—specified to your platform (Apple/Google/Alexa) and lifestyle.",
      cta: { label: "Explore our solutions", href: "/solutions" },
      icon: Cog,
    },
    {
      title: "Installation",
      body: "We coordinate trades, install devices, and verify every scene and automation end-to-end.",
      cta: { label: "See our work", href: "/solutions" },
      icon: Wrench,
    },
    {
      title: "Care & Optimization",
      body: "We monitor, iterate, and support—so the system stays fast, secure, and delightful over time.",
      cta: { label: "Get support", href: "/contact" },
      icon: Headset,
    },
  ];

  const { ref, show } = useInView<HTMLDivElement>({ threshold: 0.15 });

  return (
    <section
      id="process"
      className="py-16 relative overflow-hidden"
      ref={ref}
    >
      {/* soft background wash that fades near edges */}
      <div
        className="absolute inset-0 -z-10 gradient-multi opacity-5"
        style={{
          WebkitMaskImage:
            "linear-gradient(to bottom, transparent, black 10%, black 90%, transparent)",
          maskImage:
            "linear-gradient(to bottom, transparent, black 10%, black 90%, transparent)",
        }}
      />

      <div className="mx-auto max-w-6xl px-4">
        {/* Title row */}
        <div className="relative mb-10 flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 process-title">
          {/* accent glows */}
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
            <div className="mt-3">
              <DynamicUnderline watch=".process-title" align="left" widthClass="w-20" height={4} />
            </div>
          </div>

          <Link href="/solutions" className="btn btn-outline">
            See solutions <span aria-hidden >→</span>
          </Link>
        </div>

        {/* Steps grid */}
        <div
          className={[
            "mt-2 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 transition-all duration-700",
            show ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4",
          ].join(" ")}
        >
          {steps.map((s, i) => {
            const tint = i % 2 === 0 ? "brand-blue" : "brand-green";
            const Chip = s.icon;
            return (
              <article
                key={i}
                className="group relative flex flex-col p-6 rounded-card shadow-soft bg-white border border-zinc-100 hover:shadow-lg transition"
              >
                <div
                  className={`pointer-events-none absolute -top-10 -right-10 w-28 h-28 rounded-full ${
                    tint === "brand-blue" ? "bg-brand-blue/10" : "bg-brand-green/10"
                  } blur-2xl`}
                />
                <div className="flex items-center gap-3 mb-3">
                  <div
                    className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                      tint === "brand-blue"
                        ? "bg-brand-blue/10 text-brand-blue"
                        : "bg-brand-green/10 text-brand-green"
                    }`}
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
                <p className="mt-2 text-zinc-600 leading-6">{s.body}</p>

                <Link
                  href={s.cta.href}
                  className="mt-auto inline-flex items-center gap-2 text-sm font-semibold text-brand-blue hover:text-brand-green transition-colors"
                >
                  {s.cta.label}
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
      </div>
    </section>
  );
}
