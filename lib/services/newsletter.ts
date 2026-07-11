type SubscribeInput = {
  email: string;
  sourcePage?: string;
};

type SubscribeResult = {
  ok: boolean;
  message: string;
  provider?: "supabase" | "brevo" | "supabase+brevo" | "mailchimp" | "resend";
  deliveryStatus?: "active" | "not_configured" | "failed";
  status?: number;
};

const successMessage = "Thanks! Your China First Trip Checklist is on the way.";
const savedWithoutDeliveryMessage =
  "Thanks! Your email was saved. Automated email delivery is temporarily unavailable, so download the checklist on the next page.";

export async function subscribeToNewsletter({
  email,
  sourcePage = "site",
}: SubscribeInput): Promise<SubscribeResult> {
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return { ok: false, message: "Please enter a valid email address.", status: 400 };
  }

  const supabaseReady = Boolean(
    process.env.NEXT_PUBLIC_SUPABASE_URL && process.env.SUPABASE_SERVICE_ROLE_KEY,
  );
  const brevoReady = Boolean(process.env.BREVO_API_KEY && process.env.BREVO_LIST_ID);

  if (supabaseReady) {
    const stored = await subscribeWithSupabase({ email, sourcePage });

    if (!stored.ok && stored.status !== 409) {
      return stored;
    }

    if (brevoReady) {
      const delivered = await subscribeWithBrevo({ email, sourcePage });

      if (stored.status === 409) {
        return stored;
      }

      if (delivered.ok) {
        return {
          ok: true,
          message: successMessage,
          provider: "supabase+brevo",
          deliveryStatus: "active",
        };
      }

      return {
        ok: true,
        message: savedWithoutDeliveryMessage,
        provider: "supabase",
        deliveryStatus: "failed",
      };
    }

    if (stored.status === 409) {
      return stored;
    }

    return {
      ok: true,
      message: savedWithoutDeliveryMessage,
      provider: "supabase",
      deliveryStatus: "not_configured",
    };
  }

  if (brevoReady) {
    return subscribeWithBrevo({ email, sourcePage });
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
      "Newsletter signup is not connected yet. Please use the free checklist download or contact us directly for now.",
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
    `${process.env.NEXT_PUBLIC_SUPABASE_URL}/rest/v1/${table}`,
    {
      method: "POST",
      headers: {
        apikey: key || "",
        Authorization: `Bearer ${key}`,
        "Content-Type": "application/json",
        Prefer: "return=minimal",
      },
      body: JSON.stringify({
        email,
        source: sourcePage,
        status: "subscribed",
        created_at: new Date().toISOString(),
      }),
    },
  );

  if (response.status === 409) {
    return {
      ok: false,
      message: "You’re already subscribed.",
      provider: "supabase",
      status: 409,
    };
  }

  if (!response.ok) {
    return {
      ok: false,
      message: "Subscription could not be saved. Please try again later.",
      provider: "supabase",
      status: response.status,
    };
  }

  return {
    ok: true,
    message: "Thanks! Your email was saved.",
    provider: "supabase",
  };
}

async function subscribeWithBrevo({
  email,
}: Required<SubscribeInput>): Promise<SubscribeResult> {
  const listId = Number(process.env.BREVO_LIST_ID);

  if (!Number.isInteger(listId) || listId <= 0) {
    return {
      ok: false,
      message: "Brevo newsletter delivery is not configured correctly.",
      provider: "brevo",
      deliveryStatus: "failed",
      status: 503,
    };
  }

  const response = await fetch("https://api.brevo.com/v3/contacts", {
    method: "POST",
    headers: {
      Accept: "application/json",
      "api-key": process.env.BREVO_API_KEY || "",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      email,
      listIds: [listId],
      updateEnabled: true,
    }),
  });

  if (!response.ok) {
    const body = await response.text();
    const normalizedBody = body.toLowerCase();

    if (response.status === 400 && normalizedBody.includes("already")) {
      return {
        ok: false,
        message: "You’re already subscribed.",
        provider: "brevo",
        deliveryStatus: "active",
        status: 409,
      };
    }

    return {
      ok: false,
      message: "Your email could not be added to the welcome sequence yet.",
      provider: "brevo",
      deliveryStatus: "failed",
      status: response.status,
    };
  }

  return {
    ok: true,
    message: successMessage,
    provider: "brevo",
    deliveryStatus: "active",
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
        ok: false,
        message: "You’re already subscribed.",
        provider: "mailchimp",
        status: 409,
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
    message: successMessage,
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

  if (response.status === 409) {
    return {
      ok: false,
      message: "You’re already subscribed.",
      provider: "resend",
      status: 409,
    };
  }

  if (!response.ok) {
    return {
      ok: false,
      message: "Subscription could not be completed. Please try again later.",
      provider: "resend",
      status: response.status,
    };
  }

  return {
    ok: true,
    message: successMessage,
    provider: "resend",
  };
}
