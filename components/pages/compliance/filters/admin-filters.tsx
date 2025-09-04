import {
  AcademicYearFilter,
  AcademyFilter,
  CompletionFilter,
  GradeSpanFilter,
  LearningPeriodFilter,
  SampleStatusFilter,
  SchoolFilter,
  SearchTeacherFilter,
  SemesterFilter,
  SubjectFilter,
  TrackFilter,
} from '@/components/filters';
import { DEFAULT_FILTERS_KEYS } from '@/constants/filter';
import type { Tenant } from '@/types';
import { getLearningPeriodFromTenant } from '@/utils';
import { FilterWrapper } from './filter-wrapper';

interface AdminFiltersProps {
  tenant: Tenant;
  academicYearIds: string[];
  tracksIds: string[];
  currentLearningPeriodId: string;
}

export function AdminFilters({
  tenant,
  academicYearIds,
  tracksIds,
  currentLearningPeriodId,
}: AdminFiltersProps) {
  const tracks = tenant.tracks.filter((track) =>
    academicYearIds.includes(track.academic_year_id.toString())
  );

  return (
    <FilterWrapper className="2xl:grid-flow-row grid-cols-6">
      <AcademicYearFilter
        availableAcademicYears={tenant.tracks.map((track) => track.academicYear)}
        defaultValue={academicYearIds[0]}
      />
      <LearningPeriodFilter
        availablePeriods={getLearningPeriodFromTenant(tenant, academicYearIds, tracksIds)}
      />
      <SearchTeacherFilter currentLearningPeriodId={currentLearningPeriodId} />

      <AcademyFilter
        slug={DEFAULT_FILTERS_KEYS.ACADEMY_ID}
        availableAcademies={tenant.academies}
      />
      <CompletionFilter />

      <SchoolFilter
        availableSchools={tenant.schools}
        slug={DEFAULT_FILTERS_KEYS.SCHOOL_ID}
      />
      <TrackFilter slug={DEFAULT_FILTERS_KEYS.TRACK_ID} availableTracks={tracks} />
      <SemesterFilter
        slug={DEFAULT_FILTERS_KEYS.SEMESTER_ID}
        availableSemesters={tracks.flatMap((track) => track.semesters)}
      />
      <GradeSpanFilter />
      <SubjectFilter
        slug={DEFAULT_FILTERS_KEYS.SUBJECT_ID}
        availableSubjects={tracks
          .filter((track) => (tracksIds?.length ? tracksIds.includes(track.id.toString()) : true))
          .flatMap((track) => track.subjects)}
      />
      <SampleStatusFilter slug={DEFAULT_FILTERS_KEYS.STATUS} />
    </FilterWrapper>
  );
}
