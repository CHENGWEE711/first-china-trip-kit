import type { MetadataRoute } from "next";
import { absoluteUrl, siteConfig } from "@/lib/site";
import { isPreviewDeployment } from "@/lib/runtime";

export default function robots(): MetadataRoute.Robots {
  if (isPreviewDeployment) {
    return {
      rules: {
        userAgent: "*",
        disallow: "/",
      },
    };
  }

  return {
    rules: {
      userAgent: "*",
      allow: "/",
    },
    sitemap: absoluteUrl("/sitemap.xml"),
    host: siteConfig.siteUrl,
  };
}
