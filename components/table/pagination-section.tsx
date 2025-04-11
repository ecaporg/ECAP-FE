'use client';
import React from 'react';
import { NextButton, PageButton, Pagination, PrevButton } from 'react-headless-pagination';
import { ArrowLeftIcon, ArrowRightIcon } from 'lucide-react';
import { CompationStatus, CompationStatusProps } from './complation-status';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { buttonVariants } from '../ui/button';
import { cn } from '@/utils';

interface PaginationSectionProps {
  currentPage: number;
  totalPages: number;
  learningPeriod: string;
  dueDate: string;
  completedString: string;
  status: CompationStatusProps['variant'];
}

export const PaginationSection: React.FC<PaginationSectionProps> = ({
  currentPage,
  totalPages,
  learningPeriod,
  dueDate,
  completedString,
  status,
}) => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const handlePageChange = (page: number) => {
    const query = new URLSearchParams({
      ...Object.fromEntries(searchParams.entries()),
      page: page.toString(),
    });
    router.push(`${pathname}?${query.toString()}`);
  };

  return (
    <section className="flex lg:items-center h-24 lg:flex-row flex-col gap-y-6 items-start">
      <h2 className="text-lg font-semibold text-neutral-black order-1">
        Showing Table for {learningPeriod}
      </h2>

      <Pagination
        className="flex-grow flex items-center justify-center gap-4 list-none lg:order-2 order-last self-center"
        currentPage={currentPage}
        edgePageCount={2}
        middlePagesSiblingCount={1}
        setCurrentPage={handlePageChange}
        totalPages={totalPages}
        truncableClassName=""
        truncableText="..."
      >
        <PrevButton className="size-10 flex items-center justify-center">
          <ArrowLeftIcon className="size-6" />
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
          <ArrowRightIcon className="size-6" />
        </NextButton>
      </Pagination>

      <div className="flex items-center gap-4 order-3">
        <CompationStatus variant={status} />
        <div className="text-base text-neutral-black">
          <b>{completedString}</b>
          <br />
          <b>Due: {dueDate}</b>
        </div>
      </div>
    </section>
  );
};
