import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { navItems } from "@/config/site";
import { LanguageSwitcher } from "./language-switcher";
import { MobileMenu } from "./mobile-menu";
import { Wordmark } from "./wordmark";

export function Header() {
  const t = useTranslations("Nav");

  return (
    <header className="sticky top-0 z-40 border-b border-border bg-background/80 backdrop-blur">
      <div className="relative mx-auto flex h-16 max-w-6xl items-center justify-between gap-4 px-4 sm:px-6">
        <Wordmark />
        <nav aria-label={t("label")} className="hidden md:block">
          <ul className="flex items-center gap-8 text-sm">
            {navItems.map(({ key, href }) => (
              <li key={key}>
                <Link
                  href={href}
                  className="text-muted transition-colors duration-200 hover:text-foreground"
                >
                  {t(key)}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
        <div className="flex items-center gap-3">
          <LanguageSwitcher />
          <MobileMenu />
        </div>
      </div>
    </header>
  );
}
