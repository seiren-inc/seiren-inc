import {
  AFTERCARE_COMMENT_MAX_LENGTH,
  AFTERCARE_DEFAULT_SOURCE,
} from "@/constants/aftercare";
import type {
  AftercareSurveyInput,
  AftercareValidationErrors,
  SatisfactionScore,
} from "@/types/aftercare";

function isSatisfactionScore(value: unknown): value is SatisfactionScore {
  return (
    typeof value === "number" &&
    Number.isInteger(value) &&
    value >= 1 &&
    value <= 5
  );
}

export function normalizeAftercareSurveyInput(input: {
  overallSatisfaction?: unknown;
  staffSatisfaction?: unknown;
  comment?: unknown;
  source?: unknown;
  caseId?: unknown;
  token?: unknown;
}): AftercareSurveyInput {
  const comment =
    typeof input.comment === "string" ? input.comment.trim() : "";
  const source =
    typeof input.source === "string" && input.source.trim().length > 0
      ? input.source.trim()
      : AFTERCARE_DEFAULT_SOURCE;

  return {
    overallSatisfaction: isSatisfactionScore(input.overallSatisfaction)
      ? input.overallSatisfaction
      : null,
    staffSatisfaction: isSatisfactionScore(input.staffSatisfaction)
      ? input.staffSatisfaction
      : null,
    comment: comment.slice(0, AFTERCARE_COMMENT_MAX_LENGTH),
    source,
    caseId:
      typeof input.caseId === "string" && input.caseId.trim().length > 0
        ? input.caseId.trim()
        : null,
    token:
      typeof input.token === "string" && input.token.trim().length > 0
        ? input.token.trim()
        : null,
  };
}

export function validateAftercareSurveyInput(
  input: AftercareSurveyInput
): AftercareValidationErrors {
  const errors: AftercareValidationErrors = {};

  if (!isSatisfactionScore(input.overallSatisfaction)) {
    errors.overallSatisfaction = "総合満足度を選択してください。";
  }

  if (!isSatisfactionScore(input.staffSatisfaction)) {
    errors.staffSatisfaction = "スタッフ対応の満足度を選択してください。";
  }

  if (input.comment.length > AFTERCARE_COMMENT_MAX_LENGTH) {
    errors.comment = `コメントは${AFTERCARE_COMMENT_MAX_LENGTH}文字以内で入力してください。`;
  }

  if (!input.source.trim()) {
    errors.source = "流入元情報が不正です。";
  }

  return errors;
}
