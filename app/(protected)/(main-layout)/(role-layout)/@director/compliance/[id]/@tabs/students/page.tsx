import { CompliancePage as Students } from "@/app/(protected)/(main-layout)/(role-layout)/@teacher/compliance/page";
import { LoadingTableSectionWithFilters } from "@/components/table/loading";
import { Suspense } from "react";

export default async function TabStudents({
  searchParams,
}: {
  searchParams: Promise<any>;
}) {
  return (
    <Suspense
      key={new URLSearchParams(await searchParams).toString()}
      fallback={
        <LoadingTableSectionWithFilters columns={8} rows={15} filters={7} />
      }
    >
      <Students searchParams={searchParams} />
    </Suspense>
  );
}
