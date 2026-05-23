import Link from "next/link";

/**
 * InnerCTA — 内ページ末尾の編集スタイル CTA。
 *
 * 暗黒背景・グラデーションブロブを退け、淡 teal の水平余韻のみ。
 * primary 1つ（filled teal）＋ 任意の電話 link（下線テキスト）の構成。
 */
type InnerCTAProps = {
  num?: string;
  enLabel?: string;
  heading: string;
  body?: string;
  primary?: { label: string; href: string };
  showPhone?: boolean;
};

export default function InnerCTA({
  num,
  enLabel = "Contact",
  heading,
  body,
  primary = { label: "無料相談・問い合わせ", href: "/contact" },
  showPhone = true,
}: InnerCTAProps) {
  return (
    <section className="relative py-28 md:py-36 bg-white overflow-hidden">
      <div
        aria-hidden="true"
        className="absolute inset-x-0 top-1/2 -translate-y-1/2 h-56 md:h-72 bg-gradient-to-b from-transparent via-brand-teal-light to-transparent opacity-70 pointer-events-none"
      />
      <div className="relative z-10 container mx-auto px-6 max-w-3xl text-center">
        <div className="flex flex-col items-center gap-4 mb-8">
          <span
            aria-hidden="true"
            className="block h-10 w-px bg-brand-primary/60"
          />
          <div className="flex items-baseline gap-4">
            {num ? (
              <span className="font-serif text-2xl text-brand-primary leading-none">
                {num}
              </span>
            ) : null}
            <span className="text-[10px] font-medium tracking-[0.35em] text-muted uppercase">
              {enLabel}
            </span>
          </div>
        </div>

        <h2 className="text-2xl md:text-3xl lg:text-4xl font-serif font-medium text-gray-900 tracking-[0.08em] leading-snug mb-8">
          {heading}
        </h2>
        {body ? (
          <p className="text-muted mb-12 leading-loose text-base max-w-xl mx-auto">
            {body}
          </p>
        ) : null}

        <div className="flex flex-col sm:flex-row justify-center items-center gap-8">
          <Link
            href={primary.href}
            className="inline-flex items-center gap-3 px-12 py-4 bg-brand-primary text-white text-[13px] font-medium tracking-[0.18em] hover:bg-brand-hover transition-colors duration-300"
          >
            {primary.label}
            <span aria-hidden="true">→</span>
          </Link>
          {showPhone ? (
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
          ) : null}
        </div>
      </div>
    </section>
  );
}
