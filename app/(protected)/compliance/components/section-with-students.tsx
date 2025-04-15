import { PaginationSection } from '@/components/table/pagination-section';
import { getComplianceStudents } from '@/lib/compliance';
import StudentsTable from './students-table';
import { Tenant } from '@/types';
import { getLearningPeriodFromTenant, mergeLearningPeriods } from '@/utils';
interface SectionWithTableProps {
  param: {
    'assignment_periods.learning_period_id': string;
  };
  tenant: Tenant;
}

export const SectionWithTable = async ({ param, tenant }: SectionWithTableProps) => {
  const mergedLP = mergeLearningPeriods(getLearningPeriodFromTenant(tenant));
  if (!param['assignment_periods.learning_period_id']) {
    const learningPeriod = mergedLP[0];
    param['assignment_periods.learning_period_id'] = learningPeriod.id;
  }
  const assignment = await getComplianceStudents(new URLSearchParams(param as any).toString());
  const totalPages = assignment?.meta?.totalPages ?? 0;
  const learningPeriod = mergedLP.find(
    (learningPeriod) => learningPeriod.id === param['assignment_periods.learning_period_id']
  );
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
      <StudentsTable assignments={assignment?.data} currentLearningPeriod={learningPeriod} />
    </>
  );
};
