import type { Localized } from "@/content/projects/types";
import type { Locale } from "@/i18n/routing";

/** Value for a locale; undefined when that language has not been written. */
export function pick<T>(
  value: Localized<T>,
  locale: Locale,
): T | undefined {
  return value[locale];
}
