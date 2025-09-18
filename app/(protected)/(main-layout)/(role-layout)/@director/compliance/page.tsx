import { getComplianceAdminFilter } from '@/lib/api/compliance';

import { rolePage } from '@/components/layouts/role-page';
import { DirectorFilters } from '@/components/pages/compliance/filters';
import { TeacherSection } from '@/components/pages/compliance/sections';
import type { TeachersSectionProps } from '@/components/pages/compliance/sections/teachers-section';
import { DEFAULT_FILTERS_KEYS, FILTER_SEPARATOR_FOR_MULTIPLE_VALUES } from '@/constants/filter';
import { getDefaultAcademicYearIds } from '@/utils/academic-year';
import { RolesEnum } from 'ecap-lib/dist/constants';
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
  const awaitedParams = (await searchParams) as any;
  const academicYearIds = getDefaultAcademicYearIds(
    tenant,
    awaitedParams[DEFAULT_FILTERS_KEYS.ACADEMIC_YEAR]
  );
  const tracksIds = awaitedParams[DEFAULT_FILTERS_KEYS.TRACK_ID]?.split(
    FILTER_SEPARATOR_FOR_MULTIPLE_VALUES
  );
  const currentLearningPeriodId = awaitedParams[DEFAULT_FILTERS_KEYS.LEARNING_PERIOD_ID];

  return (
    <>
      <DirectorFilters
        tenant={tenant}
        academicYearIds={academicYearIds}
        tracksIds={tracksIds}
        currentLearningPeriodId={currentLearningPeriodId}
      />
      <TeacherSection param={awaitedParams} tenant={tenant!} academicYearIds={academicYearIds} />
    </>
  );
}

export default rolePage(CompliancePage, [RolesEnum.DIRECTOR]);
