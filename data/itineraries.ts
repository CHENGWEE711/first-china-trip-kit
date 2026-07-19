export type DayPlan = {
  day: number;
  title: string;
  morning: string;
  afternoon: string;
  evening: string;
  transport: string;
  food: string;
  budgetTip: string;
  notes: string;
};

export type Itinerary = {
  id: string;
  slug: string;
  title: string;
  durationDays: number;
  cities: string[];
  targetUser: string;
  budgetLevel: string;
  summary: string;
  dayByDayPlan: DayPlan[];
  estimatedCost: string;
  tips: string[];
  seoTitle: string;
  seoDescription: string;
  cardImage: ContentImage;
  heroImage: ContentImage;
  routeImages: ContentImage[];
  dailyImages?: ContentImage[];
};

type ItineraryWithoutVisuals = Omit<Itinerary, "cardImage" | "heroImage" | "routeImages" | "dailyImages">;

const itineraryEntries: ItineraryWithoutVisuals[] = [
  {
    id: "itinerary-3-days-shanghai",
    slug: "3-days-in-shanghai",
    title: "3 Days in Shanghai",
    durationDays: 3,
    cities: ["Shanghai"],
    targetUser: "First-time visitors who want a polished city introduction with food, skyline views, and easy transport.",
    budgetLevel: "Mid-range",
    summary:
      "A confident first China itinerary with classic Shanghai highlights, local food, modern neighborhoods, and a gentle day-trip option.",
    estimatedCost: "USD 380-780 per person excluding international flights, depending on hotel level and dining style.",
    tips: [
      "Stay near People's Square, Jing'an, or Xujiahui for easy metro access.",
      "Set up mobile payment before your first restaurant meal.",
      "Use the first evening for The Bund if weather is clear.",
    ],
    dayByDayPlan: [
      {
        day: 1,
        title: "Arrival, Old City, and The Bund",
        morning: "09:30-11:00 if already in town: take a light walk around People's Square or Nanjing Road. If arriving today, use this block for airport transfer and check-in.",
        afternoon: "14:00-16:30 visit Yu Garden and nearby Old City lanes, then return to the hotel for a short rest before sunset.",
        evening: "18:00-20:00 walk The Bund and view the Pudong skyline across the river. Keep dinner close to the river or your hotel.",
        transport: "Use Metro Line 2 or taxis from the airport depending on luggage and arrival time.",
        food: "Try xiaolongbao and scallion oil noodles near the Old City.",
        budgetTip: "The Bund walk is free; save paid viewpoints for a clear day.",
        notes: "Keep the first day flexible because airport transfer and payment setup can take longer than expected.",
      },
      {
        day: 2,
        title: "Museums, French Concession, and Local Dining",
        morning: "09:30-11:30 visit Shanghai Museum East or Shanghai Museum with a timed reservation if required.",
        afternoon: "13:30-16:30 explore the Former French Concession, Fuxing Park, and small boutiques around Anfu Road.",
        evening: "18:00-20:30 book a casual Shanghainese dinner, then have a drink or dessert in Jing'an if you still have energy.",
        transport: "Metro plus short ride-hailing trips work best between neighborhoods.",
        food: "Order shengjianbao, braised pork, and seasonal greens.",
        budgetTip: "Lunch sets in malls are often good value and easy for English-speaking travelers.",
        notes: "Do not overfill the day; Shanghai rewards wandering between planned stops.",
      },
      {
        day: 3,
        title: "Pudong Viewpoint or Water Town Add-On",
        morning: "09:30-11:30 choose a Pudong observation deck, West Bund art stop, or one relaxed shopping area.",
        afternoon: "13:00-17:00 take a half-day trip to Zhujiajiao or stay central around Xintiandi and nearby lanes.",
        evening: "18:30-20:30 finish with a river cruise, skyline drink, or relaxed dinner near your hotel.",
        transport: "For Zhujiajiao, combine metro or a private transfer with local walking.",
        food: "Try crab roe noodles in season or a modern Chinese tasting menu.",
        budgetTip: "Private transfers cost more but can be worth it for a short water-town visit.",
        notes: "If departing by train, confirm whether you leave from Hongqiao or Shanghai Railway Station.",
      },
    ],
    seoTitle: "3 Days in Shanghai Itinerary for First-Time Visitors",
    seoDescription:
      "A practical 3-day Shanghai itinerary with The Bund, Yu Garden, French Concession, food ideas, transport advice, and budget tips.",
  },
  {
    id: "itinerary-3-days-beijing",
    slug: "3-days-in-beijing",
    title: "3 Days in Beijing",
    durationDays: 3,
    cities: ["Beijing"],
    targetUser: "Travelers who want the Forbidden City, Great Wall, and core imperial Beijing without rushing too hard.",
    budgetLevel: "Mid-range",
    summary:
      "A focused Beijing itinerary balancing major historic landmarks, a Great Wall day, hutong walks, and classic local meals.",
    estimatedCost: "USD 420-880 per person excluding international flights, with the Great Wall transfer as the biggest variable.",
    tips: [
      "Carry your passport for major attractions.",
      "Reserve Forbidden City tickets early when possible.",
      "Choose Mutianyu for an easier Great Wall day or Jinshanling for a more scenic hike.",
    ],
    dayByDayPlan: [
      {
        day: 1,
        title: "Temple of Heaven and Hutongs",
        morning: "Start at the Temple of Heaven and watch local morning routines in the park.",
        afternoon: "Explore Qianmen or Dashilar, then continue to Shichahai hutongs.",
        evening: "Eat Peking duck or zhajiangmian near your hotel.",
        transport: "Use the metro for central sights and ride-hailing for late evening returns.",
        food: "Try jianbing for breakfast and Peking duck for dinner.",
        budgetTip: "A shared duck dinner can be better value than ordering too many dishes for two people.",
        notes: "Keep the first day lighter if arriving from a long flight.",
      },
      {
        day: 2,
        title: "Forbidden City and Jingshan Park",
        morning: "Visit Tian'anmen Square area and enter the Forbidden City with your passport and reservation.",
        afternoon: "Exit north to Jingshan Park for the classic palace overview, then rest.",
        evening: "Walk Wangfujing or Sanlitun depending on your hotel area.",
        transport: "Metro stations are useful, but expect security checks and walking distance.",
        food: "Snack on tanghulu or try hot pot in the evening.",
        budgetTip: "Skip expensive souvenir streets near major exits; buy small gifts later in calmer areas.",
        notes: "The Forbidden City is large; comfortable shoes matter more than an ambitious second museum.",
      },
      {
        day: 3,
        title: "Great Wall Day",
        morning: "Depart early for Mutianyu or Jinshanling Great Wall.",
        afternoon: "Spend several hours walking the Wall, then return to Beijing before evening traffic peaks.",
        evening: "Have a simple noodle dinner and pack for your next city.",
        transport: "A private car or reputable small-group transfer is easiest for first-time visitors.",
        food: "Bring water and snacks; eat a proper meal after returning to the city.",
        budgetTip: "Shared transfers often balance cost and convenience better than public buses.",
        notes: "Weather changes quickly on the Wall; bring layers outside summer.",
      },
    ],
    seoTitle: "3 Days in Beijing Itinerary: Forbidden City, Great Wall, and Hutongs",
    seoDescription:
      "Plan 3 days in Beijing with a day-by-day route, Great Wall logistics, food ideas, transport notes, and budget tips.",
  },
  {
    id: "itinerary-4-days-beijing",
    slug: "4-days-in-beijing",
    title: "4 Days in Beijing",
    durationDays: 4,
    cities: ["Beijing"],
    targetUser:
      "First-time visitors who want Beijing's imperial landmarks, hutongs, museums, and Great Wall logistics without forcing everything into three days.",
    budgetLevel: "Mid-range",
    summary:
      "A practical Beijing first-trip kit with a softer pace: one arrival day, one Forbidden City core day, one Great Wall day, and one flexible museum or neighborhood day.",
    estimatedCost: "USD 560-1,100 per person excluding international flights, depending on hotel level and Great Wall transfer style.",
    tips: [
      "Book Forbidden City and any high-demand museum entry before the trip when possible.",
      "Keep the Great Wall as its own day so you do not rush back into another major sight.",
      "Stay in Dongcheng, Wangfujing, Qianmen, or Sanlitun depending on your preferred pace.",
    ],
    dayByDayPlan: [
      {
        day: 1,
        title: "Arrival, Temple of Heaven, and Easy Dinner",
        morning: "Arrive, transfer to your hotel, and save the Chinese hotel address offline.",
        afternoon: "If energy allows, visit Temple of Heaven or take a short hutong walk.",
        evening: "Eat noodles, dumplings, or a simple local dinner near your hotel.",
        transport: "Airport Express, metro, or ride-hailing depending on luggage and arrival time.",
        food: "Try zhajiangmian, jianbing, or dumplings for an easy first meal.",
        budgetTip: "A central hotel costs more but saves meaningful time across four sightseeing days.",
        notes: "Use this day for payment, maps, and Chinese address setup before major sights.",
      },
      {
        day: 2,
        title: "Forbidden City, Jingshan, and Central Beijing",
        morning: "Visit Tian'anmen area and enter the Forbidden City with your passport and reservation.",
        afternoon: "Exit north to Jingshan Park, then rest before dinner.",
        evening: "Walk Wangfujing, Qianmen, or Shichahai depending on your hotel area.",
        transport: "Use metro plus walking, but expect security checks and long pedestrian routes.",
        food: "Plan a Peking duck dinner or a lighter hot pot meal.",
        budgetTip: "Book official attraction tickets where possible and avoid impulse tours at exits.",
        notes: "The Forbidden City is large; do not add another major museum unless you have high energy.",
      },
      {
        day: 3,
        title: "Great Wall Day",
        morning: "Leave early for Mutianyu or Jinshanling Great Wall.",
        afternoon: "Spend several hours on the Wall, then return to Beijing before evening traffic peaks.",
        evening: "Keep dinner simple and rest your legs.",
        transport: "A reputable transfer or private car is easiest for a first China trip.",
        food: "Bring water and snacks; eat a full meal after returning to the city.",
        budgetTip: "A cable car adds cost but saves energy for travelers with limited time.",
        notes: "Weather changes quickly outside the city, so bring layers outside summer.",
      },
      {
        day: 4,
        title: "Summer Palace, Hutongs, or Museum Buffer",
        morning: "Choose Summer Palace for scenery, a museum for culture, or hutongs for a slower city day.",
        afternoon: "Use the afternoon as a flexible buffer for shopping, tea, or a missed reservation.",
        evening: "Pack, confirm onward transport, and save your departure station or airport address.",
        transport: "Metro works well, but use ride-hailing if a long cross-city transfer would waste energy.",
        food: "Try Mongolian hot pot, Beijing snacks, or a casual mall restaurant before departure.",
        budgetTip: "One flexible day prevents the Great Wall or Forbidden City from making the whole route feel rushed.",
        notes: "Do not schedule a tight train or flight immediately after a far northwest sight.",
      },
    ],
    seoTitle: "4 Days in Beijing Itinerary for First-Time Visitors",
    seoDescription:
      "A practical 4-day Beijing itinerary kit with Forbidden City, Great Wall, Temple of Heaven, hutongs, food, transport, and booking reminders.",
  },
  {
    id: "itinerary-5-days-beijing-xian",
    slug: "5-days-beijing-and-xian",
    title: "5 Days Beijing and Xi'an",
    durationDays: 5,
    cities: ["Beijing", "Xi'an"],
    targetUser: "Travelers who want China's most famous imperial and ancient history highlights in under a week.",
    budgetLevel: "Mid-range",
    summary:
      "A compact history-focused route connecting Beijing's imperial landmarks and Great Wall with Xi'an's Terracotta Warriors and old city atmosphere.",
    estimatedCost: "USD 650-1,250 per person excluding international flights.",
    tips: [
      "Book the Beijing to Xi'an high-speed train or flight early during holidays.",
      "Avoid scheduling the Great Wall on the same day as an intercity transfer.",
      "Stay near central metro areas in both cities to reduce taxi dependence.",
    ],
    dayByDayPlan: [
      {
        day: 1,
        title: "Arrive in Beijing",
        morning: "Arrive and settle into your hotel.",
        afternoon: "Visit Temple of Heaven or take a gentle hutong walk depending on energy.",
        evening: "Eat Peking duck or noodles near your hotel.",
        transport: "Airport Express, metro, or ride-hailing depending on luggage.",
        food: "Jianbing, zhajiangmian, or duck are easy first-day choices.",
        budgetTip: "Choose a central hotel to save time over the next two days.",
        notes: "Do mobile payment setup before leaving the hotel area.",
      },
      {
        day: 2,
        title: "Forbidden City Core Day",
        morning: "Visit Tian'anmen area and the Forbidden City.",
        afternoon: "Climb Jingshan Park and continue to Shichahai if energy allows.",
        evening: "Relax in Wangfujing, Qianmen, or Sanlitun.",
        transport: "Metro plus walking; major sights involve long pedestrian routes.",
        food: "Try hot pot or Beijing-style snacks.",
        budgetTip: "Book attraction tickets directly where possible to avoid unnecessary markups.",
        notes: "Carry your passport and allow time for security checks.",
      },
      {
        day: 3,
        title: "Great Wall",
        morning: "Leave early for Mutianyu Great Wall.",
        afternoon: "Return to Beijing and rest before dinner.",
        evening: "Pack and prepare for tomorrow's transfer.",
        transport: "Use a transfer or tour that picks up near your hotel.",
        food: "Simple local dinner after returning to the city.",
        budgetTip: "A cable car adds cost but saves energy on a short itinerary.",
        notes: "Do not plan a major museum after the Great Wall.",
      },
      {
        day: 4,
        title: "Transfer to Xi'an and City Wall",
        morning: "Take a high-speed train or flight to Xi'an.",
        afternoon: "Check in and visit the City Wall near South Gate.",
        evening: "Explore the Muslim Quarter and Bell Tower area.",
        transport: "High-speed rail is comfortable; flights may save time depending on fares and hotel locations.",
        food: "Try roujiamo, biangbiang noodles, and liangpi.",
        budgetTip: "Train station meals are convenient but city-center noodles are better value.",
        notes: "Confirm whether your train arrives at Xi'an North Railway Station.",
      },
      {
        day: 5,
        title: "Terracotta Warriors",
        morning: "Visit the Terracotta Warriors outside Xi'an.",
        afternoon: "Return for Big Wild Goose Pagoda or Shaanxi History Museum if tickets are available.",
        evening: "Depart or stay one extra night for a slower finish.",
        transport: "Use a private car, guided transfer, or official tourist bus.",
        food: "Have a noodle lunch after the museum visit.",
        budgetTip: "A guide can add context at the Terracotta Warriors and may be worth the cost.",
        notes: "Allow enough time for airport or train departure; the warriors are not in the city center.",
      },
    ],
    seoTitle: "5 Days in Beijing and Xi'an Itinerary for First-Time China Travelers",
    seoDescription:
      "A 5-day Beijing and Xi'an route covering the Forbidden City, Great Wall, Terracotta Warriors, local foods, transport, and budget tips.",
  },
  {
    id: "itinerary-7-days-shanghai-hangzhou-suzhou",
    slug: "7-days-shanghai-hangzhou-suzhou",
    title: "7 Days Shanghai Hangzhou Suzhou",
    durationDays: 7,
    cities: ["Shanghai", "Hangzhou", "Suzhou"],
    targetUser: "Travelers who want an elegant eastern China route with big-city energy, lake scenery, tea culture, and classical gardens.",
    budgetLevel: "Mid-range to premium",
    summary:
      "A comfortable Yangtze River Delta itinerary using short high-speed rail hops from Shanghai to Hangzhou and Suzhou.",
    estimatedCost: "USD 850-1,650 per person excluding international flights.",
    tips: [
      "Pack light because the route uses train stations and short city transfers.",
      "Avoid major Chinese holidays if you want peaceful gardens and lake walks.",
      "Use Shanghai as the international arrival or departure anchor.",
    ],
    dayByDayPlan: [
      {
        day: 1,
        title: "Arrive in Shanghai",
        morning: "Arrive and check in.",
        afternoon: "Walk Nanjing Road or People's Square after setting up payment.",
        evening: "See The Bund skyline.",
        transport: "Metro Line 2 or ride-hailing from Pudong or Hongqiao.",
        food: "Xiaolongbao and simple Shanghainese dishes.",
        budgetTip: "Choose a hotel with direct metro access to reduce taxi costs.",
        notes: "Keep the day easy after your international flight.",
      },
      {
        day: 2,
        title: "Classic Shanghai",
        morning: "Visit Yu Garden and Old City streets.",
        afternoon: "Explore the Former French Concession.",
        evening: "Dinner in Jing'an or Xintiandi.",
        transport: "Metro plus short rides.",
        food: "Shengjianbao, scallion oil noodles, and seasonal vegetables.",
        budgetTip: "Neighborhood restaurants away from major sightseeing exits offer better value.",
        notes: "Use this day to get comfortable with metro and payment apps.",
      },
      {
        day: 3,
        title: "Shanghai Modern Culture",
        morning: "Visit Shanghai Museum East, West Bund, or M50 depending on interest.",
        afternoon: "Cross to Pudong for skyline views.",
        evening: "Optional Huangpu River cruise.",
        transport: "Metro and ferry are both useful for river crossings.",
        food: "Try a modern Chinese restaurant or dumpling shop.",
        budgetTip: "Pick either a paid observation deck or a river cruise; both may feel redundant.",
        notes: "Reserve popular museums before the day starts.",
      },
      {
        day: 4,
        title: "Train to Hangzhou",
        morning: "Take a high-speed train to Hangzhou and check in.",
        afternoon: "Walk part of West Lake and visit a lakeside garden.",
        evening: "Dinner near Wulin or West Lake.",
        transport: "Use Hangzhou East Railway Station and metro or taxi to your hotel.",
        food: "Dongpo pork and Longjing shrimp.",
        budgetTip: "Lake-area hotels cost more; Wulin Square can be better value.",
        notes: "Do not try to loop all of West Lake on foot.",
      },
      {
        day: 5,
        title: "Tea Fields and Temples",
        morning: "Visit Lingyin Temple early.",
        afternoon: "Explore Longjing tea fields and the China National Tea Museum.",
        evening: "Relax around Hefang Street or the Grand Canal area.",
        transport: "Use taxis for tea-field hops; they are not always metro-friendly.",
        food: "Try Hangzhou-style vegetables and lotus root dessert.",
        budgetTip: "Tea tastings vary widely in price; ask before sitting down.",
        notes: "Carry mosquito repellent in warmer months.",
      },
      {
        day: 6,
        title: "Train to Suzhou",
        morning: "High-speed train to Suzhou.",
        afternoon: "Visit Suzhou Museum and Humble Administrator's Garden.",
        evening: "Walk Pingjiang Road or Shantang Street.",
        transport: "Check station names carefully before booking.",
        food: "Suzhou-style noodles and seasonal snacks.",
        budgetTip: "One or two gardens are enough; do not pay for every garden in one day.",
        notes: "Overnighting in Suzhou makes evening canal streets more pleasant.",
      },
      {
        day: 7,
        title: "Suzhou Gardens and Return",
        morning: "Visit Lingering Garden or Tiger Hill.",
        afternoon: "Return to Shanghai by train for departure or final night.",
        evening: "Easy final dinner near your Shanghai hotel.",
        transport: "Frequent trains connect Suzhou and Shanghai.",
        food: "Keep dinner simple if you have a next-day flight.",
        budgetTip: "Book flexible train times if you prefer a slower morning.",
        notes: "Allow extra time if transferring from a railway station to Pudong Airport.",
      },
    ],
    seoTitle: "7 Days in Shanghai, Hangzhou, and Suzhou Itinerary",
    seoDescription:
      "Plan one week in eastern China with Shanghai, Hangzhou, and Suzhou by high-speed train, including food, hotels, transport, and budget tips.",
  },
  {
    id: "itinerary-10-days-classic-china",
    slug: "10-days-classic-china-itinerary",
    title: "10 Days Classic China Itinerary",
    durationDays: 10,
    cities: ["Beijing", "Xi'an", "Shanghai", "Hangzhou"],
    targetUser: "First-time visitors who want a balanced classic route with history, food, modern cities, and scenic downtime.",
    budgetLevel: "Mid-range",
    summary:
      "A strong first China route: Beijing for imperial history and the Great Wall, Xi'an for ancient heritage, Shanghai for modern China, and Hangzhou for lake scenery.",
    estimatedCost: "USD 1,350-2,650 per person excluding international flights.",
    tips: [
      "Open-jaw flights can save backtracking: arrive Beijing and depart Shanghai if possible.",
      "Use high-speed rail for Beijing-Xi'an or Xi'an-Shanghai only if the schedule and fares make sense; flights may be better for longer hops.",
      "Add one buffer evening before the international departure.",
    ],
    dayByDayPlan: [
      {
        day: 1,
        title: "Arrive in Beijing",
        morning: "Arrive and transfer to your hotel.",
        afternoon: "Light hutong walk or park visit.",
        evening: "Simple local dinner and early rest.",
        transport: "Airport Express, metro, or ride-hailing.",
        food: "Zhajiangmian or dumplings.",
        budgetTip: "Central hotels cost more but reduce wasted time.",
        notes: "Set up payments, maps, translation, and train apps.",
      },
      {
        day: 2,
        title: "Forbidden City",
        morning: "Visit Tian'anmen area and the Forbidden City.",
        afternoon: "Jingshan Park and Shichahai hutongs.",
        evening: "Peking duck dinner.",
        transport: "Metro and walking.",
        food: "Peking duck and Beijing snacks.",
        budgetTip: "Book timed tickets early.",
        notes: "Passport checks are common at major sights.",
      },
      {
        day: 3,
        title: "Great Wall",
        morning: "Depart for Mutianyu or Jinshanling.",
        afternoon: "Return to Beijing.",
        evening: "Pack for Xi'an.",
        transport: "Private or group transfer.",
        food: "Bring snacks; eat dinner back in the city.",
        budgetTip: "Shared transfers can be the best value.",
        notes: "Keep the evening quiet after a long day outdoors.",
      },
      {
        day: 4,
        title: "Beijing to Xi'an",
        morning: "Transfer to Xi'an by train or flight.",
        afternoon: "Walk Xi'an City Wall.",
        evening: "Muslim Quarter food walk.",
        transport: "High-speed rail is comfortable; flights may save time.",
        food: "Roujiamo and biangbiang noodles.",
        budgetTip: "Compare door-to-door time, not only train versus flight duration.",
        notes: "Confirm arrival station before booking hotel transfer.",
      },
      {
        day: 5,
        title: "Terracotta Warriors",
        morning: "Visit the Terracotta Warriors.",
        afternoon: "Shaanxi History Museum or Big Wild Goose Pagoda.",
        evening: "Bell Tower area.",
        transport: "Guided transfer or official tourist bus.",
        food: "Liangpi and lamb soup with bread.",
        budgetTip: "A guide is useful here if you enjoy historical context.",
        notes: "The site is outside Xi'an; plan half a day.",
      },
      {
        day: 6,
        title: "Xi'an to Shanghai",
        morning: "Fly or take a train to Shanghai.",
        afternoon: "Check in and rest.",
        evening: "The Bund skyline walk.",
        transport: "Airport or railway transfer plus metro.",
        food: "Xiaolongbao or scallion oil noodles.",
        budgetTip: "Flights can be more efficient for this long leg.",
        notes: "Do not schedule a major museum after the transfer.",
      },
      {
        day: 7,
        title: "Shanghai Old and New",
        morning: "Yu Garden and Old City.",
        afternoon: "Former French Concession.",
        evening: "Jing'an or Xintiandi dinner.",
        transport: "Metro and ride-hailing.",
        food: "Shengjianbao and braised pork.",
        budgetTip: "Use lunch specials in business districts.",
        notes: "Shanghai is a good shopping and laundry reset point.",
      },
      {
        day: 8,
        title: "Hangzhou Day or Overnight",
        morning: "High-speed train to Hangzhou.",
        afternoon: "West Lake walk and Lingyin Temple or tea fields.",
        evening: "Return to Shanghai or stay overnight in Hangzhou.",
        transport: "High-speed rail plus taxi around lake/tea areas.",
        food: "Dongpo pork and Longjing tea dishes.",
        budgetTip: "A day trip saves hotel switching; overnighting feels calmer.",
        notes: "Avoid weekends if possible.",
      },
      {
        day: 9,
        title: "Shanghai Culture Day",
        morning: "Visit Shanghai Museum East, West Bund, or a neighborhood market.",
        afternoon: "Shopping, cafes, or a final optional water town visit.",
        evening: "River cruise or farewell dinner.",
        transport: "Metro and taxi.",
        food: "Choose one special final meal.",
        budgetTip: "Save paid skyline experiences for the clearest day.",
        notes: "Keep luggage and souvenirs manageable for departure.",
      },
      {
        day: 10,
        title: "Departure",
        morning: "Easy breakfast and final walk near the hotel.",
        afternoon: "Transfer to the airport or railway station.",
        evening: "Depart China or continue to another region.",
        transport: "Allow generous time for Pudong Airport.",
        food: "Have a backup meal plan at the airport or station.",
        budgetTip: "Use remaining balance in apps for snacks and airport transport.",
        notes: "Keep passport, boarding pass, and payment cards accessible.",
      },
    ],
    seoTitle: "10 Days in China: Classic First-Time Itinerary",
    seoDescription:
      "A classic 10-day China itinerary for first-time visitors covering Beijing, Xi'an, Shanghai, and Hangzhou with day-by-day plans.",
  },
  {
    id: "itinerary-240-hour-visa-free",
    slug: "240-hour-visa-free-china-itinerary",
    title: "240-Hour Visa-Free China Itinerary",
    durationDays: 10,
    cities: ["Shanghai", "Hangzhou", "Suzhou"],
    targetUser: "Eligible transit passengers who want a visa-free eastern China route with practical city logistics.",
    budgetLevel: "Flexible",
    summary:
      "A visa-free-friendly route centered on Shanghai and nearby Yangtze River Delta cities. Travelers must confirm current eligibility, entry city rules, onward ticket requirements, and permitted travel area before booking.",
    estimatedCost: "USD 900-2,000 per person excluding international flights and depending on hotel level.",
    tips: [
      "Check official visa-free transit rules before booking because policies and eligible ports can change.",
      "Carry printed or offline proof of onward travel to a third country or region.",
      "Stay within the published permitted parts of the 24 regions and the area authorized on your temporary entry permit.",
    ],
    dayByDayPlan: [
      {
        day: 1,
        title: "Arrive in Shanghai",
        morning: "Land in Shanghai and complete transit immigration procedures if eligible.",
        afternoon: "Check in and set up payment, maps, and mobile data.",
        evening: "Short Bund walk if energy allows.",
        transport: "Use airport metro, Maglev plus metro, or ride-hailing.",
        food: "Choose an easy dumpling or noodle dinner.",
        budgetTip: "Keep your first hotel central to simplify arrival.",
        notes: "Rules depend on nationality, port, itinerary, and onward destination; verify official requirements.",
      },
      {
        day: 2,
        title: "Shanghai Essentials",
        morning: "Yu Garden and Old City.",
        afternoon: "People's Square, museum, or Nanjing Road.",
        evening: "The Bund and skyline views.",
        transport: "Metro Line 2 is useful for many central stops.",
        food: "Xiaolongbao and scallion oil noodles.",
        budgetTip: "Free skyline walks help balance higher hotel costs.",
        notes: "Carry your passport copy and hotel address in Chinese.",
      },
      {
        day: 3,
        title: "French Concession and Local Life",
        morning: "Walk Fuxing Park and nearby leafy streets.",
        afternoon: "Visit cafes, boutiques, and Xintiandi.",
        evening: "Jing'an dinner.",
        transport: "Short taxis and metro hops.",
        food: "Shengjianbao and Shanghainese vegetables.",
        budgetTip: "Local bakeries and noodle shops make easy low-cost lunches.",
        notes: "This is a good day for laundry and pacing.",
      },
      {
        day: 4,
        title: "Train to Hangzhou",
        morning: "Take a high-speed train to Hangzhou.",
        afternoon: "West Lake walk and boat option.",
        evening: "Dinner near the lake or Wulin Square.",
        transport: "Use Hangzhou East Railway Station and local taxis.",
        food: "Dongpo pork, Longjing shrimp, and seasonal greens.",
        budgetTip: "Book trains in second class for strong value.",
        notes: "Confirm the travel area is permitted under your visa-free entry conditions.",
      },
      {
        day: 5,
        title: "Hangzhou Tea and Temples",
        morning: "Visit Lingyin Temple.",
        afternoon: "Longjing tea fields and tea museum.",
        evening: "Grand Canal area.",
        transport: "Taxis are easiest around tea villages.",
        food: "Try tea-flavored dishes and lotus root dessert.",
        budgetTip: "Ask tea prices before tasting sessions.",
        notes: "Bring comfortable shoes for uneven paths.",
      },
      {
        day: 6,
        title: "Hangzhou Slow Morning, Return to Shanghai",
        morning: "Take a quiet lakeside walk.",
        afternoon: "Return to Shanghai by high-speed train.",
        evening: "Explore a neighborhood near your hotel.",
        transport: "High-speed rail plus metro.",
        food: "Casual Shanghai dinner.",
        budgetTip: "Avoid peak-time train changes if fares are higher.",
        notes: "Keep train tickets and hotel records accessible.",
      },
      {
        day: 7,
        title: "Suzhou Day Trip",
        morning: "Train to Suzhou and visit Humble Administrator's Garden.",
        afternoon: "Suzhou Museum and Pingjiang Road.",
        evening: "Return to Shanghai or overnight in Suzhou.",
        transport: "Frequent high-speed trains connect Shanghai and Suzhou.",
        food: "Suzhou-style noodles.",
        budgetTip: "A day trip avoids another hotel change.",
        notes: "Check station names carefully before boarding.",
      },
      {
        day: 8,
        title: "Shanghai Modern Day",
        morning: "Visit Pudong viewpoint or West Bund art spaces.",
        afternoon: "Shopping, cafes, or a spa break.",
        evening: "Huangpu River cruise or rooftop view.",
        transport: "Metro, ferry, and ride-hailing all work.",
        food: "Choose one premium meal if budget allows.",
        budgetTip: "Do not pay for both a cruise and observation deck unless skyline views are your priority.",
        notes: "Keep your onward ticket details ready.",
      },
      {
        day: 9,
        title: "Buffer and Optional Water Town",
        morning: "Use the morning as a buffer or visit Zhujiajiao.",
        afternoon: "Final shopping and packing.",
        evening: "Farewell dinner.",
        transport: "Private transfer can simplify a short water-town visit.",
        food: "Crab roe noodles in season or a classic Shanghainese dinner.",
        budgetTip: "A buffer day protects your departure plan from weather or delays.",
        notes: "Do not travel outside the allowed area for your entry conditions.",
      },
      {
        day: 10,
        title: "Depart to Third Country or Region",
        morning: "Check documents and airport transfer timing.",
        afternoon: "Depart from Shanghai according to visa-free transit requirements.",
        evening: "Continue onward.",
        transport: "Allow extra time for airport formalities.",
        food: "Use remaining app balance for breakfast or snacks.",
        budgetTip: "Avoid last-minute airport taxis during peak traffic.",
        notes: "This itinerary is planning inspiration, not immigration advice; verify rules with official sources.",
      },
    ],
    seoTitle: "240-Hour Visa-Free China Itinerary from Shanghai",
    seoDescription:
      "A practical 240-hour visa-free China itinerary idea covering Shanghai, Hangzhou, and Suzhou with transit reminders, transport, food, and budget tips.",
  },
];

export const itineraries: Itinerary[] = itineraryEntries.map((itinerary) => {
  const visuals = itineraryVisuals[itinerary.slug];
  if (!visuals) {
    throw new Error(`Missing explicit image configuration for itinerary: ${itinerary.slug}`);
  }
  return { ...itinerary, ...visuals };
});

export const phaseBItinerarySlugs = [
  "4-days-in-beijing",
  "5-days-beijing-and-xian",
  "7-days-shanghai-hangzhou-suzhou",
  "240-hour-visa-free-china-itinerary",
] as const;

const phaseBItineraries = phaseBItinerarySlugs.map((slug) => {
  const itinerary = itineraries.find((candidate) => candidate.slug === slug);
  if (!itinerary) {
    throw new Error(`Missing Phase B itinerary: ${slug}`);
  }
  if (!itinerary.dailyImages || itinerary.dailyImages.length !== itinerary.dayByDayPlan.length) {
    throw new Error(`Phase B itinerary requires one explicit image per day: ${slug}`);
  }
  if (new Set(itinerary.dailyImages.map((dailyImage) => dailyImage.src)).size !== itinerary.dailyImages.length) {
    throw new Error(`Phase B itinerary repeats a daily image: ${slug}`);
  }
  for (const dailyImage of itinerary.dailyImages) {
    if (!dailyImage.alt.trim() || !dailyImage.creditId.trim()) {
      throw new Error(`Phase B itinerary daily image is missing alt text or credit: ${slug}`);
    }
  }
  return itinerary;
});

for (const visualRole of ["cardImage", "heroImage"] as const) {
  const sources = phaseBItineraries.map((itinerary) => itinerary[visualRole].src);
  if (new Set(sources).size !== sources.length) {
    throw new Error(`Phase B itineraries must use distinct ${visualRole} assets`);
  }
}

export function getItineraryBySlug(slug: string) {
  return itineraries.find((itinerary) => itinerary.slug === slug);
}
import { itineraryVisuals, type ContentImage } from "@/data/images";
