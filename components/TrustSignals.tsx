// components/TrustSignals.tsx
import { ShieldCheck, Clock, Headset, Wrench } from "lucide-react";

export default function TrustSignals() {
  const items = [
    { title: "Secure & Private",  body: "Local-first where possible, with privacy-respecting defaults.", icon: ShieldCheck },
    { title: "Fast Turnaround",   body: "Typical installs completed within days.",                        icon: Clock },
    { title: "Priority Support",  body: "Care plans with proactive check-ups.",                           icon: Headset },
    { title: "Warranty",          body: "Hassle-free replacements on covered hardware.",                  icon: Wrench },
  ];

  return (
    <section className="pt-16">
      <div className="mx-auto max-w-6xl px-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 place-items-center">
        {items.map(({ title, body, icon: Icon }, i) => {
          const isblack = i % 2 === 0;
          const chip =
            isblack ? "bg-brand-black/10 text-brand-black" : "bg-brand-black/10 text-brand-black";

        return (
          <article key={title} className="p-6 text-center flex flex-col items-center">
            <div className={`w-12 h-12 rounded-xl ${chip} flex items-center justify-center mb-3`}>
              <Icon className="w-6 h-6" aria-hidden />
            </div>
            <h3 className="text-lg font-semibold">{title}</h3>
            <p className="text-zinc-600 mt-1 max-w-[28ch]">{body}</p>
          </article>
        );
        })}
      </div>
    </section>
  );
}
