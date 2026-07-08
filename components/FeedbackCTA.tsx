import { MessageSquareText } from "lucide-react";
import { ButtonLink } from "@/components/ButtonLink";

type FeedbackCTAProps = {
  sourceLabel?: string;
};

export function FeedbackCTA({ sourceLabel = "guide" }: FeedbackCTAProps) {
  return (
    <section className="px-4 py-10">
      <div className="mx-auto flex max-w-5xl flex-col gap-4 rounded-lg border border-ink/10 bg-paper p-5 shadow-soft sm:flex-row sm:items-center sm:justify-between">
        <div className="flex gap-3">
          <MessageSquareText aria-hidden="true" className="mt-1 shrink-0 text-ember" size={24} />
          <div>
            <p className="text-xl font-bold leading-tight text-ink">Was this guide helpful?</p>
            <p className="mt-2 text-base text-ink/68">
              Tell us what confused you before your China trip.
            </p>
          </div>
        </div>
        <div className="sm:shrink-0">
          <ButtonLink href={`/contact?source=${sourceLabel}`} variant="ghost">
            Ask a China Trip Question
          </ButtonLink>
        </div>
      </div>
    </section>
  );
}
