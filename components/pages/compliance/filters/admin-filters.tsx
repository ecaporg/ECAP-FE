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

      <AcademyFilter availableAcademies={tenant.academies} />
      <CompletionFilter />

      <SchoolFilter availableSchools={tenant.schools} />
      <TrackFilter availableTracks={tracks} />
      <SemesterFilter availableSemesters={tracks.flatMap((track) => track.semesters)} />
      <GradeSpanFilter />
      <SubjectFilter availableSubjects={tenant.courses} />
      <SampleStatusFilter />
    </FilterWrapper>
  );
}
