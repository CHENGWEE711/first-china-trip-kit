import {
  VISA_OFFICIAL_SOURCE_URLS,
  VISA_POLICY_LAST_VERIFIED_AT,
} from "./official-sources";

export type VisaPolicyMeta = {
  id: string;
  policyName: string;
  policyVersion: string;
  effectiveFrom: string;
  lastVerifiedAt: string;
  nextReviewDue: string;
  authority: string;
  officialSourceUrls: string[];
  eligibleCountryCount: number;
  eligiblePortCount: number;
  provinceLevelRegionCount: number;
  transitDurationHours: number;
  passportMinimumValidityMonths: number;
  status: "current" | "review-due" | "superseded";
};

export const VISA_POLICY_META: VisaPolicyMeta = {
  id: "china-240-hour-visa-free-transit",
  policyName: "China 240-Hour Visa-Free Transit Policy",
  // Internal dataset version keyed to the latest substantive port change.
  policyVersion: "2025-11-05",
  effectiveFrom: "2025-11-05",
  lastVerifiedAt: VISA_POLICY_LAST_VERIFIED_AT,
  nextReviewDue: "2026-08-18",
  authority: "National Immigration Administration of China",
  officialSourceUrls: [
    VISA_OFFICIAL_SOURCE_URLS.currentPolicyAnnouncement,
    VISA_OFFICIAL_SOURCE_URLS.currentTransitPolicyInterpretation,
    VISA_OFFICIAL_SOURCE_URLS.currentTransitPolicyInterpretationZh,
  ],
  eligibleCountryCount: 55,
  eligiblePortCount: 65,
  provinceLevelRegionCount: 24,
  transitDurationHours: 240,
  passportMinimumValidityMonths: 3,
  status: "current",
};

const MS_PER_DAY = 24 * 60 * 60 * 1000;

function parseIsoDateAtUtcMidnight(value: string): number {
  const timestamp = Date.parse(`${value}T00:00:00.000Z`);

  if (Number.isNaN(timestamp)) {
    throw new Error(`Invalid visa policy ISO date: ${value}`);
  }

  return timestamp;
}

export function daysSinceVisaPolicyVerification(
  referenceDate: Date = new Date(),
  meta: VisaPolicyMeta = VISA_POLICY_META,
): number {
  return Math.floor(
    (referenceDate.getTime() - parseIsoDateAtUtcMidnight(meta.lastVerifiedAt)) /
      MS_PER_DAY,
  );
}

export function isVisaPolicyReviewOverdue(
  referenceDate: Date = new Date(),
  meta: VisaPolicyMeta = VISA_POLICY_META,
): boolean {
  const nextReviewDue = parseIsoDateAtUtcMidnight(meta.nextReviewDue);

  return (
    daysSinceVisaPolicyVerification(referenceDate, meta) > 30 ||
    referenceDate.getTime() > nextReviewDue
  );
}

export function getVisaPolicyReviewWarning(
  referenceDate: Date = new Date(),
  meta: VisaPolicyMeta = VISA_POLICY_META,
): string | null {
  if (!isVisaPolicyReviewOverdue(referenceDate, meta)) {
    return null;
  }

  return `Visa policy data review is overdue. Last verified: ${meta.lastVerifiedAt}; next review due: ${meta.nextReviewDue}.`;
}

// Imported server-side during a Next.js build. This remains non-blocking by
// design: stale policy data produces a visible warning instead of taking the
// public page offline.
export const VISA_POLICY_REVIEW_WARNING = getVisaPolicyReviewWarning();

if (
  typeof window === "undefined" &&
  process.env.NODE_ENV !== "test" &&
  VISA_POLICY_REVIEW_WARNING
) {
  console.warn(VISA_POLICY_REVIEW_WARNING);
}
