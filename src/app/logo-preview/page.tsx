import type { Metadata } from "next";
import {
  Oak,
  OakMicro,
  OakCbdMark,
  OakCompact,
  OakLogo,
  OakLogoStacked,
  OakWordmark,
  OakLockupWatermark,
} from "@/components/brand/OakLogo";
import { OAK_PALETTE as C, OAK_PALETTE_LIST } from "@/config/oak-palette";

/**
 * Публичная страница выбора логотипа.
 * Закрыта от поисковиков, вне sitemap и меню. Логотип на самом сайте
 * отсюда не меняется — только после выбора владельца.
 */
export const metadata: Metadata = {
  title: "Выбор логотипа",
  description: "Фирменная система «Цветы Дубравиных»: дуб, фамилия и знак ЦБД.",
  robots: { index: false, follow: false },
};

/** Тон = три цвета: текст, золото, дерево. */
const TONE_LIGHT = { ink: C.museumBlack, gold: C.gold, oak: C.oakWood };
const TONE_DARK = { ink: C.parchment, gold: C.goldLight, oak: C.goldLight };
const TONE_MONO_DARK = { ink: C.museumBlack, gold: C.museumBlack, oak: C.museumBlack };

const SURFACES = [
  { label: "Parchment", bg: C.parchment, tone: TONE_LIGHT },
  { label: "Бургунди сайта", bg: "#741C2C", tone: TONE_DARK },
  { label: "Шампань", bg: "#E4D5BF", tone: { ink: C.imperialPlum, gold: C.gold, oak: C.oakWood } },
  { label: "Крафт", bg: C.oakWood, tone: { ink: C.parchment, gold: C.goldLight, oak: C.parchment } },
  { label: "Museum Black", bg: C.museumBlack, tone: TONE_DARK },
  { label: "Один цвет", bg: "#FFFFFF", tone: TONE_MONO_DARK },
  { label: "Тиснение золотом", bg: "#1A1512", tone: { ink: C.gold, gold: C.goldLight, oak: C.gold } },
];

function Block({ title, note, children }: { title: string; note?: string; children: React.ReactNode }) {
  return (
    <section className="border-t border-gold/30 py-9">
      <h2 className="font-sans text-xs font-semibold tracking-[0.14em] text-emerald uppercase">
        {title}
      </h2>
      {note && <p className="mt-2 max-w-[68ch] text-[0.9375rem] text-text-muted">{note}</p>}
      <div className="mt-6">{children}</div>
    </section>
  );
}

function Panel({
  bg,
  children,
  className = "",
}: {
  bg: string;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div
      className={`flex items-center justify-center p-6 ${className}`}
      style={{ background: bg }}
    >
      {children}
    </div>
  );
}

export default function LogoPreviewPage() {
  return (
    <div className="container-page py-12 md:py-16">
      <header className="mb-10 max-w-[70ch]">
        <p className="eyebrow mb-4 text-emerald-dark">
          <span aria-hidden="true" className="inline-block h-px w-6 bg-gold" />
          Рабочий материал
        </p>
        <h1 className="text-[clamp(2rem,5vw,3rem)]">Фирменная система: дуб и фамилия</h1>
        <p className="mt-4 text-[1.0625rem] leading-relaxed text-text-muted">
          Главный элемент — фамилия <strong>ДУБ</strong>равиных. Дуб работает
          знаком и фоновой гравюрой, «ЦБД» осталась, но как подпись бренда:
          она нигде не крупнее фамилии и не спорит с ней.
        </p>
        <p className="mt-3 text-[1.0625rem] leading-relaxed text-text-muted">
          Логотип на самом сайте пока не заменён — там работает прежний знак.
        </p>
      </header>

      <Block
        title="Главный логотип"
        note="«Цветочная база» — строка прописными с разрядкой, «ДУБРАВИНЫХ» — главный элемент, «ДУБ» выделено матовым золотом. Никаких подчёркиваний: выделение работает только цветом."
      >
        <Panel bg={C.parchment} className="py-14">
          <OakLockupWatermark tone={TONE_LIGHT} />
        </Panel>
      </Block>

      <Block title="Горизонтальная и вертикальная компоновки">
        <div className="grid gap-4 lg:grid-cols-2">
          <Panel bg={C.parchment} className="py-12">
            <OakLogo tone={TONE_LIGHT} size="lg" />
          </Panel>
          <Panel bg={C.parchment} className="py-12">
            <OakLogoStacked tone={TONE_LIGHT} size="md" />
          </Panel>
        </div>
      </Block>

      <Block
        title="Wordmark и вторичный знак ЦБД"
        note="Монограмма связана снизу линией-корнем и всегда мельче фамилии. Работает подписью под названием, печатью, маркировкой на обороте упаковки."
      >
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <Panel bg={C.parchment} className="py-10">
            <OakWordmark tone={TONE_LIGHT} size="md" />
          </Panel>
          <Panel bg={C.parchment} className="py-10">
            <OakCbdMark style={{ height: 34, width: "auto", color: C.gold }} />
          </Panel>
          <Panel bg={C.museumBlack} className="py-10">
            <OakCbdMark style={{ height: 34, width: "auto", color: C.goldLight }} />
          </Panel>
          <Panel bg={C.parchment} className="py-10">
            <OakCompact tone={TONE_LIGHT} height={92} />
          </Panel>
        </div>
      </Block>

      <Block
        title="Поверхности"
        note="Знак обязан держаться на всех фонах, включая одноцветную печать и золотое тиснение."
      >
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {SURFACES.map((s) => (
            <div key={s.label}>
              <Panel bg={s.bg} className="h-32">
                <OakLogo tone={s.tone} size="sm" />
              </Panel>
              <p className="mt-1.5 text-xs text-text-muted">{s.label}</p>
            </div>
          ))}
        </div>
      </Block>

      <Block
        title="Размеры"
        note="До 24 px работает упрощённый силуэт дуба: одновременно показывать дерево и три буквы в этих размерах невозможно. Компактный знак «дуб + ЦБД» включается с 32–48 px."
      >
        <div
          className="flex flex-wrap items-end gap-8 p-6"
          style={{ background: C.parchment }}
        >
          {[16, 24].map((s) => (
            <div key={s} className="text-center">
              <div className="flex h-32 items-end justify-center">
                <OakMicro style={{ height: s, width: "auto", color: C.museumBlack }} />
              </div>
              <p className="mt-1 text-[11px] text-text-muted">{s} px · micro</p>
            </div>
          ))}
          {[32, 48].map((s) => (
            <div key={s} className="text-center">
              <div className="flex h-32 items-end justify-center">
                <OakCompact tone={TONE_LIGHT} height={s} />
              </div>
              <p className="mt-1 text-[11px] text-text-muted">{s} px · compact</p>
            </div>
          ))}
          <div className="text-center">
            <div className="flex h-32 items-end justify-center">
              <Oak style={{ height: 128, width: "auto", color: C.museumBlack }} />
            </div>
            <p className="mt-1 text-[11px] text-text-muted">128 px</p>
          </div>
        </div>
      </Block>

      <Block title="Носители">
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-5">
          <Carrier label="Крафтовая коробка" bg={C.oakWood}>
            <OakLogo tone={{ ink: C.parchment, gold: C.goldLight, oak: C.parchment }} size="sm" />
          </Carrier>
          <Carrier label="Лента букета" bg="#E4D5BF">
            <div
              className="flex h-10 w-full items-center justify-center gap-3"
              style={{ background: C.imperialPlum }}
            >
              <OakMicro style={{ height: 22, width: "auto", color: C.goldLight }} />
              <span className="font-display text-[11px]" style={{ color: C.parchment }}>
                ДУБРАВИНЫХ
              </span>
            </div>
          </Carrier>
          <Carrier label="Бирка" bg="#E4D5BF">
            <div
              className="flex h-full w-3/5 flex-col items-center justify-center gap-2 border"
              style={{ background: C.parchment, borderColor: "#00000022" }}
            >
              <OakCompact tone={TONE_LIGHT} height={54} />
            </div>
          </Carrier>
          <Carrier label="Пакет" bg={C.oakWood}>
            <OakLogoStacked
              tone={{ ink: C.parchment, gold: C.goldLight, oak: C.parchment }}
              size="sm"
            />
          </Carrier>
          <Carrier label="Вывеска" bg={C.museumBlack}>
            <OakLogo tone={TONE_DARK} size="sm" />
          </Carrier>
          <Carrier label="Аватар" bg="#E4D5BF">
            <div
              className="flex size-24 items-center justify-center"
              style={{ background: C.museumBlack }}
            >
              <OakCompact tone={{ ink: C.goldLight, gold: C.goldLight, oak: C.goldLight }} height={62} />
            </div>
          </Carrier>
          <Carrier label="Favicon 16 px" bg="#E4D5BF">
            <div
              className="flex size-10 items-center justify-center"
              style={{ background: C.museumBlack }}
            >
              <OakMicro style={{ height: 16, width: "auto", color: C.goldLight }} />
            </div>
          </Carrier>
          <Carrier label="Печать" bg={C.parchment}>
            <OakCompact tone={{ ink: C.deepCarmine, gold: C.deepCarmine, oak: C.deepCarmine }} height={64} />
          </Carrier>
          <Carrier label="Борт фургона" bg={C.parchment}>
            <OakLogo tone={TONE_LIGHT} size="sm" />
          </Carrier>
          <Carrier label="Водяной знак на документе" bg="#FFFFFF">
            <OakLockupWatermark tone={{ ink: C.museumBlack, gold: C.gold, oak: C.oxidizedSilver }} />
          </Carrier>
        </div>
      </Block>

      <Block title="Палитра из референса">
        <ul className="grid gap-3 sm:grid-cols-3 lg:grid-cols-5">
          {OAK_PALETTE_LIST.map((c) => (
            <li key={c.name} className="border border-gold/25">
              <span className="block h-12" style={{ background: c.hex }} />
              <span className="block p-2.5">
                <span className="block text-sm font-semibold">{c.name}</span>
                <span className="block text-xs text-text-muted">{c.hex}</span>
                <span className="mt-0.5 block text-[11px] text-text-muted">{c.role}</span>
              </span>
            </li>
          ))}
        </ul>
      </Block>

      <footer className="border-t border-gold/30 pt-6">
        <h2 className="text-xl">Что заменим после утверждения</h2>
        <ul className="mt-3 max-w-[64ch] list-disc space-y-2 pl-5 text-text-muted">
          <li>Знак в шапке и подвале сайта.</li>
          <li>favicon 16/32/48, Apple Touch Icon, иконки PWA и maskable.</li>
          <li>Аватар 1080×1080 и обложку Open Graph.</li>
          <li>Макеты упаковки, бирок, вывески и фургона.</li>
        </ul>
      </footer>
    </div>
  );
}

function Carrier({
  label,
  bg,
  children,
}: {
  label: string;
  bg: string;
  children: React.ReactNode;
}) {
  return (
    <figure className="m-0">
      <div
        className="flex aspect-4/3 items-center justify-center p-4"
        style={{ background: bg }}
      >
        {children}
      </div>
      <figcaption className="mt-1.5 text-xs text-text-muted">{label}</figcaption>
    </figure>
  );
}
