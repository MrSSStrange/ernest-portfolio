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
    os: {
      bootSkip: 'нажмите, чтобы пропустить',
      boot: [
        'ernest.os v1.0',
        'проверка памяти ............ ok',
        'загрузка нейро-головы ...... ok',
        'монтирование ~/lab ......... ok',
        'запуск assistant.sh ........ ok',
        '',
        'добро пожаловать.',
      ],
      hello: '> система загружена',
      hint: 'нажмите на иконку, чтобы открыть файл · окна можно таскать',
      assistantMeta: 'ответы написаны заранее',
      inputPlaceholder: 'спросите что-нибудь или напишите help',
      dock: { assistant: 'Ассистент', about: 'Обо мне', lab: 'Лаборатория', ideas: 'Идеи', contacts: 'Контакты' },
      apps: { assistant: 'Ассистент', about: 'Обо мне', lab: 'Лаборатория', ideas: 'Идеи', contacts: 'Контакты' },
    },
    assistant: {
      greet: 'Привет! Я ассистент Эрнеста. Спросите, кто он, чем занимается и что сейчас изучает, — или откройте файлы на рабочем столе.',
      open: 'открыть',
      suggestions: [
        ['Кто такой Эрнест?', 'about'],
        ['Чем занимаешься?', 'work'],
        ['Что изучаешь?', 'learning'],
        ['Сильные стороны', 'strengths'],
        ['Покажи демо', 'lab'],
        ['Как связаться?', 'contacts'],
        ['Ты настоящий ИИ?', 'me'],
      ],
      answers: {
        about: 'Эрнест Музафаров — руководитель технической поддержки, который идёт в AI/ML-разработку. Открыл about.md — там подробности и прогресс обучения.',
        learning: 'Сейчас Эрнест целенаправленно изучает Python, SQL, основы машинного обучения и LLM. В процессе прямо сейчас:',
        strengths: 'Вот что Эрнест приносит в команду:',
        lab: 'Открываю ~/lab. Там три интерактива: как учится нейрон, градиентный спуск и как LLM выбирает следующее слово. Всё считается прямо в браузере.',
        ideas: 'Вот задачи, которые Эрнест хочет научиться решать с помощью ИИ. Это направления для изучения, а не готовые проекты.',
        contacts: 'Быстрее всего — Telegram @ErnestKzn. Ещё есть GitHub и LinkedIn — открыл contacts.sh.',
        me: 'Честно: я не настоящая нейросеть. Мои ответы заранее написал Эрнест. Зато голова на обоях — настоящая 3D-модель, а демки в ~/lab — настоящие вычисления.',
        help: 'Можно спросить своими словами или набрать команду: about, work, learning, strengths, lab, ideas, contacts, clear, lang en.',
        hello: 'Привет! Спросите про Эрнеста или нажмите подсказку ниже.',
        fallback: 'Такого вопроса я пока не знаю. Попробуйте подсказки ниже или напишите Эрнесту в Telegram: @ErnestKzn.',
        langSwitched: 'Язык переключён.',
      },
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
    os: {
      bootSkip: 'click to skip',
      boot: [
        'ernest.os v1.0',
        'memory check .............. ok',
        'loading neural head ....... ok',
        'mounting ~/lab ............ ok',
        'starting assistant.sh ..... ok',
        '',
        'welcome.',
      ],
      hello: '> system ready',
      hint: 'click an icon to open a file · windows can be dragged',
      assistantMeta: 'answers are pre-written',
      inputPlaceholder: 'ask something or type help',
      dock: { assistant: 'Assistant', about: 'About', lab: 'Lab', ideas: 'Ideas', contacts: 'Contact' },
      apps: { assistant: 'Assistant', about: 'About', lab: 'Lab', ideas: 'Ideas', contacts: 'Contact' },
    },
    assistant: {
      greet: "Hi! I'm Ernest's assistant. Ask who he is, what he does and what he is learning — or open the files on the desktop.",
      open: 'open',
      suggestions: [
        ['Who is Ernest?', 'about'],
        ['What do you do?', 'work'],
        ['What are you learning?', 'learning'],
        ['Strengths', 'strengths'],
        ['Show me a demo', 'lab'],
        ['How to get in touch?', 'contacts'],
        ['Are you a real AI?', 'me'],
      ],
      answers: {
        about: 'Ernest Muzafarov is a head of technical support moving into AI/ML development. I opened about.md — details and learning progress are there.',
        learning: 'Ernest is deliberately learning Python, SQL, machine learning fundamentals and LLMs. In progress right now:',
        strengths: 'Here is what Ernest brings to a team:',
        lab: 'Opening ~/lab. There are three interactive demos: how a neuron learns, gradient descent and how an LLM picks the next word. Everything runs in your browser.',
        ideas: 'These are problems Ernest wants to learn to solve with AI. Directions to explore, not finished projects.',
        contacts: 'Telegram is the fastest: @ErnestKzn. There are also GitHub and LinkedIn — I opened contacts.sh.',
        me: "Honestly: I'm not a real neural network. Ernest wrote my answers in advance. The head on the wallpaper is a real 3D model, though, and the demos in ~/lab are real computations.",
        help: 'Ask in your own words or type a command: about, work, learning, strengths, lab, ideas, contacts, clear, lang ru.',
        hello: 'Hi! Ask about Ernest or tap a suggestion below.',
        fallback: "I don't know that one yet. Try a suggestion below or message Ernest on Telegram: @ErnestKzn.",
        langSwitched: 'Language switched.',
      },
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
const isMobile = () => window.innerWidth < 760;

const escapeHtml = (str) =>
  String(str).replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[c]);

// Какие окна открывает ассистент и как называются файлы на рабочем столе
const FILES = { assistant: 'assistant.sh', about: 'about.md', lab: '~/lab', ideas: 'ideas.md', contacts: 'contacts.sh' };
const OPENS = { about: 'about', work: 'about', learning: 'about', strengths: 'about', lab: 'lab', ideas: 'ideas', contacts: 'contacts' };

// Ключевые слова для свободного ввода в чате (русские и английские сразу)
const KEYWORDS = {
  me: ['настоящ', 'нейросеть ли', 'ты ии', 'ты бот', 'are you real', 'are you ai', 'are you a bot', 'real ai'],
  help: ['help', 'помощ', 'команд', 'что умеешь', 'commands'],
  hello: ['привет', 'здравств', 'hello', 'hi ', 'hey'],
  contacts: ['контакт', 'связ', 'telegram', 'телеграм', 'написать', 'github', 'linkedin', 'contact', 'reach', 'hire', 'нанять'],
  lab: ['демо', 'лаб', 'нейрон', 'градиент', 'llm', 'demo', 'lab', 'neuron', 'gradient'],
  ideas: ['иде', 'план', 'idea', 'plan', 'future'],
  learning: ['изуча', 'учишь', 'учит', 'python', 'sql', 'обучен', 'learn', 'study', 'progress', 'прогресс'],
  strengths: ['сильн', 'умеешь', 'навык', 'strength', 'skill', 'good at'],
  work: ['работ', 'занима', 'должност', 'опыт', 'work', 'job', 'experience', 'do you do'],
  about: ['кто', 'эрнест', 'о себе', 'about', 'who', 'ernest'],
};

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

function setLang(next) {
  lang = I18N[next] ? next : 'ru';
  try {
    localStorage.setItem('lang', lang);
  } catch (e) {}

  document.documentElement.lang = lang;
  document.title = `ernest.os — ${t('hero.nameFirst')} ${t('hero.nameLast')}`;
  $('meta[name="description"]').setAttribute('content', t('meta.description'));

  $$('[data-i18n]').forEach((el) => {
    el.textContent = t(el.dataset.i18n).replace(/\*/g, '');
  });
  $$('[data-i18n-placeholder]').forEach((el) => {
    el.placeholder = t(el.dataset.i18nPlaceholder);
  });
  $$('[data-i18n-title]').forEach((el) => {
    el.title = t(el.dataset.i18nTitle);
    el.setAttribute('aria-label', el.title);
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

/* ---------- Содержимое окон ---------- */

function renderStrengths() {
  $('#strengths').innerHTML = t('strengths.items')
    .map((item) => `<li><span><b>${escapeHtml(item.title)}</b>${escapeHtml(item.text)}</span></li>`)
    .join('');
}

function skillProgress(skill) {
  if (typeof skill.progress === 'number') return Math.max(0, Math.min(100, Math.round(skill.progress)));
  const done = skill.steps.filter((s) => s.status === 'done').length;
  return skill.steps.length ? Math.round((done / skill.steps.length) * 100) : 0;
}

// прогресс рисуется символами, как в терминале: [████░░░░░░] 40%
function renderLearning() {
  const mark = { done: '✓', current: '›', todo: '·' };
  $('#learning').innerHTML = LEARNING.map((skill) => {
    const pct = skillProgress(skill);
    const filled = Math.round(pct / 10);
    const bar = '█'.repeat(filled) + '░'.repeat(10 - filled);
    const steps = skill.steps
      .map((s) => `<li class="is-${s.status}">${mark[s.status]} ${escapeHtml(tr(s))}</li>`)
      .join('');
    return `
      <div class="skillrow">
        <div class="skillrow__head"><span>${escapeHtml(tr(skill.name))}</span><span><span class="skillrow__bar">[${bar}]</span> ${pct}%</span></div>
        <ul class="skillrow__steps">${steps}</ul>
      </div>`;
  }).join('');
}

function renderIdeas() {
  $('#ideas-list').innerHTML = t('ideas.items')
    .map(
      (item) => `
      <li>
        <b>${escapeHtml(item.title)}</b>
        ${escapeHtml(item.text)}
        <div class="tags">${item.tags.map((tag) => `<span>${escapeHtml(tag)}</span>`).join('')}</div>
      </li>`
    )
    .join('');
}

function initContacts() {
  const pretty = (url) => url.replace(/^https?:\/\/(www\.)?/, '').replace(/\/$/, '');
  const tg = $('#contact-telegram');
  tg.href = `https://t.me/${CONTACTS.telegram}`;
  $('.contact__value', tg).textContent = `@${CONTACTS.telegram}`;
  const gh = $('#contact-github');
  gh.href = CONTACTS.github;
  $('.contact__value', gh).textContent = pretty(CONTACTS.github);
  const li = $('#contact-linkedin');
  li.href = CONTACTS.linkedin;
  $('.contact__value', li).textContent = pretty(CONTACTS.linkedin);
}

/* ---------- Часы в верхней панели ---------- */

function initClock() {
  const el = $('#clock');
  const tick = () => {
    el.textContent = new Date().toLocaleTimeString(lang === 'ru' ? 'ru-RU' : 'en-GB', { hour: '2-digit', minute: '2-digit' });
  };
  tick();
  setInterval(tick, 10000);
  langListeners.push(tick);
}

/* ---------- Окна: открыть, закрыть, перетащить ---------- */

// Где окно появляется в первый раз — доли ширины и высоты рабочего стола
// (x: 1 — прижать к правому краю)
const WIN_LAYOUT = {
  assistant: { x: 1, y: 0.06 },
  about: { x: 0.3, y: 0.05 },
  lab: { x: 0.14, y: 0.03 },
  ideas: { x: 0.38, y: 0.08 },
  contacts: { x: 0.56, y: 0.28 },
};

function initWindows() {
  const desktop = $('#desktop');
  const wins = new Map($$('.win').map((w) => [w.dataset.win, w]));
  let z = 20;
  let focused = null;

  function updateDock() {
    $$('.dock__item').forEach((b) => b.classList.toggle('is-open', !wins.get(b.dataset.open).hidden));
    $('#topbar-app').textContent = focused ? t(`os.apps.${focused}`) : '';
  }

  function place(win, id) {
    if (win.dataset.placed || isMobile()) return;
    const W = desktop.clientWidth;
    const H = desktop.clientHeight;
    const pos = WIN_LAYOUT[id] || { x: 0.3, y: 0.1 };
    win.style.left = `${clamp(pos.x * W, 12, Math.max(12, W - win.offsetWidth - 24))}px`;
    win.style.top = `${clamp(pos.y * H, 12, Math.max(12, H - win.offsetHeight - 90))}px`;
    win.dataset.placed = '1';
  }

  function focus(id) {
    const win = wins.get(id);
    if (!win || win.hidden) return;
    win.style.zIndex = ++z;
    wins.forEach((w, key) => w.classList.toggle('is-focused', key === id));
    focused = id;
    updateDock();
  }

  function open(id) {
    const win = wins.get(id);
    if (!win) return;
    const wasHidden = win.hidden;
    win.hidden = false;
    place(win, id);
    focus(id);
    if (wasHidden) sound.tick();
  }

  function close(id) {
    const win = wins.get(id);
    if (!win) return;
    win.hidden = true;
    win.classList.remove('is-focused');
    if (focused === id) {
      // фокус переходит на верхнее из оставшихся окон
      const rest = [...wins.entries()].filter(([, w]) => !w.hidden).sort((a, b) => b[1].style.zIndex - a[1].style.zIndex);
      focused = rest.length ? rest[0][0] : null;
      if (focused) focus(focused);
    }
    updateDock();
  }

  // иконка или кнопка дока: открыть, вывести вперёд или свернуть
  function toggle(id) {
    const win = wins.get(id);
    if (win.hidden) open(id);
    else if (focused === id) close(id);
    else focus(id);
  }

  $$('[data-open]').forEach((btn) => btn.addEventListener('click', () => toggle(btn.dataset.open)));

  wins.forEach((win, id) => {
    win.addEventListener('pointerdown', () => focus(id));
    $('.win__close', win).addEventListener('click', () => close(id));
    $('.win__min', win).addEventListener('click', () => close(id));

    // перетаскивание за заголовок
    const bar = $('.win__bar', win);
    bar.addEventListener('pointerdown', (e) => {
      if (isMobile() || e.target.closest('button')) return;
      const startX = e.clientX - win.offsetLeft;
      const startY = e.clientY - win.offsetTop;
      bar.setPointerCapture(e.pointerId);
      const move = (ev) => {
        const W = desktop.clientWidth;
        const H = desktop.clientHeight;
        win.style.left = `${clamp(ev.clientX - startX, -win.offsetWidth + 80, W - 80)}px`;
        win.style.top = `${clamp(ev.clientY - startY, 0, H - 40)}px`;
      };
      const up = () => {
        bar.removeEventListener('pointermove', move);
        bar.removeEventListener('pointerup', up);
      };
      bar.addEventListener('pointermove', move);
      bar.addEventListener('pointerup', up);
    });
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && focused) close(focused);
  });
  langListeners.push(updateDock);

  return { open, close, focus };
}

/* ---------- Загрузка системы ---------- */

function initBoot(onDone) {
  const boot = $('#boot');
  const log = $('#boot-log');
  let finished = false;
  const finish = () => {
    if (finished) return;
    finished = true;
    boot.classList.add('is-done');
    setTimeout(() => boot.remove(), 700);
    onDone();
  };
  boot.addEventListener('click', finish);
  if (reducedMotion) {
    finish();
    return;
  }
  const lines = t('os.boot');
  let i = 0;
  (function next() {
    if (finished) return;
    if (i >= lines.length) {
      setTimeout(finish, 350);
      return;
    }
    const line = lines[i++];
    const html = escapeHtml(line).replace(/ ok$/, ' <span class="ok">ok</span>');
    log.innerHTML += `<span class="${i === lines.length ? 'hi' : ''}">${html}</span>\n`;
    setTimeout(next, line ? 150 : 60);
  })();
  setTimeout(finish, 4000);
}

/* ---------- ИИ-ассистент ---------- */

// Ответы не генерируются нейросетью: они собраны из текстов сайта.
// Голова на обоях «говорит», пока ответ печатается.
function initAssistant(wm, head) {
  const log = $('#chat-log');
  const input = $('#chat-input');
  let timer = null;

  function add(cls, text) {
    const p = document.createElement('p');
    p.className = `msg ${cls}`;
    p.textContent = text;
    log.appendChild(p);
    log.scrollTop = log.scrollHeight;
    return p;
  }

  function compose(id) {
    if (id === 'work') return `${t('about.p1')} ${t('about.p2')}`;
    if (id === 'learning') {
      const current = LEARNING.flatMap((skill) =>
        skill.steps.filter((s) => s.status === 'current').map((s) => `· ${tr(skill.name)}: ${tr(s)}`)
      );
      return `${t('assistant.answers.learning')}\n${current.join('\n')}`;
    }
    if (id === 'strengths') {
      return `${t('assistant.answers.strengths')}\n${t('strengths.items')
        .map((s) => `· ${s.title}`)
        .join('\n')}`;
    }
    return t(`assistant.answers.${id}`);
  }

  // печатает ответ по буквам; новый вопрос сразу допечатывает предыдущий
  let finishCurrent = null;
  function say(text, then) {
    if (finishCurrent) finishCurrent();
    const p = add('msg--ai is-typing', '');
    head.talk(true);
    const start = performance.now();
    const done = () => {
      clearInterval(timer);
      finishCurrent = null;
      p.textContent = text;
      p.classList.remove('is-typing');
      head.talk(false);
      if (then) then(p);
    };
    const step = () => {
      const i = Math.floor((performance.now() - start) / 14);
      if (i >= text.length) return done();
      p.textContent = text.slice(0, i);
      log.scrollTop = log.scrollHeight;
    };
    finishCurrent = done;
    if (reducedMotion) done();
    else timer = setInterval(step, 16);
  }

  function answer(id) {
    say(compose(id), (p) => {
      const win = OPENS[id];
      if (!win) return;
      wm.open(win);
      const btn = document.createElement('button');
      btn.type = 'button';
      btn.className = 'msg__open';
      btn.textContent = `${t('assistant.open')} ${FILES[win]}`;
      btn.addEventListener('click', () => wm.open(win));
      p.appendChild(document.createElement('br'));
      p.appendChild(btn);
    });
  }

  function route(raw) {
    const q = raw.toLowerCase().trim();
    if (!q) return;
    if (q === 'clear') {
      log.innerHTML = '';
      return;
    }
    const langCmd = q.match(/^lang\s+(ru|en)$/);
    if (langCmd) {
      setLang(langCmd[1]);
      say(t('assistant.answers.langSwitched'));
      return;
    }
    const id = Object.keys(KEYWORDS).find((key) => KEYWORDS[key].some((w) => `${q} `.includes(w)));
    answer(id || 'fallback');
  }

  function renderSuggestions() {
    $('#chat-suggest').innerHTML = t('assistant.suggestions')
      .map(([label, id]) => `<button type="button" class="chip" data-ask="${id}">${escapeHtml(label)}</button>`)
      .join('');
  }

  $('#chat-suggest').addEventListener('click', (e) => {
    const chip = e.target.closest('[data-ask]');
    if (!chip) return;
    add('msg--user', chip.textContent);
    answer(chip.dataset.ask);
  });

  $('#chat-form').addEventListener('submit', (e) => {
    e.preventDefault();
    const q = input.value;
    if (!q.trim()) return;
    add('msg--user', q);
    input.value = '';
    route(q);
  });

  langListeners.push(renderSuggestions);
  renderSuggestions();

  return {
    greet() {
      say(t('assistant.greet'));
    },
  };
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

/* ---------- Обои: голова-голограмма ---------- */

// Тёмный силуэт головы со светящейся кромкой, поверх — синяя сетка и узлы.
// Сверху вниз постоянно идёт линия сканирования, по сетке бегут сигналы.
// Пока ассистент печатает ответ, голова «говорит»: сканирование и сигналы ускоряются.
// Модель: Lee Perry-Smith, CC BY 3.0 (из примеров three.js), лежит в assets/models/head.glb.
function initScene() {
  const stub = { talk() {} };
  const canvas = $('#scene');
  if (!window.THREE || !THREE.GLTFLoader) {
    canvas.remove();
    return stub;
  }

  let renderer;
  try {
    renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true, powerPreference: 'high-performance' });
  } catch (e) {
    canvas.remove();
    return stub;
  }
  const pixelRatio = Math.min(window.devicePixelRatio || 1, 2);
  renderer.setPixelRatio(pixelRatio);
  renderer.setClearColor(0x000000, 0);

  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(32, 1, 0.1, 100);
  camera.position.set(0, 0, 7.5);

  const pivot = new THREE.Group();
  const head = new THREE.Group();
  pivot.add(head);
  scene.add(pivot);

  const uniforms = {
    uScan: { value: 2 },
    uTalk: { value: 0 },
    uTime: { value: 0 },
    uBlue: { value: new THREE.Color('#4d6bff') },
    uPixel: { value: pixelRatio },
  };

  // общий кусок шейдера: яркость полосы сканирования по высоте в мире
  const scanChunk = `
    uniform float uScan;
    uniform float uTalk;
    float scanBand(float y) {
      return exp(-pow((y - uScan) / (0.05 + uTalk * 0.03), 2.0));
    }
  `;

  // силуэт: почти чёрный, с синей кромкой по краю (эффект Френеля)
  const shellMaterial = new THREE.ShaderMaterial({
    uniforms,
    transparent: true,
    vertexShader: `
      varying vec3 vNormal;
      varying vec3 vView;
      varying float vWorldY;
      void main() {
        vec4 mv = modelViewMatrix * vec4(position, 1.0);
        vNormal = normalize(normalMatrix * normal);
        vView = normalize(-mv.xyz);
        vWorldY = (modelMatrix * vec4(position, 1.0)).y;
        gl_Position = projectionMatrix * mv;
      }
    `,
    fragmentShader: `
      uniform vec3 uBlue;
      varying vec3 vNormal;
      varying vec3 vView;
      varying float vWorldY;
      ${scanChunk}
      void main() {
        float rim = pow(1.0 - abs(dot(normalize(vNormal), vView)), 2.4);
        vec3 col = vec3(0.025, 0.035, 0.07) + uBlue * rim * 0.9 + uBlue * scanBand(vWorldY) * 0.55;
        gl_FragColor = vec4(col, 0.96);
      }
    `,
  });

  const wireMaterial = new THREE.ShaderMaterial({
    uniforms,
    transparent: true,
    depthWrite: false,
    blending: THREE.AdditiveBlending,
    vertexShader: `
      varying float vWorldY;
      void main() {
        vWorldY = (modelMatrix * vec4(position, 1.0)).y;
        gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
      }
    `,
    fragmentShader: `
      uniform vec3 uBlue;
      varying float vWorldY;
      ${scanChunk}
      void main() {
        float a = 0.16 + uTalk * 0.08 + scanBand(vWorldY) * 0.9;
        gl_FragColor = vec4(mix(uBlue, vec3(0.8, 0.86, 1.0), scanBand(vWorldY) * 0.6) * a, a);
      }
    `,
  });

  // круглые точки: узлы сетки и сигналы
  const pointsMaterial = (color, size) =>
    new THREE.ShaderMaterial({
      uniforms: { ...uniforms, uColor: { value: new THREE.Color(color) }, uSize: { value: size } },
      transparent: true,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
      vertexShader: `
        uniform float uPixel;
        uniform float uSize;
        varying float vWorldY;
        void main() {
          vec4 mv = modelViewMatrix * vec4(position, 1.0);
          vWorldY = (modelMatrix * vec4(position, 1.0)).y;
          gl_Position = projectionMatrix * mv;
          gl_PointSize = uSize * uPixel * 30.0 / -mv.z;
        }
      `,
      fragmentShader: `
        uniform vec3 uColor;
        varying float vWorldY;
        ${scanChunk}
        void main() {
          float d = length(gl_PointCoord - 0.5);
          if (d > 0.5) discard;
          float a = smoothstep(0.5, 0.15, d) * (0.55 + scanBand(vWorldY));
          gl_FragColor = vec4(uColor * a, a);
        }
      `,
    });

  let ready = false;
  let top = 1.3;
  let bottom = -1.3;
  let positions = null;
  let pulses = [];
  let pulseGeometry = null;

  function spawn(p) {
    const n = positions.count;
    const a = Math.floor(Math.random() * n);
    let b = a;
    for (let tries = 0; tries < 30; tries++) {
      const c = Math.floor(Math.random() * n);
      const d = Math.hypot(positions.getX(a) - positions.getX(c), positions.getY(a) - positions.getY(c), positions.getZ(a) - positions.getZ(c));
      if (d > 0.2 && d < 0.6) {
        b = c;
        break;
      }
    }
    p.a = a;
    p.b = b;
    p.t = p.t ?? 0;
    p.speed = 0.5 + Math.random() * 0.8;
    return p;
  }

  new THREE.GLTFLoader().load('assets/models/head.glb', (gltf) => {
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
    const s = 2.6 / size.y;
    geometry.translate(-center.x, -center.y, -center.z);
    geometry.scale(s, s, s);
    geometry.computeVertexNormals();
    top = (size.y * s) / 2;
    bottom = -top;

    // силуэт чуть меньше, чтобы сетка лежала поверх него, а задняя сторона пряталась
    const shell = new THREE.Mesh(geometry, shellMaterial);
    shell.scale.setScalar(0.992);
    head.add(shell);
    head.add(new THREE.LineSegments(new THREE.WireframeGeometry(geometry), wireMaterial));

    positions = geometry.attributes.position;
    const nodes = [];
    for (let i = 0; i < positions.count; i += 5) nodes.push(positions.getX(i), positions.getY(i), positions.getZ(i));
    const nodeGeometry = new THREE.BufferGeometry();
    nodeGeometry.setAttribute('position', new THREE.Float32BufferAttribute(nodes, 3));
    head.add(new THREE.Points(nodeGeometry, pointsMaterial('#7d93ff', 0.05)));

    const PULSES = isMobile() ? 40 : 70;
    pulses = Array.from({ length: PULSES }, () => spawn({ t: Math.random() }));
    pulseGeometry = new THREE.BufferGeometry();
    pulseGeometry.setAttribute('position', new THREE.Float32BufferAttribute(new Float32Array(PULSES * 3), 3));
    head.add(new THREE.Points(pulseGeometry, pointsMaterial('#ff6a3d', 0.11)));

    ready = true;
  });

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
    camera.fov = w < 760 ? 44 : 32;
    camera.updateProjectionMatrix();
  }
  window.addEventListener('resize', resize);
  resize();

  let talking = false;
  let talk = 0;
  let scanPhase = 0;
  let last = performance.now();

  function frame(now) {
    requestAnimationFrame(frame);
    if (document.hidden) return;
    const dt = Math.min(0.05, (now - last) / 1000);
    last = now;
    const motion = reducedMotion ? 0 : 1;

    talk += ((talking ? 1 : 0) - talk) * (1 - Math.exp(-dt * 6));
    uniforms.uTalk.value = talk;
    uniforms.uTime.value += dt;

    // линия сканирования бежит сверху вниз; пока ассистент «говорит» — быстрее
    scanPhase = (scanPhase + dt * motion * (0.22 + talk * 0.5)) % 1;
    uniforms.uScan.value = top + 0.15 - (top - bottom + 0.3) * scanPhase + pivot.position.y;

    // на компьютере голова левее центра (справа — окно ассистента), на телефоне выше
    const halfWidth = Math.tan((camera.fov * Math.PI) / 360) * camera.position.z * camera.aspect;
    const tx = isMobile() ? 0 : -halfWidth * 0.12;
    const ty = isMobile() ? 0.15 : -0.05;
    pivot.position.x += (tx - pivot.position.x) * 0.08;
    pivot.position.y += (ty + Math.sin(uniforms.uTime.value * 0.7) * 0.03 * motion - pivot.position.y) * 0.08;
    const k = reducedMotion ? 1 : 1 - Math.exp(-dt * 4);
    head.rotation.y += (mouse.x * 0.5 - 0.1 - head.rotation.y) * k;
    head.rotation.x += (mouse.y * 0.25 - head.rotation.x) * k;

    if (!ready) return;

    const arr = pulseGeometry.attributes.position.array;
    pulses.forEach((p, i) => {
      p.t += p.speed * dt * motion * (1 + talk * 2);
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

    renderer.render(scene, camera);
  }
  requestAnimationFrame(frame);

  return {
    talk(on) {
      talking = on;
    },
  };
}

/* ---------- Интерактив: как учится нейрон ---------- */

function initPlayground() {
  const canvas = $('#lab-canvas');
  const ctx = canvas.getContext('2d');
  const emptyHint = $('#lab-empty');
  const trainBtn = $('#lab-train');
  const COLORS = { 1: [77, 107, 255], 0: [255, 106, 61] };
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
    ctx.strokeStyle = 'rgba(255,255,255,0.05)';
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
      ctx.strokeStyle = 'rgba(7,9,15,0.95)';
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
      img.data[k * 4] = 10 + v * 70;
      img.data[k * 4 + 1] = 14 + v * 90;
      img.data[k * 4 + 2] = 30 + v * 170;
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
    ctx.strokeStyle = 'rgba(255,255,255,0.6)';
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
  $$('.lang__btn').forEach((btn) => btn.addEventListener('click', () => setLang(btn.dataset.lang)));
  setLang(detectLang());

  const head = initScene();
  const wm = initWindows();
  const assistant = initAssistant(wm, head);
  initContacts();
  initClock();
  initSound();
  initPlayground();
  initTabs();
  initGradientDescent();
  initLlmDemo();

  // после загрузки сразу открыт чат с ассистентом
  initBoot(() => {
    wm.open('assistant');
    setTimeout(() => assistant.greet(), 250);
  });
});
