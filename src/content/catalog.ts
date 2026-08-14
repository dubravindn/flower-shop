import type { Category, Occasion, Product } from "@/types";

/**
 * Каталог. Названия и составы — по реальным фотографиям работ компании.
 *
 * ЦЕНЫ НЕ ЗАПОЛНЕНЫ НАМЕРЕННО: компания их не передавала, а придумывать
 * их нельзя. `price: null` выводится как «Цена уточняется», карточка
 * предлагает написать флористу. Как только цены появятся — проставить числа.
 */

export const CATEGORIES: Category[] = [
  {
    slug: "avtorskie-bukety",
    title: "Авторские букеты",
    caption: "Собираем под повод и бюджет",
    image: "/images/works/buket-letniy-mix.jpg",
    imageAlt: "Авторский букет из сезонных цветов",
  },
  {
    slug: "monobukety",
    title: "Монобукеты",
    caption: "Один сорт, крупная форма",
    image: "/images/works/rozy-belye.jpg",
    imageAlt: "Монобукет из белых роз",
  },
  {
    slug: "kompozicii",
    title: "Композиции",
    caption: "В коробках и корзинах",
    image: "/images/works/buket-pastelnyy.jpg",
    imageAlt: "Цветочная композиция в пастельной гамме",
  },
  {
    slug: "cvety-poshtuchno",
    title: "Цветы поштучно",
    caption: "Из свежей поставки базы",
    image: "/images/works/hrizantemy-zheltye.jpg",
    imageAlt: "Жёлтые хризантемы поштучно",
  },
  {
    slug: "podarki",
    title: "Подарки",
    caption: "Дополнить букет",
    image: "/images/works/buket-nezhnyy-rozovyy.jpg",
    imageAlt: "Букет с подарочной упаковкой",
  },
  {
    slug: "shary",
    title: "Воздушные шары",
    caption: "Гелиевые шары и композиции",
    image: "/images/works/buket-avtorskiy-rozovyy.jpg",
    imageAlt: "Праздничное оформление с цветами",
  },
];

export const OCCASIONS: Occasion[] = [
  { slug: "birthday", title: "День рождения" },
  { slug: "date", title: "Свидание" },
  { slug: "gratitude", title: "Благодарность" },
  { slug: "no-reason", title: "Без повода" },
  { slug: "for-mom", title: "Для мамы" },
  { slug: "corporate", title: "Корпоративный подарок" },
];

/** Один размер без цены — пока компания не передала прайс. */
const oneSize = (id: string) => [{ id, label: "Стандартный", price: null }];

export const PRODUCTS: Product[] = [
  {
    slug: "hrizantemy-zheltye",
    title: "Хризантемы жёлтые",
    composition: "Кустовая хризантема, матовая упаковка, атласная лента",
    category: "monobukety",
    occasions: ["birthday", "gratitude", "no-reason"],
    image: "/images/works/hrizantemy-zheltye.jpg",
    imageAlt: "Букет жёлтых кустовых хризантем",
    variants: oneSize("hrizantemy-zheltye-std"),
    badges: ["hit"],
    palette: ["жёлтый"],
  },
  {
    slug: "buket-nezhnyy-rozovyy",
    title: "Нежный розовый",
    composition: "Белая хризантема, розовые розы, альстромерия, кустовая гвоздика",
    category: "avtorskie-bukety",
    occasions: ["birthday", "for-mom", "date"],
    image: "/images/works/buket-nezhnyy-rozovyy.jpg",
    imageAlt: "Букет с белой хризантемой и розовыми розами",
    variants: oneSize("buket-nezhnyy-rozovyy-std"),
    badges: ["hit"],
    palette: ["розовый", "белый"],
  },
  {
    slug: "hrizantemy-rozovye",
    title: "Хризантемы розовые",
    composition: "Кустовая хризантема, белая упаковка, лавандовая лента",
    category: "monobukety",
    occasions: ["no-reason", "gratitude"],
    image: "/images/works/hrizantemy-rozovye.jpg",
    imageAlt: "Букет розовых кустовых хризантем",
    variants: oneSize("hrizantemy-rozovye-std"),
    badges: [],
    palette: ["розовый"],
  },
  {
    slug: "rozy-belye",
    title: "Розы белые",
    composition: "Монобукет из белых роз, матовая упаковка, атласная лента",
    category: "monobukety",
    occasions: ["date", "gratitude", "corporate"],
    image: "/images/works/rozy-belye.jpg",
    imageAlt: "Монобукет из белых роз",
    variants: oneSize("rozy-belye-std"),
    badges: ["hit"],
    palette: ["белый"],
  },
  {
    slug: "rozy-kremovye",
    title: "Розы кремовые",
    composition: "Монобукет из кремовых пионовидных роз, матовая упаковка",
    category: "monobukety",
    occasions: ["date", "for-mom"],
    image: "/images/works/rozy-kremovye.jpg",
    imageAlt: "Монобукет из кремовых пионовидных роз",
    variants: oneSize("rozy-kremovye-std"),
    badges: ["new"],
    palette: ["кремовый", "белый"],
  },
  {
    slug: "buket-krasno-belyy",
    title: "Красно-белый",
    composition: "Красные розы, белая хризантема, альстромерия, гвоздика, эвкалипт",
    category: "avtorskie-bukety",
    occasions: ["birthday", "corporate"],
    image: "/images/works/buket-krasno-belyy.jpg",
    imageAlt: "Букет из красных роз и белой хризантемы",
    variants: oneSize("buket-krasno-belyy-std"),
    badges: [],
    palette: ["красный", "белый"],
  },
  {
    slug: "rozy-krasnye",
    title: "Розы красные",
    composition: "Красные розы, белая альстромерия, эвкалипт, красно-белая упаковка",
    category: "monobukety",
    occasions: ["date"],
    image: "/images/works/rozy-krasnye.jpg",
    imageAlt: "Букет из красных роз с белой альстромерией",
    variants: oneSize("rozy-krasnye-std"),
    badges: ["hit"],
    palette: ["красный"],
  },
  {
    slug: "buket-pastelnyy",
    title: "Пастельный",
    composition: "Белая хризантема, кустовые розы, альстромерия, гвоздика",
    category: "kompozicii",
    occasions: ["for-mom", "gratitude", "no-reason"],
    image: "/images/works/buket-pastelnyy.jpg",
    imageAlt: "Пастельный букет с хризантемой и кустовыми розами",
    variants: oneSize("buket-pastelnyy-std"),
    badges: ["new"],
    palette: ["кремовый", "розовый"],
  },
  {
    slug: "buket-letniy-mix",
    title: "Летний микс",
    composition: "Гвоздика, кустовая хризантема, ромашка, эустома, кустовая роза",
    category: "avtorskie-bukety",
    occasions: ["birthday", "no-reason"],
    image: "/images/works/buket-letniy-mix.jpg",
    imageAlt: "Крупный летний букет из сезонных цветов",
    variants: oneSize("buket-letniy-mix-std"),
    badges: ["hit", "today"],
    palette: ["жёлтый", "розовый", "зелёный"],
  },
  {
    slug: "buket-avtorskiy-rozovyy",
    title: "Авторский розовый",
    composition: "Гортензия, ирис, хризантема, кустовая роза, маттиола, эвкалипт",
    category: "avtorskie-bukety",
    occasions: ["birthday", "for-mom", "corporate"],
    image: "/images/works/buket-avtorskiy-rozovyy.jpg",
    imageAlt: "Крупный авторский букет в розовой гамме",
    variants: oneSize("buket-avtorskiy-rozovyy-std"),
    badges: ["new"],
    palette: ["розовый", "фиолетовый"],
  },
  {
    slug: "hrizantemy-belye",
    title: "Хризантемы белые",
    composition: "Ромашковая хризантема, кремовая упаковка, атласная лента",
    category: "monobukety",
    occasions: ["gratitude", "no-reason", "corporate"],
    image: "/images/works/hrizantemy-belye.jpg",
    imageAlt: "Букет белых ромашковых хризантем",
    variants: oneSize("hrizantemy-belye-std"),
    badges: [],
    palette: ["белый"],
  },
];

/** Товары для главной: подборка «Популярное». */
export const POPULAR_PRODUCTS = PRODUCTS.filter((p) => p.badges.includes("hit"));
export const NEW_PRODUCTS = PRODUCTS.filter((p) => p.badges.includes("new"));

export const findCategory = (slug: string) =>
  CATEGORIES.find((c) => c.slug === slug);
