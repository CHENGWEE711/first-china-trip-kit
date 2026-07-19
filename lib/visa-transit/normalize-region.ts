import { COUNTRY_REGION_OPTIONS } from "@/data/visa";

function normalizeAlias(value: string) {
  return value
    .trim()
    .toLocaleLowerCase("en")
    .replace(/&/g, "and")
    .replace(/[^a-z0-9]+/g, " ")
    .trim();
}

const REGION_ALIASES = new Map<string, string>();

for (const region of COUNTRY_REGION_OPTIONS) {
  REGION_ALIASES.set(normalizeAlias(region.code), region.code);
  REGION_ALIASES.set(normalizeAlias(region.name), region.code);
}

for (const [alias, code] of [
  ["hong kong", "HK"],
  ["hong kong sar", "HK"],
  ["hong kong special administrative region", "HK"],
  ["macau", "MO"],
  ["macao", "MO"],
  ["macao sar", "MO"],
  ["macao special administrative region", "MO"],
  ["taiwan", "TW"],
  ["taiwan region", "TW"],
] as const) {
  REGION_ALIASES.set(normalizeAlias(alias), code);
}

/**
 * Returns a stable country/region code for route comparison. Unknown values
 * remain normalized strings so the evaluator can fail cautiously instead of
 * guessing a country or region.
 */
export function normalizeVisaRegion(value: string): string {
  const normalized = normalizeAlias(value);
  return REGION_ALIASES.get(normalized) ?? normalized.toUpperCase();
}
