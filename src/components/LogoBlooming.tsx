'use client';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { useRef } from 'react';

/**
 * LogoBlooming Component
 * - 蓮の花のアイコンをSVGパスで描画し、GSAPで「開花」を表現する
 * - イントロダクションとして使用することを想定
 */
export default function LogoBlooming({ 
  className = "", 
  size = "md",
  interactive = true 
}: { 
  className?: string;
  size?: 'sm' | 'md' | 'lg';
  interactive?: boolean;
}) {
  const container = useRef<HTMLDivElement>(null);
  const petalsRef = useRef<SVGGElement>(null);

  const sizePx = {
    sm: 44,
    md: 64,
    lg: 256
  }[size];

  useGSAP(() => {
    if (!petalsRef.current) return;

    const petals = petalsRef.current.children;
    const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });

    // 1. 各花びらのラインを描画 (Stroke Animation)
    tl.fromTo(petals,
      { strokeDasharray: 100, strokeDashoffset: 100, opacity: 0, scale: 0.5, transformOrigin: 'center bottom' },
      { 
        strokeDashoffset: 0, 
        opacity: 1, 
        scale: 1, 
        duration: size === 'sm' ? 1.5 : 2.5, 
        stagger: {
          amount: size === 'sm' ? 0.8 : 1.5,
          from: 'center'
        }
      }
    );

    // 2. 塗り（Fill）をじんわりと入れる
    tl.to(petals, {
      fill: 'var(--brand-accent)',
      fillOpacity: 0.15,
      duration: 1.5,
    }, '-=1.0');

    if (interactive) {
      // 3. 全体的な浮遊感を追加
      gsap.to(petalsRef.current, {
        y: size === 'sm' ? -2 : -10,
        duration: 3,
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut'
      });
    }

  }, { scope: container });

  return (
    <div ref={container} className={`relative flex flex-col items-center justify-center ${className}`}>
      <svg
        viewBox="0 0 100 100"
        width={sizePx}
        height={sizePx}
        className="drop-shadow-xl"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <circle cx="50" cy="50" r="2" fill="var(--brand-gold)" opacity="0.5" />
        <g ref={petalsRef}>
          {[...Array(8)].map((_, i) => (
            <path
              key={`outer-${i}`}
              d="M50 50 C50 50 75 25 50 10 C25 25 50 50 50 50 Z"
              stroke="var(--brand-accent)"
              strokeWidth="0.8"
              fill="transparent"
              style={{ transform: `rotate(${i * 45}deg)`, transformOrigin: '50px 50px' }}
            />
          ))}
          {[...Array(4)].map((_, i) => (
            <path
              key={`inner-${i}`}
              d="M50 50 C50 50 65 35 50 25 C35 35 50 50 50 50 Z"
              stroke="var(--brand-gold)"
              strokeWidth="0.8"
              fill="transparent"
              style={{ transform: `rotate(${i * 90 + 22.5}deg)`, transformOrigin: '50px 50px' }}
            />
          ))}
        </g>
      </svg>
      {size !== 'sm' && (
        <div className="absolute inset-0 bg-brand-teal-light/20 blur-[60px] rounded-full animate-pulse-glow" style={{ zIndex: -1 }} />
      )}
    </div>
  );
}
