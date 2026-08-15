import type { CSSProperties } from "react";
import {
  OAK_FULL,
  OAK_MICRO,
  CBD_MARK,
  OAK_VIEWBOX,
  OAK_MICRO_VIEWBOX,
  CBD_VIEWBOX,
} from "@/components/brand/oak-paths";

/**
 * Фирменная система «Цветочная База Дубравиных».
 *
 * Иерархия жёсткая: главный элемент — фамилия, дуб работает знаком или
 * фоновой гравюрой, монограмма «ЦБД» остаётся подписью и нигде не
 * становится крупнее фамилии.
 */

type Tone = { ink: string; gold: string; oak: string };

/** Знак дуба. */
export function Oak({
  className,
  style,
  title = "",
}: {
  className?: string;
  style?: CSSProperties;
  title?: string;
}) {
  return (
    <svg
      viewBox={OAK_VIEWBOX}
      className={className}
      style={style}
      role={title ? "img" : undefined}
      aria-label={title || undefined}
      aria-hidden={title ? undefined : true}
      fill="currentColor"
    >
      <path d={OAK_FULL.crown} />
      <path d={OAK_FULL.trunk} />
    </svg>
  );
}

/** Упрощённый дуб для 16–24 px. */
export function OakMicro({
  className,
  style,
}: {
  className?: string;
  style?: CSSProperties;
}) {
  return (
    <svg
      viewBox={OAK_MICRO_VIEWBOX}
      className={className}
      style={style}
      fill="currentColor"
      aria-hidden="true"
    >
      <path d={OAK_MICRO} />
    </svg>
  );
}

/** Фоновая гравюра: контурный дуб под названием. */
export function OakWatermark({
  className,
  style,
}: {
  className?: string;
  style?: CSSProperties;
}) {
  return (
    <svg
      viewBox={OAK_VIEWBOX}
      className={className}
      style={style}
      fill="none"
      stroke="currentColor"
      strokeWidth={2.5}
      aria-hidden="true"
    >
      <path d={OAK_FULL.crown} />
      <path d={OAK_FULL.trunk} />
    </svg>
  );
}

/** Вторичная монограмма «ЦБД» — подпись бренда, не главный знак. */
export function OakCbdMark({
  className,
  style,
}: {
  className?: string;
  style?: CSSProperties;
}) {
  return (
    <svg
      viewBox={CBD_VIEWBOX}
      className={className}
      style={style}
      fill="currentColor"
      aria-hidden="true"
    >
      <path d={CBD_MARK} />
    </svg>
  );
}

/**
 * Фамильный wordmark. «ДУБ» выделено матовым золотом — деликатно,
 * цветом, без подчёркиваний и без обыгрывания как каламбура.
 */
export function OakWordmark({
  tone,
  size = "md",
  className,
}: {
  tone: Tone;
  size?: "sm" | "md" | "lg";
  className?: string;
}) {
  const scale = { sm: 1, md: 1.5, lg: 2.2 }[size];

  return (
    <span className={className} style={{ display: "inline-block" }}>
      <span
        style={{
          display: "block",
          fontSize: 8 * scale,
          letterSpacing: 0.34 * scale,
          textTransform: "uppercase",
          color: tone.ink,
          opacity: 0.8,
        }}
      >
        Цветочная база
      </span>
      <span
        className="font-display"
        style={{
          display: "block",
          fontSize: 22 * scale,
          lineHeight: 1.05,
          letterSpacing: 0.5,
          color: tone.ink,
        }}
      >
        <span style={{ color: tone.gold }}>ДУБ</span>РАВИНЫХ
      </span>
    </span>
  );
}

/** Главная горизонтальная компоновка: дуб слева, название справа. */
export function OakLogo({
  tone,
  size = "md",
  className,
}: {
  tone: Tone;
  size?: "sm" | "md" | "lg";
  className?: string;
}) {
  const oakHeight = { sm: 40, md: 62, lg: 92 }[size];

  return (
    <span
      className={className}
      style={{ display: "inline-flex", alignItems: "center", gap: oakHeight * 0.22 }}
    >
      <Oak style={{ height: oakHeight, width: "auto", color: tone.oak }} />
      <OakWordmark tone={tone} size={size} />
    </span>
  );
}

/** Главная вертикальная компоновка: дуб сверху, фамилия крупно под ним. */
export function OakLogoStacked({
  tone,
  size = "md",
  className,
}: {
  tone: Tone;
  size?: "sm" | "md" | "lg";
  className?: string;
}) {
  const oakHeight = { sm: 52, md: 84, lg: 120 }[size];

  return (
    <span
      className={className}
      style={{
        display: "inline-flex",
        flexDirection: "column",
        alignItems: "center",
        gap: oakHeight * 0.14,
        textAlign: "center",
      }}
    >
      <Oak style={{ height: oakHeight, width: "auto", color: tone.oak }} />
      <OakWordmark tone={tone} size={size} />
    </span>
  );
}

/**
 * Компактный знак: упрощённый дуб и монограмма под ним.
 * Рассчитан на аватар, печать и бирку — от 32–48 px.
 */
export function OakCompact({
  tone,
  height = 64,
  className,
}: {
  tone: Tone;
  height?: number;
  className?: string;
}) {
  return (
    <span
      className={className}
      style={{
        display: "inline-flex",
        flexDirection: "column",
        alignItems: "center",
        gap: height * 0.08,
      }}
    >
      <OakMicro style={{ height: height * 0.68, width: "auto", color: tone.oak }} />
      <OakCbdMark style={{ height: height * 0.2, width: "auto", color: tone.gold }} />
    </span>
  );
}

/** Название поверх фоновой гравюры дуба. */
export function OakLockupWatermark({
  tone,
  className,
}: {
  tone: Tone;
  className?: string;
}) {
  return (
    <span
      className={className}
      style={{
        position: "relative",
        display: "inline-flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "28px 44px",
      }}
    >
      <OakWatermark
        style={{
          position: "absolute",
          height: "180%",
          width: "auto",
          color: tone.oak,
          opacity: 0.22,
        }}
      />
      <span style={{ position: "relative", textAlign: "center" }}>
        <OakWordmark tone={tone} size="lg" />
        <span style={{ display: "block", marginTop: 10 }}>
          <OakCbdMark style={{ height: 14, width: "auto", color: tone.gold }} />
        </span>
      </span>
    </span>
  );
}
