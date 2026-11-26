# Design system

Dark Premium look with alternating light bands. Everything lives in
`src/app/globals.css` (tokens, effects, keyframes) and `src/components/`.

## Color tokens

Semantic names follow shadcn/ui so its components work unchanged; the Jazzy Code
identity is in `brand*` and the effects below.

| Token | Dark (default) | Use |
| --- | --- | --- |
| `background` | `#0a0a0d` | page |
| `card` / `surface` | `#15151b` | panels |
| `foreground` | `#f4f4f6` | text |
| `muted-foreground` | `#a1a1ab` | secondary text |
| `border` | `#2e2e38` | hairlines |
| `primary` / `brand` | `#56008c` | **fills, glows, gradients only** (1.67:1 on the background — never text or thin borders) |
| `brand-soft` | `#c79bff` | purple text and links |
| `brand-ring` / `ring` | `#8b5cc4` | borders, focus ring |

Fonts: Space Grotesk (`font-display`, headings) and Inter (body), via `next/font`.

### Light sections

`.theme-light` re-points the same tokens to a light palette (`background #f4f2f7`,
`card #fff`, `muted-foreground #52525c`, `brand-soft #56008c`, `border #d9d3e3`) and paints
an opaque background so the page glows do not show through. Because components only use
tokens, they adapt with no changes. Use it through `<Section tone="light">`.

Home rhythm (dark ↔ light): hero (dark) · services (light) · projects (dark) ·
technologies (light) · client map (dark) · devices (light) · approach (dark) · CTA (dark).
Inner pages: `PageHero` (dark) then alternating bands.

Fixed-look surfaces use literal hex on purpose (so they match in dark and light):
dark gradient cards `bg-[linear-gradient(135deg,#3b0a63_0%,#150821_65%)]` with
`text-white` and accent `#c79bff`; light gradient cards
`bg-[linear-gradient(155deg,#ece3f8_0%,#ffffff_75%)]` (tints `#e9defa #dde6fb #f4def3 #e4e0fa`).

## Layout primitives

- `Section` (`tone="dark" | "light"`, default padding `py-20 sm:py-28`) — full-width band.
- `Container` — `max-w-6xl`, `px-4 sm:px-6`.
- `PageHero` — centered h1 + description + actions over a purple glow; used by every
  inner page (accepts `top` for a back link and `children` for buttons).
- `SectionHeading` — h2 (or `as="h1"`), optional description. No numbers or eyebrow
  labels are used on the home page by design.
- `.surface` / `.surface-interactive` — bordered panel with top highlight; hover lifts it.

## Animations (all CSS unless noted)

| Name | What | Where |
| --- | --- | --- |
| `.rise`, `.rise-soft` (`--d` delay) | entrance on load; `rise-soft` is transform-only so the h1 paints at once | hero, `PageHero` |
| `Reveal` (client) | fades/lifts content in when it scrolls into view; `variant="scale"` for big banners; `delay` staggers | everywhere below the fold |
| `.float` | gentle vertical float | phones in frames |
| `.drift` | scroll-linked parallax (`animation-timeline: view()`, progressive enhancement) | project banners |
| `.marquee` (+`-reverse`, `-pause`) | infinite horizontal scroll, pauses on hover | tech marquee |
| `.art-*` | per-illustration motion; faster on `.group:hover` | service art |
| `.pin-ring` | pulsing map pin | world map |

`Reveal` rules: content is always visible in the server HTML; only elements that start
below the fold are hidden after hydration, so there is no flash and no-JS users see
everything. Reduced motion: a global `@media (prefers-reduced-motion: reduce)` rule sets
animation/transition durations to ~0 and disables the marquee; `Reveal` never hides.

## Component catalog (`src/components/site/`)

| Component | Purpose |
| --- | --- |
| `hero-carousel` (client) | Roulette carousel of every project: centered slide large, neighbors smaller/tilted and anchored at the bottom (transform-origin bottom). Loop, swipe/drag (`touch-action: pan-y`), arrows on desktop hover, dots, pause button, autoplay every 5.5 s (off for reduced motion, paused on hover/focus/drag). Data: `getShowcaseScreens`. |
| `project-banner` | Large project card: text + real screens in `BrowserFrame` + `PhoneFrame`; whole card is one link (stretched from the title). Used on home and `/projects`. |
| `device-showcase` (client) | Pick a project, see the same screen on desktop and phone (cross-fade). Data: `getDeviceScreens` (projects with a phone capture). |
| `device-frames` | `BrowserFrame`, `PhoneFrame` (fixed dark look). |
| `services-grid` + `service-art` + `spotlight-card` (client) | Bento grid of the 6 services: borderless gradient cards, animated SVG illustration per service id, light that follows the pointer. |
| `tech-marquee` + `tech-icon` | Rows of technology tiles (4 rows on phones, 2 from `sm`); brand marks from `simple-icons`, generic icon or initial as fallback. `hasTechIcon(name)` tells if a name has a mark. |
| `world-map` + `client-map-section` | Dotted world map (data: `content/world-map.ts`, generated once from Natural Earth via `world-atlas`, 2° grid) with HTML pins for `content/locations.ts` countries. Pins are country-level, not cities. |
| `clients-strip` | Same-size white tiles with client logos (or a text wordmark). Hidden when empty. |
| `reviews-section` | Client quotes; hidden when empty. **Not rendered on the home page** until real reviews exist. |
| `contact-cta` | Closing brand-gradient banner. |
| `screenshot` | One project screen: browser frame + overlapping phone frame. |
| `skill-groups`, `tag-section` | Profile/CV skill cards; chip list with optional tech icons. |
| `project-card`, `project-media` | `project-card` is **unused** (replaced by banners); `project-media` is the cover fallback on the detail page. |
| `json-ld`, `section*`, `container`, `page-hero`, `reveal` | primitives (see above). |

Layout (`src/components/layout/`): `header` (sticky, glass), `footer` (brand left, link
columns right; add a link group by adding a `<div>` in the columns grid), `logo-link`
(client; on the home page it scrolls to top instead of navigating), `language-switcher`,
`mobile-menu` (Sheet). `wordmark.tsx` is **unused**.

## Apps pages

`/apps` and `/apps/<slug>` look like product launches, unlike the project catalog: each app
has a dark "stage" in its own colors (`stageBackground`, inline because they come from
data) while type, layout and light bands stay Jazzy Code. Pieces: `app-bits` (logo tile,
open button, device badges), `app-devices` (one framed capture),
`app-showreel` (client; 15 s CSS loop: both devices, phone close up, computer forward; pausable,
still under reduced motion), `app-video` (client; loads the
video only on play), `app-steps` (client; pinned device on `lg`, one capture per step below),
`apps-teaser` (home "Our products" banners; apps also lead the hero carousel). Extra CSS: `.aurora` (drifting clouds) and `.shimmer` (headline).

## Responsive notes

- Mobile-first. The hero carousel slide is `min(80vw, 44rem)`; side slides peek in.
- Tech marquee has separate 4-row (phones) and 2-row (≥`sm`) renderings.
- The map keeps the whole world on phones; pins are HTML elements with fixed pixel size.
- `html, body { overflow-x: clip }` and `viewport.minimumScale = 1` guard against
  sideways panning on phones. Grids that can blow out use `grid-cols-1` (not an implicit
  `auto` column) and `min-w-0` on items.

## Accessibility decisions

- Decorative images use `alt=""`; carousel slides are `role="group"` with
  `aria-roledescription="slide"`, inactive ones `aria-hidden`; autoplay has a pause button.
- Language switcher links start their accessible name with the visible code ("ES — …").
- Contrast was checked for the dark and light palettes (values in `globals.css` header).
- Lighthouse on a production build was 100 accessibility / 100 best practices on all
  audited pages at the time of Phase 6 (before the later visual redesigns).
