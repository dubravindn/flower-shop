import { Img } from "@/components/ui/Img";
import { ButtonLink } from "@/components/ui/Button";
import { HERO } from "@/content/home";
import { whatsappLink } from "@/config/company";

/**
 * Первый экран.
 *
 * Сплошного бургунди-поля нет: основа — тёплая бумага и крафтовая плашка,
 * бургунди работает только на кнопке и тонкой линии. Фотография занимает
 * правую половину и держит эмоцию, текст — левую.
 */
export function Hero() {
  return (
    <section className="texture-kraft relative overflow-hidden bg-paper">
      <div className="container-page grid items-center gap-10 py-12 md:py-16 lg:grid-cols-[1.02fr_0.98fr] lg:gap-16 lg:py-20">
        <div>
          <p className="eyebrow mb-5 text-kraft-dark">
            <span aria-hidden="true" className="inline-block h-px w-7 bg-gold" />
            Семейная цветочная база в Кирове
          </p>

          <h1 className="max-w-[15ch] text-[clamp(2.25rem,6.2vw,4.25rem)] text-ink">
            {HERO.title}
          </h1>

          <p className="mt-6 max-w-[44ch] text-[1.0625rem] leading-relaxed text-ink-muted md:text-lg">
            {HERO.text}
          </p>

          <div className="mt-9 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
            <ButtonLink href={HERO.primary.href} size="lg">
              {HERO.primary.label}
            </ButtonLink>
            <ButtonLink
              href={whatsappLink("Здравствуйте! Хочу заказать букет с сайта")}
              size="lg"
              variant="outline"
            >
              {HERO.secondary.label}
            </ButtonLink>
          </div>

          <div className="rule-gold mt-10 max-w-md" />

          <ul className="mt-5 grid max-w-md gap-x-8 gap-y-2.5 text-[0.9375rem] text-ink-muted sm:grid-cols-2">
            {HERO.facts.map((fact) => (
              <li key={fact} className="flex items-start gap-2.5">
                <span
                  aria-hidden="true"
                  className="mt-2 size-1.5 shrink-0 bg-gold"
                />
                {fact}
              </li>
            ))}
          </ul>
        </div>

        {/* Фотография на крафтовой подложке: материал вместо цветной заливки */}
        <div className="relative">
          <div
            aria-hidden="true"
            className="absolute -top-4 -right-4 hidden h-full w-full bg-kraft/25 lg:block"
          />
          <div className="relative aspect-4/5 overflow-hidden border border-kraft/35 sm:aspect-3/2 lg:aspect-4/5">
            <Img
              src="/images/works/buket-letniy-mix.jpg"
              alt="Авторский букет из сезонных цветов"
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
