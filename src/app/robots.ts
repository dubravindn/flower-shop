import type { MetadataRoute } from "next";

const SITE = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";

export const dynamic = "force-static";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      // Служебные страницы в индекс не отдаём
      disallow: [
        "/brand-preview",
        "/logo-preview",
        "/cart",
        "/checkout",
        "/order/",
        "/unsubscribe",
      ],
    },
    sitemap: `${SITE}/sitemap.xml`,
  };
}
