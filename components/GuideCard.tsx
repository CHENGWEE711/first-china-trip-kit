import Image from "next/image";
import Link from "next/link";
import { BookOpen } from "lucide-react";
import type { Guide } from "@/data/guides";
import { cityImages, editorialImages } from "@/data/images";

type GuideCardProps = {
  guide: Guide;
};

export function GuideCard({ guide }: GuideCardProps) {
  const image = guide.category === "Transportation"
    ? editorialImages.transport
    : guide.category === "Payment" || guide.category === "Apps"
      ? editorialImages.payments
      : guide.category === "Visa & Entry"
        ? cityImages.shanghai
        : editorialImages.food;
  return (
    <article className="border-b border-ink/15 pb-6">
      <Link href={`/guides/${guide.slug}`} className="group block overflow-hidden rounded-lg">
        <div className="relative aspect-[3/2]">
          <Image src={image.src} alt={image.alt} fill sizes="(min-width: 1280px) 33vw, (min-width: 768px) 50vw, 100vw" className="object-cover transition duration-500 group-hover:scale-[1.025]" />
        </div>
      </Link>
      <p className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-ember">
        <BookOpen aria-hidden="true" size={15} />
        {guide.category}
      </p>
      <h3 className="mt-3 text-2xl leading-tight text-ink">{guide.title}</h3>
      <p className="mt-3 text-base text-ink/68">{guide.summary}</p>
      <Link
        href={`/guides/${guide.slug}`}
        className="mt-4 inline-flex min-h-11 items-center font-semibold text-ember transition hover:text-[#963028]"
      >
        Read guide →
      </Link>
    </article>
  );
}
