import { DoneByFilter, LearningPeriodFilter, SampleStatusFilter } from '@/components/filters';
import type { ISample, IStudent, ITenant } from '@/types';
import { getLearningPeriodFromTenant } from '@/utils';
import { BackToCompliance } from '../back-to';
import { FilterWrapper } from './filter-wrapper';

interface SamplesFiltersProps {
  tenant: ITenant;
  samples: ISample[];
  student?: IStudent;
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
    <FilterWrapper className="pt-0 lg:[&>*]:grow-0" grid={false}>
      <BackToCompliance
        student={
          student ??
          ({
            user: { name: defaultName },
          } as IStudent)
        }
      />
      <LearningPeriodFilter
        availablePeriods={getLearningPeriodFromTenant(tenant, academicYearIds)}
      />
      <SampleStatusFilter />
      <DoneByFilter
        availableUsers={samples
          .flatMap((sample) => [
            sample.done_by,
            sample.flag_errors?.user,
            sample.flag_missing_work?.user,
            sample.flag_rejected?.user,
          ])
          .filter((user) => user != null)}
      />
    </FilterWrapper>
  );
}
