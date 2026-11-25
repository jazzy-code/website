@AGENTS.md

# Jazzy Code website — agent guide

Bilingual (EN default at `/`, ES at `/es`) site for the software agency **Jazzy Code**
and the portfolio of its founder, Javier Torres. Production: https://jazzycode.com
(Vercel; repo `github.com/jazzy-code/website`, public).

Read this file first. Deeper docs, only when needed:
`docs/design-system.md` (tokens, sections, animations, components),
`docs/content-guide.md` (how to add projects, clients, reviews, services, texts),
`docs/roadmap.md` (open decisions and pending work).

## Stack and commands

Next.js 16.4.6 (App Router, Turbopack, `proxy.ts` instead of middleware), React 19,
strict TypeScript, Tailwind CSS v4 (CSS-first, no `tailwind.config`), `next-intl` 4,
shadcn/ui (only Button and Sheet), `tw-animate-css`, `simple-icons`, `lucide-react`.
pnpm 12, Node 24. Next 16 differs from older versions: check
`node_modules/next/dist/docs/` before using an API you are unsure about.

```bash
pnpm dev        # http://localhost:3000 (use another port if taken: next dev -p 3001)
pnpm typecheck && pnpm lint && pnpm build   # all three must pass; lint has 0 warnings
```

## Hard rules (from the owner — never break them)

1. **Never invent** technologies, metrics, dates, URLs, testimonials, clients or results.
   Only confirmed information. Empty sections hide themselves.
2. **No new dependencies** without the owner's approval (animation libraries were
   allowed in principle, but everything so far is plain CSS + small client components).
3. **Do not commit or push** until the owner has validated the change and asks for it.
   Commit messages end with the `Co-Authored-By` line the harness gives you.
4. **Accessibility is not optional**: contrast (WCAG AA), visible focus, `alt` text,
   one `h1` per page, and `prefers-reduced-motion` respected (see Animations).
5. Everything user-visible exists in **both languages**; keep `messages/en.json` and
   `messages/es.json` in sync (the typed keys come from `en.json`).
6. WhatsApp is intentionally **hidden**. Its code is commented out (contact page,
   footer, CTA) and the number is not rendered anywhere. Leave it that way.

## Map of the repo

```
messages/{en,es}.json        UI texts (namespaces: Metadata, Common, Nav, LanguageSwitcher,
                             Footer, Home, Cta, Services, Contact, Profile, CV, Projects, NotFound)
src/app/[locale]/            pages: page.tsx (home), projects/, projects/[slug]/, services/,
                             profile/, cv/, contact/, not-found.tsx, opengraph-image.tsx
src/app/{globals.css,sitemap.ts,robots.ts}
src/proxy.ts                 next-intl routing (locales en/es, as-needed prefix, no detection)
src/i18n/                    routing.ts, navigation.ts (Link, usePathname), request.ts
src/config/site.ts           site URL (jazzycode.com), email, social links, CV file, nav items
src/content/                 DATA, separate from components: projects/, services.ts, profile.ts,
                             clients.ts, reviews.ts, mock.ts, locations.ts, world-map.ts
src/lib/                     projects.ts (resolve per locale), seo.ts, structured-data.ts,
                             og.tsx, localized.ts (pick), utils.ts (cn)
src/components/layout/       header, footer, language-switcher, mobile-menu, logo-link
src/components/site/         the site's own components (see docs/design-system.md)
src/components/ui/           shadcn: button.tsx, sheet.tsx
public/{images,logos,docs}   screenshots per project, brand logos, CV PDF
```

Data flows: `src/content/*` (typed, bilingual `{ en, es }` objects) → `src/lib/*`
(resolve one locale: `pick`, `getProjects`, …) → pages/components. Components never
hard-code project data.

## Conventions

- Match the surrounding code: comments explain *why*, short, English. Components are
  server components unless they need state/events (`"use client"` only in
  `hero-carousel`, `device-showcase`, `reveal`, `spotlight-card`, `logo-link`,
  `language-switcher`, `mobile-menu`, `ui/sheet`).
- Pages call `setRequestLocale(locale)` and validate with `hasLocale` (see any page).
- Imports use the `@/` alias. Class names via `cn()`.
- Colors come from tokens (`bg-background`, `text-muted-foreground`, `text-brand-soft`,
  `border-border`…), not raw hex — except fixed-look surfaces (dark gradient cards,
  device frames), which use literal hex on purpose so they look the same in light sections.
- Images: `next/image` with the real `width`/`height`. Logos/screens live under `public/`.

## Gotchas that already cost time

- **Tailwind needs literal class names.** Never build `bg-[...${var}...]` dynamically;
  write each full class string in source (see `looks` in `services-grid.tsx`). A single
  arbitrary `bg-[gradient,#hex]` with a trailing plain color is parsed as the wrong
  property: use an inline `style={{ background }}` instead.
- **Vercel served stale CSS** from the restored Turbopack build cache (light sections
  and keyframes missing). Fixed with `experimental.turbopackFileSystemCacheForBuild:
  false` in `next.config.ts`. Do not remove it. If production CSS looks old, redeploy
  without build cache.
- **Scroll after navigation**: `<html data-scroll-behavior="smooth">` is required in
  Next 16 or `scroll-behavior: smooth` stops pages from resetting to the top.
- **`proxy.ts` matcher** is a TS string: write `\\.` (a single `\.` collapses to `.` and
  breaks routes). `icon` and `*opengraph-image` are excluded so they answer directly.
- **Open Graph images** (`src/lib/og.tsx`) read the logo from disk as a data URI.
  `ImageResponse` refuses to fetch localhost URLs (SSRF) and fails the build.
- **Demo content**: `src/content/mock.ts` feeds fake clients/reviews only when
  `NODE_ENV=development` or `NEXT_PUBLIC_MOCK_CONTENT=true`, and only while the real
  list is empty. Production never shows it. Real clients are in `clients.ts`; reviews
  are empty and the section is intentionally not rendered on the home page.
- **`pnpm-workspace.yaml` `allowBuilds`** must list every dependency with install
  scripts as true/false, or Vercel fails with `ERR_PNPM_IGNORED_BUILDS`.
- **Brand icons**: `simple-icons` has no LinkedIn, Zustand, Vuex or Nodemailer marks;
  `tech-icon.tsx` falls back to a generic icon or the first letter.
- **Windows shell**: the cwd can drift into a subfolder between commands. Prefix commands
  with `cd` to the repo root. Do not trust screenshots taken right after a scroll: wait
  ~2 s (reveal animations and smooth scrolling lag).
- Sections using `Reveal` start hidden only when they begin below the fold; jumping
  with `scrollTo` can skip the intersection and leave them hidden for a moment.

## Verification checklist for UI work

Typecheck, lint (0 warnings), build (43 static pages). Then look at it at 390 px,
~800 px and 1280 px, in EN and ES, and confirm no horizontal overflow
(`document.documentElement.scrollWidth === clientWidth`). Motion must stop under
`prefers-reduced-motion`.
