"use client";

import { ArrowRightIcon } from "lucide-react";
import Image from "next/image";
import { useTranslations } from "next-intl";
import { useState, type ReactNode } from "react";
import { Link } from "@/i18n/navigation";
import type { DeviceScreen } from "@/lib/projects";
import { cn } from "@/lib/utils";
import { BrowserFrame, PhoneFrame } from "./device-frames";

type DeviceShowcaseProps = {
  items: readonly DeviceScreen[];
  /** Section heading, rendered above the project picker. */
  children: ReactNode;
};

/**
 * Picks one of the projects and shows the same screen on desktop and phone.
 * All screens are in the DOM and cross-fade; only the active one is exposed
 * to assistive technology.
 */
export function DeviceShowcase({ items, children }: DeviceShowcaseProps) {
  const t = useTranslations("Home");
  const [active, setActive] = useState(0);
  const current = items[active];
  if (!current) return null;

  return (
    <div className="grid items-center gap-14 lg:grid-cols-[0.85fr_1.15fr]">
      <div>
        {children}
        <div
          role="group"
          aria-label={t("devicesPicker")}
          className="mt-8 flex flex-wrap gap-2"
        >
          {items.map((item, i) => (
            <button
              key={item.slug}
              type="button"
              aria-pressed={i === active}
              onClick={() => setActive(i)}
              className={cn(
                "rounded-full border px-4 py-2 text-sm font-medium transition-colors duration-300",
                i === active
                  ? "border-primary bg-primary text-primary-foreground"
                  : "border-border text-muted-foreground hover:border-brand-ring hover:text-foreground",
              )}
            >
              {item.name}
            </button>
          ))}
        </div>
        <Link
          href={`/projects/${current.slug}`}
          className="mt-6 inline-flex items-center gap-2 text-sm font-medium text-brand-soft underline-offset-4 hover:underline"
        >
          {t("devicesLink", { name: current.name })}
          <ArrowRightIcon aria-hidden="true" className="size-4" />
        </Link>
      </div>

      <div className="relative pb-10">
        <div
          aria-hidden="true"
          className="absolute -inset-x-6 top-10 -bottom-4 -z-10 rounded-full bg-brand/25 blur-3xl"
        />
        <BrowserFrame>
          <div className="relative aspect-[1336/909]">
            {items.map((item, i) => (
              <div
                key={item.slug}
                aria-hidden={i !== active}
                className={cn(
                  "absolute inset-0 transition-opacity duration-700 motion-reduce:transition-none",
                  i === active ? "opacity-100" : "opacity-0",
                )}
              >
                <Image
                  src={item.desktop.src}
                  alt={item.alt}
                  fill
                  sizes="(min-width: 1024px) 55vw, 100vw"
                  className="object-cover object-top"
                />
              </div>
            ))}
          </div>
        </BrowserFrame>
        <div className="absolute right-4 bottom-0 w-[22%] max-w-44 sm:right-8">
          <PhoneFrame>
            <div className="relative aspect-[417/829]">
              {items.map((item, i) => (
                <div
                  key={item.slug}
                  aria-hidden="true"
                  className={cn(
                    "absolute inset-0 transition-opacity duration-700 motion-reduce:transition-none",
                    i === active ? "opacity-100" : "opacity-0",
                  )}
                >
                  <Image
                    src={item.mobile.src}
                    alt=""
                    fill
                    sizes="(min-width: 1024px) 11rem, 22vw"
                    className="object-cover object-top"
                  />
                </div>
              ))}
            </div>
          </PhoneFrame>
        </div>
      </div>
    </div>
  );
}
