import type { Metadata } from "next";
import { ConceptCard } from "@/components/brand/ConceptShowcase";
import { Logo } from "@/components/brand/Logo";

/**
 * Публичная страница выбора логотипа.
 *
 * Открывается по прямой ссылке, но закрыта от поисковиков и не попадает
 * ни в меню, ни в карту сайта: это рабочий материал для владельца,
 * а не часть сайта для клиентов.
 */
export const metadata: Metadata = {
  title: "Выбор логотипа",
  description: "Сравнение концепций монограммы «ЦБД».",
  robots: { index: false, follow: false },
};

export default function LogoPreviewPage() {
  return (
    <div className="container-page py-12 md:py-16">
      <header className="mb-10 max-w-[68ch]">
        <p className="eyebrow mb-4 text-kraft-dark">
          <span aria-hidden="true" className="inline-block h-px w-6 bg-gold" />
          Рабочий материал
        </p>

        <h1 className="text-[clamp(2rem,5vw,3rem)]">Монограмма «ЦБД» — выбор направления</h1>

        <p className="mt-4 text-[1.0625rem] leading-relaxed text-ink-muted">
          Четыре концепции с одинаковой метрикой: высота прописной 68, толщина
          штриха 14–16, выносные элементы 20. Ни одна буква не взята из шрифта —
          все контуры нарисованы под этот бренд.
        </p>

        <p className="mt-3 text-[1.0625rem] leading-relaxed text-ink-muted">
          Сейчас на сайте временно стоит вариант A. Он читается, но выглядит
          технично. Вариант D сделан мягче и ближе к премиальной подписи бренда —
          на мой взгляд, он сильнее для упаковки и вывески. Решение за вами.
        </p>

        <div className="mt-8 border border-kraft/30 bg-paper p-5">
          <p className="mb-3 text-sm font-semibold">Как знак стоит в шапке сейчас</p>
          <Logo asLink={false} />
        </div>
      </header>

      <div className="grid gap-6">
        <ConceptCard concept="plastic" />
        <ConceptCard concept="architect" />
        <ConceptCard concept="ribbon" />
        <ConceptCard concept="monolith" />
      </div>

      <footer className="mt-12 border-t border-kraft/30 pt-6">
        <h2 className="text-xl">Что произойдёт после выбора</h2>
        <ul className="mt-3 max-w-[62ch] list-disc space-y-2 pl-5 text-ink-muted">
          <li>Выбранный знак дорисуем: оптическое выравнивание, интервалы, толщины.</li>
          <li>Пересоберём favicon, иконки PWA, аватар и Open Graph — они собираются скриптом из того же файла.</li>
          <li>Подготовим макеты для упаковки, бирок, вывески и фургона.</li>
          <li>Остальные концепции останутся в репозитории на случай возврата.</li>
        </ul>
      </footer>
    </div>
  );
}
