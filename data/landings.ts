import { guideVisuals, type ContentImage } from "@/data/images";

export const LANDING_SLUGS = [
  "pay-in-china",
  "china-visa-free",
  "china-checklist",
] as const;

export type LandingSlug = (typeof LANDING_SLUGS)[number];
export type LandingName =
  | "pay_in_china"
  | "china_visa_free"
  | "china_checklist";

export type LandingIconName =
  | "wallet"
  | "shield"
  | "route"
  | "smartphone"
  | "file-check"
  | "map-pin"
  | "download"
  | "plane";

export type LandingCtaName =
  | "open_payments_hub"
  | "download_checklist"
  | "check_my_route"
  | "read_visa_guide"
  | "open_checklist_signup"
  | "explore_start_here"
  | "open_related_guide";

export type LandingAction = {
  label: string;
  href: string;
  ctaName: LandingCtaName;
  eventName:
    | "landing_cta_clicked"
    | "landing_checklist_download"
    | "landing_hub_clicked";
  download?: string;
};

export type LandingPageDefinition = {
  slug: LandingSlug;
  landingName: LandingName;
  path: `/landing/${LandingSlug}`;
  breadcrumbLabel: string;
  seo: {
    title: string;
    description: string;
    image: ContentImage;
  };
  hero: {
    title: string;
    description: string;
    image: ContentImage;
    primaryAction: LandingAction;
    secondaryAction: LandingAction;
  };
  quickAnswer: {
    title: string;
    body: string;
    checks: string[];
  };
  benefits: Array<{
    title: string;
    description: string;
    icon: LandingIconName;
  }>;
  trustSignals: string[];
  primaryCta: {
    title: string;
    description: string;
    action: LandingAction;
  };
  hubPreview: {
    title: string;
    description: string;
    items: Array<{ title: string; description: string }>;
    action: LandingAction;
  };
  faqs: Array<{ question: string; answer: string }>;
  relatedGuideSlugs: string[];
  newsletter?: {
    title: string;
    description: string;
  };
  footerCta: {
    title: string;
    description: string;
    action: LandingAction;
  };
};

const paymentVisuals = guideVisuals["how-to-pay-in-china-as-a-foreigner"];
const visaVisuals = guideVisuals["china-240-hour-visa-free-transit-guide"];
const checklistVisuals = guideVisuals["china-travel-checklist-before-you-fly"];

export const LANDING_DEFINITIONS = {
  "pay-in-china": {
    slug: "pay-in-china",
    landingName: "pay_in_china",
    path: "/landing/pay-in-china",
    breadcrumbLabel: "Pay in China",
    seo: {
      title: "Pay in China Before You Land | 4-Layer Setup",
      description:
        "Prepare a four-layer China payment backup before you fly: a primary wallet, backup wallet, physical card and emergency cash.",
      image: paymentVisuals.heroImage,
    },
    hero: {
      title: "How Do You Pay in China Without Getting Stuck?",
      description:
        "Set up a primary wallet, a backup, a physical card and a small cash buffer before you land.",
      image: paymentVisuals.heroImage,
      primaryAction: {
        label: "Open Payments Hub",
        href: "/payments-and-apps",
        ctaName: "open_payments_hub",
        eventName: "landing_hub_clicked",
      },
      secondaryAction: {
        label: "Download Checklist",
        href: "/landing/china-checklist#free-checklist",
        ctaName: "download_checklist",
        eventName: "landing_cta_clicked",
      },
    },
    quickAnswer: {
      title: "Don’t arrive with only a credit card.",
      body:
        "International cards still matter, but they are not the everyday default at many smaller shops, taxis and restaurants. Prepare mobile payment first, then keep two offline fallbacks.",
      checks: [
        "Add and verify a primary mobile wallet before departure.",
        "Prepare a second wallet or bank card from a different issuer.",
        "Carry a modest amount of RMB for genuine payment failures.",
      ],
    },
    benefits: [
      {
        title: "Pay on arrival",
        description: "Test a small payment before leaving the airport or hotel area.",
        icon: "wallet",
      },
      {
        title: "Keep a real fallback",
        description: "A second issuer and a little cash protect you from app or card friction.",
        icon: "shield",
      },
      {
        title: "Move with confidence",
        description: "Know what to use at hotels, restaurants, taxis and smaller merchants.",
        icon: "route",
      },
    ],
    trustSignals: [
      "Built around real first-day payment tasks",
      "No payment or passport details collected",
      "Deeper setup steps stay in one practical Hub",
    ],
    primaryCta: {
      title: "Finish your four-layer payment setup",
      description:
        "Use the Payments & Essential Apps Hub to set up wallets, cards, internet and offline backups in the right order.",
      action: {
        label: "Open Payments Hub",
        href: "/payments-and-apps",
        ctaName: "open_payments_hub",
        eventName: "landing_hub_clicked",
      },
    },
    hubPreview: {
      title: "Inside the Payments & Essential Apps Hub",
      description:
        "A single preparation flow replaces scattered app lists and payment advice.",
      items: [
        {
          title: "Build the payment pyramid",
          description: "Primary wallet, backup wallet, physical card and emergency cash.",
        },
        {
          title: "Install only the apps you need",
          description: "Follow a practical order for payment, maps, transport and translation.",
        },
        {
          title: "Prepare for the first hour",
          description: "Test data, payment, directions and your route before leaving arrivals.",
        },
      ],
      action: {
        label: "Explore the full Hub",
        href: "/payments-and-apps",
        ctaName: "open_payments_hub",
        eventName: "landing_hub_clicked",
      },
    },
    faqs: [
      {
        question: "Can I use Visa or Mastercard everywhere in China?",
        answer:
          "International cards are useful at many hotels and larger businesses, but they should not be your only everyday payment method. Prepare a mobile wallet and cash backup too.",
      },
      {
        question: "Do I still need cash?",
        answer:
          "A small RMB backup is sensible for arrival day, weak mobile data, a drained phone or a merchant flow that does not accept your foreign-linked wallet smoothly.",
      },
      {
        question: "Which payment app should I set up first?",
        answer:
          "Many first-time visitors start with Alipay and prepare WeChat Pay as a backup where available. What matters most is testing the exact card and account you will use.",
      },
    ],
    relatedGuideSlugs: [
      "how-to-pay-in-china-as-a-foreigner",
      "best-apps-for-traveling-in-china",
    ],
    footerCta: {
      title: "Ready to get set up?",
      description: "Open the Hub and complete the practical steps before you fly.",
      action: {
        label: "Open Payments Hub",
        href: "/payments-and-apps",
        ctaName: "open_payments_hub",
        eventName: "landing_hub_clicked",
      },
    },
  },
  "china-visa-free": {
    slug: "china-visa-free",
    landingName: "china_visa_free",
    path: "/landing/china-visa-free",
    breadcrumbLabel: "China Visa-Free Transit",
    seo: {
      title: "China Visa-Free Transit | 5 Checks Before Booking",
      description:
        "Check the five conditions that shape a China visa-free transit route before booking: passport, immediate route, onward ticket, port and permitted stay area.",
      image: visaVisuals.heroImage,
    },
    hero: {
      title: "Five Checks Before You Rely on China’s Visa-Free Transit",
      description:
        "Your passport, immediate route, onward ticket, entry port and permitted stay area all matter. Check them before booking.",
      image: visaVisuals.heroImage,
      primaryAction: {
        label: "Check My Route",
        href: "/visa-free-transit#route-check",
        ctaName: "check_my_route",
        eventName: "landing_hub_clicked",
      },
      secondaryAction: {
        label: "Read Visa Guide",
        href: "/guides/china-240-hour-visa-free-transit-guide",
        ctaName: "read_visa_guide",
        eventName: "landing_cta_clicked",
      },
    },
    quickAnswer: {
      title: "A valid route is more than a stay under 240 hours.",
      body:
        "The immediate place before mainland China and the immediate onward country or region must form a qualifying transit. Your port and planned travel area must also match current official rules.",
      checks: [
        "Use the immediate inbound and outbound travel segments.",
        "Hold confirmed onward travel within the authorized window.",
        "Verify current policy sources again before non-refundable bookings.",
      ],
    },
    benefits: [
      {
        title: "Check the route shape",
        description: "Compare A → Mainland China → B using the segments that actually cross the border.",
        icon: "route",
      },
      {
        title: "Match the exact port",
        description: "An international airport is not automatically an eligible transit port.",
        icon: "plane",
      },
      {
        title: "Stay inside the permitted area",
        description: "An eligible port does not automatically allow travel anywhere in China.",
        icon: "map-pin",
      },
    ],
    trustSignals: [
      "Policy facts are tied to official Chinese sources",
      "The route checker does not collect passport details",
      "Final decisions remain with immigration officers",
    ],
    primaryCta: {
      title: "Check your actual transit route",
      description:
        "The Visa-Free Transit Hub compares your answers with the current policy dataset and explains what still needs official confirmation.",
      action: {
        label: "Check My Route",
        href: "/visa-free-transit#route-check",
        ctaName: "check_my_route",
        eventName: "landing_hub_clicked",
      },
    },
    hubPreview: {
      title: "What the Visa-Free Transit Hub checks",
      description:
        "It is a cautious planning tool, not an approval service or a substitute for immigration officers.",
      items: [
        {
          title: "Passport and travel purpose",
          description: "Start with the policy that may be most relevant to your trip.",
        },
        {
          title: "Immediate origin and onward region",
          description: "Avoid the common mistake of using the first or final place in a longer itinerary.",
        },
        {
          title: "Port and permitted stay area",
          description: "Connect the entry route to the places you actually plan to visit.",
        },
      ],
      action: {
        label: "Open the route checker",
        href: "/visa-free-transit#route-check",
        ctaName: "check_my_route",
        eventName: "landing_hub_clicked",
      },
    },
    faqs: [
      {
        question: "Does A → Mainland China → A qualify?",
        answer:
          "That basic route does not meet the third-country or region transit shape. Complex connections and technical stops can change the assessment, so use the immediate inbound and outbound segments.",
      },
      {
        question: "Does the route checker guarantee entry?",
        answer:
          "No. It provides a cautious planning result based on current published rules. Final approval is made by immigration inspection officers at the port of entry.",
      },
      {
        question: "When should I check the rules again?",
        answer:
          "Recheck official sources before booking non-refundable travel and again shortly before departure. Airline document checks and port implementation can affect a real itinerary.",
      },
    ],
    relatedGuideSlugs: [
      "china-240-hour-visa-free-transit-guide",
      "can-americans-travel-to-china-in-2026",
    ],
    footerCta: {
      title: "Verify the route before you book",
      description: "Check the main conditions, then confirm anything uncertain with official sources.",
      action: {
        label: "Check My Route",
        href: "/visa-free-transit#route-check",
        ctaName: "check_my_route",
        eventName: "landing_hub_clicked",
      },
    },
  },
  "china-checklist": {
    slug: "china-checklist",
    landingName: "china_checklist",
    path: "/landing/china-checklist",
    breadcrumbLabel: "Free China Checklist",
    seo: {
      title: "Free China First Trip Checklist | Arrival-Ready",
      description:
        "Get a free China first-trip checklist for entry, payment, apps, internet, hotel addresses, transport and arrival-day backups.",
      image: checklistVisuals.heroImage,
    },
    hero: {
      title: "Get Ready for China Before Airport Day",
      description:
        "One free checklist covering entry, payments, apps, internet, hotel addresses and arrival-day backups.",
      image: checklistVisuals.heroImage,
      primaryAction: {
        label: "Download Free Checklist",
        href: "#free-checklist",
        ctaName: "open_checklist_signup",
        eventName: "landing_cta_clicked",
      },
      secondaryAction: {
        label: "Explore Start Here",
        href: "/start-here",
        ctaName: "explore_start_here",
        eventName: "landing_cta_clicked",
      },
    },
    quickAnswer: {
      title: "The shortest path is one ordered pre-flight check.",
      body:
        "Use the checklist once while planning, once before departure and once after landing. It keeps the small setup tasks from becoming first-day problems.",
      checks: [
        "Confirm entry documents and save key details offline.",
        "Test payments, data, maps and translation before you need them.",
        "Keep Chinese hotel addresses and transport confirmations on your phone.",
      ],
    },
    benefits: [
      {
        title: "Prepare in the right order",
        description: "Work from entry requirements through payment, connectivity and arrival day.",
        icon: "file-check",
      },
      {
        title: "Keep it offline",
        description: "Save a compact PDF to your phone or print it before the flight.",
        icon: "download",
      },
      {
        title: "Know the next step",
        description: "Each checklist topic points back to a practical Hub or detailed Guide.",
        icon: "smartphone",
      },
    ],
    trustSignals: [
      "A practical three-page PDF",
      "No passport or itinerary details requested",
      "Free download with clear privacy terms",
    ],
    primaryCta: {
      title: "Put the whole first-trip setup in one place",
      description:
        "Join the planning list and open the free checklist on the next page. You can unsubscribe at any time.",
      action: {
        label: "Get the Free Checklist",
        href: "#free-checklist",
        ctaName: "open_checklist_signup",
        eventName: "landing_cta_clicked",
      },
    },
    hubPreview: {
      title: "What is inside the checklist",
      description:
        "Short, useful prompts cover the tasks most likely to slow down a first-time visitor.",
      items: [
        {
          title: "Before you book",
          description: "Entry path, passport, route and accommodation checks.",
        },
        {
          title: "Before you fly",
          description: "Payment, apps, internet, hotel addresses and offline confirmations.",
        },
        {
          title: "Arrival day",
          description: "Test data, payment, maps, translation and transport before moving on.",
        },
      ],
      action: {
        label: "Download Free Checklist",
        href: "#free-checklist",
        ctaName: "open_checklist_signup",
        eventName: "landing_cta_clicked",
      },
    },
    faqs: [
      {
        question: "Is the checklist really free?",
        answer:
          "Yes. Enter a valid email address and the download page opens after the signup succeeds. There is no required purchase.",
      },
      {
        question: "What format is the checklist?",
        answer:
          "It is a compact three-page PDF designed to save on a phone or print before departure.",
      },
      {
        question: "Will the checklist replace official travel advice?",
        answer:
          "No. It organizes preparation tasks, but entry and policy requirements should always be confirmed with current official sources for your trip.",
      },
    ],
    relatedGuideSlugs: [
      "china-travel-checklist-before-you-fly",
      "best-apps-for-traveling-in-china",
    ],
    newsletter: {
      title: "Get the Free China First Trip Checklist",
      description:
        "Enter your email and the printable checklist will open on the next page.",
    },
    footerCta: {
      title: "Make your first hour in China easier",
      description: "Save the checklist now, then work through it before departure.",
      action: {
        label: "Get the Free Checklist",
        href: "#free-checklist",
        ctaName: "open_checklist_signup",
        eventName: "landing_cta_clicked",
      },
    },
  },
} satisfies Record<LandingSlug, LandingPageDefinition>;

export const landingPages = LANDING_SLUGS.map((slug) => LANDING_DEFINITIONS[slug]);

export function getLandingDefinition(slug: string) {
  return LANDING_DEFINITIONS[slug as LandingSlug];
}
