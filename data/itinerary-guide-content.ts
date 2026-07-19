import type { ChineseAddress } from "@/data/cities";
import type { FAQ, LinkItem } from "@/data/faqs";

export type ItineraryGuideContent = {
  routeSummary: string[];
  bestForDetails: string[];
  notBestFor: string[];
  commonMistakes?: string[];
  importantNotice?: string;
  officialSourceLinks?: LinkItem[];
  lastVerified?: string;
  lastUpdated?: string;
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
    lastUpdated: "2026-07-08",
    officialSourceLinks: [
      {
        label: "Shanghai municipal information",
        href: "https://english.shanghai.gov.cn/",
        note: "Use for current city service and visitor information.",
      },
      {
        label: "Shanghai Metro",
        href: "https://service.shmetro.com/en/",
        note: "Use for current metro network and service information.",
      },
    ],
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
    notBestFor: [
      "Travelers who want to cover Beijing, Xi'an, or another distant city in the same three days.",
      "Visitors who dislike big-city energy and prefer nature-heavy travel.",
      "Travelers who want every meal and attraction pre-booked with no flexible time.",
    ],
    commonMistakes: [
      "Treating the first arrival day like a full sightseeing day before payment, data, and hotel check-in are working.",
      "Paying for multiple skyline views instead of choosing one clear-weather Bund or Pudong moment.",
      "Adding Suzhou, Hangzhou, and a water town into the same three-day Shanghai stay.",
      "Booking a remote hotel to save money and then losing the savings on taxis and longer transfers.",
      "Forgetting to confirm whether departure uses Hongqiao Railway Station, Shanghai Railway Station, Pudong Airport, or Hongqiao Airport.",
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
  "4-days-in-beijing": {
    routeSummary: [
      "This route gives Beijing one extra day compared with a compressed 3-day plan, which makes a first visit feel much more realistic.",
      "It separates the Forbidden City and Great Wall into different days, keeps the first arrival day lighter, and leaves one flexible day for the Summer Palace, hutongs, museums, or weather recovery.",
      "The best base is usually Dongcheng, Wangfujing, Qianmen, or Sanlitun depending on whether you prefer historic access, metro convenience, or more evening dining choices.",
    ],
    bestForDetails: [
      "First-time visitors who want Beijing's major landmarks without turning every day into a race.",
      "Travelers who care about Great Wall logistics, attraction reservations, and passport checks.",
      "Families, couples, and solo travelers who want one flexible day for jet lag, weather, or a missed booking.",
    ],
    notBestFor: [
      "Travelers who only want modern nightlife and shopping.",
      "Visitors who dislike long walks, security checks, and large historic sites.",
      "Anyone trying to combine Beijing, Xi'an, and Shanghai inside the same four days.",
    ],
    bookingReminders: [
      "Book Forbidden City access in advance when possible and carry the same passport used for reservation.",
      "Choose your Great Wall section and transfer style before the trip; Mutianyu is easier for most first-time visitors.",
      "Confirm whether museums or major sights require timed reservations during your travel dates.",
      "Save hotel and attraction addresses in Chinese because taxi and ride-hailing pickup points can be confusing near major sights.",
      "Avoid scheduling a high-speed train or flight immediately after a far northwest attraction such as the Summer Palace.",
    ],
    chineseAddresses: [
      {
        label: "Forbidden City",
        english: "4 Jingshan Front Street, Dongcheng District, Beijing",
        chinese: "北京市东城区景山前街4号 故宫博物院",
      },
      {
        label: "Temple of Heaven",
        english: "1 Tiantan East Road, Dongcheng District, Beijing",
        chinese: "北京市东城区天坛东路1号 天坛公园",
      },
      {
        label: "Mutianyu Great Wall",
        english: "Mutianyu Village, Huairou District, Beijing",
        chinese: "北京市怀柔区慕田峪村 慕田峪长城",
      },
      {
        label: "Summer Palace",
        english: "19 Xinjiangongmen Road, Haidian District, Beijing",
        chinese: "北京市海淀区新建宫门路19号 颐和园",
      },
      {
        label: "Beijing South Railway Station",
        english: "12 Yongwai Avenue, Fengtai District, Beijing",
        chinese: "北京市丰台区永外大街12号 北京南站",
      },
    ],
    skipIfTired: [
      "Skip an evening shopping street after the Forbidden City; the palace and Jingshan already make a full day.",
      "Skip the Summer Palace if your Great Wall day was physically demanding and choose hutongs or a museum instead.",
      "Skip a second museum if reservations, security lines, or weather make the day feel heavy.",
      "Skip long cross-city dinners and eat near your hotel after the Great Wall.",
    ],
    faq: [
      {
        question: "Is 4 days enough for Beijing?",
        answer:
          "Yes. Four days is a strong first Beijing plan because it covers the Forbidden City, Great Wall, Temple of Heaven, and one flexible day without forcing every major sight into a compressed schedule.",
      },
      {
        question: "Which Great Wall section is best for a first visit?",
        answer:
          "Mutianyu is usually the easiest first choice because transfers and facilities are more straightforward. Jinshanling can be more scenic for travelers who want a longer hike.",
      },
      {
        question: "Do I need my passport every day in Beijing?",
        answer:
          "Carry it for major attractions, train travel, hotel check-in, and any reservation tied to identity. At minimum, keep a secure copy and know which days require the original.",
      },
      {
        question: "Where should I stay for this Beijing route?",
        answer:
          "Dongcheng, Wangfujing, Qianmen, and Sanlitun are practical for different travel styles. Avoid saving money with a remote hotel unless you are comfortable spending more time in taxis.",
      },
    ],
    relatedProductIds: ["10-day-classic-china-itinerary", "china-payment-apps-setup-guide"],
  },
  "240-hour-visa-free-china-itinerary": {
    importantNotice:
      "This is a planning guide, not immigration advice. 240-hour visa-free transit eligibility can depend on nationality, entry and exit ports, confirmed onward ticket, third country or region routing, and the permitted stay area for the port you use. Rules can change. Confirm your eligibility and entry port with China’s National Immigration Administration or your airline before travel.",
    lastVerified: "2026-07-19",
    officialSourceLinks: [
      {
        label: "National Immigration Administration: 10 new opening measures",
        href: "https://www.nia.gov.cn/n897453/c1751080/content.html",
        note: "Official Chinese announcement published November 3, 2025; it records 65 eligible ports across 24 provincial-level regions under the 240-hour policy.",
      },
      {
        label: "National Immigration Administration: 240-hour transit notice (English)",
        href: "https://en.nia.gov.cn/n147413/c187308/content.html",
        note: "Official English notice published November 3, 2025 for the latest port expansion.",
      },
      {
        label: "National Immigration Administration: visa-free transit policy",
        href: "https://www.nia.gov.cn/n741440/n741577/c1731205/content.html",
        note: "Official Chinese policy reference covering eligible nationalities, ports, permitted areas, and transit conditions.",
      },
    ],
    routeSummary: [
      "As last verified on July 19, 2026, the National Immigration Administration lists 55 eligible nationalities, 65 entry ports, and permitted travel areas across 24 provincial-level regions. Those totals can change, so use the linked NIA pages for your final check.",
      "This route is built around Shanghai plus nearby high-speed rail cities that are commonly paired with a visa-free transit stay. It is practical, low-friction, and easy to adjust if eligibility rules or arrival times change.",
      "The plan intentionally includes buffer time because transit immigration rules, onward ticket checks, and airport transfers can take longer than a normal domestic arrival.",
      "Use it as a route framework only after confirming your nationality, port, onward ticket to a third country or region, and allowed travel area. NIA guidance generally calculates the 240-hour period from 00:00 on the day after entry; confirm the exact departure deadline at your entry port.",
    ],
    bestForDetails: [
      "Eligible travelers using Shanghai as a transit entry point.",
      "Visitors who want China highlights without applying for a standard tourist visa.",
      "Travelers who prefer cities connected by short high-speed rail rides rather than long domestic flights.",
    ],
    notBestFor: [
      "Travelers without a confirmed onward ticket to a third country or region.",
      "Visitors whose nationality, port, routing, or stay area is not covered by current official rules.",
      "Anyone who wants to visit cities outside the permitted administrative travel area for their entry port.",
      "Travelers who need legal certainty and should apply for a standard visa instead of relying on transit rules.",
    ],
    bookingReminders: [
      "Verify current visa-free transit rules with official sources before booking flights, hotels, or non-refundable trains.",
      "Confirm your nationality is eligible for the policy that applies to your entry port.",
      "Carry printed and offline proof of onward travel to a third country or region.",
      "Check that your arrival port, departure port, and route match the permitted policy conditions.",
      "Book hotels that can register foreign passport holders.",
      "Keep every stop within the published permitted parts of the 24 regions and the area authorized on your temporary entry permit.",
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
        question: "When does the 240-hour period start?",
        answer:
          "NIA guidance generally calculates the 240-hour period from 00:00 on the day after entry. Confirm the exact permitted departure deadline with immigration at your entry port because your route and port still need to qualify.",
      },
      {
        question: "Can I leave Shanghai during a visa-free transit stay?",
        answer:
          "It depends on the current published permitted areas and the route authorized on your temporary entry permit. Do not assume all China cities are allowed under transit entry.",
      },
    ],
    relatedProductIds: ["10-day-classic-china-itinerary", "china-payment-apps-setup-guide"],
  },
};

export function getItineraryGuideContent(slug: string): ItineraryGuideContent | undefined {
  return itineraryGuideContent[slug];
}
