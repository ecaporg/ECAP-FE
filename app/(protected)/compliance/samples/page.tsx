import { getComplianceTeacherFilter } from "@/lib/compliance";
import { SamplesFilters } from "../components/filters";
import { SamplesSection } from "../components/sections";

export default async function CompliancePage({
  searchParams,
}: {
  searchParams: Promise<{ learning_period_id: string; student_id: string }>;
}) {
  const tenant = await getComplianceTeacherFilter();
  return (
    <>
      <SamplesSection param={await searchParams} tenant={tenant!} />
    </>
  );
}
