'use client';

import { useEffect } from 'react';

/**
 * GSAPScrollAnimator
 *
 * Global GSAP ScrollTrigger initializer. Runs once on mount and wires up:
 *   .gsap-fade-up      — opacity / y / blur reveal on enter
 *   .gsap-clip-reveal  — clip-path inset wipe
 *   .gsap-parallax     — vertical parallax tied to scroll
 *   .gsap-counter      — numeric tween from 0 to data-target
 *
 * Respects prefers-reduced-motion via `gsap.matchMedia()`:
 *   - reduce         → snap each element to its final state, no motion
 *   - no-preference  → full animation timeline
 *
 * SplitText (GSAP Club) is loaded best-effort; if unavailable the rest
 * of the animations still run.
 *
 * `data-stagger-delay="0.1"` overrides per-element delay.
 */
export default function GSAPScrollAnimator() {
  useEffect(() => {
    // Structural type covers the gsap.matchMedia() surface we use here
    // without forcing a top-level value-import of gsap.
    let mm: {
      add: (query: string, callback: () => void) => unknown;
      revert: () => void;
    } | null = null;

    const init = async () => {
      const { gsap } = await import('gsap');
      const { ScrollTrigger } = await import('gsap/ScrollTrigger');
      gsap.registerPlugin(ScrollTrigger);

      // SplitText is GSAP Club-only; treat as best-effort.
      try {
        const { SplitText } = await import('gsap/SplitText');
        gsap.registerPlugin(SplitText);
      } catch {
        /* not licensed — non-fatal */
      }

      mm = gsap.matchMedia();

      // prefers-reduced-motion: reduce — no motion, just final state.
      mm.add('(prefers-reduced-motion: reduce)', () => {
        gsap.set('.gsap-fade-up', { opacity: 1, y: 0, filter: 'none' });
        gsap.set('.gsap-clip-reveal', { clipPath: 'inset(0 0% 0 0)' });
        gsap.set('.gsap-parallax', { yPercent: 0 });
        document
          .querySelectorAll<HTMLElement>('.gsap-counter')
          .forEach((el) => {
            const target = parseInt(el.dataset.target || '0', 10);
            el.textContent = target.toLocaleString();
          });
      });

      // prefers-reduced-motion: no-preference — full editorial choreography.
      mm.add('(prefers-reduced-motion: no-preference)', () => {
        // ① FadeUp
        gsap.utils.toArray<HTMLElement>('.gsap-fade-up').forEach((el) => {
          const delay = parseFloat(el.dataset.staggerDelay || '0');
          gsap.fromTo(
            el,
            { opacity: 0, y: 50, filter: 'blur(8px)' },
            {
              opacity: 1,
              y: 0,
              filter: 'blur(0px)',
              duration: 1.4,
              delay,
              ease: 'power4.out',
              scrollTrigger: {
                trigger: el,
                start: 'top 90%',
                toggleActions: 'play none none none',
              },
            }
          );
        });

        // ② Clip reveal
        gsap.utils.toArray<HTMLElement>('.gsap-clip-reveal').forEach((el) => {
          gsap.fromTo(
            el,
            { clipPath: 'inset(0 100% 0 0)' },
            {
              clipPath: 'inset(0 0% 0 0)',
              duration: 1.6,
              ease: 'power4.inOut',
              scrollTrigger: {
                trigger: el,
                start: 'top 85%',
                toggleActions: 'play none none none',
              },
            }
          );
        });

        // ③ Parallax
        gsap.utils.toArray<HTMLElement>('.gsap-parallax').forEach((el) => {
          gsap.fromTo(
            el,
            { yPercent: -15 },
            {
              yPercent: 15,
              ease: 'none',
              scrollTrigger: {
                trigger: el.parentElement || el,
                start: 'top bottom',
                end: 'bottom top',
                scrub: 1.5,
              },
            }
          );
        });

        // ④ Counter
        gsap.utils.toArray<HTMLElement>('.gsap-counter').forEach((el) => {
          const target = parseInt(el.dataset.target || '0', 10);
          const counter = { val: 0 };
          gsap.to(counter, {
            val: target,
            duration: 2.4,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: el,
              start: 'top 85%',
              toggleActions: 'play none none none',
            },
            onUpdate: () => {
              el.textContent = Math.floor(counter.val).toLocaleString();
            },
          });
        });
      });
    };

    init();

    return () => {
      if (mm) mm.revert();
    };
  }, []);

  return null;
}
