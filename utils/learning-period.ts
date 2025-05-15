import type { CompletionStatusProps } from '@/components/table/completion-status';
import { DEFAULT_FILTERS_KEYS } from '@/constants/filter';
import type { Tenant, TrackLearningPeriod } from '@/types';

export const getShortLearningPeriodName = (learningPeriod: string) => {
  if (learningPeriod.split(' ').length === 1) return learningPeriod;

  return learningPeriod
    .split(' ')
    .map((word) => word.charAt(0).toLocaleUpperCase())
    .join('');
};

export const getLearningPeriodDateRange = (learningPeriod: TrackLearningPeriod) => {
  return `${formatLearningPeriodDate(
    learningPeriod.start_date
  )} - ${formatLearningPeriodDate(learningPeriod.end_date)}`;
};

export const formatLearningPeriodDate = (date: Date | string) => {
  return new Date(date).toLocaleDateString('en-US', {
    month: 'long',
    day: 'numeric',
  });
};

export const formatDueDateWithYear = (date: Date | string) => {
  return new Date(date).toLocaleDateString('en-US', {
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  });
};

export const getLearningPeriodFromTenant = (
  tenant: Tenant,
  academic_year_ids?: (number | string)[],
  tracksIds?: string[]
) => {
  return tenant?.tracks
    .filter((track) =>
      tracksIds && tracksIds.length ? tracksIds.includes(track.id.toString()) : true
    )
    .flatMap((track) =>
      track.learningPeriods
        .map((period) => ({
          ...period,
          start_date: new Date(period.start_date),
          end_date: new Date(period.end_date),
          name: `${track.name}: ${getShortLearningPeriodName(period.name)}`,
        }))
        .filter(() => {
          if (academic_year_ids?.length) {
            return academic_year_ids.includes(track.academic_year_id.toString());
          }
          return true;
        })
    );
};

export const getFormattedLP = (lp: TrackLearningPeriod) => {
  return `${lp.track.name}, ${getShortLearningPeriodName(
    lp.name
  )} (${getLearningPeriodDateRange(lp)})`;
};

const compareDates = (date1: Date, date2: Date) => {
  return date1.toISOString().split('T')[0] == date2.toISOString().split('T')[0];
};

export const mergeLearningPeriods = (learningPeriods: TrackLearningPeriod[]) => {
  const res = learningPeriods
    .map((lp) => ({
      ...lp,
      start_date: new Date(lp.start_date),
      end_date: new Date(lp.end_date),
    }))
    .reduce((acc, period) => {
      const existingPeriod = acc.find(
        (p) =>
          compareDates(p.start_date, period.start_date) && compareDates(p.end_date, period.end_date)
      );
      if (existingPeriod) {
        existingPeriod.name = `${existingPeriod.name}, ${period.name}`;
        existingPeriod.id = `${existingPeriod.id},${period.id}`;
      } else {
        acc.push(Object.assign({}, period));
      }
      return acc;
    }, [] as TrackLearningPeriod[]);
  res.sort((a, b) => b.start_date.getTime() - a.start_date.getTime());
  return res;
};

export const assignDefaultLearningPeriod = (
  tenant: Tenant,
  param: {
    [DEFAULT_FILTERS_KEYS.LEARNING_PERIOD_ID]: string | number;
  },
  academicYearIds?: string[]
) => {
  const mergedLP = mergeLearningPeriods(getLearningPeriodFromTenant(tenant, academicYearIds));
  if (!param[DEFAULT_FILTERS_KEYS.LEARNING_PERIOD_ID]) {
    const learningPeriod = mergedLP[0];
    param[DEFAULT_FILTERS_KEYS.LEARNING_PERIOD_ID] = learningPeriod.id;
  }
  return mergedLP;
};

export const getDueDate = (learningPeriod?: TrackLearningPeriod) => {
  if (!learningPeriod) return new Date();
  const dueDate = new Date(learningPeriod.end_date);
  dueDate.setDate(dueDate.getDate() + 7);
  return dueDate;
};

export const getStatusForTable = (
  completedCount: number,
  totalItems: number,
  dueDate: Date
): CompletionStatusProps['variant'] => {
  const now = new Date();
  if (now > dueDate && completedCount < totalItems) {
    return 'Overdue';
  }
  if (completedCount == totalItems) {
    return 'Complete';
  }
  return 'In Progress';
};
