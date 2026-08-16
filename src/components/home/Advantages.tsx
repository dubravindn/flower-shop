import { Section, SectionHeading } from "@/components/ui/Section";
import { ADVANTAGES } from "@/content/home";

/** Преимущества: только проверяемые факты, без обещаний и сроков. */
export function Advantages() {
  return (
    <Section tone="ivory">
      <SectionHeading
        eyebrow="Почему мы"
        title="Что стоит за букетом"
        text="Своя база, свои магазины и своя доставка — цепочка от поставки до вручения у нас перед глазами."
      />

      <ul className="grid gap-px overflow-hidden rounded-[var(--radius-card)] border border-text/15 bg-text/15 sm:grid-cols-2 lg:grid-cols-3">
        {ADVANTAGES.map((item, index) => (
          <li key={item.title} className="bg-ivory-light p-6 md:p-7">
            <span
              aria-hidden="true"
              className="mb-4 block font-display text-2xl text-gold-light"
            >
              {String(index + 1).padStart(2, "0")}
            </span>
            <h3 className="text-xl">{item.title}</h3>
            <p className="mt-2 text-text-muted">{item.text}</p>
          </li>
        ))}
      </ul>
    </Section>
  );
}
