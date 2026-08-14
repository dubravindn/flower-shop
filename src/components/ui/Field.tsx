"use client";

import type { ComponentProps, ReactNode } from "react";
import { useId } from "react";
import { cn } from "@/lib/cn";

const CONTROL = cn(
  "w-full min-h-11 rounded-[var(--radius-button)] border bg-champagne-paper",
  "border-graphite/22 px-3.5 py-2.5 text-base text-graphite",
  "placeholder:text-graphite-muted/60",
  "transition-colors focus:border-red-brand focus:outline-none",
  "disabled:cursor-not-allowed disabled:opacity-55",
  "aria-[invalid=true]:border-red-brand aria-[invalid=true]:bg-red-brand/5",
);

function Label({
  htmlFor,
  children,
  required,
}: {
  htmlFor: string;
  children: ReactNode;
  required?: boolean;
}) {
  return (
    <label
      htmlFor={htmlFor}
      className="mb-1.5 block text-sm font-semibold text-graphite"
    >
      {children}
      {required && (
        <span aria-hidden="true" className="ml-0.5 text-red-brand">
          *
        </span>
      )}
    </label>
  );
}

function Hint({ id, error, hint }: { id: string; error?: string; hint?: string }) {
  if (error) {
    return (
      <p id={id} role="alert" className="mt-1.5 text-sm font-medium text-red-dark">
        {error}
      </p>
    );
  }
  if (hint) {
    return (
      <p id={id} className="mt-1.5 text-sm text-graphite-muted">
        {hint}
      </p>
    );
  }
  return null;
}

interface FieldBase {
  label: string;
  hint?: string;
  error?: string;
  required?: boolean;
  className?: string;
}

export function Input({
  label,
  hint,
  error,
  required,
  className,
  ...rest
}: FieldBase & Omit<ComponentProps<"input">, "className">) {
  const id = useId();
  const describedBy = `${id}-hint`;

  return (
    <div className={className}>
      <Label htmlFor={id} required={required}>
        {label}
      </Label>
      <input
        {...rest}
        id={id}
        required={required}
        aria-invalid={error ? true : undefined}
        aria-describedby={error || hint ? describedBy : undefined}
        className={CONTROL}
      />
      <Hint id={describedBy} error={error} hint={hint} />
    </div>
  );
}

export function Textarea({
  label,
  hint,
  error,
  required,
  className,
  ...rest
}: FieldBase & Omit<ComponentProps<"textarea">, "className">) {
  const id = useId();
  const describedBy = `${id}-hint`;

  return (
    <div className={className}>
      <Label htmlFor={id} required={required}>
        {label}
      </Label>
      <textarea
        {...rest}
        id={id}
        required={required}
        aria-invalid={error ? true : undefined}
        aria-describedby={error || hint ? describedBy : undefined}
        className={cn(CONTROL, "min-h-28 resize-y")}
      />
      <Hint id={describedBy} error={error} hint={hint} />
    </div>
  );
}

export function Select({
  label,
  hint,
  error,
  required,
  className,
  children,
  ...rest
}: FieldBase & Omit<ComponentProps<"select">, "className">) {
  const id = useId();
  const describedBy = `${id}-hint`;

  return (
    <div className={className}>
      <Label htmlFor={id} required={required}>
        {label}
      </Label>
      <select
        {...rest}
        id={id}
        required={required}
        aria-invalid={error ? true : undefined}
        aria-describedby={error || hint ? describedBy : undefined}
        className={CONTROL}
      >
        {children}
      </select>
      <Hint id={describedBy} error={error} hint={hint} />
    </div>
  );
}
