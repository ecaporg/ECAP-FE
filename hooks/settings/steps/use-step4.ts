"use client";
import { BaseApi } from "@/lib/base-api";
import { apiClientFetch } from "@/lib/client-fetch";
import { TrackCalendar, TrackCalendarDay } from "@/types/track";
import { getTrackCalendarDays, getDaysInRange } from "@/utils";
import { useState } from "react";
import { DateRange, OnSelectHandler } from "react-day-picker";
import { toast } from "sonner";

export const trackCalendarClientApi = new BaseApi<TrackCalendar, undefined>(
  "/track-calendars",
  apiClientFetch
);

export const useStep4 = (defaultCalendars: TrackCalendar[]) => {
  const [calendars, setCalendars] = useState<TrackCalendar[]>(defaultCalendars);
  const [selectedCalendar, setSelectedCalendar] =
    useState<TrackCalendar | null>(null);
  const [dayMap, setDayMap] = useState<Record<string, TrackCalendarDay>>();
  const [selectedDateRange, setSelectedDateRange] = useState<DateRange>();
  const [isDirty, setIsDirty] = useState(false);
  const [isOpenConfirmation, setIsOpenConfirmation] = useState(false);

  const handleSelectCalendar = (calendar: TrackCalendar) => () => {
    setSelectedCalendar(calendar);
    setDayMap(getTrackCalendarDays(calendar));
  };

  const handleBackToTracks = () => {
    setSelectedCalendar(null);
    setSelectedDateRange(undefined);
    setIsDirty(false);
  };

  const onSelectDateRange: OnSelectHandler<DateRange | undefined> = (el) => {
    setSelectedDateRange(el);
  };

  const assignDayType = (type: string) => {
    setIsDirty(true);
    const days =
      selectedDateRange?.from && selectedDateRange?.to
        ? getDaysInRange(selectedDateRange.from, selectedDateRange.to)
        : selectedDateRange?.from
        ? [selectedDateRange.from]
        : [];

    const daysWithType = days.reduce((acc, day) => {
      acc[day.toISOString().split("T")[0]] = {
        day: day.toISOString().split("T")[0],
        type,
      };
      return acc;
    }, {} as Record<string, TrackCalendarDay>);

    setDayMap((prev) => ({
      ...prev,
      ...daysWithType,
    }));
    setSelectedDateRange(undefined);
  };

  const onSave = async () => {
    if (!selectedCalendar) return;
    toast.info("Saving...");

    try {
      await trackCalendarClientApi.put(selectedCalendar.id.toString(), {
        days: Object.values(dayMap!),
      });
      setCalendars((prev) =>
        prev.map((c) =>
          c.id === selectedCalendar.id
            ? {
                ...c,
                days: Object.values(dayMap!),
              }
            : c
        )
      );
      setIsDirty(false);
      toast.success("Calendar saved successfully");
    } catch (error) {
      console.error(error);
      toast.error("Failed to save calendar");
    }
  };

  return {
    selectedCalendar,
    handleSelectCalendar,
    handleBackToTracks,
    dayMap,
    selectedDateRange,
    onSelectDateRange,
    onSave,
    assignDayType,
    isOpenConfirmation,
    setIsOpenConfirmation,
    isDirty,
    calendars,
  };
};
