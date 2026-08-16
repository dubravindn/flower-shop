import type { Metadata } from "next";
import { PageHeader } from "@/components/layout/PageHeader";
import { Section, SectionHeading } from "@/components/ui/Section";
import { CARE } from "@/content/pages";

export const metadata: Metadata = {
  title: "Уход за цветами",
  description:
    "Как продлить жизнь букета: подрезка стеблей, смена воды, выбор места. Советы флористов Цветов Дубравиных.",
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

      <Section tone="white">
        <SectionHeading eyebrow="Пять шагов" title="Что сделать сразу" />
        <ol className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {CARE.steps.map((step, index) => (
            <li
              key={step.title}
              className="rounded-[var(--radius-card)] border border-text/15 p-6"
            >
              <span
                aria-hidden="true"
                className="mb-3 block font-display text-2xl text-gold-light"
              >
                {String(index + 1).padStart(2, "0")}
              </span>
              <h3 className="font-sans text-lg font-semibold">{step.title}</h3>
              <p className="mt-2 text-[0.9375rem] text-text-muted">{step.text}</p>
            </li>
          ))}
        </ol>
      </Section>

      <Section tone="ivory">
        <SectionHeading eyebrow="По видам" title="У разных цветов разные привычки" />
        <dl className="max-w-[70ch] divide-y divide-text/12 border-y border-text/12">
          {CARE.byFlower.map((item) => (
            <div key={item.title} className="py-5">
              <dt className="font-sans text-lg font-semibold">{item.title}</dt>
              <dd className="mt-2 text-text-muted">{item.text}</dd>
            </div>
          ))}
        </dl>
      </Section>
    </>
  );
}
