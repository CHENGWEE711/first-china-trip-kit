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
  disabledLabel?: string;
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
  disabledLabel = "Coming soon",
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
          trackEvent("affiliate_click", {
            affiliate_partner: config.partner,
            affiliate_category: config.category,
            affiliate_campaign: campaign || config.campaign,
            link_label: linkLabel,
            link_position: placement,
            page_location: window.location.href,
            page_path: window.location.pathname,
            source_page: sourcePage,
            destination_url: resolvedAffiliateUrl,
          });
          if (partner === "klook") {
            trackEvent("affiliate_klook_clicked", {
              partner: "klook",
              source_page: sourcePage,
              placement,
              destination: resolvedAffiliateUrl,
              offer_type: offerType || config.category,
              offer_name: offerName || linkLabel,
            });
          }
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

  return (
    <span
      aria-disabled="true"
      title="A verified partner link has not been configured yet."
      className={cn(
        sharedClassName,
        "cursor-not-allowed !border !border-ink/12 !bg-sand !text-ink/55 !shadow-none",
      )}
    >
      {disabledLabel}
    </span>
  );
}
