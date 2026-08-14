import type { Metadata } from "next";
import { PageHeader } from "@/components/layout/PageHeader";
import { EmptyState } from "@/components/ui/States";
import { ButtonLink } from "@/components/ui/Button";
import { whatsappLink } from "@/config/company";

export const metadata: Metadata = {
  title: "Оптовые остатки",
  description:
    "Актуальные остатки цветочной базы для оптовых клиентов. Цветочная База Дубравиных, Киров.",
  alternates: { canonical: "/wholesale/catalog" },
  robots: { index: false, follow: true },
};

/**
 * Оптовые остатки.
 *
 * Интеграция с «МойСклад» ещё не подключена, поэтому таблица не выводится.
 * Показывать выдуманные позиции и количества нельзя: оптовый клиент примет
 * их за реальные и спланирует закупку.
 */
export default function WholesaleCatalogPage() {
  return (
    <>
      <PageHeader
        crumbs={[
          { label: "Оптовым клиентам", href: "/wholesale" },
          { label: "Остатки" },
        ]}
        title="Остатки на базе"
        text="Здесь появится таблица с позициями, сортом, длиной, упаковкой и доступным количеством."
      />

      <div className="container-page py-12 md:py-16">
        <EmptyState
          title="Данные обновляются"
          text="Остатки подтягиваются из складской системы — подключение ещё идёт. Чтобы не гадать, менеджер пришлёт актуальный список позиций в ответ на сообщение."
          action={
            <ButtonLink
              href={whatsappLink("Здравствуйте! Пришлите актуальные остатки на базе")}
              size="lg"
            >
              Запросить остатки
            </ButtonLink>
          }
        />
      </div>
    </>
  );
}
