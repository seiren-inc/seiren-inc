'use client';

import { useEffect, useRef } from 'react';
import Lenis from 'lenis';

/**
 * LenisProvider
 *
 * Inertial smooth scrolling integrated with GSAP ScrollTrigger so scroll-
 * triggered animations stay aligned with the smoothed scroll position.
 *
 * Accessibility:
 * - When the user prefers reduced motion, Lenis is NOT initialized at all
 *   and the page falls back to native scroll. This is the most reliable
 *   way to honour the preference — Lenis has no zero-inertia mode.
 * - If the preference flips at runtime (user toggles OS / extension while
 *   the page is open), the next page navigation picks up the change.
 *   Tearing Lenis up/down on every preference change is intentionally
 *   avoided to keep the integration with GSAP ticker simple.
 */
export default function LenisProvider() {
  const lenisRef = useRef<Lenis | null>(null);

  useEffect(() => {
    // Respect prefers-reduced-motion: skip Lenis entirely.
    if (
      typeof window !== 'undefined' &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches
    ) {
      return;
    }

    const lenis = new Lenis({
      duration: 1.4,
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
      touchMultiplier: 2,
    });

    lenisRef.current = lenis;

    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    const rafId = requestAnimationFrame(raf);

    // Sync GSAP ScrollTrigger with Lenis when available.
    const setupGSAP = async () => {
      try {
        const { gsap } = await import('gsap');
        const { ScrollTrigger } = await import('gsap/ScrollTrigger');
        gsap.registerPlugin(ScrollTrigger);

        lenis.on('scroll', ScrollTrigger.update);

        gsap.ticker.add((time) => {
          lenis.raf(time * 1000);
        });

        gsap.ticker.lagSmoothing(0);
      } catch {
        /* GSAP unavailable — Lenis runs alone */
      }
    };

    setupGSAP();

    return () => {
      cancelAnimationFrame(rafId);
      lenis.destroy();
    };
  }, []);

  return null;
}
