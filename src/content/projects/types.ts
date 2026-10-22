import type { Locale } from "@/i18n/routing";

/** A value per locale. Missing locales are simply not shown (no fallback). */
export type Localized<T> = Partial<Record<Locale, T>>;

export type ProjectImage = {
  /** Path under /public, e.g. "/projects/recivip/home.webp". */
  src: string;
  width: number;
  height: number;
  alt: Localized<string>;
};

/**
 * Raw project data. Every field except `slug` and `name` is optional and must
 * only be filled with confirmed information; the UI hides what is missing.
 */
export type Project = {
  slug: string;
  /** Brand/project name: not translated. */
  name: string;
  summary?: Localized<string>;
  description?: Localized<string>;
  /** What was contributed to the project, one item per entry. */
  contributions?: Localized<readonly string[]>;
  /** Confirmed technologies only; names are not translated. */
  technologies?: readonly string[];
  /** Public URL of the live project. */
  url?: string;
  cover?: ProjectImage;
  gallery?: readonly ProjectImage[];
};
