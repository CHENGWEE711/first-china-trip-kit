export const cityKitSlugs = [
  "shanghai",
  "beijing",
  "xian",
  "chengdu",
  "hangzhou",
  "suzhou",
] as const;

export const itineraryKitSlugs = [
  "3-days-in-shanghai",
  "4-days-in-beijing",
  "5-days-beijing-and-xian",
  "7-days-shanghai-hangzhou-suzhou",
  "10-days-classic-china-itinerary",
  "240-hour-visa-free-china-itinerary",
] as const;

export const cityKitMeta: Record<
  string,
  {
    kitTitle: string;
    difficultyLevel: "Easy" | "Moderate" | "Advanced";
    chineseAddressSupport: string;
    localTips: string[];
  }
> = {
  shanghai: {
    kitTitle: "Shanghai First Trip Kit",
    difficultyLevel: "Easy",
    chineseAddressSupport: "Airport, rail station, Bund, Yu Garden, and central pickup addresses.",
    localTips: [
      "Use Shanghai as your payment and app setup city before traveling deeper into China.",
      "Keep a skyline evening flexible so you can choose the clearest weather window.",
      "People's Square and Jing'an are easier first bases than remote bargain hotels.",
    ],
  },
  beijing: {
    kitTitle: "Beijing First Trip Kit",
    difficultyLevel: "Moderate",
    chineseAddressSupport: "Major sights, railway station, and Great Wall transfer addresses.",
    localTips: [
      "Carry your passport for major sights and train travel.",
      "Reserve high-demand attractions before arrival when possible.",
      "Treat the Great Wall as a full-day logistics plan, not a quick city stop.",
    ],
  },
  xian: {
    kitTitle: "Xi'an First Trip Kit",
    difficultyLevel: "Easy",
    chineseAddressSupport: "Terracotta Warriors, rail station, city wall, pagoda, and museum addresses.",
    localTips: [
      "Allow half a day for the Terracotta Warriors because they are outside the city center.",
      "Stay near the City Wall or Bell Tower for a smoother first visit.",
      "Use Xi'an as a compact add-on after Beijing if you want history without too many city changes.",
    ],
  },
  chengdu: {
    kitTitle: "Chengdu First Trip Kit",
    difficultyLevel: "Easy",
    chineseAddressSupport: "Panda base, railway station, parks, monastery, and central dining addresses.",
    localTips: [
      "Go to the panda base early in the morning.",
      "Ask for a split hot pot broth if you are unsure about spice.",
      "Leave room for tea houses and parks; Chengdu is better when the pace is not packed.",
    ],
  },
  hangzhou: {
    kitTitle: "Hangzhou First Trip Kit",
    difficultyLevel: "Moderate",
    chineseAddressSupport: "West Lake, temple, tea village, station, and old street addresses.",
    localTips: [
      "Do not try to walk the entire West Lake loop in one hot afternoon.",
      "Use taxis for tea field and temple hops where the metro is less convenient.",
      "Avoid weekend lake crowds if your Shanghai schedule is flexible.",
    ],
  },
  suzhou: {
    kitTitle: "Suzhou First Trip Kit",
    difficultyLevel: "Easy",
    chineseAddressSupport: "Gardens, museum, old street, and railway station addresses.",
    localTips: [
      "Choose one or two gardens instead of rushing through every famous garden.",
      "Check whether your train uses Suzhou Railway Station or Suzhou North.",
      "Overnighting can make canal streets calmer than a peak-hour day trip.",
    ],
  },
};

export const essentialKits = [
  {
    title: "Visa & Entry Kit",
    href: "/itinerary-kits/240-hour-visa-free-china-itinerary",
    summary: "Understand visa-free routing, entry documents, onward tickets, and official checks.",
  },
  {
    title: "Payment Kit",
    href: "/guides/how-to-pay-in-china-as-a-foreigner",
    summary: "Set up Alipay, WeChat Pay, cash backup, hotel cards, and payment troubleshooting.",
  },
  {
    title: "China Apps Kit",
    href: "/guides/best-apps-for-traveling-in-china",
    summary: "Prepare maps, translation, ride-hailing, train support, payment, and offline backups.",
  },
  {
    title: "Transport Kit",
    href: "/guides/how-to-take-high-speed-trains-in-china",
    summary: "Book trains, choose the right station, use your passport, and board confidently.",
  },
  {
    title: "Internet & eSIM Kit",
    href: "/guides/china-internet-and-esim-guide",
    summary: "Plan mobile data, offline screenshots, phone setup, and app access before arrival.",
  },
  {
    title: "Food Ordering Kit",
    href: "/guides/china-food-ordering-guide",
    summary: "Use menu translation, payment QR codes, spice phrases, and simple first meals.",
  },
];

export const firstTripChecklist = [
  "Check visa or visa-free eligibility",
  "Set up Alipay or WeChat Pay",
  "Install essential China apps",
  "Prepare eSIM or internet access",
  "Save hotel addresses in Chinese",
  "Learn basic Chinese phrases",
];

export const toolKits = [
  {
    slug: "visa-free-eligibility-checker",
    title: "Visa-Free Eligibility Checker",
    summary:
      "A planning checklist that helps you identify what to verify before relying on visa-free transit.",
    type: "visa",
  },
  {
    slug: "china-trip-duration-planner",
    title: "China Trip Duration Planner",
    summary:
      "Pick cities and travel pace to estimate a realistic first China trip length.",
    type: "duration",
  },
  {
    slug: "essential-apps-checklist",
    title: "Essential Apps Checklist",
    summary:
      "Mark the apps and offline backups you should prepare before your first arrival day.",
    type: "apps",
  },
  {
    slug: "city-route-picker",
    title: "City Route Picker",
    summary:
      "Choose your travel interests and get a simple first-route direction.",
    type: "route",
  },
] as const;

export function getToolBySlug(slug: string) {
  return toolKits.find((tool) => tool.slug === slug);
}
