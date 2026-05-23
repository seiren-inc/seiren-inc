import type { Metadata } from "next";
import Link from "next/link";
import AftercareStatusBadge from "@/components/aftercare/AftercareStatusBadge";
import {
  AFTERCARE_PREVIEW_BASE_PATH,
  AFTERCARE_TEXT,
} from "@/constants/aftercare";
import { buildAftercareGuideTemplateData } from "@/lib/aftercare/case-template";
import {
  getAftercareCaseStatus,
  listAftercareCases,
} from "@/lib/aftercare/repository";
import { requireAftercareAdminAccess } from "@/lib/aftercare/admin-auth";
import { buildAftercareTokenPath } from "@/lib/aftercare/navigation";

export const metadata: Metadata = {
  title: "案件プレビュー一覧｜株式会社清蓮",
  description: "aftercare 案件の設定状況と案内紙プレビューを確認する社内向けページです。",
  robots: {
    index: false,
    follow: false,
  },
};

export default async function AftercareAdminPage() {
  await requireAftercareAdminAccess();
  const cases = await listAftercareCases();

  return (
    <div className="min-h-screen bg-gray-50">
      <section className="container mx-auto px-6 py-12 lg:px-12">
        <div className="mx-auto max-w-6xl space-y-8">
          <div className="rounded-[32px] border border-gray-200 bg-white p-8 shadow-sm">
            <p className="text-sm font-bold tracking-[0.2em] text-brand-primary">
              INTERNAL PREVIEW
            </p>
            <h1 className="mt-4 font-serif text-3xl font-bold text-gray-900">
              案件別プレビュー一覧
            </h1>
            <p className="mt-4 max-w-3xl text-sm leading-7 text-gray-600">
              {AFTERCARE_TEXT.previewDescription}
              設定担当と確認担当を分けやすいように、各案件の設定状況と案内紙プレビューを一覧で確認できます。
            </p>
          </div>

          <div className="grid gap-6">
            {cases.map((caseRecord) => {
              const status = getAftercareCaseStatus(caseRecord);
              const templateData = buildAftercareGuideTemplateData(caseRecord);

              return (
                <article
                  key={caseRecord.caseId}
                  className="rounded-[28px] border border-gray-200 bg-white p-6 shadow-sm"
                >
                  <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
                    <div>
                      <p className="text-xs font-bold tracking-[0.16em] text-gray-400">
                        {caseRecord.caseId}
                      </p>
                      <h2 className="mt-2 text-xl font-bold text-gray-900">
                        {caseRecord.customerName}
                      </h2>
                      <p className="mt-2 text-sm text-gray-600">
                        散骨日: {templateData.serviceDateLabel}
                      </p>
                      <p className="mt-1 text-sm text-gray-600">
                        作成者: {caseRecord.createdBy}
                        {caseRecord.verifiedBy
                          ? ` / 確認者: ${caseRecord.verifiedBy}`
                          : ""}
                      </p>
                    </div>

                    <div className="flex flex-wrap gap-2">
                      <AftercareStatusBadge
                        label={
                          status.isConfigured ? "設定済み" : "設定待ち"
                        }
                        tone={status.isConfigured ? "success" : "warning"}
                      />
                      <AftercareStatusBadge
                        label={
                          status.isVerified ? "確認済み" : "未確認"
                        }
                        tone={status.isVerified ? "success" : "warning"}
                      />
                      <AftercareStatusBadge
                        label={status.isShipped ? "発送済み" : "未発送"}
                        tone={status.isShipped ? "neutral" : "warning"}
                      />
                    </div>
                  </div>

                  <div className="mt-5 grid gap-4 text-sm text-gray-600 md:grid-cols-2">
                    <div className="rounded-2xl bg-gray-50 p-4">
                      <p className="font-bold text-gray-900">Aftercare URL</p>
                      <p className="mt-2 break-all">{caseRecord.aftercareUrl}</p>
                    </div>
                    <div className="rounded-2xl bg-gray-50 p-4">
                      <p className="font-bold text-gray-900">アルバム URL</p>
                      <p className="mt-2 break-all">
                        {caseRecord.albumUrl || "未設定"}
                      </p>
                    </div>
                  </div>

                  <div className="mt-5 flex flex-col gap-3 md:flex-row">
                    <Link
                      href={`${AFTERCARE_PREVIEW_BASE_PATH}/${caseRecord.caseId}`}
                      className="flex min-h-12 items-center justify-center rounded-full bg-brand-primary px-5 py-3 text-sm font-bold text-white transition-colors hover:bg-brand-hover"
                    >
                      社内確認ページを開く
                    </Link>
                    <Link
                      href={buildAftercareTokenPath(caseRecord.aftercareToken)}
                      className="flex min-h-12 items-center justify-center rounded-full border border-gray-300 bg-white px-5 py-3 text-sm font-bold text-gray-900 transition-colors hover:bg-gray-50"
                    >
                      お客様向け入口を確認
                    </Link>
                  </div>
                </article>
              );
            })}
          </div>
        </div>
      </section>
    </div>
  );
}
