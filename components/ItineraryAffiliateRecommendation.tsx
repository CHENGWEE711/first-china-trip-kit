import { AffiliateCard } from "@/components/AffiliateCard";
import { AffiliateDisclosureNote } from "@/components/AffiliateDisclosureNote";
import { getAffiliatePartner } from "@/config/affiliate";

export function ItineraryAffiliateRecommendation({
  itinerarySlug,
  itineraryTitle,
}: {
  itinerarySlug: string;
  itineraryTitle: string;
}) {
  if (!getAffiliatePartner("klook").enabled) return null;

  return (
    <section className="bg-mist px-4 py-12">
      <div className="mx-auto max-w-5xl">
        <p className="mb-2 text-sm font-bold uppercase text-ember">Bookable route options</p>
        <h2 className="text-3xl font-bold leading-tight text-ink">
          Compare tickets and transfers for this itinerary
        </h2>
        <p className="mt-3 max-w-3xl text-base leading-relaxed text-ink/68">
          Check dates, meeting points, cancellation terms, passport requirements, and
          travel time before adding a paid activity to your route.
        </p>
        <AffiliateDisclosureNote className="mt-4 max-w-3xl" />
        <div className="mt-6 max-w-xl">
          <AffiliateCard
            partner="klook"
            title="Tours, tickets, and airport transfers"
            label="Browse Route Activities"
            description={`Compare bookable options that may fit ${itineraryTitle}. Keep enough buffer for station transfers, weather, and arrival delays.`}
            campaign={`${itinerarySlug}_itinerary_planning`}
            placement="itinerary_booking_recommendation"
            sourcePage={`/itinerary-kits/${itinerarySlug}`}
            offerType="itinerary_tours_tickets"
            offerName={`${itineraryTitle} activities and transfers`}
          />
        </div>
      </div>
    </section>
  );
}
