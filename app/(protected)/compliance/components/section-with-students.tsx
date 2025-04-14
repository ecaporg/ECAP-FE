import { PaginationSection } from '@/components/table/pagination-section';
import { getComplianceStudents } from '@/lib/compliance';
import StudentsTable from './students-table';
import { Tenant } from '@/types';
interface SectionWithTableProps {
    param: {
        learning_period_id: string;
    }
    tenant: Tenant;
}

export const SectionWithTable = async ({param, tenant}: SectionWithTableProps) => {
  if (!param.learning_period_id) {
    const learningPeriodArray = tenant?.tracks?.[0]?.learningPeriods;
    if (learningPeriodArray) {
      const learningPeriod = learningPeriodArray[learningPeriodArray.length - 1];
      param.learning_period_id = learningPeriod.id;
    }
  }
  const assignment = await getComplianceStudents(new URLSearchParams(param as any).toString());
  const totalPages = assignment?.meta?.totalPages ?? 0;
  const learningPeriod = tenant?.tracks
    ?.flatMap((track) => track.learningPeriods)
    .find((learningPeriod) => learningPeriod.id === param.learning_period_id);
  const dueDate = new Date(learningPeriod?.end_date ?? '');
  dueDate.setDate(dueDate.getDate() + 7);

  return (
    <>
      <PaginationSection
        totalPages={totalPages}
        learningPeriod={learningPeriod?.name ?? ''}
        dueDate={dueDate.toLocaleDateString()}
        completedString="5/50 students completed"
        status="In Progress"
      />
      <StudentsTable assignments={assignment?.data} />
    </>
  );
};
