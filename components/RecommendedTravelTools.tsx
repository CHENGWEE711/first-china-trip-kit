import { AffiliateCard } from "@/components/AffiliateCard";
import { AffiliateDisclosureNote } from "@/components/AffiliateDisclosureNote";
import { SectionHeader } from "@/components/SectionHeader";
import { affiliatePartnerOrder, getAffiliatePartner } from "@/config/affiliate";

export function RecommendedTravelTools() {
  const hasEnabledPartner = affiliatePartnerOrder.some(
    (partner) => getAffiliatePartner(partner).enabled,
  );

  return (
    <section className="bg-mist px-4 py-12">
      <div className="mx-auto max-w-7xl">
        <SectionHeader
          eyebrow="Recommended travel tools"
          title="Practical bookings to prepare before you fly"
          description="Use these categories when you are ready to compare mobile data, accommodation, bookable activities, or travel insurance for your own route."
          actionHref="/travel-tools"
          actionLabel="View all travel tools"
        />
        {hasEnabledPartner ? (
          <AffiliateDisclosureNote className="mb-5 max-w-3xl" />
        ) : null}
        <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
          <AffiliateCard
            anchorId="recommended-china-esim"
            partner="airalo"
            title="Get a China eSIM"
            label="Explore eSIM options"
            placement="home_recommended_tools"
            sourcePage="/"
            fallbackHref="/travel-tools#china-esim"
          />
          <AffiliateCard
            anchorId="recommended-hotels"
            partner="booking"
            title="Find Hotels in China"
            label="Explore hotel planning"
            placement="home_recommended_tools"
            sourcePage="/"
            fallbackHref="/travel-tools#hotels-in-china"
          />
          <AffiliateCard
            anchorId="recommended-tours"
            partner="klook"
            title="Book Tours & Tickets"
            label="Explore tours and tickets"
            placement="home_recommended_tools"
            sourcePage="/"
            fallbackHref="/travel-tools#china-tours-tickets"
          />
          <AffiliateCard
            anchorId="recommended-travel-insurance"
            partner="safetywing"
            title="Get Travel Insurance"
            label="Explore insurance planning"
            placement="home_recommended_tools"
            sourcePage="/"
            fallbackHref="/travel-tools#china-travel-insurance"
          />
        </div>
      </div>
    </section>
  );
}
