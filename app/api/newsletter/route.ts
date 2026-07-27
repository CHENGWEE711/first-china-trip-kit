import { NextResponse } from "next/server";
import { normalizeEmail, sanitizePlainText } from "@/lib/input";
import { subscribeToNewsletter } from "@/lib/services/newsletter";

const maxRequestBytes = 16_384;
const readinessRiskLevels = new Set(["ready", "almost-ready", "needs-attention"]);
const leadSources = new Set(["free_checklist", "readiness_checker", "itinerary_review", "contact_request"]);

function firstValue(record: Record<string, unknown>, ...keys: string[]) {
  for (const key of keys) {
    if (record[key] !== undefined) return record[key];
  }
  return "";
}

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
  let body: Record<string, unknown>;

  if (contentType.includes("application/json")) {
    body = (await request.json().catch(() => ({}))) as Record<string, unknown>;
  } else {
    const formData = await request.formData().catch(() => null);
    if (!formData) {
      return NextResponse.json({ ok: false, message: "Subscription could not be completed." }, { status: 400 });
    }
    body = Object.fromEntries(formData.entries());
  }

  if (sanitizePlainText(body.website, 160)) {
    return NextResponse.json(
      { ok: false, message: "Subscription could not be completed." },
      { status: 400 },
    );
  }

  const email = rawText(body.email);
  const sourcePageInput = rawText(firstValue(body, "source_page", "source"));
  const landingPageInput = rawText(firstValue(body, "landing_page", "source_page", "source"));
  const placementInput = rawText(body.placement);
  const leadMagnetInput = rawText(body.lead_magnet);
  const leadSourceInput = rawText(body.lead_source);
  const firstNameInput = rawText(body.first_name);
  const utmSourceInput = rawText(body.utm_source);
  const utmMediumInput = rawText(body.utm_medium);
  const utmCampaignInput = rawText(body.utm_campaign);
  const utmContentInput = rawText(body.utm_content);
  const readinessScoreInput = rawText(body.readiness_score);
  const readinessRiskLevelInput = rawText(body.readiness_risk_level);

  if (
    email.length > 254 ||
    sourcePageInput.length > 160 ||
    landingPageInput.length > 160 ||
    placementInput.length > 160 ||
    leadMagnetInput.length > 160 ||
    leadSourceInput.length > 80 ||
    firstNameInput.length > 120 ||
    utmSourceInput.length > 160 ||
    utmMediumInput.length > 160 ||
    utmCampaignInput.length > 160 ||
    utmContentInput.length > 240 ||
    readinessScoreInput.length > 3 ||
    readinessRiskLevelInput.length > 40
  ) {
    return NextResponse.json(
      { ok: false, message: "Please shorten the submitted information and try again." },
      { status: 413 },
    );
  }

  const sourcePage = sanitizePlainText(sourcePageInput, 160) || "site";
  const landingPage = sanitizePlainText(landingPageInput, 160) || sourcePage;
  const placement = sanitizePlainText(placementInput, 160) || "newsletter-form";
  const leadMagnet = sanitizePlainText(leadMagnetInput, 160) || "China First Trip Checklist";
  const requestedLeadSource = sanitizePlainText(leadSourceInput, 80);
  const leadSource = leadSources.has(requestedLeadSource) ? requestedLeadSource : "free_checklist";
  const firstName = sanitizePlainText(firstNameInput, 120);
  const utmSource = sanitizePlainText(utmSourceInput, 160);
  const utmMedium = sanitizePlainText(utmMediumInput, 160);
  const utmCampaign = sanitizePlainText(utmCampaignInput, 160);
  const utmContent = sanitizePlainText(utmContentInput, 240);
  const scoreRaw = sanitizePlainText(readinessScoreInput, 3);
  const scoreValue = Number(scoreRaw);
  const readinessScore = scoreRaw && Number.isInteger(scoreValue) && scoreValue >= 0 && scoreValue <= 100
    ? scoreValue
    : undefined;
  const riskValue = sanitizePlainText(readinessRiskLevelInput, 40);
  const readinessRiskLevel = readinessRiskLevels.has(riskValue) ? riskValue : "";

  const result = await subscribeToNewsletter({
    email: normalizeEmail(email),
    firstName,
    leadSource,
    sourcePage,
    landingPage,
    placement,
    leadMagnet,
    readinessScore,
    readinessRiskLevel,
    utmSource,
    utmMedium,
    utmCampaign,
    utmContent,
    consentTimestamp: new Date().toISOString(),
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
    delivery_status: result.deliveryStatus,
  });
}
