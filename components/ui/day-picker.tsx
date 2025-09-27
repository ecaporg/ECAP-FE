'use client';

import { format as formatDateFns } from 'date-fns';
import { CalendarIcon } from 'lucide-react';
import * as React from 'react';

import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';

export function DayPicker({
  value,
  onChange,
  fromDate,
  toDate,
  format = (date: Date) => formatDateFns(date, 'PPP'),
}: {
  value: Date | undefined;
  onChange: (date: Date | undefined) => void;
  format?: (date: Date) => string;
  fromDate?: Date;
  toDate?: Date;
}) {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant={'outline'}
          className="relative w-full justify-start border border-input text-left font-normal text-neutral-black"
          size="lg"
        >
          {value ? format(value) : <span />}
          <CalendarIcon className="-translate-y-1/2 absolute top-1/2 right-4 size-6" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0">
        <Calendar
          mode="single"
          selected={value}
          onSelect={onChange}
          disabled={
            {
              before: fromDate,
              after: toDate,
            } as any
          }
        />
      </PopoverContent>
    </Popover>
  );
}
