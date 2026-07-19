import type { MetadataRoute } from "next";
import { guides } from "@/data/guides";
import { cityKitSlugs, itineraryKitSlugs, toolKits } from "@/data/kits";
import { absoluteUrl } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes = [
    "",
    "/start-here",
    "/visa-free-transit",
    "/payments-and-apps",
    "/city-kits",
    "/itinerary-kits",
    "/travel-essentials",
    "/travel-tools",
    "/guides",
    "/tools",
    "/store",
    "/custom-itinerary",
    "/about",
    "/contact",
    "/privacy",
    "/terms",
    "/refund-policy",
    "/affiliate-disclosure",
  ].map((path) => ({
    url: absoluteUrl(path || "/"),
    lastModified: new Date(),
    changeFrequency: "weekly" as const,
    priority: path === "" ? 1 : 0.8,
  }));

  const guideRoutes = guides.map((guide) => ({
    url: absoluteUrl(`/guides/${guide.slug}`),
    lastModified: new Date(guide.updatedAt),
    changeFrequency: "monthly" as const,
    priority: 0.7,
  }));

  const cityKitRoutes = cityKitSlugs.map((slug) => ({
    url: absoluteUrl(`/city-kits/${slug}`),
    lastModified: new Date(),
    changeFrequency: "weekly" as const,
    priority: 0.8,
  }));

  const itineraryKitRoutes = itineraryKitSlugs.map((slug) => ({
    url: absoluteUrl(`/itinerary-kits/${slug}`),
    lastModified: new Date(),
    changeFrequency: "weekly" as const,
    priority: 0.8,
  }));

  const toolRoutes = toolKits.filter((tool) => tool.type !== "visa").map((tool) => ({
    url: absoluteUrl(`/tools/${tool.slug}`),
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: 0.65,
  }));

  return [
    ...staticRoutes,
    ...cityKitRoutes,
    ...itineraryKitRoutes,
    ...guideRoutes,
    ...toolRoutes,
  ];
}
