// app/faqs/page.tsx
import type { Metadata } from "next";
import Link from "next/link";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import CTA from "@/components/CTA";
import TrustSignals from "@/components/TrustSignals";
import SEOJsonLd from "@/components/SEOJsonLd";
import { SITE } from "@/lib/site";
import DynamicUnderline from "@/components/ui/DynamicUnderline";

/* ---------------------------
   SEO
--------------------------- */
export const metadata: Metadata = {
  title: "VeaLive FAQs | Smart Home Automation in Beirut",
  description:
    "Answers to common questions about VeaLive smart home automation in Beirut: compatibility, installation, privacy, security, support, and maintenance.",
  alternates: { canonical: "/faqs" },
  openGraph: {
    title: "VeaLive FAQs",
    description:
      "Everything you need to know about VeaLive smart home solutions—compatibility, installation, privacy, and support.",
    url: `${SITE.baseUrl}/faqs`,
    images: [{ url: SITE.ogImage }],
  },
  twitter: { card: "summary_large_image", site: "@vealive360" },
  robots: { index: true, follow: true },
};

/* ---------------------------
   Utils
--------------------------- */
function slugifySafe(input: string) {
  return input
    .toLowerCase()
    .trim()
    .replace(/\s+/g, "-")
    .replace(/&/g, "and")
    .replace(/[^a-z0-9\-_]/g, "");
}

/* ---------------------------
   Data
--------------------------- */
const faqCategories = [
  {
    category: "General",
    questions: [
      {
        question: "What is VeaLive?",
        answer:
          "VeaLive designs and integrates smart home automation that brings your home to life—comfort, security, lighting, energy, and more—built on trusted ecosystems and configured to your routines.",
      },
      {
        question: "How do I get started?",
        answer:
          "Start by telling us about your space and goals. Book a free consultation and we’ll propose a tailored roadmap across lighting, climate, security, entertainment, and energy.",
      },
      {
        question: "Do I need technical knowledge?",
        answer:
          "No. We design for simplicity. We handle selection, setup, and tuning—so you can enjoy a space that quietly adapts to you.",
      },
    ],
  },
  {
    category: "Products",
    questions: [
      {
        question: "Are VeaLive solutions compatible with my ecosystem?",
        answer:
          "Yes. We work with Apple Home, Google Home, Amazon Alexa, and Samsung SmartThings (plus Matter, Thread, Zigbee, and Wi-Fi). Your stack, your rules.",
      },
      {
        question: "What’s the warranty like?",
        answer:
          "We recommend hardware with solid manufacturer warranties; many devices include 1–2 years. For projects, we offer optional care plans for priority support and tune-ups.",
      },
      {
        question: "Can I return a product?",
        answer:
          "If you purchase hardware through us or our partners, standard return windows apply per vendor policy. Ask us before ordering—we’ll guide you to the right parts the first time.",
      },
    ],
  },
  {
    category: "Installation & Setup",
    questions: [
      {
        question: "Do I need professional installation?",
        answer:
          "Many upgrades are rental-friendly and DIY. For electrical or multi-system integrations, our team can install, verify, and calibrate scenes end-to-end.",
      },
      {
        question: "How long does installation take?",
        answer:
          "Single-room upgrades can be same-day. Whole-home projects vary by scope—typically 1–3 days including testing and training.",
      },
      {
        question: "What if I hit setup issues?",
        answer:
          "We’re here to help. Reach out via our contact form or WhatsApp for quick triage; remote support resolves most issues fast.",
      },
    ],
  },
  {
    category: "Connectivity & Security",
    questions: [
      {
        question: "How secure is it?",
        answer:
          "Privacy is a default. We prioritize local-first control where possible, strong encryption, and vendor selection with clear data policies.",
      },
      {
        question: "What happens if the internet goes down?",
        answer:
          "Core automations that run locally continue to work. Remote access and cloud-only features resume once connectivity returns.",
      },
      {
        question: "Do you sell my data?",
        answer:
          "No. VeaLive does not sell personal data. We collect the minimum needed to deliver and support your system. See our Privacy Policy for details.",
      },
    ],
  },
  {
    category: "Support & Maintenance",
    questions: [
      {
        question: "How do I contact support?",
        answer:
          "Email info@vealive360.com or message us on WhatsApp at +961 81 632 241. You can also use the contact form for non-urgent requests.",
      },
      {
        question: "Are software updates free?",
        answer:
          "Firmware/app updates from manufacturers are typically free. We can schedule periodic tune-ups to keep everything fast and secure.",
      },
      {
        question: "Do you offer maintenance plans?",
        answer:
          "Yes—optional care plans with proactive check-ups, priority response, and scene refinements based on how you actually live.",
      },
    ],
  },
];

/* ---------------------------
   Page
--------------------------- */
export default function FAQPage() {
  return (
    <div id="top" data-no-reveal className="w-full overflow-x-clip page-canvas">
      {/* JSON-LD: FAQPage + Breadcrumbs */}
      <SEOJsonLd
        data={[
          {
            "@context": "https://schema.org",
            "@type": "FAQPage",
            mainEntity: faqCategories.flatMap((cat) =>
              cat.questions.map((q) => ({
                "@type": "Question",
                name: q.question,
                acceptedAnswer: { "@type": "Answer", text: q.answer },
              }))
            ),
          },
          {
            "@context": "https://schema.org",
            "@type": "BreadcrumbList",
            itemListElement: [
              { "@type": "ListItem", position: 1, name: "Home", item: SITE.baseUrl },
              { "@type": "ListItem", position: 2, name: "FAQs", item: `${SITE.baseUrl}/faqs` },
            ],
          },
        ]}
      />

      {/* HERO */}
      <section id="faq-hero" className="mt-10 mb-12 relative section-wrap">
        <div className="absolute inset-0 -z-10  " />
        <div className="mx-auto max-w-6xl px-4 text-center ">
          <span className="inline-flex items-center px-3 py-1 rounded-full bg-zinc-100 text-xs font-medium">
            FAQ
          </span>
          <h1 className="mt-2 text-4xl md:text-5xl font-extrabold leading-tight tracking-tight">
            Frequently Asked{" "}
            <span className="bg-gradient-to-r from-brand-blue to-brand-green bg-clip-text text-transparent">
              Questions
            </span>
          </h1>

          {/* Dynamic underline (centered) */}
          <div className="mt-3">
            <DynamicUnderline watch="#faq-hero" align="center" widthClass="w-20" height={4} />
          </div>

          <p className="mt-3 text-lg text-zinc-700 max-w-[700px] mx-auto">
            Clear answers about VeaLive smart home automation—compatibility, setup, security, and support.
          </p>
        </div>
      </section>

      {/* BODY */}
      <section className="py-12">
        <div className="mx-auto max-w-6xl px-4 grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Sidebar */}
          <aside className="space-y-6 lg:sticky lg:top-20 h-fit ">
            <div className="p-4 rounded-card bg-white border border-zinc-100 shadow-soft">
              <h2 className="text-base font-semibold text-zinc-900">Categories</h2>
              <span className="mt-1 block h-0.5 w-10 rounded-full bg-gradient-to-r from-brand-blue to-brand-green" />
              <nav className="mt-3 space-y-1">
                {faqCategories.map((category) => {
                  const slug = slugifySafe(category.category);
                  return (
                    <Link
                      key={category.category}
                      href={`#${slug}`}
                      className="block py-2 px-3 rounded-md hover:bg-zinc-100 transition-colors"
                    >
                      {category.category}
                    </Link>
                  );
                })}
              </nav>
            </div>

            <div className="p-5 rounded-card bg-white border border-zinc-100 shadow-soft">
              <h3 className="font-medium mb-2">Still have questions?</h3>
              <p className="text-sm text-zinc-600 mb-4">
                If you couldn’t find the answer, our team is here to help.
              </p>
              <Link href="/contact" className="btn-primary w-full h-10">
                Contact support
              </Link>
            </div>


          </aside>

          {/* Content */}
          <div className="lg:col-span-3 space-y-8">
            {faqCategories.map((category) => {
              const slug = slugifySafe(category.category);
              return (
                <section
                  key={category.category}
                  id={slug}
                  className="scroll-mt-24 p-6 md:p-8 rounded-card bg-white border border-zinc-100 shadow-soft "
                >
                  <h2 className="text-2xl font-bold text-zinc-900">{category.category}</h2>

                  {/* Dynamic underline (left) */}
                  <div className="mt-2">
                    <DynamicUnderline watch={`#${slug}`} align="left" widthClass="w-20" height={4} />
                  </div>

                  <Accordion
                    type="single"
                    collapsible
                    className="mt-4 w-full divide-y divide-zinc-100"
                  >
                    {category.questions.map((faq, idx) => (
                      <AccordionItem key={idx} value={`${slug}-${idx}`} className="border-none group">
                        <AccordionTrigger
                          className="
                            text-left font-medium py-4 transition-colors
                            hover:text-zinc-900
                            data-[state=open]:text-brand-blue
                          "
                        >
                          {faq.question}
                        </AccordionTrigger>

                        <AccordionContent
                          className="
                            text-zinc-700 pb-4 overflow-hidden
                            data-[state=open]:animate-accordion-down
                            data-[state=closed]:animate-accordion-up
                          "
                        >
                          {faq.answer}
                        </AccordionContent>
                      </AccordionItem>
                    ))}
                  </Accordion>
                </section>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA + Trust */}
      <CTA />
      <TrustSignals />

      {/* simple progressive reveal (no JS component needed) */}


    </div>
  );
}
