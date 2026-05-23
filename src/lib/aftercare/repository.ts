import { mkdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import crypto from "node:crypto";
import { aftercareCaseStore } from "@/lib/aftercare/case-store";
import type {
  AftercareCaseRecord,
  AftercareCaseStatus,
  AftercareEventType,
  AftercareResolvedCase,
  AftercareSubmission,
  AftercareSurveyInput,
} from "@/types/aftercare";

const DATA_DIRECTORY = path.join(process.cwd(), "data", "aftercare");
const SUBMISSIONS_FILE = path.join(DATA_DIRECTORY, "submissions.json");

async function ensureStorageFile(filePath: string, defaultValue: string) {
  await mkdir(DATA_DIRECTORY, { recursive: true });

  try {
    await readFile(filePath, "utf-8");
  } catch {
    await writeFile(filePath, defaultValue, "utf-8");
  }
}

async function readJsonFile<T>(filePath: string, defaultValue: T): Promise<T> {
  await ensureStorageFile(
    filePath,
    `${JSON.stringify(defaultValue, null, 2)}\n`
  );

  const raw = await readFile(filePath, "utf-8");

  try {
    return JSON.parse(raw) as T;
  } catch {
    return defaultValue;
  }
}

async function writeJsonFile<T>(filePath: string, value: T) {
  await ensureStorageFile(
    filePath,
    `${JSON.stringify(value, null, 2)}\n`
  );
  await writeFile(filePath, `${JSON.stringify(value, null, 2)}\n`, "utf-8");
}

async function readSubmissions(): Promise<AftercareSubmission[]> {
  const parsed = await readJsonFile<AftercareSubmission[]>(SUBMISSIONS_FILE, []);
  return Array.isArray(parsed) ? parsed : [];
}

async function writeSubmissions(submissions: AftercareSubmission[]) {
  await writeJsonFile(SUBMISSIONS_FILE, submissions);
}

export async function listAftercareCases(): Promise<AftercareCaseRecord[]> {
  return aftercareCaseStore.listCases();
}

export async function getAftercareCaseByCaseId(caseId: string) {
  return aftercareCaseStore.getCaseByCaseId(caseId);
}

export async function getAftercareCaseByToken(token: string) {
  return aftercareCaseStore.getCaseByToken(token);
}

export async function resolveAftercareCase(options: {
  token?: string | null;
  caseId?: string | null;
}): Promise<AftercareResolvedCase> {
  if (options.caseId) {
    return {
      caseRecord: await getAftercareCaseByCaseId(options.caseId),
      token: options.token ?? null,
    };
  }

  if (options.token) {
    return {
      caseRecord: await getAftercareCaseByToken(options.token),
      token: options.token,
    };
  }

  return {
    caseRecord: null,
    token: null,
  };
}

export function getAftercareCaseStatus(
  caseRecord: AftercareCaseRecord
): AftercareCaseStatus {
  return {
    isConfigured: caseRecord.isConfigured,
    isVerified: caseRecord.isVerified,
    isShipped: caseRecord.isShipped,
    isReadyForShipment: caseRecord.isConfigured && caseRecord.isVerified,
  };
}

export async function createAftercareSubmission(
  input: AftercareSurveyInput
): Promise<AftercareSubmission> {
  const submissions = await readSubmissions();

  if (input.overallSatisfaction === null || input.staffSatisfaction === null) {
    throw new Error("Invalid survey payload.");
  }

  const resolvedCase = await resolveAftercareCase({
    token: input.token ?? null,
    caseId: input.caseId ?? null,
  });

  const submission: AftercareSubmission = {
    id: crypto.randomUUID(),
    createdAt: new Date().toISOString(),
    overallSatisfaction: input.overallSatisfaction,
    staffSatisfaction: input.staffSatisfaction,
    comment: input.comment,
    reviewClick: false,
    albumClick: false,
    source: input.source,
    caseId: resolvedCase.caseRecord?.caseId,
    aftercareToken: resolvedCase.caseRecord?.aftercareToken ?? input.token ?? undefined,
  };

  submissions.push(submission);
  await writeSubmissions(submissions);

  return submission;
}

export async function trackAftercareSubmissionEvent(
  id: string,
  eventType: AftercareEventType
): Promise<AftercareSubmission | null> {
  const submissions = await readSubmissions();
  const index = submissions.findIndex((submission) => submission.id === id);

  if (index === -1) {
    return null;
  }

  const current = submissions[index];
  const next: AftercareSubmission = {
    ...current,
    reviewClick:
      eventType === "review_click" ? true : current.reviewClick,
    albumClick:
      eventType === "album_click" ? true : current.albumClick,
  };

  submissions[index] = next;
  await writeSubmissions(submissions);

  return next;
}
