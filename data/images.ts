export type ContentImage = {
  src: string;
  alt: string;
  caption?: string;
  creditId: string;
  position?: string;
  placement?: "before-steps" | "before-common-mistakes" | "before-details";
};

export type GuideVisuals = {
  featuredImage: ContentImage;
  heroImage: ContentImage;
  inlineImages: ContentImage[];
};

export type DestinationVisuals = {
  cardImage: ContentImage;
  heroImage: ContentImage;
  attractionImages: ContentImage[];
  foodImage?: ContentImage;
  transportImage?: ContentImage;
};

export type ItineraryVisuals = {
  cardImage: ContentImage;
  heroImage: ContentImage;
  routeImages: ContentImage[];
  dailyImages?: ContentImage[];
};

const image = (
  src: string,
  alt: string,
  creditId: string,
  caption?: string,
  position?: string,
): ContentImage => ({ src, alt, creditId, caption, position });

export const cityImages: Record<string, ContentImage> = {
  shanghai: image("/images/cities/shanghai-bund-skyline.webp", "Shanghai skyline across the Huangpu River near the Bund", "unsplash-shanghai-bund"),
  beijing: image("/images/cities/beijing-forbidden-city-courtyard.webp", "Visitors walking through a courtyard in Beijing's Forbidden City", "unsplash-beijing-forbidden-city"),
  xian: image("/images/cities/xian-city-wall-sunset.webp", "Xi'an Ancient City Wall and watchtowers at sunset", "unsplash-xian-city-wall"),
  chengdu: image("/images/cities/chengdu-panda-base.webp", "Giant panda eating bamboo at the Chengdu panda base", "unsplash-chengdu-panda"),
  suzhou: image("/images/cities/suzhou-lingering-garden.webp", "Traditional architecture and trees in Suzhou's Lingering Garden", "unsplash-suzhou-garden"),
  shenzhen: image("/images/cities/shenzhen-skyline.webp", "Modern Shenzhen skyline viewed from a green hillside", "unsplash-shenzhen-skyline", undefined, "center 55%"),
};

export const editorialImages = {
  hero: cityImages.beijing,
  payments: image("/images/travel/phone-scanning-qr.webp", "Traveler scanning a QR code with a smartphone", "pexels-7289717"),
  transport: image("/images/travel/china-high-speed-rail-platform.webp", "China high-speed train waiting at a modern railway platform", "unsplash-china-hsr-platform"),
  station: image("/images/travel/china-railway-station-interior.webp", "Interior platform at a modern railway station in China", "unsplash-china-station"),
  airportPhone: image("/images/guides/china-esim-airport-phone.webp", "Traveler holding a smartphone beside luggage in an airport terminal", "pexels-15068317"),
  packing: image("/images/guides/china-packing-essentials.webp", "Passport, tickets, map and travel essentials arranged before a trip", "pexels-5405596"),
};

export const publicPageImages = {
  homeHero: image(
    "/images/home/phase-d/first-trip-phone-metro-hero.webp",
    "Traveler checking a smartphone on a Shanghai metro platform",
    "phase-d-unsplash-home-shanghai-metro-phone",
    "A real Shanghai metro scene connects phone preparation with the moment a first-time visitor needs it.",
    "center 48%",
  ),
};

const guideImage = (
  src: string,
  alt: string,
  creditId: string,
  caption: string,
): ContentImage => image(src, alt, creditId, caption);

const paymentScene = guideImage("/images/travel/phone-scanning-qr.webp", "Person scanning a merchant QR code with a smartphone", "pexels-7289717", "Scanning a merchant QR code with a smartphone.");
const paymentTerminal = guideImage("/images/guides/alipay-cafe-qr.webp", "QR payment sign displayed at a cafe counter", "pexels-33792076", "A merchant QR payment option at a cafe counter.");
const qrPhone = guideImage("/images/travel/phone-qr-code.webp", "Smartphone displaying a QR code for scanning", "pexels-278430", "QR codes are used for both merchant-scan and customer-scan payment flows.");
const qrScan = guideImage("/images/travel/phone-scanning-qr.webp", "Person scanning a QR code with a smartphone", "pexels-7289717", "Scanning a QR code with a smartphone.");
const airportPhone = guideImage("/images/guides/china-esim-airport-phone.webp", "Traveler holding a smartphone beside luggage in an airport terminal", "pexels-15068317", "Test mobile data before leaving the airport terminal.");
const train = guideImage("/images/guides/high-speed-train-china.webp", "Chinese high-speed train at a station platform", "pexels-7494174", "A Chinese high-speed train at the platform.");
const station = guideImage("/images/travel/china-railway-station-interior.webp", "Modern railway station platform in China", "unsplash-china-station", "Confirm the exact station name before travel day.");
const packing = guideImage("/images/guides/china-packing-essentials.webp", "Passport, tickets, map and compact travel essentials arranged for packing", "pexels-5405596", "Keep documents, power and offline backups together before departure.");
const passportLaptop = guideImage("/images/guides/china-preflight-checklist.webp", "Passport and boarding passes arranged on a laptop before departure", "pexels-7310015", "Save confirmations offline as part of the final pre-flight check.");
const restaurantPhone = guideImage("/images/guides/chinese-phrases-restaurant-phone.webp", "Diner using a smartphone at a restaurant table", "pexels-13639635", "A short translated sentence on screen can be easier than spoken audio in a busy restaurant.");
const foodStall = guideImage("/images/guides/order-food-shanghai-stall.webp", "Cook preparing food at a street stall in Shanghai", "pexels-24349885", "A Shanghai street-food stall with the cooking process visible.");
const airport = guideImage("/images/guides/americans-china-airport-arrivals.webp", "International passengers with luggage inside an airport terminal", "pexels-6726195", "International arrivals should keep passport and onward details accessible.");
const boardingPass = guideImage("/images/guides/visa-free-transit-airport.webp", "Traveler holding a smartphone and boarding pass beside an airport window", "pexels-4606721", "Visa-free transit planning depends on the exact arrival, onward destination and permitted stay.");
const shanghaiStreet = guideImage("/images/guides/shanghai-three-days-street.webp", "Pedestrians on a Shanghai street framed by traditional shops and modern towers", "pexels-35554911", "Shanghai's street-level neighborhoods connect the historic city with its modern skyline.");
const paymentGuideMerchantScan = guideImage("/images/guides/payment-guide-merchant-scan.webp", "Customer holding a smartphone over a merchant QR payment terminal", "pexels-12935064", "Merchant-scan and customer-scan payment flows use different QR code positions.");
const paymentGuideCardSetup = guideImage("/images/guides/payment-guide-card-setup.webp", "Traveler adding a bank card to a payment app on a smartphone", "pexels-28841475", "Set up an international card and a second bank-card backup before departure.");
const paymentGuideBackupKit = guideImage("/images/guides/payment-guide-backup-kit.webp", "Passport, boarding pass and several physical payment cards prepared for travel", "pexels-32642485", "Keep a passport, physical cards and travel documents accessible as payment backups.");

const guideInline = (
  source: ContentImage,
  placement: NonNullable<ContentImage["placement"]>,
  caption = source.caption,
): ContentImage => ({ ...source, placement, caption });

const phaseCPrimaryVisuals = (
  slug: string,
  heroAlt: string,
  cardAlt: string,
  heroCaption: string,
  heroPosition = "center",
  cardPosition = "center",
): Pick<GuideVisuals, "featuredImage" | "heroImage"> => ({
  heroImage: image(
    `/images/guides/phase-c/${slug}/hero.webp`,
    heroAlt,
    `phase-c-${slug}-hero`,
    heroCaption,
    heroPosition,
  ),
  featuredImage: image(
    `/images/guides/phase-c/${slug}/card.webp`,
    cardAlt,
    `phase-c-${slug}-card`,
    undefined,
    cardPosition,
  ),
});

export const guideVisuals: Record<string, GuideVisuals> = {
  "how-to-pay-in-china-as-a-foreigner": {
    ...phaseCPrimaryVisuals(
      "how-to-pay-in-china-as-a-foreigner",
      "Traveler presenting a smartphone QR code at a checkout terminal",
      "Close view of a traveler using a QR payment code at checkout",
      "A real checkout scene showing the customer-presented QR payment flow without a simulated wallet interface.",
      "center 52%",
      "center 54%",
    ),
    inlineImages: [
      guideInline(paymentGuideMerchantScan, "before-steps"),
      guideInline(paymentGuideCardSetup, "before-common-mistakes"),
      guideInline(paymentGuideBackupKit, "before-details"),
    ],
  },
  "best-apps-for-traveling-in-china": {
    ...phaseCPrimaryVisuals(
      "best-apps-for-traveling-in-china",
      "Travelers using smartphones while waiting in a metro station",
      "Two travelers checking phones on a metro platform",
      "Maps, translation, payment and transport tools matter most while moving through real stations and streets.",
      "center 46%",
      "center 48%",
    ),
    inlineImages: [
      guideInline(airportPhone, "before-steps"),
      guideInline(qrPhone, "before-common-mistakes"),
      guideInline(station, "before-details"),
    ],
  },
  "how-to-book-high-speed-trains-in-china": {
    ...phaseCPrimaryVisuals(
      "how-to-book-high-speed-trains-in-china",
      "CRH high-speed train at a platform inside a Chinese railway station",
      "Chinese CRH high-speed train beside a station platform",
      "Chinese high-speed rail is identified by the train, station and platform context—not by a generic overseas train image.",
      "center 48%",
      "center 50%",
    ),
    inlineImages: [
      guideInline(station, "before-steps"),
      guideInline(
        editorialImages.transport,
        "before-details",
        "A CRH train at a Chinese high-speed rail platform reinforces what to look for on travel day.",
      ),
    ],
  },
  "how-to-use-alipay-and-wechat-pay-in-china": {
    ...phaseCPrimaryVisuals(
      "how-to-use-alipay-and-wechat-pay-in-china",
      "Merchant QR payment sign displayed at a cafe counter",
      "QR payment sign positioned beside a cafe checkout",
      "A merchant QR scene introduces the two wallet flows without reproducing an app interface or exposing account details.",
      "center 52%",
      "center 54%",
    ),
    inlineImages: [
      guideInline(qrPhone, "before-steps"),
      guideInline(paymentScene, "before-details"),
    ],
  },
  "china-travel-packing-list": {
    ...phaseCPrimaryVisuals(
      "china-travel-packing-list",
      "Passport, tickets, map and compact travel essentials arranged before packing",
      "Passport and practical travel items arranged on a map",
      "Useful packing imagery focuses on the documents, power and offline backups that belong in the checklist.",
      "center 48%",
      "center 50%",
    ),
    inlineImages: [
      guideInline(passportLaptop, "before-steps"),
      guideInline(paymentGuideBackupKit, "before-details"),
    ],
  },
  "basic-chinese-phrases-for-travelers": {
    ...phaseCPrimaryVisuals(
      "basic-chinese-phrases-for-travelers",
      "Traveler using a smartphone to understand a restaurant setting",
      "Smartphone held above a restaurant table while ordering",
      "The phone-in-context image supports camera translation; the phrase tables carry the exact Chinese text without risky generated lettering.",
      "center 48%",
      "center 50%",
    ),
    inlineImages: [],
  },
  "china-esim-guide-for-tourists": {
    ...phaseCPrimaryVisuals(
      "china-esim-guide-for-tourists",
      "Traveler checking a smartphone beside luggage before leaving an airport",
      "Smartphone held beside airport luggage during connectivity setup",
      "Connectivity is shown as a practical arrival task without an outdated settings screenshot or an implied VPN guarantee.",
      "center 50%",
      "center 50%",
    ),
    inlineImages: [],
  },
  "china-food-ordering-guide": {
    ...phaseCPrimaryVisuals(
      "china-food-ordering-guide",
      "Cook preparing food beneath Chinese menu signs at a Shanghai street stall",
      "Chinese street-food cook working beneath a visible menu",
      "A real Shanghai food stall anchors the guide in an everyday Chinese ordering environment.",
      "center 47%",
      "center 50%",
    ),
    inlineImages: [
      guideInline(restaurantPhone, "before-steps"),
      guideInline(qrScan, "before-details"),
    ],
  },
  "can-americans-travel-to-china-in-2026": {
    ...phaseCPrimaryVisuals(
      "can-americans-travel-to-china-in-2026",
      "International passengers with luggage moving through an airport terminal",
      "International traveler pulling luggage through an airport terminal",
      "The entry-planning theme uses a neutral international terminal scene and does not imply guaranteed admission.",
      "center 50%",
      "center 52%",
    ),
    inlineImages: [
      guideInline(boardingPass, "before-steps"),
      guideInline(passportLaptop, "before-details"),
    ],
  },
  "china-240-hour-visa-free-transit-guide": {
    ...phaseCPrimaryVisuals(
      "china-240-hour-visa-free-transit-guide",
      "Traveler holding a boarding pass beside an airport window during an international transit",
      "Boarding pass held against an airport apron and onward aircraft",
      "The boarding pass and onward aircraft make the transit requirement visible without depicting a fabricated visa or entry stamp.",
      "center 54%",
      "center 52%",
    ),
    inlineImages: [
      guideInline(train, "before-steps"),
      guideInline(passportLaptop, "before-details"),
    ],
  },
  "how-to-use-alipay-in-china-as-a-tourist": {
    ...phaseCPrimaryVisuals(
      "how-to-use-alipay-in-china-as-a-tourist",
      "Smartphone showing a customer QR code for a cashier to scan",
      "Close view of a customer-presented QR payment code",
      "The blue customer-code scene distinguishes this setup guide without claiming to reproduce the current Alipay interface.",
      "center 50%",
      "center 50%",
    ),
    inlineImages: [
      guideInline(qrScan, "before-steps"),
      guideInline(paymentTerminal, "before-details"),
    ],
  },
  "how-to-use-wechat-pay-in-china-as-a-foreigner": {
    ...phaseCPrimaryVisuals(
      "how-to-use-wechat-pay-in-china-as-a-foreigner",
      "Customer using a smartphone while speaking with staff at a cafe counter",
      "Cafe customer holding a phone during a merchant interaction",
      "The merchant-conversation scene emphasizes the social and mini-program context without a simulated WeChat screen.",
      "center 46%",
      "center 48%",
    ),
    inlineImages: [
      guideInline(qrPhone, "before-steps"),
      guideInline(paymentScene, "before-details"),
    ],
  },
  "3-days-in-shanghai-for-first-time-visitors": {
    ...phaseCPrimaryVisuals(
      "3-days-in-shanghai-for-first-time-visitors",
      "Shanghai street framed by historic storefronts and modern towers",
      "Historic Shanghai storefronts beneath the modern city skyline",
      "This itinerary-style Guide intentionally keeps an editorial city image that identifies Shanghai at street level.",
      "center 48%",
      "center 52%",
    ),
    inlineImages: [
      guideInline(
        cityImages.shanghai,
        "before-steps",
        "The Bund and Pudong skyline provide a clear orientation point for a first Shanghai day.",
      ),
      guideInline(foodStall, "before-common-mistakes"),
      guideInline(station, "before-details"),
    ],
  },
  "china-travel-checklist-before-you-fly": {
    ...phaseCPrimaryVisuals(
      "china-travel-checklist-before-you-fly",
      "Passport and boarding passes arranged on a laptop before a flight",
      "Passport and flight documents laid out for a final pre-flight check",
      "A document-led still life clearly separates the final checklist from the broader packing Guide.",
      "center 49%",
      "center 50%",
    ),
    inlineImages: [
      guideInline(packing, "before-steps"),
      guideInline(airport, "before-details"),
    ],
  },
};

const beijingStreet = image("/images/cities/details/beijing-hutong-street.webp", "Pedestrians, scooters and traditional buildings on a Beijing hutong street", "pexels-32067787");
const beijingMarket = image("/images/cities/details/beijing-hutong-market.webp", "Local market stalls and shoppers in a Beijing hutong", "pexels-32664322");
const xianFood = image("/images/cities/details/xian-night-market.webp", "Food stall at a lively Xi'an night market", "pexels-34650024");
const chengduFood = image("/images/cities/details/chengdu-food-vendor.webp", "Street food vendor serving fried snacks in Chengdu", "pexels-5404035");
const chengduStreet = image("/images/cities/details/chengdu-street-transport.webp", "Delivery rider and local shops on a Chengdu street", "pexels-5412818");
const suzhouCanal = image("/images/cities/details/suzhou-canal-lanterns.webp", "Traditional houses and red lanterns beside a canal in Suzhou", "pexels-36466099");
const suzhouFood = image("/images/cities/details/suzhou-street-food.webp", "Street food vendor serving customers in a Suzhou alley", "pexels-19954017");

const phaseDGuangzhouHero = image(
  "/images/cities/phase-d/guangzhou-pearl-river-hero.webp",
  "Canton Tower and the Pearl River across central Guangzhou",
  "phase-d-unsplash-guangzhou-pearl-river",
  "Canton Tower and the Pearl River establish Guangzhou's South China scale.",
  "center 52%",
);
const phaseDGuangzhouCard = image(
  "/images/cities/phase-d/guangzhou-heritage-street-card.webp",
  "Cyclists and pedestrians moving through a heritage street in Guangzhou",
  "phase-d-pexels-guangzhou-heritage-street",
  "A lived-in Guangzhou street shows the city's everyday Cantonese character.",
  "center 52%",
);
const phaseDGuangzhouFood = image(
  "/images/cities/phase-d/guangzhou-dim-sum.webp",
  "Assorted dim sum served in bamboo steamers for a Cantonese yum cha meal",
  "phase-d-pexels-guangzhou-dim-sum",
  "Dim sum in bamboo steamers directly supports Guangzhou's local-food section.",
  "center 52%",
);
const phaseDGuangzhouTransport = image(
  "/images/cities/phase-d/guangzhou-metro.webp",
  "Passengers waiting as a train moves through Guangzhou's Huadiwan metro station",
  "phase-d-unsplash-guangzhou-metro",
  "A documented Guangzhou Metro platform supports practical getting-around advice.",
  "center 54%",
);
const phaseDShenzhenHero = image(
  "/images/cities/phase-d/shenzhen-bay-hero.webp",
  "Shenzhen Bay skyline at twilight beneath dramatic clouds",
  "phase-d-unsplash-shenzhen-bay",
  "Shenzhen Bay at twilight introduces the city's modern coastal scale.",
  "center 54%",
);
const phaseDShenzhenCard = image(
  "/images/cities/phase-d/shenzhen-modern-architecture-card.webp",
  "Contemporary waterfront architecture and public lawn in Shenzhen",
  "phase-d-pexels-shenzhen-modern-architecture",
  "Contemporary public architecture reinforces Shenzhen's design-forward identity.",
  "center 48%",
);
const phaseDShenzhenFood = image(
  "/images/cities/phase-d/shenzhen-chaoshan-hot-pot.webp",
  "Beef and vegetables arranged around a Chaoshan-style hot pot",
  "phase-d-unsplash-shenzhen-chaoshan-hot-pot",
  "Chaoshan beef hot pot is one of the Greater Bay Area foods listed for Shenzhen.",
  "center 52%",
);
const phaseDShenzhenTransport = image(
  "/images/cities/phase-d/shenzhen-metro.webp",
  "Passengers using smartphones inside a Shenzhen Metro train",
  "phase-d-unsplash-shenzhen-metro",
  "A documented Shenzhen Metro interior supports the city's cross-district transport guidance.",
  "center 50%",
);
const phaseDSuzhouHero = image(
  "/images/cities/phase-d/suzhou-pingjiang-canal-hero.webp",
  "Canal boats, whitewashed houses and red lanterns in Suzhou's old town",
  "phase-d-unsplash-suzhou-pingjiang-canal",
  "A working canal scene makes Suzhou immediately distinct from nearby Hangzhou and Shanghai.",
  "center 50%",
);

const classicChinaDay1 = image("/images/itineraries/classic-china/day-1-beijing-hutong.webp", "A quiet leafy hutong lane in Beijing with bicycles and local residents", "unsplash-classic-day1-beijing-hutong");
const classicChinaDay2 = image("/images/itineraries/classic-china/day-2-forbidden-city.webp", "The central courtyard and imperial halls of Beijing's Forbidden City", "unsplash-classic-day2-forbidden-city");
const classicChinaDay3 = image("/images/itineraries/classic-china/day-3-great-wall.webp", "The Great Wall winding across green mountains outside Beijing", "unsplash-classic-day3-great-wall");
const classicChinaDay5 = image("/images/itineraries/classic-china/day-5-terracotta-warriors.webp", "A Terracotta Warrior displayed under museum lighting in Xi'an", "unsplash-classic-day5-terracotta-warriors", undefined, "center 38%");
const classicChinaDay6 = image("/images/itineraries/classic-china/day-6-shanghai-bund.webp", "Shanghai's Pudong skyline reflected across the Huangpu River at night", "unsplash-classic-day6-shanghai-bund", undefined, "center 48%");
const classicChinaDay7 = image("/images/itineraries/classic-china/day-7-yu-garden.webp", "Traditional pavilions and water at Shanghai's Yu Garden", "unsplash-classic-day7-yu-garden");
const classicChinaDay8 = image("/images/itineraries/classic-china/day-8-hangzhou-west-lake.webp", "Traditional pavilion and lotus water at West Lake in Hangzhou", "unsplash-classic-day8-hangzhou-west-lake", undefined, "center 48%");
const classicChinaDay9 = image("/images/itineraries/classic-china/day-9-shanghai-museum.webp", "The historic clock-tower building of Shanghai History Museum", "unsplash-classic-day9-shanghai-museum", undefined, "center 42%");
const classicChinaDay10 = image("/images/itineraries/classic-china/day-10-airport-departure.webp", "Travelers pulling luggage through a modern airport departure hall", "unsplash-classic-day10-airport-departure");

const beijingFourDayHero = image(
  "/images/itineraries/4-days-beijing/hero-temple-of-heaven.webp",
  "Temple of Heaven in Beijing beneath a wide summer sky",
  "unsplash-temple-heaven-hongjin-wang",
  undefined,
  "center 48%",
);
const beijingFourDayCard = image(
  "/images/itineraries/4-days-beijing/card-forbidden-city-moat.webp",
  "Forbidden City walls, moat, and corner tower in Beijing",
  "unsplash-forbidden-city-allan-n",
  undefined,
  "center 48%",
);
const beijingFourDaySummerPalace = image(
  "/images/itineraries/4-days-beijing/day-4-summer-palace.webp",
  "Longevity Hill and lakeside architecture at Beijing's Summer Palace",
  "wikimedia-summer-palace-xiquinhosilva",
  undefined,
  "center 44%",
);
const beijingXianFiveDayHero = image(
  "/images/itineraries/5-days-beijing-xian/hero-xian-bell-tower.webp",
  "Xi'an Bell Tower illuminated at night in the city center",
  "unsplash-xian-bell-tower-jun-huang",
  undefined,
  "center 45%",
);
const beijingXianFiveDayCard = image(
  "/images/itineraries/5-days-beijing-xian/card-terracotta-army.webp",
  "Rows of Terracotta Warriors inside the excavation hall near Xi'an",
  "wikimedia-terracotta-army-xiquinhosilva",
  undefined,
  "center 48%",
);
const beijingXianFiveDayTerracottaPit = image(
  "/images/itineraries/5-days-beijing-xian/day-5-terracotta-pit.webp",
  "Wide view across the Terracotta Army excavation pits near Xi'an",
  "wikimedia-terracotta-pit-will-clayton",
  undefined,
  "center 50%",
);
const easternChinaSevenDayHero = image(
  "/images/itineraries/7-days-shanghai-hangzhou-suzhou/hero-west-lake-sunset.webp",
  "West Lake and the Hangzhou skyline at sunset",
  "wikimedia-west-lake-sunset-wanderingchina",
  undefined,
  "center 52%",
);
const easternChinaSevenDayCard = image(
  "/images/itineraries/7-days-shanghai-hangzhou-suzhou/card-suzhou-garden.webp",
  "Traditional pavilion and landscaped pond in a classical Suzhou garden",
  "wikimedia-suzhou-garden-jason-zhang",
  undefined,
  "center 48%",
);
const longjingTeaFields = image(
  "/images/itineraries/eastern-china/longjing-tea-fields.webp",
  "Terraced Longjing tea fields in the hills outside Hangzhou",
  "wikimedia-longjing-tea-peter-burian",
  undefined,
  "center 50%",
);
const easternChinaYuGarden = image(
  "/images/itineraries/eastern-china/yu-garden-shanghai.webp",
  "Tingtao Tower, stonework, and a pond inside Shanghai's Yu Garden",
  "wikimedia-yu-garden-stefan-fussan",
  undefined,
  "center 48%",
);
const transitTenDayHero = image(
  "/images/itineraries/240-hour-transit/hero-pudong-airport.webp",
  "Modern departure concourse inside Shanghai Pudong International Airport",
  "unsplash-pudong-airport-declan-sun",
  undefined,
  "center 48%",
);
const transitTenDayCard = image(
  "/images/itineraries/240-hour-transit/card-passport-luggage.webp",
  "Passport, boarding pass, and luggage prepared for an international transit journey",
  "wikimedia-passport-luggage-aatu-dorochenko",
  undefined,
  "center 50%",
);
const transitWestLake = image(
  "/images/itineraries/240-hour-transit/day-6-west-lake.webp",
  "Panoramic West Lake shoreline and hills in Hangzhou",
  "wikimedia-west-lake-panorama-bjoertvedt",
  undefined,
  "center 50%",
);
const transitPudongSkyline = image(
  "/images/itineraries/240-hour-transit/day-8-pudong-skyline.webp",
  "Pudong skyline across the Huangpu River in modern Shanghai",
  "wikimedia-pudong-2017-king-of-hearts",
  undefined,
  "center 48%",
);
const transitZhujiajiao = image(
  "/images/itineraries/240-hour-transit/day-9-zhujiajiao.webp",
  "Canal, stone bridge, and waterside houses in Zhujiajiao water town",
  "wikimedia-zhujiajiao-chensiyuan",
  undefined,
  "center 48%",
);

export const destinationVisuals: Record<string, DestinationVisuals> = {
  shanghai: { cardImage: shanghaiStreet, heroImage: cityImages.shanghai, attractionImages: [easternChinaYuGarden, shanghaiStreet], foodImage: foodStall, transportImage: editorialImages.station },
  beijing: { cardImage: beijingStreet, heroImage: beijingFourDayHero, attractionImages: [cityImages.beijing, beijingFourDaySummerPalace], foodImage: beijingMarket, transportImage: editorialImages.station },
  xian: { cardImage: beijingXianFiveDayCard, heroImage: beijingXianFiveDayHero, attractionImages: [cityImages.xian, beijingXianFiveDayTerracottaPit], foodImage: xianFood, transportImage: editorialImages.transport },
  chengdu: { cardImage: chengduStreet, heroImage: cityImages.chengdu, attractionImages: [cityImages.chengdu, chengduStreet], foodImage: chengduFood, transportImage: editorialImages.transport },
  hangzhou: { cardImage: longjingTeaFields, heroImage: easternChinaSevenDayHero, attractionImages: [transitWestLake, longjingTeaFields], foodImage: longjingTeaFields, transportImage: editorialImages.transport },
  suzhou: { cardImage: easternChinaSevenDayCard, heroImage: phaseDSuzhouHero, attractionImages: [suzhouCanal, cityImages.suzhou], foodImage: suzhouFood, transportImage: editorialImages.transport },
  guangzhou: { cardImage: phaseDGuangzhouCard, heroImage: phaseDGuangzhouHero, attractionImages: [phaseDGuangzhouHero, phaseDGuangzhouCard], foodImage: phaseDGuangzhouFood, transportImage: phaseDGuangzhouTransport },
  shenzhen: { cardImage: phaseDShenzhenCard, heroImage: phaseDShenzhenHero, attractionImages: [phaseDShenzhenCard, cityImages.shenzhen], foodImage: phaseDShenzhenFood, transportImage: phaseDShenzhenTransport },
};

export const itineraryVisuals: Record<string, ItineraryVisuals> = {
  "3-days-in-shanghai": { cardImage: cityImages.shanghai, heroImage: shanghaiStreet, routeImages: [cityImages.shanghai, foodStall, shanghaiStreet] },
  "3-days-in-beijing": { cardImage: beijingStreet, heroImage: cityImages.beijing, routeImages: [beijingStreet, beijingMarket, cityImages.beijing] },
  "4-days-in-beijing": {
    cardImage: beijingFourDayCard,
    heroImage: beijingFourDayHero,
    routeImages: [beijingStreet],
    dailyImages: [beijingStreet, cityImages.beijing, classicChinaDay3, beijingFourDaySummerPalace],
  },
  "5-days-beijing-and-xian": {
    cardImage: beijingXianFiveDayCard,
    heroImage: beijingXianFiveDayHero,
    routeImages: [train],
    dailyImages: [beijingMarket, cityImages.beijing, classicChinaDay3, train, beijingXianFiveDayTerracottaPit],
  },
  "7-days-shanghai-hangzhou-suzhou": {
    cardImage: easternChinaSevenDayCard,
    heroImage: easternChinaSevenDayHero,
    routeImages: [train],
    dailyImages: [cityImages.shanghai, easternChinaYuGarden, shanghaiStreet, train, longjingTeaFields, cityImages.suzhou, station],
  },
  "10-days-classic-china-itinerary": {
    cardImage: classicChinaDay3,
    heroImage: classicChinaDay3,
    routeImages: [train],
    dailyImages: [
      classicChinaDay1,
      classicChinaDay2,
      classicChinaDay3,
      cityImages.xian,
      classicChinaDay5,
      classicChinaDay6,
      classicChinaDay7,
      classicChinaDay8,
      classicChinaDay9,
      classicChinaDay10,
    ],
  },
  "240-hour-visa-free-china-itinerary": {
    cardImage: transitTenDayCard,
    heroImage: transitTenDayHero,
    routeImages: [train],
    dailyImages: [airport, cityImages.shanghai, shanghaiStreet, train, longjingTeaFields, transitWestLake, suzhouCanal, transitPudongSkyline, transitZhujiajiao, classicChinaDay10],
  },
};
