import Image from "next/image";
import { getTranslations } from "next-intl/server";
import { clients, clientsAreMock } from "@/content/clients";

/**
 * Logos of clients the work was done for, on same-size white tiles, so JPG logos with a white
 * background and PNG/SVG/WebP logos with transparency all look alike. A client without a logo file is shown as a text wordmark.
 * Renders nothing while there are no clients.
 */
export async function ClientsStrip() {
  if (clients.length === 0) return null;
  const t = await getTranslations("Home");

  return (
    <div className="mt-16 pb-20 sm:mt-20 sm:pb-24">
      <p className="text-center text-sm font-medium tracking-widest text-muted-foreground uppercase">
        {t("clientsLabel")}
        {clientsAreMock && ` · ${t("mockNote")}`}
      </p>
      <ul className="mx-auto mt-8 flex max-w-xl flex-wrap items-center justify-center gap-3 sm:max-w-[36rem] sm:gap-4">
        {clients.map(({ name, logo }) => (
          <li
            key={name}
            className="flex h-16 w-36 items-center justify-center rounded-xl bg-white px-4 text-[#0a0a0d] sm:h-20 sm:w-44 sm:px-6"
          >
            {logo ? (
              <Image
                src={logo.src}
                alt={name}
                width={logo.width}
                height={logo.height}
                className="max-h-10 w-auto max-w-full object-contain sm:max-h-12"
              />
            ) : (
              <span className="font-display text-lg font-semibold tracking-tight sm:text-xl">
                {name}
              </span>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}
