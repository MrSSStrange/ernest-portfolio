import React, { useEffect, useState } from 'react';
import { createRoot } from 'react-dom/client';
import '@fontsource-variable/manrope';
import './style.css';
import './details.css';
import './motion-scenes.css';
import './identity.css';
import './projects.css';
import './film-hero.css';
import { useScrollScenes } from './useScrollScenes';
import { site, articles, readingTime, type Article } from './data';
import { Header, Label, Arrow, Cover, Footer, AgentDemo, PerceptionDemo, Video, InteractiveTimeline } from './components';
import { Home } from './Home';
import { ModelReview } from './ModelReview';
import { useInitialAnchor } from './useInitialAnchor';

function useMotion() {
  const [reduced, setReduced] = useState(matchMedia('(prefers-reduced-motion: reduce)').matches);
  const [paused, setPaused] = useState(false);
  useEffect(() => {
    const query = matchMedia('(prefers-reduced-motion: reduce)');
    const change = () => setReduced(query.matches);
    query.addEventListener('change', change);
    return () => query.removeEventListener('change', change);
  }, []);
  useEffect(() => { document.documentElement.dataset.motion = reduced || paused ? 'off' : 'on'; window.dispatchEvent(new Event('ernest-motion-change')); }, [reduced, paused]);
  return { reduced, paused, onPause: () => setPaused(v => !v) };
}

function ArticlePage({ article }: { article: Article }) {
  useEffect(() => {
    document.title = `${article.title} — Эрнест`;
    document.querySelector('meta[name="description"]')?.setAttribute('content', article.description);
  }, [article]);
  return <main id="main" className={`article-page article-${article.slug}`}><div className="article-hero"><a href="/#journal" className="back-link">← В журнал</a><div className="article-top-meta"><Label>{article.category.toUpperCase()} / ЗАМЕТКА {article.number}</Label><span className="mono muted">{readingTime(article)} МИН ЧТЕНИЯ</span></div><h1>{article.title}</h1><p>{article.description}</p><div className="article-author"><span className="author-avatar">{site.photo ? <img src={site.photo} srcSet={site.photoSrcSet} sizes="150px" width="948" height="1000" alt="" decoding="async"/> : 'э.'}</span><span>Эрнест <small>Personal lab</small></span><span className="article-check">Источники проверены<br/>{site.checkedAt}</span></div><Cover type={article.cover}/></div><div className="article-layout"><aside className="article-toc"><span className="mono muted">В ЭТОМ МАТЕРИАЛЕ</span><nav aria-label="Оглавление">{article.sections.map((section, i) => <a key={section.id} href={`#${section.id}`}><span>0{i + 1}</span>{section.title}</a>)}<a href="#sources"><span>↗</span>Источники</a></nav></aside><div className="article-content">{article.sections.map((section, i) => <section className={`article-section ${section.interactive === 'timeline' ? 'wide-section' : ''}`} key={section.id} id={section.id}><span className="article-section-number mono">0{i + 1}</span><h2>{section.title}</h2>{section.paragraphs.map((text, n) => <p key={n}>{text}</p>)}{section.interactive === 'agent' && <AgentDemo/>}{section.interactive === 'perception' && <PerceptionDemo/>}{section.interactive === 'timeline' && <InteractiveTimeline/>}{section.video && <Video id={section.video} title="Optimus — Sort & Stretch"/>}</section>)}<section className="article-sources" id="sources"><Label>ПЕРВИЧНЫЕ ИСТОЧНИКИ</Label><h2>Продолжить исследование</h2><ol>{article.sources.map(source => <li key={source.url}><a href={source.url} target="_blank" rel="noreferrer">{source.title} <Arrow diagonal/></a></li>)}</ol><p>Проверено {site.checkedAt}. Учебные схемы объясняют принцип и не воспроизводят внутреннюю архитектуру Tesla.</p></section><a href="/#journal" className="button button-primary">Другие материалы <Arrow/></a></div></div></main>;
}

function Credits() {
  return <main id="main" className="credits-page"><a href="/" className="back-link">← На главную</a><Label>МАТЕРИАЛЫ И АТРИБУЦИЯ</Label><h1>У каждой детали<br/>есть источник.</h1><p className="lead">Авторы, первичные источники и условия использования материалов сайта.</p><section><h2>3D-ассет Optimus</h2><p><a href={site.model.source}>«{site.model.title}»</a> — <a href={site.model.authorUrl}>{site.model.author}</a>, <a href={site.model.licenseUrl}>{site.model.license}</a>. Независимая авторская модель, не официальный CAD Tesla.</p><p>{site.model.changes}</p><p>{site.model.headUrl ? 'В сцене используется сглаженный GLB головы с шеей: 1 759 760 байт, 122 508 треугольников, 3 материала, без текстур. Исходные контрольные точки и размеры сохранены. Поверхность между ними уточнена для крупного плана; сжатие meshopt проверено без потерь. Оригинальный экспорт хранится отдельно.' : 'Сцена пока не завершена: оригинальный GLB или архив glTF нужно скачать после входа в Sketchfab. Голова с шеей не выделена, её вид спереди, сбоку и под углом в исходной геометрии не проверен. Картинка на главной — статичный предпросмотр ассета, а не интерактивная модель.'}</p><p><a href="/model-review/">Посмотреть спереди, сбоку и под углом ↗</a></p><p>По метаданным Sketchfab: 122 706 треугольников, 62 144 вершины, 6 материалов, 0 текстур. Скачанный архив содержит один оригинальный файл source/Tesla optimus.glb (3 737 372 байта), экспортёр Khronos glTF Blender I/O v4.3.47. В нём нет скелета, анимаций и внешних текстур.</p></section><section><h2>Оценённый платный кандидат</h2><p><a href="https://www.cgtrader.com/3d-models/character/sci-fi-character/optimus-tesla-bot-gen-3">Optimus Tesla Bot Gen 3</a> — WolFsamii, $15 на дату проверки. Заявлены Blender 4.3 (314 MB), FBX (218 MB), OBJ (217 MB), PBR-текстуры 2K и скелет. GLB в списке не указан.</p><p>Лицензия: Royalty Free License (no AI). Модель не куплена и не используется. <a href="https://help.cgtrader.com/hc/en-us/articles/360015124437-Royalty-Free-License">Условия CGTrader</a> ограничивают доступ конечного пользователя к исходному ассету. Для распространения GLB через веб-сайт требуется уточнение допустимого способа использования у правообладателя. Название продавца «Gen 3» не доказывает соответствие официальному роботу.</p></section><section id="film"><h2>Фоновое видео первого экрана</h2><p>«{site.film.title}» — <a href={site.film.source}>{site.film.author} / Pexels</a>, <a href={site.film.licenseUrl}>{site.film.license}</a>. Ролик с промышленными роботами используется как визуальный фон. Он не показывает проекты Эрнеста и не обозначается как съёмка Tesla.</p><p>Композиционный референс первого экрана — <a href="https://www.tesla.com/careers">Tesla Careers</a>: полноэкранное видео, прозрачная навигация и центрированный заголовок. Видеофайл из референса не используется.</p></section><section><h2>Видео и изображения</h2><p>Видео Tesla встроены официальным плеером YouTube. Постеры предоставляются YouTube. Ролики не скачивались и не переиздавались. У плееров сохранены управление, указание автора и ссылка на оригинал; видео автоматически запускаются без звука при появлении в кадре и останавливаются вне видимой области.</p><p>Фоновый MP4 первого экрана распространяется по лицензии Pexels. Содержательные ролики Tesla воспроизводятся официальным YouTube-плеером. <a href="https://www.youtube.com/static?template=terms">Условия YouTube</a> · <a href="https://support.google.com/youtube/answer/171780">Документация встраивания</a>.</p><p>Статичное изображение для режима без WebGL отрендерено из того же ассета. Автор и CC BY 4.0 указаны рядом со сценой. Контрольные точки и пропорции источника сохранены; поверхность между ними сглажена. Свет, отражения и кадрирование настроены для сайта.</p></section><section><h2>Редакционные принципы</h2><p>Источники указаны в каждой статье. Показанные возможности, заявления производителя и планы описаны отдельно. Страница не связана с Tesla и не подразумевает её поддержку. В портфолио показаны два опубликованных учебных проекта Эрнеста. Состав функций и стек подтверждены их README и рабочими демо. Данные в них демонстрационные; неподтверждённые достижения и метрики не добавлены.</p><p>Логотип и фотография предоставлены Эрнестом для этого сайта. Их прозрачность и пропорции сохранены; версии для сайта уменьшены, а кадрирование задаётся стилями. GitHub, Telegram и LinkedIn перенесены из предыдущего опубликованного портфолио Эрнеста. Email не указан, соответствующая кнопка скрыта. Весь персональный контент хранится в файле данных проекта.</p></section><section><h2>Дизайн и код</h2><p>Новая дизайн-система опирается на <a href="https://github.com/nextlevelbuilder/ui-ux-pro-max-skill">UI UX Pro Max / Next Level Builder, MIT</a>: Scroll-Triggered Storytelling и 3D &amp; Hyperrealism. Источники композиционных приёмов — <a href="https://21st.dev/@manuarora700/components/lamp">Lamp</a> и <a href="https://21st.dev/@manuarora700/components/glowing-effect">Glowing Effect</a> от Manu Arora / Aceternity UI на 21st.dev, MIT. Свет, подсветка карточек и переходы реализованы для этого проекта на CSS и React; исходный код компонентов не копировался. Manrope — <a href="https://github.com/sharanda/manrope">Mikhail Sharanda, SIL Open Font License</a>. Стек: React, TypeScript, Vite и Three.js.</p></section></main>;
}

function App() {
  const motion = useMotion();
  const path = location.pathname.replace(/\/+$/, '') || '/';
  const article = articles.find(a => path === `/journal/${a.slug}`);
  useScrollScenes();
  useInitialAnchor();
  return <><a href="#main" className="skip-link">К содержанию</a><div className="reading-progress" aria-hidden="true"/><Header/>{path === '/model-review' ? <ModelReview/> : article ? <ArticlePage article={article}/> : path === '/credits' ? <Credits/> : path === '/' ? <Home motion={motion}/> : <main id="main" className="not-found"><Label>404 / СТРАНИЦА НЕ НАЙДЕНА</Label><h1>Здесь пока<br/>пусто.</h1><a href="/" className="button button-primary">Вернуться в лабораторию <Arrow/></a></main>}<Footer/></>;
}

createRoot(document.getElementById('root')!).render(<React.StrictMode><App/></React.StrictMode>);
