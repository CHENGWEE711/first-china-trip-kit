export type GuideSection = {
  heading: string;
  body: string;
  bullets?: string[];
};

export type Guide = {
  id: string;
  slug: string;
  title: string;
  category: string;
  summary: string;
  content: GuideSection[];
  seoTitle: string;
  seoDescription: string;
  updatedAt: string;
  featuredImage: ContentImage;
  heroImage: ContentImage;
  inlineImages: ContentImage[];
};

type GuideWithoutVisuals = Omit<Guide, "featuredImage" | "heroImage" | "inlineImages">;

const guideEntries: GuideWithoutVisuals[] = [
  {
    id: "guide-pay-in-china-foreigner",
    slug: "how-to-pay-in-china-as-a-foreigner",
    title: "How to Pay in China as a Foreigner",
    category: "Payment",
    summary:
      "A practical introduction to mobile payments, cash, cards, and what to set up before your first meal in China.",
    updatedAt: "2026-07-08",
    seoTitle: "How to Pay in China as a Foreigner: Alipay, WeChat Pay, Cards and Cash",
    seoDescription:
      "A practical China payment guide for foreign visitors: how to use Alipay, WeChat Pay, international cards, cash backup, and what to test before your first day in China.",
    content: [
      {
        heading: "Alipay as your main travel wallet",
        body:
          "Alipay is usually the easiest first wallet for foreign visitors because it is widely used for shops, restaurants, taxis, ride-hailing, metro tools, and useful mini programs. Install it before departure, add at least one international card, and test the app with a small purchase before depending on it for a full day out.",
        bullets: [
          "Use the same passport name format wherever the app asks for identity details.",
          "Add a backup card from a different bank if possible.",
          "Keep mobile data active because payment, maps, and translation all depend on your phone.",
        ],
      },
      {
        heading: "WeChat Pay as a backup",
        body:
          "WeChat Pay is worth preparing if your account and card setup allow it. It is useful for mini programs, local contacts, some restaurants, and situations where a merchant's QR flow behaves better in WeChat than in Alipay.",
        bullets: [
          "Do not make WeChat Pay your only payment plan on a first trip.",
          "Test it before using it for a taxi or restaurant bill.",
          "Keep Alipay, cash, and a physical card available as backups.",
        ],
      },
      {
        heading: "Cash backup",
        body:
          "China is very mobile-payment friendly, but a small cash backup is still sensible. Cash helps on arrival day, during card verification problems, if your phone battery is low, or if a small merchant cannot process a foreign-linked wallet smoothly.",
      },
      {
        heading: "Hotel card usage",
        body:
          "International hotels may still use physical cards for deposits, pre-authorization, or incidentals. Keep the physical card linked to your booking and passport accessible at check-in, even if you plan to use Alipay for everyday spending.",
      },
      {
        heading: "Taxi payment",
        body:
          "Ride-hailing inside Alipay or WeChat is usually easier than explaining a destination to a street taxi. If you do take a taxi, save your destination in Chinese and keep cash in case the QR payment flow fails.",
      },
      {
        heading: "Restaurant payment",
        body:
          "Restaurants may ask you to scan a table QR code, scan a cashier QR code, or show your payment code for the cashier to scan. If one method fails, ask whether they can scan your code instead of making you scan theirs.",
      },
      {
        heading: "Payment failure troubleshooting",
        body:
          "Most failures are caused by card issuer security, weak mobile data, app verification, or a merchant QR setup that does not like foreign-linked cards. Step aside, try another card or wallet, use cash if the purchase is urgent, and solve account issues later on stable Wi-Fi.",
      },
    ],
  },
  {
    id: "guide-best-apps",
    slug: "best-apps-for-traveling-in-china",
    title: "Best Apps for Traveling in China",
    category: "Apps",
    summary:
      "The essential apps for maps, translation, mobile payment, ride-hailing, trains, restaurants, and staying connected.",
    updatedAt: "2026-07-08",
    seoTitle: "Best Apps for Traveling in China: Payment, Maps, Translation, Trains and Taxis",
    seoDescription:
      "A practical app checklist for first-time visitors to China, including payment apps, maps, translation, ride-hailing, train booking, eSIM, food, and offline backups.",
    content: [
      {
        heading: "Payment",
        body:
          "Install Alipay first and WeChat as a backup. These apps are not only wallets; they also open useful travel services such as ride-hailing, restaurant ordering, attraction mini programs, and local transport tools.",
        bullets: [
          "Add cards before departure.",
          "Test a small purchase on day one.",
          "Keep screenshots of payment setup and backup notes.",
        ],
      },
      {
        heading: "Maps",
        body:
          "Apple Maps can be approachable for many visitors, while Amap and Baidu Maps usually have stronger local detail but more Chinese-language friction. Always save Chinese place names so you can search across apps or show hotel staff.",
      },
      {
        heading: "Translation",
        body:
          "Use a translation app with offline Chinese and camera translation. For restaurants and taxis, short written Chinese on your screen often works better than long spoken audio in a noisy place.",
      },
      {
        heading: "Ride-hailing",
        body:
          "DiDi or the DiDi mini program is helpful for late arrivals, hotels away from metro lines, and rainy days. Choose clear pickup points such as hotel entrances, mall gates, and station exits.",
      },
      {
        heading: "Train",
        body:
          "For high-speed rail, keep your passport-linked ticket details and booking confirmations as screenshots. Station names matter: Shanghai Hongqiao, Shanghai Railway Station, and Shanghai South are not interchangeable.",
      },
      {
        heading: "Hotel",
        body:
          "Keep the hotel name, Chinese address, phone number, and nearest landmark in one offline note. This helps with taxis, ride-hailing pickup points, food delivery-style entrances, and late check-in.",
      },
      {
        heading: "Food",
        body:
          "You do not need a restaurant app for every meal. Start with translation, payment, and saved food phrases. Add review or ordering apps only when a specific restaurant or queue system requires it.",
      },
      {
        heading: "Offline backups",
        body:
          "Create a phone album or folder with passport copy, hotel address, train tickets, flight details, attraction reservations, insurance, and emergency contacts. Screenshots load faster than apps when data is weak.",
      },
    ],
  },
  {
    id: "guide-high-speed-trains",
    slug: "how-to-book-high-speed-trains-in-china",
    title: "How to Book High-Speed Trains in China as a Foreigner",
    category: "Transportation",
    summary:
      "A practical foreign visitor's guide to booking Chinese high-speed trains, choosing the right station, using your passport, boarding, luggage, seat classes, and missed-train backups.",
    updatedAt: "2026-07-08",
    seoTitle: "How to Book High-Speed Trains in China as a Foreigner",
    seoDescription:
      "A practical guide for foreign visitors booking China high-speed trains: 12306, passport real-name tickets, Trip.com, station arrival, boarding, seat classes, changes, refunds, and common mistakes.",
    content: [
      {
        heading: "Can foreigners buy high-speed train tickets in China?",
        body:
          "Yes. Foreign visitors can buy high-speed train tickets in China, but the ticket must be linked to the passport you will carry on travel day. The main planning habit is simple: use your passport name exactly, save the train details offline, and check the exact station before you pay.",
      },
      {
        heading: "Booking options",
        body:
          "The official 12306 system is the core railway booking platform. Some visitors book through travel platforms because the interface, support, or payment flow feels easier. Station counters can help with changes or problems, and hotel staff can be useful when you need Chinese station names confirmed before booking.",
        bullets: [
          "12306: official railway source, best for direct train information.",
          "Travel platforms: useful when you want English support or easier payment.",
          "Station counters: useful for missed trains, changes, and passport scan problems.",
          "Hotel help: useful for confirming the right Chinese station name before you book.",
        ],
      },
      {
        heading: "Passport and ticket ID",
        body:
          "Your passport is usually your ticket ID. Keep the same passport used for booking with you from station entry to boarding. If an automatic gate does not read your passport, use a staffed manual lane and show your booking confirmation.",
      },
      {
        heading: "Choose the right railway station",
        body:
          "Many Chinese cities have multiple large railway stations. Do not book only by city name. Compare the station with your hotel area, airport arrival point, and next transfer. A train leaving from the wrong station can cost more time than the train ride itself.",
      },
      {
        heading: "Shanghai example",
        body:
          "Shanghai Hongqiao is a major high-speed rail hub next to Hongqiao Airport and useful for many routes to Hangzhou, Suzhou, Beijing, and other cities. Shanghai Railway Station is more central and serves different routes. They are not interchangeable, so save the Chinese name and map pin before booking.",
      },
      {
        heading: "At the station",
        body:
          "For a large station, arrive 45-60 minutes early on your first trip. You need time for entrance checks, security screening, finding the waiting hall, watching the gate board, and walking to the platform. Boarding normally opens shortly before departure and gates close before the listed train time.",
      },
      {
        heading: "Train number, gate, carriage, and seat",
        body:
          "Use the train number as your anchor, not just the destination city. The same station may have many trains going to the same city. After the gate opens, follow the platform signs to your carriage number, then find your row and seat. Screenshots of the train number, carriage, and seat help when data is weak.",
      },
      {
        heading: "Luggage and seat classes",
        body:
          "Most travelers bring normal suitcases on high-speed trains, but heavy luggage makes station walking and boarding harder. Second class is the best value for most visitors. First class gives more space and a calmer ride. Business class is premium and comfortable, but usually only worth it if rest, work, or comfort matters more than budget.",
      },
      {
        heading: "If you miss your train",
        body:
          "Go to a ticket counter or service desk as soon as possible with your passport and booking details. Staff may be able to change you to a later train depending on ticket rules, availability, and timing. Do not wait at the gate hoping it will reopen after boarding closes.",
      },
      {
        heading: "Transfer time advice",
        body:
          "Avoid tight train connections on your first China rail day. Leave at least 60-90 minutes between major station transfers, more if you are arriving from an international flight, changing stations, carrying large luggage, or traveling during holidays.",
      },
    ],
  },
  {
    id: "guide-alipay-wechat-pay",
    slug: "how-to-use-alipay-and-wechat-pay-in-china",
    title: "How to Use Alipay and WeChat Pay in China",
    category: "Payment",
    summary:
      "How QR payments work, when to scan, when to show your code, and how to keep a backup ready.",
    updatedAt: "2026-07-07",
    seoTitle: "How to Use Alipay and WeChat Pay in China",
    seoDescription:
      "A foreign visitor's guide to using Alipay and WeChat Pay in China, including QR codes, transport, restaurants, and backups.",
    content: [
      {
        heading: "Two QR payment patterns",
        body:
          "In China, you either scan the merchant's QR code and enter the amount, or the merchant scans your payment code. Restaurants and taxis may use either pattern, so watch what local customers do or show your payment app.",
      },
      {
        heading: "Using wallets for travel",
        body:
          "Alipay and WeChat can also help with ride-hailing, metro access in some cities, mini programs, attraction tickets, and food ordering. For a first trip, focus on paying and ride-hailing before exploring every extra feature.",
      },
      {
        heading: "Backup habits",
        body:
          "Keep both apps installed if possible, carry a physical card, and keep a small amount of cash. If a payment fails, do not panic; most merchants are used to travelers needing a second attempt.",
      },
    ],
  },
  {
    id: "guide-packing-list",
    slug: "china-travel-packing-list",
    title: "China Travel Packing List",
    category: "Planning",
    summary:
      "A practical packing checklist for documents, mobile data, payment backups, train travel, weather, and daily comfort.",
    updatedAt: "2026-07-07",
    seoTitle: "China Travel Packing List for First-Time Visitors",
    seoDescription:
      "Pack confidently for China with this checklist covering passport, payment, SIM/eSIM, adapters, weather, trains, medicine, and daily essentials.",
    content: [
      {
        heading: "Documents and access",
        body:
          "Your passport is used more often than many travelers expect: hotels, trains, some attractions, and security checks may require it. Keep digital and printed backups of important bookings.",
        bullets: [
          "Passport and visa or entry eligibility documents.",
          "Hotel confirmations with Chinese addresses.",
          "Onward flight or train confirmations.",
          "Travel insurance details.",
        ],
      },
      {
        heading: "Tech and payment",
        body:
          "Bring a power bank, universal adapter, backup card, and a phone setup that supports mobile data. Most travel friction in China becomes easier when your phone battery and data connection are reliable.",
      },
      {
        heading: "Comfort items",
        body:
          "Pack comfortable walking shoes, weather layers, basic medicine, tissues, hand sanitizer, and a compact umbrella. Many China itineraries involve long station walks and large sightseeing areas.",
      },
    ],
  },
  {
    id: "guide-basic-chinese-phrases",
    slug: "basic-chinese-phrases-for-travelers",
    title: "Basic Chinese Phrases for Travelers",
    category: "Basic Chinese",
    summary:
      "Simple Mandarin phrases for taxis, restaurants, hotels, train stations, payment problems, and polite daily interactions.",
    updatedAt: "2026-07-07",
    seoTitle: "Basic Chinese Phrases for Travelers",
    seoDescription:
      "Learn useful Mandarin phrases for travel in China, including greetings, taxis, restaurants, hotels, payment, and emergencies.",
    content: [
      {
        heading: "Most useful phrases",
        body:
          "You can travel in major Chinese cities with translation apps, but a few phrases make daily interactions warmer and smoother.",
        bullets: [
          "Hello: Ni hao",
          "Thank you: Xie xie",
          "Excuse me: Bu hao yi si",
          "I do not understand: Wo ting bu dong",
          "Can I pay by Alipay?: Ke yi yong Zhi Fu Bao ma?",
          "Please take me to this address: Qing dai wo qu zhe ge di zhi",
        ],
      },
      {
        heading: "Restaurant phrases",
        body:
          "For restaurants, learn how to say less spicy, no meat, bottled water, and the bill. Showing the phrase in Chinese characters from your phone is often more effective than pronunciation alone.",
      },
      {
        heading: "Taxi and hotel phrases",
        body:
          "Save your hotel name and address in Chinese. If a driver or staff member seems confused, show the Chinese address, nearby landmark, and phone number together.",
      },
    ],
  },
  {
    id: "guide-internet-esim",
    slug: "china-esim-guide-for-tourists",
    title: "China eSIM Guide for Tourists",
    category: "Internet & eSIM",
    summary:
      "How to prepare mobile data, eSIM, roaming, Wi-Fi, offline screenshots, and app access before your first arrival day in China.",
    updatedAt: "2026-07-08",
    seoTitle: "China eSIM Guide for Tourists",
    seoDescription:
      "Prepare internet access for China with this first-time visitor guide to eSIMs, roaming, SIM cards, Wi-Fi, app access, offline backups, and arrival-day setup.",
    content: [
      {
        heading: "Choose your data plan before landing",
        body:
          "Your phone will carry payment, maps, translation, hotel addresses, train details, and ride-hailing. Decide before departure whether you will use roaming, a travel eSIM, a local SIM, or pocket Wi-Fi so you are not solving connectivity while tired in the arrival hall.",
        bullets: [
          "Roaming is simple if your home plan is affordable and reliable.",
          "An eSIM can be convenient if your phone supports it and the plan works in mainland China.",
          "A local SIM can be useful for longer stays but may require passport registration and setup time.",
        ],
      },
      {
        heading: "Prepare offline backups",
        body:
          "Even with a good data plan, stations, basements, hotels, and busy pickup zones can have weak signal. Save your hotel address in Chinese, passport copy, flight details, train confirmations, attraction reservations, and payment backup notes as screenshots.",
      },
      {
        heading: "Arrival-day setup",
        body:
          "Before leaving the airport or station, check that maps load, translation works, payment apps open, and ride-hailing can find your hotel. If anything fails, use airport Wi-Fi, hotel staff, or your screenshot folder instead of improvising during a taxi pickup.",
      },
    ],
  },
  {
    id: "guide-food-ordering",
    slug: "china-food-ordering-guide",
    title: "How to Order Food in China as a First-Time Visitor",
    category: "Food",
    summary:
      "A practical guide to menus, QR ordering, spice levels, dietary phrases, payment, street food, and easy first meals in China.",
    updatedAt: "2026-07-08",
    seoTitle: "How to Order Food in China as a First-Time Visitor",
    seoDescription:
      "Learn how to order food in China with QR menus, translation apps, useful Chinese phrases, spice levels, payment tips, and first-day meal ideas.",
    content: [
      {
        heading: "Expect QR menus and phone-first ordering",
        body:
          "Many restaurants use table QR codes, picture menus, or cashier ordering. If a QR menu is difficult, show staff a translated sentence asking for help or choose a restaurant with pictures, counter ordering, or a mall location for your first meal.",
        bullets: [
          "Keep camera translation ready for printed and digital menus.",
          "Use short phrases for spice level, allergies, and no meat requests.",
          "Confirm payment before ordering if your wallet setup is still new.",
        ],
      },
      {
        heading: "Start with easy first meals",
        body:
          "Noodle shops, dumpling restaurants, mall food courts, hot pot chains, and hotel-area cafes are good first meals because ordering is more predictable. Save street food adventures for when payment, translation, and your stomach have adjusted.",
      },
      {
        heading: "Useful food phrases",
        body:
          "Prepare a few phrases in Chinese characters, not only pinyin: less spicy, not spicy, no peanuts, no meat, bottled water, and the bill. Showing clear Chinese text is often faster than speaking in a noisy restaurant.",
      },
    ],
  },
  {
    id: "guide-americans-travel-china-2026",
    slug: "can-americans-travel-to-china-in-2026",
    title: "Can Americans Travel to China in 2026?",
    category: "Visa & Entry",
    summary:
      "A practical planning guide for U.S. passport holders considering China travel in 2026, including visa planning, passport checks, flights, hotels, and official verification.",
    updatedAt: "2026-07-08",
    seoTitle: "Can Americans Travel to China in 2026? | First China Trip Kit",
    seoDescription:
      "Can Americans travel to China in 2026? Learn the practical steps U.S. travelers should verify before booking, including visa requirements, passport validity, flights, hotels, and official sources.",
    content: [
      {
        heading: "Short answer",
        body:
          "Americans can plan travel to China in 2026, but most U.S. tourists should expect to verify visa requirements before booking. Entry rules, document requirements, and travel advisories can change, so treat this page as a planning checklist and confirm official requirements for your exact passport, purpose, and route.",
      },
      {
        heading: "What to verify first",
        body:
          "Before paying for flights, check your passport validity, visa category, onward plans, hotel registration, and any current government notices. If your route involves visa-free transit, confirm that your nationality, ports, onward ticket, and permitted stay area match the current policy.",
        bullets: [
          "Use official consular or government sources for visa decisions.",
          "Keep hotel names and Chinese addresses ready for arrival forms and taxis.",
          "Avoid non-refundable bookings until your entry path is clear.",
        ],
      },
      {
        heading: "First-trip planning order",
        body:
          "Start with entry documents, then choose an arrival city, then build payment and app setup. For many U.S. travelers, Shanghai or Beijing is the easiest first landing city because international flights, hotels, metro systems, and visitor services are more familiar.",
      },
    ],
  },
  {
    id: "guide-240-hour-visa-free-transit",
    slug: "china-240-hour-visa-free-transit-guide",
    title: "China 240-Hour Visa-Free Transit Guide",
    category: "Visa & Entry",
    summary:
      "A cautious planning guide to China's 240-hour visa-free transit policy, including eligibility checks, onward tickets, permitted areas, ports, and common mistakes.",
    updatedAt: "2026-07-08",
    seoTitle: "China 240-Hour Visa-Free Transit Guide for First-Time Visitors",
    seoDescription:
      "A practical guide to China's 240-hour visa-free transit policy: who may be eligible, documents to prepare, third-country rule, ports, permitted areas, route examples, and official verification checklist.",
    content: [
      {
        heading: "Use this as a planning guide",
        body:
          "China's 240-hour visa-free transit can be useful for eligible travelers, but it is not a universal visa waiver. Eligibility can depend on nationality, entry and exit ports, confirmed onward ticket, third country or region routing, and the allowed stay area for the port you use.",
      },
      {
        heading: "Core checks before booking",
        body:
          "Confirm your passport nationality, port, onward ticket, arrival and departure cities, and hotel locations against current official rules. Keep printed and offline proof of onward travel because airline and immigration staff may ask before boarding or entry.",
        bullets: [
          "Check that your route is transit to a third country or region.",
          "Check that every city in your plan is inside the permitted stay area.",
          "Check official sources again before booking non-refundable hotels or trains.",
        ],
      },
      {
        heading: "Best use case",
        body:
          "For a first China trip, a Shanghai-based route with nearby Hangzhou and Suzhou is often easier than a long domestic loop because the rail distances are short and the city choices are practical for a limited transit stay.",
      },
    ],
  },
  {
    id: "guide-alipay-tourist",
    slug: "how-to-use-alipay-in-china-as-a-tourist",
    title: "How to Use Alipay in China as a Tourist",
    category: "Payment",
    summary:
      "A tourist-focused Alipay setup guide covering cards, QR codes, ride-hailing, restaurants, small purchases, limits, and backup payment habits.",
    updatedAt: "2026-07-08",
    seoTitle: "How to Use Alipay in China as a Tourist | First China Trip Kit",
    seoDescription:
      "Learn how tourists can use Alipay in China for QR payments, taxis, restaurants, metro tools, card setup, small test purchases, and payment troubleshooting.",
    content: [
      {
        heading: "Why Alipay should be your first setup",
        body:
          "Alipay is often the easiest travel-first wallet for foreign visitors. It can help with everyday QR payments, ride-hailing, small shops, restaurants, and some local travel services. Set it up before departure, then test a small purchase on your first day.",
      },
      {
        heading: "How QR payment works",
        body:
          "You may scan a merchant QR code and enter the amount, or show your payment code so the cashier can scan you. Learn both patterns before using Alipay for taxis, restaurants, or station food.",
        bullets: [
          "Add one main card and one backup card if possible.",
          "Keep mobile data active when paying.",
          "Carry cash for arrival-day or card issuer problems.",
        ],
      },
      {
        heading: "When Alipay fails",
        body:
          "Most problems come from card issuer security, weak data, verification prompts, or a merchant setup that does not accept foreign-linked wallets smoothly. Step aside, try a backup card or cash, and solve account issues later on stable Wi-Fi.",
      },
    ],
  },
  {
    id: "guide-wechat-pay-foreigner",
    slug: "how-to-use-wechat-pay-in-china-as-a-foreigner",
    title: "How to Use WeChat Pay in China as a Foreigner",
    category: "Payment",
    summary:
      "A practical guide to using WeChat Pay as a foreign visitor, including setup expectations, QR payments, mini programs, restaurants, taxis, and backups.",
    updatedAt: "2026-07-08",
    seoTitle: "How to Use WeChat Pay in China as a Foreigner",
    seoDescription:
      "Learn how foreign visitors can prepare WeChat Pay for China travel, including QR code payments, mini programs, taxis, restaurants, account setup, and backup options.",
    content: [
      {
        heading: "Use WeChat Pay as a strong backup",
        body:
          "WeChat Pay is useful for payments, mini programs, local contacts, and some restaurant or service flows. For many first-time visitors, Alipay is still the easier main wallet, while WeChat Pay is a valuable backup if your account and card setup work smoothly.",
      },
      {
        heading: "Where WeChat Pay helps",
        body:
          "WeChat Pay can be helpful for restaurants that use WeChat mini programs, local service QR codes, some taxis, and situations where a merchant's QR flow works better inside WeChat than inside Alipay.",
        bullets: [
          "Set it up before you need it.",
          "Test a small purchase before relying on it.",
          "Keep Alipay, a card, and cash as backups.",
        ],
      },
      {
        heading: "Common setup friction",
        body:
          "Foreign phone numbers, card verification, identity prompts, or account security checks can slow setup. Do not make WeChat Pay your only payment plan until you have tested it in China.",
      },
    ],
  },
  {
    id: "guide-3-days-shanghai-first-time",
    slug: "3-days-in-shanghai-for-first-time-visitors",
    title: "3 Days in Shanghai for First-Time Visitors",
    category: "Itinerary",
    summary:
      "A practical first-time Shanghai plan with arrival setup, The Bund, Yu Garden, French Concession, food, metro tips, rainy-day backups, and what to skip.",
    updatedAt: "2026-07-08",
    seoTitle: "3 Days in Shanghai for First-Time Visitors | First China Trip Kit",
    seoDescription:
      "Plan 3 days in Shanghai with a first-time visitor route covering The Bund, Yu Garden, French Concession, local food, transport, payment setup, and realistic pacing.",
    content: [
      {
        heading: "Best 3-day shape",
        body:
          "Use day one for arrival, payment setup, Yu Garden, and The Bund if the weather is clear. Use day two for a museum, the Former French Concession, and local food. Use day three for Pudong views, West Bund, Xintiandi, or a light water-town add-on if you have energy.",
      },
      {
        heading: "Where to stay",
        body:
          "People's Square, Jing'an, and the Former French Concession are practical first bases. They keep food, metro access, taxis, and hotel returns easier than a remote bargain hotel.",
      },
      {
        heading: "What to skip",
        body:
          "Skip extra skyline viewpoints if you already had a clear Bund evening. Skip a water town if rain, heat, jet lag, or payment setup makes the day feel heavy. Shanghai is better when you leave room to wander.",
      },
    ],
  },
  {
    id: "guide-checklist-before-you-fly",
    slug: "china-travel-checklist-before-you-fly",
    title: "China Travel Checklist Before You Fly",
    category: "Planning",
    summary:
      "A pre-flight checklist for first-time China visitors covering documents, visa checks, payment, apps, eSIM, hotel addresses, transport, food, packing, and emergency phrases.",
    updatedAt: "2026-07-08",
    seoTitle: "China Travel Checklist Before You Fly | First China Trip Kit",
    seoDescription:
      "Use this China travel checklist before you fly: documents, visa or visa-free checks, Alipay, WeChat Pay, apps, eSIM, hotel addresses, transport, packing, and emergency phrases.",
    content: [
      {
        heading: "Before you book",
        body:
          "Check your passport validity, visa or visa-free eligibility, arrival city, onward plans, and whether your hotels can register foreign guests. Do this before paying for non-refundable flights or hotels.",
      },
      {
        heading: "Before you fly",
        body:
          "Install payment apps, add cards, prepare mobile data, download offline translation, screenshot hotel addresses in Chinese, save train or flight confirmations, and pack a power bank.",
        bullets: [
          "Alipay or WeChat Pay prepared.",
          "eSIM, roaming, or SIM plan chosen.",
          "Hotel addresses saved in Chinese.",
          "Emergency phrases saved offline.",
        ],
      },
      {
        heading: "Arrival day",
        body:
          "Before leaving the airport or station, check that data, payment, maps, translation, and ride-hailing work. If something fails, use Wi-Fi or staff help before you move into a taxi pickup zone.",
      },
    ],
  },
];

export const guides: Guide[] = guideEntries.map((guide) => {
  const visuals = guideVisuals[guide.slug];
  if (!visuals) {
    throw new Error(`Missing explicit image configuration for guide: ${guide.slug}`);
  }
  return { ...guide, ...visuals };
});

export function getGuideBySlug(slug: string) {
  return guides.find((guide) => guide.slug === slug);
}
import { guideVisuals, type ContentImage } from "@/data/images";
