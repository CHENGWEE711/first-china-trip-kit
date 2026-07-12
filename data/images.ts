export const cityImages: Record<string, { src: string; alt: string; position?: string }> = {
  shanghai: { src: "/images/cities/shanghai-bund-skyline.webp", alt: "Shanghai skyline across the Huangpu River near the Bund" },
  beijing: { src: "/images/cities/beijing-forbidden-city-courtyard.webp", alt: "Visitors walking through a courtyard in Beijing's Forbidden City" },
  xian: { src: "/images/cities/xian-city-wall-sunset.webp", alt: "Xi'an Ancient City Wall and watchtowers at sunset" },
  chengdu: { src: "/images/cities/chengdu-panda-base.webp", alt: "Giant panda eating bamboo at the Chengdu panda base" },
  hangzhou: { src: "/images/cities/hangzhou-west-lake.webp", alt: "Pagoda and lotus-covered water at West Lake in Hangzhou", position: "center 58%" },
  suzhou: { src: "/images/cities/suzhou-lingering-garden.webp", alt: "Traditional architecture and trees in Suzhou's Lingering Garden" },
  guangzhou: { src: "/images/cities/guangzhou-canton-tower.webp", alt: "Guangzhou skyline with Canton Tower", position: "center 56%" },
  shenzhen: { src: "/images/cities/shenzhen-skyline.webp", alt: "Modern Shenzhen skyline viewed from a green hillside", position: "center 55%" },
};

export const editorialImages = {
  hero: cityImages.beijing,
  payments: { src: "/images/essentials/shanghai-shengjian-buns.webp", alt: "Fresh Shanghai pan-fried buns prepared for a restaurant meal" },
  transport: { src: "/images/travel/china-high-speed-rail-platform.webp", alt: "China high-speed train waiting at a modern railway platform" },
  food: { src: "/images/essentials/chinese-dumplings-restaurant.webp", alt: "Chinese dumplings served in bamboo steamers at a restaurant" },
  station: { src: "/images/travel/china-railway-station-interior.webp", alt: "Interior platform at a modern railway station in China" },
};
