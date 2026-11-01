import { useEffect, useRef, useState } from 'react';
import { youtubeAPI, type YoutubePlayer } from './youtube';

type Playback = 'waiting' | 'loading' | 'playing' | 'paused' | 'blocked' | 'error';

export function Video({ id, title, compact = false }: { id: string; title: string; compact?: boolean }) {
  const host = useRef<HTMLDivElement>(null);
  const mount = useRef<HTMLDivElement>(null);
  const player = useRef<YoutubePlayer | null>(null);
  const visible = useRef(false);
  const manualPause = useRef(false);
  const programmaticPause = useRef(false);
  const explicitPlay = useRef(false);
  const ready = useRef(false);
  const [wanted, setWanted] = useState(false);
  const [playback, setPlayback] = useState<Playback>('waiting');
  const [muted, setMuted] = useState(true);
  const [started, setStarted] = useState(false);
  const [retry, setRetry] = useState(0);
  const autoplayAllowed = () => explicitPlay.current || (!matchMedia('(prefers-reduced-motion: reduce)').matches && document.documentElement.dataset.motion !== 'off');
  const sync = () => {
    if (!player.current || !ready.current) return;
    if (visible.current && !document.hidden && !manualPause.current && autoplayAllowed()) player.current.playVideo();
    else { programmaticPause.current = true; player.current.pauseVideo(); setPlayback('paused'); }
  };

  useEffect(() => {
    if (!host.current) return;
    const observer = new IntersectionObserver(([entry]) => {
      visible.current = entry.isIntersecting && entry.intersectionRatio >= 0.25;
      if (entry.isIntersecting) setWanted(true);
      sync();
    }, { threshold: [0, 0.05, 0.25, 0.5] });
    observer.observe(host.current);
    const query = matchMedia('(prefers-reduced-motion: reduce)');
    const change = () => sync();
    const motionChange = () => { explicitPlay.current = false; sync(); };
    query.addEventListener('change', motionChange);
    document.addEventListener('visibilitychange', change);
    window.addEventListener('ernest-motion-change', motionChange);
    return () => { observer.disconnect(); query.removeEventListener('change', motionChange); document.removeEventListener('visibilitychange', change); window.removeEventListener('ernest-motion-change', motionChange); };
  }, [id]);

  useEffect(() => {
    if (!wanted || !mount.current) return;
    let cancelled = false;
    let timer: ReturnType<typeof setTimeout> | undefined;
    const target = document.createElement('div');
    mount.current.append(target);
    setPlayback('loading');
    youtubeAPI().then(api => {
      if (cancelled) return;
      player.current = new api.Player(target, {
        host: 'https://www.youtube-nocookie.com', width: '100%', height: '100%', videoId: id,
        playerVars: { autoplay: visible.current && !document.hidden && autoplayAllowed() ? 1 : 0, mute: 1, controls: 1, playsinline: 1, rel: 0, loop: 1, playlist: id, enablejsapi: 1, origin: location.origin },
        events: {
          onReady: event => {
            if (cancelled) return;
            ready.current = true;
            event.target.mute(); setMuted(true);
            mount.current?.querySelector('iframe')?.setAttribute('title', `${title} — видео Tesla`);
            mount.current?.querySelector('iframe')?.setAttribute('allow', 'autoplay; encrypted-media; picture-in-picture; fullscreen');
            sync();
            timer = setTimeout(() => { if (!cancelled && visible.current && !manualPause.current && autoplayAllowed() && event.target.getPlayerState() !== 1) setPlayback('blocked'); }, 6000);
          },
          onStateChange: event => {
            if (cancelled) return;
            const state = event.data ?? -1;
            if (host.current) host.current.dataset.playerState = String(state);
            if (state === 1) {
              if (!visible.current || document.hidden || manualPause.current || !autoplayAllowed()) { programmaticPause.current = true; event.target.pauseVideo(); return; }
              setStarted(true); setPlayback('playing'); setMuted(event.target.isMuted());
              if (timer) clearTimeout(timer);
            } else if (state === 2) { if (!programmaticPause.current && visible.current && !document.hidden && autoplayAllowed()) manualPause.current = true; programmaticPause.current = false; setPlayback('paused'); }
            else if (state === 0 && visible.current && !manualPause.current && autoplayAllowed()) event.target.playVideo();
          },
          onError: () => { if (!cancelled) setPlayback('error'); },
          onAutoplayBlocked: () => { if (!cancelled && visible.current) setPlayback('blocked'); },
        },
      });
    }).catch(() => { if (!cancelled) setPlayback('error'); });
    const diagnostics = setInterval(() => {
      if (!ready.current || !player.current || !host.current) return;
      try { host.current.dataset.currentTime = player.current.getCurrentTime().toFixed(1); host.current.dataset.playerState = String(player.current.getPlayerState()); } catch { /* player is being removed */ }
    }, 1000);
    return () => {
      cancelled = true; ready.current = false;
      if (timer) clearTimeout(timer);
      clearInterval(diagnostics);
      try { player.current?.destroy(); } catch { /* already detached by the player */ }
      player.current = null; target.remove();
    };
  }, [wanted, id, retry]);

  const play = () => {
    manualPause.current = false; explicitPlay.current = true;
    if (playback === 'error') { setRetry(v => v + 1); setWanted(true); return; }
    if (!wanted) setWanted(true);
    if (ready.current) player.current?.playVideo();
    setPlayback('loading');
  };
  const pause = () => { manualPause.current = true; player.current?.pauseVideo(); setPlayback('paused'); };
  const sound = () => { if (!ready.current || !player.current) return; if (muted) player.current.unMute(); else player.current.mute(); setMuted(!muted); };
  const needsPlay = playback === 'blocked' || playback === 'error' || (!started && playback === 'paused');
  return <div ref={host} className={`video-block ${compact ? 'compact' : ''}`} data-playback={playback} data-muted={muted}>
    <div className="video-frame">
      <div ref={mount} className="video-player-host"/>
      <div className={`video-poster ${started ? 'is-hidden' : ''}`}><img src={`https://i.ytimg.com/vi/${id}/hqdefault.jpg`} alt={`Кадр видео Tesla: ${title}`} loading="lazy"/>{!needsPlay && <span className="video-loading">{playback === 'waiting' ? 'TESLA / ВИДЕОСЦЕНА' : 'ЗАГРУЖАЕМ ВИДЕО'}</span>}</div>
      {needsPlay && <button className="video-retry" onClick={play}>▶ {playback === 'error' ? 'Повторить загрузку' : 'Воспроизвести видео'}</button>}
    </div>
    <div className="video-caption"><span>{title} <span className="muted">/ Tesla</span></span><span className="video-state" aria-live="polite">{playback === 'playing' ? '● ВОСПРОИЗВОДИТСЯ' : playback === 'paused' ? 'Ⅱ ПАУЗА' : ''}</span><div className="video-controls"><button className="inline-control" onClick={playback === 'playing' ? pause : play}>{playback === 'playing' ? 'Ⅱ Пауза' : '▶ Продолжить'}</button><button className="inline-control" onClick={sound} disabled={!ready.current} aria-pressed={!muted}>{muted ? 'Включить звук' : 'Выключить звук'}</button></div><a href={`https://www.youtube.com/watch?v=${id}`} target="_blank" rel="noreferrer">Источник ↗</a></div>
    {(playback === 'blocked' || playback === 'error') && <p className="video-fallback">{playback === 'blocked' ? 'Браузер остановил автозапуск. Нажмите «Воспроизвести видео».' : 'Плеер недоступен. Повторите загрузку или откройте источник.'}</p>}
  </div>;
}
