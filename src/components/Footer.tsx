import Link from 'next/link';

/**
 * Footer — editorial light footer
 *
 * 旧版は `bg-surface-dark` の暗ベタ + `bg-gray-950` のリーガルバーで
 * editorial に直したページ群とコントラストが割れていたため、
 * 全体を白/淡サーフェスにし、章番号体系・ヘアラインで統一。
 */
export default function Footer() {
  return (
    <footer className="bg-surface text-gray-700 border-t border-gray-200">
      <div className="container mx-auto px-6 lg:px-12 py-20 md:py-28">
        {/* Brand block */}
        <div className="flex flex-col items-start gap-4 mb-16 md:mb-20">
          <span aria-hidden="true" className="block h-10 w-px bg-brand-primary/60" />
          <div className="flex items-baseline gap-4">
            <span className="font-serif text-2xl text-brand-primary leading-none">終</span>
            <span className="text-[10px] font-medium tracking-[0.35em] text-muted uppercase">
              Seiren Inc.
            </span>
          </div>
          <h2 className="mt-4 font-serif text-2xl md:text-3xl text-gray-900 tracking-[0.18em]">
            株式会社清蓮
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 md:gap-12 mb-16">
          {/* Address & TEL */}
          <div className="md:col-span-5 flex flex-col gap-5">
            <p className="text-[10px] tracking-[0.3em] uppercase text-muted font-medium">
              Office
            </p>
            <address className="not-italic text-sm leading-loose text-gray-700">
              〒244-0003
              <br />
              神奈川県横浜市戸塚区戸塚町4170
              <br />
              高橋ビル1F
            </address>
            <div className="pt-2">
              <p className="text-[10px] tracking-[0.3em] uppercase text-muted font-medium mb-3">
                Telephone
              </p>
              <a
                href="tel:045-881-9952"
                className="group inline-flex items-center gap-3 text-2xl md:text-3xl font-serif font-medium text-gray-900 hover:text-brand-primary transition-colors tabular-nums"
              >
                <svg
                  className="w-5 h-5 text-brand-primary"
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
              <p className="text-xs text-muted mt-3 tabular-nums tracking-wider">
                受付時間：月曜〜日曜 9:00〜17:00
              </p>
            </div>
          </div>

          {/* Nav columns */}
          <nav
            aria-label="フッターナビゲーション"
            className="md:col-span-7 grid grid-cols-2 sm:grid-cols-3 gap-10 md:gap-8"
          >
            <div className="flex flex-col gap-5">
              <p className="text-[10px] tracking-[0.3em] uppercase text-brand-primary font-medium">
                Business
              </p>
              <ul className="flex flex-col gap-3 text-sm">
                <li>
                  <Link
                    href="/business"
                    className="text-gray-700 hover:text-brand-primary transition-colors"
                  >
                    事業紹介
                  </Link>
                </li>
                <li>
                  <Link
                    href="/strength"
                    className="text-gray-700 hover:text-brand-primary transition-colors"
                  >
                    清蓮の強み
                  </Link>
                </li>
                <li>
                  <Link
                    href="/partner"
                    className="text-gray-700 hover:text-brand-primary transition-colors"
                  >
                    提携・取引先
                  </Link>
                </li>
              </ul>
            </div>

            <div className="flex flex-col gap-5">
              <p className="text-[10px] tracking-[0.3em] uppercase text-brand-primary font-medium">
                Company
              </p>
              <ul className="flex flex-col gap-3 text-sm">
                <li>
                  <Link
                    href="/"
                    className="text-gray-700 hover:text-brand-primary transition-colors"
                  >
                    TOP
                  </Link>
                </li>
                <li>
                  <Link
                    href="/company"
                    className="text-gray-700 hover:text-brand-primary transition-colors"
                  >
                    会社情報
                  </Link>
                </li>
              </ul>
            </div>

            <div className="flex flex-col gap-5">
              <p className="text-[10px] tracking-[0.3em] uppercase text-brand-primary font-medium">
                Support
              </p>
              <ul className="flex flex-col gap-3 text-sm">
                <li>
                  <Link
                    href="/contact"
                    className="text-gray-700 hover:text-brand-primary transition-colors"
                  >
                    お問い合わせ
                  </Link>
                </li>
                <li>
                  <Link
                    href="/privacy"
                    className="text-gray-700 hover:text-brand-primary transition-colors"
                  >
                    プライバシーポリシー
                  </Link>
                </li>
                <li>
                  <Link
                    href="/terms"
                    className="text-gray-700 hover:text-brand-primary transition-colors"
                  >
                    利用規約
                  </Link>
                </li>
              </ul>
            </div>
          </nav>
        </div>

        {/* Legal bar — hairline-divided, same surface */}
        <div className="pt-8 border-t border-gray-200 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <nav
            aria-label="リーガル"
            className="flex flex-wrap items-center gap-x-6 gap-y-2"
          >
            <Link
              href="/privacy"
              className="text-xs tracking-[0.18em] text-muted hover:text-brand-primary transition-colors"
            >
              プライバシーポリシー
            </Link>
            <Link
              href="/terms"
              className="text-xs tracking-[0.18em] text-muted hover:text-brand-primary transition-colors"
            >
              利用規約
            </Link>
            <Link
              href="/contact"
              className="text-xs tracking-[0.18em] text-muted hover:text-brand-primary transition-colors"
            >
              お問い合わせ
            </Link>
            <Link
              href="/sitemap.xml"
              target="_blank"
              className="text-xs tracking-[0.18em] text-muted hover:text-brand-primary transition-colors"
            >
              サイトマップ
            </Link>
          </nav>
          <p className="text-xs tracking-[0.18em] text-muted tabular-nums">
            © 2026 株式会社清蓮 All Rights Reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
