import { rolePage } from '@/components/layouts/role-page';
import { SamplesSection } from '@/components/pages/compliance/sections';
import { getComplianceTeacherFilter } from '@/lib/compliance';

async function CompliancePage({
  searchParams,
}: {
  searchParams: Promise<{ learning_period_id: string; student_id: string }>;
}) {
  const tenant = await getComplianceTeacherFilter();
  return (
    <>
      <SamplesSection param={await searchParams} tenant={tenant!} />
    </>
  );
}

export default rolePage(CompliancePage, ["TEACHER"]);