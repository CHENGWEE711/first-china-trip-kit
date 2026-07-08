"use client";

import { trackEvent } from "@/lib/analytics";
import { cn } from "@/lib/utils";

type ProductActionButtonProps = {
  canBuy: boolean;
  className?: string;
  href: string;
  label: string;
  productId: string;
  download?: boolean;
  eventName?: string;
  eventNames?: string[];
  isExternal?: boolean;
};

export function ProductActionButton({
  canBuy,
  className,
  download = false,
  eventName,
  eventNames,
  href,
  label,
  productId,
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
        trackedEvents.forEach((trackedEvent) =>
          trackEvent(trackedEvent, {
            product_id: productId,
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
