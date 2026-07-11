"use client";

import { trackEvent } from "@/lib/analytics";
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
  const trackedEvents =
    eventNames ||
    [eventName || (canBuy ? "payment_apps_guide_buy_clicked" : "store_waitlist_clicked")];

  return (
    <a
      href={href}
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
            placement,
            product_id: productId,
            product,
            ...(productId === "china-payment-apps-setup-guide" ? { price: "7" } : {}),
            ...analyticsParams,
          }),
        );
      }}
      className={cn(
        "inline-flex min-h-11 w-full items-center justify-center rounded-md bg-ember px-4 py-2 text-center text-base font-semibold text-white transition hover:bg-[#982F28] sm:w-fit",
        className,
      )}
    >
      {label}
    </a>
  );
}
