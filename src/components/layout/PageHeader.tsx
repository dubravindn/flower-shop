import Link from "next/link";
import { cn } from "@/lib/cn";

export interface Crumb {
  label: string;
  href?: string;
}

/**
 * Шапка внутренней страницы: хлебные крошки, H1 и вводный текст.
 * Один H1 на страницу — он задаётся здесь.
 */
export function PageHeader({
  crumbs = [],
  title,
  text,
  tone = "paper",
  children,
}: {
  crumbs?: Crumb[];
  title: string;
  text?: string;
  tone?: "paper" | "champagne";
  children?: React.ReactNode;
}) {
  return (
    <header
      className={cn(
        "border-b border-graphite/12 py-10 md:py-14",
        tone === "champagne" ? "bg-champagne" : "bg-champagne-light",
      )}
    >
      <div className="container-page">
        {crumbs.length > 0 && (
          <nav aria-label="Хлебные крошки" className="mb-5">
            <ol className="flex flex-wrap items-center gap-x-2 gap-y-1 text-sm text-ink-muted">
              <li>
                <Link href="/" className="underline-offset-4 hover:text-burgundy hover:underline">
                  Главная
                </Link>
              </li>
              {crumbs.map((crumb) => (
                <li key={crumb.label} className="flex items-center gap-2">
                  <span aria-hidden="true" className="text-gold-light">
                    /
                  </span>
                  {crumb.href ? (
                    <Link
                      href={crumb.href}
                      className="underline-offset-4 hover:text-burgundy hover:underline"
                    >
                      {crumb.label}
                    </Link>
                  ) : (
                    <span aria-current="page" className="text-graphite">
                      {crumb.label}
                    </span>
                  )}
                </li>
              ))}
            </ol>
          </nav>
        )}

        <h1 className="max-w-[20ch] text-[clamp(2rem,5.5vw,3.5rem)]">{title}</h1>

        {text && (
          <p className="mt-4 max-w-[62ch] text-[1.0625rem] leading-relaxed text-ink-muted">
            {text}
          </p>
        )}

        {children && <div className="mt-6">{children}</div>}
      </div>
    </header>
  );
}

/** Простая текстовая секция для информационных и юридических страниц. */
export function Prose({ children }: { children: React.ReactNode }) {
  return (
    <div className="container-page py-12 md:py-16">
      <div
        className={cn(
          "max-w-[68ch] space-y-5 text-[1.0625rem] leading-relaxed",
          "[&_h2]:mt-10 [&_h2]:text-[clamp(1.375rem,3vw,1.875rem)]",
          "[&_h3]:mt-8 [&_h3]:font-sans [&_h3]:text-lg [&_h3]:font-semibold",
          "[&_ul]:list-disc [&_ul]:space-y-2 [&_ul]:pl-5",
          "[&_ol]:list-decimal [&_ol]:space-y-2 [&_ol]:pl-5",
          "[&_a]:text-burgundy [&_a]:underline [&_a]:underline-offset-4",
        )}
      >
        {children}
      </div>
    </div>
  );
}
