import { expect, test } from "@playwright/test";
import { VISA_POLICY_VERSION } from "@/data/visa-policy/version";
import {
  PERMITTED_STAY_AREA_GROUPS,
  TRANSIT_ELIGIBLE_COUNTRIES,
  TRANSIT_ELIGIBLE_COUNTRY_RECORDS,
  TRANSIT_PORTS,
  UNILATERAL_VISA_FREE_COUNTRIES,
  VISA_POLICY_META,
} from "@/data/visa";

const GUANGDONG_ADDITIONS = [
  "guangzhou-pazhou-ferry-terminal",
  "zhongshan-port-passenger",
  "hengqin-port",
  "hong-kong-zhuhai-macao-bridge-port",
  "west-kowloon-station-port",
] as const;

test("the July 19 policy version separates verification and effective dates", () => {
  expect(VISA_POLICY_VERSION).toEqual({
    id: "2026-07-19-v1",
    verifiedAt: "2026-07-19",
    transitCountriesEffectiveFrom: "2025-06-12",
    transitPortsEffectiveFrom: "2025-11-05",
    unilateralListAsOf: "2026-02-17",
  });
  expect(VISA_POLICY_META.policyVersion).toBe(VISA_POLICY_VERSION.id);
  expect(VISA_POLICY_META.lastVerifiedAt).toBe(
    VISA_POLICY_VERSION.verifiedAt,
  );
  expect(VISA_POLICY_META.transitCountriesEffectiveFrom).toBe(
    VISA_POLICY_VERSION.transitCountriesEffectiveFrom,
  );
  expect(VISA_POLICY_META.transitPortsEffectiveFrom).toBe(
    VISA_POLICY_VERSION.transitPortsEffectiveFrom,
  );
  expect(VISA_POLICY_META.unilateralListAsOf).toBe(
    VISA_POLICY_VERSION.unilateralListAsOf,
  );
});

test("the transit-country dataset has 55 unique ISO records and Indonesia's effective date", () => {
  expect(TRANSIT_ELIGIBLE_COUNTRIES).toHaveLength(55);
  expect(new Set(TRANSIT_ELIGIBLE_COUNTRIES).size).toBe(55);
  expect(TRANSIT_ELIGIBLE_COUNTRY_RECORDS).toHaveLength(55);
  expect(
    new Set(TRANSIT_ELIGIBLE_COUNTRY_RECORDS.map((country) => country.iso2))
      .size,
  ).toBe(55);
  expect(
    TRANSIT_ELIGIBLE_COUNTRY_RECORDS.find((country) => country.iso2 === "ID"),
  ).toMatchObject({
    name: "Indonesia",
    effectiveFrom: "2025-06-12",
  });
});

test("the 65 ports retain unique appendix rows, names, and 24 province-level regions", () => {
  expect(TRANSIT_PORTS).toHaveLength(65);
  expect(new Set(TRANSIT_PORTS.map((port) => port.id)).size).toBe(65);
  expect(
    new Set(TRANSIT_PORTS.map((port) => port.officialEnglishName)).size,
  ).toBe(65);

  const appendixRows = TRANSIT_PORTS.map((port) => port.appendixRow).sort(
    (left, right) => left - right,
  );
  expect(appendixRows).toEqual(
    Array.from({ length: 65 }, (_, index) => index + 1),
  );
  expect(
    new Set(TRANSIT_PORTS.map((port) => port.provinceLevelRegion)).size,
  ).toBe(24);
});

test("all ports reference known permitted areas and official sources", () => {
  const areaIds = new Set(PERMITTED_STAY_AREA_GROUPS.map((area) => area.id));

  for (const port of TRANSIT_PORTS) {
    expect(port.permittedAreaGroupIds.length).toBeGreaterThan(0);
    expect(
      port.permittedAreaGroupIds.every((areaId) => areaIds.has(areaId)),
      `${port.id} must reference only known permitted-area groups`,
    ).toBe(true);
    expect(port.officialSourceUrl).toMatch(
      /^https:\/\/(?:en\.)?nia\.gov\.cn\//,
    );
    expect(port.lastVerifiedAt).toBe("2026-07-19");
  }
});

test("the five Guangdong additions are present with their November 5 effective date", () => {
  for (const portId of GUANGDONG_ADDITIONS) {
    expect(TRANSIT_PORTS.find((port) => port.id === portId)).toMatchObject({
      provinceLevelRegion: "Guangdong",
      effectiveFrom: "2025-11-05",
    });
  }
});

test("the unilateral dataset has 50 unique countries and explicit expiry rules", () => {
  expect(UNILATERAL_VISA_FREE_COUNTRIES).toHaveLength(50);
  expect(
    new Set(UNILATERAL_VISA_FREE_COUNTRIES.map((country) => country.iso2))
      .size,
  ).toBe(50);
  expect(
    UNILATERAL_VISA_FREE_COUNTRIES.find((country) => country.iso2 === "BN"),
  ).toMatchObject({ validUntil: null });
  expect(
    UNILATERAL_VISA_FREE_COUNTRIES.find((country) => country.iso2 === "RU"),
  ).toMatchObject({ validUntil: "2027-12-31" });

  const standardExpiryCountries = UNILATERAL_VISA_FREE_COUNTRIES.filter(
    (country) => country.iso2 !== "BN" && country.iso2 !== "RU",
  );
  expect(standardExpiryCountries).toHaveLength(48);
  expect(
    standardExpiryCountries.every(
      (country) => country.validUntil === "2026-12-31",
    ),
  ).toBe(true);
});
