import { Suspense } from "react";
import { ProductCard } from "@/components/product/ProductCard";
import { PRODUCTS } from "@/content/catalog";
import type { CategorySlug } from "@/types";
import { CatalogFilters } from "./CatalogFilters";

/**
 * Витрина каталога. Серверный компонент: карточки попадают в HTML сразу,
 * поэтому при открытии страницы не бывает ни пустого экрана, ни скелетонов.
 */
export function CatalogGrid({ category }: { category?: CategorySlug }) {
  const products = category
    ? PRODUCTS.filter((p) => p.category === category)
    : PRODUCTS;

  return (
    <div className="container-page py-10 md:py-14">
      {/* Фильтры зависят от адреса, поэтому клиентские и в Suspense.
          Пока они гидратируются, сетка товаров уже видна. */}
      <Suspense fallback={<div className="mb-8 h-28" />}>
        <CatalogFilters category={category} />
      </Suspense>

      <p className="mb-6 text-sm text-ink-muted">
        Показано работ: <span id="catalog-count">{products.length}</span>
      </p>

      <ul id="catalog-grid" className="grid grid-cols-2 gap-4 lg:grid-cols-4">
        {products.map((product, index) => (
          <li key={product.slug} data-occasions={product.occasions.join(" ")}>
            <ProductCard product={product} priority={index < 4} />
          </li>
        ))}
      </ul>

      {/* Показывается только если фильтр по поводу ничего не нашёл */}
      <div
        id="catalog-empty"
        hidden
        className="mt-6 border border-kraft/30 bg-champagne-light/50 px-6 py-12 text-center"
      >
        <p className="font-display text-2xl">Под эти условия работ пока нет</p>
        <p className="mx-auto mt-2 max-w-[46ch] text-ink-muted">
          Снимите фильтр по поводу или напишите флористу — подберём букет под
          повод и бюджет вручную.
        </p>
      </div>
    </div>
  );
}
