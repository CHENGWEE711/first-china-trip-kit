/**
 * Human-reviewed policy dataset version.
 *
 * The three policy surfaces intentionally keep separate effective dates:
 * Indonesia changed the transit-country list, the Guangdong expansion changed
 * the port list, and the unilateral list has its own compilation date.
 */
export const VISA_POLICY_VERSION = {
  id: "2026-07-19-v1",
  verifiedAt: "2026-07-19",
  transitCountriesEffectiveFrom: "2025-06-12",
  transitPortsEffectiveFrom: "2025-11-05",
  unilateralListAsOf: "2026-02-17",
} as const;
