"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import AftercareRatingField from "@/components/aftercare/AftercareRatingField";
import {
  AFTERCARE_COMMENT_MAX_LENGTH,
  AFTERCARE_TEXT,
} from "@/constants/aftercare";
import { submitAftercareSurvey } from "@/lib/aftercare/analytics";
import { buildAftercareHref } from "@/lib/aftercare/navigation";
import {
  normalizeAftercareSurveyInput,
  validateAftercareSurveyInput,
} from "@/lib/aftercare/validation";
import type {
  AftercareSurveyInput,
  AftercareValidationErrors,
  SatisfactionScore,
} from "@/types/aftercare";

type AftercareSurveyFormProps = {
  source: string;
  caseId?: string | null;
  token?: string | null;
};

export default function AftercareSurveyForm({
  source,
  caseId = null,
  token = null,
}: AftercareSurveyFormProps) {
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

  function updateRating(
    key: "overallSatisfaction" | "staffSatisfaction",
    value: SatisfactionScore
  ) {
    setForm((current) => ({
      ...current,
      [key]: value,
    }));

    setErrors((current) => ({
      ...current,
      [key]: undefined,
    }));
  }

  function updateComment(value: string) {
    setForm((current) => ({
      ...current,
      comment: value,
    }));

    if (errors.comment) {
      setErrors((current) => ({
        ...current,
        comment: undefined,
      }));
    }
  }

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
      router.push(
        buildAftercareHref(result.nextPath, {
          id: result.id,
          source: normalized.source,
          token: normalized.token,
        })
      );
    } catch (error) {
      setSubmitError(
        error instanceof Error
          ? error.message
          : AFTERCARE_TEXT.surveySubmitError
      );
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <div className="rounded-2xl border border-brand-secondary/80 bg-white/70 p-5 text-sm leading-[2] text-neutral-muted">
        {AFTERCARE_TEXT.surveyDescription}
      </div>

      {/* Q1: 散骨全体の満足度 */}
      <AftercareRatingField
        id="overallSatisfaction"
        label="散骨全体のご満足度"
        hint="散骨サービス全体の印象をお聞かせください。"
        value={form.overallSatisfaction}
        onChange={(value) => updateRating("overallSatisfaction", value)}
        error={errors.overallSatisfaction}
      />

      {/* Q2: スタッフ対応の満足度 */}
      <AftercareRatingField
        id="staffSatisfaction"
        label="スタッフ対応のご満足度"
        hint="ご案内や当日の対応についてお聞かせください。"
        value={form.staffSatisfaction}
        onChange={(value) => updateRating("staffSatisfaction", value)}
        error={errors.staffSatisfaction}
      />

      {/* Q3: 自由記述 */}
      <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
        <div className="flex items-baseline gap-2 mb-1">
          <label
            htmlFor="comment"
            className="text-base font-semibold text-neutral-text"
          >
            {AFTERCARE_TEXT.surveyCommentLabel}
          </label>
          <span className="text-xs text-neutral-muted">（任意）</span>
        </div>
        <p className="text-sm text-neutral-muted mb-4">
          未入力でも送信できます。
        </p>
        <textarea
          id="comment"
          name="comment"
          value={form.comment}
          onChange={(event) => updateComment(event.target.value)}
          maxLength={AFTERCARE_COMMENT_MAX_LENGTH}
          rows={4}
          className="
            w-full bg-neutral-surface border border-gray-200 rounded-xl
            text-base p-4 text-neutral-text placeholder:text-gray-400
            focus:border-brand-primary focus:ring-2 focus:ring-brand-primary/20
            transition-all duration-200 resize-none outline-none
          "
          placeholder={AFTERCARE_TEXT.surveyCommentPlaceholder}
        />
        <div className="flex items-center justify-between gap-4 mt-2 text-xs text-neutral-muted">
          <span>任意回答です</span>
          <span>
            {form.comment.length}/{AFTERCARE_COMMENT_MAX_LENGTH}
          </span>
        </div>
        {errors.comment ? (
          <p className="mt-2 text-sm font-medium text-red-600" role="alert">
            {errors.comment}
          </p>
        ) : null}
      </div>

      {/* エラーメッセージ */}
      {submitError ? (
        <div
          className="rounded-2xl border border-red-200 bg-red-50 px-5 py-4 text-sm text-red-700"
          role="alert"
        >
          {submitError}
        </div>
      ) : null}

      {/* 送信ボタン */}
      <button
        type="submit"
        disabled={isSubmitting}
        className={`
          w-full py-5 font-bold text-base rounded-xl tracking-[0.1em]
          transition-all duration-300 active:scale-[0.98] text-center
          ${isSubmitting
            ? "bg-gray-200 text-gray-400 cursor-not-allowed"
            : "bg-brand-primary text-white hover:bg-brand-hover shadow-lg shadow-brand-primary/15"
          }
        `}
        >
          {isSubmitting ? (
            <span className="flex items-center justify-center gap-2">
            <svg className="w-5 h-5 animate-spin" viewBox="0 0 24 24" fill="none">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
            </svg>
            {AFTERCARE_TEXT.surveySubmitting}
          </span>
        ) : (
          AFTERCARE_TEXT.surveySubmit
        )}
      </button>
    </form>
  );
}
