import { LandingAnalytics } from "@/components/landing/LandingAnalytics";
import { LandingBenefitGrid } from "@/components/landing/LandingBenefitGrid";
import { LandingFAQ } from "@/components/landing/LandingFAQ";
import { LandingFooterCTA } from "@/components/landing/LandingFooterCTA";
import { LandingHero } from "@/components/landing/LandingHero";
import { LandingHubPreview } from "@/components/landing/LandingHubPreview";
import { LandingNewsletter } from "@/components/landing/LandingNewsletter";
import { LandingPrimaryCTA } from "@/components/landing/LandingPrimaryCTA";
import { LandingQuickAnswer } from "@/components/landing/LandingQuickAnswer";
import { LandingRelatedContent } from "@/components/landing/LandingRelatedContent";
import { LandingTrustSection } from "@/components/landing/LandingTrustSection";
import type { LandingPageDefinition } from "@/data/landings";
import { guides } from "@/data/guides";

export function LandingPage({
  definition,
}: {
  definition: LandingPageDefinition;
}) {
  const relatedGuides = definition.relatedGuideSlugs
    .map((slug) => guides.find((guide) => guide.slug === slug))
    .filter((guide): guide is (typeof guides)[number] => Boolean(guide));

  return (
    <div data-landing-name={definition.landingName}>
      <LandingAnalytics landingName={definition.landingName} />
      <LandingHero definition={definition} />
      <LandingQuickAnswer definition={definition} />
      <LandingBenefitGrid definition={definition} />
      <LandingTrustSection definition={definition} />
      <LandingPrimaryCTA definition={definition} />
      <LandingHubPreview definition={definition} />
      <LandingFAQ definition={definition} />
      <LandingRelatedContent definition={definition} guides={relatedGuides} />
      <LandingNewsletter definition={definition} />
      <LandingFooterCTA definition={definition} />
    </div>
  );
}
