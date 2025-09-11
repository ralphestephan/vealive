import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";
import CTA from "@/components/CTA";
import TrustSignals from "@/components/TrustSignals";
import { Award, Lightbulb, Target, TrendingUp, Users } from "lucide-react";
import SEOJsonLd from "@/components/SEOJsonLd";
import { SITE } from "@/lib/site";
import DynamicUnderline from "@/components/ui/DynamicUnderline";

export const metadata: Metadata = {
  title: "About VeaLive | Personalized Smart Home Automation in Beirut",
  description:
    "VeaLive designs presence-aware, privacy-first smart home solutions in Beirut. Open-ecosystem integrations and DIY innovation to bring your home to life.",
  alternates: { canonical: "/about" },
  openGraph: {
    title: "About VeaLive",
    description:
      "You dream it—we make it. Presence-aware smart living that’s private, open-ecosystem, and locally supported. Explore our 360° approach and Smart Dome concept.",
    url: `${SITE.baseUrl}/about`,
    images: [{ url: SITE.ogImage }],
  },
  twitter: { card: "summary_large_image", site: "@vealive360" },
};

const chips = {
  blue: "bg-brand-blue/10 text-brand-blue",
  green: "bg-brand-green/10 text-brand-green",
} as const;

const rings = {
  blue: "ring-1 ring-brand-blue/10",
  green: "ring-1 ring-brand-green/10",
} as const;

export default function Page() {
  return (
    <div className="w-full overflow-x-clip">
      {/* JSON-LD (Organization) */}
      <SEOJsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "Organization",
          name: SITE.org.legalName,
          url: SITE.org.url,
          logo: SITE.org.logo,
          sameAs: SITE.org.sameAs,
          contactPoint: [
            {
              "@type": "ContactPoint",
              telephone: SITE.contact.phone,
              contactType: "customer service",
              areaServed: "LB",
              availableLanguage: ["en", "ar", "fr"],
            },
          ],
        }}
      />

      {/* HERO */}
      <section
        id="about-hero"
        className="mt-10 mb-16 grid grid-cols-1 md:grid-cols-2 gap-8 items-center"
      >
        <div className="space-y-6">
          <span className="inline-flex items-center px-3 py-1 rounded-full bg-zinc-100 text-xs font-medium">
            Bring Your Home to Life
          </span>
          <h1 className="text-4xl md:text-5xl font-extrabold leading-tight tracking-tight">
            <span className="bg-gradient-to-r from-brand-blue to-brand-green bg-clip-text text-transparent">
              About VeaLive
            </span>
          </h1>

          {/* Dynamic underline (left-aligned to the title) */}
          <DynamicUnderline
            watch="#about-hero"
            align="left"
            widthClass="w-24"
            height={4}
          />

          <p className="text-lg text-zinc-700 max-w-[620px]">
            Beirut-based studio crafting personalized, presence-aware smart home
            automation. From DIY 3D-printed devices to pro-grade integrations—local,
            private by design, and tuned to your daily routines. <strong>We tailor devices to meet each client’s needs.</strong>
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

        <div className={`relative rounded-card overflow-hidden card ${rings.blue}`}>
          <div className="absolute inset-0 gradient-brand opacity-25 pointer-events-none" />
          <Image
            src="/images/PHOTO-2025-05-08-19-32-52.jpg"
            alt="VeaLive smart home automation and responsive living spaces"
            width={550}
            height={400}
            className="w-[550px] h-[400px] object-cover"
            priority
          />
        </div>
      </section>

      {/* WHO WE ARE / WHAT WE BELIEVE */}
      <section className="py-16 relative overflow-x-clip">
        <div className="absolute inset-0 -z-10 gradient-multi opacity-5" />
        <div className="pointer-events-none absolute -top-16 -left-10 w-56 h-56 rounded-full bg-brand-blue/10 blur-3xl" />
        <div className="pointer-events-none absolute -bottom-16 -right-10 w-56 h-56 rounded-full bg-brand-green/10 blur-3xl" />

        <div className="mx-auto max-w-6xl px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Who we are */}
            <div className="group p-6 rounded-card bg-white border border-zinc-100 shadow-soft hover:shadow-lg transition-shadow relative overflow-hidden">
              <div className="inline-flex items-center px-3 py-1 rounded-full bg-brand-blue/10 text-brand-blue text-xs font-semibold">
                Who we are
              </div>
              <h2 className="text-3xl font-bold mt-3">
                From Beirut to smarter living—everywhere
              </h2>
              <p className="mt-3 text-zinc-600">
                Since 2018, VeaLive has united engineers, designers, and integrators to
                build responsive environments. We specify hardware, flows, and scenes
                around <em>your</em> routines—not the other way around.
              </p>
              <p className="mt-3 text-zinc-600">
                From single-room upgrades to whole-property systems, we deliver setups
                that feel effortless on day one and stay delightful over time.
              </p>
              <p className="mt-3 text-zinc-600">
                Based in Beirut, we’re proud to serve Lebanon and the MENA region with
                local expertise, support, and care.
              </p>
              <p className="mt-3 text-zinc-600">
                Our team combines backgrounds in software engineering, architecture,
                industrial design, and IT networking. Together, we’re passionate about
                open ecosystems, privacy-first design, and making smart living more
                accessible.
              </p>
            </div>

            {/* What we believe */}
            <div className="group p-6 rounded-card bg-white border border-zinc-100 shadow-soft hover:shadow-lg transition-shadow relative overflow-hidden">
              <div className="inline-flex items-center px-3 py-1 rounded-full bg-brand-green/10 text-brand-green text-xs font-semibold">
                What we believe
              </div>
              <ul className="mt-4 grid gap-4">
                {[
                  {
                    title: "People-first comfort",
                    body: "Automation that adapts to presence, time, and mood.",
                  },
                  {
                    title: "Open & flexible",
                    body:
                      "Apple / Google / Alexa; wired or wireless—your ecosystem, your rules.",
                  },
                  {
                    title: "Local & secure",
                    body: "Local-first where possible, privacy-respecting by default.",
                  },
                  {
                    title: "Care over time",
                    body:
                      "We monitor, iterate, and support—so systems stay fast and reliable.",
                  },
                ].map((item) => (
                  <li
                    key={item.title}
                    className="p-4 rounded-xl border border-zinc-100 bg-white/80 hover:bg-white"
                  >
                    <div className="text-sm font-semibold text-zinc-900">
                      {item.title}
                    </div>
                    <div className="text-zinc-600">{item.body}</div>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* PROOF / STATS */}
      <section className="py-10">
        <div className="mx-auto max-w-6xl px-4">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {[
              { k: "7+", v: "Years delivering", tone: "blue" as const },
              { k: "3+", v: "Spaces improved", tone: "green" as const }, // changed 21 → 2
              { k: "2", v: "Devices created", tone: "blue" as const }, // new stat
              { k: "90%", v: "Uptime Targets", tone: "green" as const },
            ].map(({ k, v, tone }) => (
              <Card
                key={v}
                className={`rounded-card bg-white border border-zinc-100 shadow-soft hover:shadow-lg transition-shadow ${rings[tone]}`}
              >
                <CardContent className="p-5 text-center">
                  <div className="text-2xl font-extrabold">{k}</div>
                  <div className="text-sm text-zinc-600">{v}</div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* MEET THE TEAM (match section/card styling) */}
      <section id="about-team" className="py-16 relative overflow-x-clip">
        <div className="absolute inset-0 -z-10 gradient-multi opacity-5" />
        <div className="mx-auto max-w-6xl px-4">
          {/* title block */}
          <div className="text-center mb-12">
            <span className="inline-flex items-center px-3 py-1 rounded-full bg-zinc-100 text-xs font-medium">
              People behind VeaLive
            </span>
            <h2 className="mt-2 text-3xl sm:text-4xl font-extrabold tracking-tight">
              <span className="bg-gradient-to-r from-brand-blue to-brand-green bg-clip-text text-transparent">
                Meet the team
              </span>
            </h2>
            <p className="text-zinc-600 max-w-[720px] mx-auto mt-2">
              Engineers and makers who tailor devices and systems around your routines.
            </p>

            {/* Dynamic underline (centered) */}
            <div className="mt-3">
              <DynamicUnderline
                watch="#about-team"
                align="center"
                widthClass="w-20"
                height={4}
              />
            </div>
          </div>

          {/* cards */}
          <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3">
            {[
              {
                name: "Mohammad Wazzan",
                role: "Founder & CEO",
                img: "/images/wazzn.jpg",
              },
              {
                name: "Ralph Estephan",
                role: "Co-founder & Tech Lead",
                img: "/images/ralph.jpg",
              },
              {
                name: "George Mouannes",
                role: "Electro-Mechanical Engineer",
                img: "/images/george.jpg",
              },
            ].map((p) => (
              <div
                key={p.name}
                className="group p-6 rounded-card bg-white border border-zinc-100 shadow-soft hover:shadow-lg transition-shadow relative overflow-hidden"
              >
                {/* subtle brand wash like other cards */}
                <div className="pointer-events-none absolute -top-10 -right-10 w-32 h-32 rounded-full bg-brand-blue/5 blur-2xl" />
                <div className="flex flex-col items-center text-center">
                  <div className="w-28 h-28 rounded-full overflow-hidden ring-1 ring-zinc-200">
                    <Image
                      src={p.img}
                      alt={`${p.name} — ${p.role}`}
                      width={160}
                      height={160}
                      className="w-full h-full object-cover"
                    />
                  </div>

                  <div className="mt-4 font-semibold text-zinc-900">{p.name}</div>
                  <div className="mt-1 text-sm text-zinc-600">{p.role}</div>

                  {/* small pill to mirror chips elsewhere */}
                  <span className="mt-3 inline-flex items-center px-2.5 py-1 rounded-full bg-zinc-100 text-xs text-zinc-700">
                    VeaLive 360
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* MISSION & VALUES */}
      <section id="about-mission" className="py-16 relative overflow-x-clip">
        <div className="absolute inset-0 -z-10 gradient-multi opacity-5" />
        <div className="mx-auto max-w-6xl px-4">
          <div className="text-center mb-12">
            <span className="inline-flex items-center px-3 py-1 rounded-full bg-zinc-100 text-xs font-medium">
              Mission &amp; Values
            </span>
            <h2 className="mt-2 text-3xl sm:text-4xl font-extrabold tracking-tight">
              <span className="bg-gradient-to-r from-brand-blue to-brand-green bg-clip-text text-transparent">
                What drives us
              </span>
            </h2>
            <p className="text-zinc-600 max-w-[720px] mx-auto mt-2">
              The principles that shape every system we design—our 360° approach and
              Smart Dome concept included.
            </p>

            {/* Dynamic underline (centered) */}
            <div className="mt-3">
              <DynamicUnderline
                watch="#about-mission"
                align="center"
                widthClass="w-20"
                height={4}
              />
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <div className="p-6 rounded-card bg-white hover:shadow-lg transition-shadow">
              <div className="flex items-center gap-3 mb-3">
                <span className={`w-10 h-10 rounded-lg ${chips.blue} inline-flex items-center justify-center`}>
                  <Target className="w-5 h-5" aria-hidden />
                </span>
                <h3 className="text-xl font-bold">Our Mission</h3>
              </div>
              <p className="mt-2 text-zinc-600">
                Empower people to create smarter, more efficient, and more comfortable
                living through elegant, dependable automation.
              </p>
            </div>

            <div className="p-6 rounded-card bg-white  hover:shadow-lg transition-shadow">
              <div className="flex items-center gap-3 mb-3">
                <span className={`w-10 h-10 rounded-lg ${chips.blue} inline-flex items-center justify-center`}>
                  <Lightbulb className="w-5 h-5" aria-hidden />
                </span>
                <h3 className="text-xl font-bold">Our Vision</h3>
              </div>
              <p className="mt-2 text-zinc-600">
                Set the global standard for personalized, presence-aware smart living—
                innovative, open, and effortless.
              </p>
            </div>
          </div>

{/* VALUES */}
<div className="grid grid-cols-3 gap-3 sm:gap-4 mt-6">
  {[
    { Icon: Award,      label: "Excellence" },
    { Icon: TrendingUp, label: "Innovation" },
    { Icon: Users,      label: "Customer Focus" },
  ].map(({ Icon, label }) => (
    <div
      key={label}
      className="p-4 sm:p-6 rounded-card bg-white border border-zinc-100 shadow-soft hover:shadow-lg transition-shadow text-center flex flex-col items-center"
    >
      <div className="w-10 h-10 sm:w-14 sm:h-14 rounded-2xl bg-brand-green/10 text-brand-green flex items-center justify-center mb-2 sm:mb-3">
        <Icon className="w-5 h-5 sm:w-7 sm:h-7" aria-hidden />
      </div>
      <h3 className="text-sm sm:text-base font-bold">{label}</h3>
    </div>
  ))}
</div>

        </div>
      </section>

      {/* TRUST + CTA */}
      <CTA />
      <TrustSignals />
    </div>
  );
}
