import { ChecklistCTA } from "@/components/ChecklistCTA";
import { FAQSection } from "@/components/FAQSection";
import { FeedbackCTA } from "@/components/FeedbackCTA";
import { GuideCard } from "@/components/GuideCard";
import { NewsletterSignup } from "@/components/NewsletterSignup";
import { ProductCard } from "@/components/ProductCard";
import type { Guide } from "@/data/guides";
import type { GuideDetailContent } from "@/data/guide-detail-content";
import type { Product } from "@/data/products";

type GuideTemplateProps = {
  guide: Guide;
  detail?: GuideDetailContent;
  relatedGuides: Guide[];
  products: Product[];
};

function fallbackDetail(guide: Guide): GuideDetailContent {
  return {
    quickAnswer: guide.summary,
    steps: guide.content.flatMap((section) => section.bullets || [section.body]),
    commonMistakes: [
      "Leaving key setup tasks until the airport arrival hall.",
      "Keeping hotel addresses, ticket details, and payment backups only inside apps that require data.",
      "Trying to solve every issue at the counter instead of stepping aside, using screenshots, or asking hotel staff for help.",
    ],
    troubleshooting: [
      "Use screenshots and Chinese text when a spoken explanation is difficult.",
      "Ask hotel staff to write or confirm addresses before a taxi or train transfer.",
    ],
    firstDayChecklist: [
      "Passport accessible.",
      "Hotel address saved in Chinese.",
      "Payment backup ready.",
      "Translation app available offline.",
    ],
    faq: [
      {
        question: "What should I save offline before my first full day in China?",
        answer:
          "Save key addresses, confirmations, and payment backups offline before your first full day. Most travel friction is easier to solve when you are not standing in a station, taxi queue, or restaurant line.",
      },
      {
        question: "When should I ask hotel staff for help?",
        answer:
          "Ask before a long taxi ride, train transfer, attraction booking, or payment problem if you are unsure. A front desk can confirm Chinese addresses, write a short note, and help you avoid a stressful mistake.",
      },
    ],
    officialSourceLinks: [],
    relatedGuideSlugs: [],
    relatedProductIds: [],
  };
}

function BulletSection({ title, items }: { title: string; items: string[] }) {
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

export function GuideTemplate({ guide, detail, relatedGuides, products }: GuideTemplateProps) {
  const content = detail || fallbackDetail(guide);

  return (
    <>
      <article>
        <header className="bg-sand px-4 py-12">
          <div className="mx-auto max-w-4xl">
            <p className="mb-3 text-sm font-bold uppercase text-ember">{guide.category}</p>
            <h1 className="text-4xl font-bold leading-tight text-ink">{guide.title}</h1>
            <p className="mt-5 text-lg text-ink/70">{guide.summary}</p>
            <p className="mt-4 text-sm font-semibold text-ink/50">
              Last updated: {formatUpdatedDate(guide.updatedAt)}
            </p>
          </div>
        </header>

        <section className="px-4 py-12">
          <div className="mx-auto grid max-w-5xl gap-5">
            <section className="rounded-lg border border-ink/10 bg-paper p-5 shadow-soft">
              <p className="mb-2 text-sm font-bold uppercase text-ember">Quick answer</p>
              <p className="text-lg text-ink/72">{content.quickAnswer}</p>
            </section>

            <BulletSection title="Step-by-step guide" items={content.steps} />
            <BulletSection title="Common mistakes" items={content.commonMistakes} />
            <BulletSection title="Troubleshooting" items={content.troubleshooting} />
            <BulletSection title="First-day checklist" items={content.firstDayChecklist} />

            <section className="content-prose rounded-lg border border-ink/10 bg-paper p-5 shadow-soft">
              {guide.content.map((section) => (
                <section key={section.heading}>
                  <h2>{section.heading}</h2>
                  <p>{section.body}</p>
                  {section.bullets ? (
                    <ul>
                      {section.bullets.map((bullet) => (
                        <li key={bullet}>{bullet}</li>
                      ))}
                    </ul>
                  ) : null}
                </section>
              ))}
            </section>

            {content.officialSourceLinks.length > 0 ? (
              <section className="rounded-lg border border-ink/10 bg-paper p-5 shadow-soft">
                <h2 className="text-2xl font-bold leading-tight text-ink">
                  Useful official resources
                </h2>
                <div className="mt-4 grid gap-4">
                  {content.officialSourceLinks.map((link) => (
                    <a
                      key={link.href}
                      href={link.href}
                      className="border-l-2 border-ember/35 pl-3 text-base text-ink/70 hover:text-ember"
                      target="_blank"
                      rel="noreferrer"
                    >
                      <span className="font-bold text-ink">{link.label}</span>
                      {link.note ? <span className="block text-sm text-ink/58">{link.note}</span> : null}
                    </a>
                  ))}
                </div>
              </section>
            ) : null}
          </div>
        </section>
      </article>

      <FAQSection faqs={content.faq} />

      {relatedGuides.length > 0 ? (
        <section className="px-4 py-12">
          <div className="mx-auto max-w-7xl">
            <div className="mb-6 max-w-3xl">
              <p className="mb-2 text-sm font-bold uppercase text-ember">Related guides</p>
              <h2 className="text-3xl font-bold leading-tight text-ink">
                Keep planning with these practical guides
              </h2>
            </div>
            <div className="grid gap-5 md:grid-cols-3">
              {relatedGuides.map((relatedGuide) => (
                <GuideCard key={relatedGuide.id} guide={relatedGuide} />
              ))}
            </div>
          </div>
        </section>
      ) : null}

      {products.length > 0 ? (
        <section className="bg-sand px-4 py-12">
          <div className="mx-auto max-w-7xl">
            <div className="mb-6 max-w-3xl">
              <p className="mb-2 text-sm font-bold uppercase text-ember">Related products</p>
              <h2 className="text-3xl font-bold leading-tight text-ink">Useful planning kits</h2>
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
      <FeedbackCTA sourceLabel={`guide-${guide.slug}`} />
      <NewsletterSignup />
    </>
  );
}
