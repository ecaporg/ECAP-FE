import { getComplianceAdminFilter } from "@/lib/compliance";
import {
  DirectorFilters,
  TeacherFilters,
} from "@/components/pages/compliance/filters";
import {
  type SectionWithTableProps,
  TeacherSection,
} from "@/components/pages/compliance/sections";

export default async function CompliancePage({
  searchParams,
}: {
  searchParams: Promise<SectionWithTableProps["param"]>;
}) {
  const tenant = await getComplianceAdminFilter();
  return (
    <>
      <DirectorFilters tenant={tenant} />
      <TeacherSection param={await searchParams} tenant={tenant!} />
    </>
  );
}
