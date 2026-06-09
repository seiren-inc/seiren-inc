import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { AFTERCARE_PREVIEW_BASE_PATH } from "@/constants/aftercare";
import { requireAftercareAdminAccess } from "@/lib/aftercare/admin-auth";
import { buildAftercareGuideTemplateData } from "@/lib/aftercare/case-template";
import { getAftercareCaseByCaseId } from "@/lib/aftercare/repository";
import { buildAftercareTokenPath } from "@/lib/aftercare/navigation";

type AftercareCasePreviewPageProps = {
  params: Promise<{ caseId: string }>;
};

export async function generateMetadata({
  params,
}: AftercareCasePreviewPageProps): Promise<Metadata> {
  const { caseId } = await params;

  return {
    title: `案件プレビュー ${caseId}`,
    robots: { index: false, follow: false },
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
    <main id="main-content">
      <h1>{templateData.customerName}</h1>
      <p>案件ID: {templateData.caseId}</p>
      <p>
        状態: {status.isConfigured ? "設定済み" : "設定待ち"} /{" "}
        {status.isVerified ? "確認済み" : "未確認"} /{" "}
        {status.isShipped ? "発送済み" : "未発送"}
      </p>

      <dl>
        <dt>Aftercare URL</dt>
        <dd>{templateData.aftercareUrl}</dd>
        <dt>Google口コミ URL</dt>
        <dd>{templateData.reviewUrl || "未設定"}</dd>
        <dt>アルバム URL</dt>
        <dd>{templateData.albumUrl || "未設定"}</dd>
        <dt>合い言葉</dt>
        <dd>{templateData.albumPassword || "未設定"}</dd>
        <dt>運用メモ</dt>
        <dd>{templateData.notes || "なし"}</dd>
      </dl>

      {templateData.reviewQrImageUrl ? (
        <figure>
          <Image
            src={templateData.reviewQrImageUrl}
            alt="Google口コミQR"
            width={128}
            height={128}
            unoptimized
          />
        </figure>
      ) : null}

      {templateData.albumQrImageUrl ? (
        <figure>
          <Image
            src={templateData.albumQrImageUrl}
            alt="アルバムQR"
            width={128}
            height={128}
            unoptimized
          />
        </figure>
      ) : null}

      <p>
        <Link href={AFTERCARE_PREVIEW_BASE_PATH}>一覧へ戻る</Link>
        {" · "}
        <Link href={buildAftercareTokenPath(caseRecord.aftercareToken)}>
          お客様向け入口
        </Link>
      </p>

      <pre>{JSON.stringify(templateData, null, 2)}</pre>
    </main>
  );
}
