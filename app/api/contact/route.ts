import { NextResponse } from "next/server";
import { saveContactMessage } from "@/lib/services/contact";

export async function POST(request: Request) {
  const contentType = request.headers.get("content-type") || "";
  let body: Record<string, FormDataEntryValue | string | boolean | undefined> = {};

  if (contentType.includes("application/json")) {
    body = (await request.json().catch(() => ({}))) as Record<
      string,
      string | boolean | undefined
    >;
  } else {
    const formData = await request.formData();
    body = Object.fromEntries(formData.entries());
  }

  const interestedValue = body.interested_in_custom_itinerary;
  const interestedInCustomItinerary =
    interestedValue === true ||
    interestedValue === "yes" ||
    interestedValue === "true" ||
    interestedValue === "on";

  const result = await saveContactMessage({
    name: String(body.name || ""),
    email: String(body.email || ""),
    nationality: String(body.nationality || ""),
    travelMonth: String(body.travel_month || ""),
    plannedCities: String(body.planned_cities || ""),
    tripLength: String(body.trip_length || ""),
    mainQuestion: String(body.main_question || ""),
    interestedInCustomItinerary,
    source: String(body.source || "contact-page"),
  });

  if (!result.ok) {
    return NextResponse.json(
      { ok: false, message: result.message },
      { status: result.status || 400 },
    );
  }

  return NextResponse.json({
    ok: true,
    message: result.message,
    provider: result.provider,
  });
}
