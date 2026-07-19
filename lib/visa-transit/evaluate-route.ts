import {
  PERMITTED_STAY_AREA_GROUPS,
  TRANSIT_ELIGIBLE_COUNTRY_RECORDS,
  TRANSIT_PORTS,
  UNILATERAL_VISA_FREE_COUNTRIES,
  VISA_POLICY_META,
} from "@/data/visa";
import {
  evaluateTransitEligibility,
  type TransitCheckerInput,
  type TransitCheckerResult,
} from "@/lib/visa/evaluate-transit-eligibility";

export type VisaRoutePolicyData = {
  policyVersion: string;
  transitCountries: typeof TRANSIT_ELIGIBLE_COUNTRY_RECORDS;
  transitPorts: typeof TRANSIT_PORTS;
  permittedAreas: typeof PERMITTED_STAY_AREA_GROUPS;
  unilateralCountries: typeof UNILATERAL_VISA_FREE_COUNTRIES;
};

export const CURRENT_VISA_ROUTE_POLICY_DATA: VisaRoutePolicyData = {
  policyVersion: VISA_POLICY_META.policyVersion,
  transitCountries: TRANSIT_ELIGIBLE_COUNTRY_RECORDS,
  transitPorts: TRANSIT_PORTS,
  permittedAreas: PERMITTED_STAY_AREA_GROUPS,
  unilateralCountries: UNILATERAL_VISA_FREE_COUNTRIES,
};

/**
 * Privacy-safe, deterministic route screening. The policy-data argument makes
 * the version used by a caller explicit; the current implementation only
 * accepts the verified build-time dataset rather than silently evaluating
 * against a mismatched or remotely supplied policy snapshot.
 */
export function evaluateVisaRoute(
  input: TransitCheckerInput,
  policyData: VisaRoutePolicyData = CURRENT_VISA_ROUTE_POLICY_DATA,
): TransitCheckerResult {
  if (policyData.policyVersion !== VISA_POLICY_META.policyVersion) {
    throw new Error("Visa route policy version mismatch");
  }

  return evaluateTransitEligibility(input);
}
