import Image from "next/image";
import Link from "next/link";
import type { Product } from "@/types";
import { formatFromPrice } from "@/lib/format";
import { Badge } from "@/components/ui/States";
import { whatsappLink } from "@/config/company";

export function ProductCard({
  product,
  priority = false,
}: {
  product: Product;
  priority?: boolean;
}) {
  const price = formatFromPrice(product.variants);
  const hasPrice = product.variants.some((v) => v.price !== null);

  return (
    <article className="group flex flex-col overflow-hidden rounded-[var(--radius-card)] border border-graphite/12 bg-champagne-paper transition-colors hover:border-red-brand/40">
      <Link
        href={`/product/${product.slug}`}
        className="relative block aspect-4/5 overflow-hidden"
      >
        <Image
          src={product.image}
          alt={product.imageAlt}
          fill
          priority={priority}
          sizes="(min-width: 1280px) 22vw, (min-width: 768px) 33vw, 50vw"
          className="object-cover transition-transform duration-300 group-hover:scale-[1.02]"
        />

        {product.badges.length > 0 && (
          <span className="absolute top-3 left-3 flex gap-1.5">
            {product.badges.map((badge) => (
              <Badge key={badge} kind={badge} />
            ))}
          </span>
        )}
      </Link>

      <div className="flex flex-1 flex-col gap-2 p-4">
        <h3 className="font-display text-xl leading-snug">
          <Link href={`/product/${product.slug}`} className="hover:text-red-brand">
            {product.title}
          </Link>
        </h3>

        <p className="line-clamp-2 text-sm text-graphite-muted">
          {product.composition}
        </p>

        <div className="mt-auto flex items-center justify-between gap-3 border-t border-graphite/12 pt-3">
          <p
            className={
              hasPrice
                ? "font-semibold text-lg whitespace-nowrap"
                : "text-sm text-graphite-muted"
            }
          >
            {price}
          </p>

          <a
            href={whatsappLink(
              `Здравствуйте! Интересует букет «${product.title}» с сайта`,
            )}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex min-h-11 items-center rounded-[var(--radius-button)] bg-red-brand px-4 text-sm font-semibold text-champagne-paper transition-colors hover:bg-red-hover"
          >
            {hasPrice ? "Заказать" : "Узнать цену"}
          </a>
        </div>
      </div>
    </article>
  );
}
