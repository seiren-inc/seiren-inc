'use client';
import Image from 'next/image';
import Link from 'next/link';
import { useState, useEffect } from 'react';
import LogoBlooming from './LogoBlooming';

const navItems = [
  {
    label: '事業紹介',
    en: 'BUSINESS',
    href: '/business',
    children: [
      { label: '海洋散骨', href: '/business' },
      { label: '遺骨サービス', href: '/business' },
      { label: 'お墓じまい・改葬', href: '/business' },
      { label: '終活コンシェルジュ', href: '/business' },
      { label: '墓地・納骨先検索', href: '/business' },
      { label: '手元供養品', href: '/business' },
    ]
  },
  { label: '清蓮の強み', en: 'STRENGTH', href: '/strength' },
  { label: '提携・取引先', en: 'PARTNERS', href: '/partner' },
  {
    label: '会社情報',
    en: 'COMPANY',
    href: '/company',
    children: [
      { label: '会社概要', href: '/company' },
      { label: 'アクセス・来店', href: '/company' },
    ]
  },
];

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [openAccordion, setOpenAccordion] = useState<string | null>(null);
  const [isLargeText, setIsLargeText] = useState(() => {
    if (typeof window === 'undefined') return false;
    return localStorage.getItem('seiren-text-large') === 'true';
  });

  // 初期状態に応じて html 要素へクラスを同期
  useEffect(() => {
    if (isLargeText) {
      document.documentElement.classList.add('text-large');
      return;
    }
    document.documentElement.classList.remove('text-large');
  }, [isLargeText]);

  const toggleTextSize = () => {
    const next = !isLargeText;
    setIsLargeText(next);
    if (next) {
      document.documentElement.classList.add('text-large');
      localStorage.setItem('seiren-text-large', 'true');
    } else {
      document.documentElement.classList.remove('text-large');
      localStorage.setItem('seiren-text-large', 'false');
    }
  };

  const toggleAccordion = (label: string) => {
    setOpenAccordion(openAccordion === label ? null : label);
  };

  return (
    <header className="fixed top-0 left-0 w-full z-50 shadow-sm">
      {/* ===== 上段：ユーティリティバー ===== */}
      <div className="bg-gray-100 border-b border-gray-200 hidden lg:block">
        <div className="container mx-auto px-6 lg:px-12 flex justify-end items-center py-1.5 gap-3">
          {/* 文字サイズ切り替え */}
          <div className="flex items-center gap-1">
            <span className="text-xs text-gray-500 font-medium mr-1">文字サイズ</span>
            <button
              onClick={toggleTextSize}
              aria-pressed={!isLargeText}
              className={`px-2.5 py-0.5 text-xs font-bold border transition-colors duration-200 ${
                !isLargeText
                  ? 'bg-gray-800 text-white border-gray-800'
                  : 'bg-white text-gray-600 border-gray-300 hover:border-gray-500'
              }`}
            >
              標準
            </button>
            <button
              onClick={toggleTextSize}
              aria-pressed={isLargeText}
              className={`px-2.5 py-0.5 text-sm font-bold border transition-colors duration-200 ${
                isLargeText
                  ? 'bg-gray-800 text-white border-gray-800'
                  : 'bg-white text-gray-600 border-gray-300 hover:border-gray-500'
              }`}
            >
              大
            </button>
          </div>

          {/* 電話番号 */}
          <div className="flex items-center gap-2 border-l border-gray-300 pl-3">
            <svg className="w-3.5 h-3.5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
            </svg>
            <a href="tel:045-881-9952" className="text-xs font-medium text-gray-700 hover:text-brand-primary transition-colors">
              045-881-9952
            </a>
            <span className="text-xs text-gray-400">（月曜〜日曜 9:00〜17:00）</span>
          </div>

          {/* お問い合わせボタン */}
          <Link
            href="/contact"
            className="border-l border-gray-300 pl-3 text-xs font-bold text-gray-700 hover:text-brand-primary transition-colors"
          >
            お問い合わせ
          </Link>
        </div>
      </div>

      {/* ===== 下段：メインナビ ===== */}
      <div className="bg-white border-b border-gray-100">
        <div className="container mx-auto px-6 lg:px-12 flex justify-between items-center py-3 lg:py-4">
          {/* Logo */}
          <div className="flex-shrink-0">
            <Link href="/" className="flex items-center gap-3 group">
              <LogoBlooming size="sm" interactive={false} className="transition-transform duration-300 group-hover:scale-110" />
              <span className="font-bold tracking-widest text-base text-gray-900 transition-colors duration-300 group-hover:text-brand-primary">
                株式会社清蓮
              </span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-6">
            {navItems.map((item) => (
              <div key={item.label} className="relative group/nav py-2">
                <Link href={item.href} className="flex flex-col items-center justify-center transition-colors duration-200">
                  <span className="text-xs font-bold text-gray-400 tracking-widest uppercase mb-0.5 group-hover/nav:text-brand-primary transition-colors">{item.en}</span>
                  <span className="text-sm font-bold text-gray-800 group-hover/nav:text-brand-primary transition-colors relative after:absolute after:bottom-0 after:left-0 after:w-full after:h-[2px] after:bg-brand-accent after:scale-x-0 after:origin-right after:transition-transform after:duration-300 group-hover/nav:after:scale-x-100 group-hover/nav:after:origin-left pb-1">
                    {item.label}
                  </span>
                </Link>
                
                {/* Dropdown for Desktop */}
                {item.children && (
                  <div className="absolute top-full left-1/2 -translate-x-1/2 pt-4 opacity-0 invisible group-hover/nav:opacity-100 group-hover/nav:visible transition-all duration-300 translate-y-2 group-hover/nav:translate-y-0 z-50">
                    <div className="bg-white border border-gray-100 shadow-xl rounded-xl py-3 w-56 flex flex-col relative before:absolute before:-top-3 before:left-1/2 before:-translate-x-1/2 before:border-[10px] before:border-transparent before:border-b-white">
                      {item.children.map((child) => (
                        <Link 
                          key={child.label} 
                          href={child.href} 
                          className="px-6 py-3 text-sm font-medium text-gray-700 hover:text-brand-primary hover:bg-brand-primary/5 transition-colors border-b last:border-0 border-gray-50"
                        >
                          {child.label}
                        </Link>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ))}

            {/* Contact Button */}
            <Link
              href="/contact"
              className="ml-2 bg-brand-primary text-white px-5 py-2 rounded-full text-sm font-bold tracking-wide transition-all duration-300 hover:bg-[#257582] hover:shadow-lg hover:-translate-y-0.5 flex flex-col items-center justify-center"
            >
              <span className="text-xs font-bold tracking-widest uppercase opacity-80 mb-0.5">CONTACT</span>
              <span>お問い合わせ</span>
            </Link>
          </nav>

          {/* Mobile Menu Toggle */}
          <button
            className="lg:hidden text-gray-800 focus:outline-none"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="メニュー"
            aria-expanded={isMenuOpen}
          >
            <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {isMenuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isMenuOpen && (
        <div className="lg:hidden absolute top-full left-0 w-full bg-white shadow-xl border-t border-gray-100 max-h-[85vh] overflow-y-auto">
          <nav className="flex flex-col px-6 py-6 pb-12 space-y-2">
            {navItems.map((item) => (
              <div key={item.label} className="border-b border-gray-50 flex flex-col">
                <div className="flex justify-between items-center py-3">
                  <Link 
                    href={item.href} 
                    className="flex-1 flex flex-col group/mob"
                    onClick={() => !item.children && setIsMenuOpen(false)}
                  >
                    <span className="text-xs font-bold text-brand-primary tracking-widest uppercase mb-1">{item.en}</span>
                    <span className="text-base font-bold text-gray-900 group-hover/mob:text-brand-primary">{item.label}</span>
                  </Link>
                  {item.children && (
                    <button 
                      onClick={() => toggleAccordion(item.label)} 
                      className="p-3 -mr-3 text-gray-400 hover:text-brand-primary"
                    >
                      <svg className={`w-5 h-5 transition-transform duration-300 ${openAccordion === item.label ? 'rotate-180' : ''}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                      </svg>
                    </button>
                  )}
                </div>
                
                {/* Mobile Accordion */}
                <div 
                  className={`overflow-hidden transition-all duration-300 ${openAccordion === item.label ? 'max-h-96 opacity-100 mb-4' : 'max-h-0 opacity-0'}`}
                >
                  <div className="flex flex-col pl-4 py-2 space-y-1 bg-gray-50 rounded-lg border-l-2 border-brand-primary/20">
                    {item.children?.map((child) => (
                      <Link 
                        key={child.label} 
                        href={child.href} 
                        className="px-4 py-2.5 text-sm font-medium text-gray-600 hover:text-brand-primary hover:bg-white rounded-md transition-colors"
                        onClick={() => setIsMenuOpen(false)}
                      >
                        {child.label}
                      </Link>
                    ))}
                  </div>
                </div>
              </div>
            ))}
            
            {/* Mobile utility links */}
            <div className="pt-2 border-t border-gray-100 flex items-center justify-between">
              <a href="tel:045-881-9952" className="flex items-center gap-2 text-gray-600 text-sm font-medium">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
                045-881-9952
              </a>
              <div className="flex items-center gap-1">
                <span className="text-xs text-gray-500">文字</span>
                <button onClick={toggleTextSize} className={`px-2 py-0.5 text-xs border ${!isLargeText ? 'bg-gray-800 text-white border-gray-800' : 'border-gray-300 text-gray-600'}`}>標準</button>
                <button onClick={toggleTextSize} className={`px-2 py-0.5 text-sm border ${isLargeText ? 'bg-gray-800 text-white border-gray-800' : 'border-gray-300 text-gray-600'}`}>大</button>
              </div>
            </div>

            <div className="pt-4">
              <Link
                href="/contact"
                className="flex flex-col items-center justify-center w-full bg-brand-primary text-white text-center px-6 py-4 rounded-xl font-bold shadow-md hover:bg-[#206774] transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                <span className="text-xs font-bold tracking-widest uppercase opacity-80 mb-1">CONTACT</span>
                <span>お問い合わせ</span>
              </Link>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}
