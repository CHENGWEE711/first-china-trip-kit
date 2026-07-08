import type { Metadata } from "next";
import type { City } from "@/data/cities";
import type { FAQ } from "@/data/faqs";
import type { Guide } from "@/data/guides";
import type { Itinerary } from "@/data/itineraries";
import type { Product } from "@/data/products";
import { absoluteUrl, siteConfig } from "@/lib/site";

type SeoInput = {
  title: string;
  description: string;
  path: string;
  image?: string;
  type?: "website" | "article";
};

export function buildMetadata({
  title,
  description,
  path,
  image = siteConfig.heroImage,
  type = "website",
}: SeoInput): Metadata {
  const url = absoluteUrl(path);
  const imageUrl = absoluteUrl(image);

  return {
    title,
    description,
    alternates: {
      canonical: url,
    },
    openGraph: {
      title,
      description,
      url,
      siteName: siteConfig.name,
      images: [
        {
          url: imageUrl,
          width: 1600,
          height: 900,
          alt: `${siteConfig.name} travel planning visual`,
        },
      ],
      locale: "en_US",
      type,
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [imageUrl],
    },
  };
}

export function travelGuideJsonLd(input: {
  name: string;
  description: string;
  path: string;
  cityName?: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "TravelGuide",
    name: input.name,
    description: input.description,
    url: absoluteUrl(input.path),
    inLanguage: "en",
    publisher: {
      "@type": "Organization",
      name: siteConfig.name,
      url: siteConfig.siteUrl,
    },
    about: input.cityName
      ? {
          "@type": "City",
          name: input.cityName,
        }
      : {
          "@type": "Place",
          name: "China",
        },
  };
}

export function articleJsonLd(input: {
  title: string;
  description: string;
  path: string;
  updatedAt?: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: input.title,
    description: input.description,
    url: absoluteUrl(input.path),
    dateModified: input.updatedAt,
    inLanguage: "en",
    author: {
      "@type": "Organization",
      name: siteConfig.name,
    },
    publisher: {
      "@type": "Organization",
      name: siteConfig.name,
      url: siteConfig.siteUrl,
    },
  };
}

export function faqJsonLd(faqs: FAQ[], path: string) {
  if (faqs.length === 0) {
    return null;
  }

  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    url: absoluteUrl(path),
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
  };
}

export function breadcrumbJsonLd(items: { name: string; path: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: absoluteUrl(item.path),
    })),
  };
}

export function cityJsonLd(city: City, path: string, faqs: FAQ[] = []) {
  const url = absoluteUrl(path);
  const guide = {
    "@context": "https://schema.org",
    "@type": "TravelGuide",
    name: city.seoTitle,
    description: city.seoDescription,
    url,
    inLanguage: "en",
    publisher: {
      "@type": "Organization",
      name: siteConfig.name,
      url: siteConfig.siteUrl,
    },
    about: {
      "@type": "TouristDestination",
      name: city.cityName,
      alternateName: city.chineseName,
      address: {
        "@type": "PostalAddress",
        addressRegion: city.province,
        addressCountry: "CN",
      },
    },
  };
  const destination = {
    "@context": "https://schema.org",
    "@type": "TouristDestination",
    name: city.cityName,
    alternateName: city.chineseName,
    description: city.intro,
    touristType: city.bestFor,
    containsPlace: city.topAttractions.map((attraction) => ({
      "@type": "TouristAttraction",
      name: attraction,
    })),
  };
  const faq = faqJsonLd(faqs, path);

  return faq ? [guide, destination, faq] : [guide, destination];
}

export function guideJsonLd(guide: Guide, path: string, faqs: FAQ[] = []) {
  const article = articleJsonLd({
    title: guide.seoTitle,
    description: guide.seoDescription,
    path,
    updatedAt: guide.updatedAt,
  });
  const faq = faqJsonLd(faqs, path);
  const breadcrumb = breadcrumbJsonLd([
    { name: "Home", path: "/" },
    { name: "Blog", path: "/guides" },
    { name: guide.title, path },
  ]);

  return faq ? [article, faq, breadcrumb] : [article, breadcrumb];
}

export function itineraryJsonLd(itinerary: Itinerary, path: string, faqs: FAQ[] = []) {
  const url = absoluteUrl(path);
  const article = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: itinerary.seoTitle,
    description: itinerary.seoDescription,
    url,
    inLanguage: "en",
    author: {
      "@type": "Organization",
      name: siteConfig.name,
    },
    publisher: {
      "@type": "Organization",
      name: siteConfig.name,
      url: siteConfig.siteUrl,
    },
  };
  const travelGuide = {
    "@context": "https://schema.org",
    "@type": "TravelGuide",
    name: itinerary.title,
    description: itinerary.seoDescription,
    url,
    inLanguage: "en",
    about: itinerary.cities.map((city) => ({
      "@type": "TouristDestination",
      name: city,
    })),
    publisher: {
      "@type": "Organization",
      name: siteConfig.name,
      url: siteConfig.siteUrl,
    },
  };
  const trip = {
    "@context": "https://schema.org",
    "@type": "TouristTrip",
    name: itinerary.title,
    description: itinerary.seoDescription,
    url,
    touristType: itinerary.targetUser,
    itinerary: {
      "@type": "ItemList",
      itemListElement: itinerary.dayByDayPlan.map((day, index) => ({
        "@type": "ListItem",
        position: index + 1,
        name: `Day ${day.day}: ${day.title}`,
        description: `${day.morning} ${day.afternoon} ${day.evening}`,
      })),
    },
  };
  const itemList = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: `${itinerary.title} day-by-day itinerary`,
    itemListElement: itinerary.dayByDayPlan.map((day, index) => ({
      "@type": "ListItem",
      position: index + 1,
      url: `${url}#day-${day.day}`,
      name: day.title,
    })),
  };
  const faq = faqJsonLd(faqs, path);

  return faq ? [article, travelGuide, trip, itemList, faq] : [article, travelGuide, trip, itemList];
}

export function productJsonLd(product: Product, path: string) {
  const purchaseUrl =
    product.externalPurchaseUrl ||
    product.checkoutUrl ||
    product.gumroadUrl ||
    product.payhipUrl ||
    absoluteUrl(path);
  const price = product.price.replace(/[^0-9.]/g, "");

  return {
    "@context": "https://schema.org",
    "@type": "Product",
    name: product.title,
    description: product.summary,
    url: absoluteUrl(path),
    brand: {
      "@type": "Brand",
      name: siteConfig.name,
    },
    category: "Digital travel planning guide",
    offers: {
      "@type": "Offer",
      price: price || "0",
      priceCurrency: "USD",
      availability: product.externalPurchaseUrl
        ? "https://schema.org/InStock"
        : "https://schema.org/PreOrder",
      url: purchaseUrl,
      seller: {
        "@type": "Organization",
        name: siteConfig.name,
      },
    },
  };
}
