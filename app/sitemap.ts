import type { MetadataRoute } from "next";
import { cities } from "@/data/cities";
import { guides } from "@/data/guides";
import { itineraries } from "@/data/itineraries";
import { absoluteUrl } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes = [
    "",
    "/cities",
    "/itineraries",
    "/travel-essentials",
    "/guides",
    "/store",
    "/custom-itinerary",
    "/about",
    "/contact",
    "/privacy",
    "/terms",
    "/thank-you",
  ].map((path) => ({
    url: absoluteUrl(path || "/"),
    lastModified: new Date(),
    changeFrequency: "weekly" as const,
    priority: path === "" ? 1 : 0.8,
  }));

  const cityRoutes = cities.map((city) => ({
    url: absoluteUrl(`/cities/${city.slug}`),
    lastModified: new Date(),
    changeFrequency: "weekly" as const,
    priority: 0.75,
  }));

  const itineraryRoutes = itineraries.map((itinerary) => ({
    url: absoluteUrl(`/itineraries/${itinerary.slug}`),
    lastModified: new Date(),
    changeFrequency: "weekly" as const,
    priority: 0.75,
  }));

  const guideRoutes = guides.map((guide) => ({
    url: absoluteUrl(`/guides/${guide.slug}`),
    lastModified: new Date(guide.updatedAt),
    changeFrequency: "monthly" as const,
    priority: 0.7,
  }));

  return [...staticRoutes, ...cityRoutes, ...itineraryRoutes, ...guideRoutes];
}
