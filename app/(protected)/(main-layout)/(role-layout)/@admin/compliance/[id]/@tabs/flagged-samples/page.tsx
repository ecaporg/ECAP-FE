import { rolePage } from '@/components/layouts/role-page';
import { AdminSamplesFilters } from '@/components/pages/compliance/filters';
import { AdminSamplesSection } from '@/components/pages/compliance/sections';
import type { AdminSamplesSectionProps } from '@/components/pages/compliance/sections/admin-samples-section';
import { LoadingTableSectionWithFilters } from '@/components/table/loading';
import { DEFAULT_FILTERS_KEYS } from '@/constants/filter';
import { getComplianceTeacherFilter } from '@/lib/api/compliance';
import { getDefaultAcademicYearIds } from '@/utils/academic-year';
import { Suspense } from 'react';

export async function TabSamples({
  searchParams,
}: {
  searchParams: Promise<AdminSamplesSectionProps['param']>;
}) {
  return (
    <Suspense
      key={new URLSearchParams(await searchParams).toString()}
      fallback={<LoadingTableSectionWithFilters columns={8} rows={15} filters={7} />}
    >
      <SampleComponent searchParams={searchParams} />
    </Suspense>
  );
}

const SampleComponent = async ({
  searchParams,
}: {
  searchParams: Promise<AdminSamplesSectionProps['param']>;
}) => {
  const tenant = await getComplianceTeacherFilter();
  const academicYearIds = getDefaultAcademicYearIds(
    tenant,
    (await searchParams)[DEFAULT_FILTERS_KEYS.ACADEMIC_YEAR]
  );

  return (
    <>
      <AdminSamplesFilters />
      <AdminSamplesSection
        param={await searchParams}
        tenant={tenant}
        academicYearIds={academicYearIds}
      />
    </>
  );
};

export default rolePage(TabSamples, ['ADMIN', 'SUPER_ADMIN']);
