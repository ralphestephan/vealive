import Hero from "@/components/Hero";
import SolutionsGrid from "@/components/SolutionsGrid";
import Link from "next/link";
import Process from "@/components/Process";
import Ecosystem from "@/components/Ecosystem";
import Reviews from "@/components/Reviews";
import Brands from "@/components/Brands";
import BlogTeasers from "@/components/BlogTeasers";
import CTA from "@/components/CTA";
import TrustSignals from "@/components/TrustSignals";
import Services from "@/components/Services";
import  SmartDomePromo from "@/components/SmartDomePromo";
import { SITE } from "@/lib/site";
import SEOJsonLd from "@/components/SEOJsonLd";

import type { Metadata } from "next";
export const metadata: Metadata = {
  title: "VeaLive360 | Smart Home Automation in Beirut",
  description:
    "VeaLive designs presence-aware, privacy-first smart home solutions in Beirut. Open-ecosystem integrations and DIY innovation to bring your home to life.",
  alternates: { canonical: "/" },
  openGraph: {
    title: "VeaLive360 HomePage",
    description:
      "You dream it—we make it. Presence-aware smart living that’s private, open-ecosystem, and locally supported. Explore our 360° approach and Smart Dome concept.",
    url: `${SITE.baseUrl}/about`,
    images: [{ url: SITE.ogImage }],
  },
  twitter: { card: "summary_large_image", site: "@vealive360" },
};

export default function Page() {
return (
<div className="py-8">
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
<Hero />
<Services />
<div className="relative mb-10 flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4">
  {/* soft glow accents */}
  <div className="pointer-events-none absolute -top-10 -left-10 w-40 h-40 rounded-full bg-brand-blue/10 blur-3xl" />
  <div className="pointer-events-none absolute -bottom-10 -right-10 w-40 h-40 rounded-full bg-brand-green/10 blur-3xl" />

  <div>
    <span className="inline-flex items-center px-3 py-1 rounded-full bg-zinc-100 text-xs font-medium">
      Curated picks
    </span>
    <h2 className="mt-2 text-3xl sm:text-4xl font-extrabold tracking-tight">
      <span className="bg-gradient-to-r from-brand-blue to-brand-green bg-clip-text text-transparent">
        Popular Solutions
      </span>
    </h2>
    <p className="mt-2 text-zinc-600">
      Our most requested setups across lighting, climate, and security.
    </p>
    {/* gradient underline */}
    <span className="mt-3 block h-1 w-20 rounded-full bg-gradient-to-r from-brand-blue to-brand-green" />
  </div>

  <Link
    href="/solutions"
    className="inline-flex items-center gap-2 self-start sm:self-auto rounded-full border border-zinc-300 px-4 py-2 text-sm font-semibold hover:border-brand-blue"
  >
    See all <span aria-hidden>→</span>
  </Link>
</div>

<SolutionsGrid />
<Process />
<SmartDomePromo />

<Ecosystem />
<Reviews />
<Brands />
<BlogTeasers />
<CTA />
<TrustSignals />

</div>


);
}