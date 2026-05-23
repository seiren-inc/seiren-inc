import { Metadata } from 'next';
import Image from 'next/image';
import Breadcrumbs from '@/components/Breadcrumbs';
import PageHeader from '@/components/common/PageHeader';
import ChapterMark from '@/components/common/ChapterMark';
import InnerCTA from '@/components/common/InnerCTA';

export const metadata: Metadata = {
  title: '会社情報',
  description:
    '株式会社清蓮の会社概要、代表挨拶、アクセス情報などをご案内します。横浜市戸塚区を拠点に全国の終活・供養をサポートしています。',
};

type Row = { label: string; value: React.ReactNode };

const rows: Row[] = [
  { label: '商号', value: '株式会社清蓮' },
  { label: '設立', value: '2026年（令和8年）' },
  { label: '代表取締役', value: '眞如 りえ' },
  {
    label: '所在地',
    value: (
      <>
        〒244-0003
        <br />
        神奈川県横浜市戸塚区戸塚町4170 高橋ビル1F
        <a
          href="https://maps.google.com/?q=神奈川県横浜市戸塚区戸塚町4170+高橋ビル1F"
          target="_blank"
          rel="noopener noreferrer"
          className="block mt-3 text-[12px] tracking-[0.18em] text-brand-primary border-b border-brand-primary/60 pb-1 inline-block hover:opacity-70 transition-opacity"
        >
          Google Mapで見る →
        </a>
      </>
    ),
  },
  { label: '電話番号', value: '045-881-9952' },
  {
    label: '事業内容',
    value: (
      <ul className="list-disc list-outside ml-5 space-y-2 text-base leading-relaxed">
        <li>海洋散骨事業の企画・運営</li>
        <li>遺骨の特殊清掃（洗骨・粉骨等）の手配</li>
        <li>墓じまい・改葬に関する手続き代行サポート</li>
        <li>終活コンシェルジュサービスの提供</li>
        <li>手元供養品の企画・販売</li>
        <li>提携石材店・寺院の紹介</li>
      </ul>
    ),
  },
];

export default function Company() {
  return (
    <main id="main-content" className="min-h-screen bg-white">
      <Breadcrumbs paths={[{ label: '会社情報', href: '/company' }]} />

      <PageHeader num="参" enLabel="Company" title="会社情報" />

      <section className="container mx-auto px-6 lg:px-12 py-16 md:py-24 max-w-4xl">
        <ChapterMark num="一" label="Profile" />
        <h2 className="mt-8 mb-14 text-2xl md:text-3xl font-serif font-medium text-gray-900 tracking-[0.06em]">
          会社概要
        </h2>
        <dl className="border-t border-gray-200">
          {rows.map((row) => (
            <div
              key={row.label}
              className="grid grid-cols-1 md:grid-cols-12 gap-3 md:gap-8 py-7 border-b border-gray-200"
            >
              <dt className="md:col-span-3 text-[11px] tracking-[0.3em] uppercase text-muted font-medium pt-1">
                {row.label}
              </dt>
              <dd className="md:col-span-9 text-gray-900 leading-relaxed">
                {row.value}
              </dd>
            </div>
          ))}
        </dl>
      </section>

      <section className="bg-surface py-20 md:py-28">
        <div className="container mx-auto px-6 lg:px-12 max-w-5xl">
          <ChapterMark num="二" label="Access" />
          <h2 className="mt-8 mb-14 text-2xl md:text-3xl font-serif font-medium text-gray-900 tracking-[0.06em]">
            アクセス・来店について
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-16 items-stretch">
            <div className="relative aspect-[4/3] overflow-hidden bg-white">
              <Image
                src="/assets/img/about-office.jpg"
                alt="清潔感のある来店スペース"
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 50vw"
              />
            </div>
            <div className="flex flex-col gap-6 self-center">
              <p className="font-serif text-xl md:text-2xl text-brand-primary tracking-[0.12em]">
                完全予約制
              </p>
              <p className="text-base text-gray-700 leading-loose">
                お客様のご事情をゆっくりお伺いするため、ご来店は「完全予約制」とさせていただいております。
                お電話、またはお問い合わせフォームよりご希望の日時をお伝えください。
              </p>
              <div className="border-t border-gray-200 pt-6 mt-2">
                <p className="text-[11px] tracking-[0.3em] uppercase text-muted font-medium mb-2">
                  営業時間
                </p>
                <p className="text-lg text-gray-900 tabular-nums">
                  9:00 – 17:00（月曜〜日曜対応）
                </p>
                <p className="text-xs text-muted mt-2">※ 年末年始を除く</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <InnerCTA
        num="伍"
        enLabel="Contact"
        heading="ご来店・ご相談のご予約はこちらから"
        body="完全予約制での個別相談を承っております。まずはお気軽にお問い合わせください。"
        primary={{ label: 'ご予約・お問い合わせ', href: '/contact' }}
      />
    </main>
  );
}
