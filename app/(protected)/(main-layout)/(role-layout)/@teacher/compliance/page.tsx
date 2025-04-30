import { getComplianceTeacherFilter } from "@/lib/compliance";
import { TeacherFilters } from "@/components/pages/compliance/filters";
import { StudentsSection } from "@/components/pages/compliance/sections";
import { SectionWithTableProps } from "@/components/pages/compliance/sections/students-section";
import { rolePage } from "@/components/layouts/role-page";

async function CompliancePage({
  searchParams,
}: {
  searchParams: Promise<SectionWithTableProps["param"]>;
}) {
  const tenant = await getComplianceTeacherFilter();
  return (
    <>
      <TeacherFilters tenant={tenant} />
      <StudentsSection param={await searchParams} tenant={tenant!} />
    </>
  );
}

export default rolePage(CompliancePage, ["TEACHER"]);
