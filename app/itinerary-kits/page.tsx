import type { Metadata } from "next";
import Link from "next/link";
import { CalendarDays, Coins, MapPinned } from "lucide-react";
import { PageIntro } from "@/components/PageIntro";
import { getItineraryBySlug } from "@/data/itineraries";
import { itineraryKitSlugs } from "@/data/kits";
import { buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: "China Itinerary Kits by Trip Length | First China Trip Kit",
  description:
    "Browse practical China Itinerary Kits for Shanghai, Beijing, Beijing and Xi'an, Shanghai Hangzhou Suzhou, classic China, and 240-hour visa-free route planning.",
  path: "/itinerary-kits",
});

const kitItineraries = itineraryKitSlugs.flatMap((slug) => {
  const itinerary = getItineraryBySlug(slug);
  return itinerary ? [itinerary] : [];
});

export default function ItineraryKitsPage() {
  return (
    <>
      <PageIntro
        eyebrow="Itinerary Kits"
        title="Ready-to-use China routes with practical pacing"
        description="Choose a route by trip length, city mix, transport difficulty, budget level, and the amount of buffer you want for a first China trip."
      />
      <section className="px-4 py-12">
        <div className="mx-auto grid max-w-7xl gap-5 md:grid-cols-2 xl:grid-cols-3">
          {kitItineraries.map((itinerary) => (
            <article
              key={itinerary.id}
              className="flex h-full flex-col rounded-lg border border-ink/10 bg-paper p-5 shadow-soft"
            >
              <div className="flex flex-wrap gap-2">
                <span className="inline-flex items-center gap-1 rounded-md bg-sand px-2.5 py-1 text-sm font-semibold text-ink/72">
                  <CalendarDays aria-hidden="true" size={15} />
                  {itinerary.durationDays} days
                </span>
                <span className="inline-flex items-center gap-1 rounded-md bg-mist px-2.5 py-1 text-sm font-semibold text-jade">
                  <Coins aria-hidden="true" size={15} />
                  {itinerary.budgetLevel}
                </span>
              </div>
              <h2 className="mt-4 text-2xl font-bold leading-tight text-ink">
                {itinerary.title}
              </h2>
              <p className="mt-2 flex items-center gap-2 text-sm font-semibold text-ember">
                <MapPinned aria-hidden="true" size={16} />
                {itinerary.cities.join(" + ")}
              </p>
              <p className="mt-4 flex-1 text-base leading-relaxed text-ink/68">
                {itinerary.summary}
              </p>
              <Link
                href={`/itinerary-kits/${itinerary.slug}`}
                className="mt-5 inline-flex min-h-11 items-center justify-center rounded-md border border-ember bg-paper px-4 py-2 text-base font-semibold text-ember transition hover:bg-ember hover:text-white"
              >
                Open Itinerary Kit
              </Link>
            </article>
          ))}
        </div>
      </section>
    </>
  );
}
