import type { Metadata } from "next";
import AftercarePageShell from "@/components/aftercare/AftercarePageShell";
import AftercareSurveyForm from "@/components/aftercare/AftercareSurveyForm";
import {
  AFTERCARE_DEFAULT_SOURCE,
  AFTERCARE_TEXT,
} from "@/constants/aftercare";
import { getAftercarePageMeta } from "@/lib/aftercare/getAftercarePageMeta";

export const metadata: Metadata = getAftercarePageMeta("survey");

type AftercareSurveyPageProps = {
  searchParams?: Promise<{
    source?: string;
    token?: string;
  }>;
};

export default async function AftercareSurveyPage({
  searchParams,
}: AftercareSurveyPageProps) {
  const params = searchParams ? await searchParams : undefined;
  const source = params?.source?.trim() || AFTERCARE_DEFAULT_SOURCE;
  const token = params?.token?.trim() || null;

  return (
    <AftercarePageShell
      pageKey="survey"
      lead={AFTERCARE_TEXT.surveyLead}
    >
      <AftercareSurveyForm source={source} token={token} />
    </AftercarePageShell>
  );
}
