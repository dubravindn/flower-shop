"use client";

import { useState } from "react";
import Link from "next/link";
import { cn } from "@/lib/cn";
import { ProductCard } from "@/components/product/ProductCard";
import { SectionHeading } from "@/components/ui/Section";
import { EmptyState } from "@/components/ui/States";
import { PRODUCTS } from "@/content/catalog";
import type { Product } from "@/types";

type TabId = "popular" | "new" | "budget";

const TABS: { id: TabId; label: string }[] = [
  { id: "popular", label: "Популярное" },
  { id: "new", label: "Новинки" },
  { id: "budget", label: "До 5 000 ₽" },
];

function filterProducts(tab: TabId): Product[] {
  switch (tab) {
    case "popular":
      return PRODUCTS.filter((p) => p.badges.includes("hit"));
    case "new":
      return PRODUCTS.filter((p) => p.badges.includes("new"));
    case "budget":
      // Пока цены не заданы, фильтр по бюджету честно ничего не находит.
      return PRODUCTS.filter((p) =>
        p.variants.some((v) => v.price !== null && v.price <= 5000),
      );
  }
}

/**
 * Популярные товары с переключателем подборок.
 * Единственный клиентский компонент на главной, кроме шапки и формы.
 */
export function PopularProducts() {
  const [tab, setTab] = useState<TabId>("popular");
  const products = filterProducts(tab);

  return (
    <section className="bg-ivory-light py-[var(--spacing-section)] text-text md:py-[var(--spacing-section-lg)]">
      <div className="container-page">
        <div className="mb-8 flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <SectionHeading
            eyebrow="Витрина"
            title="Собранные букеты"
            text="Работы наших флористов. Повторим состав с поправкой на свежую поставку."
            className="mb-0"
          />

          <Link
            href="/catalog"
            className="shrink-0 font-semibold text-emerald underline-offset-4 hover:underline"
          >
            Весь каталог →
          </Link>
        </div>

        {/* Переключатель подборок */}
        <div role="tablist" aria-label="Подборки товаров" className="mb-6 flex flex-wrap gap-2">
          {TABS.map((item) => (
            <button
              key={item.id}
              type="button"
              role="tab"
              aria-selected={tab === item.id}
              onClick={() => setTab(item.id)}
              className={cn(
                "min-h-11 rounded-[var(--radius-button)] border px-4 text-sm font-semibold transition-colors",
                tab === item.id
                  ? "border-emerald bg-emerald text-ivory-light"
                  : "border-text/20 text-text hover:border-emerald hover:text-emerald",
              )}
            >
              {item.label}
            </button>
          ))}
        </div>

        {products.length > 0 ? (
          <ul className="grid grid-cols-2 gap-4 lg:grid-cols-4">
            {products.map((product, index) => (
              <li key={product.slug}>
                <ProductCard product={product} priority={index < 2} />
              </li>
            ))}
          </ul>
        ) : (
          <EmptyState
            title="В этой подборке пока пусто"
            text="Цены загружаются в каталог — как только они появятся, подборка по бюджету заработает. Сейчас стоимость подскажет флорист в переписке."
          />
        )}
      </div>
    </section>
  );
}
