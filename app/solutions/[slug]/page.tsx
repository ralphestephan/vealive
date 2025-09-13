// app/solutions/[slug]/page.tsx
import solutions from "@/data/solutions";
import Image from "next/image";
import Link from "next/link";
import { notFound, redirect } from "next/navigation";
import CTA from "@/components/CTA";
import TrustSignals from "@/components/TrustSignals";
import type { Metadata } from "next";
import { SITE } from "@/lib/site";
import SEOJsonLd from "@/components/SEOJsonLd";
import {
  CheckCircle, Lightbulb, Thermometer, Droplets, Fan, Router, Cpu, Activity, Sprout, Plug,
  Gauge, BarChart3, ShoppingCart, CreditCard, Cog, Truck, Package, Bluetooth,
  Wrench, Code, Bolt, Sun, Moon, Timer, Clock, Shield, ShieldCheck, ShieldAlert,
  Wifi, Antenna, Cable, Server, Database, HardDrive, Cloud, CloudCog,
  Tablet, Smartphone, QrCode, Barcode, Box, Boxes, BadgeCheck, ClipboardList,
  Settings, SlidersHorizontal, BatteryCharging, Snowflake, Wind,
  Home, KeyRound, MapPin, Globe, Rss, Usb, IdCard, LayoutGrid, Layers,
  Camera, Lock
} from "lucide-react";
import Reveal from "@/components/ui/Reveal";
import DynamicUnderline from "@/components/ui/DynamicUnderline";

type Props = { params: { slug: string } };

type NewSlug = "home-automation" | "device-tailoring" | "energy-monitoring" | "utility-integration";
const SLUG_ALIASES: Record<string, NewSlug> = {
  lighting: "home-automation",
  security: "device-tailoring",
  climate: "energy-monitoring",
  utility: "utility-integration",
};
function resolveCanonicalSlug(input: string): NewSlug | null {
  const set = new Set<NewSlug>(["home-automation", "device-tailoring", "energy-monitoring", "utility-integration"]);
  if (set.has(input as NewSlug)) return input as NewSlug;
  return SLUG_ALIASES[input] ?? null;
}

export function generateStaticParams() {
  return solutions.map((s) => ({ slug: s.slug }));
}

export function generateMetadata({ params }: { params: { slug: string } }): Metadata {
  const canonical = resolveCanonicalSlug(params.slug);
  const s = solutions.find((x) => x.slug === (canonical ?? params.slug));
  if (!s) return { title: "Solution" };
  return {
    title: `${s.heading} | VeaLive360`,
    description: s.description,
    alternates: { canonical: `/solutions/${canonical ?? s.slug}` },
    openGraph: {
      title: s.heading,
      description: s.description,
      url: `${SITE.baseUrl}/solutions/${canonical ?? s.slug}`,
      images: s.image ? [{ url: `${SITE.baseUrl}${s.image}` }] : undefined,
    },
    twitter: { card: "summary_large_image", site: "@vealive360" },
  };
}

const BADGE_BY_SLUG: Record<NewSlug, string> = {
  "home-automation": "Home Automation",
  "device-tailoring": "Device Tailoring",
  "energy-monitoring": "Energy Monitoring",
  "utility-integration": "Utility E-Shop Integration",
};

const TECH_BY_SLUG: Record<
  NewSlug,
  { label: string; Icon: React.ComponentType<{ className?: string }> }[]
> = {
  "home-automation": [
    { label: "Automation engine", Icon: Cpu },
    { label: "Presence graph", Icon: Activity },
    { label: "Scene lighting", Icon: Lightbulb },
    { label: "Time & circadian", Icon: Sun },
    { label: "Night modes", Icon: Moon },
    { label: "Thread / Zigbee / Wi-Fi", Icon: Router },
    { label: "Voice & wall control", Icon: Plug },
    { label: "Motion / lux sensors", Icon: Sprout },
    { label: "Schedules & timers", Icon: Timer },
    { label: "Occupancy fusion", Icon: Gauge },
    { label: "Network reliability", Icon: Wifi },
    { label: "Hubs & bridges", Icon: Antenna },
    { label: "Local-first logic", Icon: ShieldCheck },
    { label: "Cloud sync (opt.)", Icon: Cloud },
    { label: "Dashboards & app", Icon: LayoutGrid },
    { label: "Rooms & zones", Icon: Layers },
    { label: "Camera monitoring", Icon: Camera },
    { label: "Door notifications", Icon: Lock },
  ],
  "device-tailoring": [
    { label: "Firmware profiles", Icon: Code },
    { label: "OTA updates", Icon: Rss },
    { label: "Calibration flows", Icon: Gauge },
    { label: "Custom enclosures", Icon: Package },
    { label: "Cable harnessing", Icon: Cable },
    { label: "Sensor kits (VOC/CO₂)", Icon: Droplets },
    { label: "Protocol bridges", Icon: Bluetooth },
    { label: "USB / UART tools", Icon: Usb },
    { label: "SD logging", Icon: IdCard },
    { label: "Device IDs / QR", Icon: QrCode },
    { label: "Barcode provisioning", Icon: Barcode },
    { label: "Install & tuning", Icon: Wrench },
    { label: "Fail-safe defaults", Icon: ShieldCheck },
    { label: "Rollbacks & versions", Icon: Layers },
    { label: "Security keys", Icon: KeyRound },
    { label: "Acceptance testing", Icon: BadgeCheck },
  ],
  "energy-monitoring": [
    { label: "CT clamps / DIN meters", Icon: Bolt },
    { label: "Smart plugs (power)", Icon: Plug },
    { label: "Panel mapping", Icon: Layers },
    { label: "Per-circuit analytics", Icon: BarChart3 },
    { label: "Live kW / kWh", Icon: Gauge },
    { label: "Peak-load shifting", Icon: Clock },
    { label: "HVAC tie-in", Icon: Thermometer },
    { label: "RH / PM sensors", Icon: Droplets },
    { label: "Ventilation link", Icon: Fan },
    { label: "Tariff profiles", Icon: ClipboardList },
    { label: "Alerts & anomalies", Icon: ShieldAlert },
    { label: "Data exports", Icon: Database },
    { label: "Data retention", Icon: HardDrive },
    { label: "Edge gateway", Icon: Server },
    { label: "Cloud pipelines", Icon: CloudCog },
    { label: "Solar / battery", Icon: BatteryCharging },
  ],
  "utility-integration": [
    { label: "Catalog mapping", Icon: ShoppingCart },
    { label: "Compatibility matrix", Icon: Boxes },
    { label: "Room/scene presets", Icon: Home },
    { label: "Auto-provisioning", Icon: Cog },
    { label: "Secure pairing", Icon: Shield },
    { label: "Payments & warranty", Icon: CreditCard },
    { label: "Serial tracking", Icon: Box },
    { label: "Install scheduling", Icon: Truck },
    { label: "Order webhooks", Icon: Cloud },
    { label: "Device naming", Icon: Settings },
    { label: "Policy templates", Icon: ClipboardList },
    { label: "User accounts", Icon: Smartphone },
    { label: "Multi-site support", Icon: Globe },
    { label: "Geo / address book", Icon: MapPin },
    { label: "Bridges / relays", Icon: Router },
    { label: "RMA & swap flow", Icon: ShieldAlert },
  ],
};

const HIGHLIGHTS_BY_SLUG: Record<NewSlug, string[]> = {
  "home-automation": [
    "Presence-aware scenes across rooms",
    "Unified control: wall, app, voice",
    "Local-first reliability with cloud extras",
  ],
  "device-tailoring": [
    "Hardware that fits your space",
    "Safer defaults & OTA updates",
    "Bridges for mixed-protocol gear",
  ],
  "energy-monitoring": [
    "Granular usage by circuit & device",
    "Actionable KPIs and anomaly alerts",
    "Automations for demand-shift savings",
  ],
  "utility-integration": [
    "Cart-to-commissioning in one flow",
    "Zero-touch pairing & naming",
    "Receipts, serials, warranty—tracked",
  ],
};

const EXPECT_BY_SLUG: Record<NewSlug, string[]> = {
  "home-automation": [
    "Automations that adapt to time, presence and ambient conditions.",
    "Clean, open integrations (Apple / Google / Alexa).",
    "Privacy-respecting defaults with local control where possible.",
  ],
  "device-tailoring": [
    "Device behaviour tailored to your routines and layout.",
    "Custom housings that blend with interiors and protect wiring.",
    "OTA updates, diagnostics and rollback-safe profiles.",
  ],
  "energy-monitoring": [
    "Live and historical energy dashboards per room/device.",
    "Peak-hour load shedding and task shifting automations.",
    "Exports for audits and sustainability reporting.",
  ],
  "utility-integration": [
    "Products mapped to rooms, scenes and hubs automatically.",
    "Secure payments with warranty & serial management.",
    "On-site install, provisioning and remote diagnostics.",
  ],
};

export default function Page({ params }: Props) {
  const canonical = resolveCanonicalSlug(params.slug);
  if (!canonical) return notFound();
  if (canonical !== params.slug) redirect(`/solutions/${canonical}`);

  const s =
    solutions.find((x) => x.slug === canonical) ||
    solutions.find((x) => SLUG_ALIASES[x.slug as string] === canonical);

  if (!s) return notFound();

  const tech = TECH_BY_SLUG[canonical];
  const highlights = HIGHLIGHTS_BY_SLUG[canonical];
  const expect = EXPECT_BY_SLUG[canonical];
  const badge = BADGE_BY_SLUG[canonical];

  return (
    <main className="w-full overflow-x-clip relative">
      {/* Full-page background */}
      <div className="absolute inset-0 -z-10 gradient-multi opacity-5" />

      <SEOJsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "Service",
          serviceType: s.heading,
          description: s.description,
          provider: { "@type": "Organization", name: SITE.org.legalName, url: SITE.baseUrl },
          areaServed: "LB",
        }}
      />

      {/* HERO */}
      <section id="solution-hero" className="mt-0.5 mb-14">
        <div className="mx-auto max-w-6xl px-4 grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          <Reveal className="space-y-6">
            {/* Removed "Back to all solutions" link */}
            <span className="inline-flex items-center px-3 py-1 rounded-full bg-zinc-100 text-xs font-medium">
              {badge}
            </span>

            <h1 className="text-4xl md:text-5xl font-extrabold leading-tight tracking-tight">
              <span className="bg-gradient-to-r from-brand-blue to-brand-green bg-clip-text text-transparent">
                {s.heading}
              </span>
            </h1>

            <div className="mt-1">
              <DynamicUnderline watch="#solution-hero" align="left" widthClass="w-24" height={4} />
            </div>

            <p className="text-lg text-zinc-700 max-w-[64ch]">{s.description}</p>

            <div className="flex gap-3 pt-1">
              <Link href="/contact" className="px-5 py-3 rounded-full bg-brand-green text-white font-semibold">
                Book a Free Consultation
              </Link>
              <Link href="/solutions" className="px-5 py-3 rounded-full border border-zinc-300 hover:border-brand-blue">
                All Solutions
              </Link>
            </div>
          </Reveal>

          <Reveal>
            <div className="relative rounded-card overflow-hidden ring-1 ring-brand-blue/10 w-full max-w-[560px] h-[340px] sm:h-[420px] md:justify-self-end">
              <div className="absolute inset-0 gradient-brand opacity-15 pointer-events-none" />
              {s.image ? (
                <Image
                  src={s.image}
                  alt={s.heading}
                  fill
                  className="object-cover"
                  sizes="(min-width:1024px) 560px, 90vw"
                  priority
                />
              ) : (
                <div className="h-full w-full bg-zinc-100" />
              )}
            </div>
          </Reveal>
        </div>
      </section>

      {/* SOLUTION SNAPSHOT (creative, like HomeDome specs) */}
      <section className="mb-12">
        <div className="mx-auto max-w-6xl px-4">
          <Reveal className="relative p-6 md:p-8 rounded-2xl bg-gradient-to-br from-white to-zinc-50 border border-zinc-200 shadow-xl overflow-hidden">
            <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(circle_at_top_left,rgba(0,180,120,0.08),transparent_65%)]" />

            <div className="flex items-start justify-between gap-6 flex-col lg:flex-row">
              <div className="max-w-[56ch]">
                <div className="inline-flex items-center px-3 py-1 rounded-full bg-zinc-100 text-xs font-medium">
                  Solution Snapshot
                </div>
                <h2 className="mt-3 text-2xl font-extrabold tracking-tight text-brand-blue">
                  What you get at a glance
                </h2>
                <p className="mt-2 text-zinc-700">
                  A refined bundle of capabilities and outcomes—curated devices, reliable automations, and
                  future-proof integrations that meet your space where it is.
                </p>
              </div>

              {/* stat band */}
              <div className="w-full lg:w-auto">
                <div className="grid grid-cols-3 gap-3">
                  {[
                    { k: "Setup", v: "Fast" },
                    { k: "Reliability", v: "Local-first" },
                    { k: "Integrations", v: "Open" },
                  ].map(({ k, v }) => (
                    <div key={k} className="rounded-xl bg-white border border-zinc-200 shadow-inner p-3 text-center">
                      <div className="text-[11px] uppercase tracking-wide text-zinc-500">{k}</div>
                      <div className="text-base font-semibold text-zinc-900">{v}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* grid chips (no icons — premium labels) */}
            <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 text-sm">
              {[
                { label: "Platforms", value: "Apple / Google / Alexa" },
                { label: "Network", value: "Thread • Zigbee • Wi-Fi" },
                { label: "Privacy", value: "Local control by default" },
                { label: "Dashboards", value: "Rooms • Scenes • Metrics" },
                { label: "Security", value: "Hardened defaults + keys" },
                { label: "Support", value: "On-site install & tuning" },
              ].map((x) => (
                <div key={x.label} className="p-3 rounded-lg bg-white border border-zinc-100 shadow-inner">
                  <span className="block text-[11px] uppercase tracking-wide text-zinc-500">{x.label}</span>
                  <span className="font-semibold text-zinc-800">{x.value}</span>
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      {/* TECH STACK */}
      <section className="mb-12">
        <div className="mx-auto max-w-6xl px-4">
          <Reveal as="div" className="rounded-card bg-white border border-zinc-100 shadow-soft p-6 relative overflow-hidden">
            <div className="absolute inset-0 -z-10 bg-gradient-to-br from-brand-blue/[0.04] via-white to-brand-green/[0.04]" />
            <div className="flex items-center justify-between gap-4 flex-wrap">
              <div>
                <span className="inline-flex items-center px-3 py-1 rounded-full bg-zinc-100 text-xs font-medium">
                  Stack preview
                </span>
                <h2 className="mt-2 text-xl font-bold">Technologies we use</h2>
                <p className="text-sm text-zinc-600">
                  Typical devices, bridges and software we combine for this solution.
                </p>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 xl:grid-cols-8 gap-3 w-full md:w-auto mt-4 md:mt-0">
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
          </Reveal>
        </div>
      </section>

      {/* HIGHLIGHTS */}
      <section className="pb-6">
        <div className="mx-auto max-w-6xl px-4 grid grid-cols-1 md:grid-cols-3 gap-6">
          {highlights.map((item, i) => (
            <Reveal
              key={i}
              as="article"
              className="p-6 rounded-card shadow-soft bg-white border border-zinc-100 hover:shadow-lg transition-shadow"
            >
              <div className="mb-2 font-bold text-brand-blue">{item}</div>
              <p className="text-sm text-zinc-600">
                Tailored to your routines with VeaLive’s curated devices and flows.
              </p>
            </Reveal>
          ))}
        </div>
      </section>

      {/* DETAILS */}
      <section className="py-12 relative">
        <div className="mx-auto max-w-6xl px-4 grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Reveal as="div" className="p-6 rounded-card bg-white border border-zinc-100 shadow-soft hover:shadow-lg transition-shadow">
            <span className="inline-flex items-center px-2.5 py-1 rounded-full bg-zinc-100 text-xs font-medium">
              What you can expect
            </span>
            <ul className="mt-4 space-y-2 text-zinc-700">
              {expect.map((t) => (
                <li key={t} className="flex items-start gap-2">
                  <span className="mt-1 block h-2 w-2 rounded-full bg-brand-blue" aria-hidden />
                  <span>{t}</span>
                </li>
              ))}
            </ul>
          </Reveal>

          <Reveal as="div" className="p-6 rounded-card bg-white border border-zinc-100 shadow-soft hover:shadow-lg transition-shadow">
            <span className="inline-flex items-center px-2.5 py-1 rounded-full bg-zinc-100 text-xs font-medium">
              Getting started
            </span>
            <p className="mt-3 text-zinc-600">
              {canonical === "utility-integration"
                ? "Add devices to cart and choose ‘Install & Provision’. We’ll schedule on-site setup, pair everything, and hand over a clean dashboard with warranty details."
                : canonical === "energy-monitoring"
                ? "Share your main panel layout and target devices. We’ll plan CT placements, dashboards, and automations for easy efficiency wins."
                : canonical === "device-tailoring"
                ? "Tell us about your space and constraints. We’ll spec hardware, tailor firmware profiles, and deliver calibrated, update-safe setups."
                : "Share your space, habits and preferred platforms. We’ll map quick wins, set a roadmap, and implement with tidy install and follow-up tuning."}
            </p>
            <div className="mt-4 flex gap-3">
              <Link href="/contact" className="px-5 py-3 rounded-full bg-brand-blue text-white font-semibold">
                Start your plan
              </Link>
              {canonical === "utility-integration" ? (
                <Link href="/ecommerce" className="px-5 py-3 rounded-full border border-zinc-300 hover:border-brand-blue">
                  Shop compatible devices
                </Link>
              ) : (
                <Link href="/solutions" className="px-5 py-3 rounded-full border border-zinc-300 hover:border-brand-blue">
                  Explore other solutions
                </Link>
              )}
            </div>
          </Reveal>
        </div>
      </section>

      <CTA />
      <TrustSignals />
    </main>
  );
}
