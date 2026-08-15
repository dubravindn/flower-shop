import { Oak, OakMicro, OakWatermark, OAK_CONCEPTS } from "@/components/brand/Oak";
import type { OakConcept } from "@/components/brand/Oak";
import { OAK_PALETTE as C } from "@/config/oak-palette";

/** Условия, в которых знак обязан работать. */
const SURFACES = [
  { label: "Светлый фон", bg: C.parchment, fg: C.museumBlack },
  { label: "Burgundy", bg: "#741C2C", fg: C.goldLight },
  { label: "Шампань", bg: "#E4D5BF", fg: C.imperialPlum },
  { label: "Крафт", bg: C.oakWood, fg: C.parchment },
  { label: "Один цвет", bg: "#FFFFFF", fg: C.museumBlack },
  { label: "Золото", bg: C.museumBlack, fg: C.gold },
];

const SIZES = [16, 24, 32, 48, 128];

/** Название бренда рядом со знаком. Аббревиатура «ЦБД» не используется. */
function Wordmark({
  color,
  small = false,
  gold,
}: {
  color: string;
  small?: boolean;
  /** Выделить «ДУБ» золотом — только для типографической концепции */
  gold?: string;
}) {
  return (
    <span className="leading-tight" style={{ color }}>
      <span
        className="block font-sans tracking-[0.18em] uppercase"
        style={{ fontSize: small ? 7 : 10, opacity: 0.75 }}
      >
        Цветочная база
      </span>
      <span
        className="block font-display tracking-[0.02em]"
        style={{ fontSize: small ? 16 : 26 }}
      >
        {gold ? (
          <>
            <span style={{ color: gold }}>ДУБ</span>равиных
          </>
        ) : (
          "Дубравиных"
        )}
      </span>
    </span>
  );
}

export function OakConceptCard({ concept }: { concept: OakConcept }) {
  const meta = OAK_CONCEPTS[concept];
  const isTypographic = concept === "typographic";

  return (
    <article className="border border-kraft/30 bg-paper p-5 md:p-7">
      <h2 className="text-xl">{meta.title}</h2>
      <p className="mt-2 max-w-[64ch] text-[0.9375rem] text-ink-muted">{meta.idea}</p>

      {/* Крупно */}
      <div
        className="mt-6 flex items-center justify-center p-10"
        style={{ background: C.parchment }}
      >
        <Oak concept={concept} className="h-40 w-auto" style={{ color: C.museumBlack }} />
      </div>

      {/* Поверхности */}
      <div className="mt-3 grid grid-cols-2 gap-2 sm:grid-cols-3 lg:grid-cols-6">
        {SURFACES.map((s) => (
          <div key={s.label}>
            <div
              className="flex h-24 items-center justify-center p-3"
              style={{ background: s.bg }}
            >
              <Oak concept={concept} className="h-16 w-auto" style={{ color: s.fg }} />
            </div>
            <p className="mt-1 text-[11px] text-ink-muted">{s.label}</p>
          </div>
        ))}
      </div>

      {/* Размеры */}
      <div
        className="mt-4 flex flex-wrap items-end gap-6 p-4"
        style={{ background: C.parchment }}
      >
        {SIZES.map((size) => (
          <div key={size} className="text-center">
            <div className="flex items-end justify-center" style={{ height: 132 }}>
              {size <= 32 ? (
                <OakMicro style={{ height: size, width: "auto", color: C.museumBlack }} />
              ) : (
                <Oak
                  concept={concept}
                  style={{ height: size, width: "auto", color: C.museumBlack }}
                />
              )}
            </div>
            <p className="mt-1 text-[11px] text-ink-muted">{size} px</p>
          </div>
        ))}
        <p className="max-w-[26ch] text-[11px] text-ink-muted">
          На 16–32 px показан упрощённый дуб: мелкие ветви в этих размерах
          превращаются в грязь.
        </p>
      </div>

      {/* Компоновки */}
      <h3 className="mt-7 mb-3 font-sans text-xs font-semibold tracking-[0.12em] text-ink-muted uppercase">
        Компоновки
      </h3>
      <div className="grid gap-3 sm:grid-cols-3">
        <div
          className="flex items-center justify-center gap-4 p-6"
          style={{ background: C.parchment }}
        >
          <Oak concept={concept} className="h-14 w-auto" style={{ color: C.museumBlack }} />
          <Wordmark color={C.museumBlack} gold={isTypographic ? C.gold : undefined} />
        </div>
        <div
          className="flex flex-col items-center justify-center gap-3 p-6 text-center"
          style={{ background: C.parchment }}
        >
          <Oak concept={concept} className="h-16 w-auto" style={{ color: C.museumBlack }} />
          <Wordmark color={C.museumBlack} gold={isTypographic ? C.gold : undefined} />
        </div>
        <div
          className="flex items-center justify-center p-6"
          style={{ background: C.museumBlack }}
        >
          <Oak concept={concept} className="h-16 w-auto" style={{ color: C.gold }} />
        </div>
      </div>

      {/* Фоновый дуб за названием */}
      <h3 className="mt-7 mb-3 font-sans text-xs font-semibold tracking-[0.12em] text-ink-muted uppercase">
        Фоновый дуб под названием
      </h3>
      <div
        className="relative flex h-44 items-center justify-center overflow-hidden"
        style={{ background: C.parchment }}
      >
        <OakWatermark
          concept={concept}
          className="absolute h-56 w-auto opacity-15"
          style={{ color: C.oakWood }}
        />
        <span className="relative">
          <Wordmark color={C.museumBlack} gold={isTypographic ? C.gold : undefined} />
        </span>
      </div>

      {/* Носители */}
      <h3 className="mt-7 mb-3 font-sans text-xs font-semibold tracking-[0.12em] text-ink-muted uppercase">
        Носители
      </h3>
      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
        <Carrier label="Коробка" bg={C.oakWood} fg={C.parchment} concept={concept} />
        <Carrier label="Лента букета" bg={C.imperialPlum} fg={C.goldLight} concept={concept} ribbon />
        <Carrier label="Бирка" bg={C.parchment} fg={C.museumBlack} concept={concept} tag />
        <Carrier label="Пакет" bg={C.oakWood} fg={C.parchment} concept={concept} />
        <Carrier label="Вывеска" bg={C.museumBlack} fg={C.gold} concept={concept} sign />
        <Carrier label="Аватар" bg={C.museumBlack} fg={C.goldLight} concept={concept} square />
        <Carrier label="Favicon" bg={C.museumBlack} fg={C.goldLight} concept={concept} favicon />
        <Carrier label="Фургон" bg={C.parchment} fg={C.museumBlack} concept={concept} van />
      </div>
    </article>
  );
}

function Carrier({
  label,
  bg,
  fg,
  concept,
  ribbon,
  tag,
  sign,
  square,
  favicon,
  van,
}: {
  label: string;
  bg: string;
  fg: string;
  concept: OakConcept;
  ribbon?: boolean;
  tag?: boolean;
  sign?: boolean;
  square?: boolean;
  favicon?: boolean;
  van?: boolean;
}) {
  return (
    <figure className="m-0">
      <div
        className="flex aspect-4/3 items-center justify-center p-4"
        style={{ background: ribbon || tag || favicon ? "#E4D5BF" : bg }}
      >
        {ribbon ? (
          <div
            className="flex h-9 w-full items-center justify-center gap-2"
            style={{ background: bg }}
          >
            <Oak concept={concept} className="h-6 w-auto" style={{ color: fg }} />
            <span className="font-display text-[10px]" style={{ color: fg }}>
              Дубравиных
            </span>
          </div>
        ) : tag ? (
          <div
            className="flex h-full w-2/3 flex-col items-center justify-center gap-1 border"
            style={{ background: bg, borderColor: "#00000022" }}
          >
            <Oak concept={concept} className="h-10 w-auto" style={{ color: fg }} />
            <span className="text-[7px] tracking-widest" style={{ color: fg }}>
              ДУБРАВИНЫХ
            </span>
          </div>
        ) : favicon ? (
          <div className="flex size-10 items-center justify-center" style={{ background: bg }}>
            <OakMicro className="h-6 w-auto" style={{ color: fg }} />
          </div>
        ) : square ? (
          <div className="flex size-20 items-center justify-center" style={{ background: bg }}>
            <Oak concept={concept} className="h-12 w-auto" style={{ color: fg }} />
          </div>
        ) : van ? (
          <div className="flex w-full items-center gap-3">
            <Oak concept={concept} className="h-12 w-auto shrink-0" style={{ color: fg }} />
            <span className="font-display text-xs leading-tight" style={{ color: fg }}>
              Цветочная База
              <br />
              Дубравиных
            </span>
          </div>
        ) : sign ? (
          <div className="flex flex-col items-center gap-2">
            <Oak concept={concept} className="h-10 w-auto" style={{ color: fg }} />
            <span className="font-display text-[10px]" style={{ color: fg }}>
              Цветочная База Дубравиных
            </span>
          </div>
        ) : (
          <Oak concept={concept} className="h-14 w-auto" style={{ color: fg }} />
        )}
      </div>
      <figcaption className="mt-1.5 text-xs text-ink-muted">{label}</figcaption>
    </figure>
  );
}
