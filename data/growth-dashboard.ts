export type GrowthMetric = "users" | "sessions" | "searchClicks" | "searchImpressions" | "toolStarts" | "toolCompletions" | "emailLeads" | "productClicks" | "orders" | "affiliateClicks";

export type GrowthWeek = {
  weekEnding: string;
  sourceStatus: "awaiting-verified-import" | "verified";
  metrics: Record<GrowthMetric, number | null>;
  topQueries: { query: string; clicks: number; impressions: number }[];
  topLandingPages: { path: string; users: number; sessions: number; searchClicks: number }[];
  channels: { channel: string; users: number; sessions: number }[];
  note?: string;
};

// Replace this record only with approved weekly GA4, Search Console, Payhip and affiliate exports.
// Null deliberately means "not verified yet" - it is never rendered as zero.
export const latestGrowthWeek: GrowthWeek = {
  weekEnding: "2026-08-02",
  sourceStatus: "awaiting-verified-import",
  metrics: {
    users: null,
    sessions: null,
    searchClicks: null,
    searchImpressions: null,
    toolStarts: null,
    toolCompletions: null,
    emailLeads: null,
    productClicks: null,
    orders: null,
    affiliateClicks: null,
  },
  topQueries: [],
  topLandingPages: [],
  channels: [],
  note: "No verified GA4, Search Console, Payhip or affiliate export has been imported for this week.",
};

export const previousGrowthWeek: GrowthWeek | null = null;

export function safeRate(numerator: number | null, denominator: number | null): number | null {
  if (numerator === null || denominator === null || denominator <= 0) return null;
  return (numerator / denominator) * 100;
}

export function weekChange(current: number | null, previous: number | null): number | null {
  if (current === null || previous === null || previous === 0) return null;
  return ((current - previous) / previous) * 100;
}
