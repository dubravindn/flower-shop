import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    /**
     * AVIF и WebP отдаются next/image автоматически: исходники лежат в JPEG,
     * браузер получает современный формат по Accept-заголовку.
     */
    formats: ["image/avif", "image/webp"],
    deviceSizes: [360, 430, 768, 1024, 1280, 1440, 1920],
    imageSizes: [128, 256, 384, 512],
  },
};

export default nextConfig;
