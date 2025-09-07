import { rolePage } from '@/components/layouts/role-page';
import { TeacherFilters } from '@/components/pages/compliance/filters';
import { StudentsSection } from '@/components/pages/compliance/sections';
import { DEFAULT_FILTERS_KEYS, FILTER_SEPARATOR_FOR_MULTIPLE_VALUES } from '@/constants/filter';
import { getComplianceTeacherFilter } from '@/lib/api/compliance';
import { getDefaultAcademicYearIds } from '@/utils/academic-year';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Compliance',
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
  const tracksIds = (await searchParams)[DEFAULT_FILTERS_KEYS.TRACK_ID]?.split(FILTER_SEPARATOR_FOR_MULTIPLE_VALUES);

  return (
    <>
      <TeacherFilters tenant={tenant} academicYearIds={academicYearIds} tracksIds={tracksIds} />
      <StudentsSection param={await searchParams} tenant={tenant!} />
    </>
  );
}

export default rolePage(CompliancePage, ['TEACHER']);
