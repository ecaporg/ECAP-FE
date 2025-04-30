import { rolePage } from "@/components/layouts/role-page";
import { SamplesSection } from "@/components/pages/compliance/sections";
import { getComplianceTeacherFilter } from "@/lib/compliance";
import type { SamplesSectionProps } from "@/components/pages/compliance/sections/samples-section";
export async function ComplianceSamplesPage({
  searchParams,
}: {
  searchParams: Promise<SamplesSectionProps["param"]>;
}) {
  const tenant = await getComplianceTeacherFilter();

  return (
    <>
      <SamplesSection param={await searchParams} tenant={tenant!} />
    </>
  );
}

export default rolePage(ComplianceSamplesPage, ["TEACHER"]);
