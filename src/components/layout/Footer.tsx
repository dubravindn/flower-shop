import Link from "next/link";
import { COMPANY, SOCIALS, STORES, whatsappLink } from "@/config/company";
import { FOOTER_NAV } from "@/config/navigation";
import { Logo } from "@/components/brand/Logo";

const SOCIAL_GROUPS = [
  { title: "Розница", audience: "retail" as const },
  { title: "Опт", audience: "wholesale" as const },
  { title: "Все каналы", audience: "both" as const },
];

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="texture-kraft bg-kraft-dark text-ink-light on-dark">
      <div className="container-page py-14 md:py-20">
        <div className="grid gap-12 lg:grid-cols-[1.1fr_2fr]">
          {/* Бренд и контакты */}
          <div>
            <Logo variant="horizontal" tone="light" />

            <a
              href={COMPANY.phone.href}
              className="mt-6 block font-display text-3xl text-champagne-light underline-offset-4 hover:underline"
            >
              {COMPANY.phone.display}
            </a>

            <Link
              href={whatsappLink()}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-2 inline-block text-ink-light/80 underline-offset-4 hover:underline"
            >
              Написать в WhatsApp
            </Link>

            <div className="rule-gold mt-8 mb-6" />

            <p className="text-sm text-ink-light/70">
              {COMPANY.delivery.city}. Оптовая отправка:{" "}
              {COMPANY.delivery.regions.join(", ")}.
            </p>
          </div>

          {/* Навигация */}
          <div className="grid gap-10 sm:grid-cols-3">
            {FOOTER_NAV.map((group) => (
              <nav key={group.title} aria-label={group.title}>
                <h2 className="mb-4 font-sans text-xs font-semibold tracking-[0.12em] text-gold-light uppercase">
                  {group.title}
                </h2>
                <ul className="space-y-2.5 text-[0.9375rem]">
                  {group.items.map((item) => (
                    <li key={item.href + item.label}>
                      <Link
                        href={item.href}
                        className="text-ink-light/80 underline-offset-4 transition-colors hover:text-champagne-light hover:underline"
                      >
                        {item.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </nav>
            ))}
          </div>
        </div>

        {/* Адреса */}
        <div className="rule-gold my-12" />

        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {STORES.map((store) => (
            <div key={store.id}>
              <p className="font-semibold">{store.name}</p>
              <p className="mt-1 text-sm text-ink-light/70">
                {store.city}, {store.address}
              </p>
              <p className="text-sm text-champagne-light">{store.hours}</p>
            </div>
          ))}
        </div>

        {/* Соцсети */}
        <div className="rule-gold my-12" />

        <div className="grid gap-8 sm:grid-cols-3">
          {SOCIAL_GROUPS.map((group) => {
            const items = SOCIALS.filter((s) => s.audience === group.audience);
            if (items.length === 0) return null;

            return (
              <div key={group.audience}>
                <h2 className="mb-3 font-sans text-xs font-semibold tracking-[0.12em] text-gold-light uppercase">
                  {group.title}
                </h2>
                <ul className="flex flex-wrap gap-2">
                  {items.map((social) => (
                    <li key={social.url}>
                      <a
                        href={social.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex min-h-9 items-center rounded-[var(--radius-button)] border border-ink-light/25 px-3 text-sm text-ink-light/85 transition-colors hover:border-gold-light hover:text-champagne-light"
                      >
                        {social.label}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            );
          })}
        </div>

        <div className="rule-gold my-10" />

        <div className="flex flex-col gap-3 text-sm text-ink-light/60 md:flex-row md:items-center md:justify-between">
          <p>
            © {year} {COMPANY.name}
          </p>
          <p className="max-w-[60ch]">
            Не является публичной офертой. Состав и стоимость букета подтверждает
            флорист при оформлении заказа.
          </p>
        </div>
      </div>
    </footer>
  );
}
