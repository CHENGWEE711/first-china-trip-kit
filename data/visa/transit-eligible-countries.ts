import {
  VISA_OFFICIAL_SOURCE_URLS,
  VISA_POLICY_LAST_VERIFIED_AT,
} from "./official-sources";

export type TransitEligibleCountryRegion =
  | "Europe"
  | "Americas"
  | "Oceania"
  | "Asia";

export type TransitEligibleCountry = {
  iso2: string;
  name: string;
  region: TransitEligibleCountryRegion;
  effectiveFrom?: string;
  officialSourceUrl: string;
  lastVerifiedAt: string;
};

export const TRANSIT_ELIGIBLE_COUNTRIES = [
  "AL", "AT", "BY", "BE", "BA", "BG", "HR", "CY", "CZ", "DK",
  "EE", "FI", "FR", "DE", "GR", "HU", "IS", "IE", "IT", "LV",
  "LT", "LU", "MT", "MC", "ME", "NL", "MK", "NO", "PL", "PT",
  "RO", "RU", "RS", "SK", "SI", "ES", "SE", "CH", "UA", "GB",
  "AR", "BR", "CA", "CL", "MX", "US",
  "AU", "NZ",
  "BN", "ID", "JP", "QA", "SG", "KR", "AE",
] as const;

export type TransitEligibleCountryIso2 =
  (typeof TRANSIT_ELIGIBLE_COUNTRIES)[number];

const TRANSIT_COUNTRY_NAMES: Record<
  TransitEligibleCountryIso2,
  { name: string; region: TransitEligibleCountryRegion }
> = {
  AL: { name: "Albania", region: "Europe" },
  AT: { name: "Austria", region: "Europe" },
  BY: { name: "Belarus", region: "Europe" },
  BE: { name: "Belgium", region: "Europe" },
  BA: { name: "Bosnia and Herzegovina", region: "Europe" },
  BG: { name: "Bulgaria", region: "Europe" },
  HR: { name: "Croatia", region: "Europe" },
  CY: { name: "Cyprus", region: "Europe" },
  CZ: { name: "Czech Republic", region: "Europe" },
  DK: { name: "Denmark", region: "Europe" },
  EE: { name: "Estonia", region: "Europe" },
  FI: { name: "Finland", region: "Europe" },
  FR: { name: "France", region: "Europe" },
  DE: { name: "Germany", region: "Europe" },
  GR: { name: "Greece", region: "Europe" },
  HU: { name: "Hungary", region: "Europe" },
  IS: { name: "Iceland", region: "Europe" },
  IE: { name: "Ireland", region: "Europe" },
  IT: { name: "Italy", region: "Europe" },
  LV: { name: "Latvia", region: "Europe" },
  LT: { name: "Lithuania", region: "Europe" },
  LU: { name: "Luxembourg", region: "Europe" },
  MT: { name: "Malta", region: "Europe" },
  MC: { name: "Monaco", region: "Europe" },
  ME: { name: "Montenegro", region: "Europe" },
  NL: { name: "Netherlands", region: "Europe" },
  MK: { name: "North Macedonia", region: "Europe" },
  NO: { name: "Norway", region: "Europe" },
  PL: { name: "Poland", region: "Europe" },
  PT: { name: "Portugal", region: "Europe" },
  RO: { name: "Romania", region: "Europe" },
  RU: { name: "Russian Federation", region: "Europe" },
  RS: { name: "Serbia", region: "Europe" },
  SK: { name: "Slovakia", region: "Europe" },
  SI: { name: "Slovenia", region: "Europe" },
  ES: { name: "Spain", region: "Europe" },
  SE: { name: "Sweden", region: "Europe" },
  CH: { name: "Switzerland", region: "Europe" },
  UA: { name: "Ukraine", region: "Europe" },
  GB: { name: "United Kingdom", region: "Europe" },
  AR: { name: "Argentina", region: "Americas" },
  BR: { name: "Brazil", region: "Americas" },
  CA: { name: "Canada", region: "Americas" },
  CL: { name: "Chile", region: "Americas" },
  MX: { name: "Mexico", region: "Americas" },
  US: { name: "United States", region: "Americas" },
  AU: { name: "Australia", region: "Oceania" },
  NZ: { name: "New Zealand", region: "Oceania" },
  BN: { name: "Brunei", region: "Asia" },
  ID: { name: "Indonesia", region: "Asia" },
  JP: { name: "Japan", region: "Asia" },
  QA: { name: "Qatar", region: "Asia" },
  SG: { name: "Singapore", region: "Asia" },
  KR: { name: "South Korea", region: "Asia" },
  AE: { name: "United Arab Emirates", region: "Asia" },
};

export const TRANSIT_ELIGIBLE_COUNTRY_RECORDS: TransitEligibleCountry[] =
  TRANSIT_ELIGIBLE_COUNTRIES.map((iso2) => ({
    iso2,
    ...TRANSIT_COUNTRY_NAMES[iso2],
    ...(iso2 === "ID" ? { effectiveFrom: "2025-06-12" } : {}),
    officialSourceUrl: VISA_OFFICIAL_SOURCE_URLS.currentPolicyAnnouncement,
    lastVerifiedAt: VISA_POLICY_LAST_VERIFIED_AT,
  }));

if (TRANSIT_ELIGIBLE_COUNTRIES.length !== 55) {
  throw new Error("Transit country dataset count mismatch");
}

if (new Set(TRANSIT_ELIGIBLE_COUNTRIES).size !== 55) {
  throw new Error("Transit country dataset contains duplicate ISO codes");
}
