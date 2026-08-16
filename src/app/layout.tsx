import type { Metadata, Viewport } from "next";
import { Prata, Manrope } from "next/font/google";
import "./globals.css";

import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { MobileActionBar } from "@/components/layout/MobileActionBar";
import { COMPANY } from "@/config/company";

/**
 * Шрифты подключены через next/font — файлы скачиваются на этапе сборки
 * и раздаются со своего домена. Запроса к Google Fonts в проде нет.
 */
const prata = Prata({
  subsets: ["cyrillic", "latin"],
  weight: "400",
  display: "swap",
  variable: "--font-prata",
});

const manrope = Manrope({
  subsets: ["cyrillic", "latin"],
  display: "swap",
  variable: "--font-manrope",
});

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000"),
  title: {
    default: `${COMPANY.name} — доставка цветов в Кирове за 2 часа`,
    template: `%s — ${COMPANY.name}`,
  },
  description:
    "Цветы Дубравиных — цветочный магазин в Кирове. Авторские букеты, доставка за 2 часа, фото букета перед отправкой. Заказ через WhatsApp.",
  applicationName: COMPANY.name,
  openGraph: {
    type: "website",
    locale: "ru_RU",
    siteName: COMPANY.name,
    title: `${COMPANY.name} — доставка цветов в Кирове за 2 часа`,
    description:
      "Букеты, композиции и доставка по Кирову. Оптовые поставки для цветочных магазинов.",
    images: [
      {
        url: "/og-cover.jpg",
        width: 1200,
        height: 630,
        alt: COMPANY.name,
      },
    ],
  },
  robots: { index: true, follow: true },
  icons: {
    icon: [
      { url: "/favicon-16.png", sizes: "16x16", type: "image/png" },
      { url: "/favicon-32.png", sizes: "32x32", type: "image/png" },
      { url: "/favicon-48.png", sizes: "48x48", type: "image/png" },
    ],
    apple: [{ url: "/apple-touch-icon.png", sizes: "180x180" }],
  },
  manifest: "/site.webmanifest",
};

export const viewport: Viewport = {
  themeColor: "#741C2C",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="ru" className={`${prata.variable} ${manrope.variable}`}>
      {/* pb-16 на телефоне — под нижнюю панель действий */}
      <body className="flex min-h-dvh flex-col pb-16 md:pb-0">
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:absolute focus:top-0 focus:left-0 focus:z-200 focus:bg-emerald focus:px-4 focus:py-3 focus:text-ivory-light"
        >
          Перейти к содержимому
        </a>

        <Header />
        <main id="main" className="flex-1">
          {children}
        </main>
        <Footer />
        <MobileActionBar />
      </body>
    </html>
  );
}
