import { Button, buttonVariants } from "@/components/ui/button";
import { Track, TrackCalendar, TrackCalendarDay } from "@/types/track";
import { cn, formatTrackDateWithLongMonth } from "@/utils";
import { Calendar } from "@/components/ui/calendar";
import { ButtonHTMLAttributes, useState } from "react";
import {
  CalendarDay,
  DateRange,
  Modifiers,
  OnSelectHandler,
} from "react-day-picker";
import { cva } from "class-variance-authority";
import { dayTypeMap, dayTypes } from "@/constants/track";

export const TrackCalendarWrapper = ({
  track,
  children,
  className,
}: React.PropsWithChildren<{
  track: Track;
  className?: string;
}>) => {
  return (
    <div className={cn("text-start space-y-4 content-center", className)}>
      <h3 className="text-2xl font-bold">{track.name}</h3>
      <p className="text-base font-semibold">
        {formatTrackDateWithLongMonth(track.start_date)} -{" "}
        {formatTrackDateWithLongMonth(track.end_date)}
      </p>
      {children}
    </div>
  );
};

const dayButtonVariants = cva("w-full text-natural-black", {
  variants: {
    dayType: {
      [dayTypeMap.Schooldays]: "bg-[#90CBFF]",
      [dayTypeMap["Non-School Day"]]: "bg-[#CFD8DC]",
      [dayTypeMap.HOL]: "bg-[#FFD591]",
      [dayTypeMap.EMC]: "bg-[#FBA7A7]",
      [dayTypeMap.OTH]: "bg-[#DCBE6C]",
      [dayTypeMap.ACA]: "bg-[#3FD8E9]",
      "": "",
    },
  },
});

const DayButton = ({
  day,
  modifiers,
  dayType = "",
  className,
  ...props
}: {
  day: CalendarDay;
  modifiers: Modifiers;
} & ButtonHTMLAttributes<HTMLButtonElement> & {
    dayType: string;
  }) => {
  console.log(dayButtonVariants({ dayType }), dayType);
  return (
    <Button
      variant="outline"
      size="sm"
      className={cn(
        className,
        dayButtonVariants({ dayType: dayType }),
        "rounded-none"
      )}
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
  calendar: TrackCalendar;
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
            const day = dayMap[props.day.date.toISOString().split("T")[0]];
            return <DayButton {...props} dayType={day?.type} />;
          },
        }}
        classNames={{
          week: "flex w-full gap-[1px] mt-[1px]",
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
              "px-2"
            )}
          >
            {type}
          </Button>
        ))}
      </div>
      <div className="flex justify-center flex-1">
        <Button onClick={onSave}>Save</Button>
      </div>
    </>
  );
};
