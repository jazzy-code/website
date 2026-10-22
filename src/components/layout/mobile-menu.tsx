"use client";

import { MenuIcon } from "lucide-react";
import { useTranslations } from "next-intl";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { navItems } from "@/config/site";
import { Link } from "@/i18n/navigation";

export function MobileMenu() {
  const t = useTranslations("Nav");

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button
          variant="outline"
          size="icon"
          className="rounded-full bg-surface md:hidden"
        >
          <MenuIcon aria-hidden="true" />
          <span className="sr-only">{t("openMenu")}</span>
        </Button>
      </SheetTrigger>
      <SheetContent closeLabel={t("closeMenu")} aria-describedby={undefined}>
        <SheetHeader>
          <SheetTitle>{t("label")}</SheetTitle>
        </SheetHeader>
        <nav aria-label={t("label")} className="px-4">
          <ul className="flex flex-col">
            {navItems.map(({ key, href }) => (
              <li key={key} className="border-b border-border">
                <SheetClose asChild>
                  <Link
                    href={href}
                    className="block py-4 font-display text-2xl text-foreground"
                  >
                    {t(key)}
                  </Link>
                </SheetClose>
              </li>
            ))}
          </ul>
        </nav>
      </SheetContent>
    </Sheet>
  );
}
