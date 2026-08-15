import type { Metadata } from "next";
import { PageHeader } from "@/components/layout/PageHeader";
import { CatalogGrid } from "./CatalogGrid";

export const metadata: Metadata = {
  title: "Букеты и цветы с доставкой в Кирове",
  description:
    "Цветочная База Дубравиных — цветочный магазин в Кирове. Авторские букеты, доставка за 2 часа, фото букета перед отправкой. Заказ через WhatsApp.",
  alternates: { canonical: "/catalog" },
};

export default function CatalogPage() {
  return (
    <>
      <PageHeader
        crumbs={[{ label: "Каталог" }]}
        title="Каталог букетов"
        text="Работы наших флористов. Состав повторяем с поправкой на свежую поставку — замену согласуем до сборки."
      />
      <CatalogGrid />
    </>
  );
}
