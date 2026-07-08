import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { CityGuideTemplate } from "@/components/CityGuideTemplate";
import { SEOJsonLd } from "@/components/SEOJsonLd";
import { cities, getCityBySlug } from "@/data/cities";
import { getCityGuideContent } from "@/data/city-guide-content";
import { guides } from "@/data/guides";
import { itineraries } from "@/data/itineraries";
import { buildMetadata, cityJsonLd } from "@/lib/seo";

type PageProps = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return cities.map((city) => ({ slug: city.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const city = getCityBySlug(slug);

  if (!city) {
    return {};
  }

  return buildMetadata({
    title: city.seoTitle,
    description: city.seoDescription,
    path: `/cities/${city.slug}`,
  });
}

export default async function CityDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const city = getCityBySlug(slug);

  if (!city) {
    notFound();
  }

  const content = getCityGuideContent(city.slug);
  const directItineraries = itineraries.filter((itinerary) =>
    itinerary.cities.includes(city.cityName),
  );
  const relatedItineraries =
    directItineraries.length > 0
      ? directItineraries
      : itineraries.filter((itinerary) =>
          ["10-days-classic-china-itinerary", "240-hour-visa-free-china-itinerary", "3-days-in-shanghai"].includes(
            itinerary.slug,
          ),
        );
  const relatedGuideSlugs =
    content?.relatedGuideSlugs || [
      "how-to-pay-in-china-as-a-foreigner",
      "best-apps-for-traveling-in-china",
      "how-to-book-high-speed-trains-in-china",
    ];
  const relatedGuides = guides.filter((guide) => relatedGuideSlugs.includes(guide.slug));

  return (
    <>
      <SEOJsonLd data={cityJsonLd(city, `/cities/${city.slug}`, content?.faq)} />
      <CityGuideTemplate
        city={city}
        content={content}
        relatedItineraries={relatedItineraries}
        relatedGuides={relatedGuides}
      />
    </>
  );
}
