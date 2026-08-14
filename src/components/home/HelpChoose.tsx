"use client";

import { useState } from "react";
import { Button } from "@/components/ui/Button";
import { Input, Select } from "@/components/ui/Field";
import { HELP_BLOCK } from "@/content/home";
import { OCCASIONS } from "@/content/catalog";
import { whatsappLink } from "@/config/company";

/**
 * Блок «Поможем выбрать».
 *
 * Формы приёма заявок на сервере пока нет — checkout и серверные экшены
 * идут следующим этапом. Чтобы блок не был мёртвым, он собирает ответы
 * в готовое сообщение и открывает переписку с флористом. Персональные
 * данные никуда не отправляются и нигде не сохраняются.
 */
export function HelpChoose() {
  const [occasion, setOccasion] = useState("");
  const [budget, setBudget] = useState("");
  const [date, setDate] = useState("");

  const message = [
    "Здравствуйте! Помогите выбрать букет.",
    occasion && `Повод: ${occasion}`,
    budget && `Бюджет: ${budget}`,
    date && `Дата: ${date}`,
  ]
    .filter(Boolean)
    .join("\n");

  return (
    <section className="bg-champagne-paper-deep py-[var(--spacing-section)] text-graphite md:py-[var(--spacing-section-lg)]">
      <div className="container-page">
        <div className="grid gap-10 rounded-[var(--radius-card)] border border-graphite/12 bg-champagne-paper p-6 md:p-10 lg:grid-cols-[0.9fr_1.1fr] lg:gap-14">
          <div>
            <p className="eyebrow mb-4 text-red-brand">
              <span aria-hidden="true" className="inline-block h-px w-5 bg-current" />
              {HELP_BLOCK.eyebrow}
            </p>
            <h2 className="text-[clamp(1.625rem,4vw,2.5rem)]">{HELP_BLOCK.title}</h2>
            <p className="mt-4 max-w-[46ch] text-[1.0625rem] leading-relaxed text-graphite-muted">
              {HELP_BLOCK.text}
            </p>
          </div>

          <form
            className="grid gap-4 sm:grid-cols-2"
            onSubmit={(event) => {
              event.preventDefault();
              window.open(whatsappLink(message), "_blank", "noopener,noreferrer");
            }}
          >
            <Select
              label="Повод"
              value={occasion}
              onChange={(e) => setOccasion(e.target.value)}
            >
              <option value="">Не выбран</option>
              {OCCASIONS.map((item) => (
                <option key={item.slug} value={item.title}>
                  {item.title}
                </option>
              ))}
            </Select>

            <Select
              label="Бюджет"
              value={budget}
              onChange={(e) => setBudget(e.target.value)}
            >
              <option value="">Не важно</option>
              <option value="до 3 000 ₽">до 3 000 ₽</option>
              <option value="3 000 – 5 000 ₽">3 000 – 5 000 ₽</option>
              <option value="5 000 – 10 000 ₽">5 000 – 10 000 ₽</option>
              <option value="от 10 000 ₽">от 10 000 ₽</option>
            </Select>

            <Input
              label="Дата вручения"
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              className="sm:col-span-2"
            />

            <div className="sm:col-span-2">
              <Button type="submit" size="lg" block>
                {HELP_BLOCK.submit}
              </Button>
              <p className="mt-3 text-sm text-graphite-muted">
                Откроется переписка в WhatsApp с уже заполненным вопросом. Данные
                никуда не отправляются, пока вы не нажмёте «Отправить» в мессенджере.
              </p>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
}
