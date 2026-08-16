import type { ReactNode } from "react";
import { cn } from "@/lib/cn";

/** Фон секции. Белый и слоновая кость держат объём,
 * изумруд — только там, где нужен сильный акцент. */
export type SectionTone = "white" | "ivory" | "ivory-light" | "emerald";

const TONES: Record<SectionTone, string> = {
  white: "bg-white text-text",
  ivory: "texture-warm bg-ivory text-text",
  "ivory-light": "texture-warm bg-ivory-light text-text",
  emerald: "bg-emerald text-ivory-light on-dark",
};

export function Section({
  tone = "white",
  id,
  className,
  children,
}: {
  tone?: SectionTone;
  id?: string;
  className?: string;
  children: ReactNode;
}) {
  return (
    <section
      id={id}
      className={cn(
        "py-[var(--spacing-section)] md:py-[var(--spacing-section-lg)]",
        TONES[tone],
        className,
      )}
    >
      <div className="container-page">{children}</div>
    </section>
  );
}

export function SectionHeading({
  eyebrow,
  title,
  text,
  align = "start",
  as: Tag = "h2",
  className,
}: {
  eyebrow?: string;
  title: string;
  text?: string;
  align?: "start" | "center";
  as?: "h1" | "h2";
  className?: string;
}) {
  return (
    <div
      className={cn(
        "mb-10 md:mb-14",
        align === "center" && "mx-auto text-center",
        className,
      )}
    >
      {eyebrow && (
        <p className="eyebrow mb-4 text-current/70">
          <span aria-hidden="true" className="inline-block h-px w-5 bg-current" />
          {eyebrow}
        </p>
      )}
      <Tag
        className={cn(
          "max-w-[19ch] text-balance",
          Tag === "h1"
            ? "text-[clamp(2.25rem,7vw,4.5rem)]"
            : "text-[clamp(1.75rem,4.6vw,3rem)]",
          align === "center" && "mx-auto",
        )}
      >
        {title}
      </Tag>
      {text && (
        <p
          className={cn(
            "mt-4 max-w-[58ch] text-[1.0625rem] leading-relaxed text-current/80",
            align === "center" && "mx-auto",
          )}
        >
          {text}
        </p>
      )}
    </div>
  );
}
