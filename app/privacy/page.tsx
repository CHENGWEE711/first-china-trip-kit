import type { Metadata } from "next";
import { PageIntro } from "@/components/PageIntro";
import { buildMetadata } from "@/lib/seo";
import { siteConfig } from "@/lib/site";

export const metadata: Metadata = buildMetadata({
  title: "Privacy Policy | First China Trip Kit",
  description:
    "Privacy policy for First China Trip Kit, including newsletter data, analytics, and contact information.",
  path: "/privacy",
});

export default function PrivacyPage() {
  return (
    <>
      <PageIntro
        eyebrow="Privacy"
        title="Privacy Policy"
        description="How First China Trip Kit handles newsletter emails, analytics events, and contact messages."
      />
      <section className="px-4 py-12">
        <div className="content-prose mx-auto max-w-4xl rounded-lg border border-ink/10 bg-paper p-5 shadow-soft">
          <h2>Information we collect</h2>
          <p>
            If you subscribe to the newsletter, we collect your email address and
            the source page or form used for signup. If you contact us, we may
            receive your email address and message content.
          </p>
          <h2>How we use information</h2>
          <p>
            We use this information to send travel planning updates, deliver free
            resources, respond to messages, and improve the website experience.
          </p>
          <h2>Analytics</h2>
          <p>
            The site may send basic newsletter submission events to analytics
            tools. These events are used to understand which pages help visitors
            plan more effectively.
          </p>
          <h2>Third-party services</h2>
          <p>
            Newsletter storage or email delivery may be handled by providers such
            as Supabase and Brevo when newsletter delivery is enabled. Legacy or
            alternative delivery integrations may include Resend or Mailchimp.
          </p>
          <h2>Brevo email sequence</h2>
          <p>
            When the Brevo integration is active, an email subscriber may be added
            to a First China Trip Kit contact list in Brevo. Brevo then sends the
            checklist and a short first-trip planning series covering payment,
            essential apps, arrival-day preparation, cities, and routes.
          </p>
          <p>
            Each marketing email provides an unsubscribe option. Unsubscribing
            stops future marketing messages from that list. Brevo processes email
            addresses and delivery activity under its own privacy policy.
          </p>
          <h2>Purchases and external checkout</h2>
          <p>
            Digital product purchases are handled through Payhip. When you click a
            Payhip purchase or download link, you leave firstchinatripkit.com and
            complete checkout through Payhip.
          </p>
          <h2>Payment information</h2>
          <p>
            Payment information is processed by Payhip and its supported payment
            providers, such as PayPal or card payment processors. First China Trip
            Kit does not directly collect or store credit card numbers, PayPal login
            details, banking details, or payment account credentials.
          </p>
          <h2>Order-related information</h2>
          <p>
            We may receive limited order-related information from Payhip, such as
            your email address, product purchased, order status, and purchase time,
            for customer support and product access purposes.
          </p>
          <h2>Third-party policies</h2>
          <p>
            Payhip and payment providers have their own privacy policies and terms.
            Please review them at checkout.
          </p>
          <h2>WhatsApp contact</h2>
          <p>
            When you click our WhatsApp contact link, you leave
            firstchinatripkit.com and communicate through WhatsApp. WhatsApp and
            Meta may process your phone number, profile information, messages,
            device information, and related usage data under their own privacy
            policies.
          </p>
          <p>
            We do not ask users to share passwords, verification codes, payment
            credentials, banking information, or identity documents through
            WhatsApp.
          </p>
          <p>
            Please avoid sending sensitive personal or financial information
            through WhatsApp.
          </p>
          <h2>Contact</h2>
          <p>Questions can be sent to {siteConfig.contactEmail}.</p>
        </div>
      </section>
    </>
  );
}
