import {
  AFTERCARE_CONTACT,
  AFTERCARE_DEFAULT_LINKS,
} from "@/constants/aftercare";
import {
  getAftercareCaseStatus,
  resolveAftercareCase,
} from "@/lib/aftercare/repository";
import type {
  AftercareCaseRecord,
  AftercareGuideTemplateData,
} from "@/types/aftercare";

function formatServiceDate(serviceDate: string) {
  const date = new Date(serviceDate);

  if (Number.isNaN(date.getTime())) {
    return serviceDate;
  }

  return new Intl.DateTimeFormat("ja-JP", {
    year: "numeric",
    month: "long",
    day: "numeric",
  }).format(date);
}

export function buildAftercareGuideTemplateData(
  caseRecord: AftercareCaseRecord
): AftercareGuideTemplateData {
  return {
    caseId: caseRecord.caseId,
    customerName: caseRecord.customerName,
    serviceDate: caseRecord.serviceDate,
    serviceDateLabel: formatServiceDate(caseRecord.serviceDate),
    albumTitle: caseRecord.albumTitle,
    albumUrl: caseRecord.albumUrl || AFTERCARE_DEFAULT_LINKS.albumUrl,
    albumPassword:
      caseRecord.albumPassword || AFTERCARE_DEFAULT_LINKS.albumPassword,
    albumQrImageUrl:
      caseRecord.albumQrImageUrl || AFTERCARE_DEFAULT_LINKS.albumQrImageUrl,
    reviewUrl: caseRecord.reviewUrl || AFTERCARE_DEFAULT_LINKS.reviewUrl,
    reviewQrImageUrl:
      caseRecord.reviewQrImageUrl || AFTERCARE_DEFAULT_LINKS.reviewQrImageUrl,
    aftercareToken: caseRecord.aftercareToken,
    aftercareUrl: caseRecord.aftercareUrl,
    pdfUrl: caseRecord.pdfUrl,
    createdBy: caseRecord.createdBy,
    configuredAt: caseRecord.configuredAt,
    verifiedBy: caseRecord.verifiedBy,
    verifiedAt: caseRecord.verifiedAt,
    shippedAt: caseRecord.shippedAt,
    notes: caseRecord.notes,
    status: getAftercareCaseStatus(caseRecord),
    reviewSection: {
      title: "Google口コミのご案内",
      description:
        "口コミ投稿は任意です。投稿いただかなくても、アルバムはそのままご覧いただけます。",
      url: caseRecord.reviewUrl || AFTERCARE_DEFAULT_LINKS.reviewUrl,
      qrImageUrl:
        caseRecord.reviewQrImageUrl || AFTERCARE_DEFAULT_LINKS.reviewQrImageUrl,
    },
    albumSection: {
      title: caseRecord.albumTitle,
      description:
        "オンラインアルバムにアクセスし、合い言葉を入力してご覧ください。",
      url: caseRecord.albumUrl || AFTERCARE_DEFAULT_LINKS.albumUrl,
      password:
        caseRecord.albumPassword || AFTERCARE_DEFAULT_LINKS.albumPassword,
      qrImageUrl:
        caseRecord.albumQrImageUrl || AFTERCARE_DEFAULT_LINKS.albumQrImageUrl,
    },
  };
}

export async function getAftercareTemplateDataByToken(token: string) {
  const resolved = await resolveAftercareCase({ token });

  if (!resolved.caseRecord) {
    return null;
  }

  return buildAftercareGuideTemplateData(resolved.caseRecord);
}

export const AFTERCARE_TEMPLATE_CONTACT = AFTERCARE_CONTACT;
