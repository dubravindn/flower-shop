import type { Metadata } from "next";
import { PageHeader } from "@/components/layout/PageHeader";
import { Section, SectionHeading } from "@/components/ui/Section";
import { CARE } from "@/content/pages";

export const metadata: Metadata = {
  title: "Уход за цветами",
  description:
    "Как продлить жизнь букета: подрезка стеблей, смена воды, выбор места. Советы флористов Цветочной Базы Дубравиных.",
  alternates: { canonical: "/care" },
};

export default function CarePage() {
  return (
    <>
      <PageHeader
        crumbs={[{ label: "Уход за цветами" }]}
        title="Как продлить жизнь букета"
        text={CARE.intro}
      />

      <Section tone="paper">
        <SectionHeading eyebrow="Пять шагов" title="Что сделать сразу" />
        <ol className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {CARE.steps.map((step, index) => (
            <li
              key={step.title}
              className="rounded-[var(--radius-card)] border border-graphite/15 p-6"
            >
              <span
                aria-hidden="true"
                className="mb-3 block font-display text-2xl text-champagne-foil"
              >
                {String(index + 1).padStart(2, "0")}
              </span>
              <h3 className="font-sans text-lg font-semibold">{step.title}</h3>
              <p className="mt-2 text-[0.9375rem] text-graphite-muted">{step.text}</p>
            </li>
          ))}
        </ol>
      </Section>

      <Section tone="paper-deep">
        <SectionHeading eyebrow="По видам" title="У разных цветов разные привычки" />
        <dl className="max-w-[70ch] divide-y divide-graphite/12 border-y border-graphite/12">
          {CARE.byFlower.map((item) => (
            <div key={item.title} className="py-5">
              <dt className="font-sans text-lg font-semibold">{item.title}</dt>
              <dd className="mt-2 text-graphite-muted">{item.text}</dd>
            </div>
          ))}
        </dl>
      </Section>
    </>
  );
}
