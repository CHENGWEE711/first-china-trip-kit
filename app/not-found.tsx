import { ButtonLink } from "@/components/ButtonLink";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Page Not Found | First China Trip Kit",
  description: "This First China Trip Kit page is not available.",
  path: "/404",
});

export default function NotFound() {
  return (
    <section className="bg-sand px-4 py-20">
      <div className="mx-auto max-w-3xl">
        <p className="mb-3 text-sm font-bold uppercase text-ember">404</p>
        <h1 className="text-4xl font-bold leading-tight text-ink">This travel page is not available</h1>
        <p className="mt-4 text-lg text-ink/70">
          The guide may have moved, or the route has not been published yet.
        </p>
        <div className="mt-7">
          <ButtonLink href="/">Return home</ButtonLink>
        </div>
      </div>
    </section>
  );
}
