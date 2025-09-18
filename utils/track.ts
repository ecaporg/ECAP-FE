import { dayTypeMap } from '@/constants/track';
import type { ITrackCalendar, ICalendarDay as ITrackCalendarDay } from '@/types';

export const formatTrackDateWithShortMonth = (date: Date | string) => {
  return new Date(date).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  });
};

export const formatTrackDateWithLongMonth = (date: string | Date) => {
  const dateObj = new Date(date);
  return dateObj.toLocaleDateString('en-US', {
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  });
};

export const getTrackCalendarDays = (calendar: ITrackCalendar) => {
  if (calendar.days.length === 0) {
    return getTrackCalendarDaysWithWeekends(calendar);
  }

  return calendar.days.reduce(
    (acc, day) => {
      acc[day.day as string] = day;
      return acc;
    },
    {} as Record<string, ITrackCalendarDay>
  );
};

const getTrackCalendarDaysWithWeekends = (calendar: ITrackCalendar) => {
  const acc: Record<string, ITrackCalendarDay> = {};
  const currentDate = new Date(calendar.track.start_date);
  const endDate = new Date(calendar.track.end_date);
  currentDate.setUTCHours(0, 0, 0, 0);
  const loopEndDate = new Date(endDate);
  loopEndDate.setUTCHours(0, 0, 0, 0);

  while (currentDate <= loopEndDate) {
    const dayOfWeek = currentDate.getUTCDay(); // 0 for Sunday, 6 for Saturday

    if (dayOfWeek === 0 || dayOfWeek === 6) {
      const dateString = currentDate.toISOString().split('T')[0];
      acc[dateString] = {
        day: dateString,
        type: dayTypeMap['Non-School Day'],
      };
    }
    currentDate.setUTCDate(currentDate.getUTCDate() + 1);
  }
  return acc;
};

export const getDaysInRange = (from: Date, to: Date) => {
  const days = [];
  for (let date = new Date(from); date <= to; date.setDate(date.getDate() + 1)) {
    days.push(new Date(date));
  }
  return days;
};
