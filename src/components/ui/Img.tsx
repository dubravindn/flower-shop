import Image, { type ImageProps } from "next/image";

/**
 * Обёртка над next/image с учётом basePath.
 *
 * На GitHub Pages сайт лежит не в корне домена, а в /flower-shop. Для
 * неоптимизированных изображений (а на Pages они именно такие) next/image
 * префикс сам не добавляет, поэтому подставляем его здесь — в одном месте
 * вместо десятка вызовов по компонентам.
 *
 * На обычном хостинге NEXT_PUBLIC_BASE_PATH пустой, и путь не меняется.
 */
const BASE = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

export function assetPath(src: string): string {
  return src.startsWith("/") ? `${BASE}${src}` : src;
}

// alt указан явно, а не прокинут через ...rest, — иначе правило
// jsx-a11y/alt-text не видит его и ругается на обёртку.
export function Img({ src, alt, ...rest }: ImageProps) {
  return (
    <Image {...rest} alt={alt} src={typeof src === "string" ? assetPath(src) : src} />
  );
}
