// app/homedome/page.tsx
import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import CTA from "@/components/CTA";
import TrustSignals from "@/components/TrustSignals";
import SEOJsonLd from "@/components/SEOJsonLd";
import { SITE } from "@/lib/site";
import { Zap, Shield, Wind, Sun } from "lucide-react";

export const metadata: Metadata = {
  title: "Smart Dome by VeaLive | Modular, Automation-Ready Habitat",
  description:
    "Smart Dome by VeaLive: modular, energy-efficient habitat designed for comfort, resilience, and automation—adaptive lighting, air quality, security, and solar-ready energy.",
  alternates: { canonical: "/homedome" },
  openGraph: {
    title: "Smart Dome by VeaLive",
    description:
      "A modular, automation-native habitat that brings your space to life—adaptive HVAC, tunable lighting, security, and energy optimization.",
    url: `${SITE.baseUrl}/homedome`,
    images: [{ url: `${SITE.baseUrl}/images/placeholders/homedome-hero.jpg` }],
  },
  twitter: { card: "summary_large_image", site: "@vealive360" },
};

export default function Page() {
  return (
    <div className="w-full overflow-x-clip">
      {/* JSON-LD (Product) */}
      <SEOJsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "Product",
          name: "Smart Dome by VeaLive",
          brand: { "@type": "Brand", name: "VeaLive" },
          description:
            "Modular, energy-efficient habitat with automation-native features: adaptive lighting, air quality, security, and solar-ready energy.",
          image: [`${SITE.baseUrl}/images/placeholders/homedome-hero.jpg`],
          aggregateRating: {
            "@type": "AggregateRating",
            ratingValue: "4.9",
            reviewCount: "27",
          },
        }}
      />

      {/* HERO */}
      <section className="mt-10 mb-16 grid grid-cols-1 md:grid-cols-2 gap-8 items-center relative">
        {/* soft background wash */}
        <div className="absolute inset-0 -z-10 gradient-multi opacity-5" />
        <div className="pointer-events-none absolute -top-14 -left-10 w-56 h-56 rounded-full bg-brand-blue/10 blur-3xl" />
        <div className="pointer-events-none absolute -bottom-16 -right-10 w-56 h-56 rounded-full bg-brand-green/10 blur-3xl" />

        <div className="space-y-6 px-4 md:px-0">
          <span className="inline-flex items-center px-3 py-1 rounded-full bg-zinc-100 text-xs font-medium">
            Our Signature Habitat
          </span>
          <h1 className="text-4xl md:text-5xl font-extrabold leading-tight tracking-tight">
            <span className="bg-gradient-to-r from-brand-blue to-brand-green bg-clip-text text-transparent">
              Smart Dome by VeaLive
            </span>
          </h1>
          <p className="text-lg text-zinc-700 max-w-[620px]">
            A modular, energy-efficient habitat designed for comfort, resilience, and full automation.
            Adaptive lighting, air quality, security, and solar-ready energy—beautifully orchestrated.
          </p>
          <span className="block h-1 w-20 rounded-full bg-gradient-to-r from-brand-blue to-brand-green" />
          <div className="flex gap-3">
            <Link
              href="/contact"
              className="px-5 py-3 rounded-full bg-brand-green text-white font-semibold"
            >
              Talk to an expert
            </Link>
            <Link
              href="/ecommerce"
              className="px-5 py-3 rounded-full border border-zinc-300 hover:border-brand-blue"
            >
              Explore products
            </Link>
          </div>
        </div>

        <div className="relative rounded-card overflow-hidden card ring-1 ring-brand-blue/10">
          <div className="absolute inset-0 gradient-brand opacity-25 pointer-events-none" />
          <Image
            src="/images/Dome House in Lush Landscape.png"
            alt="Smart Dome by VeaLive — modular, automation-ready habitat"
            width={1200}
            height={900}
            sizes="(min-width:1024px) 50vw, 100vw"
            className="w-full h-auto object-cover"
            priority
          />
        </div>
      </section>

      {/* WHAT MAKES IT UNIQUE */}
      <section className="py-16 relative">
        <div className="absolute inset-0 -z-10 gradient-multi opacity-5" />
        <div className="mx-auto max-w-6xl px-4">
          <div className="text-center mb-12">
            <span className="inline-flex items-center px-3 py-1 rounded-full bg-zinc-100 text-xs font-medium">
              What makes it unique
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight mt-2">
              <span className="bg-gradient-to-r from-brand-blue to-brand-green bg-clip-text text-transparent">
                Designed for smarter living
              </span>
            </h2>
            <p className="text-zinc-600 max-w-[720px] mx-auto mt-2">
              Smart Dome blends structural efficiency with advanced controls:
              adaptive HVAC, tunable lighting, robust security, and proactive energy management.
            </p>
            <span className="mt-3 mx-auto block h-1 w-20 rounded-full bg-gradient-to-r from-brand-blue to-brand-green" />
          </div>

          <div className="grid md:grid-cols-4 gap-6">
            {[
              { Icon: Sun, label: "Adaptive lighting", desc: "Scenes that follow circadian rhythm and mood." },
              { Icon: Wind, label: "Air quality", desc: "Smart ventilation with purification built-in." },
              { Icon: Shield, label: "Security", desc: "Smart locks + 360° monitoring at your fingertips." },
              { Icon: Zap, label: "Energy", desc: "Solar-ready with live usage insights." },
            ].map(({ Icon, label, desc }) => (
              <article
                key={label}
                className="p-6 text-center rounded-card bg-white border border-zinc-100 shadow-soft hover:shadow-lg transition-shadow"
              >
                <div className="w-12 h-12 rounded-xl bg-brand-green/10 text-brand-green flex items-center justify-center mx-auto mb-3">
                  <Icon className="w-6 h-6" aria-hidden />
                </div>
                <h3 className="text-lg font-bold">{label}</h3>
                <p className="text-sm text-zinc-600 mt-2">{desc}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

{/* WHY IT MATTERS + STICKY SPECS */}
<section className="py-16" aria-labelledby="why-it-matters">
  <div className="mx-auto max-w-6xl px-4 grid md:grid-cols-3 gap-8 lg:gap-12">
    {/* Copy */}
    <div className="md:col-span-2 md:pr-8 lg:pr-12 space-y-5 md:space-y-6">
      <div>
        <h2 id="why-it-matters" className="text-2xl md:text-3xl font-extrabold tracking-tight">
          Why it matters
        </h2>
        <span className="mt-3 block h-1 w-16 rounded-full bg-gradient-to-r from-brand-blue to-brand-green" />
      </div>

      <p className="text-zinc-700/95 text-base md:text-lg leading-7 md:leading-8 text-pretty md:text-balance max-w-[68ch]">
        The dome form isn’t just striking—it’s efficient. With less surface area for the same
        volume, it naturally limits heat gain and loss, sheds wind and rain, and distributes
        loads evenly. Fewer thermal bridges, fewer weak points, greater comfort.
      </p>

      <p className="text-zinc-700/95 text-base md:text-lg leading-7 md:leading-8 text-pretty md:text-balance max-w-[68ch]">
        Pre-engineered, numbered panels click together with minimal disruption. High-performance
        insulation and gasketed seams create a tight envelope, while optional low-E glazing and
        smart shading deliver daylight without the heat. The result is a calm, stable interior year-round.
      </p>

      <p className="text-zinc-700/95 text-base md:text-lg leading-7 md:leading-8 text-pretty md:text-balance max-w-[68ch]">
        Smart Dome is automation-native: sensors watch air quality, occupancy, temperature, and light,
        so scenes adapt from wake to sleep without micromanaging. Installation is rapid—onto anchors
        or a light foundation, then power/data the same day. Ideal for rooftops, gardens, or remote plots,
        and it scales from a single studio to linked clusters.
      </p>
    </div>

    {/* Sticky sidebar */}
    <aside className="space-y-4 md:sticky md:top-24 self-start h-fit">
      <div className="p-6 rounded-card bg-white border border-zinc-100 ring-1 ring-brand-blue/10 shadow-soft">
        <h4 className="font-semibold mb-2">Specs snapshot</h4>
        <ul className="text-sm text-zinc-700/95 space-y-1">
          <li>Footprint: 25–80 m² modules</li>
          <li>Power: 220–240V • Solar ready</li>
          <li>Connectivity: Wi-Fi, Zigbee, Matter</li>
          <li>Control: App, Voice, Wall panels</li>
        </ul>
      </div>
      <div className="p-6 rounded-card bg-white border border-zinc-100 ring-1 ring-brand-blue/10 shadow-soft">
        <h4 className="font-semibold mb-2">Get a quote</h4>
        <p className="text-sm text-zinc-600">
          Tell us about your project and location—our team will prepare a tailored plan.
        </p>
        <Link
          href="/contact"
          className="inline-flex mt-3 h-10 items-center justify-center rounded-full px-4 bg-brand-blue text-white font-semibold"
        >
          Contact sales
        </Link>
      </div>
    </aside>
  </div>
</section>

      {/* TRUST + CTA */}
      <CTA />
      <TrustSignals />
    </div>
  );
}
