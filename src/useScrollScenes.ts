import { useEffect } from 'react';

const clamp = (n: number) => Math.max(0, Math.min(1, n));

export function useScrollScenes() {
  useEffect(() => {
    document.documentElement.classList.add('enhanced');
    const sections = Array.from(document.querySelectorAll<HTMLElement>('[data-scroll-section]'));
    const hero = document.querySelector<HTMLElement>('.hero-scroll');
    let frame = 0;
    const reveal = new IntersectionObserver(entries => entries.forEach(entry => {
      if (entry.isIntersecting) { entry.target.classList.add('is-visible'); reveal.unobserve(entry.target); }
    }), { threshold: 0.06 });
    document.querySelectorAll('.reveal').forEach(el => reveal.observe(el));
    const update = () => {
      frame = 0;
      const off = document.documentElement.dataset.motion === 'off';
      const max = document.documentElement.scrollHeight - innerHeight;
      const values = sections.map(section => {
        const rect = section.getBoundingClientRect();
        return { section, reveal: clamp((innerHeight - rect.top) / (innerHeight * 0.72)), travel: clamp((innerHeight - rect.top) / (innerHeight + rect.height)) };
      });
      const heroRect = hero?.getBoundingClientRect();
      const heroHeight = hero?.querySelector<HTMLElement>('.hero')?.offsetHeight ?? innerHeight;
      const progress = heroRect ? clamp(-heroRect.top / Math.max(heroRect.height - heroHeight, 1)) : 0;
      document.documentElement.style.setProperty('--page-progress', String(max > 0 ? scrollY / max : 0));
      hero?.style.setProperty('--hero-progress', String(off ? 0 : progress));
      for (const { section, reveal, travel } of values) {
        section.style.setProperty('--section-reveal', String(off ? 1 : reveal));
        section.style.setProperty('--section-travel', String(off ? 0.5 : travel));
      }
    };
    const request = () => { if (!frame) frame = requestAnimationFrame(update); };
    addEventListener('scroll', request, { passive: true });
    addEventListener('resize', request);
    addEventListener('ernest-motion-change', request);
    update();
    return () => { reveal.disconnect(); cancelAnimationFrame(frame); removeEventListener('scroll', request); removeEventListener('resize', request); removeEventListener('ernest-motion-change', request); };
  }, []);
}
