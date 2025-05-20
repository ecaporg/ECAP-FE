import { LoadingFilters, LoadingTableSection } from '@/components/table/loading';
import { PaginationSection } from '@/components/table/pagination-section';
import { DEFAULT_FILTERS_KEYS } from '@/constants/filter';
import { routes } from '@/constants/routes';
import { getComplianceStudentSamples } from '@/lib/api/compliance';
import type { Sample, Tenant } from '@/types';
import { assignDefaultLearningPeriod, getDueDate, getStatusForTable } from '@/utils';
import { getDefaultAcademicYearIds } from '@/utils/academic-year';
import { redirect } from 'next/navigation';
import { Suspense } from 'react';
import { SamplesFilters } from '../filters';
import { SamplesTable } from '../tables';

export interface SamplesSectionProps {
  param: {
    [DEFAULT_FILTERS_KEYS.LEARNING_PERIOD_ID]: string;
    [DEFAULT_FILTERS_KEYS.STUDENT_ID]: string;
    [DEFAULT_FILTERS_KEYS.ACADEMIC_YEAR]: string;
    name?: string;
  };
  tenant: Tenant;
}

export const SamplesSection = (props: SamplesSectionProps) => {
  return (
    <Suspense
      fallback={
        <>
          <LoadingFilters className="pt-20" />
          <LoadingTableSection columns={9} />
        </>
      }
      key={new Date().getTime()}
    >
      <Samples {...props} />
    </Suspense>
  );
};

const Samples = async ({ param, tenant }: SamplesSectionProps) => {
  if (!param[DEFAULT_FILTERS_KEYS.STUDENT_ID]) {
    return redirect(routes.compliance.root);
  }

  const academicYearIds = getDefaultAcademicYearIds(
    tenant,
    param[DEFAULT_FILTERS_KEYS.ACADEMIC_YEAR]
  );

  const mergedLP = assignDefaultLearningPeriod(tenant, param, academicYearIds);
  const assignmentPeriods = await getComplianceStudentSamples(
    new URLSearchParams(param as any).toString(),
    param.student_id
  );

  const learningPeriod = mergedLP.find(
    (learningPeriod) => learningPeriod.id == param.learning_period_id
  );

  const dueDate = getDueDate(learningPeriod);

  const samples = assignmentPeriods.data?.flatMap((assignment) => assignment.samples);

  const rows = Object.entries(
    (assignmentPeriods.data || [])
      ?.flatMap(({ samples }) => samples)
      .reduce(
        (acc, sample) => {
          if (acc[sample.subject_id]) {
            acc[sample.subject_id].push(sample);
          } else {
            acc[sample.subject_id] = [sample];
          }
          return acc;
        },
        {} as Record<number, Sample[]>
      )
  ).map(([_, samples = []]) => ({
    sample_1: samples[0],
    sample_2: samples[1],
    subject: samples[0].subject,
  }));

  const completeCount = rows.filter(
    (row) => row?.sample_2?.done_by && row?.sample_1?.done_by
  ).length;

  const totalItems = rows.length;

  const status = getStatusForTable(completeCount, totalItems, dueDate);

  return (
    <>
      <SamplesFilters
        tenant={tenant}
        samples={samples || []}
        student={assignmentPeriods.data?.[0]?.samples?.[0]?.student_lp_enrollment.student}
        defaultName={param.name}
        academicYearIds={academicYearIds}
      />
      <PaginationSection
        totalPages={0}
        learningPeriod={learningPeriod}
        dueDate={dueDate}
        completedString={`${completeCount} / ${totalItems} Subjects Completed`}
        status={status}
      />
      <SamplesTable rows={rows} />
    </>
  );
};
