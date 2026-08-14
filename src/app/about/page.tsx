import type { Metadata } from "next";
import { PageHeader } from "@/components/layout/PageHeader";
import { FoundersSection } from "@/components/brand/FoundersSection";
import { Section, SectionHeading } from "@/components/ui/Section";
import { FOUNDERS_CONTENT } from "@/config/founders";
import { COMPANY, STORES } from "@/config/company";
import { ADVANTAGES } from "@/content/home";

export const metadata: Metadata = {
  title: "О компании",
  description:
    "Цветочная База Дубравиных — семейная цветочная компания в Кирове: своя оптово-розничная база, три магазина и доставка. Авторские букеты, доставка за 2 часа.",
  alternates: { canonical: "/about" },
};

export default function AboutPage() {
  const founders = FOUNDERS_CONTENT.about;

  return (
    <>
      <PageHeader
        crumbs={[{ label: "О компании" }]}
        title="Семейная цветочная компания в Кирове"
        text="Своя оптово-розничная база, три магазина и собственная доставка. Цепочка от поставки до вручения проходит через наши руки."
      />

      <FoundersSection
        eyebrow={founders.eyebrow}
        title={founders.title}
        text={founders.text}
        cta={founders.cta}
        ratio={founders.ratio}
        alt={founders.alt}
        tone="paper"
      />

      <Section tone="paper-deep">
        <SectionHeading
          eyebrow="Как устроено дело"
          title="Что стоит за букетом"
        />
        <ul className="grid gap-px overflow-hidden rounded-[var(--radius-card)] border border-graphite/15 bg-graphite/15 sm:grid-cols-2 lg:grid-cols-3">
          {ADVANTAGES.map((item) => (
            <li key={item.title} className="bg-champagne-paper p-6">
              <h3 className="font-sans text-lg font-semibold">{item.title}</h3>
              <p className="mt-2 text-[0.9375rem] text-graphite-muted">{item.text}</p>
            </li>
          ))}
        </ul>
      </Section>

      <Section tone="paper">
        <SectionHeading eyebrow="География" title="Где нас можно найти" />
        <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {STORES.map((store) => (
            <li
              key={store.id}
              className="rounded-[var(--radius-card)] border border-graphite/15 p-5"
            >
              <h3 className="font-sans text-lg font-semibold">{store.name}</h3>
              <p className="mt-1 text-[0.9375rem] text-graphite-muted">
                {store.city}, {store.address}
              </p>
              <p className="text-[0.9375rem] font-semibold">{store.hours}</p>
            </li>
          ))}
        </ul>
        <p className="mt-6 max-w-[62ch] text-graphite-muted">
          Оптовые заказы отправляем по Кировской области, на север региона и в
          Сыктывкар. Розничная доставка работает по {COMPANY.city}у.
        </p>
      </Section>
    </>
  );
}
