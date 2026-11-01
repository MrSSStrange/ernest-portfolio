import { useEffect, useRef, useState } from 'react';
import { site } from './data';
import { Arrow, Icon, Label } from './ui';

export type MotionSettings = { reduced: boolean; paused: boolean; onPause: () => void };

export function Hero({ reduced, paused, onPause }: MotionSettings) {
  const host = useRef<HTMLDivElement>(null);
  const motion = useRef(!reduced && !paused);
  const [status, setStatus] = useState<'missing' | 'loading' | 'ready' | 'error'>(site.model.headUrl ? 'loading' : 'missing');
  const [retry, setRetry] = useState(0);
  useEffect(() => {
    motion.current = !reduced && !paused;
    window.dispatchEvent(new Event('ernest-motion-change'));
  }, [reduced, paused]);
  useEffect(() => {
    if (!site.model.headUrl || !host.current) return;
    let cancelled = false;
    let cleanup: (() => void) | undefined;
    import('./scene').then(async ({ mountHead }) => {
      if (cancelled || !host.current) return;
      try {
        const stop = await mountHead(host.current, { url: site.model.headUrl, rotation: site.model.rotation, motion: () => motion.current, onStatus: s => { if (!cancelled) setStatus(s); } });
        if (cancelled) stop(); else cleanup = stop;
      } catch { if (!cancelled) setStatus('error'); }
    }).catch(() => { if (!cancelled) setStatus('error'); });
    return () => { cancelled = true; cleanup?.(); };
  }, [retry]);

  const note = status === 'ready'
    ? reduced ? 'Статичный режим' : paused ? 'Движение на паузе' : 'Следует за курсором'
    : status === 'loading' ? 'Загружаем 3D-сцену' : 'Статичный предпросмотр';

  return <div className="hero-scroll" id="robot">
    <section className="hero" aria-labelledby="robot-title">
      <div className="hero-atmosphere" aria-hidden="true"><div className="light-canopy"/><div className="light-horizon"/><div className="hero-orbit orbit-one"/><div className="hero-orbit orbit-two"/><div className="hero-noise"/></div>
      <div className="hero-inner">
        <div className="hero-copy">
          <span className="pill hero-pill"><span className="status-dot"/>Интерактивное исследование / Optimus</span>
          <h2 id="robot-title" className="studio-title">Интеллект,<br/> <em>обретший форму.</em></h2>
          <p className="hero-description">Проведи курсором — и взгляд машины последует за тобой. Исследование формы, света и движения.</p>
          <div className="hero-actions"><a className="button button-primary" href="#evolution">История Optimus<Arrow/></a><a className="button button-ghost" href="#about">Обо мне<Arrow diagonal/></a></div>
          <div className="hero-signature"><span className="signature-line"/><span>HUMAN × MACHINE<small>Там, где интерес становится исследованием.</small></span></div>
        </div>
        <div className={`hero-visual ${status === 'ready' ? 'is-ready' : 'is-preview'}`}>
          <div className="visual-coordinate mono"><span>OBJECT_01</span><span>HUMAN × MACHINE</span><span className="coordinate-cross">+</span></div>
          <div className="head-halo" aria-hidden="true"/>
          <div ref={host} className="model-canvas" data-status={status}/>
          {status !== 'ready' && <div className="model-poster"><img src={site.model.poster} width="900" height="1200" alt="Авторская голова Optimus от Mechamaner.V" fetchPriority="high"/></div>}
          <div className="model-status"><span className="tracking-icon" aria-hidden="true"><i/><i/><i/><i/><span/></span><div><span>{note}</span><small>Авторская модель по мотивам Optimus</small></div>{status === 'error' && <button className="icon-button" onClick={() => setRetry(v => v + 1)} aria-label="Повторить загрузку 3D">↻</button>}</div>
          <span className="visual-axis mono" aria-hidden="true">Y ↑ <span>Z ↗</span> X →</span>
        </div>
        <div className="hero-next" aria-hidden="true"><Label>ОДНА ИДЕЯ. ТРИ ИЗМЕРЕНИЯ.</Label><p>Понять мир. <br/>{' '}<span>Научить машину.</span> <br/>{' '}Создать действие.</p><div className="next-disciplines"><span>AI</span><i>→</i><span>ML</span><i>→</i><span>Robotics</span></div></div>
      </div>
      <div className="hero-bottom"><a className="scroll-cue" href="#about"><span className="scroll-cue-icon">↓</span><span>ПРОКРУТИТЕ, ЧТОБЫ ИССЛЕДОВАТЬ</span></a><span className="hero-credit"><a href={site.model.source} target="_blank" rel="noreferrer">Mechamaner.V</a><span>/</span><a href={site.model.licenseUrl} target="_blank" rel="noreferrer">CC BY 4.0 ↗</a></span><button className="motion-button" aria-pressed={paused || reduced} disabled={reduced} onClick={onPause}><Icon name={paused ? 'play' : 'pause'} size={16}/>{reduced ? 'Уменьшенное движение' : paused ? 'Включить движение' : 'Пауза анимаций'}</button></div>
    </section>
  </div>;
}
