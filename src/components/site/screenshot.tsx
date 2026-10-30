import Image from "next/image";
import { useTranslations } from "next-intl";
import type { ScreenView } from "@/lib/projects";
import { cn } from "@/lib/utils";
import { BrowserFrame, PhoneFrame } from "./device-frames";

type ScreenshotProps = {
  screen: ScreenView;
  sizes: string;
  priority?: boolean;
  /** Narrow container (gallery grid): gives the phone frame more width. */
  compact?: boolean;
};

/**
 * One screen: the desktop capture in a browser frame and, when it exists, the
 * phone capture of the same screen in a phone frame. The phone sits below the
 * desktop image on small screens and overlaps its corner from `sm` up.
 */
export function Screenshot({
  screen,
  sizes,
  priority,
  compact,
}: ScreenshotProps) {
  const t = useTranslations("Projects");
  const { alt, desktop, mobile } = screen;

  return (
    <div className="flex flex-col items-center gap-4 sm:relative sm:block">
      <BrowserFrame className="w-full">
        <Image
          src={desktop.src}
          alt={alt}
          width={desktop.width}
          height={desktop.height}
          sizes={sizes}
          priority={priority}
          className="h-auto w-full"
        />
      </BrowserFrame>
      {mobile && (
        <div
          className={cn(
            "w-[min(11rem,55%)] sm:absolute sm:right-4 sm:-bottom-6",
            compact ? "sm:w-[28%]" : "sm:w-[20%]",
          )}
        >
          <PhoneFrame>
            <Image
              src={mobile.src}
              alt={`${alt} — ${t("mobileView")}`}
              width={mobile.width}
              height={mobile.height}
              sizes="(min-width: 640px) 25vw, 11rem"
              className="h-auto w-full"
            />
          </PhoneFrame>
        </div>
      )}
    </div>
  );
}
