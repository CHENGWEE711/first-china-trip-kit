import { NextResponse } from "next/server";
import { subscribeToNewsletter } from "@/lib/services/newsletter";

export async function POST(request: Request) {
  const contentType = request.headers.get("content-type") || "";
  let email = "";
  let sourcePage = "site";

  if (contentType.includes("application/json")) {
    const body = (await request.json().catch(() => ({}))) as {
      email?: string;
      source_page?: string;
      source?: string;
    };
    email = String(body.email || "").trim().toLowerCase();
    sourcePage = String(body.source_page || body.source || "site").trim();
  } else {
    const formData = await request.formData();
    email = String(formData.get("email") || "").trim().toLowerCase();
    sourcePage = String(
      formData.get("source_page") || formData.get("source") || "site",
    ).trim();
  }

  const result = await subscribeToNewsletter({ email, sourcePage });

  if (!result.ok) {
    return NextResponse.json(
      { ok: false, message: result.message },
      { status: result.status || 400 },
    );
  }

  return NextResponse.json({
    ok: true,
    message: "Thanks for subscribing to First China Trip Kit.",
    provider: result.provider,
  });
}
