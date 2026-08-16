import type { Metadata } from "next";
import { PageHeader } from "@/components/layout/PageHeader";
import { Badge } from "@/components/ui/States";
import { COMPANY, SOCIALS, STORES, whatsappLink } from "@/config/company";

export const metadata: Metadata = {
  title: "Магазины и контакты",
  description:
    "Адреса и режим работы Цветов Дубравиных: база и магазин на Воровского, магазин на Ленина, магазин в Слободском. Телефон и WhatsApp.",
  alternates: { canonical: "/contacts" },
};

export default function ContactsPage() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "Florist",
    name: COMPANY.name,
    telephone: COMPANY.phone.display,
    location: STORES.map((store) => ({
      "@type": "Place",
      name: store.name,
      address: {
        "@type": "PostalAddress",
        addressLocality: store.city,
        streetAddress: store.address,
        addressCountry: "RU",
      },
      openingHours: store.hours,
    })),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />

      <PageHeader
        crumbs={[{ label: "Магазины" }]}
        title="Магазины и контакты"
        text="Четыре точки: оптовая база и три розничных магазина. Букет можно забрать самому или заказать доставку."
      >
        <div className="flex flex-wrap items-center gap-x-8 gap-y-3">
          <a
            href={COMPANY.phone.href}
            className="font-display text-3xl text-emerald underline-offset-4 hover:underline"
          >
            {COMPANY.phone.display}
          </a>
          <a
            href={whatsappLink()}
            target="_blank"
            rel="noopener noreferrer"
            className="font-semibold underline-offset-4 hover:underline"
          >
            Написать в WhatsApp
          </a>
        </div>
      </PageHeader>

      <div className="container-page py-12 md:py-16">
        <ul className="grid gap-4 sm:grid-cols-2">
          {STORES.map((store) => (
            <li
              key={store.id}
              className="flex flex-col rounded-[var(--radius-card)] border border-text/15 bg-ivory-light p-6"
            >
              <h2 className="text-2xl">{store.name}</h2>

              <address className="mt-2 space-y-1 not-italic">
                <span className="block text-text-muted">{store.addressFull}</span>
                <span className="block font-semibold">{store.hours}</span>
              </address>

              <div className="mt-3 flex flex-wrap gap-1.5">
                {store.features.map((feature) => (
                  <Badge key={feature}>{feature}</Badge>
                ))}
              </div>

              <div className="mt-5 flex flex-wrap gap-2 border-t border-text/12 pt-4">
                <a
                  href={store.routeUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex min-h-11 items-center rounded-[var(--radius-button)] border border-text/22 px-4 text-sm font-semibold transition-colors hover:border-emerald hover:text-emerald"
                >
                  Построить маршрут
                </a>
                <a
                  href={whatsappLink(`Здравствуйте! Вопрос по точке «${store.name}»`)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex min-h-11 items-center rounded-[var(--radius-button)] bg-emerald px-4 text-sm font-semibold text-ivory-light transition-colors hover:bg-emerald-dark"
                >
                  Написать
                </a>
              </div>
            </li>
          ))}
        </ul>

        <section className="mt-12">
          <h2 className="mb-4 text-2xl">Мы в соцсетях</h2>
          <ul className="flex flex-wrap gap-2">
            {SOCIALS.map((social) => (
              <li key={social.url}>
                <a
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex min-h-11 items-center rounded-[var(--radius-button)] border border-text/20 px-4 text-sm transition-colors hover:border-emerald hover:text-emerald"
                >
                  {social.label}
                </a>
              </li>
            ))}
          </ul>
        </section>
      </div>
    </>
  );
}
