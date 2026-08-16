import type { Metadata } from "next";
import { Hero } from "@/components/home/Hero";
import { Categories, Occasions } from "@/components/home/Categories";
import { PopularProducts } from "@/components/home/PopularProducts";
import { HelpChoose } from "@/components/home/HelpChoose";
import { Wholesale } from "@/components/home/Wholesale";
import { Advantages } from "@/components/home/Advantages";
import { Works } from "@/components/home/Works";
import { Stores } from "@/components/home/Stores";
import { Reviews } from "@/components/home/Reviews";
import { FinalCta } from "@/components/home/FinalCta";
import { DatesTeaser } from "@/components/home/DatesTeaser";
import { FoundersSection } from "@/components/brand/FoundersSection";
import { FOUNDERS_CONTENT } from "@/config/founders";
import { COMPANY, STORES } from "@/config/company";

export const metadata: Metadata = {
  title: `${COMPANY.name} — доставка цветов в Кирове за 2 часа`,
  description:
    "Цветы Дубравиных — цветочный магазин в Кирове. Авторские букеты, доставка за 2 часа, фото букета перед отправкой. Заказ через WhatsApp.",
  alternates: { canonical: "/" },
};

/** Schema.org: локальный бизнес с несколькими точками. */
function LocalBusinessSchema() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "Florist",
    name: COMPANY.name,
    telephone: COMPANY.phone.display,
    areaServed: [COMPANY.city, ...COMPANY.delivery.regions],
    location: STORES.map((store) => ({
      "@type": "Place",
      name: store.name,
      address: {
        "@type": "PostalAddress",
        addressLocality: store.city,
        streetAddress: store.address,
        addressCountry: "RU",
      },
      openingHours: store.hours,
    })),
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

export default function HomePage() {
  const founders = FOUNDERS_CONTENT.home;

  return (
    <>
      <LocalBusinessSchema />

      {/* 3. Первый экран */}
      <Hero />

      {/* 4. Быстрые категории */}
      <Categories />

      {/* 5. Подобрать по поводу */}
      <Occasions />

      {/* 6. Популярные товары */}
      <PopularProducts />

      {/* 7. Поможем выбрать */}
      <HelpChoose />

      {/* 8. Оптовый блок */}
      <Wholesale />

      {/* 9. Преимущества */}
      <Advantages />

      {/* 10. Владельцы — «За качество отвечаем лично» */}
      <FoundersSection
        eyebrow={founders.eyebrow}
        title={founders.title}
        text={founders.text}
        cta={founders.cta}
        ratio={founders.ratio}
        alt={founders.alt}
        tone="ivory"
        imageSide="right"
        caption="Братья Дубравины, владельцы базы"
      />

      {/* 11. Тизер важных дат */}
      <DatesTeaser />

      {/* 12. Реальные работы */}
      <Works />

      {/* 12. Магазины */}
      <Stores />

      {/* 13. Отзывы */}
      <Reviews />

      {/* 14. Финальный призыв */}
      <FinalCta />
    </>
  );
}
