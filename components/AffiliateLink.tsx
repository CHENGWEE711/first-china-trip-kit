"use client";

import Link from "next/link";
import type { ReactNode } from "react";
import {
  getAffiliatePartner,
  resolveAffiliateUrl,
  type AffiliatePartnerKey,
} from "@/config/affiliate";
import { trackEvent } from "@/lib/analytics";
import { cn } from "@/lib/utils";

type AffiliateLinkProps = {
  partner: AffiliatePartnerKey;
  children?: ReactNode;
  ariaLabel?: string;
  affiliateUrl?: string;
  campaign?: string;
  className?: string;
  fallbackHref?: string;
  label?: string;
  offerName?: string;
  offerType?: string;
  placement: string;
  sourcePage: string;
};

export function AffiliateLink({
  partner,
  children,
  ariaLabel,
  affiliateUrl,
  campaign,
  className,
  fallbackHref,
  label,
  offerName,
  offerType,
  placement,
  sourcePage,
}: AffiliateLinkProps) {
  const config = getAffiliatePartner(partner);
  const resolvedAffiliateUrl = resolveAffiliateUrl(partner, affiliateUrl);
  const linkLabel = label || config.label;
  const content = children || linkLabel;
  const sharedClassName = cn(
    "inline-flex min-h-11 items-center justify-center rounded-md px-5 py-3 text-center text-base font-semibold transition focus:outline-none focus:ring-2 focus:ring-ember focus:ring-offset-2",
    className,
  );

  if (resolvedAffiliateUrl) {
    return (
      <a
        href={resolvedAffiliateUrl}
        target="_blank"
        rel={
          partner === "klook"
            ? "sponsored noopener noreferrer"
            : "sponsored nofollow noopener noreferrer"
        }
        aria-label={ariaLabel || `${linkLabel} (opens in a new tab)`}
        className={sharedClassName}
        onClick={() => {
          trackEvent("affiliate_link_clicked", {
            partner_name: config.partner,
            destination_type: "affiliate",
            offer_type: offerType || config.category,
            offer_name: offerName || linkLabel,
            source_page: sourcePage,
            placement,
            campaign: campaign || config.campaign,
          });
        }}
      >
        {content}
      </a>
    );
  }

  if (fallbackHref) {
    return (
      <Link
        href={fallbackHref}
        aria-label={ariaLabel || linkLabel}
        className={sharedClassName}
      >
        {content}
      </Link>
    );
  }

  return null;
}
