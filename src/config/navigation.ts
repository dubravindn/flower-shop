/** Навигация сайта. Основное меню намеренно короткое — не все страницы сразу. */

export interface NavItem {
  label: string;
  href: string;
  /** Короткое пояснение для мобильного меню */
  hint?: string;
}

/** Основное меню в шапке */
export const MAIN_NAV: NavItem[] = [
  { label: "Каталог", href: "/catalog", hint: "Букеты, композиции, цветы поштучно" },
  { label: "Опт", href: "/wholesale", hint: "Поставки магазинам и флористам" },
  { label: "Корпоративным клиентам", href: "/corporate", hint: "Мероприятия и подарки сотрудникам" },
  { label: "Доставка", href: "/delivery", hint: "Условия и оплата" },
  { label: "Магазины", href: "/contacts", hint: "Адреса и режим работы" },
  { label: "О компании", href: "/about", hint: "База, семья, поставки" },
];

/** Подвал: сгруппированные ссылки */
export const FOOTER_NAV: { title: string; items: NavItem[] }[] = [
  {
    title: "Покупателям",
    items: [
      { label: "Каталог", href: "/catalog" },
      { label: "Подобрать по поводу", href: "/catalog?occasion=birthday" },
      { label: "Доставка и оплата", href: "/delivery" },
      { label: "Уход за цветами", href: "/care" },
    ],
  },
  {
    title: "Бизнесу",
    items: [
      { label: "Оптовым клиентам", href: "/wholesale" },
      { label: "Оптовый каталог", href: "/wholesale/catalog" },
      { label: "Корпоративным клиентам", href: "/corporate" },
    ],
  },
  {
    title: "Компания",
    items: [
      { label: "О компании", href: "/about" },
      { label: "Магазины и контакты", href: "/contacts" },
      { label: "Политика конфиденциальности", href: "/privacy" },
      { label: "Публичная оферта", href: "/offer" },
    ],
  },
];
