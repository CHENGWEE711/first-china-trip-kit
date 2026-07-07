import type { FAQ, LinkItem } from "@/data/faqs";

export type GuideDetailContent = {
  quickAnswer: string;
  steps: string[];
  commonMistakes: string[];
  troubleshooting: string[];
  firstDayChecklist: string[];
  faq: FAQ[];
  officialSourceLinks: LinkItem[];
  relatedGuideSlugs: string[];
  relatedProductIds: string[];
};

export const guideDetailContent: Record<string, GuideDetailContent> = {
  "how-to-pay-in-china-as-a-foreigner": {
    quickAnswer:
      "For most foreign visitors, the most reliable China payment setup is Alipay with at least one international card, WeChat Pay as a backup when available, a physical card for hotels and deposits, and a small amount of RMB cash for emergencies. Do the app setup before you fly, then test it with a low-value purchase on your first day before relying on it for taxis, restaurants, or train station snacks.",
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
    firstDayChecklist: [
      "Alipay installed and logged in.",
      "At least one card added and verified.",
      "WeChat installed and payment attempted if available.",
      "Small cash backup in RMB.",
      "Hotel address saved in Chinese.",
      "Translation app ready for cashier or taxi conversations.",
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
      "how-to-use-alipay-and-wechat-pay-in-china",
      "best-apps-for-traveling-in-china",
      "china-travel-packing-list",
    ],
    relatedProductIds: ["china-payment-apps-setup-guide"],
  },
  "best-apps-for-traveling-in-china": {
    quickAnswer:
      "The essential China app stack is payment, maps, translation, ride-hailing, train support, and offline backups. Do not download every app you see on social media. Instead, install a small core set, log in before departure, save Chinese addresses, and test payment, maps, and translation before your first full sightseeing day.",
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
    firstDayChecklist: [
      "Payment apps logged in.",
      "Translation app with offline Chinese downloaded.",
      "Hotel address saved in Chinese.",
      "Ride-hailing access tested.",
      "Train or flight confirmations screenshotted.",
      "Power bank charged.",
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
    ],
    relatedGuideSlugs: [
      "how-to-pay-in-china-as-a-foreigner",
      "how-to-take-high-speed-trains-in-china",
      "basic-chinese-phrases-for-travelers",
    ],
    relatedProductIds: ["china-payment-apps-setup-guide"],
  },
  "how-to-take-high-speed-trains-in-china": {
    quickAnswer:
      "For foreign visitors, the most important high-speed train preparation is to book with the passport you will carry, confirm the exact departure and arrival stations, arrive early enough for security and passport checks, and save your train number, gate, carriage, and seat details offline. The train ride itself is usually smooth; the station logistics are where first-time visitors make mistakes.",
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
      "how-to-take-high-speed-trains-in-china",
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
  "china-internet-and-esim-guide": {
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
};

export function getGuideDetailContent(slug: string): GuideDetailContent | undefined {
  return guideDetailContent[slug];
}
