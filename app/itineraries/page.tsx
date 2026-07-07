import type { Metadata } from "next";
import { ItineraryCard } from "@/components/ItineraryCard";
import { PageIntro } from "@/components/PageIntro";
import { itineraries } from "@/data/itineraries";
import { buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: "China Itineraries by Trip Length | First China Trip Kit",
  description:
    "Browse ready-to-use China itineraries for Shanghai, Beijing, Xi'an, Hangzhou, Suzhou, and visa-free transit routes.",
  path: "/itineraries",
});

export default function ItinerariesPage() {
  return (
    <>
      <PageIntro
        eyebrow="Itineraries"
        title="China routes you can use as a first draft"
        description="Choose a route by trip length and theme, then adjust hotel areas, train times, and dining stops around your own travel style."
      />
      <section className="px-4 py-12">
        <div className="mx-auto grid max-w-7xl gap-5 md:grid-cols-2 xl:grid-cols-3">
          {itineraries.map((itinerary) => (
            <ItineraryCard key={itinerary.id} itinerary={itinerary} />
          ))}
        </div>
      </section>
    </>
  );
}
