import { Section, SectionHeading } from "@/components/ui/Section";
import { EmptyState } from "@/components/ui/States";
import { ButtonLink } from "@/components/ui/Button";
import { REVIEWS, REVIEWS_EMPTY } from "@/content/reviews";
import { SOCIALS } from "@/config/company";

/**
 * Отзывы. Пока подтверждённых отзывов нет, показывается честное
 * пустое состояние — выдуманные отзывы публиковать нельзя.
 */
export function Reviews() {
  const vk = SOCIALS.find((s) => s.net === "vk");

  return (
    <Section tone="paper">
      <SectionHeading eyebrow="Отзывы" title="Что говорят клиенты" />

      {REVIEWS.length > 0 ? (
        <ul className="grid gap-4 md:grid-cols-3">
          {REVIEWS.map((review) => (
            <li
              key={review.id}
              className="flex flex-col gap-3 rounded-[var(--radius-card)] border border-graphite/15 bg-paper p-6"
            >
              <p className="text-gold-light" aria-label={`Оценка ${review.rating} из 5`}>
                {"★".repeat(review.rating)}
              </p>
              <blockquote className="text-[0.9375rem] leading-relaxed">
                {review.text}
              </blockquote>
              <footer className="mt-auto text-sm text-ink-muted">
                <span className="block font-semibold text-graphite">{review.author}</span>
                {review.source}
              </footer>
            </li>
          ))}
        </ul>
      ) : (
        <EmptyState
          title={REVIEWS_EMPTY.title}
          text={REVIEWS_EMPTY.text}
          action={
            vk && (
              <ButtonLink href={vk.url} variant="outline">
                Наша страница ВКонтакте
              </ButtonLink>
            )
          }
        />
      )}
    </Section>
  );
}
