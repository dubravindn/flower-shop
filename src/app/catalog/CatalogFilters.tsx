"use client";

import { useEffect } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { cn } from "@/lib/cn";
import { CATEGORIES, OCCASIONS } from "@/content/catalog";

/**
 * Фильтры каталога.
 *
 * Карточки товаров рендерит сервер — они есть в HTML сразу, без скелетонов
 * и без прыжка вёрстки. Клиент отвечает только за состояние фильтров:
 * читает повод из адреса и прячет неподходящие карточки по data-атрибуту.
 * Так фотографии не перезагружаются при переключении.
 */
export function CatalogFilters({ category }: { category?: string }) {
  const params = useSearchParams();
  const occasion = params.get("occasion") ?? "";

  useEffect(() => {
    const grid = document.getElementById("catalog-grid");
    if (!grid) return;

    let shown = 0;
    for (const item of Array.from(grid.children) as HTMLElement[]) {
      const list = (item.dataset.occasions ?? "").split(" ");
      const match = !occasion || list.includes(occasion);
      item.hidden = !match;
      if (match) shown += 1;
    }

    const counter = document.getElementById("catalog-count");
    if (counter) counter.textContent = String(shown);

    const empty = document.getElementById("catalog-empty");
    if (empty) empty.hidden = shown > 0;
  }, [occasion]);

  const chip = (active: boolean) =>
    cn(
      "inline-flex min-h-11 items-center rounded-[var(--radius-button)] border px-4 text-sm font-semibold transition-colors",
      active
        ? "border-burgundy bg-burgundy text-ink-light"
        : "border-kraft/40 text-ink hover:border-burgundy hover:text-burgundy",
    );

  const base = category ? `/catalog/${category}` : "/catalog";
  const withOccasion = occasion ? `?occasion=${occasion}` : "";

  return (
    <>
      <div className="mb-4">
        <h2 className="mb-3 font-sans text-xs font-semibold tracking-[0.12em] text-ink-muted uppercase">
          Категория
        </h2>
        <div className="flex flex-wrap gap-2">
          <Link href={`/catalog${withOccasion}`} className={chip(!category)}>
            Все
          </Link>
          {CATEGORIES.map((item) => (
            <Link
              key={item.slug}
              href={`/catalog/${item.slug}${withOccasion}`}
              className={chip(category === item.slug)}
            >
              {item.title}
            </Link>
          ))}
        </div>
      </div>

      <div className="mb-8">
        <h2 className="mb-3 font-sans text-xs font-semibold tracking-[0.12em] text-ink-muted uppercase">
          Повод
        </h2>
        <div className="flex flex-wrap gap-2">
          <Link href={base} className={chip(!occasion)}>
            Любой
          </Link>
          {OCCASIONS.map((item) => (
            <Link
              key={item.slug}
              href={`${base}?occasion=${item.slug}`}
              className={chip(occasion === item.slug)}
            >
              {item.title}
            </Link>
          ))}
        </div>
      </div>
    </>
  );
}
