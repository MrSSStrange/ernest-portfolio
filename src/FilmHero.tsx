import { useEffect, useRef, useState } from 'react';
import { site } from './data';
import { Icon } from './ui';
import type { MotionSettings } from './Hero';

export function FilmHero({ reduced, paused, onPause }: MotionSettings) {
  const section = useRef<HTMLElement>(null);
  const video = useRef<HTMLVideoElement>(null);
  const visible = useRef(true);
  const explicitPlay = useRef(false);
  const [playing, setPlaying] = useState(false);
  const [blocked, setBlocked] = useState(false);
  const [failed, setFailed] = useState(false);

  const sync = () => {
    const player = video.current;
    if (!player) return;
    if (visible.current && !document.hidden && !paused && (!reduced || explicitPlay.current)) {
      player.muted = true;
      if (player.paused) player.play().then(() => setBlocked(false)).catch(error => { if (error?.name !== 'AbortError') setBlocked(true); });
    } else player.pause();
  };

  useEffect(() => {
    let frame = 0;
    const update = () => {
      frame = 0;
      const bounds = section.current?.getBoundingClientRect();
      if (!bounds) return;
      const height = Math.max(0, Math.min(bounds.bottom, innerHeight) - Math.max(bounds.top, 0));
      visible.current = height >= bounds.height * .25;
      sync();
    };
    const request = () => { if (!frame) frame = requestAnimationFrame(update); };
    addEventListener('scroll', request, { passive: true });
    addEventListener('resize', request);
    addEventListener('pageshow', request);
    document.addEventListener('visibilitychange', update);
    update();
    return () => { cancelAnimationFrame(frame); removeEventListener('scroll', request); removeEventListener('resize', request); removeEventListener('pageshow', request); document.removeEventListener('visibilitychange', update); video.current?.pause(); };
  }, [reduced, paused]);

  const toggle = () => {
    if (failed) { setFailed(false); video.current?.load(); }
    if (reduced) {
      explicitPlay.current = !playing;
      sync();
    } else if (blocked && !paused) {
      explicitPlay.current = true;
      sync();
    } else onPause();
  };

  return <section ref={section} className="film-hero" id="top" aria-labelledby="film-title" data-playing={playing}>
    <video ref={video} className="film-video" src={site.film.src} poster={site.film.poster} muted loop playsInline preload={reduced ? 'none' : 'auto'} onLoadedData={sync} onPlaying={() => { if (!visible.current || document.hidden || paused || (reduced && !explicitPlay.current)) { video.current?.pause(); return; } setPlaying(true); setBlocked(false); }} onPause={() => setPlaying(false)} onError={() => setFailed(true)} aria-label="Промышленная робототехника — фоновое видео"/>
    <div className="film-shade" aria-hidden="true"/>
    <div className="film-heading"><p className="film-eyebrow">AI / ML ENGINEERING</p><h1 id="film-title">Эрнест Музафаров</h1><p className="film-tagline">Любопытство становится инженерией.</p></div>
    <div className="film-bottom"><p className="film-intro">Изучаю интеллект.<br/>Создаю первые системы.</p><div className="film-actions"><a href="#projects">Мои проекты</a><a href="#robot">Исследовать Optimus</a></div><a className="film-scroll" href="#robot" aria-label="Перейти к интерактивной 3D-сцене">↓</a></div>
    <button className="film-pause" onClick={toggle} aria-label={playing ? 'Пауза фонового видео' : 'Воспроизвести фоновое видео'} aria-pressed={!playing}><Icon name={playing ? 'pause' : 'play'} size={19}/></button>
    {(blocked || failed) && <button className="film-play-fallback" onClick={toggle}><Icon name="play" size={16}/>{failed ? 'Повторить загрузку видео' : 'Воспроизвести видео'}</button>}
    <a className="film-credit" href="/credits/#film">Видео: {site.film.author} / Pexels ↗</a>
  </section>;
}
