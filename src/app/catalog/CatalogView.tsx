"use client";

import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { cn } from "@/lib/cn";
import { ProductCard } from "@/components/product/ProductCard";
import { EmptyState } from "@/components/ui/States";
import { CATEGORIES, OCCASIONS, PRODUCTS } from "@/content/catalog";

/**
 * Витрина каталога. Фильтры живут в адресе страницы, поэтому ссылку
 * с выбранным поводом можно скопировать и переслать.
 */
export function CatalogView({ category }: { category?: string }) {
  const params = useSearchParams();
  const occasion = params.get("occasion") ?? "";
  const activeCategory = category ?? params.get("category") ?? "";

  const products = PRODUCTS.filter((product) => {
    if (activeCategory && product.category !== activeCategory) return false;
    if (occasion && !product.occasions.includes(occasion as never)) return false;
    return true;
  });

  const chip = (active: boolean) =>
    cn(
      "inline-flex min-h-11 items-center rounded-[var(--radius-button)] border px-4 text-sm font-semibold transition-colors",
      active
        ? "border-burgundy bg-burgundy text-paper"
        : "border-graphite/20 text-graphite hover:border-burgundy hover:text-burgundy",
    );

  const withOccasion = (slug: string) =>
    slug ? `?occasion=${slug}` : "";

  return (
    <div className="container-page py-10 md:py-14">
      {/* Фильтр по категориям */}
      <div className="mb-4">
        <h2 className="mb-3 font-sans text-xs font-semibold tracking-[0.12em] text-ink-muted uppercase">
          Категория
        </h2>
        <div className="flex flex-wrap gap-2">
          <Link href={`/catalog${withOccasion(occasion)}`} className={chip(!activeCategory)}>
            Все
          </Link>
          {CATEGORIES.map((item) => (
            <Link
              key={item.slug}
              href={`/catalog/${item.slug}${withOccasion(occasion)}`}
              className={chip(activeCategory === item.slug)}
            >
              {item.title}
            </Link>
          ))}
        </div>
      </div>

      {/* Фильтр по поводу */}
      <div className="mb-8">
        <h2 className="mb-3 font-sans text-xs font-semibold tracking-[0.12em] text-ink-muted uppercase">
          Повод
        </h2>
        <div className="flex flex-wrap gap-2">
          <Link
            href={activeCategory ? `/catalog/${activeCategory}` : "/catalog"}
            className={chip(!occasion)}
          >
            Любой
          </Link>
          {OCCASIONS.map((item) => (
            <Link
              key={item.slug}
              href={`${activeCategory ? `/catalog/${activeCategory}` : "/catalog"}?occasion=${item.slug}`}
              className={chip(occasion === item.slug)}
            >
              {item.title}
            </Link>
          ))}
        </div>
      </div>

      <p className="mb-6 text-sm text-ink-muted">
        Показано работ: {products.length}
      </p>

      {products.length > 0 ? (
        <ul className="grid grid-cols-2 gap-4 lg:grid-cols-4">
          {products.map((product, index) => (
            <li key={product.slug}>
              <ProductCard product={product} priority={index < 4} />
            </li>
          ))}
        </ul>
      ) : (
        <EmptyState
          title="Под эти условия работ пока нет"
          text="Снимите один из фильтров или напишите флористу — подберём букет под повод и бюджет вручную."
        />
      )}
    </div>
  );
}
