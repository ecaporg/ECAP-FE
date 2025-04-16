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
import { Tenant, Sample } from '@/types';
import { getLearningPeriodFromTenant } from '@/utils';

type FilterProps = {
  tenant?: Tenant;
};

const FilterWrapper = ({ children }: { children: React.ReactNode }) => {
  return <section className="flex flex-wrap gap-4 pt-9 pb-8">{children}</section>;
};

export function TeacherFilters({ tenant }: FilterProps) {
  return (
    <FilterWrapper>
      <LearningPeriodFilter availablePeriods={tenant ? getLearningPeriodFromTenant(tenant) : []} />
      <SearchFilter
        label="Search for a student by name/ID"
        slug="search"
        options={[{ label: 'test', value: 'test' }]}
      />
      <SchoolFilter availableSchools={tenant?.schools || []} />
      <AcademyFilter slug={SPECIFIC_PAGE_FILTER_KEYS.COMPLIANCE.ACADEMY_ID} availableAcademies={tenant?.academies || []} />
      <TrackFilter slug={SPECIFIC_PAGE_FILTER_KEYS.COMPLIANCE.TRACK_ID} availableTracks={tenant?.tracks || []} />
      <GradeFilter slug={SPECIFIC_PAGE_FILTER_KEYS.COMPLIANCE.GRADE} />
      <ComplationFilter />
    </FilterWrapper>
  );
}

export function SamplesFilters({ tenant, samples }: FilterProps & { samples: Sample[] }) {
  return (
    <FilterWrapper>
      <LearningPeriodFilter availablePeriods={tenant ? getLearningPeriodFromTenant(tenant) : []} />
      <SampleStatusFilter samples={samples} />
      <DoneByFilter availableUsers={samples.map((sample) => sample.done_by_teacher)} />
    </FilterWrapper>
  );
}
