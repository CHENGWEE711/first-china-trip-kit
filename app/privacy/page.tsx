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
            We use Google Analytics to understand website traffic, page usage,
            and user interactions. Analytics may record page views, approximate
            device and location information, and interactions such as checklist,
            store, tool, contact, and WhatsApp link clicks. We use this aggregated
            information to improve the site and understand which resources are useful.
          </p>
          <h2>Newsletter</h2>
          <p>
            If you subscribe to our newsletter, your email address and signup source
            may be processed through our email marketing provider. Brevo currently
            stores website newsletter contacts when the integration is configured.
            We do not claim that a subscription succeeded when the provider is unavailable.
          </p>
          <p>
            Automated marketing emails are not sent while the Brevo workflow is
            inactive. If a welcome series is enabled later, each marketing email
            will include an unsubscribe option. Brevo processes email addresses
            and related delivery activity under its own privacy policy.
          </p>
          <h2>External services</h2>
          <p>
            When you click WhatsApp links, Payhip purchase links, PayPal or other
            external payment links, you leave firstchinatripkit.com and interact
            with third-party services. Their privacy policies and terms apply to
            information you provide on those services.
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
