// app/privacy/page.tsx
import type { Metadata } from "next";

export const metadata: Metadata = { title: "Privacy Policy" };

export default function PrivacyPage() {
  const updated = "August 30, 2025";

  const toc = [
    ["Overview", "overview"],
    ["Information We Collect", "info-we-collect"],
    ["How We Use Information", "how-we-use"],
    ["Legal Bases (GDPR)", "legal-bases"],
    ["Sharing & Processors", "sharing"],
    ["International Transfers", "transfers"],
    ["Retention", "retention"],
    ["Your Rights & Choices", "rights"],
    ["Cookies & Similar Tech", "cookies"],
    ["Smart-Device Data", "smart-device"],
    ["Children’s Privacy", "children"],
    ["Changes", "changes"],
    ["Contact Us", "contact"],
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
              Privacy Policy
            </span>
          </h1>
          <p className="mt-3 text-zinc-700 max-w-2xl mx-auto">
            How VeaLive360 (“we”, “us”, “our”) collects, uses, and protects your information.
          </p>
          <span className="mt-2 block text-xs text-zinc-500">Last updated: {updated}</span>
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
                This Policy applies to vealive360.com and our services, including consultations,
                installations, support plans, and the Smart Dome by Metalife. By using our site or services,
                you agree to this Policy.
              </p>
            </section>

            <section id="info-we-collect" className="p-6 md:p-8 rounded-card bg-white border border-zinc-100 shadow-soft scroll-mt-24">
              <h2 className="text-2xl font-bold mb-4">Information We Collect</h2>
              <div className="space-y-3 text-zinc-700">
                <p className="font-semibold">Information you provide</p>
                <ul className="list-disc pl-5 space-y-1">
                  <li>Contact details (name, email, phone, city).</li>
                  <li>Project details (property type, rooms, goals, budget, timeline).</li>
                  <li>Preferences (ecosystem like Apple/Google/Alexa/SmartThings).</li>
                  <li>Messages, forms, support requests, appointment info.</li>
                </ul>
                <p className="font-semibold mt-4">Information collected automatically</p>
                <ul className="list-disc pl-5 space-y-1">
                  <li>Device and usage data (browser, pages viewed, approximate location).</li>
                  <li>Cookies and similar tech for analytics and site functionality.</li>
                </ul>
                <p className="font-semibold mt-4">Information from partners</p>
                <ul className="list-disc pl-5 space-y-1">
                  <li>Payment and fulfillment providers (transaction status—never full card numbers).</li>
                  <li>Installation partners (appointment confirmations, completion notes).</li>
                </ul>
              </div>
            </section>

            <section id="how-we-use" className="p-6 md:p-8 rounded-card bg-white border border-zinc-100 shadow-soft scroll-mt-24">
              <h2 className="text-2xl font-bold mb-4">How We Use Information</h2>
              <ul className="list-disc pl-5 space-y-1 text-zinc-700">
                <li>Provide, personalize, and improve our services and recommendations.</li>
                <li>Schedule and deliver consultations, installations, and support.</li>
                <li>Send transactional messages; send marketing with your consent (opt-out anytime).</li>
                <li>Maintain safety, prevent fraud, and comply with legal obligations.</li>
                <li>Analyze usage to enhance site performance and UX.</li>
              </ul>
            </section>

            <section id="legal-bases" className="p-6 md:p-8 rounded-card bg-white border border-zinc-100 shadow-soft scroll-mt-24">
              <h2 className="text-2xl font-bold mb-4">Legal Bases (GDPR)</h2>
              <p className="text-zinc-700">
                We rely on: (i) contract performance; (ii) legitimate interests (e.g., service security and improvement);
                (iii) consent (e.g., marketing, certain cookies); and (iv) legal obligations.
              </p>
            </section>

            <section id="sharing" className="p-6 md:p-8 rounded-card bg-white border border-zinc-100 shadow-soft scroll-mt-24">
              <h2 className="text-2xl font-bold mb-4">Sharing & Processors</h2>
              <ul className="list-disc pl-5 space-y-1 text-zinc-700">
                <li>Service providers: hosting, analytics, email/SMS, payments, logistics, install partners.</li>
                <li>Compliance and safety: to meet laws, defend legal claims, or protect users.</li>
                <li>Business transfers: in merger, acquisition, or asset sale scenarios.</li>
              </ul>
              <p className="text-zinc-700 mt-3">We don’t sell your personal data.</p>
            </section>

            <section id="transfers" className="p-6 md:p-8 rounded-card bg-white border border-zinc-100 shadow-soft scroll-mt-24">
              <h2 className="text-2xl font-bold mb-4">International Transfers</h2>
              <p className="text-zinc-700">
                If data is processed outside your country, we take reasonable measures to ensure adequate protection
                (e.g., contractual safeguards and vetted vendors).
              </p>
            </section>

            <section id="retention" className="p-6 md:p-8 rounded-card bg-white border border-zinc-100 shadow-soft scroll-mt-24">
              <h2 className="text-2xl font-bold mb-4">Retention</h2>
              <p className="text-zinc-700">
                We keep personal data only as long as necessary for the purposes above, then delete or anonymize it.
                Retention varies by record type (e.g., invoices vs. support threads).
              </p>
            </section>

            <section id="rights" className="p-6 md:p-8 rounded-card bg-white border border-zinc-100 shadow-soft scroll-mt-24">
              <h2 className="text-2xl font-bold mb-4">Your Rights & Choices</h2>
              <ul className="list-disc pl-5 space-y-1 text-zinc-700">
                <li>Access, correct, delete, or export your data when applicable.</li>
                <li>Object to or restrict certain processing; withdraw consent where relied upon.</li>
                <li>Opt out of marketing via any email footer or by contacting us.</li>
              </ul>
              <p className="text-zinc-700 mt-3">To exercise rights, email <a className="text-brand-blue font-semibold" href="mailto:mw91fulg@hotmail.com">mw91fulg@hotmail.com</a>.</p>
            </section>

            <section id="cookies" className="p-6 md:p-8 rounded-card bg-white border border-zinc-100 shadow-soft scroll-mt-24">
              <h2 className="text-2xl font-bold mb-4">Cookies & Similar Technologies</h2>
              <p className="text-zinc-700">
                We use essential cookies for core functionality and optional analytics/marketing cookies with consent.
                You can manage preferences in your browser and (where available) our cookie banner.
              </p>
            </section>

            <section id="smart-device" className="p-6 md:p-8 rounded-card bg-white border border-zinc-100 shadow-soft scroll-mt-24">
              <h2 className="text-2xl font-bold mb-4">Smart-Device Data</h2>
              <p className="text-zinc-700">
                Integrations with Apple/Google/Alexa/SmartThings may share limited device status and telemetry needed for
                automation. We do not receive continuous audio/video feeds. We prefer local-first designs where feasible.
              </p>
            </section>

            <section id="children" className="p-6 md:p-8 rounded-card bg-white border border-zinc-100 shadow-soft scroll-mt-24">
              <h2 className="text-2xl font-bold mb-4">Children’s Privacy</h2>
              <p className="text-zinc-700">
                Our services are not directed to children under 13 (or under 16 where applicable). If we learn a child
                provided data without consent, we’ll delete it.
              </p>
            </section>

            <section id="changes" className="p-6 md:p-8 rounded-card bg-white border border-zinc-100 shadow-soft scroll-mt-24">
              <h2 className="text-2xl font-bold mb-4">Changes</h2>
              <p className="text-zinc-700">
                We may update this Policy. Material changes will be highlighted here with a new “Last updated” date.
              </p>
            </section>

            <section id="contact" className="p-6 md:p-8 rounded-card bg-white border border-zinc-100 shadow-soft scroll-mt-24">
              <h2 className="text-2xl font-bold mb-2">Contact Us</h2>
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
