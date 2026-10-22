import type { Locale } from "@/i18n/routing";

/** A value per locale. Missing locales are simply not shown (no fallback). */
export type Localized<T> = Partial<Record<Locale, T>>;

export type ImageFile = {
  /** Path under /public, e.g. "/images/projects/recivip/image-1.png". */
  src: string;
  /** Intrinsic size in pixels. */
  width: number;
  height: number;
};

/**
 * One real screen of the project. `mobile` is the same screen on a phone and
 * only exists when such a capture is available. The first screen of a project
 * is its cover.
 */
export type ProjectScreen = {
  /** Describes the screen; the mobile capture reuses it. */
  alt: Localized<string>;
  desktop: ImageFile;
  mobile?: ImageFile;
};

export type ProjectLink = {
  href: string;
  /** Button text; the generic "Visit project" is used when omitted. */
  label?: Localized<string>;
};

export type ProjectMetric = {
  /** Figure as reported, e.g. "100+". */
  value: string;
  /** What the figure counts, e.g. "users". */
  label: Localized<string>;
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
  /** Confirmed features, one item per entry. */
  features?: Localized<readonly string[]>;
  /**
   * Reach figures reported by the author, shown as-is ("100+" users). Never
   * attach periods, rates or growth to them.
   */
  metrics?: readonly ProjectMetric[];
  /** Confirmed technologies only; names are not translated. */
  technologies?: readonly string[];
  /** Hosting, cloud services and CI/CD, kept apart from the tech stack. */
  infrastructure?: readonly string[];
  /** Public URLs of the live project; leave out when none is confirmed. */
  links?: readonly ProjectLink[];
  /** Real screenshots in display order; the first one is the cover. */
  screens?: readonly ProjectScreen[];
};
