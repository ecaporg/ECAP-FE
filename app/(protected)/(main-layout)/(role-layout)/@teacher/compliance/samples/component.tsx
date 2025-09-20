import { SamplesSection } from '@/components/pages/compliance/sections';
import type { SamplesSectionProps } from '@/components/pages/compliance/sections/samples-section';
import { getComplianceTeacherFilter } from '@/lib/api/compliance';

export async function ComplianceSamplesPage({
  searchParams,
}: {
  searchParams: Promise<SamplesSectionProps['param']>;
}) {
  const tenant = await getComplianceTeacherFilter();

  return (
    <>
      <SamplesSection param={await searchParams} tenant={tenant!} />
    </>
  );
}
