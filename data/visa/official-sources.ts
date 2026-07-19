import { VISA_POLICY_VERSION } from "@/data/visa-policy/version";

export type VisaOfficialSource = {
  id: string;
  title: string;
  authority:
    | "National Immigration Administration of China"
    | "Ministry of Foreign Affairs of the People's Republic of China";
  url: string;
  language: "en" | "zh";
  publishedAt?: string;
  effectiveFrom?: string;
  factsSupported: string[];
  lastVerifiedAt: string;
};

export const VISA_POLICY_LAST_VERIFIED_AT = VISA_POLICY_VERSION.verifiedAt;

export const VISA_OFFICIAL_SOURCE_URLS = {
  currentPolicyAnnouncement:
    "https://en.nia.gov.cn/n147413/c187308/content.html",
  currentPolicyAnnouncementZh:
    "https://www.nia.gov.cn/n897453/c1751080/content.html",
  currentTransitPolicyInterpretation:
    "https://en.nia.gov.cn/n147418/n147463/c183412/content.html",
  currentTransitPolicyInterpretationZh:
    "https://www.nia.gov.cn/n741440/n741577/c1731205/content.html",
  unilateralVisaFreeCountries:
    "https://en.nia.gov.cn/n147418/n147463/c183390/content.html",
  unilateralVisaFreeFaq:
    "https://www.mfa.gov.cn/wjbzwfwpt/kzx/tzgg/202511/t20251110_11749824.html",
  mutualVisaExemptionList: "https://cs.mfa.gov.cn/wgrlh/lhqz/mvel/",
  officialArrivalCard: "https://s.nia.gov.cn/ArrivalCardFillingPC/",
  indonesiaAddition:
    "https://en.nia.gov.cn/n147418/n147468/c182992/content.html",
  base240HourPolicyAnnouncement:
    "https://www.nia.gov.cn/n741440/n741542/c1688980/content.html",
  immigrationServiceHotline:
    "https://en.nia.gov.cn/n147418/n147468/c194788/content.html",
} as const;

export const VISA_OFFICIAL_SOURCES = [
  {
    id: "nia-2025-11-current-policy",
    title:
      "Announcement on Implementing 10 New Measures to Support the Expansion of Opening-up and Serve High-quality Development",
    authority: "National Immigration Administration of China",
    url: VISA_OFFICIAL_SOURCE_URLS.currentPolicyAnnouncement,
    language: "en",
    publishedAt: "2025-11-03",
    effectiveFrom: "2025-11-05",
    factsSupported: [
      "55 eligible nationalities",
      "65 eligible entry ports",
      "24 province-level regions",
      "minimum three-month travel-document validity",
      "confirmed onward travel within 240 hours",
      "clock begins at 00:00 on the day after entry",
      "five additional Guangdong entry ports",
      "official Arrival Card channels",
      "China Immigration Service Hotline 12367",
    ],
    lastVerifiedAt: VISA_POLICY_LAST_VERIFIED_AT,
  },
  {
    id: "nia-current-transit-policy-interpretation",
    title: "Visa-Free Transit Policies",
    authority: "National Immigration Administration of China",
    url: VISA_OFFICIAL_SOURCE_URLS.currentTransitPolicyInterpretation,
    language: "en",
    publishedAt: "2025-07-04",
    factsSupported: [
      "24-hour direct transit conditions",
      "240-hour transit conditions",
      "permitted and visa-required activities",
    ],
    lastVerifiedAt: VISA_POLICY_LAST_VERIFIED_AT,
  },
  {
    id: "nia-2026-02-unilateral-list",
    title: "List of Countries Covered by Unilateral Visa Exemption Policies",
    authority: "National Immigration Administration of China",
    url: VISA_OFFICIAL_SOURCE_URLS.unilateralVisaFreeCountries,
    language: "en",
    publishedAt: "2026-02-17",
    factsSupported: [
      "50-country unilateral visa-free list",
      "ordinary-passport requirement",
      "eligible purposes",
      "maximum 30-day stay",
    ],
    lastVerifiedAt: VISA_POLICY_LAST_VERIFIED_AT,
  },
  {
    id: "mfa-unilateral-visa-free-faq",
    title: "FAQs on Visa-free Entry into China",
    authority: "Ministry of Foreign Affairs of the People's Republic of China",
    url: VISA_OFFICIAL_SOURCE_URLS.unilateralVisaFreeFaq,
    language: "zh",
    factsSupported: [
      "unilateral visa-free policy end dates",
      "ordinary-passport and purpose requirements",
      "30-day stay calculation",
      "border-inspection decision",
    ],
    lastVerifiedAt: VISA_POLICY_LAST_VERIFIED_AT,
  },
  {
    id: "mfa-mutual-visa-exemption-list",
    title: "List of Agreements on Mutual Visa Exemption",
    authority: "Ministry of Foreign Affairs of the People's Republic of China",
    url: VISA_OFFICIAL_SOURCE_URLS.mutualVisaExemptionList,
    language: "en",
    factsSupported: [
      "separate bilateral visa-exemption agreements",
      "passport categories covered by each agreement",
    ],
    lastVerifiedAt: VISA_POLICY_LAST_VERIFIED_AT,
  },
  {
    id: "nia-2025-06-indonesia",
    title:
      "Announcement on China's 240-hour Visa-Free Transit Policy Applicable to Indonesia",
    authority: "National Immigration Administration of China",
    url: VISA_OFFICIAL_SOURCE_URLS.indonesiaAddition,
    language: "en",
    publishedAt: "2025-06-13",
    effectiveFrom: "2025-06-12",
    factsSupported: [
      "Indonesia added to the transit policy",
      "current 55-country transit total",
    ],
    lastVerifiedAt: VISA_POLICY_LAST_VERIFIED_AT,
  },
  {
    id: "nia-2024-12-base-240-hour-policy",
    title:
      "Announcement on Further Relaxing and Optimizing Visa-Free Transit Policy for Foreign Nationals",
    authority: "National Immigration Administration of China",
    url: VISA_OFFICIAL_SOURCE_URLS.base240HourPolicyAnnouncement,
    language: "zh",
    publishedAt: "2024-12-17",
    effectiveFrom: "2024-12-17",
    factsSupported: [
      "replacement of the earlier shorter transit periods with 240 hours",
      "permitted stay areas in 24 province-level regions",
      "cross-region travel within the published permitted areas",
    ],
    lastVerifiedAt: VISA_POLICY_LAST_VERIFIED_AT,
  },
  {
    id: "nia-official-arrival-card",
    title: "Official Online Arrival Card Filling",
    authority: "National Immigration Administration of China",
    url: VISA_OFFICIAL_SOURCE_URLS.officialArrivalCard,
    language: "zh",
    factsSupported: ["official online Arrival Card channel"],
    lastVerifiedAt: VISA_POLICY_LAST_VERIFIED_AT,
  },
  {
    id: "nia-12367-hotline",
    title: "China Immigration Service Hotline 12367",
    authority: "National Immigration Administration of China",
    url: VISA_OFFICIAL_SOURCE_URLS.immigrationServiceHotline,
    language: "en",
    publishedAt: "2025-12-11",
    factsSupported: ["+86-12367 dialing format", "24/7 multilingual support"],
    lastVerifiedAt: VISA_POLICY_LAST_VERIFIED_AT,
  },
] satisfies VisaOfficialSource[];

if (
  VISA_OFFICIAL_SOURCES.some(
    (source) => !source.url.startsWith("https://") || !source.lastVerifiedAt,
  )
) {
  throw new Error("Every visa policy source must have a verified HTTPS URL");
}
