import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import AftercareGuidePaperPreview from "@/components/aftercare/AftercareGuidePaperPreview";
import AftercareStatusBadge from "@/components/aftercare/AftercareStatusBadge";
import { AFTERCARE_PREVIEW_BASE_PATH } from "@/constants/aftercare";
import { requireAftercareAdminAccess } from "@/lib/aftercare/admin-auth";
import { buildAftercareGuideTemplateData } from "@/lib/aftercare/case-template";
import {
  getAftercareCaseByCaseId,
} from "@/lib/aftercare/repository";
import { buildAftercareTokenPath } from "@/lib/aftercare/navigation";

type AftercareCasePreviewPageProps = {
  params: Promise<{
    caseId: string;
  }>;
};

export async function generateMetadata({
  params,
}: AftercareCasePreviewPageProps): Promise<Metadata> {
  const { caseId } = await params;

  return {
    title: `案件プレビュー ${caseId}｜株式会社清蓮`,
    robots: {
      index: false,
      follow: false,
    },
  };
}

export default async function AftercareCasePreviewPage({
  params,
}: AftercareCasePreviewPageProps) {
  await requireAftercareAdminAccess();
  const { caseId } = await params;
  const caseRecord = await getAftercareCaseByCaseId(caseId);

  if (!caseRecord) {
    notFound();
  }

  const templateData = buildAftercareGuideTemplateData(caseRecord);
  const status = templateData.status;

  return (
    <div className="min-h-screen bg-gray-50">
      <section className="container mx-auto px-6 py-12 lg:px-12">
        <div className="mx-auto max-w-6xl space-y-8">
          <div className="flex flex-col gap-4 rounded-[32px] border border-gray-200 bg-white p-8 shadow-sm">
            <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
              <div>
                <p className="text-xs font-bold tracking-[0.16em] text-gray-400">
                  {templateData.caseId}
                </p>
                <h1 className="mt-2 font-serif text-3xl font-bold text-gray-900">
                  {templateData.customerName}
                </h1>
              </div>

              <div className="flex flex-wrap gap-2">
                <AftercareStatusBadge
                  label={status.isConfigured ? "設定済み" : "設定待ち"}
                  tone={status.isConfigured ? "success" : "warning"}
                />
                <AftercareStatusBadge
                  label={status.isVerified ? "確認済み" : "未確認"}
                  tone={status.isVerified ? "success" : "warning"}
                />
                <AftercareStatusBadge
                  label={status.isShipped ? "発送済み" : "未発送"}
                  tone={status.isShipped ? "neutral" : "warning"}
                />
              </div>
            </div>

            <div className="grid gap-4 text-sm text-gray-600 md:grid-cols-2">
              <div className="rounded-2xl bg-gray-50 p-4">
                <p className="font-bold text-gray-900">運用メモ</p>
                <p className="mt-2 leading-7">{templateData.notes || "なし"}</p>
              </div>
              <div className="rounded-2xl bg-gray-50 p-4">
                <p className="font-bold text-gray-900">出荷可否</p>
                <p className="mt-2 leading-7">
                  {status.isReadyForShipment
                    ? "設定済みかつ確認済みのため、発送準備に進めます。"
                    : "未確認案件は発送不可として扱える状態です。"}
                </p>
              </div>
            </div>

            <div className="flex flex-col gap-3 md:flex-row">
              <Link
                href={AFTERCARE_PREVIEW_BASE_PATH}
                className="flex min-h-12 items-center justify-center rounded-full border border-gray-300 bg-white px-5 py-3 text-sm font-bold text-gray-900 transition-colors hover:bg-gray-50"
              >
                一覧へ戻る
              </Link>
              <Link
                href={buildAftercareTokenPath(caseRecord.aftercareToken)}
                
                className="flex min-h-12 items-center justify-center rounded-full bg-brand-primary px-5 py-3 text-sm font-bold text-white transition-colors hover:bg-brand-hover"
              >
                お客様向け入口を開く
              </Link>
            </div>
          </div>

          <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_360px]">
            <AftercareGuidePaperPreview data={templateData} />

            <aside className="space-y-6">
              <section className="rounded-[28px] border border-gray-200 bg-white p-6 shadow-sm">
                <h2 className="text-lg font-bold text-gray-900">設定内容</h2>
                <dl className="mt-4 space-y-4 text-sm text-gray-600">
                  <div>
                    <dt className="font-bold text-gray-900">Aftercare URL</dt>
                    <dd className="mt-1 break-all">{templateData.aftercareUrl}</dd>
                  </div>
                  <div>
                    <dt className="font-bold text-gray-900">Google口コミ URL</dt>
                    <dd className="mt-1 break-all">{templateData.reviewUrl}</dd>
                  </div>
                  <div>
                    <dt className="font-bold text-gray-900">Google口コミ QR</dt>
                    <dd className="mt-2">
                      {templateData.reviewQrImageUrl ? (
                        <Image
                          src={templateData.reviewQrImageUrl}
                          alt="Google口コミQR"
                          width={128}
                          height={128}
                          unoptimized
                          className="h-32 w-32 rounded-2xl border border-gray-200 bg-white object-contain p-2"
                        />
                      ) : (
                        <span className="text-gray-400">未設定</span>
                      )}
                    </dd>
                  </div>
                  <div>
                    <dt className="font-bold text-gray-900">アルバム URL</dt>
                    <dd className="mt-1 break-all">{templateData.albumUrl}</dd>
                  </div>
                  <div>
                    <dt className="font-bold text-gray-900">合い言葉</dt>
                    <dd className="mt-1">{templateData.albumPassword}</dd>
                  </div>
                  <div>
                    <dt className="font-bold text-gray-900">アルバム QR</dt>
                    <dd className="mt-2">
                      {templateData.albumQrImageUrl ? (
                        <Image
                          src={templateData.albumQrImageUrl}
                          alt="アルバムQR"
                          width={128}
                          height={128}
                          unoptimized
                          className="h-32 w-32 rounded-2xl border border-gray-200 bg-white object-contain p-2"
                        />
                      ) : (
                        <span className="text-gray-400">未設定</span>
                      )}
                    </dd>
                  </div>
                  <div>
                    <dt className="font-bold text-gray-900">設定状態</dt>
                    <dd className="mt-1">
                      {status.isConfigured ? "設定済み" : "設定待ち"}
                    </dd>
                  </div>
                  <div>
                    <dt className="font-bold text-gray-900">確認状態</dt>
                    <dd className="mt-1">
                      {status.isVerified ? "確認済み" : "未確認"}
                    </dd>
                  </div>
                  <div>
                    <dt className="font-bold text-gray-900">発送状態</dt>
                    <dd className="mt-1">
                      {status.isShipped ? "発送済み" : "未発送"}
                    </dd>
                  </div>
                  <div>
                    <dt className="font-bold text-gray-900">設定日時</dt>
                    <dd className="mt-1">
                      {templateData.configuredAt || "未設定"}
                    </dd>
                  </div>
                  <div>
                    <dt className="font-bold text-gray-900">確認日時</dt>
                    <dd className="mt-1">
                      {templateData.verifiedAt || "未設定"}
                    </dd>
                  </div>
                  <div>
                    <dt className="font-bold text-gray-900">発送日時</dt>
                    <dd className="mt-1">
                      {templateData.shippedAt || "未発送"}
                    </dd>
                  </div>
                  <div>
                    <dt className="font-bold text-gray-900">設定者</dt>
                    <dd className="mt-1">{templateData.createdBy || "未設定"}</dd>
                  </div>
                  <div>
                    <dt className="font-bold text-gray-900">確認者</dt>
                    <dd className="mt-1">{templateData.verifiedBy || "未設定"}</dd>
                  </div>
                  <div>
                    <dt className="font-bold text-gray-900">PDF URL</dt>
                    <dd className="mt-1 break-all">
                      {templateData.pdfUrl || "未生成"}
                    </dd>
                  </div>
                </dl>
              </section>

              <section className="rounded-[28px] border border-gray-200 bg-white p-6 shadow-sm">
                <h2 className="text-lg font-bold text-gray-900">
                  テンプレート投入データ
                </h2>
                <pre className="mt-4 overflow-x-auto rounded-2xl bg-gray-50 p-4 text-xs leading-6 text-gray-700">
                  {JSON.stringify(templateData, null, 2)}
                </pre>
              </section>
            </aside>
          </div>
        </div>
      </section>
    </div>
  );
}
