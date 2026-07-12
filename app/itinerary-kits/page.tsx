import type { Metadata } from "next";
import { ItineraryCard } from "@/components/ItineraryCard";
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
            <ItineraryCard key={itinerary.id} itinerary={itinerary} />
          ))}
        </div>
      </section>
    </>
  );
}
