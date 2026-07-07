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
};

export const guides: Guide[] = [
  {
    id: "guide-pay-in-china-foreigner",
    slug: "how-to-pay-in-china-as-a-foreigner",
    title: "How to Pay in China as a Foreigner",
    category: "Payment",
    summary:
      "A practical introduction to mobile payments, cash, cards, and what to set up before your first meal in China.",
    updatedAt: "2026-07-07",
    seoTitle: "How to Pay in China as a Foreigner | First China Trip Kit",
    seoDescription:
      "Learn how foreign visitors can pay in China using Alipay, WeChat Pay, cash, bank cards, and backup payment strategies.",
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
    updatedAt: "2026-07-07",
    seoTitle: "Best Apps for Traveling in China | First China Trip Kit",
    seoDescription:
      "A first-time visitor's app checklist for China, including maps, payment, translation, trains, ride-hailing, and food discovery.",
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
    slug: "how-to-take-high-speed-trains-in-china",
    title: "How to Take High-Speed Trains in China",
    category: "Transportation",
    summary:
      "A practical foreign visitor's guide to booking Chinese high-speed trains, choosing the right station, using your passport, boarding, luggage, seat classes, and missed-train backups.",
    updatedAt: "2026-07-07",
    seoTitle: "How to Take High-Speed Trains in China",
    seoDescription:
      "Learn how foreign visitors can book and ride China's high-speed trains, including 12306, passports, station names, boarding gates, luggage, seat classes, and transfer timing.",
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
];

export function getGuideBySlug(slug: string) {
  return guides.find((guide) => guide.slug === slug);
}
