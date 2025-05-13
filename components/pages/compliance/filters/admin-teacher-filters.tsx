import {
  FlagCategoryFilter,
  LearningPeriodFilter,
  SampleStatusFilter,
  AcademicYearFilter,
} from '@/components/filters';
import { getLearningPeriodFromTenant } from '@/utils';
import { FilterWrapper } from './filter-wrapper';
import type { Tenant } from '@/types';

interface AdminTeacherFiltersProps {
  tenant: Tenant;
  academicYearIds: string[];
}

export function AdminTeacherFilters({ tenant, academicYearIds }: AdminTeacherFiltersProps) {
  return (
    <FilterWrapper className="pt-0 pb-6">
      <AcademicYearFilter
        availableAcademicYears={tenant.tracks.map((track) => track.academicYear)}
      />
      <LearningPeriodFilter
        availablePeriods={getLearningPeriodFromTenant(tenant, academicYearIds)}
      />
    </FilterWrapper>
  );
}

export const AdminSamplesFilters = () => {
  return (
    <FilterWrapper className="pt-9 pb-4">
      <FlagCategoryFilter />
      <SampleStatusFilter />
    </FilterWrapper>
  );
};
