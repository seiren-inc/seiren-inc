import ChapterMark from "./ChapterMark";

/**
 * PageHeader — 内ページ共通の editorial ヘッダー
 *
 * ホームの章番号体系と統一されたタイポグラフィで、
 * 暗いブランドカラー塗りや drop-shadow を排し、白基調＋ヘアラインで構成する。
 */
type PageHeaderProps = {
  num?: string;
  enLabel: string;
  title: string;
  lead?: string;
};

export default function PageHeader({
  num,
  enLabel,
  title,
  lead,
}: PageHeaderProps) {
  return (
    <section className="bg-white pt-16 md:pt-24 pb-12 md:pb-20">
      <div className="container mx-auto px-6 lg:px-12 max-w-5xl">
        <ChapterMark num={num} label={enLabel} align="center" />
        <h1 className="mt-8 text-center font-serif font-medium text-gray-900 tracking-[0.08em] leading-snug text-[clamp(2rem,5.6vw,4.25rem)]">
          {title}
        </h1>
        {lead ? (
          <p className="mt-10 mx-auto max-w-2xl text-center font-serif text-base md:text-lg text-muted leading-loose">
            {lead}
          </p>
        ) : null}
        <div className="mt-10 mx-auto h-px w-24 bg-brand-primary/40" />
      </div>
    </section>
  );
}
