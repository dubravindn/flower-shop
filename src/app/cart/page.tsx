import type { Metadata } from "next";
import { PageHeader } from "@/components/layout/PageHeader";
import { EmptyState } from "@/components/ui/States";
import { ButtonLink } from "@/components/ui/Button";
import { whatsappLink } from "@/config/company";

export const metadata: Metadata = {
  title: "Корзина",
  description: "Корзина заказа Цветов Дубравиных.",
  alternates: { canonical: "/cart" },
  robots: { index: false, follow: true },
};

/**
 * Корзина.
 *
 * Механика добавления товаров появится вместе с ценами: складывать в корзину
 * позиции без стоимости бессмысленно. Пока страница существует, чтобы прямая
 * ссылка не отдавала 404, и честно объясняет, как оформить заказ сейчас.
 */
export default function CartPage() {
  return (
    <>
      <PageHeader
        crumbs={[{ label: "Корзина" }]}
        title="Корзина"
        text="Самостоятельное оформление заказа готовится. Сейчас состав и стоимость подтверждает флорист в переписке."
      />

      <div className="container-page py-12 md:py-16">
        <EmptyState
          title="Пока заказ оформляется через флориста"
          text="Выберите букет в каталоге и нажмите «Узнать цену» — флорист подтвердит наличие, стоимость и время доставки. Корзина с самостоятельной оплатой появится, когда в каталог загрузят цены."
          action={
            <div className="flex flex-col gap-3 sm:flex-row">
              <ButtonLink href="/catalog" size="lg">
                Перейти в каталог
              </ButtonLink>
              <ButtonLink
                href={whatsappLink("Здравствуйте! Хочу заказать букет с сайта")}
                size="lg"
                variant="outline"
              >
                Написать флористу
              </ButtonLink>
            </div>
          }
        />
      </div>
    </>
  );
}
