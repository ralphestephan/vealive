// app/homedome/page.tsx
import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import CTA from "@/components/CTA";
import TrustSignals from "@/components/TrustSignals";
import SEOJsonLd from "@/components/SEOJsonLd";
import { SITE } from "@/lib/site";
import { Zap, Shield, Wind, Sun, Mail, Phone, MapPin, Instagram, Facebook } from "lucide-react";
import DynamicUnderline from "@/components/ui/DynamicUnderline";
import Reveal from "@/components/ui/Reveal";
import { FaTiktok } from "react-icons/fa";

export const metadata: Metadata = {
  title: "Smart Dome by VeaLive | Modular, Automation-Ready Habitat",
  description:
    "Smart Dome by VeaLive: modular, geodesic, energy-efficient habitat designed for comfort, resilience, and automation—earthquake-resistant, eco-friendly, and solar-ready.",
  alternates: { canonical: "/homedome" },
  openGraph: {
    title: "Smart Dome by VeaLive",
    description:
      "A modular, automation-native, geodesic habitat that brings your space to life—disaster-proof, adaptive HVAC, tunable lighting, security, and energy optimization.",
    url: `${SITE.baseUrl}/homedome`,
    images: [{ url: `${SITE.baseUrl}/images/placeholders/homedome-hero.jpg` }],
  },
  twitter: { card: "summary_large_image", site: "@vealive360" },
};

export default function Page() {
  return (
    <div className="w-full overflow-x-clip page-canvas">
      {/* JSON-LD */}
      <SEOJsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "Product",
          name: "Smart Dome by VeaLive",
          brand: { "@type": "Brand", name: "VeaLive" },
          description:
            "Geodesic, modular, automation-ready dome with adaptive lighting, air quality, security, and solar-ready energy. Disaster-proof, waterproof, eco-friendly.",
          image: [`${SITE.baseUrl}/images/placeholders/homedome-hero.jpg`],
          aggregateRating: {
            "@type": "AggregateRating",
            ratingValue: "4.9",
            reviewCount: "27",
          },
        }}
      />

      {/* HERO */}
      
      
      
      
      <section className="relative mt-0.5">
        <div className="absolute inset-0 -z-10 bg-gradient-to-br from-brand-blue/[0.06] via-transparent to-brand-green/[0.06]" />
        <div className="mx-auto max-w-6xl px-4 grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          <Reveal className="space-y-6">
            <span className="pill">Our Signature Habitat</span>
            <h1 className="text-4xl md:text-5xl font-extrabold leading-tight tracking-tight">
              <span className="bg-gradient-to-r from-brand-blue to-brand-green bg-clip-text text-transparent">
                HomeDome by VeaLive
              </span>
            </h1>
            <div className="mt-1">
              <DynamicUnderline watch="h1" align="left" widthClass="w-24" height={4} />
            </div>
            <p className="text-lg text-zinc-700 max-w-[68ch]">
              Our HomeDome is precisely engineered with{" "}
              <strong>geodesic dome calculations</strong>, offering strength,
              beauty, and unmatched resilience. Its round yet triangular surface
              delivers maximum interior space with panoramic views, while its
              form naturally resists earthquakes, tornados, heavy rain, and snow.
            </p>
            <div className="flex flex-wrap gap-3">
              <Link href="/contact" className="btn-primary">
                Talk to an expert
              </Link>
              <Link href="/ecommerce" className="btn-outline">
                Explore products
              </Link>
            </div>
          </Reveal>
          <Reveal className="relative rounded-card overflow-hidden card ring-1 ring-brand-blue/10">
            <Image
              src="/images/Dome House in Lush Landscape.png"
              alt="Smart Dome in lush landscape"
              width={1200}
              height={900}
              className="w-full h-auto object-cover"
              priority
            />
          </Reveal>
        </div>
      </section>
           {/* FEATURES */}
           <section className="py-16 relative">
        <div className="absolute inset-0 -z-10 bg-gradient-to-br from-brand-blue/[0.06] via-transparent to-brand-green/[0.06]" />
        <div className="mx-auto max-w-6xl px-4">
          <Reveal className="text-center mb-12">
            <span className="inline-flex items-center px-3 py-1 rounded-full bg-zinc-100 text-xs font-medium">
              Why it stands out
            </span>
            <h2 className="mt-2 text-3xl sm:text-4xl font-extrabold tracking-tight">
              <span className="bg-gradient-to-r from-brand-blue to-brand-green bg-clip-text text-transparent">
                Accuracy. Strength. Beauty.
              </span>
            </h2>
            <div className="mt-3">
              <DynamicUnderline
                watch="h2"
                align="center"
                widthClass="w-20"
                height={4}
              />
            </div>
            <p className="text-zinc-600 max-w-[72ch] mx-auto mt-2">
              Assembled and disassembled with ease, expandable in size, and
              offering panoramic views, the HomeDome blends{" "}
              <strong>structural efficiency</strong> with luxurious comfort.
            </p>
          </Reveal>

          <div className="grid md:grid-cols-4 gap-6">
            {[
              {
                Icon: Sun,
                label: "Eco & Efficient",
                desc: "Geometric dome form minimizes surface area, maximizing interior comfort and efficiency.",
              },
              {
                Icon: Wind,
                label: "Disaster-Proof",
                desc: "Resists earthquakes, tornados, heavy rain, and snow with unmatched stability.",
              },
              {
                Icon: Shield,
                label: "Durable Build",
                desc: "Powder-coated steel, hardwood subframes, and waterproof multi-layer panels.",
              },
              {
                Icon: Zap,
                label: "Flexible Sizes",
                desc: "From 25–80m² modules up to fully polycarbonated domes or zomes.",
              },
            ].map(({ Icon, label, desc }) => (
              <Reveal
                key={label}
                className="p-6 text-center rounded-card bg-white border border-zinc-100 shadow-soft card-hover"
              >
                <div className="w-12 h-12 rounded-xl bg-brand-green/10 text-brand-green flex items-center justify-center mx-auto mb-3">
                  <Icon className="w-6 h-6" aria-hidden />
                </div>
                <h3 className="text-lg font-bold">{label}</h3>
                <p className="text-sm text-zinc-600 mt-2">{desc}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

{/* WHY IT MATTERS + SPECS (Split Layout with Sticky Sidebar) */}
<section className="py-16" aria-labelledby="why-it-matters">
  <div className="mx-auto max-w-6xl px-4 grid md:grid-cols-3 gap-8 lg:gap-12 items-start">
    
    {/* LEFT: Rich text */}
    <Reveal className="md:sticky md:top-24 self-start md:col-span-2 space-y-6">
      <h2
        id="why-it-matters"
        className="text-2xl md:text-3xl font-extrabold tracking-tight"
      >
        Why it matters
      </h2>
      <span className="mt-3 block h-1 w-16 rounded-full bg-gradient-to-r from-brand-blue to-brand-green" />
      
      <p className="text-base md:text-lg leading-8 text-zinc-700/95 max-w-[68ch]">
        The dome’s <strong>geometric shape</strong> minimizes surface
        area, naturally regulating energy use while providing a spacious,
        luxurious interior. It can be{" "}
        <strong>assembled and disassembled easily</strong>, expanded with
        additional spaces, and adapted for rooftops, gardens, or remote
        plots.
      </p>

      <p className="text-zinc-700/95 text-base md:text-lg leading-7 md:leading-8 max-w-[68ch]">
        Pre-engineered, numbered panels click together with minimal
        disruption. High-performance insulation and gasketed seams create a
        tight envelope, while optional low-E glazing and smart shading
        deliver daylight without the heat. The result is a calm, stable
        interior year-round.
      </p>

      <p className="text-base md:text-lg leading-8 text-zinc-700/95 max-w-[68ch]">
        With powder-coated steel, hardwood finishes, and waterproof
        multi-layer shell options, HomeDome is both{" "}
        <strong>eco-friendly and disaster-proof</strong>. Options include
        glass panels for light, fiberglass shells, or fully polycarbonated
        structures.
      </p>
    </Reveal>

    {/* RIGHT: Sticky Specs */}
    <div className="space-y-6 md:sticky md:top-24 self-start">
      {/* SPECS SNAPSHOT */}
      <div className="relative p-6 rounded-2xl bg-gradient-to-br from-white to-zinc-50 border border-zinc-200 shadow-xl overflow-hidden">
        <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(circle_at_top_left,rgba(0,180,120,0.08),transparent_70%)]" />

        <h4 className="font-extrabold text-xl mb-4 tracking-tight text-brand-blue">
          Specs Snapshot
        </h4>

        {/* Pricing highlight */}
        <div className="mb-6 p-4 rounded-xl bg-zinc-100/60 text-center">
          <p className="text-sm uppercase tracking-wide text-zinc-500">
            Starting rate
          </p>
          <p className="text-3xl font-bold text-brand-green mt-1">
            $275{" "}
            <span className="text-base font-medium text-zinc-600">/sqm</span>
          </p>
        </div>

        {/* Grid of specs */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 text-sm">
          <div className="p-3 rounded-lg bg-white shadow-inner border border-zinc-100">
            <span className="block text-xs uppercase tracking-wide text-zinc-500">
              Size
            </span>
            <p className="font-semibold text-zinc-800">25–80 m² modules</p>
          </div>
          <div className="p-3 rounded-lg bg-white shadow-inner border border-zinc-100">
            <span className="block text-xs uppercase tracking-wide text-zinc-500">
              Poly Dome
            </span>
            <p className="font-semibold text-zinc-800">$2,000 / m diameter</p>
          </div>
          <div className="p-3 rounded-lg bg-white shadow-inner border border-zinc-100">
            <span className="block text-xs uppercase tracking-wide text-zinc-500">
              Poly Zome
            </span>
            <p className="font-semibold text-zinc-800">$2,500 / m diameter</p>
          </div>
          <div className="p-3 rounded-lg bg-white shadow-inner border border-zinc-100">
            <span className="block text-xs uppercase tracking-wide text-zinc-500">
              Frame
            </span>
            <p className="font-semibold text-zinc-800">
              Galvanized steel + hardwood
            </p>
          </div>
          <div className="p-3 rounded-lg bg-white shadow-inner border border-zinc-100">
            <span className="block text-xs uppercase tracking-wide text-zinc-500">
              Shell
            </span>
            <p className="font-semibold text-zinc-800">
              OSB multilayer / Fiberglass
            </p>
          </div>
          <div className="p-3 rounded-lg bg-white shadow-inner border border-zinc-100">
            <span className="block text-xs uppercase tracking-wide text-zinc-500">
              Glass
            </span>
            <p className="font-semibold text-zinc-800">
              Tempered laminated panels
            </p>
          </div>
        </div>
      </div>

      {/* CTA BOX */}
      <div className="p-6 rounded-2xl bg-gradient-to-br from-brand-blue/5 to-brand-green/5 border border-zinc-200 shadow-md">
        <h4 className="font-semibold text-lg mb-2">Get a Quote</h4>
        <p className="text-sm text-zinc-600">
          Tell us about your project and preferred size—our team will prepare a
          tailored cost plan.
        </p>
        <Link
          href="/contact"
          className="btn-primary mt-4 h-11 px-6 w-full text-center"
        >
          Contact Sales
        </Link>
      </div>
    </div>
  </div>
</section>



      {/* CONTACT + ADDRESS */}
      <section className="py-20 bg-zinc-50 relative">
        <div className="mx-auto max-w-6xl px-4 grid md:grid-cols-2 gap-12 items-center">
                  
          <Reveal className="relative rounded-card overflow-hidden ring-1 ring-brand-green/10 shadow-xl">
            <Image
              src="/images/homedome.jpeg"
              alt="Smart Dome contact showcase"
              width={1200}
              height={1600}
              className="object-cover w-full h-full"
              priority
            />
          </Reveal>
       
          <Reveal className="space-y-8">
            <div>
              <h2 className="text-2xl md:text-3xl font-extrabold tracking-tight">
                Get in Touch
              </h2>
              <DynamicUnderline
                watch="h2"
                align="left"
                widthClass="w-20"
                height={4}
              />
              <p className="mt-4 text-zinc-600 max-w-[50ch]">
                Reach out to us for consultations, quotes, or to explore how the 
                <strong> Smart Dome by VeaLive</strong> can be tailored to your 
                project. Our team is here to help every step of the way.
              </p>
            </div>

            <div className="space-y-6">
              <div className="flex items-start gap-3">
                <MapPin className="w-6 h-6 text-brand-green flex-shrink-0" />
                <p className="text-zinc-700">
                  Cielo Tower, Ground Floor Offices,
                  <br /> Facing Burj Al Murr, Beirut, Lebanon
                </p>
              </div>
              <div className="flex items-start gap-3">
                <Mail className="w-6 h-6 text-brand-green flex-shrink-0" />
                <a
                  href="mailto:nadim@homedome.live"
                  className="text-zinc-700 hover:text-brand-green"
                >
                  nadim@homedome.live
                </a>
              </div>
              <div className="flex items-start gap-3">
                <Phone className="w-6 h-6 text-brand-green flex-shrink-0" />
                <a
                  href="tel:+96176869419"
                  className="text-zinc-700 hover:text-brand-green"
                >
                  +961 76 869 419
                </a>
              </div>
            </div>

            {/* Social media */}
            <div className="flex gap-6 pt-4">
              <Link
                href="https://www.instagram.com/dome.construction.in.lebanon?igsh=MTg4OHlyMnpzM2w2dA=="
                className="hover:text-brand-green"
                aria-label="Instagram"
              >
                <Instagram className="w-7 h-7" />
              </Link>
              <Link
                href="https://www.facebook.com/profile.php?id=61560148773435&mibextid=ZbWKwL"
                className="hover:text-brand-green"
                aria-label="Facebook"
              >
                <Facebook className="w-7 h-7" />
              </Link>
              <Link
                href="https://www.tiktok.com/@geodesicdome1?_r=1&_d=da438klgm577h5&sec_uid=MS4wLjABAAAApAYFBNv_SAGqPUpu91VSk3Q2H0hVGTp5MHfPgxw_zf3-plZd36yymGVFbyl4S3xA&share_author_id=6790058697780560901&sharer_language=en&source=h5_m&u_code=daj82h514m5hga&timestamp=1716582669&user_id=6790058697780560901&sec_user_id=MS4wLjABAAAApAYFBNv_SAGqPUpu91VSk3Q2H0hVGTp5MHfPgxw_zf3-plZd36yymGVFbyl4S3xA&utm_source=copy&utm_campaign=client_share&utm_medium=android&share_iid=7370767340574918407&share_link_id=f441aed5-7a70-4283-a7ba-942ba5258a53&share_app_id=1233&ugbiz_name=ACCOUNT&ug_btm=b8727%2Cb0229&social_share_type=5&enable_checksum=1"
                className="hover:text-brand-green"
                aria-label="TikTok"
              >
                <FaTiktok className="w-6 h-7" />
              </Link>
            </div>
          </Reveal>


        </div>
      </section>


      {/* TRUST + CTA */}
      <CTA />
      <TrustSignals />
    </div>
  );
}
