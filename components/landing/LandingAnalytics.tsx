"use client";

import { useEffect, useRef } from "react";
import type { LandingName } from "@/data/landings";
import {
  resolveLandingTrafficSource,
  trackLandingEvent,
} from "@/lib/landing/analytics";

export function LandingAnalytics({ landingName }: { landingName: LandingName }) {
  const trackedLandingRef = useRef<LandingName | null>(null);

  useEffect(() => {
    if (trackedLandingRef.current === landingName) return;
    trackedLandingRef.current = landingName;

    trackLandingEvent("landing_view", {
      landing_name: landingName,
      traffic_source: resolveLandingTrafficSource(window.location.search),
      interaction_type: "view",
    });
  }, [landingName]);

  return null;
}
