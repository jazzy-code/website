import Image from "next/image";
import { BrowserFrame, PhoneFrame } from "@/components/site/device-frames";
import type { ResolvedScreen } from "@/lib/apps";

/** One capture inside the frame that matches its device. */
export function AppFrame({
  screen,
  sizes,
  priority,
  alt = screen.alt,
  className,
}: {
  screen: ResolvedScreen;
  sizes: string;
  priority?: boolean;
  alt?: string;
  className?: string;
}) {
  const Frame = screen.device === "phone" ? PhoneFrame : BrowserFrame;

  return (
    <Frame className={className}>
      <Image
        src={screen.src}
        alt={alt}
        width={screen.width}
        height={screen.height}
        sizes={sizes}
        quality={90}
        loading={priority ? "eager" : undefined}
        className="h-auto w-full"
      />
    </Frame>
  );
}
