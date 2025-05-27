import { rolePage } from '@/components/layouts/role-page';
import { SamplesSection } from '@/components/pages/compliance/sections';
import type { SamplesSectionProps } from '@/components/pages/compliance/sections/samples-section';
import { getComplianceTeacherFilter } from '@/lib/api/compliance';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Compliance Samples',
};

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

export default rolePage(ComplianceSamplesPage, ['TEACHER']);
