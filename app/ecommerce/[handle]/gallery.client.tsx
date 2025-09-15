"use client";

import Image from "next/image";
import { useState } from "react";

export default function GalleryClient({
  title,
  images,
}: {
  title: string;
  images: { url: string; altText?: string | null }[];
}) {
  const [active, setActive] = useState(0);
  const hero = images[active];

  return (
    <div className="space-y-3">
      {/* HERO */}
      <div className="relative aspect-square rounded-2xl overflow-hidden border border-zinc-200">
        {hero?.url && (
          <Image
            key={hero.url}
            src={hero.url}
            alt={hero.altText || title}
            fill
            className="object-cover"
            priority
          />
        )}
        <div className="absolute inset-0 gradient-brand opacity-10 pointer-events-none" />
      </div>

      {/* THUMBS */}
      {images.length > 1 && (
        <div className="grid grid-cols-5 gap-2">
          {images.slice(0, 10).map((img, i) => (
            <button
              key={img.url + i}
              onClick={() => setActive(i)}
              aria-label={`View image ${i + 1}`}
              className={`relative aspect-square rounded-lg overflow-hidden border focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-blue ${
                active === i ? "ring-2 ring-brand-blue" : ""
              }`}
            >
              <Image
                src={img.url}
                alt={img.altText || title}
                fill
                className="object-cover"
              />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
