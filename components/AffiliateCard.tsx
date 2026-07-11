import {
  BedDouble,
  ExternalLink,
  ShieldCheck,
  Smartphone,
  TicketCheck,
} from "lucide-react";
import { AffiliateLink } from "@/components/AffiliateLink";
import {
  getAffiliatePartner,
  resolveAffiliateUrl,
  type AffiliatePartnerKey,
} from "@/config/affiliate";

const icons = {
  airalo: Smartphone,
  booking: BedDouble,
  klook: TicketCheck,
  safetywing: ShieldCheck,
};

const partnerNames = {
  airalo: "Airalo",
  booking: "Booking.com",
  klook: "Klook",
  safetywing: "SafetyWing",
};

type AffiliateCardProps = {
  anchorId?: string;
  affiliateUrl?: string;
  partner: AffiliatePartnerKey;
  title?: string;
  description?: string;
  label?: string;
  offerName?: string;
  offerType?: string;
  campaign?: string;
  placement: string;
  sourcePage: string;
  fallbackHref?: string;
};

export function AffiliateCard({
  anchorId,
  affiliateUrl,
  partner,
  title,
  description,
  label,
  offerName,
  offerType,
  campaign,
  placement,
  sourcePage,
  fallbackHref,
}: AffiliateCardProps) {
  const config = getAffiliatePartner(partner);
  const resolvedAffiliateUrl = resolveAffiliateUrl(partner, affiliateUrl);
  const Icon = icons[partner];
  const heading = title || config.label;

  return (
    <article
      id={anchorId}
      className="flex h-full scroll-mt-28 flex-col rounded-lg border border-ink/10 bg-paper p-5 shadow-soft"
    >
      <span className="grid h-11 w-11 place-items-center rounded-md bg-sand text-ember">
        <Icon aria-hidden="true" size={22} />
      </span>
      <h2 className="mt-5 text-2xl font-bold leading-tight text-ink">{heading}</h2>
      <p className="mt-3 flex-1 text-base leading-relaxed text-ink/68">
        {description || config.description}
      </p>
      <div className="mt-5">
        <AffiliateLink
          partner={partner}
          affiliateUrl={affiliateUrl}
          label={label}
          offerName={offerName}
          offerType={offerType}
          campaign={campaign}
          placement={placement}
          sourcePage={sourcePage}
          fallbackHref={fallbackHref}
          className="w-full bg-ember text-white shadow-soft hover:bg-[#982F28]"
        >
          <span className="inline-flex items-center gap-2">
            {label || config.label}
            {resolvedAffiliateUrl ? <ExternalLink aria-hidden="true" size={17} /> : null}
          </span>
        </AffiliateLink>
      </div>
      {resolvedAffiliateUrl ? (
        <p className="mt-3 text-xs font-semibold uppercase text-ink/42">
          Affiliate partner · {partnerNames[partner]}
        </p>
      ) : (
        <p className="mt-3 text-xs leading-relaxed text-ink/48">
          A verified partner link has not been configured yet.
        </p>
      )}
    </article>
  );
}
