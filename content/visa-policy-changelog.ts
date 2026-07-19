import {
  VISA_OFFICIAL_SOURCE_URLS,
  VISA_POLICY_LAST_VERIFIED_AT,
} from "../data/visa/official-sources";

export type VisaPolicyChangelogEntry = {
  effectiveDate: string;
  title: string;
  whatChanged: string;
  officialSourceUrl: string;
  lastVerifiedAt: string;
};

export const VISA_POLICY_CHANGELOG: VisaPolicyChangelogEntry[] = [
  {
    effectiveDate: "2025-11-20",
    title: "Official online Arrival Card filling took effect",
    whatChanged:
      "Foreign travelers may submit entry information before arrival through the National Immigration Administration's official channels. Paper and port-based options remain available where applicable.",
    officialSourceUrl: VISA_OFFICIAL_SOURCE_URLS.currentPolicyAnnouncement,
    lastVerifiedAt: VISA_POLICY_LAST_VERIFIED_AT,
  },
  {
    effectiveDate: "2025-11-05",
    title: "Five additional Guangdong entry ports took effect",
    whatChanged:
      "Guangzhou Pazhou Ferry Terminal, Hengqin Port, Hong Kong-Zhuhai-Macao Bridge Port, Zhongshan Port (Passenger), and West Kowloon Station Port were added, increasing the applicable entry-port count from 60 to 65.",
    officialSourceUrl: VISA_OFFICIAL_SOURCE_URLS.currentPolicyAnnouncement,
    lastVerifiedAt: VISA_POLICY_LAST_VERIFIED_AT,
  },
  {
    effectiveDate: "2025-06-12",
    title: "Indonesia joined the 240-hour transit policy",
    whatChanged:
      "Indonesia was added to the nationality list, increasing the eligible-country count from 54 to 55.",
    officialSourceUrl: VISA_OFFICIAL_SOURCE_URLS.indonesiaAddition,
    lastVerifiedAt: VISA_POLICY_LAST_VERIFIED_AT,
  },
  {
    effectiveDate: "2024-12-17",
    title: "Transit stay duration expanded to 240 hours",
    whatChanged:
      "The earlier shorter transit arrangements were expanded and unified at up to 240 hours. The original official appendix was later expanded to the current 65 ports.",
    officialSourceUrl:
      VISA_OFFICIAL_SOURCE_URLS.base240HourPolicyAnnouncement,
    lastVerifiedAt: VISA_POLICY_LAST_VERIFIED_AT,
  },
];
