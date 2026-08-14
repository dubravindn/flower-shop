import type { Metadata } from "next";
import { PageHeader, Prose } from "@/components/layout/PageHeader";
import { ButtonLink } from "@/components/ui/Button";
import { COMPANY, whatsappLink } from "@/config/company";

export const metadata: Metadata = {
  title: "Отказ от напоминаний",
  description: "Как отключить напоминания о важных датах и рекламные сообщения.",
  alternates: { canonical: "/unsubscribe" },
  robots: { index: false, follow: true },
};

export default function UnsubscribePage() {
  return (
    <>
      <PageHeader
        crumbs={[{ label: "Отказ от напоминаний" }]}
        title="Отказаться от напоминаний"
        text="Отключить сообщения можно в любой момент и без объяснения причин."
      />

      <Prose>
        <h2>Как отписаться</h2>
        <ol>
          <li>Ответьте «стоп» на любое наше сообщение.</li>
          <li>
            Или напишите нам в мессенджер — отключим напоминания в тот же день.
          </li>
          <li>
            Или позвоните по телефону{" "}
            <a href={COMPANY.phone.href}>{COMPANY.phone.display}</a>.
          </li>
        </ol>

        <h2>Что можно отключить по отдельности</h2>
        <ul>
          <li>Напоминания об одной конкретной дате.</li>
          <li>Все напоминания о важных датах.</li>
          <li>Рекламные предложения — отдельно от напоминаний.</li>
        </ul>

        <h2>Удаление данных</h2>
        <p>
          Вы можете попросить удалить сохранённые даты и контактные данные
          полностью. Мы удалим их и подтвердим это сообщением.
        </p>

        <p>
          Подробности — в{" "}
          <a href="/privacy">политике конфиденциальности</a> и{" "}
          <a href="/consent">согласии на обработку данных</a>.
        </p>
      </Prose>

      <div className="container-page pb-16">
        <ButtonLink
          href={whatsappLink("Здравствуйте! Прошу отключить напоминания")}
          size="lg"
        >
          Отключить напоминания
        </ButtonLink>
      </div>
    </>
  );
}
