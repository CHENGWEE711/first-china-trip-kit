import {
  TRANSIT_ELIGIBLE_COUNTRIES,
  TRANSIT_POLICY_CLOCK_RULE,
  TRANSIT_PORTS,
  UNILATERAL_VISA_FREE_COUNTRIES,
  VISA_OFFICIAL_SOURCE_URLS,
  VISA_POLICY_META,
} from "@/data/visa";

export type CheckerOutcome =
  | "likely-unilateral-visa-free"
  | "likely-240-hour-transit"
  | "likely-24-hour-direct-transit"
  | "manual-review"
  | "not-eligible-from-answers";

export type TransitCheckerInput = {
  nationalityIso2: string;
  passportType: "ordinary" | "diplomatic" | "service" | "other" | "unknown";
  passportValidity:
    | "under-3-months"
    | "3-to-6-months"
    | "over-6-months"
    | "unknown";
  immediateOriginRegionId: string;
  immediateOnwardRegionId: string;
  entryPortId: string | null;
  exitPortId?: string | null;
  onwardTicketConfirmed: boolean | null;
  onwardWithin240Hours: boolean | null;
  stayingWithinPermittedArea: boolean | null;
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
  reasons: string[];
  warnings: string[];
  nextActions: Array<{
    label: string;
    href: string;
  }>;
  policyVersion: string;
  lastVerifiedAt: string;
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

function result(
  outcome: CheckerOutcome,
  reasons: string[],
  warnings: string[],
  nextActions: TransitCheckerResult["nextActions"],
): TransitCheckerResult {
  return {
    outcome,
    reasons,
    warnings,
    nextActions,
    policyVersion: VISA_POLICY_META.policyVersion,
    lastVerifiedAt: VISA_POLICY_META.lastVerifiedAt,
  };
}

function normalizeRegionId(value: string) {
  return value.trim().toUpperCase();
}

function purposeForUnilateralPolicy(
  purpose: TransitCheckerInput["purpose"],
): UnilateralPurpose | null {
  if (purpose === "tourism" || purpose === "business") return purpose;
  if (purpose === "visit" || purpose === "family") return "family-friends";
  return null;
}

function unilateralRecordIsCurrent(
  country: (typeof UNILATERAL_VISA_FREE_COUNTRIES)[number],
) {
  const referenceDate = VISA_POLICY_META.lastVerifiedAt;
  if (country.effectiveFrom && country.effectiveFrom > referenceDate) return false;
  if (country.effectiveUntil && country.effectiveUntil < referenceDate) return false;
  return true;
}

function evaluateUnilateralVisaFree(
  input: TransitCheckerInput,
): TransitCheckerResult | null {
  if (input.passportType !== "ordinary") return null;

  const country = UNILATERAL_VISA_FREE_COUNTRIES.find(
    (candidate) => candidate.iso2 === normalizeRegionId(input.nationalityIso2),
  );
  const purpose = purposeForUnilateralPolicy(input.purpose);

  if (
    !country ||
    !unilateralRecordIsCurrent(country) ||
    !purpose ||
    !country.eligiblePurposes.includes(purpose)
  ) {
    return null;
  }

  if (
    input.multipleMainlandEntries === true ||
    input.multipleMainlandEntries === null ||
    input.manualReviewRequested === true ||
    input.manualReviewRequested === null
  ) {
    return result(
      "manual-review",
      ["An individual route or immigration circumstance needs confirmation before using the 30-day entry policy."],
      ["Do not enter personal details here. Confirm the exact circumstances privately with the airline or immigration authority."],
      manualReviewActions,
    );
  }

  if (input.passportValidity === "unknown") {
    return result(
      "manual-review",
      ["Your passport validity is not confirmed."],
      ["Confirm that the ordinary passport remains valid for the complete intended stay."],
      manualReviewActions,
    );
  }

  if (input.passportValidity === "under-3-months") {
    return result(
      "manual-review",
      ["Your passport has less than three months of validity remaining."],
      ["The unilateral policy requires a valid ordinary passport; confirm validity for the complete stay and airline requirements before travel."],
      manualReviewActions,
    );
  }

  if (
    input.plannedStayHours === undefined ||
    !Number.isFinite(input.plannedStayHours) ||
    input.plannedStayHours <= 0
  ) {
    return result(
      "manual-review",
      [
        "Your nationality and stated purpose appear on the current unilateral visa-free list, but the planned stay length is not confirmed.",
      ],
      [
        `Confirm that the complete stay is no longer than ${country.maxStayDays} days and review the current official purpose rules.`,
      ],
      manualReviewActions,
    );
  }

  if (input.plannedStayHours > country.maxStayDays * 24) return null;

  return result(
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
  );
}

function findIncompleteOrAmbiguousInput(input: TransitCheckerInput): string[] {
  const reasons: string[] = [];

  if (!input.nationalityIso2.trim()) reasons.push("Nationality is not confirmed.");
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

export function evaluateTransitEligibility(
  input: TransitCheckerInput,
): TransitCheckerResult {
  const unilateralResult = evaluateUnilateralVisaFree(input);
  if (unilateralResult) return unilateralResult;

  const incompleteReasons = findIncompleteOrAmbiguousInput(input);
  if (incompleteReasons.length > 0) {
    return result(
      "manual-review",
      incompleteReasons,
      [
        "This itinerary needs confirmation from the operating airline or immigration authorities before booking.",
      ],
      manualReviewActions,
    );
  }

  if (input.passportType !== "ordinary") {
    return result(
      "manual-review",
      ["Special, service, diplomatic, or other travel documents need an individual policy check."],
      ["Do not apply ordinary-passport rules to a different travel document."],
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

  const immediateOrigin = normalizeRegionId(input.immediateOriginRegionId);
  const immediateOnward = normalizeRegionId(input.immediateOnwardRegionId);

  const entryPort = TRANSIT_PORTS.find((port) => port.id === input.entryPortId);
  const exitPort = input.exitPortId
    ? TRANSIT_PORTS.find((port) => port.id === input.exitPortId)
    : undefined;

  if (
    input.plannedStayHours !== undefined &&
    input.plannedStayHours <= 24 &&
    immediateOrigin !== immediateOnward &&
    input.onwardTicketConfirmed === true &&
    input.onwardWithin240Hours === true &&
    input.stayingWithinPermittedArea === true &&
    !["work", "study", "journalism"].includes(input.purpose)
  ) {
    if (!entryPort || !entryPort.canEnter) {
      return result(
        "manual-review",
        [`The selected port is not confirmed in this Hub's verified ${VISA_POLICY_META.eligiblePortCount}-port dataset.`],
        ["The separate 24-hour direct-transit policy can depend on the exact open port and inspection arrangement. Confirm it with the airline or immigration authority."],
        manualReviewActions,
      );
    }
    if (!exitPort || !exitPort.canExit) {
      if (input.exitPortId) {
        return result(
          "manual-review",
          ["The expected exit port is not confirmed in this Hub's verified dataset."],
          ["Confirm the exact 24-hour operating route and inspection arrangement before travel."],
          manualReviewActions,
        );
      }
    }
    return result(
      "likely-24-hour-direct-transit",
      [
        "Your immediate inbound and outbound countries or regions are different.",
        "You indicated confirmed onward travel within 24 hours.",
        "You indicated that you will remain within the restricted transit or permitted area.",
      ],
      [
        "This result does not mean you may freely enter the city. Leaving a port's restricted area can require a temporary entry permit.",
        "Some ports apply different inspection arrangements; confirm the exact connection with the airline and immigration authority.",
      ],
      [
        {
          label: "Review official direct-transit guidance",
          href: NIA_TRANSIT_POLICY_URL,
        },
        {
          label: "Confirm with the airline or +86 12367",
          href: "tel:+8612367",
        },
      ],
    );
  }

  const nationality = normalizeRegionId(input.nationalityIso2);
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
    );
  }

  if (input.passportValidity === "under-3-months") {
    return result(
      "not-eligible-from-answers",
      ["The remaining passport validity is below the published three-month minimum."],
      ["Confirm passport renewal and visa options before booking."],
      notEligibleActions,
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
    );
  }

  if (input.onwardTicketConfirmed === false) {
    return result(
      "not-eligible-from-answers",
      ["A confirmed onward ticket is not currently held."],
      ["Do not rely on the 240-hour policy without confirmed onward travel."],
      notEligibleActions,
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
    );
  }

  if (!entryPort || !entryPort.canEnter) {
    return result(
      "not-eligible-from-answers",
      [`The selected entry port is not confirmed for entry under the current ${VISA_POLICY_META.eligiblePortCount}-port dataset.`],
      ["Do not infer eligibility from international flight availability alone."],
      notEligibleActions,
    );
  }

  if (input.exitPortId && (!exitPort || !exitPort.canExit)) {
    return result(
      "not-eligible-from-answers",
      ["The selected exit port is not confirmed for exit in the current dataset."],
      ["Confirm an eligible exit route before booking."],
      notEligibleActions,
    );
  }

  if (input.stayingWithinPermittedArea === false) {
    return result(
      "not-eligible-from-answers",
      ["The planned trip leaves the permitted stay area linked to the entry route."],
      ["An eligible port does not automatically permit nationwide travel."],
      notEligibleActions,
    );
  }

  if (["work", "study", "journalism"].includes(input.purpose)) {
    return result(
      "not-eligible-from-answers",
      [`The stated ${input.purpose} purpose is not suitable for this transit result.`],
      ["Check the correct visa category before travel."],
      notEligibleActions,
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
