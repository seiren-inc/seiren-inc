'use client';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useRef } from 'react';
import Link from 'next/link';
import { Anchor, FlaskConical, Navigation } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const services = [
  {
    id: 'marine',
    title: '海洋散骨',
    en: 'MARINE BURIAL',
    desc: '国内・国外の穏やかな海へ。故人の想いを自然に還す、高品質な散骨セレモニーをご提供します。',
    icon: Anchor,
    color: 'var(--brand-primary)',
    bg: '/assets/img/service-marine.jpg',
    href: '/business',
  },
  {
    id: 'bone',
    title: '遺骨サービス',
    en: 'BONE CARE',
    desc: '「遺骨ラボ」による粉骨・洗骨。最先端の設備とまごころで、遺骨のあり方を再定義します。',
    icon: FlaskConical,
    color: 'var(--brand-secondary)',
    bg: '/assets/img/service-bone-care.jpg',
    href: '/business',
  },
  {
    id: 'navi',
    title: '終活ナビ',
    en: 'END-OF-LIFE NAVI',
    desc: 'お墓じまい、お墓探し、コンシェルジュ相談。迷いの多い終活の工程を専門家が最適に導きます。',
    icon: Navigation,
    color: 'var(--brand-accent)',
    bg: '/assets/img/service-navi.jpg',
    href: '/business',
  },
];

export default function ServiceHub() {
  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    const cards = gsap.utils.toArray('.service-card') as HTMLElement[];

    cards.forEach((card, i) => {
      gsap.fromTo(card,
        { opacity: 0, scale: 0.9, y: 50 },
        {
          opacity: 1,
          scale: 1,
          y: 0,
          duration: 1.2,
          ease: 'power4.out',
          scrollTrigger: {
            trigger: card,
            start: 'top 85%',
            toggleActions: 'play none none none',
          },
          delay: i * 0.1,
        }
      );
    });
  }, { scope: containerRef });

  return (
    <section ref={containerRef} className="py-24 md:py-40 bg-white overflow-hidden" aria-label="事業エコシステム">
      <div className="container mx-auto px-6 lg:px-12">
        {/* Header Section */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 md:mb-24 gap-6">
          <div className="reveal">
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-serif font-medium tracking-tight text-gray-900 mb-4">
              Service Ecosystem
            </h2>
            <p className="text-lg text-muted max-w-lg leading-relaxed">
              清蓮は、人生の大切な節目を高品質なサービスで一貫して支えるハブとして機能します。
            </p>
          </div>
          <Link 
            href="/business" 
            className="group flex items-center gap-3 text-sm font-bold tracking-widest uppercase text-brand-primary transition-all pb-2 border-b-2 border-brand-teal-light hover:border-brand-primary"
          >
            All Services
            <span className="group-hover:translate-x-1 transition-transform">→</span>
          </Link>
        </div>

        {/* Grid Section */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 md:gap-12">
          {services.map((service) => (
            <Link
              key={service.id}
              href={service.href}
              className="service-card group relative block h-[500px] md:h-[600px] overflow-hidden bg-surface rounded-2xl shadow-sm hover:shadow-2xl transition-all duration-700"
            >
              {/* Background Image with Overlay */}
              <div className="absolute inset-0 z-0">
                <div className="absolute inset-0 bg-gradient-to-t from-white via-white/40 to-transparent z-10" />
                <div className="absolute inset-0 bg-brand-teal-light/20 z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
                <img 
                  src={service.bg} 
                  alt="" 
                  className="w-full h-full object-cover grayscale-[0.3] group-hover:grayscale-0 group-hover:scale-110 transition-all duration-[2000ms] ease-out"
                />
              </div>

              {/* Content */}
              <div className="relative z-20 h-full flex flex-col justify-end p-8 md:p-12">
                <div className="mb-auto p-4 bg-white/50 backdrop-blur-md rounded-full w-fit group-hover:bg-brand-primary/20 transition-colors">
                  <service.icon className="w-8 h-8 text-brand-primary" strokeWidth={1.5} />
                </div>
                
                <div className="mt-8">
                  <span className="text-xs font-bold tracking-[0.3em] text-brand-primary uppercase mb-3 block">
                    {service.en}
                  </span>
                  <h3 className="text-3xl font-serif font-medium text-gray-900 mb-6 group-hover:text-brand-primary transition-colors">
                    {service.title}
                  </h3>
                  <div className="h-[1px] w-12 bg-gray-200 group-hover:w-full group-hover:bg-brand-primary transition-all duration-700 mb-8" />
                  <p className="text-muted leading-relaxed group-hover:text-gray-900 transition-colors">
                    {service.desc}
                  </p>
                  
                  <div className="mt-10 flex items-center gap-2 text-sm font-bold text-gray-900 opacity-0 group-hover:opacity-100 translate-y-4 group-hover:translate-y-0 transition-all duration-500">
                    詳細を見る
                    <span>→</span>
                  </div>
                </div>
              </div>

              {/* Decorative Corner */}
              <div className="absolute top-0 right-0 w-32 h-32 bg-brand-primary/5 rounded-bl-[100px] -translate-y-full translate-x-full group-hover:translate-y-0 group-hover:translate-x-0 transition-transform duration-700" />
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
