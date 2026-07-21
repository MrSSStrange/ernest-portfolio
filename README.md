# Ernest Muzafarov — Android Developer Portfolio

Персональное портфолио Android-разработчика с акцентом на Kotlin, Jetpack Compose, Android SDK и продуктовый подход к мобильным интерфейсам.

[Открыть сайт](https://ernestmuzafarov.tech) · [GitHub](https://github.com/MrSSStrange) · [LinkedIn](https://www.linkedin.com/in/ernest-muzafarov-919a323a2/)

## О проекте

Сайт рассказывает о моём опыте технической поддержки медицинского ПО и переходе в Android-разработку. Интерфейс построен вокруг Android-визуального языка: Kotlin-код, мобильные экраны, карточки навыков, roadmap и концепты будущих приложений.

## Возможности

- адаптивный интерфейс для компьютеров и мобильных устройств;
- анимированный hero-блок с Android-мокапом;
- секции «Обо мне», «Навыки», «Проекты» и «Контакты»;
- стек Kotlin, Jetpack Compose и Android SDK;
- мобильное меню и плавное появление блоков при прокрутке;
- поддержка `prefers-reduced-motion`;
- русскоязычные SEO-метаданные и favicon;
- рабочая контактная форма с отправкой сообщений на email через FormSubmit;
- статический экспорт для GitHub Pages;
- совместимость с Vinext/OpenAI Sites.

## Технологии

| Область | Технологии |
| --- | --- |
| Интерфейс | React 19, TypeScript, HTML, CSS |
| Фреймворк | Next.js 16 |
| Основная сборка | Vinext, Vite, Cloudflare Workers |
| Статическая публикация | Next.js Static Export, GitHub Pages |
| Дизайн-концепция | Kotlin, Jetpack Compose, Material Design |

## Структура проекта

```text
.
├── app/
│   ├── layout.tsx
│   ├── page.tsx
│   └── globals.css
├── public/
│   ├── favicon.svg
│   ├── CNAME
│   └── .nojekyll
├── scripts/
├── tests/
├── worker/
├── next.config.ts
├── vite.config.ts
├── package.json
└── README.md
```

Файлы `index.html`, `_next/`, `404.html` и служебные `.txt` в корне — готовый статический экспорт, который обслуживается GitHub Pages.

## Локальный запуск

Требуется Node.js `22.13.0` или новее.

```bash
git clone https://github.com/MrSSStrange/ernest-portfolio.git
cd ernest-portfolio
npm ci
npm run dev
```

После запуска откройте адрес, указанный Vite в терминале.

## Проверки и сборка

```bash
npm run lint
npm run build
npm test
```

Команда `npm run build` создаёт Vinext-артефакт для OpenAI Sites. Для статического экспорта GitHub Pages и синхронизации готовых файлов с корнем репозитория используется:

```bash
npm run export:pages
```

Скрипты основной Sites-сборки рассчитаны на Linux и используют `flock` и GNU `timeout`.

## Контактная форма

Форма отправляет сообщения через AJAX на FormSubmit и остаётся на текущей странице. Для защиты от автоматического спама добавлено honeypot-поле. При первом подключении адреса FormSubmit отправляет владельцу одноразовое письмо активации; после подтверждения новые сообщения приходят на `mega.ernest13@gmail.com`.

Карточки проектов на сайте показывают концепты и направления дальнейшей разработки.

## Автор

Ernest Muzafarov — Android Developer.

- GitHub: [MrSSStrange](https://github.com/MrSSStrange)
- Email: [mega.ernest13@gmail.com](mailto:mega.ernest13@gmail.com)
- LinkedIn: [Ernest Muzafarov](https://www.linkedin.com/in/ernest-muzafarov-919a323a2/)
- Сайт: [ernestmuzafarov.tech](https://ernestmuzafarov.tech)
