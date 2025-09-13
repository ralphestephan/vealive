// app/contact/page.tsx
import type { Metadata } from "next";
import SEOJsonLd from "@/components/SEOJsonLd";
import { SITE } from "@/lib/site";
import DynamicUnderline from "@/components/ui/DynamicUnderline";
import { MessageCircle, Mail, Phone, Clock } from "lucide-react";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Contact VeaLive360 — Free Smart Home Consultation in Lebanon",
  description:
    "Book a free consultation with VeaLive360 to explore lighting, climate, security, entertainment, energy, studio and Smart Dome automation tailored to your space.",
  alternates: { canonical: "/contact" },
  openGraph: {
    title: "Contact VeaLive360",
    description:
      "Tell us about your space—get a tailored smart home plan for comfort, wellness, and simplicity.",
    url: `${SITE.baseUrl}/contact`,
    images: [{ url: SITE.ogImage }],
  },
  twitter: { card: "summary_large_image", site: "@vealive360" },
};

export default function Page() {
  return (
    <div className="w-full overflow-x-clip relative">
      {/* Full-page background */}
      <div className="absolute inset-0 -z-10 gradient-multi opacity-5" />

      {/* JSON-LD: ContactPage + contactPoint */}
      <SEOJsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "ContactPage",
          name: "VeaLive360 Consultation",
          url: `${SITE.baseUrl}/contact`,
          about: "Free smart home consultation in Lebanon (Beirut and beyond).",
          mainEntityOfPage: `${SITE.baseUrl}/contact`,
          publisher: {
            "@type": "Organization",
            name: SITE.org.legalName,
            url: SITE.org.url,
            logo: SITE.org.logo,
            sameAs: SITE.org.sameAs,
            contactPoint: [
              {
                "@type": "ContactPoint",
                telephone: SITE.contact.phone,
                contactType: "sales",
                areaServed: "LB",
                availableLanguage: ["en", "ar", "fr"],
              },
            ],
          },
        }}
      />

      {/* HERO */}
      <section id="contact-hero" className="mt-0.3 mb-12 relative">

        <div className="mx-auto max-w-6xl px-4 text-center">
          <span className="inline-flex items-center px-3 py-1 rounded-full bg-zinc-100 text-xs font-medium">
            Free consultation
          </span>
          <h1 className="mt-2 text-4xl md:text-5xl font-extrabold leading-tight tracking-tight">
            <span className="bg-gradient-to-r from-brand-blue to-brand-green bg-clip-text text-transparent">
              Tell us about your space
            </span>
          </h1>

          {/* Dynamic underline (centered) */}
          <div className="mt-3">
            <DynamicUnderline watch="#contact-hero" align="center" widthClass="w-20" height={4} />
          </div>

          <p className="mt-3 text-zinc-700 max-w-2xl mx-auto">
            We’ll recommend a tailored plan for comfort, wellness, and simplicity—at home or work.
          </p>
        </div>
      </section>

      {/* CONTENT */}
      <section className="pb-16">
        <div className="mx-auto max-w-6xl px-4 grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* LEFT: Quick channels & info */}
          <aside className="space-y-6 lg:sticky lg:top-20 h-fit">
            <div id="quick-ways" className="p-6 rounded-card bg-white border border-zinc-100 shadow-soft">
              <h2 className="text-xl font-bold">Quick ways to reach us</h2>
              <div className="mt-2">
                <DynamicUnderline watch="#quick-ways" align="left" widthClass="w-20" height={4} />
              </div>

              <div className="mt-4 grid gap-3">
                {/* WhatsApp */}
                <a
                  href="https://wa.me/96181632241?text=Hello%20VeaLive%20%F0%9F%91%8B"
                  target="_blank"
                  rel="noreferrer"
                  className="
                    group flex items-center gap-3 p-3 rounded-xl border border-zinc-200 bg-white
                    hover:border-brand-green hover:bg-brand-green/5 transition-all
                  "
                >
                  <span className="w-9 h-9 rounded-lg bg-brand-green/10 text-brand-green inline-grid place-items-center">
                    <MessageCircle className="w-4 h-4" aria-hidden />
                  </span>
                  <div className="min-w-0">
                    <div className="font-semibold">WhatsApp</div>
                    <div className="text-xs text-zinc-600 truncate">+961 81 632 241</div>
                  </div>
                  <span className="ml-auto text-xs font-semibold text-brand-green opacity-0 group-hover:opacity-100 transition">
                    Open
                  </span>
                </a>

                {/* Email */}
                <a
                  href="mailto:sales@vealive360.com"
                  className="
                    group flex items-center gap-3 p-3 rounded-xl border border-zinc-200 bg-white
                    hover:border-brand-blue hover:bg-brand-blue/5 transition-all
                  "
                >
                  <span className="w-9 h-9 rounded-lg bg-brand-blue/10 text-brand-blue inline-grid place-items-center">
                    <Mail className="w-4 h-4" aria-hidden />
                  </span>
                  <div className="min-w-0">
                    <div className="font-semibold">Email</div>
                    <div className="text-xs text-zinc-600 truncate">sales@vealive360.com</div>
                  </div>
                  <span className="ml-auto text-xs font-semibold text-brand-blue opacity-0 group-hover:opacity-100 transition">
                    Compose
                  </span>
                </a>

                {/* Phone */}
                <a
                  href="tel:+96181632241"
                  className="
                    group flex items-center gap-3 p-3 rounded-xl border border-zinc-200 bg-white
                    hover:border-brand-blue hover:bg-brand-blue/5 transition-all
                  "
                >
                  <span className="w-9 h-9 rounded-lg bg-zinc-100 text-zinc-800 inline-grid place-items-center">
                    <Phone className="w-4 h-4" aria-hidden />
                  </span>
                  <div className="min-w-0">
                    <div className="font-semibold">Call</div>
                    <div className="text-xs text-zinc-600 truncate">+961 81 632 241</div>
                  </div>
                  <span className="ml-auto text-xs font-semibold text-brand-blue opacity-0 group-hover:opacity-100 transition">
                    Dial
                  </span>
                </a>
              </div>

              <div className="mt-4 flex items-start gap-2 text-sm text-zinc-600">
                <Clock className="w-4 h-4 mt-0.5 text-zinc-500" aria-hidden />
                <div>
                  <div><strong>Response time:</strong> usually same day</div>
                  <div className="text-xs">Hours: Mon–Sat, 9:00–18:00 (Asia/Beirut)</div>
                </div>
              </div>
            </div>

            {/* FAQ teaser */}
            <div id="faq-teaser" className="p-6 rounded-card bg-white border border-zinc-100 shadow-soft">
              <h2 className="text-lg font-bold">Have a quick question?</h2>
              <div className="mt-2">
                <DynamicUnderline watch="#faq-teaser" align="left" widthClass="w-16" height={4} />
              </div>
              <p className="mt-2 text-sm text-zinc-600">
                Check common answers about compatibility, install, privacy, and support.
              </p>
              <Link
                href="/faqs"
                className="
                  mt-3 inline-flex items-center justify-center px-4 h-9 rounded-full
                  border border-zinc-300 hover:border-brand-blue hover:text-brand-blue
                  transition-all text-sm font-semibold
                "
              >
                View FAQs
              </Link>
            </div>
          </aside>

          {/* RIGHT: Form */}
          <div className="lg:col-span-2">
            <section id="contact-form" className="p-6 md:p-8 rounded-card bg-white border border-zinc-100 shadow-soft">
              <h2 className="text-2xl font-bold">Send a request</h2>
              <div className="mt-2">
                <DynamicUnderline watch="#contact-form" align="left" widthClass="w-20" height={4} />
              </div>

              <form
                className="mt-6 space-y-6"
                action="mailto:sales@vealive360.com"
                method="post"
                encType="text/plain"
                aria-labelledby="contact-heading"
              >
                {/* Honeypot (spam trap) */}
                <input type="text" name="hp" tabIndex={-1} autoComplete="off" className="hidden" aria-hidden="true" />

                {/* Your details */}
                <div className="space-y-2">
                  <div className="inline-flex items-center px-3 py-1 rounded-full bg-zinc-100 text-xs font-medium">
                    Your details
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="name" className="block text-sm font-medium mb-1">
                        Full name
                      </label>
                      <input
                        id="name"
                        name="name"
                        required
                        autoComplete="name"
                        className="w-full rounded-xl border border-zinc-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-brand-blue transition-shadow"
                      />
                    </div>
                    <div>
                      <label htmlFor="phone" className="block text-sm font-medium mb-1">
                        Phone (optional)
                      </label>
                      <input
                        id="phone"
                        name="phone"
                        autoComplete="tel"
                        inputMode="tel"
                        className="w-full rounded-xl border border-zinc-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-brand-blue transition-shadow"
                      />
                    </div>
                    <div>
                      <label htmlFor="email" className="block text-sm font-medium mb-1">
                        Email
                      </label>
                      <input
                        id="email"
                        name="email"
                        type="email"
                        required
                        autoComplete="email"
                        className="w-full rounded-xl border border-zinc-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-brand-blue transition-shadow"
                      />
                    </div>
                    <div>
                      <label htmlFor="city" className="block text-sm font-medium mb-1">
                        City
                      </label>
                      <input
                        id="city"
                        name="city"
                        defaultValue="Beirut"
                        autoComplete="address-level2"
                        className="w-full rounded-xl border border-zinc-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-brand-blue transition-shadow"
                      />
                    </div>
                  </div>
                </div>

                {/* Project */}
                <div className="space-y-2">
                  <div className="inline-flex items-center px-3 py-1 rounded-full bg-zinc-100 text-xs font-medium">
                    Project
                  </div>

                  {/* Reason */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="reason" className="block text-sm font-medium mb-1">
                        I’m looking for
                      </label>
                      <select
                        id="reason"
                        name="reason"
                        className="w-full rounded-xl border border-zinc-300 px-3 py-2 bg-white focus:outline-none focus:ring-2 focus:ring-brand-blue transition-shadow"
                      >
                        <option value="">Select…</option>
                        <option>New smart setup</option>
                        <option>Upgrade existing system</option>
                        <option>Troubleshooting / support</option>
                        <option>Smart Dome</option>
                      </select>
                    </div>

                    <div>
                      <label htmlFor="budget" className="block text-sm font-medium mb-1">
                        Estimated budget
                      </label>
                      <select
                        id="budget"
                        name="budget"
                        className="w-full rounded-xl border border-zinc-300 px-3 py-2 bg-white focus:outline-none focus:ring-2 focus:ring-brand-blue transition-shadow"
                      >
                        <option value="">Select…</option>
                        <option>Under $1,000</option>
                        <option>$1,000–$3,000</option>
                        <option>$3,000–$7,500</option>
                        <option>$7,500+</option>
                      </select>
                    </div>
                  </div>

                  {/* Solutions of interest */}
                  <div>
                    <label className="block text-sm font-medium mb-2">Solutions of interest</label>
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 text-sm">
                      {["Lighting", "Climate", "Security", "Energy", "Entertainment", "Device Tailoring", "Utility", "Smart Dome"].map((s) => (
                        <label key={s} className="inline-flex items-center gap-2">
                          <input type="checkbox" name="solutions" value={s} className="peer sr-only" />
                          <span
                            className="
                              w-full border border-zinc-300 rounded-full px-3 py-2
                              peer-checked:border-brand-blue peer-checked:bg-brand-blue/10 peer-checked:text-brand-blue
                              transition-colors
                            "
                          >
                            {s}
                          </span>
                        </label>
                      ))}
                    </div>
                  </div>

                  {/* Preferred ecosystem */}
                  <div>
                    <label className="block text-sm font-medium mb-2">Preferred ecosystem (optional)</label>
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                      {["DIY Open-Source", "Apple Home", "Google Home", "Amazon Alexa", "SmartThings"].map((p) => (
                        <label key={p} className="inline-flex items-center gap-2">
                          <input type="checkbox" name="platform" value={p} className="peer sr-only" />
                          <span
                            className="
                              w-full text-sm border border-zinc-300 rounded-full px-3 py-2
                              peer-checked:border-brand-green peer-checked:bg-brand-green/10 peer-checked:text-brand-green
                              transition-colors
                            "
                          >
                            {p}
                          </span>
                        </label>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Message */}
                <div className="space-y-2">
                  <div className="inline-flex items-center px-3 py-1 rounded-full bg-zinc-100 text-xs font-medium">
                    Message
                  </div>
                  <label htmlFor="message" className="sr-only">
                    Message
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    rows={6}
                    className="w-full rounded-xl border border-zinc-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-brand-blue transition-shadow"
                    placeholder="Tell us about your rooms, devices, preferred brands, or Smart Dome site (rooftop, garden, plot)…"
                  />
                    <label className="mt-2 inline-flex items-center gap-2 text-sm">
                      <input type="checkbox" name="contact_pref" value="WhatsApp" />
                      Prefer WhatsApp follow-up
                    </label>
                </div>

                {/* Actions */}
                <div className="flex flex-col sm:flex-row gap-3 sm:items-center">
                  <button
                    type="submit"
                    className="
                      relative px-5 py-3 rounded-full bg-brand-blue text-white font-semibold
                      transition-all duration-200
                      hover:shadow-lg hover:brightness-110 active:scale-[0.98]
                      focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-blue/60
                    "
                  >
                    Send request
                  </button>
                  <a
                    href="https://wa.me/96181632241?text=Hello%20VeaLive%20%F0%9F%91%8B"
                    target="_blank"
                    rel="noreferrer"
                    className="
                      px-5 py-3 rounded-full border border-zinc-300 font-semibold
                      transition-all duration-200
                      hover:border-brand-green hover:text-brand-green hover:shadow
                      active:scale-[0.98]
                      focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-green/40
                    "
                  >
                    Chat on WhatsApp
                  </a>
                  <span className="text-xs text-zinc-500 sm:ml-auto">We’ll reply within 1–2 business days.</span>
                </div>

                {/* Privacy note */}
                <p className="text-xs text-zinc-500">
                  By submitting, you agree to our{" "}
                  <Link href="/privacy" className="underline hover:text-brand-blue">
                    Privacy Policy
                  </Link>
                  .
                </p>
              </form>
            </section>
          </div>
        </div>

        {/* Email fallback */}
        <div className="mt-8 text-center text-sm text-zinc-600 px-4">
          Prefer email? Write to{" "}
          <a className="text-brand-blue font-semibold" href="mailto:sales@vealive360.com">
            sales@vealive360.com
          </a>
          .
        </div>
        
      </section>
      
    </div>
  );
}
