export type ContentImage = {
  src: string;
  alt: string;
  caption?: string;
  creditId: string;
  position?: string;
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
  hangzhou: image("/images/cities/hangzhou-west-lake.webp", "Pagoda and lotus-covered water at West Lake in Hangzhou", "unsplash-hangzhou-west-lake", undefined, "center 58%"),
  suzhou: image("/images/cities/suzhou-lingering-garden.webp", "Traditional architecture and trees in Suzhou's Lingering Garden", "unsplash-suzhou-garden"),
  guangzhou: image("/images/cities/guangzhou-canton-tower.webp", "Guangzhou skyline with Canton Tower", "unsplash-guangzhou-canton-tower", undefined, "center 56%"),
  shenzhen: image("/images/cities/shenzhen-skyline.webp", "Modern Shenzhen skyline viewed from a green hillside", "unsplash-shenzhen-skyline", undefined, "center 55%"),
};

export const editorialImages = {
  hero: cityImages.beijing,
  payments: image("/images/travel/phone-scanning-qr.webp", "Traveler scanning a QR code with a smartphone", "pexels-7289717"),
  transport: image("/images/travel/china-high-speed-rail-platform.webp", "China high-speed train waiting at a modern railway platform", "unsplash-china-hsr-platform"),
  food: image("/images/essentials/chinese-dumplings-restaurant.webp", "Chinese dumplings served in bamboo steamers at a restaurant", "unsplash-chinese-dumplings"),
  station: image("/images/travel/china-railway-station-interior.webp", "Interior platform at a modern railway station in China", "unsplash-china-station"),
  airportPhone: image("/images/guides/china-esim-airport-phone.webp", "Traveler holding a smartphone beside luggage in an airport terminal", "pexels-15068317"),
  packing: image("/images/guides/china-packing-essentials.webp", "Passport, tickets, map and travel essentials arranged before a trip", "pexels-5405596"),
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
const metroPhone = guideImage("/images/guides/best-apps-metro-phone.webp", "Travelers using smartphones while waiting in a metro station", "pexels-31216218", "Maps, translation and payment tools are most useful when they are ready before the first metro ride.");
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
const cafePhone = guideImage("/images/guides/wechat-cafe-phone.webp", "Customer using a smartphone while speaking with cafe staff", "pexels-31713078", "A separate cafe phone-payment scenario without a simulated wallet screen.");
const paymentGuideHero = guideImage("/images/guides/payment-guide-qr-checkout.webp", "Traveler presenting a smartphone QR code at a payment terminal", "pexels-12935051", "A traveler presents a QR payment code at the checkout terminal.");
const paymentGuideMerchantScan = guideImage("/images/guides/payment-guide-merchant-scan.webp", "Customer holding a smartphone over a merchant QR payment terminal", "pexels-12935064", "Merchant-scan and customer-scan payment flows use different QR code positions.");
const paymentGuideCardSetup = guideImage("/images/guides/payment-guide-card-setup.webp", "Traveler adding a bank card to a payment app on a smartphone", "pexels-28841475", "Set up an international card and a second bank-card backup before departure.");
const paymentGuideBackupKit = guideImage("/images/guides/payment-guide-backup-kit.webp", "Passport, boarding pass and several physical payment cards prepared for travel", "pexels-32642485", "Keep a passport, physical cards and travel documents accessible as payment backups.");

export const guideVisuals: Record<string, GuideVisuals> = {
  "how-to-pay-in-china-as-a-foreigner": { featuredImage: paymentGuideHero, heroImage: paymentGuideHero, inlineImages: [paymentGuideMerchantScan, paymentGuideCardSetup, paymentGuideBackupKit] },
  "best-apps-for-traveling-in-china": { featuredImage: metroPhone, heroImage: metroPhone, inlineImages: [airportPhone, qrPhone, station] },
  "how-to-book-high-speed-trains-in-china": { featuredImage: train, heroImage: train, inlineImages: [station, packing, airportPhone] },
  "how-to-use-alipay-and-wechat-pay-in-china": { featuredImage: paymentTerminal, heroImage: paymentTerminal, inlineImages: [qrPhone, cafePhone, paymentScene] },
  "china-travel-packing-list": { featuredImage: packing, heroImage: packing, inlineImages: [passportLaptop, airportPhone, station] },
  "basic-chinese-phrases-for-travelers": { featuredImage: restaurantPhone, heroImage: restaurantPhone, inlineImages: [foodStall, metroPhone, airportPhone] },
  "china-esim-guide-for-tourists": { featuredImage: airportPhone, heroImage: airportPhone, inlineImages: [metroPhone, qrPhone, passportLaptop] },
  "china-food-ordering-guide": { featuredImage: foodStall, heroImage: foodStall, inlineImages: [restaurantPhone, qrScan, paymentTerminal] },
  "can-americans-travel-to-china-in-2026": { featuredImage: airport, heroImage: airport, inlineImages: [boardingPass, passportLaptop, airportPhone] },
  "china-240-hour-visa-free-transit-guide": { featuredImage: boardingPass, heroImage: boardingPass, inlineImages: [train, shanghaiStreet, passportLaptop] },
  "how-to-use-alipay-in-china-as-a-tourist": { featuredImage: qrPhone, heroImage: qrPhone, inlineImages: [qrScan, paymentTerminal, cafePhone] },
  "how-to-use-wechat-pay-in-china-as-a-foreigner": { featuredImage: cafePhone, heroImage: cafePhone, inlineImages: [qrPhone, paymentTerminal, qrScan] },
  "3-days-in-shanghai-for-first-time-visitors": { featuredImage: shanghaiStreet, heroImage: shanghaiStreet, inlineImages: [cityImages.shanghai, foodStall, station] },
  "china-travel-checklist-before-you-fly": { featuredImage: passportLaptop, heroImage: passportLaptop, inlineImages: [packing, airport, airportPhone] },
};

const beijingStreet = image("/images/cities/details/beijing-hutong-street.webp", "Pedestrians, scooters and traditional buildings on a Beijing hutong street", "pexels-32067787");
const beijingMarket = image("/images/cities/details/beijing-hutong-market.webp", "Local market stalls and shoppers in a Beijing hutong", "pexels-32664322");
const xianFood = image("/images/cities/details/xian-night-market.webp", "Food stall at a lively Xi'an night market", "pexels-34650024");
const chengduFood = image("/images/cities/details/chengdu-food-vendor.webp", "Street food vendor serving fried snacks in Chengdu", "pexels-5404035");
const chengduStreet = image("/images/cities/details/chengdu-street-transport.webp", "Delivery rider and local shops on a Chengdu street", "pexels-5412818");
const suzhouMarket = image("/images/cities/details/suzhou-market-street.webp", "Traditional shops and food stalls along a market street in Suzhou", "pexels-37248396");
const suzhouCanal = image("/images/cities/details/suzhou-canal-lanterns.webp", "Traditional houses and red lanterns beside a canal in Suzhou", "pexels-36466099");
const suzhouFood = image("/images/cities/details/suzhou-street-food.webp", "Street food vendor serving customers in a Suzhou alley", "pexels-19954017");

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
  shanghai: { cardImage: cityImages.shanghai, heroImage: cityImages.shanghai, attractionImages: [shanghaiStreet, cityImages.shanghai], foodImage: foodStall, transportImage: editorialImages.station },
  beijing: { cardImage: cityImages.beijing, heroImage: cityImages.beijing, attractionImages: [beijingStreet, cityImages.beijing], foodImage: beijingMarket, transportImage: editorialImages.station },
  xian: { cardImage: cityImages.xian, heroImage: cityImages.xian, attractionImages: [cityImages.xian, xianFood], foodImage: xianFood, transportImage: editorialImages.transport },
  chengdu: { cardImage: cityImages.chengdu, heroImage: cityImages.chengdu, attractionImages: [cityImages.chengdu, chengduStreet], foodImage: chengduFood, transportImage: chengduStreet },
  hangzhou: { cardImage: cityImages.hangzhou, heroImage: cityImages.hangzhou, attractionImages: [cityImages.hangzhou, airportPhone], foodImage: restaurantPhone, transportImage: editorialImages.transport },
  suzhou: { cardImage: cityImages.suzhou, heroImage: cityImages.suzhou, attractionImages: [suzhouCanal, suzhouMarket], foodImage: suzhouFood, transportImage: editorialImages.transport },
  guangzhou: { cardImage: cityImages.guangzhou, heroImage: cityImages.guangzhou, attractionImages: [cityImages.guangzhou, metroPhone], foodImage: editorialImages.food, transportImage: editorialImages.station },
  shenzhen: { cardImage: cityImages.shenzhen, heroImage: cityImages.shenzhen, attractionImages: [cityImages.shenzhen, metroPhone], foodImage: restaurantPhone, transportImage: airportPhone },
};

export const itineraryVisuals: Record<string, ItineraryVisuals> = {
  "3-days-in-shanghai": { cardImage: cityImages.shanghai, heroImage: shanghaiStreet, routeImages: [cityImages.shanghai, foodStall, shanghaiStreet] },
  "3-days-in-beijing": { cardImage: beijingStreet, heroImage: cityImages.beijing, routeImages: [beijingStreet, beijingMarket, cityImages.beijing] },
  "4-days-in-beijing": {
    cardImage: beijingFourDayCard,
    heroImage: beijingFourDayHero,
    routeImages: [beijingStreet],
    dailyImages: [beijingStreet, classicChinaDay2, classicChinaDay3, beijingFourDaySummerPalace],
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
    dailyImages: [cityImages.shanghai, classicChinaDay7, shanghaiStreet, train, longjingTeaFields, cityImages.suzhou, station],
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
