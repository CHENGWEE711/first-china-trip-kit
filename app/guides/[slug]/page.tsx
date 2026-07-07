import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { GuideTemplate } from "@/components/GuideTemplate";
import { SEOJsonLd } from "@/components/SEOJsonLd";
import { getGuideBySlug, guides } from "@/data/guides";
import { getGuideDetailContent } from "@/data/guide-detail-content";
import { getProductsByIds } from "@/data/products";
import { buildMetadata, guideJsonLd } from "@/lib/seo";

type PageProps = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return guides.map((guide) => ({ slug: guide.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const guide = getGuideBySlug(slug);

  if (!guide) {
    return {};
  }

  return buildMetadata({
    title: guide.seoTitle,
    description: guide.seoDescription,
    path: `/guides/${guide.slug}`,
    type: "article",
  });
}

export default async function GuideDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const guide = getGuideBySlug(slug);

  if (!guide) {
    notFound();
  }

  const detail = getGuideDetailContent(guide.slug);
  const products = getProductsByIds(detail?.relatedProductIds || []);
  const relatedGuideSlugs =
    detail?.relatedGuideSlugs ||
    guides
      .filter((candidate) => candidate.slug !== guide.slug && candidate.category === guide.category)
      .map((candidate) => candidate.slug);
  const relatedGuides = guides
    .filter((candidate) => candidate.slug !== guide.slug && relatedGuideSlugs.includes(candidate.slug))
    .slice(0, 3);
  const faqs = detail?.faq || [
    {
      question: "What should I save offline before my first day in China?",
      answer:
        "Save your hotel address in Chinese, passport copy, transport bookings, payment backup notes, and any attraction confirmations. Screenshots are often faster than opening apps in a busy station or taxi pickup area.",
    },
  ];

  return (
    <>
      <SEOJsonLd data={guideJsonLd(guide, `/guides/${guide.slug}`, faqs)} />
      <GuideTemplate
        guide={guide}
        detail={detail}
        relatedGuides={relatedGuides}
        products={products}
      />
    </>
  );
}
