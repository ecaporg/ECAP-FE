import {
  AcademyFilter,
  CompletionFilter,
  LearningPeriodFilter,
  SchoolFilter,
  TrackFilter,
  SearchTeacherFilter,
} from '@/components/filters';
import { AcademicYearFilter } from '@/components/filters/academic-year.filter';
import { GradeSpanFilter } from '@/components/filters/grade-span.filter';
import { SemesterFilter } from '@/components/filters/semesrter.filter';
import { SubjectFilter } from '@/components/filters/subject.filter';
import { SampleStatusFilter } from '@/components/filters';
import { SPECIFIC_PAGE_FILTER_KEYS } from '@/constants/filter';
import { getLearningPeriodFromTenant } from '@/utils';
import { FilterWrapper } from './filter-wrapper';
import type { Tenant } from '@/types';

interface AdminFiltersProps {
  tenant: Tenant;
  academicYearIds: string[];
  tracksIds: string[];
}

export function AdminFilters({ tenant, academicYearIds, tracksIds }: AdminFiltersProps) {
  const tracks = tenant.tracks.filter((track) =>
    academicYearIds.includes(track.academic_year_id.toString())
  );

  return (
    <FilterWrapper className="lg:grid lg:grid-cols-6 lg:[&_button]:w-full lg:[&_button:has(input)]:col-span-2">
      <AcademicYearFilter
        availableAcademicYears={tenant.tracks.map((track) => track.academicYear)}
      />
      <LearningPeriodFilter
        availablePeriods={getLearningPeriodFromTenant(tenant, academicYearIds, tracksIds)}
      />
      <SearchTeacherFilter />

      <AcademyFilter
        slug={SPECIFIC_PAGE_FILTER_KEYS.COMPLIANCE.ACADEMY_ID}
        availableAcademies={tenant.academies}
      />
      <CompletionFilter />

      <SchoolFilter
        availableSchools={tenant.schools}
        slug={SPECIFIC_PAGE_FILTER_KEYS.COMPLIANCE.SCHOOL_ID}
      />
      <TrackFilter slug={SPECIFIC_PAGE_FILTER_KEYS.COMPLIANCE.TRACK_ID} availableTracks={tracks} />
      <SemesterFilter
        availableSemesters={tracks.flatMap((track) => track.academicYear.semesters)}
      />
      <GradeSpanFilter />
      <SubjectFilter
        availableSubjects={tracks
          .filter((track) => (tracksIds?.length ? tracksIds.includes(track.id.toString()) : true))
          .flatMap((track) => track.subjects)}
      />
      <SampleStatusFilter />
    </FilterWrapper>
  );
}
