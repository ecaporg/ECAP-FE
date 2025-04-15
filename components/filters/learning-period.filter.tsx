'use client';
import { BaseFilter } from './base';
import { TrackLearningPeriod } from '@/types';

interface LearningPeriodFilterProps {
  availablePeriods: TrackLearningPeriod[];
}

// TODO: Move to utils
const formatDate = (date: Date | string) => {
  return new Date(date).toLocaleDateString('en-US', {
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  });
};

export const LearningPeriodFilter = ({ availablePeriods }: LearningPeriodFilterProps) => {
  return (
    <BaseFilter
      label="Learning Period"
      slug="learning_period_id"
      options={availablePeriods.map((period) => ({
        label: period.name,
        value: period.id,
        start_date: new Date(period.start_date),
        end_date: new Date(period.end_date),
      }))}
      hasSearch={true}
      render={(option: any) => {
        return (
          <div>
            <b className="block">{option.label}</b>
            <p>
              {formatDate(option.start_date)} - {formatDate(option.end_date)}
            </p>
          </div>
        );
      }}
    />
  );
};
