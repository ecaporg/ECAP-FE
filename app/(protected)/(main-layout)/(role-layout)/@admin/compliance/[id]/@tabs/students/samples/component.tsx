import { LoadingTableSectionWithFilters } from '@/components/table/loading';
import { ComplianceSamplesPage as Samples } from '@/roles/@teacher/compliance/samples/component';
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
