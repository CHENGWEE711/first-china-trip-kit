import { NextResponse } from "next/server";
import { sanitizePlainText } from "@/lib/input";
import { saveContactMessage } from "@/lib/services/contact";
import { subscribeToNewsletter } from "@/lib/services/newsletter";

const maxRequestBytes = 24_576;

function rawText(value: unknown) {
  return typeof value === "string" ? value : "";
}

export async function POST(request: Request) {
  const contentLength = Number(request.headers.get("content-length") || "0");
  if (Number.isFinite(contentLength) && contentLength > maxRequestBytes) {
    return NextResponse.json(
      { ok: false, message: "Please shorten the submitted information and try again." },
      { status: 413 },
    );
  }

  const contentType = request.headers.get("content-type") || "";
  let body: Record<string, FormDataEntryValue | string | boolean | undefined> = {};

  if (contentType.includes("application/json")) {
    body = (await request.json().catch(() => ({}))) as Record<string, string | boolean | undefined>;
  } else {
    const formData = await request.formData().catch(() => null);
    if (!formData) {
      return NextResponse.json({ ok: false, message: "Your message could not be submitted." }, { status: 400 });
    }
    body = Object.fromEntries(formData.entries());
  }

  if (sanitizePlainText(body.website, 160)) {
    return NextResponse.json(
      { ok: false, message: "Your message could not be submitted." },
      { status: 400 },
    );
  }

  const name = rawText(body.name);
  const email = rawText(body.email);
  const countryOrPassport = rawText(body.country_or_passport || body.nationality);
  const travelMonth = rawText(body.travel_month);
  const citiesConsidered = rawText(body.cities_considered || body.planned_cities);
  const tripLength = rawText(body.trip_length);
  const mainQuestion = rawText(body.main_question);
  const source = rawText(body.source);
  const preferredReplyMethod = rawText(body.preferred_reply_method);
  const landingPage = rawText(body.landing_page);
  const utmSource = rawText(body.utm_source);
  const utmMedium = rawText(body.utm_medium);
  const utmCampaign = rawText(body.utm_campaign);
  const utmContent = rawText(body.utm_content);

  if (
    name.length > 120 ||
    email.length > 254 ||
    countryOrPassport.length > 160 ||
    travelMonth.length > 80 ||
    citiesConsidered.length > 500 ||
    tripLength.length > 80 ||
    mainQuestion.length > 5000 ||
    source.length > 160 ||
    preferredReplyMethod.length > 20 ||
    landingPage.length > 160 ||
    utmSource.length > 160 ||
    utmMedium.length > 160 ||
    utmCampaign.length > 160 ||
    utmContent.length > 240
  ) {
    return NextResponse.json(
      { ok: false, message: "Please shorten the submitted information and try again." },
      { status: 413 },
    );
  }

  const interestedValue = body.interested_in_custom_itinerary;
  const interestedInCustomItinerary =
    interestedValue === true ||
    interestedValue === "yes" ||
    interestedValue === "true" ||
    interestedValue === "on";
  const newsletterValue = body.newsletter_opt_in;
  const newsletterOptIn =
    newsletterValue === true ||
    newsletterValue === "yes" ||
    newsletterValue === "true" ||
    newsletterValue === "on";

  const fields = {
    name: sanitizePlainText(name, 120),
    email: sanitizePlainText(email, 254),
    countryOrPassport: sanitizePlainText(countryOrPassport, 160),
    travelMonth: sanitizePlainText(travelMonth, 80),
    citiesConsidered: sanitizePlainText(citiesConsidered, 500),
    tripLength: sanitizePlainText(tripLength, 80),
    mainQuestion: sanitizePlainText(mainQuestion, 5_000),
    source: sanitizePlainText(source, 160) || "contact-page",
    preferredReplyMethod: sanitizePlainText(preferredReplyMethod, 20) === "whatsapp" ? "whatsapp" : "email",
    landingPage: sanitizePlainText(landingPage, 160) || "/contact",
    utmSource: sanitizePlainText(utmSource, 160),
    utmMedium: sanitizePlainText(utmMedium, 160),
    utmCampaign: sanitizePlainText(utmCampaign, 160),
    utmContent: sanitizePlainText(utmContent, 240),
  };

  const result = await saveContactMessage({
    name: fields.name,
    email: fields.email,
    countryOrPassport: fields.countryOrPassport,
    travelMonth: fields.travelMonth,
    citiesConsidered: fields.citiesConsidered,
    tripLength: fields.tripLength,
    mainQuestion: fields.mainQuestion,
    interestedInCustomItinerary,
    preferredReplyMethod: fields.preferredReplyMethod,
    source: fields.source,
  });

  if (!result.ok) {
    return NextResponse.json(
      { ok: false, message: result.message },
      { status: result.status || 400 },
    );
  }

  if (newsletterOptIn) {
    const subscription = await subscribeToNewsletter({
      email: fields.email,
      firstName: fields.name,
      leadSource: fields.source === "custom-itinerary" ? "itinerary_review" : "contact_request",
      sourcePage: fields.landingPage,
      landingPage: fields.landingPage,
      placement: fields.source,
      leadMagnet: fields.source === "custom-itinerary" ? "Custom Itinerary Review" : "China trip updates",
      utmSource: fields.utmSource,
      utmMedium: fields.utmMedium,
      utmCampaign: fields.utmCampaign,
      utmContent: fields.utmContent,
      consentTimestamp: new Date().toISOString(),
    });

    return NextResponse.json({
      ok: true,
      message: subscription.ok
        ? "Thanks! Your route details are saved and your email sequence is confirmed."
        : "Thanks! Your route details are saved. The email sequence is temporarily unavailable.",
      provider: result.provider,
      delivery_status: subscription.deliveryStatus || "failed",
    });
  }

  return NextResponse.json({
    ok: true,
    message: result.message,
    provider: result.provider,
  });
}
