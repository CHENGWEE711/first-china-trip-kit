import { expect, test } from "@playwright/test";
import { TRANSIT_PORTS } from "@/data/visa";
import { normalizeVisaRegion } from "@/lib/visa-transit/normalize-region";
import {
  evaluateTransitEligibility,
  type TransitCheckerInput,
  type TransitCheckerResult,
} from "@/lib/visa/evaluate-transit-eligibility";
import { sanitizeVisaAnalyticsParams } from "@/lib/visa/analytics";

const shanghaiEntry = TRANSIT_PORTS.find(
  (port) => port.id === "shanghai-pudong",
);

function validInput(
  overrides: Partial<TransitCheckerInput> = {},
): TransitCheckerInput {
  if (!shanghaiEntry) throw new Error("Shanghai Pudong must exist in policy data");

  return {
    nationalityIso2: "US",
    passportType: "ordinary",
    passportValidity: "over-6-months",
    expectedEntryDate: "2026-08-01",
    immediateOriginRegionId: "JP",
    immediateOnwardRegionId: "SG",
    entryPortId: shanghaiEntry.id,
    exitPortId: "shanghai-hongqiao",
    onwardTicketConfirmed: true,
    onwardWithin240Hours: true,
    stayingWithinPermittedArea: true,
    plannedStayAreaGroupId: "shanghai-municipality",
    journeyType: "connecting",
    purpose: "tourism",
    plannedStayHours: 72,
    multipleMainlandEntries: false,
    manualReviewRequested: false,
    ...overrides,
  };
}

function expectNoAdmissionGuarantee(result: TransitCheckerResult) {
  expect(JSON.stringify(result)).not.toMatch(
    /100% eligible|you are approved|definitely eligible|guaranteed (?:visa|entry|admission)/i,
  );
}

test("a typical A to Mainland China to B route returns the cautious 240-hour category", () => {
  const result = evaluateTransitEligibility(validInput());

  expect(result.outcome).toBe("likely-240-hour-transit");
  expect(result.resultCategory).toBe(
    "transit_240_conditions_appear_to_fit",
  );
  expect(result.policyVersion).toBe("2026-07-19-v1");
  expect(result.lastVerifiedAt).toBe("2026-07-19");
  expect(result.reasons).toEqual(
    expect.arrayContaining([
      expect.stringMatching(/nationality appears/i),
      expect.stringMatching(/origin and onward destination are different/i),
      expect.stringMatching(/entry port is on the current list/i),
      expect.stringMatching(/permitted area/i),
    ]),
  );
  expect(result.warnings.join(" ")).toMatch(
    /final decision.*immigration inspection officers/i,
  );
  expectNoAdmissionGuarantee(result);
});

test("A to Mainland China to A returns a third-country route issue", () => {
  const result = evaluateTransitEligibility(
    validInput({ immediateOnwardRegionId: "Japan" }),
  );

  expect(result.outcome).toBe("not-eligible-from-answers");
  expect(result.resultCategory).toBe("third_country_route_issue");
  expect(result.reasons.join(" ")).toMatch(/same country or region/i);
});

test("a nationality outside the current 55-country list gets its own category", () => {
  const result = evaluateTransitEligibility(
    validInput({ nationalityIso2: "IN" }),
  );

  expect(result.outcome).toBe("not-eligible-from-answers");
  expect(result.resultCategory).toBe("nationality_not_in_transit_list");
  expect(result.reasons.join(" ")).toMatch(/does not appear/i);
});

test("document validity below three months returns a document issue", () => {
  const result = evaluateTransitEligibility(
    validInput({ passportValidity: "under-3-months" }),
  );

  expect(result.outcome).toBe("not-eligible-from-answers");
  expect(result.resultCategory).toBe("document_validity_issue");
});

test("an unverified entry port returns an entry-port issue", () => {
  const result = evaluateTransitEligibility(
    validInput({ entryPortId: "not-in-the-official-port-list" }),
  );

  expect(result.outcome).toBe("not-eligible-from-answers");
  expect(result.resultCategory).toBe("entry_port_issue");
});

test("leaving or selecting an area outside the official dataset returns a permitted-area issue", () => {
  const leavingArea = evaluateTransitEligibility(
    validInput({ stayingWithinPermittedArea: false }),
  );
  const unknownArea = evaluateTransitEligibility(
    validInput({ plannedStayAreaGroupId: "not-in-current-permitted-list" }),
  );

  for (const result of [leavingArea, unknownArea]) {
    expect(result.outcome).toBe("not-eligible-from-answers");
    expect(result.resultCategory).toBe("permitted_area_issue");
  }
});

test("a Shanghai entry can continue into published Jiangsu and Zhejiang areas", () => {
  for (const plannedStayAreaGroupId of [
    "jiangsu-province",
    "zhejiang-province",
  ]) {
    const result = evaluateTransitEligibility(
      validInput({ plannedStayAreaGroupId }),
    );

    expect(result.outcome).toBe("likely-240-hour-transit");
    expect(result.resultCategory).toBe(
      "transit_240_conditions_appear_to_fit",
    );
    expect(result.reasons.join(" ")).toMatch(/published permitted areas/i);
  }
});

test("missing confirmed onward travel returns an onward-travel issue", () => {
  const result = evaluateTransitEligibility(
    validInput({ onwardTicketConfirmed: false }),
  );

  expect(result.outcome).toBe("not-eligible-from-answers");
  expect(result.resultCategory).toBe("onward_travel_issue");
});

test("the current 30-day unilateral policy is screened before transit rules", () => {
  const result = evaluateTransitEligibility(
    validInput({
      nationalityIso2: "JP",
      immediateOriginRegionId: "JP",
      immediateOnwardRegionId: "Japan",
      onwardTicketConfirmed: false,
    }),
  );

  expect(result.outcome).toBe("likely-unilateral-visa-free");
  expect(result.resultCategory).toBe("unilateral_30_day_may_apply");
});

test("an arrival after the published unilateral period requests a policy-date check", () => {
  const result = evaluateTransitEligibility(
    validInput({
      nationalityIso2: "FR",
      expectedEntryDate: "2027-01-10",
      immediateOriginRegionId: "JP",
      immediateOnwardRegionId: "Japan",
    }),
  );

  expect(result.outcome).toBe("policy-date-needs-verification");
  expect(result.resultCategory).toBe("policy_date_needs_verification");
  expect(result.reasons.join(" ")).toMatch(/published through 2026-12-31/i);
});

test("incomplete information returns a cautious needs-more-information category", () => {
  const result = evaluateTransitEligibility(
    validInput({ immediateOnwardRegionId: "" }),
  );

  expect(result.outcome).toBe("manual-review");
  expect(result.resultCategory).toBe("needs_more_information");
  expect(result.reasons.join(" ")).toMatch(/not confirmed/i);
});

test("Hong Kong, Macao and Taiwan normalize as separate route regions", () => {
  expect(normalizeVisaRegion("Hong Kong SAR China")).toBe("HK");
  expect(normalizeVisaRegion("Macau")).toBe("MO");
  expect(normalizeVisaRegion("Taiwan region")).toBe("TW");

  for (const [origin, onward] of [
    ["Hong Kong", "Macao"],
    ["Macao SAR China", "Taiwan"],
    ["TW", "HK"],
  ] as const) {
    const result = evaluateTransitEligibility(
      validInput({
        immediateOriginRegionId: origin,
        immediateOnwardRegionId: onward,
      }),
    );
    expect(result.outcome).toBe("likely-240-hour-transit");
  }

  const sameRegion = evaluateTransitEligibility(
    validInput({
      immediateOriginRegionId: "Hong Kong",
      immediateOnwardRegionId: "Hong Kong SAR China",
    }),
  );
  expect(sameRegion.resultCategory).toBe("third_country_route_issue");
});

test("another valid international travel document is not automatically denied", () => {
  const result = evaluateTransitEligibility(
    validInput({ passportType: "other-valid" }),
  );

  expect(result.outcome).toBe("likely-240-hour-transit");
  expect(result.resultCategory).toBe(
    "transit_240_conditions_appear_to_fit",
  );
});

test("through flights require official review while unknown answers request more information", () => {
  const throughFlight = evaluateTransitEligibility(
    validInput({ journeyType: "through-flight" }),
  );
  expect(throughFlight.outcome).toBe("manual-review");
  expect(throughFlight.resultCategory).toBe(
    "manual_official_verification_required",
  );

  for (const result of [
    evaluateTransitEligibility(validInput({ passportValidity: "unknown" })),
    evaluateTransitEligibility(validInput({ onwardTicketConfirmed: null })),
  ]) {
    expect(result.outcome).toBe("manual-review");
    expect(result.resultCategory).toBe("needs_more_information");
  }
});

test("a stay under 24 hours is not treated as an approval under a separate policy", () => {
  const result = evaluateTransitEligibility(validInput({ plannedStayHours: 20 }));

  expect(result.outcome).toBe("likely-240-hour-transit");
  expect(result.resultCategory).toBe("transit_240_conditions_appear_to_fit");
  expect(result.disclaimer).toMatch(/not an approval or guarantee of entry/i);
});

test("all representative results avoid absolute admission guarantees", () => {
  const results = [
    evaluateTransitEligibility(validInput()),
    evaluateTransitEligibility(
      validInput({ immediateOnwardRegionId: "Japan" }),
    ),
    evaluateTransitEligibility(validInput({ journeyType: "through-flight" })),
    evaluateTransitEligibility(
      validInput({ nationalityIso2: "JP" }),
    ),
  ];

  for (const result of results) expectNoAdmissionGuarantee(result);
});

test("analytics strips nationality, route, date, port and user input", () => {
  const safe = sanitizeVisaAnalyticsParams({
    result_category: "transit_240_conditions_appear_to_fit",
    step_number: 5,
    interaction_type: "complete",
    policy_version: "2026-07-19-v1",
    nationality: "US",
    route: "JP-CN-SG",
    expected_entry_date: "2026-08-01",
    entry_port: "Shanghai Pudong International Airport",
    user_input: "private itinerary",
  });

  expect(safe).toEqual({
    result_category: "transit_240_conditions_appear_to_fit",
    step_number: 5,
    interaction_type: "complete",
    policy_version: "2026-07-19-v1",
  });
  expect(Object.keys(safe).sort()).toEqual([
    "interaction_type",
    "policy_version",
    "result_category",
    "step_number",
  ]);
});
