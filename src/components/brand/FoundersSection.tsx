import { Img } from "@/components/ui/Img";
import { cn } from "@/lib/cn";
import { ButtonLink } from "@/components/ui/Button";
import { founderImage, type FounderRatio } from "@/config/founders";

export interface FoundersSectionProps {
  eyebrow: string;
  title: string;
  text: string;
  cta?: { label: string; href: string };
  /** Пропорция кадра. В разных блоках используются разные — фото не повторяется. */
  ratio: FounderRatio;
  alt: string;
  /** Фон блока */
  tone?: "emerald" | "ivory" | "white";
  /** С какой стороны фотография на широком экране */
  imageSide?: "left" | "right";
  /** Подпись под фотографией — например, имена владельцев */
  caption?: string;
  /** Секция стоит в начале страницы — грузить фотографию сразу */
  priority?: boolean;
}

const TONES = {
  emerald: "bg-emerald text-ivory-light on-dark",
  ivory: "texture-warm bg-ivory text-text",
  white: "bg-white text-text",
} as const;

/**
 * Блок владельцев. Используется на главной, в разделе «О компании»
 * и в оптовом разделе — с разными текстами и кадрированием.
 */
export function FoundersSection({
  eyebrow,
  title,
  text,
  cta,
  ratio,
  alt,
  tone = "ivory",
  imageSide = "right",
  caption,
  priority = false,
}: FoundersSectionProps) {
  const image = founderImage(ratio, alt);
  
  return (
    <section
      className={cn(
        "py-[var(--spacing-section)] md:py-[var(--spacing-section-lg)]",
        TONES[tone],
      )}
    >
      <div className="container-page">
        <div
          className={cn(
            "grid items-center gap-10 md:gap-14 lg:grid-cols-2",
            imageSide === "left" && "lg:[&>*:first-child]:order-2",
          )}
        >
          {/* Текст */}
          <div>
            <p className="eyebrow mb-4 text-current/70">
              <span aria-hidden="true" className="inline-block h-px w-5 bg-current" />
              {eyebrow}
            </p>

            <h2 className="max-w-[16ch] text-[clamp(1.75rem,4.4vw,3rem)]">
              {title}
            </h2>

            <p className="mt-5 max-w-[54ch] text-[1.0625rem] leading-relaxed text-current/85">
              {text}
            </p>

            {cta && (
              <ButtonLink
                href={cta.href}
                size="lg"
                onRed={tone === "emerald"}
                className="mt-8"
              >
                {cta.label}
              </ButtonLink>
            )}
          </div>

          {/* Фотография */}
          <figure className="m-0">
            {/* Без рамки: пока фотография грузится, пустой контур читается
                как незагруженный блок. Крафтовая подложка того же размера
                держит место и остаётся материалом, а не «дыркой». */}
            <div className="texture-warm relative overflow-hidden bg-gold/25">
              <Img
                src={image.src}
                alt={image.alt}
                width={image.width}
                height={image.height}
                priority={priority}
                sizes="(min-width: 1024px) 46vw, 100vw"
                className="h-auto w-full object-cover"
              />
            </div>

            {(caption || image.isPlaceholder) && (
              <figcaption className="mt-3 text-sm text-current/65">
                {image.isPlaceholder
                  ? "Место под фотографию владельцев — заменить в public/images/founders"
                  : caption}
              </figcaption>
            )}
          </figure>
        </div>
      </div>
    </section>
  );
}
