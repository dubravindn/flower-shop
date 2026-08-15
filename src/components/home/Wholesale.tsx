import { ButtonLink } from "@/components/ui/Button";
import { WHOLESALE_BLOCK } from "@/content/home";
import { COMPANY } from "@/config/company";

function CheckIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.2"
      aria-hidden="true"
      className="mt-1 size-5 shrink-0 text-gold"
    >
      <path d="M20 6 9 17l-5-5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

/** Самостоятельная сильная секция для оптовых клиентов, не баннер. */
export function Wholesale() {
  return (
    <section
      id="wholesale"
      className="texture-kraft bg-champagne-light py-[var(--spacing-section)] text-ink md:py-[var(--spacing-section-lg)]"
    >
      <div className="container-page">
        <div className="grid gap-12 lg:grid-cols-[1fr_0.9fr] lg:gap-20">
          <div>
            <p className="eyebrow mb-4 text-kraft-dark">
              <span aria-hidden="true" className="inline-block h-px w-5 bg-current" />
              {WHOLESALE_BLOCK.eyebrow}
            </p>

            <h2 className="max-w-[15ch] text-[clamp(1.875rem,5vw,3.25rem)]">
              {WHOLESALE_BLOCK.title}
            </h2>

            <p className="mt-5 max-w-[52ch] text-[1.0625rem] leading-relaxed text-ink-muted">
              {WHOLESALE_BLOCK.text}
            </p>

            <div className="mt-9 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
              <ButtonLink href={WHOLESALE_BLOCK.primary.href} size="lg">
                {WHOLESALE_BLOCK.primary.label}
              </ButtonLink>
              <ButtonLink
                href={WHOLESALE_BLOCK.secondary.href}
                size="lg"
                variant="outline"
              >
                {WHOLESALE_BLOCK.secondary.label}
              </ButtonLink>
            </div>
          </div>

          <div>
            <ul className="space-y-4">
              {WHOLESALE_BLOCK.points.map((point) => (
                <li key={point} className="flex gap-3 text-[1.0625rem]">
                  <CheckIcon />
                  <span className="text-ink">{point}</span>
                </li>
              ))}
            </ul>

            <div className="rule-gold my-8" />

            <p className="text-sm text-ink-muted">
              География отправки: {COMPANY.delivery.regions.join(", ")}.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
