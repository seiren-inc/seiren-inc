import { NextResponse } from "next/server";
import { hasAftercareAdminAccess } from "@/lib/aftercare/admin-auth";
import { aftercareCaseStore } from "@/lib/aftercare/case-store";
import type { AftercareCasePatch } from "@/types/aftercare";

type AftercareAdminCaseRouteProps = {
  params: Promise<{
    caseId: string;
  }>;
};

function normalizePatch(body: Record<string, unknown>): AftercareCasePatch {
  const patch: AftercareCasePatch = {};

  if (typeof body.albumUrl === "string") {
    patch.albumUrl = body.albumUrl.trim();
  }

  if (typeof body.albumPassword === "string") {
    patch.albumPassword = body.albumPassword.trim();
  }

  if (typeof body.albumQrImageUrl === "string") {
    patch.albumQrImageUrl = body.albumQrImageUrl.trim();
  }

  if (typeof body.reviewUrl === "string") {
    patch.reviewUrl = body.reviewUrl.trim();
  }

  if (typeof body.reviewQrImageUrl === "string") {
    patch.reviewQrImageUrl = body.reviewQrImageUrl.trim();
  }

  if (typeof body.pdfUrl === "string") {
    patch.pdfUrl = body.pdfUrl.trim();
  }

  if (typeof body.aftercareUrl === "string") {
    patch.aftercareUrl = body.aftercareUrl.trim();
  }

  if (typeof body.isConfigured === "boolean") {
    patch.isConfigured = body.isConfigured;
  }

  if (body.configuredAt === null || typeof body.configuredAt === "string") {
    patch.configuredAt =
      typeof body.configuredAt === "string"
        ? body.configuredAt.trim() || null
        : null;
  }

  return patch;
}

export async function PATCH(
  request: Request,
  { params }: AftercareAdminCaseRouteProps
) {
  const hasAccess = await hasAftercareAdminAccess();

  if (!hasAccess) {
    return NextResponse.json(
      { message: "認証が必要です。" },
      { status: 401 }
    );
  }

  const { caseId } = await params;

  let body: Record<string, unknown>;

  try {
    body = (await request.json()) as Record<string, unknown>;
  } catch {
    return NextResponse.json(
      { message: "リクエストボディが不正です。" },
      { status: 400 }
    );
  }

  const patch = normalizePatch(body);

  if (Object.keys(patch).length === 0) {
    return NextResponse.json(
      { message: "更新可能なフィールドが含まれていません。" },
      { status: 400 }
    );
  }

  const updated = await aftercareCaseStore.updateCase(caseId, patch);

  if (!updated) {
    return NextResponse.json(
      { message: "案件が見つかりません。" },
      { status: 404 }
    );
  }

  return NextResponse.json(updated);
}
