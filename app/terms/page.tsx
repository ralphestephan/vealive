// app/terms/page.tsx
import type { Metadata } from "next";

export const metadata: Metadata = { title: "Terms of Service" };

export default function TermsPage() {
  const effective = "August 30, 2025";

  const toc = [
    ["Overview", "overview"],
    ["Eligibility & Accounts", "eligibility"],
    ["Orders, Pricing & Payments", "orders"],
    ["Shipping, Delivery & Installation", "shipping"],
    ["Consultations & Site Visits", "consultations"],
    ["Smart Dome by Metalife", "smart-dome"],
    ["Third-Party Services", "third-party"],
    ["Returns & Refunds", "returns"],
    ["Warranties & Disclaimers", "warranties"],
    ["Limitation of Liability", "liability"],
    ["Indemnification", "indemnity"],
    ["Acceptable Use & IP", "acceptable-use"],
    ["Termination", "termination"],
    ["Governing Law", "law"],
    ["Changes to Terms", "changes"],
    ["Contact", "contact"],
  ] as const;

  return (
    <main className="w-full overflow-x-clip">
      {/* HERO */}
      <section className="mt-10 mb-12 relative">
        <div className="absolute inset-0 -z-10 gradient-multi opacity-5" />
        <div className="mx-auto max-w-6xl px-4 text-center">
          <span className="inline-flex items-center px-3 py-1 rounded-full bg-zinc-100 text-xs font-medium">
            Legal
          </span>
          <h1 className="mt-2 text-4xl md:text-5xl font-extrabold leading-tight tracking-tight">
            <span className="bg-gradient-to-r from-brand-blue to-brand-green bg-clip-text text-transparent">
              Terms of Service
            </span>
          </h1>
          <p className="mt-3 text-zinc-700 max-w-2xl mx-auto">
            The rules for using VeaLive360’s website, products, and services.
          </p>
          <span className="mt-2 block text-xs text-zinc-500">Effective: {effective}</span>
          <span className="mt-4 mx-auto block h-1 w-20 rounded-full bg-gradient-to-r from-brand-blue to-brand-green" />
        </div>
      </section>

      {/* BODY */}
      <section className="pb-16">
        <div className="mx-auto max-w-6xl px-4 grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* TOC */}
          <aside className="space-y-4 lg:sticky lg:top-20 h-fit">
            <nav className="p-5 rounded-card bg-white border border-zinc-100 shadow-soft">
              <h2 className="text-sm font-semibold mb-3">On this page</h2>
              <ul className="space-y-2 text-sm">
                {toc.map(([label, id]) => (
                  <li key={id}>
                    <a href={`#${id}`} className="text-zinc-700 hover:text-brand-blue">
                      {label}
                    </a>
                  </li>
                ))}
              </ul>
            </nav>
          </aside>

          {/* CONTENT */}
          <div className="lg:col-span-3 space-y-6">
            <section id="overview" className="p-6 md:p-8 rounded-card bg-white border border-zinc-100 shadow-soft scroll-mt-24">
              <h2 className="text-2xl font-bold mb-2">Overview</h2>
              <p className="text-zinc-700">
                These Terms form a binding agreement between you and VeaLive360 (“we”, “us”, “our”). By using our
                site or services (including consultations, installations, support plans, and products like Smart Dome by
                Metalife), you agree to these Terms.
              </p>
            </section>

            <section id="eligibility" className="p-6 md:p-8 rounded-card bg-white border border-zinc-100 shadow-soft scroll-mt-24">
              <h2 className="text-2xl font-bold mb-2">Eligibility & Accounts</h2>
              <ul className="list-disc pl-5 space-y-1 text-zinc-700">
                <li>You must be capable of entering a contract in your jurisdiction.</li>
                <li>You’re responsible for your account credentials and for all activity under your account.</li>
              </ul>
            </section>

            <section id="orders" className="p-6 md:p-8 rounded-card bg-white border border-zinc-100 shadow-soft scroll-mt-24">
              <h2 className="text-2xl font-bold mb-2">Orders, Pricing & Payments</h2>
              <ul className="list-disc pl-5 space-y-1 text-zinc-700">
                <li>Prices, availability, and specifications may change without notice.</li>
                <li>We may cancel or refuse orders (e.g., for suspected fraud or errors); any paid amounts will be refunded.</li>
                <li>Taxes, duties, and delivery/installation fees may apply based on your location and project scope.</li>
              </ul>
            </section>

            <section id="shipping" className="p-6 md:p-8 rounded-card bg-white border border-zinc-100 shadow-soft scroll-mt-24">
              <h2 className="text-2xl font-bold mb-2">Shipping, Delivery & Installation</h2>
              <ul className="list-disc pl-5 space-y-1 text-zinc-700">
                <li>Estimated dates are not guaranteed; delays can occur (supply, customs, site readiness).</li>
                <li>Installation requires site access, power, and connectivity; you’re responsible for permits unless agreed otherwise.</li>
                <li>We may use vetted third-party installers; they act as independent contractors.</li>
              </ul>
            </section>

            <section id="consultations" className="p-6 md:p-8 rounded-card bg-white border border-zinc-100 shadow-soft scroll-mt-24">
              <h2 className="text-2xl font-bold mb-2">Consultations & Site Visits</h2>
              <ul className="list-disc pl-5 space-y-1 text-zinc-700">
                <li>Recommendations depend on information you provide and an assessment of your space.</li>
                <li>Quoted scopes may change if site conditions differ from initial assumptions.</li>
              </ul>
            </section>

            <section id="smart-dome" className="p-6 md:p-8 rounded-card bg-white border border-zinc-100 shadow-soft scroll-mt-24">
              <h2 className="text-2xl font-bold mb-2">Smart Dome by Metalife</h2>
              <ul className="list-disc pl-5 space-y-1 text-zinc-700">
                <li>Site suitability (structure, anchors, clearances, drainage) must be validated; permits may be required.</li>
                <li>Utility connections (power/data/solar) and third-party integrations are subject to local standards and vendor policies.</li>
                <li>Performance depends on climate, usage, and configuration; optional upgrades (e.g., glazing, shading) affect outcomes.</li>
              </ul>
            </section>

            <section id="third-party" className="p-6 md:p-8 rounded-card bg-white border border-zinc-100 shadow-soft scroll-mt-24">
              <h2 className="text-2xl font-bold mb-2">Third-Party Services</h2>
              <p className="text-zinc-700">
                Our solutions may integrate platforms like Apple Home, Google Home, Amazon Alexa, or SmartThings.
                Their terms and privacy policies govern your use of those services and devices.
              </p>
            </section>

            <section id="returns" className="p-6 md:p-8 rounded-card bg-white border border-zinc-100 shadow-soft scroll-mt-24">
              <h2 className="text-2xl font-bold mb-2">Returns & Refunds</h2>
              <ul className="list-disc pl-5 space-y-1 text-zinc-700">
                <li>Standard hardware may be returnable within 30 days in original condition (exclusions may apply).</li>
                <li>Custom orders, software licenses, and installed components may be non-returnable.</li>
                <li>Contact us for an RMA and detailed instructions.</li>
              </ul>
            </section>

            <section id="warranties" className="p-6 md:p-8 rounded-card bg-white border border-zinc-100 shadow-soft scroll-mt-24">
              <h2 className="text-2xl font-bold mb-2">Warranties & Disclaimers</h2>
              <ul className="list-disc pl-5 space-y-1 text-zinc-700">
                <li>Hardware warranties are provided by the respective manufacturers.</li>
                <li>Services are provided “as is” to the fullest extent permitted by law.</li>
              </ul>
            </section>

            <section id="liability" className="p-6 md:p-8 rounded-card bg-white border border-zinc-100 shadow-soft scroll-mt-24">
              <h2 className="text-2xl font-bold mb-2">Limitation of Liability</h2>
              <p className="text-zinc-700">
                To the maximum extent permitted by law, we are not liable for indirect, incidental, special, consequential,
                or punitive damages. Our total liability related to the services will not exceed the amounts you paid for the
                specific order or service giving rise to the claim.
              </p>
            </section>

            <section id="indemnity" className="p-6 md:p-8 rounded-card bg-white border border-zinc-100 shadow-soft scroll-mt-24">
              <h2 className="text-2xl font-bold mb-2">Indemnification</h2>
              <p className="text-zinc-700">
                You agree to defend and indemnify us from claims arising out of your misuse of the services or violation
                of these Terms.
              </p>
            </section>

            <section id="acceptable-use" className="p-6 md:p-8 rounded-card bg-white border border-zinc-100 shadow-soft scroll-mt-24">
              <h2 className="text-2xl font-bold mb-2">Acceptable Use & Intellectual Property</h2>
              <ul className="list-disc pl-5 space-y-1 text-zinc-700">
                <li>Do not misuse the site or services (e.g., interfere, reverse engineer, or infringe IP).</li>
                <li>All site content is owned by VeaLive360 or licensors and protected by law.</li>
              </ul>
            </section>

            <section id="termination" className="p-6 md:p-8 rounded-card bg-white border border-zinc-100 shadow-soft scroll-mt-24">
              <h2 className="text-2xl font-bold mb-2">Termination</h2>
              <p className="text-zinc-700">
                We may suspend or terminate access for any breach of these Terms or for unlawful or abusive activity.
              </p>
            </section>

            <section id="law" className="p-6 md:p-8 rounded-card bg-white border border-zinc-100 shadow-soft scroll-mt-24">
              <h2 className="text-2xl font-bold mb-2">Governing Law</h2>
              <p className="text-zinc-700">
                These Terms are governed by the laws of Lebanon. Courts located in Beirut shall have exclusive jurisdiction,
                except where local law requires otherwise.
              </p>
            </section>

            <section id="changes" className="p-6 md:p-8 rounded-card bg-white border border-zinc-100 shadow-soft scroll-mt-24">
              <h2 className="text-2xl font-bold mb-2">Changes to Terms</h2>
              <p className="text-zinc-700">
                We may update these Terms. Continued use after updates constitutes acceptance of the revised Terms.
              </p>
            </section>

            <section id="contact" className="p-6 md:p-8 rounded-card bg-white border border-zinc-100 shadow-soft scroll-mt-24">
              <h2 className="text-2xl font-bold mb-2">Contact</h2>
              <p className="text-zinc-700">
                Email: <a className="text-brand-blue font-semibold" href="mailto:mw91fulg@hotmail.com">mw91fulg@hotmail.com</a>
                <br />
                WhatsApp: <a className="text-brand-blue font-semibold" href="https://wa.me/96181632241" target="_blank">+961 81 632 241</a>
              </p>
            </section>
          </div>
        </div>
      </section>
    </main>
  );
}
