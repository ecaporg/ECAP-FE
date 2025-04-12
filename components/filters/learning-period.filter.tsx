'use client';
import { BaseFilter } from './base';
import { TrackLearningPeriod } from '@/types';

interface LearningPeriodFilterProps {
  availablePeriods: TrackLearningPeriod[];
}

// TODO: Move to utils
const formatDate = (date: Date) => {
  return date.toLocaleDateString('en-US', {
    month: 'long',
    day: 'numeric',
  });
};

export const LearningPeriodFilter = ({ availablePeriods }: LearningPeriodFilterProps) => {
  return (
    <BaseFilter
      label="Learning Period"
      slug="learningPeriod"
      options={availablePeriods.map((period) => ({
        label: period.name,
        value: period.id,
        start_date: period.start_date,
        end_date: period.end_date,
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
