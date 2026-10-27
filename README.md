# Jazzy Code — website

Bilingual (English/Spanish) website for the Jazzy Code software agency, with a
portfolio of projects. Next.js App Router, TypeScript (strict), Tailwind CSS v4,
`next-intl` and pnpm.

## Scripts

```bash
pnpm dev        # development server
pnpm build      # production build
pnpm start      # serve the production build
pnpm lint       # ESLint
pnpm typecheck  # tsc --noEmit
```

## Routes and languages

English is the default locale and has no prefix; Spanish lives under `/es`.

| Page     | English     | Spanish        |
| -------- | ----------- | -------------- |
| Home     | `/`         | `/es`          |
| Projects | `/projects` | `/es/projects` |
| Project  | `/projects/<slug>` | `/es/projects/<slug>` |
| Services | `/services` | `/es/services` |
| Profile  | `/profile`  | `/es/profile`  |
| CV       | `/cv`       | `/es/cv`       |
| Contact  | `/contact`  | `/es/contact`  |

`/en/...` redirects to the unprefixed URL.

## Where things live

- `messages/{en,es}.json` — interface texts (keep both files in sync).
- `src/content/projects/` — portfolio data (`index.ts`) and its types. Add or
  edit a project here; catalog, detail pages, sitemap and social images pick it
  up. Only confirmed information goes in; the UI hides empty sections.
- `src/content/services.ts`, `src/content/profile.ts` — services, profile and CV data.
- `src/config/site.ts` — site URL, contact email, social links, CV file.
- `public/images/projects/<folder>/` — project screenshots
  (`image-N.png` desktop, `image-N-mobile.png` phone).
- `public/docs/` — CV PDF.
- `src/components/ui/` — shadcn/ui components in use (Button, Sheet);
  `src/components/site/` — the site's own components.

## Environment variables

Copy `.env.example` to `.env.local` for local overrides. Both are optional:

- `NEXT_PUBLIC_SITE_URL` — final public URL. On Vercel, the production URL is
  used when it is empty.
- `NEXT_PUBLIC_CONTACT_EMAIL` — contact email. A temporary test address is used
  when it is empty.

## Deploying on Vercel

Import the repository; the defaults work (framework Next.js, `pnpm install`,
`pnpm build`). Set `NEXT_PUBLIC_SITE_URL` when a custom domain is attached so
canonical URLs, the sitemap and social images use it.
