"use client";

import { PlayIcon } from "lucide-react";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import type { App } from "@/content/apps/types";
import { cn } from "@/lib/utils";

type AppVideoProps = {
  video: App["video"];
  locale: string;
  /** Accessible name of the play button, with the length. */
  playLabel: string;
  /** Accessible name of the player. */
  label: string;
  subtitleLabels: { en: string; es: string };
  className?: string;
};

/**
 * Vertical walkthrough video in a phone-shaped frame. Only the poster is
 * downloaded until the visitor presses play.
 */
export function AppVideo({
  video,
  locale,
  playLabel,
  label,
  subtitleLabels,
  className,
}: AppVideoProps) {
  const [playing, setPlaying] = useState(false);
  const ref = useRef<HTMLVideoElement>(null);

  // The play button disappears, so focus has to move to the player.
  useEffect(() => {
    if (playing) ref.current?.focus();
  }, [playing]);

  return (
    <div
      className={cn(
        "mx-auto w-full max-w-[20rem] rounded-[2rem] border border-white/15 bg-[#0d0d12] p-2 shadow-2xl shadow-black/60",
        className,
      )}
    >
      <div className="relative aspect-[9/16] overflow-hidden rounded-[1.5rem]">
        {playing ? (
          <video
            ref={ref}
            controls
            autoPlay
            playsInline
            aria-label={label}
            poster={video.poster}
            className="size-full bg-black object-cover"
          >
            <source src={video.src} type="video/mp4" />
            {/* The voice-over is Spanish: English subtitles start on for
                English visitors; Spanish ones are there to be switched on. */}
            <track
              kind="subtitles"
              srcLang="en"
              label={subtitleLabels.en}
              src={video.subtitles.en}
              default={locale === "en"}
            />
            <track
              kind="captions"
              srcLang="es"
              label={subtitleLabels.es}
              src={video.subtitles.es}
            />
          </video>
        ) : (
          <button
            type="button"
            onClick={() => setPlaying(true)}
            aria-label={playLabel}
            className="group relative block size-full cursor-pointer"
          >
            <Image
              src={video.poster}
              alt=""
              fill
              sizes="20rem"
              className="object-cover transition-transform duration-700 ease-out-expo group-hover:scale-105"
            />
            <span
              aria-hidden="true"
              className="absolute inset-0 bg-black/25 transition-colors duration-300 group-hover:bg-black/10"
            />
            <span
              aria-hidden="true"
              className="absolute top-1/2 left-1/2 flex size-20 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-white text-[#150821] shadow-2xl transition-transform duration-300 group-hover:scale-110"
            >
              <span className="pin-ring absolute inset-0 rounded-full border-2 border-white" />
              <PlayIcon className="ml-1 size-8 fill-current" />
            </span>
            <span
              aria-hidden="true"
              className="absolute right-3 bottom-3 rounded-full bg-black/75 px-3 py-1 text-xs font-medium text-white tabular-nums"
            >
              {video.duration}
            </span>
          </button>
        )}
      </div>
    </div>
  );
}
