export const cityKitSlugs = [
  "shanghai",
  "beijing",
  "xian",
  "chengdu",
  "hangzhou",
  "suzhou",
  "guangzhou",
  "shenzhen",
] as const;

export const itineraryKitSlugs = [
  "3-days-in-shanghai",
  "3-days-in-beijing",
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
  guangzhou: {
    kitTitle: "Guangzhou First Trip Kit",
    difficultyLevel: "Moderate",
    chineseAddressSupport: "Airport, rail stations, old town, riverfront, food streets, and hotel pickup addresses.",
    localTips: [
      "Use Guangzhou for Cantonese food, markets, and a softer South China introduction.",
      "Confirm whether your train uses Guangzhou South, Guangzhou East, or Guangzhou Railway Station.",
      "Stay near a metro line because the city is large and spread out.",
    ],
  },
  shenzhen: {
    kitTitle: "Shenzhen First Trip Kit",
    difficultyLevel: "Easy",
    chineseAddressSupport: "Rail stations, border crossings, tech districts, parks, and central hotel addresses.",
    localTips: [
      "Shenzhen is easiest when paired with Hong Kong, Guangzhou, or a short business trip.",
      "Keep border, rail, and airport locations very clear because they are not interchangeable.",
      "Use it for modern China, design, parks, and tech energy rather than classic historic sights.",
    ],
  },
};

export const essentialKits = [
  {
    title: "Visa & Entry Kit",
    href: "/visa-free-transit",
    summary: "Understand visa-free routing, entry documents, onward tickets, and official checks.",
  },
  {
    title: "Payment Kit",
    href: "/payments-and-apps#payments",
    summary: "Set up Alipay, WeChat Pay, cash backup, hotel cards, and payment troubleshooting.",
  },
  {
    title: "China Apps Kit",
    href: "/payments-and-apps#apps",
    summary: "Prepare maps, translation, ride-hailing, train support, payment, and offline backups.",
  },
  {
    title: "Transport Kit",
    href: "/guides/how-to-book-high-speed-trains-in-china",
    summary: "Book trains, choose the right station, use your passport, and board confidently.",
  },
  {
    title: "Internet & eSIM Kit",
    href: "/payments-and-apps#internet",
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
    bestFor: "Travelers considering a 240-hour visa-free transit route.",
    type: "visa",
  },
  {
    slug: "china-trip-duration-planner",
    title: "China Trip Duration Planner",
    summary:
      "Pick cities and travel pace to estimate a realistic first China trip length.",
    bestFor: "Travelers unsure how many cities fit into their available days.",
    type: "duration",
  },
  {
    slug: "essential-apps-checklist",
    title: "Essential Apps Checklist",
    summary:
      "Mark the apps and offline backups you should prepare before your first arrival day.",
    bestFor: "Travelers setting up payment, maps, translation, internet, and backups.",
    type: "apps",
  },
  {
    slug: "city-route-picker",
    title: "City Route Picker",
    summary:
      "Choose your travel interests and get a simple first-route direction.",
    bestFor: "Travelers choosing their first China city combination.",
    type: "route",
  },
] as const;

export function getToolBySlug(slug: string) {
  return toolKits.find((tool) => tool.slug === slug);
}
