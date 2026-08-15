/**
 * Бизнес-обещания бренда — единственное место, где они задаются.
 *
 * Правило простое: на сайте публикуется только то, что компания
 * подтвердила. Всё остальное лежит здесь со статусом TODO_CONFIRM
 * и в интерфейс не попадает, пока флаг не переведён в `true`.
 *
 * Так формулировка не расползается по десятку компонентов и её
 * нельзя случайно опубликовать раньше подтверждения.
 */

export interface Claim {
  /** Текст для интерфейса */
  text: string;
  /** Подтверждено владельцем — можно показывать */
  confirmed: boolean;
  /** Что именно нужно уточнить, если не подтверждено */
  note?: string;
}

const CONFIRMED = (text: string): Claim => ({ text, confirmed: true });

const TODO_CONFIRM = (text: string, note: string): Claim => ({
  text,
  confirmed: false,
  note,
});

export const CLAIMS = {
  /* ---------- подтверждено владельцем ---------- */
  delivery2h: CONFIRMED("Доставка по Кирову за 2 часа"),
  photoBeforeSend: CONFIRMED("Фото букета перед отправкой"),
  orderViaWhatsapp: CONFIRMED("Заказ через WhatsApp"),
  ownBase: CONFIRMED("Собственная оптово-розничная цветочная база"),
  threeShops: CONFIRMED("Три розничных магазина"),
  weeklySupply: CONFIRMED("Еженедельные поставки свежих цветов"),
  wholesaleRegion: CONFIRMED("Оптовые продажи по Кировской области"),
  shippingNorth: CONFIRMED("Отправка цветов на север и в Сыктывкар"),

  /* ---------- ждёт подтверждения ---------- */
  paymentMethods: TODO_CONFIRM(
    "Способы оплаты",
    "Уточнить перечень: перевод, карта при получении, наличные, безналичный расчёт",
  ),
  refund: TODO_CONFIRM(
    "Возврат денег при подтверждённой проблеме",
    "Юридически значимое обещание — нужны условия и сроки возврата",
  ),
  replacement: TODO_CONFIRM(
    "Замена букета при подтверждённой проблеме",
    "Уточнить срок обращения и порядок замены",
  ),
  deliveryZones: TODO_CONFIRM(
    "Тарифы и зоны доставки",
    "Нужны стоимость по районам и границы зон",
  ),
  wholesaleMinimum: TODO_CONFIRM(
    "Минимальная сумма оптового заказа",
    "Уточнить, есть ли минимум и какой",
  ),
  remindersService: TODO_CONFIRM(
    "Сохранение важных дат и напоминания",
    "Сервиса нет: нужны сервер, хранилище персональных данных и согласия",
  ),
} as const;

/** Показывать ли обещание в интерфейсе. */
export const canShow = (claim: Claim) => claim.confirmed;

/** Подтверждённые преимущества — для первого экрана и карточек. */
export const CONFIRMED_CLAIMS = Object.values(CLAIMS).filter(canShow);

/** Что осталось согласовать с владельцем — выводится на /brand-preview. */
export const PENDING_CLAIMS = Object.entries(CLAIMS)
  .filter(([, claim]) => !claim.confirmed)
  .map(([key, claim]) => ({ key, ...claim }));
