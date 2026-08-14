import type { NextConfig } from "next";

/**
 * Сборка под GitHub Pages включается переменной GITHUB_PAGES=true.
 *
 * Pages раздаёт только статические файлы, поэтому там:
 *   - output: "export" — весь сайт выгружается в готовый HTML;
 *   - basePath — сайт лежит не в корне домена, а в /flower-shop;
 *   - images.unoptimized — на Pages нет сервера, который жмёт картинки.
 *
 * Локальная разработка и запуск на обычном хостинге этих ограничений
 * не касаются: там работает и оптимизация изображений, и серверный код.
 */
const isPages = process.env.GITHUB_PAGES === "true";
const basePath = "/flower-shop";

/** Адрес, по которому сайт доступен. Нужен для canonical и Open Graph. */
const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL ??
  (isPages ? "https://dubravindn.github.io/flower-shop" : "http://localhost:3000");

const nextConfig: NextConfig = {
  ...(isPages && {
    output: "export" as const,
    basePath,
    assetPrefix: basePath,
    /**
     * Каждая страница выгружается как `путь/index.html`, а не `путь.html`.
     * Без этого GitHub Pages отдаёт 404 на адрес со слешем в конце:
     * `/catalog` работал, `/catalog/` — нет. Люди копируют ссылки со слешем,
     * и поисковики обходят оба варианта.
     */
    trailingSlash: true,
  }),

  env: {
    // Читается в src/components/ui/Img.tsx: next/image не добавляет
    // basePath к неоптимизированным картинкам, подставляем сами.
    NEXT_PUBLIC_BASE_PATH: isPages ? basePath : "",
    NEXT_PUBLIC_SITE_URL: siteUrl,
  },

  images: {
    unoptimized: isPages,
    /**
     * AVIF и WebP отдаёт next/image автоматически: исходники лежат в JPEG,
     * браузер получает современный формат по Accept-заголовку.
     */
    formats: ["image/avif", "image/webp"],
    deviceSizes: [360, 430, 768, 1024, 1280, 1440, 1920],
    imageSizes: [128, 256, 384, 512],
  },
};

export default nextConfig;
