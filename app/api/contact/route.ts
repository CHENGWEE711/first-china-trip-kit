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

  if (String(body.website || "").trim()) {
    return NextResponse.json(
      { ok: false, message: "Your message could not be submitted." },
      { status: 400 },
    );
  }

  const limitedFields = {
    name: String(body.name || ""),
    email: String(body.email || ""),
    countryOrPassport: String(body.country_or_passport || body.nationality || ""),
    travelMonth: String(body.travel_month || ""),
    citiesConsidered: String(body.cities_considered || body.planned_cities || ""),
    tripLength: String(body.trip_length || ""),
    mainQuestion: String(body.main_question || ""),
    source: String(body.source || "contact-page"),
  };

  if (
    limitedFields.name.length > 120 ||
    limitedFields.email.length > 254 ||
    limitedFields.countryOrPassport.length > 160 ||
    limitedFields.travelMonth.length > 80 ||
    limitedFields.citiesConsidered.length > 500 ||
    limitedFields.tripLength.length > 80 ||
    limitedFields.mainQuestion.length > 5000 ||
    limitedFields.source.length > 160
  ) {
    return NextResponse.json(
      { ok: false, message: "Please shorten the submitted information and try again." },
      { status: 400 },
    );
  }

  const result = await saveContactMessage({
    name: limitedFields.name,
    email: limitedFields.email,
    countryOrPassport: limitedFields.countryOrPassport,
    travelMonth: limitedFields.travelMonth,
    citiesConsidered: limitedFields.citiesConsidered,
    tripLength: limitedFields.tripLength,
    mainQuestion: limitedFields.mainQuestion,
    interestedInCustomItinerary,
    preferredReplyMethod: String(body.preferred_reply_method || "email"),
    source: limitedFields.source,
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
