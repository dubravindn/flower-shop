import { notFound } from "next/navigation";
import { Button, ButtonLink } from "@/components/ui/Button";
import { Input, Select, Textarea } from "@/components/ui/Field";
import {
  Badge,
  EmptyState,
  ErrorState,
  ProductCardSkeleton,
} from "@/components/ui/States";
import { Logo } from "@/components/brand/Logo";
import { ConceptCard } from "@/components/brand/ConceptShowcase";
import { ProductCard } from "@/components/product/ProductCard";
import { PRODUCTS } from "@/content/catalog";
import { MISSING } from "@/config/company";
import { PENDING_CLAIMS } from "@/config/claims";

/**
 * Витрина дизайн-системы. Доступна только в development:
 * в production страница отдаёт 404 и не попадает ни в sitemap, ни в меню.
 */
export const metadata = {
  title: "Дизайн-система",
  robots: { index: false, follow: false },
};

const PALETTE = [
  { name: "burgundy", hex: "#741C2C", note: "Акцент. Не более 7–10% площади" },
  { name: "burgundy-dark", hex: "#53121E", note: "Наведение и нажатие" },
  { name: "burgundy-light", hex: "#96364A", note: "Светлый акцент" },
  { name: "champagne-light", hex: "#E4D5BF", note: "Основная светлая поверхность" },
  { name: "champagne", hex: "#D1B891", note: "Плотная шампань" },
  { name: "paper", hex: "#F2E9DB", note: "Тёплая бумага, фон страниц" },
  { name: "kraft", hex: "#A98257", note: "Натуральный крафт, ~25%" },
  { name: "kraft-dark", hex: "#765737", note: "Тёмный крафт, подвал" },
  { name: "gold", hex: "#B6924E", note: "Линии и мелкие детали, до 3%" },
  { name: "gold-light", hex: "#CCAD6C", note: "Знак на бургунди" },
  { name: "graphite", hex: "#292321", note: "Тёмные детали" },
  { name: "ink", hex: "#332A26", note: "Основной текст" },
];

const PROPORTIONS = [
  { label: "Шампань и бумага", share: 45, color: "#E4D5BF" },
  { label: "Крафт", share: 25, color: "#A98257" },
  { label: "Фотографии", share: 20, color: "#6B5A50" },
  { label: "Бургунди", share: 7, color: "#741C2C" },
  { label: "Золото", share: 3, color: "#B6924E" },
];

function Block({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="border-t border-kraft/30 py-10">
      <h2 className="mb-6 font-sans text-xs font-semibold tracking-[0.14em] text-burgundy uppercase">
        {title}
      </h2>
      {children}
    </section>
  );
}

export default function BrandPreviewPage() {
  if (process.env.NODE_ENV === "production") notFound();

  return (
    <div className="container-page py-12">
      <header className="mb-10">
        <h1 className="text-[clamp(2rem,5vw,3rem)]">Дизайн-система</h1>
        <p className="mt-3 max-w-[64ch] text-ink-muted">
          Страница доступна только в режиме разработки. В production она отдаёт
          404 и не попадает в карту сайта и навигацию.
        </p>
      </header>

      <Block title="Монограмма ЦБД — выбор направления">
        <p className="mb-6 max-w-[68ch] text-[0.9375rem] text-ink-muted">
          Три равноправные концепции с одинаковой метрикой: высота прописной 68,
          толщина штриха 16, выносные элементы 20. Ни одна буква не взята из
          шрифта. Сейчас на сайте временно стоит вариант A — окончательный выбор
          за владельцем.
        </p>
        <div className="grid gap-6">
          <ConceptCard concept="plastic" />
          <ConceptCard concept="architect" />
          <ConceptCard concept="ribbon" />
          <ConceptCard concept="monolith" />
        </div>
      </Block>

      <Block title="Логотип в интерфейсе">
        <div className="flex flex-wrap items-center gap-10">
          <Logo asLink={false} />
          <Logo variant="vertical" asLink={false} />
          <Logo variant="mark" asLink={false} />
          <div className="bg-kraft-dark p-5">
            <Logo tone="light" asLink={false} />
          </div>
        </div>
        <p className="mt-4 max-w-[64ch] text-sm text-ink-muted">
          Круглой окантовки нет. Монограмма нигде не заменяет полное название:
          аббревиатура используется отдельно только там, где название физически
          не помещается — favicon, аватар, печать, мелкая наклейка.
        </p>
      </Block>

      <Block title="Палитра">
        <ul className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {PALETTE.map((color) => (
            <li key={color.name} className="border border-kraft/25">
              <span className="block h-14" style={{ background: color.hex }} />
              <span className="block p-3">
                <span className="block font-semibold">{color.name}</span>
                <span className="block text-sm text-ink-muted">{color.hex}</span>
                <span className="mt-1 block text-xs text-ink-muted">{color.note}</span>
              </span>
            </li>
          ))}
        </ul>

        <h3 className="mt-8 mb-3 text-lg">Пропорции на странице</h3>
        <div className="flex h-10 w-full overflow-hidden">
          {PROPORTIONS.map((p) => (
            <div
              key={p.label}
              style={{ background: p.color, width: `${p.share}%` }}
              title={`${p.label} — ${p.share}%`}
            />
          ))}
        </div>
        <ul className="mt-3 flex flex-wrap gap-x-6 gap-y-1 text-sm text-ink-muted">
          {PROPORTIONS.map((p) => (
            <li key={p.label}>
              <span
                aria-hidden="true"
                className="mr-2 inline-block size-2.5 align-middle"
                style={{ background: p.color }}
              />
              {p.label} — {p.share}%
            </li>
          ))}
        </ul>
      </Block>

      <Block title="Крафтовая фактура">
        <div className="grid gap-3 sm:grid-cols-3">
          <div className="texture-kraft flex h-28 items-center justify-center bg-paper text-sm">
            paper
          </div>
          <div className="texture-kraft flex h-28 items-center justify-center bg-champagne-light text-sm">
            champagne-light
          </div>
          <div className="texture-kraft flex h-28 items-center justify-center bg-kraft text-sm text-ink-light">
            kraft
          </div>
        </div>
      </Block>

      <Block title="Типографика">
        <div className="space-y-4">
          <p className="font-display text-5xl">Prata — только H1 и ключевые H2</p>
          <p className="font-display text-3xl">Цветы, за качество которых отвечаем лично</p>
          <p className="max-w-[62ch]">
            Manrope — интерфейс, карточки, цены и технические данные:
            2 900 ₽, 25 шт., 6:00 – 00:00.
          </p>
          <p className="text-sm text-ink-muted">Второстепенный текст</p>
        </div>
      </Block>

      <Block title="Кнопки и состояния">
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
        <div className="flex flex-wrap items-center gap-3 bg-burgundy p-5 on-dark">
          <ButtonLink href="#" onRed>
            На бургунди
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

      <Block title="Карточка товара, метки и состояния">
        <div className="mb-6 flex flex-wrap gap-2">
          <Badge kind="hit" />
          <Badge kind="new" />
          <Badge kind="today" />
          <Badge>Скоро</Badge>
        </div>
        <div className="grid gap-6 lg:grid-cols-2">
          <div className="grid grid-cols-2 gap-4">
            <ProductCard product={PRODUCTS[0]} />
            <ProductCardSkeleton />
          </div>
          <div className="space-y-4">
            <EmptyState title="Ничего не найдено" text="Попробуйте изменить фильтры." />
            <ErrorState />
          </div>
        </div>
      </Block>

      <Block title="Данные и условия, которых ещё нет">
        <h3 className="mb-2 text-lg">Ждут подтверждения владельца</h3>
        <ul className="mb-6 space-y-2 text-sm">
          {PENDING_CLAIMS.map((claim) => (
            <li key={claim.key} className="flex flex-wrap gap-2">
              <span className="font-semibold">{claim.text}</span>
              <span className="text-ink-muted">— {claim.note}</span>
            </li>
          ))}
        </ul>

        <h3 className="mb-2 text-lg">Отсутствующие данные</h3>
        <ul className="space-y-2 text-sm">
          {MISSING.map((item) => (
            <li key={item.field} className="flex flex-wrap gap-2">
              <span className="font-semibold">{item.field}</span>
              <code className="bg-kraft/15 px-1 text-ink-muted">{item.where}</code>
            </li>
          ))}
        </ul>
      </Block>
    </div>
  );
}
