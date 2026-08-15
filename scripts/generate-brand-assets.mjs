/**
 * Иконки бренда из архитектурной монограммы «ЦБД».
 *
 *   node scripts/generate-brand-assets.mjs
 *
 * Источник геометрии — тот же файл, что и на сайте (Monogram.tsx),
 * поэтому знак на favicon и знак в шапке не могут разойтись.
 *
 * Монограмма считается предварительной: владелец ещё выбирает
 * направление на /brand-preview. Пересобрать иконки после выбора —
 * повторный запуск этого скрипта.
 */

import sharp from "sharp";
import { mkdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const BRAND = path.join(root, "public/brand");
const ICONS = path.join(root, "public");

const BURGUNDY = "#741C2C";
const GOLD_LIGHT = "#CCAD6C";
const CHAMPAGNE = "#E4D5BF";
const GRAPHITE = "#292321";

/** Достаём геометрию монограммы из компонента — единый источник правды. */
async function monogramPath() {
  const src = await readFile(
    path.join(root, "src/components/brand/Monogram.tsx"),
    "utf8",
  );
  const block = src.match(/const ARCHITECT = \[([\s\S]*?)\]\.join/)[1];
  return block
    .split("\n")
    .filter((l) => l.trim().startsWith('"'))
    .map((l) => l.trim().replace(/^"/, "").replace(/",?$/, ""))
    .join("");
}

const VIEWBOX = "0 0 316 132";

/**
 * Micro-геометрия для мелких размеров. Полная монограмма на 16 px
 * превращается в кашу: штрихи тоньше пикселя. Micro-версия крупнее
 * по модулю и сохраняет признаки всех трёх букв.
 */
async function microPath() {
  const src = await readFile(
    path.join(root, "src/components/brand/Monogram.tsx"),
    "utf8",
  );
  const block = src.match(/export function MonogramMicro[\s\S]*?d=\{\[([\s\S]*?)\]\.join/)[1];
  return block
    .split("\n")
    .filter((l) => l.trim().startsWith('"'))
    .map((l) => l.trim().replace(/^"/, "").replace(/",?$/, ""))
    .join("");
}

/** Монограмма на прозрачном фоне. */
const markSvg = (d, color) =>
  `<svg xmlns="http://www.w3.org/2000/svg" viewBox="${VIEWBOX}"><path d="${d}" fill="${color}" fill-rule="evenodd"/></svg>`;

/**
 * Квадратная плашка: знак по центру с полями.
 * Для maskable-иконки поля увеличены — система обрезает края.
 */
function tileSvg(d, { size, bg, fg, padding = 0.16, micro = false }) {
  const [vw, vh] = micro ? [60, 34] : [316, 132];
  const inner = size * (1 - padding * 2);
  const scale = inner / vw;
  const h = vh * scale;
  const x = (size - inner) / 2;
  const y = (size - h) / 2;

  return `<svg xmlns="http://www.w3.org/2000/svg" width="${size}" height="${size}" viewBox="0 0 ${size} ${size}">
  <rect width="${size}" height="${size}" fill="${bg}"/>
  <g transform="translate(${x} ${y}) scale(${scale})"><path d="${d}" fill="${fg}" fill-rule="evenodd"/></g>
</svg>`;
}

const d = await monogramPath();
const micro = await microPath();
await mkdir(BRAND, { recursive: true });

/* ---------- SVG-файлы знака ---------- */
const svgs = {
  "logo-monogram-primary.svg": markSvg(d, BURGUNDY),
  "logo-monogram-light.svg": markSvg(d, CHAMPAGNE),
  "logo-monogram-dark.svg": markSvg(d, GRAPHITE),
  "logo-monogram-gold.svg": markSvg(d, GOLD_LIGHT),
};
for (const [name, svg] of Object.entries(svgs)) {
  await writeFile(path.join(BRAND, name), svg, "utf8");
}

/* ---------- Растровые иконки ---------- */
const raster = [
  // На 16 и 32 px используется micro-геометрия: полная монограмма
  // в этих размерах нечитаема.
  { file: "favicon-16.png", size: 16, padding: 0.06, micro: true },
  { file: "favicon-32.png", size: 32, padding: 0.08, micro: true },
  { file: "favicon-48.png", size: 48, padding: 0.1, micro: true },
  { file: "apple-touch-icon.png", size: 180, padding: 0.16 },
  { file: "icon-192.png", size: 192, padding: 0.16 },
  { file: "icon-512.png", size: 512, padding: 0.16 },
  { file: "icon-maskable-512.png", size: 512, padding: 0.26 },
  { file: "avatar-1080.png", size: 1080, padding: 0.18 },
];

for (const item of raster) {
  const svg = tileSvg(item.micro ? micro : d, {
    size: item.size,
    bg: BURGUNDY,
    fg: GOLD_LIGHT,
    padding: item.padding,
    micro: item.micro,
  });
  await sharp(Buffer.from(svg)).png().toFile(path.join(ICONS, item.file));
}

/* ---------- favicon.ico из трёх размеров ---------- */
const ico = await sharp(
  Buffer.from(tileSvg(micro, { size: 48, bg: BURGUNDY, fg: GOLD_LIGHT, padding: 0.1, micro: true })),
)
  .png()
  .toBuffer();
await writeFile(path.join(ICONS, "favicon.png"), ico);

/* ---------- Open Graph 1200×630 ---------- */
const scale = 780 / 316;
const og = `<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630" viewBox="0 0 1200 630">
  <rect width="1200" height="630" fill="${CHAMPAGNE}"/>
  <rect x="0" y="0" width="1200" height="14" fill="${BURGUNDY}"/>
  <g transform="translate(210 190) scale(${scale})"><path d="${d}" fill="${BURGUNDY}" fill-rule="evenodd"/></g>
  <text x="600" y="470" text-anchor="middle" font-family="Georgia, 'Times New Roman', serif"
        font-size="46" fill="${GRAPHITE}">Цветочная База Дубравиных</text>
  <text x="600" y="524" text-anchor="middle" font-family="Helvetica, Arial, sans-serif"
        font-size="26" fill="#6B5A50">Доставка по Кирову за 2 часа · Фото букета перед отправкой</text>
</svg>`;
await sharp(Buffer.from(og)).jpeg({ quality: 88 }).toFile(path.join(ICONS, "og-cover.jpg"));

console.log(
  `Знак: ${Object.keys(svgs).length} SVG в public/brand, ${raster.length} растровых иконок и Open Graph в public/`,
);
