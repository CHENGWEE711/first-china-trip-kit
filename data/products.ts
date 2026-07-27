import { payhipUrls } from "@/lib/payhip";

export type Product = {
  id: string;
  slug: string;
  title: string;
  summary: string;
  bestFor: string;
  includes: string[];
  price: string;
  status: "comingSoon" | "available";
  checkoutProvider: "stripe" | "gumroad" | "lemon-squeezy" | "payhip" | "manual";
  checkoutUrl?: string;
  gumroadUrl?: string;
  payhipUrl?: string;
  externalPurchaseUrl?: string;
  localDownloadUrl?: string;
  previewPdfUrl?: string;
  refundNote: string;
  structuredDataDescription?: string;
  updatedAt: string;
  isNextLaunch?: boolean;
};

export const products: Product[] = [
  {
    id: "china-first-trip-checklist",
    slug: "china-first-trip-checklist",
    title: "China First Trip Checklist",
    summary:
      "A printable first-trip checklist for payment, apps, transport, hotel addresses, packing, and emergency phrases.",
    bestFor: "Travelers who want a simple pre-flight checklist before arriving in China.",
    includes: [
      "Pre-flight checklist",
      "Arrival day checklist",
      "Payment reminders",
      "Essential apps",
      "Hotel address card",
      "Emergency phrases",
    ],
    price: "$0+",
    status: "available",
    checkoutProvider: "payhip",
    externalPurchaseUrl: payhipUrls.freeChecklist,
    localDownloadUrl: "/china-first-time-visitor-checklist.pdf",
    previewPdfUrl: "",
    refundNote:
      "Free local download is available. Optional support is offered only through an active checkout link.",
    updatedAt: "2026-07-08",
  },
  {
    id: "china-payment-apps-setup-guide",
    slug: "china-payment-apps-setup-guide",
    title: "China Payment & Apps Setup Guide",
    summary:
      "A printable setup pack for Alipay, WeChat Pay, essential apps, payment backups, and first-day troubleshooting.",
    structuredDataDescription:
      "A step-by-step pre-arrival setup pack for Alipay, WeChat Pay, maps, translation, ride-hailing, and payment backups.",
    bestFor:
      "First-time visitors who feel anxious about mobile payments, Chinese apps, taxis, and what to do if something fails on arrival day.",
    includes: [
      "Alipay setup checklist",
      "WeChat Pay backup checklist",
      "Payment backup decision tree",
      "Essential China apps stack",
      "First-day payment test plan",
      "Payment failure troubleshooting table",
      "Taxi and checkout Chinese phrase cards",
      "Hotel address card template",
      "Payment backup card",
      "Before-you-fly checklist",
      "Official verification reminders",
    ],
    price: "$7",
    status: "available",
    checkoutProvider: "payhip",
    externalPurchaseUrl: payhipUrls.paymentGuide,
    previewPdfUrl: "",
    refundNote:
      "Digital delivery is handled by Payhip after purchase. Refunds may be limited after download.",
    updatedAt: "2026-07-09",
    isNextLaunch: true,
  },
  {
    id: "china-arrival-setup-bundle",
    slug: "china-arrival-setup-bundle",
    title: "China Arrival Setup Bundle",
    summary:
      "A printable arrival-day kit with a command sheet, payment and app backups, hotel-address planning, transport checks and an emergency-ready offline plan.",
    structuredDataDescription:
      "A practical PDF bundle for first-time visitors preparing entry documents, payments, mobile data, transport, hotel details and arrival-day backups for China.",
    bestFor:
      "First-time visitors who want one printable, offline arrival plan after completing the free China Arrival Readiness Checker.",
    includes: [
      "Arrival-day command sheet",
      "Entry and document preparation checklist",
      "Payments and app setup checklist",
      "Payment and data failure plan",
      "Airport or station to hotel plan",
      "Hotel address and transport backup sheet",
      "Emergency and offline-folder checklist",
      "Official verification reminders",
    ],
    price: "$19",
    status: "available",
    checkoutProvider: "payhip",
    externalPurchaseUrl: payhipUrls.arrivalBundle,
    localDownloadUrl: "/products/china-arrival-setup-bundle.pdf",
    previewPdfUrl: "/products/previews/china-arrival-setup-bundle-preview.pdf",
    refundNote:
      "Digital delivery is handled by Payhip after purchase. Review the sample preview before buying; refunds may be limited after download.",
    updatedAt: "2026-07-27",
  },
  {
    id: "shanghai-3-day-travel-kit",
    slug: "shanghai-3-day-travel-kit",
    title: "Shanghai 3-Day Travel Kit",
    summary:
      "A practical 3-day Shanghai kit with daily routes, food ideas, Chinese addresses, metro tips, taxi cards, and first-time visitor notes.",
    bestFor:
      "Travelers landing in Shanghai who want hotel areas, daily routes, food notes, Chinese addresses, and booking reminders in one place.",
    includes: [
      "Daily route cards",
      "Food and neighborhood ideas",
      "Chinese addresses and taxi cards",
      "Metro and airport transfer notes",
      "First-time visitor reminders",
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
      "A classic first-time China route with city-by-city planning, train connections, hotel area suggestions, booking reminders, and printable daily schedules.",
    bestFor:
      "Visitors planning one classic China trip and wanting fewer planning tabs, fewer transfer surprises, and a clearer booking order.",
    includes: [
      "City-by-city planning notes",
      "Train connection guidance",
      "Hotel area suggestions",
      "Attraction booking checklist",
      "Printable daily schedules",
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
];

export function getProductById(id: string) {
  return products.find((product) => product.id === id);
}

export function getProductsByIds(ids: string[]) {
  return ids.map(getProductById).filter((product): product is Product => Boolean(product));
}
