import { getComplianceAdminFilter } from "@/lib/compliance";
import { DirectorFilters } from "@/components/pages/compliance/filters";
import {
  type TeachersSectionProps,
  TeacherSection,
} from "@/components/pages/compliance/sections";
import { DEFAULT_FILTERS_KEYS } from "@/constants/filter";
import { getDefaultAcademicYearIds } from "@/utils/academic-year";

export default async function CompliancePage({
  searchParams,
}: {
  searchParams: Promise<TeachersSectionProps["param"]>;
}) {
  const tenant = await getComplianceAdminFilter();
  const academicYearIds = getDefaultAcademicYearIds(
    tenant,
    (await searchParams)[DEFAULT_FILTERS_KEYS.ACADEMIC_YEAR]
  );
  return (
    <>
      <DirectorFilters tenant={tenant} academicYearIds={academicYearIds} />
      <TeacherSection
        param={await searchParams}
        tenant={tenant!}
        academicYearIds={academicYearIds}
      />
    </>
  );
}
