// app/solutions/page.tsx
import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import SolutionsGrid from "@/components/SolutionsGrid";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  CheckCircle, Shield, Lightbulb, Thermometer, Tv, Bot,
  Wrench, Puzzle, Sliders, Cpu, Sparkles
} from "lucide-react";

import CTA from "@/components/CTA";
import TrustSignals from "@/components/TrustSignals";
import Process from "@/components/Process";
import solutions from "@/data/solutions";

import SEOJsonLd from "@/components/SEOJsonLd";
import { SITE } from "@/lib/site";
import DynamicUnderline from "@/components/ui/DynamicUnderline";
import Reveal from "@/components/ui/Reveal";

export const metadata: Metadata = {
  title: "Solutions by VeaLive360. Smart Living Services in Beirut",
  description:
    "From lighting to climate and security, VeaLive360 curates personalized automation solutions that sense you. Explore smart living for wellness and comfort across Beirut and beyond.",
  alternates: { canonical: "/solutions" },
  openGraph: {
    title: "Solutions by VeaLive360",
    description:
      "Explore tailored smart living: lighting, climate, security, entertainment, and utility automations.",
    url: `${SITE.baseUrl}/solutions`,
    images: [{ url: SITE.ogImage }],
  },
  twitter: { card: "summary_large_image", site: "@vealive360" },
};

function Bullet({ text }: { text: string }) {
  return (
    <li className="flex items-start gap-2">
      <CheckCircle className="h-5 w-5 text-brand-blue shrink-0 mt-0.5" />
      <span className="text-zinc-700">{text}</span>
    </li>
  );
}

type Tone = "blue" | "green";

/** Split card (copy + image) */
function SplitCard({
  label, title, desc, items, img, imgAlt, tone = "blue",
}: {
  label: string; title: string; desc: string; items: string[];
  img: string; imgAlt?: string; tone?: Tone;
}) {
  const wash = tone === "green" ? "brand-wash--green ring-green" : "brand-wash--blue ring-blue";
  return (
    <div className={`card overflow-hidden brand-wash--card ${wash}`}>
      <div className="grid grid-cols-1 lg:grid-cols-5 relative z-10">
        {/* Left: copy */}
        <div className="lg:col-span-3 p-6 md:p-8">
          <span className="inline-flex items-center px-3 py-1 rounded-full bg-zinc-100 text-xs font-medium">
            {label}
          </span>
          <h3 className="mt-2 text-2xl font-bold">{title}</h3>
          <p className="mt-2 text-zinc-600">{desc}</p>

          <ul className="mt-4 grid sm:grid-cols-2 gap-2">
            {items.map((t) => <Bullet key={t} text={t} />)}
          </ul>

          <Link href="/contact" className="btn-primary inline-block mt-5">
            Get a quote
          </Link>
        </div>

        {/* Right: image */}
        <div className="lg:col-span-2 relative bg-zinc-50">
          <div className="relative w-full aspect-[16/11] md:aspect-[4/3] lg:aspect-auto lg:h-full">
            <Image
              src={img} alt={imgAlt ?? title} fill
              sizes="(min-width:1024px) 40vw, 100vw"
              className="object-cover object-center"
            />
            <div className="absolute inset-0 gradient-brand opacity-10 pointer-events-none" />
          </div>
        </div>
      </div>
    </div>
  );
}

export default function Page() {
  return (
    <main className="w-full overflow-x-clip page-canvas">
      {/* JSON-LD */}
      <SEOJsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "CollectionPage",
          name: "Smart Home Solutions",
          url: `${SITE.baseUrl}/solutions`,
          hasPart: solutions.map((s) => ({
            "@type": "Service",
            name: s.heading,
            url: `${SITE.baseUrl}/solutions/${s.slug}`,
            description: s.description,
            provider: { "@type": "Organization", name: SITE.org.legalName, url: SITE.baseUrl },
          })),
          breadcrumb: {
            "@type": "BreadcrumbList",
            itemListElement: [
              { "@type": "ListItem", position: 1, name: "Home", item: SITE.baseUrl },
              { "@type": "ListItem", position: 2, name: "Solutions", item: `${SITE.baseUrl}/solutions` },
            ],
          },
        }}
      />

      {/* HERO */}
      <section className="mt-10 mb-12">
        <div className="mx-auto max-w-6xl px-4 grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          {/* Copy */}
          <div className="reveal-base animate-in">
            <span className="inline-flex items-center px-3 py-1 rounded-full bg-zinc-100 text-xs font-medium">
              Tailored to your lifestyle
            </span>
            <h1 className="mt-2 text-4xl md:text-5xl font-extrabold leading-tight tracking-tight">
              <span className="bg-gradient-to-r from-brand-blue to-brand-green bg-clip-text text-transparent">
                Solutions by VeaLive360
              </span>
            </h1>
            <div className="mt-2">
              <DynamicUnderline watch="section:first-of-type" align="left" widthClass="w-24" height={4} />
            </div>
            <p className="mt-3 text-zinc-700 max-w-xl">
              From lighting to climate and security, we curate personalized automation that
              senses you—designed for wellness, comfort, and simplicity across Beirut and beyond.
            </p>
            <div className="mt-6 flex gap-3">
              <Link href="/contact" className="btn-primary">Book a Free Consultation</Link>
            </div>
          </div>

          {/* Image — fixed aspect so Next/Image can render reliably */}
{/* Image — taller, show more from the top */}
<div className="relative">
  <div className="relative rounded-[var(--radius-card)] overflow-hidden ring-1 ring-brand-blue/10">
    {/* Taller fixed heights across breakpoints = less aggressive crop */}
    <div className="relative w-full h-[360px] sm:h-[420px] lg:h-[520px]">
      <Image
        src="/images/gateway.png"
        alt="VeaLive smart home"
        fill
        sizes="(min-width:1024px) 50vw, 100vw"
        className="object-cover object-[50%_10%]"  // center horizontally, 10% from top
        priority
      />
    </div>
    <div className="absolute inset-0 gradient-brand opacity-15 pointer-events-none" />
  </div>


          </div>
        </div>
      </section>

      {/* POPULAR */}
      <section className="mb-2">
        <div className="mx-auto max-w-6xl px-4">
          <Reveal>
          <div className="relative mb-6 text-center">
            <div className="pointer-events-none absolute -top-10 -left-10 w-40 h-40 rounded-full bg-brand-blue/10 blur-3xl" />
            <div className="pointer-events-none absolute -bottom-10 -right-10 w-40 h-40 rounded-full bg-brand-green/10 blur-3xl" />
            <span className="inline-flex items-center px-3 py-1 rounded-full bg-zinc-100 text-xs font-medium">
              Curated picks
            </span>
            <h2 className="mt-2 text-3xl sm:text-4xl font-extrabold tracking-tight">
              <span className="bg-gradient-to-r from-brand-blue to-brand-green bg-clip-text text-transparent">
                Popular solutions
              </span>
            </h2>
            <div className="mt-2 flex justify-center">
              <DynamicUnderline watch=".solutions-popular" align="center" widthClass="w-20" height={4} />
            </div>
            <p className="mt-2 text-zinc-600 max-w-[700px] mx-auto">
              Our most requested setups across lighting, climate, and security.
            </p>
          </div>

          <div className="solutions-popular">
            <SolutionsGrid />
          </div>
          </Reveal>
        </div>
      </section>

      {/* SERVICE CATEGORIES — consistent split cards */}
      <section className="py-16 relative">
        <div className="absolute inset-0 -z-10 gradient-multi opacity-5" />
        <Reveal>
        <div className="mx-auto max-w-6xl px-4">
          <div className="text-center mb-10">
            <span className="inline-flex items-center px-3 py-1 rounded-full bg-zinc-100 text-xs font-medium">
              Service categories
            </span>
            <h2 className="mt-2 text-3xl sm:text-4xl font-extrabold tracking-tight">
              <span className="bg-gradient-to-r from-brand-blue to-brand-green bg-clip-text text-transparent">
                Specialized solutions
              </span>
            </h2>
            <div className="mt-2 flex justify-center">
              <DynamicUnderline watch=".specialized-block" align="center" widthClass="w-20" height={4} />
            </div>
            <p className="text-zinc-600 max-w-[700px] mx-auto mt-2">
              Explore focused packages that solve specific needs—security, lighting, climate, and entertainment.
            </p>
          </div>

          <Tabs defaultValue="security" className="w-full specialized-block">
            {/* Mobile: horizontal scroll; Desktop: centered */}
            <div className="tabs-scroll -mx-4 px-4 md:mx-0 md:px-0 mb-8">
              <div className="tabs-scroll-inner md:flex md:justify-center md:gap-2">
                <TabsList className="rounded-full bg-zinc-100/80 p-1 inline-flex">
                  {[
                    { v: "security",      label: "Security",      Icon: Shield },
                    { v: "lighting",      label: "Lighting",      Icon: Lightbulb },
                    { v: "climate",       label: "Climate",       Icon: Thermometer },
                    { v: "entertainment", label: "Entertainment", Icon: Tv },
                    { v: "utility",       label: "Utility",       Icon: Bot },
                  ].map(({ v, label, Icon }) => (
                    <TabsTrigger
                      key={v}
                      value={v}
                      className="
                        rounded-full px-4 py-2 flex items-center gap-2 transition-all
                        hover:bg-white/70 data-[state=active]:bg-white data-[state=active]:shadow-sm
                        focus-visible:ring-2 focus-visible:ring-brand-blue/40
                      "
                    >
                      <Icon className="w-4 h-4" /> {label}
                    </TabsTrigger>
                  ))}
                </TabsList>
                
              </div>
            </div>

            {/* Each content gets a slow swoosh-in */}
            <TabsContent value="security" className="motion-safe:animate-tabIn-slow">
              <SplitCard
                label="Smart Security"
                title="Smart Security Solutions"
                desc="Protect your home with cameras, smart locks, motion sensors, and presence simulation—managed from anywhere."
                img="/images/security.png"
                items={[
                  "Smart doorbell and camera installation",
                  "Smart lock integration",
                  "Motion sensor setup",
                  "Security system monitoring",
                ]}
              />
            </TabsContent>

            <TabsContent value="lighting" className="motion-safe:animate-tabIn-slow">
              <SplitCard
                label="Smart Lighting"
                title="Smart Lighting Solutions"
                desc="Transform ambiance with scenes, schedules, and sensors—controlled by app, voice, or presence."
                img="/images/lighting.png"
                items={[
                  "Smart bulb & switch installation",
                  "Lighting automation setup",
                  "Scene creation and programming",
                  "Voice control integration",
                ]}
              />
            </TabsContent>

            <TabsContent value="climate" className="motion-safe:animate-tabIn-slow">
              <SplitCard
                label="Climate Control"
                title="Climate Control Solutions"
                desc="Comfort that optimizes itself—smart thermostats, HVAC integration, and real-time energy insights."
                img="/images/climate.png"
                items={[
                  "Smart thermostat installation",
                  "HVAC system integration",
                  "Energy usage monitoring",
                  "Automated temperature scheduling",
                ]}
              />
            </TabsContent>

            <TabsContent value="entertainment" className="motion-safe:animate-tabIn-slow">
              <SplitCard
                label="Entertainment"
                title="Smart Entertainment Solutions"
                desc="Seamless audio/video across rooms with unified control for films, music, and streaming."
                img="/images/tv.png"
                items={[
                  "Multi-room audio setup",
                  "Smart TV & streaming integration",
                  "Home theater installation",
                  "Voice-controlled entertainment",
                ]}
              />
            </TabsContent>

            <TabsContent value="utility" className="motion-safe:animate-tabIn-slow">
              <SplitCard
                label="Utility Automation"
                title="Utility Automation Solutions"
                desc="Automate everyday tasks—smart plugs, irrigation, appliance control, and chores management."
                img="/images/utility.png"
                items={[
                  "Automated Pet Feeder",
                  "Cleaner Root",
                  "Smart Appliances",
                  "Coffee Maker Integration",
                ]}
              />
            </TabsContent>
          </Tabs>
        </div>
        </Reveal>
      </section>

      {/* DEVICE TAILORING (fit + consistent) */}
      <section className="py-16 relative overflow-x-clip">
        <div className="absolute inset-0 -z-10 gradient-multi opacity-5" />
        <Reveal>
        <div className="mx-auto max-w-6xl px-4">
          <div className="text-center mb-10">
            <span className="inline-flex items-center px-3 py-1 rounded-full bg-zinc-100 text-xs font-medium">
              You dream it — we make it
            </span>
            <h2 className="mt-2 text-3xl sm:text-4xl font-extrabold tracking-tight">
              <span className="bg-gradient-to-r from-brand-blue to-brand-green bg-clip-text text-transparent">
                Device tailoring
              </span>
            </h2>
            <div className="mt-2 flex justify-center">
              <DynamicUnderline watch=".device-tailor" align="center" widthClass="w-20" height={4} />
            </div>
            <p className="text-zinc-600 max-w-[760px] mx-auto mt-2">
              We design and 3D-print custom enclosures, embed the right sensors, and integrate
              with your preferred ecosystem. From a one-off prototype to a batch, we tailor
              devices to match your space, your routines, and your budget.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-stretch device-tailor">
            {/* Left card */}
            <div className="group p-6 rounded-card bg-white border border-zinc-100 shadow-soft hover:shadow-lg transition-shadow relative overflow-hidden brand-wash h-full">
              <div className="inline-flex items-center px-3 py-1 rounded-full bg-brand-blue/10 text-brand-blue text-xs font-semibold">
                Tailored builds
              </div>

              <ul className="mt-4 grid sm:grid-cols-2 gap-3">
                {[
                  { Icon: Wrench,   title: "Custom enclosures",       body: "3D-printed housings that fit your interior." },
                  { Icon: Cpu,      title: "Sensors & connectivity",   body: "Wi-Fi, BLE, Zigbee, or wired—your call." },
                  { Icon: Puzzle,   title: "Your ecosystem",           body: "Apple, Google, Alexa, Home Assistant, etc." },
                  { Icon: Sliders,  title: "Routines first",           body: "Scenes tuned to presence, time, and mood." },
                ].map(({ Icon, title, body }) => (
                  <li key={title} className="device-card-li p-4">
                    <span className="w-9 h-9 rounded-lg bg-brand-green/10 text-brand-green inline-grid place-items-center">
                      <Icon className="w-5 h-5" />
                    </span>
                    <div>
                      <div className="text-sm font-semibold text-zinc-900">{title}</div>
                      <div className="text-sm text-zinc-600">{body}</div>
                    </div>
                  </li>
                ))}
              </ul>

              <div className="mt-6 flex flex-wrap items-center gap-3">
                <Link href="/contact" className="btn btn-primary">
                  Create your device
                </Link>
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-zinc-100 text-xs font-medium text-zinc-700">
                  <Sparkles className="w-4 h-4" /> 2 devices created
                </span>
              </div>
            </div>

            {/* Visuals: 2 device cards */}
            <div className="grid sm:grid-cols-2 gap-4">
              {[
                { img: "/images/airguard.png", title: "AirGuard", desc: "Humidity, temperature, and air quality monitoring." },
                { img: "/images/rainguard.png", title: "RainGuard", desc: "Window state detection and automated closure on rain." },
              ].map((d) => (
                <div key={d.title} className="relative rounded-card overflow-hidden ring-1 ring-brand-blue/10">
                  <div className="relative w-full aspect-[4/5]">
                    <Image
                      src={d.img}
                      alt={d.title}
                      fill
                      className="object-cover"
                      sizes="(max-width: 768px) 100vw, 50vw"
                      priority={false}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/35 via-black/5 to-transparent pointer-events-none" />
                  </div>
                  <div className="absolute inset-x-0 bottom-0">
                    <div className="p-4 bg-white/90 backdrop-blur">
                      <div className="font-semibold">{d.title}</div>
                      <div className="text-sm text-zinc-600">{d.desc}</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

          </div>
          
        </div>
        </Reveal>
      </section>

      <Process />
      <CTA />
      <TrustSignals />
    </main>
  );
}
