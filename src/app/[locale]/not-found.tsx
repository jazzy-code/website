import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";

export default function NotFound() {
  const t = useTranslations("NotFound");

  return (
    <section className="mx-auto max-w-6xl px-4 py-24 sm:px-6">
      <h1 className="font-display text-4xl font-semibold">{t("title")}</h1>
      <p className="mt-4 text-muted-foreground">{t("description")}</p>
      <Link
        href="/"
        className="mt-8 inline-block text-brand-soft underline-offset-4 hover:underline"
      >
        {t("back")}
      </Link>
    </section>
  );
}
