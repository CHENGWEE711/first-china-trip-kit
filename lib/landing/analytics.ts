"use client";

import type { LandingCtaName, LandingName } from "@/data/landings";
import { trackEvent } from "@/lib/analytics";

export type LandingAnalyticsEventName =
  | "landing_view"
  | "landing_cta_clicked"
  | "landing_checklist_download"
  | "landing_hub_clicked"
  | "landing_newsletter_signup";

export type LandingTrafficSource =
  | "direct"
  | "instagram"
  | "threads"
  | "bluesky"
  | "pinterest"
  | "tiktok"
  | "youtube"
  | "newsletter"
  | "metricool"
  | "facebook"
  | "google"
  | "social"
  | "other";

export type LandingInteractionType = "view" | "click" | "download" | "success";

export type LandingAnalyticsParams = {
  landing_name?: LandingName;
  traffic_source?: LandingTrafficSource;
  cta_name?: LandingCtaName | "submit_checklist_signup";
  interaction_type?: LandingInteractionType;
};

const landingNames = new Set<LandingName>([
  "pay_in_china",
  "china_visa_free",
  "china_checklist",
]);

const trafficSources = new Set<LandingTrafficSource>([
  "direct",
  "instagram",
  "threads",
  "bluesky",
  "pinterest",
  "tiktok",
  "youtube",
  "newsletter",
  "metricool",
  "facebook",
  "google",
  "social",
  "other",
]);

const ctaNames = new Set<NonNullable<LandingAnalyticsParams["cta_name"]>>([
  "open_payments_hub",
  "download_checklist",
  "check_my_route",
  "read_visa_guide",
  "open_checklist_signup",
  "explore_start_here",
  "open_related_guide",
  "submit_checklist_signup",
]);

const interactionTypes = new Set<LandingInteractionType>([
  "view",
  "click",
  "download",
  "success",
]);

const sourceAliases: Record<string, LandingTrafficSource> = {
  instagram: "instagram",
  ig: "instagram",
  threads: "threads",
  bluesky: "bluesky",
  bsky: "bluesky",
  pinterest: "pinterest",
  tiktok: "tiktok",
  youtube: "youtube",
  yt: "youtube",
  newsletter: "newsletter",
  email: "newsletter",
  metricool: "metricool",
  facebook: "facebook",
  fb: "facebook",
  google: "google",
  social: "social",
};

export function sanitizeLandingAnalyticsParams(
  params: unknown,
): LandingAnalyticsParams {
  if (!params || typeof params !== "object" || Array.isArray(params)) return {};

  const candidate = params as Record<string, unknown>;
  const safe: LandingAnalyticsParams = {};

  if (
    typeof candidate.landing_name === "string" &&
    landingNames.has(candidate.landing_name as LandingName)
  ) {
    safe.landing_name = candidate.landing_name as LandingName;
  }

  if (
    typeof candidate.traffic_source === "string" &&
    trafficSources.has(candidate.traffic_source as LandingTrafficSource)
  ) {
    safe.traffic_source = candidate.traffic_source as LandingTrafficSource;
  }

  if (
    typeof candidate.cta_name === "string" &&
    ctaNames.has(candidate.cta_name as NonNullable<LandingAnalyticsParams["cta_name"]>)
  ) {
    safe.cta_name = candidate.cta_name as NonNullable<LandingAnalyticsParams["cta_name"]>;
  }

  if (
    typeof candidate.interaction_type === "string" &&
    interactionTypes.has(candidate.interaction_type as LandingInteractionType)
  ) {
    safe.interaction_type = candidate.interaction_type as LandingInteractionType;
  }

  return safe;
}

export function resolveLandingTrafficSource(search = ""): LandingTrafficSource {
  const rawSource = new URLSearchParams(search).get("utm_source")?.trim().toLowerCase();
  if (!rawSource) return "direct";
  return sourceAliases[rawSource] || "other";
}

export function trackLandingEvent(
  eventName: LandingAnalyticsEventName,
  params: LandingAnalyticsParams = {},
) {
  trackEvent(eventName, sanitizeLandingAnalyticsParams(params));
}
