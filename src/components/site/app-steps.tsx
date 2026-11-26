"use client";

import { useEffect, useRef, useState, type CSSProperties } from "react";
import { AppFrame } from "@/components/site/app-devices";
import { Reveal } from "@/components/site/reveal";
import type { ResolvedApp } from "@/lib/apps";
import { cn } from "@/lib/utils";

/**
 * "How it works". On large screens the device stays pinned and its screen
 * changes with the step being read; on smaller ones every step simply carries
 * its own screen. All the text is always visible, with or without JS.
 */
export function AppSteps({
  steps,
  accent,
}: {
  steps: ResolvedApp["steps"];
  accent: string;
}) {
  const [active, setActive] = useState(0);
  const items = useRef<(HTMLLIElement | null)[]>([]);
  const phone = steps[0]?.screen.device === "phone";

  useEffect(() => {
    if (typeof IntersectionObserver === "undefined") return;
    // A thin band in the middle of the viewport decides the current step.
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue;
          setActive(items.current.indexOf(entry.target as HTMLLIElement));
        }
      },
      { rootMargin: "-50% 0px -50% 0px" },
    );
    for (const item of items.current) if (item) observer.observe(item);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      className={cn(
        "grid grid-cols-1 gap-10 lg:gap-16",
        phone
          ? "lg:grid-cols-[1fr_1fr]"
          : "lg:grid-cols-[minmax(0,1.7fr)_minmax(0,1fr)]",
      )}
      style={{ "--app": accent } as CSSProperties}
    >
      <div className="hidden lg:block">
        <div className="sticky top-24 flex h-[calc(100svh-8rem)] items-center">
          <div
            className={cn(
              "grid w-full",
              phone && "mx-auto max-w-[min(17rem,calc((100svh-10rem)*0.46))]",
            )}
          >
            {steps.map((step, i) => (
              <div
                key={step.screen.src}
                aria-hidden={i !== active}
                className={cn(
                  "col-start-1 row-start-1 transition-all duration-700 ease-out-expo",
                  i === active
                    ? "opacity-100"
                    : "pointer-events-none translate-y-4 scale-[0.97] opacity-0",
                )}
              >
                <AppFrame
                  screen={step.screen}
                  sizes={phone ? "17rem" : "42rem"}
                />
              </div>
            ))}
          </div>
        </div>
      </div>

      <ol className="grid gap-14 lg:gap-0">
        {steps.map((step, i) => (
          <li
            key={step.screen.src}
            ref={(el) => {
              items.current[i] = el;
            }}
            className="min-w-0 lg:flex lg:min-h-[60svh] lg:items-center"
          >
            <Reveal className="w-full">
              <div
                className={cn(
                  "border-l-2 pl-6 transition-colors duration-500",
                  i === active
                    ? "border-(--app)"
                    : "border-(--app) lg:border-border",
                )}
              >
                <p
                  aria-hidden="true"
                  className="font-display text-5xl font-semibold text-(--app) tabular-nums"
                >
                  {String(i + 1).padStart(2, "0")}
                </p>
                <h3 className="mt-3 font-display text-2xl font-semibold tracking-tight sm:text-3xl">
                  {step.title}
                </h3>
                <p className="mt-3 max-w-md text-lg text-muted-foreground">
                  {step.text}
                </p>
              </div>
              <AppFrame
                screen={step.screen}
                sizes="(min-width: 640px) 36rem, 92vw"
                className={cn(
                  "mt-6 lg:hidden",
                  step.screen.device === "phone" && "mx-auto max-w-[15rem]",
                )}
              />
            </Reveal>
          </li>
        ))}
      </ol>
    </div>
  );
}
