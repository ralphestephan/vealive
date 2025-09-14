// app/contact/page.tsx
"use client"
import SEOJsonLd from "@/components/SEOJsonLd";
import { SITE } from "@/lib/site";
import DynamicUnderline from "@/components/ui/DynamicUnderline";
import { MessageCircle, Mail, Phone, Clock } from "lucide-react";
import Link from "next/link";
import { useState } from "react";


export default function Page() {
  const [status, setStatus] = useState<"idle" | "loading" | "ok" | "err">("idle");
  const [msg, setMsg] = useState("");
  
  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
  
    setStatus("loading");
    setMsg("");
  
    // ✅ capture the form element BEFORE any await
    const formEl = e.currentTarget;
  
    // build the payload (handles multi-value checkboxes)
    const fd = new FormData(formEl);
    const data: Record<string, any> = {};
    fd.forEach((val, key) => {
      if (key in data) {
        data[key] = Array.isArray(data[key]) ? [...data[key], val] : [data[key], val];
      } else {
        data[key] = val;
      }
    });
  
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
  
      console.log("📡 /api/contact -> status:", res.status, "ok:", res.ok);
  
      // ❌ Only parse JSON if we're actually in an error state
      if (!res.ok) {
        let errJson: any = {};
        try {
          errJson = await res.json();
        } catch (parseErr) {
          console.warn("⚠️ could not parse error JSON:", parseErr);
        }
        throw new Error(errJson?.error || `Request failed with ${res.status}`);
      }
  
      // ✅ Success path — do NOT parse JSON again
      setStatus("ok");
      setMsg("✅ Your request was sent successfully! We’ll get back to you soon.");
  
      // ✅ use the captured form element; don't touch e.currentTarget after awaits
      formEl.reset();
  
      return; // stop here; don't fall through
    } catch (err) {
      console.error("❌ Contact form error (frontend):", err);
      setStatus("err");
      setMsg("❌ Something went wrong. Please try again.");
    }
  }
  
  
  
  

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

          <div className="mt-3">
            <DynamicUnderline
              watch="#contact-hero"
              align="center"
              widthClass="w-20"
              height={4}
            />
          </div>

          <p className="mt-3 text-zinc-700 max-w-2xl mx-auto">
            We’ll recommend a tailored plan for comfort, wellness, and simplicity—at
            home or work.
          </p>
        </div>
      </section>

      {/* CONTENT */}
      <section className="pb-16">
        <div className="mx-auto max-w-6xl px-4 grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* LEFT: Quick channels & info */}
          <aside className="space-y-6 lg:sticky lg:top-20 h-fit">
            <div
              id="quick-ways"
              className="p-6 rounded-card bg-white border border-zinc-100 shadow-soft"
            >
              <h2 className="text-xl font-bold">Quick ways to reach us</h2>
              <div className="mt-2">
                <DynamicUnderline
                  watch="#quick-ways"
                  align="left"
                  widthClass="w-20"
                  height={4}
                />
              </div>

              <div className="mt-4 grid gap-3">
                <a
                  href="https://wa.me/96181632241?text=Hello%20VeaLive%20%F0%9F%91%8B"
                  target="_blank"
                  rel="noreferrer"
                  className="group flex items-center gap-3 p-3 rounded-xl border border-zinc-200 bg-white hover:border-brand-green hover:bg-brand-green/5 transition-all"
                >
                  <span className="w-9 h-9 rounded-lg bg-brand-green/10 text-brand-green inline-grid place-items-center">
                    <MessageCircle className="w-4 h-4" aria-hidden />
                  </span>
                  <div className="min-w-0">
                    <div className="font-semibold">WhatsApp</div>
                    <div className="text-xs text-zinc-600 truncate">
                      +961 81 632 241
                    </div>
                  </div>
                </a>

                <a
                  href="mailto:info@vealive360.com"
                  className="group flex items-center gap-3 p-3 rounded-xl border border-zinc-200 bg-white hover:border-brand-blue hover:bg-brand-blue/5 transition-all"
                >
                  <span className="w-9 h-9 rounded-lg bg-brand-blue/10 text-brand-blue inline-grid place-items-center">
                    <Mail className="w-4 h-4" aria-hidden />
                  </span>
                  <div className="min-w-0">
                    <div className="font-semibold">Email</div>
                    <div className="text-xs text-zinc-600 truncate">
                      info@vealive360.com
                    </div>
                  </div>
                </a>

                <a
                  href="tel:+96181632241"
                  className="group flex items-center gap-3 p-3 rounded-xl border border-zinc-200 bg-white hover:border-brand-blue hover:bg-brand-blue/5 transition-all"
                >
                  <span className="w-9 h-9 rounded-lg bg-zinc-100 text-zinc-800 inline-grid place-items-center">
                    <Phone className="w-4 h-4" aria-hidden />
                  </span>
                  <div className="min-w-0">
                    <div className="font-semibold">Call</div>
                    <div className="text-xs text-zinc-600 truncate">
                      +961 81 632 241
                    </div>
                  </div>
                </a>
              </div>

              <div className="mt-4 flex items-start gap-2 text-sm text-zinc-600">
                <Clock className="w-4 h-4 mt-0.5 text-zinc-500" aria-hidden />
                <div>
                  <div>
                    <strong>Response time:</strong> usually same day
                  </div>
                  <div className="text-xs">
                    Hours: Mon–Sat, 9:00–18:00 (Asia/Beirut)
                  </div>
                </div>
              </div>
            </div>
          </aside>

          {/* RIGHT: Form */}
          <div className="lg:col-span-2">
            <section
              id="contact-form"
              className="p-6 md:p-8 rounded-card bg-white border border-zinc-100 shadow-soft"
            >
              <h2 className="text-2xl font-bold">Send a request</h2>
              <div className="mt-2">
                <DynamicUnderline
                  watch="#contact-form"
                  align="left"
                  widthClass="w-20"
                  height={4}
                />
              </div>

              <form className="mt-6 space-y-6" onSubmit={handleSubmit}>
                {/* Honeypot */}
                <input
                  type="text"
                  name="hp"
                  tabIndex={-1}
                  autoComplete="off"
                  className="hidden"
                  aria-hidden="true"
                />

                {/* Details */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-1">Full name</label>
                    <input
                      name="name"
                      required
                      autoComplete="name"
                      className="w-full rounded-xl border border-zinc-300 px-3 py-2 focus:ring-2 focus:ring-brand-blue"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1">Phone</label>
                    <input
                      name="phone"
                      autoComplete="tel"
                      className="w-full rounded-xl border border-zinc-300 px-3 py-2 focus:ring-2 focus:ring-brand-blue"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1">Email</label>
                    <input
                      type="email"
                      name="email"
                      required
                      autoComplete="email"
                      className="w-full rounded-xl border border-zinc-300 px-3 py-2 focus:ring-2 focus:ring-brand-blue"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1">City</label>
                    <input
                      name="city"
                      defaultValue="Beirut"
                      autoComplete="address-level2"
                      className="w-full rounded-xl border border-zinc-300 px-3 py-2 focus:ring-2 focus:ring-brand-blue"
                    />
                  </div>
                </div>

                {/* Project */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-1">I’m looking for</label>
                    <select name="reason" className="w-full rounded-xl border px-3 py-2">
                      <option value="">Select…</option>
                      <option>New smart setup</option>
                      <option>Upgrade existing system</option>
                      <option>Troubleshooting / support</option>
                      <option>Smart Dome</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1">Estimated budget</label>
                    <select name="budget" className="w-full rounded-xl border px-3 py-2">
                      <option value="">Select…</option>
                      <option>Under $1,000</option>
                      <option>$1,000–$3,000</option>
                      <option>$3,000–$7,500</option>
                      <option>$7,500+</option>
                    </select>
                  </div>
                </div>

                {/* Solutions */}
                <div>
                  <label className="block text-sm font-medium mb-2">Solutions of interest</label>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 text-sm">
                    {[
                      "Lighting",
                      "Climate",
                      "Security",
                      "Energy",
                      "Entertainment",
                      "Device Tailoring",
                      "Utility",
                      "Smart Dome",
                    ].map((s) => (
                      <label key={s} className="inline-flex items-center gap-2">
                        <input type="checkbox" name="solutions" value={s} className="sr-only peer" />
                        <span className="w-full border rounded-full px-3 py-2 peer-checked:border-brand-blue peer-checked:bg-brand-blue/10 peer-checked:text-brand-blue">
                          {s}
                        </span>
                      </label>
                    ))}
                  </div>
                </div>

                {/* Ecosystem */}
                <div>
                  <label className="block text-sm font-medium mb-2">Preferred ecosystem</label>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                    {[
                      "DIY Open-Source",
                      "Apple Home",
                      "Google Home",
                      "Amazon Alexa",
                      "SmartThings",
                    ].map((p) => (
                      <label key={p} className="inline-flex items-center gap-2">
                        <input type="checkbox" name="platform" value={p} className="sr-only peer" />
                        <span className="w-full border rounded-full px-3 py-2 peer-checked:border-brand-green peer-checked:bg-brand-green/10 peer-checked:text-brand-green text-sm">
                          {p}
                        </span>
                      </label>
                    ))}
                  </div>
                </div>

                {/* Message */}
                <div>
                  <textarea
                    name="message"
                    rows={6}
                    placeholder="Tell us about your rooms, devices, brands, or Smart Dome site…"
                    className="w-full rounded-xl border px-3 py-2 focus:ring-2 focus:ring-brand-blue"
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
                    disabled={status === "loading"}
                    className="px-5 py-3 rounded-full bg-brand-blue text-white font-semibold hover:brightness-110 disabled:opacity-60"
                  >
                    {status === "loading" ? "Sending…" : "Send request"}
                  </button>
                  <a
                    href="https://wa.me/96181632241?text=Hello%20VeaLive%20%F0%9F%91%8B"
                    target="_blank"
                    rel="noreferrer"
                    className="px-5 py-3 rounded-full border font-semibold hover:border-brand-green hover:text-brand-green"
                  >
                    Chat on WhatsApp
                  </a>
                  <span className="text-xs text-zinc-500 sm:ml-auto">
                    We’ll reply within 1–2 business days.
                  </span>
                </div>

                {status !== "idle" && (
  <div
    className={`mt-3 px-4 py-2 rounded-lg text-sm font-medium ${
      status === "ok"
        ? "bg-green-50 text-green-700 border border-green-200"
        : status === "err"
        ? "bg-red-50 text-red-700 border border-red-200"
        : "text-zinc-500"
    }`}
  >
    {msg}
  </div>
)}


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

        <div className="mt-8 text-center text-sm text-zinc-600 px-4">
          Prefer email? Write to{" "}
          <a className="text-brand-blue font-semibold" href="mailto:info@vealive360.com">
            info@vealive360.com
          </a>
          .
        </div>
      </section>
    </div>
  );
}
