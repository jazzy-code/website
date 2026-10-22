import { defineRouting } from "next-intl/routing";

// English is the primary locale: `/` and `/en` both serve it, Spanish lives at `/es`.
export const routing = defineRouting({
  locales: ["en", "es"],
  defaultLocale: "en",
  localePrefix: "as-needed",
  // Keep `/` deterministic (English) instead of redirecting by Accept-Language.
  localeDetection: false,
});

export type Locale = (typeof routing.locales)[number];
