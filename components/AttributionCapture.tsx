"use client";

import { useEffect } from "react";
import { captureUtmAttribution } from "@/lib/utm";

export function AttributionCapture() {
  useEffect(() => {
    captureUtmAttribution();
  }, []);

  return null;
}
