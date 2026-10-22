"use client";

import { useEffect, useId, useState } from "react";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { navItems } from "@/config/site";

export function MobileMenu() {
  const t = useTranslations("Nav");
  const [open, setOpen] = useState(false);
  const panelId = useId();

  useEffect(() => {
    if (!open) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open]);

  return (
    <div className="md:hidden">
      <button
        type="button"
        aria-expanded={open}
        aria-controls={panelId}
        aria-label={open ? t("closeMenu") : t("openMenu")}
        onClick={() => setOpen((value) => !value)}
        className="flex size-10 items-center justify-center rounded-full border border-border bg-surface"
      >
        <svg width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden="true">
          <path
            d={open ? "M3 3l12 12M15 3L3 15" : "M2 5h14M2 9h14M2 13h14"}
            stroke="currentColor"
            strokeWidth="1.75"
            strokeLinecap="round"
          />
        </svg>
      </button>
      <nav
        id={panelId}
        aria-label={t("label")}
        hidden={!open}
        className="absolute inset-x-0 top-full border-b border-border bg-background px-4 py-4"
      >
        <ul className="flex flex-col">
          {navItems.map(({ key, href }) => (
            <li key={key}>
              <Link
                href={href}
                onClick={() => setOpen(false)}
                className="block py-3 text-lg text-foreground"
              >
                {t(key)}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  );
}
