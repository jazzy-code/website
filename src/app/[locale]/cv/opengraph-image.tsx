import { routing } from "@/i18n/routing";
import { ogContentType, ogSize, renderSectionOgImage } from "@/lib/og";

export const size = ogSize;
export const contentType = ogContentType;

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export default function Image({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  return renderSectionOgImage(params, "CV");
}
