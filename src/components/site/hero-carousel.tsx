"use client";

import { ChevronLeftIcon, ChevronRightIcon, PauseIcon, PlayIcon } from "lucide-react";
import Image from "next/image";
import { useTranslations } from "next-intl";
import {
  useCallback,
  useEffect,
  useRef,
  useState,
  useSyncExternalStore,
  type PointerEvent,
} from "react";
import { Link } from "@/i18n/navigation";
import type { ShowcaseScreen } from "@/lib/projects";
import { cn } from "@/lib/utils";
import { BrowserFrame, PhoneFrame } from "./device-frames";

/** Distance (px) a drag must cover to change slide. */
const SWIPE_THRESHOLD = 50;
const AUTOPLAY_MS = 4000;

const reducedMotionQuery = "(prefers-reduced-motion: reduce)";

function subscribeToReducedMotion(onChange: () => void) {
  const query = window.matchMedia(reducedMotionQuery);
  query.addEventListener("change", onChange);
  return () => query.removeEventListener("change", onChange);
}

/*
 * Roulette-style carousel of every project. The centered slide is the
 * largest; the ones on each side are smaller, tilted and anchored at the
 * bottom, so they seem to rise from below. It loops forever: swipe or drag,
 * use the arrows (desktop, on hover) or the dots.
 */
export function HeroCarousel({ items }: { items: readonly ShowcaseScreen[] }) {
  const t = useTranslations("Home");
  const count = items.length;
  const [active, setActive] = useState(0);
  const [drag, setDrag] = useState(0);
  const [dragging, setDragging] = useState(false);
  const [hovered, setHovered] = useState(false);
  const [userPaused, setUserPaused] = useState(false);
  const reducedMotion = useSyncExternalStore(
    subscribeToReducedMotion,
    () => window.matchMedia(reducedMotionQuery).matches,
    () => false,
  );
  const startX = useRef<number | null>(null);
  const moved = useRef(false);

  const go = useCallback(
    (delta: number) => setActive((current) => (current + delta + count) % count),
    [count],
  );

  const playing = !userPaused && !reducedMotion && count > 1;

  useEffect(() => {
    if (!playing || hovered || dragging) return;
    const id = window.setInterval(() => go(1), AUTOPLAY_MS);
    return () => window.clearInterval(id);
  }, [playing, hovered, dragging, go]);

  if (count === 0) return null;

  const half = Math.floor(count / 2);

  function onPointerDown(event: PointerEvent<HTMLDivElement>) {
    if (event.pointerType === "mouse" && event.button !== 0) return;
    startX.current = event.clientX;
    moved.current = false;
    setDragging(true);
  }

  function onPointerMove(event: PointerEvent<HTMLDivElement>) {
    if (startX.current === null) return;
    const dx = event.clientX - startX.current;
    if (Math.abs(dx) > 6) moved.current = true;
    setDrag(dx);
  }

  function endDrag() {
    if (startX.current === null) return;
    if (drag <= -SWIPE_THRESHOLD) go(1);
    else if (drag >= SWIPE_THRESHOLD) go(-1);
    startX.current = null;
    setDrag(0);
    setDragging(false);
  }

  const current = items[active];

  return (
    <div
      role="region"
      aria-roledescription="carousel"
      aria-label={t("carouselLabel")}
      className="group relative mt-12 sm:mt-16"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onFocus={() => setHovered(true)}
      onBlur={() => setHovered(false)}
    >
      <div
        className="touch-pan-y overflow-hidden pt-6 pb-12 select-none"
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={endDrag}
        onPointerCancel={endDrag}
        onPointerLeave={endDrag}
      >
        <div className="grid">
          {items.map((item, i) => {
            const d = ((i - active + count + half) % count) - half;
            const distance = Math.abs(d);
            const isActive = d === 0;
            const visible = distance <= 2;

            return (
              <div
                key={item.slug}
                role="group"
                aria-roledescription="slide"
                aria-label={t("carouselSlide", {
                  current: i + 1,
                  total: count,
                  name: item.name,
                })}
                aria-hidden={!isActive}
                onClick={() => {
                  if (!isActive && visible && !moved.current) setActive(i);
                }}
                className={cn(
                  "col-start-1 row-start-1 w-[min(80vw,44rem)] justify-self-center",
                  !isActive && visible && "cursor-pointer",
                  dragging
                    ? "transition-none"
                    : "transition-[transform,opacity] duration-700 ease-out-expo",
                )}
                style={{
                  transformOrigin: "50% 100%",
                  transform: `translateX(calc(${d * 56}% + ${drag}px)) translateY(${distance * 7}%) rotate(${d * 7}deg) scale(${1 - distance * 0.13})`,
                  opacity: visible ? 1 - distance * 0.28 : 0,
                  zIndex: 10 - distance,
                  pointerEvents: visible ? "auto" : "none",
                }}
              >
                <div className="relative">
                  <BrowserFrame>
                    <Image
                      src={item.desktop.src}
                      alt={isActive ? item.alt : ""}
                      width={item.desktop.width}
                      height={item.desktop.height}
                      sizes="(min-width: 768px) 44rem, 80vw"
                      priority={i === 0}
                      draggable={false}
                      className="h-auto w-full"
                    />
                  </BrowserFrame>
                  {item.mobile && (
                    <div className="absolute right-[-3%] -bottom-[8%] w-[31%]">
                      <PhoneFrame>
                        <Image
                          src={item.mobile.src}
                          alt=""
                          width={item.mobile.width}
                          height={item.mobile.height}
                          sizes="(min-width: 768px) 14rem, 26vw"
                          draggable={false}
                          className="h-auto w-full"
                        />
                      </PhoneFrame>
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {count > 1 && (
        <>
          <button
            type="button"
            onClick={() => go(-1)}
            aria-label={t("carouselPrev")}
            className="absolute top-[42%] left-4 z-20 hidden size-12 items-center justify-center rounded-full border border-white/15 bg-background/70 text-foreground opacity-0 backdrop-blur transition-opacity duration-300 group-hover:opacity-100 hover:bg-background focus-visible:opacity-100 md:flex"
          >
            <ChevronLeftIcon aria-hidden="true" className="size-6" />
          </button>
          <button
            type="button"
            onClick={() => go(1)}
            aria-label={t("carouselNext")}
            className="absolute top-[42%] right-4 z-20 hidden size-12 items-center justify-center rounded-full border border-white/15 bg-background/70 text-foreground opacity-0 backdrop-blur transition-opacity duration-300 group-hover:opacity-100 hover:bg-background focus-visible:opacity-100 md:flex"
          >
            <ChevronRightIcon aria-hidden="true" className="size-6" />
          </button>
        </>
      )}

      <div className="flex flex-col items-center gap-4 px-4">
        <Link
          href={`/projects/${current.slug}`}
          className="font-display inline-flex items-center gap-2 text-lg font-semibold text-foreground hover:text-brand-soft"
        >
          {current.name}
          <span className="text-sm font-medium text-brand-soft">
            {t("viewProject")} →
          </span>
        </Link>
        {count > 1 && (
          <div className="flex items-center gap-3">
            <ul className="flex items-center gap-2">
              {items.map((item, i) => (
                <li key={item.slug}>
                  <button
                    type="button"
                    onClick={() => setActive(i)}
                    aria-label={t("carouselGoTo", { name: item.name })}
                    aria-current={i === active ? "true" : undefined}
                    className="flex size-6 items-center justify-center"
                  >
                    <span
                      className={cn(
                        "block h-1.5 rounded-full transition-all duration-300",
                        i === active ? "w-6 bg-brand-soft" : "w-1.5 bg-white/30",
                      )}
                    />
                  </button>
                </li>
              ))}
            </ul>
            {!reducedMotion && (
              <button
                type="button"
                onClick={() => setUserPaused((paused) => !paused)}
                aria-label={userPaused ? t("carouselPlay") : t("carouselPause")}
                className="flex size-8 items-center justify-center rounded-full border border-border text-muted-foreground hover:text-foreground"
              >
                {userPaused ? (
                  <PlayIcon aria-hidden="true" className="size-3.5" />
                ) : (
                  <PauseIcon aria-hidden="true" className="size-3.5" />
                )}
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
