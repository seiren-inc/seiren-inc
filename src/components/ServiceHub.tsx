'use client';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';

gsap.registerPlugin(ScrollTrigger);

const services = [
  {
    id: 'marine',
    no: '01',
    title: '海洋散骨',
    en: 'Marine Burial',
    desc: '国内・国外の穏やかな海へ。故人の想いを自然に還す、高品質な散骨セレモニーをご提供します。',
    bg: '/assets/img/service-marine.jpg',
    href: '/business',
  },
  {
    id: 'bone',
    no: '02',
    title: '遺骨サービス',
    en: 'Bone Care',
    desc: '「遺骨ラボ」による粉骨・洗骨。最先端の設備とまごころで、遺骨のあり方を再定義します。',
    bg: '/assets/img/service-bone-care.jpg',
    href: '/business',
  },
  {
    id: 'navi',
    no: '03',
    title: '終活ナビ',
    en: 'End-of-Life Navi',
    desc: 'お墓じまい、お墓探し、コンシェルジュ相談。迷いの多い終活の工程を専門家が最適に導きます。',
    bg: '/assets/img/service-navi.jpg',
    href: '/business',
  },
];

/**
 * ServiceHub
 *
 * Home の章「貳 — Service」配下に置かれる 3 カードグリッド。
 * 親 section が章マーク + ヘッダーを提供するため、本コンポーネントは
 * 重複ヘッダーを持たずグリッドと末尾の "All Services" 導線だけを描画する。
 *
 * 編集デザインに合わせ、`rounded-2xl shadow-2xl` の浮かせカードを退け、
 * 上半分=ビジュアル / 下半分=テキスト の本のような構造、ハーフトーン
 * ボーダー、章番号、ヘアラインで統一。
 */
export default function ServiceHub() {
  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    const mm = gsap.matchMedia();

    mm.add('(prefers-reduced-motion: reduce)', () => {
      gsap.set('.service-card', { opacity: 1, y: 0 });
    });

    mm.add('(prefers-reduced-motion: no-preference)', () => {
      const cards = gsap.utils.toArray<HTMLElement>('.service-card');
      cards.forEach((card, i) => {
        gsap.fromTo(
          card,
          { opacity: 0, y: 32, filter: 'blur(6px)' },
          {
            opacity: 1,
            y: 0,
            filter: 'blur(0px)',
            duration: 1.4,
            ease: 'power3.out',
            delay: i * 0.12,
            scrollTrigger: {
              trigger: card,
              start: 'top 88%',
              toggleActions: 'play none none none',
            },
          }
        );
      });
    });
  }, { scope: containerRef });

  return (
    <div
      ref={containerRef}
      className="container mx-auto px-6 lg:px-12"
      aria-label="サービス一覧"
    >
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-10">
        {services.map((service) => (
          <Link
            key={service.id}
            href={service.href}
            className="service-card group flex flex-col bg-white border border-gray-200 hover:border-brand-primary transition-colors duration-500"
          >
            <div className="relative aspect-[4/3] overflow-hidden bg-surface">
              <Image
                src={service.bg}
                alt=""
                fill
                sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                className="object-cover transition-transform duration-[1500ms] ease-out group-hover:scale-[1.04]"
              />
              <div
                aria-hidden="true"
                className="absolute inset-0 bg-gradient-to-t from-white/30 via-transparent to-transparent"
              />
            </div>

            <div className="flex flex-col gap-5 p-7 md:p-8">
              <div className="flex items-baseline gap-4">
                <span className="font-serif text-2xl text-brand-primary leading-none tabular-nums">
                  {service.no}
                </span>
                <span className="h-px flex-1 bg-brand-primary/30" />
              </div>

              <div className="flex flex-col gap-2">
                <span className="text-[10px] font-medium tracking-[0.3em] uppercase text-muted">
                  {service.en}
                </span>
                <h3 className="text-2xl md:text-[1.6rem] font-serif font-medium text-gray-900 tracking-[0.06em] leading-snug group-hover:text-brand-primary transition-colors">
                  {service.title}
                </h3>
              </div>

              <p className="text-sm text-gray-700 leading-loose">
                {service.desc}
              </p>

              <span className="mt-2 inline-flex items-center gap-2 text-[12px] tracking-[0.2em] text-gray-900 group-hover:text-brand-primary transition-colors">
                <span className="border-b border-gray-300 group-hover:border-brand-primary pb-1 transition-colors">
                  詳細を見る
                </span>
                <span aria-hidden="true">→</span>
              </span>
            </div>
          </Link>
        ))}
      </div>

      <div className="mt-14 md:mt-16 flex justify-end">
        <Link
          href="/business"
          className="group inline-flex items-center gap-3 text-[12px] tracking-[0.25em] uppercase font-medium text-gray-900 hover:text-brand-primary transition-colors"
        >
          <span className="border-b border-gray-300 group-hover:border-brand-primary pb-1 transition-colors">
            All Services
          </span>
          <span aria-hidden="true">→</span>
        </Link>
      </div>
    </div>
  );
}
