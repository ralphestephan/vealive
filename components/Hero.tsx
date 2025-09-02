"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";

const GIFS = [
  // update these paths to your 4 GIFs
  "/images/SmartHome_DM_1.gif",
  "/images/connect_home_app_design_by_yalantis-1.gif"

];

const ALT = [
  "Adaptive lighting",
  "Comfort & climate"
];

const INTERVAL_MS = 3500; // time before fading to the next GIF

export default function Hero() {
  const [active, setActive] = useState(0);

  useEffect(() => {
    // respect reduced motion
    const prefersReduced =
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (prefersReduced) return;

    const id = setInterval(() => {
      setActive((i) => (i + 1) % GIFS.length);
    }, INTERVAL_MS);

    return () => clearInterval(id);
  }, []);

  return (
    <section className="mt-10 mb-16 grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
      {/* Left copy */}
      <div className="space-y-6">
        <span className="inline-flex items-center px-3 py-1 rounded-full bg-zinc-100 text-xs font-medium">
         Bring your Home to Life
        </span>
        <h1 className="text-4xl md:text-5xl font-extrabold leading-tight">
          Smart living that <span className="text-brand-blue">serves</span> you.
        </h1>
        <p className="text-lg text-zinc-700">
          VeaLive curates intelligent spaces through automation solutions that
          senses you, elevating comfort, supporting well-being, and simplifying
          daily life.
        </p>
        <div className="flex gap-3">
          <Link
            href="/solutions"
            className="px-5 py-3 rounded-full bg-brand-green text-white font-semibold"
          >
            Explore Solutions
          </Link>
          <Link
            href="/contact"
            className="px-5 py-3 rounded-full border border-zinc-300 hover:border-brand-blue"
          >
            Free Consultation
          </Link>
        </div>
      </div>

      {/* Right visual — 4 GIF crossfade */}
      <div className="relative rounded-card overflow-hidden card aspect-[4/3]">
        {/* soft brand wash */}
        <div className="absolute inset-0 gradient-brand opacity-20 pointer-events-none" />

        {/* stack all 4; fade by toggling opacity */}
        {GIFS.map((src, idx) => (
          <Image
            key={`${src}-${idx}-${active === idx ? "on" : "off"}`}
            src={src}
            alt={ALT[idx] ?? "Smart living"}
            fill
            unoptimized // keep GIFs animated; avoid Next's static optimization
            sizes="(min-width: 1024px) 50vw, 100vw"
            className={`absolute inset-0 object-cover transition-opacity duration-700 ease-in-out ${
              active === idx ? "opacity-100" : "opacity-0"
            }`}
            priority={idx === 0}
            aria-hidden={active !== idx}
          />
        ))}
      </div>
    </section>
  );
}
