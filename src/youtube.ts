export type YoutubePlayer = {
  playVideo(): void; pauseVideo(): void; mute(): void; unMute(): void;
  isMuted(): boolean; getPlayerState(): number; getCurrentTime(): number; destroy(): void;
};
type YoutubeEvent = { target: YoutubePlayer; data?: number };
type YoutubeOptions = { host?: string; videoId: string; width: string; height: string; playerVars: Record<string, string | number>; events: { onReady: (event: YoutubeEvent) => void; onStateChange: (event: YoutubeEvent) => void; onError: (event: YoutubeEvent) => void; onAutoplayBlocked: (event: YoutubeEvent) => void } };
type YoutubeAPI = { Player: new (element: HTMLElement, options: YoutubeOptions) => YoutubePlayer };
declare global { interface Window { YT?: YoutubeAPI; onYouTubeIframeAPIReady?: () => void } }
let pending: Promise<YoutubeAPI> | undefined;

export function youtubeAPI() {
  if (window.YT?.Player) return Promise.resolve(window.YT);
  if (pending) return pending;
  pending = new Promise<YoutubeAPI>((resolve, reject) => {
    const previous = window.onYouTubeIframeAPIReady;
    window.onYouTubeIframeAPIReady = () => { previous?.(); if (window.YT?.Player) resolve(window.YT); else reject(new Error('YouTube API not available')); };
    const script = document.createElement('script');
    script.src = 'https://www.youtube.com/iframe_api'; script.async = true;
    script.onerror = () => { pending = undefined; script.remove(); reject(new Error('YouTube could not load')); };
    document.head.append(script);
  });
  return pending;
}
