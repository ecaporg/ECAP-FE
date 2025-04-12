import {
  LearningPeriodFilter,
  SchoolFilter,
  AcademyFilter,
  TrackFilter,
  GradeFilter,
  SearchFilter,
  ComplationFilter,
} from '@/components/filters';
import { School, Academy, Track, TrackLearningPeriod } from '@/types';

type FilterProps = {
  availablePeriods: TrackLearningPeriod[];
  availableSchools: School[];
  availableAcademies: Academy[];
  availableTracks: Track[];
};

export function TeacherFilters({
  availablePeriods,
  availableSchools,
  availableAcademies,
  availableTracks,
}: FilterProps) {
  // todo: remove hardcoded data in the future after the API is ready
  return (
    <section className="flex flex-wrap gap-4">
      <LearningPeriodFilter
        availablePeriods={
          availablePeriods ||
          ([
            {
              name: 'Track A: LP1',
              start_date: new Date('2024-01-01'),
              end_date: new Date('2024-01-01'),
              id: '1',
            },
          ] as any)
        }
      />
      <SearchFilter
        label="Search for a student by name/ID"
        slug="search"
        options={[{ label: 'test', value: 'test' }]}
      />
      <SchoolFilter
        availableSchools={
          availableSchools ||
          ([
            { id: '1', name: 'Lucerne' },
            { id: '2', name: 'Mountain...' },
          ] as any)
        }
      />
      <AcademyFilter
        availableAcademies={
          availableAcademies ||
          ([
            { id: '1', name: 'Home School' },
            { id: '2', name: 'Virtual' },
            { id: '3', name: 'Flex' },
          ] as any)
        }
      />
      <TrackFilter
        availableTracks={
          availableTracks ||
          ([
            { id: '1', name: 'Track A' },
            { id: '2', name: 'Track B' },
          ] as any)
        }
      />
      <GradeFilter />
      <ComplationFilter />
    </section>
  );
}
