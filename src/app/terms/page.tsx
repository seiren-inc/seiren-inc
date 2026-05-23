import { Metadata } from 'next';
import Breadcrumbs from '@/components/Breadcrumbs';
import PageHeader from '@/components/common/PageHeader';

export const metadata: Metadata = {
  title: '利用規約',
  description:
    '株式会社清蓮のコーポレートサイトの利用規約をご案内します。本サイトをご利用の際は、ご一読いただきますようお願いいたします。',
};

type Section = {
  no: string;
  title: string;
  body: React.ReactNode;
};

const sections: Section[] = [
  {
    no: '01',
    title: '適用範囲',
    body: (
      <p>
        本規約は、本サイトを利用するすべての方に適用されます。本サイトを利用した時点で、本規約に同意したものとみなします。
      </p>
    ),
  },
  {
    no: '02',
    title: '禁止事項',
    body: (
      <>
        <p className="mb-3">本サイトの利用にあたり、以下の行為を禁止します。</p>
        <ul className="list-disc list-outside ml-6 space-y-2 leading-loose">
          <li>法令または公序良俗に反する行為</li>
          <li>当社または第三者の権利を侵害する行為</li>
          <li>本サイトの運営を妨害する行為</li>
          <li>不正アクセスまたはそのおそれのある行為</li>
          <li>当社の承諾なく本サイトの情報を商業目的で利用する行為</li>
        </ul>
      </>
    ),
  },
  {
    no: '03',
    title: '免責事項',
    body: (
      <>
        <p className="mb-4">
          当社は、本サイトに掲載される情報の正確性・完全性について万全を期しますが、その内容を保証するものではありません。本サイトの利用により生じた損害について、当社は法令上の責任が認められる場合を除き、一切の責任を負いません。
        </p>
        <p>当社は、本サイトの内容を予告なく変更・中断・終了する場合があります。</p>
      </>
    ),
  },
  {
    no: '04',
    title: '知的財産権',
    body: (
      <p>
        本サイトに掲載されている文章、画像、デザイン、ロゴその他のコンテンツに関する著作権・商標権その他の知的財産権は、当社または正当な権利者に帰属します。当社の事前の書面による承諾なく、これらを複製・転載・改変・配布することを禁止します。
      </p>
    ),
  },
  {
    no: '05',
    title: '規約の変更',
    body: (
      <p>
        当社は、必要に応じて本規約を変更する場合があります。変更後の規約は、本サイトに掲載した時点で効力を生じるものとします。
      </p>
    ),
  },
];

export default function Terms() {
  return (
    <main id="main-content" className="min-h-screen bg-white">
      <Breadcrumbs paths={[{ label: '利用規約', href: '/terms' }]} />

      <PageHeader enLabel="Terms of Service" title="利用規約" />

      <section className="container mx-auto px-6 lg:px-12 py-16 md:py-24 max-w-3xl">
        <p className="text-base md:text-lg text-gray-700 leading-loose mb-16">
          株式会社清蓮（以下「当社」）は、当社が運営するウェブサイト（以下「本サイト」）の利用条件を以下の通り定めます。本サイトをご利用いただく際は、本規約に同意の上ご利用ください。
        </p>

        <div className="space-y-14 md:space-y-16">
          {sections.map((s) => (
            <article key={s.no} className="grid grid-cols-[auto_1fr] gap-x-6 md:gap-x-10">
              <span className="font-serif text-2xl md:text-3xl text-brand-primary leading-none tabular-nums">
                {s.no}
              </span>
              <div>
                <h2 className="text-xl md:text-2xl font-serif font-medium text-gray-900 tracking-[0.06em] mb-5">
                  {s.title}
                </h2>
                <div className="text-base text-gray-700 leading-loose">{s.body}</div>
              </div>
            </article>
          ))}
        </div>

        <div className="mt-16 pt-6 border-t border-gray-200 text-right text-sm text-muted tabular-nums">
          制定日：2026年2月23日
        </div>
      </section>
    </main>
  );
}
