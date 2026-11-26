"use client";

import { PauseIcon, PlayIcon } from "lucide-react";
import { useTranslations } from "next-intl";
import { useEffect, useRef, useState } from "react";
import { AppFrame } from "@/components/site/app-devices";
import type { ResolvedApp } from "@/lib/apps";
import { cn } from "@/lib/utils";

/**
 * The opening picture of an app, on a loop: computer and phone together, a close
 * up of the phone, then the computer comes forward. The movement is
 * CSS (see `.showreel` in globals.css); this only pauses it, on request or while
 * off screen. With reduced motion it stays on the first shot.
 */
export function AppShowreel({
  app,
  priority,
  className,
}: {
  app: ResolvedApp;
  priority?: boolean;
  className?: string;
}) {
  const t = useTranslations("Apps");
  const stage = useRef<HTMLDivElement>(null);
  const [stopped, setStopped] = useState(false);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = stage.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => setVisible(entry.isIntersecting),
      { threshold: 0.25 },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <div className={cn("@container", className)}>
      <div ref={stage} data-paused={stopped || !visible} className="showreel">
        <div className="showreel-desktop">
          <AppFrame
            screen={app.hero.desktop}
            sizes="(min-width: 1024px) 40rem, 100vw"
            priority={priority}
          />
        </div>
        <div className="showreel-phone">
          <AppFrame
            screen={app.hero.phone}
            sizes="(min-width: 1024px) 16rem, 60vw"
            priority={priority}
          />
        </div>
      </div>
      <div className="mt-3 flex justify-end motion-reduce:hidden">
        <button
          type="button"
          onClick={() => setStopped((value) => !value)}
          aria-label={t(stopped ? "playShowcase" : "pauseShowcase", {
            name: app.name,
          })}
          className="flex size-9 items-center justify-center rounded-full border border-white/20 text-white/75 transition-colors hover:border-white/50 hover:text-white"
        >
          {stopped ? (
            <PlayIcon aria-hidden="true" className="size-4" />
          ) : (
            <PauseIcon aria-hidden="true" className="size-4" />
          )}
        </button>
      </div>
    </div>
  );
}
