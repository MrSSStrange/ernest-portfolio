import { useEffect } from 'react';

// Resolve a cold hash URL after React has committed the target and the layout.
// Explicit coordinates avoid a competing native smooth-scroll restoration.
export function useInitialAnchor() {
  useEffect(() => {
    const hash = location.hash;
    if (!hash || hash === '#') return;
    let id: string;
    try { id = decodeURIComponent(hash.slice(1)); } catch { return; }
    let secondFrame = 0;
    const firstFrame = requestAnimationFrame(() => {
      secondFrame = requestAnimationFrame(() => {
        const target = document.getElementById(id);
        if (!target || location.hash !== hash) return;
        const root = document.documentElement;
        const padding = parseFloat(getComputedStyle(root).scrollPaddingTop) || 0;
        const margin = parseFloat(getComputedStyle(target).scrollMarginTop) || 0;
        const top = target.getBoundingClientRect().top + scrollY - padding - margin;
        const previous = root.style.scrollBehavior;
        root.style.scrollBehavior = 'auto';
        window.scrollTo({ top: Math.max(0, top), behavior: 'instant' });
        root.style.scrollBehavior = previous;
      });
    });
    return () => { cancelAnimationFrame(firstFrame); cancelAnimationFrame(secondFrame); };
  }, []);
}
