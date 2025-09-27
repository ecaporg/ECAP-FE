'use client';
import type { ITrackLearningPeriod } from '@/types';
import { cn, formatDueDateWithYear, getLearningPeriodDateRange } from '@/utils';
import { ChevronLeftIcon, ChevronRightIcon } from 'lucide-react';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import type React from 'react';
import { NextButton, PageButton, Pagination, PrevButton } from 'react-headless-pagination';
import { buttonVariants } from '../ui/button';
import { CompletionStatus, type CompletionStatusProps } from './completion-status';
interface PaginationSectionProps {
  totalPages: number;
  learningPeriod?: ITrackLearningPeriod;
  dueDate: Date | string;
  completedString: string;
  status: CompletionStatusProps['variant'];
}

export const PAGE_KEY = 'page';

export const PaginationSection: React.FC<PaginationSectionProps> = ({
  totalPages,
  learningPeriod,
  dueDate,
  completedString,
  status,
}) => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const currentPage = Number(searchParams.get(PAGE_KEY) || '1');

  const handlePageChange = (page: number) => {
    const query = new URLSearchParams({
      ...Object.fromEntries(searchParams.entries()),
      [PAGE_KEY]: (page + 1).toString(),
    });
    router.replace(`${pathname}?${query.toString()}`);
  };

  return (
    <section className="mb-2 flex flex-col items-start gap-y-6 lg:h-20 lg:flex-row lg:items-center">
      <h2 className="order-1 font-semibold text-lg text-neutral-black">
        Showing Table for {learningPeriod?.name}{' '}
        <span className="font-normal">
          ({learningPeriod && getLearningPeriodDateRange(learningPeriod)})
        </span>
      </h2>

      <Pagination
        className="order-last flex flex-grow list-none items-center justify-center gap-4 self-center lg:order-2"
        currentPage={currentPage - 1}
        edgePageCount={2}
        middlePagesSiblingCount={1}
        setCurrentPage={handlePageChange}
        totalPages={totalPages}
        truncableClassName=""
        truncableText="..."
      >
        {totalPages > 1 && (
          <>
            <PrevButton className="flex size-10 items-center justify-center">
              <ChevronLeftIcon className="size-6" />
            </PrevButton>
            <PageButton
              as={<button type="button" />}
              activeClassName={cn(buttonVariants({ variant: 'default', size: 'md' }))}
              inactiveClassName={cn(
                buttonVariants({ variant: 'outline', size: 'md' }),
                'text-neutral-black border border-border'
              )}
            />
            <NextButton className="flex size-10 items-center justify-center">
              <ChevronRightIcon className="size-6" />
            </NextButton>
          </>
        )}
      </Pagination>

      <div className="order-3 flex items-center gap-4">
        <CompletionStatus variant={status} />
        <div className="text-base text-neutral-black">
          <b>{completedString}</b>
          <br />
          <b>Due: </b>
          {formatDueDateWithYear(dueDate)}
        </div>
      </div>
    </section>
  );
};
