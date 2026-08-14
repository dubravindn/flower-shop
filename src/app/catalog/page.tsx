import type { Metadata } from "next";
import { Suspense } from "react";
import { PageHeader } from "@/components/layout/PageHeader";
import { ProductCardSkeleton } from "@/components/ui/States";
import { CatalogView } from "./CatalogView";

export const metadata: Metadata = {
  title: "Букеты и цветы с доставкой в Кирове",
  description:
    "Цветочная База Дубравиных — цветочный магазин в Кирове. Авторские букеты, доставка за 2 часа, фото букета перед отправкой. Заказ через WhatsApp.",
  alternates: { canonical: "/catalog" },
};

function Fallback() {
  return (
    <div className="container-page grid grid-cols-2 gap-4 py-10 lg:grid-cols-4">
      {Array.from({ length: 8 }, (_, i) => (
        <ProductCardSkeleton key={i} />
      ))}
    </div>
  );
}

export default function CatalogPage() {
  return (
    <>
      <PageHeader
        crumbs={[{ label: "Каталог" }]}
        title="Каталог букетов"
        text="Работы наших флористов. Состав повторяем с поправкой на свежую поставку — замену согласуем до сборки."
      />
      <Suspense fallback={<Fallback />}>
        <CatalogView />
      </Suspense>
    </>
  );
}
