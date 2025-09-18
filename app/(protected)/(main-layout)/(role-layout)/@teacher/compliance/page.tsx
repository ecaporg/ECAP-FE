import { rolePage } from '@/components/layouts/role-page';
import { TeacherFilters } from '@/components/pages/compliance/filters';
import { StudentsSection } from '@/components/pages/compliance/sections';
import { DEFAULT_FILTERS_KEYS, FILTER_SEPARATOR_FOR_MULTIPLE_VALUES } from '@/constants/filter';
import { getComplianceTeacherFilter } from '@/lib/api/compliance';
import { getDefaultAcademicYearIds } from '@/utils/academic-year';
import { RolesEnum } from 'ecap-lib/dist/constants';
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
      <TeacherFilters
        tenant={tenant}
        academicYearIds={academicYearIds}
        tracksIds={tracksIds}
        currentLearningPeriodId={currentLearningPeriodId}
      />
      <StudentsSection param={awaitedParams} tenant={tenant!} />
    </>
  );
}

export default rolePage(CompliancePage, [RolesEnum.TEACHER]);
