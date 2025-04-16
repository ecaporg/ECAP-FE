import { BaseFilter } from './base';
import { Sample } from '@/types';
import { DEFAULT_FILTERS_KEYS } from '@/constants/filter';

interface SampleStatusFilterProps {
  slug?: string;
  samples: Sample[];
}

const SAMPLE_STATUS = {
  COMPLETED: 'Completed',
  IN_PROGRESS: 'In Progress',
  NOT_STARTED: 'Not Started',
};

export function SampleStatusFilter({ slug = DEFAULT_FILTERS_KEYS.SAMPLE_STATUS, samples }: SampleStatusFilterProps) {
  const statuses = samples.map((sample) => ({
    label: SAMPLE_STATUS[sample.status as keyof typeof SAMPLE_STATUS],
    value: sample.status,
  }));
  return (
    <BaseFilter label="Sample Status" slug={slug} options={statuses} multiple hasSearch={true} />
  );
}
