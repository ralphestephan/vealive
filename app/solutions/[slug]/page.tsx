// app/solutions/[slug]/page.tsx
import solutions from "@/data/solutions";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import CTA from "@/components/CTA";
import TrustSignals from "@/components/TrustSignals";
import type { Metadata } from "next";
import { SITE } from "@/lib/site";
import SEOJsonLd from "@/components/SEOJsonLd";
import {
  CheckCircle,
  // tech icons
  Lightbulb,
  Thermometer,
  Droplets,
  Fan,
  Shield,
  Camera,
  Lock,
  Siren,
  Speaker,
  Tv,
  Router,
  Cpu,
  Activity, // replaced Waveform with Activity
  Sprout,
  Coffee,
  WashingMachine,
  Refrigerator,
} from "lucide-react";

type Props = { params: { slug: string } };

// Prebuild static paths
export function generateStaticParams() {
  return solutions.map((s) => ({ slug: s.slug }));
}

// Metadata
export function generateMetadata({ params }: { params: { slug: string } }): Metadata {
  const s = solutions.find((x) => x.slug === params.slug);
  if (!s) return { title: "Solution" };
  return {
    title: s.heading,
    description: s.description,
    alternates: { canonical: `/solutions/${params.slug}` },
    openGraph: { images: s.image ? [s.image] : undefined },
  };
}

// ------- NEW: technology icons by solution slug -------
const TECH_BY_SLUG: Record<
  string,
  { label: string; Icon: React.ComponentType<{ className?: string }> }[]
> = {
  lighting: [
    { label: "Smart lamps & bulbs", Icon: Lightbulb },
    { label: "Dimmers & keypads", Icon: Activity }, // replaced Waveform with Activity
    { label: "Presence sensors", Icon: Cpu },
    { label: "Lux sensors", Icon: Sprout },
    { label: "Bridge / Thread", Icon: Router },
  ],
  climate: [
    { label: "Thermostats", Icon: Thermometer },
    { label: "Fans / ventilation", Icon: Fan },
    { label: "Humidifier / dehumidifier", Icon: Droplets },
    { label: "Air quality sensors", Icon: Sprout },
    { label: "HVAC bridge", Icon: Router },
  ],
  security: [
    { label: "Cameras & doorbells", Icon: Camera },
    { label: "Smart locks", Icon: Lock },
    { label: "Sirens", Icon: Siren },
    { label: "Motion / contact sensors", Icon: Shield },
    { label: "Leak & smoke sensors", Icon: Droplets },
  ],
  entertainment: [
    { label: "Speakers / amps", Icon: Speaker },
    { label: "TV & streaming", Icon: Tv },
    { label: "Scene lighting", Icon: Lightbulb },
    { label: "Presence control", Icon: Cpu },
    { label: "Network hub", Icon: Router },
  ],
  utility: [
    { label: "Coffee / kettle", Icon: Coffee },
    { label: "Washer / dryer", Icon: WashingMachine },
    { label: "Fridge monitor", Icon: Refrigerator },
    { label: "Air purifiers", Icon: Fan },
    { label: "Bridge / relays", Icon: Router },
  ],
};

export default function Page({ params }: Props) {
  const s = solutions.find((x) => x.slug === params.slug);
  if (!s) return notFound();

  const tech = TECH_BY_SLUG[params.slug] ?? [];

  return (
    <div className="w-full overflow-x-clip">
      <SEOJsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "Service",
          serviceType: s.heading,
          description: s.description,
          provider: {
            "@type": "Organization",
            name: SITE.org.legalName,
            url: SITE.baseUrl,
          },
          areaServed: "LB",
        }}
      />

      {/* HERO */}
      <section className="mt-10 mb-16">
        <div className="mx-auto max-w-6xl px-4 grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          
          <div className="space-y-6">

          
            <div>
              <Link
                href="/solutions"
                className="inline-flex items-center gap-2 text-sm text-zinc-600 hover:text-zinc-900"
                aria-label="Back to all solutions"
              >
                <span aria-hidden>←</span> Back to all solutions
              </Link>
            </div>
            <span className="inline-flex items-center px-3 py-1 rounded-full bg-zinc-100 text-xs font-medium">
              Smart {s.slug}
            </span>
            <h1 className="text-4xl md:text-5xl font-extrabold leading-tight tracking-tight">
              <span className="bg-gradient-to-r from-brand-blue to-brand-green bg-clip-text text-transparent">
                {s.heading}
              </span>
            </h1>
            <p className="text-lg text-zinc-700 max-w-[640px]">{s.description}</p>
            <div className="flex gap-3 pt-1">
              <Link
                href="/contact"
                className="px-5 py-3 rounded-full bg-brand-green text-white font-semibold"
              >
                Book a Free Consultation
              </Link>
              <Link
                href="/solutions"
                className="px-5 py-3 rounded-full border border-zinc-300 hover:border-brand-blue"
              >
                All Solutions
              </Link>
            </div>
          </div>

          <div className="relative rounded-card overflow-hidden card ring-1 ring-brand-blue/10">
            <div className="absolute inset-0 gradient-brand opacity-20 pointer-events-none" />
            {s.image ? (
              <Image
                src={s.image}
                alt={s.heading}
                width={1200}
                height={900}
                className="w-full h-auto object-cover"
                priority
              />
            ) : (
              <div className="aspect-[4/3] w-full bg-zinc-100" />
            )}
          </div>
        </div>
      </section>

      {/* ------- NEW: Technologies we use ------- */}
      {tech.length > 0 && (
        <section className="mb-10">
          <div className="mx-auto max-w-6xl px-4">
            <div className="rounded-card bg-white border border-zinc-100 shadow-soft p-6">
              <div className="flex items-center justify-between gap-4 flex-wrap">
                <div>
                  <span className="inline-flex items-center px-3 py-1 rounded-full bg-zinc-100 text-xs font-medium">
                    Stack preview
                  </span>
                  <h2 className="mt-2 text-xl font-bold">Technologies we use</h2>
                  <p className="text-sm text-zinc-600">
                    A quick look at typical devices and hubs we combine in this category.
                  </p>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3 w-full md:w-auto mt-4 md:mt-0">
                  {tech.map(({ label, Icon }) => (
                    <div
                      key={label}
                      className="flex items-center gap-2 rounded-full border border-zinc-200 bg-zinc-50 px-3 py-2"
                      title={label}
                    >
                      <span className="inline-grid place-items-center h-8 w-8 rounded-full bg-white border border-zinc-200">
                        <Icon className="h-4 w-4 text-zinc-700" />
                      </span>
                      <span className="text-xs font-medium text-zinc-700">{label}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* HIGHLIGHTS */}
      <section className="pb-6">
        <div className="mx-auto max-w-6xl px-4 grid grid-cols-1 md:grid-cols-3 gap-6">
          {["Presence-aware scenes", "Automations for comfort & wellness", "Elegant, seamless design"].map(
            (item, i) => (
              <article
                key={i}
                className="p-6 rounded-card shadow-soft bg-white border border-zinc-100 hover:shadow-lg transition-shadow"
              >
                <div className="flex items-center gap-2 mb-2 text-brand-blue">
                  <CheckCircle className="h-5 w-5" aria-hidden />
                  <h3 className="font-bold">{item}</h3>
                </div>
                <p className="text-sm text-zinc-600">
                  Tailored to your routines with VeaLive’s curated devices and flows.
                </p>
              </article>
            )
          )}
        </div>
      </section>

      {/* DETAILS */}
      <section className="py-12 relative">
        <div className="absolute inset-0 -z-10 gradient-multi opacity-5" />
        <div className="mx-auto max-w-6xl px-4 grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="p-6 rounded-card bg-white border border-zinc-100 shadow-soft hover:shadow-lg transition-shadow">
            <span className="inline-flex items-center px-2.5 py-1 rounded-full bg-zinc-100 text-xs font-medium">
              What you can expect
            </span>
            <ul className="mt-4 space-y-2 text-zinc-700">
              {[
                "Clean, open integrations (Apple / Google / Alexa, wired or wireless).",
                "Scenes that adapt by time, presence, and ambient conditions.",
                "Privacy-respecting defaults with local control where possible.",
              ].map((t) => (
                <li key={t} className="flex items-start gap-2">
                  <CheckCircle className="h-5 w-5 text-brand-blue shrink-0 mt-0.5" />
                  <span>{t}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="p-6 rounded-card bg-white border border-zinc-100 shadow-soft hover:shadow-lg transition-shadow">
            <span className="inline-flex items-center px-2.5 py-1 rounded-full bg-zinc-100 text-xs font-medium">
              Getting started
            </span>
            <p className="mt-3 text-zinc-600">
              Share your space, goals, and preferred platforms. We map quick wins, propose a
              roadmap, and implement with tidy install and follow-up tuning.
            </p>
            <div className="mt-4 flex gap-3">
              <Link href="/contact" className="px-5 py-3 rounded-full bg-brand-blue text-white font-semibold">
                Start your plan
              </Link>
              <Link
                href="/ecommerce"
                className="px-5 py-3 rounded-full border border-zinc-300 hover:border-brand-blue"
              >
                Browse devices
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Closing rhythm */}
      <CTA />
      <TrustSignals />
    </div>
  );
}
