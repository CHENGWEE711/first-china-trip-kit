"use client";

import { useEffect } from "react";
import { trackEvent } from "@/lib/analytics";

export function ProductSuccessPageView() {
  useEffect(() => {
    trackEvent("product_success_page_viewed", {
      product_id: "china-payment-apps-setup-guide",
    });
  }, []);

  return null;
}
