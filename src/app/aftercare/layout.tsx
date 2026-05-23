import type { Metadata } from "next";

export const metadata: Metadata = {
  robots: {
    index: false,
    follow: false,
  },
};

/**
 * AftercareLayout — aftercare フロー専用の Nested Layout
 * コーポレートの Header/Footer は LayoutWrapper で非表示。
 * ミニマルヘッダー + フッターをここで描画する。
 */
export default function AftercareLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen flex flex-col bg-aftercare-warm">
      {/* ミニマルヘッダー */}
      <header className="w-full bg-aftercare-warm border-b border-aftercare-gold/20 flex-shrink-0">
        <div className="max-w-lg mx-auto flex items-center justify-center h-14 px-6">
          <span className="font-serif text-lg font-bold text-neutral-text tracking-[0.1em]">
            清蓮
          </span>
        </div>
      </header>

      {/* メインコンテンツ */}
      <div className="flex-1">
        {children}
      </div>

      {/* ミニマルフッター */}
      <footer className="w-full bg-neutral-surface border-t border-gray-200/60 py-8 flex-shrink-0">
        <div className="max-w-lg mx-auto px-6 text-center">
          <p className="text-xs font-bold tracking-[0.2em] text-neutral-muted uppercase mb-2">
            Contact
          </p>
          <p className="font-serif text-sm font-semibold text-neutral-text mb-1">
            株式会社清蓮
          </p>
          <a
            href="tel:045-881-9952"
            className="text-sm text-brand-primary font-bold hover:text-brand-hover transition-colors"
          >
            045-881-9952
          </a>
          <p className="text-xs text-neutral-muted mt-1">
            受付時間：9:00〜17:00
          </p>
        </div>
      </footer>
    </div>
  );
}
