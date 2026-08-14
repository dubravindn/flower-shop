import type { Metadata } from "next";
import { PageHeader } from "@/components/layout/PageHeader";
import { Section, SectionHeading } from "@/components/ui/Section";
import { ButtonLink } from "@/components/ui/Button";
import { CORPORATE } from "@/content/pages";
import { COMPANY, whatsappLink } from "@/config/company";

export const metadata: Metadata = {
  title: "Корпоративным клиентам",
  description:
    "Цветы для компаний в Кирове: букеты сотрудникам и партнёрам, оформление офисов и мероприятий, регулярные поставки. Цветочная База Дубравиных.",
  alternates: { canonical: "/corporate" },
};

export default function CorporatePage() {
  return (
    <>
      <PageHeader
        crumbs={[{ label: "Корпоративным клиентам" }]}
        title="Цветы для компаний"
        text={CORPORATE.intro}
        tone="champagne"
      >
        <ButtonLink
          href={whatsappLink(
            "Здравствуйте! Корпоративный запрос. Компания: . Задача: . Дата: . Бюджет: ",
          )}
          size="lg"
        >
          Рассчитать оформление
        </ButtonLink>
      </PageHeader>

      <Section tone="paper">
        <SectionHeading eyebrow="Задачи" title="С чем к нам приходят" />
        <ul className="grid gap-4 sm:grid-cols-2">
          {CORPORATE.services.map((service) => (
            <li
              key={service.title}
              className="rounded-[var(--radius-card)] border border-graphite/15 p-6"
            >
              <h3 className="font-sans text-lg font-semibold">{service.title}</h3>
              <p className="mt-2 text-ink-muted">{service.text}</p>
            </li>
          ))}
        </ul>
      </Section>

      <Section tone="paper-deep">
        <SectionHeading
          eyebrow="Запрос расчёта"
          title="Что прислать для сметы"
          text="Чем точнее вводные, тем быстрее ответим стоимостью и сроками."
        />
        <ul className="max-w-[62ch] list-disc space-y-2 pl-5 text-[1.0625rem]">
          <li>Название компании и контактное лицо</li>
          <li>Тип задачи: букеты, оформление, регулярная поставка</li>
          <li>Дата или график</li>
          <li>Количество и ориентировочный бюджет</li>
          <li>Референсы, если есть пожелания по стилю</li>
        </ul>

        <div className="mt-8 flex flex-col gap-3 sm:flex-row">
          <ButtonLink
            href={whatsappLink(
              "Здравствуйте! Корпоративный запрос. Компания: . Задача: . Дата: . Бюджет: ",
            )}
            size="lg"
          >
            Отправить запрос
          </ButtonLink>
          <ButtonLink href={COMPANY.phone.href} size="lg" variant="outline">
            {COMPANY.phone.display}
          </ButtonLink>
        </div>

        <p className="mt-4 text-sm text-ink-muted">
          Форма с загрузкой референсов появится вместе с серверным приёмом заявок.
        </p>
      </Section>
    </>
  );
}
