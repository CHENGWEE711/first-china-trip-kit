export type ReadinessRisk = "red" | "yellow" | "green";

export type ReadinessQuestion = {
  id: string;
  category: "Entry" | "Payments" | "Apps & internet" | "Transport" | "Stay & safety";
  question: string;
  help: string;
  weight: number;
  risk: Exclude<ReadinessRisk, "green">;
  guide: { label: string; href: string };
};

export const arrivalReadinessQuestions: ReadinessQuestion[] = [
  {
    id: "entry-path",
    category: "Entry",
    question: "I have confirmed my visa, visa-free, or transit entry path for this exact trip.",
    help: "Check nationality, purpose, arrival port, onward route and any official conditions before paying for non-refundable travel.",
    weight: 10,
    risk: "red",
    guide: { label: "Check visa-free transit", href: "/visa-free-transit" },
  },
  {
    id: "travel-documents",
    category: "Entry",
    question: "My passport, confirmed onward travel, hotel details and entry documents are saved offline.",
    help: "Keep a readable offline copy; do not put passport or card numbers into this checker.",
    weight: 10,
    risk: "red",
    guide: { label: "Use the pre-flight checklist", href: "/guides/china-travel-checklist-before-you-fly" },
  },
  {
    id: "primary-payment",
    category: "Payments",
    question: "I have installed a primary payment app and followed its current card-verification steps.",
    help: "Foreign-card support and verification can vary by issuer, app and account.",
    weight: 12,
    risk: "red",
    guide: { label: "Prepare payments", href: "/payments-and-apps#payments" },
  },
  {
    id: "payment-backup",
    category: "Payments",
    question: "I have a backup payment plan: another card, a physical card and a small cash reserve.",
    help: "One card or one wallet failure should not stop your arrival day.",
    weight: 9,
    risk: "red",
    guide: { label: "Read the payment backup guide", href: "/guides/how-to-pay-in-china-as-a-foreigner" },
  },
  {
    id: "data-plan",
    category: "Apps & internet",
    question: "I have an eSIM, roaming or local-data plan that I can activate on arrival.",
    help: "Test that your phone is unlocked and save setup instructions before departure.",
    weight: 10,
    risk: "red",
    guide: { label: "Plan phone data", href: "/guides/china-esim-guide-for-tourists" },
  },
  {
    id: "arrival-apps",
    category: "Apps & internet",
    question: "I have installed the essential apps for payment, maps, translation and ride-hailing.",
    help: "Add only the apps you will use and save passwords or recovery options safely.",
    weight: 8,
    risk: "yellow",
    guide: { label: "Open the essential apps checklist", href: "/tools/essential-apps-checklist" },
  },
  {
    id: "airport-transfer",
    category: "Transport",
    question: "I know how I will get from my arrival airport or station to my hotel.",
    help: "Confirm the exact airport, station, terminal, pickup point and a fallback option.",
    weight: 9,
    risk: "yellow",
    guide: { label: "Plan transport", href: "/travel-essentials" },
  },
  {
    id: "train-details",
    category: "Transport",
    question: "I have checked the exact railway station and passport-linked details for any first train journey.",
    help: "Large cities often have several stations; city name alone is not enough.",
    weight: 6,
    risk: "yellow",
    guide: { label: "Read the train booking guide", href: "/guides/how-to-book-high-speed-trains-in-china" },
  },
  {
    id: "hotel-address",
    category: "Stay & safety",
    question: "My hotel name, Chinese address, phone number and map pin are saved offline.",
    help: "This is useful for taxis, check-in, late arrivals and asking for help.",
    weight: 8,
    risk: "red",
    guide: { label: "Save your hotel address", href: "/guides/china-travel-checklist-before-you-fly" },
  },
  {
    id: "arrival-power",
    category: "Stay & safety",
    question: "I have a charged power bank, charger and an arrival-day plan for low battery or weak data.",
    help: "Payment, maps and translation all depend on your phone staying usable.",
    weight: 6,
    risk: "yellow",
    guide: { label: "Build an offline backup", href: "/payments-and-apps#internet" },
  },
  {
    id: "emergency-plan",
    category: "Stay & safety",
    question: "I have travel insurance details, an emergency contact and key confirmations in an offline folder.",
    help: "Keep only the minimum information you need readily accessible and secured.",
    weight: 6,
    risk: "yellow",
    guide: { label: "Review first-trip essentials", href: "/start-here" },
  },
  {
    id: "first-day-test",
    category: "Stay & safety",
    question: "I plan to make a small payment and data test near my hotel before relying on either all day.",
    help: "A small controlled test is easier than troubleshooting in a taxi, station or busy restaurant.",
    weight: 6,
    risk: "yellow",
    guide: { label: "Use the payments hub", href: "/payments-and-apps" },
  },
];

export type ArrivalReadinessResult = {
  score: number;
  completedCount: number;
  totalCount: number;
  risks: Record<ReadinessRisk, ReadinessQuestion[]>;
  todos: ReadinessQuestion[];
  status: "ready" | "almost-ready" | "needs-attention";
};

export function getArrivalReadinessResult(answers: Record<string, boolean>): ArrivalReadinessResult {
  const score = arrivalReadinessQuestions.reduce(
    (total, question) => total + (answers[question.id] ? question.weight : 0),
    0,
  );
  const todos = arrivalReadinessQuestions.filter((question) => !answers[question.id]);
  const risks: Record<ReadinessRisk, ReadinessQuestion[]> = { red: [], yellow: [], green: [] };

  arrivalReadinessQuestions.forEach((question) => {
    if (answers[question.id]) {
      risks.green.push(question);
    } else {
      risks[question.risk].push(question);
    }
  });

  return {
    score,
    completedCount: arrivalReadinessQuestions.length - todos.length,
    totalCount: arrivalReadinessQuestions.length,
    risks,
    todos,
    status: score >= 85 ? "ready" : score >= 60 ? "almost-ready" : "needs-attention",
  };
}
