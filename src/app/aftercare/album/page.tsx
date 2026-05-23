import type { Metadata } from "next";
import AftercareAlbumActions from "@/components/aftercare/AftercareAlbumActions";
import AftercareCopyField from "@/components/aftercare/AftercareCopyField";
import AftercarePageShell from "@/components/aftercare/AftercarePageShell";
import {
  AFTERCARE_CONTACT,
  AFTERCARE_DEFAULT_LINKS,
  AFTERCARE_TEXT,
} from "@/constants/aftercare";
import { getAftercarePageMeta } from "@/lib/aftercare/getAftercarePageMeta";
import { getAftercareCaseByToken } from "@/lib/aftercare/repository";

export const metadata: Metadata = getAftercarePageMeta("album");

type AftercareAlbumPageProps = {
  searchParams?: Promise<{
    id?: string;
    token?: string;
  }>;
};

export default async function AftercareAlbumPage({
  searchParams,
}: AftercareAlbumPageProps) {
  const params = searchParams ? await searchParams : undefined;
  const submissionId = params?.id?.trim() || null;
  const token = params?.token?.trim() || null;
  const caseRecord = token ? await getAftercareCaseByToken(token) : null;

  // 案件が特定されているが albumUrl が未設定の場合は準備中として扱う
  const isAlbumReady = !caseRecord || Boolean(caseRecord.albumUrl);
  const albumUrl = caseRecord?.albumUrl || AFTERCARE_DEFAULT_LINKS.albumUrl;
  const albumPassword =
    caseRecord?.albumPassword || AFTERCARE_DEFAULT_LINKS.albumPassword;
  const albumTitle = caseRecord?.albumTitle || "アルバム情報";

  return (
    <AftercarePageShell
      pageKey="album"
      lead={AFTERCARE_TEXT.albumLead}
    >
      <div className="space-y-6">
        {/* アルバム情報カード */}
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 text-left">
          <div className="flex items-center gap-2 mb-5">
            <svg className="w-5 h-5 text-brand-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M6.827 6.175A2.31 2.31 0 015.186 7.23c-.38.054-.757.112-1.134.175C2.999 7.58 2.25 8.507 2.25 9.574V18a2.25 2.25 0 002.25 2.25h15A2.25 2.25 0 0021.75 18V9.574c0-1.067-.75-1.994-1.802-2.169a47.865 47.865 0 00-1.134-.175 2.31 2.31 0 01-1.64-1.055l-.822-1.316a2.192 2.192 0 00-1.736-1.039 48.774 48.774 0 00-5.232 0 2.192 2.192 0 00-1.736 1.039l-.821 1.316z" />
              <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 12.75a4.5 4.5 0 11-9 0 4.5 4.5 0 019 0z" />
            </svg>
            <h2 className="text-base font-semibold text-neutral-text">{albumTitle}</h2>
          </div>

          {isAlbumReady ? (
            <>
              <p className="text-sm text-neutral-muted leading-relaxed mb-5">
                {AFTERCARE_TEXT.albumDescription}
              </p>
              <div className="space-y-5">
                <AftercareCopyField
                  label="アルバムURL"
                  value={albumUrl}
                />
                <AftercareCopyField
                  label="パスワード"
                  value={albumPassword}
                  isPassword
                />
              </div>
            </>
          ) : (
            <p className="text-sm leading-[2] text-neutral-text">
              現在、アルバムの準備中です。準備が整い次第、担当者よりご連絡いたします。
              ご不明な点は下記までお気軽にお問い合わせください。
            </p>
          )}
        </div>

        {/* ログイン方法カード */}
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 text-left">
          <div className="flex items-center gap-2 mb-5">
            <svg className="w-5 h-5 text-brand-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h3.75M9 15h3.75M9 18h3.75m3 .75H18a2.25 2.25 0 002.25-2.25V6.108c0-1.135-.845-2.098-1.976-2.192a48.424 48.424 0 00-1.123-.08m-5.801 0c-.065.21-.1.433-.1.664 0 .414.336.75.75.75h4.5a.75.75 0 00.75-.75 2.25 2.25 0 00-.1-.664m-5.8 0A2.251 2.251 0 0113.5 2.25H15c1.012 0 1.867.668 2.15 1.586m-5.8 0c-.376.023-.75.05-1.124.08C9.095 4.01 8.25 4.973 8.25 6.108V8.25m0 0H4.875c-.621 0-1.125.504-1.125 1.125v11.25c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125V9.375c0-.621-.504-1.125-1.125-1.125H8.25z" />
            </svg>
            <h2 className="text-base font-semibold text-neutral-text">{AFTERCARE_TEXT.albumStepsTitle}</h2>
          </div>

          <ol className="space-y-3">
            {AFTERCARE_TEXT.albumStepItems.map((text, idx) => (
              <li key={idx} className="flex items-start gap-3">
                <span className="flex-shrink-0 w-6 h-6 rounded-full bg-brand-secondary text-brand-primary text-xs font-bold flex items-center justify-center mt-0.5">
                  {idx + 1}
                </span>
                <span className="text-sm text-neutral-text leading-relaxed">{text}</span>
              </li>
            ))}
          </ol>
        </div>

        {/* Suzuri Album CTA — アルバム準備完了時のみ表示 */}
        {isAlbumReady && (
          <AftercareAlbumActions
            submissionId={submissionId}
            albumUrl={albumUrl}
          />
        )}

        {/* 問い合わせカード */}
        <div className="bg-neutral-surface rounded-2xl p-6 border border-gray-200/60 text-center">
          <p className="text-sm text-neutral-text leading-relaxed mb-4">
            閲覧方法でご不明な点がございましたら、
            <br />
            お気軽にご連絡ください。
          </p>
          <a
            href={`tel:${AFTERCARE_CONTACT.phone}`}
            className="flex items-center justify-center gap-2 text-brand-primary font-bold text-base hover:text-brand-hover transition-colors mb-1"
          >
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z" />
            </svg>
            {AFTERCARE_CONTACT.phone}
          </a>
          <p className="text-xs text-neutral-muted">
            受付時間：{AFTERCARE_CONTACT.hours}
          </p>
        </div>
      </div>
    </AftercarePageShell>
  );
}
