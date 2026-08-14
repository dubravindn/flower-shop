import Image from "next/image";
import Link from "next/link";
import { Section, SectionHeading } from "@/components/ui/Section";
import { CATEGORIES, OCCASIONS } from "@/content/catalog";

function ArrowIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      aria-hidden="true"
      className="size-5 shrink-0 transition-transform duration-200 group-hover:translate-x-1"
    >
      <path d="M5 12h13M13 6l6 6-6 6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

/** 6 крупных категорий. Карточки без белого фона — фото на всю плашку. */
export function Categories() {
  return (
    <Section tone="paper">
      <SectionHeading
        eyebrow="Каталог"
        title="Что можно заказать"
        text="Собираем букеты со своей базы — состав зависит от свежей поставки."
      />

      <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {CATEGORIES.map((category) => (
          <li key={category.slug}>
            <Link
              href={`/catalog/${category.slug}`}
              className="group relative flex aspect-3/2 flex-col justify-end overflow-hidden rounded-[var(--radius-card)] border border-graphite/12 p-5 text-champagne-paper"
            >
              <Image
                src={category.image}
                alt={category.imageAlt}
                fill
                sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                className="object-cover transition-transform duration-300 group-hover:scale-[1.02]"
              />

              {/* Затемнение снизу, чтобы текст читался на любом кадре */}
              <span
                aria-hidden="true"
                className="absolute inset-0 bg-gradient-to-t from-graphite/85 via-graphite/35 to-transparent"
              />

              <span className="relative flex items-end justify-between gap-3">
                <span>
                  <span className="block font-display text-2xl">{category.title}</span>
                  <span className="mt-1 block text-sm text-champagne-light">
                    {category.caption}
                  </span>
                </span>
                <ArrowIcon />
              </span>
            </Link>
          </li>
        ))}
      </ul>
    </Section>
  );
}

/** Подбор по поводу — компактная лента ссылок в каталог с фильтром. */
export function Occasions() {
  return (
    <Section tone="champagne">
      <SectionHeading
        eyebrow="Подобрать по поводу"
        title="Для какого случая букет"
        text="Выберите повод — покажем подходящие работы и подскажем состав."
      />

      <ul className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {OCCASIONS.map((occasion) => (
          <li key={occasion.slug}>
            <Link
              href={`/catalog?occasion=${occasion.slug}`}
              className="group flex min-h-16 items-center justify-between gap-4 rounded-[var(--radius-card)] border border-graphite/20 bg-champagne-paper px-5 py-4 transition-colors hover:border-red-brand"
            >
              <span className="font-display text-xl">{occasion.title}</span>
              <ArrowIcon />
            </Link>
          </li>
        ))}
      </ul>
    </Section>
  );
}
