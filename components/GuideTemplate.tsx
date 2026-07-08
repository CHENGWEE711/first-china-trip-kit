import { AppGuideCards } from "@/components/AppGuideCards";
import { ButtonLink } from "@/components/ButtonLink";
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
    whoThisGuideIsFor: [],
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
    backupPlan: [],
    usefulChinesePhrases: [],
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
    ctaLinks: [],
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
            {content.importantNotice ? (
              <section className="rounded-lg border border-ember/25 bg-sand p-5 shadow-soft">
                <p className="mb-2 text-sm font-bold uppercase text-ember">Important notice</p>
                <p className="text-base leading-relaxed text-ink/76">{content.importantNotice}</p>
              </section>
            ) : null}

            <section className="rounded-lg border border-ink/10 bg-paper p-5 shadow-soft">
              <p className="mb-2 text-sm font-bold uppercase text-ember">Quick answer</p>
              <p className="text-lg text-ink/72">{content.quickAnswer}</p>
            </section>

            {content.whoThisGuideIsFor && content.whoThisGuideIsFor.length > 0 ? (
              <BulletSection title="Who this guide is for" items={content.whoThisGuideIsFor} />
            ) : null}
            <BulletSection title="Step-by-step guide" items={content.steps} />
            <BulletSection title="Common mistakes" items={content.commonMistakes} />
            <BulletSection title="Troubleshooting" items={content.troubleshooting} />
            {content.backupPlan && content.backupPlan.length > 0 ? (
              <BulletSection title="Backup plan" items={content.backupPlan} />
            ) : null}

            {content.usefulChinesePhrases && content.usefulChinesePhrases.length > 0 ? (
              <section className="rounded-lg border border-ink/10 bg-paper p-5 shadow-soft">
                <h2 className="text-2xl font-bold leading-tight text-ink">
                  Useful Chinese phrases
                </h2>
                <div className="mt-4 grid gap-3">
                  {content.usefulChinesePhrases.map((phrase) => (
                    <div
                      key={`${phrase.english}-${phrase.chinese}`}
                      className="rounded-md border border-ink/10 bg-sand p-4"
                    >
                      <p className="text-sm font-bold uppercase text-ink/45">{phrase.english}</p>
                      <p className="mt-2 text-lg font-bold text-ink">{phrase.chinese}</p>
                      <p className="mt-1 text-base text-ink/65">{phrase.pinyin}</p>
                    </div>
                  ))}
                </div>
              </section>
            ) : null}
            <BulletSection title="First-day checklist" items={content.firstDayChecklist} />

            {content.appGroups ? <AppGuideCards groups={content.appGroups} /> : null}

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
                  Official resources to verify
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

            {content.ctaLinks && content.ctaLinks.length > 0 ? (
              <section className="rounded-lg border border-ink/10 bg-ink p-5 text-white shadow-soft">
                <p className="mb-2 text-sm font-bold uppercase text-clay">Next step</p>
                <h2 className="text-2xl font-bold leading-tight">
                  Turn this guide into a working trip plan
                </h2>
                <div className="mt-5 grid gap-3 sm:grid-cols-2">
                  {content.ctaLinks.map((link, index) => (
                    <div key={link.href} className="rounded-md border border-white/10 bg-white/8 p-4">
                      <p className="text-base font-bold text-white">{link.label}</p>
                      {link.note ? (
                        <p className="mt-2 text-sm leading-relaxed text-white/68">{link.note}</p>
                      ) : null}
                      <div className="mt-4">
                        <ButtonLink
                          href={link.href}
                          variant={index === 0 ? "primary" : "secondary"}
                          className="w-full sm:w-auto"
                        >
                          {link.label}
                        </ButtonLink>
                      </div>
                    </div>
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
