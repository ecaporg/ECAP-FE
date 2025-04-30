import {
  AcademyFilter,
  ComplationFilter,
  GradeFilter,
  LearningPeriodFilter,
  SchoolFilter,
  TrackFilter,
} from "@/components/filters";
import { SearchStudentFilter } from "@/components/filters/search.filter";
import { SPECIFIC_PAGE_FILTER_KEYS } from "@/constants/filter";
import type { Tenant } from "@/types";
import { getLearningPeriodFromTenant } from "@/utils";
import { FilterWrapper } from "./filter-wrapper";

interface TeacherFiltersProps {
  tenant: Tenant;
}

export function TeacherFilters({ tenant }: TeacherFiltersProps) {
  return (
    <FilterWrapper>
      <LearningPeriodFilter
        availablePeriods={getLearningPeriodFromTenant(tenant)}
      />
      <SearchStudentFilter />
      <SchoolFilter
        availableSchools={tenant.schools}
        slug={SPECIFIC_PAGE_FILTER_KEYS.COMPLIANCE.SCHOOL_ID}
      />
      <AcademyFilter
        slug={SPECIFIC_PAGE_FILTER_KEYS.COMPLIANCE.ACADEMY_ID}
        availableAcademies={tenant.academies}
      />
      <TrackFilter
        slug={SPECIFIC_PAGE_FILTER_KEYS.COMPLIANCE.TRACK_ID}
        availableTracks={tenant.tracks}
      />
      <GradeFilter slug={SPECIFIC_PAGE_FILTER_KEYS.COMPLIANCE.GRADE} />
      <ComplationFilter />
    </FilterWrapper>
  );
}
