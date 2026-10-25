<h1 align="center">Ernest Muzafarov — Portfolio</h1>

<p align="center">
  Personal portfolio website: a live particle neural network, a particle avatar<br />
  and machine learning demos that run in your browser.
</p>

<p align="center">
  <a href="https://ernestmuzafarov.tech"><img src="https://img.shields.io/badge/Live-ernestmuzafarov.tech-05070A?style=for-the-badge&logo=googlechrome&logoColor=9FC3D4" alt="Live site" /></a>
  <img src="https://img.shields.io/badge/three.js-r128-05070A?style=for-the-badge&logo=threedotjs&logoColor=white" alt="three.js r128" />
  <img src="https://img.shields.io/badge/Vanilla-JavaScript-05070A?style=for-the-badge&logo=javascript&logoColor=F7DF1E" alt="Vanilla JavaScript" />
  <img src="https://img.shields.io/badge/No%20build-step-05070A?style=for-the-badge" alt="No build step" />
</p>

<p align="center">
  <a href="https://ernestmuzafarov.tech"><img src="docs/preview.jpg" alt="Hero screen: a particle neural network behind the name" width="900" /></a>
</p>

<p align="center">
  <a href="#english">English</a> · <a href="#русский">Русский</a>
</p>

---

## English

### Features

- **Live neural network on the hero.** 150 neurons linked to their nearest neighbours, with signals travelling along the links. Hover a neuron to fire it, click to send a wave through the network. The counters (neurons, connections, activations) are real numbers taken from the scene.
- **One 3D scene for the whole page.** About 14,000 particles reshape for each section: neural network → orbit → loss landscape → spiral galaxy → the name, which spells a link's label when you hover it.
- **Particle avatar** instead of a photo: a silhouette with a small network inside, particles scatter away from the cursor and a scan line passes over it.
- **AI lab**, all computed in the browser:
  - *How a neuron learns:* place points of two classes and train a single neuron (logistic regression) or a network with a hidden layer of 8 neurons using gradient descent. The "Circle" preset shows why one neuron is not enough.
  - *Gradient descent:* pick a start point on a loss surface and watch the steps. Push the learning rate too high and the descent diverges; on the "Hills" surface it gets stuck in a local minimum.
  - *How an LLM picks a word:* next-token probabilities after softmax with temperature, sampling one word or twenty at a time. The probabilities are illustrative and say so on the page.
- **Two languages** (RU / EN) from a single text object, auto-detected from the browser and remembered.
- **Details:** preloader, custom cursor, magnetic buttons, letters that react to the cursor, scroll-driven marquee, smooth scroll, optional ambient sound synthesised with Web Audio (off by default).

### Performance and accessibility

- Animations pause when their part of the page is off screen.
- Fewer particles and a lower pixel ratio on phones.
- `prefers-reduced-motion`: no smooth scroll, no entrance animations, static frames instead of animation.
- If three.js or Lenis fails to load from the CDN, the site still works without the 3D scene and with native scrolling.

### Tech stack

| Part | Technology |
| --- | --- |
| Markup and styles | HTML, CSS (custom properties, `backdrop-filter`, `clip-path`) |
| 3D scene | three.js r128: custom GLSL shaders for points, chromatic aberration post-processing |
| Demos and avatar | Canvas 2D, plain JavaScript |
| Smooth scroll | Lenis 1.1 |
| Sound | Web Audio API |
| Hosting | GitHub Pages with a custom domain |

### Project structure

```text
index.html      page markup; every text node has a data-i18n key
style.css       styles
script.js       settings at the top, then all the code
favicon.svg     tab icon
docs/           README images
CNAME           custom domain for GitHub Pages
```

### Editing content

Everything you are likely to change sits at the top of `script.js`:

- `CONTACTS` — Telegram, GitHub, LinkedIn;
- `LEARNING` — learning progress. Each step has `status: 'done' | 'current' | 'todo'`; the percentage is calculated automatically, or set `progress: 40` by hand;
- `I18N` — all texts in Russian and English. Wrap a word in `*asterisks*` to render it as an outlined accent.

### Hosting

The site is hosted on GitHub Pages with a custom domain: [ernestmuzafarov.tech](https://ernestmuzafarov.tech).

---

## Русский

Личный сайт-портфолио.

**Что на сайте:**

- **Живая нейросеть на первом экране:** 150 нейронов со связями, по которым бегут сигналы. Нейрон срабатывает от наведения курсора, клик запускает волну по сети. Счётчики показывают настоящие числа из сцены.
- **Единая 3D-сцена:** около 14 000 частиц перестраиваются под каждый раздел — нейросеть, орбита, рельеф функции ошибки, галактика и имя. В контактах при наведении на ссылку частицы складываются в её название.
- **Нейро-аватар из частиц** вместо фото.
- **ИИ-лаборатория** работает прямо в браузере:
  - обучение нейрона и сети со скрытым слоем;
  - градиентный спуск по поверхности ошибки;
  - выбор следующего слова в LLM с температурой.
- **Два языка** (RU / EN), адаптив под телефоны, учёт `prefers-reduced-motion`.

**Где менять:** всё в начале `script.js`:

- `CONTACTS` — контакты;
- `LEARNING` — прогресс обучения;
- `I18N` — тексты на двух языках.

**Хостинг:** GitHub Pages, домен [ernestmuzafarov.tech](https://ernestmuzafarov.tech).

---

<p align="center">
  <a href="https://ernestmuzafarov.tech">ernestmuzafarov.tech</a> ·
  <a href="https://t.me/ErnestKzn">Telegram</a> ·
  <a href="https://www.linkedin.com/in/ernest-muzafarov-919a323a2/">LinkedIn</a> ·
  <a href="https://github.com/MrSSStrange">GitHub</a>
</p>
