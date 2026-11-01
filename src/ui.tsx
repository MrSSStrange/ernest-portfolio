import { useRef, type ReactNode, type PointerEvent } from 'react';
import { site } from './data';

export function Arrow({ diagonal = false }: { diagonal?: boolean }) {
  return <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden="true" className={diagonal ? 'arrow diagonal' : 'arrow'}><path d="M4 12h15m-6-6 6 6-6 6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>;
}

export function Label({ children, number }: { children: ReactNode; number?: string }) {
  return <div className="eyebrow">{number && <span className="section-number">{number.padStart(2, '0')}</span>}{children}</div>;
}

export function Mark() {
  return <img className="brand-symbol" src={site.logo} width="40" height="40" alt="" aria-hidden="true" draggable={false}/>;
}

export function Icon({ name, size = 24 }: { name: 'ai' | 'ml' | 'robot' | 'sun' | 'moon' | 'pause' | 'play' | 'plus' | 'close'; size?: number }) {
  const paths = {
    ai: <><rect x="6" y="6" width="12" height="12" rx="3"/><path d="M9 2v4m6-4v4M9 18v4m6-4v4M2 9h4m-4 6h4m12-6h4m-4 6h4M10 10h4v4h-4z"/></>,
    ml: <><path d="m4 17 5-6 5 3 6-9M4 21h17M3 3v18"/><circle cx="9" cy="11" r="1"/><circle cx="14" cy="14" r="1"/></>,
    robot: <><rect x="4" y="7" width="16" height="13" rx="5"/><path d="M12 3v4M1 12v4m22-4v4M8 15h8M9 11h.01M15 11h.01"/><circle cx="12" cy="2" r="1"/></>,
    sun: <><circle cx="12" cy="12" r="4"/><path d="M12 2v2m0 16v2M2 12h2m16 0h2M5 5l1.5 1.5m11 11L19 19M5 19l1.5-1.5m11-11L19 5"/></>,
    moon: <path d="M20 15.5A8.5 8.5 0 0 1 8.5 4a8.5 8.5 0 1 0 11.5 11.5Z"/>,
    pause: <path d="M9 5v14M15 5v14"/>,
    play: <path d="m8 5 11 7-11 7V5Z"/>,
    plus: <path d="M12 4v16M4 12h16"/>,
    close: <path d="m6 6 12 12M6 18 18 6"/>,
  };
  return <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">{paths[name]}</svg>;
}

// Original lightweight implementation inspired by 21st.dev's Glowing Effect.
// Pointer coordinates change CSS custom properties, never React render state.
export function Spotlight({ children, className = '' }: { children: ReactNode; className?: string }) {
  const node = useRef<HTMLDivElement>(null);
  const move = (e: PointerEvent<HTMLDivElement>) => {
    if (e.pointerType === 'touch' || document.documentElement.dataset.motion === 'off') return;
    const rect = e.currentTarget.getBoundingClientRect();
    e.currentTarget.style.setProperty('--spot-x', `${e.clientX - rect.left}px`);
    e.currentTarget.style.setProperty('--spot-y', `${e.clientY - rect.top}px`);
  };
  return <div ref={node} className={`spotlight ${className}`} onPointerMove={move}>{children}</div>;
}

export function SignalDiagram({ mode = 'ai' }: { mode?: 'ai' | 'ml' | 'robot' }) {
  const labels = mode === 'ai' ? ['ЗАПРОС', 'МОДЕЛЬ', 'ИНСТРУМЕНТ', 'РЕЗУЛЬТАТ'] : mode === 'ml' ? ['ДАННЫЕ', 'ОБУЧЕНИЕ', 'ПРОВЕРКА', 'МОДЕЛЬ'] : ['КАМЕРА', 'ВОСПРИЯТИЕ', 'ДЕЙСТВИЕ', 'ОБРАТНАЯ СВЯЗЬ'];
  return <div className={`signal-diagram signal-${mode}`} aria-label={labels.join(' → ')}>
    <div className="signal-route" aria-hidden="true"><span/><span/><span/></div>
    {labels.map((label, i) => <div className="signal-node" key={label}><span className="mono">0{i + 1}</span>{i === 1 ? <Icon name={mode} size={26}/> : <span className="node-symbol">{i === 0 ? '↗' : i === 2 ? '+' : '✓'}</span>}<small>{label}</small></div>)}
  </div>;
}
