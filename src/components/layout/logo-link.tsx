"use client";

import type { ComponentProps } from "react";
import { Link, usePathname } from "@/i18n/navigation";

/**
 * Link to the home page. Clicking it while already on the home page does not
 * navigate, so it scrolls back to the top (the hero) instead.
 */
export function LogoLink({ onClick, ...props }: Omit<ComponentProps<typeof Link>, "href">) {
  const pathname = usePathname();

  return (
    <Link
      href="/"
      onClick={(event) => {
        onClick?.(event);
        if (pathname === "/" && !event.defaultPrevented) {
          event.preventDefault();
          window.scrollTo({ top: 0, behavior: "smooth" });
        }
      }}
      {...props}
    />
  );
}
