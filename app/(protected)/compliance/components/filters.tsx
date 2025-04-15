import {
  LearningPeriodFilter,
  SchoolFilter,
  AcademyFilter,
  TrackFilter,
  GradeFilter,
  SearchFilter,
  ComplationFilter,
} from '@/components/filters';
import { Tenant } from '@/types';
import { getLearningPeriodFromTenant } from '@/utils';

type FilterProps = {
  tenant?: Tenant;
};

export function TeacherFilters({ tenant }: FilterProps) {
  return (
    <section className="flex flex-wrap gap-4 pt-9 pb-8">
      <LearningPeriodFilter
        availablePeriods={tenant ? getLearningPeriodFromTenant(tenant) : []}
        slug="assignment_periods.learning_period_id"
      />
      <SearchFilter
        label="Search for a student by name/ID"
        slug="search"
        options={[{ label: 'test', value: 'test' }]}
      />
      <SchoolFilter availableSchools={tenant?.schools || []} />
      <AcademyFilter
        slug="assignment_periods.student.academy_id"
        availableAcademies={tenant?.academies || []}
      />
      <TrackFilter
        slug="assignment_periods.student.track_id"
        availableTracks={tenant?.tracks || []}
      />
      <GradeFilter slug="assignment_periods.student.grade" />
      <ComplationFilter />
    </section>
  );
}
