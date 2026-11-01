import { useEffect, useRef, useState } from 'react';
import { generations } from './data';
import { Label, Arrow } from './ui';
import { GenerationMedia } from './shell';

export function InteractiveTimeline() {
  const [selected, setSelected] = useState(0);
  const refs = useRef<Array<HTMLElement | null>>([]);
  useEffect(() => {
    const observer = new IntersectionObserver(entries => {
      for (const entry of entries) if (entry.isIntersecting) setSelected(Number((entry.target as HTMLElement).dataset.index));
    }, { rootMargin: '-25% 0px -50% 0px' });
    refs.current.forEach(ref => { if (ref) observer.observe(ref); });
    return () => observer.disconnect();
  }, []);
  return <div className="timeline-story">
    <div className="timeline-sticky"><div className="timeline-navigation" aria-label="Перейти к этапу">{generations.map((g, i) => <button key={g.id} aria-pressed={selected === i} onClick={() => { setSelected(i); refs.current[i]?.scrollIntoView({ behavior: document.documentElement.dataset.motion === 'off' ? 'instant' : 'smooth', block: 'center' }); }}>{i === 0 ? '2022' : i === 1 ? '2023' : `Gen ${i}`}</button>)}</div><GenerationMedia item={generations[selected]}/></div>
    <div className="timeline-chapters">{generations.map((g, i) => <section data-index={i} ref={el => { refs.current[i] = el; }} key={g.id} className={`timeline-chapter ${selected === i ? 'active' : ''}`}><span className="mono blue">0{i + 1} / {g.date}</span><h3>{g.title}</h3><div className="timeline-mobile-media"><GenerationMedia item={g}/></div><span className="pill">{g.status}</span><p>{g.description}</p><dl><dt>Внешний вид</dt><dd>{g.appearance}</dd><dt>Демонстрация или заявление</dt><dd>{g.demonstrated}</dd><dt>Отличия</dt><dd>{g.difference}</dd></dl><p className="editorial-note">{g.caveat}</p><a href={g.source} target="_blank" rel="noreferrer" className="source-note">{g.sourceTitle} ↗</a></section>)}</div>
  </div>;
}

export function AgentDemo() {
  const [step, setStep] = useState(0);
  const [task, setTask] = useState('math');
  const [memory, setMemory] = useState(true);
  const steps = ['Запрос', 'Модель', 'Инструмент', 'Результат'];
  const math = task === 'math';
  const texts = math ? ['«Сколько будет 137 × 24?»', `Выбран калькулятор. ${memory ? 'Из контекста: нужен короткий ответ.' : 'Дополнительного контекста нет.'}`, 'Калькулятор выполняет 137 × 24.', `Результат инструмента: ${137 * 24}. Ответ опирается на вычисление.`] : ['«Где опубликован Optimus Gen 2?»', `Выбран поиск по первичным источникам. ${memory ? 'Из контекста: предпочитаем Tesla.' : 'Дополнительного контекста нет.'}`, 'В демонстрации возвращён заранее выбранный официальный ролик Tesla.', 'Optimus — Gen 2 · Tesla · 13 декабря 2023. Ссылка доступна в источниках статьи об Optimus.'];
  return <div className="interactive agent-demo"><div className="interactive-top"><Label>РАЗОБРАТЬ ПО ШАГАМ</Label><span className="mono">0{step + 1} / 04</span></div><label className="select-label">Задача <select value={task} onChange={e => { setTask(e.target.value); setStep(0); }}><option value="math">Вычислить выражение</option><option value="source">Найти первичный источник</option></select></label><div className="agent-flow">{steps.map((label, i) => <button className={`flow-node ${i === step ? 'active' : ''} ${i < step ? 'passed' : ''}`} key={label} onClick={() => setStep(i)} aria-pressed={i === step}><span>0{i + 1}</span>{label}{i < 3 && <Arrow/>}</button>)}</div><div className="agent-output" aria-live="polite"><span className="mono blue">{steps[step].toUpperCase()}</span><p>{texts[step]}</p></div><div className="interactive-controls"><label className="checkbox-label"><input type="checkbox" checked={memory} onChange={e => setMemory(e.target.checked)}/>Добавить контекст</label><button className="button button-small" onClick={() => setStep(step === 3 ? 0 : step + 1)}>{step === 3 ? 'Начать заново' : 'Следующий шаг'}<Arrow/></button></div><p className="demo-disclaimer">Демонстрация принципа. Здесь нет вызова LLM или живого поиска; арифметика выполняется в браузере.</p></div>;
}

export function PerceptionDemo() {
  const [noise, setNoise] = useState(22);
  return <div className="interactive perception-demo"><div className="interactive-top"><Label>ОТ НАБЛЮДЕНИЯ К ДЕЙСТВИЮ</Label><span className="mono">SIMULATION</span></div><div className="perception-stage"><svg viewBox="0 0 560 240" role="img" aria-label="Учебная схема: наблюдаемые точки предмета и оценка его положения"><defs><pattern id="scene-grid" width="28" height="28" patternUnits="userSpaceOnUse"><path d="M 28 0 L 0 0 0 28" fill="none" stroke="currentColor" opacity=".12"/></pattern></defs><rect width="560" height="240" fill="url(#scene-grid)"/><path d="M205 75h110v125H205z" fill="currentColor" opacity=".04"/><path d="M205 75h110v125H205z" stroke="currentColor" fill="none" opacity=".3"/>{Array.from({ length: 62 }, (_, i) => { const a = i * 2.399; const r = 13 + (i % 9) * 6; const offset = Math.sin(i * 51.3) * noise * 0.65; return <circle key={i} cx={260 + Math.cos(a) * r + offset} cy={133 + Math.sin(a) * r + offset * 0.5} r="2" fill="#91c0ff" opacity={0.85}/>; })}<rect x={186 + noise * 0.15} y={56 - noise * 0.1} width={148 + noise * 0.2} height={160 + noise * 0.1} rx="2" fill="none" stroke="#91c0ff" strokeDasharray="6 5"/><path d="M375 125h75m-9-8 9 8-9 8" stroke="currentColor" opacity=".5" fill="none"/><text x="16" y="25" fill="currentColor" fontSize="11">КАМЕРА → ОЦЕНКА → ДЕЙСТВИЕ</text><text x="387" y="156" fill="currentColor" fontSize="11">{noise > 65 ? 'НАБЛЮДАТЬ ЕЩЁ' : 'ПОДГОТОВИТЬ ЗАХВАТ'}</text></svg></div><label className="range-label" htmlFor="noise">Шум наблюдения <span>{noise}%</span></label><input id="noise" type="range" min="0" max="100" value={noise} onChange={e => setNoise(Number(e.target.value))}/><p aria-live="polite">{noise > 65 ? 'Наблюдение нестабильно. В этой схеме система выбирает повторное измерение.' : 'Оценка достаточно устойчива для следующего шага учебного сценария.'}</p><p className="demo-disclaimer">Условная визуализация. Порог выбран для объяснения и не является метрикой реального робота.</p></div>;
}

