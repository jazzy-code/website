import type { Project } from "./types";

/**
 * Initial portfolio. Order here is the order shown in the catalog.
 *
 * Only the names are confirmed so far. To complete a project, add its
 * `summary`, `description`, `contributions` (per locale), `technologies`,
 * `url` and screenshots (`cover`/`gallery`, files in /public/projects/<slug>/)
 * below — the catalog and detail pages pick them up automatically.
 */
export const projects: readonly Project[] = [
  { slug: "rollstack-docs-website", name: "Rollstack Docs & Website" },
  { slug: "the-world-club", name: "The World Club" },
  { slug: "alpha-wolves-arena", name: "Alpha Wolves Arena" },
  { slug: "rc-multimodal", name: "R&C Multimodal" },
  { slug: "marhaba-marbella", name: "Marhaba Marbella" },
  { slug: "recivip", name: "RECIVIP" },
];
