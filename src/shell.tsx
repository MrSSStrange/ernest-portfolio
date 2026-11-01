import { useEffect, useRef, useState } from 'react';
import { site, generations, type Generation } from './data';
import { Arrow, Icon, Label, Mark } from './ui';
import { Video } from './Video';

const navigation = [
  { id: 'about', label: 'Обо мне' }, { id: 'evolution', label: 'Optimus' },
  { id: 'projects', label: 'Проекты' }, { id: 'journal', label: 'Журнал' },
];

export function Header() {
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState('');
  const [overFilm, setOverFilm] = useState(location.pathname === '/' && (!location.hash || location.hash === '#top'));
  const [light, setLight] = useState(document.documentElement.dataset.theme === 'light');
  const toggle = useRef<HTMLButtonElement>(null);
  useEffect(() => {
    if (!open) return;
    const close = (e: KeyboardEvent) => { if (e.key === 'Escape') { setOpen(false); toggle.current?.focus(); } };
    const outside = (e: PointerEvent) => { if (!(e.target as HTMLElement).closest('.header')) setOpen(false); };
    document.addEventListener('keydown', close);
    document.addEventListener('pointerdown', outside);
    return () => { document.removeEventListener('keydown', close); document.removeEventListener('pointerdown', outside); };
  }, [open]);
  useEffect(() => {
    const observer = new IntersectionObserver(entries => {
      for (const entry of entries) if (entry.isIntersecting) setActive(entry.target.id === 'top' ? '' : entry.target.id);
    }, { rootMargin: '-18% 0px -62% 0px' });
    const intro = document.getElementById('top'); if (intro) observer.observe(intro);
    navigation.forEach(({ id }) => { const node = document.getElementById(id); if (node) observer.observe(node); });
    return () => observer.disconnect();
  }, []);
  useEffect(() => {
    let frame = 0;
    const update = () => {
      frame = 0;
      const film = document.querySelector('.film-hero');
      const rect = film?.getBoundingClientRect();
      setOverFilm(Boolean(rect && rect.top < innerHeight * .3 && rect.bottom > 84));
    };
    const request = () => { if (!frame) frame = requestAnimationFrame(update); };
    addEventListener('scroll', request, { passive: true });
    addEventListener('resize', request);
    update();
    return () => { cancelAnimationFrame(frame); removeEventListener('scroll', request); removeEventListener('resize', request); };
  }, []);
  const theme = () => {
    const next = !light;
    setLight(next);
    document.documentElement.dataset.theme = next ? 'light' : 'dark';
    document.querySelector('meta[name="theme-color"]')?.setAttribute('content', next ? '#eff3f8' : '#080b10');
    try { localStorage.setItem('ernest-theme', next ? 'light' : 'dark'); } catch { /* Storage is optional. */ }
    window.dispatchEvent(new Event('ernest-theme-change'));
  };
  return <header className={`header ${open ? 'menu-is-open' : ''} ${overFilm ? 'over-film' : ''}`}>
    <a href="/" className="brand" aria-label="Эрнест — на главную"><span className="brand-mark"><Mark/></span><span>ernest<span className="brand-suffix">.lab</span><small>AI / ML ENGINEERING</small></span></a>
    <nav id="main-navigation" className={open ? 'nav open' : 'nav'} aria-label="Главная навигация">
      {navigation.map(item => <a key={item.id} href={`/#${item.id}`} aria-current={active === item.id ? 'location' : undefined} onClick={() => { setActive(item.id); setOpen(false); }}>{item.label}</a>)}
      <a href="/#contact" className="mobile-contact" onClick={() => setOpen(false)}>На связи<Arrow diagonal/></a>
    </nav>
    <div className="header-tools"><button className="icon-button theme-toggle" onClick={theme} aria-label={light ? 'Включить тёмную тему' : 'Включить светлую тему'}><Icon name={light ? 'moon' : 'sun'} size={18}/></button><a href="/#contact" className="header-contact">На связи<Arrow diagonal/></a><button ref={toggle} id="menu-toggle" className="icon-button menu-toggle" aria-expanded={open} aria-controls="main-navigation" aria-label={open ? 'Закрыть меню' : 'Открыть меню'} onClick={() => setOpen(!open)}>{open ? <Icon name="close"/> : <span className="menu-lines"><i/><i/></span>}</button></div>
  </header>;
}

export function GenerationMedia({ item }: { item: Generation }) {
  if (item.video) return <Video key={item.id} id={item.video} title={item.sourceTitle.replace('Tesla · ', '')} compact/>;
  return <div className="document-scene"><span className="document-type mono">TESLA / INVESTOR RELATIONS</span><div className="document-orbit" aria-hidden="true"/><span className="document-big">03<span>GENERATION</span></span><div className="document-description"><h4>Следующий этап. <br/>{' '}<span>Сначала — факты.</span></h4><p>Название подтверждено Tesla. Внешний вид не подтверждён выбранными источниками.</p><a className="text-link" href={item.source} target="_blank" rel="noreferrer">Открыть документ<Arrow diagonal/></a></div></div>;
}

export function Evolution() {
  const [selected, setSelected] = useState(2);
  const item = generations[selected];
  const select = (i: number, focus = false) => {
    const next = (i + generations.length) % generations.length;
    setSelected(next);
    if (focus) document.getElementById(`tab-${generations[next].id}`)?.focus();
  };
  return <section className="section evolution" id="evolution" data-scroll-section>
    <div className="section-heading reveal"><div><Label number="02">ТЕХНОЛОГИИ В ДВИЖЕНИИ</Label><h2>Будущее уже <br/>{' '}<span className="muted">делает первые шаги.</span></h2></div><p>История Tesla Optimus. <br/>{' '}От открытой механики — к точному движению. <br/>{' '}<span className="subtle">Демонстрации, заявления и планы — с источниками.</span></p></div>
    <div className="cinema reveal">
      <div className="cinema-top"><span className="cinema-title"><span className="status-dot"/>OPTIMUS / FIELD NOTES</span><a className="text-link" href="/journal/optimus-evolution/">Читать исследование<Arrow diagonal/></a></div>
      <div className="generation-tabs" role="tablist" aria-label="Этапы развития Optimus">{generations.map((g, i) => <button key={g.id} id={`tab-${g.id}`} type="button" role="tab" aria-controls="generation-panel" aria-selected={i === selected} tabIndex={i === selected ? 0 : -1} onClick={() => select(i)} onKeyDown={e => {
        if (['ArrowRight', 'ArrowLeft', 'Home', 'End'].includes(e.key)) { e.preventDefault(); select(e.key === 'Home' ? 0 : e.key === 'End' ? 3 : i + (e.key === 'ArrowRight' ? 1 : -1), true); }
      }}><span className="generation-tab-index">0{i + 1}<i/></span><span>{i === 0 ? 'Прототип' : i === 1 ? 'Optimus' : `Gen ${i}`}<small>{g.year}</small></span><Arrow diagonal/></button>)}</div>
      <div className="evolution-layout" id="generation-panel" role="tabpanel" aria-labelledby={`tab-${item.id}`}>
        <div className="evolution-media" key={`media-${item.id}`}><GenerationMedia item={item}/></div>
        <div className="generation-copy" key={item.id}><span className="generation-status mono">{item.status}</span><h3>{item.title}</h3><p>{item.description}</p><dl><div><dt><span/>ЧТО ПОКАЗАНО</dt><dd>{item.demonstrated}</dd></div><div><dt><span/>НОВЫЙ ШАГ</dt><dd>{item.difference}</dd></div></dl><a className="source-note" href={item.source} target="_blank" rel="noreferrer">{item.date}<Arrow diagonal/></a></div>
      </div>
      <div className="cinema-bottom"><p><span className="editorial-symbol">i</span>{item.caveat}</p><div className="cinema-arrows"><button className="icon-button" onClick={() => select(selected - 1)} aria-label="Предыдущий этап"><span className="flipped"><Arrow/></span></button><span className="mono">0{selected + 1} / 04</span><button className="icon-button" onClick={() => select(selected + 1)} aria-label="Следующий этап"><Arrow/></button></div></div>
    </div>
  </section>;
}

export function Cover({ type }: { type: 'agent' | 'vision' | 'robot' }) {
  if (type === 'robot') return <div className="cover cover-robot"><img src="https://i.ytimg.com/vi/cpraXaw7dyc/hqdefault.jpg" width="480" height="360" alt="Optimus Gen 2 в официальном видео Tesla" loading="lazy"/><div className="cover-robot-shade"/><span className="cover-index">03 / ROBOTICS</span><span className="cover-overline">HUMAN <br/>{' '}<span>AFTER ALL.</span></span><span className="cover-corner">↗</span></div>;
  return <div className={`cover cover-${type}`} aria-hidden="true"><span className="cover-index">{type === 'agent' ? '01 / ARTIFICIAL INTELLIGENCE' : '02 / MACHINE LEARNING'}</span>{type === 'agent' ? <><div className="cover-circuit"><svg viewBox="0 0 500 280" fill="none"><path d="M0 80h100l50 60h200l50-60h100M0 200h100l50-60m200 0 50 60h100M250 0v280" stroke="currentColor"/><circle cx="250" cy="140" r="84" stroke="currentColor" strokeDasharray="3 8"/><circle cx="250" cy="140" r="108" stroke="currentColor" opacity=".3"/></svg><div className="circuit-core"><Icon name="ai" size={40}/><small>AGENT</small></div><i className="circuit-point p1"/><i className="circuit-point p2"/></div><span className="cover-bottom-label">МОДЕЛЬ + ИНСТРУМЕНТЫ + ПАМЯТЬ</span></> : <><div className="cover-pointcloud">{Array.from({ length: 74 }, (_, i) => <i key={i} style={{ left: `${50 + Math.sin(i * 2.4) * (10 + i % 18)}%`, top: `${50 + Math.cos(i * 3.1) * (10 + i % 24)}%`, opacity: .3 + (i % 5) * .14 }}/>)}</div><div className="detection-frame"><span>OBJECT_01</span><i/><i/><i/><i/></div><span className="cover-bottom-label">ОТ ПИКСЕЛЕЙ — К ДЕЙСТВИЮ</span></>}</div>;
}

export function Footer() {
  const { github, telegram, linkedin, email } = site.contacts;
  const hasContacts = Boolean(github || telegram || linkedin || email);
  return <footer id="contact" className="footer" data-scroll-section>
    <div className="footer-light" aria-hidden="true"/>
    <div className="footer-inner"><div className="footer-kicker reveal"><Label number="05">ПРОДОЛЖЕНИЕ СЛЕДУЕТ</Label><span className="pill"><span className="status-dot"/>ALWAYS LEARNING</span></div>
      <div className="footer-main reveal"><h2>Будущее начинается <br/>{' '}с хорошего <span>вопроса.</span></h2><div className="footer-contact"><p>Исследовать новое. <br/>{' '}Обсуждать сложное. <br/>{' '}Создавать осмысленное.</p><div className="contact-links">{github && <a href={github} target="_blank" rel="noreferrer">GitHub<Arrow diagonal/></a>}{telegram && <a href={telegram} target="_blank" rel="noreferrer">Telegram<Arrow diagonal/></a>}{linkedin && <a href={linkedin} target="_blank" rel="noreferrer">LinkedIn<Arrow diagonal/></a>}{email && <a href={`mailto:${email}`}>Написать мне<Arrow diagonal/></a>}{!hasContacts && <span className="contacts-pending"><span/>Контакты появятся здесь.</span>}</div></div></div>
      <div className="footer-bottom"><a href="/" className="footer-brand"><Mark/>ernest.lab</a><span>© 2026 Эрнест / Личная лаборатория</span><a href="/credits/">Источники и материалы<Arrow diagonal/></a><a className="back-top icon-button" href={location.pathname === '/' ? '#top' : '#main'} aria-label="Вернуться наверх">↑</a></div>
    </div>
  </footer>;
}
