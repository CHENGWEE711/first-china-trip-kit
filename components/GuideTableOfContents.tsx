"use client";

import { useEffect, useMemo, useState } from "react";
import { createSectionId } from "@/lib/section-id";

type GuideTableOfContentsProps = {
  entries: string[];
};

export function GuideTableOfContents({ entries }: GuideTableOfContentsProps) {
  const ids = useMemo(() => entries.map(createSectionId), [entries]);
  const [activeId, setActiveId] = useState(ids[0] || "");

  useEffect(() => {
    const updateFromHash = () => {
      const hashId = decodeURIComponent(window.location.hash.slice(1));
      if (hashId && ids.includes(hashId)) setActiveId(hashId);
    };

    updateFromHash();
    window.addEventListener("hashchange", updateFromHash);

    const sections = ids
      .map((id) => document.getElementById(id))
      .filter((section): section is HTMLElement => Boolean(section));
    let animationFrame = 0;
    const updateFromScroll = () => {
      cancelAnimationFrame(animationFrame);
      animationFrame = requestAnimationFrame(() => {
        const current = [...sections]
          .reverse()
          .find((section) => section.getBoundingClientRect().top <= 144) || sections[0];
        if (current?.id) setActiveId(current.id);
      });
    };

    updateFromScroll();
    window.addEventListener("scroll", updateFromScroll, { passive: true });
    return () => {
      cancelAnimationFrame(animationFrame);
      window.removeEventListener("scroll", updateFromScroll);
      window.removeEventListener("hashchange", updateFromHash);
    };
  }, [ids]);

  return (
    <nav aria-label="Guide contents" className="sticky top-28 border-t border-ink/20 pt-5">
      <p className="text-xs font-bold uppercase tracking-[0.14em] text-[#963028]">In this guide</p>
      <ol className="mt-4 grid gap-1 text-sm leading-snug">
        {entries.map((entry, index) => {
          const id = ids[index];
          const active = activeId === id;
          return (
            <li key={entry}>
              <a
                href={`#${id}`}
                aria-current={active ? "location" : undefined}
                className={`grid min-h-10 grid-cols-[1.5rem_1fr] gap-2 border-l-2 py-2 pl-3 transition ${
                  active
                    ? "border-ember bg-paper font-semibold text-ink"
                    : "border-transparent text-ink/65 hover:border-ink/20 hover:text-ember"
                }`}
              >
                <span aria-hidden="true" className="font-editorial text-ink/40">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <span>{entry}</span>
              </a>
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
