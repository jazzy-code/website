import { readFile } from "node:fs/promises";
import path from "node:path";
import { hasLocale } from "next-intl";
import { ImageResponse } from "next/og";
import { getTranslations } from "next-intl/server";
import { routing } from "@/i18n/routing";

export const ogSize = { width: 1200, height: 630 };
export const ogContentType = "image/png";

type OgImageProps = {
  title: string;
  /** Small line above the title, e.g. the section name. */
  eyebrow?: string;
  description?: string;
};

/** Cuts at a word boundary so previews never end mid-word. */
function truncate(text: string, max: number) {
  if (text.length <= max) return text;
  const cut = text.slice(0, max - 1);
  return `${cut.slice(0, cut.lastIndexOf(" "))}…`;
}

let logoDataUri: string | undefined;

/**
 * The logo is embedded as a data URI read from disk: ImageResponse refuses to
 * fetch local URLs (SSRF protection), which breaks the build. The white
 * variant is used because the primary purple has too little contrast on the
 * dark card.
 */
async function getLogo() {
  if (!logoDataUri) {
    const file = path.join(process.cwd(), "public", "logos", "logo-white.png");
    logoDataUri = `data:image/png;base64,${(await readFile(file)).toString("base64")}`;
  }
  return logoDataUri;
}

/**
 * Brand card for social previews: dark background, purple glow, logo and
 * text only. No screenshots, so it never exposes project data.
 */
export async function renderOgImage({
  title,
  eyebrow,
  description,
}: OgImageProps) {
  const logo = await getLogo();
  const titleSize = title.length > 60 ? 60 : title.length > 18 ? 76 : 96;

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "72px",
          color: "#F4F4F6",
          background:
            "radial-gradient(circle at 85% 0%, rgba(86,0,140,0.75), rgba(10,10,13,0) 60%), #0A0A0D",
        }}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={logo}
          width={154}
          height={120}
          alt="Jazzy Code"
        />
        <div style={{ display: "flex", flexDirection: "column" }}>
          {eyebrow && (
            <div
              style={{
                display: "flex",
                fontSize: 28,
                letterSpacing: 4,
                textTransform: "uppercase",
                color: "#C79BFF",
                marginBottom: 24,
              }}
            >
              {eyebrow}
            </div>
          )}
          <div
            style={{
              display: "flex",
              fontSize: titleSize,
              fontWeight: 700,
              lineHeight: 1.05,
            }}
          >
            {title}
          </div>
          {description && (
            <div
              style={{
                display: "flex",
                fontSize: 30,
                lineHeight: 1.35,
                color: "#A1A1AB",
                marginTop: 28,
                maxWidth: 1000,
              }}
            >
              {truncate(description, 130)}
            </div>
          )}
        </div>
      </div>
    ),
    ogSize,
  );
}

/**
 * Card of a section page, from its `metaTitle` and `metaDescription`. Each
 * section needs its own `opengraph-image.tsx`: a page that sets `openGraph`
 * does not inherit the home one.
 */
export async function renderSectionOgImage(
  params: Promise<{ locale: string }>,
  namespace: "Projects" | "Apps" | "Services" | "Contact" | "Profile" | "CV",
) {
  const { locale } = await params;
  const lang = hasLocale(routing.locales, locale)
    ? locale
    : routing.defaultLocale;
  const t = await getTranslations({ locale: lang, namespace });

  return renderOgImage({
    eyebrow: "jazzycode.com",
    title: t("metaTitle"),
    description: t("metaDescription"),
  });
}
