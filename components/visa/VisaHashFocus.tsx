"use client";

import { useEffect } from "react";

type VisaHashFocusProps = {
  hash: `#${string}`;
  targetId: string;
};

export function VisaHashFocus({ hash, targetId }: VisaHashFocusProps) {
  useEffect(() => {
    function focusHashTarget() {
      if (window.location.hash !== hash) return;

      window.requestAnimationFrame(() => {
        document.getElementById(targetId)?.focus({ preventScroll: true });
      });
    }

    focusHashTarget();
    window.addEventListener("hashchange", focusHashTarget);
    return () => window.removeEventListener("hashchange", focusHashTarget);
  }, [hash, targetId]);

  return null;
}
