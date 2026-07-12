import type { Metadata } from "next";
import { notFound } from "next/navigation";
import type { ReactNode } from "react";
import { ExternalLink } from "lucide-react";
import { ChecklistCTA } from "@/components/ChecklistCTA";
import { FAQSection } from "@/components/FAQSection";
import { FeedbackCTA } from "@/components/FeedbackCTA";
import { ItineraryAffiliateRecommendation } from "@/components/ItineraryAffiliateRecommendation";
import { NewsletterSignup } from "@/components/NewsletterSignup";
import { ProductCard } from "@/components/ProductCard";
import { SEOJsonLd } from "@/components/SEOJsonLd";
import { getItineraryBySlug } from "@/data/itineraries";
import { getItineraryGuideContent } from "@/data/itinerary-guide-content";
import { itineraryKitSlugs } from "@/data/kits";
import { getProductsByIds } from "@/data/products";
import { buildMetadata, itineraryJsonLd } from "@/lib/seo";

type PageProps = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return itineraryKitSlugs.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const itinerary = getItineraryBySlug(slug);

  if (!itinerary) {
    return {};
  }

  return buildMetadata({
    title: `${itinerary.title} Kit | First China Trip Kit`,
    description: itinerary.seoDescription,
    path: `/itinerary-kits/${itinerary.slug}`,
  });
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

const usefulPhrases = [
  {
    english: "Please take me to this address.",
    chinese: "请带我去这个地址。",
    pinyin: "Qing dai wo qu zhe ge di zhi.",
  },
  {
    english: "Can I pay with Alipay or WeChat Pay?",
    chinese: "可以用支付宝或微信支付吗？",
    pinyin: "Ke yi yong Zhi Fu Bao huo Wei Xin Zhi Fu ma?",
  },
  {
    english: "I have a train to catch.",
    chinese: "我要赶火车。",
    pinyin: "Wo yao gan huo che.",
  },
  {
    english: "Less spicy, please.",
    chinese: "请少辣。",
    pinyin: "Qing shao la.",
  },
];

function formatDate(value?: string) {
  if (!value) {
    return null;
  }

  return new Intl.DateTimeFormat("en", {
    month: "long",
    day: "numeric",
    year: "numeric",
    timeZone: "UTC",
  }).format(new Date(value));
}

export default async function ItineraryKitDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const itinerary = getItineraryBySlug(slug);

  if (!itinerary || !itineraryKitSlugs.includes(slug as (typeof itineraryKitSlugs)[number])) {
    notFound();
  }

  const content = getItineraryGuideContent(itinerary.slug);
  const products = getProductsByIds(content?.relatedProductIds || []);
  const bookingReminders = content?.bookingReminders || itinerary.tips;
  const updatedDate = formatDate(content?.lastUpdated || content?.lastVerified || "2026-07-08");
  const skipItems =
    content?.skipIfTired || [
      "Skip a second major attraction on arrival day if jet lag is heavy.",
      "Skip an optional viewpoint or shopping stop if transport takes longer than expected.",
      "Skip a far-side neighborhood dinner and eat near your hotel when luggage or weather slows the day.",
    ];

  return (
    <>
      <SEOJsonLd data={itineraryJsonLd(itinerary, `/itinerary-kits/${itinerary.slug}`, content?.faq)} />
      <article>
        <header className="bg-sand px-4 py-12">
          <div className="mx-auto max-w-5xl">
            <p className="mb-3 text-sm font-bold uppercase text-ember">Itinerary Kit</p>
            <h1 className="text-4xl font-bold leading-tight text-ink">
              {itinerary.title} Kit
            </h1>
            <p className="mt-5 max-w-3xl text-lg leading-relaxed text-ink/70">
              {itinerary.summary}
            </p>
            {content?.importantNotice ? (
              <div className="mt-6 rounded-md border border-ember/25 bg-paper p-4">
                <p className="text-sm font-bold uppercase text-ember">Important notice</p>
                <p className="mt-2 text-base leading-relaxed text-ink/72">
                  {content.importantNotice}
                </p>
              </div>
            ) : null}
            <div className="mt-6 grid gap-3 sm:grid-cols-3">
              <div className="rounded-md bg-paper p-4">
                <p className="text-sm font-bold uppercase text-ink/45">Duration</p>
                <p className="mt-1 text-base font-semibold text-ink">
                  {itinerary.durationDays} days
                </p>
              </div>
              <div className="rounded-md bg-paper p-4">
                <p className="text-sm font-bold uppercase text-ink/45">Cities</p>
                <p className="mt-1 text-base font-semibold text-ink">
                  {itinerary.cities.join(" + ")}
                </p>
              </div>
              <div className="rounded-md bg-paper p-4">
                <p className="text-sm font-bold uppercase text-ink/45">Last updated</p>
                <p className="mt-1 text-base font-semibold text-ink">{updatedDate}</p>
              </div>
            </div>
          </div>
        </header>

        <section className="px-4 py-12">
          <div className="mx-auto grid max-w-5xl gap-5">
            <Section title="Quick answer">
              <p>
                {content?.routeSummary?.[0] ||
                  `${itinerary.title} is a practical first-trip route for ${itinerary.cities.join(", ")} with ${itinerary.durationDays} days of planning structure.`}
              </p>
            </Section>

            <Section title="Who this itinerary is for">
              <p>{itinerary.targetUser}</p>
              {content?.bestForDetails ? (
                <ul className="mt-4 grid gap-3">
                  {content.bestForDetails.map((item) => (
                    <li key={item} className="border-l-2 border-ember/35 pl-3">
                      {item}
                    </li>
                  ))}
                </ul>
              ) : null}
            </Section>

            {content?.notBestFor ? (
              <Section title="Who should choose a different route">
                <ul className="grid gap-3">
                  {content.notBestFor.map((item) => (
                    <li key={item} className="border-l-2 border-ember/35 pl-3">
                      {item}
                    </li>
                  ))}
                </ul>
              </Section>
            ) : null}

            <Section title="Route overview">
              <ul className="grid gap-3">
                {(content?.routeSummary || [itinerary.summary]).map((item) => (
                  <li key={item} className="border-l-2 border-ember/35 pl-3">
                    {item}
                  </li>
                ))}
              </ul>
            </Section>

            <Section title="Step-by-step planning flow">
              <ol className="grid list-decimal gap-3 pl-5">
                <li>Confirm your arrival point, departure point, and hotel base before adding extra neighborhoods or day trips.</li>
                <li>Save Chinese addresses for each station, airport, hotel, and main attraction you expect to use.</li>
                <li>Book time-sensitive tickets first, then leave meals and low-stakes walks flexible for weather and energy.</li>
                <li>Keep one removable stop each day so the route still works if payment setup, transport, or jet lag takes longer than expected.</li>
              </ol>
            </Section>

            <Section title="Day-by-day plan">
              <div className="grid gap-5">
                {itinerary.dayByDayPlan.map((day) => (
                  <section
                    key={day.day}
                    id={`day-${day.day}`}
                    className="rounded-md border border-ink/10 bg-sand p-4"
                  >
                    <p className="text-sm font-bold uppercase text-ember">Day {day.day}</p>
                    <h3 className="mt-1 text-xl font-bold leading-tight text-ink">
                      {day.title}
                    </h3>
                    <div className="mt-4 grid gap-3">
                      <p>
                        <strong className="text-ink">Morning:</strong> {day.morning}
                      </p>
                      <p>
                        <strong className="text-ink">Afternoon:</strong> {day.afternoon}
                      </p>
                      <p>
                        <strong className="text-ink">Evening:</strong> {day.evening}
                      </p>
                      <p>
                        <strong className="text-ink">Transport:</strong> {day.transport}
                      </p>
                      <p>
                        <strong className="text-ink">Food:</strong> {day.food}
                      </p>
                      <p>
                        <strong className="text-ink">Budget note:</strong> {day.budgetTip}
                      </p>
                    </div>
                  </section>
                ))}
              </div>
            </Section>

            <Section title="Transport between cities">
              <ul className="grid gap-3">
                {itinerary.dayByDayPlan.map((day) => (
                  <li key={`${day.day}-transport`} className="border-l-2 border-ember/35 pl-3">
                    <strong className="text-ink">Day {day.day}:</strong> {day.transport}
                  </li>
                ))}
              </ul>
            </Section>

            <Section title="Estimated budget">
              <p>{itinerary.estimatedCost}</p>
            </Section>

            <Section title="What to book in advance">
              <ul className="grid gap-3">
                {bookingReminders.map((item) => (
                  <li key={item} className="border-l-2 border-ember/35 pl-3">
                    {item}
                  </li>
                ))}
              </ul>
            </Section>

            {content?.commonMistakes ? (
              <Section title="Common mistakes">
                <ul className="grid gap-3">
                  {content.commonMistakes.map((item) => (
                    <li key={item} className="border-l-2 border-ember/35 pl-3">
                      {item}
                    </li>
                  ))}
                </ul>
              </Section>
            ) : null}

            <Section title="Troubleshooting">
              <ul className="grid gap-3">
                <li className="border-l-2 border-ember/35 pl-3">
                  If transport takes longer than expected, drop the least important
                  optional stop before shortening meals or sleep.
                </li>
                <li className="border-l-2 border-ember/35 pl-3">
                  If payment or mobile data fails, use cash, hotel Wi-Fi, or staff
                  help before moving to the next long transfer.
                </li>
                <li className="border-l-2 border-ember/35 pl-3">
                  If weather changes the main plan, move outdoor skyline, garden,
                  or walking blocks to the clearest day and use museums or malls
                  as buffers.
                </li>
              </ul>
            </Section>

            <Section title="What to skip">
              <ul className="grid gap-3">
                {skipItems.map((item) => (
                  <li key={item} className="border-l-2 border-ember/35 pl-3">
                    {item}
                  </li>
                ))}
              </ul>
            </Section>

            <Section title="Useful Chinese phrases">
              <div className="grid gap-3">
                {usefulPhrases.map((phrase) => (
                  <div key={phrase.english} className="rounded-md bg-sand p-4">
                    <p className="font-semibold text-ink">{phrase.english}</p>
                    <p className="mt-1 text-lg font-semibold text-ink">{phrase.chinese}</p>
                    <p className="mt-1 text-sm text-ink/58">{phrase.pinyin}</p>
                  </div>
                ))}
              </div>
            </Section>

            {content?.chineseAddresses ? (
              <Section title="Chinese addresses">
                <div className="grid gap-3">
                  {content.chineseAddresses.map((address) => (
                    <div key={address.label} className="rounded-md bg-sand p-4">
                      <p className="font-bold text-ink">{address.label}</p>
                      <p className="mt-1">{address.english}</p>
                      <p className="mt-1 text-lg font-semibold text-ink">{address.chinese}</p>
                    </div>
                  ))}
                </div>
              </Section>
            ) : null}

            {content?.officialSourceLinks ? (
              <Section title="Official resources">
                <div className="grid gap-3">
                  {content.officialSourceLinks.map((link) => (
                    <a
                      key={link.href}
                      href={link.href}
                      target="_blank"
                      rel="noopener noreferrer"
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

            <section className="rounded-lg border border-ink/10 bg-ink p-5 text-white shadow-soft">
              <p className="text-sm font-bold uppercase text-clay">Download PDF Kit</p>
              <h2 className="mt-2 text-2xl font-bold leading-tight">
                Printable route kit is being prepared
              </h2>
              <p className="mt-3 text-base text-white/72">
                The future PDF version will include the route, booking reminders,
                Chinese addresses, and a mobile-friendly checklist.
              </p>
              <button
                type="button"
                disabled
                className="mt-5 inline-flex min-h-11 cursor-not-allowed items-center justify-center rounded-md bg-white/20 px-4 py-2 text-base font-semibold text-white/72"
              >
                Download PDF Kit
              </button>
            </section>
          </div>
        </section>
      </article>

      {content?.faq ? <FAQSection faqs={content.faq} /> : null}

      <ItineraryAffiliateRecommendation
        itinerarySlug={itinerary.slug}
        itineraryTitle={itinerary.title}
      />

      {products.length > 0 ? (
        <section className="bg-sand px-4 py-12">
          <div className="mx-auto max-w-7xl">
            <div className="mb-6 max-w-3xl">
              <p className="mb-2 text-sm font-bold uppercase text-ember">Related products</p>
              <h2 className="text-3xl font-bold leading-tight text-ink">
                Planning kits for this route
              </h2>
            </div>
            <div className="grid gap-5 md:grid-cols-3">
              {products.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          </div>
        </section>
      ) : null}

      <ChecklistCTA />
      <FeedbackCTA sourceLabel={`itinerary-kit-${itinerary.slug}`} />
      <NewsletterSignup />
    </>
  );
}
