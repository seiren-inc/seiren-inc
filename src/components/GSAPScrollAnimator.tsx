'use client';

import { useEffect } from 'react';

/**
 * GSAPScrollAnimator
 * GSAP ScrollTriggerを使った高品質スクロールアニメーションの初期化。
 * - .gsap-fade-up: フェードアップ（y軸移動＋不透明度）
 * - .gsap-split-text: 文字単位でのスタッガーアニメーション
 * - .gsap-parallax: パララックス（背景画像が遅れてスクロール）
 * - .gsap-clip-reveal: クリップパスによる画像表示
 * - .gsap-counter: 数値のカウントアップ
 *
 * data-stagger-delay="0.1" で各要素の遅延を指定可能
 */
export default function GSAPScrollAnimator() {
  useEffect(() => {
    let ctx: { revert: () => void } | null = null;

    const init = async () => {
      const { gsap } = await import('gsap');
      const { ScrollTrigger } = await import('gsap/ScrollTrigger');
      const { SplitText } = await import('gsap/SplitText');

      gsap.registerPlugin(ScrollTrigger, SplitText);

      ctx = gsap.context(() => {

        // ① FadeUp Animation (.gsap-fade-up)
        gsap.utils.toArray<HTMLElement>('.gsap-fade-up').forEach((el) => {
          const delay = parseFloat(el.dataset.staggerDelay || '0');
          gsap.fromTo(el,
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

        // ② Clip reveal (.gsap-clip-reveal)
        gsap.utils.toArray<HTMLElement>('.gsap-clip-reveal').forEach((el) => {
          gsap.fromTo(el,
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

        // ③ Parallax (.gsap-parallax) - 背景画像の遅延スクロール
        gsap.utils.toArray<HTMLElement>('.gsap-parallax').forEach((el) => {
          gsap.fromTo(el,
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

        // ④ Stagger counter (.gsap-counter) - 数値カウントアップ
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

    init().catch(() => {
      // SplitTextはGSAP Club会員限定。エラー時はSplitText以外を実行
      const initFallback = async () => {
        const { gsap } = await import('gsap');
        const { ScrollTrigger } = await import('gsap/ScrollTrigger');
        gsap.registerPlugin(ScrollTrigger);

        ctx = gsap.context(() => {
          gsap.utils.toArray<HTMLElement>('.gsap-fade-up').forEach((el) => {
            const delay = parseFloat(el.dataset.staggerDelay || '0');
            gsap.fromTo(el,
              { opacity: 0, y: 50, filter: 'blur(8px)' },
              {
                opacity: 1, y: 0, filter: 'blur(0px)',
                duration: 1.4, delay, ease: 'power4.out',
                scrollTrigger: { trigger: el, start: 'top 90%', toggleActions: 'play none none none' },
              }
            );
          });

          gsap.utils.toArray<HTMLElement>('.gsap-clip-reveal').forEach((el) => {
            gsap.fromTo(el,
              { clipPath: 'inset(0 100% 0 0)' },
              {
                clipPath: 'inset(0 0% 0 0)',
                duration: 1.6, ease: 'power4.inOut',
                scrollTrigger: { trigger: el, start: 'top 85%', toggleActions: 'play none none none' },
              }
            );
          });

          gsap.utils.toArray<HTMLElement>('.gsap-parallax').forEach((el) => {
            gsap.fromTo(el,
              { yPercent: -15 },
              {
                yPercent: 15, ease: 'none',
                scrollTrigger: { trigger: el.parentElement || el, start: 'top bottom', end: 'bottom top', scrub: 1.5 },
              }
            );
          });
        });
      };
      initFallback();
    });

    return () => {
      if (ctx) ctx.revert();
    };
  }, []);

  return null;
}
