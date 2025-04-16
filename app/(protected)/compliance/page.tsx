import { getComplianceTeacherFilter } from '@/lib/compliance';
import { SectionWithTableSuspense } from './components/section-with-students';
import { TeacherFilters } from './components/filters';
import { TenantProvider } from '@/providers/tenatn';

export default async function CompliancePage({
  searchParams,
}: { searchParams: Promise<{ 'assignment_periods.learning_period_id': string }> }) {
  const tenant = await getComplianceTeacherFilter();

  return (
    <TenantProvider tenant={tenant!}>
      <TeacherFilters tenant={tenant} />
      <SectionWithTableSuspense param={await searchParams} tenant={tenant!} />
    </TenantProvider>
  );
}
