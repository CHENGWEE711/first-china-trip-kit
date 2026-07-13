import type { FAQ, LinkItem } from "@/data/faqs";
import type { AppRecommendationGroup } from "@/data/app-recommendations";
import { chinaTravelAppGroups } from "@/data/app-recommendations";

export type GuideDetailContent = {
  importantNotice?: string;
  lastVerified?: string;
  quickAnswer: string;
  whoThisGuideIsFor?: string[];
  featureSections?: {
    title: string;
    body?: string;
    items?: string[];
    columns?: string[];
    rows?: string[][];
  }[];
  steps: string[];
  commonMistakes: string[];
  troubleshooting: string[];
  backupPlan?: string[];
  usefulChinesePhrases?: {
    english: string;
    chinese: string;
    pinyin: string;
  }[];
  firstDayChecklist: string[];
  faq: FAQ[];
  officialSourceLinks: LinkItem[];
  ctaLinks?: LinkItem[];
  relatedGuideSlugs: string[];
  relatedProductIds: string[];
  appGroups?: AppRecommendationGroup[];
};

export const guideDetailContent: Record<string, GuideDetailContent> = {
  "how-to-pay-in-china-as-a-foreigner": {
    quickAnswer:
      "For most foreign visitors, the most reliable China payment setup is Alipay with at least one international card, WeChat Pay as a backup when available, a physical card for hotels and deposits, and a small amount of RMB cash for emergencies. Do the app setup before you fly, then test it with a low-value purchase on your first day before relying on it for taxis, restaurants, or train station snacks.",
    whoThisGuideIsFor: [
      "First-time visitors who do not have a Chinese bank account.",
      "Travelers planning to pay for restaurants, cafes, taxis, metro rides, hotels, train tickets, attractions, and small local shops.",
      "Visitors staying 3-14 days who want a simple payment stack and backup plan.",
      "Travelers whose bank card, phone number, or identity verification may not work smoothly on the first attempt.",
    ],
    featureSections: [
      {
        title: "Payment stack diagram",
        body:
          "Think in layers instead of one magic app. Your goal is not to guarantee every payment will work, but to make sure one failure does not stop the day.",
        items: [
          "Primary layer: Alipay with at least one supported international card, installed before departure and tested on day one.",
          "Backup wallet layer: WeChat Pay if setup works for your account, plus WeChat for mini programs and local communication.",
          "Hotel and larger purchase layer: physical Visa or Mastercard for international hotels, deposits, and card-friendly merchants.",
          "Emergency layer: small RMB cash, hotel front desk support, Chinese address screenshots, and a second bank card.",
        ],
      },
      {
        title: "First-day payment test card",
        body:
          "Before relying on mobile payment for taxis, dinner, or station transfers, run a small controlled test near your hotel.",
        items: [
          "Choose a convenience store or cafe close to your hotel.",
          "Buy water or a small snack, then try Alipay first.",
          "Check whether your bank app shows the transaction or security alert.",
          "Try WeChat Pay only after Alipay is working, and keep cash ready.",
          "Do not test your first payment inside a taxi or at a busy restaurant counter.",
        ],
      },
      {
        title: "If your card is declined",
        items: [
          "Try another card from a different bank if you prepared one.",
          "Open your bank app and check travel controls, fraud alerts, online payment settings, and overseas transaction limits.",
          "Wait before repeated retries. Too many failed attempts may trigger temporary security blocks.",
          "Use cash or physical card for the immediate purchase, then troubleshoot later on stable Wi-Fi.",
        ],
      },
      {
        title: "If QR payment fails",
        items: [
          "Switch flows: if scanning the merchant QR fails, ask whether the cashier can scan your payment code.",
          "Check mobile data and battery before assuming the wallet or card is the problem.",
          "Use a simpler merchant for testing, such as a convenience store, before trying taxis or table QR ordering.",
          "Save screenshots of the merchant, amount, and error if you need support later.",
        ],
      },
      {
        title: "Common payment scenarios",
        columns: ["Scenario", "Likely payment flow", "Backup"],
        rows: [
          ["Airport arrival", "Taxi, metro, ride-hailing, or airport shops may prefer QR payment", "Cash, hotel transfer, physical card where accepted"],
          ["Hotel check-in", "International hotels may use physical card pre-authorization", "Keep passport and booking card accessible"],
          ["Taxi", "Ride-hailing app payment or driver QR code", "Cash and Chinese destination note"],
          ["Restaurant", "Table QR, cashier QR, or cashier scans your code", "Try another QR flow, cash, or card if accepted"],
          ["Train station", "App payment or QR at shops", "Cash for snacks and screenshots for tickets"],
        ],
      },
    ],
    steps: [
      "Install Alipay before departure, create your account, and complete identity or card verification as far as the app allows. Do not leave the first login for the airport arrival hall, where roaming, SMS codes, and fatigue make every small issue harder.",
      "Add one main international card and one backup card if you have it. Cards from different banks are useful because issuer security rules can block a transaction even when the app itself is working.",
      "Install WeChat and try to activate WeChat Pay before travel. WeChat Pay is useful as a backup wallet and for mini programs, but some visitors find Alipay easier as the main travel wallet.",
      "Carry a modest amount of RMB cash for the first taxi, a late-night convenience store, or the rare moment when mobile data or card verification interrupts payment. You do not need to carry a large stack of cash in major cities.",
      "Save your hotel name, address, and phone number in Chinese. If payment fails in a taxi or small restaurant, the same saved address helps staff or hotel reception assist you quickly.",
      "On your first day, test payment with a small purchase at a convenience store or cafe. Try both common patterns: scanning the merchant QR code and showing your payment code for the cashier to scan.",
      "For larger purchases, hotel deposits, or premium restaurants, keep your physical card and passport accessible. Some international hotels may still prefer card pre-authorization rather than app payment.",
      "Before taking a train or taxi across town, check that your phone has battery, data, and app access. In China, payment, maps, ride-hailing, and translation all depend on the same phone staying usable.",
    ],
    commonMistakes: [
      "Assuming a foreign Visa or Mastercard will work directly at local restaurants, taxis, street food stalls, and small shops. In many everyday situations, the merchant expects QR payment.",
      "Waiting until the first meal to install payment apps. If account verification, SMS login, or card linking fails, you are suddenly troubleshooting while hungry and jet-lagged.",
      "Relying on one card inside one payment app. A single issuer block can make a working wallet unusable until you contact your bank.",
      "Carrying no cash at all. Mobile payment is common, but cash is still a useful safety net when data is weak or a merchant has trouble with foreign-linked wallet payments.",
      "Confusing the merchant's QR code with your personal payment code. If the cashier points to a printed QR, you usually scan it; if they have a scanner, they may need to scan your code.",
      "Forgetting that passport names, card names, and app verification screens should match as closely as possible. Name mismatch can slow down setup.",
    ],
    troubleshooting: [
      "If a card is rejected inside Alipay or WeChat Pay, try your backup card, check your bank's travel controls, and look for any card issuer notification. Some blocks come from the foreign bank, not the Chinese wallet.",
      "If scanning the merchant QR code fails, ask the cashier to scan your payment code instead. The two flows can behave differently depending on the merchant setup.",
      "If mobile data is weak, do not keep retrying at the counter. Step aside, connect to Wi-Fi if available, or use cash for the immediate purchase and fix the app later at the hotel.",
      "If the app asks for verification again, use a stable Wi-Fi connection and make sure your phone can receive SMS or in-app security prompts. Avoid repeated failed attempts that may temporarily lock an account.",
      "If ride-hailing payment fails, switch to a taxi from a hotel or station queue and show your destination in Chinese. Keep enough cash for this fallback on arrival day.",
      "If a refund or duplicate charge happens, save screenshots of the transaction, merchant name, date, and amount. It is easier to resolve from your hotel than while moving between sights.",
    ],
    backupPlan: [
      "Primary: Alipay with a supported international card, prepared before departure and tested on day one.",
      "Secondary: WeChat and WeChat Pay if your account and card setup work, especially for mini programs and local communication.",
      "Hotel and airport backup: a physical Visa or Mastercard for deposits, pre-authorization, larger hotels, and some tourist venues.",
      "Emergency: small RMB cash in mixed notes for late arrivals, weak mobile data, low phone battery, taxi issues, or app verification problems.",
      "Bank backup: enable travel use in your card issuer app and carry a second card from another bank if possible.",
    ],
    usefulChinesePhrases: [
      {
        english: "Can I pay with Alipay?",
        chinese: "我可以用支付宝支付吗？",
        pinyin: "Wo keyi yong Zhifubao zhifu ma?",
      },
      {
        english: "Can I pay by card?",
        chinese: "可以刷卡吗？",
        pinyin: "Keyi shuaka ma?",
      },
      {
        english: "Do you accept cash?",
        chinese: "可以用现金吗？",
        pinyin: "Keyi yong xianjin ma?",
      },
      {
        english: "Could you scan my payment code?",
        chinese: "可以扫我的付款码吗？",
        pinyin: "Keyi sao wo de fukuanma ma?",
      },
    ],
    firstDayChecklist: [
      "Alipay installed and logged in.",
      "At least one card added and verified.",
      "WeChat installed and payment attempted if available.",
      "Small cash backup in RMB.",
      "Hotel address saved in Chinese.",
      "Translation app ready for cashier or taxi conversations.",
      "First small purchase tested before depending on mobile payment for taxis or dinner.",
    ],
    faq: [
      {
        question: "Can foreigners use Alipay in China?",
        answer:
          "Many foreign visitors can use Alipay with supported international cards, but availability and verification can vary by card issuer, country, phone number, and current app requirements. Set it up before travel and test it with a small purchase.",
      },
      {
        question: "Do I still need cash in China?",
        answer:
          "Yes, carry a small backup. Mobile payment is the norm, but cash helps when cards fail, data is weak, or a smaller merchant cannot process your app transaction.",
      },
      {
        question: "Will my Visa or Mastercard work directly?",
        answer:
          "They may work at international hotels and some premium merchants, but they are not reliable for everyday local spending. Mobile wallets are much more useful.",
      },
      {
        question: "Which is better for travelers, Alipay or WeChat Pay?",
        answer:
          "Alipay is often easier as a travel-first tool. WeChat Pay is still useful as a backup and for mini programs, messaging, and some local services.",
      },
      {
        question: "Can I use Apple Pay or Google Pay in China?",
        answer:
          "Do not rely on them for everyday travel spending. Some terminals may accept contactless cards or wallets, but QR payment through local wallets is much more common for taxis, casual restaurants, and small merchants.",
      },
    ],
    officialSourceLinks: [
      {
        label: "China government payment service guidance for overseas visitors",
        href: "https://english.www.gov.cn/news/202404/11/content_WS6617c858c6d0868f4e8e5f4d.html",
        note: "Use for current official payment service guidance and policy updates for overseas visitors.",
      },
      {
        label: "Alipay",
        href: "https://www.alipay.com/",
        note: "Use for current app and service information.",
      },
      {
        label: "Alipay+",
        href: "https://www.alipayplus.com/",
        note: "Use for current cross-border payment service information where available.",
      },
      {
        label: "WeChat Pay",
        href: "https://pay.weixin.qq.com/",
        note: "Use for current wallet and service information.",
      },
      {
        label: "Your own bank card travel rules",
        href: "https://www.visa.com/",
        note: "Also check your card issuer's travel controls, overseas transaction rules, limits, and fraud alerts.",
      },
    ],
    ctaLinks: [
      {
        label: "Get the Free China First Trip Checklist",
        href: "/thank-you",
        note: "Download the printable 3-page checklist for payment, apps, hotel addresses, transport, food, and emergency phrases.",
      },
      {
        label: "Ask a China Trip Question",
        href: "/contact",
        note: "Tell us your country, travel month, payment concern, and backup options.",
      },
      {
        label: "Compare Free vs Paid Setup Help",
        href: "/store#free-vs-paid",
        note: "See what the free checklist covers and what the $7 Payment & Apps Setup Guide adds.",
      },
    ],
    relatedGuideSlugs: [
      "best-apps-for-traveling-in-china",
      "how-to-use-alipay-in-china-as-a-tourist",
      "how-to-use-wechat-pay-in-china-as-a-foreigner",
      "china-travel-checklist-before-you-fly",
      "how-to-book-high-speed-trains-in-china",
    ],
    relatedProductIds: ["china-payment-apps-setup-guide"],
  },
  "best-apps-for-traveling-in-china": {
    quickAnswer:
      "The essential China app stack is payment, maps, translation, ride-hailing, train support, and offline backups. Do not download every app you see on social media. Instead, install a small core set, log in before departure, save Chinese addresses, and test payment, maps, and translation before your first full sightseeing day.",
    whoThisGuideIsFor: [
      "First-time visitors who want a small, reliable app stack instead of a phone full of unused downloads.",
      "Travelers who need payment, maps, translation, taxis, train support, mobile data, and offline backups ready before arrival.",
      "Visitors who do not read Chinese and need to know which apps are essential, useful later, or optional.",
      "Travelers who want to avoid app login, SMS, payment, and map problems on arrival day.",
    ],
    featureSections: [
      {
        title: "App stack summary",
        body:
          "Build the app stack around first-day jobs: pay, navigate, translate, call a ride, check train details, stay online, and recover if data or login fails.",
        items: [
          "Payment: Alipay first, WeChat as backup if setup works.",
          "Maps: one familiar map plus Chinese place names saved offline.",
          "Translation: camera translation and offline Chinese language pack.",
          "Transport: ride-hailing, train booking support, and station screenshots.",
          "Offline backup: hotel address, passport copy, bookings, emergency contacts, and phrase cards.",
        ],
      },
      {
        title: "Must-have before arrival",
        items: [
          "Alipay 支付宝: payment, ride-hailing access, and travel mini programs.",
          "WeChat 微信: messaging, WeChat Pay backup, and mini programs.",
          "Translation app 翻译应用: camera translation, typed requests, and offline Chinese.",
          "Map app 地图应用: hotel checks, metro exits, and walking directions.",
          "eSIM or roaming app: mobile data for payment, maps, and verification codes.",
          "Trip.com or train support: bookings, confirmations, and English support.",
          "Offline screenshot folder: works even when data, Wi-Fi, or app login fails.",
        ],
      },
      {
        title: "Useful after arrival",
        items: [
          "DiDi 滴滴: helpful for late arrivals, rain, airports, and hotels away from metro lines.",
          "Amap 高德地图: strong local detail, but more Chinese-language friction.",
          "China Railway 12306 中国铁路12306: official railway schedules and ticket service checks.",
          "Dianping 大众点评 / Meituan 美团: food discovery after you are comfortable with local apps.",
        ],
      },
      {
        title: "Optional / advanced",
        items: [
          "Xiaohongshu 小红书: useful for inspiration, but verify addresses, opening hours, and booking rules elsewhere.",
          "Local metro apps: useful in some cities, but Alipay transport tools or ticket machines may be simpler.",
          "Attraction mini programs 景区小程序: helpful for reservations, but can be difficult with passport entry or Chinese-only screens.",
        ],
      },
    ],
    steps: [
      "Start with payment: install Alipay and WeChat, then add cards and test login stability. These two apps also unlock useful mini programs for ride-hailing, restaurants, attraction booking, and local services.",
      "Choose your map setup before arrival. Apple Maps can be approachable for many foreign visitors; Amap and Baidu Maps have stronger local detail but more Chinese-language friction.",
      "Install a translation app with offline Chinese support and camera translation. Download the language pack before your flight so menus, signs, and hotel conversations do not depend entirely on mobile data.",
      "Prepare ride-hailing through DiDi or a DiDi mini program inside Alipay. Test whether you can open the service, set a destination, and recognize pickup point names before using it late at night.",
      "For high-speed trains, save booking confirmations and passport-linked ticket details as screenshots. Station Wi-Fi, app logins, and roaming can be unreliable exactly when you need the information.",
      "Create an offline folder with Chinese hotel addresses, passport copy, insurance, emergency contacts, flight and train details, and screenshots of attraction reservations.",
      "Turn on roaming or install your eSIM/SIM before you need a verification code. Many app problems are actually connectivity problems.",
      "Keep the home screen simple for the first day: payment, maps, translation, ride-hailing, hotel address, and camera. Add food or ticketing apps only when your route needs them.",
    ],
    commonMistakes: [
      "Downloading too many apps but not logging in before arrival. A phone full of icons is not useful if SMS verification fails after landing.",
      "Depending on one maps app without checking whether it works well in China. Save hotel and station names in Chinese so you can switch apps or show staff your destination.",
      "Keeping hotel addresses only in English. Taxi drivers, station staff, and delivery-style pickup points are much easier when the Chinese address is visible.",
      "Assuming every app will accept foreign phone numbers or cards smoothly. Some services work better through Alipay or WeChat mini programs than as standalone apps.",
      "Forgetting offline backups. Train station security, basement restaurants, and airport pickup zones are exactly where a screenshot can save time.",
      "Using a VPN as the answer to every app issue. Local Chinese apps usually do not need one; the problem is often account setup, payment linking, or mobile data.",
    ],
    troubleshooting: [
      "If SMS verification fails, try Wi-Fi calling, roaming, or another login method before leaving the airport. If it still fails, use screenshots and hotel staff support until you can fix the account calmly.",
      "If a maps app is confusing, ask your hotel to paste the Chinese place name into your phone. Search results are more accurate with Chinese characters than with translated English names.",
      "If ride-hailing pickup points are hard to find, move to a hotel entrance, mall gate, station exit, or other named landmark. Drivers and apps work best with precise pickup points.",
      "If translation audio fails in a noisy restaurant, type a short sentence and show large Chinese text on your screen. Short written requests work better than long spoken explanations.",
      "If a travel app will not accept your foreign card, try the same service through Alipay or WeChat, use a hotel concierge, or book through a travel platform that already supports your payment method.",
      "If an app feels overwhelming, stop adding features and return to the basics: payment, destination address, translation, and a safe route back to the hotel.",
    ],
    backupPlan: [
      "Create an offline screenshot folder called China Trip with hotel addresses, passport copy, train tickets, flight details, attraction reservations, insurance, and emergency contacts.",
      "Keep payment, maps, translation, ride-hailing, and hotel address notes on your first home screen for day one.",
      "Save key Chinese place names so you can switch between Apple Maps, Amap, Baidu Maps, hotel staff help, or a taxi note.",
      "If a standalone Chinese app is hard to set up, try the same service inside Alipay or WeChat, ask your hotel, or use a travel platform with English support.",
      "Prepare mobile data before landing. Do not rely on airport Wi-Fi for taxis, maps, payment, or translation after you leave the terminal.",
    ],
    usefulChinesePhrases: [
      {
        english: "Please help me find this address.",
        chinese: "请帮我找这个地址。",
        pinyin: "Qing bang wo zhao zhe ge dizhi.",
      },
      {
        english: "I cannot open this app.",
        chinese: "我打不开这个应用。",
        pinyin: "Wo da bu kai zhe ge yingyong.",
      },
      {
        english: "Can you send me the address in Chinese?",
        chinese: "可以把中文地址发给我吗？",
        pinyin: "Keyi ba Zhongwen dizhi fa gei wo ma?",
      },
    ],
    firstDayChecklist: [
      "Payment apps logged in.",
      "Translation app with offline Chinese downloaded.",
      "Hotel address saved in Chinese.",
      "Ride-hailing access tested.",
      "Train or flight confirmations screenshotted.",
      "Power bank charged.",
      "eSIM or roaming data tested outside Wi-Fi.",
      "Offline screenshot folder easy to open.",
    ],
    faq: [
      {
        question: "Do I need a VPN for China travel apps?",
        answer:
          "Chinese local apps usually work without a VPN. Some foreign services may require roaming, eSIM routing, or other connectivity planning depending on your setup. Plan connectivity separately from local app access.",
      },
      {
        question: "Which map app should I use in China?",
        answer:
          "Apple Maps is often approachable for foreign visitors. Amap and Baidu Maps have stronger local detail but can be harder if you do not read Chinese.",
      },
      {
        question: "Can I travel with only English apps?",
        answer:
          "In major cities, yes for a simple trip, but Chinese addresses and local app screenshots make taxis, restaurants, and train stations much easier.",
      },
      {
        question: "Should I install restaurant and ticketing apps before my first trip?",
        answer:
          "Not necessarily. For a first trip, payment, maps, translation, ride-hailing, and train support matter most. Add restaurant or ticketing apps only when a specific reservation or attraction requires them.",
      },
    ],
    officialSourceLinks: [
      {
        label: "DiDi Global",
        href: "https://www.didiglobal.com/",
        note: "Use for ride-hailing service information.",
      },
      {
        label: "China Railway 12306",
        href: "https://www.12306.cn/en/index.html",
        note: "Use for official railway ticket information.",
      },
      {
        label: "Trip.com",
        href: "https://www.trip.com/",
        note: "Use for current travel platform support and booking rules if you book there.",
      },
    ],
    ctaLinks: [
      {
        label: "Use Essential Apps Checklist",
        href: "/tools/essential-apps-checklist",
        note: "Mark your payment, maps, translation, train, data, and offline backup setup before you fly.",
      },
      {
        label: "Get the Free China First Trip Checklist",
        href: "/thank-you",
        note: "Download the printable 3-page checklist for apps, payment, hotel addresses, transport, and emergency phrases.",
      },
      {
        label: "View Upcoming Travel Kits",
        href: "/store",
        note: "See the upcoming Payment & Apps Setup Guide for a printable app setup workflow.",
      },
    ],
    relatedGuideSlugs: [
      "how-to-pay-in-china-as-a-foreigner",
      "how-to-book-high-speed-trains-in-china",
      "basic-chinese-phrases-for-travelers",
    ],
    relatedProductIds: ["china-payment-apps-setup-guide"],
    appGroups: chinaTravelAppGroups,
  },
  "how-to-book-high-speed-trains-in-china": {
    quickAnswer:
      "Foreign visitors can take China's high-speed trains using passport-based real-name ticketing. The most common booking options are 12306, Trip.com or another travel platform, a station ticket counter, and hotel or local travel help. For a smooth trip, make sure your ticket name and passport information match exactly, arrive early at the correct station, and keep your passport, train number, gate, carriage, and seat details ready offline.",
    whoThisGuideIsFor: [
      "First-time visitors booking China high-speed rail without a Chinese ID card.",
      "Travelers comparing 12306, Trip.com, station counters, or hotel help.",
      "Visitors taking common routes such as Shanghai to Hangzhou, Shanghai to Suzhou, Beijing to Xi'an, Guangzhou to Shenzhen, or Beijing to Tianjin.",
      "Travelers worried about passport checks, station names, boarding gates, luggage, missed trains, or tight transfers.",
    ],
    featureSections: [
      {
        title: "Major station warning",
        body:
          "The biggest train mistake for foreign visitors is choosing the right city but the wrong station. Large Chinese cities often have several stations, and they can be far apart.",
        items: [
          "Do not book by city name alone. Check the exact Chinese station name.",
          "Compare the station with your hotel, airport, and next transfer before paying.",
          "Save both English and Chinese station names as screenshots.",
          "Leave extra buffer if transferring between an airport and a railway station.",
        ],
      },
      {
        title: "City station name table",
        columns: ["City", "Common station names", "Planning note"],
        rows: [
          ["Shanghai", "Shanghai Hongqiao 上海虹桥站, Shanghai Railway Station 上海站", "Hongqiao is the main high-speed hub for many routes; Shanghai Railway Station is more central but not interchangeable."],
          ["Beijing", "Beijing South 北京南站, Beijing West 北京西站, Beijing Chaoyang 北京朝阳站", "Check the station against your route; Great Wall transfers are a separate planning problem."],
          ["Xi'an", "Xi'an North 西安北站, Xi'an Railway Station 西安站", "High-speed trains usually use Xi'an North, which is outside the old city center."],
          ["Hangzhou", "Hangzhou East 杭州东站, Hangzhou Railway Station 杭州站", "Hangzhou East is the major high-speed hub; check West Lake transfer time."],
          ["Suzhou", "Suzhou 苏州站, Suzhou North 苏州北站", "Suzhou Station is closer to the old town; Suzhou North may require more transfer time."],
          ["Guangzhou / Shenzhen", "Guangzhou South 广州南站, Shenzhen North 深圳北站", "These are major high-speed hubs but can be far from some central hotels."],
        ],
      },
      {
        title: "Passport real-name ticketing",
        body:
          "Train tickets are tied to the ID used for booking. For foreign visitors, this usually means the passport you will carry on travel day.",
        items: [
          "Use the same passport for booking, station entry, and boarding.",
          "Keep the passport accessible until you are seated.",
          "If an automatic gate cannot read your passport, use a staffed manual lane.",
          "Name, passport number, nationality, and document type should match the booking record.",
        ],
      },
      {
        title: "Station arrival process",
        items: [
          "Arrive at the correct station and entrance.",
          "Pass passport or ticket check, then security screening.",
          "Find the departure board by train number, not only destination city.",
          "Wait near the gate and board when your train number opens.",
          "Follow platform signs for carriage number, then find your seat.",
        ],
      },
      {
        title: "Wrong station mistakes",
        items: [
          "Shanghai Hongqiao and Shanghai Railway Station are different stations.",
          "Beijing South, Beijing West, and Beijing Chaoyang serve different route patterns.",
          "Suzhou Station is closer to old town than Suzhou North for many visitors.",
          "Guangzhou South and Shenzhen North are efficient but not always central.",
        ],
      },
    ],
    steps: [
      "Confirm whether your route is better by high-speed train before booking. For city pairs such as Shanghai-Hangzhou, Shanghai-Suzhou, Beijing-Xi'an, and Guangzhou-Shenzhen, trains are often easier than flying once station time is included.",
      "Choose a booking route: 12306 for official railway information, a travel platform for easier English support or payment, a station counter for changes and problems, or hotel help when you need the Chinese station name confirmed.",
      "Book with the exact passport you will carry on travel day. Your passport number and name become the ticket ID, and you may need the passport at entry gates, manual lanes, and service counters.",
      "Check the exact departure and arrival stations before paying. Large cities often have several major stations, and the wrong one can be far from your hotel or airport.",
      "Save the train number, station name, departure time, gate, carriage, and seat details as screenshots. Do not rely only on a live app connection inside a busy station.",
      "Arrive 45-60 minutes early for a first trip through large stations such as Beijing South, Shanghai Hongqiao, Guangzhou South, Shenzhen North, Hangzhou East, or Xi'an North.",
      "Enter with your passport ready, pass security, find the waiting hall or gate, and board when your train number opens. Gates normally close before the listed departure time.",
      "Keep luggage manageable and move to the platform queue early if you have a suitcase. Boarding is orderly, but the walking distances can be longer than visitors expect.",
    ],
    commonMistakes: [
      "Booking the correct city but the wrong station, such as choosing Shanghai Railway Station when the better route leaves from Shanghai Hongqiao.",
      "Checking only the destination city instead of the train number. Many trains from the same station can go to the same city on the same day.",
      "Treating large Chinese rail stations like small city stations. Major stations can feel more like airports, with entrance checks, security, waiting halls, and long walks.",
      "Putting the passport deep inside a suitcase after entering the station. Keep it accessible until you are on board.",
      "Scheduling a tight connection after an international flight, between two different railway stations, or during a national holiday period.",
      "Bringing luggage that is too heavy to move quickly through security, escalators, platform queues, and carriage doors.",
    ],
    troubleshooting: [
      "If you are at the wrong station, show staff the Chinese station name and departure time immediately. Do not assume a taxi can fix it if boarding is already close.",
      "If gate information is confusing, search the departure board by train number, then confirm the time and final destination.",
      "If your passport does not scan at an automatic gate, use a staffed manual lane and show your booking confirmation.",
      "If you miss your train, go to a ticket office or service desk with your passport. Ask whether the ticket can be changed to a later train; options depend on the ticket rules and seat availability.",
      "If you cannot find your carriage, look for carriage numbers marked on the platform or ask staff with your ticket screenshot.",
      "If you have a tight transfer, prioritize getting to the next gate or exit first. Food, photos, and app troubleshooting can wait until the transfer is secure.",
    ],
    backupPlan: [
      "If 12306 registration or payment is difficult, use a travel platform with English support or ask your hotel to help confirm station names.",
      "If your passport does not scan at an automatic gate, use a staffed manual lane and show your booking confirmation.",
      "If you miss your train, go to a ticket office or service desk immediately with your passport and booking details. Change options depend on ticket rules, timing, and seat availability.",
      "If you are not sure which station is correct, compare the Chinese station name with your hotel map before booking.",
      "If you have luggage, children, holiday crowds, or an airport-to-train transfer, add more buffer instead of booking the fastest possible connection.",
    ],
    usefulChinesePhrases: [
      {
        english: "High-speed train station",
        chinese: "高铁站",
        pinyin: "Gaotie zhan",
      },
      {
        english: "Which gate is this train?",
        chinese: "这趟车在哪个检票口？",
        pinyin: "Zhe tang che zai nage jianpiaokou?",
      },
      {
        english: "I need help finding my platform.",
        chinese: "我需要帮忙找站台。",
        pinyin: "Wo xuyao bangmang zhao zhantai.",
      },
      {
        english: "I booked this train ticket with my passport.",
        chinese: "我用护照买了这张火车票。",
        pinyin: "Wo yong huzhao mai le zhe zhang huochepiao.",
      },
      {
        english: "I missed my train. What should I do?",
        chinese: "我错过火车了，应该怎么办？",
        pinyin: "Wo cuoguo huoche le, yinggai zenme ban?",
      },
    ],
    firstDayChecklist: [
      "Passport used for booking is in your hand luggage.",
      "Departure and arrival station names saved in English and Chinese.",
      "Train number, departure time, gate, carriage, and seat details screenshotted.",
      "Hotel transfer plan from the arrival station saved.",
      "Payment backup ready for station food, taxis, or ride-hailing.",
      "Water, snacks, power bank, and manageable luggage prepared for the ride.",
    ],
    faq: [
      {
        question: "Can foreigners buy high-speed train tickets in China?",
        answer:
          "Yes. Foreign visitors can buy tickets through 12306, travel platforms, station counters, or with hotel assistance. Use the passport you will carry on travel day because the ticket is tied to that passport.",
      },
      {
        question: "Should I book through 12306 or a travel platform?",
        answer:
          "12306 is the official railway platform and is best for direct train information. Travel platforms can be easier if you want English support, simpler payment, or customer service help. For changes or missed trains, station counters may still be the most useful place to ask.",
      },
      {
        question: "How do I choose the right railway station?",
        answer:
          "Check the station name, not just the city. Compare it with your hotel area, airport arrival point, and onward route. In Shanghai, for example, Shanghai Hongqiao and Shanghai Railway Station serve different routes and are not interchangeable.",
      },
      {
        question: "How early should I arrive at the station?",
        answer:
          "For large stations, 45-60 minutes early is a comfortable first-time target. Smaller stations can be faster, but passport checks, security lines, and finding the right waiting area can still take time.",
      },
      {
        question: "Do I need a paper ticket if I booked online?",
        answer:
          "Many online bookings are tied to your passport and booking record, but keep the confirmation screenshot. If a machine or passport scan fails, staff can help faster when you show the train number and booking details.",
      },
      {
        question: "What do train number, carriage, and seat mean?",
        answer:
          "The train number identifies your exact train. The carriage number tells you which train car to board, and the seat number tells you where to sit. Use the train number on departure boards first, then follow platform signs for the carriage.",
      },
      {
        question: "Which seat class should I choose for a first trip?",
        answer:
          "Second class is comfortable and usually the best value. First class gives more space and a calmer ride. Business class is premium and comfortable, but often unnecessary unless rest, work, or comfort matters more than budget.",
      },
      {
        question: "What should I do if I miss my high-speed train?",
        answer:
          "Go to a ticket counter or service desk immediately with your passport and booking details. Staff may be able to change you to a later train depending on the ticket rules, timing, and seat availability.",
      },
      {
        question: "How much transfer time should I leave between trains?",
        answer:
          "For a first trip, leave at least 60-90 minutes for a same-station transfer and more if you need to change stations, arrive from an international flight, travel with large luggage, or move during holidays.",
      },
    ],
    officialSourceLinks: [
      {
        label: "China Railway 12306",
        href: "https://www.12306.cn/en/index.html",
        note: "Use for official railway ticket and passenger service information.",
      },
      {
        label: "12306 passenger notices and FAQ",
        href: "https://www.12306.cn/en/index.html",
        note: "Use for current passenger rules, ticket changes, refunds, and station notices where available.",
      },
      {
        label: "Your booking platform",
        href: "https://www.trip.com/",
        note: "If you book through a platform, verify its current change, refund, support, and passport-name rules.",
      },
    ],
    ctaLinks: [
      {
        label: "Get the Free China First Trip Checklist",
        href: "/thank-you",
        note: "Prepare payment apps, train tickets, hotel addresses, transport backup, and emergency phrases before you travel.",
      },
      {
        label: "Browse Itinerary Kits",
        href: "/itinerary-kits",
        note: "Use ready-to-adjust routes for Shanghai, Beijing, Xi'an, Hangzhou, Suzhou, and classic China trips.",
      },
      {
        label: "Browse City Kits",
        href: "/city-kits",
        note: "Check city-specific railway stations, hotel areas, Chinese addresses, and first-day transport notes.",
      },
      {
        label: "Ask a China Trip Question",
        href: "/contact",
        note: "Send your cities and travel dates if you need help choosing train stations or route pacing.",
      },
    ],
    relatedGuideSlugs: [
      "best-apps-for-traveling-in-china",
      "how-to-pay-in-china-as-a-foreigner",
      "basic-chinese-phrases-for-travelers",
    ],
    relatedProductIds: ["china-payment-apps-setup-guide"],
  },
  "how-to-use-alipay-and-wechat-pay-in-china": {
    quickAnswer:
      "Use Alipay as your main first-trip wallet, set up WeChat Pay as a backup if it works for your account, and learn the two QR payment flows: sometimes you scan the merchant's QR code, and sometimes the merchant scans your payment code. Keep cash and a physical card available because app verification, data, or card issuer checks can still interrupt a payment.",
    steps: [
      "Install Alipay and WeChat before you fly, then log in while you still have stable access to SMS, email, and your card issuer.",
      "Add an international card to Alipay first. Add a second card if possible so one issuer block does not stop the whole day.",
      "Try WeChat Pay as a backup. It may be useful for mini programs, local contacts, and some merchant flows.",
      "Learn the two checkout patterns: scan a printed merchant QR code and enter the amount, or open your payment code so the cashier can scan you.",
      "Make one small test purchase at a convenience store or cafe before using the apps for taxis, restaurants, or train station food.",
      "Keep your phone charged and mobile data working. In China, the same phone often handles payment, map, translation, and ride-hailing at once.",
    ],
    commonMistakes: [
      "Waiting until checkout to discover the app is not verified or the card was not added correctly.",
      "Showing the wrong QR code at a cashier. Your receive-money code is not the same as your pay code.",
      "Trying only one payment flow. If scanning the merchant QR fails, ask whether the cashier can scan your payment code.",
      "Using WeChat Pay as the only plan before confirming it works with your account and card.",
      "Forgetting a cash backup for taxis, late arrivals, or temporary app issues.",
    ],
    troubleshooting: [
      "If a card payment fails, try a different card, then check whether your bank sent a security alert.",
      "If a merchant QR fails, switch to the cashier-scans-you flow if possible.",
      "If mobile data is weak, step aside and connect to Wi-Fi instead of repeatedly retrying at the counter.",
      "If your app asks for identity or card verification again, fix it later on stable Wi-Fi unless the purchase is urgent.",
      "If a taxi payment fails, use cash or ask your hotel for help rather than blocking the driver while troubleshooting.",
    ],
    firstDayChecklist: [
      "Alipay opens successfully.",
      "At least one card is linked.",
      "WeChat Pay tested if available.",
      "Payment code and scan button are easy to find.",
      "Small RMB cash backup is in your wallet.",
    ],
    faq: [
      {
        question: "Should I use Alipay or WeChat Pay first?",
        answer:
          "Most first-time visitors should start with Alipay because it is often easier as a travel wallet. WeChat Pay is still worth preparing as a backup if your setup allows it.",
      },
      {
        question: "What is the difference between scanning and being scanned?",
        answer:
          "If the merchant shows a printed QR code, you usually scan it and enter the amount. If the cashier has a scanner, open your payment code and let the cashier scan you.",
      },
      {
        question: "Can I pay for taxis with Alipay or WeChat Pay?",
        answer:
          "Often yes, especially through ride-hailing. For street taxis, keep your destination in Chinese and carry cash in case the QR flow or foreign-linked wallet payment fails.",
      },
      {
        question: "Do restaurants accept foreign-linked Alipay or WeChat Pay?",
        answer:
          "Many do, but failures can still happen because of merchant setup, card issuer checks, app limits, or data problems. Keep a backup method ready.",
      },
    ],
    officialSourceLinks: [
      {
        label: "Alipay",
        href: "https://www.alipay.com/",
        note: "Use for current app and service information.",
      },
      {
        label: "WeChat Pay",
        href: "https://pay.weixin.qq.com/",
        note: "Use for current wallet and service information.",
      },
    ],
    relatedGuideSlugs: [
      "how-to-pay-in-china-as-a-foreigner",
      "best-apps-for-traveling-in-china",
      "basic-chinese-phrases-for-travelers",
    ],
    relatedProductIds: ["china-payment-apps-setup-guide"],
  },
  "china-travel-packing-list": {
    quickAnswer:
      "Pack for a phone-first trip: passport access, offline confirmations, payment backups, mobile data, charging, comfortable walking, train station movement, and weather changes. The goal is not more luggage; it is fewer moments where one dead phone, one missing address, or one unavailable card slows down the day.",
    steps: [
      "Put passport, visa or entry proof, insurance, and first hotel details in a folder you can reach quickly.",
      "Save offline copies of flights, hotels, trains, attraction bookings, and Chinese addresses.",
      "Pack one main card, one backup card, and a small RMB cash reserve separately from your phone.",
      "Bring a power bank, charging cable, and adapter that works with your devices.",
      "Choose shoes and clothing for long station walks, metro transfers, stairs, and large attraction areas.",
      "Pack basic medicine, tissues, hand sanitizer, and any personal items you do not want to hunt for after arrival.",
      "Keep luggage light enough to manage through security checks, escalators, and train platforms.",
    ],
    commonMistakes: [
      "Packing many outfits but forgetting the power bank, adapter, or backup card.",
      "Keeping passport, wallet, phone, and all cards in one bag.",
      "Saving hotel details only in a booking app that may require mobile data or login.",
      "Bringing shoes that look good but cannot handle large train stations and long sightseeing days.",
      "Packing a suitcase that is hard to lift onto trains or move through metro stations.",
    ],
    troubleshooting: [
      "If your phone battery is low, prioritize payment, hotel address, and ride-hailing over photos or social apps.",
      "If your luggage is too heavy, use taxis for station transfers and reduce same-day sightseeing.",
      "If weather changes, buy small items locally but keep medication and prescription items with you.",
      "If a booking app will not load, use your screenshot folder and hotel address note.",
    ],
    firstDayChecklist: [
      "Passport and first hotel address are easy to reach.",
      "Payment backup is separate from your main phone wallet.",
      "Power bank is charged.",
      "Offline confirmations are saved in one folder.",
      "Comfortable shoes are ready for station transfers.",
    ],
    faq: [
      {
        question: "Should I bring cash to China?",
        answer:
          "Bring a small RMB backup, especially for arrival day and payment app problems. You do not need to carry a large amount in major cities if mobile payment is working.",
      },
      {
        question: "Do I need to carry my passport every day?",
        answer:
          "You may need your passport for hotels, trains, some attractions, and occasional checks. For sightseeing days, decide based on the day's bookings and keep a secure copy separate.",
      },
      {
        question: "What should I pack for high-speed train travel?",
        answer:
          "Pack light enough to move quickly, keep your passport accessible, bring water or snacks, and keep batteries or valuables in your carry-on.",
      },
      {
        question: "Are tissues and hand sanitizer really necessary?",
        answer:
          "They are small and useful. Public bathrooms and casual restaurants vary, so many travelers are happier carrying their own.",
      },
    ],
    officialSourceLinks: [],
    relatedGuideSlugs: [
      "how-to-pay-in-china-as-a-foreigner",
      "how-to-book-high-speed-trains-in-china",
      "best-apps-for-traveling-in-china",
    ],
    relatedProductIds: [],
  },
  "basic-chinese-phrases-for-travelers": {
    quickAnswer:
      "You do not need to speak Mandarin fluently for a first China trip, but you should keep a few short phrases and Chinese-address screenshots ready. For taxis, restaurants, hotels, and payment problems, showing clear Chinese text on your phone is often more useful than trying to pronounce a long sentence perfectly.",
    steps: [
      "Save your hotel name and address in Chinese before leaving the hotel.",
      "Learn a small set of polite phrases: hello, thank you, excuse me, and I do not understand.",
      "Prepare taxi and hotel phrases as written text you can show on your phone.",
      "Prepare restaurant phrases for less spicy, no meat, bottled water, the bill, and allergies if relevant.",
      "Prepare payment phrases for Alipay, WeChat Pay, cash, and card issues.",
      "Keep emergency phrases short and direct. In a stressful moment, simple written text is better than a long translation.",
    ],
    commonMistakes: [
      "Trying to memorize too many phrases and forgetting the few that matter most.",
      "Showing only pinyin to a taxi driver or restaurant worker instead of Chinese characters.",
      "Using long translated paragraphs when one short sentence would be clearer.",
      "Relying on pronunciation for addresses instead of showing the Chinese address.",
      "Forgetting to save phrases offline before mobile data becomes unreliable.",
    ],
    troubleshooting: [
      "If someone does not understand your pronunciation, show Chinese characters on your screen.",
      "If translation audio fails in a noisy restaurant, switch to large written text.",
      "If a taxi driver is confused, show the hotel phone number and nearest landmark along with the address.",
      "If you have a dietary restriction, show one clear sentence and confirm before ordering.",
    ],
    firstDayChecklist: [
      "Hotel address saved in Chinese.",
      "Payment phrase saved for Alipay or WeChat Pay.",
      "Taxi phrase saved for showing an address.",
      "Restaurant phrases saved for spice level and the bill.",
      "Emergency help phrase saved offline.",
    ],
    faq: [
      {
        question: "Can I travel in China without speaking Mandarin?",
        answer:
          "Yes, especially in major cities, but you should use Chinese addresses, screenshots, and a translation app. A few polite phrases make interactions warmer and smoother.",
      },
      {
        question: "Should I show pinyin or Chinese characters?",
        answer:
          "Show Chinese characters whenever possible. Pinyin helps you remember pronunciation, but local staff usually respond faster to written Chinese.",
      },
      {
        question: "What phrase is most useful for taxis?",
        answer:
          "Use: Qing dai wo qu zhe ge di zhi, meaning please take me to this address. Show the Chinese address under the phrase.",
      },
      {
        question: "How do I ask for the bill in a restaurant?",
        answer:
          "You can say mai dan, or show the Chinese characters 买单. In many restaurants, staff will also understand if you point to the table QR code or payment app.",
      },
    ],
    officialSourceLinks: [],
    relatedGuideSlugs: [
      "how-to-pay-in-china-as-a-foreigner",
      "best-apps-for-traveling-in-china",
      "china-travel-packing-list",
    ],
    relatedProductIds: [],
  },
  "china-esim-guide-for-tourists": {
    quickAnswer:
      "For a first China trip, choose your mobile data plan before you fly and prepare offline backups even if you expect data to work. Your phone is not just for messaging; it is your payment wallet, map, translator, hotel address card, train folder, and emergency backup. The safest setup is one primary data option, one backup way to reach Wi-Fi, and a screenshot folder that works without signal.",
    steps: [
      "Check whether your phone supports eSIM and whether your home carrier roaming plan works in mainland China at a price you can accept.",
      "Choose one primary data option: international roaming, a travel eSIM, a local SIM, or pocket Wi-Fi. For short first trips, roaming or an eSIM is usually the least complicated.",
      "Install and activate anything that can be prepared before departure. Do not leave account login, QR scanning, or plan activation for the airport arrival hall unless the provider requires it.",
      "Download offline Chinese translation packs and save hotel addresses, train details, attraction reservations, flight information, insurance, and emergency contacts as screenshots.",
      "Before leaving the airport or railway station, test payment apps, maps, translation, and ride-hailing. If one tool does not load, solve it while you still have public Wi-Fi and staff nearby.",
      "Keep a paper or offline copy of your first hotel address in Chinese. If data fails completely, this is the detail that gets you safely to your base.",
    ],
    commonMistakes: [
      "Assuming airport Wi-Fi will be enough for the first transfer. It may help at the terminal, but it will not help inside a taxi or while walking to a pickup point.",
      "Buying an eSIM without checking phone compatibility or whether the plan supports the mainland China apps and access you need.",
      "Saving travel details only inside email, booking apps, or cloud storage that may require data or a fresh login.",
      "Waiting until arrival to receive SMS codes for payment, maps, or ride-hailing apps.",
      "Letting one low phone battery threaten payment, translation, and navigation at the same time.",
    ],
    troubleshooting: [
      "If your eSIM does not connect, toggle airplane mode, check whether data roaming is enabled for that line, and confirm the plan is active for mainland China.",
      "If payment apps open slowly on weak data, move out of basement levels, connect to hotel or airport Wi-Fi, or use cash for the immediate purchase.",
      "If maps cannot find a place in English, paste the Chinese name or address from your saved notes.",
      "If ride-hailing pickup points are confusing, move to a hotel entrance, airport zone, mall gate, or station exit with a clear name.",
      "If your phone battery drops, stop using video, social apps, and photo uploads until payment and navigation are secure.",
    ],
    firstDayChecklist: [
      "Primary data option chosen and tested where possible.",
      "Offline translation pack downloaded.",
      "Hotel address saved in Chinese and English.",
      "Payment, maps, ride-hailing, and train confirmations screenshotted.",
      "Power bank charged and cable easy to reach.",
      "Emergency contacts available without cloud login.",
    ],
    faq: [
      {
        question: "Should I use roaming, eSIM, or a local SIM in China?",
        answer:
          "For short first trips, roaming or a travel eSIM is usually simpler because you can prepare before arrival. A local SIM may be useful for longer stays, but it can take setup time and may require passport registration.",
      },
      {
        question: "Can I rely on hotel and cafe Wi-Fi?",
        answer:
          "Use it as a backup, not as your main travel plan. You need data for payment, maps, ride-hailing, and translation while moving between places.",
      },
      {
        question: "What should I screenshot before landing?",
        answer:
          "Screenshot your hotel address in Chinese, passport copy, flight and train details, attraction reservations, payment backup notes, insurance, and emergency contacts.",
      },
      {
        question: "Do China travel apps need a local Chinese phone number?",
        answer:
          "Some services work with foreign numbers and some are easier through Alipay or WeChat mini programs. Set up core apps before travel and keep hotel staff as a backup for tricky bookings.",
      },
    ],
    officialSourceLinks: [],
    relatedGuideSlugs: [
      "best-apps-for-traveling-in-china",
      "how-to-pay-in-china-as-a-foreigner",
      "china-travel-packing-list",
    ],
    relatedProductIds: ["china-payment-apps-setup-guide"],
  },
  "china-food-ordering-guide": {
    quickAnswer:
      "The easiest way to order food in China is to combine picture menus or QR menus with camera translation, a few saved Chinese phrases, and a working mobile payment method. Start with simple first meals near your hotel, then expand to street food, hot pot, local breakfast, and regional dishes once payment and translation feel comfortable.",
    steps: [
      "Prepare payment before your first restaurant meal. Many casual restaurants expect Alipay or WeChat Pay, and some table QR menus connect directly to mobile payment.",
      "Use camera translation for menus, but keep requests short. A clear phrase such as 'not spicy' or 'no peanuts' works better than a long paragraph.",
      "Choose easier first meals: dumplings, noodles, rice bowls, mall food courts, hot pot chains, or restaurants with pictures.",
      "Save dietary needs in Chinese characters if you have allergies, vegetarian needs, or spice limits. Show the text before ordering, not after food arrives.",
      "When a restaurant uses a table QR code, scan it, choose dishes, submit the order, and pay if prompted. If the menu is confusing, ask staff for help with one short translated sentence.",
      "After the meal, ask for the bill or follow the QR/payment flow. In many places, the order may already be paid through the phone.",
    ],
    commonMistakes: [
      "Starting the trip with a complicated local restaurant before payment, data, and translation are working.",
      "Assuming 'not spicy' means the same thing everywhere. Regional spice levels vary, so be extra clear in Sichuan, Chongqing, Hunan, and some hot pot restaurants.",
      "Showing only pinyin for allergy or dietary needs. Staff need Chinese characters to understand quickly.",
      "Ordering too many dishes because portions are unclear. Start smaller and add more if needed.",
      "Forgetting that table QR codes may require mobile data, app login, or local payment.",
    ],
    troubleshooting: [
      "If the QR menu will not open, ask staff whether they have a paper menu, picture menu, or can take your order directly.",
      "If translation produces strange dish names, look for photos, ingredient words, or ask staff for popular choices.",
      "If payment fails after ordering, try the cashier-scans-you flow, another wallet, a backup card if accepted, or cash.",
      "If spice level is too high, order rice, plain noodles, cucumber, egg dishes, or bottled drinks instead of trying to push through the meal.",
      "If you have a serious allergy, use a professionally prepared Chinese allergy card and choose simpler restaurants where ingredients are easier to confirm.",
    ],
    firstDayChecklist: [
      "Payment app opens and card is linked.",
      "Camera translation is ready.",
      "Hotel area has one easy meal option saved.",
      "Spice and allergy phrases are saved in Chinese.",
      "Small cash backup is available.",
      "Bottled water phrase and bill phrase are saved.",
    ],
    faq: [
      {
        question: "Can I order food in China without speaking Chinese?",
        answer:
          "Yes, especially in major cities, but you should use camera translation, pictures, short Chinese phrases, and a working mobile payment app.",
      },
      {
        question: "What should I eat on my first day in China?",
        answer:
          "Choose something predictable near your hotel: noodles, dumplings, rice bowls, mall restaurants, or a casual chain. Save more complex local meals for after payment and translation feel smoother.",
      },
      {
        question: "How do I say not spicy in Chinese?",
        answer:
          "You can show 不辣, pronounced bu la. For less spicy, show 少辣, pronounced shao la. In spicy regions, repeat the request clearly.",
      },
      {
        question: "Are QR code menus hard for foreigners?",
        answer:
          "They can be confusing at first, especially if they require app login or Chinese-only screens. Ask staff for help, use camera translation, or choose a restaurant with a picture menu if you are tired.",
      },
    ],
    officialSourceLinks: [],
    relatedGuideSlugs: [
      "basic-chinese-phrases-for-travelers",
      "how-to-pay-in-china-as-a-foreigner",
      "best-apps-for-traveling-in-china",
    ],
    relatedProductIds: ["china-payment-apps-setup-guide"],
  },
  "can-americans-travel-to-china-in-2026": {
    quickAnswer:
      "Yes, U.S. passport holders can plan China travel in 2026, but most tourist trips require checking visa requirements before booking. Treat entry planning as the first step: verify your passport, visa path, route, hotels, flights, and current official notices before paying for non-refundable travel.",
    steps: [
      "Check your passport validity and make sure the passport name matches flights, hotels, trains, and any visa application.",
      "Confirm the correct entry path for your purpose of travel. Most ordinary sightseeing trips should start by checking tourist visa requirements through official consular sources.",
      "If considering visa-free transit, verify nationality, entry port, exit port, onward ticket to a third country or region, and the permitted stay area.",
      "Choose an arrival city that makes first-day logistics easier. Shanghai, Beijing, and Guangzhou have strong international connections and practical hotel options.",
      "Prepare payment, mobile data, maps, translation, hotel addresses in Chinese, and emergency contact details before departure.",
      "Check official sources again shortly before travel because entry rules and advisories can change.",
    ],
    commonMistakes: [
      "Assuming a social media visa-free route applies to U.S. passport holders without checking current official rules.",
      "Booking non-refundable flights or hotels before confirming the entry path.",
      "Forgetting that visa-free transit rules may depend on a third country or region onward ticket.",
      "Saving only English hotel names instead of Chinese addresses.",
      "Leaving payment and app setup until after landing.",
    ],
    troubleshooting: [
      "If your route depends on visa-free transit, simplify the route and confirm every city is inside the allowed stay area.",
      "If official information is unclear, ask the relevant Chinese embassy or consulate before booking.",
      "If your flight routing changes, re-check whether the new route still matches the entry plan.",
      "If your hotel cannot register foreign passport holders, switch before arrival.",
    ],
    firstDayChecklist: [
      "Passport and entry documents accessible.",
      "First hotel address saved in Chinese.",
      "Onward flight or itinerary proof saved offline.",
      "Alipay or WeChat Pay setup attempted.",
      "Mobile data plan active or ready.",
      "Emergency contact and embassy information saved.",
    ],
    faq: [
      {
        question: "Do Americans need a visa to visit China in 2026?",
        answer:
          "For ordinary tourism, U.S. travelers should expect to verify visa requirements before booking. Some transit routes may qualify for visa-free transit, but eligibility depends on the current policy and the exact route.",
      },
      {
        question: "Can Americans use China visa-free transit?",
        answer:
          "Possibly, but only if the current policy covers the traveler, port, onward ticket, third country or region routing, and permitted stay area. Verify official sources before relying on it.",
      },
      {
        question: "What should U.S. travelers prepare before arrival?",
        answer:
          "Prepare entry documents, hotel addresses in Chinese, mobile payment, data access, translation, transport plans, and offline copies of flights and hotels.",
      },
    ],
    officialSourceLinks: [
      {
        label: "U.S. Department of State China travel information",
        href: "https://travel.state.gov/content/travel/en/international-travel/International-Travel-Country-Information-Pages/China.html",
        note: "Use for U.S. government travel information and advisory context.",
      },
      {
        label: "Embassy of the People's Republic of China in the United States",
        href: "http://us.china-embassy.gov.cn/eng/",
        note: "Use for current consular and visa information for U.S. applicants.",
      },
    ],
    relatedGuideSlugs: [
      "china-240-hour-visa-free-transit-guide",
      "china-travel-checklist-before-you-fly",
      "how-to-pay-in-china-as-a-foreigner",
    ],
    relatedProductIds: [],
  },
  "china-240-hour-visa-free-transit-guide": {
    importantNotice:
      "This guide is for trip planning only and is not legal or immigration advice. Rules can change. Confirm your eligibility and entry port with China’s National Immigration Administration or your airline before travel.",
    lastVerified: "2026-07-13",
    quickAnswer:
      "As last verified on July 13, 2026, China's National Immigration Administration lists 55 eligible nationalities and 65 entry ports across 24 provincial-level regions for the 240-hour visa-free transit policy. Eligible travelers must continue to a third country or region, use a covered port, and stay within the permitted area. Before relying on the policy, verify your passport nationality, routing, confirmed onward transport, entry and exit ports, and every city in your plan.",
    whoThisGuideIsFor: [
      "Travelers planning a short China stopover of up to 10 days under a transit policy.",
      "Visitors considering Shanghai, Beijing, Guangzhou, Shenzhen, Hangzhou, Suzhou, Chengdu, Xi'an, or another covered area as a short route.",
      "Travelers continuing to another country or region after China, not simply making a round trip.",
      "Visitors who want a planning checklist before booking non-refundable flights, hotels, trains, or tours.",
    ],
    featureSections: [
      {
        title: "Risk warning card",
        body:
          "This guide is for trip planning only and is not legal or immigration advice. A route that looks plausible online may still fail if the passport nationality, port, ticket, third country or region, or allowed travel area does not match current official rules.",
        items: [
          "Verify before booking non-refundable flights, hotels, trains, or tours.",
          "Keep official source links and onward ticket proof offline and printed.",
          "If any item is unclear, apply for the appropriate visa or change the route.",
        ],
      },
      {
        title: "Current policy snapshot",
        body:
          "The official totals checked on July 13, 2026 are 55 eligible nationalities, 65 entry ports, and permitted areas in 24 provincial-level regions. NIA guidance generally calculates the 240-hour period from 00:00 on the day after entry, but the entry port determines the permitted travel area and the exact route still needs to qualify.",
        items: [
          "Confirm your passport nationality on the current NIA list.",
          "Confirm both the entry port and the area where you plan to stay.",
          "Carry a confirmed ticket onward to a third country or region.",
          "Ask immigration at the entry port to confirm your exact departure deadline.",
        ],
      },
      {
        title: "Third country / region examples",
        columns: ["Example route", "Why it may work", "What to verify"],
        rows: [
          ["Tokyo → Shanghai → Seoul", "The route appears to continue from one country to China and onward to another country.", "Passport eligibility, Shanghai port, confirmed onward ticket, permitted stay area."],
          ["Hong Kong → Beijing → Singapore", "Hong Kong is often treated as a separate region for transit routing.", "Current official interpretation, Beijing permitted area, onward ticket and date."],
          ["Los Angeles → Shanghai → Los Angeles", "This is a round trip pattern, not a clear third-country transit.", "Do not rely on transit unless official sources confirm your exact route."],
          ["London → Guangzhou → Hong Kong", "This may be a third-region onward pattern for some travelers.", "Eligible nationality, Guangzhou/Shenzhen permitted area, carrier document checks."],
        ],
      },
      {
        title: "Route examples to verify",
        columns: ["Route idea", "Best use", "Verification focus"],
        rows: [
          ["Shanghai + Suzhou + Hangzhou", "Short rail hops, practical hotels, and soft first-trip logistics.", "Confirm every city is inside the permitted area for your entry port."],
          ["Beijing + Tianjin", "History plus an easy northern high-speed rail add-on.", "Confirm Beijing-area permitted movement and exact port rules."],
          ["Guangzhou + Shenzhen", "Southern food, business, and Greater Bay Area connections.", "Confirm border-region routing, hotel cities, and onward destination logic."],
        ],
      },
      {
        title: "Do not book yet if...",
        items: [
          "You have not confirmed your passport nationality is currently eligible.",
          "Your onward ticket returns to the same country or region in a way that may not qualify as transit.",
          "Your arrival or departure port is not clearly covered.",
          "Any hotel city or day trip may be outside the permitted stay area.",
          "Your airline, cruise line, or train operator cannot confirm boarding document expectations.",
          "You are relying only on social media examples instead of official resources.",
        ],
      },
      {
        title: "Official verification checklist",
        items: [
          "Passport nationality appears on the current official eligibility list.",
          "Entry and exit ports are covered by the current policy.",
          "Onward ticket is confirmed, dated, and goes to a third country or region where required.",
          "Every hotel and day trip is inside the allowed area for the port.",
          "Airline or transport operator can board you under the document setup.",
          "Official sources were checked again shortly before travel.",
        ],
      },
    ],
    steps: [
      "Start with official policy pages, not a sample itinerary. Confirm your passport nationality is currently eligible.",
      "Check that your arrival and departure ports are covered by the policy you plan to use.",
      "Confirm you have a ticket onward to a third country or region within the allowed time window.",
      "Map every hotel city and day trip against the permitted stay area for your entry port.",
      "Carry printed and offline proof of onward travel, hotels, and route details.",
      "Use a flexible itinerary with buffer time because airline checks, immigration checks, and flight changes can affect the plan.",
      "Prepare both digital and printed copies of your passport, onward ticket, hotel booking, full itinerary, Chinese hotel address, and any proof needed for your next destination.",
    ],
    commonMistakes: [
      "Treating 240-hour transit as permission to travel anywhere in China.",
      "Forgetting the third country or region requirement.",
      "Booking a simple round trip and assuming it works like transit.",
      "Booking cities outside the permitted stay area.",
      "Assuming all airports, railway stations, or cruise ports qualify.",
      "Using a tight arrival day with no buffer for document checks.",
      "Treating online route examples as official confirmation.",
    ],
    troubleshooting: [
      "If your airline questions eligibility, show official policy information and onward ticket proof.",
      "If your routing changes, re-check the entire transit logic before flying.",
      "If a city is outside the permitted area, remove it from the route instead of hoping it will be accepted.",
      "If you need certainty, apply for the appropriate visa rather than relying on transit rules.",
      "If official information is unclear, contact the Chinese embassy, consulate, airline, or port authority before booking.",
      "If immigration says your route does not qualify, you may be denied temporary entry or asked to use another route. Keep a backup plan.",
    ],
    backupPlan: [
      "If any eligibility item is unclear, do not rely on visa-free transit yet. Verify before booking or apply for the appropriate visa.",
      "Avoid non-refundable hotels, trains, and tours until your passport nationality, ports, onward ticket, and permitted area are checked.",
      "Keep route alternatives simple: a Shanghai base with Suzhou or Hangzhou, a Beijing base with Tianjin, or a Guangzhou/Shenzhen base can be easier to verify than a long domestic loop.",
      "Save official policy links and printed documents in case airline staff ask before boarding.",
      "If your flight is changed, re-check the entire route. A small route change can affect the transit logic.",
    ],
    usefulChinesePhrases: [
      {
        english: "I would like to apply for 240-hour visa-free transit.",
        chinese: "我想申请240小时过境免签。",
        pinyin: "Wo xiang shenqing 240 xiaoshi guojing mianqian.",
      },
      {
        english: "This is my onward ticket.",
        chinese: "这是我的后续行程票。",
        pinyin: "Zhe shi wo de houxu xingcheng piao.",
      },
      {
        english: "This is my hotel address in China.",
        chinese: "这是我在中国的酒店地址。",
        pinyin: "Zhe shi wo zai Zhongguo de jiudian dizhi.",
      },
    ],
    firstDayChecklist: [
      "Passport nationality checked against official rules.",
      "Entry and exit ports checked.",
      "Onward ticket saved offline and printed.",
      "Hotel cities inside permitted area.",
      "Official resources saved offline.",
      "Backup plan ready if routing changes.",
      "Chinese hotel address saved for immigration checks, taxi use, and hotel registration.",
    ],
    faq: [
      {
        question: "Is 240-hour visa-free transit the same as a tourist visa?",
        answer:
          "No. It is a transit policy with conditions. It can work for eligible routes, but it is not open-ended tourist permission for all travelers or all China cities.",
      },
      {
        question: "Do I need an onward ticket?",
        answer:
          "Yes, travelers relying on transit rules should expect to show confirmed onward travel to a third country or region. Keep offline and printed copies.",
      },
      {
        question: "Can I visit Beijing, Shanghai, and Xi'an on 240-hour transit?",
        answer:
          "Do not assume that. Allowed areas depend on the entry port and current policy. Check the permitted stay area before adding any city.",
      },
      {
        question: "Does a round trip qualify for 240-hour visa-free transit?",
        answer:
          "A simple round trip may not qualify because transit usually depends on traveling from one country or region to China and onward to a different third country or region. Verify the latest official interpretation before booking.",
      },
      {
        question: "Are Hong Kong, Macao, and Taiwan treated as third regions?",
        answer:
          "They are often treated as separate regions for transit routing purposes, but you should verify the current official interpretation for your route before booking.",
      },
      {
        question: "What should I print before arrival?",
        answer:
          "Print or save offline your passport page, onward ticket, hotel booking, full itinerary, Chinese hotel address, and any next-destination entry proof that may be relevant.",
      },
      {
        question: "When does the 240-hour period start?",
        answer:
          "NIA guidance generally calculates the 240-hour period from 00:00 on the day after entry. Confirm the exact permitted departure deadline with immigration at your entry port before relying on a final-day flight.",
      },
    ],
    officialSourceLinks: [
      {
        label: "National Immigration Administration: 10 new opening measures",
        href: "https://www.nia.gov.cn/n897453/c1751080/content.html",
        note: "Official Chinese announcement published November 3, 2025; it records the expansion to 65 eligible ports in 24 provincial-level regions.",
      },
      {
        label: "National Immigration Administration: 240-hour transit notice (English)",
        href: "https://en.nia.gov.cn/n147418/n147468/c187308/content.html",
        note: "Official English notice published November 3, 2025 for the latest port expansion.",
      },
      {
        label: "National Immigration Administration: visa-free transit policy",
        href: "https://www.nia.gov.cn/n741440/n741577/c1731205/content.html",
        note: "Official Chinese reference for eligible nationalities, ports, permitted areas, and transit conditions.",
      },
    ],
    ctaLinks: [
      {
        label: "Use Visa-Free Checker",
        href: "/tools/visa-free-eligibility-checker",
        note: "Answer a few planning questions before you book your route.",
      },
      {
        label: "Get the Free China First Trip Checklist",
        href: "/thank-you",
        note: "Prepare documents, payment, apps, hotel addresses, and emergency phrases before departure.",
      },
      {
        label: "Ask a China Trip Question",
        href: "/contact",
        note: "Send your passport country, entry city, exit city, and onward destination for planning feedback.",
      },
      {
        label: "View Upcoming Travel Kits",
        href: "/store",
        note: "Use printable planning kits for payment, apps, and realistic first-trip preparation. They do not replace official visa checks.",
      },
    ],
    relatedGuideSlugs: [
      "can-americans-travel-to-china-in-2026",
      "3-days-in-shanghai-for-first-time-visitors",
      "china-travel-checklist-before-you-fly",
    ],
    relatedProductIds: ["10-day-classic-china-itinerary"],
  },
  "how-to-use-alipay-in-china-as-a-tourist": {
    quickAnswer:
      "Tourists should set up Alipay before departure, add at least one international card, keep mobile data active, and test a small purchase on day one. Use Alipay as your main payment tool, but keep WeChat Pay, a physical card, and some RMB cash as backups.",
    whoThisGuideIsFor: [
      "Tourists who want Alipay ready before their first meal, taxi, metro ride, or convenience store purchase.",
      "Visitors using international cards who understand setup may vary by bank, phone number, country, and current app rules.",
      "Travelers who want a primary wallet but still need backup payment options.",
    ],
    featureSections: [
      {
        title: "What to prepare before setup",
        items: [
          "Passport name and number in the same format you use for bookings.",
          "One main international card and one backup card if possible.",
          "Phone number or email access for login and security checks.",
          "Your bank app, because card issuers may ask you to approve or unblock overseas payments.",
          "Stable internet before departure and again on arrival day.",
        ],
      },
      {
        title: "Linking an international card",
        body:
          "Card linking may work for many visitors, but it is not certain. Treat card linking as a setup step to test, not as proof that every merchant payment will succeed.",
        items: [
          "Use the card name and passport details as consistently as possible.",
          "Try a second card if the first issuer blocks or rejects setup.",
          "Check overseas transaction limits and online payment controls in your bank app.",
          "Avoid repeated failed attempts if the app or bank starts showing security warnings.",
        ],
      },
      {
        title: "First payment test",
        items: [
          "Go to a convenience store near your hotel.",
          "Buy water or a small snack.",
          "Try scanning the merchant QR code first.",
          "If that fails, ask the cashier to scan your payment code.",
          "Confirm the transaction in Alipay and your bank app before relying on Alipay for taxis or dinner.",
        ],
      },
      {
        title: "What to use Alipay for",
        items: [
          "Everyday QR payments at convenience stores, cafes, casual restaurants, and many attractions.",
          "Ride-hailing or taxi-related flows where available.",
          "Some metro, transport, booking, and local service mini programs.",
          "Small first-day purchases before more stressful payment situations.",
        ],
      },
      {
        title: "What not to rely on",
        items: [
          "Do not rely on Alipay as your only payment method before testing it in China.",
          "Do not assume every foreign card, merchant, taxi, hotel deposit, or refund flow will work.",
          "Do not troubleshoot identity verification at a busy counter if cash or another backup can solve the immediate purchase.",
        ],
      },
    ],
    steps: [
      "Install Alipay before travel and complete as much account setup as the app allows.",
      "Add your main card and a backup card from a different bank if possible.",
      "Learn the two QR flows: scan the merchant QR, or show your payment code for the cashier to scan.",
      "Test a small convenience store or cafe purchase before using Alipay for taxis or restaurants.",
      "Use Alipay for ride-hailing or local services only after basic payment works.",
      "Keep cash for late arrivals, data problems, or card issuer blocks.",
    ],
    commonMistakes: [
      "Waiting until the first meal to set up Alipay.",
      "Adding only one card and having no backup.",
      "Confusing receive-money QR codes with payment codes.",
      "Trying repeated payments on weak data instead of stepping aside.",
      "Assuming a hotel card deposit can always be paid through Alipay.",
    ],
    troubleshooting: [
      "If the card fails, try another card and check your bank's security alerts.",
      "If merchant QR scanning fails, ask whether the cashier can scan your payment code.",
      "If Alipay asks for verification, move to stable Wi-Fi before retrying.",
      "If a taxi payment fails, use cash or hotel help instead of troubleshooting in traffic.",
    ],
    backupPlan: [
      "Use WeChat Pay as a backup if setup works for your account.",
      "Keep a small amount of RMB cash for arrival day, taxis, weak data, and urgent purchases.",
      "Carry the physical card linked to your booking for hotels, deposits, and larger merchants.",
      "Ask hotel staff for help if payment, taxi, or address problems are blocking the next step.",
    ],
    usefulChinesePhrases: [
      {
        english: "Can I pay with Alipay?",
        chinese: "我可以用支付宝支付吗？",
        pinyin: "Wo keyi yong Zhifubao zhifu ma?",
      },
      {
        english: "The payment failed.",
        chinese: "支付失败了。",
        pinyin: "Zhifu shibai le.",
      },
      {
        english: "Could you scan my payment code?",
        chinese: "您可以扫我的付款码吗？",
        pinyin: "Nin keyi sao wo de fukuanma ma?",
      },
    ],
    firstDayChecklist: [
      "Alipay opens successfully.",
      "One main card and one backup are added if possible.",
      "Payment code is easy to find.",
      "Small RMB cash backup is available.",
      "Hotel address saved in Chinese.",
    ],
    faq: [
      {
        question: "Can tourists use Alipay in China?",
        answer:
          "Many tourists can use Alipay with supported international cards, but setup and limits can vary. Prepare before departure and test a small purchase after arrival.",
      },
      {
        question: "Can I use Alipay for taxis?",
        answer:
          "Often yes, especially through ride-hailing. For street taxis, keep cash and your destination in Chinese as backups.",
      },
      {
        question: "Should I still carry cash?",
        answer:
          "Yes. A small RMB backup is useful for arrival day, weak mobile data, or card verification problems.",
      },
    ],
    officialSourceLinks: [
      {
        label: "Alipay",
        href: "https://www.alipay.com/",
        note: "Use for current product and service information.",
      },
      {
        label: "China government payment service guidance for overseas visitors",
        href: "https://english.www.gov.cn/news/202404/11/content_WS6617c858c6d0868f4e8e5f4d.html",
        note: "Use for official payment guidance and available payment options for overseas visitors.",
      },
    ],
    ctaLinks: [
      {
        label: "View the Payment & Apps Setup Guide",
        href: "/store#inside-the-guide",
        note: "Get printable Alipay, WeChat Pay, payment backup, and phrase card pages.",
      },
      {
        label: "Compare Free vs Paid",
        href: "/store#free-vs-paid",
        note: "See what is included in the free checklist and the $7 setup guide.",
      },
    ],
    relatedGuideSlugs: [
      "how-to-pay-in-china-as-a-foreigner",
      "how-to-use-wechat-pay-in-china-as-a-foreigner",
      "best-apps-for-traveling-in-china",
    ],
    relatedProductIds: ["china-payment-apps-setup-guide"],
  },
  "how-to-use-wechat-pay-in-china-as-a-foreigner": {
    quickAnswer:
      "Foreign visitors should treat WeChat Pay as an important backup wallet and mini-program tool. Set it up before relying on it, test a small transaction, and keep Alipay, cash, and a physical card ready because account and card verification can vary.",
    whoThisGuideIsFor: [
      "Visitors who already use WeChat or want a backup to Alipay.",
      "Travelers who may need restaurant, attraction, transport, or hotel mini programs.",
      "Foreign visitors who want realistic expectations about WeChat Pay setup friction.",
    ],
    featureSections: [
      {
        title: "Why WeChat is useful even if WeChat Pay fails",
        items: [
          "Messaging: hotels, guides, local contacts, and some service providers may use WeChat.",
          "Mini programs: attractions, restaurants, ride-hailing, and local services may run inside WeChat.",
          "QR scanning: many local notices, menus, and service pages open through WeChat.",
          "Backup identity: even without payment, WeChat can be useful for communication and service access.",
        ],
      },
      {
        title: "Setup friction warning",
        body:
          "WeChat and WeChat Pay can be powerful, but setup may be less predictable for foreign visitors than a simple travel app.",
        items: [
          "Foreign phone numbers may receive codes inconsistently.",
          "Card linking and identity verification may vary by issuing bank and current app requirements.",
          "Some services inside mini programs may still require Chinese-language screens or passport entry.",
          "Do not make WeChat Pay your only payment method until a small transaction works.",
        ],
      },
      {
        title: "Payment backup role",
        items: [
          "Use Alipay as primary if it is working more smoothly.",
          "Keep WeChat Pay as a second QR wallet for merchants or mini programs that prefer WeChat.",
          "Carry cash and a physical card for arrival day, taxis, hotels, and account verification interruptions.",
        ],
      },
      {
        title: "Mini programs explained",
        body:
          "Mini programs are lightweight services inside WeChat. They can handle restaurant queues, attraction reservations, ride-hailing, hotel services, and local transport, but they may be Chinese-first and sometimes hard for passport users.",
      },
    ],
    steps: [
      "Install WeChat and complete account setup before travel where possible.",
      "Try to activate WeChat Pay and add a supported card.",
      "Test a small purchase before depending on WeChat Pay for restaurants, taxis, or mini programs.",
      "Use WeChat Pay where a restaurant, local service, or mini program works better through WeChat.",
      "Keep Alipay as your main travel wallet if it is working more smoothly.",
      "Save checkout phrases in Chinese in case a cashier needs to switch payment flows.",
    ],
    commonMistakes: [
      "Relying on WeChat Pay as the only payment method before testing it.",
      "Forgetting that some setup steps may require verification.",
      "Trying to solve account issues at a busy restaurant counter.",
      "Not having Alipay or cash ready as a fallback.",
    ],
    troubleshooting: [
      "If WeChat Pay will not activate, use Alipay and revisit setup on hotel Wi-Fi.",
      "If a merchant QR fails, ask whether they can scan your payment code.",
      "If card verification fails, try another card or contact your bank.",
      "If a mini program is confusing, ask hotel staff or use a simpler restaurant or service.",
    ],
    backupPlan: [
      "Use Alipay as the primary wallet if it works and WeChat Pay does not.",
      "Keep WeChat installed for messaging, QR scanning, and mini programs even if payment is unavailable.",
      "Carry cash for taxis, late arrivals, weak mobile data, and urgent purchases.",
      "Use hotel staff, a travel platform, or a simple walk-in option when a mini program is too hard to complete.",
    ],
    usefulChinesePhrases: [
      {
        english: "Can I pay with WeChat Pay?",
        chinese: "可以用微信支付吗？",
        pinyin: "Keyi yong Weixin zhifu ma?",
      },
      {
        english: "Can I use Alipay instead?",
        chinese: "我可以改用支付宝吗？",
        pinyin: "Wo keyi gai yong Zhifubao ma?",
      },
      {
        english: "I cannot complete verification.",
        chinese: "我无法完成验证。",
        pinyin: "Wo wufa wancheng yanzheng.",
      },
    ],
    firstDayChecklist: [
      "WeChat opens and account is accessible.",
      "WeChat Pay setup attempted.",
      "Payment code location is known.",
      "Alipay and cash backup ready.",
      "Hotel address saved in Chinese.",
    ],
    faq: [
      {
        question: "Is WeChat Pay necessary for tourists?",
        answer:
          "It is not always necessary, but it is useful. Alipay is often easier as the main wallet, while WeChat Pay helps with mini programs and backup payment flows.",
      },
      {
        question: "Can foreigners link cards to WeChat Pay?",
        answer:
          "Many visitors can try to link supported cards, but availability can vary by card, country, phone number, and current app requirements.",
      },
      {
        question: "Should I install both Alipay and WeChat?",
        answer:
          "Yes for most first trips. Having both gives you more options when a merchant or service works better in one app.",
      },
    ],
    officialSourceLinks: [
      {
        label: "WeChat Pay",
        href: "https://pay.weixin.qq.com/",
        note: "Use for current wallet and service information.",
      },
      {
        label: "WeChat",
        href: "https://www.wechat.com/",
        note: "Use for current app information and download links.",
      },
      {
        label: "China government payment service guidance for overseas visitors",
        href: "https://english.www.gov.cn/news/202404/11/content_WS6617c858c6d0868f4e8e5f4d.html",
        note: "Use for official payment guidance and available payment options for overseas visitors.",
      },
    ],
    ctaLinks: [
      {
        label: "View the Payment & Apps Setup Guide",
        href: "/store#inside-the-guide",
        note: "Get printable WeChat Pay backup, Alipay primary setup, troubleshooting, and phrase card pages.",
      },
      {
        label: "Use Essential Apps Checklist",
        href: "/tools/essential-apps-checklist",
        note: "Check whether your payment, translation, maps, train support, and offline backups are ready.",
      },
    ],
    relatedGuideSlugs: [
      "how-to-use-alipay-in-china-as-a-tourist",
      "how-to-pay-in-china-as-a-foreigner",
      "best-apps-for-traveling-in-china",
    ],
    relatedProductIds: ["china-payment-apps-setup-guide"],
  },
  "3-days-in-shanghai-for-first-time-visitors": {
    quickAnswer:
      "Three days is enough for a strong first Shanghai visit if you keep the plan focused: arrival setup and The Bund, one culture and neighborhood day, and one flexible modern Shanghai or water-town option. Do not overload the route before payment, data, and jet lag are under control.",
    steps: [
      "Choose a practical hotel base such as People's Square, Jing'an, or the Former French Concession.",
      "Use day one for airport transfer, payment setup, Yu Garden or a light walk, and The Bund if the sky is clear.",
      "Use day two for a museum, Former French Concession walk, local lunch, and a relaxed dinner.",
      "Use day three for Pudong views, West Bund, Xintiandi, shopping, or Zhujiajiao if you have energy.",
      "Keep rainy-day backups ready: museums, malls, cafes, and indoor food plans.",
      "Confirm your departure station or airport the night before leaving.",
    ],
    commonMistakes: [
      "Trying to add Suzhou or Hangzhou inside a tight three-day Shanghai stay.",
      "Booking paid skyline views before checking weather.",
      "Staying far from metro lines to save a small amount on hotels.",
      "Leaving payment app setup until the first restaurant bill.",
    ],
    troubleshooting: [
      "If arrival day runs late, skip Yu Garden and go straight to hotel setup and a simple dinner.",
      "If The Bund is rainy, move the skyline walk to the clearest evening.",
      "If you are tired on day three, skip the water town and stay central.",
      "If a restaurant queue is too long, choose a mall branch or local noodle shop nearby.",
    ],
    firstDayChecklist: [
      "Hotel address saved in Chinese.",
      "Alipay tested with a small purchase.",
      "Metro or ride-hailing route from hotel checked.",
      "Bund weather checked.",
      "Departure station confirmed.",
    ],
    faq: [
      {
        question: "Is 3 days enough in Shanghai?",
        answer:
          "Yes for a first visit. Three days covers skyline, old city, food, neighborhoods, and one flexible modern or cultural stop.",
      },
      {
        question: "Where should I stay for 3 days in Shanghai?",
        answer:
          "People's Square, Jing'an, and the Former French Concession are practical first choices because they balance transport, food, and easy hotel returns.",
      },
      {
        question: "Should I do a water town in 3 days?",
        answer:
          "Only if you have energy and weather is good. For many first-time visitors, central Shanghai is enough for a three-day stay.",
      },
    ],
    officialSourceLinks: [],
    relatedGuideSlugs: [
      "how-to-pay-in-china-as-a-foreigner",
      "best-apps-for-traveling-in-china",
      "how-to-book-high-speed-trains-in-china",
    ],
    relatedProductIds: ["shanghai-3-day-travel-kit"],
  },
  "china-travel-checklist-before-you-fly": {
    quickAnswer:
      "Before you fly to China, prepare entry documents, payment, apps, internet, hotel addresses in Chinese, transport confirmations, packing basics, and emergency phrases. The goal is to make your first arrival day boring in the best possible way.",
    steps: [
      "Check passport validity, visa or visa-free eligibility, flights, and first hotel details.",
      "Install Alipay and WeChat, add cards where possible, and prepare a cash backup.",
      "Choose roaming, eSIM, SIM, or pocket Wi-Fi before landing.",
      "Download offline translation and save Chinese hotel addresses.",
      "Screenshot flights, trains, hotels, attractions, insurance, and emergency contacts.",
      "Pack passport, power bank, adapter, comfortable shoes, basic medicine, tissues, and weather layers.",
    ],
    commonMistakes: [
      "Saving everything only inside cloud apps that may need data.",
      "Packing clothes carefully but forgetting payment and phone setup.",
      "Not saving hotel addresses in Chinese.",
      "Booking trains without checking the exact station name.",
      "Arriving with no small cash backup.",
    ],
    troubleshooting: [
      "If mobile data fails, use the screenshot folder and airport or hotel Wi-Fi.",
      "If payment setup fails, use cash for urgent purchases and fix apps later on stable Wi-Fi.",
      "If a taxi driver is confused, show the Chinese address and hotel phone number.",
      "If you miss a train, go to a service counter with your passport and booking details.",
    ],
    firstDayChecklist: [
      "Passport and entry papers accessible.",
      "First hotel address saved in Chinese.",
      "Payment app and cash backup ready.",
      "Mobile data plan ready.",
      "Transport from airport or station planned.",
      "Emergency phrases saved offline.",
    ],
    faq: [
      {
        question: "What is the most important thing to prepare before China?",
        answer:
          "Entry documents come first, then payment, mobile data, hotel addresses in Chinese, and offline confirmations.",
      },
      {
        question: "Do I need a printed checklist?",
        answer:
          "A printed or PDF checklist helps because it keeps documents, payment, apps, transport, and emergency phrases visible while you pack.",
      },
      {
        question: "When should I set up payment apps?",
        answer:
          "Before you fly. You can test a small purchase after arrival, but account setup is calmer at home than in a busy airport.",
      },
    ],
    officialSourceLinks: [],
    relatedGuideSlugs: [
      "how-to-pay-in-china-as-a-foreigner",
      "china-esim-guide-for-tourists",
      "basic-chinese-phrases-for-travelers",
    ],
    relatedProductIds: [],
  },
};

export function getGuideDetailContent(slug: string): GuideDetailContent | undefined {
  return guideDetailContent[slug];
}
