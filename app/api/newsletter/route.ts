import { NextResponse } from "next/server";
import { subscribeToNewsletter } from "@/lib/services/newsletter";

export async function POST(request: Request) {
  const formData = await request.formData();
  const email = String(formData.get("email") || "").trim().toLowerCase();
  const source = String(formData.get("source") || "site").trim();

  const result = await subscribeToNewsletter({ email, source });

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
