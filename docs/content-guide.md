# Content guide

Rule zero: **only confirmed information**. If a field is unknown, leave it out; the UI
hides empty sections. Never invent metrics, URLs, clients, testimonials or dates.

All data is bilingual: `Localized<T>` = `{ en?: T; es?: T }` (`src/content/projects/types.ts`).
A missing language is simply not shown (no fallback to the other one).

## Add or edit a project — `src/content/projects/index.ts`

Add an object to `projects` (order = order in the catalog). Only `slug` and `name`
are required; `name` is not translated.

```ts
{
  slug: "my-project",
  name: "My Project",
  summary: { en: "...", es: "..." },
  description: { en: "...", es: "..." },
  features: { en: ["..."], es: ["..."] },
  metrics: [{ value: "100+", label: { en: "users", es: "usuarios" } }], // as reported
  technologies: ["Next.js", "PostgreSQL"],   // names, not translated
  infrastructure: ["Vercel", "Neon"],        // hosting/CI, kept apart from the stack
  links: [{ href: "https://…" }],            // only confirmed public URLs
  screens: [{
    alt: { en: "…", es: "…" },
    desktop: { src: "/images/projects/my-project/image-1.png", width: 1336, height: 909 },
    mobile:  { src: "/images/projects/my-project/image-1-mobile.png", width: 417, height: 829 },
  }],                                         // first screen = cover
}
```

- Screenshots go in `public/images/projects/<slug>/` (`image-N.png` desktop,
  `image-N-mobile.png` phone). Use the real pixel size for `width`/`height`.
- Add the slug to `featuredSlugs` to show it among the featured ones on the home page.
- The catalog, detail page, sitemap, hero carousel (first screen with a phone capture, else
  the first screen), device showcase (projects with a phone capture) and OG image pick it
  up automatically.
- New technology names get a brand mark only if listed in `components/site/tech-icon.tsx`
  (`brand` map; import the `si…` icon from `simple-icons`). Otherwise a generic icon or the
  initial is shown. Check the icon exists first (some brands, e.g. LinkedIn, are absent).
- Slugs in use: `rollstack-docs-website`, `the-world-club`, `alpha-wolves-arena`,
  `rc-multimodal`, `marhaba-marbella`, `recivip`.

## Apps (own products) — `src/content/apps/index.ts`

Apps made by Jazzy Code, shown at `/apps`, `/apps/<slug>` and on the home page. Add an
object to `apps` (see `types.ts`): public `url`, accent colors, logo, texts in both
languages, hero screens, "how it works" `steps`, `features` and `technologies` (taken
from the app's own code). Sitemap and OG images pick it up automatically.

- Images: `public/images/apps/<slug>/` (WebP). Keep captures at native resolution (WebP quality 95): phone 1179×2556, desktop 2880×1800
  (the sizes are assumed by the `screen()` helper). Use test data only: the repo is public.
- Video: `public/videos/apps/<slug>.mp4` (720×1280, H.264 CRF 27, AAC, `+faststart`, a few
  MB) with `<slug>.en.vtt` and `<slug>.es.vtt`, plus `poster.webp` in the images folder.
  The originals are rendered by the Jazzy Studio project, outside this repo.
- The current videos have a Spanish voice-over and Spanish on-screen text. When English
  versions exist, give `video()` a source per locale and drop the default English subtitles.

## SEO

Section pages take their `<title>` and description from `metaTitle` / `metaDescription`
in `messages/*`, and need an `opengraph-image.tsx` of their own (see
`renderSectionOgImage`). Icons: `src/app/{favicon.ico,icon.png,apple-icon.png,manifest.ts}`.
A replaced app video needs its new `uploaded` date.

## Social pages — `siteConfig.follow`

Jazzy Code's Facebook and Instagram: footer icons, contact page and Organization JSON-LD.

## Clients — `src/content/clients.ts`

Add `{ name, logo: { src, width, height } }` to `realClients`; files in
`public/images/clients/`. Any format works (SVG, PNG, WebP, JPG). Logos render on same-size
white tiles, so JPGs with a white background look fine; transparency is nicer. Use the real
pixel size. Without `logo`, the name is shown as text. Empty list = section hidden.

## Reviews — `src/content/reviews.ts`

Add real reviews (with the client's permission) to `realReviews`:
`{ quote: {en, es}, author, role?: {en, es}, company?, avatar? }`. The component
`reviews-section.tsx` already exists but is **not rendered on the home page**; when real
reviews exist, import and render `<ReviewsSection locale={locale} />` in
`src/app/[locale]/page.tsx` (a placeholder comment marks the spot).

## Demo content — `src/content/mock.ts`

Fake clients/reviews to design with. Shown only in `pnpm dev` or when
`NEXT_PUBLIC_MOCK_CONTENT=true`, and only while the real list is empty. Never in
production by default.

## Services — `src/content/services.ts`

Six entries (`web`, `custom-software`, `dashboards`, `apis`, `automation`, `cloud`), each
with `name`, `problem`, `examples` (illustrative deliverables, **not** claims of delivered
work). A new service id also needs an illustration in `service-art.tsx` (`art` map) and a
look in `services-grid.tsx` (`looks`), otherwise it falls back to the dashboards look and
no illustration.

## Profile / CV — `src/content/profile.ts`

Taken from `public/docs/CV_JavierTorres_2026.pdf` (English). Spanish text is a translation.
The PDF is public on purpose. `siteConfig.cv` in `src/config/site.ts` points to it; add a
Spanish PDF there when it exists.

## Client countries — `src/content/locations.ts`

Countries with clients (Mexico, United States, Canada, Peru, Brazil, Spain, Andorra) with
approximate center `lon/lat`; labels via `label: "top" | "left" | …`. Country level only.

## Site settings — `src/config/site.ts`

Production URL `https://jazzycode.com` (used by canonical URLs, sitemap, hreflang, OG),
contact email `hello@jazzycode.com`, LinkedIn/GitHub links, CV file, nav items. The
WhatsApp number is stored but unused (UI commented out).

## UI texts — `messages/{en,es}.json`

Add the key to **both** files. Types come from `en.json` (`src/global.d.ts`), so a missing
key in code is a type error. Use ICU placeholders like `{count}`/`{name}`.
The `Home` namespace also holds some now-unused keys (old eyebrows); they are harmless.

## SEO

`src/lib/seo.ts` builds metadata (canonical + hreflang with `x-default` = English,
Open Graph, Twitter). `og:locale` for Spanish is `es_MX` (an assumption). Images:
`opengraph-image.tsx` at the root and per project, rendered with `next/og` using
`logo-white.png`. JSON-LD (Organization, WebSite, Person, Breadcrumb) is in
`src/lib/structured-data.ts`.
