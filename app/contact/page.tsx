// app/contact/page.tsx
import type { Metadata } from "next";
import SEOJsonLd from "@/components/SEOJsonLd";
import { SITE } from "@/lib/site";

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
  twitter: { card: "summary_large_image", site: "@vealive360" }
};

export default function Page() {
  return (
    <div className="w-full overflow-x-clip">
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
      <section className="mt-10 mb-12 relative">
        <div className="absolute inset-0 -z-10 gradient-multi opacity-5" />
        <div className="mx-auto max-w-6xl px-4 text-center">
          <span className="inline-flex items-center px-3 py-1 rounded-full bg-zinc-100 text-xs font-medium">
            Free consultation
          </span>
          <h1 className="mt-2 text-4xl md:text-5xl font-extrabold leading-tight tracking-tight">
            <span className="bg-gradient-to-r from-brand-blue to-brand-green bg-clip-text text-transparent">
              Tell us about your space
            </span>
          </h1>
          <p className="mt-3 text-zinc-700 max-w-2xl mx-auto">
            We’ll recommend a tailored plan for comfort, wellness, and simplicity—at home or work.
          </p>
          <span className="mt-4 mx-auto block h-1 w-20 rounded-full bg-gradient-to-r from-brand-blue to-brand-green" />
        </div>
      </section>

      {/* FORM */}
      <section className="pb-16">
        <form
          className="mx-auto max-w-3xl px-4 p-6 md:p-8 rounded-card bg-white border border-zinc-100 shadow-soft space-y-6"
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
            <h2 id="contact-heading" className="sr-only">Contact form</h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label htmlFor="name" className="block text-sm font-medium mb-1">Full name</label>
                <input
                  id="name"
                  name="name"
                  required
                  autoComplete="name"
                  className="w-full rounded-xl border border-zinc-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-brand-blue"
                />
              </div>
              <div>
                <label htmlFor="phone" className="block text-sm font-medium mb-1">Phone</label>
                <input
                  id="phone"
                  name="phone"
                  autoComplete="tel"
                  inputMode="tel"
                  className="w-full rounded-xl border border-zinc-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-brand-blue"
                />
              </div>
              <div>
                <label htmlFor="email" className="block text-sm font-medium mb-1">Email</label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  required
                  autoComplete="email"
                  className="w-full rounded-xl border border-zinc-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-brand-blue"
                />
              </div>
              <div>
                <label htmlFor="city" className="block text-sm font-medium mb-1">City</label>
                <input
                  id="city"
                  name="city"
                  defaultValue="Beirut"
                  autoComplete="address-level2"
                  className="w-full rounded-xl border border-zinc-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-brand-blue"
                />
              </div>
            </div>
          </div>

          {/* Project */}
          <div className="space-y-2">
            <div className="inline-flex items-center px-3 py-1 rounded-full bg-zinc-100 text-xs font-medium">
              Project
            </div>

            {/* Project type */}
            <div>
              <label className="block text-sm font-medium mb-2">Project type</label>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                {["Home", "Office/Clinic", "Retail", "Renovation", "New build", "Smart Dome"].map((v) => (
                  <label key={v} className="inline-flex items-center gap-2">
                    <input type="radio" name="project_type" value={v} className="peer sr-only" />
                    <span className="w-full text-sm border border-zinc-300 rounded-full px-3 py-2 peer-checked:border-brand-blue peer-checked:bg-brand-blue/10 peer-checked:text-brand-blue">
                      {v}
                    </span>
                  </label>
                ))}
              </div>
            </div>

            {/* Solutions of interest */}
            <div>
              <label className="block text-sm font-medium mb-2">Which solutions are you interested in?</label>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 text-sm">
                {[
                  "Lighting",
                  "Climate",
                  "Security",
                  "Energy",
                  "Studio",
                  "Utility",
                  "Smart Dome",
                ].map((s) => (
                  <label key={s} className="inline-flex items-center gap-2">
                    <input type="checkbox" name="solutions" value={s} className="peer sr-only" />
                    <span className="w-full border border-zinc-300 rounded-full px-3 py-2 peer-checked:border-brand-blue peer-checked:bg-brand-blue/10 peer-checked:text-brand-blue">
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
                {["DIY Open-Source","Apple Home", "Google Home", "Amazon Alexa", "SmartThings"].map((p) => (
                  <label key={p} className="inline-flex items-center gap-2">
                    <input type="checkbox" name="platform" value={p} className="peer sr-only" />
                    <span className="w-full text-sm border border-zinc-300 rounded-full px-3 py-2 peer-checked:border-brand-green peer-checked:bg-brand-green/10 peer-checked:text-brand-green">
                      {p}
                    </span>
                  </label>
                ))}
              </div>
            </div>

            {/* Budget & Timeline */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label htmlFor="budget" className="block text-sm font-medium mb-1">Estimated budget</label>
                <select
                  id="budget"
                  name="budget"
                  className="w-full rounded-xl border border-zinc-300 px-3 py-2 bg-white focus:outline-none focus:ring-2 focus:ring-brand-blue"
                >
                  <option value="">Select…</option>
                  <option>Under $1,000</option>
                  <option>$1,000–$3,000</option>
                  <option>$3,000–$7,500</option>
                  <option>$7,500+</option>
                </select>
              </div>
              <div>
                <label htmlFor="timeline" className="block text-sm font-medium mb-1">Timeline</label>
                <select
                  id="timeline"
                  name="timeline"
                  className="w-full rounded-xl border border-zinc-300 px-3 py-2 bg-white focus:outline-none focus:ring-2 focus:ring-brand-blue"
                >
                  <option value="">Select…</option>
                  <option>ASAP (0–2 weeks)</option>
                  <option>Soon (1–2 months)</option>
                  <option>Later (3–6 months)</option>
                  <option>Exploring / no date</option>
                </select>
              </div>
            </div>
          </div>

          {/* Message */}
          <div className="space-y-2">
            <div className="inline-flex items-center px-3 py-1 rounded-full bg-zinc-100 text-xs font-medium">
              Message
            </div>
            <label htmlFor="message" className="sr-only">Message</label>
            <textarea
              id="message"
              name="message"
              rows={6}
              className="w-full rounded-xl border border-zinc-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-brand-blue"
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
              className="px-5 py-3 rounded-full bg-brand-blue text-white font-semibold"
            >
              Send request
            </button>
            <a
              href="https://wa.me/96181632241"
              target="_blank"
              rel="noreferrer"
              className="px-5 py-3 rounded-full border border-zinc-300 hover:border-brand-blue font-semibold"
            >
              Chat on WhatsApp
            </a>
            <span className="text-xs text-zinc-500 sm:ml-auto">
              We’ll reply within 1–2 business days.
            </span>
          </div>
        </form>

        <div className="mt-6 text-center text-sm text-zinc-600 px-4">
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
