import type { MetadataRoute } from "next";
import { routing } from "@/i18n/routing";
import { getAppSlugs } from "@/lib/apps";
import { getProjectSlugs } from "@/lib/projects";
import { absoluteUrl } from "@/lib/seo";

const staticPaths = ["/", "/projects", "/apps", "/services", "/profile", "/cv", "/contact"];

/** One entry per page and locale, each pointing to its translations. */
export default function sitemap(): MetadataRoute.Sitemap {
  const paths = [
    ...staticPaths,
    ...getProjectSlugs().map((slug) => `/projects/${slug}`),
    ...getAppSlugs().map((slug) => `/apps/${slug}`),
  ];

  return paths.flatMap((href) =>
    routing.locales.map((locale) => ({
      url: absoluteUrl(locale, href),
      alternates: {
        languages: Object.fromEntries(
          routing.locales.map((code) => [code, absoluteUrl(code, href)]),
        ),
      },
    })),
  );
}
