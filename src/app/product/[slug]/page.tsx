import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { Img } from "@/components/ui/Img";
import { PageHeader } from "@/components/layout/PageHeader";
import { ProductCard } from "@/components/product/ProductCard";
import { Badge } from "@/components/ui/States";
import { ButtonLink } from "@/components/ui/Button";
import { PRODUCTS, findCategory } from "@/content/catalog";
import { COMPANY, whatsappLink } from "@/config/company";
import { formatFromPrice } from "@/lib/format";

export function generateStaticParams() {
  return PRODUCTS.map((product) => ({ slug: product.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const product = PRODUCTS.find((p) => p.slug === slug);
  if (!product) return {};

  return {
    title: `Букет «${product.title}» — доставка в Кирове`,
    description: `${product.title}: ${product.composition}. Доставка по Кирову, фото букета перед отправкой. Цветы Дубравиных.`,
    alternates: { canonical: `/product/${product.slug}` },
    openGraph: { images: [{ url: product.image, alt: product.imageAlt }] },
  };
}

export default async function ProductPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const product = PRODUCTS.find((p) => p.slug === slug);
  if (!product) notFound();

  const category = findCategory(product.category);
  const similar = PRODUCTS.filter(
    (p) => p.category === product.category && p.slug !== product.slug,
  ).slice(0, 4);

  const orderMessage = `Здравствуйте! Интересует букет «${product.title}» с сайта`;

  const schema = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: product.title,
    description: product.composition,
    image: product.image,
    brand: { "@type": "Brand", name: COMPANY.name },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />

      <PageHeader
        crumbs={[
          { label: "Каталог", href: "/catalog" },
          ...(category
            ? [{ label: category.title, href: `/catalog/${category.slug}` }]
            : []),
          { label: product.title },
        ]}
        title={product.title}
      />

      <div className="container-page grid gap-10 py-10 md:py-14 lg:grid-cols-2 lg:gap-16">
        <div className="relative aspect-4/5 overflow-hidden rounded-[var(--radius-card)] border border-text/12">
          <Img
            src={product.image}
            alt={product.imageAlt}
            fill
            priority
            sizes="(min-width: 1024px) 46vw, 100vw"
            className="object-cover"
          />
        </div>

        <div>
          {product.badges.length > 0 && (
            <div className="mb-4 flex gap-2">
              {product.badges.map((badge) => (
                <Badge key={badge} kind={badge} />
              ))}
            </div>
          )}

          <p className="font-display text-3xl">{formatFromPrice(product.variants)}</p>
          <p className="mt-1 text-sm text-text-muted">
            Точную стоимость флорист подтверждает при оформлении — она зависит от
            свежей поставки.
          </p>

          <dl className="mt-8 space-y-4 border-t border-text/12 pt-6">
            <div>
              <dt className="font-sans text-xs font-semibold tracking-[0.12em] text-text-muted uppercase">
                Состав
              </dt>
              <dd className="mt-1">{product.composition}</dd>
            </div>
            <div>
              <dt className="font-sans text-xs font-semibold tracking-[0.12em] text-text-muted uppercase">
                Цветовая гамма
              </dt>
              <dd className="mt-1">{product.palette.join(", ")}</dd>
            </div>
            <div>
              <dt className="font-sans text-xs font-semibold tracking-[0.12em] text-text-muted uppercase">
                Сезонная замена
              </dt>
              <dd className="mt-1 text-text-muted">
                Если какого-то цветка нет в свежей поставке, флорист заранее
                предложит замену того же стиля и стоимости.
              </dd>
            </div>
          </dl>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <ButtonLink href={whatsappLink(orderMessage)} size="lg">
              Заказать в WhatsApp
            </ButtonLink>
            <ButtonLink href={COMPANY.phone.href} size="lg" variant="outline">
              {COMPANY.phone.display}
            </ButtonLink>
          </div>

          <div className="mt-8 rounded-[var(--radius-card)] border border-text/12 bg-ivory p-5">
            <h2 className="font-sans text-base font-semibold">Как ухаживать</h2>
            <ul className="mt-2 list-disc space-y-1 pl-5 text-[0.9375rem] text-text-muted">
              <li>Подрежьте стебли под углом и смените воду.</li>
              <li>Держите букет вдали от батарей и прямого солнца.</li>
              <li>Меняйте воду каждый день, подрезайте стебли раз в два дня.</li>
            </ul>
            <Link
              href="/care"
              className="mt-3 inline-block text-sm font-semibold text-emerald underline-offset-4 hover:underline"
            >
              Подробнее об уходе →
            </Link>
          </div>
        </div>
      </div>

      {similar.length > 0 && (
        <section className="border-t border-text/12 bg-ivory py-12 md:py-16">
          <div className="container-page">
            <h2 className="mb-8 text-[clamp(1.5rem,3.5vw,2.25rem)]">Похожие букеты</h2>
            <ul className="grid grid-cols-2 gap-4 lg:grid-cols-4">
              {similar.map((item) => (
                <li key={item.slug}>
                  <ProductCard product={item} />
                </li>
              ))}
            </ul>
          </div>
        </section>
      )}
    </>
  );
}
