'use client';
import { DEFAULT_FILTERS_KEYS } from '@/constants/filter';
import type { ITrackLearningPeriod } from '@/types';
import { formatLearningPeriodDate, getCurrentLearningPeriod, mergeLearningPeriods } from '@/utils';
import { BaseFilter } from './base';

interface LearningPeriodFilterProps {
  availablePeriods: ITrackLearningPeriod[];
  slug?: string;
}

export const LearningPeriodFilter = ({
  availablePeriods = [],
  slug = DEFAULT_FILTERS_KEYS.LEARNING_PERIOD_ID,
}: LearningPeriodFilterProps) => {
  const mergedPeriods = mergeLearningPeriods(availablePeriods);
  const currentPeriod = getCurrentLearningPeriod(mergedPeriods);

  return (
    <BaseFilter
      label="Learning Period"
      defaultPlaceholder="All Learning Periods"
      slug={slug}
      options={mergedPeriods.map((period) => ({
        label: period.name,
        value: period.id.toString(),
        start_date: period.start_date,
        end_date: period.end_date,
      }))}
      hasSearch={true}
      render={(option) => {
        return (
          <div>
            <b className="block truncate max-w-60" title={option.label}>
              {option.label}
            </b>
            <p>
              {formatLearningPeriodDate((option as any).start_date)} -{' '}
              {formatLearningPeriodDate((option as any).end_date)}
            </p>
          </div>
        );
      }}
      defaultValue={currentPeriod ? currentPeriod.id.toString() : null}
    />
  );
};
