import { Metadata } from 'next';
import Link from 'next/link';
import Breadcrumbs from '@/components/Breadcrumbs';
import PageHeader from '@/components/common/PageHeader';
import ChapterMark from '@/components/common/ChapterMark';

export const metadata: Metadata = {
  title: '提携・取引先',
  description:
    '株式会社清蓮が提携する、国内外の寺院・納骨堂、石材店、船舶事業者などの専門事業者ネットワークをご紹介します。',
};

const partners = [
  {
    no: '01',
    title: '寺院 / 納骨堂 / 霊園',
    desc: '良心的な対応と明瞭な費用体系を持つ提携先のみをご案内。宗派を問わずご相談いただけます。',
  },
  {
    no: '02',
    title: '石材店',
    desc: '確かな技術力と丁寧な施工実績を持つ石材店。建墓から墓じまい作業まで、ご安心してお任せください。',
  },
  {
    no: '03',
    title: '船舶事業者',
    desc: '海洋散骨を専門とし、安全運航とマニュアルを遵守する優良事業者。国内・海外の海域をカバーしています。',
  },
  {
    no: '04',
    title: '遺骨メンテナンス・手元供養',
    desc: '専用の洗浄・粉骨設備を持つ専門業者、および手元供養品やメモリアルダイヤモンドの製造メーカー等。',
  },
];

export default function Partner() {
  return (
    <main id="main-content" className="min-h-screen bg-white">
      <Breadcrumbs paths={[{ label: '提携・取引先', href: '/partner' }]} />

      <PageHeader
        num="肆"
        enLabel="Partners"
        title="提携・取引先"
        lead="清蓮では、お客様に安心してサービスをご利用いただけるよう、厳格な基準を満たした各分野の専門事業者等とパートナーシップを結んでいます。"
      />

      <section className="container mx-auto px-6 lg:px-12 py-16 md:py-24 max-w-5xl">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-16">
          {partners.map((p) => (
            <article key={p.no} className="flex flex-col gap-5">
              <div className="flex items-baseline gap-4">
                <span className="font-serif text-3xl text-brand-primary leading-none tabular-nums">
                  {p.no}
                </span>
                <span className="h-px flex-1 bg-brand-primary/30" />
              </div>
              <h2 className="text-xl md:text-2xl font-serif font-medium text-gray-900 tracking-[0.08em] leading-snug">
                {p.title}
              </h2>
              <p className="text-base text-gray-700 leading-loose">{p.desc}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="bg-surface py-20 md:py-28">
        <div className="container mx-auto px-6 lg:px-12 max-w-3xl">
          <ChapterMark num="伍" label="For Partners" align="center" />
          <h2 className="mt-8 text-center text-2xl md:text-3xl font-serif font-medium text-gray-900 tracking-[0.08em] leading-snug">
            提携をご希望の事業者様へ
          </h2>
          <p className="mt-8 text-center text-base text-gray-700 leading-loose max-w-2xl mx-auto">
            当社のお客様に対し、誠実かつ透明性の高いサービスをご提供いただけるパートナー様を随時募集しております。
            ご提案は下記のお問い合わせフォームよりお寄せください。
          </p>
          <div className="mt-12 flex justify-center">
            <Link
              href="/contact"
              className="inline-flex items-center gap-3 px-12 py-4 bg-brand-primary text-white text-[13px] font-medium tracking-[0.18em] hover:bg-brand-hover transition-colors duration-300"
            >
              事業者様向けのお問い合わせ
              <span aria-hidden="true">→</span>
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
