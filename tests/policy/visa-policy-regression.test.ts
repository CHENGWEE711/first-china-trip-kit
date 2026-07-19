import fs from "node:fs";
import path from "node:path";
import { expect, test } from "@playwright/test";
import {
  TRANSIT_ELIGIBLE_COUNTRIES,
  TRANSIT_POLICY_CLOCK_RULE,
  TRANSIT_PORTS,
  UNILATERAL_VISA_FREE_COUNTRIES,
  VISA_POLICY_META,
} from "@/data/visa";
import {
  evaluateTransitEligibility,
  type TransitCheckerInput,
} from "@/lib/visa/evaluate-transit-eligibility";
import {
  analyticsResultCategory,
  sanitizeVisaAnalyticsParams,
} from "@/lib/visa/analytics";

const entryPort = TRANSIT_PORTS.find((port) => port.canEnter);

function validTransitInput(
  overrides: Partial<TransitCheckerInput> = {},
): TransitCheckerInput {
  if (!entryPort) throw new Error("The policy dataset has no eligible entry port");

  return {
    nationalityIso2: "US",
    passportType: "ordinary",
    passportValidity: "over-6-months",
    expectedEntryDate: "2026-08-01",
    immediateOriginRegionId: "JP",
    immediateOnwardRegionId: "SG",
    entryPortId: entryPort.id,
    onwardTicketConfirmed: true,
    onwardWithin240Hours: true,
    stayingWithinPermittedArea: true,
    plannedStayAreaGroupId: entryPort.permittedAreaGroupIds[0],
    journeyType: "connecting",
    purpose: "tourism",
    plannedStayHours: 72,
    ...overrides,
  };
}

test("policy datasets retain the verified counts, unique keys, and official sources", () => {
  expect(TRANSIT_ELIGIBLE_COUNTRIES).toHaveLength(55);
  expect(new Set(TRANSIT_ELIGIBLE_COUNTRIES).size).toBe(55);
  expect(TRANSIT_PORTS).toHaveLength(65);
  expect(new Set(TRANSIT_PORTS.map((port) => port.id)).size).toBe(65);
  expect(VISA_POLICY_META.eligibleCountryCount).toBe(55);
  expect(VISA_POLICY_META.eligiblePortCount).toBe(65);
  expect(VISA_POLICY_META.provinceLevelRegionCount).toBe(24);
  expect(VISA_POLICY_META.policyVersion).toBe("2026-07-19-v1");
  expect(VISA_POLICY_META.lastVerifiedAt).toBe("2026-07-19");
  expect(VISA_POLICY_META.officialSourceUrls.length).toBeGreaterThan(0);
  expect(VISA_POLICY_META.officialSourceUrls.every((url) => /^https:\/\//.test(url))).toBe(true);
  expect(TRANSIT_PORTS.every((port) => /^https:\/\//.test(port.officialSourceUrl))).toBe(true);
});

test("30-day unilateral visa-free entry takes priority over transit answers", () => {
  const country = UNILATERAL_VISA_FREE_COUNTRIES.find((candidate) =>
    candidate.eligiblePurposes.includes("tourism"),
  );
  expect(country).toBeTruthy();

  const result = evaluateTransitEligibility(
    validTransitInput({
      nationalityIso2: country!.iso2,
      immediateOriginRegionId: "JP",
      immediateOnwardRegionId: "JP",
      onwardTicketConfirmed: false,
      plannedStayHours: Math.min(country!.maxStayDays * 24, 72),
    }),
  );

  expect(result.outcome).toBe("likely-unilateral-visa-free");
  expect(result.resultCategory).toBe("unilateral_30_day_may_apply");
});

test("30-day screening returns manual review when passport validity is unknown", () => {
  const country = UNILATERAL_VISA_FREE_COUNTRIES.find((candidate) =>
    candidate.eligiblePurposes.includes("tourism"),
  );
  expect(country).toBeTruthy();

  const result = evaluateTransitEligibility(
    validTransitInput({
      nationalityIso2: country!.iso2,
      passportValidity: "unknown",
    }),
  );

  expect(result.outcome).toBe("manual-review");
});

test("a complete A to Mainland China to B route returns the cautious 240-hour result", () => {
  const result = evaluateTransitEligibility(validTransitInput());

  expect(result.outcome).toBe("likely-240-hour-transit");
  expect(result.resultCategory).toBe("transit_240_conditions_appear_to_fit");
  expect(result.reasons).toEqual(
    expect.arrayContaining([
      expect.stringMatching(/nationality appears/i),
      expect.stringMatching(/immediate origin and onward destination are different/i),
      expect.stringMatching(/selected entry port/i),
    ]),
  );
  expect(result.warnings.join(" ")).toMatch(/final decision.*immigration inspection officers/i);
  expect(JSON.stringify(result)).not.toMatch(/you are approved|definitely eligible|guaranteed entry/i);
});

test("A to Mainland China to A does not pass the third-region rule", () => {
  const result = evaluateTransitEligibility(
    validTransitInput({
      immediateOriginRegionId: "JP",
      immediateOnwardRegionId: "JP",
    }),
  );
  expect(result.outcome).toBe("not-eligible-from-answers");
  expect(result.resultCategory).toBe("third_country_route_issue");
  expect(result.reasons.join(" ")).toMatch(/same country or region/i);
});

test("missing confirmed onward travel does not pass", () => {
  const result = evaluateTransitEligibility(
    validTransitInput({ onwardTicketConfirmed: false }),
  );
  expect(result.outcome).toBe("not-eligible-from-answers");
  expect(result.resultCategory).toBe("onward_travel_issue");
  expect(result.reasons.join(" ")).toMatch(/confirmed onward ticket/i);
});

test("a stay beyond 240 hours does not pass", () => {
  const result = evaluateTransitEligibility(
    validTransitInput({ plannedStayHours: 241, onwardWithin240Hours: false }),
  );
  expect(result.outcome).toBe("not-eligible-from-answers");
  expect(result.resultCategory).toBe("onward_travel_issue");
  expect(result.reasons.join(" ")).toMatch(/outside the 240-hour window/i);
});

test("passport validity below three months does not pass the 240-hour checks", () => {
  const result = evaluateTransitEligibility(
    validTransitInput({ passportValidity: "under-3-months" }),
  );
  expect(result.outcome).toBe("not-eligible-from-answers");
  expect(result.resultCategory).toBe("document_validity_issue");
  expect(result.reasons.join(" ")).toMatch(/three-month minimum/i);
});

test("a port outside the verified dataset does not pass", () => {
  const result = evaluateTransitEligibility(
    validTransitInput({ entryPortId: "not-an-official-transit-port" }),
  );
  expect(result.outcome).toBe("not-eligible-from-answers");
  expect(result.resultCategory).toBe("entry_port_issue");
  expect(result.reasons.join(" ")).toMatch(/entry port is not confirmed/i);
});

test("a short transit never bypasses verified entry or exit port checks", () => {
  const invalidEntry = evaluateTransitEligibility(
    validTransitInput({
      plannedStayHours: 20,
      entryPortId: "not-an-official-transit-port",
    }),
  );
  const invalidExit = evaluateTransitEligibility(
    validTransitInput({
      plannedStayHours: 20,
      exitPortId: "not-an-official-transit-port",
    }),
  );

  expect(invalidEntry.outcome).toBe("not-eligible-from-answers");
  expect(invalidEntry.resultCategory).toBe("entry_port_issue");
  expect(invalidExit.outcome).toBe("not-eligible-from-answers");
  expect(invalidExit.resultCategory).toBe("entry_port_issue");
});

test("zero-hour and multi-entry or individual-review inputs remain cautious", () => {
  expect(
    evaluateTransitEligibility(validTransitInput({ plannedStayHours: 0 })).outcome,
  ).toBe("manual-review");
  expect(
    evaluateTransitEligibility(
      validTransitInput({ multipleMainlandEntries: true }),
    ).outcome,
  ).toBe("manual-review");
  expect(
    evaluateTransitEligibility(
      validTransitInput({ manualReviewRequested: true }),
    ).outcome,
  ).toBe("manual-review");
});

test("non-listed nationalities receive the official mutual-agreement prompt", () => {
  const result = evaluateTransitEligibility(
    validTransitInput({ nationalityIso2: "IN" }),
  );
  expect(result.outcome).toBe("not-eligible-from-answers");
  expect(result.resultCategory).toBe("nationality_not_in_transit_list");
  expect(result.warnings.join(" ")).toMatch(/mutual visa-exemption agreement/i);
  expect(result.nextActions.some((action) => action.href.includes("mfa.gov.cn"))).toBe(true);
});

test("work, study, and journalism do not receive a likely result", () => {
  for (const purpose of ["work", "study", "journalism"] as const) {
    const result = evaluateTransitEligibility(validTransitInput({ purpose }));
    expect(result.outcome).toBe("not-eligible-from-answers");
    expect(result.reasons.join(" ")).toContain(purpose);
  }
});

test("through flights and technical stops require manual review", () => {
  for (const journeyType of ["through-flight", "technical-stop"] as const) {
    const result = evaluateTransitEligibility(validTransitInput({ journeyType }));
    expect(result.outcome).toBe("manual-review");
  }
});

test("unknown and null conditions require manual review", () => {
  const unknownPassport = evaluateTransitEligibility(
    validTransitInput({ passportValidity: "unknown" }),
  );
  const missingTicketAnswer = evaluateTransitEligibility(
    validTransitInput({ onwardTicketConfirmed: null }),
  );
  const missingAreaAnswer = evaluateTransitEligibility(
    validTransitInput({ stayingWithinPermittedArea: null }),
  );

  expect(unknownPassport.outcome).toBe("manual-review");
  expect(missingTicketAnswer.outcome).toBe("manual-review");
  expect(missingAreaAnswer.outcome).toBe("manual-review");
});

test("a stay under 24 hours still receives only the cautious 240-hour planning result", () => {
  const result = evaluateTransitEligibility(validTransitInput({ plannedStayHours: 20 }));

  expect(result.outcome).toBe("likely-240-hour-transit");
  expect(result.resultCategory).toBe("transit_240_conditions_appear_to_fit");
  expect(result.disclaimer).toMatch(/not an approval or guarantee of entry/i);
});

test("analytics exposes only the four approved parameter keys", () => {
  const safe = sanitizeVisaAnalyticsParams({
    result_category: "likely_240_hour_transit",
    step_number: 3,
    interaction_type: "complete",
    policy_version: "2026-07-19-v1",
    nationality: "US",
    nationalityIso2: "US",
    passport_type: "ordinary",
    immediate_origin: "JP",
    immediate_onward: "SG",
    entry_port: entryPort?.id,
    itinerary_time: "2026-08-01T12:00:00+08:00",
    email: "traveler@example.com",
    free_text: "private itinerary detail",
  });

  expect(safe).toEqual({
    result_category: "likely_240_hour_transit",
    step_number: 3,
    interaction_type: "complete",
    policy_version: "2026-07-19-v1",
  });
  expect(Object.keys(safe).sort()).toEqual([
    "interaction_type",
    "policy_version",
    "result_category",
    "step_number",
  ]);
  expect(analyticsResultCategory("manual-review")).toBe("manual_review");
});

test("analytics rejects unrecognized values instead of forwarding user input", () => {
  expect(
    sanitizeVisaAnalyticsParams({
      result_category: "US",
      step_number: 240,
      interaction_type: "Tokyo to Shanghai to Singapore",
      policy_version: "private itinerary",
    }),
  ).toEqual({});
});

test("policy wording retains timing and final-decision safeguards", () => {
  const evaluatorSource = fs.readFileSync(
    path.resolve(process.cwd(), "lib/visa/evaluate-transit-eligibility.ts"),
    "utf8",
  );

  expect(VISA_POLICY_META.eligibleCountryCount).toBe(55);
  expect(VISA_POLICY_META.eligiblePortCount).toBe(65);
  expect(VISA_POLICY_META.provinceLevelRegionCount).toBe(24);
  expect(evaluatorSource).toMatch(/published three-month minimum/i);
  expect(evaluatorSource).toMatch(/validUntil/);
  expect(TRANSIT_POLICY_CLOCK_RULE).toMatch(/00:00 on the day following the day of entry/i);
  expect(evaluatorSource).toMatch(/final decision is made by immigration inspection officers/i);
  expect(evaluatorSource).not.toMatch(/you are approved|definitely eligible|guaranteed entry/i);
});
