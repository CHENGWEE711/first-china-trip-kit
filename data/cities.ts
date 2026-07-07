export type ChineseAddress = {
  label: string;
  english: string;
  chinese: string;
};

export type City = {
  id: string;
  slug: string;
  cityName: string;
  chineseName: string;
  province: string;
  bestFor: string[];
  recommendedDays: string;
  bestTimeToVisit: string;
  lastUpdated: string;
  intro: string;
  topAttractions: string[];
  localFoods: string[];
  transportTips: string[];
  whereToStay: string[];
  commonMistakes: string[];
  usefulChineseAddresses: ChineseAddress[];
  seoTitle: string;
  seoDescription: string;
};

export const cities: City[] = [
  {
    id: "city-shanghai",
    slug: "shanghai",
    cityName: "Shanghai",
    chineseName: "上海",
    province: "Shanghai Municipality",
    bestFor: ["First-timers", "Food", "Night views", "Transit stopovers"],
    recommendedDays: "3-4 days",
    bestTimeToVisit: "March to May and October to early December for mild weather and clearer skies.",
    lastUpdated: "2026-07-08",
    intro:
      "Shanghai is China's easiest first landing point for many foreign travelers: international flights, simple metro connections, excellent hotels, and a mix of historic lanes, futuristic skylines, shopping streets, and day trips to water towns.",
    topAttractions: [
      "The Bund and Huangpu River skyline",
      "Yu Garden and Old City area",
      "Former French Concession streets",
      "Shanghai Museum East or Shanghai Museum",
      "Tianzifang and Xintiandi",
      "Zhujiajiao water town day trip",
    ],
    localFoods: [
      "Xiaolongbao soup dumplings",
      "Shengjianbao pan-fried buns",
      "Scallion oil noodles",
      "Braised pork belly",
      "Crab roe noodles in autumn",
    ],
    transportTips: [
      "Use Metro Line 2 for many airport, railway, and central city connections.",
      "Shanghai is a strong place to set up Alipay, WeChat Pay, and eSIM/SIM basics before traveling deeper into China.",
      "Taxis are convenient late at night, but ride-hailing inside Alipay or DiDi is easier than street hailing.",
    ],
    whereToStay: [
      "People's Square for first-time convenience and metro access.",
      "Jing'an for restaurants, boutiques, and a more local city feel.",
      "The Bund or Lujiazui for skyline hotels and premium views.",
      "Xujiahui for better value with strong transport links.",
    ],
    commonMistakes: [
      "Trying to visit every skyline viewpoint in one day instead of choosing one river view and one neighborhood walk.",
      "Assuming international cards work everywhere without setting up mobile payment first.",
      "Underestimating traffic time between Pudong Airport and central hotels.",
    ],
    usefulChineseAddresses: [
      {
        label: "The Bund",
        english: "Zhongshan East 1st Road, Huangpu District, Shanghai",
        chinese: "上海市黄浦区中山东一路 外滩",
      },
      {
        label: "Shanghai Hongqiao Railway Station",
        english: "1500 Shengui Road, Minhang District, Shanghai",
        chinese: "上海市闵行区申贵路1500号 上海虹桥站",
      },
      {
        label: "Yu Garden",
        english: "279 Yuyuan Old Street, Huangpu District, Shanghai",
        chinese: "上海市黄浦区豫园老街279号 豫园",
      },
      {
        label: "People's Square",
        english: "People's Square, Huangpu District, Shanghai",
        chinese: "上海市黄浦区 人民广场",
      },
      {
        label: "Shanghai Pudong International Airport",
        english: "Pudong New Area, Shanghai",
        chinese: "上海市浦东新区 上海浦东国际机场",
      },
    ],
    seoTitle: "Shanghai Travel Guide for First-Time Visitors | First China Trip Kit",
    seoDescription:
      "Plan 3 to 4 days in Shanghai with top attractions, local foods, transport tips, hotel areas, common mistakes, and useful Chinese addresses.",
  },
  {
    id: "city-beijing",
    slug: "beijing",
    cityName: "Beijing",
    chineseName: "北京",
    province: "Beijing Municipality",
    bestFor: ["History", "Great Wall", "Museums", "Classic China"],
    recommendedDays: "3-5 days",
    bestTimeToVisit: "April, May, September, and October for comfortable weather and better walking conditions.",
    lastUpdated: "2026-07-08",
    intro:
      "Beijing is the best city for understanding imperial China, modern politics, and grand-scale landmarks. It rewards slower planning because major sights are large, security checks take time, and museum reservations matter.",
    topAttractions: [
      "Forbidden City",
      "Tian'anmen Square",
      "Temple of Heaven",
      "Summer Palace",
      "Mutianyu or Jinshanling Great Wall",
      "Hutong neighborhoods around Shichahai",
    ],
    localFoods: [
      "Peking duck",
      "Zhajiangmian noodles",
      "Jianbing breakfast crepes",
      "Mongolian hot pot",
      "Tanghulu candied hawthorn",
    ],
    transportTips: [
      "The metro is usually faster than taxis for central sightseeing.",
      "Book Forbidden City and popular museum tickets in advance whenever possible.",
      "For the Great Wall, consider a private transfer or reputable small-group day trip to avoid confusing bus connections.",
    ],
    whereToStay: [
      "Dongcheng for historic sights and hutong walks.",
      "Wangfujing for first-timers who want central hotels and shopping.",
      "Sanlitun for nightlife, international dining, and embassies.",
      "Qianmen for a traditional atmosphere near major landmarks.",
    ],
    commonMistakes: [
      "Planning Forbidden City, Summer Palace, and Great Wall on the same day.",
      "Forgetting passport checks at major sights.",
      "Leaving the Great Wall trip too late in the itinerary during peak travel periods.",
    ],
    usefulChineseAddresses: [
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
        label: "Beijing South Railway Station",
        english: "12 Yongwai Avenue, Fengtai District, Beijing",
        chinese: "北京市丰台区永外大街12号 北京南站",
      },
      {
        label: "Summer Palace",
        english: "19 Xinjian Gongmen Road, Haidian District, Beijing",
        chinese: "北京市海淀区新建宫门路19号 颐和园",
      },
      {
        label: "Mutianyu Great Wall",
        english: "Mutianyu Village, Bohai Town, Huairou District, Beijing",
        chinese: "北京市怀柔区渤海镇慕田峪村 慕田峪长城",
      },
    ],
    seoTitle: "Beijing Travel Guide for Foreign Visitors | First China Trip Kit",
    seoDescription:
      "A practical Beijing guide covering the Forbidden City, Great Wall, local foods, best hotel areas, transport tips, and mistakes to avoid.",
  },
  {
    id: "city-xian",
    slug: "xian",
    cityName: "Xi'an",
    chineseName: "西安",
    province: "Shaanxi",
    bestFor: ["Terracotta Warriors", "Ancient history", "Street food", "Short add-ons"],
    recommendedDays: "2-3 days",
    bestTimeToVisit: "April to June and September to October for pleasant temperatures and good walking weather.",
    lastUpdated: "2026-07-08",
    intro:
      "Xi'an is compact, atmospheric, and easy to pair with Beijing. The Terracotta Warriors are the headline, but the city wall, Muslim Quarter, pagodas, and noodle culture make it more than a one-sight stop.",
    topAttractions: [
      "Terracotta Warriors",
      "Xi'an City Wall",
      "Muslim Quarter",
      "Big Wild Goose Pagoda",
      "Shaanxi History Museum",
      "Bell Tower and Drum Tower",
    ],
    localFoods: [
      "Biangbiang noodles",
      "Roujiamo meat sandwich",
      "Yangrou paomo lamb soup with bread",
      "Liangpi cold noodles",
      "Persimmon cakes",
    ],
    transportTips: [
      "High-speed trains connect Xi'an well with Beijing, Chengdu, and Luoyang.",
      "The Terracotta Warriors are outside the city; allow half a day including transit.",
      "The metro covers major railway stations and many central hotel areas.",
    ],
    whereToStay: [
      "Inside or near the City Wall for atmosphere and walkability.",
      "Bell Tower area for first-time convenience.",
      "Xiaozhai for shopping, metro access, and modern hotels.",
    ],
    commonMistakes: [
      "Treating the Terracotta Warriors as a quick city-center museum visit.",
      "Skipping evening city wall views when the weather is good.",
      "Eating only in the busiest Muslim Quarter lane and missing quieter side streets.",
    ],
    usefulChineseAddresses: [
      {
        label: "Terracotta Warriors",
        english: "Qinling North Road, Lintong District, Xi'an, Shaanxi",
        chinese: "陕西省西安市临潼区秦陵北路 秦始皇帝陵博物院",
      },
      {
        label: "Xi'an North Railway Station",
        english: "Yuan Shuo Road, Weiyang District, Xi'an, Shaanxi",
        chinese: "陕西省西安市未央区元朔路 西安北站",
      },
      {
        label: "Xi'an City Wall South Gate",
        english: "Yongning Gate, Beilin District, Xi'an, Shaanxi",
        chinese: "陕西省西安市碑林区永宁门 西安城墙南门",
      },
      {
        label: "Big Wild Goose Pagoda",
        english: "Yanta Road, Yanta District, Xi'an, Shaanxi",
        chinese: "陕西省西安市雁塔区雁塔路 大雁塔",
      },
      {
        label: "Shaanxi History Museum",
        english: "91 Xiaozhai East Road, Yanta District, Xi'an, Shaanxi",
        chinese: "陕西省西安市雁塔区小寨东路91号 陕西历史博物馆",
      },
    ],
    seoTitle: "Xi'an Travel Guide: Terracotta Warriors, Food, and Itinerary Tips",
    seoDescription:
      "Plan a 2 to 3 day Xi'an trip with Terracotta Warriors logistics, city wall ideas, local foods, hotel areas, and Chinese addresses.",
  },
  {
    id: "city-chengdu",
    slug: "chengdu",
    cityName: "Chengdu",
    chineseName: "成都",
    province: "Sichuan",
    bestFor: ["Pandas", "Spicy food", "Tea houses", "Relaxed city life"],
    recommendedDays: "3-4 days",
    bestTimeToVisit: "March to June and September to November for mild weather; winter is quieter but damp.",
    lastUpdated: "2026-07-08",
    intro:
      "Chengdu is one of China's most enjoyable slow-travel cities. It is famous for pandas and Sichuan food, but its real appeal is the pace: tea houses, parks, hot pot dinners, and easy day trips.",
    topAttractions: [
      "Chengdu Research Base of Giant Panda Breeding",
      "People's Park tea houses",
      "Wenshu Monastery",
      "Kuanzhai Alley",
      "Jinli Street",
      "Leshan Giant Buddha day trip",
    ],
    localFoods: [
      "Sichuan hot pot",
      "Mapo tofu",
      "Dan dan noodles",
      "Chuan chuan skewers",
      "Zhong dumplings",
    ],
    transportTips: [
      "Visit the panda base early in the morning when pandas are most active.",
      "Chengdu's metro is modern and useful for most central areas.",
      "High-speed trains make Leshan and Mount Emei possible as day or overnight trips.",
    ],
    whereToStay: [
      "Chunxi Road and Taikoo Li for dining, shopping, and central access.",
      "Tianfu Square for metro convenience.",
      "Wenshu Monastery area for a quieter, traditional feel.",
    ],
    commonMistakes: [
      "Arriving at the panda base late in the day.",
      "Ordering very spicy hot pot without asking for a split broth.",
      "Packing the schedule too tightly for a city that is best enjoyed slowly.",
    ],
    usefulChineseAddresses: [
      {
        label: "Panda Base",
        english: "1375 Panda Avenue, Chenghua District, Chengdu, Sichuan",
        chinese: "四川省成都市成华区熊猫大道1375号 成都大熊猫繁育研究基地",
      },
      {
        label: "Chengdu East Railway Station",
        english: "Qionglaishan Road, Chenghua District, Chengdu, Sichuan",
        chinese: "四川省成都市成华区邛崃山路 成都东站",
      },
      {
        label: "People's Park",
        english: "12 Shaocheng Road, Qingyang District, Chengdu, Sichuan",
        chinese: "四川省成都市青羊区少城路12号 人民公园",
      },
      {
        label: "Wenshu Monastery",
        english: "66 Wenshuyuan Street, Qingyang District, Chengdu, Sichuan",
        chinese: "四川省成都市青羊区文殊院街66号 文殊院",
      },
      {
        label: "Taikoo Li Chengdu",
        english: "8 Zhongshamao Street, Jinjiang District, Chengdu, Sichuan",
        chinese: "四川省成都市锦江区中纱帽街8号 成都远洋太古里",
      },
    ],
    seoTitle: "Chengdu Travel Guide for Pandas, Hot Pot, and Easy Day Trips",
    seoDescription:
      "Plan Chengdu with panda base tips, Sichuan food recommendations, best hotel areas, metro advice, and mistakes first-time visitors should avoid.",
  },
  {
    id: "city-hangzhou",
    slug: "hangzhou",
    cityName: "Hangzhou",
    chineseName: "杭州",
    province: "Zhejiang",
    bestFor: ["West Lake", "Tea culture", "Romantic walks", "Shanghai add-ons"],
    recommendedDays: "2-3 days",
    bestTimeToVisit: "March to May for spring greenery and September to November for comfortable weather.",
    lastUpdated: "2026-07-08",
    intro:
      "Hangzhou is a graceful lake city with gardens, temples, tea fields, and refined food. It is one of the easiest high-speed rail add-ons from Shanghai and works well for travelers who want a softer pace.",
    topAttractions: [
      "West Lake",
      "Lingyin Temple",
      "Longjing tea fields",
      "Hefang Street",
      "China National Tea Museum",
      "Grand Canal area",
    ],
    localFoods: [
      "West Lake vinegar fish",
      "Dongpo pork",
      "Longjing shrimp",
      "Beggar's chicken",
      "Lotus root starch dessert",
    ],
    transportTips: [
      "High-speed trains from Shanghai often take about one hour.",
      "West Lake is best explored by walking, cycling, boat, and short taxi hops rather than one long loop on foot.",
      "Avoid peak weekend traffic around the lake when possible.",
    ],
    whereToStay: [
      "Near West Lake for scenery and evening walks.",
      "Wulin Square for shopping, metro access, and value.",
      "Longjing or Lingyin area for a quiet retreat feel.",
    ],
    commonMistakes: [
      "Trying to walk the entire lake loop in hot weather.",
      "Visiting on a major holiday without booking hotels early.",
      "Treating Hangzhou as only a day trip when tea fields and temples deserve time.",
    ],
    usefulChineseAddresses: [
      {
        label: "West Lake",
        english: "West Lake Scenic Area, Xihu District, Hangzhou, Zhejiang",
        chinese: "浙江省杭州市西湖区 西湖风景名胜区",
      },
      {
        label: "Lingyin Temple",
        english: "1 Fayun Lane, Xihu District, Hangzhou, Zhejiang",
        chinese: "浙江省杭州市西湖区法云弄1号 灵隐寺",
      },
      {
        label: "Hangzhou East Railway Station",
        english: "1 Tiancheng Road, Shangcheng District, Hangzhou, Zhejiang",
        chinese: "浙江省杭州市上城区天城路1号 杭州东站",
      },
      {
        label: "Longjing Tea Fields",
        english: "Longjing Village, Xihu District, Hangzhou, Zhejiang",
        chinese: "浙江省杭州市西湖区 龙井村",
      },
      {
        label: "Hefang Street",
        english: "Hefang Street, Shangcheng District, Hangzhou, Zhejiang",
        chinese: "浙江省杭州市上城区 河坊街",
      },
    ],
    seoTitle: "Hangzhou Travel Guide: West Lake, Tea Fields, and Shanghai Add-On Tips",
    seoDescription:
      "A practical Hangzhou guide for foreign visitors with West Lake planning, tea culture, food, transport, hotels, and useful Chinese addresses.",
  },
  {
    id: "city-suzhou",
    slug: "suzhou",
    cityName: "Suzhou",
    chineseName: "苏州",
    province: "Jiangsu",
    bestFor: ["Classical gardens", "Canals", "Slow walks", "Shanghai day trips"],
    recommendedDays: "1-2 days",
    bestTimeToVisit: "April to May and September to November for garden colors and pleasant temperatures.",
    lastUpdated: "2026-07-08",
    intro:
      "Suzhou is known for classical gardens, canals, silk history, and refined Jiangnan culture. It is close enough to Shanghai for a day trip, but an overnight stay makes the old town feel calmer.",
    topAttractions: [
      "Humble Administrator's Garden",
      "Lingering Garden",
      "Pingjiang Road",
      "Suzhou Museum",
      "Tiger Hill",
      "Shantang Street",
    ],
    localFoods: [
      "Suzhou-style noodles",
      "Squirrel-shaped mandarin fish",
      "Sweet braised pork",
      "Osmanthus rice cakes",
      "Seasonal river shrimp",
    ],
    transportTips: [
      "Trains from Shanghai to Suzhou are frequent, but check which Suzhou station your train uses.",
      "The old town is best explored by metro, walking, and short rides.",
      "Garden tickets can sell out during holiday peaks.",
    ],
    whereToStay: [
      "Pingjiang Road area for canals, cafes, and evening walks.",
      "Near Suzhou Railway Station for a quick overnight.",
      "Jinji Lake for modern hotels and business comfort.",
    ],
    commonMistakes: [
      "Visiting too many gardens back-to-back instead of choosing two and slowing down.",
      "Confusing Suzhou Railway Station with Suzhou North Railway Station.",
      "Doing only a rushed day trip on a holiday weekend.",
    ],
    usefulChineseAddresses: [
      {
        label: "Humble Administrator's Garden",
        english: "178 Northeast Street, Gusu District, Suzhou, Jiangsu",
        chinese: "江苏省苏州市姑苏区东北街178号 拙政园",
      },
      {
        label: "Suzhou Railway Station",
        english: "27 Suzhan Road, Gusu District, Suzhou, Jiangsu",
        chinese: "江苏省苏州市姑苏区苏站路27号 苏州站",
      },
      {
        label: "Pingjiang Road",
        english: "Pingjiang Road Historic District, Gusu District, Suzhou, Jiangsu",
        chinese: "江苏省苏州市姑苏区 平江路历史街区",
      },
      {
        label: "Suzhou Museum",
        english: "204 Northeast Street, Gusu District, Suzhou, Jiangsu",
        chinese: "江苏省苏州市姑苏区东北街204号 苏州博物馆",
      },
      {
        label: "Lingering Garden",
        english: "338 Liuyuan Road, Gusu District, Suzhou, Jiangsu",
        chinese: "江苏省苏州市姑苏区留园路338号 留园",
      },
    ],
    seoTitle: "Suzhou Travel Guide: Gardens, Canals, and Shanghai Day Trip Planning",
    seoDescription:
      "Plan Suzhou with classical garden highlights, canal walks, food ideas, transport from Shanghai, hotel areas, and common mistakes.",
  },
  {
    id: "city-guangzhou",
    slug: "guangzhou",
    cityName: "Guangzhou",
    chineseName: "广州",
    province: "Guangdong",
    bestFor: ["Cantonese food", "Business travel", "Dim sum", "Pearl River views"],
    recommendedDays: "2-3 days",
    bestTimeToVisit: "October to December for drier weather and comfortable temperatures.",
    lastUpdated: "2026-07-08",
    intro:
      "Guangzhou is one of China's great food capitals and a practical southern gateway. It blends Cantonese heritage, modern towers, leafy neighborhoods, wholesale markets, and easy links to Shenzhen, Hong Kong, and Macau.",
    topAttractions: [
      "Canton Tower",
      "Chen Clan Ancestral Hall",
      "Shamian Island",
      "Yuexiu Park",
      "Pearl River night cruise",
      "Beijing Road pedestrian street",
    ],
    localFoods: [
      "Dim sum",
      "Roast goose",
      "Wonton noodles",
      "Claypot rice",
      "Double-skin milk pudding",
    ],
    transportTips: [
      "The metro is extensive and reliable for most visitor areas.",
      "Guangzhou South Railway Station is the main high-speed rail hub but can be far from central hotels.",
      "Many local restaurants are busiest at lunch for dim sum; go earlier to avoid waits.",
    ],
    whereToStay: [
      "Tianhe for modern hotels, malls, and transport.",
      "Zhujiang New Town for skyline views and business convenience.",
      "Yuexiu for older neighborhoods and food access.",
    ],
    commonMistakes: [
      "Booking a hotel far from a metro line in a very spread-out city.",
      "Eating only in malls and missing traditional dim sum halls.",
      "Underestimating humid weather in summer.",
    ],
    usefulChineseAddresses: [
      {
        label: "Canton Tower",
        english: "222 Yuejiang West Road, Haizhu District, Guangzhou, Guangdong",
        chinese: "广东省广州市海珠区阅江西路222号 广州塔",
      },
      {
        label: "Guangzhou South Railway Station",
        english: "Shibi Street, Panyu District, Guangzhou, Guangdong",
        chinese: "广东省广州市番禺区石壁街道 广州南站",
      },
      {
        label: "Chen Clan Ancestral Hall",
        english: "34 Enlong Li, Liwan District, Guangzhou, Guangdong",
        chinese: "广东省广州市荔湾区恩龙里34号 陈家祠",
      },
      {
        label: "Shamian Island",
        english: "Shamian Island, Liwan District, Guangzhou, Guangdong",
        chinese: "广东省广州市荔湾区 沙面岛",
      },
      {
        label: "Beijing Road Pedestrian Street",
        english: "Beijing Road, Yuexiu District, Guangzhou, Guangdong",
        chinese: "广东省广州市越秀区 北京路步行街",
      },
    ],
    seoTitle: "Guangzhou Travel Guide: Cantonese Food, Transport, and First-Time Tips",
    seoDescription:
      "Discover Guangzhou with dim sum recommendations, Canton Tower ideas, best hotel areas, metro advice, and Chinese addresses for travelers.",
  },
  {
    id: "city-shenzhen",
    slug: "shenzhen",
    cityName: "Shenzhen",
    chineseName: "深圳",
    province: "Guangdong",
    bestFor: ["Modern China", "Design", "Hong Kong connections", "Theme parks"],
    recommendedDays: "1-2 days",
    bestTimeToVisit: "October to March for lower humidity and comfortable city walks.",
    lastUpdated: "2026-07-08",
    intro:
      "Shenzhen is a young, fast, design-driven city bordering Hong Kong. It is best for travelers interested in modern China, technology districts, contemporary culture, shopping, and easy Greater Bay Area connections.",
    topAttractions: [
      "OCT Loft Creative Culture Park",
      "Shenzhen Bay Park",
      "Ping An Finance Center viewpoint",
      "Dafen Oil Painting Village",
      "Splendid China Folk Village",
      "Sea World Shekou",
    ],
    localFoods: [
      "Cantonese dim sum",
      "Chaoshan beef hot pot",
      "Seafood in Shekou",
      "Claypot rice",
      "Mango desserts",
    ],
    transportTips: [
      "The metro is the easiest way to move between districts.",
      "Check border-crossing rules carefully if combining Shenzhen with Hong Kong.",
      "Shenzhen North Railway Station is a major high-speed rail hub for Guangzhou, Hong Kong, and beyond.",
    ],
    whereToStay: [
      "Futian for business, border access, and central transport.",
      "Nanshan for tech campuses, OCT Loft, and Shekou.",
      "Luohu for older shopping areas and Hong Kong border convenience.",
    ],
    commonMistakes: [
      "Assuming Shenzhen feels like a traditional tourist city.",
      "Ignoring long cross-city travel times between districts.",
      "Forgetting to check visa or entry rules before crossing to or from Hong Kong.",
    ],
    usefulChineseAddresses: [
      {
        label: "Shenzhen North Railway Station",
        english: "Minzhi Street, Longhua District, Shenzhen, Guangdong",
        chinese: "广东省深圳市龙华区民治街道 深圳北站",
      },
      {
        label: "OCT Loft",
        english: "OCT Loft, Nanshan District, Shenzhen, Guangdong",
        chinese: "广东省深圳市南山区 华侨城创意文化园",
      },
      {
        label: "Shenzhen Bay Park",
        english: "Shenzhen Bay Park, Nanshan District, Shenzhen, Guangdong",
        chinese: "广东省深圳市南山区 深圳湾公园",
      },
      {
        label: "Futian Checkpoint",
        english: "Futian Port, Futian District, Shenzhen, Guangdong",
        chinese: "广东省深圳市福田区 福田口岸",
      },
      {
        label: "Sea World Shekou",
        english: "Sea World, Shekou, Nanshan District, Shenzhen, Guangdong",
        chinese: "广东省深圳市南山区蛇口 海上世界",
      },
    ],
    seoTitle: "Shenzhen Travel Guide for Modern China, Design, and Hong Kong Add-Ons",
    seoDescription:
      "Plan Shenzhen with modern attractions, food areas, metro tips, border notes, hotel districts, and useful Chinese addresses.",
  },
];

export function getCityBySlug(slug: string) {
  return cities.find((city) => city.slug === slug);
}
