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
    <article
      className="
        group h-full flex flex-col rounded-card overflow-hidden
        bg-white border border-zinc-100 
        hover:shadow-lg transition-[box-shadow,transform,filter] duration-300
      "
    >
      <div className="relative w-full h-48 md:h-56">
        <Image
          src={image || "/images/placeholders/solution-default.jpg"}
          alt={title}
          fill
          sizes="(min-width:1024px) 380px, (min-width:640px) 340px, 280px"
          className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
          priority={false}
        />
        <div className="pointer-events-none absolute inset-0 opacity-0 group-hover:opacity-10 transition-opacity gradient-multi" />
        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-10 bg-gradient-to-t from-black/10 to-transparent" />
      </div>

      <div className="flex flex-col p-6 gap-2 flex-1">
        <h3 className="text-lg md:text-xl font-bold leading-snug">{title}</h3>
        <p className="text-sm text-zinc-600 line-clamp-3">{description}</p>

        <Link
          href={`/solutions/${slug}`}
          aria-label={`Open ${title}`}
          className="mt-auto inline-flex items-center gap-2 text-brand-blue text-sm font-semibold
                     focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-blue/50 rounded-full "
        >
          Explore <span aria-hidden className="transition-transform group-hover:translate-x-0.5">→</span>
        </Link>
      </div>
    </article>
  );
}
