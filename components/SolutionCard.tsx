// components/SolutionCard.tsx
import Image from "next/image";
import Link from "next/link";

type Props = {
  slug: string;
  title: string;
  description: string;
  image?: string;
};

export default function SolutionCard({ slug, title, description, image }: Props) {
  return (
    <article className="relative group h-full flex flex-col rounded-card overflow-hidden bg-white border border-zinc-200 hover:shadow-lg transition-shadow duration-300">
      {/* Full-card link ensures a normal click/tap navigates */}
      <Link href={`/solutions/${slug}`} aria-label={`Open ${title}`} className="absolute inset-0 z-10" prefetch />

      <div className="relative h-48 md:h-56 w-full">
        <Image
          src={image || "https://vaety.com/cdn/shop/files/website.png?v=1748889700"}
          alt={title}
          fill
          sizes="(min-width:1024px) 380px, (min-width:640px) 340px, 280px"
          className="object-cover"
        />
        <div className="pointer-events-none absolute inset-0 opacity-0 group-hover:opacity-10 transition-opacity gradient-multi" />
      </div>

      <div className="flex flex-col p-6 gap-2 flex-1">
        <h3 className="text-xl font-bold">{title}</h3>
        <p className="text-sm text-zinc-600 line-clamp-3">{description}</p>
        <span className="mt-auto inline-flex items-center gap-2 text-brand-blue text-sm font-semibold">
          Explore <span aria-hidden>→</span>
        </span>
      </div>
    </article>
  );
}
