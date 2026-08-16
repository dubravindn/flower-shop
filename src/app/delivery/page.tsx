import type { Metadata } from "next";
import { PageHeader, Prose } from "@/components/layout/PageHeader";
import { COMPANY, whatsappLink } from "@/config/company";
import { DELIVERY } from "@/content/pages";
import { ButtonLink } from "@/components/ui/Button";

export const metadata: Metadata = {
  title: "Доставка и оплата",
  description:
    "Доставка цветов по Кирову и самовывоз из магазинов Цветов Дубравиных. Способы оплаты, зоны доставки и отправка оптовых заказов по области.",
  alternates: { canonical: "/delivery" },
};

export default function DeliveryPage() {
  return (
    <>
      <PageHeader
        crumbs={[{ label: "Доставка" }]}
        title="Доставка и оплата"
        text={DELIVERY.intro}
      />

      <Prose>
        <h2>Куда доставляем</h2>
        <ul>
          {DELIVERY.zones.map((zone) => (
            <li key={zone.title}>
              <strong>{zone.title}.</strong> {zone.text}
            </li>
          ))}
        </ul>

        <h2>Самовывоз</h2>
        <p>
          Букет можно забрать с любой из четырёх точек — адреса и режим работы
          собраны на странице <a href="/contacts">магазинов</a>. Скажите флористу,
          откуда вам удобнее забрать, и к какому времени подготовить заказ.
        </p>

        <h2>Оплата</h2>
        <ul>
          {DELIVERY.payment.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>

        <h2>Сроки и стоимость</h2>
        <p>{DELIVERY.todo}</p>

        <h2>Что делать, если с букетом что-то не так</h2>
        <p>
          Напишите нам в тот же день и приложите фотографию. Разберёмся: заменим
          букет или вернём деньги, если проблема подтвердится.
        </p>

        <p>
          Остались вопросы — звоните{" "}
          <a href={COMPANY.phone.href}>{COMPANY.phone.display}</a> или пишите в
          мессенджер.
        </p>
      </Prose>

      <div className="container-page pb-16">
        <ButtonLink href={whatsappLink("Здравствуйте! Вопрос по доставке")} size="lg">
          Спросить о доставке
        </ButtonLink>
      </div>
    </>
  );
}
