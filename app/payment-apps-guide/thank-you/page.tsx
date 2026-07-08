import type { Metadata } from "next";
import { ButtonLink } from "@/components/ButtonLink";
import { CoffeeTipLink } from "@/components/CoffeeTipLink";
import { PageIntro } from "@/components/PageIntro";
import { buildMetadata } from "@/lib/seo";
import { siteConfig } from "@/lib/site";

export const metadata: Metadata = buildMetadata({
  title: "Payment & Apps Setup Guide Thank You | First China Trip Kit",
  description:
    "Thank you page for the China Payment & Apps Setup Guide, with access help and next planning steps.",
  path: "/payment-apps-guide/thank-you",
});

export default function PaymentAppsGuideThankYouPage() {
  const coffeeTipEnabled = Boolean(process.env.NEXT_PUBLIC_COFFEE_TIP_URL);

  return (
    <>
      <PageIntro
        eyebrow="Thank you"
        title="Thanks for supporting First China Trip Kit"
        description="Your Payment & Apps Setup Guide should be available from the checkout provider or confirmation email."
      />
      <section className="px-4 py-12">
        <div className="mx-auto grid max-w-5xl gap-5 md:grid-cols-[1.1fr_0.9fr]">
          <section className="rounded-lg border border-ink/10 bg-paper p-5 shadow-soft">
            <h2 className="text-2xl font-bold leading-tight text-ink">Need help?</h2>
            <p className="mt-3 text-base leading-relaxed text-ink/68">
              If you have trouble accessing it, contact{" "}
              <a href={`mailto:${siteConfig.contactEmail}`} className="font-semibold text-ember">
                {siteConfig.contactEmail}
              </a>
              . Include the email address you used at checkout and the provider
              confirmation number if you have one.
            </p>
            <p className="mt-4 rounded-md border border-ink/10 bg-sand p-4 text-sm leading-relaxed text-ink/62">
              First China Trip Kit provides travel planning information only. We
              do not provide legal, immigration, visa, financial, or official
              government advice. Always verify current official requirements
              before booking or traveling.
            </p>
          </section>
          <section className="rounded-lg border border-ink/10 bg-sand p-5">
            <h2 className="text-2xl font-bold leading-tight text-ink">Next steps</h2>
            <div className="mt-5 grid gap-3">
              <ButtonLink href="/thank-you" variant="ghost">
                Download free checklist
              </ButtonLink>
              <ButtonLink href="/city-kits" variant="ghost">
                Browse City Kits
              </ButtonLink>
              <ButtonLink href="/contact" variant="ghost">
                Ask a China Trip Question
              </ButtonLink>
              {coffeeTipEnabled ? (
                <CoffeeTipLink source="payment-apps-guide-thank-you" className="w-full">
                  Buy us a coffee
                </CoffeeTipLink>
              ) : null}
            </div>
          </section>
        </div>
      </section>
    </>
  );
}
