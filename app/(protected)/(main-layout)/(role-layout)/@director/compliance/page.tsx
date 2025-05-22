import { getComplianceAdminFilter } from '@/lib/api/compliance';

import { rolePage } from '@/components/layouts/role-page';
import { DirectorFilters } from '@/components/pages/compliance/filters';
import { TeacherSection } from '@/components/pages/compliance/sections';
import type { TeachersSectionProps } from '@/components/pages/compliance/sections/teachers-section';
import { DEFAULT_FILTERS_KEYS, SPECIFIC_PAGE_FILTER_KEYS } from '@/constants/filter';
import { getDefaultAcademicYearIds } from '@/utils/academic-year';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Director Compliance',
};

export async function CompliancePage({
  searchParams,
}: {
  searchParams: Promise<TeachersSectionProps['param']>;
}) {
  const tenant = await getComplianceAdminFilter();
  const academicYearIds = getDefaultAcademicYearIds(
    tenant,
    (await searchParams)[DEFAULT_FILTERS_KEYS.ACADEMIC_YEAR]
  );
  const tracksIds = ((await searchParams) as any)[
    SPECIFIC_PAGE_FILTER_KEYS.COMPLIANCE.TRACK_ID
  ]?.split(',');

  return (
    <>
      <DirectorFilters tenant={tenant} academicYearIds={academicYearIds} tracksIds={tracksIds} />
      <TeacherSection
        param={await searchParams}
        tenant={tenant!}
        academicYearIds={academicYearIds}
      />
    </>
  );
}

export default rolePage(CompliancePage, ['DIRECTOR']);
