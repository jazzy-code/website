import { ImageResponse } from "next/og";

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

/**
 * Brand card for social previews: dark background, purple glow, wordmark and
 * text only. No screenshots, so it never exposes project data.
 */
export function renderOgImage({ title, eyebrow, description }: OgImageProps) {
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
        <div style={{ display: "flex", fontSize: 40, fontWeight: 700 }}>
          Jazzy<span style={{ color: "#C79BFF" }}>Code</span>
        </div>
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
