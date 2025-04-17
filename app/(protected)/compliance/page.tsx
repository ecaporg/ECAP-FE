import { getComplianceTeacherFilter } from "@/lib/compliance";
import {
  StudentsSection,
  type SectionWithTableProps,
} from "./components/sections";
import { TeacherFilters } from "./components/filters";

export default async function CompliancePage({
  searchParams,
}: {
  searchParams: Promise<SectionWithTableProps["param"]>;
}) {
  const tenant = await getComplianceTeacherFilter();

  return (
    <>
      <TeacherFilters tenant={tenant} />
      <StudentsSection param={await searchParams} tenant={tenant!} />
    </>
  );
}
