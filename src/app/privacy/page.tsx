import { Metadata } from 'next';
import Breadcrumbs from '@/components/Breadcrumbs';
import PageHeader from '@/components/common/PageHeader';

export const metadata: Metadata = {
  title: 'プライバシーポリシー',
  description:
    '株式会社清蓮のプライバシーポリシー（個人情報保護方針）についてのご案内です。お客様の大切な個人情報を安全に管理いたします。',
};

type Section = {
  no: string;
  title: string;
  body: React.ReactNode;
};

const sections: Section[] = [
  {
    no: '01',
    title: '個人情報の取得について',
    body: (
      <p>
        当社は、お問い合わせ・ご相談の対応、サービスの提供、業務連携の検討などの目的で、お客様の個人情報を適正な手段により取得します。取得にあたっては、利用目的を明示し、必要な範囲内でのみ情報をお預かりします。
      </p>
    ),
  },
  {
    no: '02',
    title: '利用目的',
    body: (
      <>
        <p className="mb-3">当社は、取得した個人情報を以下の目的で利用します。</p>
        <ul className="list-disc list-outside ml-6 space-y-2 leading-loose">
          <li>お問い合わせ・ご相談への対応</li>
          <li>各種サービスの提供・運営</li>
          <li>提携先・取引先との業務連携に関する連絡</li>
          <li>当社からのご案内・情報提供</li>
          <li>サービス改善のための分析</li>
        </ul>
      </>
    ),
  },
  {
    no: '03',
    title: '管理体制',
    body: (
      <p>
        当社は、個人情報への不正アクセス、紛失、改ざん、漏洩などを防止するため、適切な安全管理措置を講じます。個人情報の取り扱いに関する社内体制を整備し、従業員への教育・指導を徹底します。
      </p>
    ),
  },
  {
    no: '04',
    title: '第三者提供について',
    body: (
      <>
        <p className="mb-3">当社は、以下の場合を除き、お客様の個人情報を第三者に提供することはありません。</p>
        <ul className="list-disc list-outside ml-6 space-y-2 leading-loose">
          <li>お客様ご本人の同意がある場合</li>
          <li>法令に基づく場合</li>
          <li>人の生命・身体・財産の保護のために必要であり、本人の同意を得ることが困難な場合</li>
        </ul>
      </>
    ),
  },
];

export default function Privacy() {
  return (
    <main id="main-content" className="min-h-screen bg-white">
      <Breadcrumbs paths={[{ label: 'プライバシーポリシー', href: '/privacy' }]} />

      <PageHeader enLabel="Privacy Policy" title="プライバシーポリシー" />

      <section className="container mx-auto px-6 lg:px-12 py-16 md:py-24 max-w-3xl">
        <p className="text-base md:text-lg text-gray-700 leading-loose mb-16">
          株式会社清蓮（以下「当社」）は、お客様の個人情報の適切な取り扱いと保護を重要な責務と考え、以下のとおりプライバシーポリシーを定め、これを遵守します。
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

          <article className="bg-surface p-8 md:p-12 mt-4">
            <h2 className="text-lg md:text-xl font-serif font-medium text-gray-900 tracking-[0.06em] mb-5">
              05. お問い合わせ窓口
            </h2>
            <p className="text-base text-gray-700 leading-loose mb-4">
              本ポリシーに関するお問い合わせは、下記までご連絡ください。
            </p>
            <p className="text-base text-gray-900 leading-loose">
              株式会社清蓮
              <br />
              〒244-0003 神奈川県横浜市戸塚区戸塚町4170 高橋ビル1F
              <br />
              TEL: 045-881-9952（代表）
            </p>
          </article>
        </div>

        <div className="mt-16 pt-6 border-t border-gray-200 text-right text-sm text-muted tabular-nums">
          制定日：2026年2月23日
        </div>
      </section>
    </main>
  );
}
