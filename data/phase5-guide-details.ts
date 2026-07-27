import type { GuideDetailContent } from "@/data/guide-detail-content";

const paymentSources = [
  { label: "State Council payment service guide", href: "https://english.www.gov.cn/news/202404/11/content_WS6617c858c6d0868f4e8e5f4d.html", note: "Official visitor guidance for mobile payment, bank cards and cash." },
  { label: "Working and Living in China guide", href: "https://english.www.gov.cn/2025special/bizexpatsinchina2025", note: "Official visitor information on payment, transport and visitor services." },
];
const transportSources = [
  { label: "China Railway 12306 English", href: "https://www.12306.cn/en/index.html", note: "Official English railway service entry point." },
  { label: "Working and Living in China guide", href: "https://english.www.gov.cn/2025special/bizexpatsinchina2025", note: "Official visitor information on rail, metro and ride-hailing." },
];
const visaSources = [
  { label: "National Immigration Administration 240-hour notice", href: "https://en.nia.gov.cn/n147418/n147468/c187308/content.html", note: "Official policy notice, conditions, ports and permitted areas. Recheck before travel." },
  { label: "NIA policy interpretation", href: "https://en.nia.gov.cn/n147418/n147463/c183412/content.html", note: "Official policy explanation for 24-hour and 240-hour transit." },
];

type DetailSeed = Pick<GuideDetailContent, "quickAnswer" | "steps" | "commonMistakes" | "troubleshooting" | "firstDayChecklist">;

function createDetail(seed: DetailSeed, officialSourceLinks: GuideDetailContent["officialSourceLinks"], relatedGuideSlugs: string[]): GuideDetailContent {
  return {
    importantNotice: "Policy, payment, app, carrier and transport rules can change. This article is planning guidance only: use the linked official source and relevant provider or carrier for your exact situation.",
    lastVerified: "2026-07-27",
    verificationLabel: "Official sources last checked",
    ...seed,
    whoThisGuideIsFor: ["First-time China visitors who want a practical answer before booking or departure.", "Travelers willing to keep a backup plan rather than rely on one app, card, route or search result."],
    backupPlan: ["Save the relevant official source and your confirmations offline.", "Keep a second payment, data or transport option where the guide recommends one."],
    faq: [
      { question: "Is this a guarantee that my setup or route will work?", answer: "No. Payment apps, banks, carriers, immigration authorities and merchants make the final operational decisions. Verify the current official source before travel." },
      { question: "What should I save offline?", answer: "Save the address, confirmation, current policy source and backup contact relevant to your next arrival-day task." },
    ],
    officialSourceLinks,
    ctaLinks: [
      { label: "Use the free arrival readiness checker", href: "/tools/china-arrival-readiness-checker", note: "Turn the guidance into a personal preparation list without entering sensitive details." },
      { label: "Get the free checklist", href: "/thank-you", note: "Keep the core first-trip essentials in one printable checklist." },
    ],
    relatedGuideSlugs,
    relatedProductIds: ["china-arrival-setup-bundle"],
  };
}

const paymentSeed: DetailSeed = {
  quickAnswer: "Yes, official visitor guidance says foreign visitors can follow current payment-app prompts to bind eligible international cards, but acceptance, issuer verification, limits and charges vary. Set up before departure, make a small test purchase after arrival, and keep a physical card plus a small RMB cash backup.",
  steps: ["Install the app from its official store listing and complete only its required current setup prompts.", "Use the same name format as your travel document and keep your issuing bank's authentication method available.", "Add a second card if you have one from another issuer.", "Test one low-value purchase near your hotel before relying on the app for a taxi or dinner."],
  commonMistakes: ["Treating a successful card link as proof every merchant will accept it.", "Leaving the first verification attempt until the airport.", "Submitting card or passport data through unknown support links."],
  troubleshooting: ["If verification fails, check issuer alerts and current app guidance rather than repeating many attempts.", "Use cash or another method for the urgent payment, then troubleshoot on stable Wi-Fi."],
  firstDayChecklist: ["Primary app opens.", "Backup card is accessible.", "Small test purchase completed.", "Hotel address is saved offline."],
};
const appsSeed: DetailSeed = {
  quickAnswer: "Install only the essentials before departure: a payment option, maps, translation, a data plan, ride-hailing and rail support if your route needs them. Sign in, save important addresses and create an offline screenshot folder so no single app failure disrupts your arrival.",
  steps: ["Choose one app for each essential task instead of installing every local service.", "Sign in, enable the recovery route you understand and download any offline support before departure.", "Save hotel names and key stations in Chinese plus map pins.", "Create screenshots for bookings, routes and emergency contacts."],
  commonMistakes: ["Assuming an English app label is enough to find a Chinese address.", "Depending on a live data connection for every confirmation.", "Using an unknown download link or sharing credentials with a helper."],
  troubleshooting: ["If a route cannot be found, show the Chinese address and saved map pin to hotel staff or a driver.", "If data is weak, use screenshots and Wi-Fi before retrying booking or payment."],
  firstDayChecklist: ["Data plan active.", "Hotel address opens offline.", "Translation is ready.", "Ride or transport fallback is clear."],
};
const visaSeed: DetailSeed = {
  quickAnswer: "China's 240-hour visa-free transit policy is route-specific, not a universal visa waiver. Check your nationality, valid travel document, confirmed onward trip to a third country or region, entry port and permitted stay area against the current National Immigration Administration notice before booking non-refundable travel.",
  steps: ["Open the current NIA notice and confirm your passport nationality appears in the eligible group.", "Match your exact arrival port and every planned location against the official permitted-area information.", "Keep confirmed onward evidence and the official source available for airline and immigration checks.", "Recheck after any change to flight, rail, hotel or onward destination."],
  commonMistakes: ["Assuming any return or onward booking fits the third-country rule.", "Using a city list without checking the port and permitted area together.", "Booking an exit too tightly to the policy limit."],
  troubleshooting: ["If the route is unclear, ask the carrier and NIA 12367 before departure.", "If an itinerary changes, redo every official check rather than assuming the old result carries over."],
  firstDayChecklist: ["Passport and onward proof ready.", "Current NIA policy link saved.", "Hotel and domestic travel stay inside the verified plan.", "Departure buffer is built in."],
};

export const phase5GuideDetails: Record<string, GuideDetailContent> = {
  "can-i-link-a-foreign-card-to-alipay-in-china": createDetail(paymentSeed, paymentSources, ["how-to-pay-in-china-as-a-foreigner", "how-to-use-alipay-in-china-as-a-tourist"]),
  "can-foreigners-use-wechat-pay-with-an-international-card": createDetail(paymentSeed, paymentSources, ["how-to-use-wechat-pay-in-china-as-a-foreigner", "how-to-pay-in-china-as-a-foreigner"]),
  "should-i-carry-cash-or-cards-in-china-as-a-tourist": createDetail(paymentSeed, paymentSources, ["how-to-pay-in-china-as-a-foreigner", "how-to-use-alipay-and-wechat-pay-in-china"]),
  "which-china-travel-apps-should-i-install-before-flying": createDetail(appsSeed, transportSources, ["best-apps-for-traveling-in-china", "china-esim-guide-for-tourists"]),
  "what-map-app-works-best-in-china-for-tourists": createDetail(appsSeed, transportSources, ["best-apps-for-traveling-in-china", "china-travel-checklist-before-you-fly"]),
  "how-do-foreigners-book-trains-and-rides-in-china": createDetail(appsSeed, transportSources, ["how-to-book-high-speed-trains-in-china", "best-apps-for-traveling-in-china"]),
  "what-counts-as-a-third-country-for-china-240-hour-transit": createDetail(visaSeed, visaSources, ["china-240-hour-visa-free-transit-guide", "can-americans-travel-to-china-in-2026"]),
  "when-does-china-240-hour-transit-period-start": createDetail(visaSeed, visaSources, ["china-240-hour-visa-free-transit-guide", "what-counts-as-a-third-country-for-china-240-hour-transit"]),
  "which-ports-and-areas-work-for-china-240-hour-transit": createDetail(visaSeed, visaSources, ["china-240-hour-visa-free-transit-guide", "what-counts-as-a-third-country-for-china-240-hour-transit"]),
};
