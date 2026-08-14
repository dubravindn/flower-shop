import Link from "next/link";
import { cn } from "@/lib/cn";
import { COMPANY } from "@/config/company";

/**
 * Логотип.
 *
 * Пока фирменный SVG не передан, используется текстовый lockup:
 * монограмма «ЦБД» кириллицей + полное название. Круглой рамки нет —
 * это прямо запрещено в ТЗ.
 *
 * Как заменить на готовый знак: положить файл в `public/brand/logo.svg`
 * и заменить содержимое `Monogram` на <Image src="/brand/logo.svg" …>.
 * Разметка и размеры контейнера менять не придётся.
 */

export function Monogram({
  className,
  tone = "red",
}: {
  className?: string;
  tone?: "red" | "light";
}) {
  return (
    <span
      aria-hidden="true"
      className={cn(
        "grid aspect-square place-items-center font-display leading-none",
        "border",
        tone === "red"
          ? "border-champagne-foil/70 bg-red-brand text-champagne-light"
          : "border-champagne-foil/60 bg-transparent text-champagne-light",
        className,
      )}
    >
      <span className="translate-y-[0.04em] tracking-[0.06em]">
        {COMPANY.monogram}
      </span>
    </span>
  );
}

export function Logo({
  variant = "full",
  tone = "red",
  className,
}: {
  /** full — монограмма и название, mark — только монограмма */
  variant?: "full" | "mark";
  tone?: "red" | "light";
  className?: string;
}) {
  return (
    <Link
      href="/"
      aria-label={`${COMPANY.name} — на главную`}
      className={cn("inline-flex items-center gap-3", className)}
    >
      <Monogram className="size-10 text-lg" tone={tone} />

      {variant === "full" && (
        <span className="hidden leading-tight sm:block">
          <span
            className={cn(
              "block font-display text-[1.0625rem] tracking-tight",
              tone === "red" ? "text-graphite" : "text-champagne-paper",
            )}
          >
            Цветочная База
          </span>
          <span
            className={cn(
              "block font-display text-[1.0625rem] tracking-tight",
              tone === "red" ? "text-red-brand" : "text-champagne-light",
            )}
          >
            Дубравиных
          </span>
        </span>
      )}
    </Link>
  );
}
