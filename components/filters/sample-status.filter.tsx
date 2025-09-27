import { DEFAULT_FILTERS_KEYS } from '@/constants/filter';
import { SAMPLE_STATUS } from '@/constants/sample';
import { SampleStatus } from 'ecap-lib/dist/constants';
import { BaseFilter, type FilterProps } from './base';
interface SampleStatusFilterProps {
  slug?: string;
  options?: FilterProps['options'];
}

const statuses: FilterProps['options'] = Object.entries(SAMPLE_STATUS)
  .map(([key, value]) => ({
    label: value,
    value: key as SampleStatus,
  }))
  .filter((status) => status.value !== SampleStatus.CREATED);

export function SampleStatusFilter({
  slug = DEFAULT_FILTERS_KEYS.STATUS,
  options = statuses,
}: SampleStatusFilterProps) {
  return (
    <BaseFilter className="min-w-52" label="Sample Status" slug={slug} options={options} multiple />
  );
}

interface FlagCategoryFilterProps {
  slug?: string;
}

const flagCategories: FilterProps['options'] = Object.entries({
  [SampleStatus.MISSING_SAMPLE]: SAMPLE_STATUS.MISSING_SAMPLE,
  [SampleStatus.ERRORS_FOUND]: SAMPLE_STATUS.ERRORS_FOUND,
}).map(([key, value]) => ({
  label: value,
  value: key as SampleStatus,
}));

export function FlagCategoryFilter({
  slug = DEFAULT_FILTERS_KEYS.FLAG_CATEGORY,
}: FlagCategoryFilterProps) {
  return (
    <BaseFilter
      label="Flag Category"
      defaultPlaceholder="All Flag Categories"
      slug={slug}
      options={flagCategories}
      multiple
    />
  );
}
