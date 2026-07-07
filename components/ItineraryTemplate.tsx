import { CTASection } from "@/components/CTASection";
import { ChecklistCTA } from "@/components/ChecklistCTA";
import { FAQSection } from "@/components/FAQSection";
import { FeedbackCTA } from "@/components/FeedbackCTA";
import { NewsletterSignup } from "@/components/NewsletterSignup";
import { ProductCard } from "@/components/ProductCard";
import type { ChineseAddress } from "@/data/cities";
import type { FAQ, LinkItem } from "@/data/faqs";
import type { Itinerary } from "@/data/itineraries";
import type { ItineraryGuideContent } from "@/data/itinerary-guide-content";
import type { Product } from "@/data/products";

type ItineraryTemplateProps = {
  itinerary: Itinerary;
  content?: ItineraryGuideContent;
  products: Product[];
};

function fallbackContent(itinerary: Itinerary): ItineraryGuideContent {
  return {
    routeSummary: [itinerary.summary],
    bestForDetails: [itinerary.targetUser],
    notBestFor: [
      "Travelers who want a fully private, concierge-managed trip with no self-guided planning.",
      "Visitors who prefer to change cities every day without buffer time.",
      "Travelers whose arrival or departure times make the first or last day much shorter than shown.",
    ],
    bookingReminders: itinerary.tips,
    chineseAddresses: [],
    skipIfTired: [
      "Remove one paid attraction and keep the best neighborhood walk.",
      "Use taxis or ride-hailing for the longest cross-city hops.",
    ],
    faq: [
      {
        question: "How much should I plan each day before arrival?",
        answer:
          "Book the major transport, first hotel, and any hard-to-get attraction tickets. Leave meals, neighborhood walks, and backup stops flexible so the route can absorb jet lag, weather, and station delays.",
      },
      {
        question: "What should I do if the day feels too packed?",
        answer:
          "Keep the anchor stop, remove one paid attraction, and use taxis or ride-hailing for the longest city hops. A calmer route is usually better than rushing through every item.",
      },
    ],
    relatedProductIds: [],
  };
}

function ListBlock({ title, items }: { title: string; items: string[] }) {
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

function AddressBlock({ addresses }: { addresses: ChineseAddress[] }) {
  if (addresses.length === 0) {
    return null;
  }

  return (
    <section className="rounded-lg border border-ink/10 bg-paper p-5 shadow-soft">
      <h2 className="text-2xl font-bold leading-tight text-ink">Chinese addresses</h2>
      <div className="mt-4 grid gap-4">
        {addresses.map((address) => (
          <div key={address.label} className="border-t border-ink/10 pt-4 first:border-t-0 first:pt-0">
            <p className="font-bold text-ink">{address.label}</p>
            <p className="mt-2 text-base text-ink/68">{address.english}</p>
            <p className="mt-1 text-base font-semibold text-ember">{address.chinese}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

function ResourceBlock({ links }: { links?: LinkItem[] }) {
  if (!links || links.length === 0) {
    return null;
  }

  return (
    <section className="rounded-lg border border-ink/10 bg-paper p-5 shadow-soft">
      <h2 className="text-2xl font-bold leading-tight text-ink">Official resources</h2>
      <div className="mt-4 grid gap-4">
        {links.map((link) => (
          <a
            key={link.href}
            href={link.href}
            target="_blank"
            rel="noreferrer"
            className="border-l-2 border-ember/35 pl-3 text-base text-ink/70 hover:text-ember"
          >
            <span className="font-bold text-ink">{link.label}</span>
            {link.note ? <span className="block text-sm text-ink/58">{link.note}</span> : null}
          </a>
        ))}
      </div>
    </section>
  );
}

function formatVerifiedDate(value?: string) {
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

export function ItineraryTemplate({ itinerary, content, products }: ItineraryTemplateProps) {
  const guide = content || fallbackContent(itinerary);
  const faqs: FAQ[] = guide.faq;

  return (
    <>
      <section className="bg-sand px-4 py-12">
        <div className="mx-auto grid max-w-7xl gap-8 lg:grid-cols-[1fr_360px]">
          <div>
            <p className="mb-3 text-sm font-bold uppercase text-ember">
              {itinerary.durationDays} days · {itinerary.cities.join(" + ")}
            </p>
            <h1 className="text-4xl font-bold leading-tight text-ink">{itinerary.title}</h1>
            <p className="mt-5 max-w-3xl text-lg text-ink/70">{itinerary.summary}</p>
            {guide.importantNotice ? (
              <div className="mt-6 rounded-lg border border-ember/25 bg-paper p-5 shadow-soft">
                <p className="text-sm font-bold uppercase text-ember">Important notice</p>
                <p className="mt-2 text-base leading-relaxed text-ink/72">
                  {guide.importantNotice}
                </p>
                {formatVerifiedDate(guide.lastVerified) ? (
                  <p className="mt-3 text-sm font-semibold text-ink/50">
                    Last verified: {formatVerifiedDate(guide.lastVerified)}
                  </p>
                ) : null}
              </div>
            ) : null}
          </div>
          <aside className="rounded-lg border border-ink/10 bg-paper p-5 shadow-soft">
            <h2 className="text-xl font-bold text-ink">Trip basics</h2>
            <dl className="mt-4 grid gap-4">
              <div>
                <dt className="text-sm font-bold uppercase text-ink/50">Best for</dt>
                <dd className="mt-1 text-base text-ink/72">{itinerary.targetUser}</dd>
              </div>
              <div>
                <dt className="text-sm font-bold uppercase text-ink/50">Budget level</dt>
                <dd className="mt-1 text-base text-ink/72">{itinerary.budgetLevel}</dd>
              </div>
              <div>
                <dt className="text-sm font-bold uppercase text-ink/50">Estimated cost</dt>
                <dd className="mt-1 text-base text-ink/72">{itinerary.estimatedCost}</dd>
              </div>
            </dl>
          </aside>
        </div>
      </section>

      <section className="px-4 py-12">
        <div className="mx-auto grid max-w-7xl gap-5 lg:grid-cols-2">
          <ListBlock title="Route summary" items={guide.routeSummary} />
          <ListBlock title="Who this route is best for" items={guide.bestForDetails} />
          <ListBlock title="Who should not choose this route" items={guide.notBestFor} />
        </div>
      </section>

      <section className="bg-paper px-4 py-12">
        <div className="mx-auto max-w-5xl">
          <div className="mb-7">
            <p className="mb-2 text-sm font-bold uppercase text-ember">Day-by-day timeline</p>
            <h2 className="text-3xl font-bold leading-tight text-ink">Morning, afternoon, and evening</h2>
          </div>
          <div className="grid gap-5">
            {itinerary.dayByDayPlan.map((day) => (
              <article
                key={day.day}
                id={`day-${day.day}`}
                className="rounded-lg border border-ink/10 bg-paper p-5 shadow-soft"
              >
                <p className="text-sm font-bold uppercase text-ember">Day {day.day}</p>
                <h3 className="mt-2 text-2xl font-bold leading-tight text-ink">{day.title}</h3>
                <div className="mt-5 grid gap-4 border-t border-ink/10 pt-5 md:grid-cols-3">
                  <div>
                    <h4 className="font-bold text-ink">Morning</h4>
                    <p className="mt-2 text-base text-ink/68">{day.morning}</p>
                  </div>
                  <div>
                    <h4 className="font-bold text-ink">Afternoon</h4>
                    <p className="mt-2 text-base text-ink/68">{day.afternoon}</p>
                  </div>
                  <div>
                    <h4 className="font-bold text-ink">Evening</h4>
                    <p className="mt-2 text-base text-ink/68">{day.evening}</p>
                  </div>
                </div>
                <div className="mt-5 grid gap-4 md:grid-cols-2">
                  <div>
                    <h4 className="font-bold text-ink">Transport details</h4>
                    <p className="mt-1 text-base text-ink/68">{day.transport}</p>
                  </div>
                  <div>
                    <h4 className="font-bold text-ink">Food suggestions</h4>
                    <p className="mt-1 text-base text-ink/68">{day.food}</p>
                  </div>
                  <div>
                    <h4 className="font-bold text-ink">Budget notes</h4>
                    <p className="mt-1 text-base text-ink/68">{day.budgetTip}</p>
                  </div>
                  <div>
                    <h4 className="font-bold text-ink">Notes</h4>
                    <p className="mt-1 text-base text-ink/68">{day.notes}</p>
                  </div>
                </div>
                {guide.dailyAdjustments?.[day.day] ? (
                  <div className="mt-5 grid gap-4 border-t border-ink/10 pt-5 md:grid-cols-2">
                    <div className="rounded-md bg-sand p-4">
                      <h4 className="font-bold text-ink">If you are tired, skip this</h4>
                      <p className="mt-2 text-base text-ink/68">
                        {guide.dailyAdjustments[day.day].ifTired}
                      </p>
                    </div>
                    <div className="rounded-md bg-sand p-4">
                      <h4 className="font-bold text-ink">Rainy day backup</h4>
                      <p className="mt-2 text-base text-ink/68">
                        {guide.dailyAdjustments[day.day].rainyDayBackup}
                      </p>
                    </div>
                  </div>
                ) : null}
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-mist px-4 py-12">
        <div className="mx-auto grid max-w-7xl gap-5 lg:grid-cols-2">
          <ListBlock title="Booking reminders" items={guide.bookingReminders} />
          <ListBlock title="What to skip if tired" items={guide.skipIfTired} />
          <AddressBlock addresses={guide.chineseAddresses} />
          <ResourceBlock links={guide.officialSourceLinks} />
          <ListBlock
            title="Budget notes"
            items={[
              itinerary.estimatedCost,
              ...Array.from(new Set(itinerary.dayByDayPlan.map((day) => day.budgetTip))),
            ]}
          />
        </div>
      </section>

      <CTASection
        eyebrow="Travel kit"
        title="Get this route as a travel kit PDF"
        description="Printable Travel Kits are planned for travelers who want addresses, booking reminders, daily timing, and backup notes in one compact file."
        primaryHref="/store"
        primaryLabel="View Travel Kits"
        secondaryHref="/custom-itinerary"
        secondaryLabel="Request a custom itinerary"
      />

      <FAQSection faqs={faqs} />

      <ChecklistCTA
        title="Before you follow this route, download the first-trip checklist"
        description="Use the PDF to confirm documents, payment, apps, hotel addresses, transport plans, food basics, and emergency phrases before your first sightseeing day."
      />

      {products.length > 0 ? (
        <section className="bg-sand px-4 py-12">
          <div className="mx-auto max-w-7xl">
            <div className="mb-6 max-w-3xl">
              <p className="mb-2 text-sm font-bold uppercase text-ember">Related products</p>
              <h2 className="text-3xl font-bold leading-tight text-ink">Planning kits for this route</h2>
            </div>
            <div className="grid gap-5 md:grid-cols-3">
              {products.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          </div>
        </section>
      ) : null}

      <FeedbackCTA sourceLabel={`itinerary-${itinerary.slug}`} />
      <NewsletterSignup />
    </>
  );
}
