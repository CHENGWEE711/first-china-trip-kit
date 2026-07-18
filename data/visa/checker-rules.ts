export type CheckerOutcome =
  | "likely-unilateral-visa-free"
  | "likely-240-hour-transit"
  | "likely-24-hour-direct-transit"
  | "manual-review"
  | "not-eligible-from-answers";

export type TransitCheckerPurpose =
  | "tourism"
  | "business"
  | "visit"
  | "family"
  | "work"
  | "study"
  | "journalism"
  | "other";

export type TransitJourneyType =
  | "connecting"
  | "through-flight"
  | "technical-stop"
  | "unknown";

export const TRANSIT_DURATION_HOURS = 240;
export const DIRECT_TRANSIT_DURATION_HOURS = 24;
export const PASSPORT_MINIMUM_VALIDITY_MONTHS = 3;
export const TRANSIT_POLICY_TIME_ZONE = "Asia/Shanghai";
export const TRANSIT_POLICY_UTC_OFFSET = "UTC+8";

export const TRANSIT_POLICY_CLOCK_RULE =
  "The published 240-hour period is calculated from 00:00 on the day following the day of entry.";

export const TRANSIT_DECISION_DISCLAIMER =
  "This checker is an educational screening tool, not an official immigration decision. Final handling is determined by immigration inspection authorities at the port of entry.";

export const TRANSIT_TIME_CALCULATOR_DISCLAIMER =
  "Use the departure deadline shown on your temporary entry permit. This calculator does not replace the decision of immigration officers.";

export const CHECKER_POLICY_PRIORITY = [
  "unilateral-30-day",
  "direct-transit-24-hour",
  "transit-240-hour",
] as const;

export const TRANSIT_PERMITTED_PURPOSES: TransitCheckerPurpose[] = [
  "tourism",
  "business",
  "visit",
  "family",
];

export const TRANSIT_PURPOSES_REQUIRING_PRIOR_VISA: TransitCheckerPurpose[] = [
  "work",
  "study",
  "journalism",
];

export const CHECKER_MANUAL_REVIEW_TRIGGERS = [
  "through-flight-or-technical-stop",
  "uncertain-journey-type",
  "uncertain-passport-validity",
  "uncertain-onward-ticket",
  "uncertain-departure-window",
  "uncertain-permitted-area",
  "special-travel-document",
  "complex-multiple-mainland-entries",
  "unclear-operating-segments",
  "unmapped-port-or-stay-area",
] as const;

export const VISA_ANALYTICS_ALLOWED_PARAMETER_NAMES = [
  "result_category",
  "step_number",
  "interaction_type",
  "policy_version",
] as const;

export const VISA_ANALYTICS_PROHIBITED_PARAMETER_NAMES = [
  "nationality",
  "nationality_iso2",
  "passport_type",
  "passport_validity",
  "immediate_origin",
  "immediate_onward_destination",
  "entry_port",
  "exit_port",
  "arrival_time",
  "departure_time",
  "user_input",
] as const;

export function toVisaAnalyticsResultCategory(
  outcome: CheckerOutcome,
): string {
  return outcome.replaceAll("-", "_");
}
