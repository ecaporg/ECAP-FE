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

type FilterProps = {
  tenant?: Tenant;
};

export function TeacherFilters({ tenant }: FilterProps) {

  console.log(tenant, " tenatn in filters", tenant?.tracks.flatMap((track) => track.learningPeriods))

  return (
    <section className="flex flex-wrap gap-4 pt-9 pb-8">
      <LearningPeriodFilter
        availablePeriods={tenant?.tracks.flatMap((track) => track.learningPeriods.map((period) => ({
          ...period,
          name: `${track.name} - ${period.name}`
        }))) || []}
      />
      <SearchFilter
        label="Search for a student by name/ID"
        slug="search"
        options={[{ label: 'test', value: 'test' }]}
      />
      <SchoolFilter availableSchools={tenant?.schools || []} />
      <AcademyFilter slug="student.academy_id" availableAcademies={tenant?.academies || []} />
      <TrackFilter slug="student.track_id" availableTracks={tenant?.tracks || []} />
      <GradeFilter />
      <ComplationFilter />
    </section>
  );
}
