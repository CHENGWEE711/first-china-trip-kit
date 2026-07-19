import {
  VISA_OFFICIAL_SOURCE_URLS,
  VISA_POLICY_LAST_VERIFIED_AT,
} from "./official-sources";

export type UnilateralVisaFreePurpose =
  | "business"
  | "tourism"
  | "family-friends"
  | "exchange"
  | "transit";

export type UnilateralVisaFreeCountry = {
  iso2: string;
  name: string;
  passportType: "ordinary";
  maxStayDays: number;
  eligiblePurposes: UnilateralVisaFreePurpose[];
  effectiveFrom?: string;
  validUntil: string | null;
  effectiveUntil?: string | null;
  officialSourceUrl: string;
  lastVerifiedAt: string;
};

export const UNILATERAL_VISA_FREE_PURPOSES: UnilateralVisaFreePurpose[] = [
  "business",
  "tourism",
  "family-friends",
  "exchange",
  "transit",
];

const UNILATERAL_COUNTRY_DEFINITIONS = [
  { iso2: "AD", name: "Andorra" },
  { iso2: "AT", name: "Austria" },
  { iso2: "BE", name: "Belgium" },
  { iso2: "BG", name: "Bulgaria" },
  { iso2: "HR", name: "Croatia" },
  { iso2: "CY", name: "Cyprus" },
  { iso2: "DK", name: "Denmark" },
  { iso2: "EE", name: "Estonia" },
  { iso2: "FI", name: "Finland" },
  { iso2: "FR", name: "France" },
  { iso2: "DE", name: "Germany" },
  { iso2: "GR", name: "Greece" },
  { iso2: "HU", name: "Hungary" },
  { iso2: "IS", name: "Iceland" },
  { iso2: "IE", name: "Ireland" },
  { iso2: "IT", name: "Italy" },
  { iso2: "LV", name: "Latvia" },
  { iso2: "LI", name: "Liechtenstein" },
  { iso2: "LU", name: "Luxembourg" },
  { iso2: "MT", name: "Malta" },
  { iso2: "MC", name: "Monaco" },
  { iso2: "ME", name: "Montenegro" },
  { iso2: "NL", name: "Netherlands" },
  { iso2: "MK", name: "North Macedonia" },
  { iso2: "NO", name: "Norway" },
  { iso2: "PL", name: "Poland" },
  { iso2: "PT", name: "Portugal" },
  { iso2: "RO", name: "Romania" },
  { iso2: "RU", name: "Russian Federation" },
  { iso2: "SK", name: "Slovakia" },
  { iso2: "SI", name: "Slovenia" },
  { iso2: "ES", name: "Spain" },
  { iso2: "SE", name: "Sweden" },
  { iso2: "CH", name: "Switzerland" },
  { iso2: "GB", name: "United Kingdom" },
  { iso2: "AU", name: "Australia" },
  { iso2: "NZ", name: "New Zealand" },
  { iso2: "BH", name: "Bahrain" },
  { iso2: "BN", name: "Brunei" },
  { iso2: "JP", name: "Japan" },
  { iso2: "KW", name: "Kuwait" },
  { iso2: "OM", name: "Oman" },
  { iso2: "KR", name: "South Korea" },
  { iso2: "SA", name: "Saudi Arabia" },
  { iso2: "AR", name: "Argentina" },
  { iso2: "BR", name: "Brazil" },
  { iso2: "CA", name: "Canada" },
  { iso2: "CL", name: "Chile" },
  { iso2: "PE", name: "Peru" },
  { iso2: "UY", name: "Uruguay" },
] as const;

export type UnilateralVisaFreeCountryIso2 =
  (typeof UNILATERAL_COUNTRY_DEFINITIONS)[number]["iso2"];

function getUnilateralPolicyEndDate(
  iso2: UnilateralVisaFreeCountryIso2,
): string | null {
  if (iso2 === "BN") {
    return null;
  }

  if (iso2 === "RU") {
    return "2027-12-31";
  }

  return "2026-12-31";
}

export const UNILATERAL_VISA_FREE_COUNTRIES: UnilateralVisaFreeCountry[] =
  UNILATERAL_COUNTRY_DEFINITIONS.map(({ iso2, name }) => ({
    iso2,
    name,
    passportType: "ordinary",
    maxStayDays: 30,
    eligiblePurposes: [...UNILATERAL_VISA_FREE_PURPOSES],
    // The current NIA list does not publish a verified start date per country.
    // Keep the optional field absent instead of inferring one.
    validUntil: getUnilateralPolicyEndDate(iso2),
    // Compatibility alias for existing consumers. New policy logic uses
    // `validUntil`, which mirrors the terminology in the July 19 dataset.
    effectiveUntil: getUnilateralPolicyEndDate(iso2),
    officialSourceUrl:
      VISA_OFFICIAL_SOURCE_URLS.unilateralVisaFreeCountries,
    lastVerifiedAt: VISA_POLICY_LAST_VERIFIED_AT,
  }));

if (UNILATERAL_VISA_FREE_COUNTRIES.length !== 50) {
  throw new Error("Unilateral visa-free country dataset count mismatch");
}

if (
  new Set(UNILATERAL_VISA_FREE_COUNTRIES.map((country) => country.iso2))
    .size !== 50
) {
  throw new Error(
    "Unilateral visa-free country dataset contains duplicate ISO codes",
  );
}
