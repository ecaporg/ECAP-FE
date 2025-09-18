import { rolePage } from '@/components/layouts/role-page';
import { LoadingTableSectionWithFilters } from '@/components/table/loading';
import { ComplianceSamplesPage as Samples } from '@/roles/@teacher/compliance/samples/page';
import { Suspense } from 'react';

export async function TabStudentsSamples({
  searchParams,
}: {
  searchParams: Promise<any>;
}) {
  return (
    <Suspense
      key={new URLSearchParams(await searchParams).toString()}
      fallback={<LoadingTableSectionWithFilters columns={8} rows={15} filters={7} />}
    >
      <Samples searchParams={searchParams} />
    </Suspense>
  );
}

export default rolePage(TabStudentsSamples, ['ADMIN', 'SUPER_ADMIN']);
