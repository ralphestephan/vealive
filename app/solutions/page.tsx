// app/solutions/page.tsx
import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import SolutionsGrid from "@/components/SolutionsGrid";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { CheckCircle, Shield, Lightbulb, Thermometer, Tv, Bot, Wrench, Puzzle, Sliders, Cpu, Sparkles} from "lucide-react";
import CTA from "@/components/CTA";
import TrustSignals from "@/components/TrustSignals";
import Process from "@/components/Process";
import solutions from "@/data/solutions";

import SEOJsonLd from "@/components/SEOJsonLd";
import { SITE } from "@/lib/site";

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


export const metadata: Metadata = {
  title: "Solutions by VeaLive360. Smart Living Services in Beirut",
  description:
    "From lighting to climate and security, VeaLive360 curates personalized automation solutions that sense you. Explore smart living for wellness and comfort across Beirut and beyond.",
};

// --- small helper for bullets with brand accent ---
function Bullet({ text }: { text: string }) {
  return (
    <li className="flex items-start gap-2">
      <CheckCircle className="h-5 w-5 text-brand-blue shrink-0 mt-0.5" />
      <span className="text-zinc-700">{text}</span>
    </li>
  );
}

// --- reusable two-column block with image ---
function Block({
  title,
  desc,
  img,
  items,
}: {
  title: string;
  desc: string;
  img: string;
  items: string[];
}) {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
      {/* copy card */}
      <div className="p-6 rounded-card bg-white border border-zinc-100 shadow-soft hover:shadow-lg transition-shadow">
        <span className="inline-flex items-center px-3 py-1 rounded-full bg-zinc-100 text-xs font-medium">
          {title}
        </span>
        <p className="mt-3 text-zinc-600">{desc}</p>
        <ul className="mt-4 space-y-2">
          {items.map((t) => (
            <Bullet key={t} text={t} />
          ))}
        </ul>
        <Link
          href="/contact"
          className="inline-block mt-5 rounded-full bg-brand-blue px-5 py-3 text-white font-semibold"
        >
          Get a quote
        </Link>
      </div>

      {/* visual card */}
      <div className="relative rounded-card overflow-hidden card ring-1 ring-brand-blue/10">
        <div className="absolute inset-0 gradient-brand opacity-15 pointer-events-none" />
        <Image
          src={img}
          alt={title}
          width={1000}
          height={800}
          className="w-full h-auto object-cover"
          priority={false}
        />
      </div>
    </div>
  );
}

export default function Page() {
  return (
    <div className="w-full overflow-x-clip">
{/* HERO */}
<section className="mt-10 mb-12">
  <div className="mx-auto max-w-6xl px-4 grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
    {/* Left: copy (not centered) */}
    <div className="order-2 md:order-1">
      <span className="inline-flex items-center px-3 py-1 rounded-full bg-zinc-100 text-xs font-medium">
        Tailored to your lifestyle
      </span>
      <h1 className="mt-2 text-4xl md:text-5xl font-extrabold leading-tight tracking-tight">
        <span className="bg-gradient-to-r from-brand-blue to-brand-green bg-clip-text text-transparent">
          Solutions by VeaLive360
        </span>
      </h1>
      <p className="mt-3 text-zinc-700 max-w-xl">
        From lighting to climate and security, we curate personalized automation that
        senses you—designed for wellness, comfort, and simplicity across Beirut and beyond.
      </p>
      <span className="mt-4 block h-1 w-20 rounded-full bg-gradient-to-r from-brand-blue to-brand-green" />
      <div className="mt-6 flex gap-3">
        <Link href="/contact" className="px-5 py-3 rounded-full bg-brand-blue text-white font-semibold">
          Book a Free Consultation
        </Link>

      </div>
    </div>

{/* Right: hero image (constrained) */}
<div className="order-1 md:order-2 relative rounded-card overflow-hidden ring-1 ring-brand-blue/10
                h-64 sm:h-80 md:h-96 lg:h-[480px] xl:h-[1000px]">
  <div className="absolute inset-0 gradient-brand opacity-15 pointer-events-none" />
<Image
  src="/images/gateway.png"
  alt="VeaLive smart home"
  fill
  className="object-cover object-top md:object-[80%_12%] lg:object-[85%_15%]"
  sizes="(min-width:1280px) 680px, (min-width:1024px) 560px, (min-width:768px) 50vw, 100vw"
  priority
/>

</div>


  </div>
</section>


      {/* POPULAR SOLUTIONS (carousel) */}
      <section className="mb-2">
        <div className="mx-auto max-w-6xl px-4">
          <div className="relative mb-6">
            <div className="pointer-events-none absolute -top-10 -left-10 w-40 h-40 rounded-full bg-brand-blue/10 blur-3xl" />
            <div className="pointer-events-none absolute -bottom-10 -right-10 w-40 h-40 rounded-full bg-brand-green/10 blur-3xl" />
            <div>
              <span className="inline-flex items-center px-3 py-1 rounded-full bg-zinc-100 text-xs font-medium">
                Curated picks
              </span>
              <h2 className="mt-2 text-3xl sm:text-4xl font-extrabold tracking-tight">
                <span className="bg-gradient-to-r from-brand-blue to-brand-green bg-clip-text text-transparent">
                  Popular solutions
                </span>
              </h2>
              <p className="mt-2 text-zinc-600 max-w-[700px]">
                Our most requested setups across lighting, climate, and security.
              </p>
            </div>
          </div>

          <SolutionsGrid />
        </div>
      </section>

      {/* SERVICE CATEGORIES */}
      <section className="py-16 relative">
        {/* soft background wash */}
        <div className="absolute inset-0 -z-10 gradient-multi opacity-5" />

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
            <p className="text-zinc-600 max-w-[700px] mx-auto mt-2">
              Explore focused packages that solve specific needs—security, lighting, climate, and entertainment.
            </p>
            <span className="mt-3 mx-auto block h-1 w-20 rounded-full bg-gradient-to-r from-brand-blue to-brand-green" />
          </div>

          <Tabs defaultValue="security" className="w-full">
            {/* pill tabs */}
            <div className="flex justify-center mb-8">
              <TabsList className="rounded-full bg-zinc-100/80 p-1">
                <TabsTrigger value="security" className="rounded-full data-[state=active]:bg-white data-[state=active]:shadow-sm px-4 py-2 flex items-center gap-2">
                  <Shield className="w-4 h-4" /> Security
                </TabsTrigger>
                <TabsTrigger value="lighting" className="rounded-full data-[state=active]:bg-white data-[state=active]:shadow-sm px-4 py-2 flex items-center gap-2">
                  <Lightbulb className="w-4 h-4" /> Lighting
                </TabsTrigger>
                <TabsTrigger value="climate" className="rounded-full data-[state=active]:bg-white data-[state=active]:shadow-sm px-4 py-2 flex items-center gap-2">
                  <Thermometer className="w-4 h-4" /> Climate
                </TabsTrigger>
                <TabsTrigger value="entertainment" className="rounded-full data-[state=active]:bg-white data-[state=active]:shadow-sm px-4 py-2 flex items-center gap-2">
                  <Tv className="w-4 h-4" /> Entertainment
                </TabsTrigger>
                <TabsTrigger value="utility" className="rounded-full data-[state=active]:bg-white data-[state=active]:shadow-sm px-4 py-2 flex items-center gap-2">
                  <Bot className="w-4 h-4" /> Utility
                </TabsTrigger>
              </TabsList>
            </div>

            <TabsContent value="security">
              <Block
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

            <TabsContent value="lighting">
              <Block
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

            <TabsContent value="climate">
              <Block
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

            <TabsContent value="entertainment">
              <Block
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
            <TabsContent value="utility">
              <Block
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
      </section>
{/* DEVICE TAILORING */}
<section className="py-16 relative overflow-x-clip">
  <div className="absolute inset-0 -z-10 gradient-multi opacity-5" />

  <div className="mx-auto max-w-6xl px-4">
    {/* title block */}
    <div className="text-center mb-12">
      <span className="inline-flex items-center px-3 py-1 rounded-full bg-zinc-100 text-xs font-medium">
        You dream it — we make it
      </span>
      <h2 className="mt-2 text-3xl sm:text-4xl font-extrabold tracking-tight">
        <span className="bg-gradient-to-r from-brand-blue to-brand-green bg-clip-text text-transparent">
          Device tailoring
        </span>
      </h2>
      <p className="text-zinc-600 max-w-[760px] mx-auto mt-2">
        We design and 3D-print custom enclosures, embed the right sensors, and integrate
        with your preferred ecosystem. From a one-off prototype to a batch, we tailor
        devices to match your space, your routines, and your budget.
      </p>
      <span className="mt-3 mx-auto block h-1 w-20 rounded-full bg-gradient-to-r from-brand-blue to-brand-green" />
    </div>

    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-stretch">
      {/* Copy / features / CTA */}
      <div className="group p-6 rounded-card bg-white border border-zinc-100 shadow-soft hover:shadow-lg transition-shadow relative overflow-hidden">
        <div className="pointer-events-none absolute -top-14 -right-10 w-40 h-40 rounded-full bg-brand-blue/10 blur-3xl" />
        <div className="inline-flex items-center px-3 py-1 rounded-full bg-brand-blue/10 text-brand-blue text-xs font-semibold">
          Tailored builds
        </div>

        <ul className="mt-4 grid sm:grid-cols-2 gap-3">
          {[
            { Icon: Wrench, title: "Custom enclosures", body: "3D-printed housings that fit your interior." },
            { Icon: Cpu, title: "Sensors & connectivity", body: "Wi-Fi, BLE, Zigbee, or wired — your call." },
            { Icon: Puzzle, title: "Your ecosystem", body: "Apple, Google, Alexa, Home Assistant, etc." },
            { Icon: Sliders, title: "Routines first", body: "Scenes tuned to presence, time, and mood." },
          ].map(({ Icon, title, body }) => (
            <li key={title} className="p-4 rounded-xl border border-zinc-100 bg-white/80 hover:bg-white">
              <div className="flex items-start gap-3">
                <span className="w-9 h-9 rounded-lg bg-brand-green/10 text-brand-green inline-flex items-center justify-center shrink-0">
                  <Icon className="w-5 h-5" />
                </span>
                <div>
                  <div className="text-sm font-semibold text-zinc-900">{title}</div>
                  <div className="text-sm text-zinc-600">{body}</div>
                </div>
              </div>
            </li>
          ))}
        </ul>

        <div className="mt-6 flex flex-wrap items-center gap-3">
          <Link
            href="/contact"
            className="rounded-full bg-brand-blue px-5 py-3 text-white font-semibold"
          >
            Create your device
          </Link>
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-zinc-100 text-xs font-medium text-zinc-700">
            <Sparkles className="w-4 h-4" /> 2 devices created
          </span>
        </div>
      </div>

{/* Visuals: 2 device cards (consistent fill + bottom title) */}
<div className="grid sm:grid-cols-2 gap-4">
  {[
    {
      img: "/images/airguard.png",
      title: "AirGuard",
      desc: "Humidity, temperature, and air quality monitoring.",
    },
    {
      // If you want to use the provided file directly, drop it in /public/images as rainguard.png
      img: "/images/rainguard.png",
      title: "RainGuard",
      desc: "Window state detection and automated closure on rain.",
    },
  ].map((d) => (
    <div
      key={d.title}
      className="relative rounded-card overflow-hidden ring-1 ring-brand-blue/10"
    >
      {/* fixed aspect so the image truly spans */}
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

      {/* bottom title strip */}
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
</section>

      {/* HOW WE WORK */}
      <Process />

      {/* CLOSING RHYTHM */}
      <CTA />
      <TrustSignals />
    </div>
  );
}
