import { rolePage } from '@/components/layouts/role-page';
import { LoadingTableSectionWithFilters } from '@/components/table/loading';
import { CompliancePage as Students } from '@/roles/@teacher/compliance/page';
import { Suspense } from 'react';
export async function TabStudents({
  searchParams,
}: {
  searchParams: Promise<any>;
}) {
  return (
    <Suspense
      key={new URLSearchParams(await searchParams).toString()}
      fallback={<LoadingTableSectionWithFilters columns={8} rows={15} filters={7} />}
    >
      <Students searchParams={searchParams} />
    </Suspense>
  );
}

export default rolePage(TabStudents, ['ADMIN', 'SUPER_ADMIN']);
