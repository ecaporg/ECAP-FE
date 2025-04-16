import { getComplianceTeacherFilter } from '@/lib/compliance';
import { StudentsSection } from './components/sections';
import { TeacherFilters } from './components/filters';
import { DEFAULT_FILTERS_KEYS } from '@/constants/filter';

export default async function CompliancePage({
  searchParams,
}: { searchParams: Promise<{ [DEFAULT_FILTERS_KEYS.LEARNING_PERIOD_ID]: string }> }) {
  const tenant = await getComplianceTeacherFilter();

  return (
    <>
      <TeacherFilters tenant={tenant} />
      <StudentsSection param={await searchParams} tenant={tenant!} />
    </>
  );
}
