import type { Metadata } from "next";
import { ButtonLink } from "@/components/ButtonLink";
import { PageIntro } from "@/components/PageIntro";
import { buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: "Custom China Itinerary Request | First China Trip Kit",
  description:
    "Request a custom China itinerary plan for first-time travel, visa-free routes, family trips, food-focused routes, and city combinations.",
  path: "/custom-itinerary",
});

const requestTypes = [
  "A first China trip with limited time and a clear arrival city.",
  "A 240-hour visa-free route that needs careful city and timing choices.",
  "A food, family, rail, or low-stress itinerary built around your travel style.",
  "A route review when you already have cities booked but want the days cleaned up.",
];

export default function CustomItineraryPage() {
  return (
    <>
      <PageIntro
        eyebrow="Custom itinerary"
        title="Request a custom China itinerary"
        description="Share your dates, arrival city, budget style, and travel pace, and First China Trip Kit can help shape a practical route outline."
      />
      <section className="px-4 py-12">
        <div className="mx-auto grid max-w-7xl gap-6 lg:grid-cols-[1fr_0.85fr]">
          <section className="rounded-lg border border-ink/10 bg-paper p-5 shadow-soft">
            <h2 className="text-2xl font-bold leading-tight text-ink">Best for</h2>
            <ul className="mt-5 grid gap-3 text-base text-ink/70">
              {requestTypes.map((item) => (
                <li key={item} className="border-l-2 border-ember/35 pl-3">
                  {item}
                </li>
              ))}
            </ul>
          </section>
          <section className="rounded-lg border border-ink/10 bg-ink p-5 text-white shadow-soft">
            <h2 className="text-2xl font-bold leading-tight">Send your route details</h2>
            <p className="mt-3 text-base text-white/72">
              Include your travel dates, arrival and departure cities, nationality if
              the route involves visa-free transit, preferred pace, must-see cities,
              and any food, hotel, or mobility needs.
            </p>
            <div className="mt-6 flex flex-col gap-3 sm:flex-row">
              <ButtonLink href="/contact">Contact the team</ButtonLink>
              <ButtonLink href="/itinerary-kits" variant="secondary">
                Browse routes
              </ButtonLink>
            </div>
          </section>
        </div>
      </section>
    </>
  );
}
