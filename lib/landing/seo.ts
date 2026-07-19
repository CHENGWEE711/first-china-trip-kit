import type { Metadata } from "next";
import type { LandingPageDefinition } from "@/data/landings";
import { breadcrumbJsonLd, buildMetadata, faqJsonLd } from "@/lib/seo";
import { absoluteUrl, siteConfig } from "@/lib/site";

export function buildLandingMetadata(
  definition: LandingPageDefinition,
): Metadata {
  return buildMetadata({
    title: definition.seo.title,
    description: definition.seo.description,
    path: definition.path,
    image: definition.seo.image.src,
    imageAlt: definition.seo.image.alt,
    imageWidth: 2400,
    imageHeight: 1600,
  });
}

export function buildLandingJsonLd(definition: LandingPageDefinition) {
  const webPage = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: definition.seo.title,
    description: definition.seo.description,
    url: absoluteUrl(definition.path),
    inLanguage: "en",
    primaryImageOfPage: {
      "@type": "ImageObject",
      url: absoluteUrl(definition.seo.image.src),
      caption: definition.seo.image.alt,
      width: 2400,
      height: 1600,
    },
    isPartOf: {
      "@type": "WebSite",
      name: siteConfig.name,
      url: siteConfig.siteUrl,
    },
    publisher: {
      "@type": "Organization",
      name: siteConfig.name,
      url: siteConfig.siteUrl,
    },
  };

  const breadcrumb = breadcrumbJsonLd([
    { name: "Home", path: "/" },
    { name: definition.breadcrumbLabel, path: definition.path },
  ]);
  const faq = faqJsonLd(definition.faqs, definition.path);

  return faq ? [webPage, breadcrumb, faq] : [webPage, breadcrumb];
}
