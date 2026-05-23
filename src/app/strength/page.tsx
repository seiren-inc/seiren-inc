import { Metadata } from 'next';
import Breadcrumbs from '@/components/Breadcrumbs';
import PageHeader from '@/components/common/PageHeader';
import InnerCTA from '@/components/common/InnerCTA';

export const metadata: Metadata = {
  title: '清蓮が選ばれる理由',
  description:
    '株式会社清蓮の3つの強み（実務対応力、提携ネットワーク、来店型相談）をご紹介します。相談から実行まで一貫して伴走いたします。',
};

export default function Strength() {
  const strengths = [
    {
      id: '01',
      title: '相談から実行まで、一貫した実務対応力',
      desc: 'ご相談にお答えするだけでなく、行政手続きのアドバイスから現場の段取り、当日の同行まで、必要な実務をワンストップでサポートします。「どこに頼めばいいかわからない」というお客様の負担をゼロに近づけます。',
    },
    {
      id: '02',
      title: '国内外のプロフェッショナルとの連携ネットワーク',
      desc: '優良な寺院や霊園、確かな技術を持つ石材店、安全基準をクリアした船舶事業者、専門の粉骨・洗浄業者など、独自のネットワークを構築。お客様のご希望に合わせて、最適なパートナーを手配いたします。',
    },
    {
      id: '03',
      title: '正解を押し付けない、完全予約制の来店相談',
      desc: '落ち着いた環境でプライバシーに配慮しながらお話を伺うため、完全予約制の相談スペースを設けています。マニュアル通りの提案や特定の宗教・宗派の押し付けは決していたしません。',
    },
  ];

  return (
    <main id="main-content" className="min-h-screen bg-white">
      <Breadcrumbs paths={[{ label: '清蓮が選ばれる理由', href: '/strength' }]} />

      <PageHeader
        num="貳"
        enLabel="Strength"
        title="清蓮の強み"
        lead="インターネットには情報が溢れ、何が本当に自分や家族に合っているのか判断するのは困難です。だからこそ清蓮は、「情報を提供する」だけでなく「最適な選択肢を共に考え、実務まで伴走する」ことをお約束します。"
      />

      <section className="container mx-auto px-6 lg:px-12 py-16 md:py-24 max-w-5xl">
        <div className="space-y-20 md:space-y-28">
          {strengths.map((item) => (
            <article
              key={item.id}
              className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-12"
            >
              <div className="md:col-span-3 flex md:flex-col items-baseline md:items-start gap-4">
                <span className="font-serif text-5xl md:text-6xl text-brand-primary leading-none tabular-nums">
                  {item.id}
                </span>
                <span className="h-px flex-1 md:w-16 md:flex-none bg-brand-primary/40" />
              </div>
              <div className="md:col-span-9 flex flex-col gap-6">
                <h2 className="text-2xl md:text-3xl lg:text-4xl font-serif font-medium text-gray-900 tracking-[0.06em] leading-snug">
                  {item.title}
                </h2>
                <p className="text-base text-gray-700 leading-loose">
                  {item.desc}
                </p>
              </div>
            </article>
          ))}
        </div>
      </section>

      <InnerCTA
        num="伍"
        enLabel="Contact"
        heading="些細なことでも、まずはご相談ください"
        body="「まだ具体的に決まっていない」「何からはじめていいかわからない」という段階から、よき相談相手として伴走いたします。"
        primary={{ label: 'Webから相談する', href: '/contact' }}
      />
    </main>
  );
}
