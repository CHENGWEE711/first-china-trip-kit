"use client";

import { useEffect, useRef } from "react";
import { trackEvent } from "@/lib/analytics";

type ProductPageViewProps = {
  eventName: "payment_guide_viewed" | "arrival_bundle_viewed";
  productId: string;
  placement: string;
};

export function ProductPageView({ eventName, productId, placement }: ProductPageViewProps) {
  const tracked = useRef(false);

  useEffect(() => {
    if (tracked.current) return;
    tracked.current = true;
    trackEvent(eventName, {
      source_page: window.location.pathname,
      product_id: productId,
      placement,
    });
  }, [eventName, placement, productId]);

  return null;
}
