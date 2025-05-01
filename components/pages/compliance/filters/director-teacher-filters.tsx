import {
  FlagCategoryFilter,
  LearningPeriodFilter,
  SampleStatusFilter,
  AcademicYearFilter,
} from "@/components/filters";
import { getLearningPeriodFromTenant } from "@/utils";
import { FilterWrapper } from "./filter-wrapper";
import type { Tenant } from "@/types";
import { SPECIFIC_PAGE_FILTER_KEYS } from "@/constants/filter";

interface DirectorTeacherFiltersProps {
  tenant: Tenant;
  academicYearIds: string[];
}

export function DirectorTeacherFilters({
  tenant,
  academicYearIds,
}: DirectorTeacherFiltersProps) {
  return (
    <FilterWrapper>
      <AcademicYearFilter
        availableAcademicYears={tenant.tracks.map(
          (track) => track.academicYear
        )}
      />
      <LearningPeriodFilter
        availablePeriods={getLearningPeriodFromTenant(tenant, academicYearIds)}
      />
    </FilterWrapper>
  );
}

export const DirectorSamplesFilters = () => {
  return (
    <FilterWrapper>
      <FlagCategoryFilter />
      <SampleStatusFilter />
    </FilterWrapper>
  );
};
