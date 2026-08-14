import type { Metadata } from "next";
import { PageHeader } from "@/components/layout/PageHeader";
import { Section, SectionHeading } from "@/components/ui/Section";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/States";

export const metadata: Metadata = {
  title: "Напоминания о важных датах",
  description:
    "Сохраните день рождения, годовщину или другой повод — напомним заранее и предложим букеты под ваш бюджет. Цветочная База Дубравиных, Киров.",
  alternates: { canonical: "/reminders" },
};

const EVENT_TYPES = [
  "День рождения",
  "Годовщина",
  "8 Марта",
  "14 Февраля",
  "День матери",
  "День учителя",
  "Свадьба",
  "Профессиональный праздник",
  "Своя дата",
];

const BENEFITS = [
  { title: "Напомним заранее", text: "За 30, 7 или 2 дня — срок выбираете сами." },
  { title: "Предложим под бюджет", text: "Подберём варианты в той сумме, к которой вы привыкли." },
  { title: "Сохраним предпочтения", text: "Любимые цветы получателя и то, чего он не любит." },
  { title: "Повторим заказ", text: "Прошлый букет можно повторить за пару минут." },
];

/**
 * Страница напоминаний.
 *
 * Форма с сохранением в базу и amoCRM — этап P3: для неё нужен сервер,
 * согласия и хранилище персональных данных. На статическом хостинге
 * принимать телефоны нельзя, поэтому пока честно объясняем механику
 * и предлагаем оставить дату через мессенджер.
 */
export default function RemindersPage() {
  return (
    <>
      <PageHeader
        crumbs={[{ label: "Важные даты" }]}
        title="Не забывайте важные даты"
        text="Сервис напоминаний готовится. Скоро здесь можно будет сохранить дни рождения, годовщины и другие важные события."
        tone="champagne"
      >
        <div className="flex flex-wrap items-center gap-4">
          <Button size="lg" disabled>
            Сохранить дату
          </Button>
          <Badge>Скоро</Badge>
        </div>
      </PageHeader>

      <Section tone="paper">
        <SectionHeading eyebrow="Зачем это нужно" title="Что вы получите" />
        <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {BENEFITS.map((item) => (
            <li
              key={item.title}
              className="rounded-[var(--radius-card)] border border-graphite/15 p-6"
            >
              <h3 className="font-sans text-lg font-semibold">{item.title}</h3>
              <p className="mt-2 text-[0.9375rem] text-ink-muted">{item.text}</p>
            </li>
          ))}
        </ul>
      </Section>

      <Section tone="paper-deep">
        <SectionHeading
          eyebrow="Какие даты"
          title="Что можно сохранить"
          text="Напоминание приходит в удобный вам канал — WhatsApp, Telegram или SMS."
        />
        <ul className="flex flex-wrap gap-2">
          {EVENT_TYPES.map((type) => (
            <li
              key={type}
              className="inline-flex min-h-11 items-center rounded-[var(--radius-button)] border border-graphite/20 bg-paper px-4 text-sm"
            >
              {type}
            </li>
          ))}
        </ul>

        <div className="mt-10 max-w-[68ch] rounded-[var(--radius-card)] border border-graphite/15 bg-paper p-6">
          <h3 className="font-sans text-lg font-semibold">Как это работает сейчас</h3>
          <p className="mt-2 text-ink-muted">
            Форма появится вместе с защищённым хранилищем: хранить телефоны и
            даты можно только на сервере, с отдельным согласием на обработку
            данных и возможностью отписаться. Пока сервис не запущен, даты
            нигде не сохраняются и напоминания не отправляются.
          </p>
          <p className="mt-3 text-sm text-ink-muted">
            Отказаться от напоминаний можно в любой момент — достаточно написать
            «стоп» в ответ на сообщение. Условия — на странице{" "}
            <a
              href="/consent"
              className="text-burgundy underline underline-offset-4"
            >
              согласия на обработку данных
            </a>
            .
          </p>
        </div>
      </Section>
    </>
  );
}
