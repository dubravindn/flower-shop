import type { Metadata } from "next";
import { Suspense } from "react";
import { notFound } from "next/navigation";
import { PageHeader } from "@/components/layout/PageHeader";
import { CATEGORIES, findCategory } from "@/content/catalog";
import { CatalogView } from "../CatalogView";

export function generateStaticParams() {
  return CATEGORIES.map((category) => ({ category: category.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ category: string }>;
}): Promise<Metadata> {
  const { category } = await params;
  const found = findCategory(category);
  if (!found) return {};

  return {
    title: `${found.title} с доставкой в Кирове`,
    description: `${found.title}: ${found.caption.toLowerCase()}. Доставка за 2 часа по Кирову, фото букета перед отправкой. Цветочная База Дубравиных.`,
    alternates: { canonical: `/catalog/${found.slug}` },
  };
}

export default async function CategoryPage({
  params,
}: {
  params: Promise<{ category: string }>;
}) {
  const { category } = await params;
  const found = findCategory(category);
  if (!found) notFound();

  return (
    <>
      <PageHeader
        crumbs={[{ label: "Каталог", href: "/catalog" }, { label: found.title }]}
        title={found.title}
        text={found.caption}
      />
      <Suspense>
        <CatalogView category={found.slug} />
      </Suspense>
    </>
  );
}
