import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
} from "@/components/ui/table";
import { Skeleton } from "../ui/skeleton";

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
              <Skeleton className="w-full h-5" />
            </TableHead>
          ))}
        </TableRow>
      </TableHeader>
      <TableBody>
        {Array.from({ length: rows }).map((_, index) => (
          <TableRow key={`skeleton-row-${index}`}>
            {Array.from({ length: columns }).map((_, index) => (
              <TableCell key={`skeleton-cell-${index}-${index}`}>
                <Skeleton className="w-full h-5" />
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
    <section className="flex lg:items-center lg:h-24 lg:flex-row flex-col gap-y-6 items-start pb-7">
      <h2 className="text-lg font-semibold text-neutral-black order-1">
        <Skeleton className="w-24 h-full" />
      </h2>

      <ul className="flex-grow flex items-center justify-center gap-4 list-none lg:order-2 order-last self-center">
        <Skeleton className="size-10" />
        <Skeleton className="size-10" />
        <Skeleton className="size-10" />
        <Skeleton className="size-10" />
        <Skeleton className="size-10" />
      </ul>

      <div className="flex items-center gap-4 order-3">
        <Skeleton className="w-24 h-full" />
      </div>
    </section>
  );
};

export const LoadingFilters = ({
  filters = 3,
}: Pick<LoadingTableProps, "filters">) => {
  return (
    <section className="flex flex-wrap gap-4 pt-9 pb-8">
      {Array.from({ length: filters }).map((_, index) => (
        <Skeleton key={`skeleton-filter-${index}`} className="w-24 h-12" />
      ))}
    </section>
  );
};

export const LoadingTableSection = ({
  columns,
  rows,
}: Omit<LoadingTableProps, "filters">) => {
  return (
    <>
      <LoadingPagination />
      <LoadingTable columns={columns} rows={rows} />
    </>
  );
};

export const LoadingTableSectionWithFilters = ({
  columns,
  rows,
  filters,
}: LoadingTableProps) => {
  return (
    <>
      <LoadingFilters filters={filters} />
      <LoadingTableSection columns={columns} rows={rows} />
    </>
  );
};
