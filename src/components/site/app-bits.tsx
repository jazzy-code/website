import {
  ArrowLeftRightIcon,
  ArrowUpDownIcon,
  ArrowUpRightIcon,
  CombineIcon,
  CrownIcon,
  FilesIcon,
  HistoryIcon,
  ImageIcon,
  LinkIcon,
  LockIcon,
  LogInIcon,
  MonitorIcon,
  ScaleIcon,
  SmartphoneIcon,
  TabletIcon,
  TypeIcon,
  UsersRoundIcon,
} from "lucide-react";
import Image from "next/image";
import { useTranslations } from "next-intl";
import { Button } from "@/components/ui/button";
import type { AppFeatureIcon } from "@/content/apps/types";
import type { ResolvedApp } from "@/lib/apps";
import { cn } from "@/lib/utils";

/* Small pieces shared by the Apps pages. */

export const featureIcons: Record<AppFeatureIcon, typeof CrownIcon> = {
  users: UsersRoundIcon,
  split: ArrowLeftRightIcon,
  link: LinkIcon,
  balance: ScaleIcon,
  payment: HistoryIcon,
  login: LogInIcon,
  pages: FilesIcon,
  reorder: ArrowUpDownIcon,
  merge: CombineIcon,
  text: TypeIcon,
  image: ImageIcon,
  private: LockIcon,
};

/** App icon on its tile; decorative, the name is always written next to it. */
export function AppLogo({
  app,
  className,
}: {
  app: ResolvedApp;
  className?: string;
}) {
  return (
    <span
      className={cn(
        "flex size-16 shrink-0 items-center justify-center rounded-2xl border border-white/15 bg-white/10 p-2 shadow-xl backdrop-blur",
        className,
      )}
    >
      <Image
        src={app.logo.src}
        alt=""
        width={app.logo.width}
        height={app.logo.height}
        sizes="6rem"
        className="h-full w-full object-contain"
      />
    </span>
  );
}

/** Button that opens the live app, in the app's accent color. */
export function OpenAppButton({ app }: { app: ResolvedApp }) {
  const t = useTranslations("Apps");

  return (
    <Button
      asChild
      size="lg"
      className="bg-(--app) text-[#0a0a0d] shadow-none hover:bg-[color-mix(in_oklab,var(--app)_80%,white)]"
      style={{ "--app": app.theme.accent } as React.CSSProperties}
    >
      <a href={app.url} target="_blank" rel="noopener noreferrer">
        {t("open", { name: app.name })}
        <ArrowUpRightIcon aria-hidden="true" />
        <span className="sr-only">{t("newTab")}</span>
      </a>
    </Button>
  );
}

/** "Available on desktop, tablet and phone". */
export function DeviceBadges({ className }: { className?: string }) {
  const t = useTranslations("Apps");
  const devices = [
    { key: "desktop", Icon: MonitorIcon },
    { key: "tablet", Icon: TabletIcon },
    { key: "phone", Icon: SmartphoneIcon },
  ] as const;

  return (
    <ul
      aria-label={t("devices")}
      className={cn("flex flex-wrap gap-2", className)}
    >
      {devices.map(({ key, Icon }) => (
        <li
          key={key}
          className="flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-3.5 py-1.5 text-sm text-white/85"
        >
          <Icon aria-hidden="true" className="size-4" />
          {t(key)}
        </li>
      ))}
    </ul>
  );
}

/**
 * Background of an app's dark "stage". An inline style because the colors come
 * from data, which Tailwind cannot turn into classes.
 */
export function stageBackground(app: ResolvedApp) {
  return {
    background: `radial-gradient(40rem 28rem at 85% 0%, ${app.theme.glow}cc, transparent 70%), radial-gradient(30rem 22rem at 0% 100%, ${app.theme.accent}26, transparent 70%), #100b18`,
  };
}
