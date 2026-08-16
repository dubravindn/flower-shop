import type { Metadata } from "next";
import { PageHeader } from "@/components/layout/PageHeader";
import { FoundersSection } from "@/components/brand/FoundersSection";
import { ButtonLink } from "@/components/ui/Button";
import { Section, SectionHeading } from "@/components/ui/Section";
import { FOUNDERS_CONTENT } from "@/config/founders";
import { COMPANY, whatsappLink } from "@/config/company";

export const metadata: Metadata = {
  title: "Цветы оптом в Кирове",
  description:
    "Цветы Дубравиных — оптовые поставки цветов магазинам и флористам Кирова и области. Еженедельные поставки, отправка на север и в Сыктывкар.",
  alternates: { canonical: "/wholesale" },
};

const STEPS = [
  { title: "Заявка", text: "Пишете нам объём, позиции и периодичность закупки." },
  { title: "Подбор", text: "Менеджер собирает ассортимент под ваш магазин и присылает список." },
  { title: "Согласование", text: "Подтверждаете позиции и количество, фиксируем условия." },
  { title: "Отгрузка", text: "Забираете на базе или отправляем транспортной компанией." },
];

const FAQ = [
  {
    q: "С кем вы работаете?",
    a: "С цветочными магазинами, частными флористами, оформителями и корпоративными закупщиками.",
  },
  {
    q: "Куда отправляете?",
    a: "По Кирову и области, на север региона и в Сыктывкар. Способ отправки согласуем при заказе.",
  },
  {
    q: "Как часто приходят поставки?",
    a: "Свежая срезка приходит на базу партиями в течение недели. Актуальный список менеджер присылает перед отгрузкой.",
  },
  {
    q: "Есть ли минимальная сумма заказа?",
    a: "Условия зависят от позиций и периодичности — обсуждаются индивидуально с менеджером.",
  },
];

export default function WholesalePage() {
  const founders = FOUNDERS_CONTENT.wholesale;

  return (
    <>
      <PageHeader
        crumbs={[{ label: "Оптовым клиентам" }]}
        title="Цветы для цветочного бизнеса"
        text="Поставляем срезку магазинам, флористам и оформителям со своей базы на Воровского. Приёмка, хранение и отгрузка — под нашим контролем."
        tone="ivory"
      >
        <div className="flex flex-col gap-3 sm:flex-row">
          <ButtonLink href="/wholesale/catalog" size="lg">
            Смотреть остатки
          </ButtonLink>
          <ButtonLink
            href={whatsappLink("Здравствуйте! Интересует оптовый прайс")}
            size="lg"
            variant="outline"
          >
            Получить прайс
          </ButtonLink>
        </div>
      </PageHeader>

      <FoundersSection
        eyebrow={founders.eyebrow}
        title={founders.title}
        text={founders.text}
        ratio={founders.ratio}
        alt={founders.alt}
        tone="white"
        imageSide="left"
        priority
      />

      <Section tone="ivory" id="price">
        <SectionHeading eyebrow="Как это работает" title="Четыре шага до поставки" />
        <ol className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {STEPS.map((step, index) => (
            <li
              key={step.title}
              className="rounded-[var(--radius-card)] border border-text/15 bg-ivory-light p-6"
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

        <div className="mt-10 rounded-[var(--radius-card)] border border-text/15 bg-ivory-light p-6 md:p-8">
          <h2 className="text-[clamp(1.375rem,3vw,1.875rem)]">Оставить заявку</h2>
          <p className="mt-3 max-w-[58ch] text-text-muted">
            Напишите менеджеру объём закупки, интересующие позиции и город — пришлём
            актуальный прайс и условия отгрузки. Приём заявок формой на сайте появится
            вместе с личным кабинетом оптового клиента.
          </p>
          <div className="mt-6 flex flex-col gap-3 sm:flex-row">
            <ButtonLink
              href={whatsappLink(
                "Здравствуйте! Оптовая заявка. Город: . Объём: . Позиции: ",
              )}
              size="lg"
            >
              Написать менеджеру
            </ButtonLink>
            <ButtonLink href={COMPANY.phone.href} size="lg" variant="outline">
              {COMPANY.phone.display}
            </ButtonLink>
          </div>
        </div>
      </Section>

      <Section tone="white">
        <SectionHeading eyebrow="Вопросы" title="Частые вопросы оптовых клиентов" />
        <dl className="max-w-[70ch] divide-y divide-text/12 border-y border-text/12">
          {FAQ.map((item) => (
            <div key={item.q} className="py-5">
              <dt className="font-sans text-lg font-semibold">{item.q}</dt>
              <dd className="mt-2 text-text-muted">{item.a}</dd>
            </div>
          ))}
        </dl>
      </Section>
    </>
  );
}
