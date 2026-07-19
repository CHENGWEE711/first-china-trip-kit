import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { LandingPage } from "@/components/landing/LandingPage";
import { SEOJsonLd } from "@/components/SEOJsonLd";
import {
  getLandingDefinition,
  LANDING_SLUGS,
} from "@/data/landings";
import {
  buildLandingJsonLd,
  buildLandingMetadata,
} from "@/lib/landing/seo";

type PageProps = {
  params: Promise<{ slug: string }>;
};

export const dynamicParams = false;

export function generateStaticParams() {
  return LANDING_SLUGS.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const definition = getLandingDefinition(slug);

  if (!definition) return {};
  return buildLandingMetadata(definition);
}

export default async function SocialLandingPage({ params }: PageProps) {
  const { slug } = await params;
  const definition = getLandingDefinition(slug);

  if (!definition) notFound();

  return (
    <>
      <SEOJsonLd data={buildLandingJsonLd(definition)} />
      <LandingPage definition={definition} />
    </>
  );
}
