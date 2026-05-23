'use client';
import Link from 'next/link';
import Image from 'next/image';
import { useState, useRef } from 'react';
import dynamic from 'next/dynamic';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import LogoBlooming from '@/components/LogoBlooming';
import ServiceHub from '@/components/ServiceHub';
import ChapterMark from '@/components/common/ChapterMark';

gsap.registerPlugin(ScrollTrigger);

const BusinessCarousel = dynamic(() => import('@/components/BusinessCarousel'), { ssr: false });

const newsData = {
  news: [
    { date: '2026.04.13', category: 'コーポレート', title: 'コーポレートサイトをリニューアルいたしました。' },
    { date: '2026.04.01', category: '事業', title: '遺骨ダイヤモンドアドバイザーによる個別相談会を実施します。' },
  ],
  column: [] as { date: string; category: string; title: string }[],
  info:   [] as { date: string; category: string; title: string }[],
};

const tabConfig = [
  { key: 'news',   label: 'ニュース', en: 'News' },
  { key: 'column', label: 'コラム',   en: 'Column' },
  { key: 'info',   label: 'お知らせ', en: 'Information' },
] as const;

type TabKey = keyof typeof newsData;

export default function Home() {
  const [activeTab, setActiveTab] = useState<TabKey>('news');
  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    const mm = gsap.matchMedia();

    // prefers-reduced-motion: reduce — skip motion, snap to final state
    mm.add('(prefers-reduced-motion: reduce)', () => {
      gsap.set('[data-hero-text], .reveal', {
        opacity: 1,
        y: 0,
        filter: 'none',
      });
      gsap.set('.section-line', { scaleX: 1, transformOrigin: 'left' });
    });

    // prefers-reduced-motion: no-preference — full editorial choreography
    mm.add('(prefers-reduced-motion: no-preference)', () => {
      // 1. Hero Text — slow, deliberate
      const heroTl = gsap.timeline();
      heroTl.fromTo(
        '[data-hero-text]',
        { opacity: 0, y: 24, filter: 'blur(12px)' },
        {
          opacity: 1,
          y: 0,
          filter: 'blur(0px)',
          duration: 1.6,
          stagger: 0.18,
          ease: 'power3.out',
          delay: 0.9,
        }
      );

      // 2. Reveal — gentle scroll fade
      const revealElements = gsap.utils.toArray('.reveal') as HTMLElement[];
      revealElements.forEach((el) => {
        gsap.fromTo(
          el,
          { opacity: 0, y: 32, filter: 'blur(6px)' },
          {
            opacity: 1,
            y: 0,
            filter: 'blur(0px)',
            duration: 1.6,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: el,
              start: 'top 88%',
              toggleActions: 'play none none none',
            },
          }
        );
      });

      // 3. Hairline rule draw-in
      const lines = gsap.utils.toArray('.section-line') as HTMLElement[];
      lines.forEach((line) => {
        gsap.fromTo(
          line,
          { scaleX: 0, transformOrigin: 'left' },
          {
            scaleX: 1,
            duration: 2.2,
            ease: 'expo.out',
            scrollTrigger: {
              trigger: line,
              start: 'top 92%',
            },
          }
        );
      });
    });
  }, { scope: containerRef });

  return (
    <main
      id="main-content"
      ref={containerRef}
      className="min-h-screen bg-white flex flex-col pt-[var(--header-height)]"
    >
      {/* ============================================================
          序 — HERO
          ============================================================ */}
      <section className="relative w-full h-[calc(100vh-var(--header-height))] min-h-[640px] flex items-center justify-center overflow-hidden bg-white">
        {/* 静かな海。コントラストを下げ、写真は背景の余韻に徹する */}
        <div className="absolute inset-0 z-0">
          <Image
            src="/assets/img/hero-sea-premium.jpg"
            alt="穏やかな海の水平線"
            fill
            className="object-cover opacity-50 hero-zoom"
            priority
            sizes="100vw"
          />
          {/* 上から白フェード、下に向け弱いベール。SaaS的ブラーは置かない */}
          <div className="absolute inset-0 bg-gradient-to-b from-white/30 via-white/10 to-white/85" />
          {/* 紙のような微細グレーン */}
          <div
            aria-hidden="true"
            className="absolute inset-0 mix-blend-multiply opacity-[0.04]"
            style={{
              backgroundImage:
                "url(\"data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='160' height='160'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='2'/><feColorMatrix values='0 0 0 0 0  0 0 0 0 0  0 0 0 0 0  0 0 0 0.6 0'/></filter><rect width='100%' height='100%' filter='url(%23n)'/></svg>\")",
            }}
          />
        </div>

        <div className="relative z-10 w-full max-w-5xl mx-auto px-6 flex flex-col items-center text-center">
          {/* ChapterMark — 序 */}
          <div data-hero-text className="mb-10 flex flex-col items-center gap-4">
            <span aria-hidden="true" className="block h-10 w-px bg-brand-primary/60" />
            <div className="flex items-baseline gap-4">
              <span className="font-serif text-2xl text-brand-primary leading-none">序</span>
              <span className="text-[10px] font-medium tracking-[0.4em] text-muted uppercase">
                Introduction
              </span>
            </div>
          </div>

          <LogoBlooming className="mb-12" />

          <h1 className="font-serif text-gray-900 leading-[1.18] mb-10 tracking-[0.04em]">
            <span
              data-hero-text
              className="block text-[clamp(2.25rem,6.4vw,5.25rem)] font-light"
            >
              人生の節目に、
            </span>
            <span
              data-hero-text
              className="block text-[clamp(2.25rem,6.4vw,5.25rem)] font-medium text-brand-primary"
            >
              確かな判断と実務を。
            </span>
          </h1>

          <p
            data-hero-text
            className="font-serif text-base md:text-lg text-muted max-w-xl leading-loose mb-14"
          >
            海洋散骨・遺骨サービス・終活ナビゲーション。<br className="hidden md:block" />
            多角的な専門知識を一つの窓口に集約し、前向きな「これから」を支えます。
          </p>

          <div data-hero-text className="flex flex-col sm:flex-row items-center gap-8">
            <Link
              href="/contact"
              className="inline-flex items-center gap-3 px-10 py-4 bg-brand-primary text-white text-[13px] font-medium tracking-[0.18em] hover:bg-brand-hover transition-colors duration-300"
            >
              無料相談はこちら
              <span aria-hidden="true" className="text-base leading-none">→</span>
            </Link>
            <Link
              href="/business"
              className="group inline-flex items-center gap-3 text-[13px] font-medium tracking-[0.18em] text-gray-900 hover:text-brand-primary transition-colors duration-300"
            >
              <span className="border-b border-gray-300 group-hover:border-brand-primary pb-1 transition-colors">
                事業内容を見る
              </span>
              <span aria-hidden="true" className="text-base leading-none">→</span>
            </Link>
          </div>
        </div>

        {/* Scroll Indicator — quiet */}
        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3 text-muted">
          <span className="text-[10px] tracking-[0.5em] uppercase font-medium">Scroll</span>
          <div className="w-px h-12 bg-gray-200 relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-full bg-brand-primary animate-scrollFlow" />
          </div>
        </div>
      </section>

      {/* ============================================================
          壱 — CORPORATE STATEMENT（縦書きの間）
          ============================================================ */}
      <section className="py-32 md:py-56 bg-white relative">
        <div className="container mx-auto px-6 lg:px-12">
          <div className="max-w-5xl mx-auto">
            <div className="mb-20 md:mb-28">
              <ChapterMark num="壱" label="Statement" className="reveal" />
            </div>
            <div className="flex flex-col md:flex-row items-center gap-16 md:gap-32 justify-center">
              <div className="reveal vertical-rl flex gap-12 md:gap-20 h-[480px] md:h-[620px] items-center">
                <p className="text-lg md:text-xl text-muted font-serif leading-loose tracking-[0.22em] pt-12">
                  私たちは、正解の押し付けをしません。
                  ご本人とご家族の想いを丁寧にお聞きし、
                  客観的な選択肢をご提示します。
                </p>
                <h2 className="text-3xl md:text-4xl lg:text-5xl font-serif font-medium text-gray-900 leading-relaxed tracking-[0.22em]">
                  相談で終わらせず、
                  <br />
                  <span className="text-brand-primary mt-10 block">実務まで伴走する。</span>
                </h2>
              </div>
            </div>
            <div className="mt-20 md:mt-28 max-w-md">
              <span className="section-line block h-px bg-brand-primary/40 mb-6" />
              <p className="text-sm text-muted leading-loose">
                清蓮は、海洋散骨・遺骨ダイヤモンド・お墓じまい・終活相談など、人生の節目を支える複数の専門領域をひとつの窓口に集約しています。
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ============================================================
          貳 — SERVICE ECOSYSTEM
          ============================================================ */}
      <section className="py-24 md:py-32 bg-surface" aria-labelledby="service-heading">
        <div className="container mx-auto px-6 lg:px-12 mb-16 md:mb-20">
          <ChapterMark num="貳" label="Service" className="reveal" />
          <h2
            id="service-heading"
            className="reveal mt-6 max-w-3xl text-3xl md:text-4xl lg:text-5xl font-serif font-medium text-gray-900 tracking-[0.06em] leading-snug"
          >
            ひとつの窓口で、<br className="md:hidden" />
            人生の節目を支える。
          </h2>
        </div>
        <ServiceHub />
      </section>

      {/* ============================================================
          参 — BRAND PORTFOLIO
          ============================================================ */}
      <section className="py-32 md:py-48 bg-white" aria-labelledby="portfolio-heading">
        <div className="container mx-auto px-6 lg:px-12">
          <div className="max-w-5xl mx-auto mb-16 md:mb-24 flex flex-col md:flex-row md:items-end md:justify-between gap-10">
            <div>
              <ChapterMark num="参" label="Brand Portfolio" className="reveal" />
              <h2
                id="portfolio-heading"
                className="reveal mt-6 text-3xl md:text-4xl lg:text-5xl font-serif font-medium text-gray-900 tracking-[0.06em] leading-snug"
              >
                専門ブランドの<br className="md:hidden" />連携
              </h2>
            </div>
            <p className="reveal max-w-sm text-sm text-muted leading-loose">
              海洋散骨から遺骨ダイヤモンド、お墓じまいの実務まで。<br />
              各分野のプロフェッショナルが連携し、高品質な終活支援を実現します。
            </p>
          </div>

          <BusinessCarousel />

          <div className="reveal mt-20 md:mt-24 max-w-5xl mx-auto flex flex-col items-start gap-6">
            <span className="section-line block h-px bg-brand-primary/40 w-32" />
            <Link
              href="/company"
              className="group inline-flex items-center gap-3 text-[13px] font-medium tracking-[0.18em] text-gray-900 hover:text-brand-primary transition-colors duration-300"
            >
              <span className="border-b border-gray-300 group-hover:border-brand-primary pb-1 transition-colors">
                会社概要・ビジョンを見る
              </span>
              <span aria-hidden="true">→</span>
            </Link>
          </div>
        </div>
      </section>

      {/* ============================================================
          肆 — NEWS & TOPICS
          ============================================================ */}
      <section className="py-32 md:py-40 bg-surface">
        <div className="container mx-auto px-6 lg:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-12 lg:gap-24">
            <div className="lg:col-span-1 reveal">
              <ChapterMark num="肆" label="Topics" />
              <h2 className="mt-6 text-3xl md:text-4xl font-serif font-medium text-gray-900 tracking-[0.06em] leading-snug">
                最新のお知らせ
              </h2>
              <p className="mt-8 text-sm text-muted leading-loose">
                ニュース、終活コラム、お知らせを定期的にお届けしています。
              </p>
              <Link
                href="/contact"
                className="mt-10 inline-flex items-center gap-2 text-[11px] font-medium tracking-[0.3em] text-brand-primary border-b border-brand-primary/60 pb-1 hover:opacity-70 transition-opacity"
              >
                ALL TOPICS
                <span aria-hidden="true">→</span>
              </Link>
            </div>

            <div className="lg:col-span-3 reveal">
              <div className="flex gap-10 border-b border-gray-200 mb-8 overflow-x-auto no-scrollbar">
                {tabConfig.map((tab) => (
                  <button
                    key={tab.key}
                    type="button"
                    onClick={() => setActiveTab(tab.key)}
                    className={`relative pb-4 text-[12px] font-medium tracking-[0.25em] transition-colors whitespace-nowrap ${
                      activeTab === tab.key
                        ? 'text-gray-900'
                        : 'text-gray-400 hover:text-gray-700'
                    }`}
                  >
                    {tab.label}
                    {activeTab === tab.key && (
                      <span
                        aria-hidden="true"
                        className="absolute -bottom-px left-0 w-full h-px bg-brand-primary"
                      />
                    )}
                  </button>
                ))}
              </div>

              <div className="min-h-[280px]">
                {newsData[activeTab]?.length > 0 ? (
                  newsData[activeTab].map((item, idx) => (
                    <Link
                      key={idx}
                      href="/contact"
                      className="group grid grid-cols-[auto_1fr_auto] md:grid-cols-[7rem_auto_1fr_auto] items-baseline gap-x-6 gap-y-2 py-6 border-b border-gray-200 hover:border-brand-primary/40 transition-colors"
                    >
                      <span className="text-xs text-muted font-medium tracking-widest tabular-nums">
                        {item.date}
                      </span>
                      <span className="text-[10px] font-medium tracking-[0.25em] text-brand-primary uppercase">
                        {item.category}
                      </span>
                      <span className="col-span-2 md:col-span-1 text-base text-gray-800 group-hover:text-brand-primary transition-colors leading-relaxed">
                        {item.title}
                      </span>
                      <span
                        aria-hidden="true"
                        className="opacity-0 group-hover:opacity-100 transition-opacity text-brand-primary hidden md:inline"
                      >
                        →
                      </span>
                    </Link>
                  ))
                ) : (
                  <div className="py-20 text-center text-gray-400 text-sm">
                    現在、該当するお知らせはありません。
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ============================================================
          伍 — FINAL CTA（光の余白）
          ============================================================ */}
      <section className="relative py-32 md:py-48 bg-white overflow-hidden">
        {/* 静かな水平線。ハードな暗黒CTAを退け、淡いティール余韻だけを残す */}
        <div
          aria-hidden="true"
          className="absolute inset-x-0 top-1/2 -translate-y-1/2 h-72 md:h-96 bg-gradient-to-b from-transparent via-brand-teal-light to-transparent opacity-70 pointer-events-none"
        />
        <div className="relative z-10 container mx-auto px-6 max-w-3xl text-center">
          <div className="reveal flex flex-col items-center gap-4 mb-10">
            <span aria-hidden="true" className="block h-12 w-px bg-brand-primary/60" />
            <div className="flex items-baseline gap-4">
              <span className="font-serif text-3xl text-brand-primary leading-none">伍</span>
              <span className="text-[10px] font-medium tracking-[0.35em] text-muted uppercase">
                Contact
              </span>
            </div>
          </div>

          <h2 className="reveal text-3xl md:text-4xl lg:text-5xl font-serif font-medium text-gray-900 tracking-[0.08em] leading-snug mb-10">
            人生の節目を、<br />共により良く。
          </h2>
          <p className="reveal text-muted mb-14 leading-loose text-base font-light max-w-xl mx-auto">
            個人のお客様から事業者様まで。<br className="hidden md:block" />
            清蓮は、あらゆる想いに誠実に応える体制を整えています。
          </p>

          <div className="reveal flex flex-col sm:flex-row justify-center items-center gap-8">
            <Link
              href="/contact"
              className="inline-flex items-center gap-3 px-12 py-4 bg-brand-primary text-white text-[13px] font-medium tracking-[0.18em] hover:bg-brand-hover transition-colors duration-300"
            >
              無料相談・問い合わせ
              <span aria-hidden="true">→</span>
            </Link>
            <a
              href="tel:045-881-9952"
              className="group inline-flex items-center gap-3 text-[13px] font-medium tracking-[0.18em] text-gray-900 hover:text-brand-primary transition-colors"
            >
              <svg
                className="w-4 h-4 text-brand-primary"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1.5}
                  d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                />
              </svg>
              <span className="border-b border-gray-300 group-hover:border-brand-primary pb-1 transition-colors tabular-nums">
                045-881-9952
              </span>
            </a>
          </div>
        </div>
      </section>
    </main>
  );
}
