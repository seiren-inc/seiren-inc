"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { AFTERCARE_COMMENT_MAX_LENGTH } from "@/constants/aftercare";
import { submitAftercareSurvey } from "@/lib/aftercare/analytics";
import {
  normalizeAftercareSurveyInput,
  validateAftercareSurveyInput,
} from "@/lib/aftercare/validation";
import type {
  AftercareSurveyInput,
  AftercareValidationErrors,
  SatisfactionScore,
} from "@/types/aftercare";

type SurveyFormProps = {
  source: string;
  caseId?: string | null;
  token?: string | null;
};

const SCORES: SatisfactionScore[] = [1, 2, 3, 4, 5];

export default function SurveyForm({
  source,
  caseId = null,
  token = null,
}: SurveyFormProps) {
  const router = useRouter();
  const [form, setForm] = useState<AftercareSurveyInput>({
    overallSatisfaction: null,
    staffSatisfaction: null,
    comment: "",
    source,
    caseId,
    token,
  });
  const [errors, setErrors] = useState<AftercareValidationErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState("");

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSubmitError("");

    const normalized = normalizeAftercareSurveyInput(form);
    const nextErrors = validateAftercareSurveyInput(normalized);

    if (Object.keys(nextErrors).length > 0) {
      setErrors(nextErrors);
      return;
    }

    setIsSubmitting(true);

    try {
      const result = await submitAftercareSurvey(normalized);
      router.push(result.nextPath);
    } catch (error) {
      setSubmitError(
        error instanceof Error ? error.message : "送信に失敗しました。"
      );
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <fieldset>
        <legend>総合満足度</legend>
        {SCORES.map((score) => (
          <label key={`overall-${score}`}>
            <input
              type="radio"
              name="overallSatisfaction"
              value={score}
              checked={form.overallSatisfaction === score}
              onChange={() => {
                setForm((current) => ({
                  ...current,
                  overallSatisfaction: score,
                }));
                setErrors((current) => ({ ...current, overallSatisfaction: undefined }));
              }}
            />
            {score}
          </label>
        ))}
        {errors.overallSatisfaction ? <p>{errors.overallSatisfaction}</p> : null}
      </fieldset>

      <fieldset>
        <legend>スタッフ対応</legend>
        {SCORES.map((score) => (
          <label key={`staff-${score}`}>
            <input
              type="radio"
              name="staffSatisfaction"
              value={score}
              checked={form.staffSatisfaction === score}
              onChange={() => {
                setForm((current) => ({
                  ...current,
                  staffSatisfaction: score,
                }));
                setErrors((current) => ({ ...current, staffSatisfaction: undefined }));
              }}
            />
            {score}
          </label>
        ))}
        {errors.staffSatisfaction ? <p>{errors.staffSatisfaction}</p> : null}
      </fieldset>

      <label htmlFor="comment">コメント（任意）</label>
      <textarea
        id="comment"
        name="comment"
        maxLength={AFTERCARE_COMMENT_MAX_LENGTH}
        value={form.comment}
        onChange={(event) => {
          setForm((current) => ({ ...current, comment: event.target.value }));
          setErrors((current) => ({ ...current, comment: undefined }));
        }}
      />
      {errors.comment ? <p>{errors.comment}</p> : null}

      {submitError ? <p role="alert">{submitError}</p> : null}

      <button type="submit" disabled={isSubmitting}>
        {isSubmitting ? "送信中…" : "回答を送信する"}
      </button>
    </form>
  );
}
