import { NextResponse } from "next/server";
import { trackAftercareSubmissionEvent } from "@/lib/aftercare/repository";
import type { AftercareEventType } from "@/types/aftercare";

function isEventType(value: unknown): value is AftercareEventType {
  return value === "review_click" || value === "album_click";
}

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as Record<string, unknown>;
    const id = typeof body.id === "string" ? body.id : "";
    const eventType = body.eventType;

    if (!id || !isEventType(eventType)) {
      return NextResponse.json(
        {
          message: "計測リクエストが不正です。",
        },
        { status: 400 }
      );
    }

    await trackAftercareSubmissionEvent(id, eventType);

    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error("Failed to track aftercare event.", error);

    return NextResponse.json(
      {
        message: "計測に失敗しました。",
      },
      { status: 500 }
    );
  }
}
