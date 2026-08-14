import Link from "next/link";
import { cn } from "@/lib/cn";
import { COMPANY } from "@/config/company";
import { Monogram, MonogramMicro } from "@/components/brand/Monogram";

export { Monogram, MonogramMicro };

/**
 * Три официальные компоновки логотипа.
 *
 * horizontal — монограмма слева, полное название справа в две строки.
 *              Основная версия: шапка, вывеска, документы, фургон.
 * vertical   — монограмма сверху, название под ней. Упаковка и соцсети.
 * mark       — только монограмма. Favicon, аватар, печать, мелкие элементы.
 *
 * Монограмма нигде не заменяет полное название: сокращать «Цветочная База
 * Дубравиных» до «ЦБД» в интерфейсе нельзя.
 */
export function Logo({
  variant = "horizontal",
  tone = "ink",
  className,
  asLink = true,
}: {
  variant?: "horizontal" | "vertical" | "mark";
  /** ink — тёмный текст на светлом, light — светлый на тёмном */
  tone?: "ink" | "light";
  className?: string;
  asLink?: boolean;
}) {
  const nameColor = tone === "light" ? "text-ink-light" : "text-ink";
  const markColor = tone === "light" ? "text-gold-light" : "text-burgundy";

  const inner = (
    <>
      <Monogram
        concept="architect"
        title=""
        className={cn(
          markColor,
          variant === "vertical" ? "h-10 w-auto" : "h-7 w-auto sm:h-8",
        )}
      />

      {variant !== "mark" && (
        <span
          className={cn(
            "font-display leading-[1.15] tracking-tight",
            nameColor,
            variant === "vertical"
              ? "mt-3 text-center text-lg"
              : "text-[0.9375rem] sm:text-base",
          )}
        >
          Цветочная База
          <br />
          Дубравиных
        </span>
      )}
    </>
  );

  const layout = cn(
    "inline-flex",
    variant === "vertical" ? "flex-col items-center" : "items-center gap-3",
    className,
  );

  if (!asLink) {
    return (
      <span className={layout} aria-label={COMPANY.name}>
        {inner}
      </span>
    );
  }

  return (
    <Link href="/" aria-label={`${COMPANY.name} — на главную`} className={layout}>
      {inner}
    </Link>
  );
}
