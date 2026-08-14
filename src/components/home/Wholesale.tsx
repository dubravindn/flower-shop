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
      className="mt-1 size-5 shrink-0 text-champagne-foil"
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
      className="on-graphite bg-graphite py-[var(--spacing-section)] text-champagne-paper md:py-[var(--spacing-section-lg)]"
    >
      <div className="container-page">
        <div className="grid gap-12 lg:grid-cols-[1fr_0.9fr] lg:gap-20">
          <div>
            <p className="eyebrow mb-4 text-champagne-foil">
              <span aria-hidden="true" className="inline-block h-px w-5 bg-current" />
              {WHOLESALE_BLOCK.eyebrow}
            </p>

            <h2 className="max-w-[15ch] text-[clamp(1.875rem,5vw,3.25rem)]">
              {WHOLESALE_BLOCK.title}
            </h2>

            <p className="mt-5 max-w-[52ch] text-[1.0625rem] leading-relaxed text-champagne-paper/80">
              {WHOLESALE_BLOCK.text}
            </p>

            <div className="mt-9 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
              <ButtonLink href={WHOLESALE_BLOCK.primary.href} size="lg" onRed>
                {WHOLESALE_BLOCK.primary.label}
              </ButtonLink>
              <ButtonLink
                href={WHOLESALE_BLOCK.secondary.href}
                size="lg"
                variant="outline"
                onRed
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
                  <span className="text-champagne-paper/90">{point}</span>
                </li>
              ))}
            </ul>

            <div className="rule-foil my-8" />

            <p className="text-sm text-champagne-paper/65">
              География отправки: {COMPANY.delivery.regions.join(", ")}.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
