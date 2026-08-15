import type { MetadataRoute } from "next";
import { CATEGORIES, PRODUCTS } from "@/content/catalog";

const SITE = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";

/** Карта сайта. /brand-preview и служебные страницы сюда не попадают. */
export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  const staticPages = [
    "",
    "/catalog",
    "/wholesale",
    "/wholesale/catalog",
    "/corporate",
    "/delivery",
    "/contacts",
    "/about",
    "/care",
    "/reminders",
    // /privacy, /consent и /offer намеренно исключены: пока это шаблоны
    // без реквизитов и юридической проверки, им нечего делать в поиске.
  ];

  return [
    ...staticPages.map((path) => ({
      url: `${SITE}${path}`,
      changeFrequency: "weekly" as const,
      priority: path === "" ? 1 : 0.7,
    })),
    ...CATEGORIES.map((category) => ({
      url: `${SITE}/catalog/${category.slug}`,
      changeFrequency: "weekly" as const,
      priority: 0.6,
    })),
    ...PRODUCTS.map((product) => ({
      url: `${SITE}/product/${product.slug}`,
      changeFrequency: "weekly" as const,
      priority: 0.5,
    })),
  ];
}
