/**
 * Фамильный дуб — знак бренда «Цветочная База Дубравиных».
 *
 * Смысловая связь: фамилия ДУБравиных и взрослый дуб — устойчивость,
 * корни, работа поколений. Крона собрана из нескольких крупных спокойных
 * форм, а не из мелких листьев: знак должен читаться силуэтом и на вывеске,
 * и в 16 px.
 *
 * Все контуры — собственные paths, растровых вставок и зависимости
 * от системного шрифта нет.
 */

import {
  OAK_PATHS,
  OAK_MICRO,
  OAK_VIEWBOX,
  OAK_MICRO_VIEWBOX,
} from "@/components/brand/oak-paths";

export type OakConcept = "family" | "letter" | "typographic" | "brothers";

export interface OakMeta {
  id: OakConcept;
  title: string;
  idea: string;
}

export const OAK_CONCEPTS: Record<OakConcept, OakMeta> = {
  family: {
    id: "family",
    title: "A · Фамильный дуб",
    idea: "Взрослый дуб над названием. Две главные ветви — два брата, корни держат основание. Композиция строгая и симметричная: вариант для вывески и документов.",
  },
  letter: {
    id: "letter",
    title: "B · «Д» в стволе",
    idea: "Крона компактнее, в негативном пространстве ствола вырезана кириллическая «Д». Знак самодостаточен без текста — рассчитан на favicon, аватар и печать.",
  },
  typographic: {
    id: "typographic",
    title: "C · ДУБравиных",
    idea: "Главное — фамилия. Дуб сведён к минимальному силуэту, первые три буквы «ДУБ» выделены золотом. Самый типографический вариант.",
  },
  brothers: {
    id: "brothers",
    title: "D · Два брата — одно дерево",
    idea: "Два ствола стоят рядом на общей корневой системе под одной кроной. Стволы вертикальны, поэтому знак не превращается в букву «Y».",
  },
};

/** Знак дуба. Цвет — currentColor, фон прозрачный. */
export function Oak({
  concept = "family",
  className,
  title = "",
  style,
}: {
  concept?: OakConcept;
  className?: string;
  title?: string;
  style?: React.CSSProperties;
}) {
  const g = OAK_PATHS[concept];

  return (
    <svg
      viewBox={OAK_VIEWBOX}
      className={className}
      style={style}
      role={title ? "img" : undefined}
      aria-label={title || undefined}
      aria-hidden={title ? undefined : true}
      fill="currentColor"
    >
      {/* Крона — nonzero: доли перекрываются и не должны пробивать друг друга.
          Ствол — evenodd: там работает вырез буквы. */}
      <path d={g.crown} />
      <path d={g.trunk} fillRule="evenodd" />
    </svg>
  );
}

/** Упрощённый дуб для 16–32 px. */
export function OakMicro({
  className,
  style,
}: {
  className?: string;
  style?: React.CSSProperties;
}) {
  return (
    <svg
      viewBox={OAK_MICRO_VIEWBOX}
      className={className}
      style={style}
      fill="currentColor"
      aria-hidden="true"
    >
      <path d={OAK_MICRO} fillRule="evenodd" />
    </svg>
  );
}

/** Фоновый дуб: тонкий контур — водяной знак под названием. */
export function OakWatermark({
  concept = "family",
  className,
  style,
}: {
  concept?: OakConcept;
  className?: string;
  style?: React.CSSProperties;
}) {
  const g = OAK_PATHS[concept];

  return (
    <svg
      viewBox={OAK_VIEWBOX}
      className={className}
      style={style}
      aria-hidden="true"
      fill="none"
      stroke="currentColor"
      strokeWidth={2.5}
    >
      <path d={g.crown} />
      <path d={g.trunk} />
    </svg>
  );
}
