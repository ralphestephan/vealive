// app/insights/page.tsx  — SERVER component

import type { Metadata } from "next";
import { SITE } from "@/lib/site";
import { insights } from "@/data/insights";
import SEOJsonLd from "@/components/SEOJsonLd";
import InsightsIndex from "@/components/InsightsIndex";

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
    <main className="w-full overflow-x-clip">
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
      <InsightsIndex posts={insights} />
    </main>
  );
}
