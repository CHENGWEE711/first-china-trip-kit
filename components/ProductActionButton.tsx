"use client";

import { trackEvent } from "@/lib/analytics";
import { buildUtmUrl, getStoredUtmAttribution } from "@/lib/utm";
import { cn } from "@/lib/utils";

type ProductActionButtonProps = {
  analyticsParams?: Record<string, string | number | boolean | undefined>;
  canBuy: boolean;
  className?: string;
  href: string;
  label: string;
  productId: string;
  placement?: string;
  download?: boolean;
  eventName?: string;
  eventNames?: string[];
  isExternal?: boolean;
};

export function ProductActionButton({
  analyticsParams,
  canBuy,
  className,
  download = false,
  eventName,
  eventNames,
  href,
  label,
  productId,
  placement = "product_action",
  isExternal = false,
}: ProductActionButtonProps) {
  if (!canBuy) {
    return null;
  }

  const trackedEvents =
    eventNames ||
    [eventName || (canBuy ? "payment_apps_guide_buy_clicked" : "store_waitlist_clicked")];
  const trackedHref =
    isExternal && /^https:\/\/(?:www\.)?payhip\.com\//i.test(href)
      ? buildUtmUrl(href, {
          utm_source: "firstchinatripkit",
          utm_medium: "website",
          utm_content: `${placement}_${productId}`,
        })
      : href;

  return (
    <a
      href={trackedHref}
      download={download}
      target={isExternal ? "_blank" : undefined}
      rel={isExternal ? "noopener noreferrer" : undefined}
      onClick={() => {
        const product =
          productId === "china-payment-apps-setup-guide"
            ? "China Payment & Apps Setup Guide"
            : productId === "china-first-trip-checklist"
              ? "China First Trip Checklist"
              : productId;

        trackedEvents.forEach((trackedEvent) =>
          trackEvent(trackedEvent, {
            source_page: window.location.pathname,
            destination_url: trackedHref,
            placement,
            product_id: productId,
            product,
            ...(productId === "china-payment-apps-setup-guide" ? { price: "7" } : {}),
            ...getStoredUtmAttribution(),
            ...analyticsParams,
          }),
        );
      }}
      className={cn(
        "inline-flex min-h-11 w-full items-center justify-center rounded-md bg-ember px-5 py-3 text-center text-[15px] font-semibold text-white shadow-soft transition hover:bg-ember-hover focus-visible:ring-2 focus-visible:ring-ember focus-visible:ring-offset-2 sm:w-fit",
        className,
      )}
    >
      {label}
    </a>
  );
}
