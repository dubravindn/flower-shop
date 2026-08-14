"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { cn } from "@/lib/cn";
import { Logo } from "@/components/brand/Logo";
import { MAIN_NAV } from "@/config/navigation";
import { COMPANY, whatsappLink } from "@/config/company";
import { TOP_BAR } from "@/content/home";
import { MobileMenu } from "@/components/layout/MobileMenu";
import { ButtonLink } from "@/components/ui/Button";

export function Header() {
  const [stuck, setStuck] = useState(false);

  useEffect(() => {
    const onScroll = () => setStuck(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      {/* --- Служебная строка --- */}
      <div className="bg-graphite text-champagne-paper on-graphite">
        <div className="container-page flex h-9 items-center justify-between gap-4 text-[0.8125rem]">
          <p className="flex items-center gap-2">
            <span className="font-semibold">{TOP_BAR.city}</span>
            <span aria-hidden="true" className="text-champagne-foil">
              ·
            </span>
            <span className="hidden text-champagne-light/85 sm:inline">
              {TOP_BAR.notice}
            </span>
          </p>

          <div className="flex items-center gap-5">
            <Link
              href={TOP_BAR.wholesale.href}
              className="text-champagne-light underline-offset-4 hover:underline"
            >
              {TOP_BAR.wholesale.label}
            </Link>
            <a
              href={COMPANY.phone.href}
              className="hidden font-semibold underline-offset-4 hover:underline md:inline"
            >
              {COMPANY.phone.display}
            </a>
          </div>
        </div>
      </div>

      {/* --- Шапка --- */}
      <header
        className={cn(
          "sticky top-0 z-50 border-b bg-champagne-paper/95 backdrop-blur",
          "transition-[height,border-color] duration-200",
          stuck ? "border-graphite/12" : "border-transparent",
        )}
      >
        <div
          className={cn(
            "container-page flex items-center justify-between gap-4 transition-[height] duration-200",
            stuck ? "h-16" : "h-20",
          )}
        >
          <Logo />

          <nav aria-label="Основная навигация" className="hidden xl:block">
            <ul className="flex items-center gap-7 text-[0.9375rem]">
              {MAIN_NAV.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="text-graphite-muted transition-colors hover:text-red-brand"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* Поиск, избранное и корзина появятся вместе с работающими
              функциями: иконка, ведущая в пустоту, хуже её отсутствия. */}
          <div className="flex items-center gap-1">
            <ButtonLink
              href={whatsappLink()}
              size="md"
              className="ml-2 hidden lg:inline-flex"
            >
              Написать
            </ButtonLink>

            <MobileMenu />
          </div>
        </div>
      </header>
    </>
  );
}
