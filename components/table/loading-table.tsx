import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
} from '@/components/ui/table';
import { Skeleton } from '../ui/skeleton';

export const LoadingTable = ({ columns, rows = 15 }: { columns: number; rows?: number }) => {
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
