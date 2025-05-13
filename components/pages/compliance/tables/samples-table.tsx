import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import type { AssignmentPeriod, Sample, Subject } from '@/types';
import { getUserName } from '@/utils';
import { ActionButton } from '../action-button';
import { SapmleStatus } from '../statuses';
import { Avatar, AvatarFallback, getInitials } from '@/components/ui/avatar';
import { SortableIcon } from '@/components/table/sortable-header';

interface SamplesTableProps {
  rows: {
    sample_1: Sample;
    sample_2: Sample;
    subject: Subject;
  }[];
}

const AvatarColumn = ({ sample }: { sample: Sample }) => {
  return (
    <Avatar title={sample?.done_by ? getUserName(sample.done_by) : ''}>
      <AvatarFallback>
        {sample?.done_by ? getInitials(getUserName(sample.done_by)) : '--'}
      </AvatarFallback>
    </Avatar>
  );
};

export const SamplesTable = ({ rows = [] }: SamplesTableProps) => {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>
            Subject
            <SortableIcon<AssignmentPeriod> name="samples.subject.name" />
          </TableHead>
          <TableHead>Assignment Title</TableHead>
          <TableHead>
            Sample Status
            <SortableIcon<AssignmentPeriod> name="samples.status" />
          </TableHead>
          <TableHead>Action</TableHead>
          <TableHead>Done By</TableHead>
          <TableHead>Assignment Title</TableHead>
          <TableHead>
            Sample Status
            <SortableIcon<AssignmentPeriod> name="samples.status" />
          </TableHead>
          <TableHead>Action</TableHead>
          <TableHead>Done By</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {rows.map((row) => (
          <TableRow key={`${row.sample_1.id}`}>
            <TableCell>{row.subject.name}</TableCell>
            <TableCell>{row.sample_1.assignment_title}</TableCell>
            <TableCell>
              <SapmleStatus status={row.sample_1.status || null} />
            </TableCell>
            <TableCell>
              <ActionButton sample={row.sample_1} />
            </TableCell>
            <TableCell>
              <AvatarColumn sample={row.sample_1} />
            </TableCell>
            <TableCell>{row.sample_2?.assignment_title}</TableCell>
            <TableCell>
              <SapmleStatus status={row.sample_2?.status || null} />
            </TableCell>
            <TableCell>
              <ActionButton sample={row.sample_2} />
            </TableCell>
            <TableCell>
              <AvatarColumn sample={row.sample_2} />
            </TableCell>
          </TableRow>
        ))}
        {rows.length === 0 && (
          <TableRow className="h-80">
            <TableCell colSpan={9} className="text-center">
              No samples found
            </TableCell>
          </TableRow>
        )}
      </TableBody>
    </Table>
  );
};
