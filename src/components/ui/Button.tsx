import Link from "next/link";
import type { ComponentProps, ReactNode } from "react";
import { cn } from "@/lib/cn";

export type ButtonVariant = "primary" | "secondary" | "outline" | "text";
export type ButtonSize = "md" | "lg";

interface BaseProps {
  variant?: ButtonVariant;
  size?: ButtonSize;
  /** Растянуть на всю ширину контейнера */
  block?: boolean;
  /** Кнопка стоит на красном фоне — меняются цвета вариантов */
  onRed?: boolean;
  loading?: boolean;
  children: ReactNode;
  className?: string;
}

/* Высота 44px и больше — требование к тач-целям. */
const SIZES: Record<ButtonSize, string> = {
  md: "min-h-11 px-5 text-[0.9375rem]",
  lg: "min-h-13 px-7 text-base",
};

const VARIANTS: Record<ButtonVariant, string> = {
  primary:
    "bg-red-brand text-champagne-paper hover:bg-red-hover active:bg-red-dark",
  secondary:
    "bg-champagne text-graphite hover:bg-champagne-light active:bg-champagne-surface",
  outline:
    "border border-graphite/25 text-graphite hover:border-red-brand hover:text-red-brand",
  text: "text-red-brand underline-offset-4 hover:underline px-0",
};

/** Те же варианты, но на красной подложке. */
const VARIANTS_ON_RED: Record<ButtonVariant, string> = {
  primary:
    "bg-champagne-paper text-red-dark hover:bg-champagne-light active:bg-champagne-surface",
  secondary:
    "bg-champagne-foil text-graphite hover:bg-champagne-light active:bg-champagne",
  outline:
    "border border-champagne-light/50 text-champagne-paper hover:border-champagne-foil hover:text-champagne-light",
  text: "text-champagne-light underline-offset-4 hover:underline px-0",
};

function classesFor({
  variant = "primary",
  size = "md",
  block,
  onRed,
  loading,
  className,
}: BaseProps) {
  return cn(
    "inline-flex items-center justify-center gap-2 rounded-[var(--radius-button)]",
    "font-semibold leading-tight text-center",
    "transition-colors duration-200",
    "disabled:cursor-not-allowed disabled:opacity-55",
    SIZES[size],
    (onRed ? VARIANTS_ON_RED : VARIANTS)[variant],
    block && "w-full",
    loading && "pointer-events-none opacity-70",
    className,
  );
}

function Spinner() {
  return (
    <span
      aria-hidden="true"
      className="size-4 shrink-0 animate-spin rounded-full border-2 border-current border-t-transparent"
    />
  );
}

type ButtonProps = BaseProps &
  Omit<ComponentProps<"button">, "children" | "className">;

export function Button({ children, loading, ...rest }: ButtonProps) {
  const {
    variant,
    size,
    block,
    onRed,
    className,
    disabled,
    type = "button",
    ...button
  } = rest;

  return (
    <button
      {...button}
      type={type}
      disabled={disabled || loading}
      aria-busy={loading || undefined}
      className={classesFor({
        variant,
        size,
        block,
        onRed,
        loading,
        className,
        children,
      })}
    >
      {loading && <Spinner />}
      {children}
    </button>
  );
}

type ButtonLinkProps = BaseProps &
  Omit<ComponentProps<typeof Link>, "children" | "className">;

/** Ссылка, выглядящая как кнопка. Внешние адреса открываются безопасно. */
export function ButtonLink({ children, ...rest }: ButtonLinkProps) {
  const { variant, size, block, onRed, className, href, ...link } = rest;
  const external = typeof href === "string" && /^https?:/.test(href);

  return (
    <Link
      {...link}
      href={href}
      target={external ? "_blank" : undefined}
      rel={external ? "noopener noreferrer" : undefined}
      className={classesFor({ variant, size, block, onRed, className, children })}
    >
      {children}
    </Link>
  );
}
