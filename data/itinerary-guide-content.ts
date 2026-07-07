import type { ChineseAddress } from "@/data/cities";
import type { FAQ } from "@/data/faqs";

export type ItineraryGuideContent = {
  routeSummary: string[];
  bestForDetails: string[];
  bookingReminders: string[];
  chineseAddresses: ChineseAddress[];
  skipIfTired: string[];
  dailyAdjustments?: Record<
    number,
    {
      ifTired: string;
      rainyDayBackup: string;
    }
  >;
  faq: FAQ[];
  relatedProductIds: string[];
};

export const itineraryGuideContent: Record<string, ItineraryGuideContent> = {
  "3-days-in-shanghai": {
    routeSummary: [
      "This route is designed as a polished first China landing itinerary: one skyline evening, one old city and food day, one neighborhood culture day, and one flexible modern Shanghai or water-town option.",
      "It keeps hotel changes at zero, uses the metro for predictable travel, and leaves enough open space for mobile payment setup, jet lag, and weather.",
      "The plan works best when you stay near People's Square, Jing'an, Xujiahui, or the Former French Concession, where food, metro lines, and taxi pickups are easier than in a remote hotel zone.",
    ],
    bestForDetails: [
      "First-time China visitors arriving through Shanghai.",
      "Couples, solo travelers, and families who want strong city highlights without a packed schedule.",
      "Travelers who care about payment setup, easy transit, food, and a smooth first impression.",
      "Anyone who wants a route that can absorb a delayed flight, rainy skyline day, or slow first morning without collapsing.",
    ],
    bookingReminders: [
      "Reserve any museum that requires timed entry before your museum day, especially on weekends, holidays, and school vacation periods.",
      "Book a skyline restaurant, rooftop, or river cruise only after checking the weather forecast; haze or heavy rain can make paid views feel disappointing.",
      "If adding Zhujiajiao, decide whether you want a low-cost metro route or a faster private transfer before the day starts. The transfer choice changes the whole pace.",
      "Keep your departure station clear: Hongqiao Railway Station, Shanghai Railway Station, Shanghai South Railway Station, Hongqiao Airport, and Pudong Airport are very different transfers.",
      "If you want a famous xiaolongbao or local restaurant, check whether you need to queue, reserve, or avoid the peak lunch window.",
    ],
    chineseAddresses: [
      {
        label: "The Bund",
        english: "Zhongshan East 1st Road, Huangpu District, Shanghai",
        chinese: "上海市黄浦区中山东一路 外滩",
      },
      {
        label: "Yu Garden",
        english: "279 Yuyuan Old Street, Huangpu District, Shanghai",
        chinese: "上海市黄浦区豫园老街279号 豫园",
      },
      {
        label: "Shanghai Hongqiao Railway Station",
        english: "1500 Shengui Road, Minhang District, Shanghai",
        chinese: "上海市闵行区申贵路1500号 上海虹桥站",
      },
      {
        label: "Shanghai Pudong International Airport",
        english: "Pudong New Area, Shanghai",
        chinese: "上海市浦东新区 上海浦东国际机场",
      },
      {
        label: "People's Square",
        english: "People's Square, Huangpu District, Shanghai",
        chinese: "上海市黄浦区 人民广场",
      },
    ],
    skipIfTired: [
      "Skip a paid observation deck if you already enjoyed The Bund on a clear evening.",
      "Skip Zhujiajiao if rain, heat, or jet lag makes a half-day transfer feel like work.",
      "Skip a second shopping street and spend more time in one walkable neighborhood.",
      "Skip the river cruise if you have already walked both The Bund and a Pudong viewpoint; the skyline can start to feel repetitive.",
      "Skip a museum slot if your first full day is sunny and save indoor time for bad weather.",
    ],
    dailyAdjustments: {
      1: {
        ifTired:
          "Skip Nanjing Road and go straight from hotel rest to The Bund around sunset.",
        rainyDayBackup:
          "Use Shanghai Museum or a mall-connected dinner near People's Square, then check the skyline only if the rain clears.",
      },
      2: {
        ifTired:
          "Keep the museum and one Former French Concession walk, then skip extra boutiques or nightlife.",
        rainyDayBackup:
          "Move the neighborhood walk into a cafe, bookstore, or mall cluster around Jing'an and save leafy streets for day 3.",
      },
      3: {
        ifTired:
          "Skip Zhujiajiao and stay inside central Shanghai for Xintiandi, West Bund, or one relaxed shopping area.",
        rainyDayBackup:
          "Choose a museum, art district, or Pudong mall instead of the water town, then finish with dinner near the hotel.",
      },
    },
    faq: [
      {
        question: "Is 3 days enough for Shanghai?",
        answer:
          "Yes for a first visit. Three days covers the skyline, old city, food, and one deeper neighborhood or museum day. Add a fourth day for a water town or slower shopping.",
      },
      {
        question: "Should I stay near The Bund?",
        answer:
          "The Bund is beautiful but not always the most practical base. People's Square, Jing'an, and the Former French Concession are often easier for meals and metro access.",
      },
      {
        question: "Can I do Suzhou or Hangzhou during this 3-day route?",
        answer:
          "You can, but it turns the trip into a tighter schedule. For a first Shanghai stay, keep Suzhou or Hangzhou for a 4th or 5th day if possible.",
      },
      {
        question: "Which airport is easier for this route?",
        answer:
          "Hongqiao is closer to many central and rail connections, while Pudong handles more international flights. Choose the flight that works best, then plan the transfer around luggage and arrival time.",
      },
      {
        question: "Do I need cash for this Shanghai itinerary?",
        answer:
          "Set up mobile payment first, but carry a small RMB backup for arrival day, taxi issues, or card verification problems. Shanghai is payment-app friendly, but backups reduce stress.",
      },
    ],
    relatedProductIds: ["shanghai-3-day-travel-kit", "china-payment-apps-setup-guide"],
  },
  "240-hour-visa-free-china-itinerary": {
    routeSummary: [
      "This route is built around Shanghai plus nearby high-speed rail cities that are commonly paired with a visa-free transit stay. It is practical, low-friction, and easy to adjust if eligibility rules or arrival times change.",
      "The plan intentionally includes buffer time because transit immigration rules, onward ticket checks, and airport transfers can take longer than a normal domestic arrival.",
    ],
    bestForDetails: [
      "Eligible travelers using Shanghai as a transit entry point.",
      "Visitors who want China highlights without applying for a standard tourist visa.",
      "Travelers who prefer cities connected by short high-speed rail rides rather than long domestic flights.",
    ],
    bookingReminders: [
      "Verify current visa-free transit rules with official sources before booking.",
      "Carry printed or offline proof of onward travel to a third country or region.",
      "Book hotels that can register foreign passport holders.",
      "Keep the route inside the allowed travel area for your entry port and policy category.",
    ],
    chineseAddresses: [
      {
        label: "Shanghai Pudong International Airport",
        english: "Pudong New Area, Shanghai",
        chinese: "上海市浦东新区 上海浦东国际机场",
      },
      {
        label: "Hangzhou East Railway Station",
        english: "1 Tiancheng Road, Shangcheng District, Hangzhou, Zhejiang",
        chinese: "浙江省杭州市上城区天城路1号 杭州东站",
      },
      {
        label: "Suzhou Railway Station",
        english: "27 Suzhan Road, Gusu District, Suzhou, Jiangsu",
        chinese: "江苏省苏州市姑苏区苏站路27号 苏州站",
      },
    ],
    skipIfTired: [
      "Skip the water town buffer day and stay in central Shanghai if weather or travel paperwork has been stressful.",
      "Skip overnighting in Suzhou if you want fewer hotel changes.",
      "Skip a paid skyline attraction if visibility is poor.",
    ],
    faq: [
      {
        question: "Is this itinerary immigration advice?",
        answer:
          "No. It is travel planning inspiration. Visa-free transit eligibility depends on nationality, port, onward destination, route, and current policy. Confirm official requirements before booking.",
      },
      {
        question: "Do I need an onward ticket?",
        answer:
          "Visa-free transit policies typically require proof of onward travel to a third country or region. Carry offline and printed copies in case airport staff ask for them.",
      },
      {
        question: "Can I leave Shanghai during a visa-free transit stay?",
        answer:
          "It depends on the current permitted travel area for your entry port and policy. Do not assume all China cities are allowed under transit entry.",
      },
    ],
    relatedProductIds: ["10-day-classic-china-itinerary", "china-payment-apps-setup-guide"],
  },
};

export function getItineraryGuideContent(slug: string): ItineraryGuideContent | undefined {
  return itineraryGuideContent[slug];
}
