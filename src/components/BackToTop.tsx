'use client';
import { useEffect, useState } from 'react';

/**
 * BackToTop — editorial marginalia mark.
 *
 * 丸ボタン＋影＋リフトを退け、白＋ヘアライン枠の小さな縦長セルに統一。
 * 縦ヘアライン → 上向き矢印 → "TOP" tracking ラベルで Page header の
 * ChapterMark と同じビジュアル言語に揃える。
 */
export default function BackToTop() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsVisible(window.scrollY > 400);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    if (
      typeof window !== 'undefined' &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches
    ) {
      window.scrollTo({ top: 0, behavior: 'auto' });
      return;
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <button
      type="button"
      onClick={scrollToTop}
      aria-label="ページトップへ戻る"
      className={`group fixed z-50 flex flex-col items-center justify-center gap-2 bg-white border border-gray-200 hover:border-brand-primary text-gray-700 hover:text-brand-primary transition-all duration-300 px-3 py-4 w-12
        ${
          isVisible
            ? 'opacity-100 pointer-events-auto translate-y-0'
            : 'opacity-0 pointer-events-none translate-y-3'
        }`}
      style={{
        bottom: 'calc(2rem + env(safe-area-inset-bottom, 0px))',
        right: 'calc(1.5rem + env(safe-area-inset-right, 0px))',
      }}
    >
      <span
        aria-hidden="true"
        className="block h-4 w-px bg-brand-primary/60 group-hover:bg-brand-primary transition-colors"
      />
      <svg
        className="w-4 h-4"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        aria-hidden="true"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={1.5}
          d="M5 15l7-7 7 7"
        />
      </svg>
      <span className="text-[9px] tracking-[0.3em] uppercase font-medium">
        Top
      </span>
    </button>
  );
}
