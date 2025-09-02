// components/Ecosystem.tsx
import Image from "next/image";

export default function Ecosystem() {
  const items = [
    { name: "Apple Home",   src: "/logos/applehome.png" },
    { name: "Google Home",  src: "/logos/googlehome.png" },
    { name: "Amazon Alexa", src: "/logos/works_with_alexa_480x480.avif" },
    { name: "SmartThings",  src: "/logos/smartthing.webp" },
  ];

  return (
    <section className="py-16 relative">
      {/* soft background wash */}
      <div className="absolute inset-0 -z-10 gradient-multi opacity-5" />

      <div className="mx-auto max-w-6xl px-4">
        {/* Enhanced title */}
        <div className="relative mb-10">
          <div className="pointer-events-none absolute -top-10 -left-10 w-40 h-40 rounded-full bg-brand-blue/10 blur-3xl" />
          <div className="pointer-events-none absolute -bottom-10 -right-10 w-40 h-40 rounded-full bg-brand-green/10 blur-3xl" />

          <span className="inline-flex items-center px-3 py-1 rounded-full bg-zinc-100 text-xs font-medium relative">
            Compatibility
          </span>
          <h2 className="mt-2 text-3xl sm:text-4xl font-extrabold tracking-tight relative">
            <span className="bg-gradient-to-r from-brand-blue to-brand-green bg-clip-text text-transparent">
              Built on trusted ecosystems
            </span>
          </h2>
          <p className="mt-2 text-zinc-600 relative">
            Works with Apple Home, Google Home, Amazon Alexa, and Samsung SmartThings.
          </p>
          <span className="mt-3 block h-1 w-20 rounded-full bg-gradient-to-r from-brand-blue to-brand-green relative" />
        </div>

        {/* Logos */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {items.map((i) => (
            <div
              key={i.name}
              className="p-4 rounded-card bg-white border border-zinc-200 flex items-center justify-center shadow-soft hover:shadow-lg transition"
            >
              {/* Fixed-size box so all logos render uniformly */}
              <div className="relative w-full h-16 md:h-20 opacity-80 group-hover:opacity-100 group-hover:grayscale-0 transition">
                <Image
                  src={i.src}
                  alt={i.name}
                  fill
                  sizes="(min-width:768px) 240px, 45vw"
                  className="object-contain"
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
