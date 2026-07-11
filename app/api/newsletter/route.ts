import { NextResponse } from "next/server";
import { subscribeToNewsletter } from "@/lib/services/newsletter";

export async function POST(request: Request) {
  const contentType = request.headers.get("content-type") || "";
  let email = "";
  let sourcePage = "site";
  let placement = "newsletter-form";
  let leadMagnet = "China First Trip Checklist";
  let utmSource = "";
  let utmMedium = "";
  let utmCampaign = "";
  let utmContent = "";

  if (contentType.includes("application/json")) {
    const body = (await request.json().catch(() => ({}))) as {
      email?: string;
      source_page?: string;
      source?: string;
      placement?: string;
      lead_magnet?: string;
      utm_source?: string;
      utm_medium?: string;
      utm_campaign?: string;
      utm_content?: string;
    };
    email = String(body.email || "").trim().toLowerCase();
    sourcePage = String(body.source_page || body.source || "site").trim();
    placement = String(body.placement || "newsletter-form").trim();
    leadMagnet = String(body.lead_magnet || leadMagnet).trim();
    utmSource = String(body.utm_source || "").trim();
    utmMedium = String(body.utm_medium || "").trim();
    utmCampaign = String(body.utm_campaign || "").trim();
    utmContent = String(body.utm_content || "").trim();
  } else {
    const formData = await request.formData();
    email = String(formData.get("email") || "").trim().toLowerCase();
    sourcePage = String(
      formData.get("source_page") || formData.get("source") || "site",
    ).trim();
    placement = String(formData.get("placement") || "newsletter-form").trim();
    leadMagnet = String(formData.get("lead_magnet") || leadMagnet).trim();
    utmSource = String(formData.get("utm_source") || "").trim();
    utmMedium = String(formData.get("utm_medium") || "").trim();
    utmCampaign = String(formData.get("utm_campaign") || "").trim();
    utmContent = String(formData.get("utm_content") || "").trim();
  }

  const result = await subscribeToNewsletter({
    email,
    sourcePage,
    placement,
    leadMagnet,
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
