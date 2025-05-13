import { CompliancePage as Students } from '@/roles/@teacher/compliance/page';
import { LoadingTableSectionWithFilters } from '@/components/table/loading';
import { Suspense } from 'react';
import { rolePage } from '@/components/layouts/role-page';
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
