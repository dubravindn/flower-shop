import type { Metadata } from "next";
import { PageHeader } from "@/components/layout/PageHeader";
import { EmptyState } from "@/components/ui/States";
import { ButtonLink } from "@/components/ui/Button";
import { whatsappLink } from "@/config/company";

export const metadata: Metadata = {
  title: "Оформление заказа",
  description: "Оформление заказа в Цветочной Базе Дубравиных.",
  alternates: { canonical: "/checkout" },
  robots: { index: false, follow: true },
};

export default function CheckoutPage() {
  return (
    <>
      <PageHeader
        crumbs={[{ label: "Корзина", href: "/cart" }, { label: "Оформление" }]}
        title="Оформление заказа"
        text="Форма оформления с оплатой и выбором времени готовится."
      />

      <div className="container-page py-12 md:py-16">
        <EmptyState
          title="Оформить заказ пока помогает флорист"
          text="Он уточнит состав, адрес и время вручения, подтвердит стоимость и пришлёт фотографию собранного букета перед отправкой."
          action={
            <div className="flex flex-col gap-3 sm:flex-row">
              <ButtonLink
                href={whatsappLink("Здравствуйте! Хочу оформить заказ")}
                size="lg"
              >
                Оформить через флориста
              </ButtonLink>
              <ButtonLink href="/catalog" size="lg" variant="outline">
                Вернуться в каталог
              </ButtonLink>
            </div>
          }
        />
      </div>
    </>
  );
}
