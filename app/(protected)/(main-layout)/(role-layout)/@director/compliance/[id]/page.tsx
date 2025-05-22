import { getComplianceAdminFilter } from '@/lib/api/compliance';

import { rolePage } from '@/components/layouts/role-page';
import { BackToTeacherTable } from '@/components/pages/compliance/back-to';
import { AdminTeacherFilters } from '@/components/pages/compliance/filters';
import type { TeachersSectionProps } from '@/components/pages/compliance/sections/teachers-section';
import { ComplianceTabs } from '@/components/pages/compliance/tabs';
import { DEFAULT_FILTERS_KEYS } from '@/constants/filter';
import { getTeacher } from '@/lib/api/teacher';
import { getDefaultAcademicYearIds } from '@/utils/academic-year';
import { redirect } from 'next/navigation';

async function addSearchParamsTeacherId({
  params,
  searchParams,
}: {
  params: Promise<{ id: string }>;
  searchParams: Promise<any>;
}) {
  const awaitParams = await params;
  const awaitSearchParams = await searchParams;

  if (!awaitSearchParams[DEFAULT_FILTERS_KEYS.TEACHER_ID]) {
    console.log('Adding teacher_id to URL');
    const newSearchParams = new URLSearchParams(awaitSearchParams as any);

    newSearchParams.set(DEFAULT_FILTERS_KEYS.TEACHER_ID, awaitParams.id);
    redirect(`/compliance/${awaitParams.id}?${newSearchParams.toString()}`);
  }
}

export async function CompliancePageTeacher({
  searchParams,
  params,
}: {
  searchParams: Promise<TeachersSectionProps['param']>;
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
    <>
      <BackToTeacherTable teacher={await getTeacher((await params).id)} />
      <AdminTeacherFilters tenant={tenant} academicYearIds={academicYearIds} />
      <ComplianceTabs />
    </>
  );
}

export default rolePage(CompliancePageTeacher, ['DIRECTOR']);
