'use client';

import { useEffect } from 'react';

/**
 * スクロール連動 Reveal アニメーションシステム
 * IntersectionObserver で .reveal クラスの要素を監視し、
 * 可視化時に .is-visible を付与する。
 * data-stagger="group名" で同グループにstagger(80ms)を適用。
 * prefers-reduced-motion の場合は全要素即時表示。
 */
export default function RevealObserver() {
  useEffect(() => {
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    // staggerグループに対して delay を計算
    const staggerTracker: Record<string, number> = {};

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          const el = entry.target as HTMLElement;
          const group = el.dataset.stagger;

          if (group) {
            const index = staggerTracker[group] ?? 0;
            staggerTracker[group] = index + 1;
            setTimeout(() => {
              el.classList.add('is-visible');
            }, index * 80);
          } else {
            el.classList.add('is-visible');
          }

          observer.unobserve(el);
        });
      },
      { threshold: 0.12, rootMargin: '0px 0px -40px 0px' }
    );

    const observeElements = () => {
      const elements = Array.from(document.querySelectorAll<HTMLElement>('.reveal:not(.is-visible):not(.is-observing)'));
      elements.forEach((el) => {
        el.classList.add('is-observing');
        if (prefersReduced) {
          el.classList.add('is-visible');
        } else {
          observer.observe(el);
        }
      });
    };

    // 初回実行
    observeElements();

    // DOMの変更を監視し、後から追加された要素も捕捉
    const mutationObserver = new MutationObserver(() => {
      observeElements();
    });

    mutationObserver.observe(document.body, { childList: true, subtree: true });

    return () => {
      observer.disconnect();
      mutationObserver.disconnect();
    };
  }, []);

  return null;
}
