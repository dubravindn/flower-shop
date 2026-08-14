import Image from "next/image";
import { ButtonLink } from "@/components/ui/Button";
import { HERO } from "@/content/home";

/**
 * Первый экран. Один сильный экран без слайдера:
 * красное поле, крупный кадр букета, шампань-текст.
 */
export function Hero() {
  return (
    <section className="on-red relative overflow-hidden bg-red-brand text-champagne-paper">
      <div className="container-page grid items-center gap-10 py-12 md:py-16 lg:grid-cols-[1.05fr_0.95fr] lg:gap-16 lg:py-20">
        <div>
          <p className="eyebrow mb-5 text-champagne-light">
            <span aria-hidden="true" className="inline-block h-px w-6 bg-champagne-foil" />
            Цветочная База Дубравиных
          </p>

          <h1 className="max-w-[13ch] text-[clamp(2.5rem,7.5vw,4.75rem)] text-champagne-paper">
            {HERO.title}
          </h1>

          <p className="mt-6 max-w-[46ch] text-[1.0625rem] leading-relaxed text-champagne-light md:text-lg">
            {HERO.text}
          </p>

          <div className="mt-9 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
            <ButtonLink href={HERO.primary.href} size="lg" onRed>
              {HERO.primary.label}
            </ButtonLink>
            <ButtonLink href={HERO.secondary.href} size="lg" variant="outline" onRed>
              {HERO.secondary.label}
            </ButtonLink>
          </div>

          <ul className="mt-10 flex flex-wrap gap-x-8 gap-y-3 text-sm text-champagne-light">
            {HERO.facts.map((fact) => (
              <li key={fact} className="flex items-center gap-2">
                <span aria-hidden="true" className="size-1.5 bg-champagne-foil" />
                {fact}
              </li>
            ))}
          </ul>
        </div>

        <div className="relative">
          <div className="relative aspect-4/5 overflow-hidden rounded-[var(--radius-card)] border border-champagne-foil/40 sm:aspect-3/2 lg:aspect-4/5">
            <Image
              src="/images/works/buket-letniy-mix.jpg"
              alt="Крупный авторский букет из сезонных цветов"
              fill
              priority
              sizes="(min-width: 1024px) 46vw, 100vw"
              className="object-cover"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
