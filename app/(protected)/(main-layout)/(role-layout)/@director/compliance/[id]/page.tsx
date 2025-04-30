import { getComplianceAdminFilter } from "@/lib/compliance";

import { DEFAULT_FILTERS_KEYS } from "@/constants/filter";
import { getDefaultAcademicYearIds } from "@/utils/academic-year";
import { TeacherSection } from "@/components/pages/compliance/sections";
import { DirectorTeacherFilters } from "@/components/pages/compliance/filters";
import type { TeachersSectionProps } from "@/components/pages/compliance/sections/teachers-section";
import { rolePage } from "@/components/layouts/role-page";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { redirect } from "next/navigation";
import { Metadata } from "next";
import { routes } from "@/constants/routes";
import { Tabs, TabsTrigger, TabsList } from "@/components/ui/tabs";
import { ComplianceTabs } from "@/components/pages/compliance/tabs";
import { BackToTeacherTable } from "@/components/pages/compliance/back-to";

async function addSearchParamsTeacherId({
  params,
  searchParams,
}: {
  params: Promise<{ id: string }>;
  searchParams: Promise<any>;
}): Promise<Metadata> {
  const awaitParams = await params;
  const awaitSearchParams = await searchParams;

  if (!awaitSearchParams[DEFAULT_FILTERS_KEYS.TEACHER_ID]) {
    console.log("Adding teacher_id to URL");
    const newSearchParams = new URLSearchParams(awaitSearchParams as any);

    newSearchParams.set(DEFAULT_FILTERS_KEYS.TEACHER_ID, awaitParams.id);
    redirect(`/compliance/${awaitParams.id}?${newSearchParams.toString()}`);
  }

  return {};
}

async function CompliancePage({
  searchParams,
  params,
}: {
  searchParams: Promise<TeachersSectionProps["param"]>;
  params: Promise<{ id: string }>;
}) {
  await addSearchParamsTeacherId({ params, searchParams });

  const tenant = await getComplianceAdminFilter();
  const academicYearIds = getDefaultAcademicYearIds(
    tenant,
    (await searchParams)[DEFAULT_FILTERS_KEYS.ACADEMIC_YEAR]
  );

  console.log(academicYearIds);

  return (
    <div>
      <BackToTeacherTable teacher={{ user: {} } as any} />
      <DirectorTeacherFilters
        tenant={tenant}
        academicYearIds={academicYearIds}
      />
      <ComplianceTabs />
    </div>
  );
}

export default rolePage(CompliancePage, ["DIRECTOR"]);
