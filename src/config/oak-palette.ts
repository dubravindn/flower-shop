/**
 * Палитра, снятая с брендборда-референса
 * (photo_2026-08-15 00.18.17.jpeg, оригинал не изменялся).
 *
 * Значения взяты с подписей брендборда и сверены выборкой пикселей
 * из плашек: JPEG слегка осветляет цвет, поэтому подписи точнее.
 *
 * Важно: эта гамма темнее и холоднее текущей палитры сайта
 * (бургунди — шампань — крафт). Логотип рисуется в ней, но переводить
 * на неё весь сайт — отдельное решение владельца.
 */

export const OAK_PALETTE = {
  /** Основной тёмный */
  museumBlack: "#151515",
  /** Основной светлый фон */
  parchment: "#E8DFC9",
  /** Дополнительный приглушённый */
  imperialPlum: "#351A32",
  /** Нейтральный контрастный */
  oxidizedSilver: "#A6A6A1",
  /** Акцент */
  deepCarmine: "#8D1538",
  /** Дополнительный холодный */
  collectionBlue: "#1C3D56",
  /** Натуральный древесный — снят с крафтовых коробок брендборда */
  oakWood: "#7A5C3E",
  /** Золото */
  gold: "#B6924E",
  goldLight: "#D2B875",
} as const;

export const OAK_PALETTE_LIST = [
  { name: "Museum Black", hex: OAK_PALETTE.museumBlack, role: "Основной тёмный" },
  { name: "Parchment", hex: OAK_PALETTE.parchment, role: "Основной светлый фон" },
  { name: "Imperial Plum", hex: OAK_PALETTE.imperialPlum, role: "Приглушённый дополнительный" },
  { name: "Oxidized Silver", hex: OAK_PALETTE.oxidizedSilver, role: "Нейтральный" },
  { name: "Deep Carmine", hex: OAK_PALETTE.deepCarmine, role: "Акцент" },
  { name: "Collection Blue", hex: OAK_PALETTE.collectionBlue, role: "Холодный дополнительный" },
  { name: "Oak Wood", hex: OAK_PALETTE.oakWood, role: "Натуральный древесный" },
  { name: "Gold", hex: OAK_PALETTE.gold, role: "Золото: «ДУБ», линии, тиснение" },
  { name: "Gold Light", hex: OAK_PALETTE.goldLight, role: "Светлое золото" },
];
