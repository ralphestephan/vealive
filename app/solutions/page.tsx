// app/solutions/page.tsx
import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import SolutionsGrid from "@/components/SolutionsGrid";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { CheckCircle, Shield, Lightbulb, Thermometer, Tv, Bot} from "lucide-react";
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
        <div className="mx-auto max-w-6xl px-4 text-center">
          <span className="inline-flex items-center px-3 py-1 rounded-full bg-zinc-100 text-xs font-medium">
            Tailored to your lifestyle
          </span>
          <h1 className="mt-2 text-4xl md:text-5xl font-extrabold leading-tight tracking-tight">
            <span className="bg-gradient-to-r from-brand-blue to-brand-green bg-clip-text text-transparent">
              Solutions by VeaLive360
            </span>
          </h1>
          <p className="mt-3 text-zinc-700 max-w-2xl mx-auto">
            From lighting to climate and security, we curate personalized automation that
            senses you—designed for wellness, comfort, and simplicity across Beirut and beyond.
          </p>
          <span className="mt-4 mx-auto block h-1 w-20 rounded-full bg-gradient-to-r from-brand-blue to-brand-green" />
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
                img="/images/placeholders/solution-security.jpg"
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
                img="/images/placeholders/solution-lighting.jpg"
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
                img="/images/placeholders/solution-climate.jpg"
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
                img="/images/placeholders/solution-entertainment.jpg"
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
                img="/images/placeholders/solution-utility.jpg"
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

      {/* HOW WE WORK */}
      <Process />

      {/* CLOSING RHYTHM */}
      <CTA />
      <TrustSignals />
    </div>
  );
}
