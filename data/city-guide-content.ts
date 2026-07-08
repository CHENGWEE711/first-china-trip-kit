import type { FAQ, LinkItem } from "@/data/faqs";
import { getCityBySlug } from "@/data/cities";

export type DetailedAttraction = {
  name: string;
  recommendedTime: string;
  description: string;
};

export type DetailedFood = {
  name: string;
  chineseName: string;
  description: string;
};

export type CityGuideContent = {
  whyVisit: string[];
  bestAreasToStay: string[];
  topAttractionsDetailed: DetailedAttraction[];
  localFoodsDetailed: DetailedFood[];
  arrivalTips: string[];
  bookInAdvance: string[];
  faq: FAQ[];
  relatedGuideSlugs: string[];
  officialSourceLinks?: LinkItem[];
};

export const cityGuideContent: Record<string, CityGuideContent> = {
  shanghai: {
    whyVisit: [
      "Shanghai is the smoothest first stop for many foreign visitors because international flights, airport transfers, hotels, metro signs, and English-friendly services are easier here than in many other Chinese cities.",
      "The city gives you a fast, useful preview of modern China: mobile payment, high-speed rail, river skylines, shopping streets, museum reservations, and neighborhood food culture all in one place.",
      "It works well as a base for short trips to Hangzhou, Suzhou, and nearby water towns, so you can add classical gardens and lake scenery without long domestic travel days.",
    ],
    bestAreasToStay: [
      "People's Square: best first-choice area for short stays, metro access, Nanjing Road, museums, and easy taxi pickups.",
      "Jing'an: best for restaurants, cafes, boutiques, nightlife, and a more lived-in central Shanghai feeling.",
      "Former French Concession: best for leafy streets, slower mornings, boutique hotels, and travelers who enjoy walking.",
      "The Bund or Lujiazui: best for premium hotels and skyline views, but less convenient for every neighborhood meal.",
    ],
    topAttractionsDetailed: [
      {
        name: "The Bund",
        recommendedTime: "1.5-2 hours",
        description:
          "Go near sunset if the sky is clear. Walk the riverside promenade, then cross to Pudong or take a short river cruise only if you want a second skyline angle.",
      },
      {
        name: "Yu Garden and Old City",
        recommendedTime: "2-3 hours",
        description:
          "A compact introduction to old Shanghai architecture, garden design, snack streets, and souvenir lanes. Arrive early or late to avoid the densest crowds.",
      },
      {
        name: "Former French Concession",
        recommendedTime: "Half day",
        description:
          "Plan this as a walking neighborhood rather than one sight. Fuxing Park, Wukang Road, Anfu Road, and local cafes make a strong low-pressure afternoon.",
      },
      {
        name: "Shanghai Museum East or Shanghai Museum",
        recommendedTime: "2-3 hours",
        description:
          "A good cultural anchor for rainy days or jet-lag recovery. Check whether timed reservations are required before going.",
      },
    ],
    localFoodsDetailed: [
      {
        name: "Soup dumplings",
        chineseName: "小笼包",
        description:
          "Shanghai's classic steamed dumplings with hot broth inside. Bite carefully, sip the soup, then add vinegar and ginger.",
      },
      {
        name: "Pan-fried buns",
        chineseName: "生煎包",
        description:
          "Crispy-bottomed buns filled with pork and broth. They are excellent for breakfast or a casual lunch.",
      },
      {
        name: "Scallion oil noodles",
        chineseName: "葱油拌面",
        description:
          "A simple noodle dish that is easy to order, good for first-day meals, and usually gentle on the stomach.",
      },
      {
        name: "Crab roe noodles",
        chineseName: "蟹粉面",
        description:
          "A richer seasonal option, especially popular in autumn and winter. Prices vary widely, so check before ordering.",
      },
    ],
    arrivalTips: [
      "From Pudong Airport, Metro Line 2 is cheap but slow; ride-hailing or taxi is easier with luggage; Maglev plus metro is fun but still requires a transfer.",
      "From Hongqiao Airport or Hongqiao Railway Station, Metro Line 2 and Line 10 connect well to central areas.",
      "If you arrive late, keep your hotel name, Chinese address, and phone number saved offline for the taxi driver or ride-hailing pickup point.",
      "Do not schedule a major museum or prepaid activity on arrival afternoon unless your flight lands early and you have slept well.",
    ],
    bookInAdvance: [
      "Popular museum tickets or timed entries during weekends and holidays.",
      "High-speed train tickets to Hangzhou, Suzhou, or Beijing during peak travel periods.",
      "A special dinner reservation if you want a view restaurant, tasting menu, or famous local chain.",
      "Airport transfer if you land late at night with family luggage.",
    ],
    faq: [
      {
        question: "Is Shanghai a good first city for China?",
        answer:
          "Yes. Shanghai is one of the easiest first cities because transport, hotels, metro signs, international flights, and payment setup are relatively visitor-friendly.",
      },
      {
        question: "How many days do I need in Shanghai?",
        answer:
          "Three days is enough for The Bund, Yu Garden, the Former French Concession, local food, and one modern museum or skyline experience. Four days gives you room for a water town or slower neighborhoods.",
      },
      {
        question: "Where should first-time visitors stay in Shanghai?",
        answer:
          "People's Square, Jing'an, and the Former French Concession are the safest choices for convenience. The Bund is excellent for views but can be more expensive.",
      },
      {
        question: "Can I use Shanghai as a visa-free transit base?",
        answer:
          "Many travelers use Shanghai for transit itineraries, but eligibility depends on nationality, port, onward destination, and current rules. Always verify official entry requirements before booking.",
      },
    ],
    relatedGuideSlugs: [
      "how-to-pay-in-china-as-a-foreigner",
      "best-apps-for-traveling-in-china",
      "how-to-book-high-speed-trains-in-china",
    ],
    officialSourceLinks: [
      {
        label: "Shanghai government travel information",
        href: "https://english.shanghai.gov.cn/",
        note: "Use for current city service and visitor notices.",
      },
      {
        label: "Shanghai Metro",
        href: "https://service.shmetro.com/en/",
        note: "Use for network and metro service information.",
      },
    ],
  },
};

export function getCityGuideContent(slug: string): CityGuideContent | undefined {
  return cityGuideContent[slug] || createDefaultCityGuideContent(slug);
}

const cityOfficialResources: Record<string, LinkItem[]> = {
  beijing: [
    {
      label: "Beijing Municipal Government",
      href: "https://english.beijing.gov.cn/",
      note: "Use for current city service and visitor information.",
    },
    {
      label: "Beijing Subway",
      href: "https://www.bjsubway.com/en/",
      note: "Use for metro network and service information.",
    },
  ],
  xian: [
    {
      label: "Xi'an municipal visitor information",
      href: "https://en.xa.gov.cn/",
      note: "Use for current city information and local notices.",
    },
    {
      label: "China Railway 12306",
      href: "https://www.12306.cn/en/",
      note: "Use for train schedules, ticket information, and station details.",
    },
  ],
  chengdu: [
    {
      label: "Chengdu municipal information",
      href: "https://www.chengdu.gov.cn/english/",
      note: "Use for current city information and local notices.",
    },
    {
      label: "Chengdu Research Base of Giant Panda Breeding",
      href: "https://www.panda.org.cn/en/",
      note: "Use for current panda base visitor information.",
    },
  ],
  hangzhou: [
    {
      label: "Hangzhou municipal information",
      href: "https://eng.hangzhou.gov.cn/",
      note: "Use for current city information and local notices.",
    },
    {
      label: "China Railway 12306",
      href: "https://www.12306.cn/en/",
      note: "Use for train schedules and station details.",
    },
  ],
  suzhou: [
    {
      label: "Suzhou municipal information",
      href: "https://www.suzhou.gov.cn/szsenglish/",
      note: "Use for current city information and local notices.",
    },
    {
      label: "China Railway 12306",
      href: "https://www.12306.cn/en/",
      note: "Use for train schedules and station details.",
    },
  ],
  guangzhou: [
    {
      label: "Guangzhou municipal information",
      href: "https://www.gz.gov.cn/guangzhouinternational/",
      note: "Use for current city information and local notices.",
    },
    {
      label: "Guangzhou Metro",
      href: "https://cs.gzmtr.com/ckfwEnglish/",
      note: "Use for metro route and service information.",
    },
  ],
  shenzhen: [
    {
      label: "Shenzhen Government Online",
      href: "https://www.sz.gov.cn/en/",
      note: "Use for current city information and local notices.",
    },
    {
      label: "Shenzhen Metro",
      href: "https://www.szmc.net/szmc_en/",
      note: "Use for metro route and service information.",
    },
  ],
};

function createDefaultCityGuideContent(slug: string): CityGuideContent | undefined {
  const city = getCityBySlug(slug);

  if (!city) {
    return undefined;
  }

  return {
    whyVisit: [
      `${city.cityName} is a strong first-trip stop for travelers interested in ${city.bestFor.slice(0, 3).join(", ").toLowerCase()}.`,
      `The city works best when you keep the first day practical: payment check, Chinese hotel address, one easy meal, and one simple neighborhood plan.`,
      `It pairs well with nearby high-speed rail routes when you confirm the exact station names and leave transfer buffer.`,
    ],
    bestAreasToStay: city.whereToStay,
    topAttractionsDetailed: city.topAttractions.slice(0, 5).map((name) => ({
      name,
      recommendedTime: "1.5-3 hours",
      description:
        "Keep this stop flexible around weather, ticket rules, crowds, and your hotel location.",
    })),
    localFoodsDetailed: city.localFoods.slice(0, 5).map((food) => ({
      name: food,
      chineseName: "",
      description:
        "Save the Chinese name or a menu screenshot before ordering if translation or dietary needs matter.",
    })),
    arrivalTips: [
      "Save your hotel Chinese name, full Chinese address, phone number, and nearest metro station before leaving the airport or railway station.",
      "Check your payment app, mobile data, and translation app before your first taxi, metro ride, or restaurant meal.",
      "If you arrive after a long flight or train ride, choose one nearby dinner and one easy walk instead of crossing the city immediately.",
      ...city.transportTips.slice(0, 2),
    ],
    bookInAdvance: [
      "Popular attractions, museums, or timed-entry tickets during weekends, holidays, and school breaks.",
      "High-speed train tickets if this city is part of a multi-city route.",
      "Hotels in practical districts near metro lines or railway stations during peak travel periods.",
      "Special restaurants, transfers, or day trips if your schedule is short.",
    ],
    faq: [
      {
        question: `Is ${city.cityName} good for a first China trip?`,
        answer: `${city.cityName} can work well for first-time visitors if it matches your interests and you prepare payment, mobile data, Chinese addresses, and station names before arrival.`,
      },
      {
        question: `How many days should I spend in ${city.cityName}?`,
        answer: `${city.recommendedDays} is a realistic first-visit range. Add more time if you want day trips, slower food plans, or buffer for jet lag and weather.`,
      },
      {
        question: `Where should I stay in ${city.cityName}?`,
        answer: `Choose a hotel near a useful metro line, central food area, or the railway station you actually need. Good first choices include ${city.whereToStay.slice(0, 2).join(" and ")}.`,
      },
      {
        question: `What should I save in Chinese before visiting ${city.cityName}?`,
        answer:
          "Save your hotel address, main attractions, railway station, airport or arrival point, and one backup restaurant area in Chinese so taxi drivers, hotel staff, and map apps can help faster.",
      },
    ],
    relatedGuideSlugs: [
      "how-to-pay-in-china-as-a-foreigner",
      "best-apps-for-traveling-in-china",
      "how-to-book-high-speed-trains-in-china",
    ],
    officialSourceLinks: cityOfficialResources[slug] || [
      {
        label: "China Railway 12306",
        href: "https://www.12306.cn/en/",
        note: "Use for current railway schedules and ticket information.",
      },
    ],
  };
}
