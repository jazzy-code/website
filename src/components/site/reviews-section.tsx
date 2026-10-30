import Image from "next/image";
import { getTranslations } from "next-intl/server";
import { Container } from "@/components/site/container";
import { Reveal } from "@/components/site/reveal";
import { Section } from "@/components/site/section";
import { SectionHeading } from "@/components/site/section-heading";
import { reviews, reviewsAreMock } from "@/content/reviews";
import type { Locale } from "@/i18n/routing";
import { pick } from "@/lib/localized";

/**
 * Client reviews. Only reviews with a quote in the current language are
 * shown, and the whole section is hidden when there are none.
 */
export async function ReviewsSection({
  locale,
}: {
  locale: Locale;
}) {
  const items = reviews.flatMap((review) => {
    const quote = pick(review.quote, locale);
    return quote ? [{ ...review, quote, role: review.role && pick(review.role, locale) }] : [];
  });
  if (items.length === 0) return null;
  const t = await getTranslations("Home");

  return (
    <Section tone="light">
      <Container>
        <SectionHeading
          title={t("reviewsTitle")}
          description={reviewsAreMock ? t("mockNote") : undefined}
        />
        <ul className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {items.map((review, i) => (
            <Reveal as="li" key={`${review.author}-${i}`} delay={i * 100}>
              <figure className="surface flex h-full flex-col gap-6 p-7">
                <span
                  aria-hidden="true"
                  className="font-display text-6xl leading-none text-brand-ring"
                >
                  “
                </span>
                <blockquote className="text-lg leading-relaxed text-pretty">
                  {review.quote}
                </blockquote>
                <figcaption className="mt-auto flex items-center gap-3 pt-2">
                  {review.avatar && (
                    <Image
                      src={review.avatar.src}
                      alt=""
                      width={review.avatar.width}
                      height={review.avatar.height}
                      className="size-11 rounded-full object-cover"
                    />
                  )}
                  <span className="text-sm">
                    <span className="block font-semibold">{review.author}</span>
                    {(review.role || review.company) && (
                      <span className="block text-muted-foreground">
                        {[review.role, review.company].filter(Boolean).join(" · ")}
                      </span>
                    )}
                  </span>
                </figcaption>
              </figure>
            </Reveal>
          ))}
        </ul>
      </Container>
    </Section>
  );
}
