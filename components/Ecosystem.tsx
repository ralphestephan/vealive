"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import DynamicUnderline from "@/components/ui/DynamicUnderline";

function useInView<T extends HTMLElement>(opts: IntersectionObserverInit = { threshold: 0.1 }) {
  const ref = useRef<T | null>(null);
  const [show, setShow] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) setShow(true);
    }, opts);
    io.observe(el);
    return () => io.disconnect();
  }, [opts]);
  return { ref, show } as const;
}

export default function Ecosystem() {
  const items = [
    { name: "Apple Home", src: "/logos/applehome.png" },
    { name: "Google Home", src: "/logos/googlehome.png" },
    { name: "Amazon Alexa", src: "/logos/works_with_alexa_480x480.avif" },
    { name: "SmartThings", src: "/logos/smartthing.webp" },
  ];

  const { ref, show } = useInView<HTMLDivElement>();

  return (
    <section id="ecosystem" className="py-16 relative">
      {/* soft background wash with fade edges */}
      <div
        className="absolute inset-0 -z-10 gradient-multi opacity-5"
        style={{
          WebkitMaskImage:
            "linear-gradient(180deg, rgba(0,0,0,0) 0%, rgba(0,0,0,.9) 10%, rgba(0,0,0,.9) 90%, rgba(0,0,0,0) 100%)",
          maskImage:
            "linear-gradient(180deg, rgba(0,0,0,0) 0%, rgba(0,0,0,.9) 10%, rgba(0,0,0,.9) 90%, rgba(0,0,0,0) 100%)",
        }}
      />

      <div className="mx-auto max-w-6xl px-4">
        {/* Header */}
        <div className="relative mb-10">
          <div className="pointer-events-none absolute -top-10 -left-10 w-40 h-40 rounded-full bg-brand-blue/10 blur-3xl" />
          <div className="pointer-events-none absolute -bottom-10 -right-10 w-40 h-40 rounded-full bg-brand-green/10 blur-3xl" />

          <span className="inline-flex items-center px-3 py-1 rounded-full bg-zinc-100 text-xs font-medium relative">
            Compatibility
          </span>
          <h2 className="mt-2 text-3xl sm:text-4xl font-extrabold tracking-tight relative">
            <span className="bg-gradient-to-r from-brand-blue to-brand-green bg-clip-text text-transparent">
              Built on trusted ecosystems
            </span>
          </h2>
          <div className="mt-3">
            <DynamicUnderline watch="#ecosystem" align="left" widthClass="w-20" height={4} />
          </div>
          <p className="mt-2 text-zinc-600 relative">
            Works with Apple Home, Google Home, Amazon Alexa, and Samsung SmartThings.
          </p>
        </div>

        {/* Logos */}
        <div
          ref={ref}
          className={[
            "grid grid-cols-2 md:grid-cols-4 gap-6 transition-all duration-700",
            show ? "opacity-100 translate-y-0" : "opacity-0 translate-y-3",
          ].join(" ")}
        >
          {items.map((i) => (
            <div
              key={i.name}
              className="p-4 rounded-card bg-white border border-zinc-200 flex items-center justify-center shadow-soft hover:shadow-lg transition"
            >
              <div className="relative w-full h-16 md:h-20 opacity-80 hover:opacity-100 transition">
                <Image
                  src={i.src}
                  alt={i.name}
                  fill
                  sizes="(min-width:768px) 240px, 45vw"
                  className="object-contain"
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
