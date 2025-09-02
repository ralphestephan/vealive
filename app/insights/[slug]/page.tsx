// app/insights/[slug]/page.tsx
import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { insights } from "@/data/insights";
import SEOJsonLd from "@/components/SEOJsonLd";
import { SITE } from "@/lib/site";

type Props = { params: { slug: string } };

export function generateStaticParams() {
  return insights.map((p) => ({ slug: p.slug }));
}

export function generateMetadata({ params }: Props): Metadata {
  const post = insights.find((p) => p.slug === params.slug);
  if (!post) return { title: "Insight" };
  return {
    title: `${post.title} | VeaLive Insights`,
    description: post.excerpt,
    alternates: { canonical: `/insights/${post.slug}` },
    openGraph: {
      title: post.title,
      description: post.excerpt,
      url: `${SITE.baseUrl}/insights/${post.slug}`,
      images: [{ url: `${SITE.baseUrl}${post.cover}` }],
    },
    twitter: { card: "summary_large_image", site: "@vealive360" },
  };
}

export default function Page({ params }: Props) {
  const post = insights.find((p) => p.slug === params.slug);
  if (!post) return notFound();

  // Related: same first tag, exclude self
  const related = insights
    .filter((p) => p.slug !== post.slug && p.tags[0] === post.tags[0])
    .slice(0, 3);

  return (
    <main className="w-full overflow-x-clip">
      {/* JSON-LD (BlogPosting) */}
      <SEOJsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "BlogPosting",
          headline: post.title,
          datePublished: post.date,
          url: `${SITE.baseUrl}/insights/${post.slug}`,
          image: `${SITE.baseUrl}${post.cover}`,
          author: { "@type": "Organization", name: SITE.org.legalName },
          publisher: {
            "@type": "Organization",
            name: SITE.org.legalName,
            logo: { "@type": "ImageObject", url: `${SITE.baseUrl}${SITE.org.logo}` },
          },
          description: post.excerpt,
        }}
      />

      {/* HERO */}
      <section className="mt-10 mb-8 relative">
        <div className="absolute inset-0 -z-10 gradient-multi opacity-5" />
        <div className="mx-auto max-w-6xl px-4">
          <Link
            href="/insights"
            className="inline-flex items-center gap-2 text-sm font-semibold text-brand-blue hover:underline"
          >
            ← Back to Insights
          </Link>

          <div className="mt-4 grid grid-cols-1 lg:grid-cols-12 gap-8">
            {/* Title + meta */}
            <header className="lg:col-span-7">
              <h1 className="text-3xl md:text-4xl font-extrabold leading-tight tracking-tight">
                <span className="bg-gradient-to-r from-brand-blue to-brand-green bg-clip-text text-transparent">
                  {post.title}
                </span>
              </h1>
             
              <p className="mt-4 text-lg leading-7 text-zinc-700">
                {("intro" in post && (post as any).intro) ? (post as any).intro : post.excerpt}
              </p>

              <div className="mt-3 text-sm text-zinc-600 flex flex-wrap items-center gap-2">
                <time dateTime={post.date}>
                  {new Date(post.date).toLocaleDateString()}
                </time>
                • <span>{post.readMins} min read</span>
                • {post.tags.map((t) => (
                  <span key={t} className="px-2 py-0.5 rounded-full bg-zinc-100 text-xs font-medium">
                    {t}
                  </span>
                ))}
              </div>
            </header>

            {/* Cover */}
            <div className="lg:col-span-5">
              <div className="relative aspect-[16/10] rounded-card overflow-hidden border border-zinc-100 shadow-soft">
                <Image src={post.cover} alt={post.coverAlt} fill className="object-cover" />
                <div className="absolute inset-0 gradient-brand opacity-15" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* BODY + TOC */}
      <section className="pb-16">
        <div className="mx-auto max-w-6xl px-4 grid grid-cols-1 lg:grid-cols-12 gap-10">
          {/* Article */}
          <article className="lg:col-span-8 prose prose-zinc max-w-none">
            {post.sections.map((s) => (
              <section key={s.id} id={s.id} className="scroll-mt-24">
                <h2>{s.heading}</h2>
                {s.paras.map((p, i) => (
                  <p key={i}>{p}</p>
                ))}
                {s.bullets && (
                  <ul>
                    {s.bullets.map((b, i) => (
                      <li key={i}>{b}</li>
                    ))}
                  </ul>
                )}
                {s.note && (
                  <div className="rounded-xl p-4 bg-brand-blue/5 border border-brand-blue/10 text-sm">
                    <strong>Note:</strong> {s.note}
                  </div>
                )}
              </section>
            ))}
          </article>

          {/* TOC + meta card */}
          <aside className="lg:col-span-4 space-y-6 h-fit lg:sticky lg:top-20">
            <div className="p-6 rounded-card bg-white border border-zinc-100 shadow-soft">
              <div className="text-sm font-semibold text-zinc-700">On this page</div>
              <nav className="mt-2 space-y-2">
                {post.sections.map((s) => (
                  <a
                    key={s.id}
                    href={`#${s.id}`}
                    className="block text-sm text-zinc-700 hover:text-brand-blue"
                  >
                    {s.heading}
                  </a>
                ))}
                
              </nav>
            </div>
            {post.faq && post.faq.length > 0 && (
  <section id="faq" className="scroll-mt-24">
    <h2>FAQ</h2>
    <div className="space-y-4">
      {post.faq.map((f, i) => (
        <details key={i} className="group border border-zinc-200 rounded-lg p-4">
          <summary className="font-medium cursor-pointer list-none">
            {f.q}
          </summary>
          <p className="mt-2 text-zinc-700">{f.a}</p>
        </details>
      ))}
    </div>
  </section>
)}
            {/* Related */}
            {related.length > 0 && (
              <div className="p-6 rounded-card bg-white border border-zinc-100 shadow-soft">
                <div className="text-sm font-semibold text-zinc-700 mb-2">Related reads</div>
                <ul className="space-y-3">
                  {related.map((p) => (
                    <li key={p.slug} className="flex items-start gap-3">
                      <div className="relative w-16 h-12 rounded-md overflow-hidden border border-zinc-200">
                        <Image src={p.cover} alt={p.coverAlt} fill className="object-cover" />
                      </div>
                      <div>
                        <Link href={`/insights/${p.slug}`} className="font-medium hover:underline">
                          {p.title}
                        </Link>
                        <div className="text-xs text-zinc-500">{p.readMins} min</div>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </aside>
        </div>
      </section>
    </main>
  );
}
