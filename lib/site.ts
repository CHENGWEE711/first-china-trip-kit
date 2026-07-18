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
  { href: "/start-here", label: "Start Here" },
  { href: "/payments-and-apps", label: "Payments & Apps" },
  { href: "/city-kits", label: "Destinations" },
  { href: "/itinerary-kits", label: "Plan Your Trip" },
  { href: "/guides", label: "Guides" },
  { href: "/store", label: "Store" },
];

export const footerLegalItems = [
  { href: "/about", label: "About" },
  { href: "/privacy", label: "Privacy Policy" },
  { href: "/terms", label: "Terms of Use" },
  { href: "/refund-policy", label: "Refund Policy" },
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
