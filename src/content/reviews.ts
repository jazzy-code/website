import { mockReviews, showMockContent } from "@/content/mock";
import type { ImageFile, Localized } from "@/content/projects/types";

export type Review = {
  /** What the client said, in the languages it is available in. */
  quote: Localized<string>;
  author: string;
  role?: Localized<string>;
  company?: string;
  avatar?: ImageFile;
};

/**
 * Real reviews only, with the client's permission. The section stays hidden
 * while the list is empty, and a review is skipped for a locale without a
 * quote (no fallback to another language).
 */
const realReviews: readonly Review[] = [];

/** True when the list shown is the demo one (see mock.ts). */
export const reviewsAreMock = realReviews.length === 0 && showMockContent;

export const reviews: readonly Review[] = reviewsAreMock ? mockReviews : realReviews;
