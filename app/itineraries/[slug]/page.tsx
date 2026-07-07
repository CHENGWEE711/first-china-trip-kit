import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ItineraryTemplate } from "@/components/ItineraryTemplate";
import { SEOJsonLd } from "@/components/SEOJsonLd";
import { getItineraryBySlug, itineraries } from "@/data/itineraries";
import { getItineraryGuideContent } from "@/data/itinerary-guide-content";
import { getProductsByIds } from "@/data/products";
import { buildMetadata, itineraryJsonLd } from "@/lib/seo";

type PageProps = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return itineraries.map((itinerary) => ({ slug: itinerary.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const itinerary = getItineraryBySlug(slug);

  if (!itinerary) {
    return {};
  }

  return buildMetadata({
    title: itinerary.seoTitle,
    description: itinerary.seoDescription,
    path: `/itineraries/${itinerary.slug}`,
  });
}

export default async function ItineraryDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const itinerary = getItineraryBySlug(slug);

  if (!itinerary) {
    notFound();
  }

  const content = getItineraryGuideContent(itinerary.slug);
  const products = getProductsByIds(content?.relatedProductIds || []);

  return (
    <>
      <SEOJsonLd data={itineraryJsonLd(itinerary, `/itineraries/${itinerary.slug}`, content?.faq)} />
      <ItineraryTemplate itinerary={itinerary} content={content} products={products} />
    </>
  );
}
