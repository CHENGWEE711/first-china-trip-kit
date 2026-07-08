"use client";

import { trackEvent } from "@/lib/analytics";

type ProductActionButtonProps = {
  canBuy: boolean;
  href: string;
  label: string;
  productId: string;
  isExternal?: boolean;
};

export function ProductActionButton({
  canBuy,
  href,
  label,
  productId,
  isExternal = false,
}: ProductActionButtonProps) {
  return (
    <a
      href={href}
      target={isExternal ? "_blank" : undefined}
      rel={isExternal ? "noreferrer" : undefined}
      onClick={() =>
        trackEvent(canBuy ? "payment_apps_guide_buy_clicked" : "store_waitlist_clicked", {
          product_id: productId,
        })
      }
      className="mt-5 inline-flex min-h-11 items-center justify-center rounded-md bg-ember px-4 py-2 text-base font-semibold text-white transition hover:bg-[#982F28]"
    >
      {label}
    </a>
  );
}
