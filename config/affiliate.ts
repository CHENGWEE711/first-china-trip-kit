export type AffiliatePartnerKey = "airalo" | "klook" | "booking" | "safetywing";

export type AffiliateCategory =
  | "esim"
  | "hotels"
  | "tours"
  | "travel_insurance";

export type AffiliatePartner = {
  partner: AffiliatePartnerKey;
  category: AffiliateCategory;
  label: string;
  description: string;
  affiliateUrl: string;
  enabled: boolean;
  campaign: string;
  placement: string;
  disclosureRequired: boolean;
  anchorId: string;
};

const configuredUrls: Record<AffiliatePartnerKey, string> = {
  airalo: process.env.NEXT_PUBLIC_AFFILIATE_AIRALO_URL || "",
  klook: process.env.NEXT_PUBLIC_AFFILIATE_KLOOK_URL || "",
  booking: process.env.NEXT_PUBLIC_AFFILIATE_BOOKING_URL || "",
  safetywing: process.env.NEXT_PUBLIC_AFFILIATE_SAFETYWING_URL || "",
};

const configuredEnabled: Record<AffiliatePartnerKey, boolean> = {
  airalo: process.env.NEXT_PUBLIC_AFFILIATE_AIRALO_ENABLED !== "false",
  klook: process.env.NEXT_PUBLIC_AFFILIATE_KLOOK_ENABLED !== "false",
  booking: process.env.NEXT_PUBLIC_AFFILIATE_BOOKING_ENABLED !== "false",
  safetywing: process.env.NEXT_PUBLIC_AFFILIATE_SAFETYWING_ENABLED !== "false",
};

const configuredKlookCityUrls: Record<string, string> = {
  shanghai: process.env.NEXT_PUBLIC_AFFILIATE_KLOOK_SHANGHAI_URL || "",
  beijing: process.env.NEXT_PUBLIC_AFFILIATE_KLOOK_BEIJING_URL || "",
  xian: process.env.NEXT_PUBLIC_AFFILIATE_KLOOK_XIAN_URL || "",
  chengdu: process.env.NEXT_PUBLIC_AFFILIATE_KLOOK_CHENGDU_URL || "",
};

export function isValidAffiliateUrl(value: string) {
  if (!value) return false;

  try {
    const url = new URL(value);
    return url.protocol === "https:" && Boolean(url.hostname);
  } catch {
    return false;
  }
}

const baseConfig: Record<
  AffiliatePartnerKey,
  Omit<AffiliatePartner, "affiliateUrl" | "enabled">
> = {
  airalo: {
    partner: "airalo",
    category: "esim",
    label: "Check China eSIM Plans",
    description:
      "Compare eSIM options before arrival so maps, translation, and payment tools can work when you land.",
    campaign: "china_first_trip_affiliate_launch",
    placement: "travel_tools",
    disclosureRequired: true,
    anchorId: "china-esim",
  },
  booking: {
    partner: "booking",
    category: "hotels",
    label: "Find Hotels in China",
    description:
      "Compare accommodation in major China cities and save your confirmed hotel address in Chinese before arrival.",
    campaign: "china_first_trip_affiliate_launch",
    placement: "travel_tools",
    disclosureRequired: true,
    anchorId: "hotels-in-china",
  },
  klook: {
    partner: "klook",
    category: "tours",
    label: "Browse Tours & Tickets",
    description:
      "Explore attraction tickets, day tours, theme parks, and airport transfers that fit your route.",
    campaign: "china_first_trip_affiliate_launch",
    placement: "travel_tools",
    disclosureRequired: true,
    anchorId: "china-tours-tickets",
  },
  safetywing: {
    partner: "safetywing",
    category: "travel_insurance",
    label: "View Travel Insurance Options",
    description:
      "Review travel insurance options before departure and check coverage details for your own trip.",
    campaign: "china_first_trip_affiliate_launch",
    placement: "travel_tools",
    disclosureRequired: true,
    anchorId: "china-travel-insurance",
  },
};

export const affiliatePartners = Object.fromEntries(
  (Object.keys(baseConfig) as AffiliatePartnerKey[]).map((key) => {
    const affiliateUrl = configuredUrls[key].trim();
    return [
      key,
      {
        ...baseConfig[key],
        affiliateUrl,
        enabled: configuredEnabled[key] && isValidAffiliateUrl(affiliateUrl),
      },
    ];
  }),
) as Record<AffiliatePartnerKey, AffiliatePartner>;

export const affiliatePartnerOrder: AffiliatePartnerKey[] = [
  "airalo",
  "booking",
  "klook",
  "safetywing",
];

export function getAffiliatePartner(partner: AffiliatePartnerKey) {
  return affiliatePartners[partner];
}

export function resolveAffiliateUrl(
  partner: AffiliatePartnerKey,
  affiliateUrlOverride?: string,
) {
  if (!configuredEnabled[partner]) return "";

  const candidate = affiliateUrlOverride?.trim() || configuredUrls[partner].trim();
  return isValidAffiliateUrl(candidate) ? candidate : "";
}

export function getKlookCityAffiliateUrl(citySlug: string) {
  const candidate = configuredKlookCityUrls[citySlug]?.trim() || "";
  return isValidAffiliateUrl(candidate) ? candidate : undefined;
}
