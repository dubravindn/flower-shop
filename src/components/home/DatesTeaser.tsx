import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/States";
import { DATES_TEASER } from "@/content/home";

/**
 * Тизер сервиса важных дат.
 *
 * Сервиса ещё нет: сохранять телефоны и даты можно только на сервере,
 * с согласиями и возможностью отписаться. Поэтому здесь показан интерфейс,
 * но кнопка отключена, а форма не выводится — принимать данные, которые
 * некуда сохранить, нельзя.
 */
export function DatesTeaser() {
  return (
    <section className="texture-warm bg-gold/18 py-[var(--spacing-section)] md:py-[var(--spacing-section-lg)]">
      <div className="container-page">
        <div className="max-w-[62ch]">
          <p className="eyebrow mb-4 text-emerald-dark">
            <span aria-hidden="true" className="inline-block h-px w-6 bg-gold" />
            {DATES_TEASER.eyebrow}
          </p>

          <h2 className="text-[clamp(1.75rem,4.4vw,2.75rem)]">
            {DATES_TEASER.title}
          </h2>

          <p className="mt-5 text-[1.0625rem] leading-relaxed text-text-muted">
            {DATES_TEASER.text}
          </p>

          <div className="mt-8 flex flex-wrap items-center gap-4">
            <Button size="lg" disabled>
              {DATES_TEASER.cta}
            </Button>
            <Badge>Скоро</Badge>
          </div>
        </div>
      </div>
    </section>
  );
}
