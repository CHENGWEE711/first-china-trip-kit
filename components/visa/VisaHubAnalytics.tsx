"use client";

import { useEffect, useRef } from "react";
import { VISA_POLICY_META } from "@/data/visa";
import { trackVisaEvent } from "@/lib/visa/analytics";

export function VisaHubAnalytics() {
  const trackedRef = useRef(false);

  useEffect(() => {
    if (trackedRef.current) return;
    trackedRef.current = true;
    trackVisaEvent("visa_hub_view", {
      interaction_type: "open",
      policy_version: VISA_POLICY_META.policyVersion,
    });
  }, []);

  return null;
}
