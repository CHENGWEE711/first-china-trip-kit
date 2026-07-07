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
            as Supabase, Resend, or Mailchimp when newsletter delivery is enabled.
          </p>
          <h2>Contact</h2>
          <p>Questions can be sent to {siteConfig.contactEmail}.</p>
        </div>
      </section>
    </>
  );
}
