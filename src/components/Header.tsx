'use client';
import Link from 'next/link';
import { useState, useEffect } from 'react';
import LogoBlooming from './LogoBlooming';

const navItems = [
  {
    label: '事業紹介',
    en: 'Business',
    href: '/business',
    children: [
      { label: '海洋散骨', href: '/business' },
      { label: '遺骨サービス', href: '/business' },
      { label: 'お墓じまい・改葬', href: '/business' },
      { label: '終活コンシェルジュ', href: '/business' },
      { label: '墓地・納骨先検索', href: '/business' },
      { label: '手元供養品', href: '/business' },
    ],
  },
  { label: '清蓮の強み', en: 'Strength', href: '/strength' },
  { label: '提携・取引先', en: 'Partners', href: '/partner' },
  {
    label: '会社情報',
    en: 'Company',
    href: '/company',
    children: [
      { label: '会社概要', href: '/company' },
      { label: 'アクセス・来店', href: '/company' },
    ],
  },
];

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [openAccordion, setOpenAccordion] = useState<string | null>(null);
  const [isLargeText, setIsLargeText] = useState(false);

  // Avoid SSR/CSR hydration mismatch: read localStorage on the client after mount.
  // setState-in-effect is intentional here — it's the canonical pattern for
  // hydrating a client-only persisted preference without a hydration warning.
  useEffect(() => {
    const stored = localStorage.getItem('seiren-text-large') === 'true';
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setIsLargeText(stored);
  }, []);

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
    localStorage.setItem('seiren-text-large', next ? 'true' : 'false');
  };

  const toggleAccordion = (label: string) => {
    setOpenAccordion(openAccordion === label ? null : label);
  };

  return (
    <header className="fixed top-0 left-0 w-full z-50 bg-white">
      {/* ===== 上段：ユーティリティバー（編集ヘアライン） ===== */}
      <div className="hidden lg:block border-b border-gray-100">
        <div className="container mx-auto px-6 lg:px-12 flex justify-end items-center py-2 gap-6">
          {/* 文字サイズ切り替え */}
          <div className="flex items-center gap-1.5">
            <span className="text-[10px] tracking-[0.3em] uppercase text-muted font-medium mr-1">
              Font Size
            </span>
            <button
              type="button"
              onClick={toggleTextSize}
              aria-pressed={!isLargeText}
              className={`px-2.5 py-0.5 text-[11px] tracking-[0.18em] font-medium border transition-colors duration-200 ${
                !isLargeText
                  ? 'bg-brand-primary text-white border-brand-primary'
                  : 'bg-white text-gray-700 border-gray-300 hover:border-brand-primary hover:text-brand-primary'
              }`}
            >
              標準
            </button>
            <button
              type="button"
              onClick={toggleTextSize}
              aria-pressed={isLargeText}
              className={`px-2.5 py-0.5 text-[13px] tracking-[0.18em] font-medium border transition-colors duration-200 ${
                isLargeText
                  ? 'bg-brand-primary text-white border-brand-primary'
                  : 'bg-white text-gray-700 border-gray-300 hover:border-brand-primary hover:text-brand-primary'
              }`}
            >
              大
            </button>
          </div>

          {/* 電話番号 */}
          <a
            href="tel:045-881-9952"
            className="group flex items-center gap-2 text-[11px] tracking-[0.18em] font-medium text-gray-700 hover:text-brand-primary transition-colors border-l border-gray-200 pl-6 tabular-nums"
          >
            <svg
              className="w-3.5 h-3.5 text-brand-primary"
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
            045-881-9952
            <span className="text-[10px] tracking-[0.18em] text-muted ml-2">
              月曜〜日曜 9:00〜17:00
            </span>
          </a>

          {/* お問い合わせ */}
          <Link
            href="/contact"
            className="text-[11px] tracking-[0.18em] font-medium text-gray-700 hover:text-brand-primary transition-colors border-l border-gray-200 pl-6"
          >
            お問い合わせ
          </Link>
        </div>
      </div>

      {/* ===== 下段：メインナビ ===== */}
      <div className="border-b border-gray-100">
        <div className="container mx-auto px-6 lg:px-12 flex justify-between items-center py-4 lg:py-5">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3 group flex-shrink-0">
            <LogoBlooming
              size="sm"
              interactive={false}
              className="transition-opacity duration-300 group-hover:opacity-70"
            />
            <span className="font-serif font-medium tracking-[0.2em] text-base md:text-lg text-gray-900 transition-colors duration-300 group-hover:text-brand-primary">
              株式会社清蓮
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-8">
            {navItems.map((item) => (
              <div key={item.label} className="relative group/nav py-2">
                <Link
                  href={item.href}
                  className="flex flex-col items-center justify-center transition-colors duration-200"
                >
                  <span className="text-[10px] tracking-[0.3em] uppercase text-muted mb-1 group-hover/nav:text-brand-primary transition-colors">
                    {item.en}
                  </span>
                  <span className="relative text-sm font-medium tracking-[0.1em] text-gray-900 group-hover/nav:text-brand-primary transition-colors pb-1 after:absolute after:bottom-0 after:left-0 after:w-full after:h-px after:bg-brand-primary after:scale-x-0 after:origin-right after:transition-transform after:duration-300 group-hover/nav:after:scale-x-100 group-hover/nav:after:origin-left">
                    {item.label}
                  </span>
                </Link>

                {/* Dropdown for Desktop — editorial flat */}
                {item.children && (
                  <div className="absolute top-full left-1/2 -translate-x-1/2 pt-3 opacity-0 invisible group-hover/nav:opacity-100 group-hover/nav:visible transition-all duration-300 translate-y-1 group-hover/nav:translate-y-0 z-50">
                    <div className="bg-white border border-gray-200 py-2 w-56 flex flex-col">
                      {item.children.map((child) => (
                        <Link
                          key={child.label}
                          href={child.href}
                          className="px-6 py-3 text-sm text-gray-800 hover:text-brand-primary hover:bg-surface transition-colors"
                        >
                          {child.label}
                        </Link>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ))}

            {/* Contact CTA — editorial square */}
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 ml-2 px-5 py-3 bg-brand-primary text-white text-[12px] font-medium tracking-[0.2em] hover:bg-brand-hover transition-colors duration-300"
            >
              お問い合わせ
              <span aria-hidden="true">→</span>
            </Link>
          </nav>

          {/* Mobile Menu Toggle */}
          <button
            type="button"
            className="lg:hidden text-gray-900 focus:outline-none"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="メニュー"
            aria-expanded={isMenuOpen}
          >
            <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {isMenuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 7h16M4 12h16M4 17h16" />
              )}
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isMenuOpen && (
        <div className="lg:hidden absolute top-full left-0 w-full bg-white border-t border-gray-100 max-h-[85vh] overflow-y-auto">
          <nav className="flex flex-col px-6 py-4 pb-10">
            {navItems.map((item) => (
              <div key={item.label} className="border-b border-gray-100 flex flex-col">
                <div className="flex justify-between items-center py-4">
                  <Link
                    href={item.href}
                    className="flex-1 flex flex-col group/mob"
                    onClick={() => !item.children && setIsMenuOpen(false)}
                  >
                    <span className="text-[10px] tracking-[0.3em] uppercase text-brand-primary mb-1">
                      {item.en}
                    </span>
                    <span className="text-base font-medium tracking-[0.08em] text-gray-900 group-hover/mob:text-brand-primary">
                      {item.label}
                    </span>
                  </Link>
                  {item.children && (
                    <button
                      type="button"
                      onClick={() => toggleAccordion(item.label)}
                      className="p-3 -mr-3 text-gray-400 hover:text-brand-primary"
                      aria-expanded={openAccordion === item.label}
                      aria-label={`${item.label}のサブメニューを開閉`}
                    >
                      <svg
                        className={`w-5 h-5 transition-transform duration-300 ${
                          openAccordion === item.label ? 'rotate-180' : ''
                        }`}
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        aria-hidden="true"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={1.5}
                          d="M19 9l-7 7-7-7"
                        />
                      </svg>
                    </button>
                  )}
                </div>

                {/* Mobile Accordion — hairline list */}
                <div
                  className={`overflow-hidden transition-all duration-300 ${
                    openAccordion === item.label ? 'max-h-96 opacity-100 pb-4' : 'max-h-0 opacity-0'
                  }`}
                >
                  <div className="flex flex-col pl-4 border-l border-brand-primary/30">
                    {item.children?.map((child) => (
                      <Link
                        key={child.label}
                        href={child.href}
                        className="px-4 py-2.5 text-sm text-gray-700 hover:text-brand-primary transition-colors"
                        onClick={() => setIsMenuOpen(false)}
                      >
                        {child.label}
                      </Link>
                    ))}
                  </div>
                </div>
              </div>
            ))}

            {/* Mobile utility */}
            <div className="pt-5 mt-2 flex items-center justify-between">
              <a
                href="tel:045-881-9952"
                className="flex items-center gap-2 text-gray-700 text-sm font-medium tabular-nums tracking-[0.1em]"
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
                045-881-9952
              </a>
              <div className="flex items-center gap-1.5">
                <span className="text-[10px] tracking-[0.3em] uppercase text-muted mr-1">
                  Font
                </span>
                <button
                  type="button"
                  onClick={toggleTextSize}
                  aria-pressed={!isLargeText}
                  className={`px-2 py-0.5 text-[11px] tracking-[0.18em] border ${
                    !isLargeText
                      ? 'bg-brand-primary text-white border-brand-primary'
                      : 'border-gray-300 text-gray-700'
                  }`}
                >
                  標準
                </button>
                <button
                  type="button"
                  onClick={toggleTextSize}
                  aria-pressed={isLargeText}
                  className={`px-2 py-0.5 text-[13px] tracking-[0.18em] border ${
                    isLargeText
                      ? 'bg-brand-primary text-white border-brand-primary'
                      : 'border-gray-300 text-gray-700'
                  }`}
                >
                  大
                </button>
              </div>
            </div>

            <div className="pt-6">
              <Link
                href="/contact"
                className="inline-flex w-full items-center justify-center gap-2 px-6 py-4 bg-brand-primary text-white text-[13px] font-medium tracking-[0.2em] hover:bg-brand-hover transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                お問い合わせ
                <span aria-hidden="true">→</span>
              </Link>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}
