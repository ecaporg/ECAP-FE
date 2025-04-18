import {
  LearningPeriodFilter,
  SchoolFilter,
  AcademyFilter,
  TrackFilter,
  GradeFilter,
  SearchFilter,
  ComplationFilter,
  SampleStatusFilter,
} from '@/components/filters';
import { DoneByFilter } from '@/components/filters/done-by';
import { SPECIFIC_PAGE_FILTER_KEYS } from '@/constants/filter';
import { Tenant, Sample, AssignmentPeriod, Student } from '@/types';
import { cn, getLearningPeriodFromTenant } from '@/utils';
import { BackToCompliance } from './back-to-compliance';

type FilterProps = {
  tenant: Tenant;
};

const FilterWrapper = ({
  children,
  className,
}: React.PropsWithChildren<{ className?: string }>) => {
  return <section className={cn('flex flex-wrap gap-4 pt-9 pb-8', className)}>{children}</section>;
};

export function TeacherFilters({ tenant }: FilterProps) {
  return (
    <FilterWrapper>
      <LearningPeriodFilter availablePeriods={getLearningPeriodFromTenant(tenant)} />
      <SearchFilter
        label="Search for a student by name/ID"
        slug="search"
        options={[{ label: 'test', value: 'test' }]}
      />
      <SchoolFilter availableSchools={tenant.schools} />
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

type SamplesFiltersProps = FilterProps & {
  samples: Sample[];
  student?: Student;
  defaultName?: string;
};

export function SamplesFilters({ tenant, samples, student, defaultName }: SamplesFiltersProps) {
  return (
    <FilterWrapper className="pt-0">
      <BackToCompliance
        student={
          student ??
          ({
            user: { firstname: defaultName, lastname: '' },
          } as Student)
        }
      />
      <LearningPeriodFilter availablePeriods={getLearningPeriodFromTenant(tenant)} />
      <SampleStatusFilter />
      <DoneByFilter
        availableUsers={samples
          .map((sample) => sample.done_by_teacher)
          .filter((teacher) => teacher !== null)}
      />
    </FilterWrapper>
  );
}
