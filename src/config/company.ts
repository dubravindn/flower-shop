/**
 * Единственный источник данных о компании.
 * Меняются контакты, адреса, режим работы и ссылки — правится только этот файл.
 *
 * Значения, которых компания ещё не передала, помечены TODO и вынесены
 * в константу `MISSING`. Придумывать их нельзя: телефоны, реквизиты,
 * юридическое лицо и e-mail должны прийти от владельца.
 */

/** Маркер отсутствующих данных. Интерфейс показывает их как «уточняется». */
export const TODO = null;

export type Maybe<T> = T | null;

export interface Store {
  id: string;
  /** Короткое название точки для карточек и навигации */
  name: string;
  /** Что это за точка: база, магазин */
  kind: "base" | "shop";
  city: string;
  address: string;
  /** Полный адрес одной строкой — для карт и schema.org */
  addressFull: string;
  hours: string;
  /** Что доступно на точке */
  features: string[];
  /** Ссылка на маршрут. Строится по адресу через Яндекс.Карты. */
  routeUrl: string;
  /** Фотография фасада. TODO: фотографий точек пока нет. */
  photo: Maybe<string>;
}

export interface SocialLink {
  net: "vk" | "telegram" | "whatsapp" | "instagram" | "taplink";
  label: string;
  url: string;
  /** Для какой аудитории канал */
  audience: "retail" | "wholesale" | "both";
}

const routeTo = (query: string) =>
  `https://yandex.ru/maps/?text=${encodeURIComponent(query)}`;

export const COMPANY = {
  /** Полное название. Пишется только так, без сокращений. */
  name: "Цветочная База Дубравиных",
  /** Фирменная монограмма. Кириллица, не латиница. */
  monogram: "ЦБД",
  legalName: TODO as Maybe<string>, // TODO: юридическое лицо от владельца
  inn: TODO as Maybe<string>, // TODO: ИНН
  ogrn: TODO as Maybe<string>, // TODO: ОГРН
  email: TODO as Maybe<string>, // TODO: почта для заявок

  city: "Киров",
  region: "Кировская область",

  /** Основной номер. Он же используется для WhatsApp. */
  phone: {
    display: "+7 (922) 995-55-00",
    href: "tel:+79229955500",
    /** Только цифры — формат wa.me */
    digits: "79229955500",
  },

  /** Прямой чат с менеджером. Текст подставляется в поле ввода. */
  whatsapp: {
    base: "https://wa.me/79229955500",
    defaultMessage: "Здравствуйте! Пишу с сайта Цветочной Базы Дубравиных",
  },

  /** География отправки — со слов компании */
  delivery: {
    city: "Доставка по Кирову",
    regions: ["Кировская область", "север области", "Сыктывкар"],
  },

  founders: {
    // Имена — со слов владельца. Второе имя не передано.
    names: "братья Дубравины",
    lead: "Дмитрий Дубравин",
    brother: TODO as Maybe<string>, // TODO: имя брата
  },
} as const;

export const STORES: Store[] = [
  {
    id: "base-vorovskogo",
    name: "Цветочная База",
    kind: "base",
    city: "Киров",
    address: "ул. Воровского, 107/1",
    addressFull: "Киров, ул. Воровского, 107/1",
    hours: "6:00 – 00:00",
    features: ["Опт", "Приёмка", "Розница"],
    routeUrl: routeTo("Киров, улица Воровского, 107/1"),
    photo: TODO,
  },
  {
    id: "shop-vorovskogo",
    name: "Магазин на Воровского",
    kind: "shop",
    city: "Киров",
    address: "ул. Воровского, 107/1",
    addressFull: "Киров, ул. Воровского, 107/1",
    hours: "6:00 – 20:00",
    features: ["Розница"],
    routeUrl: routeTo("Киров, улица Воровского, 107/1"),
    photo: TODO,
  },
  {
    id: "shop-lenina",
    name: "Магазин на Ленина",
    kind: "shop",
    city: "Киров",
    address: "ул. Ленина, 102А",
    addressFull: "Киров, ул. Ленина, 102А",
    hours: "9:00 – 00:00",
    features: ["Розница"],
    routeUrl: routeTo("Киров, улица Ленина, 102А"),
    photo: TODO,
  },
  {
    id: "shop-slobodskoy",
    name: "Магазин в Слободском",
    kind: "shop",
    city: "Слободской",
    address: "ул. Советская, 64",
    addressFull: "Слободской, ул. Советская, 64",
    hours: "7:30 – 21:30",
    features: ["Розница", "Опт"],
    routeUrl: routeTo("Слободской, улица Советская, 64"),
    photo: TODO,
  },
];

export const SOCIALS: SocialLink[] = [
  // Розница, Киров
  { net: "vk", label: "ВКонтакте", url: "https://vk.ru/dubravin.flowers", audience: "retail" },
  { net: "telegram", label: "Telegram", url: "https://t.me/lenina102a", audience: "retail" },
  { net: "instagram", label: "Instagram", url: "https://www.instagram.com/dubravin.flowers", audience: "retail" },
  // Слободской
  { net: "vk", label: "ВКонтакте — Слободской", url: "https://vk.ru/dubravin.flowers43", audience: "both" },
  { net: "instagram", label: "Instagram — Слободской", url: "https://www.instagram.com/dubravin.flowers.slob", audience: "both" },
  // Опт
  { net: "vk", label: "ВКонтакте — опт", url: "https://vk.ru/cvetochnaya_baza_dub", audience: "wholesale" },
  { net: "telegram", label: "Telegram — опт", url: "https://t.me/dubravin_flowers_opt", audience: "wholesale" },
  { net: "whatsapp", label: "WhatsApp-чат — опт", url: "https://chat.whatsapp.com/IM7QKYUZkksCvQKSYdTxdK", audience: "wholesale" },
  { net: "instagram", label: "Instagram — опт", url: "https://www.instagram.com/baza_dub", audience: "wholesale" },
  // Все ссылки сразу
  { net: "taplink", label: "Taplink", url: "https://taplink.cc/baza_dub", audience: "both" },
];

/** Ссылка в WhatsApp с подставленным текстом. */
export function whatsappLink(message?: string): string {
  const text = message ?? COMPANY.whatsapp.defaultMessage;
  return `${COMPANY.whatsapp.base}?text=${encodeURIComponent(text)}`;
}

/**
 * Данные, которых пока нет. Выводятся в отчёте и на /brand-preview,
 * чтобы владелец видел, что осталось заполнить.
 */
export const MISSING: { field: string; where: string }[] = [
  { field: "Юридическое лицо, ИНН, ОГРН", where: "src/config/company.ts → COMPANY" },
  { field: "E-mail для заявок", where: "src/config/company.ts → COMPANY.email" },
  { field: "Имя брата", where: "src/config/company.ts → COMPANY.founders.brother" },
  { field: "Фотографии фасадов магазинов", where: "src/config/company.ts → STORES[].photo" },
  { field: "Цены на товары", where: "src/content/products.ts → price" },
  { field: "Отзывы клиентов", where: "src/content/reviews.ts" },
  { field: "Условия и сроки доставки", where: "src/content/delivery.ts" },
];
