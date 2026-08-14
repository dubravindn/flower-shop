/** Форматирование цен и чисел. */

const rub = new Intl.NumberFormat("ru-RU", {
  style: "currency",
  currency: "RUB",
  maximumFractionDigits: 0,
});

/** Цена в рублях. null — компания ещё не передала прайс. */
export function formatPrice(value: number | null): string {
  if (value === null) return "Цена уточняется";
  return rub.format(value);
}

/** Минимальная цена среди вариантов. null, если ни у одного нет цены. */
export function minPrice(variants: { price: number | null }[]): number | null {
  const prices = variants
    .map((v) => v.price)
    .filter((p): p is number => p !== null);
  return prices.length ? Math.min(...prices) : null;
}

/** «от 2 900 ₽» либо «Цена уточняется». */
export function formatFromPrice(
  variants: { price: number | null }[],
): string {
  const min = minPrice(variants);
  if (min === null) return "Цена уточняется";
  return variants.length > 1 ? `от ${rub.format(min)}` : rub.format(min);
}
