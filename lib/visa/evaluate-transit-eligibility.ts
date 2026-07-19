import {
  TRANSIT_ELIGIBLE_COUNTRIES,
  TRANSIT_POLICY_CLOCK_RULE,
  TRANSIT_PORTS,
  UNILATERAL_VISA_FREE_COUNTRIES,
  VISA_OFFICIAL_SOURCE_URLS,
  VISA_POLICY_META,
} from "@/data/visa";
import { normalizeVisaRegion } from "@/lib/visa-transit/normalize-region";

export type CheckerOutcome =
  | "likely-unilateral-visa-free"
  | "likely-240-hour-transit"
  | "likely-24-hour-direct-transit"
  | "policy-date-needs-verification"
  | "manual-review"
  | "not-eligible-from-answers";

export type VisaScreeningResultCategory =
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

export type TransitCheckerInput = {
  nationalityIso2: string;
  passportType:
    | "ordinary"
    | "other-valid"
    | "temporary-emergency"
    | "diplomatic"
    | "service"
    | "other"
    | "unknown";
  passportValidity:
    | "under-3-months"
    | "3-to-6-months"
    | "over-6-months"
    | "unknown";
  expectedEntryDate?: string;
  immediateOriginRegionId: string;
  immediateOnwardRegionId: string;
  entryPortId: string | null;
  exitPortId?: string | null;
  onwardTicketConfirmed: boolean | null;
  onwardWithin240Hours: boolean | null;
  stayingWithinPermittedArea: boolean | null;
  plannedStayAreaGroupId?: string | null;
  journeyType:
    | "connecting"
    | "through-flight"
    | "technical-stop"
    | "unknown";
  purpose:
    | "tourism"
    | "business"
    | "visit"
    | "family"
    | "work"
    | "study"
    | "journalism"
    | "other";
  plannedStayHours?: number;
  multipleMainlandEntries?: boolean | null;
  manualReviewRequested?: boolean | null;
};

export type TransitCheckerResult = {
  outcome: CheckerOutcome;
  resultCategory: VisaScreeningResultCategory;
  headline: string;
  summary: string;
  reasons: string[];
  warnings: string[];
  nextActions: Array<{
    label: string;
    href: string;
  }>;
  policyVersion: string;
  lastVerifiedAt: string;
  disclaimer: string;
};

type UnilateralPurpose =
  | "business"
  | "tourism"
  | "family-friends"
  | "exchange"
  | "transit";

const NIA_TRANSIT_POLICY_URL =
  VISA_OFFICIAL_SOURCE_URLS.currentPolicyAnnouncement;
const MFA_VISA_INFORMATION_URL = "https://www.mfa.gov.cn/eng/";
const MFA_MUTUAL_VISA_EXEMPTION_URL =
  VISA_OFFICIAL_SOURCE_URLS.mutualVisaExemptionList;
const transitEligibleCountryCodes = new Set<string>(
  TRANSIT_ELIGIBLE_COUNTRIES,
);

const manualReviewActions = [
  {
    label: "Review the official transit rules",
    href: NIA_TRANSIT_POLICY_URL,
  },
  {
    label: "Call China Immigration Service Hotline +86 12367",
    href: "tel:+8612367",
  },
];

const notEligibleActions = [
  {
    label: "Check regular China visa information",
    href: MFA_VISA_INFORMATION_URL,
  },
  {
    label: "Review other visa-free arrangements",
    href: NIA_TRANSIT_POLICY_URL,
  },
  {
    label: "Contact the airline or +86 12367",
    href: "tel:+8612367",
  },
];

const FINAL_DECISION_DISCLAIMER =
  "This is not an approval or guarantee of entry. Immigration inspection authorities make the final decision at the port.";

function resultCopy(category: VisaScreeningResultCategory): {
  headline: string;
  summary: string;
} {
  switch (category) {
    case "unilateral_30_day_may_apply":
      return {
        headline: "A simpler 30-day visa-free option may apply to your trip.",
        summary:
          "The current unilateral policy may be more relevant than the 240-hour transit policy for the details entered.",
      };
    case "transit_240_conditions_appear_to_fit":
      return {
        headline:
          "Your plan appears to match the published planning conditions for 240-hour visa-free transit.",
        summary:
          "Review every matched condition and keep the supporting itinerary ready for the airline and immigration inspection.",
      };
    case "policy_date_needs_verification":
      return {
        headline: "The policy date needs verification for your expected entry date.",
        summary:
          "The entered date is later than the currently published unilateral-policy period, so the latest official notice must be checked.",
      };
    case "nationality_not_in_transit_list":
      return {
        headline: "This nationality is not in the current 240-hour transit dataset.",
        summary:
          "Another visa-free arrangement, a mutual agreement, or regular visa requirements may still be relevant.",
      };
    case "third_country_route_issue":
      return {
        headline: "The route does not currently show a third country or region.",
        summary:
          "The immediate country or region before and after mainland China must be different for the basic 240-hour transit pattern.",
      };
    case "document_validity_issue":
      return {
        headline: "The travel document validity does not meet the published minimum.",
        summary:
          "The current 240-hour dataset requires at least three months of remaining validity on the international travel document.",
      };
    case "entry_port_issue":
      return {
        headline: "The selected port is not confirmed for this route.",
        summary:
          "Only the ports in the current official 65-row appendix can be screened as a matching 240-hour entry route.",
      };
    case "permitted_area_issue":
      return {
        headline: "The stay plan does not match the selected port's permitted area.",
        summary:
          "An eligible port does not allow nationwide travel; every planned stop must remain inside its linked permitted area.",
      };
    case "onward_travel_issue":
      return {
        headline: "The onward travel condition is not currently met.",
        summary:
          "The 240-hour route requires confirmed onward travel to a different country or region within the published window.",
      };
    case "manual_official_verification_required":
      return {
        headline: "This itinerary needs official confirmation.",
        summary:
          "Confirm the exact document, operating segments, and immigration circumstances with the airline or immigration authority.",
      };
    case "direct_transit_24_hour_may_apply":
      return {
        headline: "The 24-hour direct-transit policy needs an official route check.",
        summary:
          "This planning screener does not make a final 24-hour direct-transit assessment or imply permission to enter the city.",
      };
    case "needs_more_information":
      return {
        headline: "More route information is needed.",
        summary:
          "Complete or confirm the missing details before relying on any visa-free transit policy.",
      };
  }
}

function result(
  outcome: CheckerOutcome,
  reasons: string[],
  warnings: string[],
  nextActions: TransitCheckerResult["nextActions"],
  resultCategory: VisaScreeningResultCategory =
    outcome === "likely-unilateral-visa-free"
      ? "unilateral_30_day_may_apply"
      : outcome === "likely-240-hour-transit"
        ? "transit_240_conditions_appear_to_fit"
        : outcome === "likely-24-hour-direct-transit"
          ? "direct_transit_24_hour_may_apply"
          : outcome === "policy-date-needs-verification"
            ? "policy_date_needs_verification"
            : outcome === "manual-review"
              ? "manual_official_verification_required"
              : "needs_more_information",
): TransitCheckerResult {
  const copy = resultCopy(resultCategory);
  return {
    outcome,
    resultCategory,
    ...copy,
    reasons,
    warnings,
    nextActions,
    policyVersion: VISA_POLICY_META.policyVersion,
    lastVerifiedAt: VISA_POLICY_META.lastVerifiedAt,
    disclaimer: FINAL_DECISION_DISCLAIMER,
  };
}

function purposeForUnilateralPolicy(
  purpose: TransitCheckerInput["purpose"],
): UnilateralPurpose | null {
  if (purpose === "tourism" || purpose === "business") return purpose;
  if (purpose === "visit" || purpose === "family") return "family-friends";
  return null;
}

function unilateralRecordCoversEntryDate(
  country: (typeof UNILATERAL_VISA_FREE_COUNTRIES)[number],
  expectedEntryDate: string,
) {
  if (country.effectiveFrom && country.effectiveFrom > expectedEntryDate) return false;
  if (country.validUntil && country.validUntil < expectedEntryDate) return false;
  return true;
}

function evaluateUnilateralVisaFree(
  input: TransitCheckerInput,
): {
  result: TransitCheckerResult | null;
  policyDateNeedsVerification: boolean;
  countryName?: string;
  validUntil?: string | null;
} {
  if (input.passportType !== "ordinary") {
    return { result: null, policyDateNeedsVerification: false };
  }

  const country = UNILATERAL_VISA_FREE_COUNTRIES.find(
    (candidate) => candidate.iso2 === normalizeVisaRegion(input.nationalityIso2),
  );
  const purpose = purposeForUnilateralPolicy(input.purpose);

  if (!country || !purpose || !country.eligiblePurposes.includes(purpose)) {
    return { result: null, policyDateNeedsVerification: false };
  }

  const expectedEntryDate = input.expectedEntryDate?.trim() || "";
  if (!/^\d{4}-\d{2}-\d{2}$/.test(expectedEntryDate)) {
    return {
      result: result(
        "manual-review",
        ["The expected entry date is not confirmed."],
        ["Enter a planned arrival date so the current unilateral-policy end date can be checked."],
        manualReviewActions,
        "needs_more_information",
      ),
      policyDateNeedsVerification: false,
    };
  }

  if (!unilateralRecordCoversEntryDate(country, expectedEntryDate)) {
    return {
      result: null,
      policyDateNeedsVerification: true,
      countryName: country.name,
      validUntil: country.validUntil,
    };
  }

  if (
    input.multipleMainlandEntries === true ||
    input.multipleMainlandEntries === null ||
    input.manualReviewRequested === true ||
    input.manualReviewRequested === null
  ) {
    return { result: result(
      "manual-review",
      ["An individual route or immigration circumstance needs confirmation before using the 30-day entry policy."],
      ["Do not enter personal details here. Confirm the exact circumstances privately with the airline or immigration authority."],
      manualReviewActions,
      "manual_official_verification_required",
    ), policyDateNeedsVerification: false };
  }

  if (input.passportValidity === "unknown") {
    return { result: result(
      "manual-review",
      ["Your passport validity is not confirmed."],
      ["Confirm that the ordinary passport remains valid for the complete intended stay."],
      manualReviewActions,
      "needs_more_information",
    ), policyDateNeedsVerification: false };
  }

  if (input.passportValidity === "under-3-months") {
    return {
      result: result(
        "manual-review",
        ["Your passport has less than three months of validity remaining."],
        ["The unilateral policy requires a valid ordinary passport; confirm validity for the complete stay and airline requirements before travel."],
        manualReviewActions,
        "document_validity_issue",
      ),
      policyDateNeedsVerification: false,
    };
  }

  if (
    input.plannedStayHours === undefined ||
    !Number.isFinite(input.plannedStayHours) ||
    input.plannedStayHours <= 0
  ) {
    return {
      result: result(
        "manual-review",
        [
          "Your nationality and stated purpose appear on the current unilateral visa-free list, but the planned stay length is not confirmed.",
        ],
        [
          `Confirm that the complete stay is no longer than ${country.maxStayDays} days and review the current official purpose rules.`,
        ],
        manualReviewActions,
        "needs_more_information",
      ),
      policyDateNeedsVerification: false,
    };
  }

  if (input.plannedStayHours > country.maxStayDays * 24) {
    return { result: null, policyDateNeedsVerification: false };
  }

  return { result: result(
    "likely-unilateral-visa-free",
    [
      "Your nationality appears on the current unilateral visa-free list.",
      "You indicated an ordinary passport.",
      `Your stated purpose appears within the published categories for a stay of up to ${country.maxStayDays} days.`,
      "The 30-day visa-free entry policy may be more relevant than the 240-hour transit policy for this trip.",
    ],
    [
      "Entry rules can change, and immigration inspection officers make the final decision at the port of entry.",
      "A separate mutual visa-exemption agreement may also apply in some cases; check the official Ministry of Foreign Affairs list.",
    ],
    [
      {
        label: "Read the official visa-free rules",
        href: country.officialSourceUrl,
      },
      {
        label: "Continue to the China arrival checklist",
        href: "/start-here",
      },
      {
        label: "Set up payments and essential apps",
        href: "/payments-and-apps",
      },
    ],
  ), policyDateNeedsVerification: false };
}

function findIncompleteOrAmbiguousInput(input: TransitCheckerInput): string[] {
  const reasons: string[] = [];

  if (!input.nationalityIso2.trim()) reasons.push("Nationality is not confirmed.");
  if (!/^\d{4}-\d{2}-\d{2}$/.test(input.expectedEntryDate?.trim() || "")) {
    reasons.push("The expected entry date is not confirmed.");
  }
  if (input.passportType === "unknown") reasons.push("Passport type is not confirmed.");
  if (input.passportValidity === "unknown") {
    reasons.push("Remaining passport validity is not confirmed.");
  }
  if (!input.immediateOriginRegionId.trim()) {
    reasons.push("The immediate inbound country or region is not confirmed.");
  }
  if (!input.immediateOnwardRegionId.trim()) {
    reasons.push("The immediate onward country or region is not confirmed.");
  }
  if (input.entryPortId === null) reasons.push("The entry port is not confirmed.");
  if (input.onwardTicketConfirmed === null) {
    reasons.push("The confirmed onward ticket is not verified.");
  }
  if (input.onwardWithin240Hours === null) {
    reasons.push("The onward departure timing is not verified.");
  }
  if (input.stayingWithinPermittedArea === null) {
    reasons.push("The permitted stay area is not confirmed.");
  }
  if (input.journeyType === "unknown") reasons.push("The connection type is not clear.");
  if (input.purpose === "other") reasons.push("The stated travel purpose needs confirmation.");
  if (
    input.plannedStayHours !== undefined &&
    (!Number.isFinite(input.plannedStayHours) || input.plannedStayHours <= 0)
  ) {
    reasons.push("The planned stay length is not a valid duration.");
  }
  if (input.multipleMainlandEntries === null) {
    reasons.push("It is not clear whether the itinerary enters mainland China more than once.");
  }
  if (input.manualReviewRequested === null) {
    reasons.push("An individual immigration or document circumstance is not confirmed.");
  }

  return reasons;
}

function evaluateTransitOnly(
  input: TransitCheckerInput,
): TransitCheckerResult {
  const incompleteReasons = findIncompleteOrAmbiguousInput(input);
  if (incompleteReasons.length > 0) {
    return result(
      "manual-review",
      incompleteReasons,
      [
        "This itinerary needs confirmation from the operating airline or immigration authorities before booking.",
      ],
      manualReviewActions,
      "needs_more_information",
    );
  }

  if (
    input.passportType !== "ordinary" &&
    input.passportType !== "other-valid"
  ) {
    return result(
      "manual-review",
      ["A temporary, emergency, diplomatic, service, or unconfirmed travel document needs an individual policy check."],
      ["The 240-hour policy refers to a valid international travel document, but the exact document must be confirmed by the airline and immigration authority."],
      manualReviewActions,
    );
  }

  if (input.multipleMainlandEntries === true) {
    return result(
      "manual-review",
      ["The itinerary appears to enter mainland China more than once."],
      ["Each operating segment and entry must be assessed separately by the airline and immigration authority."],
      manualReviewActions,
    );
  }

  if (input.manualReviewRequested === true) {
    return result(
      "manual-review",
      ["You indicated an individual visa, entry, immigration, document, or legal circumstance that needs confirmation."],
      ["Do not enter personal details here. Confirm privately with the airline, the relevant authority, or +86-12367."],
      manualReviewActions,
    );
  }

  if (
    input.journeyType === "through-flight" ||
    input.journeyType === "technical-stop"
  ) {
    return result(
      "manual-review",
      [
        input.journeyType === "through-flight"
          ? "A through flight may be assessed differently from a connection that changes flight or transport service."
          : "A technical stop can change how the immediate inbound and outbound segments are assessed.",
      ],
      [
        "Confirm the actual operating segments, flight numbers, disembarkation arrangements, and document check with the airline and entry-port immigration authority.",
      ],
      manualReviewActions,
    );
  }

  const immediateOrigin = normalizeVisaRegion(input.immediateOriginRegionId);
  const immediateOnward = normalizeVisaRegion(input.immediateOnwardRegionId);

  const entryPort = TRANSIT_PORTS.find((port) => port.id === input.entryPortId);
  const exitPort = input.exitPortId
    ? TRANSIT_PORTS.find((port) => port.id === input.exitPortId)
    : undefined;

  const nationality = normalizeVisaRegion(input.nationalityIso2);
  if (!transitEligibleCountryCodes.has(nationality)) {
    return result(
      "not-eligible-from-answers",
      ["Your passport nationality does not appear on the current 240-hour transit list."],
      [
        "Another visa-free arrangement or a regular China visa may be relevant.",
        "A separate mutual visa-exemption agreement may apply. Check the official Ministry of Foreign Affairs list.",
      ],
      [
        ...notEligibleActions,
        {
          label: "Check the official mutual visa-exemption list",
          href: MFA_MUTUAL_VISA_EXEMPTION_URL,
        },
      ],
      "nationality_not_in_transit_list",
    );
  }

  if (input.passportValidity === "under-3-months") {
    return result(
      "not-eligible-from-answers",
      ["The remaining passport validity is below the published three-month minimum."],
      ["Confirm passport renewal and visa options before booking."],
      notEligibleActions,
      "document_validity_issue",
    );
  }

  if (immediateOrigin === immediateOnward) {
    return result(
      "not-eligible-from-answers",
      ["The immediate inbound and onward destinations are the same country or region."],
      [
        "A basic A → Mainland China → A route does not meet the third-country-or-region transit pattern.",
        "Complex connections and technical stops still require manual confirmation.",
      ],
      notEligibleActions,
      "third_country_route_issue",
    );
  }

  if (input.onwardTicketConfirmed === false) {
    return result(
      "not-eligible-from-answers",
      ["A confirmed onward ticket is not currently held."],
      ["Do not rely on the 240-hour policy without confirmed onward travel."],
      notEligibleActions,
      "onward_travel_issue",
    );
  }

  if (
    input.onwardWithin240Hours === false ||
    (input.plannedStayHours !== undefined && input.plannedStayHours > 240)
  ) {
    return result(
      "not-eligible-from-answers",
      ["The planned onward departure is outside the 240-hour window."],
      [
        `${TRANSIT_POLICY_CLOCK_RULE} The temporary entry permit shows the deadline that applies to the traveler.`,
      ],
      notEligibleActions,
      "onward_travel_issue",
    );
  }

  if (!entryPort || !entryPort.canEnter) {
    return result(
      "not-eligible-from-answers",
      [`The selected entry port is not confirmed for entry under the current ${VISA_POLICY_META.eligiblePortCount}-port dataset.`],
      ["Do not infer eligibility from international flight availability alone."],
      notEligibleActions,
      "entry_port_issue",
    );
  }

  if (
    !input.plannedStayAreaGroupId ||
    !entryPort.permittedAreaGroupIds.includes(input.plannedStayAreaGroupId)
  ) {
    return result(
      "not-eligible-from-answers",
      ["The selected stay area does not match the permitted area attached to the selected entry port."],
      ["Use the official port-to-area mapping and confirm every planned stop before booking."],
      notEligibleActions,
      "permitted_area_issue",
    );
  }

  if (input.exitPortId && (!exitPort || !exitPort.canExit)) {
    return result(
      "not-eligible-from-answers",
      ["The selected exit port is not confirmed for exit in the current dataset."],
      ["Confirm an eligible exit route before booking."],
      notEligibleActions,
      "entry_port_issue",
    );
  }

  if (input.stayingWithinPermittedArea === false) {
    return result(
      "not-eligible-from-answers",
      ["The planned trip leaves the permitted stay area linked to the entry route."],
      ["An eligible port does not automatically permit nationwide travel."],
      notEligibleActions,
      "permitted_area_issue",
    );
  }

  if (["work", "study", "journalism"].includes(input.purpose)) {
    return result(
      "not-eligible-from-answers",
      [`The stated ${input.purpose} purpose is not suitable for this transit result.`],
      ["Check the correct visa category before travel."],
      notEligibleActions,
      "manual_official_verification_required",
    );
  }

  return result(
    "likely-240-hour-transit",
    [
      "Nationality appears on the current eligible list.",
      "Passport validity meets the published minimum.",
      "Immediate origin and onward destination are different.",
      "Confirmed onward travel is within 240 hours.",
      "Selected entry port is on the current list.",
      "Planned stay remains within the permitted area.",
      "The stated activity appears permitted.",
    ],
    [
      "Your route appears to meet the main published conditions; this is not an official eligibility decision.",
      "The final decision is made by immigration inspection officers at the port of entry.",
      "Use the departure deadline shown on the temporary entry permit.",
    ],
    [
      {
        label: "Save your transit checklist",
        href: "/visa-free-transit#documents-checklist",
      },
      {
        label: "Prepare payments and essential apps",
        href: "/payments-and-apps",
      },
      {
        label: "Read the detailed visa-free transit guide",
        href: "/guides/china-240-hour-visa-free-transit-guide",
      },
      {
        label: "Explore an eligible short itinerary",
        href: "/itinerary-kits/240-hour-visa-free-china-itinerary",
      },
    ],
  );
}

export function evaluateTransitEligibility(
  input: TransitCheckerInput,
): TransitCheckerResult {
  const unilateralEvaluation = evaluateUnilateralVisaFree(input);
  if (unilateralEvaluation.result) return unilateralEvaluation.result;

  const transitResult = evaluateTransitOnly(input);
  if (!unilateralEvaluation.policyDateNeedsVerification) return transitResult;

  const dateWarning = unilateralEvaluation.validUntil
    ? `The current unilateral visa-free period for ${unilateralEvaluation.countryName} is published through ${unilateralEvaluation.validUntil}; the entered arrival date is later.`
    : `The unilateral visa-free policy date for ${unilateralEvaluation.countryName} needs a current official check.`;

  if (transitResult.outcome === "likely-240-hour-transit") {
    return {
      ...transitResult,
      warnings: [dateWarning, ...transitResult.warnings],
    };
  }

  if (transitResult.outcome === "manual-review") return transitResult;

  return result(
    "policy-date-needs-verification",
    [dateWarning],
    [
      "The 30-day policy may have expired by the entered arrival date, and the 240-hour route did not produce a positive screening result from the current answers.",
      ...transitResult.reasons,
    ],
    [
      {
        label: "Check the current official visa-free policy",
        href: VISA_OFFICIAL_SOURCE_URLS.unilateralVisaFreeCountries,
      },
      ...manualReviewActions,
    ],
    "policy_date_needs_verification",
  );
}
