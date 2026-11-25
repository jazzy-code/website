# Roadmap and open decisions

Status at the time of writing: the site is live at https://jazzycode.com. Next.js was upgraded to 16.4.6 (the 16.4.2 build showed a security notice; `pnpm audit --prod` is clean). Phases 1–6
(foundation, visual system, projects, content/pages/SEO, accessibility/security headers,
deploy) and the visual redesign (alternating sections, hero carousel, bento services, map,
client logos, mobile fixes) are done. `pnpm typecheck`, `pnpm lint` (0 warnings) and
`pnpm build` pass.

## Decisions already taken (do not reopen without the owner)

- English is the main language (`/`), Spanish under `/es`; `/en/...` redirects to `/`.
- Contact is by email (`hello@jazzycode.com`), LinkedIn and GitHub. **No contact form.**
- WhatsApp is not used for now (code kept commented; number not rendered).
- Repo is public; the CV PDF and the personal data in it are public on purpose.
- Domain: `jazzycode.com`.
- The "Services" layout issue seen on phones was fixed by the owner's confirmation.

## Pending / ideas

- **Real reviews**: fill `src/content/reviews.ts` and render `ReviewsSection` on the home
  page (currently not rendered). Needs the clients' permission.
- **More clients**: add logos to `src/content/clients.ts` as they are confirmed.
- **Spanish CV PDF**: add a file and a locale-aware `siteConfig.cv`.
- **Lighthouse re-run** on the production domain after the redesign (last full audit was
  at Phase 6: a11y 100, best practices 100, performance 92–96 mobile).
- **Social image typography**: OG images use the default font, not Space Grotesk.
- **`/fr/opengraph-image`** (unknown locale) returns the English image instead of 404.
- **Unused code** that can be deleted when convenient: `components/layout/wordmark.tsx`,
  `components/site/project-card.tsx`, `lib/contact.ts` (`whatsappUrl`), the `Footer.whatsapp`
  and `Home` eyebrow message keys.
- **Optional**: pause/disable the hero carousel autoplay per user preference storage;
  more projects in the catalog; blog or case-study pages (not requested).

## How to work on this repo with the owner

- Show the result (screenshots at 390/800/1280 px, EN and ES) and wait for validation
  before committing; the owner then asks for commit/push.
- Mobile bugs sometimes appear only on a real phone, not in browser emulation: when
  something cannot be reproduced, add defensive fixes and ask for device/browser details.
- Vercel deploys on push to `main`. If production CSS looks old, see the Turbopack cache
  gotcha in `CLAUDE.md`.
