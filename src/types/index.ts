/** Типизированные модели предметной области. */

export type CategorySlug =
  | "avtorskie-bukety"
  | "monobukety"
  | "kompozicii"
  | "cvety-poshtuchno"
  | "podarki"
  | "shary";

export type OccasionSlug =
  | "birthday"
  | "date"
  | "gratitude"
  | "no-reason"
  | "for-mom"
  | "corporate";

export interface Category {
  slug: CategorySlug;
  title: string;
  /** Короткая подпись под названием */
  caption: string;
  image: string;
  imageAlt: string;
}

export interface Occasion {
  slug: OccasionSlug;
  title: string;
}

/** Вариант размера букета. Цена может быть не задана — тогда «уточняется». */
export interface ProductVariant {
  id: string;
  label: string;
  /** null = цена ещё не передана компанией */
  price: number | null;
}

export type ProductBadge = "hit" | "new" | "today";

export interface Product {
  slug: string;
  title: string;
  /** Состав букета — по фотографии */
  composition: string;
  category: CategorySlug;
  occasions: OccasionSlug[];
  image: string;
  imageAlt: string;
  variants: ProductVariant[];
  badges: ProductBadge[];
  /** Доминирующая гамма — для фильтра по цвету */
  palette: string[];
}

/** Отзыв. Показывается только из подтверждённого источника. */
export interface Review {
  id: string;
  author: string;
  text: string;
  rating: number;
  source: string;
  date: string;
}

/** Заявка розничного покупателя из блока «Поможем выбрать» */
export interface HelpRequest {
  occasion: string;
  budget: string;
  date: string;
  contact: string;
}
