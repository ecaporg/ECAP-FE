import {
  AcademyFilter,
  CompletionFilter,
  GradeFilter,
  LearningPeriodFilter,
  SchoolFilter,
  TrackFilter,
} from '@/components/filters';
import { SearchStudentFilter } from '@/components/filters/search.filter';
import { DEFAULT_FILTERS_KEYS } from '@/constants/filter';
import type { Tenant } from '@/types';
import { getLearningPeriodFromTenant } from '@/utils';
import { FilterWrapper } from './filter-wrapper';

interface TeacherFiltersProps {
  tenant: Tenant;
  academicYearIds?: string[];
  tracksIds?: string[];
}

export function TeacherFilters({ tenant, academicYearIds, tracksIds }: TeacherFiltersProps) {
  const tracks = tenant.tracks.filter((track) =>
    academicYearIds?.includes(track.academic_year_id.toString())
  );

  return (
    <FilterWrapper>
      <LearningPeriodFilter
        availablePeriods={getLearningPeriodFromTenant(tenant, academicYearIds, tracksIds)}
      />
      <SearchStudentFilter />
      <SchoolFilter availableSchools={tenant.schools} />
      <AcademyFilter availableAcademies={tenant.academies} />
      <TrackFilter availableTracks={tracks} />
      <GradeFilter />
      <CompletionFilter />
    </FilterWrapper>
  );
}
