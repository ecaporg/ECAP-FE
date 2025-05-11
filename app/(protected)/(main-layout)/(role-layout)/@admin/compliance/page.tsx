import { getComplianceAdminFilter } from "@/lib/api/compliance";

import {
  DEFAULT_FILTERS_KEYS,
  SPECIFIC_PAGE_FILTER_KEYS,
} from "@/constants/filter";
import { getDefaultAcademicYearIds } from "@/utils/academic-year";
import { TeacherSection } from "@/components/pages/compliance/sections";
import { AdminFilters } from "@/components/pages/compliance/filters";
import type { TeachersSectionProps } from "@/components/pages/compliance/sections/teachers-section";
import { rolePage } from "@/components/layouts/role-page";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Compliance",
};

export async function CompliancePage({
  searchParams,
}: {
  searchParams: Promise<TeachersSectionProps["param"]>;
}) {
  const tenant = await getComplianceAdminFilter();
  const academicYearIds = getDefaultAcademicYearIds(
    tenant,
    (await searchParams)[DEFAULT_FILTERS_KEYS.ACADEMIC_YEAR]
  );
  const tracksIds = ((await searchParams) as any)[
    SPECIFIC_PAGE_FILTER_KEYS.COMPLIANCE.TRACK_ID
  ]?.split(",");

  return (
    <>
      <AdminFilters
        tenant={tenant}
        academicYearIds={academicYearIds}
        tracksIds={tracksIds}
      />
      <TeacherSection
        param={await searchParams}
        tenant={tenant!}
        academicYearIds={academicYearIds}
      />
    </>
  );
}

export default rolePage(CompliancePage, ["ADMIN", "SUPER_ADMIN"]);
