import { getComplianceTeacherFilter } from "@/lib/compliance";
import { TeacherFilters } from "@/components/pages/compliance/filters";
import { StudentsSection } from "@/components/pages/compliance/sections";
import { rolePage } from "@/components/layouts/role-page";
import { getDefaultAcademicYearIds } from "@/utils/academic-year";
import { DEFAULT_FILTERS_KEYS } from "@/constants/filter";

export async function CompliancePage({
  searchParams,
}: {
  searchParams: Promise<any>;
}) {
  const tenant = await getComplianceTeacherFilter();
  const academicYearIds = getDefaultAcademicYearIds(
    tenant,
    (await searchParams)[DEFAULT_FILTERS_KEYS.ACADEMIC_YEAR]
  );
  return (
    <>
      <TeacherFilters tenant={tenant} academicYearIds={academicYearIds} />
      <StudentsSection param={await searchParams} tenant={tenant!} />
    </>
  );
}

export default rolePage(CompliancePage, ["TEACHER"]);
