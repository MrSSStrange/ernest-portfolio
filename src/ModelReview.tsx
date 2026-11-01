import { useEffect, useRef, useState } from 'react';
import { site } from './data';
import { Label } from './components';

export function ModelReview() {
  const host = useRef<HTMLDivElement>(null);
  const angle = useRef(0);
  const [selected, setSelected] = useState(0);
  const [status, setStatus] = useState('loading');
  useEffect(() => {
    let cancelled = false;
    let cleanup: (() => void) | undefined;
    import('./scene').then(async ({ mountHead }) => {
      if (!host.current || cancelled) return;
      const stop = await mountHead(host.current, { url: site.model.headUrl, rotation: site.model.rotation, framing: 'review', motion: () => false, view: () => angle.current, onStatus: setStatus });
      if (cancelled) stop(); else cleanup = stop;
    }).catch(() => setStatus('error'));
    return () => { cancelled = true; cleanup?.(); };
  }, []);
  const select = (i: number) => { angle.current = [0, Math.PI / 2, Math.PI / 5][i]; setSelected(i); window.dispatchEvent(new Event('ernest-motion-change')); };
  return <main id="main" className="model-review"><a href="/" className="back-link">← На главную</a><Label>КОНТРОЛЬНЫЕ РАКУРСЫ / СГЛАЖЕННЫЙ АССЕТ</Label><h1>Геометрия в деталях.</h1><div className="review-layout"><div ref={host} className="review-host" data-status={status} data-view={selected}/><div className="review-copy"><div className="review-controls">{['Спереди', 'Сбоку', 'Под углом'].map((title, i) => <button key={title} aria-pressed={selected === i} onClick={() => select(i)}>{title}</button>)}</div><span className="mono">{status === 'ready' ? 'GLB ЗАГРУЖЕН / 122 508 ТРЕУГОЛЬНИКОВ' : status === 'error' ? 'ОШИБКА ЗАГРУЗКИ WEBGL' : 'ЗАГРУЗКА АССЕТА'}</span><p>Отдельный файл головы с шеей и основанием. Три существующие группы материалов исходной модели: Head, Lights, Face.</p><p>Размер сглаженного GLB — 1 759 760 байт. Между исходными контрольными точками добавлена гладкая поверхность. Все исходные точки и размеры сохранены; сжатие meshopt проверено без потерь.</p><p>Эта авторская модель по мотивам Optimus не обозначается как подтверждённый дизайн Gen 3.</p><p><a className="text-link" href={site.model.source} target="_blank" rel="noreferrer">Mechamaner.V / Sketchfab ↗</a></p><p><a className="text-link" href={site.model.licenseUrl} target="_blank" rel="noreferrer">CC BY 4.0 ↗</a></p></div></div></main>;
}
