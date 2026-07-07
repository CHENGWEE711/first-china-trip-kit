import Link from "next/link";
import { BookOpen } from "lucide-react";
import type { Guide } from "@/data/guides";

type GuideCardProps = {
  guide: Guide;
};

export function GuideCard({ guide }: GuideCardProps) {
  return (
    <article className="rounded-lg border border-ink/10 bg-paper p-5 shadow-soft">
      <p className="inline-flex items-center gap-2 rounded-md bg-sand px-2.5 py-1 text-sm font-semibold text-ember">
        <BookOpen aria-hidden="true" size={15} />
        {guide.category}
      </p>
      <h3 className="mt-4 text-2xl font-bold leading-tight text-ink">{guide.title}</h3>
      <p className="mt-3 text-base text-ink/68">{guide.summary}</p>
      <Link
        href={`/guides/${guide.slug}`}
        className="mt-5 inline-flex min-h-11 items-center justify-center rounded-md bg-ink px-4 py-2 text-base font-semibold text-white transition hover:bg-ember"
      >
        Read guide
      </Link>
    </article>
  );
}
