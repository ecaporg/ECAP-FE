import { LearningPeriodFilter, SampleStatusFilter } from '@/components/filters';
import { DoneByFilter } from '@/components/filters/done-by';
import { SPECIFIC_PAGE_FILTER_KEYS } from '@/constants/filter';
import type { Sample, Student, Tenant } from '@/types';
import { getLearningPeriodFromTenant } from '@/utils';
import { BackToCompliance } from '../back-to';
import { FilterWrapper } from './filter-wrapper';

interface SamplesFiltersProps {
  tenant: Tenant;
  samples: Sample[];
  student?: Student;
  defaultName?: string;
  academicYearIds?: string[];
}

export function SamplesFilters({
  tenant,
  samples,
  student,
  defaultName,
  academicYearIds,
}: SamplesFiltersProps) {
  return (
    <FilterWrapper className="pt-0" grid={false}>
      <BackToCompliance
        student={
          student ??
          ({
            user: { firstname: defaultName, lastname: '' },
          } as Student)
        }
      />
      <LearningPeriodFilter
        availablePeriods={getLearningPeriodFromTenant(tenant, academicYearIds)}
      />
      <SampleStatusFilter slug={SPECIFIC_PAGE_FILTER_KEYS.COMPLIANCE.SAMPLE_STATUS} />
      <DoneByFilter
        availableUsers={samples.map((sample) => sample.done_by).filter((user) => user != null)}
        slug={SPECIFIC_PAGE_FILTER_KEYS.COMPLIANCE.DONE_BY}
      />
    </FilterWrapper>
  );
}
