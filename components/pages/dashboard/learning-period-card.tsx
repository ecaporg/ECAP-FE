import { Card } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import type { StatsItem } from '@/types';
import {
  formatLearningPeriodDate,
  getDueDate,
  getLPNameForDashboard,
  getLearningPeriodDateRange,
  getStatusColorForDashboard,
  getStatusForDashboard,
} from '@/utils';
import type React from 'react';

interface LearningPeriodCardProps {
  title: React.ReactNode;
  track: React.ReactNode;
  fields?: {
    label: string;
    value: string;
    className?: string;
    skeleton?: boolean;
  }[];
}

export const LearningPeriodEmptyCard = ({
  title,
  fields = [
    { label: 'Date:' },
    { label: 'Deadline:' },
    { label: 'Status:' },
    { label: 'Compliance:' },
  ] as any,
}: Pick<LearningPeriodCardProps, 'title' | 'fields'>) => {
  return (
    <LearningPeriodCardView
      title={title}
      track={'There are no learning periods to display'}
      fields={fields.map((field) => ({ ...field, value: '--' }))}
    />
  );
};

export const LearningPeriodCard = ({
  title,
  stats,
  isCurrentLP = false,
}: {
  title: string;
  stats: StatsItem;
  isCurrentLP?: boolean;
}) => {
  const status = getStatusForDashboard(stats);
  const statusColor = getStatusColorForDashboard(status);
  return (
    <LearningPeriodCardView
      title={title}
      track={
        <h3
          dangerouslySetInnerHTML={{
            __html: getLPNameForDashboard(stats.learningPeriods),
          }}
        />
      }
      fields={[
        {
          label: 'Date:',
          value: getLearningPeriodDateRange(stats.learningPeriods[0]),
        },
        {
          label: isCurrentLP ? 'Deadline:' : 'Due:',
          value: formatLearningPeriodDate(getDueDate(stats.learningPeriods[0])),
        },
        { label: 'Status:', value: status, className: statusColor },
        {
          label: 'Compliance:',
          value: `${stats.compliance.toFixed(2)}%`,
          className: statusColor,
        },
      ]}
    />
  );
};

export const LearningPeriodCardView: React.FC<LearningPeriodCardProps> = ({
  title,
  track,
  fields = [],
}) => {
  return (
    <Card className="flex h-auto min-h-fit flex-1 flex-col justify-between p-2 pb-8">
      <h2 className="p-2 font-bold">{title}</h2>
      <form className="space-y-4 p-2">
        {track}

        {fields.map((field) => (
          <div key={field.label + field.value} className="flex items-center justify-between">
            <label htmlFor={field.label} className="font-bold">
              {field.label}
            </label>
            {field.skeleton ? (
              <Skeleton className="w-20" />
            ) : (
              <input
                type="text"
                readOnly
                id={field.label}
                value={field.value}
                className={`bg-white text-end outline-none ${field.className}`}
              />
            )}
          </div>
        ))}
      </form>
    </Card>
  );
};

export const LearningPeriodCardSkeleton = ({
  title,
  fields = [
    { label: 'Date:' },
    { label: 'Deadline:' },
    { label: 'Status:' },
    { label: 'Compliance:' },
  ] as any,
}: Pick<LearningPeriodCardProps, 'title' | 'fields'>) => {
  return (
    <LearningPeriodCardView
      title={title}
      track={<Skeleton className="w-full" />}
      fields={fields.map((field) => ({ ...field, skeleton: true, value: '' }))}
    />
  );
};
