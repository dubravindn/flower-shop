import { Monogram, MonogramMicro, CONCEPTS } from "@/components/brand/Monogram";
import type { MonogramConcept } from "@/components/brand/Monogram";

/** Цветовые пары для проверки знака на всех фонах. */
const MARK_VARIANTS = [
  { label: "Бургунди на шампань", bg: "#E4D5BF", fg: "#741C2C" },
  { label: "Золото на бургунди", bg: "#741C2C", fg: "#CCAD6C" },
  { label: "Бургунди на крафте", bg: "#A98257", fg: "#53121E" },
  { label: "Графит одноцветный", bg: "#F2E9DB", fg: "#292321" },
  { label: "Светлый одноцветный", bg: "#292321", fg: "#F3E9DA" },
];

const SIZES = [16, 24, 32, 48, 128];

/** Демонстрационные носители — простые SVG-композиции, без растровых мокапов. */
export function Mockups({ concept }: { concept: MonogramConcept }) {
  const mark = (className: string, title = "") => (
    <Monogram concept={concept} title={title} className={className} />
  );

  return (
    <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
      {/* Крафтовая коробка */}
      <figure className="m-0">
        <div className="texture-kraft flex aspect-4/3 items-center justify-center bg-kraft p-6">
          {mark("h-6 w-auto text-champagne-light")}
        </div>
        <figcaption className="mt-1.5 text-xs text-ink-muted">Крафтовая коробка</figcaption>
      </figure>

      {/* Лента для букета */}
      <figure className="m-0">
        <div className="flex aspect-4/3 items-center justify-center bg-champagne-light p-4">
          <div className="flex h-8 w-full items-center justify-center bg-burgundy">
            {mark("h-3.5 w-auto text-gold-light")}
          </div>
        </div>
        <figcaption className="mt-1.5 text-xs text-ink-muted">Лента букета</figcaption>
      </figure>

      {/* Бирка */}
      <figure className="m-0">
        <div className="flex aspect-4/3 items-center justify-center bg-champagne p-6">
          <div className="texture-kraft flex h-full w-2/3 flex-col items-center justify-center gap-1 border border-kraft-dark/40 bg-paper">
            {mark("h-4 w-auto text-burgundy")}
            <span className="text-[7px] tracking-wide text-ink-muted">КИРОВ</span>
          </div>
        </div>
        <figcaption className="mt-1.5 text-xs text-ink-muted">Бирка</figcaption>
      </figure>

      {/* Вывеска */}
      <figure className="m-0">
        <div className="flex aspect-4/3 items-center justify-center bg-graphite p-5">
          <div className="flex flex-col items-center gap-2">
            {mark("h-5 w-auto text-gold-light")}
            <span className="font-display text-[9px] leading-tight text-ink-light">
              Цветочная База Дубравиных
            </span>
          </div>
        </div>
        <figcaption className="mt-1.5 text-xs text-ink-muted">Вывеска</figcaption>
      </figure>

      {/* Пакет */}
      <figure className="m-0">
        <div className="texture-kraft flex aspect-4/3 items-start justify-center bg-kraft-dark p-5">
          {mark("h-5 w-auto text-champagne-light")}
        </div>
        <figcaption className="mt-1.5 text-xs text-ink-muted">Пакет</figcaption>
      </figure>

      {/* Аватар */}
      <figure className="m-0">
        <div className="flex aspect-4/3 items-center justify-center bg-champagne-light p-4">
          <div className="flex size-16 items-center justify-center bg-burgundy">
            {mark("h-4 w-auto text-gold-light")}
          </div>
        </div>
        <figcaption className="mt-1.5 text-xs text-ink-muted">Аватар</figcaption>
      </figure>

      {/* Борт фургона */}
      <figure className="m-0 sm:col-span-2">
        <div className="flex aspect-8/3 items-center gap-4 bg-paper p-5 ring-1 ring-kraft/30">
          {mark("h-8 w-auto shrink-0 text-burgundy")}
          <span className="font-display text-sm leading-tight text-ink">
            Цветочная База
            <br />
            Дубравиных
          </span>
          <span className="ml-auto text-[10px] text-ink-muted">
            Доставка по Кирову
            <br />
            за 2 часа
          </span>
        </div>
        <figcaption className="mt-1.5 text-xs text-ink-muted">Борт фургона</figcaption>
      </figure>
    </div>
  );
}

export function ConceptCard({ concept }: { concept: MonogramConcept }) {
  const meta = CONCEPTS[concept];

  return (
    <article className="border border-kraft/30 bg-paper p-5 md:p-7">
      <h3 className="text-xl">{meta.title}</h3>
      <p className="mt-2 max-w-[64ch] text-[0.9375rem] text-ink-muted">{meta.idea}</p>

      {/* Крупный показ */}
      <div className="mt-6 flex items-center justify-center bg-champagne-light p-8">
        <Monogram concept={concept} title="" className="h-20 w-auto text-burgundy" />
      </div>

      {/* Цветовые версии */}
      <div className="mt-3 grid grid-cols-2 gap-2 sm:grid-cols-5">
        {MARK_VARIANTS.map((v) => (
          <div key={v.label}>
            <div
              className="flex h-16 items-center justify-center p-3"
              style={{ background: v.bg }}
            >
              <Monogram
                concept={concept}
                title=""
                className="h-5 w-auto"
                {...{ style: { color: v.fg } }}
              />
            </div>
            <p className="mt-1 text-[11px] leading-tight text-ink-muted">{v.label}</p>
          </div>
        ))}
      </div>

      {/* Размеры */}
      <div className="mt-5 flex flex-wrap items-end gap-5 bg-champagne-light/60 p-4">
        {SIZES.map((size) => (
          <div key={size} className="text-center">
            <div className="flex items-end justify-center" style={{ height: 132 }}>
              {size <= 24 ? (
                <MonogramMicro
                  {...{ style: { height: size, width: "auto" } }}
                  className="text-burgundy"
                />
              ) : (
                <Monogram
                  concept={concept}
                  title=""
                  {...{ style: { height: size, width: "auto" } }}
                  className="text-burgundy"
                />
              )}
            </div>
            <p className="mt-1 text-[11px] text-ink-muted">{size} px</p>
          </div>
        ))}
        <p className="max-w-[24ch] text-[11px] text-ink-muted">
          На 16 и 24 px показана упрощённая micro-версия: полная монограмма в
          этих размерах нечитаема.
        </p>
      </div>

      {/* Компоновки с названием */}
      <div className="mt-5 grid gap-3 sm:grid-cols-2">
        <div className="flex items-center justify-center bg-paper p-6 ring-1 ring-kraft/25">
          <span className="inline-flex items-center gap-3">
            <Monogram concept={concept} title="" className="h-8 w-auto text-burgundy" />
            <span className="font-display text-base leading-[1.15] text-ink">
              Цветочная База
              <br />
              Дубравиных
            </span>
          </span>
        </div>
        <div className="flex items-center justify-center bg-paper p-6 ring-1 ring-kraft/25">
          <span className="inline-flex flex-col items-center">
            <Monogram concept={concept} title="" className="h-10 w-auto text-burgundy" />
            <span className="mt-3 text-center font-display text-base text-ink">
              Цветочная База Дубравиных
            </span>
          </span>
        </div>
      </div>

      <h4 className="mt-7 mb-3 font-sans text-xs font-semibold tracking-[0.12em] text-ink-muted uppercase">
        Носители
      </h4>
      <Mockups concept={concept} />
    </article>
  );
}

