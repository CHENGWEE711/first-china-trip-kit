import type { Metadata } from "next";
import Image from "next/image";
import {
  ArrowRight,
  BadgeCheck,
  BookOpen,
  Building2,
  CheckCircle2,
  Clock3,
  Landmark,
  MapPinned,
  MoonStar,
  Mountain,
  PlaneTakeoff,
  Route,
  ShieldCheck,
  TrainFront,
  Utensils,
  WalletCards,
  Wifi,
} from "lucide-react";
import { buttonClassName } from "@/components/Button";
import { Container } from "@/components/Container";
import { GuideCard } from "@/components/GuideCard";
import { NewsletterSignup } from "@/components/NewsletterSignup";
import { ProductActionButton } from "@/components/ProductActionButton";
import { Section } from "@/components/Section";
import { SectionHeader } from "@/components/SectionHeader";
import { SEOJsonLd } from "@/components/SEOJsonLd";
import { TrackedLink } from "@/components/TrackedLink";
import { cities } from "@/data/cities";
import { guides } from "@/data/guides";
import { publicPageImages } from "@/data/images";
import { itineraries } from "@/data/itineraries";
import { buildMetadata } from "@/lib/seo";
import { absoluteUrl, siteConfig } from "@/lib/site";

export const metadata: Metadata = buildMetadata({
  title: "First China Trip Kit | Visas, Payments, Apps & Itineraries",
  description:
    "Plan a first China trip with practical help for visa-free entry checks, payments, apps, cities, transport and realistic itineraries.",
  path: "/",
  image: "/images/cities/shanghai-bund-skyline.webp",
  imageAlt: "Shanghai skyline across the Huangpu River near the Bund",
  imageWidth: 2000,
  imageHeight: 1333,
});

const featuredGuideSlugs = [
  "how-to-pay-in-china-as-a-foreigner",
  "best-apps-for-traveling-in-china",
  "china-240-hour-visa-free-transit-guide",
] as const;

const taskLinks = [
  {
    title: "Can I Enter Visa-Free?",
    body: "Check the passport, port, onward-route and permitted-area questions that matter.",
    result: "Open the eligibility checklist",
    href: "/tools/visa-free-eligibility-checker",
    icon: ShieldCheck,
  },
  {
    title: "Set Up Payments & Apps",
    body: "Prepare mobile payment, essential apps and arrival-day backups before flying.",
    result: "Use the payment setup guide",
    href: "/payments-and-apps",
    icon: WalletCards,
  },
  {
    title: "Choose My First Cities",
    body: "Compare eight city bases by pace, interests, transport and realistic stay length.",
    result: "Compare destination kits",
    href: "/city-kits",
    icon: MapPinned,
  },
  {
    title: "Build My Itinerary",
    body: "Start from a route with sensible transfers instead of stacking too many stops.",
    result: "Browse practical itineraries",
    href: "/itinerary-kits",
    icon: Route,
  },
] as const;

const beforeYouFlyItems = [
  {
    number: "01",
    title: "Visa",
    href: "/tools/visa-free-eligibility-checker",
    label: "Check the visa-free questions",
    icon: ShieldCheck,
    bullets: [
      "Match the policy to your passport and exact purpose.",
      "Check entry and exit ports before booking.",
      "Verify changing rules with official sources.",
    ],
  },
  {
    number: "02",
    title: "Payments",
    href: "/payments-and-apps",
    label: "Build a payment backup plan",
    icon: WalletCards,
    bullets: [
      "Set up a primary mobile wallet.",
      "Add a second card or payment option.",
      "Carry a small cash backup on arrival day.",
    ],
  },
  {
    number: "03",
    title: "Apps & Internet",
    href: "/payments-and-apps#apps",
    label: "Prepare the essential app stack",
    icon: Wifi,
    bullets: [
      "Choose data access before you land.",
      "Save maps, translation and addresses offline.",
      "Test logins while you still have time to fix them.",
    ],
  },
  {
    number: "04",
    title: "Transport & Arrival",
    href: "/guides/how-to-book-high-speed-trains-in-china",
    label: "Plan the first transfer",
    icon: TrainFront,
    bullets: [
      "Save the exact airport or station name.",
      "Keep the hotel address in Chinese.",
      "Leave extra time for your first train day.",
    ],
  },
] as const;

const experienceLinks = [
  {
    title: "Futuristic China",
    body: "Skyline, design and high-energy city life.",
    href: "/city-kits/shanghai",
    icon: Building2,
  },
  {
    title: "Ancient China",
    body: "City walls, dynasties and living heritage.",
    href: "/city-kits/xian",
    icon: Landmark,
  },
  {
    title: "Nature & Mountains",
    body: "A softer route around lake and tea country.",
    href: "/city-kits/hangzhou",
    icon: Mountain,
  },
  {
    title: "Food & Street Markets",
    body: "Order with more confidence and less guesswork.",
    href: "/guides/china-food-ordering-guide",
    icon: Utensils,
  },
  {
    title: "High-Speed Rail Journeys",
    body: "Connect cities without losing a day to friction.",
    href: "/guides/how-to-book-high-speed-trains-in-china",
    icon: TrainFront,
  },
  {
    title: "China After Dark",
    body: "River lights, neighborhoods and late dinners.",
    href: "/city-kits/shanghai",
    icon: MoonStar,
  },
  {
    title: "Slow China",
    body: "Canals, gardens and space to wander.",
    href: "/city-kits/suzhou",
    icon: Clock3,
  },
  {
    title: "Visa-Free Stopover",
    body: "Shape an eligible transit stay around a valid route.",
    href: "/itinerary-kits/240-hour-visa-free-china-itinerary",
    icon: PlaneTakeoff,
  },
] as const;

export default function HomePage() {
  const paymentGuideBuyUrl = process.env.NEXT_PUBLIC_PAYMENT_APPS_GUIDE_BUY_URL || "";
  const featuredGuides = featuredGuideSlugs.flatMap((slug) =>
    guides.filter((guide) => guide.slug === slug),
  );
  const classicItinerary = itineraries.find(
    (itinerary) => itinerary.slug === "10-days-classic-china-itinerary",
  )!;
  const popularItems = [
    {
      title: featuredGuides[0].title,
      category: "Payment guide",
      href: `/guides/${featuredGuides[0].slug}`,
      image: featuredGuides[0].featuredImage,
    },
    {
      title: featuredGuides[2].title,
      category: "Visa-free planning",
      href: `/guides/${featuredGuides[2].slug}`,
      image: featuredGuides[2].featuredImage,
    },
    {
      title: classicItinerary.title,
      category: "10-day itinerary",
      href: `/itinerary-kits/${classicItinerary.slug}`,
      image: classicItinerary.cardImage,
    },
  ];
  const trendingCities = ["xian", "shanghai"].flatMap((slug) =>
    cities.filter((city) => city.slug === slug),
  );
  const homeJsonLd = [
    {
      "@context": "https://schema.org",
      "@type": "WebSite",
      name: siteConfig.name,
      url: absoluteUrl("/"),
      description: siteConfig.description,
      inLanguage: "en",
    },
    {
      "@context": "https://schema.org",
      "@type": "Organization",
      name: siteConfig.name,
      url: absoluteUrl("/"),
      email: siteConfig.contactEmail,
    },
  ];

  return (
    <>
      <SEOJsonLd data={homeJsonLd} />

      <section id="home-hero" data-testid="home-hero" className="border-b border-ink/10 bg-paper">
        <Container
          size="wide"
          className="grid lg:min-h-[720px] lg:grid-cols-[minmax(0,0.95fr)_minmax(500px,1.05fr)]"
        >
          <div className="order-2 flex flex-col justify-center py-11 sm:py-14 lg:order-1 lg:py-20 lg:pr-14 xl:pr-20">
            <p className="text-xs font-semibold uppercase tracking-[0.15em] text-ember">
              Your first trip to China, made clear
            </p>
            <h1 className="mt-5 max-w-3xl text-[43px] leading-[1.02] text-ink sm:text-5xl md:text-6xl lg:text-[64px]">
              China Looks Incredible. Your First Trip Doesn&apos;t Have to Feel Complicated.
            </h1>
            <p className="mt-6 max-w-2xl text-lg leading-relaxed text-ink/68 md:text-xl">
              Practical help with visas, payments, apps, transport and itineraries—plus real
              inspiration for deciding where to go.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <TrackedLink
                href="/start-here"
                eventName="hero_primary_cta_clicked"
                eventParams={{
                  item_name: "Plan Your First China Trip",
                  section: "homepage_hero",
                }}
                className={`${buttonClassName("primary")} w-full sm:w-fit`}
              >
                <span>Plan Your First China Trip</span>
                <ArrowRight aria-hidden="true" size={18} />
              </TrackedLink>
              <TrackedLink
                href="/payments-and-apps"
                eventName="homepage_task_clicked"
                eventParams={{
                  item_name: "Set Up Payments & Apps",
                  section: "homepage_hero",
                }}
                className={`${buttonClassName("secondary", "bg-surface")} w-full sm:w-fit`}
              >
                <span>Set Up Payments &amp; Apps</span>
                <ArrowRight aria-hidden="true" size={18} />
              </TrackedLink>
            </div>
            <div className="mt-8 flex flex-wrap gap-x-6 gap-y-2 border-t border-ink/10 pt-5 text-sm font-semibold text-ink/62">
              {["Visa checks", "Payments", "City choices", "Itineraries"].map((item) => (
                <span key={item} className="inline-flex items-center gap-2">
                  <CheckCircle2 aria-hidden="true" size={16} className="text-jade" />
                  {item}
                </span>
              ))}
            </div>
          </div>
          <figure className="relative order-1 -mx-4 aspect-[4/3] overflow-hidden bg-jade sm:-mx-6 lg:order-2 lg:mx-0 lg:aspect-auto lg:min-h-[720px]">
            <Image
              src={publicPageImages.homeHero.src}
              alt={publicPageImages.homeHero.alt}
              fill
              priority
              loading="eager"
              fetchPriority="high"
              sizes="(min-width: 1024px) 52vw, 100vw"
              style={{ objectPosition: publicPageImages.homeHero.position }}
              className="object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-ink/45 via-transparent to-transparent" />
            <figcaption className="absolute inset-x-0 bottom-0 px-5 py-5 text-sm leading-relaxed text-white/90 sm:px-7">
              Suzhou&apos;s Pingjiang Road—one real glimpse of how modern trip planning opens the
              door to a much older China.
            </figcaption>
          </figure>
        </Container>
      </section>

      <Section id="home-tasks" variant="warm" spacing="compact">
        <SectionHeader
          eyebrow="Choose your next step"
          title="What do you need help with?"
          description="Start with the decision blocking your trip. Each path leads to a real tool, guide or planning page."
        />
        <div data-testid="homepage-task-grid" className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          {taskLinks.map((item, index) => {
            const Icon = item.icon;
            return (
              <TrackedLink
                key={item.title}
                href={item.href}
                eventName="homepage_task_clicked"
                eventParams={{ item_name: item.title, section: "homepage_tasks" }}
                className="group flex min-h-[270px] flex-col rounded-lg border border-ink/12 bg-surface p-6 shadow-soft transition hover:-translate-y-1 hover:border-ember/35"
              >
                <div className="flex items-center justify-between">
                  <span className="text-sm font-bold text-ember">0{index + 1}</span>
                  <span className="grid h-11 w-11 place-items-center rounded-full bg-mist text-jade">
                    <Icon aria-hidden="true" size={22} />
                  </span>
                </div>
                <h2 className="mt-8 text-2xl leading-tight text-ink">{item.title}</h2>
                <p className="mt-3 text-[15px] leading-relaxed text-ink/64">{item.body}</p>
                <span className="mt-auto inline-flex items-center gap-2 pt-6 text-sm font-bold text-ember">
                  {item.result}
                  <ArrowRight aria-hidden="true" size={16} className="transition group-hover:translate-x-1" />
                </span>
              </TrackedLink>
            );
          })}
        </div>
      </Section>

      <Section id="home-popular" variant="light">
        <SectionHeader
          eyebrow="Based on current site interest"
          title="What First-Time Travelers Are Reading"
          description="A live-direction signal from the site's current small sample—not a claim about long-term popularity."
        />
        <div className="grid gap-6 lg:grid-cols-3">
          {popularItems.map((item, index) => (
            <TrackedLink
              key={item.href}
              href={item.href}
              eventName="homepage_popular_content_clicked"
              eventParams={{ item_name: item.title, section: "homepage_popular" }}
              className="group overflow-hidden rounded-lg border border-ink/10 bg-surface shadow-soft"
            >
              <div className="relative aspect-[3/2] overflow-hidden bg-mist">
                <Image
                  src={item.image.src}
                  alt={item.image.alt}
                  fill
                  sizes="(min-width: 1024px) 33vw, 100vw"
                  style={{ objectPosition: item.image.position }}
                  className="object-cover transition duration-500 group-hover:scale-[1.03]"
                />
                <span className="absolute left-4 top-4 grid h-9 w-9 place-items-center rounded-full bg-paper text-sm font-bold text-ember shadow-soft">
                  {index + 1}
                </span>
              </div>
              <div className="p-6">
                <p className="text-xs font-semibold uppercase tracking-[0.12em] text-jade">{item.category}</p>
                <h2 className="mt-3 text-2xl leading-tight text-ink">{item.title}</h2>
                <span className="mt-5 inline-flex items-center gap-2 text-sm font-bold text-ember">
                  Read the guide <ArrowRight aria-hidden="true" size={16} />
                </span>
              </div>
            </TrackedLink>
          ))}
        </div>
      </Section>

      <Section id="home-trending" variant="warm">
        <SectionHeader
          eyebrow="Visual inspiration, practical next steps"
          title="Trending in China"
          description="Start with two high-interest cities that already have complete planning kits. More hotspot routes will open only when their real pages are ready."
          actionHref="/city-kits"
          actionLabel="Compare all destinations"
        />
        <div className="grid gap-6 lg:grid-cols-2">
          {trendingCities.map((city) => (
            <TrackedLink
              key={city.slug}
              href={`/city-kits/${city.slug}`}
              eventName="homepage_trending_clicked"
              eventParams={{ item_name: city.cityName, section: "homepage_trending" }}
              className="group relative min-h-[420px] overflow-hidden rounded-lg bg-ink text-white shadow-editorial"
            >
              <Image
                src={city.heroImage.src}
                alt={city.heroImage.alt}
                fill
                sizes="(min-width: 1024px) 50vw, 100vw"
                style={{ objectPosition: city.heroImage.position }}
                className="object-cover transition duration-700 group-hover:scale-[1.025]"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/20 to-transparent" />
              <div className="absolute inset-x-0 bottom-0 p-7 sm:p-9">
                <p className="text-xs font-semibold uppercase tracking-[0.14em] text-white/68">
                  {city.bestFor.slice(0, 2).join(" · ")}
                </p>
                <div className="mt-3 flex items-end justify-between gap-4">
                  <div>
                    <h2 className="text-4xl text-white md:text-5xl">{city.cityName}</h2>
                    <p className="mt-2 text-sm text-white/72">A realistic first stay: {city.recommendedDays}</p>
                  </div>
                  <span className="grid h-11 w-11 shrink-0 place-items-center rounded-full bg-paper text-ember">
                    <ArrowRight aria-hidden="true" size={19} />
                  </span>
                </div>
              </div>
            </TrackedLink>
          ))}
        </div>
      </Section>

      <Section id="home-before-you-fly" variant="dark">
        <SectionHeader
          eyebrow="Before you fly"
          title="Four systems to make arrival day easier"
          description="Keep the preparation short, testable and backed up. Entry rules can change, so verify official requirements before relying on any visa-free route."
          inverse
        />
        <div className="grid overflow-hidden rounded-lg border border-white/15 md:grid-cols-2">
          {beforeYouFlyItems.map((item, index) => {
            const Icon = item.icon;
            return (
              <article
                key={item.title}
                className={`p-6 sm:p-8 ${index % 2 === 0 ? "bg-white/[0.045]" : "bg-white/[0.085]"} ${index < 2 ? "border-b border-white/15" : ""} ${index % 2 === 0 ? "md:border-r md:border-white/15" : ""}`}
              >
                <div className="flex items-center justify-between">
                  <span className="text-sm font-bold text-mist">{item.number}</span>
                  <Icon aria-hidden="true" size={24} className="text-mist" />
                </div>
                <h2 className="mt-7 text-3xl text-white">{item.title}</h2>
                <ul className="mt-5 grid gap-2.5 text-[15px] leading-relaxed text-white/70">
                  {item.bullets.map((bullet) => (
                    <li key={bullet} className="flex items-start gap-2.5">
                      <CheckCircle2 aria-hidden="true" size={17} className="mt-1 shrink-0 text-mist" />
                      <span>{bullet}</span>
                    </li>
                  ))}
                </ul>
                <TrackedLink
                  href={item.href}
                  eventName="homepage_before_fly_clicked"
                  eventParams={{ item_name: item.title, section: "homepage_before_you_fly" }}
                  className="mt-6 inline-flex min-h-11 items-center gap-2 font-semibold text-white underline decoration-white/30 underline-offset-4 hover:decoration-white"
                >
                  {item.label} <ArrowRight aria-hidden="true" size={16} />
                </TrackedLink>
              </article>
            );
          })}
        </div>
      </Section>

      <Section id="home-experiences" variant="light">
        <SectionHeader
          eyebrow="Choose by feeling, not just city names"
          title="Explore China Your Way"
          description="Every experience below opens a real city, guide or itinerary already available on the site."
        />
        <div className="grid border-y border-ink/12 sm:grid-cols-2 lg:grid-cols-4">
          {experienceLinks.map((item, index) => {
            const Icon = item.icon;
            return (
              <TrackedLink
                key={item.title}
                href={item.href}
                eventName="homepage_experience_clicked"
                eventParams={{ item_name: item.title, section: "homepage_experiences" }}
                className={`group min-h-[230px] border-b border-ink/12 p-6 transition hover:bg-sand/60 sm:border-r ${index % 2 === 1 ? "sm:border-r-0" : ""} ${index >= 6 ? "border-b-0" : ""} ${index % 4 === 3 ? "lg:border-r-0" : "lg:border-r"} ${index >= 4 ? "lg:border-b-0" : "lg:border-b"}`}
              >
                <Icon aria-hidden="true" size={24} className="text-ember" />
                <h2 className="mt-8 text-2xl leading-tight text-ink">{item.title}</h2>
                <p className="mt-3 text-sm leading-relaxed text-ink/62">{item.body}</p>
                <span className="mt-5 inline-flex items-center gap-2 text-sm font-bold text-jade">
                  Explore <ArrowRight aria-hidden="true" size={15} className="transition group-hover:translate-x-1" />
                </span>
              </TrackedLink>
            );
          })}
        </div>
      </Section>

      <Section
        id="home-product"
        variant="warm"
        containerClassName="grid gap-12 lg:grid-cols-[1.05fr_0.95fr] lg:items-center"
      >
        <TrackedLink
          href="/store#inside-the-guide"
          eventName="homepage_product_preview_clicked"
          eventParams={{
            item_name: "China Payment & Apps Setup Guide",
            section: "homepage_product_visual",
          }}
          className="group block"
        >
          <div
            data-testid="product-preview"
            className="grid min-h-[430px] grid-cols-[1.12fr_0.88fr] gap-3 rounded-lg bg-jade p-4 shadow-editorial sm:min-h-[520px] sm:gap-4 sm:p-6"
          >
            <div className="relative row-span-3 overflow-hidden rounded-md border-4 border-paper bg-paper shadow-editorial transition duration-500 group-hover:-translate-y-1">
              <Image
                src="/products/previews/payment-apps-guide-cover.png"
                alt="Cover of the China Payment and Apps Setup Guide"
                fill
                sizes="(min-width: 1024px) 30vw, 56vw"
                className="object-cover object-top"
              />
            </div>
            {[
              {
                src: "/products/previews/payment-apps-guide-decision-tree.png",
                alt: "Payment backup decision tree preview",
              },
              {
                src: "/products/previews/payment-apps-guide-app-stack.png",
                alt: "Essential China travel apps stack preview",
              },
              {
                src: "/products/previews/payment-apps-guide-hotel-card.png",
                alt: "Offline hotel address card preview",
              },
            ].map((preview) => (
              <div
                key={preview.src}
                className="relative overflow-hidden rounded-md border-2 border-paper bg-paper shadow-soft"
              >
                <Image
                  src={preview.src}
                  alt={preview.alt}
                  fill
                  sizes="(min-width: 1024px) 17vw, 40vw"
                  className="object-cover object-top"
                />
              </div>
            ))}
          </div>
        </TrackedLink>
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.14em] text-ember">
            Printable PDF · immediate digital access · $7
          </p>
          <h2 className="mt-4 text-4xl leading-tight text-ink md:text-5xl">Set Up China Before You Land</h2>
          <p className="mt-5 max-w-xl text-lg leading-relaxed text-ink/68">
            The China Payment &amp; Apps Setup Guide turns the most common first-day problems into a
            compact pre-arrival setup plan.
          </p>
          <ul className="mt-8 grid gap-4">
            {[
              "Set up Alipay and WeChat Pay",
              "Install essential China travel apps",
              "Save practical arrival-day backups",
            ].map((item) => (
              <li key={item} className="flex items-start gap-3 text-ink/78">
                <BadgeCheck aria-hidden="true" className="mt-1 shrink-0 text-jade" size={20} />
                <span>{item}</span>
              </li>
            ))}
          </ul>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
            <TrackedLink
              href="/store#inside-the-guide"
              eventName="homepage_product_preview_clicked"
              eventParams={{
                item_name: "China Payment & Apps Setup Guide",
                section: "homepage_product_cta",
              }}
              className={`${buttonClassName("secondary", "bg-surface")} w-full sm:w-fit`}
            >
              <BookOpen aria-hidden="true" size={18} />
              <span>Preview the Guide</span>
            </TrackedLink>
            <ProductActionButton
              canBuy={Boolean(paymentGuideBuyUrl)}
              href={paymentGuideBuyUrl}
              isExternal
              label="Buy securely on Payhip — $7"
              productId="china-payment-apps-setup-guide"
              placement="home_product"
              eventNames={["payment_apps_guide_buy_clicked", "payment_guide_buy_clicked"]}
              analyticsParams={{
                item_name: "China Payment & Apps Setup Guide",
                section: "homepage_product",
              }}
            />
          </div>
        </div>
      </Section>

      <Section id="home-guides" variant="light">
        <SectionHeader
          eyebrow="Featured guides"
          title="Three practical reads for the highest-friction decisions"
          description="The cards below use each Guide's own editorial data and traceable image—not duplicated homepage content."
          actionHref="/guides"
          actionLabel="View all guides"
        />
        <div className="grid gap-8 lg:grid-cols-3">
          {featuredGuides.map((guide) => (
            <GuideCard key={guide.id} guide={guide} />
          ))}
        </div>
      </Section>

      <div id="free-checklist" className="scroll-mt-24">
        <NewsletterSignup />
      </div>
    </>
  );
}
