import { AffiliateCard } from "@/components/AffiliateCard";
import { AffiliateDisclosureNote } from "@/components/AffiliateDisclosureNote";
import { getAffiliatePartner, getKlookCityAffiliateUrl } from "@/config/affiliate";

const supportedCities = new Set(["beijing", "shanghai", "xian", "chengdu"]);

export function CityPlanYourStay({ cityName, citySlug }: { cityName: string; citySlug: string }) {
  if (!supportedCities.has(citySlug)) return null;

  const campaign = `${citySlug}_city_kit_planning`;
  const sourcePage = `/city-kits/${citySlug}`;
  const klookCityAffiliateUrl = getKlookCityAffiliateUrl(citySlug);
  const hasEnabledPartner = ["booking", "klook", "airalo"].some((partner) =>
    getAffiliatePartner(partner as "booking" | "klook" | "airalo").enabled,
  );

  return (
    <section className="bg-mist px-4 py-12">
      <div className="mx-auto max-w-7xl">
        <p className="mb-2 text-sm font-bold uppercase text-ember">Plan your stay</p>
        <h2 className="text-3xl font-bold leading-tight text-ink">
          Practical booking categories for {cityName}
        </h2>
        <p className="mt-3 max-w-3xl text-base leading-relaxed text-ink/68">
          Compare options only after your dates and arrival station are clear. Save every
          confirmed address and booking reference offline before the trip.
        </p>
        {hasEnabledPartner ? (
          <AffiliateDisclosureNote className="mt-4 max-w-3xl" />
        ) : null}
        <div className="mt-6 grid gap-5 md:grid-cols-2 xl:grid-cols-4">
          <AffiliateCard
            partner="booking"
            title={`Where to stay in ${cityName}`}
            label={`Find Hotels in ${cityName}`}
            description={`Compare hotel areas in ${cityName}, then save the confirmed Chinese address and phone number for arrival day.`}
            campaign={campaign}
            placement="city_plan_your_stay"
            sourcePage={sourcePage}
          />
          <AffiliateCard
            partner="klook"
            affiliateUrl={klookCityAffiliateUrl}
            title="Tours & tickets"
            label={`Browse ${cityName} Tours & Tickets`}
            description="Compare attraction tickets and guided experiences that fit your daily route and booking requirements."
            offerType="attraction_tickets"
            offerName={`${cityName} tours and attraction tickets`}
            campaign={campaign}
            placement="city_plan_your_stay"
            sourcePage={sourcePage}
          />
          <AffiliateCard
            partner="klook"
            affiliateUrl={klookCityAffiliateUrl}
            title="Airport transfers"
            label="Check Airport Transfer Options"
            description="Review pickup details, luggage limits, cancellation terms, and your exact arrival terminal before booking."
            offerType="airport_transfer"
            offerName={`${cityName} airport transfer options`}
            campaign={campaign}
            placement="city_plan_your_stay"
            sourcePage={sourcePage}
          />
          <AffiliateCard
            partner="airalo"
            title="Travel essentials"
            label="Check China eSIM Plans"
            description="Compare mobile-data options so you can access maps and saved booking details after arrival. Keep an offline backup too."
            campaign={campaign}
            placement="city_plan_your_stay"
            sourcePage={sourcePage}
          />
        </div>
      </div>
    </section>
  );
}
