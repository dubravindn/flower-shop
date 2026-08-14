# Цветочная База Дубравиных

Сайт цветочной базы: розница, опт и доставка по Кирову.

Стек: Next.js 16 (App Router), React 19, TypeScript, Tailwind CSS 4.

## Запуск

```bash
npm install
npm run dev          # http://localhost:3000
```

Проверки:

```bash
npm run lint         # ESLint
npx tsc --noEmit     # типы
npm run build        # production-сборка
npm start            # запуск собранного проекта
```

## Где что лежит

```
src/
  app/               маршруты App Router
    page.tsx         главная
    brand-preview/   витрина дизайн-системы, только в development
  components/
    brand/           логотип, монограмма, FoundersSection
    layout/          шапка, мобильное меню, подвал, нижняя панель
    home/            блоки главной страницы
    product/         карточка товара
    ui/              кнопки, поля, бейджи, состояния, секции
  config/            company.ts, navigation.ts, founders.ts
  content/           тексты и каталог
  lib/               форматирование, утилиты
  types/             модели данных
legacy/              прежний одностраничный сайт и оригиналы фотографий
founders-source/     кадрирования фото владельцев вне публичной раздачи
scripts/             подготовка изображений
```

## Правка контента

Компоненты трогать не нужно — всё меняется в данных:

| Что | Файл |
| --- | --- |
| Телефон, адреса, режим работы, соцсети | `src/config/company.ts` |
| Меню и ссылки подвала | `src/config/navigation.ts` |
| Тексты главной | `src/content/home.ts` |
| Каталог, категории, поводы, цены | `src/content/catalog.ts` |
| Отзывы | `src/content/reviews.ts` |
| Блок владельцев | `src/config/founders.ts` |

## Изображения

```bash
node scripts/prepare-images.mjs
```

Скрипт берёт оригиналы из `legacy/images`, приводит их к 4:5, снимает
метаданные и кладёт в `public/images/works`. Он же готовит кадрирования
владельцев и фирменные заглушки. Оригиналы не изменяются.

WebP и AVIF отдаёт `next/image` на лету — см. `next.config.ts`.

## Фотографии владельцев

Сейчас на сайте фирменные заглушки. Чтобы подключить съёмку:

1. положить в `public/images/founders/` пять файлов: `founders-16x9.jpg`,
   `founders-4x5.jpg`, `founders-3x2.jpg`, `founders-1x1.jpg`, `founders-og.jpg`;
2. в `src/config/founders.ts` поставить `useRealPhotos: true`.

Почему присланный кадр не подошёл — в `founders-source/README.md`.

## Переменные окружения

Скопировать `.env.example` в `.env.local` и заполнить. Токен «МойСклад»
именуется без префикса `NEXT_PUBLIC_`, поэтому в браузер не попадает.

## Что ещё не сделано

См. `PROGRESS.md`.
