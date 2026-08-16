import { Section, SectionHeading } from "@/components/ui/Section";
import { Badge } from "@/components/ui/States";
import { COMPANY, STORES, whatsappLink } from "@/config/company";

/** Карточки точек: адрес, режим, маршрут и связь. */
export function Stores() {
  return (
    <Section tone="ivory" id="stores">
      <SectionHeading
        eyebrow="Магазины"
        title="Куда приехать за букетом"
        text="Три розничные точки и оптовая база. Букет можно забрать самому или заказать доставку."
      />

      <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {STORES.map((store) => (
          <li
            key={store.id}
            className="flex flex-col rounded-[var(--radius-card)] border border-text/15 bg-ivory-light p-5"
          >
            {/* Фотографий фасадов компания не передавала — вместо них
                фирменная плашка с типом точки, а не чужой снимок. */}
            <div className="texture-warm mb-4 flex aspect-3/2 items-end rounded-[var(--radius-card)] bg-gold/35 p-4">
              <span className="font-display text-2xl text-emerald-dark">
                {store.kind === "base" ? "База" : "Магазин"}
              </span>
            </div>

            <h3 className="text-xl">{store.name}</h3>

            <address className="mt-2 space-y-0.5 text-[0.9375rem] not-italic text-text-muted">
              <span className="block">
                {store.city}, {store.address}
              </span>
              <span className="block font-semibold text-text">{store.hours}</span>
            </address>

            <div className="mt-3 flex flex-wrap gap-1.5">
              {store.features.map((feature) => (
                <Badge key={feature}>{feature}</Badge>
              ))}
            </div>

            <div className="mt-5 flex flex-col gap-2 border-t border-text/12 pt-4">
              <a
                href={store.routeUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex min-h-11 items-center justify-center rounded-[var(--radius-button)] border border-text/22 px-4 text-sm font-semibold transition-colors hover:border-emerald hover:text-emerald"
              >
                Построить маршрут
              </a>
              <a
                href={whatsappLink(
                  `Здравствуйте! Вопрос по точке «${store.name}» (${store.addressFull})`,
                )}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex min-h-11 items-center justify-center rounded-[var(--radius-button)] bg-emerald px-4 text-sm font-semibold text-ivory-light transition-colors hover:bg-emerald-dark"
              >
                Написать
              </a>
            </div>
          </li>
        ))}
      </ul>

      <p className="mt-6 text-sm text-text-muted">
        Единый телефон:{" "}
        <a href={COMPANY.phone.href} className="font-semibold text-text underline-offset-4 hover:underline">
          {COMPANY.phone.display}
        </a>
      </p>
    </Section>
  );
}
