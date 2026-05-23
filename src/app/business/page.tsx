import { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import Breadcrumbs from '@/components/Breadcrumbs';
import PageHeader from '@/components/common/PageHeader';
import InnerCTA from '@/components/common/InnerCTA';

export const metadata: Metadata = {
  title: '事業紹介',
  description:
    '株式会社清蓮は、海洋散骨、遺骨サービス、お墓じまい、終活コンシェルジュなど、人生の節目を支える専門的な事業を幅広く展開しています。',
};

export default function Business() {
  const businesses = [
    {
      id: 'ocean',
      no: '01',
      title: '海洋散骨',
      subtitle: '自然に還る、心安らぐお見送り',
      desc: '海を愛した方や、自然に囲まれて眠りたいと願う方のために。国内・海外を含め、豊富な実績と安全基準をクリアしたチャーター船での散骨をトータルサポートいたします。',
      img: '/assets/img/hero-sea.jpg',
    },
    {
      id: 'care',
      no: '02',
      title: '遺骨サービス',
      subtitle: 'たいせつなお骨のケア・メンテナンス',
      desc: '長年お墓に眠っていたお骨の洗浄（洗骨）や、コンパクトにするための粉骨など、次世代へ繋ぐための遺骨メンテナンスを専門設備を持つパートナーと実施します。',
      img: '/assets/img/hero-sea.jpg',
    },
    {
      id: 'grave',
      no: '03',
      title: 'お墓じまい・改葬',
      subtitle: '負担のない、最適なお引っ越し',
      desc: '遠方のお墓の管理が難しい、継承者がいないなどのお悩みに。行政手続きのアドバイスから石材店の手配など、「お墓のお引っ越し」をスムーズに進めます。',
      img: '/assets/img/hero-sea.jpg',
    },
    {
      id: 'concierge',
      no: '04',
      title: '終活コンシェルジュ',
      subtitle: 'あなたの人生の「これから」を整理する',
      desc: '何から手をつければいいかわからない終活。専任のコンシェルジュがご要望を丁寧にヒアリングし、財産把握から葬儀・供養の希望まで、オーダーメイドでプランニングします。',
      img: '/assets/img/about-office.jpg',
    },
  ];

  return (
    <main id="main-content" className="min-h-screen bg-white">
      <Breadcrumbs paths={[{ label: '事業紹介', href: '/business' }]} />

      <PageHeader
        num="壱"
        enLabel="Business"
        title="事業紹介"
        lead="清蓮では、ご葬儀後の供養から生前の終活プランニングまで、一貫してお客様のサポートを行える複数事業を展開しています。複雑な手続きも、専門家が連携して窓口一つで対応いたします。"
      />

      <section className="container mx-auto px-6 lg:px-12 py-16 md:py-24 max-w-6xl">
        <div className="space-y-24 md:space-y-32">
          {businesses.map((biz, idx) => (
            <article
              key={biz.id}
              className={`grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-center ${
                idx % 2 === 1 ? 'lg:[&>*:first-child]:order-2' : ''
              }`}
            >
              <div className="lg:col-span-6 relative aspect-[4/3] overflow-hidden">
                <Image
                  src={biz.img}
                  alt={biz.title}
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  priority={idx === 0}
                />
                <div
                  aria-hidden="true"
                  className="absolute inset-0 bg-gradient-to-t from-black/10 via-transparent to-transparent"
                />
              </div>

              <div className="lg:col-span-6 flex flex-col gap-6">
                <div className="flex items-baseline gap-4">
                  <span className="font-serif text-2xl text-brand-primary leading-none tabular-nums">
                    {biz.no}
                  </span>
                  <span className="h-px flex-1 bg-brand-primary/30" />
                </div>
                <h2 className="text-3xl md:text-4xl lg:text-5xl font-serif font-medium text-gray-900 tracking-[0.06em] leading-snug">
                  {biz.title}
                </h2>
                <p className="font-serif text-base md:text-lg text-brand-primary leading-relaxed tracking-[0.08em]">
                  {biz.subtitle}
                </p>
                <p className="text-base text-gray-700 leading-loose">
                  {biz.desc}
                </p>
                <div className="pt-2">
                  <Link
                    href="/contact"
                    className="group inline-flex items-center gap-3 text-[13px] font-medium tracking-[0.18em] text-gray-900 hover:text-brand-primary transition-colors duration-300"
                  >
                    <span className="border-b border-gray-300 group-hover:border-brand-primary pb-1 transition-colors">
                      この事業について相談する
                    </span>
                    <span aria-hidden="true">→</span>
                  </Link>
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>

      <InnerCTA
        num="伍"
        enLabel="Contact"
        heading="どのサービスが合うか迷われている方へ"
        body="清蓮の無料カウンセリングでは、状況をお伺いし、最適な選択肢をご提案いたします。無理な勧誘は一切ございません。"
        primary={{ label: '無料相談を予約する', href: '/contact' }}
      />
    </main>
  );
}
