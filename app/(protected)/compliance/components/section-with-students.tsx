import { PaginationSection } from '@/components/table/pagination-section';
import { getComplianceStudents } from '@/lib/compliance';
import { Tenant } from '@/types';
import { getLearningPeriodFromTenant, mergeLearningPeriods } from '@/utils';
import { StudentsTable } from './students-table';
import { Suspense } from 'react';
import { LoadingTable } from '@/components/table/loading-table';
interface SectionWithTableProps {
  param: {
    learning_period_id: string;
  };
  tenant: Tenant;
}

export const SectionWithTableSuspense = (props: SectionWithTableProps) => {
  return (
    <Suspense key={new URLSearchParams(props.param as any).toString()} fallback={<LoadingTable columns={8}  />}>
      <SectionWithTable {...props} />
    </Suspense>
  );
};

const SectionWithTable = async ({ param, tenant }: SectionWithTableProps) => {
  const mergedLP = mergeLearningPeriods(getLearningPeriodFromTenant(tenant));
  if (!param.learning_period_id) {
    const learningPeriod = mergedLP[0];
    param.learning_period_id = learningPeriod.id;
  }
  const assignment = await getComplianceStudents(new URLSearchParams(param as any).toString());
  const totalPages = assignment?.meta?.totalPages ?? 0;
  const learningPeriod = mergedLP.find(
    (learningPeriod) => learningPeriod.id === param.learning_period_id
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
      <StudentsTable assignments={assignment?.data} />
    </>
  );
};
