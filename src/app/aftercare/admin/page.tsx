import type { Metadata } from "next";
import Link from "next/link";
import { AFTERCARE_PREVIEW_BASE_PATH, AFTERCARE_TEXT } from "@/constants/aftercare";
import { buildAftercareGuideTemplateData } from "@/lib/aftercare/case-template";
import {
  getAftercareCaseStatus,
  listAftercareCases,
} from "@/lib/aftercare/repository";
import { requireAftercareAdminAccess } from "@/lib/aftercare/admin-auth";
import { buildAftercareTokenPath } from "@/lib/aftercare/navigation";

export const metadata: Metadata = {
  title: "案件プレビュー一覧",
  description: "aftercare 案件の設定状況を確認する社内向けページです。",
  robots: { index: false, follow: false },
};

export default async function AftercareAdminPage() {
  await requireAftercareAdminAccess();
  const cases = await listAftercareCases();

  return (
    <main id="main-content">
      <h1>案件別プレビュー一覧</h1>
      <p>{AFTERCARE_TEXT.previewDescription}</p>

      <ul>
        {cases.map((caseRecord) => {
          const status = getAftercareCaseStatus(caseRecord);
          const templateData = buildAftercareGuideTemplateData(caseRecord);

          return (
            <li key={caseRecord.caseId}>
              <h2>{caseRecord.customerName}</h2>
              <p>案件ID: {caseRecord.caseId}</p>
              <p>散骨日: {templateData.serviceDateLabel}</p>
              <p>
                状態: {status.isConfigured ? "設定済み" : "設定待ち"} /{" "}
                {status.isVerified ? "確認済み" : "未確認"} /{" "}
                {status.isShipped ? "発送済み" : "未発送"}
              </p>
              <p>
                <Link href={`${AFTERCARE_PREVIEW_BASE_PATH}/${caseRecord.caseId}`}>
                  社内確認ページ
                </Link>
                {" · "}
                <Link href={buildAftercareTokenPath(caseRecord.aftercareToken)}>
                  お客様向け入口
                </Link>
              </p>
            </li>
          );
        })}
      </ul>
    </main>
  );
}
