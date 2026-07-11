"use client";

type AnalyticsParams = Record<string, string | number | boolean | undefined>;

declare global {
  interface Window {
    dataLayer?: Array<Record<string, unknown>>;
    gtag?: (command: "event", eventName: string, params?: AnalyticsParams) => void;
  }
}

export function trackEvent(eventName: string, params: AnalyticsParams = {}) {
  if (typeof window === "undefined") {
    return;
  }

  if (process.env.NEXT_PUBLIC_ANALYTICS_DEBUG === "true") {
    console.info("[analytics]", eventName, params);
  }

  if (window.gtag) {
    window.gtag("event", eventName, params);
    return;
  }

  window.dataLayer?.push({ event: eventName, ...params });
}
