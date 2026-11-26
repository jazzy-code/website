import type { ImageFile, Localized } from "@/content/projects/types";

export type AppDevice = "desktop" | "phone";

/** One capture of an app, framed as a browser window or a phone. */
export type AppScreen = ImageFile & {
  device: AppDevice;
  alt: Localized<string>;
};

/** One "how it works" step: a short text and the screen that shows it. */
export type AppStep = {
  title: Localized<string>;
  text: Localized<string>;
  screen: AppScreen;
};

export type AppFeatureIcon =
  | "users"
  | "split"
  | "link"
  | "balance"
  | "payment"
  | "login"
  | "pages"
  | "reorder"
  | "merge"
  | "text"
  | "image"
  | "private";

export type AppFeature = {
  icon: AppFeatureIcon;
  title: Localized<string>;
  text: Localized<string>;
};

/**
 * A product of Jazzy Code itself (not client work). Only confirmed
 * information: every claim here must be true of the published app.
 */
export type App = {
  slug: string;
  /** Product name: not translated. */
  name: string;
  /** Public address of the live app. */
  url: string;
  /** Colors of the app's own identity, used on dark surfaces. */
  theme: { accent: string; glow: string };
  logo: ImageFile;
  tagline: Localized<string>;
  summary: Localized<string>;
  /** Vertical (9:16) walkthrough with a Spanish voice-over. */
  video: {
    src: string;
    poster: string;
    /** Length as shown to visitors, e.g. "1:17". */
    duration: string;
    /** Day the video was first published on this site (YYYY-MM-DD). */
    uploaded: string;
    subtitles: { en: string; es: string };
  };
  /** Screens of the opening composition. */
  hero: { desktop: AppScreen; phone: AppScreen };
  steps: readonly AppStep[];
  features: readonly AppFeature[];
  technologies: readonly string[];
};
