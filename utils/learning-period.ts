import { Tenant, TrackLearningPeriod } from '@/types';

export const getShortLearningPeriodName = (learningPeriod: string) => {
  return learningPeriod
    .split(' ')
    .map((word) => word.charAt(0).toLocaleUpperCase())
    .join(' ');
};

export const formatLearningPeriodDate = (date: Date | string) => {
  return new Date(date).toLocaleDateString('en-US', {
    month: 'long',
    day: 'numeric',
  });
};

export const getLearningPeriodFromTenant = (tenant: Tenant) => {
  return tenant?.tracks.flatMap((track) =>
    track.learningPeriods.map((period) => ({
      ...period,
      start_date: new Date(period.start_date),
      end_date: new Date(period.end_date),
      name: `${track.name}: ${getShortLearningPeriodName(period.name)}`,
    }))
  );
};

const compareDates = (date1: Date, date2: Date) => {
  return date1.toISOString().split('T')[0] == date2.toISOString().split('T')[0];
};

export const mergeLearningPeriods = (learningPeriods: TrackLearningPeriod[]) => {
  const res = learningPeriods.reduce((acc, period) => {
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
