/**
 * Подготовка изображений для сайта.
 *
 *   node scripts/prepare-images.mjs
 *
 * Что делает:
 *   1. Берёт фотографии букетов из legacy/images (оригиналы не трогает)
 *      и кладёт оптимизированные копии в public/images/works.
 *   2. Режет фотографию владельцев на пять технических кадрирований.
 *   3. Рисует нейтральные фирменные заглушки тех же пропорций —
 *      они используются на сайте, пока нет чистой студийной съёмки.
 *
 * Все производные файлы сохраняются без EXIF и геометок.
 * WebP и AVIF на раздаче делает next/image (см. next.config.ts),
 * здесь дополнительно кладём .webp для прямого использования.
 */

import sharp from "sharp";
import { mkdir, readdir, access } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const LEGACY = path.join(root, "legacy/images");
const WORKS = path.join(root, "public/images/works");
const FOUNDERS = path.join(root, "public/images/founders");
const SOURCE_PHOTO = "/Users/dmitrijdubravin/Downloads/IMG_6902.PNG";

/** Общие настройки: без метаданных, приличное качество. */
const JPEG = { quality: 78, mozjpeg: true };
const WEBP = { quality: 76 };

async function exists(p) {
  try {
    await access(p);
    return true;
  } catch {
    return false;
  }
}

/* ---------------------------------------------------------------- букеты */

async function prepareWorks() {
  await mkdir(WORKS, { recursive: true });
  const files = (await readdir(LEGACY)).filter((f) => f.endsWith(".jpg"));
  let done = 0;

  for (const file of files) {
    const src = path.join(LEGACY, file);
    const base = file.replace(/\.jpg$/, "");

    // 4:5 — единое соотношение для карточек товара
    await sharp(src)
      .rotate()
      .resize(1000, 1250, { fit: "cover", position: "attention" })
      .jpeg(JPEG)
      .toFile(path.join(WORKS, `${base}.jpg`));

    await sharp(src)
      .rotate()
      .resize(1000, 1250, { fit: "cover", position: "attention" })
      .webp(WEBP)
      .toFile(path.join(WORKS, `${base}.webp`));

    done += 1;
  }
  console.log(`Букеты: подготовлено ${done} фото в public/images/works`);
}

/* -------------------------------------------------------------- владельцы */

/**
 * Кадрирования владельцев.
 *
 * Исходник — вертикальный снимок 1320×2868. Замеры по нему:
 *   y  750–1150  лица
 *   y 1130–1180  линия плеч
 *   y 1255–1405  надпись на футболке
 *   y 2280–2450  вшитый рекламный баннер стороннего мероприятия
 *
 * Отсюда жёсткое ограничение: нижняя граница любого кадра — y ≤ 1250.
 * Поэтому кадр «по пояс» из этого снимка получить нельзя: пояс на y ≈ 2050,
 * а всё ниже 1255 содержит надпись. Возможны только широкие форматы —
 * в вертикальный 4:5 и квадрат 1:1 два лица без надписи не помещаются.
 */
const FOUNDER_CROPS = [
  {
    name: "founders-3x2",
    region: { left: 240, top: 690, width: 840, height: 560 },
    w: 1200,
    h: 800,
  },
  {
    name: "founders-16x9",
    region: { left: 225, top: 750, width: 889, height: 500 },
    w: 1280,
    h: 720,
  },
  {
    name: "founders-og",
    region: { left: 210, top: 760, width: 933, height: 490 },
    w: 1200,
    h: 630,
  },
];

/**
 * Студийная обработка фона.
 *
 * Братья остаются резкими, всё остальное уходит в расфокус — как при съёмке
 * на открытой диафрагме. Маска субъектов задана в координатах оригинала:
 * два эллипса по головам и полоса по линии плеч, растушёванные на 45 px,
 * поэтому переход читается как глубина резкости, а не как вырезанный контур.
 *
 * Лица, фигуры и цвет кожи не затрагиваются: обработка применяется только
 * к фону через инвертированную маску.
 */
async function studioBackdrop() {
  const { width: W, height: H } = await sharp(SOURCE_PHOTO).metadata();

  const subjectMask = Buffer.from(`<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}">
    <defs><filter id="feather" x="-30%" y="-30%" width="160%" height="160%">
      <feGaussianBlur stdDeviation="45"/></filter></defs>
    <g filter="url(#feather)" fill="#fff">
      <ellipse cx="555" cy="1050" rx="265" ry="300"/>
      <ellipse cx="900" cy="1010" rx="230" ry="295"/>
      <rect x="150" y="1120" width="1020" height="400" rx="40"/>
    </g></svg>`);

  // Лёгкая тёплая заливка гасит синие и лиловые блики клубного света
  const tint = Buffer.from(`<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}">
    <rect width="${W}" height="${H}" fill="#332826" opacity="0.28"/></svg>`);

  const subject = await sharp(SOURCE_PHOTO)
    .composite([{ input: subjectMask, blend: "dest-in" }])
    .png()
    .toBuffer();

  const blurred = await sharp(SOURCE_PHOTO)
    .blur(26)
    .modulate({ brightness: 1.05, saturation: 0.3 })
    .toBuffer();

  const backdrop = await sharp(blurred)
    .composite([{ input: tint }])
    .png()
    .toBuffer();

  return sharp(backdrop).composite([{ input: subject }]).png().toBuffer();
}

async function prepareFounders() {
  await mkdir(FOUNDERS, { recursive: true });

  if (!(await exists(SOURCE_PHOTO))) {
    console.log("Владельцы: исходник не найден, кадрирования пропущены");
    return;
  }

  const processed = await studioBackdrop();

  for (const crop of FOUNDER_CROPS) {
    await sharp(processed)
      .extract(crop.region)
      .resize(crop.w, crop.h)
      // Подъём яркости и подрезка после увеличения.
      // Лица, пропорции и цвет кожи не меняются.
      .modulate({ brightness: 1.05 })
      .sharpen({ sigma: 0.6 })
      .jpeg(JPEG)
      .toFile(path.join(FOUNDERS, `${crop.name}.jpg`));

    await sharp(path.join(FOUNDERS, `${crop.name}.jpg`))
      .webp(WEBP)
      .toFile(path.join(FOUNDERS, `${crop.name}.webp`));
  }

  console.log(
    `Владельцы: ${FOUNDER_CROPS.length} кадра (3:2, 16:9, 1200×630) в public/images/founders`,
  );
}

/* -------------------------------------------------------------- заглушки */

/**
 * Нейтральная фирменная заглушка: красное поле, тонкая шампань-рамка,
 * монограмма ЦБД и подпись. Никаких посторонних людей.
 */
function placeholderSvg(w, h, caption) {
  const unit = Math.min(w, h);
  const mono = Math.round(unit * 0.17);
  const label = Math.round(unit * 0.038);
  const inset = Math.round(unit * 0.05);

  return Buffer.from(`
<svg xmlns="http://www.w3.org/2000/svg" width="${w}" height="${h}" viewBox="0 0 ${w} ${h}">
  <rect width="${w}" height="${h}" fill="#B10F24"/>
  <rect x="${inset}" y="${inset}" width="${w - inset * 2}" height="${h - inset * 2}"
        fill="none" stroke="#C9AA6A" stroke-width="${Math.max(1, Math.round(unit * 0.004))}" opacity="0.75"/>
  <text x="50%" y="${h / 2}" text-anchor="middle" dominant-baseline="middle"
        font-family="Times New Roman, serif" font-size="${mono}" fill="#D4BE9D"
        letter-spacing="${Math.round(mono * 0.08)}">ЦБД</text>
  <text x="50%" y="${h / 2 + mono * 0.85}" text-anchor="middle" dominant-baseline="middle"
        font-family="Helvetica, Arial, sans-serif" font-size="${label}" fill="#C8AF8B"
        letter-spacing="${Math.round(label * 0.18)}">${caption}</text>
</svg>`);
}

const PLACEHOLDERS = [
  { name: "placeholder-16x9", w: 1920, h: 1080, caption: "ФОТО ВЛАДЕЛЬЦЕВ 16:9" },
  { name: "placeholder-4x5", w: 1080, h: 1350, caption: "ФОТО ВЛАДЕЛЬЦЕВ 4:5" },
  { name: "placeholder-3x2", w: 1500, h: 1000, caption: "ФОТО ВЛАДЕЛЬЦЕВ 3:2" },
  { name: "placeholder-1x1", w: 1000, h: 1000, caption: "ФОТО ВЛАДЕЛЬЦЕВ 1:1" },
  { name: "placeholder-og", w: 1200, h: 630, caption: "OPEN GRAPH 1200×630" },
];

async function preparePlaceholders() {
  await mkdir(FOUNDERS, { recursive: true });

  for (const p of PLACEHOLDERS) {
    const svg = placeholderSvg(p.w, p.h, p.caption);
    await sharp(svg).jpeg(JPEG).toFile(path.join(FOUNDERS, `${p.name}.jpg`));
    await sharp(svg).webp(WEBP).toFile(path.join(FOUNDERS, `${p.name}.webp`));
  }
  console.log(`Заглушки: ${PLACEHOLDERS.length} вариантов в public/images/founders`);
}

/* ------------------------------------------------------------------ запуск */

await prepareWorks();
await prepareFounders();
await preparePlaceholders();
console.log("Готово.");
