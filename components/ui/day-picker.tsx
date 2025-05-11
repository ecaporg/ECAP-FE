"use client";

import * as React from "react";
import { format as formatDateFns } from "date-fns";
import { CalendarIcon } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

export function DayPicker({
  value,
  onChange,
  fromDate,
  format = (date: Date) => formatDateFns(date, "PPP"),
}: {
  value: Date | undefined;
  onChange: (date: Date | undefined) => void;
  format?: (date: Date) => string;
  fromDate?: Date;
}) {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant={"outline"}
          className="w-full justify-start text-left font-normal relative border border-input text-neutral-black"
          size="lg"
        >
          {value ? format(value) : <span />}
          <CalendarIcon className="size-6 absolute right-4 top-1/2 -translate-y-1/2" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0">
        <Calendar
          mode="single"
          selected={value}
          onSelect={onChange}
          initialFocus
          fromDate={fromDate}
        />
      </PopoverContent>
    </Popover>
  );
}
