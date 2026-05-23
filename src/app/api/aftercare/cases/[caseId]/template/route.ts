import { NextResponse } from "next/server";
import { hasAftercareAdminAccess } from "@/lib/aftercare/admin-auth";
import { buildAftercareGuideTemplateData } from "@/lib/aftercare/case-template";
import { getAftercareCaseByCaseId } from "@/lib/aftercare/repository";

type AftercareTemplateRouteProps = {
  params: Promise<{
    caseId: string;
  }>;
};

export async function GET(
  _request: Request,
  { params }: AftercareTemplateRouteProps
) {
  const hasAccess = await hasAftercareAdminAccess();

  if (!hasAccess) {
    return NextResponse.json(
      { message: "認証が必要です。" },
      { status: 401 }
    );
  }

  const { caseId } = await params;
  const caseRecord = await getAftercareCaseByCaseId(caseId);

  if (!caseRecord) {
    return NextResponse.json(
      {
        message: "案件が見つかりません。",
      },
      { status: 404 }
    );
  }

  return NextResponse.json(buildAftercareGuideTemplateData(caseRecord));
}
