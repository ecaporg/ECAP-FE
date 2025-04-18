import { PaginationSection } from '@/components/table/pagination-section';
import { getComplianceStudents, getComplianceStudentSamples } from '@/lib/compliance';
import { Tenant, TrackLearningPeriod } from '@/types';
import { assignDefaultLearningPeriod, getDueDate } from '@/utils';
import { Suspense } from 'react';
import { LoadingFilters, LoadingTableSection } from '@/components/table/loading';
import { SamplesTable, StudentsTable } from './tables';
import { DEFAULT_FILTERS_KEYS } from '@/constants/filter';
import { routes } from '@/constants/routes';
import { redirect } from 'next/navigation';
import { SamplesFilters } from './filters';

export interface SectionWithTableProps {
  param: {
    [DEFAULT_FILTERS_KEYS.LEARNING_PERIOD_ID]: string;
    [DEFAULT_FILTERS_KEYS.STUDENT_ID]: string;
    name?: string; // for student with samples
  };
  tenant: Tenant;
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

export const SamplesSection = (props: SectionWithTableProps) => {
  const key = new URLSearchParams(props.param as any).toString();
  return (
    <Suspense
      fallback={
        <>
          <LoadingFilters className="pt-20" />
          <LoadingTableSection columns={9} />
        </>
      }
      key={key}
    >
      <Samples {...props} />
    </Suspense>
  );
};

const Students = async ({ param, tenant }: SectionWithTableProps) => {
  const mergedLP = assignDefaultLearningPeriod(tenant, param);
  const assignment = await getComplianceStudents(new URLSearchParams(param as any).toString());

  const totalPages = assignment?.meta?.totalPages ?? 0;

  const learningPeriod = mergedLP.find(
    (learningPeriod) => learningPeriod.id == param.learning_period_id
  );

  const dueDate = getDueDate(learningPeriod);

  return (
    <>
      <PaginationSection
        totalPages={totalPages}
        learningPeriod={learningPeriod?.name ?? ''}
        dueDate={dueDate.toLocaleDateString()}
        completedString={`${(assignment?.meta as any)?.completedCount} / ${
          assignment?.meta?.totalItems
        } students completed`}
        status="In Progress"
      />
      <StudentsTable
        assignments={assignment?.data}
        currentLearningPeriod={learningPeriod as TrackLearningPeriod}
      />
    </>
  );
};

const Samples = async ({ param, tenant }: SectionWithTableProps) => {
  if (!param[DEFAULT_FILTERS_KEYS.STUDENT_ID]) {
    return redirect(routes.compliance.root);
  }

  const mergedLP = assignDefaultLearningPeriod(tenant, param);
  const assignmentPeriods = await getComplianceStudentSamples(
    new URLSearchParams(param as any).toString()
  );

  const learningPeriod = mergedLP.find(
    (learningPeriod) => learningPeriod.id === param.learning_period_id
  );

  const dueDate = getDueDate(learningPeriod);

  const samples = assignmentPeriods.data?.flatMap((assignment) => assignment.samples);

  const completeCount = samples?.filter((sample) => sample.done_by).length;

  return (
    <>
      <SamplesFilters
        tenant={tenant}
        samples={samples || []}
        student={assignmentPeriods.data?.[0]?.student}
        defaultName={param.name}
      />
      <PaginationSection
        totalPages={0}
        learningPeriod={learningPeriod?.name ?? ''}
        dueDate={dueDate.toLocaleDateString()}
        completedString={`${completeCount} / ${samples?.length} Samples completed`}
        status="In Progress"
      />
      <SamplesTable
        assignments={assignmentPeriods.data}
        currentLearningPeriod={learningPeriod as TrackLearningPeriod}
      />
    </>
  );
};
