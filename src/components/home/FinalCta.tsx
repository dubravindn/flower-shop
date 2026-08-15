import { ButtonLink } from "@/components/ui/Button";
import { FINAL_CTA } from "@/content/home";
import { whatsappLink } from "@/config/company";

export function FinalCta() {
  return (
    <section className="on-dark bg-burgundy py-[var(--spacing-section)] text-paper md:py-[var(--spacing-section-lg)]">
      <div className="container-page text-center">
        <h2 className="mx-auto max-w-[18ch] text-[clamp(1.875rem,5vw,3.5rem)]">
          {FINAL_CTA.title}
        </h2>

        <p className="mx-auto mt-5 max-w-[48ch] text-[1.0625rem] leading-relaxed text-champagne-light">
          {FINAL_CTA.text}
        </p>

        <div className="mt-9 flex flex-col justify-center gap-3 sm:flex-row">
          <ButtonLink href={FINAL_CTA.primary.href} size="lg" onRed>
            {FINAL_CTA.primary.label}
          </ButtonLink>
          <ButtonLink
            href={whatsappLink("Здравствуйте! Хочу заказать букет с сайта")}
            size="lg"
            variant="outline"
            onRed
          >
            {FINAL_CTA.secondary.label}
          </ButtonLink>
        </div>
      </div>
    </section>
  );
}
