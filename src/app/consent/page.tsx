import type { Metadata } from "next";
import { PageHeader, Prose } from "@/components/layout/PageHeader";
import { COMPANY } from "@/config/company";
import { LEGAL_NOTE, UPDATED_AT } from "@/content/legal";

export const metadata: Metadata = {
  title: "Согласие на обработку данных",
  description:
    "Текст согласия на обработку персональных данных и на получение напоминаний о важных датах.",
  alternates: { canonical: "/consent" },
};

export default function ConsentPage() {
  return (
    <>
      <PageHeader
        crumbs={[{ label: "Согласие на обработку данных" }]}
        title="Согласие на обработку данных"
        text={`Редакция от ${UPDATED_AT}`}
      />

      <Prose>
        <p className="rounded-[var(--radius-card)] border border-red-brand/30 bg-red-brand/5 p-4 text-sm">
          {LEGAL_NOTE}
        </p>

        <h2>Согласие первое: обработка данных</h2>
        <p>
          Отправляя форму, вы разрешаете {COMPANY.name} обрабатывать указанные вами
          имя, номер телефона, дату и повод, чтобы сохранить событие и напомнить
          о нём. Обработка включает сбор, хранение, уточнение и удаление данных.
        </p>
        <p>
          Это согласие обязательно: без него сохранить дату технически невозможно.
        </p>

        <h2>Согласие второе: сообщения и предложения</h2>
        <p>
          Отдельно вы можете разрешить присылать напоминания и подборки букетов
          в выбранный канал — WhatsApp, Telegram или SMS. Это согласие
          необязательно, отметка не проставляется заранее, и заказ без неё
          оформляется так же.
        </p>

        <h2>Как отозвать согласие</h2>
        <ul>
          <li>ответить «стоп» на любое сообщение;</li>
          <li>написать нам в мессенджер;</li>
          <li>
            позвонить: <a href={COMPANY.phone.href}>{COMPANY.phone.display}</a>;
          </li>
          <li>
            воспользоваться <a href="/unsubscribe">страницей отказа</a>.
          </li>
        </ul>

        <h2>Что мы фиксируем при выдаче согласия</h2>
        <p>
          Дату и время, текст согласия в действовавшей редакции и источник формы.
          Это нужно, чтобы подтвердить факт согласия по вашему запросу.
        </p>

        <p>
          Полные условия — в{" "}
          <a href="/privacy">политике конфиденциальности</a>.
        </p>
      </Prose>
    </>
  );
}
