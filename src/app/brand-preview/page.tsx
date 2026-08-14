import { notFound } from "next/navigation";
import Image from "next/image";
import { Button, ButtonLink } from "@/components/ui/Button";
import { Input, Select, Textarea } from "@/components/ui/Field";
import {
  Badge,
  EmptyState,
  ErrorState,
  ProductCardSkeleton,
  Skeleton,
} from "@/components/ui/States";
import { Logo, Monogram } from "@/components/brand/Logo";
import { ProductCard } from "@/components/product/ProductCard";
import { PRODUCTS } from "@/content/catalog";
import { MISSING } from "@/config/company";
import { founderImage } from "@/config/founders";

/**
 * Витрина дизайн-системы. Доступна только в development:
 * в production страница отдаёт 404 и не попадает ни в sitemap, ни в меню.
 */
export const metadata = {
  title: "Дизайн-система",
  robots: { index: false, follow: false },
};

const PALETTE = [
  { name: "red-brand", hex: "#B10F24", note: "Основной. 55–60% площади" },
  { name: "red-hover", hex: "#970B1C", note: "Наведение" },
  { name: "red-dark", hex: "#7D0917", note: "Нажатие" },
  { name: "champagne", hex: "#B89B72", note: "Тёплый шампань" },
  { name: "champagne-light", hex: "#D4BE9D", note: "Светлый шампань" },
  { name: "champagne-surface", hex: "#C8AF8B", note: "Поверхности" },
  { name: "champagne-foil", hex: "#C9AA6A", note: "Металл. Только линии и мелочи" },
  { name: "champagne-paper", hex: "#F6EFE4", note: "Фон вместо белого" },
  { name: "graphite", hex: "#241D1D", note: "Текст. До 10%" },
  { name: "graphite-muted", hex: "#4B4140", note: "Второстепенный текст" },
];

function Block({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="border-t border-graphite/15 py-10">
      <h2 className="mb-6 font-sans text-xs font-semibold tracking-[0.14em] text-red-brand uppercase">
        {title}
      </h2>
      {children}
    </section>
  );
}

export default function BrandPreviewPage() {
  if (process.env.NODE_ENV === "production") notFound();

  const founder = founderImage("1x1", "Владельцы компании");

  return (
    <div className="container-page py-12">
      <header className="mb-10">
        <h1 className="text-[clamp(2rem,5vw,3rem)]">Дизайн-система</h1>
        <p className="mt-3 max-w-[60ch] text-graphite-muted">
          Страница доступна только в режиме разработки. В production она отдаёт
          404 и не попадает в карту сайта и навигацию.
        </p>
      </header>

      <Block title="Логотип">
        <div className="flex flex-wrap items-center gap-10">
          <Logo />
          <Logo variant="mark" />
          <div className="bg-graphite p-5">
            <Logo tone="light" />
          </div>
          <Monogram className="size-16 text-2xl" />
        </div>
        <p className="mt-4 text-sm text-graphite-muted">
          Круглой рамки нет. Монограмма — кириллица «ЦБД». Полное название всегда
          пишется как «Цветочная База Дубравиных».
        </p>
      </Block>

      <Block title="Палитра">
        <ul className="grid gap-3 sm:grid-cols-2 lg:grid-cols-5">
          {PALETTE.map((color) => (
            <li key={color.name} className="overflow-hidden rounded-[var(--radius-card)] border border-graphite/15">
              <span className="block h-16" style={{ background: color.hex }} />
              <span className="block p-3">
                <span className="block font-semibold">{color.name}</span>
                <span className="block text-sm text-graphite-muted">{color.hex}</span>
                <span className="mt-1 block text-xs text-graphite-muted">{color.note}</span>
              </span>
            </li>
          ))}
        </ul>
      </Block>

      <Block title="Типографика">
        <div className="space-y-4">
          <p className="font-display text-5xl">Prata — заголовки</p>
          <p className="font-display text-3xl">Свежие цветы. Каждый день.</p>
          <p className="max-w-[60ch] text-base">
            Manrope — интерфейс и основной текст. Цены и технические данные
            набираются им же: 2 900 ₽, 25 шт., 6:00 – 00:00.
          </p>
          <p className="text-sm text-graphite-muted">Второстепенный текст</p>
        </div>
      </Block>

      <Block title="Кнопки">
        <div className="mb-6 flex flex-wrap items-center gap-3">
          <Button variant="primary">Основная</Button>
          <Button variant="secondary">Вторая</Button>
          <Button variant="outline">Контурная</Button>
          <Button variant="text">Текстовая</Button>
          <Button variant="primary" disabled>
            Недоступна
          </Button>
          <Button variant="primary" loading>
            Загрузка
          </Button>
        </div>

        <div className="flex flex-wrap items-center gap-3 bg-red-brand p-5 on-red">
          <ButtonLink href="#" onRed>
            На красном
          </ButtonLink>
          <ButtonLink href="#" variant="outline" onRed>
            Контурная
          </ButtonLink>
        </div>
      </Block>

      <Block title="Поля формы">
        <div className="grid max-w-3xl gap-4 sm:grid-cols-2">
          <Input label="Имя" placeholder="Как к вам обращаться" />
          <Input label="Телефон" type="tel" required hint="Для связи по заказу" />
          <Select label="Повод">
            <option>День рождения</option>
            <option>Свидание</option>
          </Select>
          <Input label="Дата" type="date" error="Выберите дату не раньше сегодняшней" />
          <Textarea label="Комментарий" className="sm:col-span-2" />
        </div>
      </Block>

      <Block title="Бейджи">
        <div className="flex flex-wrap gap-2">
          <Badge kind="hit" />
          <Badge kind="new" />
          <Badge kind="today" />
          <Badge>Опт</Badge>
        </div>
      </Block>

      <Block title="Карточка товара">
        <div className="grid max-w-3xl grid-cols-2 gap-4">
          <ProductCard product={PRODUCTS[0]} />
          <ProductCard product={PRODUCTS[1]} />
        </div>
      </Block>

      <Block title="Состояния">
        <div className="grid gap-6 lg:grid-cols-2">
          <div className="grid grid-cols-2 gap-4">
            <ProductCardSkeleton />
            <div className="space-y-3">
              <Skeleton className="h-6 w-2/3" />
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-4/5" />
            </div>
          </div>
          <div className="space-y-4">
            <EmptyState title="Ничего не найдено" text="Попробуйте изменить фильтры." />
            <ErrorState />
          </div>
        </div>
      </Block>

      <Block title="Образ владельцев">
        <div className="flex flex-wrap items-start gap-6">
          <Image
            src={founder.src}
            alt={founder.alt}
            width={220}
            height={220}
            className="rounded-[var(--radius-card)] border border-champagne-foil/40"
          />
          <p className="max-w-[46ch] text-sm text-graphite-muted">
            Пока показываются фирменные заглушки. Готовые кадры кладутся в
            <code className="mx-1 bg-graphite/8 px-1">public/images/founders</code>
            под именами founders-16x9, founders-4x5, founders-3x2, founders-1x1 и
            founders-og, после чего в
            <code className="mx-1 bg-graphite/8 px-1">src/config/founders.ts</code>
            ставится <code>useRealPhotos: true</code>.
          </p>
        </div>
      </Block>

      <Block title="Данные, которых ещё нет">
        <ul className="space-y-2 text-sm">
          {MISSING.map((item) => (
            <li key={item.field} className="flex flex-wrap gap-2">
              <span className="font-semibold">{item.field}</span>
              <code className="bg-graphite/8 px-1 text-graphite-muted">{item.where}</code>
            </li>
          ))}
        </ul>
      </Block>
    </div>
  );
}
