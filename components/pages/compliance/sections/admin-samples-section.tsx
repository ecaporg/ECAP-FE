import { LoadingTableSection } from '@/components/table/loading';
import { PaginationSection } from '@/components/table/pagination-section';
import { DEFAULT_FILTERS_KEYS, SPECIFIC_PAGE_FILTER_KEYS } from '@/constants/filter';
import type { Tenant } from '@/types';
import { assignDefaultLearningPeriod, getDueDate, getStatusForTable } from '@/utils';
import { Suspense } from 'react';
import { DirectorSamplesTable } from '../tables';
import { getComplianceAdminSamples } from '@/lib/api/sample';

export interface AdminSamplesSectionProps {
  param: {
    [DEFAULT_FILTERS_KEYS.LEARNING_PERIOD_ID]: string;
    [DEFAULT_FILTERS_KEYS.TEACHER_ID]: string;
    [DEFAULT_FILTERS_KEYS.ACADEMIC_YEAR]: string;
    name?: string;
  };
  tenant: Tenant;
  academicYearIds: string[];
}

const prepareParam = (param: AdminSamplesSectionProps['param']) => {
  return new URLSearchParams(param)
    .toString()
    .replace(
      DEFAULT_FILTERS_KEYS.LEARNING_PERIOD_ID,
      SPECIFIC_PAGE_FILTER_KEYS.COMPLIANCE.ADMIN.LEARNING_PERIOD_ID
    )
    .replace(DEFAULT_FILTERS_KEYS.TEACHER_ID, SPECIFIC_PAGE_FILTER_KEYS.COMPLIANCE.ADMIN.TEACHER_ID)
    .replace(
      DEFAULT_FILTERS_KEYS.ACADEMIC_YEAR,
      SPECIFIC_PAGE_FILTER_KEYS.COMPLIANCE.ADMIN.ACADEMIC_YEAR
    );
};

export const AdminSamplesSection = (props: AdminSamplesSectionProps) => {
  return (
    <Suspense
      fallback={<LoadingTableSection columns={8} />}
      key={new URLSearchParams(props.param).toString()}
    >
      <DirectorSamples {...props} />
    </Suspense>
  );
};

const DirectorSamples = async ({ param, tenant, academicYearIds }: AdminSamplesSectionProps) => {
  const mergedLP = assignDefaultLearningPeriod(tenant, param, academicYearIds);
  const samples = await getComplianceAdminSamples(prepareParam(param));
  const totalPages = samples?.meta?.totalPages ?? 0;
  const learningPeriod = mergedLP.find(
    (learningPeriod) => learningPeriod.id == param.learning_period_id
  );

  const dueDate = getDueDate(learningPeriod);
  const totalItems = samples?.meta?.totalItems ?? 0;
  const completedCount =
    samples?.meta?.additionalData?.completedCount ??
    samples?.data?.filter((sample) => sample.status === 'COMPLETED').length;

  const status = getStatusForTable(0, totalItems, dueDate);

  return (
    <>
      <PaginationSection
        totalPages={totalPages}
        learningPeriod={learningPeriod?.name ?? ''}
        dueDate={dueDate.toLocaleDateString()}
        completedString={`${completedCount} / ${totalItems} Samples Completed`}
        status={status}
      />
      <DirectorSamplesTable samples={samples?.data ?? []} />
    </>
  );
};
