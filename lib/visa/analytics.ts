"use client";

import { trackEvent } from "@/lib/analytics";
import type { CheckerOutcome } from "@/lib/visa/evaluate-transit-eligibility";

export type VisaAnalyticsEventName =
  | "visa_hub_view"
  | "visa_policy_option_selected"
  | "visa_route_screen_started"
  | "visa_route_screen_step_viewed"
  | "visa_route_screen_completed"
  | "visa_result_action_clicked"
  | "visa_port_search_used"
  | "visa_official_source_clicked"
  | "visa_checker_started"
  | "visa_checker_step_completed"
  | "visa_checker_completed"
  | "visa_checker_result_viewed"
  | "visa_policy_source_clicked"
  | "visa_port_explorer_used"
  | "visa_port_selected"
  | "visa_time_calculator_used"
  | "visa_checklist_saved"
  | "visa_to_payment_hub_clicked"
  | "visa_guide_clicked"
  | "visa_official_arrival_card_clicked"
  | "visa_12367_clicked";

export type VisaAnalyticsResultCategory =
  | "likely_unilateral_visa_free"
  | "likely_240_hour_transit"
  | "likely_24_hour_direct_transit"
  | "manual_review"
  | "not_eligible_from_answers"
  | "unilateral_30_day_may_apply"
  | "transit_240_conditions_appear_to_fit"
  | "direct_transit_24_hour_may_apply"
  | "policy_date_needs_verification"
  | "needs_more_information"
  | "nationality_not_in_transit_list"
  | "third_country_route_issue"
  | "document_validity_issue"
  | "entry_port_issue"
  | "permitted_area_issue"
  | "onward_travel_issue"
  | "manual_official_verification_required";

export type VisaAnalyticsInteractionType =
  | "start"
  | "next"
  | "back"
  | "restart"
  | "complete"
  | "search"
  | "filter"
  | "select"
  | "copy"
  | "save"
  | "print"
  | "download"
  | "open"
  | "click"
  | "calculate";

export type VisaAnalyticsParams = {
  result_category?: VisaAnalyticsResultCategory;
  step_number?: number;
  interaction_type?: VisaAnalyticsInteractionType;
  policy_version?: string;
};

const resultCategories = new Set<VisaAnalyticsResultCategory>([
  "likely_unilateral_visa_free",
  "likely_240_hour_transit",
  "likely_24_hour_direct_transit",
  "manual_review",
  "not_eligible_from_answers",
  "unilateral_30_day_may_apply",
  "transit_240_conditions_appear_to_fit",
  "direct_transit_24_hour_may_apply",
  "policy_date_needs_verification",
  "needs_more_information",
  "nationality_not_in_transit_list",
  "third_country_route_issue",
  "document_validity_issue",
  "entry_port_issue",
  "permitted_area_issue",
  "onward_travel_issue",
  "manual_official_verification_required",
]);

const interactionTypes = new Set<VisaAnalyticsInteractionType>([
  "start",
  "next",
  "back",
  "restart",
  "complete",
  "search",
  "filter",
  "select",
  "copy",
  "save",
  "print",
  "download",
  "open",
  "click",
  "calculate",
]);

export function analyticsResultCategory(
  outcome: CheckerOutcome,
): VisaAnalyticsResultCategory {
  const categories: Record<CheckerOutcome, VisaAnalyticsResultCategory> = {
    "likely-unilateral-visa-free": "likely_unilateral_visa_free",
    "likely-240-hour-transit": "likely_240_hour_transit",
    "likely-24-hour-direct-transit": "likely_24_hour_direct_transit",
    "manual-review": "manual_review",
    "not-eligible-from-answers": "not_eligible_from_answers",
    "policy-date-needs-verification": "policy_date_needs_verification",
  };

  return categories[outcome];
}

export function sanitizeVisaAnalyticsParams(
  params: unknown,
): VisaAnalyticsParams {
  if (!params || typeof params !== "object" || Array.isArray(params)) return {};

  const candidate = params as Record<string, unknown>;
  const safe: VisaAnalyticsParams = {};

  if (
    typeof candidate.result_category === "string" &&
    resultCategories.has(candidate.result_category as VisaAnalyticsResultCategory)
  ) {
    safe.result_category = candidate.result_category as VisaAnalyticsResultCategory;
  }

  if (
    typeof candidate.step_number === "number" &&
    Number.isInteger(candidate.step_number) &&
    candidate.step_number >= 1 &&
    candidate.step_number <= 5
  ) {
    safe.step_number = candidate.step_number;
  }

  if (
    typeof candidate.interaction_type === "string" &&
    interactionTypes.has(candidate.interaction_type as VisaAnalyticsInteractionType)
  ) {
    safe.interaction_type = candidate.interaction_type as VisaAnalyticsInteractionType;
  }

  if (
    typeof candidate.policy_version === "string" &&
    /^\d{4}-\d{2}-\d{2}(?:-v\d+)?$/.test(candidate.policy_version)
  ) {
    safe.policy_version = candidate.policy_version;
  }

  return safe;
}

export function trackVisaEvent(
  eventName: VisaAnalyticsEventName,
  params: VisaAnalyticsParams = {},
) {
  trackEvent(eventName, sanitizeVisaAnalyticsParams(params));
}
