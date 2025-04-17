import { PaginationSection } from '@/components/table/pagination-section';
import { getComplianceStudents } from '@/lib/compliance';
import { Sample, Tenant } from '@/types';
import { assignDefaultLearningPeriod, getDueDate } from '@/utils';
import { Suspense } from 'react';
import { LoadingTable } from '@/components/table/loading-table';
import { SamplesTable, StudentsTable } from './tables';
import { DEFAULT_FILTERS_KEYS } from '@/constants/filter';

interface SectionWithTableProps {
  param: {
    [DEFAULT_FILTERS_KEYS.LEARNING_PERIOD_ID]: string;
  };
  tenant: Tenant;
}

export const StudentsSection = (props: SectionWithTableProps) => {
  return (
    <SuspenseSection columns={8} trigger={new URLSearchParams(props.param as any).toString()}>
      <Students {...props} />
    </SuspenseSection>
  );
};

export const SamplesSection = (props: SectionWithTableProps) => {
  return (
    <SuspenseSection columns={5} trigger={new URLSearchParams(props.param as any).toString()}>
      <Samples {...props} />
    </SuspenseSection>
  );
};



const SuspenseSection = ({ children, columns, trigger }: React.PropsWithChildren<{ columns: number, trigger: string }>) => {
  return (
    <Suspense fallback={<LoadingTable columns={columns} /> } key={trigger}>
      {children}
    </Suspense>
  );
};


const Students = async ({ param, tenant }: SectionWithTableProps) => {
  const mergedLP = assignDefaultLearningPeriod(tenant, param);
  const assignment = await getComplianceStudents(new URLSearchParams(param as any).toString());

  const totalPages = assignment?.meta?.totalPages ?? 0;

  const learningPeriod = mergedLP.find(
    (learningPeriod) => learningPeriod.id === param.learning_period_id
  );

  const dueDate = getDueDate(learningPeriod);

  return (
    <>
      <PaginationSection
        totalPages={totalPages}
        learningPeriod={learningPeriod?.name ?? ''}
        dueDate={dueDate.toLocaleDateString()}
        completedString="5/50 students completed"
        status="In Progress"
      />
      <StudentsTable assignments={assignment?.data} currentLearningPeriodId={param.learning_period_id} />
    </>
  );
};


const Samples = async ({ param, tenant }: SectionWithTableProps) => {
  const mergedLP = assignDefaultLearningPeriod(tenant, param);
  const samples = [] as any[];

  const learningPeriod = mergedLP.find(
    (learningPeriod) => learningPeriod.id === param.learning_period_id
  );

  const dueDate = getDueDate(learningPeriod);

  return (
    <>
      <PaginationSection
        totalPages={0}
        learningPeriod={learningPeriod?.name ?? ''}
        dueDate={dueDate.toLocaleDateString()}
        completedString="5/50 samples completed"
        status="In Progress"
      />
      <SamplesTable assignments={samples} currentLearningPeriodId={param.learning_period_id} />
    </>
  );
};
