type SubscribeInput = {
  email: string;
  sourcePage?: string;
  placement?: string;
  leadMagnet?: string;
  utmSource?: string;
  utmMedium?: string;
  utmCampaign?: string;
  utmContent?: string;
  consentTimestamp?: string;
};

type SubscribeResult = {
  ok: boolean;
  message: string;
  provider?: "supabase" | "brevo" | "supabase+brevo" | "mailchimp" | "resend";
  deliveryStatus?: "active" | "not_configured" | "failed";
  status?: number;
};

const successMessage =
  "Thanks! You're subscribed. Your China First Trip Checklist is ready on the next page.";
const savedWithoutDeliveryMessage =
  "Thanks! Your email was saved. Automated email delivery is temporarily unavailable, so download the checklist on the next page.";

export async function subscribeToNewsletter({
  email,
  sourcePage = "site",
  placement = "newsletter-form",
  leadMagnet = "China First Trip Checklist",
  utmSource = "",
  utmMedium = "",
  utmCampaign = "",
  utmContent = "",
  consentTimestamp = new Date().toISOString(),
}: SubscribeInput): Promise<SubscribeResult> {
  const subscription = {
    email,
    sourcePage,
    placement,
    leadMagnet,
    utmSource,
    utmMedium,
    utmCampaign,
    utmContent,
    consentTimestamp,
  };
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return { ok: false, message: "Please enter a valid email address.", status: 400 };
  }

  const supabaseReady = Boolean(
    process.env.NEXT_PUBLIC_SUPABASE_URL && process.env.SUPABASE_SERVICE_ROLE_KEY,
  );
  const brevoReady = Boolean(process.env.BREVO_API_KEY && process.env.BREVO_LIST_ID);

  if (supabaseReady) {
    const stored = await subscribeWithSupabase(subscription);

    if (!stored.ok && stored.status !== 409) {
      return stored;
    }

    if (brevoReady) {
      const delivered = await subscribeWithBrevo(subscription);

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

      if (delivered.status === 409) {
        return delivered;
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
    return subscribeWithBrevo(subscription);
  }

  if (process.env.MAILCHIMP_API_KEY && process.env.MAILCHIMP_LIST_ID) {
    return subscribeWithMailchimp(subscription);
  }

  if (process.env.RESEND_API_KEY && process.env.RESEND_AUDIENCE_ID) {
    return subscribeWithResend(subscription);
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
}: SubscribeInput & { email: string; sourcePage: string }): Promise<SubscribeResult> {
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
  sourcePage,
  placement,
  leadMagnet,
  utmSource,
  utmMedium,
  utmCampaign,
  utmContent,
  consentTimestamp,
}: SubscribeInput & { email: string; sourcePage: string }): Promise<SubscribeResult> {
  const listId = Number(process.env.BREVO_LIST_ID);
  const apiKey = process.env.BREVO_API_KEY || "";
  const attributes = {
    SIGNUP_SOURCE: placement || "newsletter-form",
    SIGNUP_PAGE: sourcePage,
    UTM_SOURCE: utmSource || "",
    UTM_MEDIUM: utmMedium || "",
    UTM_CAMPAIGN: utmCampaign || "",
    UTM_CONTENT: utmContent || "",
    LEAD_MAGNET: leadMagnet || "China First Trip Checklist",
    CONSENT_TIMESTAMP: consentTimestamp || new Date().toISOString(),
  };

  if (!Number.isInteger(listId) || listId <= 0) {
    return {
      ok: false,
      message: "Brevo newsletter delivery is not configured correctly.",
      provider: "brevo",
      deliveryStatus: "failed",
      status: 503,
    };
  }

  const contactUrl = `https://api.brevo.com/v3/contacts/${encodeURIComponent(email)}`;
  const existingContact = await fetch(contactUrl, {
    headers: {
      Accept: "application/json",
      "api-key": apiKey,
    },
  });

  if (existingContact.ok) {
    const contact = (await existingContact.json()) as { listIds?: number[] };

    if (contact.listIds?.includes(listId)) {
      return {
        ok: false,
        message: "You’re already subscribed.",
        provider: "brevo",
        deliveryStatus: "active",
        status: 409,
      };
    }

    const addToList = await fetch(contactUrl, {
      method: "PUT",
      headers: {
        Accept: "application/json",
        "api-key": apiKey,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ listIds: [listId], attributes }),
    });

    if (!addToList.ok) {
      return {
        ok: false,
        message: "Your email could not be added to the welcome sequence yet.",
        provider: "brevo",
        deliveryStatus: "failed",
        status: addToList.status,
      };
    }

    return {
      ok: true,
      message: successMessage,
      provider: "brevo",
      deliveryStatus: "active",
    };
  }

  if (existingContact.status !== 404) {
    return {
      ok: false,
      message: "Your email could not be added to the welcome sequence yet.",
      provider: "brevo",
      deliveryStatus: "failed",
      status: existingContact.status,
    };
  }

  const response = await fetch("https://api.brevo.com/v3/contacts", {
    method: "POST",
    headers: {
      Accept: "application/json",
      "api-key": apiKey,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      email,
      listIds: [listId],
      attributes,
      updateEnabled: false,
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
