"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { MAIN_NAV } from "@/config/navigation";
import { COMPANY, whatsappLink } from "@/config/company";
import { ButtonLink } from "@/components/ui/Button";
import { Monogram } from "@/components/brand/Logo";

/**
 * Мобильное меню. Открывается панелью справа, держит фокус внутри,
 * закрывается по Esc и по клику вне панели.
 */
export function MobileMenu() {
  const [open, setOpen] = useState(false);
  const panelRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!open) return;

    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setOpen(false);
        return;
      }
      if (event.key !== "Tab" || !panelRef.current) return;

      // Ловушка фокуса внутри панели
      const focusable = panelRef.current.querySelectorAll<HTMLElement>(
        'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])',
      );
      if (focusable.length === 0) return;

      const first = focusable[0];
      const last = focusable[focusable.length - 1];

      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };

    document.addEventListener("keydown", onKeyDown);
    panelRef.current?.querySelector<HTMLElement>("a, button")?.focus();

    return () => {
      document.body.style.overflow = previous;
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [open]);

  const close = () => {
    setOpen(false);
    triggerRef.current?.focus();
  };

  return (
    <>
      <button
        ref={triggerRef}
        type="button"
        onClick={() => setOpen(true)}
        aria-expanded={open}
        aria-haspopup="dialog"
        aria-label="Открыть меню"
        className="inline-grid size-11 place-items-center rounded-[var(--radius-button)] text-graphite transition-colors hover:bg-graphite/8 xl:hidden"
      >
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className="size-6">
          <path d="M4 7h16M4 12h16M4 17h16" strokeLinecap="round" />
        </svg>
      </button>

      {open && (
        <div className="fixed inset-0 z-100 xl:hidden">
          <button
            type="button"
            aria-label="Закрыть меню"
            onClick={close}
            className="absolute inset-0 bg-graphite/55"
          />

          <div
            ref={panelRef}
            role="dialog"
            aria-modal="true"
            aria-label="Меню сайта"
            className="reveal absolute inset-y-0 right-0 flex w-[min(22rem,88vw)] flex-col overflow-y-auto bg-paper shadow-xl"
          >
            <div className="flex items-center justify-between border-b border-graphite/12 px-5 py-4">
              <span className="flex items-center gap-3">
                <Monogram className="size-9 text-base" />
                <span className="font-display text-lg leading-tight">
                  Цветочная База
                  <br />
                  Дубравиных
                </span>
              </span>

              <button
                type="button"
                onClick={close}
                aria-label="Закрыть меню"
                className="inline-grid size-11 place-items-center rounded-[var(--radius-button)] hover:bg-graphite/8"
              >
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className="size-5">
                  <path d="m6 6 12 12M18 6 6 18" strokeLinecap="round" />
                </svg>
              </button>
            </div>

            <nav aria-label="Меню сайта" className="flex-1 px-5 py-4">
              <ul className="flex flex-col">
                {MAIN_NAV.map((item) => (
                  <li key={item.href} className="border-b border-graphite/10 last:border-0">
                    <Link
                      href={item.href}
                      onClick={close}
                      className="block py-3.5"
                    >
                      <span className="font-display text-xl">{item.label}</span>
                      {item.hint && (
                        <span className="mt-0.5 block text-sm text-ink-muted">
                          {item.hint}
                        </span>
                      )}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>

            <div className="border-t border-graphite/12 px-5 py-5">
              <a
                href={COMPANY.phone.href}
                className="mb-3 block font-display text-2xl text-burgundy"
              >
                {COMPANY.phone.display}
              </a>
              <ButtonLink href={whatsappLink()} block size="lg">
                Написать в WhatsApp
              </ButtonLink>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
