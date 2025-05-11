import { getComplianceTeacherFilter } from "@/lib/api/compliance";
import { TeacherFilters } from "@/components/pages/compliance/filters";
import { StudentsSection } from "@/components/pages/compliance/sections";
import { rolePage } from "@/components/layouts/role-page";
import { getDefaultAcademicYearIds } from "@/utils/academic-year";
import {
  DEFAULT_FILTERS_KEYS,
  SPECIFIC_PAGE_FILTER_KEYS,
} from "@/constants/filter";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Compliance",
};

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
  const tracksIds = (await searchParams)[
    SPECIFIC_PAGE_FILTER_KEYS.COMPLIANCE.TRACK_ID
  ]?.split(",");

  return (
    <>
      <TeacherFilters
        tenant={tenant}
        academicYearIds={academicYearIds}
        tracksIds={tracksIds}
      />
      <StudentsSection param={await searchParams} tenant={tenant!} />
    </>
  );
}

export default rolePage(CompliancePage, ["TEACHER"]);
