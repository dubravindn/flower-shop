import Link from "next/link";
import { cn } from "@/lib/cn";
import { COMPANY } from "@/config/company";

/**
 * Логотип «Цветы Дубравиных».
 *
 * Основное название набирается антиквой, дескриптор «Цветочная база» —
 * мелкой строкой с разрядкой. Латинское «CBD» не используется нигде:
 * аббревиатура даёт неверные ассоциации.
 *
 * Знак — тонкая золотая рамка с инициалом: до утверждения фирменного
 * дуба она держит место и не спорит с названием.
 */

export function LogoMark({
  className,
  tone = "emerald",
}: {
  className?: string;
  tone?: "emerald" | "light";
}) {
  return (
    <span
      aria-hidden="true"
      className={cn(
        "grid aspect-square place-items-center rounded-[10px] border font-display leading-none",
        tone === "light"
          ? "border-gold-light/60 bg-transparent text-gold-light"
          : "border-gold/60 bg-emerald text-gold-light",
        className,
      )}
    >
      <span className="translate-y-[0.03em]">Д</span>
    </span>
  );
}

export function Logo({
  variant = "horizontal",
  tone = "emerald",
  className,
  asLink = true,
}: {
  variant?: "horizontal" | "vertical" | "mark";
  tone?: "emerald" | "light";
  className?: string;
  asLink?: boolean;
}) {
  const nameColor = tone === "light" ? "text-ivory-light" : "text-emerald";
  const descriptorColor = tone === "light" ? "text-gold-light" : "text-gold-dark";

  const inner = (
    <>
      <LogoMark tone={tone} className="size-10 text-lg" />

      {variant !== "mark" && (
        <span className={cn(variant === "vertical" ? "mt-2 text-center" : "")}>
          <span
            className={cn(
              "block font-sans text-[0.5625rem] tracking-[0.22em] uppercase",
              descriptorColor,
            )}
          >
            {COMPANY.descriptor}
          </span>
          <span
            className={cn(
              "block font-display text-[1.0625rem] leading-tight tracking-tight sm:text-lg",
              nameColor,
            )}
          >
            {COMPANY.name}
          </span>
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
