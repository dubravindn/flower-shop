import type { Metadata } from "next";
import { PageHeader } from "@/components/layout/PageHeader";
import { ButtonLink } from "@/components/ui/Button";
import { COMPANY, whatsappLink } from "@/config/company";

export const metadata: Metadata = {
  title: "Заказ принят",
  description: "Подтверждение заказа в Цветочной Базе Дубравиных.",
  alternates: { canonical: "/order/success" },
  robots: { index: false, follow: false },
};

export default function OrderSuccessPage() {
  return (
    <>
      <PageHeader
        crumbs={[{ label: "Заказ принят" }]}
        title="Спасибо, заказ принят"
        text="Флорист свяжется с вами, чтобы подтвердить состав, время вручения и стоимость."
      />

      <div className="container-page py-12 md:py-16">
        <div className="max-w-[62ch] rounded-[var(--radius-card)] border border-graphite/15 bg-paper p-6 md:p-8">
          <h2 className="text-2xl">Что дальше</h2>
          <ol className="mt-4 list-decimal space-y-2 pl-5 text-[1.0625rem]">
            <li>Флорист подтверждает наличие и стоимость.</li>
            <li>Согласуем адрес, дату и время вручения.</li>
            <li>Перед отправкой присылаем фотографию собранного букета.</li>
            <li>Курьер доставляет заказ и сообщает о вручении.</li>
          </ol>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <ButtonLink href={whatsappLink("Здравствуйте! Вопрос по моему заказу")} size="lg">
              Написать по заказу
            </ButtonLink>
            <ButtonLink href={COMPANY.phone.href} size="lg" variant="outline">
              {COMPANY.phone.display}
            </ButtonLink>
          </div>
        </div>
      </div>
    </>
  );
}
