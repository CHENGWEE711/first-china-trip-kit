export type Product = {
  id: string;
  slug: string;
  title: string;
  summary: string;
  bestFor: string;
  includes: string[];
  price: string;
  status: "comingSoon" | "available";
  checkoutProvider: "stripe" | "gumroad" | "lemon-squeezy" | "manual";
  checkoutUrl?: string;
  gumroadUrl?: string;
  payhipUrl?: string;
  externalPurchaseUrl?: string;
  previewPdfUrl?: string;
  refundNote: string;
  updatedAt: string;
  isNextLaunch?: boolean;
};

export const products: Product[] = [
  {
    id: "shanghai-3-day-travel-kit",
    slug: "shanghai-3-day-travel-kit",
    title: "Shanghai 3-Day Travel Kit",
    summary:
      "A printable planning pack for first-time visitors who want a smooth, realistic Shanghai city break.",
    bestFor: "Travelers landing in Shanghai who want hotel areas, daily routes, food notes, Chinese addresses, and booking reminders in one place.",
    includes: [
      "3-day route map and daily timing guide",
      "Hotel area comparison",
      "Food checklist with Chinese names",
      "Airport and railway transfer notes",
      "Printable Chinese address card",
    ],
    price: "$9",
    status: "comingSoon",
    checkoutProvider: "manual",
    externalPurchaseUrl: "",
    previewPdfUrl: "",
    refundNote:
      "Refund and delivery details will be shown before purchase when this kit opens.",
    updatedAt: "2026-07-07",
  },
  {
    id: "10-day-classic-china-itinerary",
    slug: "10-day-classic-china-itinerary",
    title: "10-Day Classic China Itinerary",
    summary:
      "A complete first-trip route pack for Beijing, Xi'an, Shanghai, and Hangzhou.",
    bestFor: "Visitors planning one classic China trip and wanting fewer planning tabs, fewer transfer surprises, and a clearer booking order.",
    includes: [
      "Day-by-day classic route",
      "Train versus flight decision notes",
      "Hotel base recommendations",
      "Attraction booking checklist",
      "Budget and pacing notes",
    ],
    price: "$19",
    status: "comingSoon",
    checkoutProvider: "manual",
    externalPurchaseUrl: "",
    previewPdfUrl: "",
    refundNote:
      "Refund and delivery details will be shown before purchase when this kit opens.",
    updatedAt: "2026-07-07",
  },
  {
    id: "china-payment-apps-setup-guide",
    slug: "china-payment-apps-setup-guide",
    title: "China Payment & Apps Setup Guide",
    summary:
      "A step-by-step pre-arrival setup pack for Alipay, WeChat Pay, maps, translation, ride-hailing, and payment backups.",
    bestFor: "First-time visitors who are more worried about paying, ordering, maps, taxis, and phone setup than sightseeing choices.",
    includes: [
      "Alipay setup checklist",
      "WeChat Pay setup checklist",
      "Backup payment decision tree",
      "Essential app list",
      "First-day troubleshooting guide",
      "Chinese phrases for checkout and taxis",
      "Printable offline cards",
    ],
    price: "$7",
    status: "available",
    checkoutProvider: "gumroad",
    externalPurchaseUrl: process.env.NEXT_PUBLIC_PAYMENT_APPS_GUIDE_BUY_URL || "",
    previewPdfUrl: "",
    refundNote:
      "Digital delivery is handled by the checkout provider. Refunds may be limited after download.",
    updatedAt: "2026-07-08",
    isNextLaunch: true,
  },
];

export function getProductById(id: string) {
  return products.find((product) => product.id === id);
}

export function getProductsByIds(ids: string[]) {
  return ids.map(getProductById).filter((product): product is Product => Boolean(product));
}
