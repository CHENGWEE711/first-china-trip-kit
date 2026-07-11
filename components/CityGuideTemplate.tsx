import { ButtonLink } from "@/components/ButtonLink";
import { CityPlanYourStay } from "@/components/CityPlanYourStay";
import { FAQSection } from "@/components/FAQSection";
import { FeedbackCTA } from "@/components/FeedbackCTA";
import { GuideCard } from "@/components/GuideCard";
import { ItineraryCard } from "@/components/ItineraryCard";
import { NewsletterSignup } from "@/components/NewsletterSignup";
import type { City } from "@/data/cities";
import type { CityGuideContent } from "@/data/city-guide-content";
import type { Guide } from "@/data/guides";
import type { Itinerary } from "@/data/itineraries";

type CityGuideTemplateProps = {
  city: City;
  content?: CityGuideContent;
  relatedItineraries: Itinerary[];
  relatedGuides: Guide[];
};

function fallbackContent(city: City): CityGuideContent {
  return {
    whyVisit: [city.intro],
    bestAreasToStay: city.whereToStay,
    topAttractionsDetailed: city.topAttractions.map((name) => ({
      name,
      recommendedTime: "1-2 hours",
      description: `Add ${name} to your plan if it matches your travel style and daily route.`,
    })),
    localFoodsDetailed: city.localFoods.map((name) => ({
      name,
      chineseName: "",
      description: `A useful local food to try while visiting ${city.cityName}.`,
    })),
    arrivalTips: city.transportTips,
    bookInAdvance: [
      "Popular attractions during weekends and public holidays.",
      "High-speed train tickets during busy travel periods.",
      "Hotels in central areas during peak seasons.",
    ],
    faq: [
      {
        question: `How many days should I spend in ${city.cityName}?`,
        answer: `${city.recommendedDays} is a good first-trip range for ${city.cityName}.`,
      },
      {
        question: `What is ${city.cityName} best for?`,
        answer: `${city.cityName} is especially good for ${city.bestFor.join(", ")}.`,
      },
    ],
    relatedGuideSlugs: [],
  };
}

function ListSection({ title, items }: { title: string; items: string[] }) {
  return (
    <section className="rounded-lg border border-ink/10 bg-paper p-5 shadow-soft">
      <h2 className="text-2xl font-bold leading-tight text-ink">{title}</h2>
      <ul className="mt-4 grid gap-3 text-base text-ink/70">
        {items.map((item) => (
          <li key={item} className="border-l-2 border-ember/35 pl-3">
            {item}
          </li>
        ))}
      </ul>
    </section>
  );
}

function formatUpdatedDate(value: string) {
  return new Intl.DateTimeFormat("en", {
    month: "long",
    day: "numeric",
    year: "numeric",
    timeZone: "UTC",
  }).format(new Date(value));
}

export function CityGuideTemplate({
  city,
  content,
  relatedItineraries,
  relatedGuides,
}: CityGuideTemplateProps) {
  const guide = content || fallbackContent(city);

  return (
    <>
      <section className="bg-sand px-4 py-12">
        <div className="mx-auto grid max-w-7xl gap-8 lg:grid-cols-[1fr_360px] lg:items-start">
          <div>
            <p className="mb-3 text-sm font-bold uppercase text-ember">{city.province}</p>
            <h1 className="text-4xl font-bold leading-tight text-ink">
              {city.cityName} Travel Guide
            </h1>
            <p className="mt-2 text-2xl font-semibold text-ember">{city.chineseName}</p>
            <p className="mt-5 max-w-3xl text-lg text-ink/70">{city.intro}</p>
            <div className="mt-7 flex flex-wrap gap-2">
              {city.bestFor.map((tag) => (
                <span
                  key={tag}
                  className="rounded-md bg-paper px-3 py-1.5 text-sm font-semibold text-ink/72"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
          <aside className="rounded-lg border border-ink/10 bg-paper p-5 shadow-soft">
            <h2 className="text-xl font-bold text-ink">Quick facts</h2>
            <div className="mt-4 rounded-md bg-sand p-4">
              <p className="text-sm font-bold uppercase text-ember">Best area to stay</p>
              <p className="mt-2 text-base font-semibold text-ink/78">{city.whereToStay[0]}</p>
            </div>
            <dl className="mt-4 grid gap-4">
              <div>
                <dt className="text-sm font-bold uppercase text-ink/50">Best time to visit</dt>
                <dd className="mt-1 text-base text-ink/72">{city.bestTimeToVisit}</dd>
              </div>
              <div>
                <dt className="text-sm font-bold uppercase text-ink/50">How many days to stay</dt>
                <dd className="mt-1 text-base text-ink/72">{city.recommendedDays}</dd>
              </div>
              <div>
                <dt className="text-sm font-bold uppercase text-ink/50">Last updated</dt>
                <dd className="mt-1 text-base text-ink/72">
                  {formatUpdatedDate(city.lastUpdated)}
                </dd>
              </div>
            </dl>
          </aside>
        </div>
      </section>

      <section className="px-4 py-12">
        <div className="mx-auto grid max-w-7xl gap-5 lg:grid-cols-2">
          <ListSection title={`Why visit ${city.cityName}`} items={guide.whyVisit} />
          <ListSection title="Best areas to stay" items={guide.bestAreasToStay} />

          <section className="rounded-lg border border-ink/10 bg-paper p-5 shadow-soft lg:col-span-2">
            <h2 className="text-2xl font-bold leading-tight text-ink">
              Top attractions with recommended time
            </h2>
            <div className="mt-5 grid gap-5 md:grid-cols-2">
              {guide.topAttractionsDetailed.map((attraction) => (
                <article key={attraction.name} className="border-l-2 border-ember/35 pl-4">
                  <h3 className="text-xl font-bold text-ink">{attraction.name}</h3>
                  <p className="mt-1 text-sm font-semibold uppercase text-ember">
                    {attraction.recommendedTime}
                  </p>
                  <p className="mt-2 text-base text-ink/68">{attraction.description}</p>
                </article>
              ))}
            </div>
          </section>

          <section className="rounded-lg border border-ink/10 bg-paper p-5 shadow-soft lg:col-span-2">
            <h2 className="text-2xl font-bold leading-tight text-ink">
              Local foods with Chinese names
            </h2>
            <div className="mt-5 grid gap-5 md:grid-cols-2">
              {guide.localFoodsDetailed.map((food) => (
                <article key={`${food.name}-${food.chineseName}`} className="border-l-2 border-ember/35 pl-4">
                  <h3 className="text-xl font-bold text-ink">{food.name}</h3>
                  {food.chineseName ? (
                    <p className="mt-1 text-lg font-semibold text-ember">{food.chineseName}</p>
                  ) : null}
                  <p className="mt-2 text-base text-ink/68">{food.description}</p>
                </article>
              ))}
            </div>
          </section>

          <ListSection title="How to get around" items={city.transportTips} />
          <ListSection title="Airport / railway station arrival tips" items={guide.arrivalTips} />
          <ListSection title="What to book in advance" items={guide.bookInAdvance} />
          <ListSection title="Common mistakes" items={city.commonMistakes} />

          <section className="rounded-lg border border-ink/10 bg-paper p-5 shadow-soft lg:col-span-2">
            <h2 className="text-2xl font-bold leading-tight text-ink">Useful Chinese addresses</h2>
            <div className="mt-4 grid gap-4 md:grid-cols-2">
              {city.usefulChineseAddresses.map((address) => (
                <div
                  key={address.label}
                  className="border-t border-ink/10 pt-4 first:border-t-0 first:pt-0 md:border-t-0 md:border-l md:pl-4 md:pt-0"
                >
                  <p className="font-bold text-ink">{address.label}</p>
                  <p className="mt-2 text-base text-ink/68">{address.english}</p>
                  <p className="mt-1 text-base font-semibold text-ember">{address.chinese}</p>
                </div>
              ))}
            </div>
          </section>
        </div>
      </section>

      <FAQSection faqs={guide.faq} />

      <CityPlanYourStay cityName={city.cityName} citySlug={city.slug} />

      <section className="bg-mist px-4 py-12">
        <div className="mx-auto max-w-7xl">
          <div className="mb-6 max-w-3xl">
            <p className="mb-2 text-sm font-bold uppercase text-ember">Related itineraries</p>
            <h2 className="text-3xl font-bold leading-tight text-ink">
              Related China routes for {city.cityName} travelers
            </h2>
          </div>
          {relatedItineraries.length > 0 ? (
            <div className="grid gap-5 md:grid-cols-3">
              {relatedItineraries.map((itinerary) => (
                <ItineraryCard key={itinerary.id} itinerary={itinerary} />
              ))}
            </div>
          ) : (
            <p className="text-base text-ink/68">More routes for this city are coming soon.</p>
          )}
        </div>
      </section>

      <section className="px-4 py-12">
        <div className="mx-auto max-w-7xl">
          <div className="mb-6 max-w-3xl">
            <p className="mb-2 text-sm font-bold uppercase text-ember">Related guides</p>
            <h2 className="text-3xl font-bold leading-tight text-ink">
              Practical help before you visit {city.cityName}
            </h2>
          </div>
          {relatedGuides.length > 0 ? (
            <div className="grid gap-5 md:grid-cols-3">
              {relatedGuides.map((relatedGuide) => (
                <GuideCard key={relatedGuide.id} guide={relatedGuide} />
              ))}
            </div>
          ) : (
            <ButtonLink href="/travel-essentials" variant="ghost">
              Open travel essentials
            </ButtonLink>
          )}
        </div>
      </section>

      <FeedbackCTA sourceLabel={`city-${city.slug}`} />
      <NewsletterSignup />
    </>
  );
}
