type SubscribeInput = {
  email: string;
  sourcePage?: string;
};

type SubscribeResult = {
  ok: boolean;
  message: string;
  provider?: "supabase" | "mailchimp" | "resend";
  status?: number;
};

export async function subscribeToNewsletter({
  email,
  sourcePage = "site",
}: SubscribeInput): Promise<SubscribeResult> {
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return { ok: false, message: "Please enter a valid email address.", status: 400 };
  }

  if (process.env.SUPABASE_URL && process.env.SUPABASE_SERVICE_ROLE_KEY) {
    return subscribeWithSupabase({ email, sourcePage });
  }

  if (process.env.MAILCHIMP_API_KEY && process.env.MAILCHIMP_LIST_ID) {
    return subscribeWithMailchimp({ email, sourcePage });
  }

  if (process.env.RESEND_API_KEY && process.env.RESEND_AUDIENCE_ID) {
    return subscribeWithResend({ email, sourcePage });
  }

  return {
    ok: false,
    message:
      "Newsletter signup is not connected yet. Please contact us directly for now.",
    status: 503,
  };
}

async function subscribeWithSupabase({
  email,
  sourcePage,
}: Required<SubscribeInput>): Promise<SubscribeResult> {
  const table = process.env.SUPABASE_NEWSLETTER_TABLE || "newsletter_subscribers";
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY || "";
  const response = await fetch(
    `${process.env.SUPABASE_URL}/rest/v1/${table}?on_conflict=email`,
    {
      method: "POST",
      headers: {
        apikey: key || "",
        Authorization: `Bearer ${key}`,
        "Content-Type": "application/json",
        Prefer: "resolution=merge-duplicates,return=minimal",
      },
      body: JSON.stringify({
        email,
        source_page: sourcePage,
        created_at: new Date().toISOString(),
      }),
    },
  );

  if (!response.ok) {
    return {
      ok: false,
      message: "Subscription could not be saved. Please try again later.",
      provider: "supabase",
    };
  }

  return {
    ok: true,
    message: "Thanks for subscribing.",
    provider: "supabase",
  };
}

async function subscribeWithMailchimp({
  email,
  sourcePage,
}: Required<SubscribeInput>): Promise<SubscribeResult> {
  const apiKey = process.env.MAILCHIMP_API_KEY || "";
  const listId = process.env.MAILCHIMP_LIST_ID || "";
  const datacenter = apiKey.split("-")[1];

  if (!datacenter) {
    return {
      ok: false,
      message: "Mailchimp API key is missing its datacenter suffix.",
      provider: "mailchimp",
    };
  }

  const response = await fetch(`https://${datacenter}.api.mailchimp.com/3.0/lists/${listId}/members`, {
    method: "POST",
    headers: {
      Authorization: `Basic ${Buffer.from(`anystring:${apiKey}`).toString("base64")}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      email_address: email,
      status: "subscribed",
      tags: [sourcePage],
    }),
  });

  if (!response.ok) {
    const text = await response.text();
    if (response.status === 400 && text.toLowerCase().includes("already")) {
      return {
        ok: true,
        message: "You are already subscribed.",
        provider: "mailchimp",
      };
    }

    return {
      ok: false,
      message: "Subscription could not be completed. Please try again later.",
      provider: "mailchimp",
    };
  }

  return {
    ok: true,
    message: "Thanks for subscribing.",
    provider: "mailchimp",
  };
}

async function subscribeWithResend({
  email,
  sourcePage,
}: Required<SubscribeInput>): Promise<SubscribeResult> {
  const response = await fetch(
    `https://api.resend.com/audiences/${process.env.RESEND_AUDIENCE_ID}/contacts`,
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${process.env.RESEND_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email,
        unsubscribed: false,
        firstName: sourcePage,
      }),
    },
  );

  if (!response.ok && response.status !== 409) {
    return {
      ok: false,
      message: "Subscription could not be completed. Please try again later.",
      provider: "resend",
    };
  }

  return {
    ok: true,
    message: response.status === 409 ? "You are already subscribed." : "Thanks for subscribing.",
    provider: "resend",
  };
}
