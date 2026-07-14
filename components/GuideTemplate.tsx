import Image from "next/image";
import Link from "next/link";
import { AppGuideCards } from "@/components/AppGuideCards";
import { ButtonLink } from "@/components/ButtonLink";
import { ChecklistCTA } from "@/components/ChecklistCTA";
import { CoffeeTipLink } from "@/components/CoffeeTipLink";
import { FAQSection } from "@/components/FAQSection";
import { FeedbackCTA } from "@/components/FeedbackCTA";
import { GuideCard } from "@/components/GuideCard";
import { GuideTableOfContents, MobileGuideTableOfContents } from "@/components/GuideTableOfContents";
import { Container } from "@/components/Container";
import { GuideAffiliateRecommendations } from "@/components/GuideAffiliateRecommendations";
import { NewsletterSignup } from "@/components/NewsletterSignup";
import { ProductActionButton } from "@/components/ProductActionButton";
import { ProductCard } from "@/components/ProductCard";
import { TrackedLink } from "@/components/TrackedLink";
import type { Guide } from "@/data/guides";
import type { GuideDetailContent } from "@/data/guide-detail-content";
import type { Product } from "@/data/products";
import { createSectionId } from "@/lib/section-id";

type GuideTemplateProps = {
  guide: Guide;
  detail?: GuideDetailContent;
  relatedGuides: Guide[];
  products: Product[];
};

const companionItineraryByGuide: Record<string, { href: string; label: string; note: string }> = {
  "china-240-hour-visa-free-transit-guide": {
    href: "/itinerary-kits/240-hour-visa-free-china-itinerary",
    label: "Open the route-planning itinerary",
    note: "This Guide explains eligibility and policy checks. The itinerary is a separate route framework to use only after those checks pass.",
  },
  "3-days-in-shanghai-for-first-time-visitors": {
    href: "/itinerary-kits/3-days-in-shanghai",
    label: "Open the day-by-day Shanghai itinerary",
    note: "This Guide helps you choose and pace the experience. The itinerary turns that advice into an executable three-day schedule.",
  },
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
    <section id={createSectionId(title)} className="scroll-mt-28 border-t border-ink/15 pt-8">
      <h2 className="text-3xl leading-tight text-ink">{title}</h2>
      <ul className="mt-5 grid gap-4 text-base leading-relaxed text-ink/70">
        {items.map((item) => (
          <li key={item} className="border-l-2 border-ember/45 pl-4">
            {item}
          </li>
        ))}
      </ul>
    </section>
  );
}

function responsiveGridColumns(count: number) {
  if (count === 2) {
    return "md:grid-cols-2";
  }

  if (count === 3) {
    return "md:grid-cols-3";
  }

  if (count === 4) {
    return "md:grid-cols-4";
  }

  return "md:grid-cols-5";
}

function FeatureTable({ label, columns, rows }: { label: string; columns: string[]; rows: string[][] }) {
  return (
    <div role="table" aria-label={`${label} comparison table`} className="mt-4 overflow-hidden rounded-lg border border-ink/10">
      <div
        role="row"
        className={`hidden gap-4 bg-ink px-4 py-3 text-sm font-bold uppercase text-white md:grid ${responsiveGridColumns(columns.length)}`}
      >
        {columns.map((column) => (
          <span role="columnheader" key={column}>{column}</span>
        ))}
      </div>
      <div className="divide-y divide-ink/10">
        {rows.map((row) => (
          <div
            role="row"
            key={row.join("-")}
            className={`grid gap-3 bg-sand px-4 py-4 text-base text-ink/70 md:gap-4 ${responsiveGridColumns(columns.length)}`}
          >
            {row.map((cell, index) => (
              <div role="cell" key={`${cell}-${index}`}>
                <p className="text-xs font-bold uppercase text-ink/42 md:hidden">
                  {columns[index]}
                </p>
                <p className={index === 0 ? "font-semibold text-ink" : ""}>{cell}</p>
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}

function FeatureSections({ sections }: { sections: NonNullable<GuideDetailContent["featureSections"]> }) {
  return (
    <>
      {sections.map((section) => (
        <section key={section.title} id={createSectionId(section.title)} className="scroll-mt-28 border-t border-ink/15 pt-8">
          <h2 className="text-3xl leading-tight text-ink">{section.title}</h2>
          {section.body ? (
            <p className="mt-3 text-base leading-relaxed text-ink/70">{section.body}</p>
          ) : null}
          {section.items && section.items.length > 0 ? (
            <div className="mt-4 grid gap-3 sm:grid-cols-2">
              {section.items.map((item) => (
                <div key={item} className="border-l-2 border-jade/35 bg-mist/55 px-4 py-3 text-base leading-relaxed text-ink/70">
                  {item}
                </div>
              ))}
            </div>
          ) : null}
          {section.columns && section.rows ? (
            <FeatureTable label={section.title} columns={section.columns} rows={section.rows} />
          ) : null}
        </section>
      ))}
    </>
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

function readingTime(guide: Guide) {
  const words = [guide.title, guide.summary, ...guide.content.flatMap((section) => [section.heading, section.body, ...(section.bullets || [])])]
    .join(" ")
    .trim()
    .split(/\s+/).length;
  return Math.max(4, Math.ceil(words / 210));
}

function ArticleImage({
  image,
  priority = false,
  visualRole,
  insertedBefore,
}: {
  image: Guide["heroImage"];
  priority?: boolean;
  visualRole: "hero" | "inline";
  insertedBefore?: string;
}) {
  const sizes = visualRole === "hero"
    ? "(min-width: 1280px) 1152px, calc(100vw - 2rem)"
    : "(min-width: 1024px) 760px, calc(100vw - 2rem)";

  return (
    <figure data-guide-visual={visualRole} data-inserted-before={insertedBefore}>
      <div className="relative aspect-[3/2] overflow-hidden rounded-lg bg-mist md:aspect-[16/9]">
        <Image
          src={image.src}
          alt={image.alt}
          fill
          priority={priority}
          sizes={sizes}
          className="object-cover"
          style={{ objectPosition: image.position || "center" }}
        />
      </div>
      <figcaption className="mt-2 text-sm leading-relaxed text-ink/52">
        {image.caption || image.alt}
      </figcaption>
    </figure>
  );
}

function GuideInlineImages({
  images,
  placement,
  insertedBefore,
}: {
  images: Guide["inlineImages"];
  placement: NonNullable<Guide["inlineImages"][number]["placement"]>;
  insertedBefore: string;
}) {
  return images
    .filter((image) => image.placement === placement)
    .map((image) => (
      <ArticleImage
        key={`${placement}-${image.src}`}
        image={image}
        visualRole="inline"
        insertedBefore={insertedBefore}
      />
    ));
}

function GuideContents({ content }: { content: GuideDetailContent }) {
  const entries = [
    "Quick answer",
    ...(content.whoThisGuideIsFor?.length ? ["Who this guide is for"] : []),
    ...(content.featureSections?.map((section) => section.title) || []),
    "Step-by-step guide",
    "Common mistakes",
    "Troubleshooting",
    ...(content.backupPlan?.length ? ["Backup plan"] : []),
    ...(content.usefulChinesePhrases?.length ? ["Useful Chinese phrases"] : []),
    "First-day checklist",
  ];

  return <GuideTableOfContents entries={entries} />;
}

const paymentAppsGuideCtaSlugs = new Set([
  "how-to-pay-in-china-as-a-foreigner",
  "best-apps-for-traveling-in-china",
  "how-to-use-alipay-in-china-as-a-tourist",
  "how-to-use-wechat-pay-in-china-as-a-foreigner",
  "china-esim-guide-for-tourists",
  "how-to-book-high-speed-trains-in-china",
  "china-240-hour-visa-free-transit-guide",
]);

function PaymentAppsGuideCta({ guideSlug }: { guideSlug: string }) {
  const paymentAppsGuideBuyUrl = process.env.NEXT_PUBLIC_PAYMENT_APPS_GUIDE_BUY_URL || "";
  const isAvailable = Boolean(paymentAppsGuideBuyUrl);

  if (!isAvailable) {
    return null;
  }

  return (
    <section className="bg-ink px-4 py-12 text-white">
      <div className="mx-auto max-w-5xl">
        <p className="mb-2 text-sm font-bold uppercase text-mist">Printable setup guide</p>
        <h2 className="text-3xl font-bold leading-tight">
          Want the printable setup version?
        </h2>
        <p className="mt-3 max-w-3xl text-base leading-relaxed text-white/72">
          Get the China Payment & Apps Setup Guide with checklists, offline cards,
          and troubleshooting tables for your first days in China.
        </p>
        <ul className="mt-5 grid gap-2 text-base text-white/76 sm:grid-cols-2">
          {[
            "Alipay and WeChat Pay setup checklists",
            "Payment backup decision tree",
            "Essential apps stack",
            "Taxi and checkout phrase cards",
            "First-day payment test",
          ].map((item) => (
            <li key={item} className="border-l-2 border-mist/60 pl-3">
              {item}
            </li>
          ))}
        </ul>
        <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:items-center">
          <ProductActionButton
            href={paymentAppsGuideBuyUrl}
            className="mt-0"
            isExternal={isAvailable}
            canBuy={isAvailable}
            eventNames={
              isAvailable
                ? ["guide_paid_cta_clicked", "payment_apps_guide_buy_clicked"]
                : ["store_waitlist_clicked"]
            }
            label="Buy the $7 Guide"
            productId="china-payment-apps-setup-guide"
            placement="guide_bottom_paid_cta"
            analyticsParams={{ guide_slug: guideSlug }}
          />
          <TrackedLink
            href="/store#inside-the-guide"
            eventName="store_inside_guide_clicked"
            eventParams={{
              source_page: `/guides/${guideSlug}`,
              guide_slug: guideSlug,
              placement: "guide_bottom_paid_cta",
            }}
            className="inline-flex min-h-11 items-center justify-center rounded-md px-2 py-2 text-base font-semibold text-mist underline-offset-4 transition hover:text-white hover:underline sm:w-auto"
          >
            View what&apos;s inside
          </TrackedLink>
        </div>
      </div>
    </section>
  );
}

function GuideQuestionCta({ guideSlug }: { guideSlug: string }) {
  return (
    <section className="bg-paper px-4 py-10">
      <div className="mx-auto grid max-w-5xl gap-4 md:grid-cols-[1fr_0.72fr]">
        <div className="rounded-lg border border-ink/10 bg-sand p-5 shadow-soft">
          <p className="mb-2 text-sm font-bold uppercase text-ember">Trip question</p>
          <h2 className="text-2xl font-bold leading-tight text-ink">
            Need help with your China trip?
          </h2>
          <p className="mt-3 max-w-2xl text-base leading-relaxed text-ink/68">
            Send your travel month, passport country, trip length, and cities you
            are considering.
          </p>
          <div className="mt-5">
            <TrackedLink
              href={`/contact?source=guide-${guideSlug}`}
              eventName="guide_contact_clicked"
              eventParams={{ guide_slug: guideSlug }}
              className="inline-flex min-h-11 w-full items-center justify-center rounded-md bg-ember px-5 py-3 text-center text-base font-semibold text-white transition hover:bg-ember-hover sm:w-auto"
            >
              Ask a China Trip Question
            </TrackedLink>
          </div>
        </div>
        <div className="rounded-lg border border-ink/10 bg-paper p-5 shadow-soft">
          <p className="mb-2 text-sm font-bold uppercase text-ink/45">
            Free starting point
          </p>
          <h2 className="text-xl font-bold leading-tight text-ink">
            Want the free checklist first?
          </h2>
          <p className="mt-3 text-base leading-relaxed text-ink/64">
            Use the printable checklist for documents, payment, apps, hotel
            address, transport, packing, and emergency phrases.
          </p>
          <TrackedLink
            href="/thank-you"
            eventName="checklist_download_clicked"
            eventParams={{
              source_page: `/guides/${guideSlug}`,
              guide_slug: guideSlug,
              placement: "guide_bottom_free_checklist",
            }}
            className="mt-5 inline-flex text-base font-semibold text-ember underline-offset-4 hover:text-ember-hover hover:underline"
          >
            Get the Free China First Trip Checklist
          </TrackedLink>
        </div>
      </div>
    </section>
  );
}

function GuideSupportCta({ guideSlug }: { guideSlug: string }) {
  const coffeeTipEnabled = Boolean(process.env.NEXT_PUBLIC_COFFEE_TIP_URL);

  if (!coffeeTipEnabled) {
    return null;
  }

  return (
    <section className="bg-paper px-4 py-10">
      <div className="mx-auto max-w-5xl rounded-lg border border-ink/10 bg-sand p-5 shadow-soft">
        <p className="mb-2 text-sm font-bold uppercase text-ember">Support this guide</p>
        <h2 className="text-2xl font-bold leading-tight text-ink">Was this guide helpful?</h2>
        <p className="mt-3 max-w-3xl text-base leading-relaxed text-ink/68">
          First China Trip Kit is free to read. If this guide helped you prepare for
          China, you can support future updates with a small coffee tip.
        </p>
        <div className="mt-5">
          <CoffeeTipLink source={`guide-${guideSlug}`} className="w-full sm:w-fit">
            Buy us a coffee
          </CoffeeTipLink>
        </div>
        <p className="mt-3 text-sm text-ink/52">No pressure. The guide stays free.</p>
      </div>
    </section>
  );
}

export function GuideTemplate({ guide, detail, relatedGuides, products }: GuideTemplateProps) {
  const content = detail || fallbackDetail(guide);
  const companionItinerary = companionItineraryByGuide[guide.slug];
  const showPaymentAppsGuideCta = paymentAppsGuideCtaSlugs.has(guide.slug);
  const useCoreGuideBottomCta = paymentAppsGuideCtaSlugs.has(guide.slug);
  const displayedProducts = showPaymentAppsGuideCta
    ? products.filter((product) => product.id !== "china-payment-apps-setup-guide")
    : products;

  return (
    <>
      <article>
        <header className="bg-paper px-4 pb-12 pt-14 md:pb-16 md:pt-20">
          <div className="mx-auto max-w-6xl">
            <div className="max-w-4xl">
              <nav aria-label="Breadcrumb" className="mb-6 text-sm text-ink/58">
                <Link href="/" className="hover:text-ember">Home</Link>
                <span aria-hidden="true" className="mx-2">/</span>
                <Link href="/guides" className="hover:text-ember">Guides</Link>
              </nav>
              <p className="mb-4 text-xs font-bold uppercase tracking-[0.16em] text-ember">{guide.category} guide</p>
              <h1 className="text-[2.65rem] leading-[1.04] text-ink sm:text-5xl md:text-6xl">{guide.title}</h1>
              <p className="mt-6 max-w-3xl text-lg leading-relaxed text-ink/68 md:text-xl">{guide.summary}</p>
            </div>
            <div className="mt-6 flex flex-wrap items-center gap-x-4 gap-y-2 border-t border-ink/12 pt-4 text-sm font-semibold text-ink/50">
              <p>Last updated: {formatUpdatedDate(guide.updatedAt)}</p>
              {content.lastVerified ? (
                <>
                  <span aria-hidden="true" className="h-1 w-1 rounded-full bg-ember/55" />
                  <p>{content.verificationLabel || "Policy last verified"}: {formatUpdatedDate(content.lastVerified)}</p>
                </>
              ) : null}
              <span aria-hidden="true" className="h-1 w-1 rounded-full bg-ember/55" />
              <p>{readingTime(guide)} min read</p>
            </div>
            <div className="mt-8 md:mt-10">
              <ArticleImage image={guide.heroImage} priority visualRole="hero" />
            </div>
          </div>
        </header>

        <Container className="-mt-px lg:hidden">
          <MobileGuideTableOfContents entries={[
            "Quick answer",
            ...(content.whoThisGuideIsFor?.length ? ["Who this guide is for"] : []),
            ...(content.featureSections?.map((section) => section.title) || []),
            "Step-by-step guide",
            "Common mistakes",
            "Troubleshooting",
            ...(content.backupPlan?.length ? ["Backup plan"] : []),
            ...(content.usefulChinesePhrases?.length ? ["Useful Chinese phrases"] : []),
            "First-day checklist",
          ]} />
        </Container>

        <section className="bg-sand px-4 py-14 md:py-20">
          <div className="mx-auto grid max-w-6xl gap-12 lg:grid-cols-[220px_minmax(0,760px)] lg:justify-between">
            <aside className="hidden lg:block">
              <GuideContents content={content} />
            </aside>
            <div className="grid min-w-0 gap-10">
            {content.importantNotice ? (
              <section role="note" aria-label="Important notice" className="border-l-4 border-ember bg-paper px-5 py-5">
                <p className="mb-2 text-xs font-bold uppercase tracking-[0.14em] text-ember">Important notice</p>
                <p className="text-base leading-relaxed text-ink/76">{content.importantNotice}</p>
              </section>
            ) : null}

            <section id="quick-answer" className="scroll-mt-28 bg-mist px-6 py-7 md:px-8 md:py-8">
              <p className="mb-3 text-xs font-bold uppercase tracking-[0.14em] text-jade">Quick answer</p>
              <p className="font-editorial text-xl leading-relaxed text-ink md:text-2xl">{content.quickAnswer}</p>
            </section>

            {companionItinerary ? (
              <aside className="border-l-2 border-jade bg-paper px-5 py-4" aria-label="Related itinerary">
                <p className="text-base leading-relaxed text-ink/70">{companionItinerary.note}</p>
                <Link href={companionItinerary.href} className="mt-3 inline-flex min-h-11 items-center font-bold text-jade hover:text-ember">
                  {companionItinerary.label}
                </Link>
              </aside>
            ) : null}

            {content.whoThisGuideIsFor && content.whoThisGuideIsFor.length > 0 ? (
              <BulletSection title="Who this guide is for" items={content.whoThisGuideIsFor} />
            ) : null}
            {content.featureSections && content.featureSections.length > 0 ? (
              <FeatureSections sections={content.featureSections} />
            ) : null}
            <GuideInlineImages
              images={guide.inlineImages}
              placement="before-steps"
              insertedBefore="Step-by-step guide"
            />
            <BulletSection title="Step-by-step guide" items={content.steps} />
            <GuideInlineImages
              images={guide.inlineImages}
              placement="before-common-mistakes"
              insertedBefore="Common mistakes"
            />
            <BulletSection title="Common mistakes" items={content.commonMistakes} />
            <BulletSection title="Troubleshooting" items={content.troubleshooting} />
            {content.backupPlan && content.backupPlan.length > 0 ? (
              <BulletSection title="Backup plan" items={content.backupPlan} />
            ) : null}

            {content.usefulChinesePhrases && content.usefulChinesePhrases.length > 0 ? (
              <section id="useful-chinese-phrases" className="scroll-mt-28 border-t border-ink/15 pt-8">
                <h2 className="text-3xl leading-tight text-ink">
                  Useful Chinese phrases
                </h2>
                <div className="mt-4 grid gap-3">
                  {content.usefulChinesePhrases.map((phrase) => (
                    <div
                      key={`${phrase.english}-${phrase.chinese}`}
                      className="border-b border-ink/12 bg-paper px-5 py-4"
                    >
                      <p className="text-sm font-bold uppercase text-ink/45">{phrase.english}</p>
                      <p lang="zh-Hans" className="mt-2 text-lg font-bold text-ink">{phrase.chinese}</p>
                      <p lang="zh-Latn" className="mt-1 text-base text-ink/65">{phrase.pinyin}</p>
                    </div>
                  ))}
                </div>
              </section>
            ) : null}
            <BulletSection title="First-day checklist" items={content.firstDayChecklist} />

            <GuideInlineImages
              images={guide.inlineImages}
              placement="before-details"
              insertedBefore="Detailed guidance"
            />

            {content.appGroups ? <AppGuideCards groups={content.appGroups} /> : null}

            <section className="content-prose border-t border-ink/15 pt-4">
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
              <section className="border-t border-ink/15 pt-8">
                <h2 className="text-3xl leading-tight text-ink">
                  Official resources to verify
                </h2>
                <div className="mt-4 grid gap-4">
                  {content.officialSourceLinks.map((link) => (
                    <a
                      key={link.href}
                      href={link.href}
                      className="border-l-2 border-ember/35 pl-3 text-base text-ink/70 hover:text-ember"
                      target="_blank"
                      rel="noopener noreferrer"
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
                <p className="mb-2 text-sm font-bold uppercase text-mist">Next step</p>
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
          </div>
        </section>
      </article>

      <FAQSection faqs={content.faq} />

      <GuideAffiliateRecommendations guideSlug={guide.slug} />

      {showPaymentAppsGuideCta ? <PaymentAppsGuideCta guideSlug={guide.slug} /> : null}

      {useCoreGuideBottomCta ? <GuideQuestionCta guideSlug={guide.slug} /> : null}

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

      {displayedProducts.length > 0 ? (
        <section className="bg-sand px-4 py-12">
          <div className="mx-auto max-w-7xl">
            <div className="mb-6 max-w-3xl">
              <p className="mb-2 text-sm font-bold uppercase text-ember">More planning kits</p>
              <h2 className="text-3xl font-bold leading-tight text-ink">Useful add-on kits</h2>
            </div>
            <div className="grid gap-5 md:grid-cols-3">
              {displayedProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          </div>
        </section>
      ) : null}

      <GuideSupportCta guideSlug={guide.slug} />
      {useCoreGuideBottomCta ? null : (
        <>
          <ChecklistCTA />
          <FeedbackCTA sourceLabel={`guide-${guide.slug}`} />
        </>
      )}
      <NewsletterSignup />
    </>
  );
}
