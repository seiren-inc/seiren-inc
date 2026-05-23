"use client";

import type {
  AftercareEventPayload,
  AftercareSubmissionResponse,
  AftercareSurveyInput,
} from "@/types/aftercare";

export async function submitAftercareSurvey(
  payload: AftercareSurveyInput
): Promise<AftercareSubmissionResponse> {
  const response = await fetch("/api/aftercare/submissions", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  });

  const data = (await response.json()) as
    | AftercareSubmissionResponse
    | { message?: string };

  if (!response.ok) {
    const message =
      "message" in data ? data.message : "アンケート送信に失敗しました。";
    throw new Error(message ?? "アンケート送信に失敗しました。");
  }

  return data as AftercareSubmissionResponse;
}

export async function trackAftercareEvent(payload: AftercareEventPayload) {
  if (!payload.id) {
    return;
  }

  try {
    await fetch("/api/aftercare/events", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
      keepalive: true,
    });
  } catch {
    // MVPでは計測失敗で画面遷移を止めない
  }
}
