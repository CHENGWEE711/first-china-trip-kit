import type { Metadata } from "next";
import dynamic from "next/dynamic";
import Image from "next/image";
import Link from "next/link";
import {
  AlertTriangle,
  ArrowDown,
  ArrowRight,
  BookOpen,
  CalendarClock,
  CheckCircle2,
  ExternalLink,
  FileCheck2,
  MapPinned,
  ShieldCheck,
  Smartphone,
} from "lucide-react";
import { buttonClassName } from "@/components/Button";
import { Container } from "@/components/Container";
import { SEOJsonLd } from "@/components/SEOJsonLd";
import { TransitEligibilityChecker } from "@/components/visa/TransitEligibilityChecker";
import { TransitTimeCalculator } from "@/components/visa/TransitTimeCalculator";
import { VisaActionLink } from "@/components/visa/VisaActionLink";
import { VisaDocumentsChecklist } from "@/components/visa/VisaDocumentsChecklist";
import { VisaHubAnalytics } from "@/components/visa/VisaHubAnalytics";
import { VisaPolicyChoiceLink } from "@/components/visa/VisaPolicyChoiceLink";
import { NewsletterSignup } from "@/components/NewsletterSignup";
import { VISA_POLICY_CHANGELOG } from "@/content/visa-policy-changelog";
import {
  PERMITTED_STAY_AREA_GROUPS,
  VISA_OFFICIAL_SOURCES,
  VISA_POLICY_META,
} from "@/data/visa";
import { cityImages, itineraryVisuals } from "@/data/images";
import { breadcrumbJsonLd, buildMetadata, faqJsonLd } from "@/lib/seo";
import { absoluteUrl, siteConfig } from "@/lib/site";

const EligiblePortsExplorer = dynamic(() =>
  import("@/components/visa/EligiblePortsExplorer").then(
    (module) => module.EligiblePortsExplorer,
  ),
  {
    loading: () => (
      <div className="border-y border-ink/12 py-10 text-sm text-ink/58" role="status">
        Loading the official port explorer…
      </div>
    ),
  },
);

const HUB_PATH = "/visa-free-transit";
const policyDateFormatter = new Intl.DateTimeFormat("en-US", {
  month: "long",
  day: "numeric",
  year: "numeric",
  timeZone: "UTC",
});
const policyVerifiedDate = new Date(`${VISA_POLICY_META.lastVerifiedAt}T00:00:00Z`);
const policyYear = policyVerifiedDate.getUTCFullYear();
const policyLastCheckedLabel = policyDateFormatter.format(policyVerifiedDate);
const policyNextReviewLabel = policyDateFormatter.format(
  new Date(`${VISA_POLICY_META.nextReviewDue}T00:00:00Z`),
);
const transitVisuals = itineraryVisuals["240-hour-visa-free-china-itinerary"];

export const metadata: Metadata = buildMetadata({
  title: `China 240-Hour Visa-Free Transit Checker & Guide (${policyYear})`,
  description: `Check whether your route may qualify for China's 240-hour visa-free transit policy. Review eligible nationalities, ${VISA_POLICY_META.eligiblePortCount} ports, permitted stay areas, documents and official sources.`,
  path: HUB_PATH,
  image: transitVisuals.heroImage.src,
  imageAlt: transitVisuals.heroImage.alt,
  imageWidth: 2400,
  imageHeight: 1600,
});

const policyChoices = [
  {
    title: "30-Day Visa-Free Entry",
    body: "For ordinary-passport holders from the current unilateral visa-free countries, when the purpose and stay fit that policy.",
    context: "unilateral-30-day",
  },
  {
    title: "240-Hour Visa-Free Transit",
    body: "For an eligible nationality, immediate third-country or region route, confirmed onward travel, eligible port and permitted stay area.",
    context: "transit-240-hour",
  },
  {
    title: "24-Hour Direct Transit",
    body: "For onward transit within 24 hours, normally without leaving the restricted port area unless temporary entry is granted.",
    context: "direct-transit-24-hour",
  },
  {
    title: "Visa Required or Manual Check",
    body: "For work, study, journalism, unclear connections, special documents or any route that needs airline or border-inspection confirmation.",
    context: "manual-review",
  },
] as const;

const validRouteExamples = [
  ["Tokyo", "Shanghai", "Singapore"],
  ["London", "Beijing", "Hong Kong"],
  ["Seoul", "Guangzhou", "Bangkok"],
] as const;

const arrivalSteps = [
  ["01", "Confirm with the airline", "Ask the operating airline to check the exact inbound and onward segments before travel."],
  ["02", "Prepare onward and stay details", "Keep the confirmed onward ticket and accommodation information accessible offline."],
  ["03", "Complete the official Arrival Card", "Use the National Immigration Administration channel if an Arrival Card is required."],
  ["04", "Follow transit signs", "Use the visa-free transit or temporary-entry route shown at the port."],
  ["05", "Apply at immigration inspection", "Present the documents requested for temporary entry."],
  ["06", "Keep the permit", "Use the authorized deadline and conditions shown on the temporary entry permit."],
  ["07", "Remain in the permitted area", "Do not assume an eligible airport allows nationwide travel."],
  ["08", "Depart within the authorized route", "Leave through a permitted route and within the deadline granted at entry."],
] as const;

const starterRoutes = [
  {
    duration: "3-Day Transit Idea",
    title: "Shanghai, kept intentionally simple",
    entry: "Shanghai Pudong International Airport",
    exit: "Shanghai Pudong or Hongqiao, subject to the confirmed onward route",
    area: "Shanghai Municipality",
    permittedAreaGroupId: "shanghai-municipality",
    transport: "Keep transfers inside the municipality; allow airport time on both ends.",
    bestFor: "A low-friction first stop focused on the Bund, neighborhoods and one easy city base.",
    image: cityImages.shanghai,
    href: "/city-kits/shanghai",
  },
  {
    duration: "5-Day Transit Idea",
    title: "Chengdu with a measured Leshan day",
    entry: "Chengdu Tianfu International Airport",
    exit: "Chengdu Tianfu or Shuangliu, subject to the confirmed onward route",
    area: "The 11 listed Sichuan cities, including Chengdu and Leshan",
    permittedAreaGroupId: "sichuan-11-cities",
    transport: "Plan Leshan as a dedicated rail day and keep the last night in Chengdu.",
    bestFor: "Travelers who want food, parks and one regional day trip without constant hotel changes.",
    image: cityImages.chengdu,
    href: "/city-kits/chengdu",
  },
  {
    duration: "Up to 10-Day Transit Idea",
    title: "Guangzhou and Shenzhen, inside Guangdong",
    entry: "Guangzhou Baiyun International Airport",
    exit: "A permitted Guangdong exit route that matches the confirmed onward ticket",
    area: "Guangdong Province",
    permittedAreaGroupId: "guangdong-province",
    transport: "Use high-speed rail between Guangzhou and Shenzhen; reserve the final transfer day.",
    bestFor: "Travelers combining Cantonese food, modern city life and a Hong Kong or Macao onward segment.",
    image: cityImages.shenzhen,
    href: "/city-kits/guangzhou",
  },
] as const;

const commonMistakes = [
  ["Booking A → Mainland China → A", "The immediate inbound and outbound country or region normally need to be different for the 240-hour transit route."],
  ["Using the first origin in a long itinerary", "Enter the place on the segment immediately before mainland China, not where the whole holiday began."],
  ["Using the final home destination", "Use the segment immediately after mainland China, not the final place at the end of a multi-stop trip."],
  ["Assuming every Chinese airport is eligible", `The current 240-hour policy uses the ${VISA_POLICY_META.eligiblePortCount} ports in the official appendix, including several non-airport ports.`],
  ["Assuming an eligible airport allows nationwide travel", "Entry port, permitted stay area and exit route are three separate checks."],
  ["Not holding confirmed onward travel", "The current rules require confirmed onward arrangements within the policy window."],
  ["Mixing 30-day entry and 240-hour transit", "The two policies have different passport, nationality and route logic. Check the more relevant policy first."],
  ["Relying only on a verbal airline answer", "Keep the actual ticket, route, entry-port and onward-destination documents ready for inspection."],
  ["Planning work, study or journalism", "Those activities require the appropriate prior approval and visa; the checker will not return a likely result for them."],
  ["Using an unofficial Arrival Card site", "The official NIA Arrival Card channel is free. This website never collects or submits passport data."],
] as const;

const faqs = [
  {
    question: "Is 240 hours the same as 10 calendar days?",
    answer: "Not exactly. The published 240-hour period is calculated from 00:00 on the day after entry, so the calendar span can look different from ten 24-hour blocks measured from your arrival time. Use the deadline shown on the temporary entry permit.",
  },
  {
    question: "When does the 240-hour period begin?",
    answer: "The current NIA notice states that the visa-free stay period is calculated from 00:00 on the day following the day of entry. Your authorized deadline is the one recorded by immigration inspection at the port.",
  },
  {
    question: "Does A → Mainland China → A qualify?",
    answer: "That basic round trip does not meet the third-country or region transit shape. Complex connections and technical stops can change the assessment, so use the immediate inbound and outbound segments and confirm unclear routes.",
  },
  {
    question: "Do Hong Kong and Macao count as onward regions?",
    answer: "They can be treated as separate onward regions in a qualifying transit itinerary, but the operating segments, ticket evidence and port assessment still matter. Confirm the exact route with the airline and immigration authority.",
  },
  {
    question: "Can I use separate tickets?",
    answer: "This can depend on the exact ticket and port assessment. The official rule requires confirmed onward arrangements to a third country or region. Confirm separate-ticket handling with the operating airline and the immigration authority at the entry port.",
  },
  {
    question: "Must the tickets be on the same booking?",
    answer: "The official wording focuses on confirmed onward arrangements and departure within the permitted time. Booking structure and re-check requirements can affect the practical assessment, so confirm with the airline and entry port.",
  },
  {
    question: "Can I enter through one port and leave through another?",
    answer: "A different eligible exit can be possible when the exact route, permitted area and onward transport comply. Guangdong also has a specific exit rule. Verify the exact pair before booking.",
  },
  {
    question: "Can I travel to another province?",
    answer: "Cross-region travel is allowed only within the permitted areas listed by the current policy. Some listed provinces are fully permitted; others are limited to named cities. This is not permission to travel anywhere in China.",
  },
  {
    question: "What happens if my flight is delayed?",
    answer: "Contact the airline and immigration authority immediately, before the authorized stay expires. Do not assume an operational delay automatically extends the temporary entry permission.",
  },
  {
    question: "Can I work or study during the stay?",
    answer: "No under this screening route. Work, study and news reporting require the appropriate prior approval and visa under the current NIA notice.",
  },
  {
    question: "Do children qualify?",
    answer: "Children need their own valid travel documents and must meet the relevant policy and route conditions. Confirm document and airline requirements for the child's exact itinerary.",
  },
  {
    question: "Do I need hotel bookings?",
    answer: "Accommodation information may be requested for the Arrival Card and temporary-entry process. If staying in a private residence or changing hotels, confirm the applicable registration and entry-port requirements.",
  },
  {
    question: "Can the airline refuse boarding?",
    answer: "Airlines check travel documents and may refuse boarding if they cannot verify that the itinerary meets destination and transit requirements. Confirm before travel and carry the supporting documents offline.",
  },
  {
    question: "Is the result from this checker official?",
    answer: "No. It is an educational screening result based on the current published policy data. Final handling is determined by immigration inspection officers at the port of entry.",
  },
  {
    question: "Where can I get an official answer?",
    answer: "Use the National Immigration Administration sources below, call China Immigration Service Hotline +86-12367 and ask the operating airline or immigration authority at the intended entry port about the exact itinerary.",
  },
] as const;

const visaJsonLd = [
  {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: metadata.title,
    description: metadata.description,
    url: absoluteUrl(HUB_PATH),
    dateModified: VISA_POLICY_META.lastVerifiedAt,
    inLanguage: "en",
    publisher: {
      "@type": "Organization",
      name: siteConfig.name,
      url: siteConfig.siteUrl,
    },
    isBasedOn: VISA_POLICY_META.officialSourceUrls,
  },
  {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    name: "China Visa-Free Transit Route Checker",
    applicationCategory: "TravelApplication",
    operatingSystem: "Web",
    url: absoluteUrl(`${HUB_PATH}#route-checker`),
    description: "An educational local route-screening tool using the currently verified China visa-free transit policy data.",
    isBasedOn: VISA_POLICY_META.officialSourceUrls,
  },
  breadcrumbJsonLd([
    { name: "Home", path: "/" },
    { name: "China Visa-Free Transit", path: HUB_PATH },
  ]),
  faqJsonLd([...faqs], HUB_PATH)!,
];

export default function VisaFreeTransitHubPage() {
  const fullProvinceAreas = PERMITTED_STAY_AREA_GROUPS.filter(
    (area) => !area.cities || area.cities.length === 0,
  );
  const limitedAreas = PERMITTED_STAY_AREA_GROUPS.filter(
    (area) => area.cities && area.cities.length > 0,
  );

  return (
    <>
      <VisaHubAnalytics />
      <SEOJsonLd data={visaJsonLd} />

      <div id="visa-free-transit-hub">
        <section className="border-b border-ink/12 bg-paper" data-testid="visa-hub-hero">
          <Container size="wide" className="grid lg:min-h-[680px] lg:grid-cols-[minmax(0,0.98fr)_minmax(500px,1.02fr)]">
            <div className="order-2 flex flex-col justify-center py-11 sm:py-14 lg:order-1 lg:py-20 lg:pr-14 xl:pr-20">
              <h1 className="max-w-3xl text-[43px] leading-[1.03] text-ink sm:text-5xl md:text-6xl lg:text-[66px]">
                Can You Visit China Visa-Free During a Transit?
              </h1>
              <p className="mt-6 max-w-2xl text-lg leading-relaxed text-ink/68">
                Check your route, passport, entry port and onward ticket against China&apos;s current 240-hour visa-free transit rules.
              </p>
              <div className="mt-7 flex flex-col gap-3 sm:flex-row">
                <Link href="#route-checker" className={buttonClassName("primary", "sm:min-w-40")}>
                  Check my route <ArrowDown aria-hidden="true" size={18} />
                </Link>
                <Link href="#eligible-ports" className={buttonClassName("secondary", "sm:min-w-48")}>
                  See the {VISA_POLICY_META.eligiblePortCount} eligible ports <ArrowDown aria-hidden="true" size={18} />
                </Link>
              </div>
              <div className="mt-7 flex flex-wrap items-center gap-x-5 gap-y-2 text-sm text-ink/62">
                <span className="inline-flex items-center gap-2 font-semibold text-ink">
                  <CheckCircle2 aria-hidden="true" className="text-jade" size={17} />
                  Last policy check: {policyLastCheckedLabel}
                </span>
                <span>Source: {VISA_POLICY_META.authority}</span>
                <VisaActionLink href="#official-sources" eventName="visa_policy_source_clicked" interactionType="click" className="font-semibold text-ember underline decoration-ember/30 underline-offset-4 hover:text-ember-hover">
                  Official sources used
                </VisaActionLink>
              </div>
              <p className="mt-5 max-w-2xl border-l-2 border-ink/20 pl-4 text-sm leading-relaxed text-ink/58">
                This is an educational screening tool, not legal advice or an official immigration decision. Final handling is determined by immigration inspection authorities at the port of entry.
              </p>
            </div>
            <figure className="relative order-1 min-h-[340px] overflow-hidden lg:order-2 lg:min-h-full">
              <Image
                src={transitVisuals.heroImage.src}
                alt={transitVisuals.heroImage.alt}
                fill
                priority
                sizes="(max-width: 1023px) 100vw, 52vw"
                className="object-cover"
                style={{ objectPosition: transitVisuals.heroImage.position || "center" }}
              />
              <figcaption className="absolute inset-x-0 bottom-0 bg-ink/90 px-5 py-4 text-xs leading-relaxed text-white/90 backdrop-blur-sm">
                Real airport photography. Your immediate inbound and onward segments—not the first and last cities in a long holiday—shape the transit check.
              </figcaption>
            </figure>
          </Container>
          <Container className="grid border-t border-ink/12 sm:grid-cols-2 lg:grid-cols-4">
            {[
              [`Up to ${VISA_POLICY_META.transitDurationHours} hours`, "Published maximum"],
              [`${VISA_POLICY_META.eligibleCountryCount} eligible nationalities`, "Current 240-hour list"],
              [`${VISA_POLICY_META.eligiblePortCount} eligible ports`, "Air, sea, rail, road and ferry"],
              [`${VISA_POLICY_META.provinceLevelRegionCount} province-level regions`, "Only the listed permitted areas"],
            ].map(([value, label]) => (
              <div key={value} className="border-b border-ink/12 py-5 sm:px-5 lg:border-b-0 lg:border-r last:lg:border-r-0">
                <p className="font-editorial text-2xl text-ink">{value}</p>
                <p className="mt-1 text-xs font-semibold uppercase tracking-[0.1em] text-ink/50">{label}</p>
              </div>
            ))}
            <p className="col-span-full border-t border-ink/12 py-3 text-xs font-semibold text-ink/52">
              Current policy dataset version: {VISA_POLICY_META.policyVersion} · Last verified {VISA_POLICY_META.lastVerifiedAt}
            </p>
          </Container>
        </section>

        <section className="editorial-section bg-sand" id="which-policy">
          <Container>
            <div className="max-w-3xl">
              <p className="text-xs font-semibold uppercase tracking-[0.14em] text-ember">Start with the right policy</p>
              <h2 className="mt-3 text-4xl leading-tight text-ink sm:text-5xl">Which policy fits your trip?</h2>
              <p className="mt-4 text-base leading-relaxed text-ink/64">The 30-day entry policy, 240-hour transit and 24-hour direct transit are different routes. The checker screens them in that order.</p>
            </div>
            <div className="mt-9 grid border-y border-ink/12 md:grid-cols-2 xl:grid-cols-4">
              {policyChoices.map((item, index) => {
                return (
                  <VisaPolicyChoiceLink
                    key={item.title}
                    context={item.context}
                    index={index}
                    title={item.title}
                    body={item.body}
                  />
                );
              })}
            </div>
          </Container>
        </section>

        <section className="editorial-section scroll-mt-24 bg-paper" id="route-checker">
          <Container>
            <div className="max-w-3xl">
              <p className="text-xs font-semibold uppercase tracking-[0.14em] text-ember">Local, private screening</p>
              <h2 className="mt-3 text-4xl leading-tight text-ink sm:text-5xl">Check your immediate route</h2>
              <p className="mt-4 text-base leading-relaxed text-ink/64">Five short steps compare only the facts needed for a cautious result. Your answers stay in this browser session and are not sent to analytics.</p>
            </div>
            <div className="mt-9">
              <TransitEligibilityChecker />
            </div>
          </Container>
        </section>

        <section className="editorial-section bg-ink text-white" id="route-shape">
          <Container>
            <div className="grid gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:items-end">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.14em] text-white/55">The third-country or region rule</p>
                <h2 className="mt-3 text-4xl leading-tight text-white sm:text-5xl">A → Mainland China → B</h2>
                <p className="mt-5 max-w-xl text-base leading-relaxed text-white/68">Use the country or region shown on the transport segment immediately before and immediately after mainland China. Technical stops, through flights and complicated re-checks need manual confirmation.</p>
              </div>
              <div className="border-y border-white/18 py-5">
                {validRouteExamples.map(([origin, china, onward]) => (
                  <div key={`${origin}-${onward}`} className="grid gap-2 border-b border-white/12 py-4 last:border-b-0 sm:grid-cols-[1fr_auto_1fr_auto_1fr] sm:items-center">
                    <span className="font-semibold">{origin}</span><ArrowRight aria-hidden="true" className="hidden text-white/45 sm:block" size={18} /><span className="font-editorial text-2xl text-white">{china}</span><ArrowRight aria-hidden="true" className="hidden text-white/45 sm:block" size={18} /><span className="font-semibold text-white/78">{onward}</span>
                  </div>
                ))}
                <div className="mt-5 flex items-start gap-3 border border-white/18 bg-white/5 p-4">
                  <AlertTriangle aria-hidden="true" className="mt-0.5 shrink-0 text-[#efb4a9]" size={20} />
                  <p className="text-sm leading-relaxed text-white/72"><strong className="text-white">Tokyo → Shanghai → Tokyo</strong> is the basic non-qualifying shape. Complex connections can change the assessment; use the immediate operating segments.</p>
                </div>
              </div>
            </div>
          </Container>
        </section>

        <section className="editorial-section bg-sand" id="time-calculator">
          <Container className="grid gap-9 lg:grid-cols-[0.72fr_1.28fr] lg:items-start">
            <div>
              <CalendarClock aria-hidden="true" className="text-ember" size={28} />
              <h2 className="mt-5 text-4xl leading-tight text-ink sm:text-5xl">How the 240 hours are counted</h2>
              <p className="mt-5 text-base leading-relaxed text-ink/66">The current NIA notice calculates the published 240-hour period from 00:00 on the day following the day of entry. The date tool uses China Standard Time, UTC+8.</p>
              <p className="mt-4 text-sm leading-relaxed text-ink/56">The tool teaches the timing rule. It does not determine whether the route, nationality, documents, port or activity is accepted.</p>
            </div>
            <TransitTimeCalculator />
          </Container>
        </section>

        <section className="editorial-section scroll-mt-24 bg-paper" id="eligible-ports">
          <Container>
            <div className="grid gap-5 lg:grid-cols-[1fr_0.58fr] lg:items-end">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.14em] text-ember">Official appendix, verified line by line</p>
                <h2 className="mt-3 text-4xl leading-tight text-ink sm:text-5xl">{VISA_POLICY_META.eligiblePortCount} eligible ports</h2>
              </div>
              <p className="text-sm leading-relaxed text-ink/62">Search the official list by city, common airport code or port name. The five Guangdong ports added in November 2025 are included.</p>
            </div>
            <div className="mt-9">
              <EligiblePortsExplorer />
            </div>
          </Container>
        </section>

        <section className="editorial-section bg-mist" id="permitted-areas">
          <Container>
            <div className="grid gap-10 lg:grid-cols-[0.72fr_1.28fr]">
              <div>
                <MapPinned aria-hidden="true" className="text-jade" size={28} />
                <h2 className="mt-5 text-4xl leading-tight text-ink sm:text-5xl">Where you can travel</h2>
                <p className="mt-5 text-base leading-relaxed text-ink/66">The current appendix permits cross-region travel only within its listed areas. Some entries cover a whole province or municipality; several are limited to named cities.</p>
                <div className="mt-6 grid gap-3 border-l-2 border-jade pl-5 text-sm">
                  <p><strong>Entry port</strong><br /><span className="text-ink/62">Must be on the current {VISA_POLICY_META.eligiblePortCount}-port list.</span></p>
                  <p><strong>Permitted stay area</strong><br /><span className="text-ink/62">Must match the listed current areas.</span></p>
                  <p><strong>Exit route</strong><br /><span className="text-ink/62">Must support the confirmed third-country or region itinerary.</span></p>
                </div>
              </div>
              <div>
                <div className="border-y border-ink/12 py-5">
                  <h3 className="text-2xl text-ink">Whole province or municipality listed</h3>
                  <div className="mt-4 flex flex-wrap gap-x-5 gap-y-2 text-sm text-ink/68">
                    {fullProvinceAreas.map((area) => <span key={area.id}>{area.displayName}</span>)}
                  </div>
                </div>
                <div className="border-b border-ink/12 py-5">
                  <h3 className="text-2xl text-ink">Limited to named cities or prefectures</h3>
                  <div className="mt-4 grid gap-3 sm:grid-cols-2">
                    {limitedAreas.map((area) => (
                      <div key={area.id}>
                        <p className="font-semibold text-ink">{area.displayName}</p>
                        <p className="mt-1 text-sm leading-relaxed text-ink/58">{area.cities?.join(", ")}</p>
                      </div>
                    ))}
                  </div>
                </div>
                <p className="mt-5 flex items-start gap-3 text-sm font-semibold leading-relaxed text-ink">
                  <ShieldCheck aria-hidden="true" className="mt-0.5 shrink-0 text-jade" size={19} />
                  An eligible airport does not automatically mean nationwide travel. Confirm the exact area and exit route shown for your temporary entry.
                </p>
              </div>
            </div>
          </Container>
        </section>

        <section className="editorial-section bg-paper" id="documents-checklist">
          <Container>
            <div className="max-w-3xl">
              <p className="text-xs font-semibold uppercase tracking-[0.14em] text-ember">Prepare evidence and backups</p>
              <h2 className="mt-3 text-4xl leading-tight text-ink sm:text-5xl">Documents checklist</h2>
              <p className="mt-4 text-base leading-relaxed text-ink/64">Policy conditions and sensible travel backups are labelled separately. Travel insurance is recommended, not represented as an official 240-hour requirement.</p>
            </div>
            <div className="mt-9">
              <VisaDocumentsChecklist />
            </div>
          </Container>
        </section>

        <section className="editorial-section bg-ink text-white" id="arrival-process">
          <Container>
            <div className="grid gap-5 lg:grid-cols-[1fr_0.55fr] lg:items-end">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.14em] text-white/55">At the port</p>
                <h2 className="mt-3 text-4xl leading-tight text-white sm:text-5xl">Arrival process</h2>
              </div>
              <p className="text-sm leading-relaxed text-white/64">This website never asks for passport details and does not complete an Arrival Card for you.</p>
            </div>
            <ol className="mt-10 grid border-y border-white/16 sm:grid-cols-2 lg:grid-cols-4">
              {arrivalSteps.map(([number, title, body]) => (
                <li key={number} className="min-h-52 border-b border-white/12 py-6 pr-5 sm:border-r sm:px-5 lg:border-b-0 lg:first:pl-0 lg:last:border-r-0 lg:last:pr-0">
                  <span className="text-sm font-semibold text-[#efb4a9]">{number}</span>
                  <h3 className="mt-6 text-2xl leading-tight text-white">{title}</h3>
                  <p className="mt-3 text-sm leading-relaxed text-white/62">{body}</p>
                </li>
              ))}
            </ol>
            <VisaActionLink href="https://s.nia.gov.cn/ArrivalCardFillingPC/" target="_blank" eventName="visa_official_arrival_card_clicked" interactionType="open" className="mt-7 inline-flex min-h-11 items-center gap-2 rounded-md bg-white px-5 py-2 text-sm font-semibold text-ink hover:bg-white/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-ink">
              Open the official NIA Arrival Card channel <ExternalLink aria-hidden="true" size={16} />
            </VisaActionLink>
          </Container>
        </section>

        <section className="editorial-section bg-sand" id="starter-routes">
          <Container>
            <div className="max-w-3xl">
              <p className="text-xs font-semibold uppercase tracking-[0.14em] text-ember">Inspiration after the policy check</p>
              <h2 className="mt-3 text-4xl leading-tight text-ink sm:text-5xl">3, 5 and up-to-10-day starter routes</h2>
              <p className="mt-4 text-base leading-relaxed text-ink/64">Each idea stays inside one explicitly named permitted-area group. It is not a claim that your exact ticket is eligible.</p>
            </div>
            <div className="mt-10 divide-y divide-ink/12 border-y border-ink/12">
              {starterRoutes.map((route) => (
                <article key={route.duration} className="grid gap-6 py-7 lg:grid-cols-[260px_1fr_0.62fr] lg:items-center">
                  <Link href={route.href} className="relative block aspect-[4/3] overflow-hidden rounded-md">
                    <Image src={route.image.src} alt={route.image.alt} fill sizes="(max-width: 1023px) 100vw, 260px" className="object-cover" style={{ objectPosition: route.image.position || "center" }} />
                  </Link>
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-[0.12em] text-ember">{route.duration}</p>
                    <h3 className="mt-2 text-3xl leading-tight text-ink">{route.title}</h3>
                    <p className="mt-3 text-sm leading-relaxed text-ink/62">{route.bestFor}</p>
                    <p className="mt-3 text-sm font-semibold text-jade">Permitted area group: {route.permittedAreaGroupId}</p>
                  </div>
                  <dl className="grid gap-3 border-l-2 border-ink/12 pl-4 text-sm">
                    <div><dt className="font-semibold text-ink/52">Entry</dt><dd className="mt-1 text-ink">{route.entry}</dd></div>
                    <div><dt className="font-semibold text-ink/52">Suggested exit</dt><dd className="mt-1 text-ink">{route.exit}</dd></div>
                    <div><dt className="font-semibold text-ink/52">Allowed area</dt><dd className="mt-1 text-ink">{route.area}</dd></div>
                    <div><dt className="font-semibold text-ink/52">Transport note</dt><dd className="mt-1 text-ink">{route.transport}</dd></div>
                    <Link href="#route-checker" className="mt-1 inline-flex items-center gap-2 font-semibold text-ember hover:text-ember-hover">Verify your exact route <ArrowRight aria-hidden="true" size={15} /></Link>
                  </dl>
                </article>
              ))}
            </div>
          </Container>
        </section>

        <section className="editorial-section bg-paper" id="common-mistakes">
          <Container className="grid gap-10 lg:grid-cols-[0.62fr_1.38fr]">
            <div>
              <AlertTriangle aria-hidden="true" className="text-ember" size={28} />
              <h2 className="mt-5 text-4xl leading-tight text-ink sm:text-5xl">Common mistakes</h2>
              <p className="mt-5 text-base leading-relaxed text-ink/64">Most errors come from using the wrong route segment, assuming every port or city is eligible, or treating a planning answer as official approval.</p>
            </div>
            <div className="divide-y divide-ink/12 border-y border-ink/12">
              {commonMistakes.map(([title, body], index) => (
                <details key={title} className="group py-1">
                  <summary className="flex min-h-16 cursor-pointer list-none items-center justify-between gap-4 py-3 font-semibold text-ink focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ember focus-visible:ring-offset-2">
                    <span><span className="mr-3 text-sm text-ember">{String(index + 1).padStart(2, "0")}</span>{title}</span>
                    <span aria-hidden="true" className="text-xl text-ember transition group-open:rotate-45">+</span>
                  </summary>
                  <p className="pb-5 pl-10 text-sm leading-relaxed text-ink/62">{body}</p>
                </details>
              ))}
            </div>
          </Container>
        </section>

        <section className="editorial-section bg-mist" id="faq">
          <Container>
            <div className="max-w-3xl">
              <p className="text-xs font-semibold uppercase tracking-[0.14em] text-ember">People always ask</p>
              <h2 className="mt-3 text-4xl leading-tight text-ink sm:text-5xl">Visa-free transit FAQ</h2>
            </div>
            <div className="mt-9 divide-y divide-ink/12 border-y border-ink/12">
              {faqs.map((faq) => (
                <details key={faq.question} className="group bg-transparent">
                  <summary className="flex min-h-16 cursor-pointer list-none items-center justify-between gap-4 py-4 text-lg font-semibold text-ink focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ember focus-visible:ring-offset-2">
                    {faq.question}<span aria-hidden="true" className="text-xl text-ember transition group-open:rotate-45">+</span>
                  </summary>
                  <p className="max-w-4xl pb-5 text-base leading-relaxed text-ink/66">{faq.answer}</p>
                </details>
              ))}
            </div>
          </Container>
        </section>

        <section className="editorial-section bg-paper" id="official-sources">
          <Container>
            <div className="grid gap-10 lg:grid-cols-[0.72fr_1.28fr]">
              <div>
                <FileCheck2 aria-hidden="true" className="text-jade" size={28} />
                <h2 className="mt-5 text-4xl leading-tight text-ink sm:text-5xl">Official sources and update log</h2>
                <p className="mt-5 text-base leading-relaxed text-ink/64">Last checked {policyLastCheckedLabel}. Policy data is scheduled for review by {policyNextReviewLabel}.</p>
                <VisaActionLink href="tel:+8612367" eventName="visa_12367_clicked" interactionType="click" className="mt-6 inline-flex min-h-11 items-center gap-2 rounded-md border border-ink/22 px-4 py-2 text-sm font-semibold text-ink hover:border-ember hover:text-ember">
                  China Immigration Service Hotline: +86-12367
                </VisaActionLink>
              </div>
              <div>
                <div className="divide-y divide-ink/12 border-y border-ink/12">
                  {VISA_OFFICIAL_SOURCES.map((source) => (
                    <VisaActionLink key={source.id} href={source.url} target="_blank" eventName="visa_policy_source_clicked" interactionType="open" className="flex min-h-14 items-center justify-between gap-4 py-3 text-sm font-semibold text-ink hover:text-ember">
                      {source.title}<ExternalLink aria-hidden="true" className="shrink-0" size={16} />
                    </VisaActionLink>
                  ))}
                </div>
                <div className="mt-8 border-t border-ink/12">
                  {VISA_POLICY_CHANGELOG.map((entry) => (
                    <div key={entry.effectiveDate} className="grid gap-3 border-b border-ink/12 py-5 sm:grid-cols-[150px_1fr]">
                      <p className="font-semibold text-ember">{entry.effectiveDate}</p>
                      <div>
                        <p className="font-semibold text-ink">{entry.title}</p>
                        <p className="mt-1 text-sm leading-relaxed text-ink/66">{entry.whatChanged}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </Container>
        </section>

        <NewsletterSignup />

        <section className="border-t border-white/10 bg-ink py-14 text-white">
          <Container>
            <div className="grid gap-8 lg:grid-cols-[1fr_auto] lg:items-center">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.14em] text-white/50">After the route check</p>
                <h2 className="mt-3 text-4xl leading-tight text-white">Save the essentials for arrival day</h2>
                <p className="mt-3 max-w-2xl text-sm leading-relaxed text-white/62">Keep the free transit checklist, then prepare the payment, app and offline backups you will need if the route is accepted.</p>
              </div>
              <div className="flex flex-col gap-3 sm:flex-row lg:flex-col xl:flex-row">
                <Link href="#documents-checklist" className="inline-flex min-h-11 items-center justify-center gap-2 rounded-md bg-white px-5 py-3 text-sm font-semibold text-ink hover:bg-white/90">Save your transit checklist <ArrowRight aria-hidden="true" size={16} /></Link>
                <VisaActionLink href="/payments-and-apps" eventName="visa_to_payment_hub_clicked" interactionType="click" className="inline-flex min-h-11 items-center justify-center gap-2 rounded-md border border-white/30 px-5 py-3 text-sm font-semibold text-white hover:border-white">Prepare payments and essential apps <Smartphone aria-hidden="true" size={17} /></VisaActionLink>
                <VisaActionLink href="/guides/china-240-hour-visa-free-transit-guide" eventName="visa_guide_clicked" interactionType="click" className="inline-flex min-h-11 items-center justify-center gap-2 rounded-md border border-white/30 px-5 py-3 text-sm font-semibold text-white hover:border-white">Read the detailed Guide <BookOpen aria-hidden="true" size={17} /></VisaActionLink>
              </div>
            </div>
          </Container>
        </section>
      </div>
    </>
  );
}
