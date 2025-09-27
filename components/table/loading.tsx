import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { cn } from '@/utils';
import { Skeleton } from '../ui/skeleton';
interface LoadingTableProps {
  columns: number;
  rows?: number;
  filters?: number;
}

export const LoadingTable = ({
  columns,
  rows = 15,
}: {
  columns: number;
  rows?: number;
}) => {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          {Array.from({ length: columns }).map((_, index) => (
            <TableHead key={`skeleton-header-${index}`}>
              <Skeleton className="h-5 w-full" />
            </TableHead>
          ))}
        </TableRow>
      </TableHeader>
      <TableBody>
        {Array.from({ length: rows }).map((_, index) => (
          <TableRow key={`skeleton-row-${index}`}>
            {Array.from({ length: columns }).map((_, index) => (
              <TableCell key={`skeleton-cell-${index}-${index}`}>
                <Skeleton className="h-5 w-full" />
              </TableCell>
            ))}
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

export const LoadingPagination = () => {
  return (
    <section className="flex flex-col items-start gap-y-6 pb-7 lg:h-24 lg:flex-row lg:items-center">
      <h2 className="order-1 font-semibold text-lg text-neutral-black">
        <Skeleton className="h-full w-24" />
      </h2>

      <ul className="order-last flex flex-grow list-none items-center justify-center gap-4 self-center lg:order-2">
        <Skeleton className="size-10" />
        <Skeleton className="size-10" />
        <Skeleton className="size-10" />
        <Skeleton className="size-10" />
        <Skeleton className="size-10" />
      </ul>

      <div className="order-3 flex items-center gap-4">
        <Skeleton className="h-full w-24" />
      </div>
    </section>
  );
};

export const LoadingFilters = ({
  filters = 3,
  className,
}: Pick<LoadingTableProps, 'filters'> & { className?: string }) => {
  return (
    <section className={cn('flex flex-wrap gap-4 pt-9 pb-8', className)}>
      {Array.from({ length: filters }).map((_, index) => (
        <Skeleton key={`skeleton-filter-${index}`} className="h-12 w-24" />
      ))}
    </section>
  );
};

export const LoadingTableSection = ({ columns, rows }: Omit<LoadingTableProps, 'filters'>) => {
  return (
    <>
      <LoadingPagination />
      <LoadingTable columns={columns} rows={rows} />
    </>
  );
};

export const LoadingTableSectionWithFilters = ({ columns, rows, filters }: LoadingTableProps) => {
  return (
    <>
      <LoadingFilters filters={filters} />
      <LoadingTableSection columns={columns} rows={rows} />
    </>
  );
};
