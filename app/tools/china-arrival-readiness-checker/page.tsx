import type { Metadata } from "next";
import Link from "next/link";
import { ArrivalReadinessChecker } from "@/components/ArrivalReadinessChecker";
import { SEOJsonLd } from "@/components/SEOJsonLd";
import { NewsletterSignup } from "@/components/NewsletterSignup";
import { breadcrumbJsonLd } from "@/lib/seo";
import { absoluteUrl, siteConfig } from "@/lib/site";
import { buildMetadata } from "@/lib/seo";

const path = "/tools/china-arrival-readiness-checker";

export const metadata: Metadata = buildMetadata({
  title: "China Arrival Readiness Checker | First China Trip Kit",
  description: "Answer 12 practical China arrival checks for entry, payments, apps, mobile data, transport, hotel details and emergency backups. Get a 0-100 readiness score and a personal to-do list.",
  path,
});

const toolSchema = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  name: "China Arrival Readiness Checker",
  applicationCategory: "TravelApplication",
  operatingSystem: "Any",
  url: absoluteUrl(path),
  description: "A private, browser-based checklist that helps first-time visitors prepare for arrival in China without entering sensitive personal information.",
  publisher: { "@type": "Organization", name: siteConfig.name, url: siteConfig.siteUrl },
};

export default function ChinaArrivalReadinessCheckerPage() {
  return (
    <>
      <SEOJsonLd data={[toolSchema, breadcrumbJsonLd([
        { name: "Home", path: "/" },
        { name: "Tools", path: "/tools" },
        { name: "China Arrival Readiness Checker", path },
      ])]} />
      <section className="bg-sand px-4 py-14 md:py-18">
        <div className="mx-auto max-w-5xl">
          <nav aria-label="Breadcrumb" className="text-sm text-ink/58"><Link href="/" className="hover:text-ember">Home</Link><span aria-hidden="true" className="mx-2">/</span><Link href="/tools" className="hover:text-ember">Tools</Link></nav>
          <h1 className="mt-6 max-w-4xl text-4xl font-bold leading-tight text-ink md:text-5xl">China Arrival Readiness Checker</h1>
          <p className="mt-5 max-w-3xl text-lg leading-relaxed text-ink/70">See what is ready before your first China arrival - entry, payment, essential apps, internet, transport, hotel details and a calm emergency backup. Get a direct score and next steps in about three minutes.</p>
          <div className="mt-6 flex flex-wrap gap-3 text-sm font-semibold text-ink/62"><span className="rounded-md border border-ink/10 bg-paper px-3 py-2">12 practical checks</span><span className="rounded-md border border-ink/10 bg-paper px-3 py-2">0-100 score</span><span className="rounded-md border border-ink/10 bg-paper px-3 py-2">No sensitive data requested</span></div>
        </div>
      </section>
      <section className="px-4 py-12 md:py-16"><div className="mx-auto max-w-5xl"><ArrivalReadinessChecker /></div></section>
      <NewsletterSignup />
    </>
  );
}
