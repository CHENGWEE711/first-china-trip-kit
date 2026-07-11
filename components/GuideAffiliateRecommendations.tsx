import { AffiliateCard } from "@/components/AffiliateCard";
import { AffiliateDisclosureNote } from "@/components/AffiliateDisclosureNote";
import type { AffiliatePartnerKey } from "@/config/affiliate";
import { getAffiliatePartner } from "@/config/affiliate";

const recommendations: Record<
  string,
  { partner: AffiliatePartnerKey; title: string; description: string; label: string }[]
> = {
  "china-esim-guide-for-tourists": [
    {
      partner: "airalo",
      title: "Compare eSIM options before arrival",
      description:
        "A pre-arrival eSIM may help you use maps, translation, and payment tools as soon as mobile data is active. Check coverage, device compatibility, and activation terms before buying.",
      label: "Check China eSIM Plans",
    },
  ],
  "best-apps-for-traveling-in-china": [
    {
      partner: "airalo",
      title: "Prepare the connection behind your app stack",
      description:
        "Most first-day apps depend on mobile data. Compare eSIM plans before departure and keep offline screenshots as a backup.",
      label: "Check China eSIM Plans",
    },
  ],
  "how-to-pay-in-china-as-a-foreigner": [
    {
      partner: "airalo",
      title: "Keep a mobile-data backup for QR payments",
      description:
        "Payment apps may need a working connection. Review eSIM options before departure, then carry cash and a physical card in case data or app verification fails.",
      label: "Check China eSIM Plans",
    },
  ],
  "china-travel-checklist-before-you-fly": [
    {
      partner: "airalo",
      title: "Prepare mobile data",
      description:
        "Compare eSIM options before departure and confirm device compatibility, coverage, activation, and a no-internet backup.",
      label: "Check China eSIM Plans",
    },
    {
      partner: "booking",
      title: "Confirm your first hotel",
      description:
        "Choose a practical arrival base, then save the hotel name, Chinese address, and phone number offline.",
      label: "Find Hotels in China",
    },
    {
      partner: "safetywing",
      title: "Review travel insurance",
      description:
        "Compare coverage and exclusions for your own route before departure. Availability and policy terms may vary.",
      label: "View Travel Insurance Options",
    },
  ],
};

export function GuideAffiliateRecommendations({ guideSlug }: { guideSlug: string }) {
  const items = recommendations[guideSlug];
  if (!items?.length) return null;
  const hasEnabledPartner = items.some((item) => getAffiliatePartner(item.partner).enabled);

  return (
    <section className="bg-mist px-4 py-12">
      <div className="mx-auto max-w-5xl">
        <p className="mb-2 text-sm font-bold uppercase text-ember">Relevant travel tools</p>
        <h2 className="text-3xl font-bold leading-tight text-ink">
          Prepare the practical next step
        </h2>
        <p className="mt-3 max-w-3xl text-base leading-relaxed text-ink/68">
          These recommendations match the setup described in this guide. Compare the
          provider details with your own device, route, dates, and coverage needs.
        </p>
        {hasEnabledPartner ? (
          <AffiliateDisclosureNote className="mt-4 max-w-3xl" />
        ) : null}
        <div className="mt-6 grid gap-5 md:grid-cols-3">
          {items.map((item) => (
            <AffiliateCard
              key={`${guideSlug}-${item.partner}`}
              {...item}
              placement="guide_contextual_recommendation"
              sourcePage={`/guides/${guideSlug}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
