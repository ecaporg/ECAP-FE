import {
  AcademicYearFilter,
  type FilterProps,
  FlagCategoryFilter,
  LearningPeriodFilter,
  SampleStatusFilter,
} from '@/components/filters';
import { SAMPLE_STATUS } from '@/constants/sample';
import type { ITenant } from '@/types';
import { getLearningPeriodFromTenant } from '@/utils';
import { SampleStatus } from 'ecap-lib/dist/constants';
import { FilterWrapper } from './filter-wrapper';

interface AdminTeacherFiltersProps {
  tenant: ITenant;
  academicYearIds: string[];
}

export function AdminTeacherFilters({ tenant, academicYearIds }: AdminTeacherFiltersProps) {
  return (
    <FilterWrapper className="pt-0 pb-6 lg:[&>*]:grow-0" grid={false}>
      <AcademicYearFilter
        availableAcademicYears={tenant.tracks.map((track) => track.academicYear)}
        defaultValue={academicYearIds[0]}
      />
      <LearningPeriodFilter
        availablePeriods={getLearningPeriodFromTenant(tenant, academicYearIds)}
      />
    </FilterWrapper>
  );
}

const statuses: FilterProps['options'] = Object.entries(SAMPLE_STATUS)
  .map(([key, value]) => ({
    label: value as string,
    value: key as SampleStatus,
  }))
  .filter(
    ({ value }) =>
      ![SampleStatus.PENDING, SampleStatus.FLAGGED_TO_ADMIN].includes(value as SampleStatus)
  );

export const AdminSamplesFilters = () => {
  return (
    <FilterWrapper className="pt-9 pb-4 lg:[&>*]:grow-0" grid={false}>
      <FlagCategoryFilter />
      <SampleStatusFilter options={statuses} />
    </FilterWrapper>
  );
};
