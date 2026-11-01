import { useEffect, useRef, useState } from 'react';
import { site, articles, readingTime } from './data';
import { Hero, type MotionSettings } from './Hero';
import { FilmHero } from './FilmHero';
import { Cover, Evolution } from './shell';
import { Arrow, Icon, Label, SignalDiagram, Spotlight } from './ui';

const disciplines = [
  { id: 'ai' as const, title: 'Искусственный интеллект', short: 'AI', text: 'Как модель становится частью системы: инструменты, контекст, память и проверяемый результат.', question: 'Как превратить ответ в действие?', link: '/journal/ai-agent/', tags: ['Агенты', 'Инструменты', 'Память'] },
  { id: 'ml' as const, title: 'Машинное обучение', short: 'ML', text: 'Как находить закономерности в данных, проверять гипотезы и понимать, где модель ошибается.', question: 'Что машина узнаёт из данных?', link: '/journal/robot-perception/', tags: ['Данные', 'Модели', 'Эксперименты'] },
  { id: 'robot' as const, title: 'Робототехника', short: 'Robotics', text: 'Как связать восприятие с движением и перенести интеллект из цифровой среды в физический мир.', question: 'Как интеллект обретает форму?', link: '/journal/optimus-evolution/', tags: ['Восприятие', 'Движение', 'Среда'] },
];

function About() {
  const [focus, setFocus] = useState(0);
  const selected = disciplines[focus];
  return <section className="section about" id="about" data-scroll-section>
    <div className="section-heading reveal"><div><Label number="01">ЧЕЛОВЕК В ЦЕНТРЕ СИСТЕМЫ</Label><h2>Сначала — вопрос. <br/>{' '}<span className="muted">Потом — всё остальное.</span></h2></div><p>Я Эрнест. Развиваюсь в AI / ML Engineering <br/>{' '}и учусь смотреть на технологии <br/>{' '}как на системы, которые можно понять.</p></div>
    <div className="about-layout">
      <Spotlight className={`profile-card reveal ${site.photo ? 'has-portrait' : ''}`}><div className="profile-card-top"><span className="mono">ABOUT / ERNEST</span><span className="tiny-cross">+</span></div><div className="profile-portrait">{site.photo ? <img src={site.photo} srcSet={site.photoSrcSet} sizes="(max-width:390px) calc(100vw - 40px), (max-width:720px) 230px, (max-width:960px) 310px, 480px" width="948" height="1000" alt="Эрнест" loading="lazy" decoding="async"/> : <><div className="monogram-orbit"/><span className="portrait-monogram">э<span>.</span></span><span className="portrait-placeholder-label mono">МЕСТО ДЛЯ МОЕГО ФОТО</span></>}</div><div className="profile-card-copy"><span className="pill">В процессе обучения</span><h3>Разбираться глубже. <br/>{' '}<span>Делать осознаннее.</span></h3><p>{site.about}</p></div></Spotlight>
      <div className="focus-lab reveal"><div className="focus-lab-heading"><Label>ТРИ НАПРАВЛЕНИЯ. ОДНА СВЯЗЬ.</Label><span className="mono">ВЫБЕРИТЕ НАПРАВЛЕНИЕ ↙</span></div><div className="discipline-tabs" role="tablist" aria-label="Направления обучения">{disciplines.map((item, i) => <button type="button" role="tab" key={item.id} id={`focus-tab-${item.id}`} aria-selected={focus === i} aria-controls="focus-panel" tabIndex={focus === i ? 0 : -1} onClick={() => setFocus(i)} onKeyDown={e => { if (['ArrowLeft', 'ArrowRight', 'Home', 'End'].includes(e.key)) { e.preventDefault(); const next = e.key === 'Home' ? 0 : e.key === 'End' ? 2 : (i + (e.key === 'ArrowRight' ? 1 : 2)) % 3; setFocus(next); document.getElementById(`focus-tab-${disciplines[next].id}`)?.focus(); } }}><Icon name={item.id}/><span>{item.short}</span><span className="discipline-index mono" aria-hidden="true">0{i + 1}</span></button>)}</div>
        <div className="focus-panel" id="focus-panel" role="tabpanel" aria-labelledby={`focus-tab-${selected.id}`} key={selected.id}><div className="focus-question"><span className="mono">ВОПРОС, КОТОРЫЙ МЕНЯ ЗАНИМАЕТ</span><h3>{selected.question}</h3></div><SignalDiagram mode={selected.id}/><div className="focus-description"><div><h4>{selected.title}</h4><p>{selected.text}</p><div className="tags">{selected.tags.map(tag => <span key={tag}>{tag}</span>)}</div></div><a className="round-arrow" href={selected.link} aria-label={`Читать материал: ${selected.title}`}><Arrow diagonal/></a></div><span className="diagram-disclaimer mono">УПРОЩЁННАЯ СХЕМА ПРИНЦИПА</span></div>
      </div>
    </div>
  </section>;
}

function Bridge() {
  return <div className="bridge" data-scroll-section aria-hidden="true"><div className="bridge-line"/><div className="bridge-words"><span>ЧЕЛОВЕК.</span><span>МАШИНА.</span><span>ВОЗМОЖНОСТИ.</span></div><div className="bridge-caption mono"><span>HUMAN CURIOSITY</span><span className="bridge-star"><Icon name="plus"/></span><span>MACHINE INTELLIGENCE</span></div></div>;
}

function Projects() {
  const [selected, setSelected] = useState<(typeof site.projects)[number] | null>(null);
  const dialog = useRef<HTMLDialogElement>(null);
  useEffect(() => {
    if (!selected) return;
    const priorOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    dialog.current?.showModal();
    return () => { document.body.style.overflow = priorOverflow; };
  }, [selected]);
  return <section className="section projects" id="projects" data-scroll-section>
    <div className="section-heading reveal"><div><Label number="03">ОТ ИДЕИ — К ИНТЕРФЕЙСУ</Label><h2>Первые проекты.<br/> <span className="muted">Настоящая практика.</span></h2></div><p>Интерфейсы, данные и понятные действия.<br/> Два учебных проекта из моего GitHub.<br/> <span className="subtle">Работающие демо. Открытый код.</span></p></div>
    <div className="project-grid">{site.projects.map(project => <Spotlight className="project-card reveal" key={project.id}>
      <div className="project-card-top"><span className="mono">PROJECT / {project.number}</span><span className="concept-badge"><span/>УЧЕБНЫЙ ПРОЕКТ</span></div>
      <a className="project-preview" href={project.demo} target="_blank" rel="noreferrer" aria-label={`Открыть демо: ${project.title}`}><div className="preview-toolbar" aria-hidden="true"><span className="window-dots"><i/><i/><i/></span><span>{project.id === 'supportdesk' ? 'supportdesk / inbox' : 'appointments / schedule'}</span><Arrow diagonal/></div><img src={project.image} width="1440" height="900" alt={project.imageAlt} loading="lazy" decoding="async"/><span className="preview-open" aria-hidden="true">Открыть демо<Arrow diagonal/></span></a>
      <div className="project-copy"><span className="mono project-category">{project.category}</span><h3>{project.title}</h3><p>{project.summary}</p><div className="project-bottom"><div className="tags">{project.technologies.slice(0, 3).map(tag => <span key={tag}>{tag}</span>)}</div><button className="round-arrow" onClick={() => setSelected(project)} aria-haspopup="dialog" aria-label={`Подробнее о проекте: ${project.title}`}><Arrow diagonal/></button></div><div className="project-actions"><a className="text-link" href={project.demo} target="_blank" rel="noreferrer">Демонстрация<Arrow diagonal/></a><a className="text-link" href={project.github} target="_blank" rel="noreferrer">GitHub<Arrow diagonal/></a><button className="text-link" onClick={() => setSelected(project)} aria-haspopup="dialog">О проекте<Arrow/></button></div></div>
    </Spotlight>)}</div>
    <dialog ref={dialog} className="project-dialog" onClose={() => setSelected(null)} onClick={e => { if (e.target === e.currentTarget) dialog.current?.close(); }} aria-labelledby="project-dialog-title">{selected && <div className="dialog-inner"><div className="dialog-top"><Label>УЧЕБНЫЙ ПРОЕКТ / {selected.number}</Label><button className="icon-button" aria-label="Закрыть проект" onClick={() => dialog.current?.close()}><Icon name="close"/></button></div><h2 id="project-dialog-title">{selected.title}</h2><p className="lead">{selected.summary}</p><img className="dialog-project-image" src={selected.image} width="1440" height="900" alt={selected.imageAlt}/><dl>{[['Задача', selected.task], ['Моя роль', selected.role], ['Подход', selected.approach], ['Технологии', selected.technologies.join(' · ')], ['Результат', selected.result]].map(([term, description]) => <div key={term}><dt>{term}</dt><dd>{description}</dd></div>)}</dl><div className="dialog-project-actions"><a className="button button-primary" href={selected.demo} target="_blank" rel="noreferrer">Открыть демо<Arrow diagonal/></a><a className="button button-ghost" href={selected.github} target="_blank" rel="noreferrer">Посмотреть код<Arrow diagonal/></a></div></div>}</dialog>
  </section>;
}

function Journal() {
  const [filter, setFilter] = useState('Все');
  const filtered = articles.filter(article => filter === 'Все' || article.category === filter);
  return <section className="section journal" id="journal" data-scroll-section>
    <div className="section-heading reveal"><div><Label number="04">ОТКРЫТЫЙ ЖУРНАЛ</Label><h2>Разобраться. <br/>{' '}<span className="muted">И поделиться.</span></h2></div><div className="journal-heading-side"><p>Сложные технологии — <br/>{' '}через понятные визуальные истории.</p><div className="journal-filters" aria-label="Фильтры журнала">{['Все', 'AI', 'ML', 'Robotics'].map(category => <button key={category} type="button" aria-pressed={filter === category} onClick={() => setFilter(category)}>{category}</button>)}</div></div></div>
    <div className={`journal-grid ${filter !== 'Все' ? 'is-filtered' : ''}`} aria-live="polite">{filtered.map(article => <article className={`article-card article-card-${article.cover}`} key={article.slug}><a href={`/journal/${article.slug}/`} className="article-card-link"><Cover type={article.cover}/><div className="article-card-body"><div className="article-card-meta"><span>{article.category}</span><span>{readingTime(article)} мин чтения</span></div><h3>{article.shortTitle}</h3><p>{article.description}</p><span className="article-card-bottom">Читать историю<span className="round-arrow"><Arrow diagonal/></span></span></div></a></article>)}</div>
    <div className="journal-footnote mono"><span>ЛИЧНЫЕ ЗАМЕТКИ. ПЕРВИЧНЫЕ ИСТОЧНИКИ.</span><span>ОБНОВЛЯЕТСЯ ПО МЕРЕ ИССЛЕДОВАНИЙ ↗</span></div>
  </section>;
}

export function Home({ motion }: { motion: MotionSettings }) {
  return <main id="main"><FilmHero {...motion}/><Hero {...motion}/><About/><Bridge/><Evolution/><Projects/><Journal/></main>;
}
