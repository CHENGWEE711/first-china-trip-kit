export type AppIconKey =
  | "wallet"
  | "qr"
  | "map"
  | "translation"
  | "ride"
  | "train"
  | "internet"
  | "food"
  | "offline"
  | "ticket";

export type AppRecommendation = {
  icon: AppIconKey;
  appName: string;
  chineseName: string;
  category: string;
  bestFor: string;
  installBeforeArrival: "yes" | "optional";
  foreignerFriction: "low" | "medium" | "high";
  backupTip: string;
  officialLink: string;
  appStoreLink: string;
  googlePlayLink: string;
};

export type AppRecommendationGroup = {
  title: string;
  description: string;
  apps: AppRecommendation[];
};

export const appTrademarkDisclaimer =
  "App names, logos, and trademarks belong to their respective owners. First China Trip Kit is an independent travel planning guide and is not affiliated with these apps unless stated.";

export const chinaTravelAppGroups: AppRecommendationGroup[] = [
  {
    title: "Must-have before arrival",
    description:
      "Install and test these before your flight. The goal is not to master every feature, but to make payment, maps, translation, data, and offline access work on day one.",
    apps: [
      {
        icon: "wallet",
        appName: "Alipay",
        chineseName: "支付宝",
        category: "Payment",
        bestFor: "QR payments, ride-hailing access, mini programs, and everyday purchases.",
        installBeforeArrival: "yes",
        foreignerFriction: "medium",
        backupTip: "Add more than one card if possible and carry a small RMB cash backup.",
        officialLink: "https://www.alipay.com/",
        appStoreLink: "",
        googlePlayLink: "",
      },
      {
        icon: "qr",
        appName: "WeChat",
        chineseName: "微信",
        category: "Payment and messaging",
        bestFor: "WeChat Pay backup, mini programs, local communication, and restaurant QR flows.",
        installBeforeArrival: "yes",
        foreignerFriction: "medium",
        backupTip: "Use Alipay as your main wallet if WeChat Pay setup is slow or unavailable.",
        officialLink: "https://www.wechat.com/",
        appStoreLink: "",
        googlePlayLink: "",
      },
      {
        icon: "translation",
        appName: "Translation app",
        chineseName: "翻译应用",
        category: "Translation",
        bestFor: "Camera translation, typed requests, menus, station signs, and hotel conversations.",
        installBeforeArrival: "yes",
        foreignerFriction: "low",
        backupTip: "Download offline Chinese and keep a few key phrases saved as screenshots.",
        officialLink: "",
        appStoreLink: "",
        googlePlayLink: "",
      },
      {
        icon: "map",
        appName: "Map app",
        chineseName: "地图应用",
        category: "Maps",
        bestFor: "Hotel location checks, metro exits, walking routes, and taxi destination support.",
        installBeforeArrival: "yes",
        foreignerFriction: "medium",
        backupTip: "Save your hotel and station names in Chinese so you can search across map apps.",
        officialLink: "",
        appStoreLink: "",
        googlePlayLink: "",
      },
      {
        icon: "internet",
        appName: "eSIM or roaming app",
        chineseName: "eSIM 或漫游应用",
        category: "Internet",
        bestFor: "Mobile data, SMS codes, payment app access, maps, and arrival-day stability.",
        installBeforeArrival: "yes",
        foreignerFriction: "medium",
        backupTip: "Test the plan before leaving the airport and keep hotel Wi-Fi details offline.",
        officialLink: "",
        appStoreLink: "",
        googlePlayLink: "",
      },
      {
        icon: "train",
        appName: "Trip.com or train booking support",
        chineseName: "携程 / 火车票预订支持",
        category: "Train and hotel support",
        bestFor: "English booking support, train confirmations, hotels, and itinerary backups.",
        installBeforeArrival: "yes",
        foreignerFriction: "low",
        backupTip: "Screenshot train numbers, stations, carriage, seat, hotel addresses, and booking references.",
        officialLink: "https://www.trip.com/",
        appStoreLink: "",
        googlePlayLink: "",
      },
      {
        icon: "offline",
        appName: "Offline screenshot folder",
        chineseName: "离线截图文件夹",
        category: "Offline backup",
        bestFor: "Passport copy, hotel address, train tickets, flight details, insurance, and emergency notes.",
        installBeforeArrival: "yes",
        foreignerFriction: "low",
        backupTip: "Keep the folder available without mobile data or cloud login.",
        officialLink: "",
        appStoreLink: "",
        googlePlayLink: "",
      },
    ],
  },
  {
    title: "Useful after arrival",
    description:
      "These become more useful once you know your hotel area, train route, language comfort, and daily food style.",
    apps: [
      {
        icon: "ride",
        appName: "DiDi",
        chineseName: "滴滴",
        category: "Ride-hailing",
        bestFor: "Airport transfers, rainy days, late nights, and hotels away from metro lines.",
        installBeforeArrival: "optional",
        foreignerFriction: "medium",
        backupTip: "Use a hotel entrance, mall gate, or station exit as the pickup point when street pins are confusing.",
        officialLink: "https://www.didiglobal.com/",
        appStoreLink: "",
        googlePlayLink: "",
      },
      {
        icon: "map",
        appName: "Amap",
        chineseName: "高德地图",
        category: "Maps",
        bestFor: "Local map detail, transit routing, business entrances, and Chinese place searches.",
        installBeforeArrival: "optional",
        foreignerFriction: "high",
        backupTip: "Ask hotel staff to paste the Chinese address into the search box if English results are weak.",
        officialLink: "",
        appStoreLink: "",
        googlePlayLink: "",
      },
      {
        icon: "train",
        appName: "China Railway 12306",
        chineseName: "中国铁路12306",
        category: "Train",
        bestFor: "Official train schedules, ticket information, and railway service checks.",
        installBeforeArrival: "optional",
        foreignerFriction: "high",
        backupTip: "Keep a travel platform or hotel front desk as backup if account setup or payment is difficult.",
        officialLink: "https://www.12306.cn/en/index.html",
        appStoreLink: "",
        googlePlayLink: "",
      },
      {
        icon: "food",
        appName: "Dianping / Meituan",
        chineseName: "大众点评 / 美团",
        category: "Food",
        bestFor: "Restaurant discovery, queues, reviews, and local food ideas once you are comfortable.",
        installBeforeArrival: "optional",
        foreignerFriction: "high",
        backupTip: "Use translation, hotel suggestions, and simple walk-in restaurants if setup feels too heavy.",
        officialLink: "",
        appStoreLink: "",
        googlePlayLink: "",
      },
    ],
  },
  {
    title: "Optional / advanced",
    description:
      "Do not let these distract from the basics. Add them only when your trip style or a specific attraction needs them.",
    apps: [
      {
        icon: "map",
        appName: "Xiaohongshu",
        chineseName: "小红书",
        category: "Local discovery",
        bestFor: "Trendy cafes, photo spots, neighborhood inspiration, and recent local notes.",
        installBeforeArrival: "optional",
        foreignerFriction: "high",
        backupTip: "Treat it as inspiration, not a logistics source. Verify hours, addresses, and booking rules elsewhere.",
        officialLink: "",
        appStoreLink: "",
        googlePlayLink: "",
      },
      {
        icon: "ticket",
        appName: "Local metro apps",
        chineseName: "本地地铁应用",
        category: "Transport",
        bestFor: "City-specific metro QR codes, station notices, and route tools.",
        installBeforeArrival: "optional",
        foreignerFriction: "medium",
        backupTip: "Use metro ticket machines, transit cards, or Alipay transport tools if the local app is confusing.",
        officialLink: "",
        appStoreLink: "",
        googlePlayLink: "",
      },
      {
        icon: "ticket",
        appName: "Attraction mini programs",
        chineseName: "景区小程序",
        category: "Tickets",
        bestFor: "Reservations, timed entry, QR tickets, and attraction-specific booking flows.",
        installBeforeArrival: "optional",
        foreignerFriction: "high",
        backupTip: "Book major attractions through an English-friendly platform or hotel help when passport entry is tricky.",
        officialLink: "",
        appStoreLink: "",
        googlePlayLink: "",
      },
    ],
  },
];
