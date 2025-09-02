import Link from "next/link";

export default function CTA() {
  return (
    <section className="mt-20">
      <div className="mx-auto max-w-6xl px-4 rounded-card p-10 border border-zinc-100 shadow-soft bg-white relative overflow-hidden">
        <div className="absolute inset-0 gradient-multi opacity-10" />
        <div className="grid md:grid-cols-2 gap-6 items-center">
          <div>
            <h2 className="text-3xl md:text-4xl font-extrabold">Begin your journey</h2>
            <p className="mt-2 text-zinc-600">Let’s discuss your elevated space—connect with us your way.</p>
          </div>
          <div className="flex gap-3 md:justify-end">
            <Link href="/contact" className="px-5 py-3 rounded-full bg-brand-blue text-white font-semibold">Book a consultation</Link>
            <a href="https://wa.me/96171247518" className="px-5 py-3 rounded-full border border-zinc-300 font-semibold">Let’s connect</a>
          </div>
        </div>
      </div>
    </section>
  );
}
