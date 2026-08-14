import type { Metadata } from "next";
import { ButtonLink } from "@/components/ui/Button";
import { whatsappLink } from "@/config/company";

export const metadata: Metadata = {
  title: "Страница не найдена",
  robots: { index: false, follow: false },
};

export default function NotFound() {
  return (
    <section className="on-red bg-red-brand py-24 text-champagne-paper md:py-36">
      <div className="container-page text-center">
        <p className="font-display text-[clamp(4rem,14vw,9rem)] leading-none text-champagne-foil">
          404
        </p>

        <h1 className="mx-auto mt-4 max-w-[18ch] text-[clamp(1.75rem,4.5vw,2.75rem)]">
          Такой страницы у нас нет
        </h1>

        <p className="mx-auto mt-4 max-w-[46ch] text-champagne-light">
          Возможно, ссылка устарела. Загляните в каталог или напишите — подскажем,
          что есть в наличии сегодня.
        </p>

        <div className="mt-9 flex flex-col justify-center gap-3 sm:flex-row">
          <ButtonLink href="/catalog" size="lg" onRed>
            Перейти в каталог
          </ButtonLink>
          <ButtonLink href={whatsappLink()} size="lg" variant="outline" onRed>
            Написать флористу
          </ButtonLink>
        </div>
      </div>
    </section>
  );
}
