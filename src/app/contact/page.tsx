import { Metadata } from 'next';
import Link from 'next/link';
import Breadcrumbs from '@/components/Breadcrumbs';
import PageHeader from '@/components/common/PageHeader';
import ChapterMark from '@/components/common/ChapterMark';

export const metadata: Metadata = {
  title: 'お問い合わせ',
  description:
    '株式会社清蓮への各種ご相談・お問い合わせはこちらから。海洋散骨、遺骨サービス、お墓じまいなど、お気軽にご連絡ください。',
};

export default function Contact() {
  return (
    <main id="main-content" className="min-h-screen bg-white">
      <Breadcrumbs paths={[{ label: 'お問い合わせ', href: '/contact' }]} />

      <PageHeader
        num="伍"
        enLabel="Contact"
        title="お問い合わせ"
        lead="ご相談内容や状況をお伺いし、最適な選択肢をご提案いたします。無理な勧誘は一切ございません。"
      />

      {/* TEL block */}
      <section className="container mx-auto px-6 lg:px-12 py-12 md:py-16 max-w-3xl">
        <div className="relative py-12 md:py-14 overflow-hidden text-center">
          <div
            aria-hidden="true"
            className="absolute inset-x-0 top-1/2 -translate-y-1/2 h-48 bg-gradient-to-b from-transparent via-brand-teal-light to-transparent opacity-70 pointer-events-none"
          />
          <div className="relative z-10">
            <ChapterMark num="一" label="By Phone" align="center" />
            <p className="mt-8 text-[11px] tracking-[0.3em] uppercase text-muted">
              お急ぎの方・お電話でのご相談
            </p>
            <a
              href="tel:045-881-9952"
              className="mt-6 inline-flex items-center gap-4 text-4xl md:text-5xl font-serif font-medium text-gray-900 hover:text-brand-primary transition-colors tabular-nums"
            >
              <svg
                className="w-7 h-7 text-brand-primary"
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
            <p className="mt-4 text-xs text-muted tabular-nums">
              受付時間：月曜〜日曜 9:00〜17:00（年末年始を除く）
            </p>
          </div>
        </div>
      </section>

      {/* Form */}
      <section className="container mx-auto px-6 lg:px-12 pb-24 max-w-3xl">
        <ChapterMark num="二" label="By Form" />
        <h2 className="mt-8 mb-6 text-2xl md:text-3xl font-serif font-medium text-gray-900 tracking-[0.06em]">
          Webからのお問い合わせ
        </h2>
        <p className="text-base text-gray-700 leading-loose mb-12">
          来店相談のご予約、サービスに関するご質問、事業者様からのご提案など、以下のフォームよりお気軽にお送りください。
          通常、2〜3営業日以内に担当者よりご返信いたします。
        </p>

        <form action="#" method="POST" className="space-y-10">
          <div>
            <label
              htmlFor="name"
              className="block text-[11px] tracking-[0.3em] uppercase text-muted font-medium mb-3"
            >
              お名前
              <span className="text-brand-accent ml-2 normal-case tracking-normal text-[10px]">
                必須
              </span>
            </label>
            <input
              type="text"
              id="name"
              name="name"
              required
              className="block w-full border-0 border-b border-gray-300 bg-transparent py-3 text-base focus:border-brand-primary focus:ring-0 focus:outline-none transition-colors"
              placeholder="山田 太郎"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
            <div>
              <label
                htmlFor="email"
                className="block text-[11px] tracking-[0.3em] uppercase text-muted font-medium mb-3"
              >
                メールアドレス
                <span className="text-brand-accent ml-2 normal-case tracking-normal text-[10px]">
                  必須
                </span>
              </label>
              <input
                type="email"
                id="email"
                name="email"
                required
                className="block w-full border-0 border-b border-gray-300 bg-transparent py-3 text-base focus:border-brand-primary focus:ring-0 focus:outline-none transition-colors"
                placeholder="example@seiren-inc.co.jp"
              />
            </div>
            <div>
              <label
                htmlFor="tel"
                className="block text-[11px] tracking-[0.3em] uppercase text-muted font-medium mb-3"
              >
                電話番号
              </label>
              <input
                type="tel"
                id="tel"
                name="tel"
                className="block w-full border-0 border-b border-gray-300 bg-transparent py-3 text-base focus:border-brand-primary focus:ring-0 focus:outline-none transition-colors"
                placeholder="090-1234-5678"
              />
            </div>
          </div>

          <div>
            <label
              htmlFor="category"
              className="block text-[11px] tracking-[0.3em] uppercase text-muted font-medium mb-3"
            >
              お問い合わせ種別
            </label>
            <select
              id="category"
              name="category"
              className="block w-full border-0 border-b border-gray-300 bg-transparent py-3 text-base focus:border-brand-primary focus:ring-0 focus:outline-none transition-colors"
            >
              <option value="相談予約">来店相談・オンライン相談のご予約</option>
              <option value="サービスについて">各サービスについてのご質問</option>
              <option value="法人の方へ">事業者様・メディア等からのご連絡</option>
              <option value="その他">その他</option>
            </select>
          </div>

          <div>
            <label
              htmlFor="message"
              className="block text-[11px] tracking-[0.3em] uppercase text-muted font-medium mb-3"
            >
              お問い合わせ内容
              <span className="text-brand-accent ml-2 normal-case tracking-normal text-[10px]">
                必須
              </span>
            </label>
            <textarea
              id="message"
              name="message"
              rows={6}
              required
              className="block w-full border border-gray-300 bg-transparent p-4 text-base focus:border-brand-primary focus:ring-0 focus:outline-none transition-colors resize-y"
              placeholder="ご相談内容やご希望の日時などを入力してください。"
            />
          </div>

          <p className="text-sm text-muted leading-loose border-l-2 border-brand-primary/40 pl-5">
            送信前に当社の
            <Link
              href="/privacy"
              className="text-gray-900 border-b border-gray-300 hover:border-brand-primary hover:text-brand-primary transition-colors"
            >
              プライバシーポリシー
            </Link>
            をご確認ください。内容にご同意いただいた上で送信をお願いいたします。
          </p>

          <div className="pt-4 flex flex-col items-center gap-3">
            <button
              type="submit"
              className="inline-flex items-center gap-3 px-14 py-4 bg-brand-primary text-white text-[13px] font-medium tracking-[0.18em] hover:bg-brand-hover transition-colors duration-300"
            >
              確認画面へ進む
              <span aria-hidden="true">→</span>
            </button>
            <p className="text-xs text-muted">
              ※ 本サイトは静的フォームデザインです。システム連携は別途行われます。
            </p>
          </div>
        </form>
      </section>
    </main>
  );
}
