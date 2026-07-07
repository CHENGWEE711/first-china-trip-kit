import type { FAQ } from "@/data/faqs";

type FAQSectionProps = {
  faqs: FAQ[];
  title?: string;
};

export function FAQSection({ faqs, title = "FAQ" }: FAQSectionProps) {
  if (faqs.length === 0) {
    return null;
  }

  return (
    <section className="px-4 py-12">
      <div className="mx-auto max-w-5xl">
        <h2 className="text-3xl font-bold leading-tight text-ink">{title}</h2>
        <div className="mt-6 grid gap-4">
          {faqs.map((faq) => (
            <details
              key={faq.question}
              className="group rounded-lg border border-ink/10 bg-paper p-5 shadow-soft"
            >
              <summary className="cursor-pointer list-none text-lg font-bold leading-snug text-ink">
                {faq.question}
              </summary>
              <p className="mt-3 text-base text-ink/68">{faq.answer}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
