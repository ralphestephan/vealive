// components/SmartDomePromo.tsx
import Image from "next/image";
import Link from "next/link";
import { Sun, Wind, Shield, Zap } from "lucide-react";

export default function SmartDomePromo() {
  const points = [
    { Icon: Sun,    label: "Solar-dimming glass" },
    { Icon: Wind,   label: "Thermal & acoustic calm" },
    { Icon: Shield, label: "Weather-ready shell" },
    { Icon: Zap,    label: "Automation-native" },
  ];

  return (
    <section className="py-16 relative">
      {/* soft background wash */}
      <div className="absolute inset-0 -z-10 gradient-multi opacity-5" />

      <div className="mx-auto max-w-6xl px-4 grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
        {/* visual */}
        <div className="relative rounded-card overflow-hidden card aspect-[4/3] ring-1 ring-brand-blue/10">
          <div className="absolute inset-0 gradient-brand opacity-20 pointer-events-none" />
          <Image
            src="/images/thumbnail_a19a1ad1-0dea-4307-86bc-354c2e8e6386.jpg"
            alt="Smart Dome by Metalife"
            fill
            sizes="(min-width:1024px) 50vw, 100vw"
            className="object-cover"
            priority={false}
          />
        </div>

        {/* copy */}
        <div className="space-y-6">
          {/* glow accents behind the header */}
          <div className="relative">
            <div className="pointer-events-none absolute -top-10 -left-10 w-40 h-40 rounded-full bg-brand-blue/10 blur-3xl" />
            <div className="pointer-events-none absolute -bottom-10 -right-10 w-40 h-40 rounded-full bg-brand-green/10 blur-3xl" />

            <span className="inline-flex items-center px-3 py-1 rounded-full bg-zinc-100 text-xs font-medium relative">
              Signature Habitat
            </span>

            <h2 className="mt-2 text-3xl sm:text-4xl font-extrabold tracking-tight relative">
              <span className="bg-gradient-to-r from-brand-blue to-brand-green bg-clip-text text-transparent">
                Smart Dome
              </span>{" "}
              <span className="text-zinc-900">by Metalife</span>
            </h2>

            <p className="mt-2 text-zinc-600 relative">
              A geodesic habitat for comfort, resilience, and control—on rooftops, in gardens,
              or off-grid. Scenes, climate, and light adapt to your day.
            </p>

            {/* gradient underline */}
            <span className="mt-3 block h-1 w-20 rounded-full bg-gradient-to-r from-brand-blue to-brand-green relative" />
          </div>

          {/* icon bullets */}
          <ul className="grid grid-cols-2 gap-3">
            {points.map(({ Icon, label }, i) => {
              const tint = i % 2 ? "brand-blue" : "brand-green";
              return (
                <li key={label} className="flex items-center gap-2">
                  <span className={`w-8 h-8 rounded-lg bg-${tint}/10 text-${tint} inline-flex items-center justify-center`}>
                    <Icon className="w-4 h-4" aria-hidden />
                  </span>
                  <span className="text-sm text-zinc-700">{label}</span>
                </li>
              );
            })}
          </ul>

          <div className="flex gap-3 pt-2">
            <Link
              href="/homedome"
              className="px-5 py-3 rounded-full bg-brand-blue text-white font-semibold"
            >
              See more
            </Link>
            <Link
              href="/contact"
              className="px-5 py-3 rounded-full border border-zinc-300 hover:border-brand-blue"
            >
              Get a quote
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
