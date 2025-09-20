import { LoadingTableSection } from '@/components/table/loading';
import { PaginationSection } from '@/components/table/pagination-section';
import { DEFAULT_FILTERS_KEYS } from '@/constants/filter';
import { getComplianceStudents } from '@/lib/api/compliance';
import type { ITenant, ITrackLearningPeriod } from '@/types';
import { assignDefaultLearningPeriod, getDueDate, getStatusForTable } from '@/utils';
import { Suspense } from 'react';
import { StudentsTable } from '../tables';

export interface SectionWithTableProps {
  param: {
    [DEFAULT_FILTERS_KEYS.LEARNING_PERIOD_ID]: string;
    [DEFAULT_FILTERS_KEYS.STUDENT_ID]: string;
    name?: string;
  };
  tenant: ITenant;
}

export const StudentsSection = (props: SectionWithTableProps) => {
  return (
    <Suspense
      fallback={<LoadingTableSection columns={8} />}
      key={new URLSearchParams(props.param as any).toString()}
    >
      <Students {...props} />
    </Suspense>
  );
};

const Students = async ({ param, tenant }: SectionWithTableProps) => {
  const mergedLP = assignDefaultLearningPeriod(tenant, param);
  const assignment = await getComplianceStudents(new URLSearchParams(param as any).toString());
  const totalPages = assignment?.meta?.totalPages ?? 0;
  const learningPeriod = mergedLP.find(
    //@ts-expect-error
    (learningPeriod) => learningPeriod.id == param.learning_period_id
  );

  const dueDate = getDueDate(learningPeriod);
  const totalItems = assignment?.meta?.totalItems ?? 0;
  const completedCount = assignment?.meta?.additionalData?.completedCount ?? 0;

  const status = getStatusForTable(completedCount, totalItems, dueDate);

  return (
    <>
      <PaginationSection
        totalPages={totalPages}
        learningPeriod={learningPeriod}
        dueDate={dueDate}
        completedString={`${completedCount} / ${totalItems} Students Completed`}
        status={status}
      />
      <StudentsTable
        assignments={assignment?.data}
        currentLearningPeriod={learningPeriod as ITrackLearningPeriod}
      />
    </>
  );
};
