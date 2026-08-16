/**
 * Лица бренда — братья Дубравины.
 *
 * Фотография кадрирована из присланного снимка так, чтобы в кадр не попали
 * ни надпись на футболке, ни вшитая реклама стороннего мероприятия.
 * Нижняя граница кадра — выше надписи, поэтому доступны только широкие
 * форматы: 3:2, 16:9 и 1200×630.
 *
 * Вертикальный 4:5 и квадрат 1:1 остаются заглушками: в них два лица
 * без надписи не помещаются. Кадр «по пояс» из этого снимка тоже
 * невозможен — пояс ниже надписи.
 *
 * Как подключить студийную съёмку, когда она появится:
 *   1. положить файлы в `public/images/founders/` под именами
 *      founders-3x2.jpg, founders-16x9.jpg, founders-og.jpg,
 *      founders-4x5.jpg, founders-1x1.jpg;
 *   2. добавить недостающие пропорции в `REAL_RATIOS` ниже.
 */

export type FounderRatio = "16x9" | "4x5" | "3x2" | "1x1" | "og";

/**
 * Пропорции, для которых есть настоящая фотография.
 * Остальные показываются фирменной заглушкой.
 */
const REAL_RATIOS = new Set<FounderRatio>(["3x2", "16x9", "og"]);

/** Размеры готовых файлов — совпадают с тем, что делает scripts/prepare-images.mjs. */
const SIZES: Record<FounderRatio, { width: number; height: number }> = {
  "16x9": { width: 1280, height: 720 },
  "4x5": { width: 1080, height: 1350 },
  "3x2": { width: 1200, height: 800 },
  "1x1": { width: 1000, height: 1000 },
  og: { width: 1200, height: 630 },
};

export interface FounderImage {
  src: string;
  width: number;
  height: number;
  alt: string;
  /** true, если это временная заглушка, а не фотография */
  isPlaceholder: boolean;
}

/**
 * Кадрирование владельцев в нужной пропорции.
 * Разные блоки страницы берут разные пропорции — одна и та же
 * фотография не повторяется в одинаковом виде.
 */
export function founderImage(ratio: FounderRatio, alt: string): FounderImage {
  const { width, height } = SIZES[ratio];
  const isReal = REAL_RATIOS.has(ratio);
  const file = isReal ? `founders-${ratio}` : `placeholder-${ratio}`;

  return {
    src: `/images/founders/${file}.jpg`,
    width,
    height,
    alt: isReal ? alt : `${alt} — место для фотографии, пропорция ${ratio}`,
    isPlaceholder: !isReal,
  };
}

/** Тексты блока владельцев для разных страниц. */
export const FOUNDERS_CONTENT = {
  home: {
    eyebrow: "Владельцы",
    title: "За качество отвечаем лично",
    text: "Мы — братья Дубравины, основатели Цветов Дубравиных. Лично контролируем поставки, работу флористов и качество каждого заказа.",
    cta: { label: "Узнать о компании", href: "/about" },
    ratio: "3x2" as FounderRatio,
    alt: "Братья Дубравины, владельцы Цветов Дубравиных",
  },
  wholesale: {
    eyebrow: "Работа напрямую",
    title: "Работаете напрямую с владельцами базы",
    text: "Работаете напрямую с владельцами базы. Мы контролируем закупку, приёмку и поставки цветов клиентам по Кировской области, на север и в Сыктывкар.",
    cta: { label: "Получить оптовый прайс", href: "/wholesale#price" },
    ratio: "16x9" as FounderRatio,
    alt: "Владельцы Цветов Дубравиных на приёмке поставки",
  },
  about: {
    eyebrow: "Семья Дубравиных",
    title: "Компанию ведут два брата",
    text: "Цветы Дубравиных выросла из семейного дела. Мы сами ездим на закупки, принимаем поставки на базе и отвечаем за то, что попадает в наши магазины и уезжает оптовым клиентам.",
    cta: { label: "Написать нам", href: "/contacts" },
    ratio: "3x2" as FounderRatio,
    alt: "Братья Дубравины, владельцы компании",
  },
} as const;
