/* =====================================================================
   НАСТРОЙКИ САЙТА — всё, что нужно менять, находится в этом блоке:
   1. CONTACTS — контакты
   2. LEARNING — прогресс обучения
   3. I18N     — все тексты сайта на русском и английском
   Ниже блока — код, который трогать не нужно.
   ===================================================================== */

/* ---------- 1. Контакты ---------- */
const CONTACTS = {
  telegram: 'ErnestKzn', // без @
  github: 'https://github.com/MrSSStrange',
  linkedin: 'https://www.linkedin.com/in/ernest-muzafarov-919a323a2/',
};

/* ---------- 2. Прогресс обучения ----------
   status: 'done' — пройдено, 'current' — изучаю сейчас, 'todo' — впереди.
   Процент на полоске считается сам: доля пунктов со статусом 'done'.
   Чтобы задать процент вручную, добавьте поле progress, например: progress: 40 */
const LEARNING = [
  {
    name: 'Python',
    steps: [
      { ru: 'Синтаксис, типы данных, условия и циклы', en: 'Syntax, data types, conditions and loops', status: 'done' },
      { ru: 'Функции, модули, работа с файлами', en: 'Functions, modules, working with files', status: 'current' },
      { ru: 'ООП и обработка ошибок', en: 'OOP and error handling', status: 'todo' },
      { ru: 'NumPy и pandas', en: 'NumPy and pandas', status: 'todo' },
    ],
  },
  {
    name: 'SQL',
    steps: [
      { ru: 'SELECT, WHERE, ORDER BY', en: 'SELECT, WHERE, ORDER BY', status: 'done' },
      { ru: 'JOIN между таблицами', en: 'JOINs across tables', status: 'done' },
      { ru: 'GROUP BY и агрегатные функции', en: 'GROUP BY and aggregates', status: 'current' },
      { ru: 'Подзапросы и оконные функции', en: 'Subqueries and window functions', status: 'todo' },
    ],
  },
  {
    name: { ru: 'Основы ML', en: 'ML fundamentals' },
    steps: [
      { ru: 'Что такое модель, обучение и данные', en: 'What a model, training and data are', status: 'current' },
      { ru: 'Линейная и логистическая регрессия', en: 'Linear and logistic regression', status: 'todo' },
      { ru: 'Метрики качества и переобучение', en: 'Metrics and overfitting', status: 'todo' },
      { ru: 'scikit-learn на практике', en: 'scikit-learn in practice', status: 'todo' },
    ],
  },
  {
    name: 'LLM',
    steps: [
      { ru: 'Промптинг и ограничения моделей', en: 'Prompting and model limitations', status: 'done' },
      { ru: 'Работа с LLM через API', en: 'Using LLMs via API', status: 'current' },
      { ru: 'RAG: ответы по своим документам', en: 'RAG: answering from your own documents', status: 'todo' },
      { ru: 'Оценка качества ответов', en: 'Evaluating answer quality', status: 'todo' },
    ],
  },
];

/* ---------- 3. Тексты ----------
   Ключи совпадают с атрибутами data-i18n в index.html.
   Меняете текст — меняйте его в обоих языках. */
const I18N = {
  ru: {
    meta: {
      title: 'Эрнест Музафаров — руководитель техподдержки, путь в AI/ML',
      description:
        'Руководитель технической поддержки. Изучаю Python, машинное обучение и LLM, чтобы перейти в AI/ML-разработку.',
    },
    header: { logo: 'Эрнест Музафаров', sound: 'Звук' },
    preloader: { label: 'Загрузка сцены' },
    scenes: ['Вступление', 'Направление', 'Обо мне', 'Лаборатория', 'Идеи', 'Контакты'],
    statement: {
      label: '02 — направление',
      title: 'Из технической поддержки — *в AI/ML*',
      text: 'Каждый день разбираю реальные инциденты и процессы клиентов. Теперь учусь решать такие задачи с помощью машинного обучения.',
    },
    marquee: ['Техподдержка', 'Внедрения', 'Работа с инцидентами', 'Python', 'SQL', 'Machine learning', 'LLM'],
    nav: { about: 'Обо мне', playground: 'ИИ-лаб', ideas: 'Идеи', contacts: 'Контакты' },
    hero: {
      eyebrow: 'Портфолио — 2026',
      status: 'Изучаю Python, ML и LLM',
      nameFirst: 'Эрнест',
      nameLast: 'Музафаров',
      tagline: 'Эрнест — руководитель технической поддержки. Иду в AI/ML-разработку.',
      ctaAbout: 'Обо мне',
      ctaContact: 'Связаться',
      scroll: 'Листайте',
      headLabel: 'нейро-голова · ведите курсором',
      hud: {
        neurons: 'нейронов',
        links: 'связей',
        fires: 'срабатываний',
        hint: 'Наведите на нейрон или кликните по сети',
      },
    },
    about: {
      label: 'Обо мне',
      title: 'Кто *я*',
      avatarNote: 'нейро-аватар · наведите курсор',
      p1: 'С января 2025 руковожу технической поддержкой информационной системы.',
      p2: 'Чем занимаюсь: руковожу командой поддержки, веду внедрения системы у клиентов, собираю требования и ставлю задачи разработчикам.',
      p3: 'Сейчас целенаправленно изучаю Python, машинное обучение и LLM, чтобы перейти в разработку AI/ML-решений.',
    },
    strengths: {
      title: 'Сильные стороны',
      items: [
        {
          title: 'Понимание процессов клиентов',
          text: 'Разбираюсь, как клиенты работают с системой каждый день, и вижу, где она помогает, а где мешает.',
        },
        {
          title: 'Продакшн-инциденты',
          text: 'Разбираю сбои в работающей системе: локализую проблему, оцениваю влияние на клиентов, довожу до исправления вместе с разработкой.',
        },
        {
          title: 'От потребности к задаче',
          text: 'Перевожу запросы клиентов и бизнеса в понятные технические задачи для разработчиков.',
        },
        {
          title: 'Управление командой',
          text: 'Руковожу командой поддержки: распределяю нагрузку, расставляю приоритеты, выстраиваю процессы.',
        },
      ],
    },
    learning: {
      title: 'Сейчас изучаю',
      note: 'Обновляю по мере продвижения',
      done: 'пройдено',
      current: 'в процессе',
      todo: 'впереди',
    },
    playground: {
      label: 'Лаборатория',
      title: 'Лаборатория *ИИ*',
      intro:
        'Три небольших интерактива о том, в чём я сейчас разбираюсь: как учится нейрон, как работает градиентный спуск и как языковая модель выбирает следующее слово. Всё считается прямо в браузере.',
      tabNeuron: 'Как учится нейрон',
      tabGd: 'Градиентный спуск',
      tabLlm: 'Как LLM выбирает слово',
      neuronIntro:
        'Небольшая демонстрация того, в чём я сейчас разбираюсь. Расставьте точки двух классов и нажмите «Обучить»: модель подбирает веса градиентным спуском, а фон показывает, как она делит плоскость.',
      empty: 'Кликайте по полю, чтобы добавить точки,\nили выберите готовый набор справа',
      classLabel: 'Класс новой точки',
      classA: 'Класс A',
      classB: 'Класс B',
      modelLabel: 'Модель',
      modelNeuron: '1 нейрон',
      modelMlp: 'Скрытый слой',
      train: 'Обучить',
      pause: 'Пауза',
      presetLine: 'Две группы',
      presetCircle: 'Круг',
      clear: 'Очистить',
      epoch: 'эпоха',
      loss: 'ошибка',
      accuracy: 'точность',
      tip: 'Один нейрон умеет проводить только прямую границу. Выберите набор «Круг»: с одним нейроном точность упрётся в потолок, а со скрытым слоем из 8 нейронов модель справится. Поэтому нейросети и делают многослойными.',
    },
    contacts: {
      label: 'Контакты',
      ctaA: 'Напишите',
      ctaB: 'мне',
      hint: 'Наведите на ссылку — частицы сложатся в её название',
      intro: 'Буду рад обсудить вакансии и задачи в AI/ML. Быстрее всего отвечаю в Telegram.',
    },
    gd: {
      intro:
        'Так модель ищет лучшие веса: считает, в какую сторону ошибка убывает быстрее всего, и делает шаг туда. Цвет поля — величина ошибки, чем темнее, тем меньше. Кликните по полю, чтобы выбрать стартовую точку.',
      hint: 'клик — новая стартовая точка',
      surface: 'Поверхность ошибки',
      bowl: 'Чаша',
      hills: 'Холмы',
      lr: 'Шаг обучения (learning rate)',
      run: 'Запустить',
      pause: 'Пауза',
      reset: 'Сначала',
      step: 'шаг',
      loss: 'ошибка',
      status: 'статус',
      statusIdle: 'готов',
      statusRunning: 'спуск…',
      statusConverged: 'сошлось',
      statusDiverged: 'разошлось',
      statusLimit: 'лимит шагов',
      tip: 'Попробуйте на «Чаше» поднять шаг выше 0.33: спуск начнёт раскачиваться и разойдётся. На «Холмах» видно другую проблему: из некоторых точек модель застревает в локальном минимуме и не находит самый глубокий.',
    },
    llm: {
      intro:
        'Языковая модель пишет текст по одному токену: на каждом шаге оценивает вероятности всех вариантов продолжения и выбирает один. Температура управляет тем, насколько смело она выбирает.',
      tokensLabel: 'Промпт, разбитый на токены',
      nextLabel: 'Вероятности следующего токена',
      note: 'Вероятности здесь условные и подобраны для наглядности. Разбиение на токены тоже примерное: у каждой модели свой токенизатор.',
      temp: 'Температура',
      tempLow: 'Низкая: модель почти всегда берёт самое вероятное слово. Ответы предсказуемые, но однообразные.',
      tempMid: 'Средняя: в основном вероятные слова, но с разнообразием. Обычный режим для чата.',
      tempHigh: 'Высокая: распределение выравнивается, и всё чаще проскакивают странные слова (они отмечены розовым).',
      sample: 'Выбрать слово',
      sample20: '×20',
      reset: 'Сбросить',
      samples: 'выборок',
      topShare: 'самое вероятное',
      prompts: [
        {
          label: 'Про Python',
          tokens: ['Для', ' анализа', ' данных', ' в', ' Py', 'thon', ' исполь', 'зуют'],
          options: [['pandas', 3.0], ['NumPy', 2.2], ['Jupyter', 1.9], ['matplotlib', 1.6], ['SQL', 1.3], ['scikit-learn', 1.1], ['Excel', 0.6], ['заклинания', -1.6, true]],
        },
        {
          label: 'Обращение в поддержку',
          tokens: ['Клиент', ' не', ' может', ' войти', ' в', ' систему', ',', ' потому', ' что'],
          options: [['истёк', 2.6], ['забыли', 2.4], ['сервер', 2.1], ['неверный', 1.9], ['нет', 1.5], ['обновление', 1.1], ['сломался', 0.7], ['Луна', -1.8, true]],
        },
        {
          label: 'Про RAG',
          tokens: ['Чтобы', ' модель', ' отвечала', ' по', ' документ', 'ам', ',', ' исполь', 'зуют'],
          options: [['RAG', 3.0], ['поиск', 2.0], ['эмбеддинги', 1.7], ['дообучение', 1.5], ['базу', 1.4], ['промпт', 1.0], ['контекст', 0.8], ['магию', -1.5, true]],
        },
      ],
    },
    ideas: {
      label: 'Идеи',
      title: 'Где ИИ может помочь *технической поддержке*',
      intro:
        'Задачи, которые я вижу изнутри работы поддержки и хочу научиться решать с помощью ИИ. Это направления для изучения, а не готовые проекты.',
      items: [
        {
          title: 'Разбор обращений в поддержку',
          text: 'Автоматически определять тему и срочность обращения, чтобы критичные инциденты не терялись в общей очереди.',
          tags: ['NLP', 'классификация текста'],
        },
        {
          title: 'Ассистент по базе знаний',
          text: 'Отвечать на вопросы пользователей по инструкциям системы со ссылкой на источник, а не «из головы» модели.',
          tags: ['LLM', 'RAG', 'эмбеддинги'],
        },
        {
          title: 'Поиск похожих инцидентов',
          text: 'Находить в истории обращения, похожие на новое, вместе с решением, которое тогда сработало.',
          tags: ['эмбеддинги', 'векторный поиск'],
        },
        {
          title: 'Саммари обращений и созвонов',
          text: 'Сжимать длинную переписку или запись разговора с клиентом в короткую выжимку для разработчиков.',
          tags: ['распознавание речи', 'LLM'],
        },
      ],
      noteLabel: 'Важно',
      note: 'ИИ здесь — помощник, а не замена людям: финальное решение остаётся за человеком. А данные клиентов требуют защиты и соблюдения законодательства о персональных данных.',
    },
    footer: { text: 'Эрнест Музафаров · техподдержка → AI/ML', credit: '3D-модель головы: Lee Perry-Smith, CC BY 3.0' },
  },

  en: {
    meta: {
      title: 'Ernest Muzafarov — support lead moving into AI/ML',
      description:
        'Head of technical support. Learning Python, machine learning and LLMs to move into AI/ML development.',
    },
    header: { logo: 'Ernest Muzafarov', sound: 'Sound' },
    preloader: { label: 'Loading scene' },
    scenes: ['Intro', 'Direction', 'About', 'Lab', 'Ideas', 'Contact'],
    statement: {
      label: '02 — direction',
      title: 'From technical support *to AI/ML*',
      text: 'Every day I deal with real incidents and client workflows. Now I am learning to solve problems like these with machine learning.',
    },
    marquee: ['Tech support', 'Rollouts', 'Incident management', 'Python', 'SQL', 'Machine learning', 'LLM'],
    nav: { about: 'About', playground: 'AI lab', ideas: 'Ideas', contacts: 'Contact' },
    hero: {
      eyebrow: 'Portfolio — 2026',
      status: 'Learning Python, ML & LLMs',
      nameFirst: 'Ernest',
      nameLast: 'Muzafarov',
      tagline: 'Ernest — Head of Technical Support. Moving into AI/ML development.',
      ctaAbout: 'About me',
      ctaContact: 'Get in touch',
      scroll: 'Scroll',
      headLabel: 'neural head · move your cursor',
      hud: {
        neurons: 'neurons',
        links: 'connections',
        fires: 'activations',
        hint: 'Hover a neuron or click the network',
      },
    },
    about: {
      label: 'About',
      title: 'Who *I am*',
      avatarNote: 'neural avatar · hover me',
      p1: 'Since January 2025, I have been leading technical support for an information system.',
      p2: 'What I do: I lead the support team, run system rollouts for clients, gather requirements and turn them into tasks for developers.',
      p3: 'I am now deliberately learning Python, machine learning and LLMs so I can move into building AI/ML solutions.',
    },
    strengths: {
      title: 'Strengths',
      items: [
        {
          title: 'Understanding client workflows',
          text: 'I know how clients use the system day to day and can see where it helps them and where it gets in the way.',
        },
        {
          title: 'Production incidents',
          text: 'I handle failures in a live system: isolate the problem, assess the impact on clients and see the fix through with developers.',
        },
        {
          title: 'From need to task',
          text: 'I translate requests from clients and the business into clear technical tasks for developers.',
        },
        {
          title: 'Team leadership',
          text: 'I lead the support team: balancing workload, setting priorities and shaping processes.',
        },
      ],
    },
    learning: {
      title: 'Currently learning',
      note: 'Updated as I progress',
      done: 'done',
      current: 'in progress',
      todo: 'up next',
    },
    playground: {
      label: 'Lab',
      title: 'The AI *lab*',
      intro:
        'Three small interactive demos of what I am working through: how a neuron learns, how gradient descent works and how a language model picks the next word. Everything runs right in your browser.',
      tabNeuron: 'How a neuron learns',
      tabGd: 'Gradient descent',
      tabLlm: 'How an LLM picks a word',
      neuronIntro:
        'A small demo of what I am working through right now. Place points of two classes and press “Train”: the model fits its weights with gradient descent, and the background shows how it splits the plane.',
      empty: 'Click the board to add points,\nor pick a preset on the right',
      classLabel: 'New point class',
      classA: 'Class A',
      classB: 'Class B',
      modelLabel: 'Model',
      modelNeuron: '1 neuron',
      modelMlp: 'Hidden layer',
      train: 'Train',
      pause: 'Pause',
      presetLine: 'Two clusters',
      presetCircle: 'Circle',
      clear: 'Clear',
      epoch: 'epoch',
      loss: 'loss',
      accuracy: 'accuracy',
      tip: 'A single neuron can only draw a straight boundary. Pick the “Circle” preset: one neuron hits an accuracy ceiling, while a hidden layer of 8 neurons solves it. That is why neural networks have layers.',
    },
    contacts: {
      label: 'Contact',
      ctaA: "Let's",
      ctaB: 'talk',
      hint: 'Hover a link and the particles spell its name',
      intro: 'Happy to discuss AI/ML roles and problems. Telegram is the fastest way to reach me.',
    },
    gd: {
      intro:
        'This is how a model searches for good weights: it works out which direction makes the error drop fastest and takes a step that way. The colour shows the error, darker means lower. Click the board to pick a starting point.',
      hint: 'click to set a new start point',
      surface: 'Loss surface',
      bowl: 'Bowl',
      hills: 'Hills',
      lr: 'Learning rate',
      run: 'Run',
      pause: 'Pause',
      reset: 'Restart',
      step: 'step',
      loss: 'loss',
      status: 'status',
      statusIdle: 'ready',
      statusRunning: 'descending…',
      statusConverged: 'converged',
      statusDiverged: 'diverged',
      statusLimit: 'step limit',
      tip: 'On the “Bowl”, push the learning rate above 0.33: the descent starts to oscillate and blows up. The “Hills” show a different problem: from some start points the model gets stuck in a local minimum and never finds the deepest one.',
    },
    llm: {
      intro:
        'A language model writes one token at a time: at each step it scores every possible continuation and picks one. Temperature controls how boldly it picks.',
      tokensLabel: 'Prompt split into tokens',
      nextLabel: 'Next-token probabilities',
      note: 'The probabilities here are illustrative, chosen to make the idea visible. The tokenization is approximate too: every model has its own tokenizer.',
      temp: 'Temperature',
      tempLow: 'Low: the model almost always takes the most likely word. Predictable, but repetitive.',
      tempMid: 'Medium: mostly likely words, with some variety. The usual setting for chat.',
      tempHigh: 'High: the distribution flattens and odd words slip through more often (they are marked pink).',
      sample: 'Pick a word',
      sample20: '×20',
      reset: 'Reset',
      samples: 'samples',
      topShare: 'top choice',
      prompts: [
        {
          label: 'About Python',
          tokens: ['For', ' data', ' analysis', ' in', ' Py', 'thon', ',', ' people', ' use'],
          options: [['pandas', 3.0], ['NumPy', 2.2], ['Jupyter', 1.9], ['matplotlib', 1.6], ['SQL', 1.3], ['scikit-learn', 1.1], ['Excel', 0.6], ['spells', -1.6, true]],
        },
        {
          label: 'Support ticket',
          tokens: ['The', ' client', ' cannot', ' log', ' in', ' because', ' the'],
          options: [['password', 2.6], ['session', 2.4], ['server', 2.1], ['account', 1.9], ['update', 1.5], ['network', 1.1], ['license', 0.7], ['moon', -1.8, true]],
        },
        {
          label: 'About RAG',
          tokens: ['To', ' answer', ' from', ' its', ' own', ' documents', ',', ' a', ' model', ' uses'],
          options: [['RAG', 3.0], ['search', 2.0], ['embeddings', 1.7], ['fine-tuning', 1.5], ['retrieval', 1.4], ['prompts', 1.0], ['context', 0.8], ['magic', -1.5, true]],
        },
      ],
    },
    ideas: {
      label: 'Ideas',
      title: 'Where AI can help *technical support*',
      intro:
        'Problems I see from inside support work and want to learn to solve with AI. These are directions to explore, not finished projects.',
      items: [
        {
          title: 'Support ticket triage',
          text: 'Detect the topic and urgency of each request automatically so critical incidents do not get lost in the general queue.',
          tags: ['NLP', 'text classification'],
        },
        {
          title: 'Knowledge base assistant',
          text: 'Answer user questions from the system manuals with a link to the source, rather than from the model’s memory.',
          tags: ['LLM', 'RAG', 'embeddings'],
        },
        {
          title: 'Similar incident search',
          text: 'Find past tickets similar to a new one, together with the fix that worked back then.',
          tags: ['embeddings', 'vector search'],
        },
        {
          title: 'Ticket and call summaries',
          text: 'Condense a long thread or a recorded call with a client into a short brief for developers.',
          tags: ['speech recognition', 'LLM'],
        },
      ],
      noteLabel: 'Important',
      note: 'AI here is an assistant, not a replacement for people: the final decision stays with a human. Client data needs protection and compliance with personal data laws.',
    },
    footer: { text: 'Ernest Muzafarov · tech support → AI/ML', credit: 'Head model: Lee Perry-Smith, CC BY 3.0' },
  },
};

/* =====================================================================
   Дальше — код сайта
   ===================================================================== */

const $ = (sel, root = document) => root.querySelector(sel);
const $$ = (sel, root = document) => [...root.querySelectorAll(sel)];
const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
const isTouch = window.matchMedia('(hover: none), (pointer: coarse)').matches;
const clamp = (v, a, b) => Math.min(b, Math.max(a, v));

const escapeHtml = (str) =>
  String(str).replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[c]);

// *слово* в тексте превращается в выделенное (контурное) слово
const rich = (str) => escapeHtml(str).replace(/\*(.+?)\*/g, '<em>$1</em>');

/* ---------- Язык ---------- */

let lang = 'ru';
const langListeners = [];

function t(key) {
  const find = (dict) => key.split('.').reduce((obj, part) => (obj == null ? obj : obj[part]), dict);
  return find(I18N[lang]) ?? find(I18N.ru) ?? key;
}

function tr(value) {
  return typeof value === 'string' ? value : value[lang] ?? value.ru;
}

function detectLang() {
  try {
    const saved = localStorage.getItem('lang');
    if (saved && I18N[saved]) return saved;
  } catch (e) {}
  return (navigator.language || 'ru').toLowerCase().startsWith('ru') ? 'ru' : 'en';
}

// Разбивает строку на буквы-спаны: нужны для появления и реакции на курсор
function splitLetters() {
  let index = 0;
  $$('[data-split]').forEach((el) => {
    el.innerHTML = [...t(el.dataset.i18n)]
      .map((ch) => `<span class="ch" style="--i:${index++}"><span class="ch__in">${escapeHtml(ch)}</span></span>`)
      .join('');
  });
}

function setLang(next) {
  lang = I18N[next] ? next : 'ru';
  try {
    localStorage.setItem('lang', lang);
  } catch (e) {}

  document.documentElement.lang = lang;
  document.title = t('meta.title');
  $('meta[name="description"]').setAttribute('content', t('meta.description'));

  $$('[data-i18n]').forEach((el) => {
    if (el.hasAttribute('data-split')) return;
    const value = t(el.dataset.i18n);
    if (value.includes('*')) el.innerHTML = rich(value);
    else el.textContent = value;
  });
  splitLetters();
  $$('[data-i18n-alt]').forEach((el) => {
    el.alt = t(el.dataset.i18nAlt);
  });
  $$('.lang__btn').forEach((btn) => {
    btn.classList.toggle('is-active', btn.dataset.lang === lang);
    btn.setAttribute('aria-pressed', btn.dataset.lang === lang);
  });

  renderStrengths();
  renderLearning();
  renderIdeas();
  langListeners.forEach((fn) => fn());
}

/* ---------- Появление при прокрутке ---------- */

const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      entry.target.classList.add('is-visible', 'revealed');
      revealObserver.unobserve(entry.target);
      const group = entry.target.closest('[data-reveal-group]');
      if (group) group.dataset.revealed = 'true';
    });
  },
  { threshold: 0.12, rootMargin: '0px 0px -40px 0px' }
);

// При смене языка блоки перерисовываются: уже показанные не прячем снова
function observeChildren(root, selector) {
  const revealed = root.dataset.revealed === 'true';
  $$(selector, root).forEach((el) => {
    if (revealed) el.classList.add('is-visible', 'revealed');
    else revealObserver.observe(el);
  });
}

/* ---------- Сильные стороны ---------- */

function renderStrengths() {
  const root = $('#strengths');
  root.dataset.revealGroup = '';
  root.innerHTML = t('strengths.items')
    .map(
      (item, i) => `
      <li class="row reveal" style="transition-delay:${i * 80}ms">
        <span class="row__num mono">0${i + 1}</span>
        <h4 class="row__title">${escapeHtml(item.title)}</h4>
        <p class="row__text">${escapeHtml(item.text)}</p>
        <span class="row__arrow">→</span>
      </li>`
    )
    .join('');
  observeChildren(root, '.row');
}

/* ---------- Прогресс обучения ---------- */

function skillProgress(skill) {
  if (typeof skill.progress === 'number') return Math.max(0, Math.min(100, Math.round(skill.progress)));
  const done = skill.steps.filter((s) => s.status === 'done').length;
  return skill.steps.length ? Math.round((done / skill.steps.length) * 100) : 0;
}

function renderLearning() {
  const root = $('#learning');
  root.dataset.revealGroup = '';
  root.innerHTML = LEARNING.map((skill, k) => {
    const pct = skillProgress(skill);
    const segs = skill.steps.map((s, i) => `<span class="is-${s.status}" style="--i:${i}"></span>`).join('');
    const steps = skill.steps
      .map((s) => `<li class="is-${s.status}"><span class="cp cp--${s.status}"></span>${escapeHtml(tr(s))}</li>`)
      .join('');
    return `
      <div class="glass skill reveal" style="transition-delay:${k * 90}ms">
        <div class="skill__top">
          <h4 class="skill__name">${escapeHtml(tr(skill.name))}</h4>
          <span class="skill__pct">${pct}%</span>
        </div>
        <div class="segs" role="progressbar" aria-valuemin="0" aria-valuemax="100" aria-valuenow="${pct}">${segs}</div>
        <ul class="checkpoints">${steps}</ul>
      </div>`;
  }).join('');
  observeChildren(root, '.skill');
}

/* ---------- Идеи: ИИ в поддержке ---------- */

function renderIdeas() {
  const root = $('#ideas-list');
  root.dataset.revealGroup = '';
  root.innerHTML = t('ideas.items')
    .map(
      (item, i) => `
      <article class="glass stack__card reveal" style="--i:${i}">
        <span class="stack__num">0${i + 1}</span>
        <div>
          <h3 class="stack__title">${escapeHtml(item.title)}</h3>
          <p class="stack__text">${escapeHtml(item.text)}</p>
          <ul class="tags">${item.tags.map((tag) => `<li>${escapeHtml(tag)}</li>`).join('')}</ul>
        </div>
      </article>`
    )
    .join('');
  observeChildren(root, '.stack__card');
}

/* ---------- Подсветка стеклянных блоков под курсором ---------- */

function initIceGlow() {
  document.addEventListener('pointermove', (e) => {
    const el = e.target.closest && e.target.closest('.glass');
    if (!el) return;
    const r = el.getBoundingClientRect();
    el.style.setProperty('--mx', `${e.clientX - r.left}px`);
    el.style.setProperty('--my', `${e.clientY - r.top}px`);
  });
}

/* ---------- Звук ---------- */

// Фоновый звук синтезируется прямо в браузере (Web Audio), файлов нет.
// По умолчанию выключен, включается кнопкой «Звук» в шапке.
const sound = {
  on: false,
  ctx: null,
  master: null,

  build() {
    const AudioCtx = window.AudioContext || window.webkitAudioContext;
    if (!AudioCtx) return false;
    const ctx = new AudioCtx();
    const master = ctx.createGain();
    master.gain.value = 0;
    master.connect(ctx.destination);

    // низкий «ледяной» гул
    const filter = ctx.createBiquadFilter();
    filter.type = 'lowpass';
    filter.frequency.value = 520;
    filter.connect(master);
    [55, 82.4, 110.3].forEach((freq, i) => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = i === 2 ? 'triangle' : 'sine';
      osc.frequency.value = freq;
      osc.detune.value = (i - 1) * 6;
      gain.gain.value = i === 2 ? 0.05 : 0.16;
      osc.connect(gain).connect(filter);
      osc.start();
    });
    const lfo = ctx.createOscillator();
    const lfoGain = ctx.createGain();
    lfo.frequency.value = 0.07;
    lfoGain.gain.value = 260;
    lfo.connect(lfoGain).connect(filter.frequency);
    lfo.start();

    // ветер: отфильтрованный шум
    const noise = ctx.createBufferSource();
    noise.buffer = this.noiseBuffer(ctx, 4);
    noise.loop = true;
    const band = ctx.createBiquadFilter();
    band.type = 'bandpass';
    band.frequency.value = 700;
    band.Q.value = 0.5;
    const windGain = ctx.createGain();
    windGain.gain.value = 0.05;
    noise.connect(band).connect(windGain).connect(master);
    noise.start();

    this.ctx = ctx;
    this.master = master;
    return true;
  },

  noiseBuffer(ctx, seconds) {
    const buffer = ctx.createBuffer(1, ctx.sampleRate * seconds, ctx.sampleRate);
    const data = buffer.getChannelData(0);
    for (let i = 0; i < data.length; i++) data[i] = Math.random() * 2 - 1;
    return buffer;
  },

  toggle() {
    if (!this.ctx && !this.build()) return false;
    this.on = !this.on;
    const now = this.ctx.currentTime;
    if (this.on) this.ctx.resume();
    this.master.gain.cancelScheduledValues(now);
    this.master.gain.setTargetAtTime(this.on ? 0.55 : 0, now, 0.6);
    return this.on;
  },

  // «вжух» при смене сцены
  whoosh() {
    if (!this.on) return;
    const ctx = this.ctx;
    const src = ctx.createBufferSource();
    src.buffer = this.noiseBuffer(ctx, 1.6);
    const band = ctx.createBiquadFilter();
    band.type = 'bandpass';
    band.Q.value = 1.2;
    band.frequency.setValueAtTime(250, ctx.currentTime);
    band.frequency.exponentialRampToValueAtTime(2400, ctx.currentTime + 1.2);
    const gain = ctx.createGain();
    gain.gain.setValueAtTime(0, ctx.currentTime);
    gain.gain.linearRampToValueAtTime(0.16, ctx.currentTime + 0.35);
    gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 1.5);
    src.connect(band).connect(gain).connect(this.master);
    src.start();
  },

  // короткий щелчок при наведении
  tick() {
    if (!this.on) return;
    const ctx = this.ctx;
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.frequency.value = 1900;
    gain.gain.setValueAtTime(0.035, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 0.06);
    osc.connect(gain).connect(this.master);
    osc.start();
    osc.stop(ctx.currentTime + 0.07);
  },
};

function initSound() {
  const btn = $('#sound');
  btn.addEventListener('click', () => {
    const on = sound.toggle();
    btn.setAttribute('aria-pressed', on);
  });
  document.addEventListener('pointerover', (e) => {
    const target = e.target.closest && e.target.closest('a, button');
    if (target && !target.contains(e.relatedTarget)) sound.tick();
  });
}

/* ---------- 3D: голова-андроид ---------- */

// Голова из белого «фарфора» поворачивается за курсором. При прокрутке её сверху вниз
// проходит линия сканирования: ниже линии — гладкая поверхность, выше — синяя сетка
// с узлами и бегущими сигналами, как нейросеть внутри.
// Модель: Lee Perry-Smith, CC BY 3.0 (из примеров three.js), лежит в assets/models/head.glb.
function initScene() {
  const stub = { setScene() {} };
  const canvas = $('#scene');
  const fail = () => {
    canvas.remove();
    document.documentElement.classList.add('no-webgl');
    return stub;
  };
  if (!window.THREE || !THREE.GLTFLoader) return fail();

  let renderer;
  try {
    renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true, powerPreference: 'high-performance' });
  } catch (e) {
    return fail();
  }

  const small = isTouch || window.innerWidth < 760;
  renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
  renderer.setClearColor(0x000000, 0);
  renderer.outputEncoding = THREE.sRGBEncoding;
  renderer.toneMapping = THREE.ACESFilmicToneMapping;
  renderer.toneMappingExposure = 0.92;
  renderer.localClippingEnabled = true;

  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(30, 1, 0.1, 100);
  camera.position.set(0, 0, 7.5);

  // мягкие отражения студии — без них фарфор выглядит пластиком
  if (THREE.RoomEnvironment) {
    const pmrem = new THREE.PMREMGenerator(renderer);
    scene.environment = pmrem.fromScene(new THREE.RoomEnvironment(), 0.04).texture;
  }
  const key = new THREE.DirectionalLight(0xffffff, 1.7);
  key.position.set(-4, 3, 3);
  scene.add(key);
  const rim = new THREE.DirectionalLight(0x4d6bff, 2.4);
  rim.position.set(4, 1.5, -3);
  scene.add(rim);
  scene.add(new THREE.AmbientLight(0xffffff, 0.08));

  const pivot = new THREE.Group(); // положение на экране
  const head = new THREE.Group(); // поворот за курсором
  pivot.add(head);
  scene.add(pivot);

  const BLUE = new THREE.Color('#2b4cff');
  const skinPlane = new THREE.Plane(new THREE.Vector3(0, -1, 0), 0); // фарфор остаётся ниже линии
  const wirePlane = new THREE.Plane(new THREE.Vector3(0, 1, 0), 0); // сетка проступает выше линии
  const uScan = { value: 10 };

  const skinMaterial = new THREE.MeshPhysicalMaterial({
    color: '#e6e8ed',
    roughness: 0.3,
    envMapIntensity: 0.75,
    metalness: 0,
    clearcoat: 0.8,
    clearcoatRoughness: 0.22,
    clippingPlanes: [skinPlane],
    side: THREE.DoubleSide,
  });
  // светящаяся кромка там, где проходит линия сканирования
  skinMaterial.onBeforeCompile = (shader) => {
    shader.uniforms.uScan = uScan;
    shader.uniforms.uGlow = { value: BLUE };
    shader.vertexShader =
      'varying float vWorldY;\n' +
      shader.vertexShader.replace(
        '#include <begin_vertex>',
        '#include <begin_vertex>\n  vWorldY = (modelMatrix * vec4(transformed, 1.0)).y;'
      );
    shader.fragmentShader =
      'uniform float uScan;\nuniform vec3 uGlow;\nvarying float vWorldY;\n' +
      shader.fragmentShader.replace(
        '#include <dithering_fragment>',
        'gl_FragColor.rgb += uGlow * exp(-pow((vWorldY - uScan) / 0.025, 2.0)) * 1.1;\n#include <dithering_fragment>'
      );
  };

  // круглая точка для узлов и сигналов (по умолчанию точки квадратные)
  const dot = (() => {
    const c = document.createElement('canvas');
    c.width = c.height = 64;
    const g = c.getContext('2d');
    g.fillStyle = '#fff';
    g.beginPath();
    g.arc(32, 32, 28, 0, Math.PI * 2);
    g.fill();
    return new THREE.CanvasTexture(c);
  })();
  const wireMaterial = new THREE.LineBasicMaterial({ color: BLUE, transparent: true, opacity: 0.5, clippingPlanes: [wirePlane] });
  const nodeMaterial = new THREE.PointsMaterial({ color: BLUE, size: 0.04, map: dot, alphaTest: 0.5, clippingPlanes: [wirePlane] });
  const pulseMaterial = new THREE.PointsMaterial({ color: '#ff5a2e', size: 0.09, map: dot, alphaTest: 0.5, clippingPlanes: [wirePlane] });

  let ready = false;
  let top = 1.4;
  let bottom = -1.4;
  let pulses = [];
  let pulseGeometry = null;
  let positions = null;

  new THREE.GLTFLoader().load(
    'assets/models/head.glb',
    (gltf) => {
      let mesh = null;
      gltf.scene.updateMatrixWorld(true);
      gltf.scene.traverse((o) => {
        if (o.isMesh && !mesh) mesh = o;
      });
      if (!mesh) return;

      const geometry = mesh.geometry.clone();
      geometry.applyMatrix4(mesh.matrixWorld);
      geometry.computeBoundingBox();
      const box = geometry.boundingBox;
      const center = box.getCenter(new THREE.Vector3());
      const size = box.getSize(new THREE.Vector3());
      const s = 2.5 / size.y;
      geometry.translate(-center.x, -center.y, -center.z);
      geometry.scale(s, s, s);
      geometry.computeVertexNormals();
      top = (size.y * s) / 2 + 0.05;
      bottom = -top;

      head.add(new THREE.Mesh(geometry, skinMaterial));
      // сетка чуть меньше поверхности, чтобы не мерцала на кромке
      const wire = new THREE.LineSegments(new THREE.WireframeGeometry(geometry), wireMaterial);
      wire.scale.setScalar(0.995);
      head.add(wire);

      positions = geometry.attributes.position;
      const nodePos = [];
      for (let i = 0; i < positions.count; i += 4) nodePos.push(positions.getX(i), positions.getY(i), positions.getZ(i));
      const nodeGeometry = new THREE.BufferGeometry();
      nodeGeometry.setAttribute('position', new THREE.Float32BufferAttribute(nodePos, 3));
      head.add(new THREE.Points(nodeGeometry, nodeMaterial));

      const PULSES = small ? 50 : 90;
      pulses = Array.from({ length: PULSES }, () => spawn({ t: Math.random() }));
      pulseGeometry = new THREE.BufferGeometry();
      pulseGeometry.setAttribute('position', new THREE.Float32BufferAttribute(new Float32Array(PULSES * 3), 3));
      head.add(new THREE.Points(pulseGeometry, pulseMaterial));

      ready = true;
      document.documentElement.classList.add('head-ready');
    },
    undefined,
    () => document.documentElement.classList.add('no-webgl')
  );

  // сигнал летит по прямой между двумя соседними узлами сетки — сквозь голову
  function spawn(p) {
    const n = positions.count;
    const a = Math.floor(Math.random() * n);
    let b = a;
    for (let tries = 0; tries < 30; tries++) {
      const c = Math.floor(Math.random() * n);
      const d = Math.hypot(positions.getX(a) - positions.getX(c), positions.getY(a) - positions.getY(c), positions.getZ(a) - positions.getZ(c));
      if (d > 0.25 && d < 0.75) {
        b = c;
        break;
      }
    }
    p.a = a;
    p.b = b;
    p.t = p.t ?? 0;
    p.speed = 0.5 + Math.random() * 0.9;
    return p;
  }

  /* --- прокрутка: где голова и насколько её «просканировало» --- */

  const sections = $$('[data-scene]');
  let tops = [];
  const measure = () => {
    tops = sections.map((el) => el.getBoundingClientRect().top + window.scrollY);
  };
  function progress() {
    const y = window.scrollY;
    let i = 0;
    for (let k = 0; k < tops.length; k++) if (tops[k] <= y) i = k;
    if (i >= tops.length - 1) return tops.length - 1;
    return i + clamp((y - tops[i]) / (tops[i + 1] - tops[i]), 0, 1);
  }
  const smooth = (a, b, x) => {
    const t = clamp((x - a) / (b - a), 0, 1);
    return t * t * (3 - 2 * t);
  };

  const mouse = { x: 0, y: 0 };
  window.addEventListener('pointermove', (e) => {
    mouse.x = (e.clientX / window.innerWidth) * 2 - 1;
    mouse.y = (e.clientY / window.innerHeight) * 2 - 1;
  });

  function resize() {
    const w = window.innerWidth;
    const h = window.innerHeight;
    renderer.setSize(w, h, false);
    camera.aspect = w / h;
    camera.fov = w < 760 ? 40 : 30;
    camera.updateProjectionMatrix();
    measure();
  }
  window.addEventListener('resize', resize);
  resize();
  setInterval(measure, 1500);

  /* --- цикл отрисовки --- */

  let last = performance.now();
  let time = 0;
  let scanY = 10;
  let opacity = 1;

  function frame(now) {
    requestAnimationFrame(frame);
    if (document.hidden) return;
    const dt = Math.min(0.05, (now - last) / 1000);
    last = now;
    const motion = reducedMotion ? 0 : 1;
    time += dt * motion;

    const g = progress();
    const mobile = window.innerWidth < 760;
    // насколько сдвинуть голову вбок, зависит от ширины видимой области
    const halfWidth = Math.tan((camera.fov * Math.PI) / 360) * camera.position.z * camera.aspect;
    const side = mobile ? 0 : halfWidth * 0.52;
    const toStatement = smooth(0.55, 1.15, g);
    const toContacts = smooth(4.55, 5, g);

    // в «Направлении» голова уходит вправо и сканируется сверху вниз,
    // в контактах возвращается наполовину «раскрытой»
    const scanT = Math.max(smooth(1.05, 1.85, g) * (1 - toContacts), toContacts * 0.5);
    const targetScan = top + (bottom - top) * scanT;
    scanY += (targetScan - scanY) * (reducedMotion ? 1 : 1 - Math.exp(-dt * 6));

    const px = side * Math.max(toStatement, toContacts);
    const py = mobile ? -0.75 * Math.max(toStatement, toContacts) : 0;
    const baseYaw = -0.18 - 0.42 * Math.max(toStatement, toContacts);
    const k = reducedMotion ? 1 : 1 - Math.exp(-dt * 4);
    pivot.position.x += (px - pivot.position.x) * k;
    pivot.position.y += (py + Math.sin(time * 0.8) * 0.04 - pivot.position.y) * k;
    head.rotation.y += (baseYaw + mouse.x * 0.45 - head.rotation.y) * k;
    head.rotation.x += (mouse.y * 0.22 - head.rotation.x) * k;

    // в разделах с контентом голова исчезает, в контактах возвращается
    const targetOpacity = clamp(1 - smooth(1.85, 2.15, g) + toContacts, 0, 1);
    opacity += (targetOpacity - opacity) * (reducedMotion ? 1 : 1 - Math.exp(-dt * 6));
    canvas.style.opacity = opacity.toFixed(3);
    if (opacity < 0.01 || !ready) return;

    // линия сканирования задаётся в мировых координатах, а голова наклонена,
    // поэтому плоскости отсечения ставим по высоте сцены
    const worldScan = scanY + pivot.position.y;
    uScan.value = worldScan;
    skinPlane.constant = worldScan;
    wirePlane.constant = -worldScan;

    if (pulseGeometry) {
      const arr = pulseGeometry.attributes.position.array;
      pulses.forEach((p, i) => {
        p.t += p.speed * dt * motion;
        if (p.t >= 1) {
          p.t = 0;
          spawn(p);
        }
        const { a, b } = p;
        arr[i * 3] = positions.getX(a) + (positions.getX(b) - positions.getX(a)) * p.t;
        arr[i * 3 + 1] = positions.getY(a) + (positions.getY(b) - positions.getY(a)) * p.t;
        arr[i * 3 + 2] = positions.getZ(a) + (positions.getZ(b) - positions.getZ(a)) * p.t;
      });
      pulseGeometry.attributes.position.needsUpdate = true;
    }

    renderer.render(scene, camera);
  }
  requestAnimationFrame(frame);

  return {
    setScene() {
      sound.whoosh();
    },
  };
}

/* ---------- Нейро-аватар из частиц ---------- */

// Абстрактный силуэт по пояс, собранный из частиц. Внутри — маленькая нейросеть,
// по которой бегут сигналы к «ядру» в голове. Частицы разлетаются от курсора
// и собираются обратно, сверху вниз периодически проходит линия сканирования.
function initAvatar() {
  const canvas = $('#avatar');
  const ctx = canvas.getContext('2d');
  const ICE = '30,42,90';
  const WARM = '36,67,255';

  let W = 0;
  let H = 0;
  let particles = [];
  let nodes = [];
  let links = [];
  let adj = [];
  let pulses = [];
  let visible = false;
  let assembled = false;
  let time = 0;
  let last = performance.now();
  const mouse = { x: -999, y: -999, inside: false };

  // силуэт рисуется на скрытом холсте, закрашенные пиксели становятся частицами
  function silhouette(w, h) {
    const c = document.createElement('canvas');
    c.width = w;
    c.height = h;
    const g = c.getContext('2d');
    g.fillStyle = '#fff';
    g.beginPath();
    g.moveTo(w * 0.02, h);
    g.bezierCurveTo(w * 0.05, h * 0.82, w * 0.2, h * 0.75, w * 0.39, h * 0.72);
    g.lineTo(w * 0.61, h * 0.72);
    g.bezierCurveTo(w * 0.8, h * 0.75, w * 0.95, h * 0.82, w * 0.98, h);
    g.closePath();
    g.fill();
    g.fillRect(w * 0.42, h * 0.52, w * 0.16, h * 0.24);
    g.beginPath();
    g.ellipse(w * 0.5, h * 0.39, w * 0.19, h * 0.205, 0, 0, Math.PI * 2);
    g.fill();
    return g.getImageData(0, 0, w, h).data;
  }

  function build() {
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    W = canvas.clientWidth;
    H = canvas.clientHeight;
    if (!W || !H) return;
    canvas.width = W * dpr;
    canvas.height = H * dpr;
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

    const w = Math.round(W);
    const h = Math.round(H);
    const data = silhouette(w, h);
    const filled = (x, y) => x >= 0 && y >= 0 && x < w && y < h && data[(y * w + x) * 4 + 3] > 128;
    const step = W < 260 ? 3 : 4;

    particles = [];
    for (let y = 0; y < h; y += step) {
      for (let x = 0; x < w; x += step) {
        if (!filled(x, y)) continue;
        const edge = !filled(x + step, y) || !filled(x - step, y) || !filled(x, y + step) || !filled(x, y - step);
        if (!edge && Math.random() > 0.75) continue;
        const hx = x + (Math.random() - 0.5) * 3;
        const hy = y + (Math.random() - 0.5) * 3;
        // свет падает слева сверху: так у силуэта появляется объём
        const light = 1 - Math.min(1, Math.hypot(hx - W * 0.3, hy - H * 0.25) / (W * 0.95));
        particles.push({
          hx,
          hy,
          x: assembled ? hx : Math.random() * W,
          y: assembled ? hy : Math.random() * H,
          vx: 0,
          vy: 0,
          edge,
          b: 0.18 + light * 0.55 + (edge ? 0.3 : 0) + Math.random() * 0.12,
          seed: Math.random() * 100,
        });
      }
    }

    // узлы сети: в основном в голове, немного в плечах
    const head = particles.map((p, i) => i).filter((i) => particles[i].hy < H * 0.6 && !particles[i].edge);
    const body = particles.map((p, i) => i).filter((i) => particles[i].hy >= H * 0.74 && !particles[i].edge);
    const pick = (list, n) => Array.from({ length: n }, () => list[Math.floor(Math.random() * list.length)]);
    nodes = [...new Set([...pick(head, 26), ...pick(body, 10)])];

    links = [];
    adj = nodes.map(() => []);
    const seen = new Set();
    nodes.forEach((a, i) => {
      nodes
        .map((b, j) => [j, Math.hypot(particles[a].hx - particles[b].hx, particles[a].hy - particles[b].hy)])
        .filter(([j]) => j !== i)
        .sort((m, n) => m[1] - n[1])
        .slice(0, 2)
        .forEach(([j]) => {
          const key = i < j ? `${i}-${j}` : `${j}-${i}`;
          if (seen.has(key)) return;
          seen.add(key);
          links.push([i, j]);
          adj[i].push(j);
          adj[j].push(i);
        });
    });

    pulses = Array.from({ length: 16 }, () => spawn({}));
  }

  function spawn(p, from) {
    const a = from ?? Math.floor(Math.random() * nodes.length);
    const next = adj[a] || [];
    p.a = a;
    p.b = next.length ? next[Math.floor(Math.random() * next.length)] : a;
    p.t = from == null ? Math.random() : 0;
    p.speed = 0.6 + Math.random() * 0.9;
    p.warm = Math.random() < 0.4;
    return p;
  }

  function draw(dt) {
    ctx.clearRect(0, 0, W, H);
    time += dt;

    // линия сканирования: проходит сверху вниз, потом пауза
    const cycle = (time % 6) / 3.5;
    const scan = cycle <= 1 ? cycle * 1.2 - 0.1 : -1;

    // «ядро» в голове
    const pulse = 0.6 + Math.sin(time * 2.2) * 0.25;
    const core = ctx.createRadialGradient(W * 0.5, H * 0.38, 0, W * 0.5, H * 0.38, W * 0.2);
    core.addColorStop(0, `rgba(${WARM},${0.14 * pulse})`);
    core.addColorStop(1, `rgba(${WARM},0)`);
    ctx.fillStyle = core;
    ctx.fillRect(0, 0, W, H);

    // частицы: пружина к своему месту, отталкивание от курсора и лёгкий дрейф
    const radius = Math.max(50, W * 0.2);
    particles.forEach((p) => {
      if (mouse.inside) {
        const dx = p.x - mouse.x;
        const dy = p.y - mouse.y;
        const d = Math.hypot(dx, dy) || 1;
        if (d < radius) {
          const f = Math.pow(1 - d / radius, 2) * 4.5;
          p.vx += (dx / d) * f;
          p.vy += (dy / d) * f;
        }
      }
      p.vx += (p.hx - p.x) * 0.055;
      p.vy += (p.hy - p.y) * 0.055;
      p.vx *= 0.82;
      p.vy *= 0.82;
      p.x += p.vx + Math.sin(time * 1.3 + p.seed) * 0.06;
      p.y += p.vy + Math.cos(time * 1.1 + p.seed) * 0.06;

      let b = p.b;
      if (scan > -0.5) {
        const near = 1 - Math.min(1, Math.abs(p.hy / H - scan) / 0.035);
        b += near * 0.9;
      }
      const offset = Math.min(1, Math.hypot(p.x - p.hx, p.y - p.hy) / 30);
      ctx.fillStyle = offset > 0.35 ? `rgba(${WARM},${Math.min(1, b)})` : `rgba(${ICE},${Math.min(1, b * 0.55)})`;
      const s = p.edge ? 1.8 : 1.4;
      ctx.fillRect(p.x, p.y, s, s);
    });

    // связи сети
    ctx.strokeStyle = `rgba(${ICE},0.12)`;
    ctx.lineWidth = 0.6;
    ctx.beginPath();
    links.forEach(([i, j]) => {
      const a = particles[nodes[i]];
      const b = particles[nodes[j]];
      ctx.moveTo(a.x, a.y);
      ctx.lineTo(b.x, b.y);
    });
    ctx.stroke();

    // узлы
    nodes.forEach((n) => {
      const p = particles[n];
      ctx.fillStyle = `rgba(${ICE},0.75)`;
      ctx.beginPath();
      ctx.arc(p.x, p.y, 1.8, 0, Math.PI * 2);
      ctx.fill();
    });

    // сигналы с хвостом
    pulses.forEach((p) => {
      p.t += p.speed * dt;
      if (p.t >= 1) spawn(p, Math.random() < 0.85 ? p.b : undefined);
      const a = particles[nodes[p.a]];
      const b = particles[nodes[p.b]];
      const tint = p.warm ? WARM : ICE;
      for (let k = 0; k < 4; k++) {
        const t = Math.max(0, p.t - k * 0.06);
        ctx.fillStyle = `rgba(${tint},${0.9 * (1 - k / 4)})`;
        ctx.beginPath();
        ctx.arc(a.x + (b.x - a.x) * t, a.y + (b.y - a.y) * t, 2.2 - k * 0.4, 0, Math.PI * 2);
        ctx.fill();
      }
    });

    // сама линия сканирования
    if (scan > -0.5) {
      const y = scan * H;
      const g = ctx.createLinearGradient(0, y - 22, 0, y + 6);
      g.addColorStop(0, `rgba(${WARM},0)`);
      g.addColorStop(0.8, `rgba(${WARM},0.1)`);
      g.addColorStop(0.86, `rgba(${WARM},0.28)`);
      g.addColorStop(1, `rgba(${WARM},0)`);
      ctx.fillStyle = g;
      ctx.fillRect(0, y - 22, W, 28);
    }
  }

  function loop(now) {
    requestAnimationFrame(loop);
    const dt = Math.min(0.05, (now - last) / 1000);
    last = now;
    if (!visible || !W) return;
    draw(dt);
  }

  canvas.addEventListener('pointermove', (e) => {
    const r = canvas.getBoundingClientRect();
    mouse.x = e.clientX - r.left;
    mouse.y = e.clientY - r.top;
    mouse.inside = true;
  });
  canvas.addEventListener('pointerleave', () => {
    mouse.inside = false;
  });

  new IntersectionObserver(([entry]) => {
    visible = entry.isIntersecting;
    // при первом появлении частицы слетаются в силуэт из случайных точек
    if (visible) setTimeout(() => (assembled = true), 3000);
  }).observe(canvas);
  new ResizeObserver(() => {
    build();
    if (reducedMotion) draw(0);
  }).observe(canvas);

  build();
  if (reducedMotion) {
    assembled = true;
    particles.forEach((p) => {
      p.x = p.hx;
      p.y = p.hy;
    });
    draw(0);
  } else {
    requestAnimationFrame(loop);
  }
}

/* ---------- Шапка, навигация и номер сцены ---------- */

function initNav(scene3d) {
  const links = $$('.nav__link');
  const sections = $$('[data-scene]');
  let ticking = false;
  let currentIndex = -1;

  function update() {
    ticking = false;
    const line = window.scrollY + window.innerHeight * 0.5;
    let index = 0;
    sections.forEach((s, i) => {
      if (s.offsetTop <= line) index = i;
    });
    const atBottom = window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 4;
    if (atBottom) index = sections.length - 1;
    $('.scene-index').classList.toggle('is-hidden', atBottom);

    const id = sections[index].id;
    let atTop = sections[0];
    sections.forEach((s) => {
      if (s.offsetTop <= window.scrollY + 60) atTop = s;
    });
    document.body.classList.toggle('is-night', atTop.classList.contains('night'));
    links.forEach((link) => link.classList.toggle('is-active', link.getAttribute('href') === `#${id}`));

    const max = document.documentElement.scrollHeight - window.innerHeight;
    $('#scene-progress').style.width = `${max > 0 ? (window.scrollY / max) * 100 : 0}%`;

    if (index !== currentIndex) {
      currentIndex = index;
      $('#scene-num').textContent = String(index + 1).padStart(2, '0');
      $('#scene-name').textContent = t('scenes')[index];
      scene3d.setScene(index);
    }
  }

  langListeners.push(() => {
    if (currentIndex >= 0) $('#scene-name').textContent = t('scenes')[currentIndex];
  });

  window.addEventListener(
    'scroll',
    () => {
      if (!ticking) {
        ticking = true;
        requestAnimationFrame(update);
      }
    },
    { passive: true }
  );
  window.addEventListener('resize', update);
  update();
}

/* ---------- Плавный скролл ---------- */

function initSmoothScroll() {
  let lenis = null;
  if (window.Lenis && !reducedMotion) {
    lenis = new Lenis({ lerp: 0.09, wheelMultiplier: 0.9 });
    const raf = (time) => {
      lenis.raf(time);
      requestAnimationFrame(raf);
    };
    requestAnimationFrame(raf);
  }

  document.addEventListener('click', (e) => {
    const link = e.target.closest('a[href^="#"]');
    if (!link) return;
    const target = document.querySelector(link.getAttribute('href'));
    if (!target) return;
    e.preventDefault();
    if (lenis) lenis.scrollTo(target, { duration: 1.6 });
    else target.scrollIntoView({ behavior: reducedMotion ? 'auto' : 'smooth' });
  });

  return lenis;
}

/* ---------- Курсор и «магнитные» кнопки ---------- */

function initCursor() {
  if (isTouch) return;
  const cursor = $('#cursor');
  const pos = { x: -100, y: -100 };
  const cur = { x: -100, y: -100 };

  window.addEventListener('pointermove', (e) => {
    pos.x = e.clientX;
    pos.y = e.clientY;
    cursor.classList.add('is-visible');
  });
  document.addEventListener('pointerleave', () => cursor.classList.remove('is-visible'));
  document.addEventListener('pointerover', (e) => {
    const hover = e.target.closest && e.target.closest('a, button, .range');
    cursor.classList.toggle('is-hover', !!hover);
  });

  (function loop() {
    cur.x += (pos.x - cur.x) * 0.2;
    cur.y += (pos.y - cur.y) * 0.2;
    cursor.style.transform = `translate(${cur.x}px, ${cur.y}px)`;
    requestAnimationFrame(loop);
  })();
}

function initMagnetic() {
  if (isTouch || reducedMotion) return;
  $$('[data-magnetic]').forEach((el) => {
    el.addEventListener('pointermove', (e) => {
      const r = el.getBoundingClientRect();
      const x = e.clientX - r.left - r.width / 2;
      const y = e.clientY - r.top - r.height / 2;
      el.style.transform = `translate(${x * 0.25}px, ${y * 0.35}px)`;
    });
    el.addEventListener('pointerleave', () => {
      el.style.transform = '';
    });
  });
}

/* ---------- Прелоадер ---------- */

function initPreloader() {
  const pre = $('#preloader');
  const count = $('#preloader-count');
  const bar = $('#preloader-bar');
  document.body.classList.add('is-loading');

  let finished = false;
  const finish = () => {
    if (finished) return;
    finished = true;
    pre.classList.add('is-done');
    document.body.classList.remove('is-loading');
    document.body.classList.add('is-ready');
    setTimeout(() => pre.remove(), 1300);
  };

  if (reducedMotion) {
    finish();
    return;
  }

  const minTime = 1500;
  const start = performance.now();
  let fontsReady = false;
  (document.fonts ? document.fonts.ready : Promise.resolve()).then(() => {
    fontsReady = true;
  });
  // не ждём шрифты дольше 4 секунд, а весь прелоадер — дольше 5
  setTimeout(() => {
    fontsReady = true;
  }, 4000);
  setTimeout(finish, 5000);

  (function tick(now) {
    const p = Math.min(1, (now - start) / minTime);
    const eased = 1 - Math.pow(1 - p, 3);
    const value = Math.round(eased * (fontsReady ? 100 : 92));
    count.textContent = String(value).padStart(3, '0');
    bar.style.width = `${value}%`;
    if (p >= 1 && fontsReady) setTimeout(finish, 250);
    else requestAnimationFrame(tick);
  })(start);
}

/* ---------- Контакты ---------- */

function initContacts(scene3d) {
  const pretty = (url) => url.replace(/^https?:\/\/(www\.)?/, '').replace(/\/$/, '');
  const telegramUrl = `https://t.me/${CONTACTS.telegram}`;

  $('#cta-telegram').href = telegramUrl;

  const tg = $('#contact-telegram');
  tg.href = telegramUrl;
  $('.contact__value', tg).textContent = `@${CONTACTS.telegram}`;

  const gh = $('#contact-github');
  gh.href = CONTACTS.github;
  $('.contact__value', gh).textContent = pretty(CONTACTS.github);

  const li = $('#contact-linkedin');
  li.href = CONTACTS.linkedin;
  $('.contact__value', li).textContent = pretty(CONTACTS.linkedin);

  // наведение на ссылку: частицы складываются в её название
}

/* ---------- Интерактив: как учится нейрон ---------- */

function initPlayground() {
  const canvas = $('#lab-canvas');
  const ctx = canvas.getContext('2d');
  const emptyHint = $('#lab-empty');
  const trainBtn = $('#lab-train');
  const COLORS = { 1: [36, 67, 255], 0: [255, 90, 46] };
  const HIDDEN = 8;
  const sigmoid = (z) => 1 / (1 + Math.exp(-z));
  const rnd = (scale) => (Math.random() * 2 - 1) * scale;

  let points = [];
  let currentClass = 1;
  let modelType = 'neuron';
  let model = createModel();
  let running = false;
  let epoch = 0;
  let stats = null;
  let size = 0;
  let dirty = true;
  let visible = false;

  // Один нейрон: p = σ(w1·x + w2·y + b).
  // Скрытый слой: 8 нейронов с tanh, затем выходной нейрон с σ.
  function createModel() {
    const hidden = modelType === 'mlp' ? HIDDEN : 0;
    const m = { hidden, W1: [], b1: [], W2: [], b2: 0 };
    if (hidden) {
      for (let i = 0; i < hidden; i++) {
        m.W1.push([rnd(2), rnd(2)]);
        m.b1.push(rnd(0.5));
        m.W2.push(rnd(1));
      }
    } else {
      m.W2 = [rnd(0.5), rnd(0.5)];
    }
    return m;
  }

  function forward(x, y) {
    if (!model.hidden) return { p: sigmoid(model.W2[0] * x + model.W2[1] * y + model.b2) };
    const a = model.W1.map((wi, i) => Math.tanh(wi[0] * x + wi[1] * y + model.b1[i]));
    const z = a.reduce((sum, ai, i) => sum + ai * model.W2[i], model.b2);
    return { p: sigmoid(z), a };
  }

  // Один шаг градиентного спуска по всем точкам, функция потерь — бинарная кросс-энтропия
  function trainStep(lr) {
    const n = points.length;
    const gW1 = model.W1.map(() => [0, 0]);
    const gb1 = model.b1.map(() => 0);
    const gW2 = model.W2.map(() => 0);
    let gb2 = 0;
    let loss = 0;
    let correct = 0;

    points.forEach((pt) => {
      const { p, a } = forward(pt.x, pt.y);
      loss -= pt.label * Math.log(p + 1e-9) + (1 - pt.label) * Math.log(1 - p + 1e-9);
      if (p > 0.5 === (pt.label === 1)) correct++;
      const dz = p - pt.label;
      gb2 += dz;
      if (!model.hidden) {
        gW2[0] += dz * pt.x;
        gW2[1] += dz * pt.y;
        return;
      }
      a.forEach((ai, i) => {
        gW2[i] += dz * ai;
        const da = dz * model.W2[i] * (1 - ai * ai);
        gW1[i][0] += da * pt.x;
        gW1[i][1] += da * pt.y;
        gb1[i] += da;
      });
    });

    const k = lr / n;
    model.W2 = model.W2.map((wv, i) => wv - k * gW2[i]);
    model.b2 -= k * gb2;
    model.W1 = model.W1.map((wi, i) => [wi[0] - k * gW1[i][0], wi[1] - k * gW1[i][1]]);
    model.b1 = model.b1.map((b, i) => b - k * gb1[i]);
    return { loss: loss / n, acc: correct / n };
  }

  function resize() {
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    size = canvas.clientWidth;
    canvas.width = size * dpr;
    canvas.height = size * dpr;
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    dirty = true;
  }

  const toPx = (v) => ((v + 1) / 2) * size;

  function draw() {
    ctx.clearRect(0, 0, size, size);

    // карта решений модели
    if (epoch > 0) {
      const cells = 64;
      const cell = size / cells;
      for (let i = 0; i < cells; i++) {
        for (let j = 0; j < cells; j++) {
          const x = ((i + 0.5) / cells) * 2 - 1;
          const y = ((j + 0.5) / cells) * 2 - 1;
          const p = forward(x, y).p;
          const [r, g, b] = COLORS[p > 0.5 ? 1 : 0];
          const alpha = 0.03 + Math.abs(p - 0.5) * 0.32;
          ctx.fillStyle = `rgba(${r},${g},${b},${alpha})`;
          ctx.fillRect(i * cell, j * cell, cell + 0.5, cell + 0.5);
        }
      }
    }

    // сетка
    ctx.strokeStyle = 'rgba(13,17,23,0.06)';
    ctx.lineWidth = 1;
    for (let k = 1; k < 10; k++) {
      const v = (k / 10) * size;
      ctx.beginPath();
      ctx.moveTo(v, 0);
      ctx.lineTo(v, size);
      ctx.moveTo(0, v);
      ctx.lineTo(size, v);
      ctx.stroke();
    }

    // точки
    points.forEach((pt) => {
      const [r, g, b] = COLORS[pt.label];
      ctx.shadowColor = `rgb(${r},${g},${b})`;
      ctx.shadowBlur = 12;
      ctx.fillStyle = `rgb(${r},${g},${b})`;
      ctx.beginPath();
      ctx.arc(toPx(pt.x), toPx(pt.y), 6, 0, Math.PI * 2);
      ctx.fill();
      ctx.shadowBlur = 0;
      ctx.strokeStyle = 'rgba(255,255,255,0.95)';
      ctx.lineWidth = 1.5;
      ctx.stroke();
    });

    emptyHint.classList.toggle('is-hidden', points.length > 0);
  }

  function updateStats() {
    $('#stat-epoch').textContent = epoch;
    $('#stat-loss').textContent = stats ? stats.loss.toFixed(3) : '—';
    $('#stat-acc').textContent = stats ? `${Math.round(stats.acc * 100)}%` : '—';
  }

  function setRunning(next) {
    running = next && points.length > 0;
    trainBtn.dataset.i18n = running ? 'playground.pause' : 'playground.train';
    trainBtn.textContent = t(trainBtn.dataset.i18n);
  }

  function resetModel() {
    model = createModel();
    epoch = 0;
    stats = null;
    updateStats();
    dirty = true;
  }

  function loadPreset(kind) {
    points = [];
    const gauss = () => (Math.random() + Math.random() + Math.random() - 1.5) * 0.4;
    for (let i = 0; i < 30; i++) {
      if (kind === 'line') {
        points.push({ x: -0.4 + gauss(), y: -0.35 + gauss(), label: 1 });
        points.push({ x: 0.4 + gauss(), y: 0.35 + gauss(), label: 0 });
      } else {
        const a1 = Math.random() * Math.PI * 2;
        const r1 = Math.random() * 0.32;
        points.push({ x: Math.cos(a1) * r1, y: Math.sin(a1) * r1, label: 1 });
        const a2 = Math.random() * Math.PI * 2;
        const r2 = 0.6 + Math.random() * 0.25;
        points.push({ x: Math.cos(a2) * r2, y: Math.sin(a2) * r2, label: 0 });
      }
    }
    resetModel();
    setRunning(true);
  }

  function loop() {
    if (running && visible) {
      const steps = model.hidden ? 12 : 6;
      const lr = model.hidden ? 0.6 : 0.8;
      for (let i = 0; i < steps; i++) stats = trainStep(lr);
      epoch += steps;
      updateStats();
      dirty = true;
    }
    if (dirty && visible) {
      draw();
      dirty = false;
    }
    requestAnimationFrame(loop);
  }

  canvas.addEventListener('pointerdown', (e) => {
    const r = canvas.getBoundingClientRect();
    const x = ((e.clientX - r.left) / r.width) * 2 - 1;
    const y = ((e.clientY - r.top) / r.height) * 2 - 1;
    points.push({ x, y, label: currentClass });
    dirty = true;
  });

  $$('[data-class]').forEach((btn) =>
    btn.addEventListener('click', () => {
      currentClass = Number(btn.dataset.class);
      $$('[data-class]').forEach((b) => b.classList.toggle('is-active', b === btn));
    })
  );

  $$('[data-model]').forEach((btn) =>
    btn.addEventListener('click', () => {
      modelType = btn.dataset.model;
      $$('[data-model]').forEach((b) => b.classList.toggle('is-active', b === btn));
      resetModel();
    })
  );

  trainBtn.addEventListener('click', () => setRunning(!running));
  $('#lab-preset-line').addEventListener('click', () => loadPreset('line'));
  $('#lab-preset-circle').addEventListener('click', () => loadPreset('circle'));
  $('#lab-clear').addEventListener('click', () => {
    points = [];
    setRunning(false);
    resetModel();
  });

  new IntersectionObserver(([entry]) => {
    visible = entry.isIntersecting;
    if (visible) dirty = true;
  }).observe(canvas);
  new ResizeObserver(resize).observe(canvas);

  resize();
  updateStats();
  requestAnimationFrame(loop);
}

/* ---------- Вкладки лаборатории ---------- */

function initTabs() {
  const buttons = $$('.tabs__btn');
  buttons.forEach((btn) =>
    btn.addEventListener('click', () => {
      buttons.forEach((b) => {
        const active = b === btn;
        b.classList.toggle('is-active', active);
        b.setAttribute('aria-selected', active);
        $(`#tab-${b.dataset.tab}`).hidden = !active;
      });
      const panel = $(`#tab-${btn.dataset.tab}`);
      panel.classList.add('is-visible');
    })
  );
}

/* ---------- Интерактив: градиентный спуск ---------- */

function initGradientDescent() {
  const canvas = $('#gd-canvas');
  const ctx = canvas.getContext('2d');
  const runBtn = $('#gd-run');
  const statusEl = $('#gd-status');
  const lrInput = $('#gd-lr');
  const MAX_STEPS = 400;
  const STEP_MS = 55;

  const gauss = (x, y, cx, cy, s) => Math.exp(-((x - cx) ** 2 + (y - cy) ** 2) / (2 * s * s));

  // Две функции ошибки на квадрате [-1, 1] × [-1, 1]
  const SURFACES = {
    bowl: {
      f: (x, y) => 0.5 * (x - 0.2) ** 2 + 3 * (y - 0.1) ** 2,
      start: [-0.85, 0.8],
    },
    hills: {
      f: (x, y) =>
        0.5 *
        (0.35 * (x * x + y * y) -
          gauss(x, y, 0.45, 0.35, 0.28) -
          0.65 * gauss(x, y, -0.5, -0.35, 0.22) -
          0.45 * gauss(x, y, -0.35, 0.55, 0.18)),
      start: [-0.85, -0.8],
    },
  };

  let surface = 'bowl';
  let path = [];
  let running = false;
  let status = 'statusIdle';
  let size = 0;
  let bg = null;
  let lastStep = 0;
  let visible = false;
  let dirty = true;

  const f = (x, y) => SURFACES[surface].f(x, y);
  const toPx = (v) => ((v + 1) / 2) * size;

  function grad(x, y) {
    const h = 1e-4;
    return [(f(x + h, y) - f(x - h, y)) / (2 * h), (f(x, y + h) - f(x, y - h)) / (2 * h)];
  }

  // Фон считаем один раз в маленьком разрешении и растягиваем
  function buildBackground() {
    const res = 220;
    const off = document.createElement('canvas');
    off.width = off.height = res;
    const octx = off.getContext('2d');
    const img = octx.createImageData(res, res);
    const values = new Float32Array(res * res);
    let min = Infinity;
    let max = -Infinity;
    for (let j = 0; j < res; j++) {
      for (let i = 0; i < res; i++) {
        const v = f((i / (res - 1)) * 2 - 1, (j / (res - 1)) * 2 - 1);
        values[j * res + i] = v;
        min = Math.min(min, v);
        max = Math.max(max, v);
      }
    }
    for (let k = 0; k < values.length; k++) {
      // корень растягивает контраст возле минимума
      const level = Math.sqrt((values[k] - min) / (max - min));
      // «террасы»: уровень квантуется, как на топографической карте
      const terrace = Math.floor(level * 12) / 12;
      const v = terrace * 0.75 + level * 0.25;
      img.data[k * 4] = 30 + v * 222;
      img.data[k * 4 + 1] = 52 + v * 200;
      img.data[k * 4 + 2] = 190 + v * 63;
      img.data[k * 4 + 3] = 255;
    }
    octx.putImageData(img, 0, 0);
    bg = off;
  }

  function resize() {
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    size = canvas.clientWidth;
    if (!size) return;
    canvas.width = size * dpr;
    canvas.height = size * dpr;
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    dirty = true;
  }

  function draw() {
    ctx.clearRect(0, 0, size, size);
    if (bg) {
      ctx.imageSmoothingEnabled = true;
      ctx.drawImage(bg, 0, 0, size, size);
    }

    if (!path.length) return;

    // траектория
    ctx.strokeStyle = '#ff5a2e';
    ctx.lineWidth = 2;
    ctx.shadowColor = 'rgba(255,90,46,0.5)';
    ctx.shadowBlur = 8;
    ctx.beginPath();
    path.forEach(([x, y], i) => (i ? ctx.lineTo(toPx(x), toPx(y)) : ctx.moveTo(toPx(x), toPx(y))));
    ctx.stroke();
    ctx.shadowBlur = 0;

    ctx.fillStyle = 'rgba(255,90,46,0.85)';
    path.forEach(([x, y]) => {
      ctx.beginPath();
      ctx.arc(toPx(x), toPx(y), 2, 0, Math.PI * 2);
      ctx.fill();
    });

    // старт
    const [sx, sy] = path[0];
    ctx.strokeStyle = 'rgba(13,17,23,0.7)';
    ctx.lineWidth = 1.5;
    ctx.beginPath();
    ctx.arc(toPx(sx), toPx(sy), 7, 0, Math.PI * 2);
    ctx.stroke();

    // текущая точка и направление следующего шага (антиградиент)
    const [cx, cy] = path[path.length - 1];
    if (Math.abs(cx) <= 1.2 && Math.abs(cy) <= 1.2) {
      const [gx, gy] = grad(cx, cy);
      const len = Math.hypot(gx, gy);
      if (len > 1e-6 && status !== 'statusConverged') {
        const ax = toPx(cx) - (gx / len) * 34;
        const ay = toPx(cy) - (gy / len) * 34;
        ctx.strokeStyle = '#ffffff';
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.moveTo(toPx(cx), toPx(cy));
        ctx.lineTo(ax, ay);
        ctx.stroke();
        const ang = Math.atan2(ay - toPx(cy), ax - toPx(cx));
        ctx.fillStyle = '#ffffff';
        ctx.beginPath();
        ctx.moveTo(ax, ay);
        ctx.lineTo(ax - 8 * Math.cos(ang - 0.45), ay - 8 * Math.sin(ang - 0.45));
        ctx.lineTo(ax - 8 * Math.cos(ang + 0.45), ay - 8 * Math.sin(ang + 0.45));
        ctx.fill();
      }
      ctx.shadowColor = '#ff5a2e';
      ctx.shadowBlur = 16;
      ctx.fillStyle = '#ff5a2e';
      ctx.beginPath();
      ctx.arc(toPx(cx), toPx(cy), 7, 0, Math.PI * 2);
      ctx.fill();
      ctx.shadowBlur = 0;
      ctx.strokeStyle = '#fff';
      ctx.lineWidth = 2;
      ctx.stroke();
    }
  }

  function setStatus(key) {
    status = key;
    statusEl.dataset.i18n = `gd.${key}`;
    statusEl.textContent = t(statusEl.dataset.i18n);
  }

  function setRunning(next) {
    running = next;
    runBtn.dataset.i18n = running ? 'gd.pause' : 'gd.run';
    runBtn.textContent = t(runBtn.dataset.i18n);
    if (running) setStatus('statusRunning');
  }

  function updateStats() {
    const [x, y] = path[path.length - 1] || [];
    $('#gd-step').textContent = Math.max(0, path.length - 1);
    $('#gd-loss').textContent = path.length && Number.isFinite(f(x, y)) ? f(x, y).toFixed(4) : '—';
  }

  function restart(start) {
    path = [start || SURFACES[surface].start];
    setRunning(false);
    setStatus('statusIdle');
    updateStats();
    dirty = true;
  }

  function step() {
    const [x, y] = path[path.length - 1];
    const lr = Number(lrInput.value);
    const [gx, gy] = grad(x, y);
    const nx = x - lr * gx;
    const ny = y - lr * gy;
    path.push([nx, ny]);

    if (!Number.isFinite(nx) || Math.abs(nx) > 4 || Math.abs(ny) > 4) {
      setRunning(false);
      setStatus('statusDiverged');
    } else if (Math.hypot(nx - x, ny - y) < 1e-4) {
      setRunning(false);
      setStatus('statusConverged');
    } else if (path.length > MAX_STEPS) {
      setRunning(false);
      setStatus('statusLimit');
    }
    updateStats();
    dirty = true;
  }

  function loop(time) {
    if (running && visible && time - lastStep > STEP_MS) {
      lastStep = time;
      step();
    }
    if (dirty && visible && size) {
      draw();
      dirty = false;
    }
    requestAnimationFrame(loop);
  }

  canvas.addEventListener('pointerdown', (e) => {
    const r = canvas.getBoundingClientRect();
    restart([((e.clientX - r.left) / r.width) * 2 - 1, ((e.clientY - r.top) / r.height) * 2 - 1]);
    setRunning(true);
  });

  runBtn.addEventListener('click', () => {
    if (!running && status !== 'statusIdle' && status !== 'statusRunning') restart(path[0]);
    setRunning(!running);
  });
  $('#gd-reset').addEventListener('click', () => restart(path[0]));

  lrInput.addEventListener('input', () => {
    $('#gd-lr-val').textContent = Number(lrInput.value).toFixed(2);
  });

  $$('[data-surface]').forEach((btn) =>
    btn.addEventListener('click', () => {
      surface = btn.dataset.surface;
      $$('[data-surface]').forEach((b) => b.classList.toggle('is-active', b === btn));
      buildBackground();
      restart();
    })
  );

  new IntersectionObserver(([entry]) => {
    visible = entry.isIntersecting;
    if (visible) dirty = true;
  }).observe(canvas);
  new ResizeObserver(resize).observe(canvas);

  buildBackground();
  restart();
  requestAnimationFrame(loop);
}

/* ---------- Интерактив: как LLM выбирает слово ---------- */

function initLlmDemo() {
  const tempInput = $('#llm-temp');
  let promptIndex = 0;
  let counts = [];
  let total = 0;
  let picked = null;

  const prompts = () => t('llm.prompts');
  const prompt = () => prompts()[promptIndex];
  const temperature = () => Number(tempInput.value);

  // softmax(logit / T) — так температура меняет распределение
  function probabilities() {
    const T = temperature();
    const logits = prompt().options.map(([, logit]) => logit / T);
    const max = Math.max(...logits);
    const exps = logits.map((z) => Math.exp(z - max));
    const sum = exps.reduce((a, b) => a + b, 0);
    return exps.map((e) => e / sum);
  }

  function renderPrompts() {
    $('#llm-prompts').innerHTML = prompts()
      .map(
        (p, i) =>
          `<button type="button" class="seg__btn ${i === promptIndex ? 'is-active' : ''}" data-prompt="${i}">${p.label}</button>`
      )
      .join('');
  }

  function renderTokens() {
    const opts = prompt().options;
    const next = picked == null ? '?' : opts[picked][0];
    const cls = picked == null ? '' : opts[picked][2] ? 'is-filled is-odd' : 'is-filled';
    $('#llm-tokens').innerHTML =
      prompt()
        .tokens.map((tok) => `<span class="token">${tok.replace(/ /g, '·')}</span>`)
        .join('') + `<span class="token token--next ${cls}">${next}</span>`;
  }

  function renderProbs() {
    const probs = probabilities();
    const opts = prompt().options;
    const root = $('#llm-probs');
    if (root.children.length !== opts.length) {
      root.innerHTML = opts
        .map(
          ([word, , odd]) => `
          <div class="prob ${odd ? 'prob--odd' : ''}">
            <span class="prob__word">${word}</span>
            <span class="prob__track"><span class="prob__fill"></span><span class="prob__count"></span></span>
            <span class="prob__pct"></span>
          </div>`
        )
        .join('');
    }
    [...root.children].forEach((row, i) => {
      const pct = probs[i] * 100;
      $('.prob__fill', row).style.width = `${pct}%`;
      $('.prob__pct', row).textContent = pct < 1 ? `${pct.toFixed(1)}%` : `${Math.round(pct)}%`;
      $('.prob__count', row).textContent = counts[i] ? `×${counts[i]}` : '';
      row.classList.toggle('is-picked', i === picked);
    });

    $('#llm-count').textContent = total;
    $('#llm-top').textContent = `${Math.round(Math.max(...probs) * 100)}%`;
  }

  function renderTempHint() {
    const T = temperature();
    const hint = $('#llm-temp-hint');
    hint.dataset.i18n = T < 0.5 ? 'llm.tempLow' : T <= 1.2 ? 'llm.tempMid' : 'llm.tempHigh';
    hint.textContent = t(hint.dataset.i18n);
    $('#llm-temp-val').textContent = T.toFixed(2);
  }

  function sample() {
    const probs = probabilities();
    let r = Math.random();
    for (let i = 0; i < probs.length; i++) {
      r -= probs[i];
      if (r <= 0) return i;
    }
    return probs.length - 1;
  }

  function pick(times) {
    for (let k = 0; k < times; k++) {
      picked = sample();
      counts[picked] = (counts[picked] || 0) + 1;
      total++;
    }
    renderTokens();
    renderProbs();
  }

  function resetCounts() {
    counts = [];
    total = 0;
    picked = null;
  }

  function renderAll() {
    renderPrompts();
    renderTokens();
    $('#llm-probs').innerHTML = '';
    renderProbs();
    renderTempHint();
  }

  $('#llm-prompts').addEventListener('click', (e) => {
    const btn = e.target.closest('[data-prompt]');
    if (!btn) return;
    promptIndex = Number(btn.dataset.prompt);
    resetCounts();
    renderAll();
  });

  tempInput.addEventListener('input', () => {
    renderTempHint();
    renderProbs();
  });

  $('#llm-sample').addEventListener('click', () => pick(1));
  $('#llm-sample20').addEventListener('click', () => pick(20));
  $('#llm-reset').addEventListener('click', () => {
    resetCounts();
    renderTokens();
    renderProbs();
  });

  // при смене языка слова меняются, поэтому счётчики обнуляются
  langListeners.push(() => {
    resetCounts();
    renderAll();
  });
  renderAll();
}

/* ---------- Запуск ---------- */

document.addEventListener('DOMContentLoaded', () => {
  $('#year').textContent = new Date().getFullYear();

  $$('.lang__btn').forEach((btn) => btn.addEventListener('click', () => setLang(btn.dataset.lang)));
  setLang(detectLang());
  $$('.reveal').forEach((el) => {
    if (!el.closest('[data-reveal-group]')) revealObserver.observe(el);
  });

  initPreloader();
  const scene3d = initScene();
  initNav(scene3d);
  initAvatar();
  initContacts(scene3d);
  initSmoothScroll();
  initSound();
  initCursor();
  initMagnetic();
  initIceGlow();

  initPlayground();
  initTabs();
  initGradientDescent();
  initLlmDemo();
});
