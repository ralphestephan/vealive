// app/page.tsx
import type { Metadata } from "next";
import Link from "next/link";
import { SITE } from "@/lib/site";

import SEOJsonLd from "@/components/SEOJsonLd";
import DynamicUnderline from "@/components/ui/DynamicUnderline";
import Reveal from "@/components/ui/Reveal";

import Hero from "@/components/Hero";
import Services from "@/components/Services";
import SolutionsGrid from "@/components/SolutionsGrid";
import Process from "@/components/Process";
import SmartDomePromo from "@/components/SmartDomePromo";
import Ecosystem from "@/components/Ecosystem";
import Reviews from "@/components/Reviews";
import Brands from "@/components/Brands";
import BlogTeasers from "@/components/BlogTeasers";
import CTA from "@/components/CTA";
import TrustSignals from "@/components/TrustSignals";

export const metadata: Metadata = {
  title: "VeaLive360 | Smart Home Automation in Beirut",
  description:
    "Smart home automation in Beirut and across Lebanon. Presence-aware, privacy-first systems—lighting, climate, security, entertainment, energy, and Smart Dome—integrated with Apple Home, Google, Alexa & open ecosystems.",
  alternates: { canonical: "/" },
  openGraph: {
    title: "VeaLive360 — Smart Home Automation in Beirut",
    description:
      "Presence-aware smart living that’s private, open-ecosystem, and locally supported. Explore our solutions, process, and Smart Dome concept.",
    url: `${SITE.baseUrl}/`,
    images: [{ url: SITE.ogImage }],
  },
  twitter: { card: "summary_large_image", site: "@vealive360" },
  other: {
    keywords:
      "smart home Beirut, home automation Lebanon, Apple Home, Google Home, Alexa, Matter, Thread, Zigbee, smart lighting, smart security, smart climate, Smart Dome, VeaLive360",
  },
};

export default function Page() {
  return (
    <main className="w-full overflow-x-clip">
      <SEOJsonLd
        data={[
          {
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
          },
          {
            "@context": "https://schema.org",
            "@type": "WebSite",
            name: "VeaLive360",
            url: SITE.baseUrl,
          },
        ]}
      />

      {/* HERO has its own spacing; keep it on the canvas */}
      <Hero />

      {/* SERVICES */}
      <Reveal>
        
          <Services />
        
      </Reveal>

      {/* POPULAR SOLUTIONS */}
      <Reveal>
        <section className="py-6">
          <div className="mx-auto max-w-6xl px-4">
            <div className="relative mb-6 flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4">
              <div>
                <span className="inline-flex items-center px-3 py-1 rounded-full bg-zinc-200 text-xs font-medium">
                  Curated picks
                </span>
                <h2 className="mt-2 text-3xl sm:text-4xl font-extrabold tracking-tight">
                  <span className="bg-gradient-to-r from-brand-blue to-brand-green bg-clip-text text-transparent">
                    Popular Solutions
                  </span>
                </h2>
                <div className="mt-2">
                  <DynamicUnderline
                    watch=".solutions-anchor"
                    align="left"
                    widthClass="w-20"
                    height={4}
                  />
                </div>
                <p className="mt-2 text-zinc-600 max-w-[60ch] solutions-anchor">
                  Our most requested setups across lighting, climate, and security.
                </p>
              </div>

              <Link
                href="/solutions"
                className="btn inline-flex items-center gap-2 self-start sm:self-auto rounded-full border border-zinc-300 px-4 py-2 text-sm font-semibold
                           hover:border-brand-blue hover:shadow-sm btn btn-outline"
              >
                See all <span aria-hidden>→</span>
              </Link>
            </div>

            <SolutionsGrid />
          </div>
        </section>
      </Reveal>

      {/* These components already include vertical rhythm; we keep containers but no extra backdrops */}
      <Reveal><Process /></Reveal>
      <Reveal><SmartDomePromo /></Reveal>
      <Reveal><Ecosystem /></Reveal>

      {/* Reviews with plain background + silver press so it blends with canvas */}
      <Reveal><Reviews plain silverPress /></Reveal>

      <Reveal><Brands /></Reveal>
      <Reveal><BlogTeasers /></Reveal>
      <Reveal><CTA /></Reveal>
      <Reveal><TrustSignals /></Reveal>
    </main>
  );
}
