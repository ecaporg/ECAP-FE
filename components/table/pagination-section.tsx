'use client';
import { cn } from '@/utils';
import { ChevronLeftIcon, ChevronRightIcon } from 'lucide-react';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import type React from 'react';
import { NextButton, PageButton, Pagination, PrevButton } from 'react-headless-pagination';
import { buttonVariants } from '../ui/button';
import { CompletionStatus, type CompletionStatusProps } from './complation-status';

interface PaginationSectionProps {
  totalPages: number;
  learningPeriod: string;
  dueDate: string;
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
    <section className="flex lg:items-center lg:h-24 lg:flex-row flex-col gap-y-6 items-start pb-7">
      <h2 className="text-lg font-semibold text-neutral-black order-1">
        Showing Table for {learningPeriod}
      </h2>

      <Pagination
        className="flex-grow flex items-center justify-center gap-4 list-none lg:order-2 order-last self-center"
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
            <PrevButton className="size-10 flex items-center justify-center">
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
            <NextButton className="size-10 flex items-center justify-center">
              <ChevronRightIcon className="size-6" />
            </NextButton>
          </>
        )}
      </Pagination>

      <div className="flex items-center gap-4 order-3">
        <CompletionStatus variant={status} />
        <div className="text-base text-neutral-black">
          <b>{completedString}</b>
          <br />
          <b>Due: {dueDate}</b>
        </div>
      </div>
    </section>
  );
};
