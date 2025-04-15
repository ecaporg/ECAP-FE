'use client';
import { BaseFilter } from './base';
import { TrackLearningPeriod } from '@/types';
import { formatLearningPeriodDate, mergeLearningPeriods } from '@/utils';
interface LearningPeriodFilterProps {
  availablePeriods: TrackLearningPeriod[];
  slug?: string;
}

export const LearningPeriodFilter = ({
  availablePeriods,
  slug = 'learning_period_id',
}: LearningPeriodFilterProps) => {
  const mergedPeriods = mergeLearningPeriods(availablePeriods);

  return (
    <BaseFilter
      label="Learning Period"
      slug={slug}
      options={mergedPeriods.map((period) => ({
        label: period.name,
        value: period.id,
        start_date: period.start_date,
        end_date: period.end_date,
      }))}
      hasSearch={true}
      render={(option: any) => {
        return (
          <div>
            <b className="block truncate max-w-60" title={option.label}>
              {option.label}
            </b>
            <p>
              {formatLearningPeriodDate(option.start_date)} -{' '}
              {formatLearningPeriodDate(option.end_date)}
            </p>
          </div>
        );
      }}
    />
  );
};
