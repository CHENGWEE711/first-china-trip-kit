import { siteConfig } from "@/lib/site";
import { normalizeEmail, sanitizePlainText } from "@/lib/input";

export type ContactMessageInput = {
  name: string;
  email: string;
  countryOrPassport?: string;
  travelMonth?: string;
  citiesConsidered?: string;
  tripLength?: string;
  mainQuestion: string;
  interestedInCustomItinerary?: boolean;
  preferredReplyMethod?: string;
  source?: string;
};

const unavailableMessage = `The contact form is temporarily unavailable. Please email ${siteConfig.contactEmail} directly with your travel month, passport country, trip length, cities, and question.`;

type ContactMessageResult = {
  ok: boolean;
  message: string;
  provider?: "supabase";
  status?: number;
};

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const providerTimeoutMs = 8_000;

export async function saveContactMessage({
  name,
  email,
  countryOrPassport = "",
  travelMonth = "",
  citiesConsidered = "",
  tripLength = "",
  mainQuestion,
  interestedInCustomItinerary = false,
  preferredReplyMethod = "email",
  source = "contact-page",
}: ContactMessageInput): Promise<ContactMessageResult> {
  const cleanName = sanitizePlainText(name, 120);
  const cleanEmail = normalizeEmail(email);
  const cleanQuestion = sanitizePlainText(mainQuestion, 5_000);

  if (!cleanName) {
    return { ok: false, message: "Please enter your name.", status: 400 };
  }

  if (!emailPattern.test(cleanEmail)) {
    return { ok: false, message: "Please enter a valid email address.", status: 400 };
  }

  if (cleanQuestion.length < 10) {
    return {
      ok: false,
      message: "Please add a little more detail to your main question.",
      status: 400,
    };
  }

  if (process.env.NEXT_PUBLIC_SUPABASE_URL && process.env.SUPABASE_SERVICE_ROLE_KEY) {
    return saveWithSupabase({
      name: cleanName,
      email: cleanEmail,
      countryOrPassport: sanitizePlainText(countryOrPassport, 160),
      travelMonth: sanitizePlainText(travelMonth, 80),
      citiesConsidered: sanitizePlainText(citiesConsidered, 500),
      tripLength: sanitizePlainText(tripLength, 80),
      mainQuestion: cleanQuestion,
      interestedInCustomItinerary,
      preferredReplyMethod:
        preferredReplyMethod === "whatsapp" ? "whatsapp" : "email",
      source: sanitizePlainText(source, 160) || "contact-page",
    });
  }

  return {
    ok: false,
    message: unavailableMessage,
    status: 503,
  };
}

async function saveWithSupabase(
  input: Required<ContactMessageInput>,
): Promise<ContactMessageResult> {
  const table = process.env.SUPABASE_CONTACT_TABLE || "contact_messages";
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY || "";
  let response: Response;
  try {
    response = await fetchWithTimeout(
      `${process.env.NEXT_PUBLIC_SUPABASE_URL}/rest/v1/${table}`,
      {
      method: "POST",
      headers: {
        apikey: key,
        Authorization: `Bearer ${key}`,
        "Content-Type": "application/json",
        Prefer: "return=minimal",
      },
      body: JSON.stringify({
        name: input.name,
        email: input.email,
        country_or_passport: input.countryOrPassport,
        travel_month: input.travelMonth,
        cities_considered: input.citiesConsidered,
        trip_length: input.tripLength,
        main_question: input.mainQuestion,
        interested_in_custom_itinerary: input.interestedInCustomItinerary,
        preferred_reply_method: input.preferredReplyMethod,
        source: input.source,
        status: "new",
        created_at: new Date().toISOString(),
      }),
      },
    );
  } catch {
    return {
      ok: false,
      message: unavailableMessage,
      provider: "supabase",
      status: 503,
    };
  }

  if (!response.ok) {
    return {
      ok: false,
      message: unavailableMessage,
      provider: "supabase",
      status: response.status,
    };
  }

  return {
    ok: true,
    message: "Thanks! Your China trip question has been saved.",
    provider: "supabase",
  };
}

async function fetchWithTimeout(input: RequestInfo | URL, init: RequestInit = {}) {
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), providerTimeoutMs);

  try {
    return await fetch(input, { ...init, signal: controller.signal });
  } finally {
    clearTimeout(timeout);
  }
}
