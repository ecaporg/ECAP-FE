import { getComplianceTeacherFilter } from '@/lib/compliance';

export default async function TabLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const tenant = await getComplianceTeacherFilter();
  return (
    <>
      {children}
    </>
  );
}
