import { getComplianceTeacherFilter } from '@/lib/compliance';
import { TeacherFilters } from '@/components/pages/compliance/filters';
import {
  type SectionWithTableProps,
  StudentsSection,
} from '@/components/pages/compliance/sections';

export default async function CompliancePage({
  searchParams,
}: {
  searchParams: Promise<SectionWithTableProps['param']>;
}) {
  const tenant = await getComplianceTeacherFilter();
  return (
    <>
      <TeacherFilters tenant={tenant} />
      <StudentsSection param={await searchParams} tenant={tenant!} />
    </>
  );
}
