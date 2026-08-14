import Link from "next/link";
import { whatsappLink } from "@/config/company";

/**
 * Компактная нижняя панель для телефонов: каталог, магазины, связь.
 * На десктопе скрыта. Все цели не меньше 44×44 px.
 */
export function MobileActionBar() {
  const items = [
    { href: "/catalog", label: "Каталог", icon: "catalog" as const },
    { href: "/contacts", label: "Магазины", icon: "shop" as const },
    { href: whatsappLink(), label: "Написать", icon: "chat" as const, external: true },
  ];

  return (
    <nav
      aria-label="Быстрые действия"
      className="fixed inset-x-0 bottom-0 z-40 border-t border-graphite/15 bg-champagne-paper/97 pb-[env(safe-area-inset-bottom)] backdrop-blur md:hidden"
    >
      <ul className="grid grid-cols-3">
        {items.map((item) => (
          <li key={item.label}>
            <Link
              href={item.href}
              target={item.external ? "_blank" : undefined}
              rel={item.external ? "noopener noreferrer" : undefined}
              className="flex min-h-14 flex-col items-center justify-center gap-1 text-[0.6875rem] font-semibold text-graphite transition-colors hover:text-red-brand"
            >
              <Icon name={item.icon} />
              {item.label}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}

function Icon({ name }: { name: "catalog" | "shop" | "chat" }) {
  const common = {
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: 1.7,
    className: "size-5",
    "aria-hidden": true,
  } as const;

  if (name === "catalog") {
    return (
      <svg {...common}>
        <path d="M4 5h7v7H4zM13 5h7v7h-7zM4 14h7v5H4zM13 14h7v5h-7z" />
      </svg>
    );
  }

  if (name === "shop") {
    return (
      <svg {...common}>
        <path d="M4 9h16v10H4zM4 9l1.5-4h13L20 9" />
        <path d="M10 19v-5h4v5" />
      </svg>
    );
  }

  return (
    <svg {...common}>
      <path d="M20 12a8 8 0 1 1-3.4-6.5" />
      <path d="M4 20l1.2-3.4" strokeLinecap="round" />
    </svg>
  );
}
