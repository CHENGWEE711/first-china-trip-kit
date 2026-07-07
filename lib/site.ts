import siteDefaults from "@/lib/site-defaults.json";

const configuredSiteUrl =
  process.env.NEXT_PUBLIC_SITE_URL || siteDefaults.defaultSiteUrl;

export const siteConfig = {
  name: siteDefaults.name,
  siteUrl: configuredSiteUrl.replace(/\/$/, ""),
  currentTestSiteUrl: siteDefaults.currentTestSiteUrl,
  reservedSiteUrl: siteDefaults.defaultSiteUrl,
  description: siteDefaults.description,
  heroImage: siteDefaults.heroImage,
  contactEmail: siteDefaults.contactEmail,
  reservedContactEmail: siteDefaults.reservedContactEmail,
};

export const navItems = [
  { href: "/cities", label: "Cities" },
  { href: "/itineraries", label: "Itineraries" },
  { href: "/travel-essentials", label: "Travel Essentials" },
  { href: "/guides/how-to-pay-in-china-as-a-foreigner", label: "Payment Guide" },
  { href: "/store", label: "Store" },
  { href: "/about", label: "About" },
];

export const footerLegalItems = [
  { href: "/privacy", label: "Privacy Policy" },
  { href: "/terms", label: "Terms of Use" },
  { href: "/contact", label: "Contact" },
];

export function absoluteUrl(path = "") {
  const base = siteConfig.siteUrl.replace(/\/$/, "");
  if (/^https?:\/\//.test(path)) {
    return path;
  }
  const cleanPath = path.startsWith("/") ? path : `/${path}`;
  return `${base}${cleanPath}`;
}
