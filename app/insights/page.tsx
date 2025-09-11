// app/insights/page.tsx  — SERVER component

import type { Metadata } from "next";
import { SITE } from "@/lib/site";
import { insights } from "@/data/insights";
import SEOJsonLd from "@/components/SEOJsonLd";
import InsightsIndex from "@/components/InsightsIndex";
import DynamicUnderline from "@/components/ui/DynamicUnderline";
import Reveal from "@/components/ui/Reveal";

export const metadata: Metadata = {
  title: "IoT Insights | VeaLive",
  description:
    "Deep dives, how-tos, and design notes on smart living: protocols, presence, lighting, privacy, pets, luxury living, and 360° domes.",
  alternates: { canonical: "/insights" },
  openGraph: {
    title: "IoT Insights by VeaLive",
    description:
      "Practical guides and design thinking for real homes. From Matter vs Zigbee to mmWave presence and luxury automation.",
    url: `${SITE.baseUrl}/insights`,
    images: [{ url: SITE.ogImage }],
  },
  twitter: { card: "summary_large_image", site: "@vealive360" },
};

export default function Page() {
  return (
    <main className="w-full overflow-x-clip page-canvas">
      {/* JSON-LD: Blog */}
      <SEOJsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "Blog",
          name: "VeaLive Insights",
          url: `${SITE.baseUrl}/insights`,
          blogPost: insights.slice(0, 9).map((p) => ({
            "@type": "BlogPosting",
            headline: p.title,
            datePublished: p.date,
            url: `${SITE.baseUrl}/insights/${p.slug}`,
            image: `${SITE.baseUrl}${p.cover}`,
            author: { "@type": "Organization", name: SITE.org.legalName },
            publisher: {
              "@type": "Organization",
              name: SITE.org.legalName,
              logo: { "@type": "ImageObject", url: `${SITE.baseUrl}${SITE.org.logo}` },
            },
            description: p.excerpt,
          })),
        }}
      />

      {/* HERO */}
      <section className="mt-10 mb-8 relative section-wrap">
        <div className="absolute inset-0 -z-10 bg-gradient-to-br from-brand-blue/[0.06] via-white to-brand-green/[0.06]" />
        <div className="mx-auto max-w-6xl px-4 text-center">
          <Reveal>
            <span className="inline-flex items-center px-3 py-1 rounded-full bg-zinc-100 text-xs font-medium">
              Insights
            </span>
            <h1 className="mt-2 text-4xl md:text-5xl font-extrabold leading-tight tracking-tight">
              <span className="bg-gradient-to-r from-brand-blue to-brand-green bg-clip-text text-transparent">
                IoT & Smart-Living Ideas
              </span>
            </h1>
            <div className="mt-3">
              <DynamicUnderline watch="h1" align="center" widthClass="w-20" height={4} />
            </div>
            <p className="mt-3 text-lg text-zinc-700 max-w-[720px] mx-auto">
              Practical guides, design notes, and mini deep-dives—so your spaces feel effortless.
            </p>
          </Reveal>
        </div>
      </section>

      {/* LIST */}
      <section className="pb-16">
        <div className="mx-auto max-w-6xl px-4">
          {/* InsightsIndex already renders cards; it’ll inherit our scroll reveal/utilities */}
          <InsightsIndex posts={insights} />
        </div>
      </section>
    </main>
  );
}
