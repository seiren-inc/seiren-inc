import { mkdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import type { AftercareCasePatch, AftercareCaseRecord } from "@/types/aftercare";

type AftercareCaseStore = {
  listCases: () => Promise<AftercareCaseRecord[]>;
  getCaseByCaseId: (caseId: string) => Promise<AftercareCaseRecord | null>;
  getCaseByToken: (token: string) => Promise<AftercareCaseRecord | null>;
  updateCase: (caseId: string, patch: AftercareCasePatch) => Promise<AftercareCaseRecord | null>;
};

const DATA_DIRECTORY = path.join(process.cwd(), "data", "aftercare");
const CASES_FILE = path.join(DATA_DIRECTORY, "cases.json");

async function ensureCasesFile() {
  await mkdir(DATA_DIRECTORY, { recursive: true });

  try {
    await readFile(CASES_FILE, "utf-8");
  } catch {
    await writeFile(CASES_FILE, "[]\n", "utf-8");
  }
}

async function readCasesJson(): Promise<AftercareCaseRecord[]> {
  await ensureCasesFile();
  const raw = await readFile(CASES_FILE, "utf-8");

  try {
    const parsed = JSON.parse(raw) as AftercareCaseRecord[];
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

function createJsonAftercareCaseStore(): AftercareCaseStore {
  return {
    async listCases() {
      return readCasesJson();
    },
    async getCaseByCaseId(caseId) {
      const cases = await readCasesJson();
      return cases.find((caseRecord) => caseRecord.caseId === caseId) ?? null;
    },
    async getCaseByToken(token) {
      const cases = await readCasesJson();
      return (
        cases.find((caseRecord) => caseRecord.aftercareToken === token) ?? null
      );
    },
    async updateCase(caseId, patch) {
      const cases = await readCasesJson();
      const index = cases.findIndex((caseRecord) => caseRecord.caseId === caseId);

      if (index === -1) {
        return null;
      }

      cases[index] = { ...cases[index], ...patch };
      await writeFile(CASES_FILE, `${JSON.stringify(cases, null, 2)}\n`, "utf-8");

      return cases[index];
    },
  };
}

// JSON 実装を暫定採用。将来は Google Sheets / DB 実装へ差し替え可能。
export const aftercareCaseStore = createJsonAftercareCaseStore();
export type { AftercareCaseStore };
