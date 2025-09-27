import { Button, buttonVariants } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import { dayTypeMap, dayTypes } from '@/constants/track';
import type { ITrack, ITrackCalendar, ICalendarDay as TrackCalendarDay } from '@/types';
import { cn, formatTrackDateWithLongMonth } from '@/utils';
import { cva } from 'class-variance-authority';
import { type ButtonHTMLAttributes, useState } from 'react';
import type { CalendarDay, DateRange, Modifiers, OnSelectHandler } from 'react-day-picker';

export const TrackCalendarWrapper = ({
  track,
  children,
  className,
}: React.PropsWithChildren<{
  track: ITrack;
  className?: string;
}>) => {
  return (
    <div className={cn('content-center space-y-4 text-start', className)}>
      <h3 className="font-bold text-2xl">{track.name}</h3>
      <p className="font-semibold text-base">
        {formatTrackDateWithLongMonth(track.start_date)} -{' '}
        {formatTrackDateWithLongMonth(track.end_date)}
      </p>
      {children}
    </div>
  );
};

const dayButtonVariants = cva(
  'w-full text-natural-black transition-opacity hover:opacity-80 active:opacity-70',
  {
    variants: {
      dayType: {
        [dayTypeMap.Schooldays]: 'bg-[#90CBFF]',
        [dayTypeMap['Non-School Day']]: 'bg-[#CFD8DC]',
        [dayTypeMap.HOL]: 'bg-[#98ECA2]',
        [dayTypeMap.EMC]: 'bg-[#FBA7A7]',
        [dayTypeMap.OTH]: 'bg-[#DCBE6C]',
        [dayTypeMap.ACA]: 'bg-[#3FD8E9]',
        '': '',
      },
    },
  }
);

const DayButton = ({
  day,
  modifiers,
  dayType = '',
  className,
  ...props
}: {
  day: CalendarDay;
  modifiers: Modifiers;
} & ButtonHTMLAttributes<HTMLButtonElement> & {
    dayType: string;
  }) => {
  return (
    <Button
      variant="outline"
      size="sm"
      className={cn(className, dayButtonVariants({ dayType: dayType }), 'h-8 w-10 rounded-none')}
      {...props}
    />
  );
};

export const CalendarForTrack = ({
  calendar,
  selectedDateRange,
  dayMap,
  onSelectDateRange,
}: {
  calendar: ITrackCalendar;
  selectedDateRange?: DateRange;
  onSelectDateRange: OnSelectHandler<DateRange | undefined>;
  dayMap: Record<string, TrackCalendarDay>;
}) => {
  return (
    <section className="flex w-full">
      <Calendar
        mode="range"
        required={false}
        numberOfMonths={2}
        disabled={{
          before: new Date(calendar.track.start_date),
          after: new Date(calendar.track.end_date),
        }}
        showOutsideDays={false}
        selected={selectedDateRange}
        onSelect={onSelectDateRange}
        components={{
          DayButton(props) {
            const day = dayMap[props.day.date.toISOString().split('T')[0]];
            return <DayButton {...props} dayType={day?.type} />;
          },
        }}
        classNames={{
          months: 'flex flex-col sm:flex-row flex-wrap space-y-4 sm:space-y-0 relative',
          week: 'flex w-full gap-[1px] mt-[1px]',
          month: 'space-y-4 rounded-md border border-border px-2 py-4',
          nav: 'flex items-center justify-between w-full absolute top-3',
          day: 'w-10 h-8 text-center text-sm p-0 relative [&:has([aria-selected].day-range-end)]:rounded-r-md [&:has([aria-selected].day-outside)]:bg-accent/50 [&:has([aria-selected])]:bg-accent first:[&:has([aria-selected])]:rounded-l-md last:[&:has([aria-selected])]:rounded-r-md focus-within:relative focus-within:z-20',
        }}
      />
    </section>
  );
};

export const CalendarButtons = ({
  onSave,
  assignDayType,
}: {
  onSave: () => void;
  assignDayType: (type: string) => void;
}) => {
  return (
    <>
      <div className="flex gap-4">
        {dayTypes.map((type) => (
          <Button
            key={type}
            onClick={() => assignDayType(type)}
            className={cn(
              dayButtonVariants({
                dayType: type,
              }),
              'px-2'
            )}
          >
            {type}
          </Button>
        ))}
      </div>
      <div className="flex flex-1 justify-center">
        <Button onClick={onSave}>Save</Button>
      </div>
    </>
  );
};
