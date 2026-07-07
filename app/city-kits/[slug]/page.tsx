import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import type { ReactNode } from "react";
import { ChecklistCTA } from "@/components/ChecklistCTA";
import { FAQSection } from "@/components/FAQSection";
import { FeedbackCTA } from "@/components/FeedbackCTA";
import { GuideCard } from "@/components/GuideCard";
import { ItineraryCard } from "@/components/ItineraryCard";
import { NewsletterSignup } from "@/components/NewsletterSignup";
import { SEOJsonLd } from "@/components/SEOJsonLd";
import { getCityBySlug } from "@/data/cities";
import { getCityGuideContent } from "@/data/city-guide-content";
import { guides } from "@/data/guides";
import { itineraries } from "@/data/itineraries";
import { cityKitMeta, cityKitSlugs } from "@/data/kits";
import { buildMetadata, cityJsonLd } from "@/lib/seo";

type PageProps = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return cityKitSlugs.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const city = getCityBySlug(slug);
  const meta = city ? cityKitMeta[city.slug] : undefined;

  if (!city || !meta) {
    return {};
  }

  return buildMetadata({
    title: `${meta.kitTitle} | First China Trip Kit`,
    description: `A practical ${city.cityName} City Kit for first-time visitors with recommended days, hotel areas, attractions, food, transport tips, common mistakes, and Chinese addresses.`,
    path: `/city-kits/${city.slug}`,
  });
}

function formatUpdatedDate(value: string) {
  return new Intl.DateTimeFormat("en", {
    month: "long",
    day: "numeric",
    year: "numeric",
    timeZone: "UTC",
  }).format(new Date(value));
}

function Section({
  title,
  children,
}: {
  title: string;
  children: ReactNode;
}) {
  return (
    <section className="rounded-lg border border-ink/10 bg-paper p-5 shadow-soft">
      <h2 className="text-2xl font-bold leading-tight text-ink">{title}</h2>
      <div className="mt-4 text-base leading-relaxed text-ink/70">{children}</div>
    </section>
  );
}

export default async function CityKitDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const city = getCityBySlug(slug);

  if (!city || !cityKitSlugs.includes(slug as (typeof cityKitSlugs)[number])) {
    notFound();
  }

  const meta = cityKitMeta[city.slug];
  const content = getCityGuideContent(city.slug);
  const relatedItineraries = itineraries
    .filter((itinerary) => itinerary.cities.includes(city.cityName))
    .slice(0, 3);
  const relatedGuideSlugs =
    content?.relatedGuideSlugs || [
      "how-to-pay-in-china-as-a-foreigner",
      "best-apps-for-traveling-in-china",
      "how-to-take-high-speed-trains-in-china",
    ];
  const relatedGuides = guides.filter((guide) => relatedGuideSlugs.includes(guide.slug)).slice(0, 3);
  const suggestedPlan = relatedItineraries.length
    ? relatedItineraries
    : itineraries
        .filter((itinerary) =>
          ["10-days-classic-china-itinerary", "240-hour-visa-free-china-itinerary"].includes(
            itinerary.slug,
          ),
        )
        .slice(0, 2);

  return (
    <>
      <SEOJsonLd data={cityJsonLd(city, `/city-kits/${city.slug}`, content?.faq)} />
      <article>
        <header className="bg-sand px-4 py-12">
          <div className="mx-auto max-w-5xl">
            <p className="mb-3 text-sm font-bold uppercase text-ember">City Kit</p>
            <h1 className="text-4xl font-bold leading-tight text-ink">{meta.kitTitle}</h1>
            <p className="mt-5 max-w-3xl text-lg leading-relaxed text-ink/70">
              {city.intro}
            </p>
            <div className="mt-6 grid gap-3 sm:grid-cols-3">
              <div className="rounded-md bg-paper p-4">
                <p className="text-sm font-bold uppercase text-ink/45">Recommended days</p>
                <p className="mt-1 text-base font-semibold text-ink">{city.recommendedDays}</p>
              </div>
              <div className="rounded-md bg-paper p-4">
                <p className="text-sm font-bold uppercase text-ink/45">Difficulty</p>
                <p className="mt-1 text-base font-semibold text-ink">{meta.difficultyLevel}</p>
              </div>
              <div className="rounded-md bg-paper p-4">
                <p className="text-sm font-bold uppercase text-ink/45">Last updated</p>
                <p className="mt-1 text-base font-semibold text-ink">
                  {formatUpdatedDate(city.lastUpdated)}
                </p>
              </div>
            </div>
          </div>
        </header>

        <section className="px-4 py-12">
          <div className="mx-auto grid max-w-5xl gap-5">
            <Section title="Overview">
              <p>{city.intro}</p>
            </Section>

            <div className="grid gap-5 md:grid-cols-2">
              <Section title="Best time to visit">
                <p>{city.bestTimeToVisit}</p>
              </Section>
              <Section title="Recommended days">
                <p>{city.recommendedDays}</p>
              </Section>
            </div>

            <Section title="Who this city is best for">
              <ul className="grid gap-3">
                {city.bestFor.map((item) => (
                  <li key={item} className="border-l-2 border-ember/35 pl-3">
                    {item}
                  </li>
                ))}
              </ul>
            </Section>

            <Section title="Top attractions">
              <ul className="grid gap-3">
                {(content?.topAttractionsDetailed || city.topAttractions.map((name) => ({
                  name,
                  recommendedTime: "1-3 hours",
                  description: "Use this stop as part of a flexible first-trip route.",
                }))).map((attraction) => (
                  <li key={attraction.name} className="border-l-2 border-ember/35 pl-3">
                    <strong className="text-ink">{attraction.name}</strong>
                    <span className="block text-sm font-semibold text-ink/50">
                      Recommended time: {attraction.recommendedTime}
                    </span>
                    <span>{attraction.description}</span>
                  </li>
                ))}
              </ul>
            </Section>

            <Section title="Food to try">
              <ul className="grid gap-3">
                {(content?.localFoodsDetailed || city.localFoods.map((food) => ({
                  name: food,
                  chineseName: "",
                  description: "A useful local food to keep on your first-trip list.",
                }))).map((food) => (
                  <li key={`${food.name}-${food.chineseName}`} className="border-l-2 border-ember/35 pl-3">
                    <strong className="text-ink">
                      {food.name}
                      {food.chineseName ? ` · ${food.chineseName}` : ""}
                    </strong>
                    <span className="block">{food.description}</span>
                  </li>
                ))}
              </ul>
            </Section>

            <Section title="Where to stay">
              <ul className="grid gap-3">
                {(content?.bestAreasToStay || city.whereToStay).map((area) => (
                  <li key={area} className="border-l-2 border-ember/35 pl-3">
                    {area}
                  </li>
                ))}
              </ul>
            </Section>

            <Section title="How to get around">
              <ul className="grid gap-3">
                {city.transportTips.map((tip) => (
                  <li key={tip} className="border-l-2 border-ember/35 pl-3">
                    {tip}
                  </li>
                ))}
              </ul>
            </Section>

            <Section title="Suggested itinerary">
              <div className="grid gap-4 md:grid-cols-2">
                {suggestedPlan.map((itinerary) => (
                  <ItineraryCard key={itinerary.id} itinerary={itinerary} />
                ))}
              </div>
            </Section>

            <Section title="Useful Chinese addresses">
              <div className="grid gap-3">
                {city.usefulChineseAddresses.map((address) => (
                  <div key={address.label} className="rounded-md bg-sand p-4">
                    <p className="font-bold text-ink">{address.label}</p>
                    <p className="mt-1">{address.english}</p>
                    <p className="mt-1 text-lg font-semibold text-ink">{address.chinese}</p>
                  </div>
                ))}
              </div>
            </Section>

            <Section title="Common mistakes">
              <ul className="grid gap-3">
                {city.commonMistakes.map((mistake) => (
                  <li key={mistake} className="border-l-2 border-ember/35 pl-3">
                    {mistake}
                  </li>
                ))}
              </ul>
            </Section>

            <Section title="Local tips">
              <ul className="grid gap-3">
                {meta.localTips.map((tip) => (
                  <li key={tip} className="border-l-2 border-ember/35 pl-3">
                    {tip}
                  </li>
                ))}
              </ul>
            </Section>
          </div>
        </section>
      </article>

      {content?.faq ? <FAQSection faqs={content.faq} /> : null}

      <section className="px-4 py-12">
        <div className="mx-auto max-w-7xl">
          <div className="mb-6 max-w-3xl">
            <p className="mb-2 text-sm font-bold uppercase text-ember">Related guides</p>
            <h2 className="text-3xl font-bold leading-tight text-ink">
              Prepare the practical details
            </h2>
          </div>
          <div className="grid gap-5 md:grid-cols-3">
            {relatedGuides.map((guide) => (
              <GuideCard key={guide.id} guide={guide} />
            ))}
          </div>
        </div>
      </section>

      <section className="bg-mist px-4 py-10">
        <div className="mx-auto max-w-5xl">
          <p className="text-sm font-bold uppercase text-ember">Classic guide URL</p>
          <p className="mt-2 text-base text-ink/68">
            Prefer the original city guide format? The older page remains available at{" "}
            <Link href={`/cities/${city.slug}`} className="font-semibold text-ember hover:text-[#982F28]">
              /cities/{city.slug}
            </Link>
            .
          </p>
        </div>
      </section>

      <ChecklistCTA />
      <FeedbackCTA sourceLabel={`city-kit-${city.slug}`} />
      <NewsletterSignup />
    </>
  );
}
