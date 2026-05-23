'use client';

import { useEffect, useRef } from 'react';
import Lenis from 'lenis';

/**
 * LenisProvider
 * GSAPのScrollTriggerと連携した慣性スムーズスクロールを全体に適用。
 * 「水・海」をテーマにした清蓮のブランドを、スクロール体験でも体現する。
 */
export default function LenisProvider() {
  const lenisRef = useRef<Lenis | null>(null);

  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.4,            // スクロールの慣性時間（長いほど滑らか）
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), // Expo easing
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

    // GSAP ScrollTriggerがあれば連携する
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
        // GSAPが利用できない場合はlenisのみ動作
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
