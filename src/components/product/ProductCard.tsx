import { Img } from "@/components/ui/Img";
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
    <article className="group flex flex-col overflow-hidden rounded-[var(--radius-card)] border border-graphite/12 bg-paper transition-colors hover:border-burgundy/40">
      <Link
        href={`/product/${product.slug}`}
        className="relative block aspect-4/5 overflow-hidden"
      >
        <Img
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
        <h3 className="text-[1.0625rem] leading-snug">
          <Link href={`/product/${product.slug}`} className="hover:text-burgundy">
            {product.title}
          </Link>
        </h3>

        <p className="line-clamp-2 text-sm text-ink-muted">
          {product.composition}
        </p>

        <div className="mt-auto flex items-center justify-between gap-3 border-t border-kraft/25 pt-3">
          {/* Пока прайса нет, крупная надпись «Цена уточняется» только пугает:
              вместо неё — спокойная подпись и понятная кнопка. */}
          <p
            className={
              hasPrice
                ? "text-lg font-semibold whitespace-nowrap"
                : "text-[0.8125rem] leading-tight text-ink-muted"
            }
          >
            {hasPrice ? price : "Стоимость подтвердит флорист"}
          </p>

          <a
            href={whatsappLink(
              `Здравствуйте! Интересует букет «${product.title}» с сайта`,
            )}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex min-h-11 shrink-0 items-center rounded-[var(--radius-button)] bg-burgundy px-4 text-sm font-semibold text-ink-light transition-colors hover:bg-burgundy-dark"
          >
            {hasPrice ? "Заказать" : "Запросить стоимость"}
          </a>
        </div>
      </div>
    </article>
  );
}
