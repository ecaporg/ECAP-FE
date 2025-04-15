import { getComplianceTeacherFilter } from '@/lib/compliance';
import { Suspense } from 'react';
import { SectionWithTable } from './components/section-with-students';
import { TeacherFilters } from './components/filters';
import { TenantProvider } from '@/providers/tenatn';

export default async function CompliancePage({
  searchParams,
}: { searchParams: Promise<{ learning_period_id: string }> }) {
  const tenant = await getComplianceTeacherFilter();

  return (
    <TenantProvider tenant={tenant!}>
      <TeacherFilters tenant={tenant} />
      <Suspense fallback={<div>Loading table...</div>}>
        <SectionWithTable param={await searchParams} tenant={tenant!} />
      </Suspense>
    </TenantProvider>
  );
}
