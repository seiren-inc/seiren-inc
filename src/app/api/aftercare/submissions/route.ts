import { NextResponse } from "next/server";
import { AFTERCARE_PAGES } from "@/constants/aftercare";
import { createAftercareSubmission } from "@/lib/aftercare/repository";
import {
  normalizeAftercareSurveyInput,
  validateAftercareSurveyInput,
} from "@/lib/aftercare/validation";

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as Record<string, unknown>;
    const input = normalizeAftercareSurveyInput({
      overallSatisfaction: body.overallSatisfaction as number | null,
      staffSatisfaction: body.staffSatisfaction as number | null,
      comment: typeof body.comment === "string" ? body.comment : "",
      source: typeof body.source === "string" ? body.source : "",
      caseId: null,
      token: typeof body.token === "string" ? body.token : "",
    });

    const errors = validateAftercareSurveyInput(input);

    if (Object.keys(errors).length > 0) {
      return NextResponse.json(
        {
          message: "入力内容をご確認ください。",
          errors,
        },
        { status: 400 }
      );
    }

    const submission = await createAftercareSubmission(input);
    const nextPath =
      submission.overallSatisfaction >= 4
        ? AFTERCARE_PAGES.review.href
        : AFTERCARE_PAGES.album.href;

    return NextResponse.json({
      id: submission.id,
      nextPath,
    });
  } catch (error) {
    console.error("Failed to create aftercare submission.", error);

    return NextResponse.json(
      {
        message:
          "アンケートの送信に失敗しました。時間をおいて再度お試しください。",
      },
      { status: 500 }
    );
  }
}
