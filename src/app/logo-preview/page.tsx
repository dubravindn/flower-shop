import type { Metadata } from "next";
import { OakConceptCard } from "@/components/brand/OakShowcase";
import { OAK_PALETTE_LIST } from "@/config/oak-palette";

/**
 * Публичная страница выбора логотипа.
 *
 * Открывается по прямой ссылке, но закрыта от поисковиков и не попадает
 * ни в меню, ни в карту сайта: это рабочий материал для владельца.
 * Логотип на самом сайте отсюда не меняется — только после выбора.
 */
export const metadata: Metadata = {
  title: "Выбор логотипа",
  description: "Четыре концепции фамильного знака «Цветочная База Дубравиных».",
  robots: { index: false, follow: false },
};

export default function LogoPreviewPage() {
  return (
    <div className="container-page py-12 md:py-16">
      <header className="mb-10 max-w-[70ch]">
        <p className="eyebrow mb-4 text-kraft-dark">
          <span aria-hidden="true" className="inline-block h-px w-6 bg-gold" />
          Рабочий материал
        </p>

        <h1 className="text-[clamp(2rem,5vw,3rem)]">Фамильный дуб — выбор направления</h1>

        <p className="mt-4 text-[1.0625rem] leading-relaxed text-ink-muted">
          Четыре концепции знака для «Цветочной Базы Дубравиных». Смысловая
          связь — фамилия <strong>ДУБ</strong>равиных и взрослый дуб: корни,
          устойчивость, работа поколений. Аббревиатура «ЦБД» как главный знак
          больше не используется.
        </p>

        <p className="mt-3 text-[1.0625rem] leading-relaxed text-ink-muted">
          Каждая концепция показана в одинаковых условиях: шесть поверхностей,
          размеры от 16 до 128 px, три компоновки, фоновый дуб под названием
          и восемь носителей. Логотип на самом сайте пока не меняется.
        </p>
      </header>

      <section className="mb-10 border border-kraft/30 bg-paper p-5 md:p-7">
        <h2 className="text-xl">Палитра из референса</h2>
        <p className="mt-2 max-w-[64ch] text-[0.9375rem] text-ink-muted">
          Снята с присланного брендборда. Гамма темнее и холоднее нынешней
          палитры сайта — знак нарисован в ней, но перевод всего сайта
          на эту гамму отдельное решение.
        </p>
        <ul className="mt-5 grid gap-3 sm:grid-cols-3 lg:grid-cols-5">
          {OAK_PALETTE_LIST.map((c) => (
            <li key={c.name} className="border border-kraft/25">
              <span className="block h-12" style={{ background: c.hex }} />
              <span className="block p-2.5">
                <span className="block text-sm font-semibold">{c.name}</span>
                <span className="block text-xs text-ink-muted">{c.hex}</span>
                <span className="mt-0.5 block text-[11px] text-ink-muted">{c.role}</span>
              </span>
            </li>
          ))}
        </ul>
      </section>

      <div className="grid gap-6">
        <OakConceptCard concept="letter" />
        <OakConceptCard concept="family" />
        <OakConceptCard concept="brothers" />
        <OakConceptCard concept="typographic" />
      </div>

      <footer className="mt-12 border-t border-kraft/30 pt-6">
        <h2 className="text-xl">Что произойдёт после выбора</h2>
        <ul className="mt-3 max-w-[64ch] list-disc space-y-2 pl-5 text-ink-muted">
          <li>Выбранный знак дорисуем: пропорции кроны, толщина ствола, рисунок корней.</li>
          <li>Соберём горизонтальную, вертикальную, компактную и фоновую компоновки.</li>
          <li>Пересоберём favicon, иконки PWA, аватар и Open Graph.</li>
          <li>Подготовим макеты упаковки, бирок, вывески и фургона.</li>
          <li>Заменим знак в шапке и подвале сайта.</li>
        </ul>
      </footer>
    </div>
  );
}
