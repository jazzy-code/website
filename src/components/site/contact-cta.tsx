// import { ArrowUpRightIcon } from "lucide-react"; // WhatsApp hidden for now
import { getTranslations } from "next-intl/server";
import { Container } from "@/components/site/container";
import { Button } from "@/components/ui/button";
import { Link } from "@/i18n/navigation";
// import { whatsappUrl } from "@/lib/contact"; // WhatsApp hidden for now

/** Closing call to action shared by the main pages. */
export async function ContactCta() {
  const t = await getTranslations("Cta");
  // const contact = await getTranslations("Contact"); // WhatsApp hidden for now

  return (
    <Container className="py-16 sm:py-24">
      <div className="relative isolate overflow-hidden rounded-[2rem] border border-brand-ring/40 bg-[radial-gradient(50rem_24rem_at_50%_-20%,color-mix(in_oklab,var(--brand)_90%,white_10%),transparent_75%),var(--card)] px-6 py-16 text-center sm:px-12 sm:py-24">
        <h2 className="font-display text-4xl font-semibold tracking-tight text-balance sm:text-5xl">
          {t("title")}
        </h2>
        <p className="mx-auto mt-4 max-w-xl text-lg text-muted-foreground">
          {t("description")}
        </p>
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          {/* WhatsApp is hidden for now (the number is not shown publicly).
          <Button asChild size="lg">
            <a
              href={whatsappUrl(contact("whatsappMessage"))}
              target="_blank"
              rel="noopener noreferrer"
            >
              {t("whatsapp")}
              <ArrowUpRightIcon aria-hidden="true" />
              <span className="sr-only">{contact("newTab")}</span>
            </a>
          </Button> */}
          <Button asChild size="lg">
            <Link href="/contact">{t("contact")}</Link>
          </Button>
        </div>
      </div>
    </Container>
  );
}
