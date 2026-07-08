import { siteConfig } from "@/lib/site";

export type ContactMessageInput = {
  name: string;
  email: string;
  nationality?: string;
  travelMonth?: string;
  plannedCities?: string;
  tripLength?: string;
  mainQuestion: string;
  interestedInCustomItinerary?: boolean;
  source?: string;
};

type ContactMessageResult = {
  ok: boolean;
  message: string;
  provider?: "supabase";
  status?: number;
};

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export async function saveContactMessage({
  name,
  email,
  nationality = "",
  travelMonth = "",
  plannedCities = "",
  tripLength = "",
  mainQuestion,
  interestedInCustomItinerary = false,
  source = "contact-page",
}: ContactMessageInput): Promise<ContactMessageResult> {
  const cleanEmail = email.trim().toLowerCase();
  const cleanQuestion = mainQuestion.trim();

  if (!name.trim()) {
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
      name: name.trim(),
      email: cleanEmail,
      nationality: nationality.trim(),
      travelMonth: travelMonth.trim(),
      plannedCities: plannedCities.trim(),
      tripLength: tripLength.trim(),
      mainQuestion: cleanQuestion,
      interestedInCustomItinerary,
      source: source.trim() || "contact-page",
    });
  }

  return {
    ok: false,
    message: `The contact form is not connected yet. Please email ${siteConfig.contactEmail} directly for now.`,
    status: 503,
  };
}

async function saveWithSupabase(
  input: Required<ContactMessageInput>,
): Promise<ContactMessageResult> {
  const table = process.env.SUPABASE_CONTACT_TABLE || "contact_messages";
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY || "";
  const response = await fetch(
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
        nationality: input.nationality,
        travel_month: input.travelMonth,
        planned_cities: input.plannedCities,
        trip_length: input.tripLength,
        main_question: input.mainQuestion,
        interested_in_custom_itinerary: input.interestedInCustomItinerary,
        source: input.source,
        status: "new",
        created_at: new Date().toISOString(),
      }),
    },
  );

  if (!response.ok) {
    return {
      ok: false,
      message: "Your message could not be saved. Please email us directly for now.",
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
