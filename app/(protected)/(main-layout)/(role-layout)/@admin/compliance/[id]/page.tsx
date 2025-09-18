import { getComplianceAdminFilter } from '@/lib/api/compliance';

import { rolePage } from '@/components/layouts/role-page';
import { BackToTeacherTable } from '@/components/pages/compliance/back-to';
import { AdminTeacherFilters } from '@/components/pages/compliance/filters';
import type { TeachersSectionProps } from '@/components/pages/compliance/sections/teachers-section';
import { ComplianceTabs } from '@/components/pages/compliance/tabs';
import { DEFAULT_FILTERS_KEYS } from '@/constants/filter';
import { getTeacher } from '@/lib/api/teacher';
import { getDefaultAcademicYearIds } from '@/utils/academic-year';
import type { Metadata } from 'next';
import { redirect } from 'next/navigation';
import { RolesEnum } from 'ecap-lib/dist/constants';

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
      <BackToTeacherTable teacher={await getTeacher((await params).id)} hasSignInButton />
      <AdminTeacherFilters tenant={tenant} academicYearIds={academicYearIds} />
      <ComplianceTabs />
    </>
  );
}

export default rolePage(CompliancePageTeacher, [RolesEnum.ADMIN, RolesEnum.SUPER_ADMIN]);
