// components/SmartDomePromo.tsx
"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { Sun, Wind, Shield, Zap } from "lucide-react";
import DynamicUnderline from "@/components/ui/DynamicUnderline";

export default function SmartDomePromo() {
  const points = [
    { Icon: Sun,    label: "Solar-dimming glass",   tone: "green" as const },
    { Icon: Wind,   label: "Thermal & acoustic calm", tone: "blue"  as const },
    { Icon: Shield, label: "Weather-ready shell",     tone: "green" as const },
    { Icon: Zap,    label: "Automation-native",       tone: "blue"  as const },
  ];

  // simple reveal-on-scroll (uses global .reveal-* classes)
  const sectionRef = useRef<HTMLElement | null>(null);
  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    const prefersReduced =
      typeof window !== "undefined" &&
      window.matchMedia?.("(prefers-reduced-motion: reduce)")?.matches;
    if (prefersReduced) {
      el.classList.add("reveal-in");
      el.classList.remove("reveal-base");
      return;
    }
    const io = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        el.classList.add("reveal-in");
        el.classList.remove("reveal-base");
      }
    }, { threshold: 0.12 });
    io.observe(el);
    return () => io.disconnect();
  }, []);

  // map tints without unsafe dynamic classes
  const chip = (tone: "green" | "blue") =>
    tone === "green"
      ? "bg-brand-green/10 text-brand-green"
      : "bg-brand-blue/10 text-brand-blue";

  return (
    <section
      ref={sectionRef}
      className="py-16 relative reveal-base"
      aria-labelledby="smart-dome-heading"
    >
      {/* contained background wash that fades at edges to merge with neighbors */}
      <div
        className="absolute inset-0 -z-10 bg-gradient-to-br from-brand-blue/[0.06] via-white to-brand-green/[0.06]"
        style={{
          WebkitMaskImage:
            "linear-gradient(to bottom, transparent, black 10%, black 90%, transparent)",
          maskImage:
            "linear-gradient(to bottom, transparent, black 10%, black 90%, transparent)",
        }}
      />

      <div className="mx-auto max-w-6xl px-4 grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
        {/* visual */}
        <div className="relative rounded-card overflow-hidden card aspect-[4/3] ring-1 ring-brand-blue/10">
          <div className="absolute inset-0 gradient-brand opacity-15 pointer-events-none" />
          <Image
            src="/images/thumbnail_a19a1ad1-0dea-4307-86bc-354c2e8e6386.jpg"
            alt="Smart Dome geodesic habitat with ambient lighting and climate control"
            fill
            sizes="(min-width:1024px) 50vw, 100vw"
            className="object-cover"
            priority={false}
          />
        </div>

        {/* copy */}
        <div className="space-y-6">
          <div className="relative smartdome-title">
            {/* soft corner glows */}
            <div className="pointer-events-none absolute -top-10 -left-10 w-40 h-40 rounded-full bg-brand-blue/10 blur-3xl" />
            <div className="pointer-events-none absolute -bottom-10 -right-10 w-40 h-40 rounded-full bg-brand-green/10 blur-3xl" />

            <span className="inline-flex items-center px-3 py-1 rounded-full bg-zinc-100 text-xs font-medium relative">
              Signature Habitat
            </span>

            <h2
              id="smart-dome-heading"
              className="mt-2 text-3xl sm:text-4xl font-extrabold tracking-tight relative"
            >
              <span className="bg-gradient-to-r from-brand-blue to-brand-green bg-clip-text text-transparent">
                Smart Dome
              </span>{" "}
              <span className="text-zinc-900">by Metalife</span>
            </h2>

            {/* animated underline */}
            <div className="mt-2">
              <DynamicUnderline watch=".smartdome-title" align="left" widthClass="w-20" height={4} />
            </div>

            <p className="mt-2 text-zinc-700 relative">
              A geodesic habitat for comfort, resilience, and control—on rooftops, in gardens,
              or off-grid. Scenes, climate, and light adapt to your day.
            </p>
          </div>

          {/* icon bullets (consistent tints & sizing) */}
          <ul className="grid grid-cols-2 gap-3">
            {points.map(({ Icon, label, tone }) => (
              <li key={label} className="flex items-center gap-2">
                <span className={`w-8 h-8 rounded-lg ${chip(tone)} inline-flex items-center justify-center`}>
                  <Icon className="w-4 h-4" aria-hidden />
                </span>
                <span className="text-sm text-zinc-800">{label}</span>
              </li>
            ))}
          </ul>

          <div className="flex flex-wrap gap-3 pt-2">
            <Link href="/homedome" className="btn btn-primary" aria-label="See more about Smart Dome">
              See more
            </Link>
            <Link href="/contact" className="btn btn-outline" aria-label="Get a Smart Dome quote">
              Get a quote
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
