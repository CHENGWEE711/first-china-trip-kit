import Link from "next/link";
import { CalendarDays, Coins, MapPinned } from "lucide-react";
import type { Itinerary } from "@/data/itineraries";

type ItineraryCardProps = {
  itinerary: Itinerary;
};

export function ItineraryCard({ itinerary }: ItineraryCardProps) {
  return (
    <article className="flex h-full flex-col rounded-lg border border-ink/10 bg-paper p-5 shadow-soft">
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
      <h3 className="mt-4 text-2xl font-bold leading-tight text-ink">{itinerary.title}</h3>
      <p className="mt-2 flex items-center gap-2 text-sm font-semibold text-ember">
        <MapPinned aria-hidden="true" size={16} />
        {itinerary.cities.join(" + ")}
      </p>
      <p className="mt-4 flex-1 text-base text-ink/68">{itinerary.summary}</p>
      <Link
        href={`/itineraries/${itinerary.slug}`}
        className="mt-5 inline-flex min-h-11 items-center justify-center rounded-md border border-ember bg-paper px-4 py-2 text-base font-semibold text-ember transition hover:bg-ember hover:text-white"
      >
        Open itinerary
      </Link>
    </article>
  );
}
