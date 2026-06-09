import type { Metadata } from "next";
import { AFTERCARE_DEFAULT_SOURCE, AFTERCARE_TEXT } from "@/constants/aftercare";
import { getAftercarePageMeta } from "@/lib/aftercare/getAftercarePageMeta";
import SurveyForm from "./survey-form";

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
    <main id="main-content">
      <h1>アンケート</h1>
      <p>{AFTERCARE_TEXT.surveyLead}</p>
      <SurveyForm source={source} token={token} />
    </main>
  );
}
