import type { Metadata } from "next";
import { notFound } from "next/navigation";
import type { ReactNode } from "react";
import { ExternalLink } from "lucide-react";
import { ChecklistCTA } from "@/components/ChecklistCTA";
import { ButtonLink } from "@/components/ButtonLink";
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
      "how-to-book-high-speed-trains-in-china",
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
            <Section title="Quick answer">
              <p>
                {content?.whyVisit?.[0] ||
                  `${city.cityName} is a practical first China stop for travelers who want a manageable base, clear transport choices, local food, and useful Chinese addresses before adding more complex routes.`}
              </p>
            </Section>

            <Section title="Overview">
              <p>{city.intro}</p>
            </Section>

            {content?.whyVisit ? (
              <Section title="Why visit this city">
                <ul className="grid gap-3">
                  {content.whyVisit.map((reason) => (
                    <li key={reason} className="border-l-2 border-ember/35 pl-3">
                      {reason}
                    </li>
                  ))}
                </ul>
              </Section>
            ) : null}

            <Section title="Step-by-step first-day setup">
              <ol className="grid list-decimal gap-3 pl-5">
                <li>Save your hotel name, address, and phone number in Chinese before leaving the airport or railway station.</li>
                <li>Confirm mobile data, payment app access, and one backup payment method before your first long outing.</li>
                <li>Choose one anchor neighborhood and one meal goal for the first day instead of crossing the city repeatedly.</li>
                <li>Keep the next morning flexible if your arrival involves a long-haul flight, late check-in, or train transfer.</li>
              </ol>
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

            {content?.arrivalTips ? (
              <Section title="Arrival and transfer troubleshooting">
                <ul className="grid gap-3">
                  {content.arrivalTips.map((tip) => (
                    <li key={tip} className="border-l-2 border-ember/35 pl-3">
                      {tip}
                    </li>
                  ))}
                </ul>
              </Section>
            ) : null}

            {content?.bookInAdvance ? (
              <Section title="What to book in advance">
                <ul className="grid gap-3">
                  {content.bookInAdvance.map((item) => (
                    <li key={item} className="border-l-2 border-ember/35 pl-3">
                      {item}
                    </li>
                  ))}
                </ul>
              </Section>
            ) : null}

            <Section title="Suggested itinerary">
              <div className="grid gap-4 md:grid-cols-2">
                {suggestedPlan.map((itinerary) => (
                  <ItineraryCard key={itinerary.id} itinerary={itinerary} />
                ))}
              </div>
            </Section>

            <Section title="Useful Chinese addresses">
              <div className="grid gap-3">
                {city.usefulChineseAddresses.map((address) => {
                  const derivedChineseName =
                    address.chineseName || address.chinese.split(" ").filter(Boolean).at(-1) || address.label;

                  return (
                  <div key={address.label} className="rounded-md bg-sand p-4">
                    <p className="text-sm font-bold uppercase text-ember">English name</p>
                    <p className="font-bold text-ink">{address.englishName || address.label}</p>
                    <p className="mt-3 text-sm font-bold uppercase text-ember">Chinese name</p>
                    <p className="mt-1 text-lg font-semibold text-ink">
                      {derivedChineseName}
                    </p>
                    <p className="mt-3 text-sm font-bold uppercase text-ember">Chinese address</p>
                    <p className="mt-1">{address.chineseAddress || address.chinese}</p>
                    <p className="mt-3 text-sm font-bold uppercase text-ember">Best use case</p>
                    <p className="mt-1">
                      {address.bestUseCase || "Use this saved address for taxis, maps, or hotel staff when planning the day."}
                    </p>
                    <p className="mt-3 text-sm font-bold uppercase text-ember">Taxi or metro note</p>
                    <p className="mt-1">
                      {address.taxiOrMetroNote || address.english}
                    </p>
                  </div>
                  );
                })}
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

            {content?.officialSourceLinks ? (
              <Section title="Official resources">
                <div className="grid gap-3">
                  {content.officialSourceLinks.map((link) => (
                    <a
                      key={link.href}
                      href={link.href}
                      target="_blank"
                      rel="noreferrer"
                      className="border-l-2 border-ember/35 pl-3 text-base text-ink/70 hover:text-ember"
                    >
                      <span className="inline-flex items-center gap-2 font-bold text-ink">
                        {link.label}
                        <ExternalLink aria-hidden="true" size={15} />
                      </span>
                      {link.note ? <span className="block text-sm text-ink/58">{link.note}</span> : null}
                    </a>
                  ))}
                </div>
              </Section>
            ) : null}
          </div>
        </section>
      </article>

      {content?.faq ? <FAQSection faqs={content.faq} /> : null}

      <section className="px-4 py-12">
        <div className="mx-auto max-w-7xl">
          <div className="mb-6 max-w-3xl">
            <p className="mb-2 text-sm font-bold uppercase text-ember">Related itineraries</p>
            <h2 className="text-3xl font-bold leading-tight text-ink">
              Routes that include {city.cityName}
            </h2>
          </div>
          <div className="grid gap-5 md:grid-cols-3">
            {suggestedPlan.map((itinerary) => (
              <ItineraryCard key={itinerary.id} itinerary={itinerary} />
            ))}
          </div>
        </div>
      </section>

      <section className="bg-ink px-4 py-12 text-white">
        <div className="mx-auto grid max-w-5xl gap-5 md:grid-cols-[1fr_auto] md:items-center">
          <div>
            <p className="mb-2 text-sm font-bold uppercase text-clay">Printable setup help</p>
            <h2 className="text-3xl font-bold leading-tight">Need payment and app backup cards?</h2>
            <p className="mt-3 max-w-3xl text-base leading-relaxed text-white/72">
              The China Payment & Apps Setup Guide gives you printable checklists,
              payment failure backup steps, app stack notes, and taxi or checkout
              phrase cards before your first day in China.
            </p>
          </div>
          <ButtonLink href="/store#inside-the-guide" variant="primary" className="w-full md:w-auto">
            View Store
          </ButtonLink>
        </div>
      </section>

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

      <ChecklistCTA title="Download the free checklist before you visit" />
      <FeedbackCTA sourceLabel={`city-kit-${city.slug}`} />
      <NewsletterSignup />
    </>
  );
}
