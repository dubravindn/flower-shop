import { Img } from "@/components/ui/Img";
import { Section, SectionHeading } from "@/components/ui/Section";
import { WORKS_BLOCK } from "@/content/home";
import { PRODUCTS } from "@/content/catalog";

/**
 * Галерея реальных работ. Ровная адаптивная сетка,
 * без хаотичного masonry на мобильных.
 */
export function Works() {
  const gallery = PRODUCTS.slice(0, 8);

  return (
    <Section tone="white">
      <SectionHeading
        eyebrow={WORKS_BLOCK.eyebrow}
        title={WORKS_BLOCK.title}
        text={WORKS_BLOCK.text}
      />

      <ul className="grid grid-cols-2 gap-3 md:grid-cols-4">
        {gallery.map((item) => (
          <li
            key={item.slug}
            className="relative aspect-4/5 overflow-hidden rounded-[var(--radius-card)] border border-text/12"
          >
            <Img
              src={item.image}
              alt={item.imageAlt}
              fill
              sizes="(min-width: 768px) 25vw, 50vw"
              className="object-cover"
            />
          </li>
        ))}
      </ul>
    </Section>
  );
}
