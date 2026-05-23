'use client';

import { useCallback } from 'react';
import useEmblaCarousel from 'embla-carousel-react';
import Link from 'next/link';

const businesses = [
  {
    title: '海洋散骨',
    en: 'Sea Burial',
    desc: '大切な方の旅立ちを、穏やかな海へ。散骨の計画・手続きから当日の乗船まで一貫してサポートいたします。',
    icon: (
      <svg className="w-10 h-10" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M4.098 19.902a3.75 3.75 0 005.304 0l6.401-6.402M6.75 21A3.75 3.75 0 013 17.25V4.125C3 3.504 3.504 3 4.125 3h5.25c.621 0 1.125.504 1.125 1.125v4.072M6.75 21a3.75 3.75 0 003.75-3.75V8.197M6.75 21h13.125c.621 0 1.125-.504 1.125-1.125v-5.25c0-.621-.504-1.125-1.125-1.125h-4.072M10.5 8.197l2.88-2.88c.438-.439 1.15-.439 1.59 0l3.712 3.713c.44.44.44 1.152 0 1.59l-2.879 2.88M6.75 17.25h.008v.008H6.75v-.008z" />
      </svg>
    ),
  },
  {
    title: '遺骨サービス',
    en: 'Remains Care',
    desc: '洗骨・乾燥・粉砕など、遺骨の状態に合わせた専門的な処理を、丁寧かつ誠実に対応いたします。',
    icon: (
      <svg className="w-10 h-10" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z" />
      </svg>
    ),
  },
  {
    title: 'お墓じまい・改葬',
    en: 'Grave Reform',
    desc: '墓の撤去・移転・改葬に必要な行政手続き・石材業者との調整・親族への説明まで、煩わしさを最小化します。',
    icon: (
      <svg className="w-10 h-10" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 12l8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25" />
      </svg>
    ),
  },
  {
    title: '終活相談',
    en: 'Life Ending Support',
    desc: 'ご本人・ご家族の想いを起点に、葬儀・相続・介護など終活に関わる複合的な相談に対応します。',
    icon: (
      <svg className="w-10 h-10" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M20.25 8.511c.884.284 1.5 1.128 1.5 2.097v4.286c0 1.136-.847 2.1-1.98 2.193-.34.027-.68.052-1.02.072v3.091l-3-3c-1.354 0-2.694-.055-4.02-.163a2.115 2.115 0 01-.825-.242m9.345-8.334a2.126 2.126 0 00-.476-.095 48.64 48.64 0 00-8.048 0c-1.131.094-1.976 1.057-1.976 2.192v4.286c0 .837.46 1.58 1.155 1.951m9.345-8.334V6.637c0-1.621-1.152-3.026-2.76-3.235A48.455 48.455 0 0011.25 3c-2.115 0-4.198.137-6.24.402-1.608.209-2.76 1.614-2.76 3.235v6.226c0 1.621 1.152 3.026 2.76 3.235.577.075 1.157.14 1.74.194V21l4.155-4.155" />
      </svg>
    ),
  },
  {
    title: '墓地・納骨先検索',
    en: 'Grave Search',
    desc: '全国の寺院・霊園・納骨堂の中から、ご要望・立地・予算に合わせた最適な候補をご案内します。',
    icon: (
      <svg className="w-10 h-10" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
      </svg>
    ),
  },
  {
    title: '手元供養品',
    en: 'Memorial Items',
    desc: '遺骨を手元で大切に保管する手元供養品の選定・加工・納品。日常の中でそっと寄り添う形をご提案します。',
    icon: (
      <svg className="w-10 h-10" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v2.25m6.364.386l-1.591 1.591M21 12h-2.25m-.386 6.364l-1.591-1.591M12 18.75V21m-4.773-4.227l-1.591 1.591M5.25 12H3m4.227-4.773L5.636 5.636M15.75 12a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0z" />
      </svg>
    ),
  },
];

export default function BusinessCarousel() {
  const [emblaRef, emblaApi] = useEmblaCarousel({
    align: 'start',
    dragFree: true,
    loop: false,
  });

  const scrollPrev = useCallback(() => emblaApi?.scrollPrev(), [emblaApi]);
  const scrollNext = useCallback(() => emblaApi?.scrollNext(), [emblaApi]);

  return (
    <div className="relative">
      {/* Carousel Viewport */}
      <div className="embla" ref={emblaRef}>
        <div className="embla__container gap-px bg-gray-200">
          {businesses.map((biz, idx) => (
            <div key={idx} className="embla__slide bg-white">
              <Link
                href="/business"
                className="group relative flex flex-col h-full overflow-hidden"
                aria-label={`${biz.title}の詳細を見る`}
              >
                {/* アイコンエリア */}
                <div className="relative h-52 bg-gray-50 flex flex-col items-center justify-center gap-4 overflow-hidden transition-colors duration-500 group-hover:bg-neutral-surface">
                  {/* ホバーで背景フェード（Teal薄） */}
                  <div className="absolute inset-0 bg-brand-secondary opacity-0 group-hover:opacity-40 transition-opacity duration-700" />
                  <div className="text-gray-300 group-hover:text-brand-primary transition-colors duration-500 relative z-10">
                    {biz.icon}
                  </div>
                  <p className="text-xs font-bold tracking-[0.25em] uppercase text-gray-300 group-hover:text-brand-primary transition-colors duration-500 relative z-10">
                    {biz.en}
                  </p>
                </div>

                {/* テキストエリア */}
                <div className="bg-surface-dark group-hover:bg-gray-800 transition-colors duration-300 px-6 py-5 flex-1 flex flex-col gap-2">
                  <div className="flex items-center justify-between">
                    <h3 className="text-base font-serif font-bold text-white tracking-wide">{biz.title}</h3>
                    <svg
                      className="w-4 h-4 text-gray-500 group-hover:text-brand-primary group-hover:translate-x-1 transition-all duration-300 flex-shrink-0"
                      fill="none" viewBox="0 0 24 24" stroke="currentColor"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                  </div>
                  <p className="text-xs text-gray-500 leading-relaxed line-clamp-3">{biz.desc}</p>
                </div>
              </Link>
            </div>
          ))}
        </div>
      </div>

      {/* ナビゲーションボタン */}
      <div className="flex items-center gap-3 mt-8 justify-end pr-1">
        <button
          onClick={scrollPrev}
          aria-label="前の事業を見る"
          className="w-10 h-10 border border-gray-300 flex items-center justify-center text-gray-500 hover:border-brand-primary hover:text-brand-primary transition-colors duration-200"
        >
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
        </button>
        <button
          onClick={scrollNext}
          aria-label="次の事業を見る"
          className="w-10 h-10 border border-gray-300 flex items-center justify-center text-gray-500 hover:border-brand-primary hover:text-brand-primary transition-colors duration-200"
        >
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </button>
      </div>
    </div>
  );
}
