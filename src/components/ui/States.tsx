import type { ReactNode } from "react";
import { cn } from "@/lib/cn";
import type { ProductBadge } from "@/types";

/* ------------------------------------------------------------------ Badge */

const BADGE_LABELS: Record<ProductBadge, string> = {
  hit: "Хит",
  new: "Новинка",
  today: "Сегодня",
};

const BADGE_TONES: Record<ProductBadge, string> = {
  hit: "bg-burgundy text-paper",
  new: "bg-gold-light text-graphite",
  today: "bg-graphite text-paper",
};

export function Badge({
  kind,
  children,
  className,
}: {
  kind?: ProductBadge;
  children?: ReactNode;
  className?: string;
}) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-[3px] px-2 py-1",
        "text-[0.6875rem] font-semibold uppercase tracking-[0.1em]",
        kind ? BADGE_TONES[kind] : "bg-champagne text-graphite",
        className,
      )}
    >
      {children ?? (kind ? BADGE_LABELS[kind] : null)}
    </span>
  );
}

/* --------------------------------------------------------------- Skeleton */

export function Skeleton({ className }: { className?: string }) {
  return (
    <span
      aria-hidden="true"
      className={cn(
        "block animate-pulse rounded-[var(--radius-card)] bg-graphite/10",
        className,
      )}
    />
  );
}

/** Скелет карточки товара — для состояний загрузки каталога. */
export function ProductCardSkeleton() {
  return (
    <div className="flex flex-col gap-3">
      <Skeleton className="aspect-4/5 w-full" />
      <Skeleton className="h-5 w-3/4" />
      <Skeleton className="h-4 w-full" />
      <Skeleton className="h-9 w-1/2" />
    </div>
  );
}

/* ------------------------------------------------------- Empty / Error */

function StateShell({
  title,
  text,
  action,
  tone,
}: {
  title: string;
  text?: string;
  action?: ReactNode;
  tone: "neutral" | "error";
}) {
  return (
    <div
      role={tone === "error" ? "alert" : undefined}
      className={cn(
        "flex flex-col items-center gap-3 rounded-[var(--radius-card)] px-6 py-12 text-center",
        tone === "error"
          ? "border border-burgundy/30 bg-burgundy/5"
          : "border border-graphite/12 bg-champagne-light/60",
      )}
    >
      <p className="font-display text-2xl">{title}</p>
      {text && <p className="max-w-[46ch] text-ink-muted">{text}</p>}
      {action && <div className="mt-2">{action}</div>}
    </div>
  );
}

export function EmptyState(props: {
  title: string;
  text?: string;
  action?: ReactNode;
}) {
  return <StateShell {...props} tone="neutral" />;
}

export function ErrorState({
  title = "Не удалось загрузить данные",
  text = "Попробуйте обновить страницу или напишите нам — поможем вручную.",
  action,
}: {
  title?: string;
  text?: string;
  action?: ReactNode;
}) {
  return <StateShell title={title} text={text} action={action} tone="error" />;
}
