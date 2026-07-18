import type { Metadata } from "next";
import { notFound, redirect } from "next/navigation";
import { GuideTemplate } from "@/components/GuideTemplate";
import { SEOJsonLd } from "@/components/SEOJsonLd";
import { getGuideBySlug, guides, type Guide } from "@/data/guides";
import { getGuideDetailContent } from "@/data/guide-detail-content";
import { getProductsByIds } from "@/data/products";
import { buildMetadata, guideJsonLd } from "@/lib/seo";

type PageProps = {
  params: Promise<{ slug: string }>;
};

const legacyGuideRedirects: Record<string, string> = {
  "how-to-take-high-speed-trains-in-china": "how-to-book-high-speed-trains-in-china",
  "china-internet-and-esim-guide": "china-esim-guide-for-tourists",
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
    image: guide.heroImage.src,
    imageAlt: guide.heroImage.alt,
    imageWidth: 2400,
    imageHeight: 1600,
    type: "article",
  });
}

export default async function GuideDetailPage({ params }: PageProps) {
  const { slug } = await params;

  if (legacyGuideRedirects[slug]) {
    redirect(`/guides/${legacyGuideRedirects[slug]}`);
  }

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
  const relatedGuides = relatedGuideSlugs
    .map((relatedSlug) => guides.find((candidate) => candidate.slug === relatedSlug))
    .filter((candidate): candidate is Guide => candidate !== undefined && candidate.slug !== guide.slug)
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
