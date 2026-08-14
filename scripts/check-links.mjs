/**
 * Проверка внутренних ссылок по статической выгрузке.
 *
 *   GITHUB_PAGES=true npm run build && node scripts/check-links.mjs
 *
 * Скрипт обходит все .html в out/, собирает внутренние href и убеждается,
 * что для каждого есть файл. Падает с кодом 1, если найдена битая ссылка, —
 * поэтому его можно ставить в CI перед публикацией.
 */

import { readdir, readFile, access } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const OUT = path.join(root, "out");
const BASE = "/flower-shop";

async function htmlFiles(dir) {
  const entries = await readdir(dir, { withFileTypes: true });
  const files = [];
  for (const entry of entries) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) files.push(...(await htmlFiles(full)));
    else if (entry.name.endsWith(".html")) files.push(full);
  }
  return files;
}

const exists = async (p) => {
  try {
    await access(p);
    return true;
  } catch {
    return false;
  }
};

/** Существует ли страница по этому пути в выгрузке. */
async function resolves(route) {
  if (route === "/" || route === "") return exists(path.join(OUT, "index.html"));
  const clean = route.replace(/\/$/, "");
  return (
    (await exists(path.join(OUT, `${clean}.html`))) ||
    (await exists(path.join(OUT, clean, "index.html"))) ||
    (await exists(path.join(OUT, clean)))
  );
}

const files = await htmlFiles(OUT);
const broken = [];
let checked = 0;

for (const file of files) {
  const html = await readFile(file, "utf8");
  const page = file.replace(OUT, "").replace(/index\.html$/, "") || "/";

  for (const match of html.matchAll(/href="([^"]+)"/g)) {
    let href = match[1];
    if (!href.startsWith("/")) continue;          // внешние и якоря пропускаем
    if (href.startsWith("//")) continue;
    href = href.split("#")[0].split("?")[0];
    if (!href) continue;
    if (href.startsWith(`${BASE}/_next/`)) continue;
    if (/\.(jpg|png|svg|webp|avif|ico|css|js|txt|xml|woff2?)$/.test(href)) continue;

    const route = href.startsWith(BASE) ? href.slice(BASE.length) || "/" : href;
    checked += 1;

    if (!(await resolves(route))) {
      broken.push({ page, href });
    }
  }
}

console.log(`Проверено внутренних ссылок: ${checked} на ${files.length} страницах`);

if (broken.length) {
  console.error(`\nБитые ссылки (${broken.length}):`);
  for (const item of broken) console.error(`  ${item.page} → ${item.href}`);
  process.exit(1);
}

console.log("Битых внутренних ссылок нет.");
